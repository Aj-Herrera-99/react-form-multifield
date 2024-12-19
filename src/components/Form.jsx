import { categories, tags } from "../App";
import TextField from "./TextField";
import CheckboxField from "./CheckboxField";

function Form({ formData, tagsListChecked, handleSubmit, handleInputChange }) {
    return (
        <form
            action="#"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 my-4"
        >
            <TextField
                name="title"
                value={formData.title}
                placeholder="Inserisci titolo"
                handleInputChange={handleInputChange}
            />
            <TextField
                name="author"
                value={formData.author}
                placeholder="Inserisci autore"
                handleInputChange={handleInputChange}
            />
            {/* SelectCategory */}
            <select
                className="p-2 rounded-md"
                name="category"
                onChange={handleInputChange}
                value={formData.category}
                required
            >
                {/* questa prima option ha solo valore di placeholder */}
                <option value="">Seleziona categoria</option> 
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <div className="p-3 text-white rounded-lg bg-stone-800">
                <h4 className="p-2 text-xl font-semibold rounded-md">
                    Seleziona i tags
                </h4>
                <ul className="grid grid-cols-3 my-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
                    {tags.map((tag, index) => (
                        <CheckboxField
                            key={index}
                            index={index}
                            id={tag}
                            name="tags"
                            value={tag}
                            checked={tagsListChecked[index]}
                            handleInputChange={handleInputChange}
                        >
                            {tag}
                        </CheckboxField>
                    ))}
                </ul>
            </div>

            <CheckboxField
                id="status"
                name="status"
                checked={formData.status}
                handleInputChange={handleInputChange}
            >
                Vuoi pubblicare l'articolo?
            </CheckboxField>

            <button type="submit" className="px-4 py-4 text-lg font-bold tracking-widest text-white uppercase rounded-full white bg-stone-900 y-2 hover:bg-stone-950">
                Invia
            </button>
        </form>
    );
}

export default Form;
