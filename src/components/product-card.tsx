import { FaPlus } from "react-icons/fa6";

type ProductsProps = {
  productId: string;
  photo: string;
  price: number;
  name: string;
  stock: number;
  handler: () => void;
};

const server = "asdaqweqw";

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button onClick={() => handler()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
