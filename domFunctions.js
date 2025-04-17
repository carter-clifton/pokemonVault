import * as pkmFunctions from "./pkmFunctions.js"
import { spritePaths } from "./spritePaths.js";

// export function getTypeDOM(type) {
//     return `
//     <div class="col-6 col-sm-4 col-md-3 col-lg-1">
//         <div class="form-check d-flex align-items-center justify-content-center">
//             <input class="form-check-input me-2" type="checkbox" value="${type}TypeFilter" id="${type}TypeFilter" name="types">
//             <label class="form-check-label" for="${type}TypeFilter" style="display: flex; align-items: center;">
//                 <img src="assets/types/${type}_type.webp" alt="${type} Type" height="32" loading="lazy">
//             </label>
//         </div>
//     </div>`;
// }

export function getPokemonDOM(pokemon, showSprite) {
    return `
    <li class="list-group-item d-flex flex-wrap align-items-center gap-4">
        ${getPokemonSprite(pokemon, showSprite)}
        <div style="min-width: 200px;">
            <h5 class="mb-0">#${pokemon[0]} - ${pokemon[1]}</h5>
        </div>
        <div class="d-flex gap-4" style="min-width: 200px;">
            <div class="d-flex flex-column align-items-start gap-2 justify-content-center">
                ${getPokemonTypes(pokemon)}
            </div>
            <div class="d-flex flex-column align-items-start gap-1 justify-content-center">
                ${getPokemonGenders(pokemon)}
            </div>
        </div>
        <div class="d-flex gap-4">
            <button class="btn btn-med btn-outline-secondary mt-2 modal-btn" data-pokemon="${pokemon[1]}" data-type="locations" data-bs-toggle="modal" data-bs-target="#universalModal">In-Game Locations</buttons>
            <button class="btn btn-med btn-outline-secondary mt-2 modal-btn" data-pokemon="${pokemon[1]}" data-type="weaknesses" data-bs-toggle="modal" data-bs-target="#universalModal">Weaknesses</buttons>
            <button class="btn btn-med btn-outline-secondary mt-2 modal-btn" data-pokemon="${pokemon[1]}" data-type="forms" data-bs-toggle="modal" data-bs-target="#universalModal">Forms</buttons>
        </div>
    </li>
    `;
}

function getPokemonSprite(pokemon, showSprite) {
    if (!showSprite) return ``;
    const formattedName = pkmFunctions.getFormattedName(pokemon[1]);
    const basePath = `assets/sprites_webp/${formattedName}/`;
    const mainSprite = `${basePath}main.webp`;
    const fallbackSprite = `${basePath}male.webp`;
    return `<img src="${mainSprite}" onerror="this.onerror=null;this.src='${fallbackSprite}';" alt="Image of ${pokemon[1]}" height="80" loading="lazy">`;
}

function getPokemonTypes(pokemon) {
    var pkmTypes = pokemon[2];
    var typeDOM = "";
    for (var i = 0; i < pkmTypes.length; i++) {
        typeDOM += `<img src="assets/types/${pkmTypes[i].toLowerCase()}_type.webp" alt="${pkmTypes[i]} type" height="24" loading="lazy">\n`
    }
    return typeDOM;
}

function getPokemonGenders(pokemon) {
    if (pokemon[3] == `Genderless`) {
        return `<span class="text-success" style="font-size: 1.1rem;">Genderless</span>`;
    } else {
        return `
        <span class="text-primary" style="font-size: 1.1rem;">${pokemon[3][0].replace('male', '♂')}</span>
        <span class="text-danger" style="font-size: 1.1rem;">${pokemon[3][1].replace('female', '♀')}</span>
        `;
    }
}

export function getLocationModal(pokemon) {
    if (pokemon[5].length == 0) {
        return `<p class="text-muted">No location data available for this Pokémon.</p>`;
    } else {
        return `
        <div class="d-flex flex-column gap-3">
            ${getLocationGames(pokemon)}
        </div>
        `;
    }
}

function getLocationGames(pokemon) {
    var gamesDOM = ``;
    var games = pokemon[5];
    for (var i = 0; i < games.length; i++) {
        gamesDOM += `
            <div class="border rounded p-3 bg-light">
                <ul class="mb-2 ps-4" style="margin: 0!important; padding: 0!important;">
                    ${getGameVersions(games[i])}
                </ul>
                <ul class="mb-2 ps-4">
                    ${getLocationLocations(games[i])}
                </ul>
            </div>`;
    }
    return gamesDOM;
}

function getGameVersions(game) {
    var versions = game[0].split(", ");
    var versionsDOM = ``;
    for (var i = 0; i < versions.length; i++) {
        versionsDOM += `<li style="list-style: none;"><strong>${versions[i]}</strong></li>`;
    }
    return versionsDOM;
}

function getLocationLocations(game) {
    var locations = game[1].split(",");
    var locationsDOM = ``;
    for (var i = 0; i < locations.length; i++) {
        locationsDOM += `<li>${locations[i]}</li>`
    }
    return locationsDOM;
}

