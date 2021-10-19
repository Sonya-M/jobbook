import styles from "./MenuItem.module.css";

export default function MenuItem(props) {
  return (
    <div className={styles.menuItem}>
      <span>{props.icon}</span>
      {/* <span className={styles.desc}>{props.desc}</span> */}
    </div>
  );
}
