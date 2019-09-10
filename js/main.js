
var valid;
var d = new Date();
var currentYear = d.getFullYear();

$(document).ready(function (event) {

    setTimeout(function () {
        $('#dayInput').val(0);
        $('#monthInput').val(0);
    }, 0)

    for (var i = 1; i < 32; i++) {
        var option = $('<option>', {
            value: i,
            text: i
        }).appendTo($('#dayInput'))
    }
})

function birthdays(name, day, month) {
    valid = true;
    var nameInputVal = $('#nameInput').val();
    var dayInputVal = $('#dayInput').val();
    var monthInputVal = $('#monthInput').val();

    if (nameInputVal == '' || nameInputVal == undefined) {
        $('#nameInput').css({
            'border': '1px solid #FF4545'
        });
        valid = false;
    } else {
        $('#nameInput').css({
            'border': '1px solid #aebed4'
        });
    }
    
    if (dayInputVal == '' || dayInputVal == undefined || dayInputVal > 31 || dayInputVal.length > 2) {
        $('#dayInput').css({
            'border': '1px solid #FF4545'
        });
        valid = false;
    } else {
        $('#dayInput').css({
            'border': '1px solid #aebed4'
        });
    }

    if (monthInputVal == '' || monthInputVal == undefined || monthInputVal > 12 || monthInputVal.length > 2) {
        $('#monthInput').css({
            'border': '1px solid #FF4545'
        });
        valid = false;
    } else {
        $('#monthInput').css({
            'border': '1px solid #aebed4'
        });
    }

    var nameCapitalized = nameInputVal.charAt(0).toUpperCase() + nameInputVal.slice(1);

    if (valid) {
        month = month - 1;
        var year = currentYear
        var date = new Date(year, month, day);
        if (day == date.getDate()) {

            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var birthdayWrapper = $('<div>', {
                class: 'birthdayWrapper',
            }).appendTo($('.container')).hide().fadeIn('slow');

            var nameHeader = $('<h2>', {
                class: 'nameHeader',
                text: nameCapitalized
            }).appendTo(birthdayWrapper)

            var leftSide = $('<div>', {
                class: 'left',
            }).appendTo(birthdayWrapper);

            var rightSide = $('<div>', {
                class: 'right',
            }).appendTo(birthdayWrapper);

            for (var year = currentYear; year <= currentYear + 15; year++) {
                var date2 = new Date(year, month, day);
                buildBirthdays(leftSide, date2, year, days);
            }

            for (var year = currentYear + 16; year <= currentYear + 31; year++) {
                var date3 = new Date(year, month, day);
                buildBirthdays(rightSide, date3, year, days);
            }

            $('html, body').animate({ scrollTop: $('.birthdayWrapper:last-child').position().top }, 'slow'); 
        } else {
            $('#monthInput').css({
                'border': '1px solid #FF4545'
            });
            $('#dayInput').css({
                'border': '1px solid #FF4545'
            });
        }
    }
}

function buildBirthdays(side, date, year, days) {
    var dateWrapper = $('<div>', {
        class: 'dateWrapper',
    }).appendTo(side)

    var yearP = $('<p>', {
        class: 'yearP',
        text: year
    }).appendTo(dateWrapper)

    var dayP = $('<p>', {
        class: 'dayP',
        text: days[date.getDay()]
    }).appendTo(dateWrapper)

    $('#nameInput').val('');
    $('#dayInput').val('');
    $('#monthInput').val('');
    $('#clearBtn').css('display', 'block');
}

function clearContainer() {
    $('.container').empty();
    $('#clearBtn').css('display', 'none');
}

function BackColor(elem) {
    $(elem).css('color', '#566472');
    $(elem).css('border-color', '#aebed4');
}
