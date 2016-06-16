/*
Instructions:
(1) Use Promise.all to refactor the .map code by passing Promise.all an array of Promises.
  (a) Each Promise will be executed in parallel.
  (b) The return values will be returned in the same order as the Promises were created.
Hint: you'll probably still need to use .map.
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

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Refactor this code with Promise.all!
     */
    //cam solution
    // getJSON('../data/earth-like-results.json')
    // .then(function(response) {

    //   addSearchHeader(response.query);

    //   var promiseAr = response.results.map(function(url) {
    //     getJSON(url);
    //   });
    //   return Promise.all(promiseAr);
    // })
    // .then(function(planetDataAr) {
    //   console.log('planetDataAr' + planetDataAr);
    //   planetDataAr.forEach(function(data) {
    //     createPlanetThumb(data);
    //   })
    // })
//   });


      //my solution
    getJSON('../data/earth-like-results.json')
    .then(function(response) {
      addSearchHeader(response.query);
      var promisesAr = [];

      for (var i = 0; i < response.results.length; i++) {
        promisesAr.push(getJSON('../' + response.results[i]));
      }

//issues getting the promisesAr to populate using map function
      // var promisesAr = response.results.map(function(url) {
      //   console.log('url: ' + url);
      //   var mProm = new Promise(function() {
      //     getJSON("../" + url);
      //   });
      // });

      console.log('promisesAr: ' + promisesAr);

      return Promise.all(promisesAr);
    })
    //slightly cleaner
    .then(function(results) {
      console.log('results length: ' + results.length);
      results.forEach(function(data) {
        createPlanetThumb(data);
      });
    });

      //working method for me but it is using a bit of nested then
      // Promise.all(promisesAr).then(function(results) {
      //   console.log('results length: ' + results.length);
      //   results.forEach(function(data) {
      //     createPlanetThumb(data);
      //   });
      // });
    //})

  });
})(document);
