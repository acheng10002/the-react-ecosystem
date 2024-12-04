import { useEffect } from "react";
import {
  // F. CLIENT SIDE ROUTING
  Outlet,
  Link,
  // adds styling to active link
  NavLink,
  // 3. access and render the data
  useLoaderData,
  // making this change of form to Form after creating the action
  Form,
  redirect,
  useNavigation,
  /* I'd rather have the filtering happen on every key stroke 
  instead of when the form is explicitly submitted */
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

/* create new contacts by:
1. export an action in my root route, and change form to React 
   Router Form 
2. import and set the action on the route, wire the action up to 
   the route config
3. */

/* 1. export an action in my root route, and change form to React 
   Router Form 
action function is where I handle data changes, creating updating,
or deleting records */

// I. CREATING CONTACTS
export async function action() {
  const contact = await createContact();
  // return { contact };
  // N. REDIRECTING NEW RECORDS TO THE EDIT PAGE
  // update the new contacts action to redirect to edit page
  return redirect(`/contacts/${contact.id}/edit`);
}

/* URL segments, layouts, and data are more often than not coupled 
together 
           / -   <Root>  - list of contacts
contacts/:id - <Contact> - individual contact 

React Router has dava conventions to get data into my route 
components easily

two APIs to use to load data, loader and userLoaderData
1. create and export a loader function in the root module
2. hook the loader function up to the route
3. access and render the data 

1. EXPORT A LOADER FROM ROOT.JSX 
loader used to specify a function that fetches the required data for the route 
(RR handles when and how to call the loader) 

inside the Root component, useLoaderData is used to retrieve the data fetched 
by the loader */

// G. LOADING DATA
/* V. GET SUBMISSIONS WITH CLIENT SIDE ROUTING
filter the list if there are URLSearchParams 
this is a GET, not a POST, so RR does not call the action 
submitting a GET form is the same as clicking a link, only the url changes 
so the code is in the loader and not the action of this route 
it's a normal page navigation */
export async function loader({ request }) {
  // converts the request.url, a string, into a url object
  const url = new URL(request.url);
  // extracts the value of the q query parameter from the url's search string
  const q = url.searchParams.get("q");
  /* 3. access and render the data 
  React Router will automatically keep the data in sync with my UI 
  calls getContacts, passing the query parameter q as an argument */
  const contacts = await getContacts(q);
  /* the url and my form state are out of sync
  so return q from my loader and set it as the search field default value */
  return { contacts, q };
}

// B. THE ROOT ROUTE - which is the global layout for the app
export default function Root() {
  const { contacts, q } = useLoaderData();
  /* useNavigation returns the current navigation state; it can be idle,
  submitting, or loading */
  // P. GLOBAL PENDING UI
  const navigation = useNavigation();
  // X. SUBMITTING FORMS ONCHANGE
  const submit = useSubmit();

  // Y. ADDING A SEARCH SPINNER
  /* in a production app, the search is likely looking for records in a 
  database, that is too large to send all at once and filter client side
  I need some immediate UI feedback for the search */
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  /* React's useEffect manipulates the form's data in the DOM directly */
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* U. URL SEARCH PARAMS AND GET SUBMISSIONS */}
          {/* search field is a form that just changes the url, not data 
          browsers can serialize forms by the name attribute of its
            input elements
          default method for this form is GET, so when the browser creates
          the request for the next document, it doesn't put the form data 
          into the request POST body, but into the URLSearchParams of a 
          GET request */}
          {/* <form id="search-form" role="search"> */}
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              // is the url has ?q=, id name="search", url would have ?search=
              name="q"
              className={searching ? "loading" : ""}
              /* doing this, after I refresh after searching, the form field will
              still show the query when the list is filtered */
              // W. SYNCHRONIZING URLS TO FORM STATE
              defaultValue={q}
              // Z. MANAGING THE HISTORY STACK
              /* replace the current entry in the history stack with the next page,
              instead of pushing into it
              use replace in submit */
              onChange={(event) => {
                const isFirstSearch = q == null;
                /* currentTarget is the DOM node the event is attached to
                currentTarget.form is the input's parent form node
                submit will serialize and submit any form I pass to it 
                
                I only want to replace search results, not the page before I started
                searching, so I do a quick check if this is the first search or not, 
                and then decide to replace
                each key stroke no longer creates new entries */
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            {/* navigation.location shows up when the app is navigating to a
            new url and loading the data for it, goes away when there is no
            pending navigation anymore */}
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          {/* change form to Form 
          Form prevents the browser from sending the request to the server and
          sends it to my route action instead 
          in web semantics, POST usually means some data is changing
          React Router uses this as a hint to automatically revaildate the
            data on the page after the action finishes
            - all my useLoaderData hooks update and UI stays in sync with my
              data automatically */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        {/* <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav> */}
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* O. ACTIVE LINK STYLING */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    /* passing a function to className
                    when the user is at the url in the Navlink, then isActive will be true
                    when url is about to be active, then isPending will be true
                    this indicates where the user is and provides immediate feedback on 
                    links that have been clicked but are still waiting for data to load */
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {/* client-side routing allows my app to update the 
                    URL without requesting another document from the server
                    - visible on the network tab in the browser devtools
                    the app can immediately render new UI 
                    change sidebar <a href> to <Link to> */}
                    <Link to={`/contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        /* Outlet is my way of telling the root route where I 
        want to render its child routes 
        
        adding a loading class to the main part of the app if I'm not idle 
        CSS will add a nice fade after a short delay */
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}

/* useNavigation to add global pending UI 
as user navigates the app, React Router will leave the old page
up as data is loading
I can provide the user with some feedback so the app doesn't feel
unresponsive */
