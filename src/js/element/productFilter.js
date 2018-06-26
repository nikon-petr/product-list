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
                <div class="input-group col-6 px-0 mb-2 ">
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
                <div class="text-right col-6 px-0 mb-2">
                    <button 
                        id="add-button"
                        type="button"
                        data-target="#modal-addnew-update"
                        data-toggle="modal"
                        data-action="add"
                        class="btn btn-outline-success" 
                    >Add New</button>
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