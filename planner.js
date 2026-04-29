let currentMeal = null;

// Popup recipe adder
const popup = document.getElementById("recipe-popup");
const closeBtn = document.getElementById("close-button");
const addButtons = document.querySelectorAll(".add-button");

addButtons.forEach(button => {
    button.addEventListener("click", () => {
        const mealTypeDiv = button.closest(".meal-type");
        currentMeal = mealTypeDiv.id;   // "breakfast", "lunch", etc.

        loadPopupRecipes();
        popup.classList.remove("hidden");
    })
})

closeBtn.addEventListener("click", () => {
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

    popupRecipes.replaceChildren();

    for(let recipe of favoriteRecipes) {    
        // Loading favorites onto popup
        const card = document.createElement("div");
        card.classList.add("popup-card");

        const img = document.createElement("img");
        img.src = recipe.thumbnail_url;
        img.alt = recipe.name;

        const title = document.createElement("h5");
        title.textContent = recipe.name;
        title.className = "text-dark"
        const selectBtn = document.createElement("button");
        selectBtn.classList.add("select-btn");
        selectBtn.textContent = "Select";

        selectBtn.addEventListener("click", () => {
            addRecipeToMeal(currentMeal, recipe);
            popup.classList.add("hidden");
            loadMealPlanner();
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(selectBtn);

        popupRecipes.appendChild(card);
    }
}

function loadMealPlanner() {
    const planner = getMealPlanner();

    for (let mealType in planner) {
        const section = document.getElementById(mealType);
        if (!section) continue;

        const container = section.querySelector(".meal-recipes");
        container.replaceChildren();

        for (let recipe of planner[mealType]) {
            const card = createMealCard(recipe, mealType);
            container.appendChild(card);
        }
    }
}

loadMealPlanner();

// Within popup
function createMealCard(recipe, mealType) {
    const card = document.createElement("div");
    card.classList.add("meal-card");
    

    const title = document.createElement("p");
    title.textContent = recipe.name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "remove";
    removeBtn.className = "btn btn-outline-danger"

    removeBtn.addEventListener("click", () => {
        removeRecipeFromMeal(mealType, recipe.id);
        loadMealPlanner();
    });

    card.appendChild(title);
    card.appendChild(removeBtn);

    return card;
}