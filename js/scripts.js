// google sheets link
const scriptURL = 'https://script.google.com/macros/s/AKfycbyCmyyNxrlCZzFf3YnhMf5ear4W_QdLeMHeDt7IEXlowa0tgeJgC_KKgIbXynshRq9rig/exec';

// const form = document.forms['submit-to-google-sheets']
const form = document.getElementById('submit-to-google-sheets');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message));

    // resets form after submission 
    form.reset();
})