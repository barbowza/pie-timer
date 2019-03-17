export function Modal(modalId) {
    this._elModal = document.getElementById(modalId);
    this._elClose = this._elModal.getElementsByClassName('modal-close')[0];
    this._elClose.onclick = (e) => {
        this._elModal.close();
    };
}

// Call with list of elements which raise click events that should open the modal
Modal.prototype.addOpeners = function (elements) {
    for (let i = 0; i < elements.length; ++i) {
        elements[i].addEventListener('click', (e) => {
            this.open();
        }, false);
    }    
}

// Call to open modal directly
Modal.prototype.open = function () {
    this._elModal.classList.add('is-active');
}

Modal.prototype.close = function () {
    this._elModal.classList.remove('is-active');
}