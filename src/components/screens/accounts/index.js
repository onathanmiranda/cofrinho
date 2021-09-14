import { useParams } from "react-router";
import { Link } from "react-router-dom";

import Timeline from "../../organism/timeline";

import useAccount from "../../../hooks/useAccount";

import styles from './styles.module.scss'

export default function Accounts(){

  const id = parseInt(useParams().id);

  const account = useAccount(id);

  console.log(account)
  return (
    <div className={styles.wrapper}>
      <Link to="/overview">Voltar</Link>
      <Timeline />
    </div>
  )
}