import { useState } from "react";
import Decimal from "decimal.js";

import styles from "./styles.module.scss";

export default function PercentageInput(props) {
  const [focus, set_focus] = useState(false);
  const [stagedValue, setStagedValue] = useState(false);

  const onChange = (e) => {
    let { value } = e.target;
    value = value
      ? value
          .replaceAll(",", ".")
          .match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/g)[0]
      : "0";
    const lastValueCharacter = value.substr(value.length - 1);
    if (lastValueCharacter === ".") {
      setStagedValue(value);
      return;
    } else {
      value = new Decimal(value);
      value = value.dividedBy(100).toFixed(5).toString();
      value = parseFloat(value).toFixed(5);
      value = isNaN(value) ? 0 : value;
      value = value > 1 ? props.value : value;
      props.onChange(value);
      setStagedValue(false);
    }
  };

  const formattedValue = stagedValue
    ? stagedValue
    : new Decimal(props.value).times(100).toString();

  const focusClassName = focus ? styles.focus : "";

  function handleFocus() {
    set_focus(true);
  }

  function handleBlur() {
    set_focus(false);
  }

  return (
    <div
      className={`${styles.inputWrapper} ${
        props.className || ""
      } ${focusClassName}`}
    >
      {formattedValue}
      <span className={`${styles.cursor} ${focusClassName}`}>|</span>
      %
      <input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${styles.input}`}
        value={formattedValue}
        onChange={onChange}
        name={props.name}
        type="text"
      />
    </div>
  );
}
