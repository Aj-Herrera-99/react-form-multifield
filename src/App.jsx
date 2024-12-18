import { useEffect, useState } from "react";

const initialData = {
    title: "",
    author: "",
    status: false,
    category: "",
};

// select
const categories = ["web development", "front-end", "css"];
// checkbox
const tags = ["html", "css"];

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
        setFormData({ ...formData, [KEY]: VAL });
    };

    const handleSelectChange = (e) => {
        console.log(e.target.value.name);
        console.log(e.target.value.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRemoveClick = (e) => {
        // console.log(e.target.closest("li"));
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
            <main>
                {/* Form */}
                <section className="bg-green-300">
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
                        />
                        <input
                            type="text"
                            name="author"
                            className="p-4 border border-blue-300"
                            onChange={handleInputChange}
                            value={formData.author}
                            placeholder="Autore"
                        />
                        {/* / select const category = ["web development",
                        "front-end", "css"]; */}
                        {/* Select */}
                        <select name="category" onChange={handleSelectChange}>
                          <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="status">Articolo pubblicato?</label>
                        <input
                            type="checkbox"
                            name="status"
                            className="p-4 border border-blue-300"
                            onChange={handleInputChange}
                            checked={formData.status}
                        />
                        <button type="submit" className="px-4 bg-blue-300 y-2">
                            Invia
                        </button>
                    </form>
                </section>
                {/* CardWrapper */}
                <section className="">
                    <ul className="flex flex-wrap gap-2 my-3">
                        {cards.map((card, index) => (
                          <li
                                className="p-4 bg-blue-300"
                                key={index}
                                id={index}
                            >
                              {console.log(card.category)}
                                <div className="flex flex-col">
                                    <span>Titolo: {card.title}</span>
                                    <span>Author: {card.author}</span>
                                    <span>Category: {card.category}</span>
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
