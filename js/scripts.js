// google sheets link
const scriptURL = "";

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
            if(response.ok) {
                console.log('Success!', response);
                alert('Form has been successfully submitted at ' + todayDate() + "Response: " + response.status);
            } else {
                console.log(response);
                alert("Ohhh noooo!! ERROR please try again response: " + response.status);
            }
        })
        .catch(error => {
            console.log("Error!!" + error);
            console.error('Error!', error.message);
            alert('BEEP BOOP: there is an error, please try again');
        });

    // resets form after submission 
    form.reset();
});

// handler for .ready()
$(function() {
    //////////////////////////////////////
    // Tech tracking page
    // Trimming | Priority | Tray Tracking | Pouring
    // Breaking | Repour Guard NOT Made | Thermoforming
    ///////////////////////////////////////
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
                $("#tray-placeholder").attr("required", true);
                document.getElementById("tray-placeholder").placeholder = "Tray Number";
                document.getElementById("is-priority").value = "No";
                break;
            default:
        }
    });

    // after choosing task; priority yes || no
    $("#is-priority").on("change", function() {
        if ($("#what-task").val() === "Tray Tracking" && $(this).val() === "Yes") {
            // needed elements
            $("#toggle-cart").removeClass("hidden-option");
            $("#task").attr("required", true);
            $("#toggle-tray").removeClass("hidden-option");
            document.getElementById("tray-label").innerHTML = "Priority Tray Name: ";
            document.getElementById("tray-placeholder").placeholder = "Priority Tray Name";
            $("#tray-placeholder").attr("required", true);
            $("#toggle-impressions").removeClass("hidden-option");
            $("#qrCodeArea-tracking").attr("required", true);
            $("#toggle-submit").removeClass("hidden-option");
            // NOT NEEDED
            $("#toggle-name").addClass("hidden-option");
            $("#name").attr("required", false);
        } else if ($("#what-task").val() === "Tray Tracking" && $(this).val() === "No") {
            // NEEDED ELEMENTS
            $("#toggle-cart").removeClass("hidden-option");
            $("#task").attr("required", true);
            $("#toggle-tray").removeClass("hidden-option");
            document.getElementById("tray-label").innerHTML = "Tray Number: ";
            document.getElementById("tray-placeholder").placeholder = "Tray Number";
            $("#tray-placeholder").attr("required", true);
            $("#toggle-submit").removeClass("hidden-option");
            // NOT NEEDED ELEMENTS
            $("#toggle-impressions").addClass("hidden-option");
            $("#qrCodeArea-tracking").attr("required", false);
        } else if($(this).val() === "Yes") {
            // NEEDED
            $("#toggle-name").removeClass("hidden-option");
            $("#name").attr("required", true);
            $("#toggle-tray").removeClass("hidden-option");
            document.getElementById("tray-label").innerHTML = "Priority Tray Name: ";
            document.getElementById("tray-placeholder").placeholder = "Priority Tray Name";
            $("#tray-placeholder").attr("required", true);
            $("#toggle-impressions").removeClass("hidden-option");
            $("#qrCodeArea-tracking").attr("required", true);
            $("#toggle-submit").removeClass("hidden-option");
            // NOT NEEDED
            $("#toggle-cart").addClass("hidden-option");
            $("#task").attr("required", false);
        } else if($(this).val() === "No") {
            // NEEDED
            $("#toggle-cart").removeClass("hidden-option");
            $("#task").attr("required", true);
            $("#toggle-name").removeClass("hidden-option");
            $("#name").attr("required", true);
            $("#toggle-tray").removeClass("hidden-option");
            document.getElementById("tray-label").innerHTML = "Tray Number";
            document.getElementById("tray-placeholder").placeholder = "Tray Number";
            $("#tray-placeholder").attr("required", true);
            $("#toggle-impressions").removeClass("hidden-option");
            $("#qrCodeArea-tracking").attr("required", true);
            $("#toggle-submit").removeClass("hidden-option");
            // NOT NEEDED
            $("#toggle-cart").addClass("hidden-option");
            $("#task").attr("required", false);
            // submit button
            $("#toggle-submit").removeClass("hidden-option");
        }
    });

    ///////////////////////////////////
    // Supervisor page
    // Fixed Guards | ReThermoforming | Accepted Guards | Quality Assurance
    ///////////////////////////////////
    $("#supe-task").on("change", function() {
        if ($(this).val() === "Quality Assurance" || $(this).val() === "Accepted Guards") {
            $("#toggle-priority-supes").removeClass("hidden-option");
            $("#toggle-tech-name").addClass("hidden-option");
            $("#toggle-super-name").addClass("hidden-option");
            $("#toggle-tech-name").addClass("hidden-option");
            $("#toggle-impression-area").addClass("hidden-option");
        } else if ($(this).val() === "Fixed Guards" || $(this).val() === "ReThermoforming") {
            $("#toggle-super-name").removeClass("hidden-option");
            $("#toggle-tech-name").removeClass("hidden-option");
            $("#toggle-impression-area").removeClass("hidden-option");
            // if priority was enabled
            $("#toggle-priority-supes").addClass("hidden-option");
            $("#toggle-tray-supes").addClass("hidden-option");
            $("#tray-id").attr("required", false);
        }
    });

    // Priority yes || no FOR supervisor form
    $("#is-priority-supes").on("change", function() {
        if($(this).val() === "Yes") {
            $("#toggle-super-name").removeClass("hidden-option");
            $("#toggle-tech-name").addClass("hidden-option");
            $("#toggle-tray-supes").removeClass("hidden-option");
            document.getElementById("tray-label-supes").innerHTML = "Priority Tray Name:";
            document.getElementById("tray-id").placeholder = "Priority Tray Name";
            $("#toggle-impression-area").removeClass("hidden-option");
            $("#tray-id").attr("required", true);
        } else if($(this).val() === "No") {
            $("#toggle-super-name").removeClass("hidden-option");
            $("#toggle-tray-supes").removeClass("hidden-option");
            $("#toggle-tech-name").addClass("hidden-option");
            document.getElementById("tray-label-supes").innerHTML = "Tray Number:";
            document.getElementById("tray-id").placeholder = "Tray Number";
            $("#toggle-impression-area").removeClass("hidden-option");
            $("#tray-id").attr("required", true);
        }
    });

    /////////////////////////////////////////////
    // non-tech page
    // priority tracking || Accepted Impressions || Storage Check
    ///////////////////////////////////////////////
    $("#non-task").on("change", function() {
        if($(this).val() === "Priority Tracking") {
            // form properties needed
            $("#toggle-trays").removeClass("hidden-option");
            $("#tray-nontech-placeholder").attr("required", true);
            document.getElementById('tray_number').innerHTML = "Destination Priority Tray name:";
            document.getElementById("tray-nontech-placeholder").placeholder = "Priority Tray Name";
            $("#toggle-carts").removeClass("hidden-option");
            $("#cart-name").attr("required", true);
            $("#toggle-scan-impressions").removeClass("hidden-option");
            $("#qrCodeArea").attr("required", true);
            // HIDE FORM PROPERTIES NOT NEEDED
            $("#toggle-checking").addClass("hidden-option");
            $("#check").attr("required", false);
            $("#toggle-names").addClass("hidden-option");
            $("#name").attr("required", false);
            $("#toggle-reason").addClass("hidden-option");
            $("#reason").attr("required", false);
        } else if ($(this).val() === "Accepted Impressions" || $(this).val() === "Repour G.M.") {
            // needed fields
            $("#toggle-names").removeClass("hidden-option");
            $("#name").attr("required", true);
            $("#toggle-trays").removeClass("hidden-option");
            $("#tray-nontech-placeholder").attr("required", true);
            document.getElementById('tray_number').innerHTML = "Tray Number:";
            document.getElementById("tray-nontech-placeholder").placeholder = "Tray Number";
            $("#toggle-scan-impressions").removeClass("hidden-option");
            $("#qrCodeArea").attr("required", true);
            // NOT needed fields
            $("#toggle-carts").addClass("hidden-option");
            $("#cart-name").attr("required", false);
            $("#toggle-checking").addClass("hidden-option");
            $("#check").attr("required", false);
            $("#toggle-reason").addClass("hidden-option");
            $("#reason").attr("required", false);
        } else if ($(this).val() === "Storage Check") {
            // needed fields
            $("#toggle-checking").removeClass("hidden-option");
            $("#check").attr("required", true);
            $("#toggle-names").removeClass("hidden-option");
            $("#name").attr("required", true);
            $("#toggle-reason").removeClass("hidden-option");
            $("#reason").attr("required", true);
            $("#toggle-scan-impressions").removeClass("hidden-option");
            $("#qrCodeArea").attr("required", true);
            // DONT NEED
            $("#toggle-trays").addClass("hidden-option");
            $("#tray-nontech-placeholder").attr("required", false);
            $("#toggle-carts").addClass("hidden-option");
            $("#cart-name").attr("required", false);
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