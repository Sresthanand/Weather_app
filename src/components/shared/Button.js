export default function Button({ textValue, classes, onClick }) {
  return (
    <button onClick={onClick} className={classes}>
      {textValue}
    </button>
  );
}
