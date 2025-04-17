import * as domFunctions from "./domFunctions.js"
import * as pkmFunctions from "./pkmFunctions.js"

import { dexArray } from "./pokedex.js"
import { dict } from "./pokemonDictionary.js"

var pokedex = [...dexArray];

const pokemonPerPage = 50;

var showSpritesBoolean = true;

var currentPage = 1;

document.addEventListener('DOMContentLoaded', function () {
    
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const typeFilterContainer = document.getElementById("typeFilterContainer");
    const toggleSpriteButton = document.getElementById("toggleSpriteButton");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    
    const listOfTypes = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];
    
    // for (var i = 0; i < listOfTypes.length; i++) {
    //     typeFilterContainer.innerHTML += domFunctions.getTypeDOM(listOfTypes[i]);
    // }

    loadPokedex(dexArray);
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });
    
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    toggleSpriteButton.addEventListener("click", () => {
        if (showSpritesBoolean) {
            toggleSpriteButton.innerHTML = `Show Sprites`;
        } else {
            toggleSpriteButton.innerHTML = `Hide Sprites`;
        }
        showSpritesBoolean = !showSpritesBoolean;
        loadPokedex(pokedex, false, 1);
    })

    searchButton.addEventListener("click", () => {
        search();
    })

    clearButton.addEventListener("click", () => {
        clearSearch();
    })
    
    const tooltip = new bootstrap.Tooltip(scrollTopBtn);

    document.getElementById("pokedexContainer").addEventListener("click", (e) => {
        const btn = e.target.closest(".modal-btn");
        if (btn) {
            const pokemon = btn.dataset.pokemon;
            const type = btn.dataset.type;
            loadModalContent(pokemon, type);
        }
    });
        
});

function loadPokedex(pokedex, filter = false, page = 1) {
    clearPokedex();
    clearButtons();
    const pokedexContainer = document.getElementById("pokedexContainer");
    var numberOfPages = Math.ceil(pokedex.length / pokemonPerPage);
    var numberOfPokemon = pokedex.length;
    for (var i = 0 + ((page - 1) * pokemonPerPage); i < Math.min((Math.min(pokemonPerPage, numberOfPokemon) + ((page - 1) * pokemonPerPage)),numberOfPokemon); i++) {
        pokedexContainer.innerHTML += domFunctions.getPokemonDOM(pokedex[i], showSpritesBoolean);
    }
    // document.querySelectorAll(".modal-btn").forEach(btn => {
    //     btn.addEventListener("click", () => {
    //         const pokemon = btn.dataset.pokemon;
    //         const type = btn.dataset.type;
    //         loadModalContent(pokemon, type);
    //     });
    // });
    domFunctions.loadPageButtons(numberOfPages, pokemonPerPage, filter);
    domFunctions.colorPageButton(page)
    document.querySelectorAll(".pokemonPageButton").forEach(btn => {
        btn.addEventListener("click", () => {
            currentPage = btn.dataset.page;
            loadPokedex(pokedex, filter, currentPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        })
    })
    return true;
}

function clearPokedex() {
    pokedexContainer.innerHTML = ``;
    return true;
}

function clearButtons() {
    document.getElementById("pageButtons").innerHTML = ``;
    return true;
}

function loadModalContent(pokemonName, modalType) {
    const modalLabel = document.getElementById("universalModalLabel");
    const modalBody = document.getElementById("universalModalBody");
    var pokemonData = dexArray[dict[pokemonName] - 1];
    if (modalType == "locations") {
        modalLabel.innerHTML = `Location Data for ${pokemonName}`;
        modalBody.innerHTML = domFunctions.getLocationModal(pokemonData);
    } else if (modalType == "weaknesses") {
        modalLabel.innerHTML = `Weaknesses for ${pokemonName}`;
        modalBody.innerHTML = domFunctions.getWeaknessModal(pokemonData);
    } else {
        modalLabel.innerHTML = `Forms for ${pokemonName}`;
        modalBody.innerHTML = domFunctions.getFormModal(pokemonData);
    }
    return true;
}

function search() {
    var searchQuery = document.getElementById("searchbar").value;
    var query = searchQuery.toLowerCase();
    var filtered_pokedex = [];
    if (query[0] == "#") {
        for (var i = 0; i < dexArray.length; i++) {
            if (dexArray[i][0] == query.slice(1)) {
                filtered_pokedex.push(dexArray[i])
                break;
            }
        }
    } else {
        for (var i = 0; i < dexArray.length; i++) {
            if (dexArray[i][1].toLowerCase().includes(query)) {
                filtered_pokedex.push(dexArray[i])
            }
        }
    }
    pokedex = filtered_pokedex;
    loadPokedex(pokedex, true, 1);
    return true;
}

function clearSearch() {
    document.getElementById("searchbar").value = ``;
    pokedex = dexArray;
    loadPokedex(pokedex, false, 1);
    return true;
}