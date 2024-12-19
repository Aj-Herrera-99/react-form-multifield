function TextField({ name, value, placeholder, handleInputChange }) {
    return (
        <input
            className="px-4 py-3 border border-blue-300 rounded-md"
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={handleInputChange}
            // required
        />
    );
}

export default TextField;
