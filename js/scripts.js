// google sheets link
const scriptURL = '';

const form = document.getElementById('form-submission-gs');

// // form for all form types in different pages
form.addEventListener('submit', (e) => {
    // prints log information with date
    var consoleFormData = new FormData(form);
    console.log(todayDate());
    for(var pair of consoleFormData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    e.preventDefault();
    console.log("form has been submitted!");
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response);
            alert('Form has been successfully submitted at' + todayDate());
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('error: please try again');
        });

    // resets form after submission 
    form.reset();
});

// handler for .ready()
$(function() {
    // tray tracking regular || priority tracking condition
    $("#tracking").on("change", function() {
        // console.log($(this).val())
        if($(this).val() === "Priority Tracking") {
            $("#toggle-priority").removeClass("hidden-option");
            $("#qrCodeArea-tracking").attr("required", true);
        } else {
            $("#toggle-priority").addClass("hidden-option");
            $("#qrCodeArea-tracking").attr("required", false);
        }
    });

    // non-tech
    // priority tracking || Accepted Impressions
    $("#non-task").on("change", function() {
        // enables cart && disables name
        if($(this).val() === "Priority Tracking") {
            $("#toggle-carts").removeClass("hidden-option");
            $("#cart-name").attr("required", true);
            $("#toggle-names").addClass("hidden-option");
            $("#name").attr("required", false);
            // enables name && disables cart
        } else if($(this).val() === "Accepted Impressions") {
            $("#toggle-names").removeClass("hidden-option");
            $("#name").attr("required", true);
            $("#toggle-carts").addClass("hidden-option");
            $("#cart-name").attr("required", false);
            // disables both cart and name
        } else {
            $("#toggle-carts").addClass("hidden-option");
            $("#cart-name").attr("required", false);
            $("#toggle-names").addClass("hidden-option");
            $("#name").attr("required", false);
        }
    });

    // triggers to stop return or submit form for tray input tag
    $(".stop-return").on("keypress", function(event) {
        if(event.which == '13') {
            event.preventDefault();
        }
    });
});

// prints new date
function todayDate() {
    return new Date;
}