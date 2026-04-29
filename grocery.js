const groceryList = document.getElementById("grocery-list");
const emptyMessage = document.getElementById("empty-message");
const clearChecksButton = document.getElementById("clear-checks-button");

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function getRecipeIngredients(recipe) {
    const ingredients = [];

    // Tasty full recipe format
    if (recipe.sections && Array.isArray(recipe.sections)) {
        recipe.sections.forEach(section => {
            if (section.components && Array.isArray(section.components)) {
                section.components.forEach(component => {
                    if (component.raw_text && component.raw_text.trim() !== "") {
                        ingredients.push(component.raw_text.trim());
                    } else if (
                        component.ingredient &&
                        component.ingredient.name &&
                        component.ingredient.name.trim() !== ""
                    ) {
                        ingredients.push(component.ingredient.name.trim());
                    }
                });
            }
        });
    }

    // backup format if someone saves a simplified ingredients array
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach(ingredient => {
            if (typeof ingredient === "string" && ingredient.trim() !== "") {
                ingredients.push(ingredient.trim());
            }
        });
    }

    return ingredients;
}

function cleanIngredientText(ingredient) {
    return ingredient
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

function buildGroceryCounts(favorites) {
    const groceryCounts = {};
    let recipesWithoutIngredients = 0;

    favorites.forEach(recipe => {
        const ingredients = getRecipeIngredients(recipe);

        if (ingredients.length === 0) {
            recipesWithoutIngredients++;
            return;
        }

        ingredients.forEach(ingredient => {
            const cleanedIngredient = cleanIngredientText(ingredient);

            if (cleanedIngredient !== "") {
                groceryCounts[cleanedIngredient] = (groceryCounts[cleanedIngredient] || 0) + 1;
            }
        });
    });

    return { groceryCounts, recipesWithoutIngredients };
}

function renderGroceryList() {
    groceryList.innerHTML = "";

    const favorites = getFavorites();
    const { groceryCounts, recipesWithoutIngredients } = buildGroceryCounts(favorites);
    const groceryItems = Object.keys(groceryCounts).sort();

    if (groceryItems.length === 0) {
        emptyMessage.classList.remove("hidden");

        if (favorites.length === 0) {
            emptyMessage.textContent = "No grocery items yet. Add some recipes to favorites first.";
        } else {
            emptyMessage.textContent = "Your favorited items do not have ingredient data. Try favoriting regular recipes instead of recipe collections.";
        }

        return;
    }

    emptyMessage.classList.add("hidden");

    if (recipesWithoutIngredients > 0) {
        const warning = document.createElement("p");
        warning.classList.add("grocery-warning");
        warning.textContent = `${recipesWithoutIngredients} favorited item(s) did not include ingredient data, so they were skipped.`;
        groceryList.appendChild(warning);
    }

    groceryItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("grocery-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `item-${index}`;

        const label = document.createElement("label");
        label.setAttribute("for", `item-${index}`);

        const count = groceryCounts[item];
        label.textContent = count > 1 ? `${item} (${count})` : item;

        checkbox.addEventListener("change", () => {
            li.classList.toggle("checked", checkbox.checked);
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        groceryList.appendChild(li);
    });
}

clearChecksButton.addEventListener("click", () => {
    const allItems = document.querySelectorAll(".grocery-item");
    const allCheckboxes = document.querySelectorAll(".grocery-item input[type='checkbox']");

    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    allItems.forEach(item => {
        item.classList.remove("checked");
    });
});

window.addEventListener("DOMContentLoaded", renderGroceryList);