import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "asfasafasd",
    photo:
      "https://m.media-amazon.com/images/I/91xnO7qHAeL._AC_UY436_FMwebp_QL65_.jpg",
    name: "camera 123",
    price: 4000,
    quantity: 3,
    stock: 12,
  },
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 100;
const discount = 400;
const total = subtotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => <CartItem key={idx} cartItem={i} />)
        ) : (
          <h1>No items in cart</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal} </p>
        <p>tax: ₹{tax} </p>
        <p>Shipping Charges: ₹{shippingCharges} </p>
        <p>
          Discount: <em className="red"> -₹{discount} </em>
        </p>
        <p>
          <b>Total: ₹{total} </b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              -₹{discount} off using <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Code <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to={"/shipping"}>Confirm Order</Link>}
      </aside>
    </div>
  );
};

export default Cart;
