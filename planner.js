// Popup recipe adder
const popup = document.getElementById("recipe-popup");
const closeBtn = document.getElementById("close-button");
const addButtons = document.querySelectorAll(".add-button");
console.log(closeBtn);
addButtons.forEach(button => {
    button.addEventListener("click", () => {
        popup.classList.remove("hidden");
    })
})

closeBtn.addEventListener("click", () => {
    loadPopupRecipes();
    popup.classList.add("hidden");
});

// Local storage to store each meal type and its recipes
function getMealPlanner() {
    return JSON.parse(localStorage.getItem("mealPlanner")) || {
        breakfast: [],
        lunch: [],
        dinner: [],
        dessert: [],
        snack: [],
        drink: []
    };
}

function saveMealPlanner(planner) {
    localStorage.setItem("mealPlanner", JSON.stringify(planner));
}

function addRecipeToMeal(mealType, recipe) {
    const planner = getMealPlanner();

    const alreadyAdded = planner[mealType].some(item => item.id === recipe.id);

    if (!alreadyAdded) {
        planner[mealType].push(recipe);
        saveMealPlanner(planner);
    }
}

function removeRecipeFromMeal(mealType, recipeId) {
    const planner = getMealPlanner();

    planner[mealType] = planner[mealType].filter(recipe => recipe.id !== recipeId);

    saveMealPlanner(planner);
}

// Load favorited recipes into popup
const popupRecipes = document.getElementById("popup-recipes");

function loadPopupRecipes() {
    const favoriteRecipes = JSON.parse(localStorage.getItem("favorites")) || [];

    for(let recipe of favoriteRecipes) {
        const card = document.createElement("div");
        card.classList.add("popup-card");

        const img = document.createElement("img");
        img.src = recipe.image;
        img.alt = recipe.name;

        const title = document.createElement("h5");
        title.textContent = recipe.name;

        const selectBtn = document.createElement("button");
        selectBtn.classList.add("select-btn");
        selectBtn.textContent = "Select";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(selectBtn);

        popupRecipes.appendChild(card);
    }
}
