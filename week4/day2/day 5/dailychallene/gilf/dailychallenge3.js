async function fetchRandomGif(category) {
    const url = `${RANDOM_GIF_URL}?api_key=${API_KEY}&tag=${category}&rating=g`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
}
//err jhandoling with try/catch
try {
    const gifData = await fetchRandomGif(category);
    // Process data...
} catch (error) {
    displayError(`Failed to fetch GIF: ${error.message}`);
} finally {
    // Always runs - cleanup code
}