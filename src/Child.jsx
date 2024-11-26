import { Outlet, useParams } from "react-router-dom";
import DefaultChild from "./DefaultChild";
import GrandchildOne from "./GrandchildOne";
import GrandchildTwo from "./GrandchildTwo";

const Child = () => {
  const { name } = useParams();

  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The profile visited is here:</h2>
      {/* Outlet component gets replaced with the children component
      when their paths are visited 
      when I visit the /profile path now, I should be able to see
      the DefaultProfile where the Outlet is rendered */}
      {/* <Outlet />
      Outlet component is a placeholder used in a parent route to render child
      routes it's a way to display nested routes within a layout or component,
      allowing dynamic content to be injected into the parent route's structure
      based on the current URL if the parent element has data, like state, that
      I wanted to pass to any components rendered by the outlet, I have to use
      context Outlets have a context prop built in - any value can be passed
      into this prop, even an array or object - inside any component that would
      be rendered within that outlet (even grandchild components), I can call
      the useOutletContext() hook which will return whatever I passed into that
      context prop */}
      {name === "grandchildone" ? (
        <GrandchildOne />
      ) : name === "grandchildtwo" ? (
        <GrandchildTwo />
      ) : (
        <DefaultChild />
      )}
    </div>
  );
};

export default Child;

/* key advantages of react client-side routing:
- faster page transitions after initial load
  - keeps JS load times to a minimum
  - if I use server-side routing, and I go from one page of a 
    React app to another, the browser would re-parse and 
    re-render the whole page using JS
- better control over user interactions and UI transitions
  - if I use client-side routing, I am fully in control of 
    loading new content, and applying it to the page
  - I can pull off all sorts of CSS trickery like cross-fades,
    pop-up modals, tab sliders, and more
  - with client-side routing, I never clear the page
    I request the resource, pick out the pieces I want to add
    to my page, and perform the DOM manipulation with JS
- integration with React's ecosystem for state management and 
  reusable components

use cases for react client-side routing
1. single-page apps for quick, seamless navigation between views
   without full-page reloads
   - ideal for apps with highly dynamic or itneractive content
     i.e. dashboards and project management tools
   - for SPAs, I never truly leave the page I started on, and
     instead I intercept all future requests and handle the 
     fetching myself (and I do that, using the fetch API native
     to modern browsers)
2. complex state managmeent across views
   React's components and integration with libraries like Redux or
   Conterxt API make it easier to manage shared state across
   multiple views
3. offline support - combined with service workers (scripts my 
  browser runs in the background, separate from the web page,
  acting as a programmable proxy between my app and the network,
  allowings devs to intercept, cache, and handle network requests
  programmatically), client-side routing allows partial or full 
  offline functionality by caching assets and routes
  - in client-side routing, I process all link request using JS I 
    wrote myself, instead of sending those requests to the server 
    right away
4. interactive web apps - requiring frequent route transitions 
   without interrupting background processes, such as music players
   or streaming services
5. custom transition effects - client-side routing supports custom
   animations and transitions between views, useful for design-heavy apps
6. APIs-driven apps, for apps relying on REST or GraphQL APIs, client-
  side routing minimizes the need to reload static assets with every
  route change

alternatives to React client-side routing:
1. server-side routing
- this is the tradional model where the server handles routing and 
  responds with full-rendered pages
- in server-side routing, the whole page reloads, I see a little loading
  bar re-appear every time I jump to a new page
  - in server-side routing, the browser removes everything from the page
    and reloads all the pieces of navigation every time I visit a new
    page
- best for static or content-heavy sites (blogs, documentation sites)
  and for applications with a need for SEO and fast initial page load
2. static site generators
- frameworks like Next.js pre-render at build time
- best for SEO optimization and very fast load times and for content-
  driven sites with infrequent updates
3. hybrid approaches, Next.js
- combines server-side rendering, static side generation, and client-
  side routing
- best for apps needing SEO, fast load times, and client-side interactivity
4. progressive web apps
- frameworks like Angular or Vue.js offer client-side routing capabilities
  similar to React
- PWAs are best for apps requiring offline-first capabilities and mobile-
  friendly UX
5. no routing - multi-page applications
- a multi-page applications without complext routing may suffice
- best for simple, form-based or static pages without dynamic interactions


1. HTML is super cheap to load and render 
2. shared resources, like CSS files, images, and fonts don't need to get reloaded
   (thanks to caching!)
   loading the shared resources isn't a problem, but painting the shared resources
   over and over again...
3. the next page only appears when it's ready
   I see a white screen between clearing the DOM and receiving the new DOM 
   modern web browsers wait for the signal that the next page is done loading AND
    that it's also ready for you to view and interact with, but doing paint holding
    it especially helps out pages that rely on blocking resources JS to render
        everything on the page 
*/
