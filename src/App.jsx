import { useEffect, useState } from "react";
import Main from "./components/Main";
import "./App.css"

const initialData = {
    title: "",
    author: "",
    status: false,
    category: "",
    tags: [],
};

// select
export const categories = ["web development", "front-end", "css"];
// checkbox
export const tags = [
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
    const [tagsListChecked, setTagsListChecked] = useState(
        tags.map((tag) => false)
    );

    // actions
    const handleSubmit = (e) => {
        console.log("test");
        e.preventDefault();
        setCards([...cards, formData]);
        setFormData(initialData);
        setTagsListChecked((curr) => curr.map((el) => false));
    };

    const handleInputChange = (e) => {
        const { type, name, value, checked } = e.target;
        const KEY = name;
        const VAL = type == "checkbox" ? checked : value;
        if (name != "tags") return setFormData({ ...formData, [KEY]: VAL });
        // * da qui in poi significa che lo scatenante è una checkbox dei tags
        // ? se il tag è stato selezionato (checked) allora aggiungilo alla lista dei tags
        if (checked) {
            setFormData({
                ...formData,
                [KEY]: [...formData.tags, value],
            });
        }
        // ? se il tag è stato deselezionato (unchecked) allora toglilo dalla lista dei tags
        else if (!checked) {
            const newTags = formData.tags.filter((tag) => tag != value);
            setFormData({ ...formData, [KEY]: newTags });
        }
        // ? alla checkbox scatenante dei tags, gli faccio il not del suo valore corrente nell'array booleano
        const newTagsListChecked = tagsListChecked.map((isChecked, index) => {
            if (index == e.target.getAttribute("tagindex")) {
                return !isChecked;
            }
            return isChecked;
        });
        setTagsListChecked(newTagsListChecked);
    };

    const handleRemoveClick = (e) => {
        const cardIndex = e.target.closest("li").getAttribute("cardindex");
        const nuoveCards = cards.filter((card, index) => index != cardIndex);
        setCards(nuoveCards);
    };

    return (
        <>
            {/* Header */}
            <header>
                <h1 className="p-3 text-6xl text-center text-white uppercase bg-stone-800">
                    React Blog Form Multifield
                </h1>
            </header>
            {/* Main */}
            <Main
                formData={formData}
                cards={cards}
                tagsListChecked={tagsListChecked}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                handleRemoveClick={handleRemoveClick}
            />
        </>
    );
}

export default App;
