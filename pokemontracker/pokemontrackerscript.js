import {
  kantoPokemon, johtoPokemon, hoennPokemon, sinnohPokemon,
  unovaPokemon, kalosPokemon, alolaPokemon, galarPokemon,
  hisuiPokemon, paldeaPokemon
} from "./regions.js";

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
  if (currentRegion === 'all') {
    let total = 0;
    let caughtCount = 0;
    for (const [region, list] of Object.entries(regionData)) {
      total += list.length;
      const caught = getCaught(region);
      caughtCount += list.filter(name => caught[name]).length;
    }
    caughtRatio.textContent = `Caught: ${caughtCount} / ${total}`;
  } else {
    const list = regionData[currentRegion];
    const caught = getCaught(currentRegion);
    const caughtCount = list.filter(name => caught[name]).length;
    caughtRatio.textContent = `Caught: ${caughtCount} / ${list.length}`;
  }
}

function renderPage() {
  box.innerHTML = '';

  if (currentRegion === 'all') {
    const allPokemon = Object.entries(regionData)
      .flatMap(([region, list]) =>
        list.map(name => ({ name, region }))
      );

    for (let i = 0; i < allPokemon.length; i += pageSize) {
      const chunk = allPokemon.slice(i, i + pageSize);

      const container = document.createElement('div');
      container.className = 'box';

      chunk.forEach(({ name, region }) => {
        const div = document.createElement('div');
        div.className = 'pokemon' + (isCaught(region, name) ? ' caught' : '');
        div.textContent = name;
        div.addEventListener('click', () => toggleCaught(region, name));
        container.appendChild(div);
      });

      box.appendChild(container);
    }

    pageIndicator.textContent = '';
  } else {
    const list = regionData[currentRegion];
    const start = currentPage * pageSize;
    const end = start + pageSize;
    const currentList = list.slice(start, end);

    const container = document.createElement('div');
    container.className = 'box';

    currentList.forEach(name => {
      const div = document.createElement('div');
      div.className = 'pokemon' + (isCaught(currentRegion, name) ? ' caught' : '');
      div.textContent = name;
      div.addEventListener('click', () => toggleCaught(currentRegion, name));
      container.appendChild(div);
    });

    box.appendChild(container);

    const totalPages = Math.ceil(list.length / pageSize);
    pageIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
  }

  updateCaughtRatio();
}

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentRegion === 'all') return;
  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  if (currentRegion === 'all') return;
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
