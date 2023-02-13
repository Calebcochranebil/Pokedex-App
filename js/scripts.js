let pokemonRepository = (function () {
    // Define an empty array of Pokemon objects
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=40";

    // Return the array of Pokemon objects
    function getAll() {
        return pokemonList;
    }

    // Add a new Pokemon object to the array of Pokemon objects
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // Add a button element to the HTML body with the name of a Pokemon and bind an event listener to it
    function addListItem(pokemon) {
        // Check if the container for the buttons exists, if not create it
        let container = document.getElementById("pokemon-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "pokemon-container";
            document.body.appendChild(container);
        }

        // Create the button element with the Pokemon name
        let button = document.createElement("button");
        button.innerHTML =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.classList.add("btn", "btn-primary");
        container.appendChild(button);
        // Bind the event listener to the button
        addEventListenerToButton(button, pokemon);
    }

    // Add an event listener to the button that opens a modal showing the details of a Pokemon when clicked
    function addEventListenerToButton(button, pokemon) {
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                // 'response' is the response object from the fetch request
                // Convert the response to JSON format
                return response.json();
            })
            .then(function (json) {
                // 'json' is the parsed JSON data from the response
                // Loop through the 'results' array in the JSON data
                json.results.forEach(function (item) {
                    // Create a new object 'pokemon' with properties 'name' and 'detailsUrl'
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    // Call the 'add' function from the pokemonRepository to add the 'pokemon' object to the repository
                    add(pokemon);
                    // Log the 'pokemon' object to the console
                    console.log(pokemon);
                });
            })
            .catch(function (e) {
                // If there is an error, log it to the console
                console.error(e);
            });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                // Convert the response to JSON format
                return response.json();
            })
            .then(function (details) {
                // 'details' is the parsed JSON data from the response
                // Add the following properties to the 'item' object
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                // If there is an error, log it to the console
                console.error(e);
            });
    }

    function showDetails(pokemon) {
        // Call the 'loadDetails' function and pass the 'pokemon' object
        loadDetails(pokemon).then(function () {
            // Create a new 'div' element for the modal
            let modal = document.createElement("div");
            modal.id = "pokemon-modal";
            // Set the inner HTML of the modal with the pokemon details
            modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            }</h2>
            <img src="${pokemon.imageUrl}" alt="${pokemon.name}" />
            <p>Height: ${pokemon.height}</p>
            <p>Types: ${pokemon.types
                .map(function (type) {
                    return type.type.name;
                })
                .join(", ")}</p>
        </div>
    `;
            // Add the modal to the body of the document
            document.body.appendChild(modal);
            // Get the close button from the modal and add an event listener to remove the modal when the close button is clicked
            let closeButton = modal.querySelector(".close-button");
            closeButton.addEventListener("click", function () {
                modal.remove();
            });
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
