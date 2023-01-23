let pokemonList = [{
    name: 'Nidoking',
    type: ['Ground','Poison'],
    height: 1.6
    },{
    name: 'Golbat',
    type: ['Poison','Flying'],
    height: 1.6
    },{
    name: 'Arbok', 
    type: ['Poison'], 
    height: 3.5
    },{
    name: 'Charizard',
    type: ['Fire','Flying'],
    height: 5.7
    }];

pokemonList.forEach(function(pokemon) {
    if (pokemon.height >=5) { // If the pokemon height is greater than or equal to 5
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow, that is a really big Pokemon!!" + "<br>")
    } else if (pokemon.height >= 3 && pokemon.height < 4.9) { // If the pokemon list is great than 3 but less than 4.9
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is an average sized Pokemon!" + "<br>")
    } else { // If the first 2 are false this is true
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a small pokemon." + "<br>")
    }
  });
