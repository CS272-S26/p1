
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
        
    // const data = await getRecipeJson({recipeName=null,tags="under_30_minutes",size =sizeReq});
    
    // downloadJSON(data);
    if (searchValue){
        dataFiltered = filteredData(data  ,searchValue,tagSelectVal);
        
    }else{
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
}

function createRecipeCard(recipe) {

    //  customize the overRow and Column for later ;)
    const overRow = document.createElement("div");
    overRow.className = 'row g-3';

    const col = document.createElement("div");
    col.className = "col-md- ";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm recipe-card";
    card.dataset.id = `${recipe.id}`;
    card.dataset.slug = recipe.slug;

    const row = document.createElement("div");
    row.className = "row g-3";

    const imgCol = document.createElement('div');
    imgCol.className = "col-md-4";

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

    overRow.appendChild(col);

    return overRow;
     

    
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

// const taglistJson = await getTagsList();
// console.log(taglistJson);
// downloadJSON(taglistJson,"taglist.json");