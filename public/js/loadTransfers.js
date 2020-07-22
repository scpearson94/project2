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

    const output = document.getElementById('output');


    console.log('Attempting to load transfers');
    // Create a new XMLHttpRequest object and resolve the target URI.
    var request = new XMLHttpRequest();

    const target  = '/transfer_loader';
    request.open('GET', target, true);
    request.send();
    
    // Listen for changes to the XMLHttpRequest's readyState.
    request.onreadystatechange = function() {
        // Do nothing until the request is finished.
        if (request.readyState === DONE) {
            var div = document.createElement('div');
            // If the request was successful, set the output to the response.
            if (request.status === OKAY) {
                let rsList = [];
                (JSON.parse(request.responseText)).forEach(rslt => { 
                    const amount = rslt['amount'];
                    const description = rslt['description'];
                    const transfer_date = rslt['transfer_date'];
                    //const from_account = rslt['from_account_id'];
                    //const to_account = rslt['to_account_id']; 
                    //div.appendChild(document.createTextNode("From Account: " + from_account + "; "));
                    //div.appendChild(document.createTextNode("To Account: " + from_account + "; "));
                    div.appendChild(document.createTextNode("$" + amount + "; "));
                    div.appendChild(document.createTextNode(description + "; "));
                    div.appendChild(document.createTextNode("Date: " + transfer_date));
                    div.appendChild(document.createElement('section'));
                });
                console.log(request.responseText);
            } else {
                div.appendChild(document.createTextNode(JSON.stringify(ERROR)));
            }
            // Append the div to the output container.
            output.replaceChild(div, output.firstChild);
        }
    };
});