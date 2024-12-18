/**

Aggiungere più campi al form (ad es. lo stato di un articolo - draft, published - o l’autore)
 
*/

// * FORM => AL SUBMIT MI CREA UNA CARD

//  header
//  main => section : form
//  => section: cardWrapper
import { useState } from "react";

const initialData = {
    title: "",
};

function App() {
    // states
    const [formData, setFormData] = useState(initialData);
    const [cards, setCards] = useState([]);

    // actions
    const handleSubmit = (e) => {
        e.preventDefault();
        setCards([...cards, formData]);
        setFormData(initialData);
    };

    const handleInputChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, title: e.target.value });
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
                    <form action="#" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="p-4 border border-blue-300"
                            onChange={handleInputChange}
                            value={formData.title}
                        />
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
