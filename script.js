const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const spriteContainer = document.getElementById('sprite-container');

const fetchData = async () => {
    try {
        const userInput = searchInput.value.toLowerCase();
        const res = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userInput}`
        );
        const data = await res.json();

        if (res.status !== 200) throw new Error("Pokémon not found");

        pokemonID.textContent = `#${data.id}`;
        pokemonName.textContent = data.name.toUpperCase();
        height.textContent = `Height: ${data.height}`;
        weight.textContent = `Weight: ${data.weight}`;
        
        types.innerHTML = "";
        data.types.forEach(typeInfo => {
            const typeSpan = document.createElement('span');
            typeSpan.textContent = typeInfo.type.name.toUpperCase() + " ";
            types.appendChild(typeSpan);
        });

        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} sprite">`;
    } catch (err) {
        alert("Pokémon not found");
        console.error(err);
    }
};

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetchData();
});
