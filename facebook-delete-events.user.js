// ==UserScript==
// @name        Facebook delete past events
// @namespace   klausi
// @description Deletes all your past events on Facebook
// @license     GPL-2.0-or-later
// @homepageURL https://github.com/klausi/facebook-delete-events
// @author      klausi
// @include     https://www.facebook.com/events/calendar/past/
// @version     3
// @grant       none
// ==/UserScript==

var input = document.createElement("input");
input.type = "button";
input.value = "Delete all past events";
input.onclick = deleteAllPastEvents;
prependChild(document.getElementById('content_container'), input);

function deleteAllPastEvents() {
    // Get all the remove event links and click them.
    var remove_links = document.querySelectorAll('#events_dashboard_calendar .rfloat div[data-hover = "tooltip"]');
    remove_links.forEach(function (link) {
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
