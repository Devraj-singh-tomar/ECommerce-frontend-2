import { FaPlus } from "react-icons/fa6";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";
import { TfiViewListAlt } from "react-icons/tfi";
import { transformImage } from "../utils/feature";

type ProductsProps = {
  productId: string;
  photos: {
    public_id: string;
    url: string;
  }[];
  price: number;
  name: string;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  photos,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img src={transformImage(photos[0]?.url)} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button
          onClick={() =>
            handler({
              productId,
              price,
              name,
              photo: photos[0].url,
              stock,
              quantity: 1,
            })
          }
        >
          <FaPlus title="add to cart" />
        </button>

        <Link to={`/product/${productId}`}>
          <TfiViewListAlt title="view" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
