


export async function getTagsList(){
    const url = 'https://tasty.p.rapidapi.com/tags/list';
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
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);

    }
    
}
export async function getRecipeJson({recipeName=null,tags="under_30_minutes",size =20} = {}) {
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
        const result = await response.json();
        console.log(result);


        return result
    } catch (error) {
        console.error(error);
    }
    return null

    }   


export async function getSimularRecipies(recipeID){
    
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


