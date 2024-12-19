function CheckboxField({children, index, id, name, value, checked, handleInputChange}) {
    return (
        <li className="flex justify-between gap-1 p-2 bg-green-100 rounded-md">
            <label className="grow" htmlFor={id}>{children}</label>
            <input
                type="checkbox"
                tagindex={index}
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={handleInputChange}
            />
        </li>
    );
}

export default CheckboxField;
