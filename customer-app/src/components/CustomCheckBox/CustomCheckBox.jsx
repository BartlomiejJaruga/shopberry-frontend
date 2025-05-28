import styles from "./CustomCheckBox.module.scss";

import { useId } from "react";

export default function CustomCheckBox({ inputName, labelText, fontSize }) {
    const customCheckBoxId = useId();

    return (
        <div className={styles.checkbox_container}>
            <input type="checkbox" name={inputName} id={customCheckBoxId}></input>
            <label htmlFor={customCheckBoxId} style={{ fontSize: fontSize }}>{labelText}</label>
        </div>
    );
}