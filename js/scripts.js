// google sheets link
const scriptURL = 'https://script.google.com/macros/s/AKfycbxNfN_PG2v5N-uQD1nLf0oMzO3j_UDUx0MUjCz0d_A3G6UZItvSmiTgp2FWOQVRUjYwEA/exec';

const form01 = document.forms['tech-action-form'];
const form02 = document.forms['tray-tracking-form'];
const form03 = document.forms['quality-thermo-form'];
const form04 = document.forms['fixed-rethermo-form'];

// form 01 for tech actions (index) submission
form01.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form01) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message));

    // resets form after submission 
    form01.reset();
});

// form 02 for tray tracking submission
form02.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form02) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message));

    // resets form after submission 
    form02.reset();
});

// form 03 for Quality Assurance and Thermoforming
form03.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form03) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message));

    // resets form after submission 
    form03.reset();
});

// form 02 for tray tracking submission
form04.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form04) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message));

    // resets form after submission 
    form04.reset();
});

// handler for .ready()
$(function() {
    $("#tracking").on("change", function() {
        // console.log($(this).val())
        if($(this).val() === "Priority Tracking") {
            $("#toggle-priority").removeClass("hidden-priority");
            $("#qrCodeArea-tracking").attr("required", true);
        } else {
            $("#toggle-priority").addClass("hidden-priority");
            $("#qrCodeArea-tracking").attr("required", false);
        }
    });

    // triggers to stop return or submit form for tray input tag
    $(".stop-return").on("keypress", function(event) {
        if(event.which == '13') {
            event.preventDefault();
        }
    });
});