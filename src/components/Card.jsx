function Card({ index, card, handleRemoveClick }) {
    return (
        <li className="relative p-4 bg-blue-300" cardindex={index}>
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
                <span>Status: {card.status ? "Pubblicato" : "Bozza"}</span>
                <span
                    onClick={handleRemoveClick}
                    className="absolute text-red-500 cursor-pointer hover:scale-105"
                >
                    x
                </span>
            </div>
        </li>
    );
}

export default Card