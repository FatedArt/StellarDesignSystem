import React from "react";
import styles from "./InputField.module.css";

export type InputFieldSize = "sm" | "md" | "lg";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: InputFieldSize;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  requiredMark?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      helperText,
      errorText,
      size = "md",
      startAdornment,
      endAdornment,
      className,
      disabled,
      required,
      requiredMark = false,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(errorText);
    const fallbackId = React.useId();
    const inputId = id ?? fallbackId;
    const helperId = helperText || errorText ? `${inputId}-help` : undefined;

    return (
      <div className={[styles.field, className].filter(Boolean).join(" ")}>
        {label ? (
          <label className={styles.label} htmlFor={inputId}>
            {label}
            {(required || requiredMark) && <span className={styles.required}>*</span>}
          </label>
        ) : null}

        <div
          className={[
            styles.control,
            styles[size],
            disabled ? styles.disabled : "",
            hasError ? styles.error : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {startAdornment ? <span className={styles.prefix}>{startAdornment}</span> : null}
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            aria-describedby={helperId}
            disabled={disabled}
            required={required}
            {...props}
          />
          {endAdornment ? <span className={styles.suffix}>{endAdornment}</span> : null}
        </div>

        {helperId ? (
          <span id={helperId} className={styles.helperText}>
            {errorText ?? helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";
