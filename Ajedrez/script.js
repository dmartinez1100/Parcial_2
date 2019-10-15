var chessboard = new Object();
chessboard.turn = "white";
chessboard.boxes = new Array(8);
for (var i=0;i<chessboard.boxes.length;i++){chessboard.boxes[i]=new Array(8)}

function makeRows(rows, cols) {
    filas = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split('');
    filas.slice(0, rows)
    columnas = $.map($(Array(cols)), function (val, i) { return i + 1; })
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    function row2num(row){return filas.findIndex((var1)=>{return var1===row})}
    w = 0;
    r = 0;
    l = 0;
    for (c = 0; c < (rows * cols); c++) {

        //console.log(w)

        let casilla = "casilla-blanca";

        if (w % 2 == 0) {
            casilla = "casilla-negra"
        }

        w++;

        let cell = document.createElement("div");
        cell.innerText = filas[r] + columnas[l];
        cell.setAttribute("id", filas[r] + columnas[l])
        cell.setAttribute("ondrop", "drop(event)")
        cell.setAttribute("ondragenter", "dragEnter(event)")
        cell.setAttribute("ondragleave", "dragLeave(event)")
        cell.setAttribute("ondragover", "allowDrop(event)")
        container.appendChild(cell).className = casilla;

        chessboard.boxes[r][l] = {
            coordinate:{row:filas[r],column:columnas[l]},
            piece:NaN,
            delete:function(){
                this.piece.setactive(0);
                //this.piece = NaN;
            }
        };

        if (l == 0) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            if (r == 0 || r == 7) {
                //Torre
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"black",name:"rook",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0){
                        j = {row:j.row-1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1){
                        j = {row:j.row+1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.column > 1){
                        j = {row:j.row,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.column < cols){
                        j = {row:j.row,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="white")
                           possib.push(box.coordinate)
                    }
                    console.log(movimientos);
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
                ficha.setAttribute("style", "background-image: url('img/rook_black.svg')");
            }
            if (r == 1 || r == 6) {
                //Caballo
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"black",name:"knight",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.row+2 < rows){
                        if(j.column < cols){movimientos.push({row:filas[j.row+2],column:j.column+1})}
                        if(j.column > 1){movimientos.push({row:filas[j.row+2],column:j.column-1})}
                    }
                    if(j.row-2 >= 0){
                        if(j.column < cols){movimientos.push({row:filas[j.row-2],column:j.column+1})}
                        if(j.column > 1){movimientos.push({row:filas[j.row-2],column:j.column-1})}
                    }
                    if(j.column+2 < cols+1){
                        if(j.row < rows){movimientos.push({row:filas[j.row+1],column:j.column+2})}
                        if(j.row > 0){movimientos.push({row:filas[j.row-1],column:j.column+2})}
                    }
                    if(j.column-2 > 0){
                        if(j.row < rows){movimientos.push({row:filas[j.row+1],column:j.column-2})}
                        if(j.row > 0){movimientos.push({row:filas[j.row-1],column:j.column-2})}
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    console.log(movimientos);
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        //console.log(box)
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="white")
                           possib.push(box.coordinate)
                    }
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
                ficha.setAttribute("style", "background-image: url('img/knight_black.svg')");
            }
            if (r == 2 || r == 5) {
                //Alfil
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"black",name:"bishop",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0 & j.column >1){
                        j = {row:j.row-1,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1 & j.column < cols){
                        j = {row:j.row+1,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1 & j.column > 1){
                        j = {row:j.row+1,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0 & j.column < cols){
                        j = {row:j.row-1,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    console.log(movimientos);
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        //console.log(box)
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="white")
                           possib.push(box.coordinate)
                    }
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
                ficha.setAttribute("style", "background-image: url('img/bishop_black.svg')");
            }
            if (r == 3) {
                //Rey
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"black",name:"king",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.row > 0){
                        j = {row:j.row-1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.row < rows-1){
                        j = {row:j.row+1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.column > 1){
                        j = {row:j.row,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.column < cols){
                        j = {row:j.row,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    console.log(movimientos);
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        //console.log(box)
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="white")
                           possib.push(box.coordinate)
                    }
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
                ficha.setAttribute("style", "background-image: url('img/king_black.svg')");
            }
            if (r == 4) {
                //Reina  -------tengo pereza, copiare los movimientos de la torre y el alfil
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"black",name:"queen",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0){
                        j = {row:j.row-1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1){
                        j = {row:j.row+1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.column > 1){
                        j = {row:j.row,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.column < cols){
                        j = {row:j.row,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0 & j.column >1){
                        j = {row:j.row-1,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1 & j.column < cols){
                        j = {row:j.row+1,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1 & j.column > 1){
                        j = {row:j.row+1,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0 & j.column < cols){
                        j = {row:j.row-1,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    console.log(movimientos);
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        //console.log(box)
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="white")
                           possib.push(box.coordinate)
                    }
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
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
            // peon
            let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"black",name:"pawn",
            movement: function(){
                console.log(this.box.coordinate);
                var movimientos = new Array();
                let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                if(j.column > 1){
                    j = {row:j.row,column:j.column-1};
                    movimientos.push({row:filas[j.row],column:j.column})
                }
                j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                if(j.column < cols){
                    j = {row:j.row,column:j.column+1};
                    movimientos.push({row:filas[j.row],column:j.column})
                }
                return movimientos;
            },
            possibilites:function(){
                let movimientos = this.movement();
                let possib = [];
                console.log(movimientos);
                for(let y=0;y<movimientos.length;y++){
                    box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                    //console.log(box)
                    if(typeof box.piece == 'number')
                        possib.push(box.coordinate)
                    else if(box.piece.color==="white")
                       possib.push(box.coordinate)
                }
                return possib;
            }
            };
            Object.defineProperty(piece,"color",{configurable:false,writable:false});
            chessboard.boxes[r][l].piece = piece;
            cell.appendChild(ficha);
        }

        if (l == 6) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            ficha.setAttribute("style", "background-image: url('img/pawn_white.svg')");
            //peon
            let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"white",name:"pawn",
            movement: function(){
                console.log(this.box.coordinate);
                var movimientos = new Array();
                let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                if(j.column > 1){
                    j = {row:j.row,column:j.column-1};
                    movimientos.push({row:filas[j.row],column:j.column})
                }
                j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                if(j.column < cols){
                    j = {row:j.row,column:j.column+1};
                    movimientos.push({row:filas[j.row],column:j.column})
                }
                return movimientos;
            },
            possibilites:function(){
                let movimientos = this.movement();
                let possib = [];
                console.log(movimientos);
                for(let y=0;y<movimientos.length;y++){
                    box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                    //console.log(box)
                    if(typeof box.piece == 'number')
                        possib.push(box.coordinate)
                    else if(box.piece.color==="black")
                       possib.push(box.coordinate)
                }
                return possib;
            }
            };
            Object.defineProperty(piece,"color",{configurable:false,writable:false});
            chessboard.boxes[r][l].piece = piece;
            cell.appendChild(ficha);
        }

        if (l == 7) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            if (r == 0 || r == 7) {
                // Torre
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"white",name:"rook",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0){
                        j = {row:j.row-1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1){
                        j = {row:j.row+1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.column > 1){
                        j = {row:j.row,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.column < cols){
                        j = {row:j.row,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    console.log(movimientos);
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        //console.log(box)
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="black")
                           possib.push(box.coordinate)
                    }
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
                ficha.setAttribute("style", "background-image: url('img/rook_white.svg')");
            }
            if (r == 1 || r == 6) {
                //Caballo
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"white",name:"knight",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.row+2 < rows){
                        if(j.column < cols){movimientos.push({row:filas[j.row+2],column:j.column+1})}
                        if(j.column > 1){movimientos.push({row:filas[j.row+2],column:j.column-1})}
                    }
                    if(j.row-2 >= 0){
                        if(j.column < cols){movimientos.push({row:filas[j.row-2],column:j.column+1})}
                        if(j.column > 1){movimientos.push({row:filas[j.row-2],column:j.column-1})}
                    }
                    if(j.column+2 < cols+1){
                        if(j.row < rows){movimientos.push({row:filas[j.row+1],column:j.column+2})}
                        if(j.row > 0){movimientos.push({row:filas[j.row-1],column:j.column+2})}
                    }
                    if(j.column-2 > 0){
                        if(j.row < rows){movimientos.push({row:filas[j.row+1],column:j.column-2})}
                        if(j.row > 0){movimientos.push({row:filas[j.row-1],column:j.column-2})}
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    console.log(movimientos);
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        //console.log(box)
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="black")
                           possib.push(box.coordinate)
                    }
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
                ficha.setAttribute("style", "background-image: url('img/knight_white.svg')");
            }
            if (r == 2 || r == 5) {
                //Bishop
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"white",name:"bishop",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0 & j.column >1){
                        j = {row:j.row-1,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1 & j.column < cols){
                        j = {row:j.row+1,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1 & j.column > 1){
                        j = {row:j.row+1,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0 & j.column < cols){
                        j = {row:j.row-1,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    console.log(movimientos);
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        //console.log(box)
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="black")
                           possib.push(box.coordinate)
                    }
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
                ficha.setAttribute("style", "background-image: url('img/bishop_white.svg')");
            }
            if (r == 3) {
                //Rey
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"white",name:"king",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.row > 0){
                        j = {row:j.row-1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.row < rows-1){
                        j = {row:j.row+1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.column > 1){
                        j = {row:j.row,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.column < cols){
                        j = {row:j.row,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    console.log(movimientos);
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        //console.log(box)
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="black")
                           possib.push(box.coordinate)
                    }
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
                ficha.setAttribute("style", "background-image: url('img/king_white.svg')");
            }
            if (r == 4) {
                //Reina
                let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"white",name:"queen",
                movement: function(){
                    console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0){
                        j = {row:j.row-1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1){
                        j = {row:j.row+1,column:j.column};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.column > 1){
                        j = {row:j.row,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.column < cols){
                        j = {row:j.row,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0 & j.column >1){
                        j = {row:j.row-1,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1 & j.column < cols){
                        j = {row:j.row+1,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row < rows-1 & j.column > 1){
                        j = {row:j.row+1,column:j.column-1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    while(j.row > 0 & j.column < cols){
                        j = {row:j.row-1,column:j.column+1};
                        movimientos.push({row:filas[j.row],column:j.column})
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    console.log(movimientos);
                    for(let y=0;y<movimientos.length;y++){
                        box = chessboard.boxes[row2num(movimientos[y].row)][movimientos[y].column-1];
                        console.log(box.coordinate.row)
                        if(typeof box.piece == 'number')
                            possib.push(box.coordinate)
                        else if(box.piece.color==="black")
                           possib.push(box.coordinate)
                    }
                    return possib;
                }
                };
                Object.defineProperty(piece,"color",{configurable:false,writable:false});
                chessboard.boxes[r][l].piece = piece;
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
//console.log(chessboard)
document.getElementById("B1").className += " droptarget";
function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function dragEnter(event) {
    // Active esta parte cuándo ficha.posibilidades() esté lista
    //   ficha.posibilidades()
       if ( event.target.className.search("droptarget") != -1) {
     //document.getElementById("demo").innerHTML = "Entered the dropzone";
       event.target.style.border = "3px dotted red";
       }
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
    if ( event.target.className.search("droptarget") == -1){
    console.log(event.target)
    event.target.appendChild(sale);}
    chessboard.turn = chessboard.turn==="white"?"black":"white";
    console.log(chessboard);
}

chessboard.boxes[4][1].piece.box.coordinate.row='A';
chessboard.boxes[4][1].piece.box.coordinate.column=2;
console.log(chessboard.boxes[0][7].piece.possibilites());
//console.log(array1.findIndex((var1)=>{return var1===5}));
