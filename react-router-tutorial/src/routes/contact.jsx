import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

/* 3. after action completes, RR reruns any loader function associated 
      with the current route 
      loaders fetch the latest data */
// J. URL PARAMS IN LOADERS
export async function loader({ params }) {
  /* params are passed to the loader with keys that match the dynamic
    segment 
    these params are used to find a record by ID */
  const contact = await getContact(params.contactId);
  return { contact };
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
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
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
