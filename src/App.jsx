import { useState, Component } from "react";
import { Link } from "react-router-dom";
import Child from "./Child";
/* PropTypes utility was moved to package called prop-types in later React versions */
import PropTypes from "prop-types";
import "./App.css";

function App() {
  return (
    <>
      <div></div>
    </>
  );
}

/* how propTypes would be used in a component that renders out a name prop 
RenderName expects to receive a prop called name, which is a string */
const RenderName = (props) => {
  return <div>{props.name}</div>;
};

/* to run typechecking on the component props, assign the special
propTypes property */
RenderName.propTypes = {
  /* if the prop is not a string, a warning will be displayed 
  if I want to make sure a prop is being passed in, use isRequired */
  name: PropTypes.string.isRequired,
};

/* with defaultProps property, defines a default value for the name prop
for when RenderName is called without passing in the name prop 
this will be removed from function components
will need to use JS default parameters instead 

default values are also subject to the prop type definitions */
RenderName.defaultProps = {
  name: "Zach",
};

/* if I do decide to learn TyepScript, pick up a previous project and
refactor the components one by one to TypeScript 

for type checking within React, TypeScript is out of scope */

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
};

Greeting.defaultProps = {
  name: "Stranger",
};

/* PropTypes exports a range of validators that can be used to make sure 
the data I receive is valid
*** propTypes is only checked in dev mode */
class MyComponent extends Component {
  render() {
    const children = this.props.children;
    return (
      <div>
        <div>{children}</div>
        <div>{props.prop}</div>
      </div>
    );
  }
}

MyComponent.propTypes = {
  /* BASIC TYPES - I can declare that a prop is a specific JS type. By default, these
  are all optional */
  optionalAny: PropTypes.any,
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // RENDERABLE TYPES
  /* ensures that React can render the value passed to a prop
  anything that can be rendered: numbers, strings, elements or an array
  (or fragment) containing these types */
  optionalNode: PropTypes.node,
  // a React element
  optionalElement: PropTypes.element,
  // a React element type (ie. MyComponent)
  optionalElementType: PropTypes.elementType,

  /* INSTANCE TYPE 
  I can also declare that a prop is an instance of a JS class
  this uses JS's instanceof operator */
  // optionalMessage: PropTypes.instanceOf(Message),

  /* MULTIPLE TYPES 
  allowing a limited set of values or multiple sets of data types for
  a prop 
  I can ensure that my prop is limited to specific values by treating
  it as an enum */
  optionalEnum: PropTypes.oneOf(["News", "Photos"]),
  // An object that could be one of a specified set of types, like a union of types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    // PropTypes.instanceOf(Message),
  ]),

  /* COLLECTION TYPES 
  an array of a certain type 
  ensures that the prop is an array in which all items match the specified type */
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
  /* an object with property values of a certain type 
  ensures that the prop is an object in which all property values match the specified type */
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  /* an object taking on a particular shape 
  ensures the prop is an object containing a set of specified keys with values of specified types */
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),

  /* an object with warnings on extra properties 
  for string or exact object matching 
  get a warning if extra properties exist in a component */
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number,
  }),

  /* REQUIRED TYPES
  I can chain any of the above with `isRequired` to make sure a warning
  is shown if the prop isn't provided */
  requiredFunc: PropTypes.func.isRequired,
  // a required value of any data type
  requiredAny: PropTypes.any.isRequired,

  /* CUSTOM VALIDATORS 
  BASIC CUSTOM VALIDATIORS
  I can also specify a custom validator
  It should return an Error object if the validation fails
  Don't `console.warn` or throw, as this won't work inside `oneOfType` 
  props - object containing all props passed to the component
  propName - name of the prop to be validated
  componentName */
  customProp: function (props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        "Invalid prop `" +
          propName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Validation failed."
      );
    }
  },
  /* I can use custom validation with PropTypes.oneOfType
Component.propTypes = {
  email: PropTypes.oneOfType([
    isEmail,
    PropTypes.shape({
      address: isEmail
    })
  ])
}

these would be valid
<Component email="glad@me.com" />
<Component email={{ address: 'glad@me.com' }} />
*/

  /* CUSTOM VALIDATORS AND COLLECTIONS
  I can also supply a custom validator to `arrayOf` and `objectOf`.
  It should return an Error object if the validation fails
  The validator will be called for each key in the array or object
  5 arguments -
  propValue - the array or object itself, 
  key - current item's key 
  componentName 
  location - location of the validated data, usually prop
  propFullName - fully resolved name of the current item being validated 
                 for an array, it would be array[index] 
                 for an object, it will be object.key */
  customArrayProp: PropTypes.arrayOf(
    function (propValue, key, componentName, location, propFullName) {
      if (!/matchme/.test(propValue[key])) {
        return new Error(
          "Invalid prop `" +
            propFullName +
            "` supplied to" +
            " `" +
            componentName +
            "`. Validation failed."
        );
      }
    }
  ),

  /* isEmail custom validation function for use with collection types 
const isEmail = function(propValue, key, componentName, location, propFullName) {
  const regex = /^((([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,})))?$/;

  if (!regex.test(propValue[key])) {
    return new Error(`Invalid prop `${propFullName}` passed to `${componentName}`. Expected a valid email address.`);
  }
}

Component.propTypes = {
  emails: PropTypes.arrayOf(isEmail)
} 
  */

  /* with PropTypes.element, I can specify that only a single child can be
  passed to a component as children 
  if the component has no children or multiple children, a warning is 
  displayed on the console */
  children: PropTypes.element.isRequired,
};

