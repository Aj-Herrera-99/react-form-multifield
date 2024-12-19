function Card({ index, card, handleRemoveClick }) {
    return (
        <li className="relative p-4 bg-blue-300" cardindex={index}>
            <div className="flex flex-col gap-4">
                <span>
                    <strong>Title:</strong> {card.title}
                </span>
                <span>
                    <strong>Author:</strong> {card.author}
                </span>
                <span>
                    <strong>Category:</strong> {card.category}
                </span>
                <ul className="list-disc list-inside">
                    <strong>Tags:</strong>
                    {card.tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
                <span>
                    <strong>Status:</strong>{" "}
                    {card.status ? "Pubblicato" : "Bozza"}
                </span>
                <i
                    onClick={handleRemoveClick}
                    className="absolute top-0 text-xl text-red-500 transition-all cursor-pointer right-1 fa-solid fa-xmark hover:scale-150"
                ></i>
            </div>
        </li>
    );
}

export default Card;
