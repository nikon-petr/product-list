import $ from 'jquery'
import Abstract from "./abstract";

export default class ProductModalDelete extends Abstract{
    constructor (onDeleteConfirmed) {
        super();
        this.onDeleteConfirmed = onDeleteConfirmed;
    }


    draw () {
        return `
            <div id="modal-delete-element" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Delete</h5>
                  </div>
                  <div class="modal-body">
                    <p></p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="modal-delete-button" type="button" class="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            </div>
        `
    }

    bindHandlers () {
        this.bindModalDeleteButton();
        this.bindModalElement();
    }

    show (product) {
        $('#modal-delete-element').data('product', product).after().modal('show')
    }

    bindModalElement () {
        $('#modal-delete-element').on('show.bs.modal', function () {
            $(this).find('.modal-body > p').empty().append(`Are you sure you want to delete <strong>${$(this).data('product').name}</strong> product?`)
        })
    }

    bindModalDeleteButton () {
        $('#modal-delete-button').bind('click', () => {
            let $modal = $('#modal-delete-element')
            let product = $modal.data('product');
            $modal.removeData('product').modal('hide');
            this.onDeleteConfirmed(product.id)
        })
    }
}