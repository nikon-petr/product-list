import $ from 'jquery'
import ProductTable from './element/productTable'
import ProductFilter from './element/productFilter'
import ProductService from "./service/productService";

export default class Application {
    constructor (data) {
        this.productService = new ProductService(data, this.onUpdateHandler.bind(this));
        this.productTable = new ProductTable();
        this.productFilter = new ProductFilter(this.onFilterHandler.bind(this));
    }

    init () {
        $('#product-section').append(`
            <h1 class="mb-5">Products</h1>
            ${this.productFilter.draw()}
            ${this.productTable.draw()} 
        `);

        let result = this.productService.getProducts(
            this.productFilter.trimFilterString(),
            this.productTable.sortingField,
            this.productTable.sortingOrder);
        this.productTable.update(result);

        this.productTable.bindHandlers();
        this.productFilter.bindHandlers();
    }

    onFilterHandler () {
        let result = this.productService.getProducts(
            this.productFilter.trimFilterString(),
            this.productTable.sortingField,
            this.productTable.sortingOrder);
        this.productTable.update(result);
    }

    onUpdateHandler () {
        let result = this.productService.getProducts(
            this.productFilter.trimFilterString(),
            this.productTable.sortingField,
            this.productTable.sortingOrder);
        this.productTable.update(result);
    }
}