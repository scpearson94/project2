/**
 * @file A vanilla JavaScript demonstration of a GET AJAX request.
 */
'use strict';

console.log("JS file is accessed");
// Constants used during the AJAX request.
var DONE  = 4;
var OKAY  = 200;
var ERROR = {
  "message": "The request failed!"
};

// Wait for the document to load before binding event handlers further.
document.addEventListener('DOMContentLoaded', function(e) {

    // Obtain programmatic reference to the important elements of the page.
    const signupForm = document.getElementById('signupForm');
    const first_name = document.getElementById("first_name");
    const last_name = document.getElementById("last_name");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const output = document.getElementById('output');
    let queryString = "";

    // Listen for submission events on the example form.
    signupForm.addEventListener('submit', function(e) {
        
        // Programmatically prevent the form from submitting.
        e.preventDefault();

        if (validateForm()) { // data is valid
            console.log('data is valid');
            // Create a new XMLHttpRequest object and resolve the target URI.
            var request = new XMLHttpRequest();

            queryString = "first_name=" + first_name.value + 
            "&last_name=" + last_name.value + 
            "&username=" + username.value +
            "&password=" + password.value; 
            console.log(queryString);
            const target  = '/signup';
            request.open('POST', target);
            request.send(queryString);

            // Listen for changes to the XMLHttpRequest's readyState.
            request.onreadystatechange = function() {

                // Do nothing until the request is finished.
                if (request.readyState === DONE) {

                    // Create a div element to hold the output.
                    var div = document.createElement('div');

                    // If the request was successful, append the response.
                    // If not, append a JSON error object.
                    if (request.status === OKAY) {
                        if (request.responseText == "error") {
                            div.appendChild(document.createTextNode("The data send to the server was invalid"));
                        } else {
                            signupForm.submit();
                        }
                    } else {
                        div.appendChild(document.createTextNode(JSON.stringify(ERROR)));
                    }

                    // Append the div to the output container.
                    output.appendChild(div);
                }
            };
        }
    });
});


function validateForm() {
    // input boxes
    const password = document.getElementById("password").value;
    const password_confirm = document.getElementById("password_confirm").value;
    // error messages
    const p_error = document.getElementById("p_error");
    const pc_error = document.getElementById("pc_error");

    p_error.innerHTML = "";
    pc_error.innerHTML = "";
    if (password !== password_confirm) {
        p_error.innerHTML = "These fields must match";
        pc_error.innerHTML = "These fields must match";
        return false;
    }
    return true;

}