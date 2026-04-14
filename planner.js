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
    popup.classList.add("hidden");
});

// Load favorited recipes into popup
const popupRecipes = document.getElementById("popup-recipes");
const favoriteRecipes = JSON.parse(localStorage.getItem("favorites")) || [];

function loadPopupRecipes() {
    for(let recipe of favoriteRecipes) {
        const card = document.createElement("div");
        card.classList.add("popup-card");

        const img = document.createElement("img");
        img.src = recipe.image;
        img.alt = recipe.title;

        const title = document.createElement("h5");
        title.textContent = recipe.title;

        const selectBtn = document.createElement("button");
        selectBtn.classList.add("select-btn");
        selectBtn.textContent = "Select";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(selectBtn);

        popupRecipes.appendChild(card);
    }
}
