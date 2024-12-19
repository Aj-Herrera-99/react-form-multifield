function CheckboxField({children, index, id, name, value, checked, handleInputChange}) {
    return (
        <li className="flex justify-between gap-1 px-3 py-2 text-white rounded-md bg-stone-900">
            <label className="grow" htmlFor={id}>
                {children}
            </label>
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
