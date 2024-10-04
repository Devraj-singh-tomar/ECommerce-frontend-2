import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useLatestProductsQuery("");

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("out of stock");

    dispatch(addToCart(cartItem));

    toast.success("Item added");
  };

  if (isError) toast.error("cannot fetch the products");

  return (
    <div className="home">
      <section></section>

      <h1>
        NEW PRODUCTS
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="100%" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
