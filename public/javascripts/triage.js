var io = require('socket.io-client')();

// require('parsleyjs')
// require('pretty-checkbox')
console.log('Triage.js loaded')

$(document).ready(function () {
  $('.option')
    .click(function () {
      console.log('clicked')
      let options = $(this).siblings().andSelf()
      options.removeClass('selected')
      $(this).addClass('selected')
    })

  $('.option.age')
    .click(function () {
      let ageChosen = $(this).index()
      let vitalspanels = $('.panelforvitalspanel').children()
      vitalspanels.each(function (index) {
        $(this).css({
          'display': 'none',
        })
      });
      vitalspanels.eq(ageChosen).css({
        'display': 'flex',
      })
    })

  function getESI() {
    // Decisions; TODO add error checking
    var fA, fB, fC, fD1, fD2, fD3, ESI

    function getAnswer(element) {
      let chosenOne
      element.children().each(function (index) {
        if ($(this).hasClass('selected')) {
          chosenOne = index
        }
      })
      return(chosenOne)
    }
    // Decision A; yes or no
    fA = getAnswer($('.selector.A'))

    // Decision B; yes or no
    fB = getAnswer($('.selector.B'))

    // Decision C; none, one, or many
    fC = getAnswer($('.selector.C'))

    // Decision D; 3 pairs of yes or no's
    let $vitals = $('.selector.D')
    fD1 = getAnswer($vitals.eq(0)) // hr
    fD2 = getAnswer($vitals.eq(1)) // rr
    fD3 = getAnswer($vitals.eq(2)) // o2

    // Logic; https://www.ahrq.gov/sites/default/files/wysiwyg/professionals/systems/hospital/esi/esihandbk.pdf
    var consider2 = 0
    if (fA == 0) {
      ESI = 1
    } else if (fB == 1) {
      ESI = 2
    } else {
      if (fC == 0) {
        ESI = 5
      } else if (fC == 1) {
        ESI = 4
      } else if (fC == 2) {
        if (fD1 == 0 || fD2 == 0 || fD3 == 0) { // if vitals are dangerous
          ESI = 3
          consider2 = 1
        } else {
          ESI = 3
        }
      }
    }

    // Display EMI


    return (ESI)
  }

  $('#submitbutton').click(function(){
    var newPatientEMI = getESI();
    console.log(newPatientEMI);
    io.emit("add-patient", {
      esi: newPatientEMI
    });
  })

});

io.on("generated-id", (id) =>{
  console.log(`New patient id: ${id}`);
  var submitbutton = document.getElementById("submitbutton");
  submitbutton.innerHTML = `Submitted; Patient ID: ${id}`;
  var patientlink = document.getElementById("patientlink");
  patientlink.href = `./id/${id}`;
  patientlink.style = "";
  var submitbreak = document.getElementById("submitbreak");
  submitbreak.style = "";
  var dashboardlink = document.getElementById("dashboardlink");
  dashboardlink.style = "";
});