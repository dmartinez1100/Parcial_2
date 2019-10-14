function makeRows(rows, cols) {
    filas = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split('');
    filas.slice(0, rows)
    columnas = $.map($(Array(cols)), function (val, i) { return i + 1; })

    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    w = 0;
    r = 0;
    l = 0;
    for (c = 0; c < (rows * cols); c++) {

        // console.log(w)

        let casilla = "casilla-blanca";

        if (w % 2 == 0) {
            casilla = "casilla-negra"
        }

        w++;

        let cell = document.createElement("div");
        // cell.innerText = filas[r] + columnas[l];

        cell.setAttribute("id", filas[r] + columnas[l])
        cell.setAttribute("ondrop", "drop(event)")
        cell.setAttribute("ondragenter", "dragEnter(event)")
        cell.setAttribute("ondragleave", "dragLeave(event)")
        cell.setAttribute("ondragover", "allowDrop(event)")
        container.appendChild(cell).className = casilla;

        if (l == 0) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            if (r == 0 || r == 7) {
                ficha.setAttribute("style", "background-image: url('img/rook_black.svg')");
            }
            if (r == 1 || r == 6) {
                ficha.setAttribute("style", "background-image: url('img/knight_black.svg')");
            }
            if (r == 2 || r == 5) {
                ficha.setAttribute("style", "background-image: url('img/bishop_black.svg')");
            }
            if (r == 3) {
                ficha.setAttribute("style", "background-image: url('img/king_black.svg')");
            }
            if (r == 4) {
                ficha.setAttribute("style", "background-image: url('img/queen_black.svg')");
            }
            cell.appendChild(ficha);
        }

        if (l == 1) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            ficha.setAttribute("style", "background-image: url('img/pawn_black.svg')");
            cell.appendChild(ficha);
        }

        if (l == 6) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            ficha.setAttribute("style", "background-image: url('img/pawn_white.svg')");
            cell.appendChild(ficha);
        }

        if (l == 7) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            if (r == 0 || r == 7) {
                ficha.setAttribute("style", "background-image: url('img/rook_white.svg')");
            }
            if (r == 1 || r == 6) {
                ficha.setAttribute("style", "background-image: url('img/knight_white.svg')");
            }
            if (r == 2 || r == 5) {
                ficha.setAttribute("style", "background-image: url('img/bishop_white.svg')");
            }
            if (r == 3) {
                ficha.setAttribute("style", "background-image: url('img/king_white.svg')");
            }
            if (r == 4) {
                ficha.setAttribute("style", "background-image: url('img/queen_white.svg')");
            }
            cell.appendChild(ficha);
        }


        r++;
        if ((c + 1) % 8 == 0 & w != 0) {
            r = 0
            l++
            if (((c + 1) / 8) % 2 == 0) { w = 0 } else { w = 1 }
        }


    };
};

makeRows(8, 8);

function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function dragEnter(event) {
    // Active esta parte cuándo ficha.posibilidades() esté lista
    //   ficha.posibilidades()
    //   if ( event.target.className == "droptarget" ) {
    // document.getElementById("demo").innerHTML = "Entered the dropzone";
    //   event.target.style.border = "3px dotted red";
    //   }
}

function dragLeave(event) {
    //   if ( event.target.className == "droptarget" ) {
    // document.getElementById("demo").innerHTML = "Left the dropzone";
    event.target.style.border = "";
    //   }
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    var sale = document.getElementById(data);
    // console.log(sale)
    event.target.appendChild(sale);
}

