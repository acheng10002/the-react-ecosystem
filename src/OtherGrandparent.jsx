import { Link, Outlet } from "react-router-dom";
const OtherGrandparent = () => {
  return (
    <div>
      <p>Here are a couple more profiles!</p>
      <Outlet />
      {/*<div>
        <Link to="/grandparent/greatgrandparentone">Great-Grandparent One</Link>
      </div>
      <div>
        <Link to="/grandparent/greatgrandparenttwo">Great-Grandparent Two</Link>
      </div>*/}
    </div>
  );
};

export default OtherGrandparent;