export function getWeaknessModal(pokemon) {
    if (pokemon[4].length == 0) {
        return `<p class="text-muted">No weakness data available for this Pokémon.</p>`;
    } else {
        return `
        <div class="d-flex flex-column gap-3">
            ${getWeaknesses(pokemon)}
        </div>`;
    }
}

function getWeaknesses(pokemon) {
    var weaknesses = pokemon[4];
    var weaknessesString = ``;
    for (let i = 0; i < weaknesses.length; i++) {
        weaknessesString += `
        <div class="border rounded p-3 bg-light">
            <div class="d-flex gap-4">
                <div class="d-flex gap-4" style="min-width: 175px;">
                    <img src="assets/types/${weaknesses[i][0].toLowerCase()}_type.webp" alt="${weaknesses[i][0]} type" height="30" loading="lazy">
                    ${getColoredWeakness(weaknesses[i][1], "multiplier")}
                </div>
                <div>
                    ${getColoredWeakness(weaknesses[i][1], "text")}
                </div>
            </div>
        </div>`;
    }
    return weaknessesString;
}

function getColoredWeakness(damageMultiplier, type) {
    var returnText = ``;
    if (type == "multiplier") {
        switch (damageMultiplier) {
            case 4.0:
                returnText = `<h3 class="text-danger" style="margin: 0;"><strong>${damageMultiplier}x</strong></h3>`;
                break;
            case 2.0:
                returnText = `<h3 class="text-warning" style="margin: 0;"><strong>${damageMultiplier}x</strong></h3>`;
                break;
            case 1.0:
                returnText = `<h3 class="text-secondary" style="margin: 0;"><strong>${damageMultiplier}x</strong></h3>`;
                break;
            case 0.5:
                returnText = `<h3 class="text-primary" style="margin: 0;"><strong>${damageMultiplier}x</strong></h3>`;
                break;
            case 0.25:
                returnText = `<h3 class="text-success" style="margin: 0;"><strong>${damageMultiplier}x</strong></h3>`;
                break;
            default:
                returnText = `<h3 class="text-info" style="margin: 0;"><strong>${damageMultiplier}x</strong></h3>`;
                break;
        }
    } else if (type == "text") {
        switch (damageMultiplier) {
            case 4.0:
                returnText = `<h3 class="text-danger" style="margin: 0;"><strong>Very Weak</strong></h3>`;
                break;
            case 2.0:
                returnText = `<h3 class="text-warning" style="margin: 0;"><strong>Weak</strong></h3>`;
                break;
            case 1.0:
                returnText = `<h3 class="text-secondary" style="margin: 0;"><strong>Neutral</strong></h3>`;
                break;
            case 0.5:
                returnText = `<h3 class="text-primary" style="margin: 0;"><strong>Resisted</strong></h3>`;
                break;
            case 0.25:
                returnText = `<h3 class="text-success" style="margin: 0;"><strong>Very Resisted</strong></h3>`;
                break;
            default:
                returnText = `<h3 class="text-info" style="margin: 0;"><strong>Immune</strong></h3>`;
                break;
        }
    }
    return returnText;
}

export function getFormModal(pokemon) {
    return `<div class="d-flex flex-column gap-3">
        ${getSprites(pokemon[1])}
    </div>`;
}

function getSprites(pokemonName) {
    var formattedName = pkmFunctions.getFormattedName(pokemonName);
    var pokemonSprites = spritePaths[formattedName];
    var returnString = ``;
    for (var i = 0; i < pokemonSprites.length; i++) {
        returnString += `
        <div class="border rounded p-3 bg-light">
            <div class="d-flex gap-4">
                <div class="d-flex gap-4" style="min-width: 175px;">
                    <h3 class="text-primary" style="margin: 0;"><strong>${pokemonSprites[i][0]}</strong></h3>
                </div>
                <div class="v-flex gap-4" style="min-width: 175px;">
                    ${getSpriteImages(pokemonSprites[i][1])}
                </div>
            </div>
        </div>`;
    }
    return returnString;
}

function getSpriteImages(paths) {
    var returnString = ``;
    for (var i = 0; i < paths.length; i++) {
        returnString += `<img src="${paths[i]}" alt="" height="160" loading="lazy">`;
    }
    return returnString;
}

export function loadPageButtons(numberOfPages, pokemonPerPage, filter = false) {
    const buttonContainer = document.getElementById("pageButtons");
    if (!filter) {
        for (var i = 0; i < numberOfPages; i++) {
            buttonContainer.innerHTML += `<button type="submit" class="btn btn-secondary pokemonPageButton" data-page="${i + 1}" name="page${i + 1}">${1 + (i * pokemonPerPage)} - ${pokemonPerPage * (i + 1)}</button>`;
        }
    } else {
        for (var i = 0; i < numberOfPages; i++) {
            buttonContainer.innerHTML += `<button type="submit" class="btn btn-secondary pokemonPageButton" data-page="${i + 1}" name="page${i + 1}">Page ${i + 1}</button>`;
        }
    }
    return true;
}

export function colorPageButton(page) {
    var button = (document.getElementsByName(`page${page}`))[0];
    button.classList.remove("btn-secondary");
    button.classList.add("btn-primary");
    return true;
}