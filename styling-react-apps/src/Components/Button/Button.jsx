import styles from "./Button.module.css";

/* Button component accepts a type value as a prop
the type will determine the class name applied to the button element
if the button is a submit button, class name will be "submit"
if the button is a error button, class name will be "error" */
export default function Button({ type = "secondary", label = "Button" }) {
  return <button className={styles[type]}>{label}</button>;
}
