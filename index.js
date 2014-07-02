/*
Without using any built in date or time functions, write a function that accepts two mandatory arguments.
The first argument is a string of the format "[H]H:MM {AM|PM}" and the second argument is an integer.
Assume the integer is the number of minutes to add to the string.
The return value of the function should be a string of the same format as the first argument. 
For example AddMinutes ("9:13 AM", 10) would return  "9:23 AM"
*/

function AddMinutes(strTime, minutesToAdd) {

    minutesToAdd = parseInt(minutesToAdd);
    if (Math.floor(minutesToAdd) !== minutesToAdd) {
        throw new Error('The second parameter must be an integer.');
    }

    var regexMatch = strTime.match(/^(1[0-2]|\d):([0-5]\d) (AM|PM)$/);
    if (!regexMatch) {
        throw new Error('Formatting of time is incorrect. It must be have the format of [H]H:MM {AM|PM}');
    }

    var hour = parseInt(regexMatch[1]);
    var minute = parseInt(regexMatch[2]);
    var meridiem = regexMatch[3];

    var totalMinutes = (hour * 60) + minute + (meridiem === 'PM' ? 12 * 60 : 0);

    var newTotalMinutes = totalMinutes + minutesToAdd;
    newTotalMinutes %= 24 * 60;

    var newHour = Math.floor(newTotalMinutes / 60);
    var newMinute = newTotalMinutes % 60;

    var newMeridiem;
    if (newHour === 12) {
        newMeridiem = 'PM';
    }
    else if (newHour === 0) {
        newHour = 12;
        newMeridiem = 'AM';
    }
    else if (newHour > 12) {
        newMeridiem = 'PM';
        newHour -= 12;
    }
    else if (newHour < 12) {
        newMeridiem = 'AM';
    }

    return newHour + ':' + (newMinute < 10 ? '0' : '') + newMinute + ' ' + newMeridiem;

}
