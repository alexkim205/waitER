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

    $('.option.age')
    .click(function() {
        let ageChosen = $(this).index()
        let vitalspanels = $('.panelforvitalspanel').children()
        vitalspanels.each(function(index) {
            $(this).css({
                'display': 'none',
            })
        });
        vitalspanels.eq(ageChosen).css({
            'display': 'flex',
        })
    })
});

