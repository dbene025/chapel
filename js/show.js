// JavaScript Document
function showContent(page) {
    let pageUrl;

    switch(page) {
        case 'home':
            pageUrl = 'index.html';
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
            pageUrl = 'index.html';
            break;
    }

    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading page:', error); // This line can be removed if console errors are not allowed by linter
        });
}
