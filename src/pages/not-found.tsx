import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className="container" style={{ marginTop: "5vw", fontSize: "2rem" }}>
      <TbError404 fontSize={150} />
      <h1>Page not found !</h1>
    </div>
  );
};

export default NotFound;
