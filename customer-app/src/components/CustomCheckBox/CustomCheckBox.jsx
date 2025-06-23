import styles from "./CustomCheckBox.module.scss";

import { useId } from "react";

export default function CustomCheckBox({
    inputName,
    labelText,
    fontSize,
    value,
    onChangeAction,
}) {
    const customCheckBoxId = useId();

    return (
        <div className={styles.checkbox_container}>
            <input
                type="checkbox"
                name={inputName}
                id={customCheckBoxId}
                value={value}
                onChange={onChangeAction}
            />
            <label htmlFor={customCheckBoxId} style={{ fontSize: fontSize }}>
                {labelText}
            </label>
        </div>
    );
}
