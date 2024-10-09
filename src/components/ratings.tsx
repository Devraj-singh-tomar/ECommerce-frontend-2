import { useRating } from "6pp";
import { IoStar } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";

const RatingComponent = ({ value = 0 }: { value: number }) => {
  const { Ratings } = useRating({
    IconFilled: <IoStar />,
    IconOutline: <IoIosStarOutline />,
    value,
    styles: {
      fontSize: "1.7rem",
      justifyContent: "flex-end",
      position: "absolute",
      top: 0,
      right: 0,
    },
  });

  return <Ratings />;
};

export default RatingComponent;
