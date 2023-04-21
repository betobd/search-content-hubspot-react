export const getitems = async (searchTerm, offset, limit, queries) => {
    try {
        const response = await fetch(`https://api.hubapi.com/contentsearch/v2/search?portalId=21839175&term=${searchTerm}&offset=${offset}&limit=${limit}`)
        const data = await response.json();
        return data;
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
        }
    }
}