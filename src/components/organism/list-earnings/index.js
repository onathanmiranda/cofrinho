import { useSelector, useDispatch } from "react-redux";

import Button from "../../atoms/button";
import EarningCard from "../../molecule/card-earning";

import { setFormEarning } from "../../../store/slices/modal";

import styles from "./styles.module.scss";

export default function EarningsList() {
  const dispatchEvent = useDispatch();
  const earnings = useSelector(({ earnings }) => earnings.items);

  function onAdd() {
    dispatchEvent(setFormEarning({ show: true }));
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.listTitle}>Receitas</h2>
      {earnings.map((earning) => (
        <EarningCard
          className={styles.earning}
          id={earning.id}
          key={earning.id}
        />
      ))}
      <Button className={styles.button} onClick={onAdd}>
        Adicionar Receita
      </Button>
    </section>
  );
}
