//let cria variaveis
//variaveis da bolinha
let xBolinha = 300
let yBolinha = 200
let diametro = 15
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 100;

//variaveis da raquete
let xRaquete = 4;
let yRaquete = 150;


//variaveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//erro oponente
let chanceDeErrar = 0;

function preload (){
 trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");

}

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop();

}

function draw() {
  background(0);
  mostraBolinha ();  
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimenteRaqueteOponente(); 
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
}
  
  // if significa Se (estiver tocando a borda)
  // width significa largura maxima
  // para descrever OU na programaçao utilizamos ||
  // height significa altura
  
  
function mostraBolinha (){
  circle (xBolinha,yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
}

function verificaColisaoBorda (){
  if (xBolinha + raio > width || xBolinha - raio < 0){
  velocidadeXBolinha *= -1;  
    
  }
  
  if ( yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }  
  
}

function mostraRaquete (x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
  
}

//se a tecla estiver pressionada minha raquete se movimenta

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
}
}

function verificaColisaoRaquete(){
if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
  velocidadeXBolinha *= -1;
  raquetada.play();
}

}
 
function verificaColisaoRaquete(x, y){
  colidiu =
  collideRectCircle(x,y,raqueteComprimento,raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  }
function movimenteRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente -raqueteComprimento /2 -30;
  yRaqueteOponente +=velocidadeYOponente + chanceDeErrar 
  calculaChanceDeErrar()

}

function incluirPlacar(){
  stroke (255);
  textAlign(CENTER);
  textSize(18);
  fill(color(255, 140, 0));
  rect (170,10,40,20);  
  fill(255)
  text(meusPontos, 200, 28);
  fill(color(255, 140, 0));  
  rect (450,10,40,20);  
  fill(255)
  text(pontosDoOponente, 470, 28);

} 

function marcaPonto(){
   if (xBolinha > 590) {meusPontos += 1;
    ponto.play()
}
  if (xBolinha < 10){ 
  pontosDoOponente += 1
    ponto.play()
}

}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
