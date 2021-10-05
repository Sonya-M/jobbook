import React, { Fragment } from "react";

import styles from "./NavWrapper.module.css";

export default function NavWrapper(props) {
  return (
    <header>
      <nav>
        <h2 className={styles.title}>{props.title}</h2>
        {props.menu ? (
          <ul>
            {props.menu.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        ) : null}
      </nav>
    </header>
  );
}
