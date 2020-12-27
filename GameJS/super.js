// Coordenadas de ball.
var mX = 50, mY = 55;

// 0 = stop, +1 Arriba, -1 Abajo, +2 Derecha, -2, Izquierda. 
var Dir = Number(0);
var Vel = Number(10);


const Bloque1 = [90, 100, 250, 120];
const Bloque2 = [400, 100, 560, 120]
const Mapa = [Bloque1, Bloque2]

function mapa (O1, O2, O3, O4) {
    var canvas = document.getElementById ("dibuix");
    var ctx = canvas.getContext ("2d");

    ctx.beginPath();
    ctx.moveTo(O1,O2);
    ctx.lineTo(O3,O2);
    ctx.lineTo(O3,O4);
    ctx.lineTo(O1, O4)
    ctx.fillStyle = 'black';
    ctx.fill();

    
}


function dibujaMapa(){
    var canvas = document.getElementById ("dibuix");
    var ctx = canvas.getContext ("2d");
    
    ctx.fillStyle = "black";
    ctx.fillRect (0, 0, 1900, 800);
    ctx.clearRect (9, 9, 1700, 780);

    // console.log(Mapa)

    mapa (Bloque1[0], Bloque1[1], Bloque1[2], Bloque1[3]);
    mapa (Bloque2[0], Bloque2[1], Bloque2[2], Bloque2[3]);
    mapa (710, 110, 870, 120);
    mapa (1030, 110, 1170, 120);
    mapa (1330, 110, 1480, 120);
    
    mapa (90, 300, 250, 310);
    mapa (400, 300, 560, 310);
    mapa (710, 300, 870, 310);
    mapa (1030, 300, 1170, 310);
    mapa (1330, 300, 1480, 310);
    
    mapa (90, 500, 250, 510);
    mapa (400, 500, 560, 510);
    mapa (710, 500, 870, 510);
    mapa (1030, 500, 1170, 510);
    mapa (1330, 500, 1480, 510);
    
    mapa (90, 670, 250, 680);
    mapa (400, 670, 560, 680);
    mapa (710, 670, 870, 680);
    mapa (1030, 670, 1170, 680);
    mapa (1330, 670, 1480, 680);

}

function dibujaBall(){
    
    var canvas = document.getElementById ("dibuix");
    var ctx = canvas.getContext ("2d");
    
    for(var i = 0; i < Mapa.length; i++){
        for(var j = 0; j < Mapa[i].length; j++){

            var auX = mX
            var auY = mY       

            switch(Dir){
                case 1: // Arriba
                    auY = mY - (Vel);
                break;
                case -1: // Abajo
                    auY = mY + (Vel);
                break;
                case 2: // Derecha
                    auX = mX + (Vel);
                break;
                case -2: //Izquierda
                    auX = mX - (Vel);
                break;
                default:break; //Stop, igual que 0
            }

            console.log(`x: ${auX}, y: ${auY}`)

            if((auX > Mapa[i][0] && auX < Mapa[i][2]) && (auY > Mapa[i][1] && auY < Mapa[i][3])){
                ctx.beginPath();
                ctx.arc (mX, mY, 30, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'cyan';
                ctx.fill();
                return;
            }


        }
    }


    switch(Dir){
        case 1: // Arriba
            mY = mY - Vel;
        break;
        case -1: // Abajo
            mY = mY + Vel;
        break;
        case 2: // Derecha
            mX = mX + Vel;
        break;
        case -2: //Izquierda
            mX = mX - Vel;
        break;
        default:break; //Stop, igual que 0
    }
        
    ctx.beginPath();
    ctx.arc (mX, mY, 30, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'cyan';
    ctx.fill();

}


function inici (){
    setInterval(dibujaMapa, 100)
    setInterval(dibujaBall, 100) 
}

function tecla (event) {
   /* W -- 87
    * A -- 65
    * S -- 83
    * D -- 68 
    * X -- 88 */
    
    //Dir =>  0: stop, +1: Arriba, -1: Abajo, +2: Derecha, -2: Izquierda. 
    
    if (event.keyCode == 87) {Dir = 1}  // Arriba
    if (event.keyCode == 83) {Dir = -1} // Abajo
    if (event.keyCode == 68) {Dir = 2}  // Derecha
    if (event.keyCode == 65) {Dir = -2} // Izquierda

    if(event.keyCode == 88){ Dir = 0 } // Stop - Tecla X
}

function ratoli (event) {
}
