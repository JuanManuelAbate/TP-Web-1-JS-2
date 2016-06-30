//Se definen constantes
const VALOR_PLENO = 10;
const VALOR_COLOR = 2;
const VALOR_PAR_IMPAR = 4;
const VALOR_MAYOR_MENOR = 4;
const NUMEROS_ROJOS = [1,2,3,4,10];

$("document").ready(function() {

	//Se setean colores de numeros en interfaz
	for (var i = 1; i <= 10; i++) {
		idBoton = "#" + i.toString();
		if(jQuery.inArray(i, NUMEROS_ROJOS) !== -1)
			$(idBoton).addClass("rojo");
    else {
      $(idBoton).addClass("negro");
    }
	}

  //Se oculta boton revancha
	$("#revancha").hide();

	//Se crean objetos relacionados al juego
  var jugador = new Jugador();
  var apuestas = new Apuesta();
	var apuestasRevancha = new Apuesta();
  var juegoRuleta = new Juego();

	//Carga cada tipo de apuesta
	$(".pleno").click(function(){
    if (jugador.credito > 0){
			apuestas.apostarPleno($(this).attr("id"));
			$(this).children().html(apuestas.numeros[$(this).attr("id")]);
      jugador.modificarCredito(-1);
    }
    else {
      alert("Creditos insuficientes");
    }
  });
  $("#negro").click(function(){
    if (jugador.credito > 0){
      apuestas.apostarNegro();
			$(this).children().html(apuestas.colorNegro);
      jugador.modificarCredito(-1);
    }
    else {
      alert("Creditos insuficientes");
    }
  });
  $("#rojo").click(function(){
    if (jugador.credito > 0){
      apuestas.apostarRojo();
			$(this).children().html(apuestas.colorRojo);
      jugador.modificarCredito(-1);
    }
    else {
      alert("Creditos insuficientes");
    }
  });
  $("#par").click(function(){
    if (jugador.credito > 0){
      apuestas.apostarPar();
			$(this).children().html(apuestas.par);
      jugador.modificarCredito(-1);
    }
    else {
      alert("Creditos insuficientes");
    }
  });
  $("#impar").click(function(){
    if (jugador.credito > 0){
      apuestas.apostarImpar();
			$(this).children().html(apuestas.impar);
      jugador.modificarCredito(-1);
    }
    else {
      alert("Creditos insuficientes");
    }
  });
  $("#mayor").click(function(){
    if (jugador.credito > 0){
      apuestas.apostarMayor();
			$(this).children().html(apuestas.mayor);
      jugador.modificarCredito(-1);
    }
    else {
      alert("Creditos insuficientes");
    }
  });
  $("#menor").click(function(){
    if (jugador.credito > 0){
      apuestas.apostarMenor();
			$(this).children().html(apuestas.menor);
      jugador.modificarCredito(-1);
    }
    else {
      alert("Creditos insuficientes");
    }
  });

	//Se efectiviza la apuesta
  $("#apostar").click(function(){
		if (apuestas.aposto === true){
			var numeroGanador = juegoRuleta.tirar();
			var premio = juegoRuleta.jugar(apuestas, numeroGanador);
			jugador.modificarCredito(premio);
			if (premio === 0){
				$("#revancha").show();
				apuestasRevancha.copiarApuesta(apuestas);
			}
			else {
				$("#revancha").hide();
			}
			apuestas.limpiarApuestas();
			$(".monto-ap").html(0);
			$("#r-ruleta").html(numeroGanador);
			$("#r-recompensa").html(premio);
			$("#p-creditos").html(jugador.credito);
		}
		else {
			alert("No realizo ninguna apuesta");
		}
  });

	//Se efectiviza la revancha
	$("#revancha").click(function(){
		if (jugador.credito >= 10){
			jugador.modificarCredito(-10);
			var numeroGanador = juegoRuleta.tirar();
			var premio = juegoRuleta.jugar(apuestasRevancha, numeroGanador);
			jugador.modificarCredito(premio);
			$("#revancha").hide();
			$("#r-ruleta").html(numeroGanador);
			$("#r-recompensa").html(premio);
			$("#p-creditos").html(jugador.credito);
		}
		else {
			alert("Creditos insuficientes")
		}
	});
});

//Clase y funciones Juego
function Juego(){
}

Juego.prototype.tirar = function () {
	return Math.round(Math.random()*10);
}

Juego.prototype.jugar = function(apuestas, numeroGanador){
	return apuestas.calcularPremioApuesta(numeroGanador);
}

//Clase y funciones Jugador
function Jugador(){
  this.credito = 100;
}

Jugador.prototype.modificarCredito = function(credito) {
	this.credito += credito;
}

//Clase y funciones Apuesta
function Apuesta(){
  this.numeros = [0,0,0,0,0,0,0,0,0,0,0];
  this.colorRojo = 0;
  this.colorNegro = 0;
  this.par = 0;
  this.impar = 0;
  this.mayor = 0;
  this.menor = 0;
	this.aposto = false;
}

Apuesta.prototype.apostarPleno = function(numApostar) {
    this.numeros[numApostar] += 1;
		this.aposto = true;
};

Apuesta.prototype.apostarRojo = function() {
    this.colorRojo += 1;
		this.aposto = true;
};

Apuesta.prototype.apostarNegro = function() {
    this.colorNegro += 1;
		this.aposto = true;
};

Apuesta.prototype.apostarPar = function() {
    this.par += 1;
		this.aposto = true;
};

Apuesta.prototype.apostarImpar = function() {
    this.impar += 1;
		this.aposto = true;
};

Apuesta.prototype.apostarMayor = function() {
    this.mayor += 1;
		this.aposto = true;
};

Apuesta.prototype.apostarMenor = function() {
    this.menor += 1;
		this.aposto = true;
};

Apuesta.prototype.limpiarApuestas = function() {
  this.numeros = [0,0,0,0,0,0,0,0,0,0,0];
  this.colorRojo = 0;
  this.colorNegro = 0;
  this.par = 0;
  this.impar = 0;
  this.mayor = 0;
  this.menor = 0;
	this.aposto = false;
};

Apuesta.prototype.calcularPremioApuesta = function(numeroGanador) {
  var total = 0;
  total += (this.numeros[numeroGanador] * VALOR_PLENO);
  if (numeroGanador !== 0){
    if(jQuery.inArray(numeroGanador, NUMEROS_ROJOS) !== -1)
      total += (this.colorRojo * VALOR_COLOR);
    else {
      total += (this.colorNegro * VALOR_COLOR);
    }
    if ((numeroGanador % 2 === 0))
      total += (this.par * VALOR_PAR_IMPAR);
    else {
      total += (this.impar * VALOR_PAR_IMPAR);
    }
    if (numeroGanador <= 5)
      total += (this.menor * VALOR_MAYOR_MENOR);
    else {
      total += (this.mayor * VALOR_MAYOR_MENOR);
    }
  }
  return total;
}

Apuesta.prototype.copiarApuesta = function(apuestaACopiar){
	this.numeros = apuestaACopiar.numeros;
  this.colorRojo = apuestaACopiar.colorRojo;
  this.colorNegro = apuestaACopiar.colorNegro;
  this.par = apuestaACopiar.par;
  this.impar = apuestaACopiar.impar;
  this.mayor = apuestaACopiar.mayor;
  this.menor = apuestaACopiar.menor;
}