/* It should return an Error object if the validation fails
Don't `console.warn` or throw, as this won't work inside `oneOfType` */
function ComponentOne() {
  //
}

/*
const isEmail = function (props, propName, componentName) {
  const regex =
    /^((([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,})))?$/;
  if (!regex.test(props[propName])) {
    return new Error(
      `Invalid prop ${propName} passed to ${componentName}. Expected a valid email address.`
    );
  }
};
turn this custom validation function into an all-purpose validator */
const isEmail = function (
  propValue,
  key,
  componentName,
  location,
  propFullName
) {
  /* prop variable returns either the propFullName or the key
  my custom validator can either be used on its own ow with collections 
  get the resolved prop name based on the validator usage */
  const prop = location && propFullName ? propFullName : key;

  const regex =
    /^((([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,})))?$/;

  if (!regex.test(propValue[key])) {
    return new Error(
      `Invalid prop ${prop} passed to ${componentName}. Expected a valid email address.`
    );
  }
};

ComponentOne.propTypes = {
  email: PropTypes.oneOfType([
    isEmail,
    PropTypes.shape({
      address: isEmail,
    }),
  ]),
  emails: PropTypes.arrayOf(isEmail),
};

function ComponentTwo() {
  //
}

ComponentTwo.propTypes = {
  email: isEmail,
  fullName: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};

function HelloWorldComponent({ name }) {
  return <div>Hi, {name}</div>;
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string,
};

/* ALL-PURPOSE CUSTOM VALIDATORS */

/* Math.max takes two or more arguments and returns the largest value among them
enforces a lower bound on a value to enture that total does not drop below a
min acceptable threshold, in this case, 0 */
function PercentageStat({ label, score = 0, total = Math.max(1, score) }) {
  return (
    <div>
      <h6>{label}</h6>
      <span>{Math.round((score / total) * 100)}%</span>
    </div>
  );
}

/* checks if a value is numeric
either a finite number of a numeric string */
function isNumeric(value) {
  const regex = /^(\+|-)?((\d*\.?\d+)|(\d+\.?\d*))$/;
  return (
    /* Number.isFinite(value) returns true for numbers that are neither 
    infinity, -infinity, not NaN 
    second part ensures value is a string and tests whether the value matches the regex */
    Number.isFinite(value) || (typeof value === "string" && regex.test(value))
  );
}

