import React from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "tonal"
  | "text"
  | "destruction"
  /** @deprecated Use `text` instead */
  | "ghost"
  /** @deprecated Use `destruction` instead */
  | "danger";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const LEGACY_VARIANT_MAP: Record<string, ButtonVariant> = {
  ghost: "text",
  danger: "destruction",
};

function resolveVariant(variant: ButtonVariant): Exclude<ButtonVariant, "ghost" | "danger"> {
  return (LEGACY_VARIANT_MAP[variant] ?? variant) as Exclude<
    ButtonVariant,
    "ghost" | "danger"
  >;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedVariant = resolveVariant(variant);

    return (
      <button
        ref={ref}
        className={[
          styles.button,
          styles[resolvedVariant],
          styles[size],
          loading ? styles.loading : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={disabled || loading}
        {...(loading ? { "aria-busy": true } : {})}
        data-variant={resolvedVariant}
        data-size={size}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
