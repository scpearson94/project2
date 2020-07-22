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

    const category = document.getElementById('category');

    console.log('Attempting to load categories into dropdown menu');
    // Create a new XMLHttpRequest object and resolve the target URI.
    var request = new XMLHttpRequest();

    const target  = '/category_loader';
    request.open('GET', target, true);
    request.send();
    
    // Listen for changes to the XMLHttpRequest's readyState.
    request.onreadystatechange = function() {
        // Do nothing until the request is finished.
        if (request.readyState === DONE) {
            
            // If the request was successful, set the output to the response.
            if (request.status === OKAY) {
                let rsList = [];
                (JSON.parse(request.responseText)).forEach( (rslt, i) => { 
                    var option = document.createElement('option');
                    const name = rslt['name']; 
                    console.log(name);
                    option.appendChild(document.createTextNode(name));
                    option.setAttribute("value", i + 1);
                    category.appendChild(option);
                });
                console.log(request.responseText);
            } else {
                option.appendChild(document.createTextNode(JSON.stringify(ERROR)));
            }
            // Append the div to the output container.
            
        }
    };
});