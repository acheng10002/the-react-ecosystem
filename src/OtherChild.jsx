import { Link, Outlet } from "react-router-dom";
const OtherChild = () => {
  return (
    <div>
      <p>Here are a couple profiles!</p>
      <div>
        <Link to="/child/grandchildone">Grandchild One</Link>
      </div>
      <div>
        <Link to="/child/grandchildtwo">Grandchild Two</Link>
      </div>
    </div>
  );
};

export default OtherChild;
