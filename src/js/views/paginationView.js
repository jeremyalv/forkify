import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  
  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    console.log(numPages);

    // On page 1, there are other pages 

    // On page 1, there are no other pages

    // On last page

    // On other page

  }
}

export default new PaginationView();