const corsProxy = 'https://api.allorigins.win/get?url=';
const url = 'https://cs-rock.com';
const proxiedUrl = corsProxy + encodeURIComponent(url);



async function fetchHTML(url, searchTerm) {
  try {
    const response = await axios.get(url);
    const responseData = response.data.contents;

    // Create a DOM parser to parse the response data
    const parser = new DOMParser();
    const doc = parser.parseFromString(responseData, 'text/html');

    // Get all h1, h2, h3, h4 tags
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'p'];
    let resultFound = false;
    
    const result = document.getElementById('result');
    result.innerHTML = ''; // Clear previous results

    // Convert the search term to lowercase for case-insensitive comparison
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    headingTags.forEach(tag => {
      const elements = Array.from(doc.getElementsByTagName(tag));

      // Check if any of the heading elements contain the search term, case-insensitively
      elements.forEach(element => {
        if (element.textContent.toLowerCase().includes(lowerCaseSearchTerm)) {
          result.innerHTML += `The word "${searchTerm}" is present in <${tag}>: "${element.textContent}".<br>`;
          resultFound = true;
        }
      });
    });

    // If no results found, show a message
    if (!resultFound) {
      result.innerHTML = `The word "${searchTerm}" is not present in any <h1>, <h2>, <h3>, or <h4> tags.`;
    }

  } catch (error) {
    console.error('Error fetching HTML:', error);
  }
}

const searchForm = document.getElementById('searchForm')

searchForm.addEventListener('input', function(event) {
 
  const searchTerm = document.getElementById('searchInput').value.trim();
  if (searchTerm) {
    fetchHTML(proxiedUrl, searchTerm);

  } else {
    document.getElementById('result').innerHTML = 'Please enter a word to search.';
  }
});
