import { useRating } from "6pp";
import { IoStar } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";

const RatingComponent = ({ value = 0 }: { value: number }) => {
  const { Ratings } = useRating({
    IconFilled: <IoStar />,
    IconOutline: <IoIosStarOutline />,
    value,
    styles: { display: "flex", justifyContent: "flex-start" },
  });

  return <Ratings />;
};

export default RatingComponent;
