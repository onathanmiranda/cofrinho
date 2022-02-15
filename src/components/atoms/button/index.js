import styles from "./styles.module.scss";

export default function Button(props) {
  return (
    <button
      {...props}
      className={`${styles.button} ${props.className || ""}`}
    />
  );
}
