// https://gist.github.com/Zodiase/af44115098b20d69c531
export default class Abstract {
    constructor() {
        if (this.constructor === Abstract) {
            throw new TypeError("Abstract class is not constructable");
        }
        if (this.draw() === Abstract.prototype.draw) {
            throw new TypeError("Method draw() is not implemented");
        }
        if (this.bindHandlers() === Abstract.prototype.bindHandlers) {
            throw new TypeError("Method bindHandlers() is not implemented");
        }
    }

    draw() {
        throw new TypeError("draw method() is abstract");
    }

    bindHandlers() {
        throw new TypeError("bindHandlers() method is abstract");
    }
}