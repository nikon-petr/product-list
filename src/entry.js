import 'bootstrap'
import './scss/application.scss'
import Application from './js/application'

const products = [
    {id: 1, name: 'Apples', count: 50, price: 12600.20},
    {id: 2, name: 'Oranges', count: 1050, price: 1600.71},
    {id: 3, name: 'Tomatoes', count: 2, price: 10.20},
    {id: 4, name: 'Potatoes', count: 325, price: 452.86}
];

let app = new Application(products);

window.onload = () => app.init()

export {
    app
}