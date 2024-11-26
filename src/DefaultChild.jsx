import { Outlet, Link } from "react-router-dom";
/* if I want to render something as a default component, when no path is 
added to Profile, I can add an index route to the children */
const DefaultChild = () => {
  return (
    <div>
      <p>Oh, nothing to see here!</p>
      <Link to="/">Click here to go back</Link>
    </div>
  );
};

export default DefaultChild;
