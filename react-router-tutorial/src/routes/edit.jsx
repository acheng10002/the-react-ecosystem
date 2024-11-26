import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";

/* edit route renders a form
wiring up an action to the route will update the record- handles 
form submissions for updating a contact 
request is the HTTP request object for the form submission;
    it has the submitted form data
params is the object containing route parameters, e.g. contactId, 
    which RR extracts from the url 
2. action - where I handle data changes */

// L. UPDATING CONTACTS WITH FORM DATA
export async function action({ request, params }) {
  /* extracts the submitted form data as a key-value map
  representing the inputs submitted in the form */
  const formData = await request.formData();
  /* converts formData into a plain JS objects 
  instead of accessing each field with formData.get("name") */
  const updates = Object.fromEntries(formData);
  // updates the contact
  await updateContact(params.contactId, updates);
  // utility that issues a client-side redirect to the specified url
  return redirect("/contacts/${params.contactId}");

  // M. MUTATION DISCUSSION
  /* action is the API provided by RR
  request, request.formData, Object.fromEntries are all APIs provided
  by the web platform 
  loaders and actions can both return a Reponse (since they receive
  a Request!), redirect helper makes it easier to return a response
  that tells the app the change locations 
  
  without client side routing, if a server redirected after a POST
  request, the new page would fetch the lastest data and render
  RR emulates this and automatically revalidates the data on the page
  after action */
}

// K. UPDATING DATA
export default function EditContact() {
  /* 4. components rely on useLoaderData to automatically receive
        the updated data from the revalidated loaders */
  const { contact } = useLoaderData();
  // T. CANCEL BUTTON
  /* have the cancel button do the same thing as the browser's 
  back button, also needs a click handler */
  const navigate = useNavigate();

  return (
    /* 1. Form passes form data to the action function defined in 
          the current route */
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          // each field in the form is accessible with formData.get(name)
          name="first"
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact?.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        {/* when the user clicks Cancel, they'll be sent back one entry 
        in the browser's history */}
        <button
          /* button type="button" is HTML way of preventing a button 
          from submitting its form */
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
