import { useEffect, useState } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";

/**
 ** CONSIDERAZIONI INIZIALI:
 *! scopo: compilazione form che genera al submit un oggetto articolo le cui proprieta genereranno una card, ogni card puo essere rimossa in seguito
 ** vedere prima di tutto la pagina sul browser
 ** vedere poi il return di App e risalire ai suoi componenti figli e vedere i loro return
 ** => collegamento chiaro tra scrittura html ed effettiva visualizzazione in pagina
 ** sul browser aprire la console e iniziare a giocare con il form
 ** dai vari log vedere quali funzioni sono state invocate (commentare i console.log se danno fastidio)
 ** NB: la logica è al 99% centralizzata in App Component
 ** per semplicità i dati contengono solo 5 proprieta
 ** per semplicità i dati non contengono la proprieta id (sarebbe da generare dinamicamente, UUID)
 ** => le azioni di ricerca dati dunque avvengono tramite indice da un array dei dati
 */

// =============================================================================
//            * STRUTTURA COMPONENTI top-down
//
//           v----------App------------v
//      Header                  v-----Main-------------v
//              v--------v--Form------v           (cardsWrapper) ----v
//         TextField   (select)     CheckboxField                  Card ----v
//                                                                         Badge

// =============================================================================

const initialData = {
    title: "",
    author: "",
    status: false,
    category: "",
    tags: [],
};

// * semplificazione: queste due variabili dovrebbero far parte di un db in formato JSON array
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
    // * STATES
    // oggetto reattivo i cui valori sono aggiornati live durante la compilazione del form
    const [formData, setFormData] = useState(initialData); // vedere initialData all'inizio per avere chiaro comè composto l'oggetto formData
    // array reattivo degli oggetti formData cui valori sono i campi input finali registrati al submit del form
    const [cards, setCards] = useState([]);
    // array reattivo di valori booleani che si riferiscono (tramite indice) ai tags checkati e no (default: tutti false)
    // ? questi valori reattivi serviranno per controllare le checkbox dei tags => controllare in Form component il div delle checkbox tags e vedere cosa è stato assegnato a checked
    const [tagsListChecked, setTagsListChecked] = useState(
        tags.map((tag) => false)
    );

    // * ACTIONS
    // funzione invocata al submit del form
    // azione: aggiornare cards, resettare form, resettare array booleano che si riferisci ai tags
    const handleSubmit = (e) => {
        console.log("Hai cliccato il bottone submit");
        e.preventDefault(); // previene il ricaricamento della pagina (azione default del submit)
        setCards([...cards, formData]); // cards conterrà tutti gli oggetti formData precedenti (spread) PIU il formData corrente
        setFormData(initialData); // reset del form dopo il submit
        // ? setSomething puo contenere all'interno una callback il cui primo argomento è il valore CORRENTE della variabile reattiva di riferimento
        // ? in questo caso il valore CORRENTE è l'array di booleani che resetto tutti a false (tramite map)
        setTagsListChecked((curr) => curr.map((el) => false)); // reset (default false) dei booleani che si riferiscono ai tags checkati
    };

    // (refactoring) funzione invocata ogni qualvolta che i campi input del form cambiano
    // azione: aggiornare l'oggetto formData ai valori correnti di ogni campo input
    const handleInputChange = (e) => {
        console.log("Hai aggiornato un campo di input");
        //* aggiungere un console.log(e.target) per visualizzare meglio
        const { type, name, value, checked } = e.target; //destrutturazione => fare un log di e.target per capire il perche della destrutturazione
        // KEY e VAL sarà la nuova coppia key/value da aggiungere o aggiornare nell'oggetto formData
        const KEY = name; // ? controllare i campi input del Form component per vedere chi è esattamente name e confrontarli con initialData
        // gli input sono sia text che checkbox, il valore di val dipendera dal tipo => se type == "checkbox" VAL sarà e.target.checked senno e.target.value
        // type "text" => e.target.name: e.target.value esempio=> author: "pinco"
        // type "checked" => e.target.name: e.target.checked esempio=> status: true || false
        const VAL = type == "checkbox" ? checked : value;
        if (name != "tags") return setFormData({ ...formData, [KEY]: VAL }); // (spread). Entra qui per tutti gli inputChange tranne le checkbox dei tags
        // * da qui in poi (non sono entrato nell'if della riga precedente) significa che lo scatenante è una checkbox dei tags
        // ? se il tag è stato selezionato (checked) allora aggiungilo alla lista dei tags
        if (checked) {
            setFormData({
                ...formData,
                [KEY]: [...formData.tags, value], // value è lo spread dei tags correnti PIU il tag checkato
            });
        }
        // ? se il tag è stato deselezionato (unchecked) allora toglilo dalla lista dei tags
        else if (!checked) {
            const newTags = formData.tags.filter((tag) => tag != value);
            setFormData({ ...formData, [KEY]: newTags }); //value sara un override dove newTags non conterrà piu il tag uncheckato
        }
        // ? alla checkbox scatenante dei tags, gli faccio il not del suo valore corrente nell'array booleano (true => false, false => true)
        const newTagsListChecked = tagsListChecked.map((isChecked, index) => {
            if (index == e.target.getAttribute("tagindex")) {
                return !isChecked;
            }
            return isChecked;
        });
        setTagsListChecked(newTagsListChecked); //override di tagsListChecked
    };

    const handleRemoveClick = (e) => {
        console.log("Hai rimosso una card");
        const cardIndex = e.target.closest("li").getAttribute("cardindex"); // risalita verso il card padre (li) e prende l'attributo personalizzato cardindex
        const nuoveCards = cards.filter((card, index) => index != cardIndex);
        setCards(nuoveCards); // override di cards il cui array filtrato non conterrà piu l'oggetto formData avente come indice == cardindex
    };

    //* SIDE EFFECTS
    // ? useEffect ha due argomenti: 
    // ? 1) una funzione azione (chiamasi effetto collaterale)
    // ? 2) un array delle dipendenze
    // ? funzionamento: all'aggiornamento di una qualsiasi dipendenza, viene invocato l'effetto collaterale
    // * useEffect RUNNA DOPO IL RENDER (NON DURANTE E NON PRIMA)
    useEffect(() => {
        // * controllo preliminare perche tutti gli useEffect partono a prescindere dopo il primo render
        // * inizialmente cards ha length == 0 per cui faccio questo controllo iniziale
        if (cards.length) {
            // se l'ultima card => dunque l'ultima card generata dopo il submit => ha status true => allora parte alert
            if (cards[cards.length - 1].status) {
                alert("ARTICOLO PUBBLICATO");
            }
        }
    }, [cards]); // ad ogni aggiornamento di cards (var reattiva), App e i suoi figli si re-renderizzano. Dopo il render parte l'effetto collaterale

    return (
        <>
            <Header />
            {/* prop drilling assurdo, prima o poi si evitera sta cosa (spero) */}
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
