import { Link, withRouter, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import FormRegister from "../../molecule/form-register";

import styles from "./styles.module.scss";

export default withRouter((props) => {
  const user = useSelector(({ user }) => user.data);

  return (
    <>
      {!user && (
        <section className={styles.section}>
          <h1 className={styles.h1}>
            Bem-vindo ao
            <br />
            <span className={styles.appName}>Cofrinho</span>
          </h1>
          <h2 className={styles.h2}>Comece criando uma conta:</h2>
          <FormRegister />
          <p className={styles.p}>
            Já possui uma conta?{" "}
            <Link className={styles.link} to="/login">
              Clique aqui para fazer login
            </Link>
            .
          </p>
        </section>
      )}
      {user && <Redirect to="/overview" />}
    </>
  );
});
