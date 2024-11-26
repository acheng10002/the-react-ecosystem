import { AppOne } from "./App";
import Child from "./Child";
import DefaultChild from "./DefaultChild";
import OtherChild from "./OtherChild";
import OtherGrandparent from "./OtherGrandparent";
import ErrorPage from "./ErrorPage";
import GrandchildOne from "./GrandchildOne";
import GrandchildTwo from "./GrandchildTwo";

// routes can be refactored into its own file
const routes = [
  {
    path: "/",
    element: <AppOne />,
    errorElement: <ErrorPage />,
    /* to show a default page in case the user visits a wrong or unused 
      path, pass in an errorElement argument */
  },
  {
    path: "child",
    element: <OtherChild />,
  },
  {
    path: "grandparent",
    element: <OtherGrandparent />,
    children: [
      { path: "greatgrandparentone", element: <GrandchildOne /> },
      { path: "greatgrandparenttwo", element: <GrandchildTwo /> },
    ],
  },
  {
    /* (:) here turns the path section after it into a dynamic segment
      dynamic segments will match dynamic/changing values in that position
      of the URL, like the name 
      they allow me to define placeholders in my URL path that can capture
      dynamic values, and get used to handle routes where part of the URL
      is variable
      dynamic segments, URL params, can be used with the useParams hook 
      useParams hook extracts the value of the dynamic segment from the URL */
    path: "child/:name",
    element: <Child />,
    /* allows me to render the child components alongside the parent, 
      through an Outlet component added to the Profile component */
    children: [
      /* to render something as a default component when no path is
        added to Profile, add an index route to the children */
      { index: true, element: <DefaultChild /> },
      { path: "grandchildone", element: <GrandchildOne /> },
      { path: "grandchildtwo", element: <GrandchildTwo /> },
    ],
  },
];

/* these routes can be imported into main.jsx, and a browser router can be created from there */
export default routes;

/* when I need to decide whether a certain route should be rendered or not (like when 
authentication is involved), I can conditionally create a config for the router 
<Navigate /> component - reroutes the user to the desired URL when rendered, when I
                         need to rereoute the user to a different URL programmatically */
