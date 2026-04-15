const groceryList = document.getElementById("grocery-list");
const emptyMessage = document.getElementById("empty-message");
const clearChecksButton = document.getElementById("clear-checks-button");

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function buildGroceryCounts(favorites) {
    const groceryCounts = {};

    favorites.forEach(recipe => {
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach(ingredient => {
                const cleanedIngredient = ingredient.trim();

                if (cleanedIngredient !== "") {
                    groceryCounts[cleanedIngredient] = (groceryCounts[cleanedIngredient] || 0) + 1;
                }
            });
        }
    });

    return groceryCounts;
}

function renderGroceryList() {
    groceryList.innerHTML = "";

    const favorites = getFavorites();
    const groceryCounts = buildGroceryCounts(favorites);
    const groceryItems = Object.keys(groceryCounts);

    if (groceryItems.length === 0) {
        emptyMessage.classList.remove("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");

    groceryItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("grocery-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `item-${index}`;

        const label = document.createElement("label");
        label.setAttribute("for", `item-${index}`);
        label.textContent = `${item} (${groceryCounts[item]})`;

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
