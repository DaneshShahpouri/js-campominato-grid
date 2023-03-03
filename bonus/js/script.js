
const btnPlay = document.getElementById("btn-play");
const gridContainerElement = document.getElementById("grid-container")
const difficult = document.getElementById("difficult");


/**
 * Crea una griglia in base al livello della difficoltà impostato (hard, medium,easy)
 * @param {any} difficultLevel
 * @returns {any}
 */
function createGrid(difficultLevel){
    let maxlenght;

    if (difficultLevel == "hard") {
        maxlenght = 100;
    }else if( difficultLevel == "medium"){
        maxlenght = 81;
    }else{
        maxlenght=49;
    }

    
    for(let i = 1; i <= maxlenght; i++){
        createNewSquare(gridContainerElement, i, difficult.value )
    }
    
}

/**
 * Crea elemento div con classe "square" e lo aggiunge a un elemento genitore con contenuto
 * @param {elemento genitore, testo dell'elemento creato} parentElement
 * @returns {any}
 */
function createNewSquare(parentElement, text, classInput){

    //Crea elemento div con classe "square" e lo aggiunge a un elemento esistente
    let square = document.createElement("div");
        square.classList="square";
        square.classList.add(classInput);
        square.innerText = text;

        
        parentElement.append(square);
        
        square.addEventListener('click', function(){
    
            square.classList.add("selected");
            console.log(square.innerText)
    
        });
    }

btnPlay.addEventListener('click', ()=>{
    //ripulisci la griglia genitore;
    gridContainerElement.innerHTML="";

    btnPlay.innerText="Replay!"

    //Crea una nuova griglia;
    createGrid(difficult.value);
})