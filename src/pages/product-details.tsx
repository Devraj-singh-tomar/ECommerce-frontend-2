import { Navigate, useParams } from "react-router-dom";
import {
  useAllReviewsOfProductQuery,
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";
import { Slider } from "6pp";
import RatingComponent from "../components/ratings";
import { useState } from "react";
import { CartItem, Review } from "../types/types";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState<number>(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => prev - 1);

  const { isLoading, isError, data } = useProductDetailsQuery(params.id!);
  const reviewsResponse = useAllReviewsOfProductQuery(params.id!);

  if (isError) return <Navigate to={"/not-found"} />;

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("out of stock");
    if (cartItem.stock < cartItem.quantity)
      return toast.error(`available stock ${cartItem.stock}`);

    dispatch(addToCart(cartItem));

    toast.success("Item added");
  };

  return (
    <div className="product-detail">
      {isLoading ? (
        <ProductLoader />
      ) : (
        <>
          <main className="">
            <section>
              <Slider
                objectFit="contain"
                showNav={false}
                autoplay
                showThumbnails
                images={data?.product.photos.map((i) => i.url) || []}
              />
            </section>
            <section>
              <code>{data?.product?.category}</code>
              <h1>{data?.product?.name.toUpperCase()}</h1>
              <div
                style={{
                  fontSize: "1.7rem",
                  justifyContent: "flex-end",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <RatingComponent value={data?.product?.ratings || 0} />
                <a href="#reviewScroll">
                  <h4
                    style={{
                      fontSize: "1rem",
                      position: "absolute",
                      right: "2rem",
                      textDecoration: "underline",
                    }}
                  >
                    {data?.product.numOfReviews} reviews
                  </h4>
                </a>
              </div>
              <p>{data?.product?.description}</p>
              <h2>₹{data?.product?.price}</h2>
              <article>
                <div>
                  <button onClick={decrement}>-</button>
                  <span>{quantity}</span>
                  <button onClick={increment}>+</button>
                </div>
                <button
                  onClick={() =>
                    addToCartHandler({
                      productId: data?.product?._id!,
                      name: data?.product?.name!,
                      price: data?.product?.price!,
                      quantity: quantity,
                      stock: data?.product?.stock!,
                      photo: data?.product?.photos[0]?.url || "",
                    })
                  }
                >
                  add to cart
                </button>
              </article>
            </section>
          </main>
        </>
      )}

      <section>
        <h2 id="reviewScroll">Reviews</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "space-evenly",
            overflowX: "auto",
            padding: "2rem",
          }}
        >
          {reviewsResponse.isLoading ? (
            <Skeleton width="100%" length={3} />
          ) : (
            reviewsResponse.data?.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="review">
    <div>
      <img
        src={
          review.user.photo ||
          "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_960_720.png"
        }
        alt="user"
      />
      <small>{review.user.name}</small>
    </div>
    <RatingComponent value={review.rating} />
    <p>{review.comment}</p>
  </div>
);

const ProductLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        height: "80vh",
      }}
    >
      <section style={{ width: "100%", height: "100%" }}>
        <Skeleton
          containerHeight="100%"
          width="100%"
          height="100%"
          length={1}
        />
      </section>
      <section style={{ width: "100%" }}>
        <Skeleton width="100%" length={8} />
      </section>
    </div>
  );
};

export default ProductDetails;
