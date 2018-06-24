import Abstract from "./abstract";
import $ from "jquery";

export default class ProductTable extends Abstract {
    constructor (onSortingChange) {
        super();
        this.sortingField = 'none';
        this.sortingOrder = 'asc';
        this.onSortingChange = onSortingChange;
    }

    draw() {
        return `
            <div class="row">
                <table id="products-table" class="table table-bordered" rules="groups">
                    <colgroup>
                        <col span="1" width="35%">
                        <col span="1" width="15%">
                    </colgroup>
                    <col span="1" width="25%">
                    <col span="1" width="25%">
                    <thead>
                    <tr>
                        <th scope="colgroup" colspan="2">
                            Name <div class="sorting-container"><div class="sorting-wrapper"><button 
                                    id="name-sorting-button" 
                                    type="button"
                                    class="btn btn-sm btn-light"
                                  ><i class="material-icons">unfold_more</i></button></div></div>       
                        </th>
                        <th scope="col">
                            Price <div class="sorting-container"><div class="sorting-wrapper"><button 
                                    id="price-sorting-button"
                                    type="button"
                                    class="btn btn-sm btn-light sorting-btn"
                                   ><i class="material-icons">unfold_more</i></button></div></div>
                        </th>
                        <th scope="col" class="align-middle">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        `
    }

    bindHandlers() {
        this.bindNameSortingButton();
        this.bindPriceSortingButton();
    }

    update (products) {
        console.log('Table updated');

        if (products.length > 0) {
            $("#products-table > tbody").empty().append(`
                ${products.map(product => `
                    <tr scope="row">
                        <td class="text-left border-right-0"><a href="" class="btn btn-sm btn-link">${product.name}</a></td>
                        <td class="text-right border-left-0">
                            <span class="badge badge-pill badge-secondary">${product.count}</span>
                        </td>
                        <td>${new Intl.NumberFormat('en', {
                            style: 'currency',
                            currency: 'USD'
                            }).format(product.price)}
                        </td>
                        <td>
                            <button
                                id="edit-button-${product.id}"
                                type="button"
                                class="btn btn-sm btn-light" 
                            ><i class="icon-primary material-icons">edit</i></button>
                            <button
                                id="delete-button-${product.id}"
                                type="button"
                                class="btn btn-sm btn-light" 
                            ><i class="material-icons icon-danger">delete</i></button>
                        </td>
                    </tr>
                `).join('')}
            `);
        } else {
            $("#products-table > tbody").empty().append(`
                <tr scope="row">
                    <td colspan="4">No matches</td>
                </tr>
            `)
        }
    }

    toggleSorting (sortingField) {
        if (this.sortingField === sortingField) {
            if (this.sortingOrder === 'asc') {
                this.sortingOrder = 'desc'
            } else if (this.sortingOrder === 'desc') {
                this.sortingField = 'none'
                this.sortingOrder = 'asc'
            }
        } else {
            this.sortingField = sortingField
            this.sortingOrder = 'asc'
        }
        this.toggleSortingButtons()
    }

    toggleSortingButtons () {
        if (this.sortingField === 'none') {
            $('#name-sorting-button > i').empty().append('unfold_more');
            $('#price-sorting-button > i').empty().append('unfold_more');
        } else if (this.sortingField === 'name') {
            $('#name-sorting-button > i').empty().append(this.sortingOrder === 'asc' ? 'expand_more' : 'expand_less');
            $('#price-sorting-button > i').empty().append('unfold_more');
        } else if (this.sortingField ==='price') {
            $('#name-sorting-button > i').empty().append('unfold_more');
            $('#price-sorting-button > i').empty().append(this.sortingOrder === 'asc' ? 'expand_more' : 'expand_less');
        }
    }

    bindNameSortingButton () {
        $('#name-sorting-button').bind('click', () => {
            this.toggleSorting('name');
            this.onSortingChange();
        });
    }

    bindPriceSortingButton () {
        $('#price-sorting-button').bind('click', () => {
            this.toggleSorting('price');
            this.onSortingChange();
        });
    }
}