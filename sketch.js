var jugador;
var bola;
var empezar = false;
var nivel = 1;
var fondo;
var juegoIniciado = false;
var imgCorazon;
var vidas = 3;
var imagenGameOver;
var imagenNext;
var puntos = 0;

var imgBloque;
var imgBloque2;
var imgBloque3;

 
var bloques = [];
var bloques2 = [];
var bloques3 = [];

var sonidoFondo;
var sonidoColision;

function preload() {
  imgBloque = loadImage('bloque1.png'); 
  imgBloque2 = loadImage('bloque2.png'); 
  imgBloque3 = loadImage('bloque3.png'); 
  fondo = loadImage('fondo.jpg');
  imagenInicio = loadImage('intro.png');
  imgCorazon = loadImage('vidas.png');
  imagenGameOver = loadImage('gameOver.jpg');
  imagenNext = loadImage('Group2.jpg');

  sonidoFondo = loadSound('musicaFondo.mp3');
  inter = loadSound("inter.mp3");

}

function setup() {
  createCanvas(510, 510);
  jugador = new Jugador();
  bola = new Bola();
  sonidoFondo.loop();
  for (var j = 0; j < 5; j++) {
    for (var i = 0; i < 12; i++) {
      bloques.push(new Bloque(i * 40, j * 30));
    }
  }
}

function draw() {
  if (!juegoIniciado) {
    image(imagenInicio, 0, 0, width, height);
     return;
  }
  if (vidas <= 0) {
    image(imagenGameOver, 0, 0, width, height);
    return;  
  }
  
  background(fondo);
  
  for (let i = 0; i < vidas; i++) {
    image(imgCorazon, 10 + i * 45, height - 80, 60, 60);
  }

  jugador.mover();
  jugador.show();
  bola.show();
  if (empezar) {
    bola.mover();
    
    ColisionConJugador();
  }
  
  
  
   if (nivel === 1 && bloques.length === 0) {
    image(imagenNext, 0, 0, width, height);  
    if (key === 'n' || key === 'N') {
      nivel = 2;
      iniciarNivel2();
    }
    return;  
  }

  if (nivel === 2 && bloques2.length === 0) {
    image(imagenNext, 0, 0, width, height);  
    if (key === 'n' || key === 'N') {
      nivel = 3;
      iniciarNivel3();
    }
    return;
  }
  
  
  for(var i = 0; i < bloques.length; i++){
    bloques[i].show();
  }
  
   
  
  for (let i = bloques.length - 1; i >= 0; i--) {
    let b = bloques[i];
    if (colisiona(b, bola)) {
      bloques.splice(i, 1);  
      bola.velocidadY *= -1;  
      inter.play();
      puntos++;
    } else {
      b.show();
    }
  }

  if (nivel === 2) {
    for (let i = bloques.length - 1; i >= 0; i--) {
      let b = bloques[i];
      if (colisiona(b, bola)) {
        bloques.splice(i, 1);
        bola.velocidadY *= -1;
        inter.play();
        puntos++;
      } else {
        b.show();
      }
    }
    
    for (let i = bloques2.length - 1; i >= 0; i--) {
      let b = bloques2[i];
      if (colisiona(b, bola)) {
        b.vidas--;
        bola.velocidadY *= -1;
        inter.play();
        puntos++;
        if (b.vidas <= 0) {
          bloques2.splice(i, 1);
        }
      } else {
        b.show();
      }
    }
  }

  
  if (nivel === 3) {
    for (let i = bloques.length - 1; i >= 0; i--) {
      let b = bloques[i];
      if (colisiona(b, bola)) {
        bloques.splice(i, 1);
        bola.velocidadY *= -1;
        puntos++;
        inter.play();
      } else {
        b.show();
      }
    }

    for (let i = bloques2.length - 1; i >= 0; i--) {
      let b = bloques2[i];
      if (colisiona(b, bola)) {
        b.vidas--;
        bola.velocidadY *= -1;
        puntos++;
        inter.play();
        if (b.vidas <= 0) {
          bloques2.splice(i, 1);
         }
      } else {
        b.show();
      }
    }

    for (let b of bloques3) {
      b.show();
      if (colisiona(b, bola)) {
        bola.velocidadY *= -1;
      }
    }
  }
  fill(255);
  textSize(20);
  text("Puntos: " + puntos, width - 150, height - 10);


}

