//Add date picker calendar to the date input field
import flatpickr from 'flatpickr';

flatpickr('.flatpickr.js-flatpickr-dateTime', {
    enableTime: false,
    time_24hr: false,
    altInput: true,
    altFormat: 'd M Y',
    dateFormat: 'Y-m-d',
    minDate: "today",
})

export { flatpickr }