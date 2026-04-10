// Exercise 4: Convert to pure async/await with error handling
const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/albums"
];

const getData = async function() {
    try {
        // Map each url to an async function that fetches and parses JSON
        const fetchPromises = urls.map(async (url) => {
            const resp = await fetch(url);
            
            // Check response status
            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }
            
            return await resp.json();
        });
        
        // Wait for all promises to resolve
        const [users, posts, albums] = await Promise.all(fetchPromises);
        
        console.log('users', users);
        console.log('posts', posts);
        console.log('albums', albums);
        
    } catch (error) {
        console.log('ooooooops');
    }
};

getData();

