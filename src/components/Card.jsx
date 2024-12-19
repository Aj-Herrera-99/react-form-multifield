import Badge from "./Badge";

function Card({ index, card, handleRemoveClick }) {
    return (
        <li className="relative p-4 bg-white border rounded-lg border-stone-300" cardindex={index}>
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
                <div className="flex flex-wrap gap-2">
                    <strong>Tags:</strong>
                    {card.tags.map((tag, index) => (
                        <Badge key={index} tag={tag}/>
                    ))}
                </div>
                <span>
                    <strong>Status:</strong>{" "}
                    Pubblicato
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
