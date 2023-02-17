Pokemon Repository

This is a list of Pokemons created with JavaScript. It uses an API to get a list of Pokemon and their details.

How it Works =
This repository contains the following functions that can be used to interact with the Pokemon objects:

-   add(pokemon): adds a new Pokemon object to the repository
-   getAll(): returns the array of all Pokemon objects in the repository
-   addListItem(pokemon): adds a button element to the HTML body with the name of a Pokemon and binds an event listener to it
-   loadList(): loads a list of Pokemon from the PokeAPI and adds them to the repository
-   loadDetails(pokemon): loads the details of a specific Pokemon from the PokeAPI and adds them to the Pokemon object in the repository
-   showDetails(pokemon): shows a modal with the details of a specific Pokemon
-   search(query): finds the first Pokemon object that matches the search query
-   addEventListenerToButton(button, pokemon): adds an event listener to the button that opens a modal showing the details of a Pokemon when clicked
    Additionally, the code includes an event listener on a search button that uses the search(query) function to find a matching Pokemon and display its details in a modal.

1. Technologies Used,
2. JavaScript
3. PokeAPI
4. HTML
5. CSS