/* checks if value is non-zero */
function isNonZero(value) {
  /* + converts value to a numeric type
  if the conversion fails, the result is NaN
  true if +value is not zero, false if the numeric value zero */
  return +value !== 0;
}

/* takes test functions as arguments and returns a custom validation function
each function passed in as argument is expected to take a value argument 
expected to accept a value and return a Boolean if it passes the validation
all tests must pass for the custom validator to be marked as passed 

function accepts a rest parameter, ...validators, which collects all arguments
passed to the function into an validators array 
each validator is a function that validates a prop value */
function validatedType(...validators) {
  /* returns a new validation function and the functions takes 3 arguments
  props - object containing all props passed to the component
  propName - string that is the name of the prop being  validated
  componentName - string containing the name of the component for error messages */
  return function (props, propName, componentName) {
    // gets value of the specific prop being validated
    const value = props[propName];
    // calls every on the validators array to check if all validators pass for value
    const valid = validators.every((validator) => {
      // ensure each validator is a valid function and prevents runtime errors
      if (typeof validator === "function") {
        // invokes validator with value
        const result = validator(value);
        /* validates the result returned by validator 
        ensures result is boolean and only considers it valid if it returns true */
        return typeof result === "boolean" && result;
      }
      // if validator is not a function, automatically fails validation by returning false
      return false;
    });

    // if any validator fails, valid variable will be false
    if (!valid) {
      /* return an error, with message specifying the name of the invalid prop
      and the name of the component where the validation failed
      warning in the console */
      return new Error(
        `Invalid prop ${propName} passed to ${componentName}. Validation failed.`
      );
    }
  };
}

// set the propTypes for the component
PercentageStat.propTypes = {
  label: PropTypes.string.isRequired,
  score: validatedType(isNumeric),
  total: validatedType(isNumeric, isNonZero),
};

function Application() {
  return (
    <div>
      <h1>Male Population</h1>
      <div>
        <PercentageStat label="Class 1" total={360} score={203} />
        {/* default values are set for the score and total props in case they
        are not provided 
        label is expected to be a string, score and total are required to be 
        numeric */}
        <PercentageStat label="Class 2" total={206} score={206} />
        <PercentageStat label="Class 3" total={206} score={107} />
        <PercentageStat label="Class 4" total={206} score={0} />
        {/* PercentageStat component with invalid props 
        <PercentageStat label="Class 1" total="0" score={203} />
        <PercentageStat label="Class 2" total={0} />
        <PercentageStat label="Class 3" score={f => f} />
        <PercentageStat label="Class 4" total={{}} score="0" />
        */}
      </div>
    </div>
  );
}

// functional components
function ReactComponent(props) {
  // render logic
}

ReactComponent.propTypes = {
  // prop type definitions
};

// class component - method 1
class ReactComponentOne extends Component {
  // component class body
}

ReactComponentOne.propTypes = {
  // prop type definitions
};

// class component - method 2, using static class properties
class ReactComponentTwo extends Component {
  // component class body

  static propTypes = {
    // prop type definitions
  };
}

/* props passed to a component are checked against the type definitions
configured in the propTypes property, and when an invalid value is pass in,
a warning is displayed on the console */

const AppOne = () => {
  return (
    <div>
      <h1>Hello from the parent page of the app!</h1>
      <p>Here is an example of a link to another page</p>
      <nav>
        <ul>
          <li>
            {/* React Router exports a custom Link element, to be used
            instead of the regular a tag 
            and with Link, I don't get the browser reloading every time 
            I click the link on the navbar */}
            <div>
              <Link to="child">Child page</Link>
            </div>
            <div>
              <Link to="grandparent">Grandparent page</Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export {
  App,
  RenderName,
  Greeting,
  HelloWorldComponent,
  Application,
  Child,
  AppOne,
};
