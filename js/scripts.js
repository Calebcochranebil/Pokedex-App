let pokemonRepository = (function () {
    // Define an empty array of Pokemon objects
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";

    // Add a new Pokemon object to the array of Pokemon objects
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // Return the array of Pokemon objects
    function getAll() {
        return pokemonList;
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
        let span = document.createElement("span");
        span.innerHTML =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.appendChild(span);
        button.classList.add("button", "button-primary");
        button.setAttribute("id", pokemon.name);
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemon-modal");
        container.appendChild(button);

        pokemonRepository.addEventListenerToButton(button, pokemon);
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
    const showModal = (pokemon) => {
        const modalTitle = document.querySelector("#pokemon-modal-label");
        const modalBody = document.querySelector(".modal-body");
        modalTitle.textContent = pokemon.name;
        modalBody.innerHTML = `
      <img src="${pokemon.imageUrl}">
      <p>Height: ${pokemon.height}</p>
      <p>Types: ${pokemon.types.map(({ type }) => type.name).join(", ")}</p>
    `;
        $("#pokemon-modal").modal("show");
    };

    const showDetails = (pokemon) => {
        loadDetails(pokemon).then(() => {
            console.log(pokemon);
            showModal(pokemon);
        });
    };

    function search(query) {
        // Find the first Pokemon object that matches the search query
        const result = pokemonList.find(function (pokemon) {
            // Convert the Pokemon name to lowercase and check if it matches the search query
            return pokemon.name.toLowerCase() === query.toLowerCase();
        });
        // Return the matched Pokemon object or null if no match was found
        return result || null;
    }

    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails,
        showModal,
        search,
        addEventListenerToButton,
    };
})();

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", function (event) {
    // Prevent the default behavior of the button
    event.preventDefault();

    // Get the search query from the input field
    const searchQuery = searchInput.value;

    // Call the search function to find the matching Pokemon
    let result = pokemonRepository.search(searchQuery);

    if (result) {
        // If a match was found, log the details of the matched Pokemon to the console
        console.log(`Found Pokemon that matches '${searchQuery}':`);
        pokemonRepository.showDetails(result);

        // Clear all other Pokemon buttons besides the one typed in
        const allButtons = document.querySelectorAll(".pokemon-container");
        allButtons.forEach((button) => {
            if (
                button.textContent.toLowerCase() !== searchQuery.toLowerCase()
            ) {
                button.remove();
            }
        });
    } else {
        // If no match was found, display an error message
        console.log(`No Pokemon found that matches '${searchQuery}'`);
    }
});

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
