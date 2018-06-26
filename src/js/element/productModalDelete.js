import $ from 'jquery'
import Abstract from "./abstract";

export default class ProductModalDelete extends Abstract{
    constructor (onDeleteConfirmed) {
        super();
        this.onDeleteConfirmed = onDeleteConfirmed;
        this.product = undefined;
    }


    draw () {
        return `
            <div id="modal-delete" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static">
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

    bindModalElement () {
        $('#modal-delete').on('show.bs.modal',  e => {
            this.product = $(e.relatedTarget).data('product')
            $(e.target).find('.modal-body > p').empty().append(`Are you sure you want to delete <strong>${this.product.name}</strong> product?`)
        })
    }

    bindModalDeleteButton () {
        $('#modal-delete-button').bind('click', () => {
            $('#modal-delete').modal('hide');
            this.onDeleteConfirmed(this.product.id)
        })
    }
}