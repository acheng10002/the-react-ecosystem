import { useState, useEffect, createContext, useContext } from "react";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import Greeting from "./Greeting";
import "./App.css";

/* making a request to the JSONPlaceholder API to retrieve an image, and
then setting that URL to the src of an img element */
function App() {
  const [imageUrl, setImageUrl] = useState("");

  /* API call with fetch() in a useEffect hook 
  Fetch API through the fetch() method lets me make an HTTP request to
  the backend 
  I can perform different operations using HTTP methods like GET to request
    data from an endpoint, POST to send data to an endpoint */
  useEffect(() => {
    /* fetch() requires the url of the resource I want to fetch and an 
    optional parameter, the optional parameter may be the specified HTTP method 
    GET is the default HTTP method */
    fetch("https://jsonplaceholder.typicode.com/photos", {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((response) => {
        setImageUrl(response[0].url);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <img src={imageUrl} alt="Dynamic" />
    </>
  );
}

const Image = () => {
  // useState lets me add the imageURL state
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  // loading value checks whether the request is resolved or not
  const [loading, setLoading] = useState(true);

  /* useEffect allows me to perform side effects, i.e. fetching data from
  an external API */
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
      .then((response) => {
        /* conditional to check the response status 
        the fetch request itself might complete successfully and yield a
        response, but the response received may not be what my app expected, so
        check the response status codes 
        
        when a bad URL is passed or the API returns an unexpected response, the
        page will relay that information to the user */
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setImageURL(response[0].url))
      // assign error a value when a request fails
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    // pass an empty dependency array, bc only fetch data once when component mounts
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  // I need to check for something before Image component returns JSX
  return (
    // imageURL && (
    <>
      <h1>An image</h1>
      <img src={imageURL} alt={"placeholder text"} />
    </>
    // )
  );
};

/* React expects hooks to be called in the top level of a component or
another hook
my helper function should be turned into a custom hook by following the
hook naming rule 
hooks are just functions that let me use features of React (like states,
effects, etc.) 

useImageURL can be called in any component in which I need to fetch images */
const useImageURL = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setImageURL(response[0].url))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { imageURL, error, loading };
};

const ImageOne = () => {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <h1>An image</h1>
      <img src={imageURL} alt={"placeholder text"} />
    </>
  );
};

function Application() {
  return (
    <div className="App">
      <Profile delay={1000} />
    </div>
  );
}

// JSONPlaceholder API is a REST API that fetches a list of posts into my app
const FetchGetRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook isolates the data fetching side effect
  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        /* use fetch() function to request post data from the resource endpoint 
        fetch function returns a promise that can either be resolved or rejected 
        
        using async/await with try/catch/finally to catch errors and manage the 
        loading state 
        could have also used the pure promise with then/catch/finally s*/
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=8`
        );
        /* promise return from the fetch() function only rejects on a network failure 
        use the response object to check for the HTTP status and throw a custom error message */
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        /* if promise resolves, handle the response within the try block 
        resolve the Response object to JSON format 
        .json() also returns a promise, so I wait for it until the promise 
          settles with the actual data */
        let postsData = await response.json();
        // update the data
        setData(postsData);
        // reset the error state
        setError(null);
        /* if the promise is rejected, handle the error within the catch block 
        it will use my custom message */
      } catch (err) {
        // update the error state
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForPosts();
  }, []);

  return (
    <div></div>
    /*
    <div className="flex">
      <div className="w-52 sm:w-80 flex justify-center items-center">
        {loading && <div className="text-xl font-medium">Loading posts...</div>}
        {error && <div className="text-red-700">{error}</div>}
        <ul>
          /* grab the data state, loop through the list, render the post title 
          {data &&
            data.map(({ id, title }) => (
              <li
                key={id}
                className="border-b broder-gray-100 text-sm sm:text-base"
              >
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses = "p-4 block hover:bg-gray-100";
                    return isActive
                      ? `${baseClasses} bg-gray-100`
                      : baseClasses;
                  }}
                  to={`/posts/${id}`}
                >
                  {title}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
      <div className="bg-gray-100 flex-1 p-4 min-h-[550px]">
        "Single post here..."
      </div>
    </div>
  */
  );
};

/* if I just need to fetch a bit of data once and forget about it, 
no I don't need anything, just a simple fetch in useEffect hook,
no external libraries necessary */
const Component = () => {
  const [data, setData] = useState();

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=8`)
      ).json();
      // set state when the data is received
      setData(data);
    };

    dataFetch();
  }, []);

  return <>...</>;
};

