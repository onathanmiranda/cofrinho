import { Link, withRouter, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import FormLogin from "../../molecule/form-login";

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
          <h2 className={styles.h2}>Faça login:</h2>
          <FormLogin />
          <p className={styles.p}>
            Não possui uma conta?{" "}
            <Link className={styles.link} to="/register">
              Clique aqui para criar
            </Link>
            .
          </p>
        </section>
      )}
      {user && <Redirect to="/overview" />}
    </>
  );
});
