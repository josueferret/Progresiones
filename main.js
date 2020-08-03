var nota1 = document.getElementsByClassName("1")[0];
var nota2 = document.getElementsByClassName("2")[0];
var nota3 = document.getElementsByClassName("3")[0];
var nota4 = document.getElementsByClassName("4")[0];

nota1.addEventListener("click", cambiar);
nota2.addEventListener("click", cambiar);
nota3.addEventListener("click", cambiar);
nota4.addEventListener("click", cambiar);

//sonido
var aContext;
var osc1;
var osc2;
var osc3;

var gainNode;

var notaActual;
var sonidoActual;

var frecuencia1 = [];
var frecuencia2 = [];
var frecuencia3 = [];
var frecuencia4 = [];

var frecuenciaActual = [100, 200, 300];

var iniciarUnica = 0;

var reset = document.getElementById("reset");
reset.addEventListener("click", cambiarTodos);

var play = document.getElementById("play");
play.addEventListener("click", sonido);

var set1;
var set2;
var set3;
var set4;

var multiplicador = 1;
var segundos = document.getElementById("segundos");
segundos.addEventListener("click", tempo);

function tempo() {
    if (iniciarUnica != 0) {
        clearTimeout(set1);
        clearTimeout(set2);
        clearTimeout(set3);
        clearTimeout(set4);
        gainNode.gain.setValueAtTime(0, aContext.currentTime);
        document.getElementsByClassName("nota")[0].style.border = "1px solid transparent";
        document.getElementsByClassName("nota")[1].style.border = "1px solid transparent";
        document.getElementsByClassName("nota")[2].style.border = "1px solid transparent";
        document.getElementsByClassName("nota")[3].style.border = "1px solid transparent";
    }

    if (segundos.innerHTML == "1s") {
        segundos.innerHTML = "2s";
        multiplicador = 2;
    } else if (segundos.innerHTML == "2s") {
        segundos.innerHTML = "4s";
        multiplicador = 4;
    } else {
        segundos.innerHTML = "1s";
        multiplicador = 1;
    }
}

//acordes
var frecuencias = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.26, 698.46, 739.99, 783.99, 830.61, 880.00, 932.33, 987.77];

var DoMayor = [frecuencias[0], frecuencias[4], frecuencias[7]];
var DoMenor = [frecuencias[0], frecuencias[3], frecuencias[7]];
var DoDisminuido = [frecuencias[0], frecuencias[3], frecuencias[6]];
var DoMayorSostenido = [frecuencias[1], frecuencias[5], frecuencias[8]];
var DoMenorSostenido = [frecuencias[1], frecuencias[4], frecuencias[8]];
var DoDisminuidoSostenido = [frecuencias[1], frecuencias[4], frecuencias[7]];

var ReMayor = [frecuencias[0 + 2], frecuencias[4 + 2], frecuencias[7 + 2]];
var ReMenor = [frecuencias[0 + 2], frecuencias[3 + 2], frecuencias[7 + 2]];
var ReDisminuido = [frecuencias[0 + 2], frecuencias[3 + 2], frecuencias[6 + 2]];
var ReMayorSostenido = [frecuencias[1 + 2], frecuencias[5 + 2], frecuencias[8 + 2]];
var ReMenorSostenido = [frecuencias[1 + 2], frecuencias[4 + 2], frecuencias[8 + 2]];
var ReDisminuidoSostenido = [frecuencias[1 + 2], frecuencias[4 + 2], frecuencias[7 + 2]];

var MiMayor = [frecuencias[0 + 4], frecuencias[4 + 4], frecuencias[7 + 4]];
var MiMenor = [frecuencias[0 + 4], frecuencias[3 + 4], frecuencias[7 + 4]];
var MiDisminuido = [frecuencias[0 + 4], frecuencias[3 + 4], frecuencias[6 + 4]];
var MiMayorSostenido = [frecuencias[1 + 4], frecuencias[5 + 4], frecuencias[8 + 4]];
var MiMenorSostenido = [frecuencias[1 + 4], frecuencias[4 + 4], frecuencias[8 + 4]];
var MiDisminuidoSostenido = [frecuencias[1 + 4], frecuencias[4 + 4], frecuencias[7 + 4]];

var FaMayor = [frecuencias[0 + 5], frecuencias[4 + 5], frecuencias[7 + 5]];
var FaMenor = [frecuencias[0 + 5], frecuencias[3 + 5], frecuencias[7 + 5]];
var FaDisminuido = [frecuencias[0 + 5], frecuencias[3 + 5], frecuencias[6 + 5]];
var FaMayorSostenido = [frecuencias[1 + 5], frecuencias[5 + 5], frecuencias[8 + 5]];
var FaMenorSostenido = [frecuencias[1 + 5], frecuencias[4 + 5], frecuencias[8 + 5]];
var FaDisminuidoSostenido = [frecuencias[1 + 5], frecuencias[4 + 5], frecuencias[7 + 5]];

