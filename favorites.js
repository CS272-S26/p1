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
