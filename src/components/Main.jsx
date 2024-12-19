import Form from "./Form";
import Card from "./Card";

function Main({
    formData,
    cards,
    tagsListChecked,
    handleSubmit,
    handleInputChange,
    handleRemoveClick,
}) {
    return (
        <main className="flex flex-wrap">
            {/* Form */}
            <section className="p-4 bg-green-300 w-fit">
                <Form
                    formData={formData}
                    tagsListChecked={tagsListChecked}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                />
            </section>
            {/* CardWrapper */}
            <section className="p-4 bg-green-500 grow">
                <ul className="flex flex-wrap gap-2">
                    {cards.map((card, index) => (
                        // TODO: prima di mappare, filtrare solo se status e true
                        <Card key={index} index={index} card={card} handleRemoveClick={handleRemoveClick} />
                    ))}
                </ul>
            </section>
        </main>
    );
}



export default Main;