const Child = () => {
  useEffect(() => {
    // do something here, like fetching data for the Child
  }, []);
  return <div>Some child</div>;
};

const Parent = () => {
  // set loading to true initially
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) return "loading";
  /* Parent component conditionally renders Child component based on state 
  Child's useEffect and its fetch request are only triggered after Parent's
  isLoading state changes to false */
  return <Child />;
};

const ParentOne = () => {
  // set loading to true initially
  const [isLoading, setIsLoading] = useState(true);

  // child is here before return
  const child = <Child />;

  if (isLoading) return "loading";
  /* if isLoading is set to false, show Child 
  useEffect is Child will only be triggered when isLoading is false */
  return child;
};

// ApplicationOne will render Sidebar and Issue, and Issue will render Comments
const ApplicationOne = () => {
  // fetch is triggered in useEffect, as normal
  const { data } = useData("./get-sidebar");

  // show loading state while waiting for the data
  if (!data) return "loading";

  return (
    <>
      <Sidebar data={data} />
      <Issue />
    </>
  );
};

const Sidebar = () => {
  // some sidebar links
  return;
};

const Issue = () => {
  // fetch is triggered in useEffect, as normal
  const { data } = useData("./get-issue");

  // show loading state while waiting for the data
  if (!data) return "loading";

  // render actual issue now that the data is here
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <Comments />
    </div>
  );
};

const Comments = () => {
  // some issue comments
  // fetch is triggered in useEffect there, as normal
  const { data } = useData("/get-comments");

  // show loading state while waiting for the data
  if (!data) return "loading";

  // rendering comments now that I have access to them!
  return data.map((comment) => <div>{comment.title}</div>);
};

// extract the actual fetch, useEffect, and state management into a custom hook
const useData = (url) => {
  const [state, setState] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url)).json();

      setState(data);
    };

    dataFetch();
  }, [url]);

  return { data: state };
};

/* How to solve requests waterfall
Promise.all solution 
pull all data fetching requests as high in the render tree as possible 
need to fire all fetching requests at the same time, so that they are sent in parallel 
use Promise.all */
/* useEffect(async () => {
  const [sidebar, issue, comments] = await Promise.all([
    fetch("./get-sidebar"),
    fetch("/get-issue"),
    fetch("/get-comments"),
  ]);
}, []);

/* save all of them to state in the parent component and pass them down to the children
components as props */
const useAllData = () => {
  const [sidebar, setSidebar] = useState();
  const [comments, setComments] = useState();
  const [issue, setIssue] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      // waiting for all the things in parallel
      const result = (
        await Promise.all([
          fetch(sidebarUrl),
          fetch(issueUrl),
          fetch(commentdsUrl),
        ])
      ).map((r) => r.json());

      // and waiting a bit more - fetch API is cumbersome
      // destructure the result object
      const [sidebarResult, issueResult, commentsResult] =
        await Promise.all(result);

      // when the data is ready, save it to state
      setSidebar(sidebarResult);
      setIssue(issueResult);
      setComments(commentsResult);
    };

    dataFetch();
  }, []);

  return { sidebar, comments, issue };
};

const ApplicationTwo = () => {
  // all the fetches were triggered in parallel
  const { sidebar, comments, issue } = useAllData();

  // show loading state while waiting for all the data
  if (!sidebar || !comments || !issue) return "loading";

  // render the actual app here and pass data from state to children
  return (
    <>
      <Sidebar data={sidebar} />
      <Issue comments={comments} issue={issue} />
    </>
  );
};

