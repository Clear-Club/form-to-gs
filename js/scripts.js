// google sheets link
const scriptURL = '';

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