var SolMayor = [frecuencias[0 + 7], frecuencias[4 + 7], frecuencias[7 + 7]];
var SolMenor = [frecuencias[0 + 7], frecuencias[3 + 7], frecuencias[7 + 7]];
var SolDisminuido = [frecuencias[0 + 7], frecuencias[3 + 7], frecuencias[6 + 7]];
var SolMayorSostenido = [frecuencias[1 + 7], frecuencias[5 + 7], frecuencias[8 + 7]];
var SolMenorSostenido = [frecuencias[1 + 7], frecuencias[4 + 7], frecuencias[8 + 7]];
var SolDisminuidoSostenido = [frecuencias[1 + 7], frecuencias[4 + 7], frecuencias[7 + 7]];

var LaMayor = [frecuencias[0 + 9], frecuencias[4 + 9], frecuencias[7 + 9]];
var LaMenor = [frecuencias[0 + 9], frecuencias[3 + 9], frecuencias[7 + 9]];
var LaDisminuido = [frecuencias[0 + 9], frecuencias[3 + 9], frecuencias[6 + 9]];
var LaMayorSostenido = [frecuencias[1 + 9], frecuencias[5 + 9], frecuencias[8 + 9]];
var LaMenorSostenido = [frecuencias[1 + 9], frecuencias[4 + 9], frecuencias[8 + 9]];
var LaDisminuidoSostenido = [frecuencias[1 + 9], frecuencias[4 + 9], frecuencias[7 + 9]];

var SiMayor = [frecuencias[0 + 11], frecuencias[4 + 11], frecuencias[7 + 11]];
var SiMenor = [frecuencias[0 + 11], frecuencias[3 + 11], frecuencias[7 + 11]];
var SiDisminuido = [frecuencias[0 + 11], frecuencias[3 + 11], frecuencias[6 + 11]];
var SiMayorSostenido = [frecuencias[1 + 11], frecuencias[5 + 11], frecuencias[8 + 11]];
var SiMenorSostenido = [frecuencias[1 + 11], frecuencias[4 + 11], frecuencias[8 + 11]];
var SiDisminuidoSostenido = [frecuencias[1 + 11], frecuencias[4 + 11], frecuencias[7 + 11]];

var matriz = [
    ["La (A) mayor", "Si (B) menor", "Do (C) # menor", "Re (D) mayor", "Mi (E) mayor", "Fa (F) # menor", "Sol (G) # disminuido", "La (A) menor", "Si (B) disminuido", "Do (C) mayor", "Re (D) menor", "Mi (E) menor", "Fa (F) mayor", "Sol (G) mayor"],
    ["Si (B) mayor", "Do (C) # menor", "Re (D) # menor", "Mi (E) mayor", "Fa (F) # mayor", "Sol (G) # menor", "La (A) # disminuido", "Si (B) mayor", "Do (C) # disminuido", "Re (D) mayor", "Mi (E) menor", "Fa (F) # menor", "Sol (G) mayor", "La (A) mayor"],
    ["Do (C) mayor", "Re (D) menor", "Mi (E) menor", "Fa (F) mayor", "Sol (G) mayor", "La (A) menor", "Si (B) disminuido", "Do (C) menor", "Re (D) disminuido", "Mi (E) bemol mayor", "Fa (F) menor", "Sol (G) menor", "La (A) bemol mayor", "Si (B) bemol mayor"],
    ["Re (D) mayor", "Mi (E) menor", "Fa (F) # menor", "Sol (G) mayor", "La (A) mayor", "Si (B) menor", "Do (C) # disminuido", "Re (D) menor", "Mi (E) disminuido", "Fa (F) mayor", "Sol (G) menor", "La (A) menor", "Si (B) bemol mayor", "Do (C) mayor"],
    ["Mi (E) mayor", "Fa (F) # menor", "Sol (G) # menor", "La (A) mayor", "Si (B) mayor", "Do (C) # menor", "Re (D) # disminuido", "Mi (E) menor", "Fa (F) # disminuido", "Sol (G) mayor", "La (A) menor", "Si (B) menor", "Do (C) mayor", "Re (D) mayor"],
    ["Fa (F) mayor", "Sol (G) menor", "La (A) menor", "Si (B) bemol mayor", "Do (C) mayor", "Re (D) menor", "Mi (E) disminuido", "Fa (F) menor", "Sol (G) disminuido", "La (A) bemol mayor", "Si (B) bemol menor", "Do (C) menor", "Re (D) bemol mayor", "Mi (E) bemol mayor"],
    ["Sol (G) mayor", "La (A) menor", "Si (B) menor", "Do (C) mayor", "Re (D) mayor", "Mi (E) menor", "Fa (F) # disminuido", "Sol (G) menor", "La (A) disminuido", "Si (B) bemol mayor", "Do (C) menor", "Re (D) menor", "Mi (E) bemol mayor", "Fa (F) mayor"]
];

