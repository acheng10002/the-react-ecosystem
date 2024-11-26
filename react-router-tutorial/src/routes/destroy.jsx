import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

// Q. DELETING RECORDS
export async function action({ params }) {
  /* without a contextual error message for the destroy route, ErrorPage would 
  render with Error message because the errors bubble up the nearest errorElement */
  // throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}

/* So again:
1. Form passes form data to the action function defined in the current route
   Form emulates the browser by creating a POST request with client side routing
   Form intercepts data submission to the server and sends the data to the route's
   action
2. <Form action="destroy"> matches the new route at "contacts/:contactId/destroy"
   action redirects, sends the new route the request, and handles data changes
   action modifies the data (POST: creates new data, PUT/PATCH - updates existing data,
   DELETE - removes data)
3. revalidation - RR detects the POST request and triggers revalidation
   RR calls all of the loaders for the data on the page to get the latest values 
   loaders fetch updated data from the source and prepares data for a route before it renders
4. useLoaderData hook automatically receives the updated data from the revaldiated loaders
   this keeps the UI in sync automatically 
   useLoaderData returns new values and causes the components to update 
   
In RR, declarative data fetching is done using the loader function in rotue configuration
I define what data a route needs and have RR handle the data fetching for me */
