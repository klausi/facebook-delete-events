// ==UserScript==
// @name        Facebook delete past events
// @namespace   klausi
// @description Deletes all your past events on Facebook
// @license     GPLv2; https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
// @homepageURL https://github.com/klausi/facebook-delete-events
// @author      klausi
// @include     https://www.facebook.com/events/past/
// @version     2
// @grant       none
// ==/UserScript==

var input=document.createElement("input");
input.type="button";
input.value="Delete all past events";
input.onclick = deleteAllPastEvents;
prependChild(document.getElementById('content_container'), input);

function deleteAllPastEvents() {
    // Get all the remove event links and click them.
    var remove_links = document.querySelectorAll('[tooltip = "Remove Event"]');
    remove_links.forEach(function(link) {
        link.click();
    });
  
    // There might be more events left if we scroll down completely.
    if (remove_links.length !== 0) {
        window.scrollTo(0, document.body.scrollHeight);
        // Wait 5 seconds and restart deleting more events.
        setTimeout(deleteAllPastEvents, 5000);
    }
    else {
        alert('All past events deleted!');
    }
}

function prependChild(parent, newFirstChild) {
    parent.insertBefore(newFirstChild, parent.firstChild)
}
