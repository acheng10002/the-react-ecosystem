import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

/* 3. after action completes, RR reruns any loader function associated 
      with the current route 
      loaders fetch the latest data */
// J. URL PARAMS IN LOADERS
// CC.  NOT FOUND DATA
/* whenever I have an expected error case in a loader or action (like
data not existing) I can throw an error
call stack will break
React Router will catch it
and the error path is rendered instead
no attempt to render a null contact 
*/
export async function loader({ params }) {
  /* params are passed to the loader with keys that match the dynamic
    segment 
    these params are used to find a record by ID */
  const contact = await getContact(params.contactId);
  /* this way, I avoid the component completely and render the error
  path instead, telling the user something more specific
  this way, my route elements don't need to concern themselves with
  error and loading statess */
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}

/* request is the incoming HTTP request
params contains route parameters defined in the route's path, 
allows dynamic access to specific data based on the route's url */
export async function action({ request, params }) {
  /* returns a FormData object, provides an easy way to work with
  form fields and their values */
  const formData = await request.formData();
  /* calls updateContact function to update the contact identified 
  by params.contactId, passing in an object with updated data 
  retrieves the value of the favorite field from the form data
  converts the string value into a boolean 
  if "true", the result is true, otherwise it's false 
  pull the form data off the request, and send it to the data model */
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

// D. CONTACT ROUTE UI
export default function Contact() {
  // loader on this page is accessed with
  const { contact } = useLoaderData();
  /* const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://robohash.org/you.png?size=200x200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true, 
  }; */

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || `https://robohash.org/you.png?size=200x200`}
        />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          {/* when Form submission results in a POST, React Router assumes 
          some data on the page has changed or the displayed data might now
          be stale
          React Router automaticallys revalidates loader data - 
          - reruns any loader functions associated with the current route, or other 
            routes sharing the same loader 
          - loaders fetch teh latest data, ensuring my UI reflects the updated state
            without
          React Router updates useLoaderData hooks
          - components relaying on useLoaderData automatically receive the updated
            data from the revalidated loaders
          - no need to manually trigger state updates or fetch calls - the system
            handles it 
          React Router eliminates the need for useState to manage local state and 
          useEffect to manage side effects (e.g. data fetching)
          - the router keeps track of data changes
          - instead of data fetching with useEffect, React Router's loader functions
            act as the single source of truth for fetching and providing data to
            components 
            */}
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            /* like <Link to>, <Form action> can take a relative value 
            relative action with destroy willl submit the form to 
            contact/:contactId/destroy when clicked */
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // AA. Mutations Without Navigation
  /* useFetcher look lets me change data without causing a navigation 
  star button on the contact page
  I am not creating or deleting a new record, I don't want to change pages,
  I only want to change the data on the page I'm looking at */
  const fetcher = useFetcher();
  // BB. OPTIMISTIC UI
  /* fetcher knows the form data being submitted to the action
  so it's available to me on fetcher.formData 
  I can use it immediately to update the star's state even though the network hasn't finished 
  if the update eventually fails, UI will revert to the real data 
  
  instead of always rendering the actual data, I check if the fetcher has any formData
    being submitted, if so, I'll use that instead 
    when the action is done, fetcher.formData will no longer exist, and I'm back to using
    the actual data */
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;
  return (
    /* this form will send formData with a favorite key that's either true or false
    since its method is POSTm it will call the action
    it will post to the route where the form is rendered */
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}

/* Comparing React Router with Manual State Management
1. for data fetching:
- RR uses loader functions for declarative fetching
- MSM use useEffect with fetch 
2. for data updating:
- RR uses action functions and revalidation is automatic
- MSM calls APIS, then manually updates state
3. for UI sync:
- RR auto-updates through useLoaderData
- MSM manually triggers refetching and update state
4. the code complexity:
- RR has lower code complexity and is tightly integrated
  with routing logic
-  MSM has higher code complexity and requires more boilerplate */
