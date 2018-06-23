import $ from "jquery";
import Abstract from "./abstract";

export default class ProductFilter extends Abstract{
    constructor(onSearch){
        super();
        this.onSearch = onSearch;
        this.filterString = '';
    }

    draw() {
        return `
            <div class="row">
                <div class="col-6 px-0 mb-2 input-group">
                      <input 
                            id="filter-input"
                            type="search" 
                            class="form-control" 
                            placeholder="Enter product name or substring">
                      <div class="input-group-append">
                            <button 
                                id="filter-button"
                                type="button"
                                class="btn btn-secondary" 
                            >Search</button>
                      </div>
                </div>
            </div>
        `
    }

    bindHandlers() {
        this.bindFilerButton();
        this.bindFilterInput();
    }

    bindFilerButton () {
        $('#filter-button').bind('click', () => {
            this.onSearch();
        });
    }

    bindFilterInput () {
        $('#filter-input').bind('input', () => {
            this.filterString = $('#filter-input').val();
        });
    }

    trimFilterString () {
        return this.filterString.trim();
    }
}