import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputEmail from "../../atoms/input-email";
import InputPassword from "../../atoms/input-password";
import Button from "../../atoms/button";

import { cleanUpErrors, login } from "../../../store/slices/user";

import styles from "./styles.module.scss";

export default function FormRegister(props) {
  const user = useSelector(({ user }) => user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInputRef = useRef();

  const dispatchEvent = useDispatch();

  const onChangeEmail = (e) => {
    dispatchEvent(cleanUpErrors());
    emailInputRef.current.setCustomValidity("");
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    dispatchEvent(cleanUpErrors());
    emailInputRef.current.setCustomValidity("");
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatchEvent(login({ email, password }));
  };

  useEffect(() => {
    if (user.error) {
      emailInputRef.current.setCustomValidity(user.error.message);
      emailInputRef.current.reportValidity();
    }
  }, [user]);

  const invalidCredentialsClassName = user.error ? styles.invalidInput : "";

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <InputEmail
          ref={emailInputRef}
          className={`${styles.input} ${invalidCredentialsClassName}`}
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={onChangeEmail}
          required={true}
        />
        <InputPassword
          className={`${styles.input} ${invalidCredentialsClassName}`}
          placeholder="Senha"
          name="password"
          value={password}
          onChange={onChangePassword}
          required={true}
        />
        <Button className={styles.cta} type="submit">
          Login
        </Button>
      </form>
    </>
  );
}
