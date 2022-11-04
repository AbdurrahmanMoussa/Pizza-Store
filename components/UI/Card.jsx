import styles from "../../styles/Card.module.css";

function Card(props) {
  //styled card to surround components
  return <div className={styles.card}>{props.children}</div>;
}

export default Card;
