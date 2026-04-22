// Checking if have past saved favorites
if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", JSON.stringify([]));
}

const testFavorites = [
    {
        id: 1,
        name: "Avocado Toast",
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 2,
        name: "Berry Smoothie",
        image: "https://via.placeholder.com/300x200"
    }
];

localStorage.setItem("favorites", JSON.stringify(testFavorites));

/**
 * Given favorite list, create favorites card.
 * @param {object} favorite the favorited recipe
 * @returns an HTML element to be placed into the webpage
 */
function createFavoriteCard(favorite) {
    const newColDivNode = document.createElement("div");
    newColDivNode.className = "col-12 col-md-6 col-lg-4";

    const newCardDivNode = document.createElement("div");
    newCardDivNode.className = "favorite-card";

    const newImgNode = document.createElement("img");
    newImgNode.src = favorite.image;
    newImgNode.alt = favorite.name;
    newImgNode.className = "favorite-img";

    const newContentDiv = document.createElement("div");
    newContentDiv.className = "favorite-content";

    const newTitleNode = document.createElement("h3");
    newTitleNode.innerText = favorite.name;
    newTitleNode.className = "favorite-title";

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.className = "remove-btn";

    removeButton.addEventListener("click", () => {
        let favorites = JSON.parse(localStorage.getItem("favorites"));
        favorites = favorites.filter(f => f.id !== favorite.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        newColDivNode.remove();
    });

    newContentDiv.appendChild(newTitleNode);
    newContentDiv.appendChild(removeButton);

    newCardDivNode.appendChild(newImgNode);
    newCardDivNode.appendChild(newContentDiv);

    newColDivNode.appendChild(newCardDivNode);

    return newColDivNode;

}

function loadFavorites() {
    const favoritesList = JSON.parse(localStorage.getItem("favorites"));
    const favoritesContainer = document.getElementById("favorites-list");

    favoritesContainer.replaceChildren();

    for (let favorite of favoritesList) {
        const favoriteCard = createFavoriteCard(favorite);
        favoritesContainer.appendChild(favoriteCard);
    }
}

loadFavorites()

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addFavorite(recipe) {
    let favorites = getFavorites();

    const saved = favorites.some(fav => fav.id === recipe.id);

    if (!saved) {
        favorites.push(recipe);
        saveFavorites(favorites);
    }
}

function removeFavorite(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(recipe => recipe.id !== id);
    saveFavorites(favorites);
}
