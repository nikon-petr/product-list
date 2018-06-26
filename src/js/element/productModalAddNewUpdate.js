import $ from 'jquery'
import Abstract from "./abstract";

export default class ProductModalAddNewUpdate extends Abstract{
    constructor (onUpdate, onAddNew) {
        super();
        this.onUpdate = onUpdate;
        this.onAddNew = onAddNew;
        this.product = undefined;
        this.priceFormatter = new Intl.NumberFormat('en', {style: 'currency', currency: 'USD'});
        this.action = undefined;
        this.nameRules = [
            v => !!v || 'Name must not be empty',
            v => v.length <= 15 || 'Name must contains less than 15 characters',
            v => !/^\s+$/.test(v) || 'Name must not contains only space characters'
        ];
        this.countRules = [
            v => !!v || 'Count is required',
            v => /^\d+$/.test(v) || 'Count must be positive integer'
        ];
        this.priceRules = [
            v => !!v || 'Price is required',
            v => !/^-\d*(\.\d+)?$/.test(v) || 'Price must be positive',
            v => /^\d*(\.\d+)?$/.test(v) || 'Price must be real'
        ];
    }

    draw () {
        return `
            <div id="modal-addnew-update" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static">
              <div class="modal-dialog modal-dialog-centered " role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="modal-update-label"></h5>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="product-name-update" class="col-form-label"><bold>Name</bold></label>
                        <input type="text" class="form-control" id="product-name-update" placeholder="Enter name" autocomplete=off>
                        <div class="invalid-feedback"></div>
                      </div>
                      <div class="form-group">
                        <label for="product-count-update" class="col-form-label"><bold>Count</bold></label>
                        <input 
                            type="text" 
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                            class="form-control" 
                            id="product-count-update"
                            placeholder="Enter count"
                            autocomplete=off>
                        <div class="invalid-feedback"></div>
                      </div>
                      <div class="form-group">
                        <label for="product-price-update" class="col-form-label"><bold>Price</bold></label>
                        <input type="text" class="form-control" id="product-price-update" placeholder="Enter price" autocomplete=off>
                        <div class="invalid-feedback"></div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="action-confirm" type="button" class="btn btn-primary"></button>
                  </div>
                </div>
              </div>
            </div>
        `
    }

    bindHandlers () {
        this.bindModalElement();
        this.bindNameInput();
        this.bindPriceInput();
        this.bindCountInput();
        this.bindSubmitButton();
    }

    bindModalElement () {
        $('#modal-addnew-update')
            .on('show.bs.modal', e => {
                const button = $(e.relatedTarget);
                this.action = button.data('action');
                if (this.action === 'update') {
                    this.product = button.data('product');
                    $('#product-name-update').val(this.product.name);
                    $('#product-count-update').val(this.product.count);
                    const formattedPrice = this.priceFormatter.format(this.product.price);
                    $('#product-price-update').val(isNaN(formattedPrice) ? this.product.price : formattedPrice);
                } else if (this.action === 'add') {
                    this.product = {name: '', count: '', price: ''};
                    $(e.target).find('input').val('')
                }
                $('#action-confirm').text(this.action.replace(/(^|\s)\S/g, l => l.toUpperCase()))
                $('#modal-update-label').text(this.action.replace(/(^|\s)\S/g, l => l.toUpperCase()) + ' product')
            })
            .on('shown.bs.modal', e => {
                $(e.target).find('.is-valid, .is-invalid')
                    .removeClass('is-valid')
                    .removeClass('is-invalid')
            })
    }

    bindNameInput () {
        $('#product-name-update')
            .bind('input', e => {
                this.product.name = $(e.target).val();
                this.validateName(true)
            })
            .bind('blur', e => {
                this.validateName()
            })
    }

    bindCountInput () {
        $('#product-count-update')
            .bind('input', e => {
                this.product.count = $(e.target).val();
                this.validateCount(true)
            })
            .bind('paste', e => {
                e.preventDefault();
                e.stopPropagation();
                $(e.target).val((event.clipboardData || window.clipboardData || event.originalEvent.clipboardData)
                    .getData('text')
                    .replace(/\D/g,''));
            })
            .bind('blur', e => {
                if(this.validateCount()) {
                    $(e.target).val(parseInt(this.product.count));
                } else {
                    $(e.target).val(this.product.count.toString());
                }
            })
    }

    bindPriceInput () {
        $('#product-price-update')
            .bind('focus', e => {
                $(e.target).val(this.product.price);
            })
            .bind('input', e => {
                this.product.price = $(e.target).val();
                this.validatePrice(true)
            })
            .bind('blur', e => {
                if(this.validatePrice()) {
                    $(e.target).val(this.priceFormatter.format(this.product.price));
                }
            })
    }

    bindSubmitButton () {
        $('#action-confirm').bind('click', e => {
            if (this.validateForm()) {
                this.product.count = parseInt(this.product.count);
                if (this.action === 'update') {
                    this.onUpdate(this.product);
                } else if (this.action === 'add') {
                    this.onAddNew(this.product);
                }
                this.product = undefined;
                this.action = undefined;
                $('#modal-addnew-update').modal('hide');
            }
        })
    }

    validateForm () {
        return this.validateName() * this.validateCount() * this.validatePrice();
    }

    validateName (onInputCheck=false) {
        const input = $('#product-name-update');
        let message = this.getValidationMessage(this.product.name.toString(), this.nameRules);
        this.updateInputValidationFeedback(input, message, onInputCheck);
        return message === true;
    }

    validateCount (onInputCheck=false) {
        const input = $('#product-count-update');
        let message = this.getValidationMessage(this.product.count.toString(), this.countRules);
        this.updateInputValidationFeedback(input, message, onInputCheck);
        return message === true;
    }

    validatePrice (onInputCheck=false) {
        const input = $('#product-price-update');
        let message = this.getValidationMessage(this.product.price.toString(), this.priceRules);
        this.updateInputValidationFeedback(input, message, onInputCheck);
        return message === true;
    }

    updateInputValidationFeedback (input, message, onInputCheck) {
        if (message !== true) {
            if (onInputCheck || input.hasClass('is-invalid')) {
                input.siblings('.invalid-feedback').text(message);
            } else {
                input.siblings('.invalid-feedback').text(message);
                input.removeClass('is-valid').addClass('is-invalid');
            }
        } else {
            if (onInputCheck) {
                input.removeClass('is-invalid')
            } else {
                input.addClass('is-valid').removeClass('is-invalid');
            }
        }
    }

    getValidationMessage (value, rules) {
        let validationResult;
        for (let i = 0; i < rules.length; i++) {
            if ((validationResult = rules[i](value)) !== true) {
                return validationResult;
            }
        }
        return true;
    }
}