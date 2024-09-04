const form = document.getElementById("form");
const input = document.getElementById("search-input");
const loading = document.getElementById("loading");
const colorlib = {
    "STEEL": ["#DBDBE7", "#B7B7CE"],
    "FIGHTING": ["#E6817B", "#C22E28"],
    "DRAGON": ["#A87EFF", "#6F35FC"],
    "WATER": ["#A6BDFB", "#6390F0"],
    "ELECTRIC": ["#FCE98A", "#F7D02C"],
    "FAIRY": ["#EDB9D1", "#D685AD"],
    "FIRE": ["#FBB78E", "#EE8130"],
    "ICE": ["#CFEDEC", "#96D9D6"],
    "BUG": ["#C6E394", "#A6B91A"],
    "NORMAL": ["#D3D7C4", "#A8A77A"],
    "GRASS": ["#B8E1A1", "#7AC74C"],
    "POISON": ["#C68CBF", "#A33EA1"],
    "PSYCHIC": ["#FBA1B7", "#F95587"],
    "ROCK": ["#D8CB83", "#B6A136"],
    "GROUND": ["#F3E2B0", "#E2BF65"],
    "GHOST": ["#A98AB7", "#735797"],
    "DARK": ["#A28D7F", "#705746"],
    "FLYING": ["#D3C3FA", "#A98FF3"]
};

function popup(text){
    const popup = document.createElement('div');
    popup.innerText = text;
    popup.classList.add("popup");
    popup.style.top = "10px";
    document.body.appendChild(popup);
    setTimeout( () => {
        popup.style.top = "-100px";
    }, 3000);
    popup.addEventListener("transitionend", () => {
        popup.remove();
    })
}



async function search_engine(text){
    text = text.trim().toLowerCase();
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${text}/`

    try{
    loading.style.top = "10px";
    const response = await fetch(url);
    loading.style.top = "-100px";
    
    if(!response.ok){
        if(response.status === 404){
            popup("Pokémon not found");
        }
        else{
            popup("Une erreur s'est produite : ", response.statusText);
        }
        return;
    }

    const data = await response.json();
    const types = data.types.map(item => item.type.name.toUpperCase());
    return {
        "image": data.sprites.front_default,
        "name" : data.name,
        "height": data.height,
        "weight": data.weight,
        "id" : data.id,
        "hp" : data.stats[0].base_stat,
        "attack" : data.stats[1].base_stat,
        "defense" : data.stats[2].base_stat,
        "special-attack" : data.stats[3].base_stat,
        "special-defense" : data.stats[4].base_stat,
        "speed" : data.stats[5].base_stat,
        "types": types,
        "fondColor": colorlib[types[0]][0],
        "color": colorlib[types[0]][1],

    }

    }
    catch(err){
        console.error("Une erreur s'est produite lors de la requête :", err);
        if(err.message.includes("network")){
            popup("Erreur Réseau. Vérifier votre connexion internet")
        }
        else{
            popup(err.message)
        }
        loading.style.top = "-100px";
    }
}


function update(data){
    
    document.getElementById('sprite').src = data.image;
    document.getElementById('sprite').alt = data.name;
    document.getElementById("pokemon-name").innerText = data.name.toUpperCase();
    document.getElementById("pokemon-id").innerText = "#" + data.id;
    const type_container = document.getElementById("types");
    type_container.innerHTML = "";
    data.types.forEach(type => {
        const typeDiv = document.createElement("div");
        typeDiv.innerText = type;
        typeDiv.classList.add("type");
        typeDiv.style.backgroundColor = colorlib[type][1];
        type_container.appendChild(typeDiv);
    });
    document.getElementById("weight").innerText = data.weight;
    document.getElementById("height").innerText = data.height;
    document.getElementById("hp").innerText = data.hp;
    document.getElementById("attack").innerText = data.attack;
    document.getElementById("defense").innerText = data.defense;
    document.getElementById("special-attack").innerText = data["special-attack"];
    document.getElementById("special-defense").innerText = data["special-defense"];
    document.getElementById("speed").innerText = data.speed;

    document.getElementById("main").style.backgroundColor = colorlib[data.types[0]][0];
    document.getElementById("img-container").style.backgroundColor = colorlib[data.types[0]][1];

}

form.addEventListener("submit", async event => {
    event.preventDefault();

    const value = input.value;
    const result = await search_engine(value);
    update(result);
})