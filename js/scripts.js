let pokemonRepository = (function () {
    // Define an empty array of Pokemon objects
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=152";

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

        let button = document.createElement("button");
        button.innerHTML =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.classList.add("btn", "btn-primary");
        container.appendChild(button);

        // Bind the event listener to the button that calls the showDetails function
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
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

    // Load the details of a Pokemon from the API
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    // Show a modal with the details of a Pokemon
    function showModal(pokemon) {
        let modalTitle = document.querySelector("#pokemon-modal-label");
        let modalBody = document.querySelector(".modal-body");

        modalTitle.textContent = pokemon.name;
        modalBody.innerHTML = "";
        let pokemonImg = document.createElement("img");
        pokemonImg.src = pokemon.imageUrl;
        modalBody.appendChild(pokemonImg);
        let heightElement = document.createElement("p");
        heightElement.textContent = "Height: " + pokemon.height;
        modalBody.appendChild(heightElement);
        let typesElement = document.createElement("p");
        typesElement.textContent =
            "Types: " + pokemon.types.map((type) => type.type.name).join(", ");
        modalBody.appendChild(typesElement);

        $("#pokemon-modal").modal("show");
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        addEventListenerToButton: addEventListenerToButton,
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
