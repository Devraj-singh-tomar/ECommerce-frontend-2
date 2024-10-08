import { FaPlus } from "react-icons/fa6";
import { CartItem } from "../types/types";

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
      <img src={photos?.[0]?.url} alt={name} />
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
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
