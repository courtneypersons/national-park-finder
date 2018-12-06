'use strict';

// put your own value below!
const apiKey = 'kKK5VSTithd3NGMnFXfklzR635orYXp6xROSRQ2Z'; 
const searchURL = 'https://api.nps.gov/api/v1/parks';
let start = 1


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseData) {
  // if there are previous results, remove them
  console.log(responseData);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseData.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseData.data[i].fullName}<span>(${responseData.data[i].states})</span></h3>
      <p>${responseData.data[i].description}</p>
      <a href='${responseData.data[i].url}'>${responseData.data[i].url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getYouTubeVideos(query, limit=10, start) {
  const params = {
    stateCode: query,
    limit,
    start: start,
    key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseData => displayResults(responseData))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, limit, start);
  });
}

$(watchForm);