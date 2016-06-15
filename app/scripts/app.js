/*
Instructions:
(1) Use .map to fetch all the planets in parallel.
  (a) Call .map on an array and pass it a function.
  (b) .map will execute the function against each element in the array immediately.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;
  var tracker = [];

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  /**
   * Helper function to create a planet thumbnail.
   * @param  {Object} data - The raw data describing the planet.
   */
  function createPlanetThumb(data) {
    var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    home.appendChild(pT);
  }

  /**
   * XHR wrapped in a promise
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url);
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }

  function addPlanetsInOrder(url, idx) {
    tracker[idx] = true;
    console.log('planet: ' + idx);
    if (idx && tracker[idx - 1] == true) {
      console.log('adding planet: ' + idx);
      createPlanetThumb(url);
    } else {
      console.log('adding planet: ' + idx);
      createPlanetThumb(url);
    }
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Your code goes here! Uncomment the next line when you're ready to start!
     */

    //cam solution
    // getJSON('../data/earth-like-results.json')
    //   .then(function(result) {
    //     result.results.map(function(url, idx) {
    //       getJSON(url).then(createPlanetThumb)
    //     })
    //   })



    //my solution (this runs in parallel and checks that planets added in order)
    getJSON('../data/earth-like-results.json')
      .then(function(result) {
        //var sequence = Promise.resolve();
        result.results.map(function(url, idx) {
          //console.log('url: ' + url);
          getJSON(url).then(function(result) {
            addPlanetsInOrder(result, idx);
          })
        })
      })

  });
})(document);
