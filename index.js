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

async function fetchTeamFavorites() {
    const members = ["Aleeya", "Xixi", "Jorge", "Michael"];
    const teamFavorites = [];

    for (let i = 0; i < members.length; i++) {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        const meal = data.meals[0];

        teamFavorites.push({
            member: members[i],
            title: meal.strMeal,
            image: meal.strMealThumb,
            link: meal.strSource || meal.strYoutube || "#"
        });
    }

    return teamFavorites;
}

window.addEventListener("DOMContentLoaded", async () => {
    renderRecipes(featuredRecipes, featuredGrid, "featured");

    favoritesGrid.innerHTML = `<p class="section-text">Loading team favorites...</p>`;

    try {
        const teamFavorites = await fetchTeamFavorites();
        renderRecipes(teamFavorites, favoritesGrid, "team");
    } catch (error) {
        console.error("Failed to load external recipes:", error);

        favoritesGrid.innerHTML = `
            <p class="section-text">
                Could not load team favorites right now. Please try again later.
            </p>
        `;
    }
});
