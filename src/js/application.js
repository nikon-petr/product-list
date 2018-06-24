import $ from 'jquery'
import ProductTable from './element/productTable'
import ProductFilter from './element/productFilter'
import ProductService from "./service/productService";

export default class Application {
    constructor (data) {
        this.productService = new ProductService(data, this.onUpdateHandler.bind(this));
        this.productTable = new ProductTable(this.onSortingChange.bind(this));
        this.productFilter = new ProductFilter(this.onFilterHandler.bind(this));
    }

    init () {
        $('#product-section').append(`
            <div class="row"><h1 class="mb-5">Products</h1></div>
            ${this.productFilter.draw()}
            ${this.productTable.draw()} 
        `);

        this.update()

        this.productTable.bindHandlers();
        this.productFilter.bindHandlers();
    }

    update () {
        let result = this.productService.getProducts(
            this.productFilter.trimFilterString(),
            this.productTable.sortingField,
            this.productTable.sortingOrder);
        this.productTable.update(result);
    }

    onFilterHandler () {
        this.update()
    }

    onUpdateHandler () {
        this.update()
    }

    onSortingChange () {
        this.update()
    }
}