import React, { Fragment, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./LoginPage.module.css";
import AuthContext from "../store/auth-context";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const authCtx = useContext(AuthContext);

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authCtx.onLogin(email, password).catch((error) => {
      console.log(error);
      setMessage(error.message);
    });
  };

  return (
    <div className="my-3 mx-auto text-center">
      {!authCtx.sessionExpired ? (
        <Fragment>
          <h2 className="display-4">Welcome</h2>
          <p style={{ fontSize: "1.1rem", fontWeight: "lighter" }}>
            Please log in to view the content.
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <h5 className="display-5">Session expired.</h5>
          <p style={{ fontSize: "1.1rem", fontWeight: "lighter" }}>
            Please log in again.
          </p>
        </Fragment>
      )}
      <Form className={styles.LoginForm} onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleEmailInputChange}
        />
        <Form.Control
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={handlePasswordInputChange}
        />
        <Button type="submit">Log in</Button>
        <div style={{ color: "red" }}>{message}</div>
      </Form>
    </div>
  );
};

export default LoginPage;