/* Parallel promises solution 
if I don't want to wait for all the requests
fire all requests in parallel, but wait for them independently */
const useAllDataThree = () => {
  const [sidebar, setSidebar] = useState();
  const [comments, setComments] = useState();
  const [issue, setIssue] = useState();

  useEffect(() => {
    const dataFetch = () => {
      // use old-fashioned promises and save the data inside then callback
      /* every fetch request is fired in parallel but resolved independently 
      now I can render Sidebar and Issue as soon as their data ends up in 
      the state 
      causing state change three times independently, which will cause three
        re-render of the parent component */
      fetch("/get-sidebar")
        .then((data) => data.json())
        .then((data) => setSidebar(data));
      fetch("/get-issue")
        .then((data) => data.json())
        .then((data) => setIssue(data));
      fetch("/get-comments")
        .then((data) => data.json())
        .then((data) => setComments(data));
    };

    dataFetch();
  }, []);
};

const ApplicationThree = () => {
  // all the fetches were triggered in parallel
  const { sidebar, comments, issue } = useAllDataThree();

  // show loading state while waiting for sidebar
  if (!sidebar) return "loading";

  // render sidebar as soon as its data is available
  // but show loading state instead of issue and comments while I'm waiting for them
  return (
    <>
      <Sidebar data={sidebar} />
      {/* render local loading state for issue here if its data not available */}
      {/* inside Issue component I'd have to render 'loading' for empty comments as well */}
      {issue ? <Issue comments={comments} issue={issue} /> : "loading"}
    </>
  );
};

/* Data providers to abstract away fetching 
data provider - abstraction around data fetching that gives me the ability to fetch data in 
                one place of the app and access that data in another, bypassing all 
                components in between, like a mini-caching layer per request */
const ContextOne = createContext();

const CommentsDataProvider = ({ children }) => {
  const [comments, setComments] = useState();

  useEffect(async () => {
    fetch("/get-comments")
      .then((data) => data.json())
      .then((data) => setComments(data));
  }, []);

  return <ContextOne.Provider value={comments}>{children}</ContextOne.Provider>;
};

const useComments = () => useContext(ContextOne);

const ContextTwo = createContext();

const SidebarDataProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState();

  useEffect(async () => {
    fetch("/get-sidebar")
      .then((data) => data.json())
      .then((data) => setSidebar(data));
  }, []);

  return <ContextTwo.Provider value={sidebar}>{children}</ContextTwo.Provider>;
};

const useSidebar = () => useContext(ContextTwo);

const ContextThree = createContext();

const IssueDataProvider = ({ children }) => {
  const [issue, setIssue] = useState();

  useEffect(async () => {
    fetch("/get-issue")
      .then((data) => data.json())
      .then((data) => setIssue(data));
  }, []);

  return (
    <ContextThree.Provider value={issue}>{children}</ContextThree.Provider>
  );
};

const useIssue = () => useContext(ContextThree);

const ApplicationFour = () => {
  const sidebar = useSidebar();
  const issue = useIssue();

  // show loading state while waiting for sidebar
  if (!sidebar) return "loading";

  // no more props drilling for any of those
  return (
    <>
      <Sidebar />
      {issue ? <Issue /> : "loading"}
    </>
  );
};

/* three providers will wrap the ApplicationFour component and will fire fetching
requests as soon as they are mounted in parallel */
const VeryRootApp = () => {
  return (
    <SidebarDataProvider>
      <IssueDataProvider>
        <CommentsDataProvider>
          <ApplicationFour />
        </CommentsDataProvider>
      </IssueDataProvider>
    </SidebarDataProvider>
  );
};

/*
const Comments = () => {
  // Look! No props drilling!
  const comments = useComments();
};
*/

/* What would happen if I used the fetch promise to the very top, before I 
even declare CommentsOne component, and then just await that promise inside
useEffect hook 

*use this pattern when I am pre-fetching some critical resources on the router level
and when I am pre-fetching data in lazy-loaded components

my fetch call "escapes all React lifecycle
it will be fired, JS will move on to other things to process, and the data
will just sit there until someone actually resolves it */
const commentsPromise = fetch("/get-comments");

const CommentsOne = () => {
  useEffect(() => {
    const dataFetch = async () => {
      // just await the variable here
      const data = await (await commentsPromise).json();

      setState(data);
    };

    dataFetch();
  }, [url]);
};

const ApplicationFive = () => {
  return (
    <div>
      <Greeting />
    </div>
  );
};

