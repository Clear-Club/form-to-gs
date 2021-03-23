// google sheets link
const scriptURL = "https://script.google.com/macros/s/AKfycby9wvgDyjgdQLglnxX_ZLIE0k5BUzYcA-IWXInOvx_JJRu-dj9Ah2qCzB2_6vHgvmJHSg/exec"

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
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form) 
    })
        .then(response => {
            console.log('Success!', response);
            alert('Form has been successfully submitted at' + todayDate());
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('BEEP BOOP: there is an error, please try again');
        });

    // resets form after submission 
    form.reset();
});

// handler for .ready()
$(function() {
    // Tech tracking form conditions
    $("#what-task").on("change", function() {
        switch($(this).val()) {
            case "Tech Trimming":
            case "Pouring":
            case "Breaking":
            case "Thermoforming":
            case "Quality Assurance":
            case "Tray Tracking":
            case "Accepted Guards":
                // priority yes || no
                $("#toggle-option").removeClass("hidden-option");
                $("#toggle-name").addClass("hidden-option");
                $("#toggle-tray").addClass("hidden-option");
                $("#toggle-impressions").addClass("hidden-option");
                $("#toggle-submit").addClass("hidden-option");
                $("#toggle-cart").addClass("hidden-option");
                break;
            // does not use priority
            case "Repour Guard Not Made":
            case "Repour G.M.":
                $("#toggle-cart").addClass("hidden-option");
                $("#toggle-option").addClass("hidden-option");
                $("#toggle-name").removeClass("hidden-option");
                $("#toggle-tray").removeClass("hidden-option");
                $("#toggle-impressions").removeClass("hidden-option");
                $("#toggle-submit").removeClass("hidden-option");
                document.getElementById("tray-label").innerHTML = "Tray Number: ";
                break;
            default:
        }
    });

    // after choosing task; priority yes || no
    $("#is-priority").on("change", function() {
        if ($("#what-task").val() === "Tray Tracking" && $(this).val() === "Yes") {
            // cart tag
            $("#toggle-cart").removeClass("hidden-option");
            // tray tag
            $("#toggle-tray").removeClass("hidden-option");
            document.getElementById("tray-label").innerHTML = "Priority Tray Name: ";
            // qr code impression area
            $("#toggle-impressions").removeClass("hidden-option");
            // submit button
            $("#toggle-submit").removeClass("hidden-option");
            // name tag
            $("#toggle-name").addClass("hidden-option");
        } else if ($("#what-task").val() === "Tray Tracking" && $(this).val() === "No") {
            // cart tag
            $("#toggle-cart").removeClass("hidden-option");
            // tray tag
            $("#toggle-tray").removeClass("hidden-option");
            document.getElementById("tray-label").innerHTML = "Tray Number: ";
            // qr code impression area
            $("#toggle-impressions").addClass("hidden-option");
            // submit button
            $("#toggle-submit").removeClass("hidden-option");
        } else if($(this).val() === "Yes") {
            // cart tag
            $("#toggle-cart").addClass("hidden-option");
            // name tag
            $("#toggle-name").removeClass("hidden-option");
            // tray tag
            $("#toggle-tray").removeClass("hidden-option");
            document.getElementById("tray-label").innerHTML = "Priority Tray Name: ";
            // qr code impression area
            $("#toggle-impressions").removeClass("hidden-option");
            // submit button
            $("#toggle-submit").removeClass("hidden-option");
        } else if($(this).val() === "No") {
            // cart tag
            $("#toggle-cart").removeClass("hidden-option");
            // name tag
            $("#toggle-name").removeClass("hidden-option");
            // tray tag
            $("#toggle-tray").removeClass("hidden-option");
            document.getElementById("tray-label").innerHTML = "Tray Number";
            // qr text area
            $("#toggle-impressions").removeClass("hidden-option");
            // cart tag
            $("#toggle-cart").addClass("hidden-option");
            // submit button
            $("#toggle-submit").removeClass("hidden-option");
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
            document.getElementById('tray_number').innerHTML = "Destination Priority Tray Name:";
            // enables name && disables cart
        } else if ($(this).val() === "Accepted Impressions" || $(this).val() === "Repour G.M.") {
            $("#toggle-names").removeClass("hidden-option");
            $("#name").attr("required", true);
            $("#toggle-carts").addClass("hidden-option");
            $("#cart-name").attr("required", false);
            document.getElementById('tray_number').innerHTML = "Tray Number:";
            // disables both cart and name
        } else {
            $("#toggle-carts").addClass("hidden-option");
            $("#cart-name").attr("required", false);
            $("#toggle-names").addClass("hidden-option");
            $("#name").attr("required", false);
        }
    });

    // disables return button tray input tag
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