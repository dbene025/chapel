// JavaScript Document
function showContent(page) {
    let pageUrl;

    switch(page) {
        case 'home':
            pageUrl = 'home.html';
            break;
        case 'office':
            pageUrl = 'office.html';
            break;
        case 'about-us':
            pageUrl = 'about-us-content.html';
            break;
        case 'missaskim':
            pageUrl = 'missaskim.html';
            break;
        case 'directions':
            pageUrl = 'directions.html';
            break;
        default:
            pageUrl = 'home.html';
            break;
    }

    // Fetch the content from the specified URL
    fetch(pageUrl)
        .then(response => {
            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            // Inject the fetched content into the content div
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            // Log any errors to the console
            console.error('Error loading page:', error);
        });
}
