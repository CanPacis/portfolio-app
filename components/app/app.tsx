import { Input } from "components/input";
import { Screen } from "components/screen";
import { useEffect } from "react";

import styles from "./styles.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <Screen />
      <Input />
    </div>
  );
}
