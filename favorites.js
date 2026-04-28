

// get favorites is a getter method, 
function getFavorites() {
    
    console.log(JSON.parse(localStorage.getItem("favorites")) || [])
    // Checking if have past saved favorites
    const favorites = localStorage.getItem("favorites");
    if (!favorites) {
        return [];
    }
    else{
        return favorites
    }
}


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
    newImgNode.src = favorite.thumbnail_url;
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
    console.log(favoritesContainer,document.readyState,'loading favorites');
    if (!favoritesContainer) {
        console.warn("favorites-list not found on this page");
        return; // 🚨 stop here
    }
    if (favoritesList){
        console.log(favoritesList,favoritesContainer);
        if(favoritesContainer){
            favoritesContainer.replaceChildren();

        }
        for (let favorite of favoritesList) {
            const favoriteCard = createFavoriteCard(favorite);
            console.log(favoriteCard)
            favoritesContainer.appendChild(favoriteCard);
        }
    }else{
        console.log('empty favorites list')
    }

}

console.log(document.getElementById("favorites-list"),"outside of the");
if (window.location.pathname.includes("favorites.html")) {
    loadFavorites();
}

function addFavorite(recipe,favorites) {


    favorites.push(recipe);
    saveFavorites(favorites);
    console.log(recipe,'pushing');
    return favorites

}

function removeFavorite(id) {
    let favorites = getFavorites();
    if(favorites.length > 0){
        favorites = favorites.filter(recipe => recipe.id !== id);
        saveFavorites(favorites);
        return favorites
    }else{
        return []
    }

}

function getFavIdList(favRecipe,favList){
    console.log(favRecipe.id)
    console.assert(typeof favRecipe.id === "number",'is a number')
    favList.push(favRecipe.id)
    return favList
}

// Save favorites is a setter method,
function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
export function ManageFavorites(recipe){

    // collects the id of the user
    const ID  = recipe.id || null;

    // if it's not a recipe throw and error
    if (!recipe){
        console.log("recipe is null, check favorites.js [ManageFavorites]")
        throw new Error("Recipe must have a valid ID");
    }

    // else get the favorites list

    // step 2, get all the favorites have to change this to an item that actually exists still in search
    let favorites = getFavorites();
    console.log(favorites);

    // if the ID is in the favorites list of id then remove it, else add it
    const favList = []
    if (favorites.length > 0){
        const listFavoritesID = favorites.array.forEach(favrecipe => {
            const IDList = getFavIdList(favrecipe,favList)
            return IDList
        });
        console.log(listFavoritesID,'list favorites ID')
        const isFavorite = listFavoritesID.includes(); // this line determines if I remove the ID or keep it

        if(isFavorite){
            favorites = removeFavorite(ID);
        }else{
            favorites = addFavorite(recipe,favorites);
        }
    }
    else{ // step 3 assuming no favorites, add favorite
        favorites = addFavorite(recipe,favorites);
    }
    
  
    return favorites


}
