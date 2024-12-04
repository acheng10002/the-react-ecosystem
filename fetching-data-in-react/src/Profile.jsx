import { useEffect, useState } from "react";
import Bio from "./Bio.jsx";

/* Profile and its child, Bio, both make fetch requests 
both requests are both ifiring inside of their respective components 

in React, the component is not rendered until it is actually called
if JSX has conditional logic, the false branches will never render until
they become true 

Bio has to wait for the request inside of Profile to resolve before it
starts to rendering */
/* 
const Profile = ({ delay }) => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
        .then((response) => response.json())
        .then((response) => setImageURL(response[0].url))
        .catch((error) => console.error(error));
    }, delay);
  }, [delay]);

  return (
    (imageURL && (
      <div>
        <h3>Username</h3>
        <img src={imageURL} alt={"profile"} />
        <Bio delay={1000} />
      </div>
    )) || <h1>Loading...</h1>
  );
};


1. Profile begins by rendering the "Loading..." message
2. first fetch starts after the delay and fetches an image URL 
3. once imageURL resolves, the UI re-renders to display the image 
4. two seconds later, the second fetch updates bioText, and the UI
   updates again to include the bio */

/* Profile component accepts a delay prop, which controls how long to wait 
before starting the fetch requests */
const Profile = ({ delay }) => {
  // setImageURL function updates the imageURL state
  const [imageURL, setImageURL] = useState(null);
  // setBioText function updates the bioText state
  const [bioText, setBioText] = useState(null);

  /* both requests fire as soon as Profile renders 
  useEffect runs a side effect when the component is rendered 
  fetch requests will execute after the specified delay */
  useEffect(() => {
    // delays the execution of the first fetch request by delay
    setTimeout(() => {
      // makes a GET request to fetch a list of photo data from a placeholder API
      fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
        // converts the response to a JSON format
        .then((response) => response.json())
        // extract the first photo's url and updates the imageURL state with it
        .then((response) => setImageURL(response[0].url))
        // logs any errors that occur during the fetch process
        .catch((error) => console.error(error));
      // request for imageURL resolves 2 seconds before bioText request
    }, delay);

    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
        .then((response) => response.json())
        /* updates bioText with a static value
            in a real app, I might extract this from the fetched data */
        .then((response) =>
          setBioText("I like long walks on the beach and JavaScript")
        )
        .catch((error) => console.error(error));
      // here for the second fetch request, I add an extra 2 seconds of delay
    }, delay + 2000);
    // effect runs only when delay changes
  }, []);

  // both fetch requests will fire as soon as Profile renders
  return (
    // if imageURL is truthy
    (imageURL && (
      // when imageURL resolves, div with fetched image containing <Bio /> renders
      <div>
        <h3>Username</h3>
        {/* displays the fetched image, src is dynamically set to imageURL */}
        <img src={imageURL} alt={"profile"} />
        {/* when bioText resolves, an update will be made in state which will
        trigger a rerender in <Bio />, adding that text description to the page */}
        <Bio bioText={bioText} />
      </div>
      // if imageURL is falsy, renders Loading
    )) || <h1>Loading...</h1>
  );
};

export default Profile;
