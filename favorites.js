

export function getFavorites() {
    console.log(JSON.parse(localStorage.getItem("favorites")) || [])
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function ManageFavorites(recipe){

    // needs error check 
    const ID  = recipe.id || null;

    if (!recipe){
        console.log("recipe is null, check favorites.js [ManageFavorites]")
        throw new Error("Recipe must have a valid ID");
    }

    let favorites = getFavorites();
    const isFavorite = favorites.includes();

    if(isFavorite){
        removeFavorite(ID);
    }else{
        addFavorite(recipe);
    }
}

function addFavorite(recipe) {
    let favorites = getFavorites();

    const saved = favorites.some(fav => fav.id === recipe.id);
    console.log(saved,'saved');
    console.log(favorites,'favorites');
    console.log(recipe,'check recipe')

    if (!saved) {
        favorites.push(recipe);
        saveFavorites(favorites);
        console.log(recipe,'pushing');
    }

}

function removeFavorite(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(recipe => recipe.id !== id);
    saveFavorites(favorites);
}
