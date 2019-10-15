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
    window.row2num = function(row){return filas.findIndex((var1)=>{return var1===row})}
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
                this.piece.active=0;
                var ficha_aux = document.getElementById(this.coordinate.row+this.coordinate.column+"img");
                ficha_aux.parentNode.removeChild(ficha_aux);
                //console.log(this.coordinate.row+this.coordinate.column)
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
                    //console.log(this.box.coordinate);
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
                    if (chessboard.turn ==="white"){return possib}
    
                    //console.log(movimientos);
                    for(let i=0;i<movimientos.length;i++){
                        let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                        if(typeof aux.piece == 'number'){
                            possib.push({row:movimientos[i].row,column:movimientos[i].column})
                            }
                        else if(aux.piece.color==="white"){
                           possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                    }
                    return possib;
                },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
                    //console.log(this.box.coordinate);
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
                        if(j.row+1 < rows){movimientos.push({row:filas[j.row+1],column:j.column+2})}
                        if(j.row-1 > 0){movimientos.push({row:filas[j.row-1],column:j.column+2})}
                    }
                    if(j.column-2 > 0){
                        if(j.row+1 < rows){movimientos.push({row:filas[j.row+1],column:j.column-2})}
                        if(j.row-1 > 0){movimientos.push({row:filas[j.row-1],column:j.column-2})}
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    if (chessboard.turn ==="white"){return possib}
    
                    //console.log(movimientos);
                    for(let i=0;i<movimientos.length;i++){
                        let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                        if(typeof aux.piece == 'number'){
                            possib.push({row:movimientos[i].row,column:movimientos[i].column})
                            }
                        else if(aux.piece.color==="white"){
                           possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                    }
                    return possib;
                },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
                    //console.log(this.box.coordinate);
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
                    if (chessboard.turn ==="white"){return possib}
    
                    //console.log(movimientos);
                    for(let i=0;i<movimientos.length;i++){
                        let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                        if(typeof aux.piece == 'number'){
                            possib.push({row:movimientos[i].row,column:movimientos[i].column})
                            }
                        else if(aux.piece.color==="white"){
                           possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                    }
                    return possib;
                },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
                    //console.log(this.box.coordinate);
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
                    if (chessboard.turn ==="white"){return possib}
    
                    //console.log(movimientos);
                    for(let i=0;i<movimientos.length;i++){
                        let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                        if(typeof aux.piece == 'number'){
                            possib.push({row:movimientos[i].row,column:movimientos[i].column})
                            }
                        else if(aux.piece.color==="white"){
                           possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                    }
                    return possib;
                },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
                    //console.log(this.box.coordinate);
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
                    if (chessboard.turn ==="white"){return possib}
    
                    //console.log(movimientos);
                    for(let i=0;i<movimientos.length;i++){
                        let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                        if(typeof aux.piece == 'number'){
                            possib.push({row:movimientos[i].row,column:movimientos[i].column})
                            }
                        else if(aux.piece.color==="white"){
                           possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                    }
                    return possib;
                },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
            // peon negro
            let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"black",name:"pawn",
            movement: function(){
                //console.log(this.box.coordinate);
                var movimientos = new Array();
                let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                //opcion para que el peon se devuelva
                //if(j.column > 1){
                //    j = {row:j.row,column:j.column-1};
                //    movimientos.push({row:filas[j.row],column:j.column})
                //}
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
                if (chessboard.turn ==="white"){return possib}

                //console.log(movimientos);
                for(let i=0;i<movimientos.length;i++){
                    let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                    let diag1 = -1;
                    let diag2 = -1;

                    if(row2num(movimientos[i].row)-1 >= 0){
                        diag1 = chessboard.boxes[row2num(movimientos[i].row)-1][(movimientos[i].column)-1];
                        if(typeof diag1.piece!='number'){
                            possib.push({row:diag1.coordinate.row,column:movimientos[i].column})}
                    }
                    if(row2num(movimientos[i].row)+1 < cols){
                        diag2 = chessboard.boxes[row2num(movimientos[i].row)+1][(movimientos[i].column)-1];
                        if(typeof diag2.piece!='number'){
                            possib.push({row:diag2.coordinate.row,column:movimientos[i].column})}
                    }
                    if(typeof aux.piece == 'number'){
                        possib.push({row:movimientos[i].row,column:movimientos[i].column})
                        }
                }
                return possib;
            },
            move:function(target){
                let row_source = row2num(this.box.coordinate.row);
                let col_src = this.box.coordinate.column-1;
                let row_trg = row2num(target[0]);
                let col_trg = (parseInt(target[1],10)-1);
                box_trg = chessboard.boxes[row_trg][col_trg];
                if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                box_trg.piece = chessboard.boxes[row_source][col_src].piece
                box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                chessboard.boxes[row_source][col_src].piece = NaN;
                //console.log(chessboard.boxes)

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
            //peon blanco
            let piece = {active: 1,enabled:0,box:chessboard.boxes[r][l],color:"white",name:"pawn",
            movement: function(){
                //console.log(this.box.coordinate);
                let movimientos = new Array();
                let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                if(j.column > 1){
                    j = {row:j.row,column:j.column-1};
                    movimientos.push({row:filas[j.row],column:j.column})
                }
                j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                //para que el peon se pueda devovler
                //if(j.column < cols){
                 //   j = {row:j.row,column:j.column+1};
                  //  movimientos.push({row:filas[j.row],column:j.column})
                //}
                j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                return movimientos;
            },
            possibilites:function(){
                let movimientos = this.movement();
                let possib = [];
                if (chessboard.turn ==="black"){return possib}

                //console.log(movimientos);
                for(let i=0;i<movimientos.length;i++){
                    let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                    let diag1 = -1;
                    let diag2 = -1;

                    if(row2num(movimientos[i].row)-1 >= 0){
                        diag1 = chessboard.boxes[row2num(movimientos[i].row)-1][(movimientos[i].column)-1];
                        if(typeof diag1.piece!='number'){
                            possib.push({row:diag1.coordinate.row,column:movimientos[i].column})}
                    }
                    if(row2num(movimientos[i].row)+1 < cols){
                        diag2 = chessboard.boxes[row2num(movimientos[i].row)+1][(movimientos[i].column)-1];
                        if(typeof diag2.piece!='number'){
                            possib.push({row:diag2.coordinate.row,column:movimientos[i].column})}
                    }
                    if(typeof aux.piece == 'number'){
                        possib.push({row:movimientos[i].row,column:movimientos[i].column})
                        }
                }
                return possib;
            },
            move:function(target){
                let row_source = row2num(this.box.coordinate.row);
                let col_src = this.box.coordinate.column-1;
                let row_trg = row2num(target[0]);
                let col_trg = (parseInt(target[1],10)-1);
                box_trg = chessboard.boxes[row_trg][col_trg];
                if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                box_trg.piece = chessboard.boxes[row_source][col_src].piece
                box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                chessboard.boxes[row_source][col_src].piece = NaN;
                //console.log(chessboard.boxes)

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
                    //console.log(this.box.coordinate);
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
                    if (chessboard.turn ==="black"){return possib}
    
                    //console.log(movimientos);
                    for(let i=0;i<movimientos.length;i++){
                        let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                        if(typeof aux.piece == 'number'){
                            possib.push({row:movimientos[i].row,column:movimientos[i].column})
                            }
                        else if(aux.piece.color==="black"){
                           possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                    }
                    return possib;
                },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
                    //console.log(this.box.coordinate);
                    var movimientos = new Array();
                    let j = {row:row2num(this.box.coordinate.row),column:this.box.coordinate.column};
                    if(j.row+2 < rows){
                        if(j.column+1 < cols){movimientos.push({row:filas[j.row+2],column:j.column+1})}
                        if(j.column-1 > 1){movimientos.push({row:filas[j.row+2],column:j.column-1})}
                    }
                    if(j.row-2 >= 0){
                        if(j.column+1 < cols){movimientos.push({row:filas[j.row-2],column:j.column+1})}
                        if(j.column-1 > 1){movimientos.push({row:filas[j.row-2],column:j.column-1})}
                    }
                    if(j.column+2 < cols+1){
                        if(j.row+1 < rows){movimientos.push({row:filas[j.row+1],column:j.column+2})}
                        if(j.row-1 >= 0){movimientos.push({row:filas[j.row-1],column:j.column+2})}
                    }
                    if(j.column-2 > 0){
                        if(j.row+1 < rows){movimientos.push({row:filas[j.row+1],column:j.column-2})}
                        if(j.row-1 >= 0){movimientos.push({row:filas[j.row-1],column:j.column-2})}
                    }
                    return movimientos;
                },
                possibilites:function(){
                    let movimientos = this.movement();
                    let possib = [];
                    if (chessboard.turn ==="black"){return possib}
    
                    //console.log(movimientos);
                    for(let i=0;i<movimientos.length;i++){
                        let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                        if(typeof aux.piece == 'number'){
                            possib.push({row:movimientos[i].row,column:movimientos[i].column})
                            }
                        else if(aux.piece.color==="black"){
                           possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                    }
                    return possib;
                },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
                    //console.log(this.box.coordinate);
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
                    if (chessboard.turn ==="black"){return possib}
    
                    //console.log(movimientos);
                    for(let i=0;i<movimientos.length;i++){
                        let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                        if(typeof aux.piece == 'number'){
                            possib.push({row:movimientos[i].row,column:movimientos[i].column})
                            }
                        else if(aux.piece.color==="black"){
                           possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                    }
                    return possib;
                },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
                    //console.log(this.box.coordinate);
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
                    if (chessboard.turn ==="black"){return possib}
    
                    //console.log(movimientos);
                    for(let i=0;i<movimientos.length;i++){
                        let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                        if(typeof aux.piece == 'number'){
                            possib.push({row:movimientos[i].row,column:movimientos[i].column})
                            }
                        else if(aux.piece.color==="black"){
                           possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                    }
                    return possib;
                },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
                    //console.log(this.box.coordinate);
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
                if (chessboard.turn ==="black"){return possib}

                //console.log(movimientos);
                for(let i=0;i<movimientos.length;i++){
                    let aux = chessboard.boxes[row2num(movimientos[i].row)][(movimientos[i].column)-1];
                    if(typeof aux.piece == 'number'){
                        possib.push({row:movimientos[i].row,column:movimientos[i].column})
                        }
                    else if(aux.piece.color==="black"){
                       possib.push({row:movimientos[i].row,column:movimientos[i].column})}
                }
                return possib;
            },
                move:function(target){
                    let row_source = row2num(this.box.coordinate.row);
                    let col_src = this.box.coordinate.column-1;
                    let row_trg = row2num(target[0]);
                    let col_trg = (parseInt(target[1],10)-1);
                    box_trg = chessboard.boxes[row_trg][col_trg];
                    if(typeof box_trg.piece !="number"){document.getElementById("mensajes").innerHTML ="Piece on "+ target+" have been eaten";box_trg.delete()}
                    box_trg.piece = chessboard.boxes[row_source][col_src].piece
                    box_trg.piece.box.coordinate = {row:target[0],column:parseInt(target[1],10)};
                    chessboard.boxes[row_source][col_src].piece = NaN;
                    //console.log(chessboard.boxes)

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
console.log(chessboard)
var source = new Object();

function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
    source = event.dataTransfer.getData("Text");
}

function dragEnter(event) {
    // Active esta parte cuándo ficha.posibilidades() esté lista
    let posibilidades = chessboard.boxes[row2num(source[0])][source[1]-1].piece.possibilites();
    //console.log(posibilidades);
    let target1 = event.target.id
    //console.log("vengo de " + source);
    for(let i = 0;i<posibilidades.length;i++){
        if(posibilidades[i].row+posibilidades[i].column === target1){
            document.getElementById(target1).className += " droptarget";
        }
    }
    if ( event.target.className.search("droptarget") != -1) {
        event.target.style.border = "3px dotted red";
    }
}

function dragLeave(event) {
    if ( event.target.className.search("droptarget") != -1) {
        event.target.style.border = "";
        document.getElementById(event.target.id).className = document.getElementById(event.target.id).className.replace(" droptarget",'');
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    var sale = document.getElementById(data);
    //console.log(event.target.id)
    if ( event.target.className.search("droptarget") != -1){
        //console.log(event.target)
        document.getElementById("mensajes").innerHTML = "";
        sale.setAttribute("id",event.target.id+"img");
        event.target.appendChild(sale);
        document.getElementById(event.target.id).className = document.getElementById(event.target.id).className.replace(" droptarget",'');
        event.target.style.border = "";
        console.log("Moved from "+data[0]+data[1]+" to "+event.target.id)
        document.getElementById("mensajes").innerHTML = "Moved from "+data[0]+data[1]+" to "+event.target.id;
        chessboard.boxes[row2num(source[0])][source[1]-1].piece.move(event.target.id);

        chessboard.turn = chessboard.turn==="white"?"black":"white";
        document.getElementById("turno").innerHTML = "Turn: "+ chessboard.turn;
        console.log(chessboard);

    }
    else{
        document.getElementById("mensajes").innerHTML = "Not  Valid Movement";
    }
}