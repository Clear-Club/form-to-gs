const scriptURL = 'https://script.google.com/macros/s/AKfycbwLCvbUAk4H7YkH43md1OfGbZ8RDSPWDYkOGDYSxAWV03GGFGNp/exec'
const form = document.forms['submit-to-google-sheets']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
})