var matrizAcordes = [
    [LaMayor, SiMenor, DoMenorSostenido, ReMayor, MiMayor, FaMenorSostenido, SolDisminuidoSostenido, LaMenor, SiDisminuido, DoMayor, ReMenor, MiMenor, FaMayor, SolMayor],
    [SiMayor, DoMenorSostenido, ReMenorSostenido, MiMayor, FaMayorSostenido, SolMenorSostenido, LaDisminuidoSostenido, SiMayor, DoDisminuidoSostenido, ReMayor, MiMenor, FaMenorSostenido, SolMayor, LaMayor],
    [DoMayor, ReMenor, MiMenor, FaMayor, SolMayor, LaMenor, SiDisminuido, DoMenor, ReDisminuido, ReMayorSostenido, FaMenor, SolMenor, SolMayorSostenido, LaMayorSostenido],
    [ReMayor, MiMenor, FaMenorSostenido, SolMayor, LaMayor, SiMenor, DoDisminuidoSostenido, ReMenor, MiDisminuido, FaMayor, SolMenor, LaMenor, LaMayorSostenido, DoMayor],
    [MiMayor, FaMenorSostenido, SolMenorSostenido, LaMayor, SiMayor, DoMenorSostenido, ReDisminuidoSostenido, MiMenor, FaDisminuidoSostenido, SolMayor, LaMenor, SiMenor, DoMayor, ReMayor],
    [FaMayor, SolMenor, LaMenor, LaMayorSostenido, DoMayor, ReMenor, MiDisminuido, FaMenor, SolDisminuido, SolMayorSostenido, LaMenorSostenido, DoMenor, DoMayorSostenido, ReMayorSostenido],
    [SolMayor, LaMenor, SiMenor, DoMayor, ReMayor, MiMenor, FaDisminuidoSostenido, SolMenor, LaDisminuido, LaMayorSostenido, DoMenor, ReMenor, ReMayorSostenido, FaMayor]
];

function cambiarTodos() {
    let fila = numeroAleatorio(0, 6);

    notaActual = matriz[fila];
    sonidoActual = matrizAcordes[fila];

    n1 = numeroAleatorio(0, 13);
    n2 = numeroAleatorio(0, 13);
    n3 = numeroAleatorio(0, 13);
    n4 = numeroAleatorio(0, 13);

    nota1.innerHTML = notaActual[n1];
    nota2.innerHTML = notaActual[n2];
    nota3.innerHTML = notaActual[n3];
    nota4.innerHTML = notaActual[n4];

    frecuencia1 = sonidoActual[n1];
    frecuencia2 = sonidoActual[n2];
    frecuencia3 = sonidoActual[n3];
    frecuencia4 = sonidoActual[n4];

    if (iniciarUnica == 0) {
        aContext = new window.AudioContext();
        osc1 = aContext.createOscillator();
        osc2 = aContext.createOscillator();
        osc3 = aContext.createOscillator();

        gainNode = aContext.createGain();

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        osc3.connect(gainNode);

        gainNode.connect(aContext.destination);

        osc1.start();
        osc2.start();
        osc3.start();

        gainNode.gain.setValueAtTime(0, aContext.currentTime);

        iniciarUnica = 1;
    }
    clearTimeout(set1);
    clearTimeout(set2);
    clearTimeout(set3);
    clearTimeout(set4);
    gainNode.gain.setValueAtTime(0, aContext.currentTime);
    document.getElementsByClassName("nota")[0].style.border = "1px solid transparent";
    document.getElementsByClassName("nota")[1].style.border = "1px solid transparent";
    document.getElementsByClassName("nota")[2].style.border = "1px solid transparent";
    document.getElementsByClassName("nota")[3].style.border = "1px solid transparent";
}

