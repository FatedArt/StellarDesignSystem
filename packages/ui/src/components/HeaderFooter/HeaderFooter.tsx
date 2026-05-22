import React from "react";
import styles from "./HeaderFooter.module.css";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  showTenant?: boolean;
  username?: string;
  role?: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  productName?: string;
  copyrightText?: string;
}

const DEFAULT_PRODUCT_NAME = "IntelliBron Threat Intel [VERSION]";
const DEFAULT_COPYRIGHT = "Copyright © 2024-present ITSEC Asia. All Rights Reserved";

const Mark = ({ compact = false }: { compact?: boolean }) => (
  <div className={compact ? styles.markCompact : styles.mark}>
    ITSEC
  </div>
);

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      showTenant = true,
      username = "Jacob Collier",
      role = "Analyst",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={[styles.header, className].filter(Boolean).join(" ")}
        {...props}
      >
        <Mark />
        <div className={styles.headerContent}>
          <div className={styles.searchField} role="search">
            Description
          </div>
          <button className={styles.iconButton} aria-label="Notifications" type="button">
            🔔
          </button>
          <div className={styles.verticalDivider} aria-hidden="true" />
          <div className={styles.account}>
            <div className={styles.avatar} aria-hidden="true" />
            <div className={styles.accountInfo}>
              <span className={styles.accountName}>{username}</span>
              <span className={styles.accountRole}>{showTenant ? role : ""}</span>
            </div>
          </div>
        </div>
      </header>
    );
  }
);

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      productName = DEFAULT_PRODUCT_NAME,
      copyrightText = DEFAULT_COPYRIGHT,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={[styles.footer, className].filter(Boolean).join(" ")}
        {...props}
      >
        <div className={styles.footerContent}>
          <span>{productName}</span>
          <span>{copyrightText}</span>
        </div>
        <Mark />
      </footer>
    );
  }
);

export const MobileHeader = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={[styles.mobileHeader, className].filter(Boolean).join(" ")}
        {...props}
      >
        <div className={styles.mobileHeaderTop}>
          <button className={styles.iconButton} aria-label="Open menu" type="button">
            ☰
          </button>
          <Mark />
          <button className={styles.iconButton} aria-label="Open quick actions" type="button">
            ＋
          </button>
        </div>
        <div className={styles.mobileActionBar}>
          <div className={styles.mobileSearchField}>Search</div>
          <div className={styles.mobileActionButtons}>
            <button className={styles.iconButton} type="button" aria-label="Notifications">
              🔔
            </button>
            <button className={styles.iconButton} type="button" aria-label="User profile">
              👤
            </button>
          </div>
        </div>
      </header>
    );
  }
);

export const MobileFooter = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      productName = DEFAULT_PRODUCT_NAME,
      copyrightText = DEFAULT_COPYRIGHT,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={[styles.mobileFooter, className].filter(Boolean).join(" ")}
        {...props}
      >
        <div className={styles.mobileFooterContent}>
          <span>{productName}</span>
          <span>{copyrightText}</span>
        </div>
        <Mark compact />
      </footer>
    );
  }
);

Header.displayName = "Header";
Footer.displayName = "Footer";
MobileHeader.displayName = "MobileHeader";
MobileFooter.displayName = "MobileFooter";
