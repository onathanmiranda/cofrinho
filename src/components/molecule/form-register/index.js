import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputText from "../../atoms/input-text";
import InputEmail from "../../atoms/input-email";
import InputPassword from "../../atoms/input-password";
import Button from "../../atoms/button";

import { postUser, cleanUpErrors } from "../../../store/slices/user";

import styles from "./styles.module.scss";

export default function FormRegister(props) {
  const user = useSelector(({ user }) => user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordsAreDifferent, setPasswordsAreDifferent] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();

  const dispatchEvent = useDispatch();

  const onChangeFirstName = (e) => setFirstName(e.target.value);
  const onChangeLastName = (e) => setLastName(e.target.value);
  const onChangeEmail = (e) => {
    dispatchEvent(cleanUpErrors());
    emailInputRef.current.setCustomValidity("");
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    passwordConfirmationInputRef.current.setCustomValidity("");
    passwordInputRef.current.setCustomValidity("");
    setPasswordsAreDifferent(false);
    setPassword(e.target.value);
  };
  const onChangePasswordConfirmation = (e) => {
    passwordInputRef.current.setCustomValidity("");
    setPasswordsAreDifferent(false);
    setPasswordConfirmation(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (password !== passwordConfirmation) {
      passwordConfirmationInputRef.current.setCustomValidity(
        "As senhas estão diferentes."
      );
      passwordConfirmationInputRef.current.reportValidity();
      setPasswordsAreDifferent(true);
      return;
    }

    if (password.length < 8) {
      passwordInputRef.current.setCustomValidity(
        "A senha deve possuir no mínimo 8 caracteres."
      );
      passwordInputRef.current.reportValidity();
      return;
    }

    if (password.length > 16) {
      passwordInputRef.current.setCustomValidity(
        "A senha deve possuir até 16 caracteres."
      );
      passwordInputRef.current.reportValidity();
      return;
    }

    dispatchEvent(postUser({ firstName, lastName, email, password }));
  };

  useEffect(() => {
    if (user.error) {
      emailInputRef.current.setCustomValidity(user.error.message);
      emailInputRef.current.reportValidity();
    }
  }, [user]);

  const passwordsMismatchingClassName = passwordsAreDifferent
    ? styles.invalidInput
    : "";

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <InputText
          className={styles.input}
          placeholder="Nome"
          name="firstName"
          value={firstName}
          onChange={onChangeFirstName}
          required={true}
        />
        <InputText
          className={styles.input}
          placeholder="Sobrenome"
          name="lastName"
          value={lastName}
          onChange={onChangeLastName}
          required={true}
        />
        <InputEmail
          ref={emailInputRef}
          className={styles.input}
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={onChangeEmail}
          required={true}
        />
        <InputPassword
          ref={passwordInputRef}
          className={`${styles.input} ${passwordsMismatchingClassName}`}
          placeholder="Senha"
          name="password"
          value={password}
          onChange={onChangePassword}
          required={true}
        />
        <InputPassword
          ref={passwordConfirmationInputRef}
          className={`${styles.input} ${passwordsMismatchingClassName}`}
          placeholder="Confirmação de Senha"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={onChangePasswordConfirmation}
          required={true}
        />
        <Button className={styles.cta} type="submit">
          Enviar
        </Button>
      </form>
    </>
  );
}
