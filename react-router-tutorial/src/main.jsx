import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// 2. configure the loader on the routes
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, { loader as contactLoader } from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

// A. ADDING A ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // C. HANDLING NOT FOUND ERRORS
    errorElement: <ErrorPage />,
    loader: rootLoader,
    /* 2. import and set the action on the route, wire the action up to 
       the route config */
    action: rootAction,
    /* I want the contact component to render inside of the <Root> layout,
    so the contact route is made a child of the root route */
    // E. NESTED ROUTES
    children: [
      // S. INDEX ROUTES
      /* index: true, tells the router to match and render this route when the
      user is at the parent route's exact path, when there are no other child 
      routes to render in the <Outlet> */
      { index: true, element: <Index /> },
      {
        /* remember, : turns that url segment into a dynamic segment,
        that matches the dynamic values in that position of the url
        URL Params/params - changing values in a specific position of the url */
        path: "contacts/:contactId",
        element: <Contact />,
        // configure loader on the route
        loader: contactLoader,
      },
      /* new edit route is a sibling to the existing child route 
      of the parent root route */
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        /* contextual error message for the destroy route 
        doing this, allows the user to interact with parts of the page that aren't
        having trouble 
        destroy route now has its own errorElement and is a child of the root route */
        // R. CONTEXTUAL ERRORS
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// H. DATA WRITES + HTML FORMS
/* in SPAs, React Router intercept form submissions and manage them within
the client browser, avoiding the need for a full-apge reload
React Router mimics the behavior of traditional forms
- serializes the form's data
- determines the request method (GET or POST)
- instead of sending the data ot a server end point, sends the data to a 
  route action on the client side
route action - client-side function defined in my React Router config that
               processes the form's data 
  - allows the app to handle form submission entirely on the client side 
    or decide how to forward the data to a server (e.g. via an API call) 
    
with React Router doing client-side routing:
- no page reloads, since the app stays on the same page while transition-
  ing smoothly
- dynamic behavior since devs can handle form data with JS, enabling 
  features like validation, conditional logic, and more before making
  server requests
- get improved performance since no overhead of a full page reload */
