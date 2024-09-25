import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
  const addToCartHandler = () => {};

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
        <ProductCard
          productId="qweqwe"
          name="Camera"
          price={234234}
          stock={12}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/91xnO7qHAeL._AC_UY436_FMwebp_QL65_.jpg"
        />
      </main>
    </div>
  );
};

export default Home;
