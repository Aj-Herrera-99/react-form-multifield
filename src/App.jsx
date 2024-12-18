/**

 * todo: Aggiungere più campi al form (ad es. lo stato di un articolo - draft, published - o l’autore)
 
*/

// * FORM => AL SUBMIT MI CREA UNA CARD

//  header
//  main => section : form
//  => section: cardWrapper
import { useState } from "react";

const initialData = {
    title: "",
    author: "",
    status: false,
};

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

    const handleTitleChange = (e) => {
        setFormData({ ...formData, title: e.target.value });
    };
    const handleAuthorChange = (e) => {
        setFormData({ ...formData, author: e.target.value });
    };
    const handleStatusChange = (e) => {
        setFormData({ ...formData, status: e.target.checked });
    };

    const handleInputChange = (e) => {
        console.log(e.target);
        const { type, name, value, checked } = e.target;
        const KEY = name;
        const VAL = type == "checkbox" ? checked : value;
        setFormData({ ...formData, [KEY]: VAL });
    };

    const handleRemoveClick = (e) => {
        console.log(e.target.closest("li"));
        const cardId = e.target.closest("li").id;
        const nuoveCards = cards.filter((card, index) => index != cardId);
        setCards(nuoveCards);
    };

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
                                <div className="flex flex-col">
                                    <span>Titolo: {card.title}</span>
                                    <span>Author: {card.author}</span>
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
