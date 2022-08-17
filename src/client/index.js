import { init } from './js/app'; //import main function
import './js/flatpickr'; //import date picker

import './styles/base.scss'

//Call init function on DOMContentLoaded event
window.addEventListener('DOMContentLoaded', init);

export { init }