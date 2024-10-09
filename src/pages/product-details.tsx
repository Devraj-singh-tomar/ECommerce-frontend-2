import { Navigate, useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";
import { Slider } from "6pp";
import RatingComponent from "../components/ratings";
import { useState } from "react";
import { CartItem } from "../types/types";
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
              <RatingComponent value={data?.product?.ratings || 0} />
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
    </div>
  );
};

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
