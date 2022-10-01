let span = document.querySelector('.date');
let todayOnly = new Date();
let todayOnlyYear = todayOnly.getFullYear();
span.innerText = todayOnlyYear;

let date = document.querySelector('#date');
let btn = document.querySelector('.show');
let declaration = document.querySelector('.declaration')
// let today = {
//     day: 1,
//     month: 1,
//     year: 2014
// }


btn.addEventListener('click', function () {
    // console.log(palindromeCheck('racecar'));
    // console.log(dateToString(today));
    // console.log(formatsCheck(today));
    // console.log(nextPal(today)[0]);
    // console.log(nextPal(today)[1]);
    // console.log(prevPal(today)[0]);
    // console.log(prevPal(today)[1]);

    let dateHere = date.value

    if (date.value != '') {
        let dateList = dateHere.split('-');

        let today = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        }

        if (nextPal(today)[0] < prevPal(today)[0]) {
            declaration.innerText = 'You missed by ' + nextPal(today)[0] + ' days, The nearest palindrome date is ' + nextPal(today)[1].day + '/' + nextPal(today)[1].month + '/' + nextPal(today)[1].year;
        } else {
            declaration.innerText = 'You missed by ' + prevPal(today)[0] + ', The nearest palindrome date is ' + prevPal(today)[1].day + '/' + prevPal(today)[1].month + '/' + prevPal(today)[1].year;
        }

    }

})

function reverseString(string) {
    return string.split('').reverse().join('');
}

function palindromeCheck(string) {
    return (string === reverseString(string));
}

function dateToString(date) {

    let string = {
        day: '',
        month: '',
        year: ''
    }

    if (date.day <= 9) {
        string.day = '0' + date.day;
    } else {
        string.day = date.day.toString();
    }

    if (date.month <= 9) {
        string.month = '0' + date.month;
    } else {
        string.month = date.month.toString();
    }

    string.year = date.year.toString();

    return string

}

function formats(dateImport) {
    let date = dateToString(dateImport)

    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yymmdd = date.year.slice(-2) + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function formatsCheck(days) {

    let formCh = formats(days);
    let isPal = false;

    for (let index = 0; index < formCh.length; index++) {
        if (palindromeCheck(formCh[index])) {
            isPal = true;
            break;
        }
    }
    return isPal;
}

function isLeap(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function nextDate(dateInp) {

    let day = dateInp.day + 1;
    let month = dateInp.month;
    let year = dateInp.year;

    let monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeap(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > monthList[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };

}

function nextPal(fullDate) {
    let date = nextDate(fullDate);
    let count = 0;

    while (true) {
        count++;
        if (formatsCheck(date)) {
            return [
                count,
                date
            ]
        }
        date = nextDate(date);
    }
}

function prevDate(dateInp) {

    let day = dateInp.day - 1;
    let month = dateInp.month;
    let year = dateInp.year;

    let monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (isLeap(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        } else {
            if (day < 1) {
                day = 28;
                month--;
            }
        }
    } else {
        if (day < 1) {
            month--;
            day = monthList[month - 1];
        }
    }

    if (month < 1) {
        month = 12;
        year--;
        day = 31
    }

    return {
        day: day,
        month: month,
        year: year
    };

}

function prevPal(fullDate) {
    let date = prevDate(fullDate);
    let count = 0;

    while (true) {
        count++;
        if (formatsCheck(date)) {
            return [
                count,
                date
            ]
        }
        date = prevDate(date);
    }
}