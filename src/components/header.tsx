import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { GrLogin } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const user = {
  _id: "asd",
  role: "admin",
};

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = () => {
    setIsOpen(false);
  };

  return (
    <nav className="header">
      <div>SHOPNOW</div>
      <Link onClick={() => setIsOpen(false)} title="home" to={"/"}>
        Home
      </Link>
      <Link onClick={() => setIsOpen(false)} title="search" to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} title="cart" to={"/cart"}>
        <FaCartShopping />
      </Link>

      {user?._id ? (
        <>
          <button title="profile" onClick={() => setIsOpen((prev) => !prev)}>
            <FaUserCircle />
          </button>

          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to={"/admin/dashboard"}>
                  Admin
                </Link>
              )}

              <Link onClick={() => setIsOpen(false)} to={"/orders"}>
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <MdLogout />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <GrLogin />
        </Link>
      )}
    </nav>
  );
};

export default Header;
