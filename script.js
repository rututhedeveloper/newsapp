// Define API key and base URL for News API
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

// Fetch news data from News API
async function fetchNews() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch news');

        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        displayErrorMessage();
    }
}

// Display news articles in the DOM
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear any existing articles

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-article');

        articleDiv.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(articleDiv);
    });
}
// Fetch news based on selected category
function fetchNewsByCategory() {
    const category = document.getElementById('category').value;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    fetchNews(url);
}

// Display error message if news cannot be fetched
function displayErrorMessage() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p>Sorry, we could not load the news at this time. Please try again later.</p>';
}

// Fetch news on page load
document.addEventListener('DOMContentLoaded', fetchNews);