export {
  App,
  Image,
  ImageOne,
  Application,
  FetchGetRequest,
  Component,
  Parent,
  ApplicationFive,
};

/* with React Router, I've only built client-side applications with 
interactive user interfaces, but if I want to fetch data from the internet
I need some way to get data from external sources and dynamically display it 
1. basics of making API calls
2. managing component state
3. handling async operations using JS's fetch function */

/* 
fetch(url, {
  method: "POST",
  // explicitly set the Content-Type in the headers
  headers: {
    "Content-Type": "application/json"
  },
  // stringly the object I want to pass to the request body
  body: JSON.stringify({})
})
*/

/* fetching logic can be extracted into a separate file
const getRequestWithNativeFetch = async (url) = {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json();
};

// useEffect looks like this
useEffect(() => {
  const fetchDataforPosts = async () => {
    try {
      const postsData = await getRequestWithNativeFetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=8'
      );
      setData(postsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  fetchDataForPosts();
}, []);

// I can fetch individual posts by appending the postId
useEffect(() => {
  /* utilize AbortController to cancel requests before subsequent ones
  are initiated 
  const controller = new AbortController();

  const fetchSinglePost = async () => {
    try {
      // fetch the single post data based on the dynamic URL post ID
      const postData = await getRequestWithNativeFetch(
        "https://jsonplaceholder.typicode.com/posts/${postId}",
        /* pass the controller's signal to the fetch function as an 
        optional parameter 
        controller.signal
      );
      // ...
    } catch (err) {
      // handle AbortError instances when requests are canceled
      if (err.name === "AbortError") {
        console.log("Aborted");
        return;
      }
    } finally {
    }
  };

  fetchSinglePost();
  // add dependencies in the array literal to trigger a rereun of useEffect
  /* when postId changes and triggers a re-fetch using useEffect, network
  responses may arrive in a different order than the requests were sent, 
  causing inconsistencies in the UI */
/* call abort function within the hook's cleanup phase 
  ensures requests are canceled properly even if the component unmounts
  while a fetch promise is pending 
  return () => controller.abort();
}, [postId]);

return (
  <>
    {/* loading and error JSX here...}
    <article>
      <h1 className="text-x1 md:text-2xl font-medium mb-6">{data?.title}</h1>
      <p>{data?.body}</p>
    </article>
  </>
);

// pass the signal to the fetch function
const getRequestWithNativeFetch = async (
  url,
  signal = null
) => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json();
}
*/

/* 
caching, request deduplication,
  and preventing race conditions

caching and other optimizations are simplified with TanStack Query and SWR 
*/

/* postRequestWithFetch function receives the data, stringifies it, and 
passes it to the request body 

this function can be reused anywhere in the app to perform a POST request 
const postRequestWithFetch = async (data) => {
  // performs a POST request using the fetch API
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    // data is converted to JSON and sent in the response body
    body: JSON.stringify(data),
  });

  return response.json();
};

/* POST request is used to send data to an endpoint
do so via the body of the request 
useEffect(() => {
  /* fetchDataForPosts handles the async operation waiting for 
  postRequestWithFetch to complete and potentially updating state 
  with the response 
  const fetchDataForPosts = async () => {
    try {
      /* calls postRequestWithFetch within the hook to send data to an 
      endpoint when the component mounts 
      supplies the data argument as an object 
      
      data is passed from useEffect to postRequestWithFetch 
      postRequestWithFetch processes the data and sends it to the server,
      returning the server's response 
      const postsData = await postRequestWithFetch({
        userId: 11,
        id: 101,
        title: "New post title",
        body: "The post body content",
      });
      // update state variables like before
    } catch (err) {
    } finally {
    }
  };
  fetchDataForPosts();
  // performs a POST request when the component renders for the first time
  return (
    <div className="py-12 px-3">
      <h2 className="text-2x1 font-medium mb-6 underline">
        Post Request with Fetch
      </h2>
      {/* loading and error JSX}
      {data && (
        <div>
          <h2 className="text-xl font-medium mb-6">{data.title}</h2>
          <p className="mb-2">{data.body}</p>
          <span className="text-gray-700 text-sm">
            Post ID: {data.id}
          </span>
        </div>
      )}
    </div>
  );
}, []);
*/
