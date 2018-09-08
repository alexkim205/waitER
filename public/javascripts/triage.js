// require('parsleyjs')
// require('pretty-checkbox')
console.log('Triage.js loaded')

$(document).ready(function() {
    $('.option')
    .click(function() {
        console.log('clicked')
        let options = $(this).siblings().andSelf()
        options.removeClass('selected')
        $(this).addClass('selected')
    })
});

