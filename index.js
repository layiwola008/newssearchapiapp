  // const apiKey = "833ea1b9d7mshbef97797dff363dp1d9ac4jsna2801a24e32d";

// function getNews() {
//   const url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=Tesla";
  
//  const options = {
//     headers: new Headers({
//       "x-rapidapi-key": apiKey}),
//     mode: 'cors'
//   };

//   fetch(url, options)
//     .then(response => response.json())
//     .then(responseJson => console.log(responseJson));
// }

// $(getNews);

'use strict';

const apiKey = "833ea1b9d7mshbef97797dff363dp1d9ac4jsna2801a24e32d";

const searchURL = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getNews(query, maxResults=10) {
  const params = {
    q: query,
    pageSize: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "x-rapidapi-key": apiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.value.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson.value[i].url}">${responseJson.value[i].title}</a></h3>
      <p>${responseJson.value[i].description}</p>
      <p>${responseJson.value[i].body}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
  });
}

$(watchForm);