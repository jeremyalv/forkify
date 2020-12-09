import * as model from './model.js';  
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime'; // Polyfilling async/await
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if(!id) return;
    recipeView.renderSpinner();

    // 0. Update resultsView to mark selected search result
    resultsView.update(model.getSearchResultsPage());


    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);     
    
  } catch (err) {
    recipeView.renderError();
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
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4. Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();

const controlPagination = function(goToPage) {
  // 3. Render NEW Results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4. Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe servings in state
  model.updateServings(newServings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  // Bookmark handler

  // If the recipe isn't bookmarked, bookmark the recipe
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe); 
  else model.deleteBookmark(model.state.recipe.id); 
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();