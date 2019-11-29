var cifrasNro = [];
var numero =  "";
var cantNros = null;
var ciento = false;
var ultNroListo = false;
var nroEsDecena = false;
var mil = "";

unidades = ["", "Uno","Dos","Tres","Cuatro","Cinco","Seis","Siete","Ocho","Nueve"]; 
diezx =["","Once","Doce","Trece","Catorce","Quince","Dieciseis","Diecisiete","Dieciocho","Diecinueve"];
veintix =["","Veintiuno","Veintidos","Veintitres","Veinticuatro","Veinticinco","Veintiseis","Veintisiete","Veintiocho","Veintinueve"]; 
decena =  ["", "Diez", "Veinte","Treinta", "Cuarenta", "Cincuenta", "Sesenta", "Setenta", "Ochenta", "Noventa"];
cent = ["","Cien", "Doscientos","Trescientos", "Cuatrocientos", "Quinientos", "Seiscientos", "Setecientos", "Ochocientos", "Novecientos"]; 

window.onload = function ingresar(){
	
	var nro = prompt("Ingrese un número:","");	
	NroALetras(nro);
	
}

function impresion(numeroLetras){
	document.write("<br>"); 
	document.write('El numero ingresado es '+ numeroLetras);
	document.write("<br>"); 
}

function NroALetras(num) {
	
	cantNros= num.length;
	
    if(!isNaN(num)){
		
		var nroInt = parseInt(num);
		
		if(cantNros == 1){
			if(nroInt==0){
				impresion("Cero");
			}else if(nroInt<10){
				numero += unidades[nroInt];
			}
		}else{
			getCifrasNro(num);
			getNombreNumero(cantNros);
		}
		impresion(numero);
	
	}else{
		alert("Ingrese un valor numerico.");
	}
}

function getCifrasNro(nro){
	var divisionDiez = Math.trunc(nro/10);
	var restoDivDiez = nro%10;
	
	if(divisionDiez < 10){
		cifrasNro.push(restoDivDiez);
		cifrasNro.push(divisionDiez);			
	}else{
		cifrasNro.push(restoDivDiez);
		getCifrasNro(divisionDiez);
	}
}

function getNombreNumero(cantCifras){
	
	var cifrasUltIndice = cantCifras-1;
	
	var j = 1;

	if(cantCifras==2){
		var nro = cifrasNro[cifrasUltIndice];
		var proxNro = cifrasNro[cifrasUltIndice-1];
		
		var nroEsDecena = true;
		
		Decenas(nro, proxNro, ciento, nroEsDecena);
		
	}else{
		for(var i=cifrasUltIndice; i>=0; i--){		
			
			var cifrasRestantes = cantCifras - j;
			
			var nro = cifrasNro[i];
			var proxNro = cifrasNro[i-1];	
			
			switch(cifrasRestantes)
			{
				case 0:	
					if(ultNroListo == false){
						numero += unidades[nro];
					}
					break;
				case 1:
					Decenas(nro, proxNro, ciento, nroEsDecena);
					break;
				case 2:
					Centenas(nro);
					break;
				case 3: 
				case 4:
				case 5:
					Miles(nro, cifrasRestantes, proxNro);
				
			}
			j++;
			
		}
	}
}

function Decenas(dec, proxNro, ciento, nroEsDecena){
	
	if(ciento == true && (dec != 0 || proxNro != 0)){
		numero += "to ";
		ciento = false;		
	}else{
		numero += " ";
	}
	
	if(proxNro != 0){
		if (dec == 1){
			numero += diezx[proxNro];
		}else if(dec == 2){
			numero += veintix[proxNro];
			ultNroListo = true;
		}else{
			if(nroEsDecena == true){
				numero += decena[dec];
				numero += " Y ";
				numero += unidades[proxNro];				
			}else{
				numero += decena[dec];
				numero += " Y ";
			}
		}
	}else if(proxNro == 0){
		numero += decena[dec];
	}
}

function Centenas(nro) {
	if(nro == 1){
		ciento = true;
		numero += "Cien";
	}else if(nro < 10 && nro != 0){
		numero += cent[nro];
	}
}

function Miles(nroMil, cantNrosRestantes, proxNro) {
	
	if(nroMil == 1 && cantNrosRestantes == 3){
		numero += "Mil ";	
	}else{
		switch(cantNrosRestantes)
		{
			case 3:
				if(nroMil != 1){
					mil += unidades[nroMil];
					mil += " ";
				}
				mil += "Mil ";
				numero += mil;
				break;
			case 4:
				mil += Decenas(nroMil, proxNro, ciento, nroEsDecena);
				break;
			case 5:
				mil += Centenas(nroMil);
				break;			
		}
	}	
}