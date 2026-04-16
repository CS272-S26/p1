import {getRecipeJson} from "./api/recipe_api.js"

function getRecipeData(){

}

async function handleSearch() {
    const value = document.getElementById("searchInput").value;

    const data = await getRecipeJson(value);

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    data.results.forEach(recipe => {
        resultsDiv.innerHTML += createRecipeCard(recipe);
    });
}

function createRecipeCard(recipe) {
    return `
    <div class="col-md-6">
        <div class="card h-100 shadow-sm recipe-card" data-id="${recipe.id}">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${recipe.thumbnail_url}" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5>${recipe.name}</h5>
                        <p>${recipe.description || "No description"}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}


document.addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");
    if (!card) return;

    const id = card.dataset.id;

    window.location.href = `recipe.html?id=${id}`;
})
document.getElementById("searchBtn").addEventListener("click", handleSearch);