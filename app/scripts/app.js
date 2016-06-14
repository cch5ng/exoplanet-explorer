/*
Instructions:
(1) Get the planet data and add the search header.
(2) Create the first thumbnail with createPlanetThumb(data)
(3) Handle errors!
  (a) Pass 'unknown' to the search header.
  (b) console.log the error.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    home.innerHTML = '';
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
    //if no options specificed, default method is GET
    // return fetch(url, {
    //   method: 'get'
    // });
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return get(url).then(function(response) {
      //return fetch response
      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Uncomment the next line and start here when you're ready to add the first thumbnail!

    Your code goes here!
     */

    //cam solution; this way a little cleaner 
    getJSON('../data/earth-like-results.json')
      .then(function(result) {
        //returns a promise based on 2nd http get from results of first http get
        return getJSON(result.results[5]);
      })
      .catch(function(err) {
        console.log('err on first get for planets list');
        throw(Error('search req error'));
      })
      //next then and catch respond to the promise returned from first then
      .then(function(result) {
        createPlanetThumb(result);
      })
      .catch(function(err) {
        console.log('err on 2nd get for indiv planet');
        addSearchHeader('unknown');
      })


    //my solution
    // getJSON('../data/earth-like-results.json').then(function(result) {
    //   return result.results[5];
    // }).then(function(result) {
    //   var url2 = '../' + result;
    //   getJSON(url2).then(function(result) {
    //     createPlanetThumb(result);
    //   }).catch(function(err) {
    //     console.log('err on 2nd get for indiv planet');
    //   })
    // }).catch(function(err) {
    //   console.log('err on first get for planets list');
    // })
  });
})(document);
