import { useEffect, useState } from "react";

const initialData = {
    title: "",
    author: "",
    status: false,
    category: "",
    tags: [],
};

// select
const categories = ["web development", "front-end", "css"];
// checkbox
const tags = [
    "javascript",
    "html",
    "css",
    "python",
    "java",
    "c++",
    "php",
    "ruby",
    "sql",
    "xml",
];

function App() {
    // states
    const [formData, setFormData] = useState(initialData);
    const [cards, setCards] = useState([]);

    // actions
    const handleSubmit = (e) => {
        console.log("test");
        e.preventDefault();
        setCards([...cards, formData]);
        setFormData(initialData);
    };

    const handleInputChange = (e) => {
        // console.log(e.target);
        const { type, name, value, checked } = e.target;
        const KEY = name;
        const VAL = type == "checkbox" ? checked : value;
        if (name == "tags") {
            setFormData({
                ...formData,
                [name]: [...formData.tags, value],
            });
        } else {
            setFormData({ ...formData, [KEY]: VAL });
        }
    };

    const handleCheckboxChange = (e) => {
        console.log(e.target);
    };

    const handleRemoveClick = (e) => {
        const cardId = e.target.closest("li").id;
        const nuoveCards = cards.filter((card, index) => index != cardId);
        setCards(nuoveCards);
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <>
            {/* Header */}
            <header>
                <h1 className="p-3 text-6xl text-center uppercase bg-red-300">
                    sono un titolo
                </h1>
            </header>
            {/* Main */}
            <main className="flex flex-wrap">
                {/* Form */}
                <section className="w-1/5 p-4 bg-green-300">
                    <form
                        action="#"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* Input */}
                        <input
                            type="text"
                            name="title"
                            className="p-4 border border-blue-300"
                            onChange={handleInputChange}
                            value={formData.title}
                            placeholder="Titolo"
                            required
                        />
                        <input
                            type="text"
                            name="author"
                            className="p-4 border border-blue-300"
                            onChange={handleInputChange}
                            value={formData.author}
                            placeholder="Autore"
                            required
                        />
                        {/* SelectCategory */}
                        <select
                            name="category"
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {tags.map((tag, index) => (
                            <div key={index} className="flex gap-2">
                                <label htmlFor={tag}>{tag}</label>
                                <input
                                    name="tags"
                                    type="checkbox"
                                    value={tag}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}

                        <div className="flex gap-2">
                            <label htmlFor="status">Articolo pubblicato?</label>
                            <input
                                type="checkbox"
                                name="status"
                                className="p-4 border border-blue-300"
                                onChange={handleInputChange}
                                checked={formData.status}
                            />
                        </div>
                        <button type="submit" className="px-4 bg-blue-300 y-2">
                            Invia
                        </button>
                    </form>
                </section>
                {/* CardWrapper */}
                <section className="w-4/5 p-4">
                    <ul className="flex flex-wrap gap-2">
                        {cards.map((card, index) => (
                            <li
                                className="p-4 bg-blue-300"
                                key={index}
                                id={index}
                            >
                                <div className="flex flex-col">
                                    <span>Titolo: {card.title}</span>
                                    <span>Author: {card.author}</span>
                                    <span>Category: {card.category}</span>
                                    <div>
                                        Tags:
                                        {card.tags.map((tag, index) => (
                                            <div key={index}>{tag}</div>
                                        ))}
                                    </div>
                                    <span>
                                        Status:{" "}
                                        {card.status ? "Pubblicato" : "Bozza"}
                                    </span>
                                    <span
                                        onClick={handleRemoveClick}
                                        className="text-red-500 cursor-pointer hover:scale-105"
                                    >
                                        x
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
}

export default App;
