import { useState, useEffect } from "react";

/* Bio takes an extra second to display 

I can lift the request up to the component tree and pass its response as a 
prop to Bio */
/* const Bio = ({ delay }) => {
  const [bioText, setBioText] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
        .then((response) => response.json())
        .then((response) =>
          setBioText("I like long walks on the beach and JavaScript")
        )
        .catch((error) => console.error(error));
    }, delay);
  }, []);

  return (
    bioText && (
      <>
        <p>{bioText}</p>
      </>
    )
  );
}; */

// lift the request up the component tree and pass its response as prop to Bio
const Bio = ({ bioText }) => {
  return (
    bioText && (
      <>
        <p>{bioText}</p>
      </>
    )
  );
};

export default Bio;
