import * as model from './model.js';  
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'; // Polyfilling async/await
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);


       
  } catch (err) {
    recipeView.renderError();
    console.error(err)
  }
};


const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    // 1. Get Search Query
    const query = searchView.getQuery();
    if (!query) return;
    

    // 2. Load Search Results
    await model.loadSearchResults(query);

    // 3. Render Results
    // console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();