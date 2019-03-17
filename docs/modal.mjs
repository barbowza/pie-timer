export function Modal(modalId) {
    this._elModal = document.getElementById(modalId);
    const closers = this._elModal.getElementsByClassName('modal-close');
    for (let i = 0; i < closers.length; ++i) {
        closers[i].addEventListener('click', (e) => {
            this.close();
        }, false);
    }    
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