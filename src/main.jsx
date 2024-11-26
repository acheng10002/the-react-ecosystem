import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import {
  App,
  RenderName,
  Greeting,
  HelloWorldComponent,
  Application,
} from "./App";
import routes from "./routes";

/* createBrowserRouter creates the configuration for a router by 
passing arguments in the form of an array of routes 
const router = createBrowserRouter([
  /* configuration array contains objects with two mandatory keys,
  the path and the corresponding element to be rendered 
  {
    path: "/",
    element: <AppOne />,
    errorElement: <ErrorPage />,
    /* to show a default page in case the user visits a wrong or unused 
    path, pass in an errorElement argument 
  },
  {
    /* (:) here turns the path section after it into a dynamic segment
    dynamic segments will match dynamic/changing values in that position
    of the URL, like the name 
    they allow me to define placeholders in my URL path that can capture
    dynamic values, and get used to handle routes where part of the URL
    is variable
    dynamic segments, URL params, can be used with the useParams hook 
    useParams hook extracts the value of the dynamic segment from the URL 
    path: "profile/:name",
    element: <Profile />,
    /* allows me to render the child components alongside the parent, 
    through an Outlet component added to the Profile component 
    children: [
      /* to render something as a default component when no path is
      added to Profile, add an index route to the children 
      { index: true, element: <DefaultProfile /> },
      { path: "spinach", element: <Spinach /> },
      { path: "popeye", element: <Popeye /> },
    ],
  },
]); 

browser router is the core component that enables routing in a React app
it listens for URL changes and renders the corresponding route's component,
enabling navigation within my app 
- it syncs with the browser url
  - automatically updates the browser's address bar to reflect the current route
  - uses push state (history, pushState) for navigation, avoid full-page reloads
- listens to url changes 
  - dynamically loads the appropriate React component based on the url 
- history stack management - maintains a history stack, enabling back and forward
  navigation using the browser's buttons
- scoped to the app - wraps the React app or a portion of it to manage routing within
  that scope */
const browserRouter = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*
    <App />
    <RenderName />
    <Greeting name="Kai" />
    <HelloWorldComponent name="Stefan" />
    <Application />
    
    generated configuration is rendered in, by getting passed to,
    the RouterProvider component */}
    <RouterProvider router={browserRouter} />
  </StrictMode>
);

/* type checking - process of verifying a piece of code is using the 
                   correct data types for variables, function parameters,
                   and return values 
PropTypes library will do that in React applications
PropTypes type checks the props that a React component receives
it helps to catch potential type errors during development 

Setting up PropTypes
How would I set up a basic implementation of PropTypes?
How do React props work?
Why should I validate props in React?
Using PropTypes in React
Using the prop-types library in React
React PropTypes validators
Custom validators for type checking React props
Validating PercentageStat in React
- Props and PropTyoes are mechanisms for passing read-only attributes between components
If I pass in a prop to a component that has a defaultProp defined, what would happen? 
- the passed in prop would be used
What is the difference between PropTypes and TypeScript?
- Typescript validates type at compile time, whereas PropTypes are checked at runtime
- Typescript will warn me if I pass an argument of the wrong type to my components
- PropTypes are useful when I test how the components interact with external data, 
  for example, when I load JSON from an API, PropTypes will help me debug why my
  component is failing by printing helpful messages 
Using common PropTypes features 
when to maintain both my component props as TypeScript types and React.PropTypes
- publishing a package such as a component library that will be used by vanilla JS
- accepting and passing along external inputs such as results from an API call
- using data from a library that may not have adequate or accurate typings, if any

Understand what client-side routing is
- What does client-side routing mean?
client-side routing - type of routing where JS takes over the duty of handling the routes in an application
helps to build SPA without refreshing as the user navigates
ex. when a user clicks a navar element, URL changes and the view of the page is modified accordingly, 
  within the client
in general MPAs, browser reloads every time I click on a link to navigate
with client-side routing, I never leave the page I am on
- the link requests are intercepted by the JavaScript that I write, instead of letting them go directly to the server
Learn how to use React Router for client-side routing
- since I am controlling the routes with JS, I can make fancy CSS animations across route changes
- when a browser reloads, it notifies screen readers of new content to read, but in the case of client-side routing,
  I need to notify screen-readers of route updates manually
- React Router is a standard routing library for React apps
  with React Router, I can specify React components, that can be rendered based on the route, and etc. 
- How do I set up a basic router?
- What should be used in place of "a" tags to enable client-side routing?
Explore how to create nested and dynamic paths in React Router
- How do I create nested routes?
- if I want to render a section of a page differently, based on different URLs, I can use nested routes
  I can add routes nested as children of one another to ensure that the child gets rendered alongside the parent
- What is meant by dynamic segments or URL params?
Discover how to add a 'catch-all' route in React Router
- How do I add a "catch-all" route
Learn how to pass data from a parent component to any child component rendered via an outlet
- How do I pass data from parent to child through an <Outlet /> component?
Understand how to implement protect routes in React Router
- How do I create protected routes?
*/
