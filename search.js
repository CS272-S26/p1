
import {getRecipeJson} from "./api/recipe_api.js"

function downloadJSON(data, filename = "data.json") {
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}
async function loadRecipeJson() {
    const res = await fetch("./data/recipes.json");
    const data = await res.json();

    console.log(data);
    return data; 

}

async function handleSearch() {
    const value = document.getElementById("searchInput").value;

    const data = await loadRecipeJson();
    // const data = await getRecipeJson();
    // downloadJSON(data);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";


    
    data.results.forEach(recipe => {
        const card = createRecipeCard(recipe);
        resultsDiv.appendChild(card);
    });
}

function createRecipeCard(recipe) {
    const col = document.createElement("div");
    col.className = "col-md-6";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm recipe-card";
    card.dataset.id = `${recipe.id}`;
    card.dataset.slug = recipe.slug;

    const row = document.createElement("div");
    row.className = "row g-0";

    const imgCol = document.createElement('div');
    imgCol.ClassName = "col-md-4"

    const img = document.createElement("img");
    img.className = "img-fluid rounded-start";
    img.src = recipe.thumbnail_url;

    const recipeCol = document.createElement("div");
    recipeCol.className = "col-md-8";

    const recipeCard = document.createElement("div");
    recipeCard.className = "card-body";

    const recipeName = document.createElement("h5");
    recipeName.textContent = recipe.name;

    const recipeDescripiton = document.createElement("p");
    recipeDescripiton.textContent = recipe.description || "no description";

    recipeCard.appendChild(recipeName);
    recipeCard.appendChild(recipeDescripiton);

    recipeCol.appendChild(recipeCard);

    imgCol.appendChild(img);

    row.appendChild(imgCol);
    row.appendChild(recipeCol);

    card.appendChild(row);

    col.appendChild(card);

    return col;
     

    
    // return `
    // <div class="col-md-6">
    //     <div class="card h-100 shadow-sm recipe-card" data-id="${recipe.id}">
    //         <div class="row g-0">
    //             <div class="col-md-4">
    //                 <img src="${recipe.thumbnail_url}" class="img-fluid rounded-start">
    //             </div>
    //             <div class="col-md-8">
    //                 <div class="card-body">
    //                     <h5>${recipe.name}</h5>
    //                     <p>${recipe.description || "No description"}</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // `;
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