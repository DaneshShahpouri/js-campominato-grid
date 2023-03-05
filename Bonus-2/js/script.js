const startBtn = document.getElementById("btn-start");
const startScreen = document.getElementById("start-screen")
const grid = document.getElementById("grid-parent");
const gridScreen = document.getElementById("grid-screen");




startBtn.addEventListener('click', ()=>{
    startGame();
});

function startGame(){
    gridScreen.classList.remove("hidden")
    startScreen.classList.add("hidden");
    let arrPosition;
    arrPosition = [];
    let win = false;
    let arrBombe = [];
    arrBombe = generaArrMine();
    let arrGrid = [];
    const winElement = document.getElementById("win");
    const lose = document.getElementById("lose");
    let gameover = false;

    let pseudoMain = document.querySelector("selected::before");
    console.log(pseudoMain)

    const resetBtn = document.querySelectorAll('.reset');

    resetBtn[0].addEventListener('click', ()=>{
        reset();
    })
    resetBtn[1].addEventListener('click', ()=>{
        reset();
    })
    
    lose.classList.add("hidden");
    winElement.classList.add("hidden");
    grid.innerHTML="";
    createGrid(110, grid);
    const sold=document.querySelectorAll('.sold');
    
    arrGrid = document.querySelectorAll(".cell");
    
    //Posizione di partenza 104
    let currentPosition = arrGrid[104];
    currentPosition.classList.add("selected")
    currentPosition.classList.add("discover-cell")
    arrPosition.push(currentPosition.innerText);
    
    let arrNearCell = [];
    arrNearCell = arrayNearCellbombe(arrBombe);
    classNearCellBombs(arrNearCell);

    // let startShotPosition = 0;
    // startShotPosition = generaNumeroRandom(0, 9);
    
    
    
    
    //arrGrid[0].classList.add('shot');
   
   window.setInterval( function() {
       
       shot()
       
       
       
    }, 600)
    
    
    
    
    
    function shot(){
        startShotPosition = generaNumeroRandom(0, 9);
        let newPosition;
        newPosition=startShotPosition;
        arrGrid[newPosition].classList.add('shot');
        
        sold[startShotPosition].classList.remove('sold')
        sold[startShotPosition].classList.add('sold-animation')
        
        
        
        
        
        
        
        if(gameover){
            window.clearInterval(shot);
            newPosition = 120;
        }
        window.setInterval(function(){
            
            if(newPosition>=10 && newPosition<20){
                sold[startShotPosition].classList.remove('sold-animation');
                sold[startShotPosition].classList.add('sold');
                
            }

            if(arrPosition[arrPosition.length-1] == newPosition + 10){
                
                
                lose.classList.remove("hidden");
                arrGrid[newPosition+ 10].classList.add("kill"); 
                arrGrid[newPosition].classList.remove("shot"); 
                for(let q = 0; q < arrBombe.length; q++){
                    arrGrid[arrBombe[q]].style.backgroundImage="url('./img/mina.png')";
                    
                };
                gameover=true;
                grid.classList.add('opacity');
                newPosition= 0
                
            }else if(newPosition<100){
                arrGrid[newPosition].classList.remove('shot');
                newPosition += 10;
                arrGrid[newPosition].classList.add('shot');
        
            }else if(newPosition>=100 && newPosition<110){
                arrGrid[newPosition].classList.remove('shot');
                newPosition+=10
                window.clearInterval(shot)
                
            }
        }, 200) 
        

    }


    //Assegna classe alle celle vicine alle bombe
    function classNearCellBombs(arrayNearCell){
        for(let i=0; i<arrNearCell.length; i++){
            arrGrid[arrNearCell[i]].classList.add("nearCell") 
        }
    }
   
    //arrbombe
    function arrayNearCellbombe(arr){

        let nearCellArr = [];

        for(let i = 0; i < arr.length; i++){

            //console.log(nearNumbers(arr[i]))
            let nearCell = nearNumbers(arr[i]);

            for(let q = 0; q < nearCell.length; q++){

                //console.log(nearCell[q])
                if(!(nearCellArr.includes(nearCell[q])) && !(arr.includes(nearCell[q]))){

                    nearCellArr.push(nearCell[q]);

                }

            }
        }

        return nearCellArr
    }


    function reset (){
        //Posizione di partenza 104
        grid.style.opacity="1";
        grid.innerHTML="";
        createGrid(110, grid);

        arrPosition = [];
        arrBombe = [];
        arrBombe = generaArrMine();
        arrGrid = [];
        arrGrid = document.querySelectorAll(".cell");

        for(let i=0; i<arrGrid.length; i++){
            arrGrid[i].classList=("cell")
        }

        currentPosition = "";
        currentPosition = arrGrid[104];
        currentPosition.classList.add("selected")
        currentPosition.classList.add("discover-cell")
        arrPosition.push(currentPosition.innerText);
        arrNearCell=[];
        arrNearCell = arrayNearCellbombe(arrBombe);
        classNearCellBombs(arrNearCell);

    
        win = false;
        gameover = false;

        lose.classList.add("hidden");
        winElement.classList.add("hidden");

        for(let h = 0; h<sold.length; h++){
            sold[h].classList="sold"
        }
        //console.log(sold);

    }
    

    function nearNumbers(numero){
        let nearNumber = [];

        if(numero % 10 == 0){

            nearNumber = [(parseInt(numero) + 1), (parseInt(numero) + 10), (parseInt(numero) - 10)]

        }else if(numero == 9 || numero == 19 || numero == 29 || numero == 39 || numero == 49 || numero == 59 || numero == 69 || numero == 79 || numero == 89 || numero == 99){

            nearNumber = [(parseInt(numero) - 1), (parseInt(numero) + 10), (parseInt(numero) - 10)];

        }else{
            nearNumber = [(parseInt(numero) - 1), (parseInt(numero) + 1), (parseInt(numero) + 10), (parseInt(numero) - 10)]
        }

        return nearNumber;
    }


    function isWin(){

        //console.log("la condizione dell iswin è " + (arrPosition[arrPosition.length-1] <= 10), arrPosition[[arrPosition.length-1]])
        if(arrPosition[arrPosition.length-1] <= 10){
            winElement.classList.remove("hidden");
        }else{
            win = false
        };
        
    };


    //Genera un numero random tra il "min" e il "max"
    function generaNumeroRandom(min, max){
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        return random
    };

    // Funzioni di movimento
    //--------------------------------------------
    /**
     * aggiunge la classe "selected" all'elemento dell'array grid che ha come index l'ultimo valore dell'array "arrPosition" e la toglie al penultimo
     * @returns {any}
     */
    function moveLeft(){
        let startRow = Math.floor(arrPosition[arrPosition.length-1] / 10) * 10;
        let endRow = (Math.floor(arrPosition[arrPosition.length-1] / 10) * 10) + 10;
        

        if (arrPosition[arrPosition.length-1] > startRow && arrPosition[arrPosition.length-1] <= endRow){

            move(-1);
        
        
            arrGrid[arrPosition[arrPosition.length-1]].classList.add("discover-cell");
            arrGrid[arrPosition[arrPosition.length-1]].classList.add("selected");
            arrGrid[arrPosition[arrPosition.length-2]].classList.remove("selected");
        }
    }

    function moveRight(){
        let startRow = Math.floor(arrPosition[arrPosition.length-1] / 10) * 10;
        let endRow = (Math.floor(arrPosition[arrPosition.length-1] / 10) * 10) + 10;
        
        
        if (arrPosition[arrPosition.length-1] >= startRow && arrPosition[arrPosition.length-1] < endRow - 1){

            move(1);
        
            arrGrid[arrPosition[arrPosition.length-1]].classList.add("discover-cell");
            arrGrid[arrPosition[arrPosition.length-1]].classList.add("selected");
            arrGrid[arrPosition[arrPosition.length-2]].classList.remove("selected");
        }
    }

    function MoveUp(){
        if(arrPosition[arrPosition.length-1] > 10){

            move(-10);

            arrGrid[arrPosition[arrPosition.length-1]].classList.add("discover-cell");
            arrGrid[arrPosition[arrPosition.length-1]].classList.add("selected");
            arrGrid[arrPosition[arrPosition.length-2]].classList.remove("selected")
        }
    }

    function MoveDown(){
        if(arrPosition[arrPosition.length-1]  < 100){
            
            move(10);
            arrGrid[arrPosition[arrPosition.length-1]].classList.add("discover-cell");
            arrGrid[arrPosition[arrPosition.length-1]].classList.add("selected");
            arrGrid[arrPosition[arrPosition.length-2]].classList.remove("selected")
        }
    }

    /**
     * aggiunge all'array "arrPosition" un nuovo valore index in base all'input
     * @param {any} moveValue
     * @returns {any}
     */
    function move(moveValue){

        let newPosition = parseInt(arrPosition[arrPosition.length - 1]) + moveValue;
        arrPosition.push(newPosition);

    }

    //Creazione griglia ed elementi
    function createGrid(numeroElementi, elementoGenitore,){

        for(let i = 0; i < numeroElementi; i++){
            let newEl = createPersonalElement("div", "cell", i);
            
            elementoGenitore.append(newEl);
            
        }
    };

    function createPersonalElement (typeElement, classElement, text){
        let el = document.createElement(typeElement);
            el.classList.add(classElement);
            el.innerText = text;

        return el
    };


    //Crea Mine
    function generaArrMine(){
        const arrBombe = [];
        
        let bomba;

        do{
            bomba = generaNumeroRandom(11, 99);
            if(!(arrBombe.includes(bomba))){

                arrBombe.push(bomba);
                
            }
        }while(arrBombe.length < 20)

        return arrBombe
    }

    //DEBBUGGING
    function allocamentoBombe(){
        
        for(let i = 0; i < arrBombe.length; i++){
            //DEBBUGGING
            //arrGrid[arrBombe[i]].style.background="red";
            // debug
            if(arrPosition[arrPosition.length - 1] == arrBombe[i]){
                grid.classList.add('opacity');
                lose.classList.remove("hidden");
                for(let q = 0; q < arrBombe.length; q++){
                    arrGrid[arrBombe[q]].style.backgroundImage="url('./img/mina.png')";
                    
                }
                gameover=true;   
                arrGrid[arrPosition[arrPosition.length - 1]].classList.add('kill')
            }
        }
    }

    function showBombs(){
        for(let i = 0; i < arrBombe.length; i++){
           
            arrGrid[arrBombe[i]].style.backgroundImage="url('./img/mina.png')";
        }
    }

    //Movimento frecce
    window.addEventListener('keydown', function(event){
        //event.preventDefault();
        
        switch (event.key) {
            case "ArrowLeft":
                // Left pressed
                if(gameover){
    
                }
                else{
                    moveLeft();
                    allocamentoBombe();
                    arrGrid[arrPosition[arrPosition.length - 1]].style.transform='rotate(-90deg)'
                    arrGrid[arrPosition[arrPosition.length - 2]].style.transform='rotate(0deg)'

                    // arrGrid[arrPosition[arrPosition.length - 1]].style.content="url(/img/main-left.png)"
                    // arrGrid[arrPosition[arrPosition.length - 2]].style.content=""
                    
                    //console.log(isWin(), arrPosition[arrPosition.length-1])
                }
                
                break;
            case "ArrowRight":

                // Right pressed
                if(gameover){
    
                }else{
                    moveRight();
                    allocamentoBombe();
                    
                    arrGrid[arrPosition[arrPosition.length - 1]].style.transform='rotate(90deg)'
                    arrGrid[arrPosition[arrPosition.length - 2]].style.transform='rotate(0deg)'
                    //arrGrid[arrPosition[arrPosition.length - 1]].style.content="url(/img/main-right.png)"
                    //arrGrid[arrPosition[arrPosition.length - 2]].style.content=""
                }
                break;

            case "ArrowUp":

                // Up pressed           
                if(gameover){

                }else if(isWin()){
                arrPosition=[];
                }else{
                    MoveUp();
                    allocamentoBombe();
                    arrGrid[arrPosition[arrPosition.length - 2]].style.transform='rotate(0deg)'
  
                }
                
                break
            case "ArrowDown":
                // Down pressed
                if(gameover){
    
                }
                else{
                    MoveDown();
                    allocamentoBombe();
                    arrGrid[arrPosition[arrPosition.length - 1]].style.transform='rotate(180deg)'
                    arrGrid[arrPosition[arrPosition.length - 2]].style.transform='rotate(0deg)'
                    
                }
                
                break;
        }
    
    });

    
}

