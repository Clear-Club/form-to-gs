const scriptURL = 'https://script.google.com/macros/s/AKfycbzR7pDjkxCV-eu2Qq_zMdy96QEeR0p_afOZlS3RQp13VPcm8anc-LZM-Q/exec';

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

// using enter/return to go to next field
// $('form input').keydown(function (e) {
//     if (e.keyCode == 13) {
//         var inputs = $(this).parents("form").eq(0).find(":input");
//         if (inputs[inputs.index(this) + 1] != null) {
//             inputs[inputs.index(this) + 1].focus();
//         }
//         e.preventDefault();
//         return false;
//     }
// });