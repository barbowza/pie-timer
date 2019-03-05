export function DurationPicker(modalId) {
    this._document = document;
    this._elModal = this._document.getElementById(modalId);
    this._elClose = this._elModal.getElementsByClassName('modal-close')[0];
    this._elClose.onclick = (e) => {
        this._elModal.classList.remove('is-active');
    };
}
    
DurationPicker.prototype.open = function () {
    this._elModal.classList.add('is-active');
}