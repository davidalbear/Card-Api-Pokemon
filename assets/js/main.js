const d = document;
const $template = d.getElementById('template-card').content;
const $fragment = d.createDocumentFragment();
const $main = d.querySelector('.main');
const random = d.querySelector(".random");

//Random number 
const getRandomNumber = (min,max) => Math.floor(Math.random() * (max-min)+ min);
const number =  getRandomNumber(1,200);


d.addEventListener('DOMContentLoaded',()=>{
    fetchData(number);
})


const fetchData = async (id) => {
    try {
        let res = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
        json = await res.json();
        //  console.log(json);

        const pokemon = {
            img: json.sprites.other.dream_world.front_default,
            name: json.name,
            hp:json.stats[0].base_stat,
            experience: json.base_experience,
            attack:json.stats[1].base_stat,
            defence:json.stats[2].base_stat,
            especial:json.stats[3].base_stat, 
        }
        if(!res.ok) throw {status:res,statusText:res.statusText};
        cardPrint(pokemon);
        
    } catch (error) {
        console.log(error);
        let message = error.statusText || "Ocurrio un error";
        $main.innerHTML = `<p>Error ${error.status} : ${message}</p>`
    }
}

cardPrint = (pokemon) => {
    $template.querySelector(".card__header__img").setAttribute('src',pokemon.img);
    $template.querySelector(".card__header__img").setAttribute('alt',pokemon.name);
    $template.querySelector(".card__header__title").innerHTML = 
    `
    ${pokemon.name}
    <span> ${pokemon.hp}<b> hp</b></span>
    `
    $template.querySelector(".card__header__text").textContent = pokemon.experience + " Exp";
    $template.querySelectorAll(".card__body__social h2")[0].textContent = pokemon.attack + "K";
    $template.querySelectorAll(".card__body__social h2")[1].textContent = pokemon.especial + "K";
    $template.querySelectorAll(".card__body__social h2")[2].textContent = pokemon.defence + "K";
    

    let $clone = d.importNode($template,true); 
    $fragment.appendChild($clone);
    $main.appendChild($fragment);
}


random.addEventListener('click',e=>{
    e.preventDefault();
    fetchData(number);
    location.reload();
})



