let pokemonRepository = (function () {
    // Define an array of Pokemon objects with properties of name, type, and height
    let pokemonList = [
        {
            name: "Golbat",
            type: ["Poison", "Flying"],
            height: 1.6,
        },
        {
            name: "Arbok",
            type: ["Poison"],
            height: 3.5,
        },
        {
            name: "Charizard",
            type: ["Fire", "Flying"],
            height: 5.7,
        },
    ];

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
        button.innerHTML = pokemon.name;
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

    // Show the details of a Pokemon in a modal
    function showDetails(pokemon) {
        // Check if a previous modal container exists, if so remove it
        let previousModalContainer = document.getElementById("modal-container");
        if (previousModalContainer) {
            previousModalContainer.remove();
        }

        // Create the modal container and set its style properties
        let modalContainer = document.createElement("div");
        modalContainer.id = "modal-container";
        modalContainer.style.display = "flex";
        modalContainer.style.justifyContent = "center";
        modalContainer.style.alignItems = "center";
        modalContainer.style.position = "fixed";
        modalContainer.style.top = 0;
        modalContainer.style.left = 0;
        modalContainer.style.width = "100%";
        modalContainer.style.height = "100%";
        modalContainer.style.backgroundColor = "rgba(0,0,0,0.5)";

        let modal = document.createElement("div");
        modal.id = "modal";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.borderRadius = "10px";
        modal.style.textAlign = "center";

        let name = document.createElement("h1");
        name.innerHTML = pokemon.name;
        modal.appendChild(name);

        let type = document.createElement("p");
        type.innerHTML = "Type: " + pokemon.type.join(", ");
        modal.appendChild(type);

        let height = document.createElement("p");
        height.innerHTML = "Height: " + pokemon.height + "m";
        modal.appendChild(height);

        let closeButton = document.createElement("button");
        closeButton.innerHTML = "Close";
        closeButton.style.backgroundColor = "black";
        closeButton.style.color = "white";
        closeButton.style.padding = "10px";
        closeButton.style.borderRadius = "5px";
        closeButton.style.cursor = "pointer";
        closeButton.style.marginTop = "20px";
        closeButton.addEventListener("click", function () {
            modalContainer.remove();
        });
        modal.appendChild(closeButton);

        modalContainer.appendChild(modal);
        document.body.appendChild(modalContainer);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
    };
})();

let allPokemon = pokemonRepository.getAll();
allPokemon.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
