import React from "react";
import styled from "styled-components";
/* CSS Modules do not pollute the global namespace
I compile them by importing them in my JS file */
import styles from "./App.module.css";

function App({ theme }) {
  console.log(styles);
  return (
    <div className={theme.outer}>
      <div className={theme.inner}>
        Inner color
        <div className={styles.container}>
          <h1 className={styles.title}>Hello, World!</h1>
          <p className={styles.description}>All is well over here.</p>
          <p className={styles.text}>Text with hover</p>
        </div>
      </div>
    </div>
  );
}

/* how to style a button-link component in React
this styled component can be imported anywhere and used directly to
build a functional component without having to worry about the styles 

the styles applied to the styled component are locally scoped 
I can add or remove CSS dynamically based on the props supplied to 
my component */
const StyledButton = styled.a`
  padding: 0.75em 1em;
  background-color: ${({ primary }) => (primary ? "#07c" : "#333")};
  color: white;

  &:hover {
    background-color: #111;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 1em;
`;

const AppOne = () => {
  return (
    <div className="App">
      <p>
        Demoing a CTA button and its variation styled with CSS-in-JS using
        styled-components library.
      </p>
      <BtnGroup>
        <StyledButton href="#">Default Button</StyledButton>
        <StyledButton primary href="#">
          Primary Button
        </StyledButton>
      </BtnGroup>
    </div>
  );
};

export { App, AppOne };
