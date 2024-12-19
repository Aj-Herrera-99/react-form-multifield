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
        <main className="flex flex-col sm:flex-row grow bg-stone-700 sm:overflow-hidden">
            {/* Form */}
            <section className="w-full p-4 sm:w-1/3 xl:w-1/4 bg-stone-600">
                <div className="text-white">
                    <span className="text-2xl font-semibold">
                        Vuoi aggiungere un nuovo articolo?
                    </span>{" "}
                    <span className="text-xl font-bold tracking-widest">
                        Compila il form!
                    </span>
                </div>
                <Form
                    formData={formData}
                    tagsListChecked={tagsListChecked}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                />
            </section>
            {/* CardWrapper */}
            <section className="w-full p-4 sm:w-2/3 xl:w-3/4 sm:overflow-y-auto">
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {cards
                        .filter((card) => card.status)
                        .map((card, index) => (
                            // TODO: prima di mappare, filtrare solo se status e true
                            <Card
                                key={index}
                                index={index}
                                card={card}
                                handleRemoveClick={handleRemoveClick}
                            />
                        ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
