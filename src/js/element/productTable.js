import Abstract from "./abstract";
import $ from "jquery";

export default class ProductTable extends Abstract {
    constructor () {
        super();
        this.sortingField = 'name';
        this.sortingOrder = 'asc';
    }

    draw() {
        return `
            <div class="row">
                <table id="products-table" class="table table-bordered">
                    <thead>
                    <tr class="text-center">
                        <th scope="col" colspan="2">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        `
    }

    bindHandlers() {
    }

    update (products) {
        console.log('Table updated');

        $("#products-table > tbody").empty().append(`
            ${products.map(product => `
                <tr scope="row">
                    <td width="40%" class="border-right-0">${product.name}</td>
                    <td width="15%" class="text-right border-left-0 "><span class="badge badge-pill badge-info">${product.count}</span></td>
                    <td width="20%" class="text-center">${product.price}</td>
                    <td width="25%" class="text-center">
                        <button
                            id="edit-button${product.id}"
                            type="button"
                            class="btn btn-warning" 
                        >Edit</button>
                        <button
                            id="delete-button-${product.id}"
                            type="button"
                            class="btn btn-danger" 
                        >Delete</button>
                    </td>
                </tr>
            `).join('')}
        `);
    }
}