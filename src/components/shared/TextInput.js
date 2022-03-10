export default function TextInput({ value, onChange, classes, placeholder }) {
  return (
    <input
      className={`p-2 rounded-lg ${classes}`}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
