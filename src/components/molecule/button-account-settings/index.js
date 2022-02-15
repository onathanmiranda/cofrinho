import { useDispatch } from "react-redux";
import { AccountBalanceWallet } from "@material-ui/icons";

import Button from "../../atoms/button";

import { setFormManageAccounts } from "../../../store/slices/modal";

import styles from "./styles.module.scss";

export default function ButtonAccountSettings() {
  const dispatchEvent = useDispatch();

  function handleOnClick() {
    dispatchEvent(setFormManageAccounts({ show: true }));
  }

  return (
    <Button className={styles.floatingButton} onClick={handleOnClick}>
      <AccountBalanceWallet className={styles.icon} />
    </Button>
  );
}
