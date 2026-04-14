const featuredRecipes = [
    {
        title: "Egg Sandwich",
        image: "images/egg-sandwich.png",
        link: "https://www.allrecipes.com/recipe/139551/egg-sandwich/"
    },
    {
        title: "Creamy Pasta",
        image: "images/creamy-pasta.png",
        link: "https://www.bbcgoodfood.com/recipes/collection/creamy-pasta-recipes"
    },
    {
        title: "Berry Pancakes",
        image: "images/berry-pancakes.png",
        link: "https://www.bbcgoodfood.com/recipes/american-blueberry-pancakes"
    },
    {
        title: "Chicken Salad",
        image: "images/chicken-salad.png",
        link: "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chicken-salad-7194783"
    },
    {
        title: "Avocado Toast",
        image: "images/avocado-toast.png",
        link: "https://www.loveandlemons.com/avocado-toast-recipe/"
    },
    {
        title: "Strawberry Crepes",
        image: "images/crepes.png",
        link: "https://sallysbakingaddiction.com/make-crepes/"
    }
];

const teamFavorites = [
    {
        member: "Aleeya",
        title: "Spaghetti Carbonara",
        image: "images/spcarbonara.png",
        link: "https://www.simplyrecipes.com/recipes/spaghetti_alla_carbonara/"
    },
    {
        member: "Xixi",
        title: "Matcha Crepe Cake",
        image: "images/matcha.png",
        link: "https://www.justonecookbook.com/matcha-mille-crepe-cake/"
    },
    {
        member: "Michael",
        title: "BBQ Chicken Pizza",
        image: "images/pizza.png",
        link: "https://www.foodnetwork.com/recipes/food-network-kitchen/almost-famous-barbecue-chicken-pizza-recipe-2107567"
    },
    {
        member: "Jorge",
        title: "Tacos al Pastor",
        image: "images/tacos.png",
        link: "https://www.seriouseats.com/tacos-al-pastor-recipe"
    }
];

const featuredGrid = document.getElementById("featured-grid");
const favoritesGrid = document.getElementById("favorites-grid");

function renderRecipes(recipeArray, container, captionType) {
    container.innerHTML = "";

    recipeArray.forEach((recipe) => {
        const card = document.createElement("article");
        card.classList.add("recipe-card");

        let caption = "";
        if (captionType === "featured") {
            caption = "Featured recipe";
        } else if (captionType === "team") {
            caption = `${recipe.member}'s favorite`;
        }

        card.innerHTML = `
            <img class="recipe-image" src="${recipe.image}" alt="${recipe.title}">
            <h3 class="recipe-title">${recipe.title}</h3>
            <p class="recipe-caption">${caption}</p>
            <a class="recipe-link" href="${recipe.link}" target="_blank" rel="noopener noreferrer">
                View Recipe
            </a>
        `;

        container.appendChild(card);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    renderRecipes(featuredRecipes, featuredGrid, "featured");
    renderRecipes(teamFavorites, favoritesGrid, "team");
});