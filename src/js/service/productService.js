export default class ProductService {
    constructor (data, onUpdate) {
        this.products = data
        this.onUpdate = onUpdate
    }

    addNewProduct (product) {
        product.id = this.products.reduce((e, l) => e.id > l.id ? e : l).id + 1;
        this.products.push(product);
        this.onUpdate()
    }

    removeProduct (id) {
        this.products.splice(this.products.findIndex(product => product.id === id), 1)
        this.onUpdate()
    }

    updateProduct (updateProduct) {
        let productIndex = this.products.findIndex(product => product.id === updateProduct.id)
        this.products[productIndex].name = updateProduct.name;
        this.products[productIndex].count = updateProduct.count;
        this.products[productIndex].price = updateProduct.price;
        this.onUpdate()
    }

    getProducts(filterString, sortingField, sortingOrder) {
        let filteredProducts = [];
        if (filterString === '') {
            filteredProducts = this.products;
        } else {
            let regExp = new RegExp(filterString, 'i');
            filteredProducts = this.products.filter(product => regExp.test(product.name));
        }
        if (sortingField === 'none') {
            return filteredProducts;
        } else {
            return filteredProducts.concat().sort(this.getProductComparator(sortingField, sortingOrder));
        }
    }

    getProductById (id) {
        return this.products.find(product => product.id === id);
    }

    getProductComparator (field, order) {
        return function(a, b) {
            if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) {
                return 0;
            }

            const varA = (typeof a[field] === 'string') ?
                a[field].toLowerCase() : a[field];
            const varB = (typeof b[field] === 'string') ?
                b[field].toLowerCase() : b[field];

            if (typeof varA === 'number' && typeof varB === 'number') {
                return order === 'desc' ? (varA - varB) * -1 : varA - varB;
            }

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }

            return order === 'desc' ? comparison * -1 : comparison;
        }
    }
}