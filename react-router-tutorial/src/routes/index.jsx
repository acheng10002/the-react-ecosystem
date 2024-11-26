/* if a route has chidlren, and I'm at the parent route's path,
<Outlet> has nothing to render because no children match
an index route is the default child route to fill in the space */
// S. INDEX ROUTES
/* common to put dashboards, stats, feeds, etc. at index routes
index routes can particupate in data loading as well */
export default function Index() {
  return (
    <p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out{" "}
      <a href="https://reactrouter.com">the docs at reactrouter.com</a>.
    </p>
  );
}
