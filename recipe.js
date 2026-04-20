const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// fetch full recipe
getRecipeDetails(id);