import React from "react";
import styles from "./Listview.module.css";

// ---------------------------
// Listview
// ---------------------------
export const Listview = ({ children }: { children: React.ReactNode }) => {
  return <ul className={styles.listview}>{children}</ul>;
};

// ---------------------------
// ListviewHeader
// ---------------------------
export const ListviewHeader = ({ children }: { children: React.ReactNode }) => {
  return <li className={styles.header}>{children}</li>;
};

// ---------------------------
// ListviewItem
// ---------------------------
export const ListviewItem = ({ children }: { children: React.ReactNode }) => {
  return <li className={styles.item}>{children}</li>;
};
