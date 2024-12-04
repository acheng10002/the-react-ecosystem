import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  App,
  Image,
  ImageOne,
  Application,
  FetchGetRequest,
  Component,
  Parent,
  ApplicationFive,
} from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Image />
    <ImageOne />
    <Application />
    <FetchGetRequest />
    <Component />
    <Parent />
    <ApplicationFive />
  </StrictMode>
);

/* Understand how to make fetch requests in React components
- How can I fetch data from an API in React?
  wrap the fetch inside an effect, whenever a component needs to make a 
    request as it renders
Catching and handling errors
- Why should I manually throw errors in fetch requests?
  to pre-emptively plan for errors, so that my website doesn't break or
    appear unresponsive to users
  plan for down APIs, network connectivity issues, or responses with errors
  - to plan for a network error, check for something before the component 
      returns JSX
      - add error to the component's state
      1. add a conditional to check the response status, to assign error a 
          value when a request fails
      2. handle error in then block when the response isn't what my app expected
          so check the response status codes
Lifting requests up the component hierarchy 
- How can I avoid waterfalling requests? 
  lift the request up to the component tree, and pass its response as a prop to
    the child component (trigger independent requests without awaiting each)
  structure my code to make multiple requests concurrently or independently 

useEffect is evil since it causes waters
Suspense? 
fetch-on-render vs. fetch-then-render vs. render-as-you-fetch
initial fetching vd data on demand
data on demand - something I fetch after a user interacts with a page, to 
                 update their experience
                 - autocompletes
                 - dynamic forms
                 - seach experiences
  fetch of data on demand is usually triggered in callbacks
initial fetching - data I'd expect to see on a page right away when I open it
                   the data I need to getch before a component ends up on the screen
                   - usually happens in useEffect
                   - or happens in componentDidMount for class components
Once my use case exceeds "fetch once and forget", got some questions to answer:
- What about error handling?
- What if multiple components want to fetch data from the exact same endpoint?
- Do I cache that data? For how long?
- What about race conditions?
- What if I want to remove the component from the screen?
- Should I cancel this request?
- What about memory leaks? 
When is it ok to start fetching data?
What can I do while the data fetching is in progress?
What should I do when the data fetching is done? 

What is a performant React app?
What are the fundamental libraries-agnostic patterns and techniques?
How does the React lifecycle affect data fetching?
  Know and remember when the React component's lifecycle is triggered
  What is order in which all of this is triggered?
  What is triggered before or after painting?
  What slows down what and how?
  useLayoutEffects
  only components that are actually returned will be mounted, rendered,
  and as a result, trigger useEffect and data fetching it
  every component renders "loading" state while it waits for data
  only when data is loaded, do they switch to a component next in the render tree,
    trigger its own data fetching, and returns loading state and the cycle repeats itself
How does the React lifecycle affect apps rendering time and order?
How do browser limitations affect data fetching? 
  Browsers like Chrome can only handle 6 requests in parallel, assuming
  the server is HTTP1
How do browser limitations affect apps rendering time and order? 

React Context - React feature that allows me share data or state across multiple components
                without having to pass props manually at every level of the component tree
                useful to avoid prop drilling 

Know about ways to style React application
all the styles I write share the global scope, so it becomes increasingly difficult to 
  manage my CSS as my application grows 
How can I use CSS Modules in my React app?
- CSS modules let me write CSS style declarations that are scoped locally
- then I don't have to worry about my class names potentially conflicting with other classes
  in the global scope 
- CSS module - CSS file where all class namers and animation names are scoped locally by default
  all urls (url(...))s and @imports are in module request format (./xxx and ../xxx means relative, 
  xxx and xxx/yyy means in modules folder, i.e. in node_modules)
What doe CSS-in-JS mean?
- allows me take control of CSS with JS and extends it with various features
- CSS-in-JS helps to apply styling in a logical fashion, based on state
  and also supports modular CSS
- popular CSS-in-JS solution, styled components
CSS Utility Frameworks - provide a set of pre-defined classes that I can directly use in my
                         JSX
What are component libraries?
- libraries of adaptable and reusable components that I can use directly in my project
- ex. dropdowns, drawers, calendars, toggles, tabs, and all the components I can think of 
- libraries include Material UI, Radix, Chakra UI
- also icon component libraries like lucide react, lets me include icons in my project as components
*/
