
const btnPlay = document.getElementById("btn-play");
const gridContainerElement = document.getElementById("grid-container")


function createGrid(){

    for(let i = 1; i <= 100; i++){
        createNewSquare(gridContainerElement, i)
    }
    
}

/**
 * Crea elemento div con classe "square" e lo aggiunge a un elemento genitore con contenuto
 * @param {elemento genitore, testo dell'elemento creato} parentElement
 * @returns {any}
 */
function createNewSquare(parentElement, text){

    //Crea elemento div con classe "square" e lo aggiunge a un elemento esistente
    let square = document.createElement("div");
        square.classList.add("square");
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
    //Crea una nuova griglia;
    createGrid();
})