document.querySelector('#pdffFile').addEventListener('change', () => {

    let pdffFile = document.querySelector('#pdffFile').files[0];
    let pdffFileURL = URL.createObjectURL(pdffFile);

    document.querySelector('#vistaPrevia').setAttribute('src', pdffFileURL);
})