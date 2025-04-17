const specialNames = {
    "Nidoran♀" : "nidoran-f",
    "Nidoran♂" : "nidoran-m",
    "Farfetch'd" : "farfetchd",
    "Mr. Mime" : "mr-mime",
    "Mime Jr." : "mime-jr",
    "Flabébé": "flabebe",
    "Type: Null" : "type-null",
    "Tapu Koko" : "tapu-koko",
    "Tapu Lele" : "tapu-lele",
    "Tapu Bulu" : "tapu-bulu",
    "Tapu Fini" : "tapu-fini",
    "Sirfetch'd" : "sirfetchd",
    "Mr. Rime" : "mr-rime",
    "Great Tusk" : "great-tusk",
    "Scream Tail" : "scream-tail",
    "Brute Bonnet" : "brute-bonnet",
    "Flutter Mane" : "flutter-mane",
    "Slither Wing" : "slither-wing",
    "Sandy Shocks" : "sandy-shocks",
    "Iron Treads" : "iron-treads",
    "Iron Bundle" : "iron-bundle",
    "Iron Hands" : "iron-hands",
    "Iron Jugulis" : "iron-jugulis",
    "Iron Moth" : "iron-moth",
    "Iron Thorns" : "iron-thorns",
    "Roaring Moon" : "roaring-moon",
    "Iron Valiant" : "iron-valiant",
    "Walking Wake" : "walking-wake",
    "Iron Leaves" : "iron-leaves",
    "Gouging Fire" : "gouging-fire",
    "Raging Bolt" : "raging-bolt",
    "Iron Boulder" : "iron-boulder",
    "Iron Crown" : "iron-crown"
}

export function getFormattedName(pokemon) {
    var pokemon_name;
    if (pokemon in specialNames) {
        pokemon_name = specialNames[pokemon];
    } else {
        pokemon_name = pokemon.toLowerCase();
    }
    return pokemon_name;
}