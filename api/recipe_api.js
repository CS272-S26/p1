require('dotenv').config();
const apiKey = process.env.RAPIDAPI_KEY;
async function getRecipeJson(recipeName,tags="under_30_minutes",size =20) {
    let url;
    if (recipeName === null){
        url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=${tags}`;
    }
    else{
        
        url = `https://tasty.p.rapidapi.com/recipes/list?from=0`;    
        if (tags) {
            url += `&tags=${tags}`;
        }
    
        if (recipeName) {
            url += `&q=${encodeURIComponent(recipeName)}`;
        }
        if (size) {
            url += `&size=${size}`;
        }
    }
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '0ebac4cdb3msh7f8fb12885ba8c1p1147bfjsn955ba55dd9a8',
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
            'Content-Type': 'application/json'

        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);


        return result
    } catch (error) {
        console.error(error);
    }
    return null

    }   


async function getSimularRecipies(recipeID){
    
    const url = `https://tasty.p.rapidapi.com/recipes/list-similarities?recipe_id=${recipeID}`;
    
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '0ebac4cdb3msh7f8fb12885ba8c1p1147bfjsn955ba55dd9a8',
		'x-rapidapi-host': 'tasty.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
