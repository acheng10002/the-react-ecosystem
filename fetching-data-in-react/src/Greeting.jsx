import styles from "./Greeting.module.css";

const Greeting = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello, Vite + React!</h1>
      <p className={styles.description}>
        This is a simple React component styled with a CSS module.
      </p>
      <div className={styles.composesWithTitle}>placeholder text</div>
    </div>
  );
};

export default Greeting;
