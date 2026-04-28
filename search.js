
import {getRecipeJson, getTagsList} from "./api/recipe_api.js"
function downloadJSON(data, filename = "data.json") {
    const json = JSON.stringify(data, null, 2);
    console.log(json,'jsond download',data)
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

const saveSearchStorage = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
function filteredData(data, searchValue, tagSelectVal) {
    
    const search = searchValue.toLowerCase().trim();
    console.log(data)
    
    const filteredRecipe =  data.filter(recipe => {
        // search match (name or description)
        const matchesSearch =
            !search ||
            recipe.name.toLowerCase().includes(search) ||
            (recipe.description || "").toLowerCase().includes(search.toLowerCase());
        console.log(matchesSearch,'matches search')

        console.log(recipe.tags);
        const matchesTag =  
            !tagSelectVal ||
            (recipe.tags && recipe.tags.includes(tagSelectVal));
        
        console.log(matchesTag,'matches tag')
        return matchesSearch || matchesTag;
    });

    return filteredRecipe
}

async function loadRecipeJson() { 
    const res = await fetch("./data/recipes.json");
    const data = await res.json();

    console.log(data);
    return data; 

}

function getFavorites() {
    
    console.log(JSON.parse(localStorage.getItem("favorites")) || [])
    // Checking if have past saved favorites
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites) {
        return [];
    }
    else{
        console.log(favorites, "else loop getfavorites")
        return favorites
    }
}

function addFavorite(recipe,favorites) {


    favorites.push(recipe);
    saveFavorites(favorites);
    console.log(recipe,'pushing');
    return favorites

}

function removeFavorite(favorites,id) {

        favorites = favorites.filter(recipe => recipe.id !== id);
        saveFavorites(favorites);
        return favorites

}

// Save favorites is a setter method,
function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
export function ManageFavorites(recipe){

    // collects the id of the user
    const ID  = recipe.id || null;

    // if it's not a recipe throw and error
    if (!recipe){
        console.log("recipe is null, check favorites.js [ManageFavorites]")
        throw new Error("Recipe must have a valid ID");
    }

    // else get the favorites list

    // step 2, get all the favorites have to change this to an item that actually exists still in search
    let favorites = getFavorites();
    console.log(favorites, typeof favorites);

    // if the ID is in the favorites list of id then remove it, else add it

    console.log(favorites.length,favorites);

    const isFavorite = favorites.filter(fav => fav.id === ID);
    
    console.log(isFavorite,'Is favorite',isFavorite.length)
    favorites = addFavorite(recipe,favorites);
    if (isFavorite.length === 1 || isFavorite.length > 1) {
        favorites = removeFavorite(favorites, ID);
    }
    return favorites

}

function createRecipeCard(recipe) {

    //  customize the overRow and Column for later ;)
    const overRow = document.createElement("div");
    overRow.className = 'row g-3';

    const col = document.createElement("div");
    col.className = "col-md-0";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm recipe-card";
    card.dataset.id = `${recipe.id}`;
    card.dataset.slug = recipe.slug;

    const imageRow = document.createElement("div");
    // FAVORITE SECTION, WILL TRY TO MAKE SURE THE USER CAN ACTUALLY PRESS THE FAVORITE STAR

    // DESCRIPTION ALONG WITH IMAGE 
    const row = document.createElement("div");
    row.className = "row g-3";

    const imgCol = document.createElement('div');
    imgCol.className = "col-md-4";

    const img = document.createElement("img");
    img.className = "img-fluid rounded-start";
    img.src = recipe.thumbnail_url;

    const recipeCol = document.createElement("div");
    recipeCol.className = "col-md-6";

    const recipeCard = document.createElement("div");
    recipeCard.className = "card-body";

    const recipeName = document.createElement("h5");
    recipeName.textContent = recipe.name;

    const recipeDescripiton = document.createElement("p");
    recipeDescripiton.textContent = recipe.description || "no description";


    
    const favoriteCol = document.createElement("div");
    favoriteCol.className = "col-md-2";

    const favoriteStar = document.createElement("div");
    favoriteStar.className = "bi bi-star";
    favoriteStar.style.fontSize = "1.5rem"; // or 2rem for bigger   
    
    favoriteStar.style.cursor = "pointer";

    favoriteStar.addEventListener("click", (e) => {
        e.stopPropagation(); // prevents redirect
        console.log("favorited:", recipe.id);

        // toggle filled star
        favoriteStar.classList.toggle("bi-star");
        favoriteStar.classList.toggle("bi-star-fill");

        // fix for responsiveness
        card.class = "card h-100 shadow-sm recipe-card";
        
        // add to storage step 1 
        
        const favorites = ManageFavorites(recipe);
        console.log(favorites,'manage favorites in createrecipecard');
        saveSearchStorage(favorites);

        
    })

    recipeCard.appendChild(recipeName);
    recipeCard.appendChild(recipeDescripiton);

    recipeCol.appendChild(recipeCard);

    imgCol.appendChild(img);
    favoriteCol.appendChild(favoriteStar);
    row.appendChild(favoriteCol);
    row.appendChild(imageRow);
    row.appendChild(imgCol);
    row.appendChild(recipeCol);


    card.appendChild(row);

    col.appendChild(card);

    overRow.appendChild(col);

    return overRow;
     

    
    // return `
    // <div class="col-md-6">
    //  
    //     <div class="card h-100 shadow-sm recipe-card" data-id="${recipe.id}">
            // <div class= "container-fluid d-flex"> </div>

    //         <div class="row g-0">
    //             <div class="col-md-4">

    //                 <img src="${recipe.thumbnail_url}" class="img-fluid rounded-start">
    //             </div>
    //             <div class="col-md-8">
    //              <div class="row">
    //                 <div class="card-body">
    //                     <h5>${recipe.name}</h5>
    //                     <p>${recipe.description || "No description"}</p>
    //                  </div>
//                  </div>

    //             </div>
    //         </div>
    //     </div>
    // </div>
    // `;
}

async function handleSearch() {
    const searchValue = document.getElementById("searchInput").value;
    const tagSelectVal = document.getElementById("tagSelect").value; 
    const sizeReq = document.getElementById("sizeSelect").value;
    
    let dataFiltered;
    console.log(searchValue);
    console.log(tagSelectVal)
    console.log('we here')
    const response = await loadRecipeJson();
    const data = response.results; 
        
    // const data = await getRecipeJson({recipeName: null,tags:"under_30_minutes",size :sizeReq});
    
    // downloadJSON(data);
    if (searchValue){
        dataFiltered = filteredData(data  ,searchValue,tagSelectVal);
        
    }else{
        console.log(data)
        dataFiltered = data.filter(recipe => {
            const validRecipe = (recipe.name !== null);
            return validRecipe
        });
    }
    console.log(typeof dataFiltered,dataFiltered.length);

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";


    console.log(dataFiltered,"filted");
    dataFiltered.forEach(recipe => {
        const card = createRecipeCard(recipe);
        resultsDiv.appendChild(card);
    });
    // // TODO: global favorite object. 
    // const favorites = getGlobalFavorites();
    // console.log(favorites)
}

const data = await handleSearch()
console.log('here ');

document.addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");
    if (!card) return;

    const id = card.dataset.id;
    const slug = card.dataset.slug;

    window.location.href = `https://tasty.co/recipe/${slug}`;
})
document.getElementById("searchBtn").addEventListener("click", handleSearch);

// const taglistJson = await getTagsList();
// console.log(taglistJson);
// downloadJSON(taglistJson,"taglist.json");