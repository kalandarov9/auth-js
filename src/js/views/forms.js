function inputErrorTemplete(msg) {
    return `
        <div class="invalid-feedback">${msg}</div>
    `;
}

export function showInputError(el) {
    //console.log(el)
    const parent = el.parentElement;
    const msg = el.dataset.invalidMessage || "Invalid input";
    const template = inputErrorTemplete(msg);
    if (el.classList.contains('is-invalid')) return;
    // if (el.classList[1] === "is-invalid") {
    //     return;
    // }
    el.classList.add('is-invalid');
    parent.insertAdjacentHTML('beforeend', template);
}

export function removeInputError(el) {
    const parent = el.parentElement;
    const err = parent.querySelector('.invalid-feedback');
    if (!err) return;
    el.classList.remove('is-invalid');
    //console.log(parent)
    parent.removeChild(err);
}

export function checkCountError(el) {
    const count = document.querySelectorAll('.invalid-feedback');
    if (count.length > 0) return showInputError(el)
    //console.log(count.length);
}