
var valid;
var d = new Date();
var currentYear = d.getFullYear();
var name;
var day;
var month;

$(document).ready(function (event) {

    $('body').addClass('gradient');

    if (window.location.href.indexOf("name=") > -1) {
        name = window.location.href.split('name=')[1].split('&')[0];
    }

    if (window.location.href.indexOf("day=") > -1) {
        day = window.location.href.split('day=')[1].split('&')[0];
    }

    if (window.location.href.indexOf("month=") > -1) {
        month = window.location.href.split('month=')[1].split('&')[0];
        setTimeout(function () {
            $('#nameInput').val(name);
            $('#dayInput').val(day);
            $('#monthInput').val(month);
        }, 100)

        setTimeout(function () {
            $('#submitBtn').click();
        }, 200)

        setTimeout(function () {
            window.history.pushState('page2', 'Title', '?');
            window.addEventListener('popstate', function (event) {
                window.location.href("");
                history.pushState(null, null, window.location.pathname);
            });
        }, 500)
    }

    setTimeout(function () {
        $('#daySelect').val(0);
        $('#monthSelect').val(0);
        startDropdown($('#daySelect'), $('.dayDrop'));
        startDropdown($('#monthSelect'), $('.monthDrop'));
    }, 0)

    for (var i = 1; i < 32; i++) {
        var option = $('<option>', {
            value: i,
            text: i
        }).appendTo($('#dayInput'));

        var daydropLi = $('<li>', {
            value: i,
            text: i
        }).appendTo($('.dayDrop .dropdown-menu'));
    }

    for (var i = 1; i < 13; i++) {
        var option = $('<option>', {
            value: i,
            text: i
        }).appendTo($('#monthInput'));

        var monthDropLi = $('<li>', {
            value: i,
            text: i
        }).appendTo($('.monthDrop .dropdown-menu'));
    }
})


function startDropdown(selectMenu, dropdown) {

    dropdown.click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });

    dropdown.focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });

    $('.dropdown .dropdown-menu li').click(function () {

        var temp = $(this).parents('.dropdown').find('p');

        $('.dropdown .dropdown-menu li').removeClass('active');
        $(this).addClass('active');

        $(this).parents('.dropdown').find('p').text($(this).text());
        $(this).parents('.dropdown').find(selectMenu).attr('value', $(this).val());

    });
}


function birthdays(name, day, month) {

    valid = true;

    var nameInputVal = $('#nameInput').val();
    var dayInputVal = $('#daySelect').attr('value');
    var monthInputVal = $('#monthSelect').attr('value');

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
        $('.dayDrop').css({
            'border': '1px solid #FF4545'
        });
        valid = false;
    } else {
        $('.dayDrop').css({
            'border': '1px solid #aebed4'
        });
    }

    if (monthInputVal == '' || monthInputVal == undefined || monthInputVal > 12 || monthInputVal.length > 2) {
        $('.monthDrop').css({
            'border': '1px solid #FF4545'
        });
        valid = false;
    } else {
        $('.monthDrop').css({
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

            $('html, body').animate({ scrollTop: $('.birthdayWrapper:last-child').position().top + 200}, 'slow'); 
        } else {
            $('.monthDrop').css({
                'border': '1px solid #FF4545'
            });
            $('.dayDrop').css({
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
    $('#daySelect').attr('value', '');
    $('#monthSelect').attr('value', '');
    $('#daySelect').html('Choose Day');
    $('#monthSelect').html('Choose Month');
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
