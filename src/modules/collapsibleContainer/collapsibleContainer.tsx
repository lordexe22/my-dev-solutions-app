// src/components/Collapsible.tsx
import { useState } from "react";
import styles from "./collapsibleContainer.module.css";
import type { CollapsibleProps } from "./collapsibleContainer.d";


const Collapsible = ({ title, children }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.title}>{title}</span>
        <span
          className={`${styles.icon} ${isOpen ? styles.open : ""}`}
        >
          ▶
        </span>
      </button>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Collapsible;
