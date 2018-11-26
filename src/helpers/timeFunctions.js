// converts seconds to a 'time object', i.e. {minutes: 08, seconds: 04}.
function convertTime(seconds) {
  let timeObj = {};
  timeObj.minutes = Math.floor(seconds / 60);
  timeObj.seconds = seconds - timeObj.minutes * 60;

  return timeObj;
}

// helper to convert a positive 1 or 2 digit 'time' number to a 2 digit string
function zeroPrefix(number) {
  if (number < 0) return '00';
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

export { convertTime, zeroPrefix };
