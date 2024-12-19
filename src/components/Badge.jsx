function Badge({ tag }) {
    // classes
    // poi trovero un modo per generare colori dinamicamente
    const bgColor = (tag) => {
        switch (tag) {
            case "javascript":
                return "bg-yellow-500";
            case "html":
                return "bg-orange-600";
            case "css":
                return "bg-sky-400";
            case "python":
                return "bg-yellow-400";
            case "java":
                return "bg-red-600";
            case "c++":
                return "bg-sky-700";
            case "php":
                return "bg-cyan-800";
            case "ruby":
                return "bg-red-500";
            case "sql":
                return "bg-cyan-500";
            case "xml":
                return "bg-orange-500";
            default:
                return "bg-stone-600"
        }
    };

    return (
        <button className={`${bgColor(tag)} text-white px-4 py-1 uppercase rounded-md hover:scale-105`}>
            {tag}
        </button>
    );
}

export default Badge;
