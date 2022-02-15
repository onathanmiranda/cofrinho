import { useSelector } from "react-redux";

import formatCurrency from "../../../helpers/formatCurrency";

import styles from "./styles.module.scss";

export default function Summary() {
  const { totalSpent } = useSelector(({ expenses }) => expenses);
  const { totalEarned } = useSelector(({ earnings }) => earnings);
  const { totalLeftOver } = useSelector(({ leftovers }) => leftovers);

  const totalAvailable = totalEarned + totalLeftOver;
  const totalLasting = totalAvailable - totalSpent;

  const totalAvailableNegativeClassName =
    totalAvailable < 0 ? styles.negative : "";
  const totalLastingNegativeClassName = totalLasting < 0 ? styles.negative : "";

  return (
    <header className={styles.header}>
      <data
        className={`${styles.totalLasting} ${totalLastingNegativeClassName}`}
        value={totalLasting}
      >
        {formatCurrency(totalLasting)}
      </data>
      <data
        className={`${styles.totalAvailable} ${totalAvailableNegativeClassName}`}
        value={totalAvailable}
      >
        {formatCurrency(totalAvailable)}
      </data>
    </header>
  );
}
