// require('parsleyjs')
// require('pretty-checkbox')

$('.option').on('click', function() {
    $(this).removeClass('selected')
    $(this).addClass('selected')
    $(this).css({
        'font-size': '1.3em'
    })
})