function sonido() {

    if (iniciarUnica != 0) {
        clearTimeout(set1);
        clearTimeout(set2);
        clearTimeout(set3);
        clearTimeout(set4);

        gainNode.gain.setValueAtTime(0, aContext.currentTime);
        document.getElementsByClassName("nota")[0].style.border = "1px solid transparent";
        document.getElementsByClassName("nota")[1].style.border = "1px solid transparent";
        document.getElementsByClassName("nota")[2].style.border = "1px solid transparent";
        document.getElementsByClassName("nota")[3].style.border = "1px solid transparent";

        let volumen = 0.1;

        frecuenciaActual = frecuencia1;
        osc1.frequency.setValueAtTime(frecuenciaActual[0], aContext.currentTime);
        osc2.frequency.setValueAtTime(frecuenciaActual[1], aContext.currentTime);
        osc3.frequency.setValueAtTime(frecuenciaActual[2], aContext.currentTime);
        gainNode.gain.setValueAtTime(volumen, aContext.currentTime);
        document.getElementsByClassName("nota")[0].style.border = "1px solid white";
        document.getElementsByClassName("nota")[1].style.border = "1px solid transparent";
        document.getElementsByClassName("nota")[2].style.border = "1px solid transparent";
        document.getElementsByClassName("nota")[3].style.border = "1px solid transparent";

        set1 = setTimeout(() => {
            frecuenciaActual = frecuencia2;
            osc1.frequency.setValueAtTime(frecuenciaActual[0], aContext.currentTime);
            osc2.frequency.setValueAtTime(frecuenciaActual[1], aContext.currentTime);
            osc3.frequency.setValueAtTime(frecuenciaActual[2], aContext.currentTime);
            gainNode.gain.setValueAtTime(volumen, aContext.currentTime);
            document.getElementsByClassName("nota")[0].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[1].style.border = "1px solid white";
            document.getElementsByClassName("nota")[2].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[3].style.border = "1px solid transparent";
        }, 1000 * multiplicador);

        set2 = setTimeout(() => {
            frecuenciaActual = frecuencia3;
            osc1.frequency.setValueAtTime(frecuenciaActual[0], aContext.currentTime);
            osc2.frequency.setValueAtTime(frecuenciaActual[1], aContext.currentTime);
            osc3.frequency.setValueAtTime(frecuenciaActual[2], aContext.currentTime);
            gainNode.gain.setValueAtTime(volumen, aContext.currentTime);
            document.getElementsByClassName("nota")[0].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[1].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[2].style.border = "1px solid white";
            document.getElementsByClassName("nota")[3].style.border = "1px solid transparent";
        }, 2000 * multiplicador);

        set3 = setTimeout(() => {
            frecuenciaActual = frecuencia4;
            osc1.frequency.setValueAtTime(frecuenciaActual[0], aContext.currentTime);
            osc2.frequency.setValueAtTime(frecuenciaActual[1], aContext.currentTime);
            osc3.frequency.setValueAtTime(frecuenciaActual[2], aContext.currentTime);
            gainNode.gain.setValueAtTime(volumen, aContext.currentTime);
            document.getElementsByClassName("nota")[0].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[1].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[2].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[3].style.border = "1px solid white";
        }, 3000 * multiplicador);

        set4 = setTimeout(() => {
            gainNode.gain.setValueAtTime(0, aContext.currentTime);
            document.getElementsByClassName("nota")[0].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[1].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[2].style.border = "1px solid transparent";
            document.getElementsByClassName("nota")[3].style.border = "1px solid transparent";
        }, 4000 * multiplicador);
    }
}

function cambiar() {
    clearTimeout(set1);
    clearTimeout(set2);
    clearTimeout(set3);
    clearTimeout(set4);
    gainNode.gain.setValueAtTime(0, aContext.currentTime);
    document.getElementsByClassName("nota")[0].style.border = "1px solid transparent";
    document.getElementsByClassName("nota")[1].style.border = "1px solid transparent";
    document.getElementsByClassName("nota")[2].style.border = "1px solid transparent";
    document.getElementsByClassName("nota")[3].style.border = "1px solid transparent";

    var cambiarNota = numeroAleatorio(0, 13);
    this.innerHTML = notaActual[cambiarNota];

    if (nota1.innerHTML != notaActual[n1]) {
        frecuencia1 = sonidoActual[cambiarNota];
        n1 = cambiarNota;
    }
    if (nota2.innerHTML != notaActual[n2]) {
        frecuencia2 = sonidoActual[cambiarNota];
        n2 = cambiarNota;
    }
    if (nota3.innerHTML != notaActual[n3]) {
        frecuencia3 = sonidoActual[cambiarNota];
        n3 = cambiarNota;
    }
    if (nota4.innerHTML != notaActual[n4]) {
        frecuencia4 = sonidoActual[cambiarNota];
        n4 = cambiarNota;
    }
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}