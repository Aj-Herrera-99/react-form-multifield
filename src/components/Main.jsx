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
        <main className="flex flex-wrap grow">
            {/* Form */}
            <section className="w-full p-4 bg-green-300 sm:w-1/3 lg:w-1/4">
                <Form
                    formData={formData}
                    tagsListChecked={tagsListChecked}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                />
            </section>
            {/* CardWrapper */}
            <section className="p-4 bg-green-500 grow">
                <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
