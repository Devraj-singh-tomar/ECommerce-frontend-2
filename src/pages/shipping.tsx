import { ChangeEvent, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="shipping">
      <button
        className="back-btn"
        title="back"
        onClick={() => navigate("/cart")}
      >
        <MdOutlineArrowBackIosNew />
      </button>

      <form>
        <h1>Shipping Address</h1>

        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />

        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />

        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />

        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
          <option value="united-states">United States</option>
          <option value="canada">Canada</option>
          <option value="united-kingdom">United Kingdom</option>
          <option value="australia">Australia</option>
          <option value="germany">Germany</option>
          <option value="france">France</option>
          <option value="japan">Japan</option>
          <option value="brazil">Brazil</option>
          <option value="south-africa">South Africa</option>
        </select>

        <input
          required
          type="number"
          placeholder="Pincode"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default Shipping;
