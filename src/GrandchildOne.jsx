import { Link } from "react-router-dom";

const GrandchildOne = () => {
  return (
    <>
      <p>Hi, I am Grandchild/Great-Grandparent One!</p>
      <Link to="/">Click here to go back</Link>
    </>
  );
};

export default GrandchildOne;
