export default function Checkbox({ name, value, checked, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            onChange={(e) => handleChange(e)}
        />
    );
}
