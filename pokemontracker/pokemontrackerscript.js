import { kantoPokemon, johtoPokemon, hoennPokemon, sinnohPokemon, unovaPokemon, kalosPokemon, alolaPokemon, galarPokemon, hisuiPokemon, paldeaPokemon } from "./regions.js";

const regionData = {
    kanto: kantoPokemon,
    johto: johtoPokemon,
    hoenn: hoennPokemon,
    sinnoh: sinnohPokemon,
    unova: unovaPokemon,
    kalos: kalosPokemon,
    alola: alolaPokemon,
    galar: galarPokemon,
    hisui: hisuiPokemon,
    paldea: paldeaPokemon
};

let currentRegion = 'kanto';
let currentPage = 0;
const pageSize = 30;

const box = document.getElementById('pokemonBox');
const pageIndicator = document.getElementById('pageIndicator');
const regionSelect = document.getElementById('region');
const caughtRatio = document.getElementById('caughtRatio');

function getCaught(region) {
    return JSON.parse(localStorage.getItem(`caught-${region}`) || '{}');
}

function setCaught(region, data) {
    localStorage.setItem(`caught-${region}`, JSON.stringify(data));
}

function isCaught(region, name) {
    const caught = getCaught(region);
    return caught[name];
}

function toggleCaught(region, name) {
    const caught = getCaught(region);
    if (caught[name]) {
        delete caught[name];
    } else {
        caught[name] = true;
    }
    setCaught(region, caught);
    renderPage();
}

function updateCaughtRatio() {
    const list = regionData[currentRegion];
    const caught = getCaught(currentRegion);
    const caughtCount = list.filter(name => caught[name]).length;
    caughtRatio.textContent = `Caught: ${caughtCount} / ${list.length}`;
}

function renderPage() {
    const list = regionData[currentRegion];
    const start = currentPage * pageSize;
    const end = start + pageSize;
    const currentList = list.slice(start, end);

    box.innerHTML = '';
    currentList.forEach(name => {
        const div = document.createElement('div');
        div.className = 'pokemon' + (isCaught(currentRegion, name) ? ' caught' : '');
        div.textContent = name;
        div.addEventListener('click', () => toggleCaught(currentRegion, name));
        box.appendChild(div);
    });

    const totalPages = Math.ceil(list.length / pageSize);
    pageIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
    updateCaughtRatio();
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderPage();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(regionData[currentRegion].length / pageSize);
    if (currentPage < totalPages - 1) {
        currentPage++;
        renderPage();
    }
});

regionSelect.addEventListener('change', () => {
    currentRegion = regionSelect.value;
    currentPage = 0;
    renderPage();
});

renderPage();