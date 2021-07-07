import React from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "./FormsControls.module.css";

export const TextArea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <textarea {...input} {...props}></textarea>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input} {...props}></input>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}