function Jugador(){
  this.x = width/2;
  this.y = height-30;
  //anchura
  this.w = 120;
  //altura
  this.h = 15;
  //velocidad
  this.v = 5;
  
  this.show = function(){
    rectMode(CENTER);
 
    fill(0,100,140);
    rect(this.x,this.y,this.w, this.h)
 
  };
  
  //https://p5js.org/es/reference/p5/keyIsDown/
  this.mover = function(){
      if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
        this.x -= this.v;
      }

      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
        this.x += this.v;
      }
    
      // Limitar al borde izquierdo
      if (this.x - this.w / 2 < 0) {
        this.x = this.w / 2;
      }

      // Limitar al borde derecho
      if (this.x + this.w / 2 > width) {
        this.x = width - this.w / 2;
      }
   };
}

function Bloque(x, y){
  this.x = x;
  this.y = y;
  
  this.show = function(){
    fill(0,100,140);
    image(imgBloque, this.x,this.y, 50, 30)
  };
  
}

function Bloque2(x, y){
  this.x = x;
  this.y = y;
  this.vidas = 3;

  this.show = function(){
    fill(0,100,140);
    image(imgBloque2, this.x,this.y, 50, 30)
  };
  
}

function Bloque3(x, y){
  this.x = x;
  this.y = y;

  this.show = function(){
    image(imgBloque3, this.x, this.y, 50, 30);
  };
}


function Bola(x, y){
  this.x = width/2;
  this.y = height-50;
  this.radio = 18;
  this.velocidadX = 7;
  this.velocidadY = 7;

  this.show = function(){
    fill(0,100,140);
    ellipse(this.x, this.y, this.radio, this.radio)
  };
  
  this.mover = function(){
    this.x += this.velocidadX;
    this.y += this.velocidadY;   
    
    // rebote con los bordes izquierdo y derecho
    if (this.x - this.radio/2 <= 0 || this.x + this.radio/2         >= width) {
      this.velocidadX *= -1;
    }

    // rebote con el borde superior
    if (this.y - this.radio/2 <= 0) {
      this.velocidadY *= -1;
    }

    // rebote con el borde inferior, se reinicia
    if (this.y + this.radio/2 >= height) {
      empezar = false;  
      this.x = width/2;
      this.y = height-50;    
      vidas -=1;
    }
    
     
  };
  
 
}

function keyPressed() {
  if (key === ' ') {
    empezar = true;
  }
     /*if (nivel === 1 && bloques.length === 0) {
      
      image(imagenNext, 0, 0, width, height);

      if (key === 'n' || key === 'N') {
          nivel = 2;
          iniciarNivel2();
      }
    } else if (nivel === 2 && bloques2.length === 0) {
      nivel = 3;
      iniciarNivel3();
    }*/
  if (key === 'n' || key === 'N') {
      bola.x = width / 2; // Resetea la posición de la bola
      bola.y = height - 50; // Resetea la posición de la bola
      bola.velocidadX = 7; // Resetea la velocidad
      bola.velocidadY = 7; // Resetea la velocidad
      empezar = false; // Evita que la bola empiece a moverse inmediatamente
    }
  
  if (key === 'Enter') {
    juegoIniciado = true;
  }
  
}

function colisiona(bloque, bola) {
  return (
    bola.x + bola.radio/2 > bloque.x &&
    bola.x - bola.radio/2 < bloque.x + 45 &&
    bola.y + bola.radio/2 > bloque.y &&
    bola.y - bola.radio/2 < bloque.y + 30
  );
}

 function ColisionConJugador() {
   let mitadAncho = jugador.w / 2;
  let mitadAlto = jugador.h / 2;

  if (
    bola.x + bola.radio / 2 > jugador.x - mitadAncho &&
    bola.x - bola.radio / 2 < jugador.x + mitadAncho &&
    bola.y + bola.radio / 2 > jugador.y - mitadAlto &&
    bola.y - bola.radio / 2 < jugador.y + mitadAlto
  ) {
    bola.velocidadY *= -1;
  }
}

function iniciarNivel2() {
  bloques = [];
  bloques2 = [];

   for (var j = 0; j < 6; j++) {
    for (var i = 0; i < 12; i++) {
      bloques.push(new Bloque(i * 40, j * 30));
    }
  }

   for (var j = 0; j < 1; j++) {
    for (var i = 0; i < 12; i++) {
      bloques2.push(new Bloque2(i * 40, (j + 5) * 30)); // <--- aquí se bajan
    }
  }
}



function iniciarNivel3() {
  bloques = [];
  bloques2 = [];
  bloques3 = [];

   for (var j = 0; j < 6; j++) {
    for (var i = 0; i < 10; i++) {
      bloques.push(new Bloque(i * 50, j * 30));
    }
  }

   for (var j = 2; j < 1; j++) {
    for (var i = 0; i < 10; i++) {
      bloques2.push(new Bloque2(i * 50, j * 30));
    }
  }

  bloques3.push(new Bloque3(100, 120));
  bloques3.push(new Bloque3(400, 120));

}
 
