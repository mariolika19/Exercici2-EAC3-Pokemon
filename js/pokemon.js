$(document).ready(function(){
	let contenidorPokemons = $('.contenidor-pokemon');
	function carregarPokemons() {
	  let imatgesPokemons = '';
	  // 1118 Pokemons disponibles
	  for (let i = 1; i <= 600; i++) {
	    imatgesPokemons += `
	      <img class='pokemon-img' data-id='${i}' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg'>
	    `;
	  }
	  contenidorPokemons.html(imatgesPokemons);
	}

	carregarPokemons();

	//-------EJERCICIO 1-------//
	//Añadimos una función si hacemos click en alguna de las imágenes
	$(".pokemon-img").on("click", cambioPokemon);

	//Función que realizará la llamada a AJAX
	function cambioPokemon(){		
		//Cogemos el valor id de la imagen clickeada
		let id = $(this).data("id");

		//Hacemos la llamada a AJAX de tipo GET
		$.ajax({
			url: "https://pokeapi.co/api/v2/pokemon/" + id,
			method:'get',
			dataType: "json",
			success: function (datos) {
				completarDatos(datos)
			}	
		});
	}
	
	//-------EJERCICIO 2-------//
	//Función que cambia los datos del pj seleccionado
	function completarDatos(datos){
		//Cambiamos el nombre y el tipo
		$(".pokemon-nom").text(datos.name);  
		$("#tipus").text(datos.types[0].type.name);	

		//Añadimos sólo tres movimientos y los puntos suspensivos
		$("#moviments").text(datos.moves[0].move.name +", "+ datos.moves[1].move.name+", "+ datos.moves[2].move.name +"...");

		//Cambiamos los datos de experiencia base, altura y peso
		$("#exp_base").text(datos.base_experience);
		$("#height").text(datos.height);
		$("#weight").text(datos.weight);
		
		//Cambiamos los datos de HP, ataque y defensa
		$("#hp").text(datos.stats[0].base_stat);
		$("#attack").text(datos.stats[1].base_stat);
		$("#defense").text(datos.stats[2].base_stat);

		//Cambiamos las imágenes
		$(".pokemon-imatges").find("img:first").attr("src", datos.sprites.front_default);   //La delantera
		$(".pokemon-imatges").find("img:last").attr("src", datos.sprites.back_default);	    //La trasera
	}
});