/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@eonasdan/tempus-dominus/dist/js/tempus-dominus.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@eonasdan/tempus-dominus/dist/js/tempus-dominus.esm.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateTime: () => (/* binding */ DateTime),
/* harmony export */   DefaultEnLocalization: () => (/* binding */ DefaultEnLocalization),
/* harmony export */   DefaultOptions: () => (/* binding */ DefaultOptions),
/* harmony export */   Namespace: () => (/* binding */ Namespace),
/* harmony export */   TempusDominus: () => (/* binding */ TempusDominus),
/* harmony export */   Unit: () => (/* binding */ Unit),
/* harmony export */   extend: () => (/* binding */ extend),
/* harmony export */   loadLocale: () => (/* binding */ loadLocale),
/* harmony export */   locale: () => (/* binding */ locale),
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
class TdError extends Error {
}
class ErrorMessages {
    constructor() {
        this.base = 'TD:';
        //#endregion
        //#region used with notify.error
        /**
         * Used with an Error Event type if the user selects a date that
         * fails restriction validation.
         */
        this.failedToSetInvalidDate = 'Failed to set invalid date';
        /**
         * Used with an Error Event type when a user changes the value of the
         * input field directly, and does not provide a valid date.
         */
        this.failedToParseInput = 'Failed parse input field';
        //#endregion
    }
    //#region out to console
    /**
     * Throws an error indicating that a key in the options object is invalid.
     * @param optionName
     */
    unexpectedOption(optionName) {
        const error = new TdError(`${this.base} Unexpected option: ${optionName} does not match a known option.`);
        error.code = 1;
        throw error;
    }
    /**
     * Throws an error indicating that one more keys in the options object is invalid.
     * @param optionName
     */
    unexpectedOptions(optionName) {
        const error = new TdError(`${this.base}: ${optionName.join(', ')}`);
        error.code = 1;
        throw error;
    }
    /**
     * Throws an error when an option is provide an unsupported value.
     * For example a value of 'cheese' for toolbarPlacement which only supports
     * 'top', 'bottom', 'default'.
     * @param optionName
     * @param badValue
     * @param validOptions
     */
    unexpectedOptionValue(optionName, badValue, validOptions) {
        const error = new TdError(`${this.base} Unexpected option value: ${optionName} does not accept a value of "${badValue}". Valid values are: ${validOptions.join(', ')}`);
        error.code = 2;
        throw error;
    }
    /**
     * Throws an error when an option value is the wrong type.
     * For example a string value was provided to multipleDates which only
     * supports true or false.
     * @param optionName
     * @param badType
     * @param expectedType
     */
    typeMismatch(optionName, badType, expectedType) {
        const error = new TdError(`${this.base} Mismatch types: ${optionName} has a type of ${badType} instead of the required ${expectedType}`);
        error.code = 3;
        throw error;
    }
    /**
     * Throws an error when an option value is  outside of the expected range.
     * For example restrictions.daysOfWeekDisabled excepts a value between 0 and 6.
     * @param optionName
     * @param lower
     * @param upper
     */
    numbersOutOfRange(optionName, lower, upper) {
        const error = new TdError(`${this.base} ${optionName} expected an array of number between ${lower} and ${upper}.`);
        error.code = 4;
        throw error;
    }
    /**
     * Throws an error when a value for a date options couldn't be parsed. Either
     * the option was an invalid string or an invalid Date object.
     * @param optionName
     * @param date
     * @param soft If true, logs a warning instead of an error.
     */
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    failedToParseDate(optionName, date, soft = false) {
        const error = new TdError(`${this.base} Could not correctly parse "${date}" to a date for ${optionName}.`);
        error.code = 5;
        if (!soft)
            throw error;
        console.warn(error);
    }
    /**
     * Throws when an element to attach to was not provided in the constructor.
     */
    mustProvideElement() {
        const error = new TdError(`${this.base} No element was provided.`);
        error.code = 6;
        throw error;
    }
    /**
     * Throws if providing an array for the events to subscribe method doesn't have
     * the same number of callbacks. E.g., subscribe([1,2], [1])
     */
    subscribeMismatch() {
        const error = new TdError(`${this.base} The subscribed events does not match the number of callbacks`);
        error.code = 7;
        throw error;
    }
    /**
     * Throws if the configuration has conflicting rules e.g. minDate is after maxDate
     */
    conflictingConfiguration(message) {
        const error = new TdError(`${this.base} A configuration value conflicts with another rule. ${message}`);
        error.code = 8;
        throw error;
    }
    /**
     * customDateFormat errors
     */
    customDateFormatError(message) {
        const error = new TdError(`${this.base} Custom Date Format: ${message}`);
        error.code = 9;
        throw error;
    }
    /**
     * Logs a warning if a date option value is provided as a string, instead of
     * a date/datetime object.
     */
    dateString() {
        console.warn(`${this.base} Using a string for date options is not recommended unless you specify an ISO string or use the customDateFormat plugin.`);
    }
    deprecatedWarning(message, remediation) {
        console.warn(`${this.base} Warning ${message} is deprecated and will be removed in a future version. ${remediation}`);
    }
    throwError(message) {
        const error = new TdError(`${this.base} ${message}`);
        error.code = 9;
        throw error;
    }
}

// this is not the way I want this to stay but nested classes seemed to blown up once its compiled.
const NAME = 'tempus-dominus', dataKey = 'td';
/**
 * Events
 */
class Events {
    constructor() {
        this.key = `.${dataKey}`;
        /**
         * Change event. Fired when the user selects a date.
         * See also EventTypes.ChangeEvent
         */
        this.change = `change${this.key}`;
        /**
         * Emit when the view changes for example from month view to the year view.
         * See also EventTypes.ViewUpdateEvent
         */
        this.update = `update${this.key}`;
        /**
         * Emits when a selected date or value from the input field fails to meet the provided validation rules.
         * See also EventTypes.FailEvent
         */
        this.error = `error${this.key}`;
        /**
         * Show event
         * @event Events#show
         */
        this.show = `show${this.key}`;
        /**
         * Hide event
         * @event Events#hide
         */
        this.hide = `hide${this.key}`;
        // blur and focus are used in the jQuery provider but are otherwise unused.
        // keyup/down will be used later for keybinding options
        this.blur = `blur${this.key}`;
        this.focus = `focus${this.key}`;
        this.keyup = `keyup${this.key}`;
        this.keydown = `keydown${this.key}`;
    }
}
class Css {
    constructor() {
        /**
         * The outer element for the widget.
         */
        this.widget = `${NAME}-widget`;
        /**
         * Hold the previous, next and switcher divs
         */
        this.calendarHeader = 'calendar-header';
        /**
         * The element for the action to change the calendar view. E.g. month -> year.
         */
        this.switch = 'picker-switch';
        /**
         * The elements for all the toolbar options
         */
        this.toolbar = 'toolbar';
        /**
         * Disables the hover and rounding affect.
         */
        this.noHighlight = 'no-highlight';
        /**
         * Applied to the widget element when the side by side option is in use.
         */
        this.sideBySide = 'timepicker-sbs';
        /**
         * The element for the action to change the calendar view, e.g. August -> July
         */
        this.previous = 'previous';
        /**
         * The element for the action to change the calendar view, e.g. August -> September
         */
        this.next = 'next';
        /**
         * Applied to any action that would violate any restriction options. ALso applied
         * to an input field if the disabled function is called.
         */
        this.disabled = 'disabled';
        /**
         * Applied to any date that is less than requested view,
         * e.g. the last day of the previous month.
         */
        this.old = 'old';
        /**
         * Applied to any date that is greater than of requested view,
         * e.g. the last day of the previous month.
         */
        this.new = 'new';
        /**
         * Applied to any date that is currently selected.
         */
        this.active = 'active';
        //#region date element
        /**
         * The outer element for the calendar view.
         */
        this.dateContainer = 'date-container';
        /**
         * The outer element for the decades view.
         */
        this.decadesContainer = `${this.dateContainer}-decades`;
        /**
         * Applied to elements within the decade container, e.g. 2020, 2030
         */
        this.decade = 'decade';
        /**
         * The outer element for the years view.
         */
        this.yearsContainer = `${this.dateContainer}-years`;
        /**
         * Applied to elements within the years container, e.g. 2021, 2021
         */
        this.year = 'year';
        /**
         * The outer element for the month view.
         */
        this.monthsContainer = `${this.dateContainer}-months`;
        /**
         * Applied to elements within the month container, e.g. January, February
         */
        this.month = 'month';
        /**
         * The outer element for the calendar view.
         */
        this.daysContainer = `${this.dateContainer}-days`;
        /**
         * Applied to elements within the day container, e.g. 1, 2..31
         */
        this.day = 'day';
        /**
         * If display.calendarWeeks is enabled, a column displaying the week of year
         * is shown. This class is applied to each cell in that column.
         */
        this.calendarWeeks = 'cw';
        /**
         * Applied to the first row of the calendar view, e.g. Sunday, Monday
         */
        this.dayOfTheWeek = 'dow';
        /**
         * Applied to the current date on the calendar view.
         */
        this.today = 'today';
        /**
         * Applied to the locale's weekend dates on the calendar view, e.g. Sunday, Saturday
         */
        this.weekend = 'weekend';
        this.rangeIn = 'range-in';
        this.rangeStart = 'range-start';
        this.rangeEnd = 'range-end';
        //#endregion
        //#region time element
        /**
         * The outer element for all time related elements.
         */
        this.timeContainer = 'time-container';
        /**
         * Applied the separator columns between time elements, e.g. hour *:* minute *:* second
         */
        this.separator = 'separator';
        /**
         * The outer element for the clock view.
         */
        this.clockContainer = `${this.timeContainer}-clock`;
        /**
         * The outer element for the hours selection view.
         */
        this.hourContainer = `${this.timeContainer}-hour`;
        /**
         * The outer element for the minutes selection view.
         */
        this.minuteContainer = `${this.timeContainer}-minute`;
        /**
         * The outer element for the seconds selection view.
         */
        this.secondContainer = `${this.timeContainer}-second`;
        /**
         * Applied to each element in the hours selection view.
         */
        this.hour = 'hour';
        /**
         * Applied to each element in the minutes selection view.
         */
        this.minute = 'minute';
        /**
         * Applied to each element in the seconds selection view.
         */
        this.second = 'second';
        /**
         * Applied AM/PM toggle button.
         */
        this.toggleMeridiem = 'toggleMeridiem';
        //#endregion
        //#region collapse
        /**
         * Applied the element of the current view mode, e.g. calendar or clock.
         */
        this.show = 'show';
        /**
         * Applied to the currently showing view mode during a transition
         * between calendar and clock views
         */
        this.collapsing = 'td-collapsing';
        /**
         * Applied to the currently hidden view mode.
         */
        this.collapse = 'td-collapse';
        //#endregion
        /**
         * Applied to the widget when the option display.inline is enabled.
         */
        this.inline = 'inline';
        /**
         * Applied to the widget when the option display.theme is light.
         */
        this.lightTheme = 'light';
        /**
         * Applied to the widget when the option display.theme is dark.
         */
        this.darkTheme = 'dark';
        /**
         * Used for detecting if the system color preference is dark mode
         */
        this.isDarkPreferredQuery = '(prefers-color-scheme: dark)';
    }
}
class Namespace {
}
Namespace.NAME = NAME;
// noinspection JSUnusedGlobalSymbols
Namespace.dataKey = dataKey;
Namespace.events = new Events();
Namespace.css = new Css();
Namespace.errorMessages = new ErrorMessages();

const DefaultFormatLocalization = {
    dateFormats: {
        LTS: 'h:mm:ss T',
        LT: 'h:mm T',
        L: 'MM/dd/yyyy',
        LL: 'MMMM d, yyyy',
        LLL: 'MMMM d, yyyy h:mm T',
        LLLL: 'dddd, MMMM d, yyyy h:mm T',
    },
    format: 'L LT',
    locale: 'default',
    hourCycle: undefined,
    ordinal: (n) => {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return `[${n}${s[(v - 20) % 10] || s[v] || s[0]}]`;
    },
};
var DefaultFormatLocalization$1 = { ...DefaultFormatLocalization };

var Unit;
(function (Unit) {
    Unit["seconds"] = "seconds";
    Unit["minutes"] = "minutes";
    Unit["hours"] = "hours";
    Unit["date"] = "date";
    Unit["month"] = "month";
    Unit["year"] = "year";
})(Unit || (Unit = {}));
const twoDigitTemplate = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};
/**
 * Returns an Intl format object based on the provided object
 * @param unit
 */
const getFormatByUnit = (unit) => {
    switch (unit) {
        case 'date':
            return { dateStyle: 'short' };
        case 'month':
            return {
                month: 'numeric',
                year: 'numeric',
            };
        case 'year':
            return { year: 'numeric' };
    }
};
/**
 * Attempts to guess the hour cycle of the given local
 * @param locale
 */
const guessHourCycle = (locale) => {
    if (!locale)
        return 'h12';
    // noinspection SpellCheckingInspection
    const template = {
        hour: '2-digit',
        minute: '2-digit',
        numberingSystem: 'latn',
    };
    const dt = new DateTime().setLocalization({ locale });
    dt.hours = 0;
    const start = dt.parts(undefined, template).hour;
    //midnight is 12 so en-US style 12 AM
    if (start === '12')
        return 'h12';
    //midnight is 24 is from 00-24
    if (start === '24')
        return 'h24';
    dt.hours = 23;
    const end = dt.parts(undefined, template).hour;
    //if midnight is 00 and hour 23 is 11 then
    if (start === '00' && end === '11')
        return 'h11';
    if (start === '00' && end === '23')
        return 'h23';
    console.warn(`couldn't determine hour cycle for ${locale}. start: ${start}. end: ${end}`);
    return undefined;
};
/**
 * For the most part this object behaves exactly the same way
 * as the native Date object with a little extra spice.
 */
class DateTime extends Date {
    constructor() {
        super(...arguments);
        this.localization = DefaultFormatLocalization$1;
        this.nonLeapLadder = [
            0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334,
        ];
        this.leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
        //#region CDF stuff
        this.dateTimeRegex = 
        //is regex cannot be simplified beyond what it already is
        /(\[[^[\]]*])|y{1,4}|M{1,4}|d{1,4}|H{1,2}|h{1,2}|t|T|m{1,2}|s{1,2}|f{3}/g; //NOSONAR
        this.formattingTokens = /(\[[^[\]]*])|([-_:/.,()\s]+)|(T|t|yyyy|yy?|MM?M?M?|Do|dd?|hh?|HH?|mm?|ss?)/g; //NOSONAR is regex cannot be simplified beyond what it already is
        this.match2 = /\d\d/; // 00 - 99
        this.match3 = /\d{3}/; // 000 - 999
        this.match4 = /\d{4}/; // 0000 - 9999
        this.match1to2 = /\d\d?/; // 0 - 99
        this.matchSigned = /[+-]?\d+/; // -inf - inf
        this.matchOffset = /[+-]\d\d:?(\d\d)?|Z/; // +00:00 -00:00 +0000 or -0000 +00 or Z
        this.matchWord = /[^\d_:/,\-()\s]+/; // Word
        this.zoneExpressions = [
            this.matchOffset,
            (obj, input) => {
                obj.offset = this.offsetFromString(input);
            },
        ];
        this.expressions = {
            t: [
                this.matchWord,
                (ojb, input) => {
                    ojb.afternoon = this.meridiemMatch(input);
                },
            ],
            T: [
                this.matchWord,
                (ojb, input) => {
                    ojb.afternoon = this.meridiemMatch(input);
                },
            ],
            fff: [
                this.match3,
                (ojb, input) => {
                    ojb.milliseconds = +input;
                },
            ],
            s: [this.match1to2, this.addInput('seconds')],
            ss: [this.match1to2, this.addInput('seconds')],
            m: [this.match1to2, this.addInput('minutes')],
            mm: [this.match1to2, this.addInput('minutes')],
            H: [this.match1to2, this.addInput('hours')],
            h: [this.match1to2, this.addInput('hours')],
            HH: [this.match1to2, this.addInput('hours')],
            hh: [this.match1to2, this.addInput('hours')],
            d: [this.match1to2, this.addInput('day')],
            dd: [this.match2, this.addInput('day')],
            Do: [
                this.matchWord,
                (ojb, input) => {
                    [ojb.day] = input.match(/\d+/);
                    if (!this.localization.ordinal)
                        return;
                    for (let i = 1; i <= 31; i += 1) {
                        if (this.localization.ordinal(i).replace(/[[\]]/g, '') === input) {
                            ojb.day = i;
                        }
                    }
                },
            ],
            M: [this.match1to2, this.addInput('month')],
            MM: [this.match2, this.addInput('month')],
            MMM: [
                this.matchWord,
                (obj, input) => {
                    const months = this.getAllMonths();
                    const monthsShort = this.getAllMonths('short');
                    const matchIndex = (monthsShort || months.map((_) => _.slice(0, 3))).indexOf(input) + 1;
                    if (matchIndex < 1) {
                        throw new Error();
                    }
                    obj.month = matchIndex % 12 || matchIndex;
                },
            ],
            MMMM: [
                this.matchWord,
                (obj, input) => {
                    const months = this.getAllMonths();
                    const matchIndex = months.indexOf(input) + 1;
                    if (matchIndex < 1) {
                        throw new Error();
                    }
                    obj.month = matchIndex % 12 || matchIndex;
                },
            ],
            y: [this.matchSigned, this.addInput('year')],
            yy: [
                this.match2,
                (obj, input) => {
                    obj.year = this.parseTwoDigitYear(input);
                },
            ],
            yyyy: [this.match4, this.addInput('year')],
            // z: this.zoneExpressions,
            // zz: this.zoneExpressions,
            // zzz: this.zoneExpressions
        };
        //#endregion CDF stuff
    }
    /**
     * Chainable way to set the {@link locale}
     * @param value
     * @deprecated use setLocalization with a FormatLocalization object instead
     */
    setLocale(value) {
        if (!this.localization) {
            this.localization = DefaultFormatLocalization$1;
            this.localization.locale = value;
        }
        return this;
    }
    /**
     * Chainable way to set the {@link localization}
     * @param value
     */
    setLocalization(value) {
        this.localization = value;
        return this;
    }
    /**
     * Converts a plain JS date object to a DateTime object.
     * Doing this allows access to format, etc.
     * @param  date
     * @param locale this parameter is deprecated. Use formatLocalization instead.
     * @param formatLocalization
     */
    static convert(date, locale = 'default', formatLocalization = undefined) {
        if (!date)
            throw new Error(`A date is required`);
        if (!formatLocalization) {
            formatLocalization = DefaultFormatLocalization$1;
            formatLocalization.locale = locale;
        }
        return new DateTime(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()).setLocalization(formatLocalization);
    }
    /**
     * Native date manipulations are not pure functions. This function creates a duplicate of the DateTime object.
     */
    get clone() {
        return new DateTime(this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.getMilliseconds()).setLocalization(this.localization);
    }
    static isValid(d) {
        if (d === undefined || JSON.stringify(d) === 'null')
            return false;
        if (d.constructor.name === DateTime.name)
            return true;
        return false;
    }
    /**
     * Sets the current date to the start of the {@link unit} provided
     * Example: Consider a date of "April 30, 2021, 11:45:32.984 AM" => new DateTime(2021, 3, 30, 11, 45, 32, 984).startOf('month')
     * would return April 1, 2021, 12:00:00.000 AM (midnight)
     * @param unit
     * @param startOfTheWeek Allows for the changing the start of the week.
     */
    startOf(unit, startOfTheWeek = 0) {
        if (this[unit] === undefined)
            throw new Error(`Unit '${unit}' is not valid`);
        switch (unit) {
            case 'seconds':
                this.setMilliseconds(0);
                break;
            case 'minutes':
                this.setSeconds(0, 0);
                break;
            case 'hours':
                this.setMinutes(0, 0, 0);
                break;
            case 'date':
                this.setHours(0, 0, 0, 0);
                break;
            case 'weekDay': {
                this.startOf(Unit.date);
                if (this.weekDay === startOfTheWeek)
                    break;
                const goBack = (this.weekDay - startOfTheWeek + 7) % 7;
                this.manipulate(goBack * -1, Unit.date);
                break;
            }
            case 'month':
                this.startOf(Unit.date);
                this.setDate(1);
                break;
            case 'year':
                this.startOf(Unit.date);
                this.setMonth(0, 1);
                break;
        }
        return this;
    }
    /**
     * Sets the current date to the end of the {@link unit} provided
     * Example: Consider a date of "April 30, 2021, 11:45:32.984 AM" => new DateTime(2021, 3, 30, 11, 45, 32, 984).endOf('month')
     * would return April 30, 2021, 11:59:59.999 PM
     * @param unit
     * @param startOfTheWeek
     */
    endOf(unit, startOfTheWeek = 0) {
        if (this[unit] === undefined)
            throw new Error(`Unit '${unit}' is not valid`);
        switch (unit) {
            case 'seconds':
                this.setMilliseconds(999);
                break;
            case 'minutes':
                this.setSeconds(59, 999);
                break;
            case 'hours':
                this.setMinutes(59, 59, 999);
                break;
            case 'date':
                this.setHours(23, 59, 59, 999);
                break;
            case 'weekDay': {
                this.endOf(Unit.date);
                const endOfWeek = 6 + startOfTheWeek;
                if (this.weekDay === endOfWeek)
                    break;
                this.manipulate(endOfWeek - this.weekDay, Unit.date);
                break;
            }
            case 'month':
                this.endOf(Unit.date);
                this.manipulate(1, Unit.month);
                this.setDate(0);
                break;
            case 'year':
                this.endOf(Unit.date);
                this.setMonth(11, 31);
                break;
        }
        return this;
    }
    /**
     * Change a {@link unit} value. Value can be positive or negative
     * Example: Consider a date of "April 30, 2021, 11:45:32.984 AM" => new DateTime(2021, 3, 30, 11, 45, 32, 984).manipulate(1, 'month')
     * would return May 30, 2021, 11:45:32.984 AM
     * @param value A positive or negative number
     * @param unit
     */
    manipulate(value, unit) {
        if (this[unit] === undefined)
            throw new Error(`Unit '${unit}' is not valid`);
        this[unit] += value;
        return this;
    }
    /**
     * Return true if {@link compare} is before this date
     * @param compare The Date/DateTime to compare
     * @param unit If provided, uses {@link startOf} for
     * comparison.
     */
    isBefore(compare, unit) {
        // If the comparisons is undefined, return false
        if (!DateTime.isValid(compare))
            return false;
        if (!unit)
            return this.valueOf() < compare.valueOf();
        if (this[unit] === undefined)
            throw new Error(`Unit '${unit}' is not valid`);
        return (this.clone.startOf(unit).valueOf() < compare.clone.startOf(unit).valueOf());
    }
    /**
     * Return true if {@link compare} is after this date
     * @param compare The Date/DateTime to compare
     * @param unit If provided, uses {@link startOf} for
     * comparison.
     */
    isAfter(compare, unit) {
        // If the comparisons is undefined, return false
        if (!DateTime.isValid(compare))
            return false;
        if (!unit)
            return this.valueOf() > compare.valueOf();
        if (this[unit] === undefined)
            throw new Error(`Unit '${unit}' is not valid`);
        return (this.clone.startOf(unit).valueOf() > compare.clone.startOf(unit).valueOf());
    }
    /**
     * Return true if {@link compare} is same this date
     * @param compare The Date/DateTime to compare
     * @param unit If provided, uses {@link startOf} for
     * comparison.
     */
    isSame(compare, unit) {
        // If the comparisons is undefined, return false
        if (!DateTime.isValid(compare))
            return false;
        if (!unit)
            return this.valueOf() === compare.valueOf();
        if (this[unit] === undefined)
            throw new Error(`Unit '${unit}' is not valid`);
        compare = DateTime.convert(compare);
        return (this.clone.startOf(unit).valueOf() === compare.startOf(unit).valueOf());
    }
    /**
     * Check if this is between two other DateTimes, optionally looking at unit scale. The match is exclusive.
     * @param left
     * @param right
     * @param unit.
     * @param inclusivity. A [ indicates inclusion of a value. A ( indicates exclusion.
     * If the inclusivity parameter is used, both indicators must be passed.
     */
    isBetween(left, right, unit, inclusivity = '()') {
        // If one of the comparisons is undefined, return false
        if (!DateTime.isValid(left) || !DateTime.isValid(right))
            return false;
        // If a unit is provided and is not a valid property of the DateTime object, throw an error
        if (unit && this[unit] === undefined) {
            throw new Error(`Unit '${unit}' is not valid`);
        }
        const leftInclusivity = inclusivity[0] === '(';
        const rightInclusivity = inclusivity[1] === ')';
        const isLeftInRange = leftInclusivity
            ? this.isAfter(left, unit)
            : !this.isBefore(left, unit);
        const isRightInRange = rightInclusivity
            ? this.isBefore(right, unit)
            : !this.isAfter(right, unit);
        return isLeftInRange && isRightInRange;
    }
    /**
     * Returns flattened object of the date. Does not include literals
     * @param locale
     * @param template
     */
    parts(locale = this.localization.locale, template = { dateStyle: 'full', timeStyle: 'long' }) {
        const parts = {};
        new Intl.DateTimeFormat(locale, template)
            .formatToParts(this)
            .filter((x) => x.type !== 'literal')
            .forEach((x) => (parts[x.type] = x.value));
        return parts;
    }
    /**
     * Shortcut to Date.getSeconds()
     */
    get seconds() {
        return this.getSeconds();
    }
    /**
     * Shortcut to Date.setSeconds()
     */
    set seconds(value) {
        this.setSeconds(value);
    }
    /**
     * Returns two digit hours
     */
    get secondsFormatted() {
        return this.parts(undefined, twoDigitTemplate).second;
    }
    /**
     * Shortcut to Date.getMinutes()
     */
    get minutes() {
        return this.getMinutes();
    }
    /**
     * Shortcut to Date.setMinutes()
     */
    set minutes(value) {
        this.setMinutes(value);
    }
    /**
     * Returns two digit minutes
     */
    get minutesFormatted() {
        return this.parts(undefined, twoDigitTemplate).minute;
    }
    /**
     * Shortcut to Date.getHours()
     */
    get hours() {
        return this.getHours();
    }
    /**
     * Shortcut to Date.setHours()
     */
    set hours(value) {
        this.setHours(value);
    }
    /**
     * Returns two digit hour, e.g. 01...10
     * @param hourCycle Providing an hour cycle will change 00 to 24 depending on the given value.
     */
    getHoursFormatted(hourCycle = 'h12') {
        return this.parts(undefined, { ...twoDigitTemplate, hourCycle: hourCycle })
            .hour;
    }
    /**
     * Get the meridiem of the date. E.g. AM or PM.
     * If the {@link locale} provides a "dayPeriod" then this will be returned,
     * otherwise it will return AM or PM.
     * @param locale
     */
    meridiem(locale = this.localization.locale) {
        return new Intl.DateTimeFormat(locale, {
            hour: 'numeric',
            hour12: true,
        })
            .formatToParts(this)
            .find((p) => p.type === 'dayPeriod')?.value;
    }
    /**
     * Shortcut to Date.getDate()
     */
    get date() {
        return this.getDate();
    }
    /**
     * Shortcut to Date.setDate()
     */
    set date(value) {
        this.setDate(value);
    }
    /**
     * Return two digit date
     */
    get dateFormatted() {
        return this.parts(undefined, twoDigitTemplate).day;
    }
    /**
     * Shortcut to Date.getDay()
     */
    get weekDay() {
        return this.getDay();
    }
    /**
     * Shortcut to Date.getMonth()
     */
    get month() {
        return this.getMonth();
    }
    /**
     * Shortcut to Date.setMonth()
     */
    set month(value) {
        const targetMonth = new Date(this.year, value + 1);
        targetMonth.setDate(0);
        const endOfMonth = targetMonth.getDate();
        if (this.date > endOfMonth) {
            this.date = endOfMonth;
        }
        this.setMonth(value);
    }
    /**
     * Return two digit, human expected month. E.g. January = 1, December = 12
     */
    get monthFormatted() {
        return this.parts(undefined, twoDigitTemplate).month;
    }
    /**
     * Shortcut to Date.getFullYear()
     */
    get year() {
        return this.getFullYear();
    }
    /**
     * Shortcut to Date.setFullYear()
     */
    set year(value) {
        this.setFullYear(value);
    }
    // borrowed a bunch of stuff from Luxon
    /**
     * Gets the week of the year
     */
    get week() {
        const ordinal = this.computeOrdinal(), weekday = this.getUTCDay();
        let weekNumber = Math.floor((ordinal - weekday + 10) / 7);
        if (weekNumber < 1) {
            weekNumber = this.weeksInWeekYear();
        }
        else if (weekNumber > this.weeksInWeekYear()) {
            weekNumber = 1;
        }
        return weekNumber;
    }
    /**
     * Returns the number of weeks in the year
     */
    weeksInWeekYear() {
        const p1 = (this.year +
            Math.floor(this.year / 4) -
            Math.floor(this.year / 100) +
            Math.floor(this.year / 400)) %
            7, last = this.year - 1, p2 = (last +
            Math.floor(last / 4) -
            Math.floor(last / 100) +
            Math.floor(last / 400)) %
            7;
        return p1 === 4 || p2 === 3 ? 53 : 52;
    }
    /**
     * Returns true or false depending on if the year is a leap year or not.
     */
    get isLeapYear() {
        return (this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0));
    }
    computeOrdinal() {
        return (this.date +
            (this.isLeapYear ? this.leapLadder : this.nonLeapLadder)[this.month]);
    }
    /**
     * Returns a list of month values based on the current locale
     */
    getAllMonths(format = 'long') {
        const applyFormat = new Intl.DateTimeFormat(this.localization.locale, {
            month: format,
        }).format;
        return [...Array(12).keys()].map((m) => applyFormat(new Date(2021, m)));
    }
    /**
     * Replaces an expanded token set (e.g. LT/LTS)
     */
    replaceTokens(formatStr, formats) {
        /***
         * _ => match
         * a => first capture group. Anything between [ and ]
         * b => second capture group
         */
        return formatStr.replace(/(\[[^[\]]*])|(LTS?|l{1,4}|L{1,4})/g, (_, a, b) => {
            const B = b && b.toUpperCase();
            return a || formats[B] || DefaultFormatLocalization$1.dateFormats[B];
        });
    }
    parseTwoDigitYear(input) {
        input = +input;
        return input + (input > 68 ? 1900 : 2000);
    }
    offsetFromString(string) {
        if (!string)
            return 0;
        if (string === 'Z')
            return 0;
        const [first, second, third] = string.match(/([+-]|\d\d)/g);
        const minutes = +(second * 60) + (+third || 0);
        const signed = first === '+' ? -minutes : minutes;
        return minutes === 0 ? 0 : signed; // eslint-disable-line no-nested-ternary
    }
    /**
     * z = -4, zz = -04, zzz = -0400
     * @param date
     * @param style
     * @private
     */
    zoneInformation(date, style) {
        let name = date
            .parts(this.localization.locale, { timeZoneName: 'longOffset' })
            .timeZoneName.replace('GMT', '')
            .replace(':', '');
        const negative = name.includes('-');
        name = name.replace('-', '');
        if (style === 'z')
            name = name.substring(1, 2);
        else if (style === 'zz')
            name = name.substring(0, 2);
        return `${negative ? '-' : ''}${name}`;
    }
    addInput(property) {
        return (time, input) => {
            time[property] = +input;
        };
    }
    meridiemMatch(input) {
        const meridiem = new Intl.DateTimeFormat(this.localization.locale, {
            hour: 'numeric',
            hour12: true,
        })
            .formatToParts(new Date(2022, 3, 4, 13))
            .find((p) => p.type === 'dayPeriod')?.value;
        return input.toLowerCase() === meridiem.toLowerCase();
    }
    correctHours(time) {
        const { afternoon } = time;
        if (afternoon !== undefined) {
            const { hours } = time;
            if (afternoon) {
                if (hours < 12) {
                    time.hours += 12;
                }
            }
            else if (hours === 12) {
                time.hours = 0;
            }
            delete time.afternoon;
        }
    }
    makeParser(format) {
        format = this.replaceTokens(format, this.localization.dateFormats);
        const array = format.match(this.formattingTokens);
        const { length } = array;
        for (let i = 0; i < length; i += 1) {
            const token = array[i];
            const parseTo = this.expressions[token];
            const regex = parseTo && parseTo[0];
            const parser = parseTo && parseTo[1];
            if (parser) {
                array[i] = { regex, parser };
            }
            else {
                array[i] = token.replace(/^\[[^[\]]*]$/g, '');
            }
        }
        return (input) => {
            const time = {
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0,
            };
            for (let i = 0, start = 0; i < length; i += 1) {
                const token = array[i];
                if (typeof token === 'string') {
                    start += token.length;
                }
                else {
                    const { regex, parser } = token;
                    const part = input.slice(start);
                    const match = regex.exec(part);
                    const value = match[0];
                    parser.call(this, time, value);
                    input = input.replace(value, '');
                }
            }
            this.correctHours(time);
            return time;
        };
    }
    /**
     * Attempts to create a DateTime from a string.
     * @param input date as string
     * @param localization provides the date template the string is in via the format property
     */
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    static fromString(input, localization) {
        if (!localization?.format) {
            Namespace.errorMessages.customDateFormatError('No format was provided');
        }
        try {
            const dt = new DateTime();
            dt.setLocalization(localization);
            if (['x', 'X'].indexOf(localization.format) > -1)
                return new DateTime((localization.format === 'X' ? 1000 : 1) * +input);
            const parser = dt.makeParser(localization.format);
            const { year, month, day, hours, minutes, seconds, milliseconds, zone } = parser(input);
            const d = day || (!year && !month ? dt.getDate() : 1);
            const y = year || dt.getFullYear();
            let M = 0;
            if (!(year && !month)) {
                M = month > 0 ? month - 1 : dt.getMonth();
            }
            if (zone) {
                return new DateTime(Date.UTC(y, M, d, hours, minutes, seconds, milliseconds + zone.offset * 60 * 1000));
            }
            return new DateTime(y, M, d, hours, minutes, seconds, milliseconds);
        }
        catch (e) {
            Namespace.errorMessages.customDateFormatError(`Unable to parse provided input: ${input}, format: ${localization.format}`);
        }
    }
    /**
     * Returns a string format.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
     * for valid templates and locale objects
     * @param template An optional object. If provided, method will use Intl., otherwise the localizations format properties
     * @param locale Can be a string or an array of strings. Uses browser defaults otherwise.
     */
    format(template, locale = this.localization.locale) {
        if (template && typeof template === 'object')
            return new Intl.DateTimeFormat(locale, template).format(this);
        const formatString = this.replaceTokens(
        //try template first
        template ||
            //otherwise try localization format
            this.localization.format ||
            //otherwise try date + time
            `${DefaultFormatLocalization$1.dateFormats.L}, ${DefaultFormatLocalization$1.dateFormats.LT}`, this.localization.dateFormats);
        const formatter = (template) => new Intl.DateTimeFormat(this.localization.locale, template).format(this);
        if (!this.localization.hourCycle)
            this.localization.hourCycle = guessHourCycle(this.localization.locale);
        //if the format asks for a twenty-four-hour string but the hour cycle is not, then make a base guess
        const HHCycle = this.localization.hourCycle.startsWith('h1')
            ? 'h24'
            : this.localization.hourCycle;
        const hhCycle = this.localization.hourCycle.startsWith('h2')
            ? 'h12'
            : this.localization.hourCycle;
        const matches = {
            yy: formatter({ year: '2-digit' }),
            yyyy: this.year,
            M: formatter({ month: 'numeric' }),
            MM: this.monthFormatted,
            MMM: this.getAllMonths('short')[this.getMonth()],
            MMMM: this.getAllMonths()[this.getMonth()],
            d: this.date,
            dd: this.dateFormatted,
            ddd: formatter({ weekday: 'short' }),
            dddd: formatter({ weekday: 'long' }),
            H: this.getHours(),
            HH: this.getHoursFormatted(HHCycle),
            h: this.hours > 12 ? this.hours - 12 : this.hours,
            hh: this.getHoursFormatted(hhCycle),
            t: this.meridiem(),
            T: this.meridiem().toUpperCase(),
            m: this.minutes,
            mm: this.minutesFormatted,
            s: this.seconds,
            ss: this.secondsFormatted,
            fff: this.getMilliseconds(),
            // z: this.zoneInformation(dateTime, 'z'), //-4
            // zz: this.zoneInformation(dateTime, 'zz'), //-04
            // zzz: this.zoneInformation(dateTime, 'zzz') //-0400
        };
        return formatString
            .replace(this.dateTimeRegex, (match, $1) => {
            return $1 || matches[match];
        })
            .replace(/\[/g, '')
            .replace(/]/g, '');
    }
}

class ServiceLocator {
    constructor() {
        this.cache = new Map();
    }
    locate(identifier) {
        const service = this.cache.get(identifier);
        if (service)
            return service;
        const value = new identifier();
        this.cache.set(identifier, value);
        return value;
    }
}
const setupServiceLocator = () => {
    serviceLocator = new ServiceLocator();
};
let serviceLocator;

const CalendarModes = [
    {
        name: 'calendar',
        className: Namespace.css.daysContainer,
        unit: Unit.month,
        step: 1,
    },
    {
        name: 'months',
        className: Namespace.css.monthsContainer,
        unit: Unit.year,
        step: 1,
    },
    {
        name: 'years',
        className: Namespace.css.yearsContainer,
        unit: Unit.year,
        step: 10,
    },
    {
        name: 'decades',
        className: Namespace.css.decadesContainer,
        unit: Unit.year,
        step: 100,
    },
];

class OptionsStore {
    constructor() {
        this._currentCalendarViewMode = 0;
        this._viewDate = new DateTime();
        this.minimumCalendarViewMode = 0;
        this.currentView = 'calendar';
    }
    get currentCalendarViewMode() {
        return this._currentCalendarViewMode;
    }
    set currentCalendarViewMode(value) {
        this._currentCalendarViewMode = value;
        this.currentView = CalendarModes[value].name;
    }
    get viewDate() {
        return this._viewDate;
    }
    set viewDate(v) {
        this._viewDate = v;
        if (this.options)
            this.options.viewDate = v;
    }
    /**
     * When switching back to the calendar from the clock,
     * this sets currentView to the correct calendar view.
     */
    refreshCurrentView() {
        this.currentView = CalendarModes[this.currentCalendarViewMode].name;
    }
    get isTwelveHour() {
        return ['h12', 'h11'].includes(this.options.localization.hourCycle);
    }
}

/**
 * Main class for date validation rules based on the options provided.
 */
class Validation {
    constructor() {
        this.optionsStore = serviceLocator.locate(OptionsStore);
    }
    /**
     * Checks to see if the target date is valid based on the rules provided in the options.
     * Granularity can be provided to check portions of the date instead of the whole.
     * @param targetDate
     * @param granularity
     */
    isValid(targetDate, granularity) {
        if (!this._enabledDisabledDatesIsValid(granularity, targetDate))
            return false;
        if (granularity !== Unit.month &&
            granularity !== Unit.year &&
            this.optionsStore.options.restrictions.daysOfWeekDisabled?.length > 0 &&
            this.optionsStore.options.restrictions.daysOfWeekDisabled.indexOf(targetDate.weekDay) !== -1)
            return false;
        if (!this._minMaxIsValid(granularity, targetDate))
            return false;
        if (granularity === Unit.hours ||
            granularity === Unit.minutes ||
            granularity === Unit.seconds) {
            if (!this._enabledDisabledHoursIsValid(targetDate))
                return false;
            if (this.optionsStore.options.restrictions.disabledTimeIntervals?.filter((internal) => targetDate.isBetween(internal.from, internal.to)).length !== 0)
                return false;
        }
        return true;
    }
    _enabledDisabledDatesIsValid(granularity, targetDate) {
        if (granularity !== Unit.date)
            return true;
        if (this.optionsStore.options.restrictions.disabledDates.length > 0 &&
            this._isInDisabledDates(targetDate)) {
            return false;
        }
        // noinspection RedundantIfStatementJS
        if (this.optionsStore.options.restrictions.enabledDates.length > 0 &&
            !this._isInEnabledDates(targetDate)) {
            return false;
        }
        return true;
    }
    /**
     * Checks to see if the disabledDates option is in use and returns true (meaning invalid)
     * if the `testDate` is with in the array. Granularity is by date.
     * @param testDate
     * @private
     */
    _isInDisabledDates(testDate) {
        if (!this.optionsStore.options.restrictions.disabledDates ||
            this.optionsStore.options.restrictions.disabledDates.length === 0)
            return false;
        return !!this.optionsStore.options.restrictions.disabledDates.find((x) => x.isSame(testDate, Unit.date));
    }
    /**
     * Checks to see if the enabledDates option is in use and returns true (meaning valid)
     * if the `testDate` is with in the array. Granularity is by date.
     * @param testDate
     * @private
     */
    _isInEnabledDates(testDate) {
        if (!this.optionsStore.options.restrictions.enabledDates ||
            this.optionsStore.options.restrictions.enabledDates.length === 0)
            return true;
        return !!this.optionsStore.options.restrictions.enabledDates.find((x) => x.isSame(testDate, Unit.date));
    }
    _minMaxIsValid(granularity, targetDate) {
        if (this.optionsStore.options.restrictions.minDate &&
            targetDate.isBefore(this.optionsStore.options.restrictions.minDate, granularity)) {
            return false;
        }
        // noinspection RedundantIfStatementJS
        if (this.optionsStore.options.restrictions.maxDate &&
            targetDate.isAfter(this.optionsStore.options.restrictions.maxDate, granularity)) {
            return false;
        }
        return true;
    }
    _enabledDisabledHoursIsValid(targetDate) {
        if (this.optionsStore.options.restrictions.disabledHours.length > 0 &&
            this._isInDisabledHours(targetDate)) {
            return false;
        }
        // noinspection RedundantIfStatementJS
        if (this.optionsStore.options.restrictions.enabledHours.length > 0 &&
            !this._isInEnabledHours(targetDate)) {
            return false;
        }
        return true;
    }
    /**
     * Checks to see if the disabledHours option is in use and returns true (meaning invalid)
     * if the `testDate` is with in the array. Granularity is by hours.
     * @param testDate
     * @private
     */
    _isInDisabledHours(testDate) {
        if (!this.optionsStore.options.restrictions.disabledHours ||
            this.optionsStore.options.restrictions.disabledHours.length === 0)
            return false;
        const formattedDate = testDate.hours;
        return this.optionsStore.options.restrictions.disabledHours.includes(formattedDate);
    }
    /**
     * Checks to see if the enabledHours option is in use and returns true (meaning valid)
     * if the `testDate` is with in the array. Granularity is by hours.
     * @param testDate
     * @private
     */
    _isInEnabledHours(testDate) {
        if (!this.optionsStore.options.restrictions.enabledHours ||
            this.optionsStore.options.restrictions.enabledHours.length === 0)
            return true;
        const formattedDate = testDate.hours;
        return this.optionsStore.options.restrictions.enabledHours.includes(formattedDate);
    }
    dateRangeIsValid(dates, index, target) {
        // if we're not using the option, then return valid
        if (!this.optionsStore.options.dateRange)
            return true;
        // if we've only selected 0..1 dates, and we're not setting the end date
        // then return valid. We only want to validate the range if both are selected,
        // because the other validation on the target has already occurred.
        if (dates.length !== 2 && index !== 1)
            return true;
        // initialize start date
        const start = dates[0].clone;
        // check if start date is not the same as target date
        if (start.isSame(target, Unit.date))
            return true;
        // add one day to start; start has already been validated
        start.manipulate(1, Unit.date);
        // check each date in the range to make sure it's valid
        while (!start.isSame(target, Unit.date)) {
            const valid = this.isValid(start, Unit.date);
            if (!valid)
                return false;
            start.manipulate(1, Unit.date);
        }
        return true;
    }
}

class EventEmitter {
    constructor() {
        this.subscribers = [];
    }
    subscribe(callback) {
        this.subscribers.push(callback);
        return this.unsubscribe.bind(this, this.subscribers.length - 1);
    }
    unsubscribe(index) {
        this.subscribers.splice(index, 1);
    }
    emit(value) {
        this.subscribers.forEach((callback) => {
            callback(value);
        });
    }
    destroy() {
        this.subscribers = null;
        this.subscribers = [];
    }
}
class EventEmitters {
    constructor() {
        this.triggerEvent = new EventEmitter();
        this.viewUpdate = new EventEmitter();
        this.updateDisplay = new EventEmitter();
        this.action = new EventEmitter(); //eslint-disable-line @typescript-eslint/no-explicit-any
        this.updateViewDate = new EventEmitter();
    }
    destroy() {
        this.triggerEvent.destroy();
        this.viewUpdate.destroy();
        this.updateDisplay.destroy();
        this.action.destroy();
        this.updateViewDate.destroy();
    }
}

const defaultEnLocalization = {
    clear: 'Clear selection',
    close: 'Close the picker',
    dateFormats: DefaultFormatLocalization$1.dateFormats,
    dayViewHeaderFormat: { month: 'long', year: '2-digit' },
    decrementHour: 'Decrement Hour',
    decrementMinute: 'Decrement Minute',
    decrementSecond: 'Decrement Second',
    format: DefaultFormatLocalization$1.format,
    hourCycle: DefaultFormatLocalization$1.hourCycle,
    incrementHour: 'Increment Hour',
    incrementMinute: 'Increment Minute',
    incrementSecond: 'Increment Second',
    locale: DefaultFormatLocalization$1.locale,
    nextCentury: 'Next Century',
    nextDecade: 'Next Decade',
    nextMonth: 'Next Month',
    nextYear: 'Next Year',
    ordinal: DefaultFormatLocalization$1.ordinal,
    pickHour: 'Pick Hour',
    pickMinute: 'Pick Minute',
    pickSecond: 'Pick Second',
    previousCentury: 'Previous Century',
    previousDecade: 'Previous Decade',
    previousMonth: 'Previous Month',
    previousYear: 'Previous Year',
    selectDate: 'Select Date',
    selectDecade: 'Select Decade',
    selectMonth: 'Select Month',
    selectTime: 'Select Time',
    selectYear: 'Select Year',
    startOfTheWeek: 0,
    today: 'Go to today',
    toggleMeridiem: 'Toggle Meridiem',
};
const DefaultOptions = {
    allowInputToggle: false,
    container: undefined,
    dateRange: false,
    debug: false,
    defaultDate: undefined,
    display: {
        icons: {
            type: 'icons',
            time: 'fa-solid fa-clock',
            date: 'fa-solid fa-calendar',
            up: 'fa-solid fa-arrow-up',
            down: 'fa-solid fa-arrow-down',
            previous: 'fa-solid fa-chevron-left',
            next: 'fa-solid fa-chevron-right',
            today: 'fa-solid fa-calendar-check',
            clear: 'fa-solid fa-trash',
            close: 'fa-solid fa-xmark',
        },
        sideBySide: false,
        calendarWeeks: false,
        viewMode: 'calendar',
        toolbarPlacement: 'bottom',
        keepOpen: false,
        buttons: {
            today: false,
            clear: false,
            close: false,
        },
        components: {
            calendar: true,
            date: true,
            month: true,
            year: true,
            decades: true,
            clock: true,
            hours: true,
            minutes: true,
            seconds: false,
            useTwentyfourHour: undefined,
        },
        inline: false,
        theme: 'auto',
        placement: 'bottom',
    },
    keepInvalid: false,
    localization: defaultEnLocalization,
    meta: {},
    multipleDates: false,
    multipleDatesSeparator: '; ',
    promptTimeOnDateChange: false,
    promptTimeOnDateChangeTransitionDelay: 200,
    restrictions: {
        minDate: undefined,
        maxDate: undefined,
        disabledDates: [],
        enabledDates: [],
        daysOfWeekDisabled: [],
        disabledTimeIntervals: [],
        disabledHours: [],
        enabledHours: [],
    },
    stepping: 1,
    useCurrent: true,
    viewDate: new DateTime(),
};
const DefaultEnLocalization = { ...defaultEnLocalization };

/**
 * Attempts to prove `d` is a DateTime or Date or can be converted into one.
 * @param d If a string will attempt creating a date from it.
 * @param localization object containing locale and format settings. Only used with the custom formats
 * @private
 */
function tryConvertToDateTime(d, localization) {
    if (!d)
        return null;
    if (d.constructor.name === DateTime.name)
        return d;
    if (d.constructor.name === Date.name) {
        return DateTime.convert(d);
    }
    if (typeof d === typeof '') {
        const dateTime = DateTime.fromString(d, localization);
        if (JSON.stringify(dateTime) === 'null') {
            return null;
        }
        return dateTime;
    }
    return null;
}
/**
 * Attempts to convert `d` to a DateTime object
 * @param d value to convert
 * @param optionName Provides text to error messages e.g. disabledDates
 * @param localization object containing locale and format settings. Only used with the custom formats
 */
function convertToDateTime(d, optionName, localization) {
    if (typeof d === typeof '' && optionName !== 'input') {
        Namespace.errorMessages.dateString();
    }
    const converted = tryConvertToDateTime(d, localization);
    if (!converted) {
        Namespace.errorMessages.failedToParseDate(optionName, d, optionName === 'input');
    }
    return converted;
}
/**
 * Type checks that `value` is an array of Date or DateTime
 * @param optionName Provides text to error messages e.g. disabledDates
 * @param value Option value
 * @param providedType Used to provide text to error messages
 * @param localization
 */
function typeCheckDateArray(optionName, value, //eslint-disable-line @typescript-eslint/no-explicit-any
providedType, localization = DefaultFormatLocalization$1) {
    if (!Array.isArray(value)) {
        Namespace.errorMessages.typeMismatch(optionName, providedType, 'array of DateTime or Date');
    }
    for (let i = 0; i < value.length; i++) {
        const d = value[i];
        const dateTime = convertToDateTime(d, optionName, localization);
        dateTime.setLocalization(localization);
        value[i] = dateTime;
    }
}
/**
 * Type checks that `value` is an array of numbers
 * @param optionName Provides text to error messages e.g. disabledDates
 * @param value Option value
 * @param providedType Used to provide text to error messages
 */
function typeCheckNumberArray(optionName, value, //eslint-disable-line @typescript-eslint/no-explicit-any
providedType) {
    if (!Array.isArray(value) || value.some((x) => typeof x !== typeof 0)) {
        Namespace.errorMessages.typeMismatch(optionName, providedType, 'array of numbers');
    }
}

function mandatoryDate(key) {
    return ({ value, providedType, localization }) => {
        const dateTime = convertToDateTime(value, key, localization);
        if (dateTime !== undefined) {
            dateTime.setLocalization(localization);
            return dateTime;
        }
    };
}
function optionalDate(key) {
    const mandatory = mandatoryDate(key);
    return (args) => {
        if (args.value === undefined) {
            return args.value;
        }
        return mandatory(args);
    };
}
function numbersInRange(key, lower, upper) {
    return ({ value, providedType }) => {
        if (value === undefined) {
            return [];
        }
        typeCheckNumberArray(key, value, providedType);
        if (value.some((x) => x < lower || x > upper))
            Namespace.errorMessages.numbersOutOfRange(key, lower, upper);
        return value;
    };
}
function validHourRange(key) {
    return numbersInRange(key, 0, 23);
}
function validDateArray(key) {
    return ({ value, providedType, localization }) => {
        if (value === undefined) {
            return [];
        }
        typeCheckDateArray(key, value, providedType, localization);
        return value;
    };
}
function validKeyOption(keyOptions) {
    return ({ value, path }) => {
        if (!keyOptions.includes(value))
            Namespace.errorMessages.unexpectedOptionValue(path.substring(1), value, keyOptions);
        return value;
    };
}
const optionProcessors = Object.freeze({
    defaultDate: mandatoryDate('defaultDate'),
    viewDate: mandatoryDate('viewDate'),
    minDate: optionalDate('restrictions.minDate'),
    maxDate: optionalDate('restrictions.maxDate'),
    disabledHours: validHourRange('restrictions.disabledHours'),
    enabledHours: validHourRange('restrictions.enabledHours'),
    disabledDates: validDateArray('restrictions.disabledDates'),
    enabledDates: validDateArray('restrictions.enabledDates'),
    daysOfWeekDisabled: numbersInRange('restrictions.daysOfWeekDisabled', 0, 6),
    disabledTimeIntervals: ({ key, value, providedType, localization }) => {
        if (value === undefined) {
            return [];
        }
        if (!Array.isArray(value)) {
            Namespace.errorMessages.typeMismatch(key, providedType, 'array of { from: DateTime|Date, to: DateTime|Date }');
        }
        const valueObject = value; //eslint-disable-line @typescript-eslint/no-explicit-any
        for (let i = 0; i < valueObject.length; i++) {
            Object.keys(valueObject[i]).forEach((vk) => {
                const subOptionName = `${key}[${i}].${vk}`;
                const d = valueObject[i][vk];
                const dateTime = convertToDateTime(d, subOptionName, localization);
                dateTime.setLocalization(localization);
                valueObject[i][vk] = dateTime;
            });
        }
        return valueObject;
    },
    toolbarPlacement: validKeyOption(['top', 'bottom', 'default']),
    type: validKeyOption(['icons', 'sprites']),
    viewMode: validKeyOption([
        'clock',
        'calendar',
        'months',
        'years',
        'decades',
    ]),
    theme: validKeyOption(['light', 'dark', 'auto']),
    placement: validKeyOption(['top', 'bottom']),
    meta: ({ value }) => value,
    dayViewHeaderFormat: ({ value }) => value,
    container: ({ value, path }) => {
        if (value &&
            !(value instanceof HTMLElement ||
                value instanceof Element ||
                value?.appendChild)) {
            Namespace.errorMessages.typeMismatch(path.substring(1), typeof value, 'HTMLElement');
        }
        return value;
    },
    useTwentyfourHour: ({ value, path, providedType, defaultType }) => {
        Namespace.errorMessages.deprecatedWarning('useTwentyfourHour', 'Please use "options.localization.hourCycle" instead');
        if (value === undefined || providedType === 'boolean')
            return value;
        Namespace.errorMessages.typeMismatch(path, providedType, defaultType);
    },
    hourCycle: validKeyOption(['h11', 'h12', 'h23', 'h24']),
});
const defaultProcessor = ({ value, defaultType, providedType, path, }) => {
    switch (defaultType) {
        case 'boolean':
            return value === 'true' || value === true;
        case 'number':
            return +value;
        case 'string':
            return value.toString();
        case 'object':
            return {};
        case 'function':
            return value;
        default:
            Namespace.errorMessages.typeMismatch(path, providedType, defaultType);
    }
};
function processKey(args) {
    return (optionProcessors[args.key] || defaultProcessor)(args);
}

class OptionConverter {
    static deepCopy(input) {
        const o = {};
        Object.keys(input).forEach((key) => {
            const inputElement = input[key];
            if (inputElement instanceof DateTime) {
                o[key] = inputElement.clone;
                return;
            }
            else if (inputElement instanceof Date) {
                o[key] = new Date(inputElement.valueOf());
                return;
            }
            o[key] = inputElement;
            if (typeof inputElement !== 'object' ||
                inputElement instanceof HTMLElement ||
                inputElement instanceof Element)
                return;
            if (!Array.isArray(inputElement)) {
                o[key] = OptionConverter.deepCopy(inputElement);
            }
        });
        return o;
    }
    /**
     * Finds value out of an object based on a string, period delimited, path
     * @param paths
     * @param obj
     */
    static objectPath(paths, obj) {
        if (paths.charAt(0) === '.')
            paths = paths.slice(1);
        if (!paths)
            return obj;
        return paths
            .split('.')
            .reduce((value, key) => OptionConverter.isValue(value) || OptionConverter.isValue(value[key])
            ? value[key]
            : undefined, obj);
    }
    /**
     * The spread operator caused sub keys to be missing after merging.
     * This is to fix that issue by using spread on the child objects first.
     * Also handles complex options like disabledDates
     * @param provided An option from new providedOptions
     * @param copyTo Destination object. This was added to prevent reference copies
     * @param localization
     * @param path
     */
    static spread(provided, copyTo, localization, path = '') {
        const defaultOptions = OptionConverter.objectPath(path, DefaultOptions);
        const unsupportedOptions = Object.keys(provided).filter((x) => !Object.keys(defaultOptions).includes(x));
        if (unsupportedOptions.length > 0) {
            const flattenedOptions = OptionConverter.getFlattenDefaultOptions();
            const errors = unsupportedOptions.map((x) => {
                let error = `"${path}.${x}" in not a known option.`;
                const didYouMean = flattenedOptions.find((y) => y.includes(x));
                if (didYouMean)
                    error += ` Did you mean "${didYouMean}"?`;
                return error;
            });
            Namespace.errorMessages.unexpectedOptions(errors);
        }
        Object.keys(provided)
            .filter((key) => key !== '__proto__' && key !== 'constructor')
            .forEach((key) => {
            path += `.${key}`;
            if (path.charAt(0) === '.')
                path = path.slice(1);
            const defaultOptionValue = defaultOptions[key];
            const providedType = typeof provided[key];
            const defaultType = typeof defaultOptionValue;
            const value = provided[key];
            if (value === undefined || value === null) {
                copyTo[key] = value;
                path = path.substring(0, path.lastIndexOf(`.${key}`));
                return;
            }
            if (typeof defaultOptionValue === 'object' &&
                !Array.isArray(provided[key]) &&
                !(defaultOptionValue instanceof Date ||
                    OptionConverter.ignoreProperties.includes(key))) {
                OptionConverter.spread(provided[key], copyTo[key], localization, path);
            }
            else {
                copyTo[key] = OptionConverter.processKey(key, value, providedType, defaultType, path, localization);
            }
            path = path.substring(0, path.lastIndexOf(`.${key}`));
        });
    }
    static processKey(key, value, //eslint-disable-line @typescript-eslint/no-explicit-any
    providedType, defaultType, path, localization) {
        return processKey({
            key,
            value,
            providedType,
            defaultType,
            path,
            localization,
        });
    }
    static _mergeOptions(providedOptions, mergeTo) {
        const newConfig = OptionConverter.deepCopy(mergeTo);
        //see if the options specify a locale
        const localization = mergeTo.localization?.locale !== 'default'
            ? mergeTo.localization
            : providedOptions?.localization || DefaultOptions.localization;
        OptionConverter.spread(providedOptions, newConfig, localization, '');
        return newConfig;
    }
    static _dataToOptions(element, options) {
        const eData = JSON.parse(JSON.stringify(element.dataset));
        if (eData?.tdTargetInput)
            delete eData.tdTargetInput;
        if (eData?.tdTargetToggle)
            delete eData.tdTargetToggle;
        if (!eData ||
            Object.keys(eData).length === 0 ||
            eData.constructor !== DOMStringMap)
            return options;
        const dataOptions = {};
        // because dataset returns camelCase including the 'td' key the option
        // key won't align
        const objectToNormalized = (object) => {
            const lowered = {};
            Object.keys(object).forEach((x) => {
                lowered[x.toLowerCase()] = x;
            });
            return lowered;
        };
        const normalizeObject = this.normalizeObject(objectToNormalized);
        const optionsLower = objectToNormalized(options);
        Object.keys(eData)
            .filter((x) => x.startsWith(Namespace.dataKey))
            .map((x) => x.substring(2))
            .forEach((key) => {
            let keyOption = optionsLower[key.toLowerCase()];
            // dataset merges dashes to camelCase... yay
            // i.e. key = display_components_seconds
            if (key.includes('_')) {
                // [display, components, seconds]
                const split = key.split('_');
                // display
                keyOption = optionsLower[split[0].toLowerCase()];
                if (keyOption !== undefined &&
                    options[keyOption].constructor === Object) {
                    dataOptions[keyOption] = normalizeObject(split, 1, options[keyOption], eData[`td${key}`]);
                }
            }
            // or key = multipleDate
            else if (keyOption !== undefined) {
                dataOptions[keyOption] = eData[`td${key}`];
            }
        });
        return this._mergeOptions(dataOptions, options);
    }
    //todo clean this up
    static normalizeObject(objectToNormalized) {
        const normalizeObject = (split, index, optionSubgroup, value) => {
            // first round = display { ... }
            const normalizedOptions = objectToNormalized(optionSubgroup);
            const keyOption = normalizedOptions[split[index].toLowerCase()];
            const internalObject = {};
            if (keyOption === undefined)
                return internalObject;
            // if this is another object, continue down the rabbit hole
            if (optionSubgroup[keyOption].constructor === Object) {
                index++;
                internalObject[keyOption] = normalizeObject(split, index, optionSubgroup[keyOption], value);
            }
            else {
                internalObject[keyOption] = value;
            }
            return internalObject;
        };
        return normalizeObject;
    }
    /**
     * Attempts to prove `d` is a DateTime or Date or can be converted into one.
     * @param d If a string will attempt creating a date from it.
     * @param localization object containing locale and format settings. Only used with the custom formats
     * @private
     */
    static _dateTypeCheck(d, //eslint-disable-line @typescript-eslint/no-explicit-any
    localization) {
        return tryConvertToDateTime(d, localization);
    }
    /**
     * Type checks that `value` is an array of Date or DateTime
     * @param optionName Provides text to error messages e.g. disabledDates
     * @param value Option value
     * @param providedType Used to provide text to error messages
     * @param localization
     */
    static _typeCheckDateArray(optionName, value, providedType, localization) {
        return typeCheckDateArray(optionName, value, providedType, localization);
    }
    /**
     * Type checks that `value` is an array of numbers
     * @param optionName Provides text to error messages e.g. disabledDates
     * @param value Option value
     * @param providedType Used to provide text to error messages
     */
    static _typeCheckNumberArray(optionName, value, providedType) {
        return typeCheckNumberArray(optionName, value, providedType);
    }
    /**
     * Attempts to convert `d` to a DateTime object
     * @param d value to convert
     * @param optionName Provides text to error messages e.g. disabledDates
     * @param localization object containing locale and format settings. Only used with the custom formats
     */
    static dateConversion(d, //eslint-disable-line @typescript-eslint/no-explicit-any
    optionName, localization) {
        return convertToDateTime(d, optionName, localization);
    }
    static getFlattenDefaultOptions() {
        if (this._flattenDefaults)
            return this._flattenDefaults;
        const deepKeys = (t, pre = []) => {
            if (Array.isArray(t))
                return [];
            if (Object(t) === t) {
                return Object.entries(t).flatMap(([k, v]) => deepKeys(v, [...pre, k]));
            }
            else {
                return pre.join('.');
            }
        };
        this._flattenDefaults = deepKeys(DefaultOptions);
        return this._flattenDefaults;
    }
    /**
     * Some options conflict like min/max date. Verify that these kinds of options
     * are set correctly.
     * @param config
     */
    static _validateConflicts(config) {
        if (config.display.sideBySide &&
            (!config.display.components.clock ||
                !(config.display.components.hours ||
                    config.display.components.minutes ||
                    config.display.components.seconds))) {
            Namespace.errorMessages.conflictingConfiguration('Cannot use side by side mode without the clock components');
        }
        if (config.restrictions.minDate && config.restrictions.maxDate) {
            if (config.restrictions.minDate.isAfter(config.restrictions.maxDate)) {
                Namespace.errorMessages.conflictingConfiguration('minDate is after maxDate');
            }
            if (config.restrictions.maxDate.isBefore(config.restrictions.minDate)) {
                Namespace.errorMessages.conflictingConfiguration('maxDate is before minDate');
            }
        }
        if (config.multipleDates && config.dateRange) {
            Namespace.errorMessages.conflictingConfiguration('Cannot uss option "multipleDates" with "dateRange"');
        }
    }
}
OptionConverter.ignoreProperties = [
    'meta',
    'dayViewHeaderFormat',
    'container',
    'dateForms',
    'ordinal',
];
OptionConverter.isValue = (a) => a != null; // everything except undefined + null

class Dates {
    constructor() {
        this._dates = [];
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.validation = serviceLocator.locate(Validation);
        this._eventEmitters = serviceLocator.locate(EventEmitters);
    }
    /**
     * Returns the array of selected dates
     */
    get picked() {
        return [...this._dates];
    }
    /**
     * Returns the last picked value.
     */
    get lastPicked() {
        return this._dates[this.lastPickedIndex]?.clone;
    }
    /**
     * Returns the length of picked dates -1 or 0 if none are selected.
     */
    get lastPickedIndex() {
        if (this._dates.length === 0)
            return 0;
        return this._dates.length - 1;
    }
    /**
     * Formats a DateTime object to a string. Used when setting the input value.
     * @param date
     */
    formatInput(date) {
        if (!date)
            return '';
        date.localization = this.optionsStore.options.localization;
        return date.format();
    }
    /**
     * parse the value into a DateTime object.
     * this can be overwritten to supply your own parsing.
     */
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseInput(value) {
        return OptionConverter.dateConversion(value, 'input', this.optionsStore.options.localization);
    }
    /**
     * Tries to convert the provided value to a DateTime object.
     * If value is null|undefined then clear the value of the provided index (or 0).
     * @param value Value to convert or null|undefined
     * @param index When using multidates this is the index in the array
     */
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFromInput(value, index) {
        if (!value) {
            this.setValue(undefined, index);
            return;
        }
        const converted = this.parseInput(value);
        if (converted) {
            converted.setLocalization(this.optionsStore.options.localization);
            this.setValue(converted, index);
        }
    }
    /**
     * Adds a new DateTime to selected dates array
     * @param date
     */
    add(date) {
        this._dates.push(date);
    }
    /**
     * Returns true if the `targetDate` is part of the selected dates array.
     * If `unit` is provided then a granularity to that unit will be used.
     * @param targetDate
     * @param unit
     */
    isPicked(targetDate, unit) {
        if (!DateTime.isValid(targetDate))
            return false;
        if (!unit)
            return this._dates.find((x) => x.isSame(targetDate)) !== undefined;
        const format = getFormatByUnit(unit);
        const innerDateFormatted = targetDate.format(format);
        return (this._dates
            .map((x) => x.format(format))
            .find((x) => x === innerDateFormatted) !== undefined);
    }
    /**
     * Returns the index at which `targetDate` is in the array.
     * This is used for updating or removing a date when multi-date is used
     * If `unit` is provided then a granularity to that unit will be used.
     * @param targetDate
     * @param unit
     */
    pickedIndex(targetDate, unit) {
        if (!DateTime.isValid(targetDate))
            return -1;
        if (!unit)
            return this._dates.map((x) => x.valueOf()).indexOf(targetDate.valueOf());
        const format = getFormatByUnit(unit);
        const innerDateFormatted = targetDate.format(format);
        return this._dates.map((x) => x.format(format)).indexOf(innerDateFormatted);
    }
    /**
     * Clears all selected dates.
     */
    clear() {
        this.optionsStore.unset = true;
        this._eventEmitters.triggerEvent.emit({
            type: Namespace.events.change,
            date: undefined,
            oldDate: this.lastPicked,
            isClear: true,
            isValid: true,
        });
        this._dates = [];
        if (this.optionsStore.input)
            this.optionsStore.input.value = '';
        this._eventEmitters.updateDisplay.emit('all');
    }
    /**
     * Find the "book end" years given a `year` and a `factor`
     * @param factor e.g. 100 for decades
     * @param year e.g. 2021
     */
    static getStartEndYear(factor, year) {
        const step = factor / 10, startYear = Math.floor(year / factor) * factor, endYear = startYear + step * 9, focusValue = Math.floor(year / step) * step;
        return [startYear, endYear, focusValue];
    }
    updateInput(target) {
        if (!this.optionsStore.input)
            return;
        let newValue = this.formatInput(target);
        if (this.optionsStore.options.multipleDates ||
            this.optionsStore.options.dateRange) {
            newValue = this._dates
                .map((d) => this.formatInput(d))
                .join(this.optionsStore.options.multipleDatesSeparator);
        }
        if (this.optionsStore.input.value != newValue)
            this.optionsStore.input.value = newValue;
    }
    /**
     * Attempts to either clear or set the `target` date at `index`.
     * If the `target` is null then the date will be cleared.
     * If multi-date is being used then it will be removed from the array.
     * If `target` is valid and multi-date is used then if `index` is
     * provided the date at that index will be replaced, otherwise it is appended.
     * @param target
     * @param index
     */
    setValue(target, index) {
        const noIndex = typeof index === 'undefined', isClear = !target && noIndex;
        let oldDate = this.optionsStore.unset ? null : this._dates[index]?.clone;
        if (!oldDate && !this.optionsStore.unset && noIndex && isClear) {
            oldDate = this.lastPicked;
        }
        if (target && oldDate?.isSame(target)) {
            this.updateInput(target);
            return;
        }
        // case of calling setValue(null)
        if (!target) {
            this._setValueNull(isClear, index, oldDate);
            return;
        }
        index = index || 0;
        target = target.clone;
        // minute stepping is being used, force the minute to the closest value
        if (this.optionsStore.options.stepping !== 1) {
            target.minutes =
                Math.round(target.minutes / this.optionsStore.options.stepping) *
                    this.optionsStore.options.stepping;
            target.startOf(Unit.minutes);
        }
        const onUpdate = (isValid) => {
            this._dates[index] = target;
            this._eventEmitters.updateViewDate.emit(target.clone);
            this.updateInput(target);
            this.optionsStore.unset = false;
            this._eventEmitters.updateDisplay.emit('all');
            this._eventEmitters.triggerEvent.emit({
                type: Namespace.events.change,
                date: target,
                oldDate,
                isClear,
                isValid: isValid,
            });
        };
        if (this.validation.isValid(target) &&
            this.validation.dateRangeIsValid(this.picked, index, target)) {
            onUpdate(true);
            return;
        }
        if (this.optionsStore.options.keepInvalid) {
            onUpdate(false);
        }
        this._eventEmitters.triggerEvent.emit({
            type: Namespace.events.error,
            reason: Namespace.errorMessages.failedToSetInvalidDate,
            date: target,
            oldDate,
        });
    }
    _setValueNull(isClear, index, oldDate) {
        if (!this.optionsStore.options.multipleDates ||
            this._dates.length === 1 ||
            isClear) {
            this.optionsStore.unset = true;
            this._dates = [];
        }
        else {
            this._dates.splice(index, 1);
        }
        this.updateInput();
        this._eventEmitters.triggerEvent.emit({
            type: Namespace.events.change,
            date: undefined,
            oldDate,
            isClear,
            isValid: true,
        });
        this._eventEmitters.updateDisplay.emit('all');
    }
}

var ActionTypes;
(function (ActionTypes) {
    ActionTypes["next"] = "next";
    ActionTypes["previous"] = "previous";
    ActionTypes["changeCalendarView"] = "changeCalendarView";
    ActionTypes["selectMonth"] = "selectMonth";
    ActionTypes["selectYear"] = "selectYear";
    ActionTypes["selectDecade"] = "selectDecade";
    ActionTypes["selectDay"] = "selectDay";
    ActionTypes["selectHour"] = "selectHour";
    ActionTypes["selectMinute"] = "selectMinute";
    ActionTypes["selectSecond"] = "selectSecond";
    ActionTypes["incrementHours"] = "incrementHours";
    ActionTypes["incrementMinutes"] = "incrementMinutes";
    ActionTypes["incrementSeconds"] = "incrementSeconds";
    ActionTypes["decrementHours"] = "decrementHours";
    ActionTypes["decrementMinutes"] = "decrementMinutes";
    ActionTypes["decrementSeconds"] = "decrementSeconds";
    ActionTypes["toggleMeridiem"] = "toggleMeridiem";
    ActionTypes["togglePicker"] = "togglePicker";
    ActionTypes["showClock"] = "showClock";
    ActionTypes["showHours"] = "showHours";
    ActionTypes["showMinutes"] = "showMinutes";
    ActionTypes["showSeconds"] = "showSeconds";
    ActionTypes["clear"] = "clear";
    ActionTypes["close"] = "close";
    ActionTypes["today"] = "today";
})(ActionTypes || (ActionTypes = {}));
var ActionTypes$1 = ActionTypes;

/**
 * Creates and updates the grid for `date`
 */
class DateDisplay {
    constructor() {
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.dates = serviceLocator.locate(Dates);
        this.validation = serviceLocator.locate(Validation);
    }
    /**
     * Build the container html for the display
     * @private
     */
    getPicker() {
        const container = document.createElement('div');
        container.classList.add(Namespace.css.daysContainer);
        container.append(...this._daysOfTheWeek());
        if (this.optionsStore.options.display.calendarWeeks) {
            const div = document.createElement('div');
            div.classList.add(Namespace.css.calendarWeeks, Namespace.css.noHighlight);
            container.appendChild(div);
        }
        const { rangeHoverEvent, rangeHoverOutEvent } = this.handleMouseEvents(container);
        for (let i = 0; i < 42; i++) {
            if (i !== 0 && i % 7 === 0) {
                if (this.optionsStore.options.display.calendarWeeks) {
                    const div = document.createElement('div');
                    div.classList.add(Namespace.css.calendarWeeks, Namespace.css.noHighlight);
                    container.appendChild(div);
                }
            }
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.selectDay);
            container.appendChild(div);
            // if hover is supported then add the events
            if (matchMedia('(hover: hover)').matches &&
                this.optionsStore.options.dateRange) {
                div.addEventListener('mouseover', rangeHoverEvent);
                div.addEventListener('mouseout', rangeHoverOutEvent);
            }
        }
        return container;
    }
    /**
     * Populates the grid and updates enabled states
     * @private
     */
    _update(widget, paint) {
        const container = widget.getElementsByClassName(Namespace.css.daysContainer)[0];
        this._updateCalendarView(container);
        const innerDate = this.optionsStore.viewDate.clone
            .startOf(Unit.month)
            .startOf('weekDay', this.optionsStore.options.localization.startOfTheWeek)
            .manipulate(12, Unit.hours);
        this._handleCalendarWeeks(container, innerDate.clone);
        container
            .querySelectorAll(`[data-action="${ActionTypes$1.selectDay}"]`)
            .forEach((element) => {
            const classes = [];
            classes.push(Namespace.css.day);
            if (innerDate.isBefore(this.optionsStore.viewDate, Unit.month)) {
                classes.push(Namespace.css.old);
            }
            if (innerDate.isAfter(this.optionsStore.viewDate, Unit.month)) {
                classes.push(Namespace.css.new);
            }
            if (!this.optionsStore.unset &&
                !this.optionsStore.options.dateRange &&
                this.dates.isPicked(innerDate, Unit.date)) {
                classes.push(Namespace.css.active);
            }
            if (!this.validation.isValid(innerDate, Unit.date)) {
                classes.push(Namespace.css.disabled);
            }
            if (innerDate.isSame(new DateTime(), Unit.date)) {
                classes.push(Namespace.css.today);
            }
            if (innerDate.weekDay === 0 || innerDate.weekDay === 6) {
                classes.push(Namespace.css.weekend);
            }
            this._handleDateRange(innerDate, classes);
            paint(Unit.date, innerDate, classes, element);
            element.classList.remove(...element.classList);
            element.classList.add(...classes);
            element.setAttribute('data-value', this._dateToDataValue(innerDate));
            element.setAttribute('data-day', `${innerDate.date}`);
            element.innerText = innerDate.parts(undefined, {
                day: 'numeric',
            }).day;
            innerDate.manipulate(1, Unit.date);
        });
    }
    _dateToDataValue(date) {
        if (!DateTime.isValid(date))
            return '';
        return `${date.year}-${date.monthFormatted}-${date.dateFormatted}`;
    }
    _handleDateRange(innerDate, classes) {
        const rangeStart = this.dates.picked[0];
        const rangeEnd = this.dates.picked[1];
        if (this.optionsStore.options.dateRange) {
            if (innerDate.isBetween(rangeStart, rangeEnd, Unit.date)) {
                classes.push(Namespace.css.rangeIn);
            }
            if (innerDate.isSame(rangeStart, Unit.date)) {
                classes.push(Namespace.css.rangeStart);
            }
            if (innerDate.isSame(rangeEnd, Unit.date)) {
                classes.push(Namespace.css.rangeEnd);
            }
        }
    }
    handleMouseEvents(container) {
        const rangeHoverEvent = (e) => {
            const currentTarget = e?.currentTarget;
            // if we have 0 or 2 selected or if the target is disabled then ignore
            if (this.dates.picked.length !== 1 ||
                currentTarget.classList.contains(Namespace.css.disabled))
                return;
            // select all the date divs
            const allDays = [...container.querySelectorAll('.day')];
            // get the date value from the element being hovered over
            const attributeValue = currentTarget.getAttribute('data-value');
            // format the string to a date
            const innerDate = DateTime.fromString(attributeValue, {
                format: 'yyyy-MM-dd',
            });
            // find the position of the target in the date container
            const dayIndex = allDays.findIndex((e) => e.getAttribute('data-value') === attributeValue);
            // find the first and second selected dates
            const rangeStart = this.dates.picked[0];
            const rangeEnd = this.dates.picked[1];
            //format the start date so that it can be found by the attribute
            const rangeStartFormatted = this._dateToDataValue(rangeStart);
            const rangeStartIndex = allDays.findIndex((e) => e.getAttribute('data-value') === rangeStartFormatted);
            const rangeStartElement = allDays[rangeStartIndex];
            //make sure we don't leave start/end classes if we don't need them
            if (!innerDate.isSame(rangeStart, Unit.date)) {
                currentTarget.classList.remove(Namespace.css.rangeStart);
            }
            if (!innerDate.isSame(rangeEnd, Unit.date)) {
                currentTarget.classList.remove(Namespace.css.rangeEnd);
            }
            // the following figures out which direct from start date is selected
            // the selection "cap" classes are applied if needed
            // otherwise all the dates between will get the `rangeIn` class.
            // We make this selection based on the element's index and the rangeStart index
            let lambda;
            if (innerDate.isBefore(rangeStart)) {
                currentTarget.classList.add(Namespace.css.rangeStart);
                rangeStartElement?.classList.remove(Namespace.css.rangeStart);
                rangeStartElement?.classList.add(Namespace.css.rangeEnd);
                lambda = (_, index) => index > dayIndex && index < rangeStartIndex;
            }
            else {
                currentTarget.classList.add(Namespace.css.rangeEnd);
                rangeStartElement?.classList.remove(Namespace.css.rangeEnd);
                rangeStartElement?.classList.add(Namespace.css.rangeStart);
                lambda = (_, index) => index < dayIndex && index > rangeStartIndex;
            }
            allDays.filter(lambda).forEach((e) => {
                e.classList.add(Namespace.css.rangeIn);
            });
        };
        const rangeHoverOutEvent = (e) => {
            // find all the dates in the container
            const allDays = [...container.querySelectorAll('.day')];
            // if only the start is selected, remove all the rangeIn classes
            // we do this because once the user hovers over a new date the range will be recalculated.
            if (this.dates.picked.length === 1)
                allDays.forEach((e) => e.classList.remove(Namespace.css.rangeIn));
            // if we have 0 or 2 dates selected then ignore
            if (this.dates.picked.length !== 1)
                return;
            const currentTarget = e?.currentTarget;
            // get the elements date from the attribute value
            const innerDate = new DateTime(currentTarget.getAttribute('data-value'));
            // verify selections and remove invalid classes
            if (!innerDate.isSame(this.dates.picked[0], Unit.date)) {
                currentTarget.classList.remove(Namespace.css.rangeStart);
            }
            if (!innerDate.isSame(this.dates.picked[1], Unit.date)) {
                currentTarget.classList.remove(Namespace.css.rangeEnd);
            }
        };
        return { rangeHoverEvent, rangeHoverOutEvent };
    }
    _updateCalendarView(container) {
        if (this.optionsStore.currentView !== 'calendar')
            return;
        const [previous, switcher, next] = container.parentElement
            .getElementsByClassName(Namespace.css.calendarHeader)[0]
            .getElementsByTagName('div');
        switcher.setAttribute(Namespace.css.daysContainer, this.optionsStore.viewDate.format(this.optionsStore.options.localization.dayViewHeaderFormat));
        this.optionsStore.options.display.components.month
            ? switcher.classList.remove(Namespace.css.disabled)
            : switcher.classList.add(Namespace.css.disabled);
        this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, Unit.month), Unit.month)
            ? previous.classList.remove(Namespace.css.disabled)
            : previous.classList.add(Namespace.css.disabled);
        this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, Unit.month), Unit.month)
            ? next.classList.remove(Namespace.css.disabled)
            : next.classList.add(Namespace.css.disabled);
    }
    /***
     * Generates a html row that contains the days of the week.
     * @private
     */
    _daysOfTheWeek() {
        const innerDate = this.optionsStore.viewDate.clone
            .startOf('weekDay', this.optionsStore.options.localization.startOfTheWeek)
            .startOf(Unit.date);
        const row = [];
        document.createElement('div');
        if (this.optionsStore.options.display.calendarWeeks) {
            const htmlDivElement = document.createElement('div');
            htmlDivElement.classList.add(Namespace.css.calendarWeeks, Namespace.css.noHighlight);
            htmlDivElement.innerText = '#';
            row.push(htmlDivElement);
        }
        for (let i = 0; i < 7; i++) {
            const htmlDivElement = document.createElement('div');
            htmlDivElement.classList.add(Namespace.css.dayOfTheWeek, Namespace.css.noHighlight);
            htmlDivElement.innerText = innerDate.format({ weekday: 'short' });
            innerDate.manipulate(1, Unit.date);
            row.push(htmlDivElement);
        }
        return row;
    }
    _handleCalendarWeeks(container, innerDate) {
        [...container.querySelectorAll(`.${Namespace.css.calendarWeeks}`)]
            .filter((e) => e.innerText !== '#')
            .forEach((element) => {
            element.innerText = `${innerDate.week}`;
            innerDate.manipulate(7, Unit.date);
        });
    }
}

/**
 * Creates and updates the grid for `month`
 */
class MonthDisplay {
    constructor() {
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.dates = serviceLocator.locate(Dates);
        this.validation = serviceLocator.locate(Validation);
    }
    /**
     * Build the container html for the display
     * @private
     */
    getPicker() {
        const container = document.createElement('div');
        container.classList.add(Namespace.css.monthsContainer);
        for (let i = 0; i < 12; i++) {
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.selectMonth);
            container.appendChild(div);
        }
        return container;
    }
    /**
     * Populates the grid and updates enabled states
     * @private
     */
    _update(widget, paint) {
        const container = widget.getElementsByClassName(Namespace.css.monthsContainer)[0];
        if (this.optionsStore.currentView === 'months') {
            const [previous, switcher, next] = container.parentElement
                .getElementsByClassName(Namespace.css.calendarHeader)[0]
                .getElementsByTagName('div');
            switcher.setAttribute(Namespace.css.monthsContainer, this.optionsStore.viewDate.format({ year: 'numeric' }));
            this.optionsStore.options.display.components.year
                ? switcher.classList.remove(Namespace.css.disabled)
                : switcher.classList.add(Namespace.css.disabled);
            this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, Unit.year), Unit.year)
                ? previous.classList.remove(Namespace.css.disabled)
                : previous.classList.add(Namespace.css.disabled);
            this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, Unit.year), Unit.year)
                ? next.classList.remove(Namespace.css.disabled)
                : next.classList.add(Namespace.css.disabled);
        }
        const innerDate = this.optionsStore.viewDate.clone.startOf(Unit.year);
        container
            .querySelectorAll(`[data-action="${ActionTypes$1.selectMonth}"]`)
            .forEach((containerClone, index) => {
            const classes = [];
            classes.push(Namespace.css.month);
            if (!this.optionsStore.unset &&
                this.dates.isPicked(innerDate, Unit.month)) {
                classes.push(Namespace.css.active);
            }
            if (!this.validation.isValid(innerDate, Unit.month)) {
                classes.push(Namespace.css.disabled);
            }
            paint(Unit.month, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute('data-value', `${index}`);
            containerClone.innerText = `${innerDate.format({ month: 'short' })}`;
            innerDate.manipulate(1, Unit.month);
        });
    }
}

/**
 * Creates and updates the grid for `year`
 */
class YearDisplay {
    constructor() {
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.dates = serviceLocator.locate(Dates);
        this.validation = serviceLocator.locate(Validation);
    }
    /**
     * Build the container html for the display
     * @private
     */
    getPicker() {
        const container = document.createElement('div');
        container.classList.add(Namespace.css.yearsContainer);
        for (let i = 0; i < 12; i++) {
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.selectYear);
            container.appendChild(div);
        }
        return container;
    }
    /**
     * Populates the grid and updates enabled states
     * @private
     */
    _update(widget, paint) {
        this._startYear = this.optionsStore.viewDate.clone.manipulate(-1, Unit.year);
        this._endYear = this.optionsStore.viewDate.clone.manipulate(10, Unit.year);
        const container = widget.getElementsByClassName(Namespace.css.yearsContainer)[0];
        if (this.optionsStore.currentView === 'years') {
            const [previous, switcher, next] = container.parentElement
                .getElementsByClassName(Namespace.css.calendarHeader)[0]
                .getElementsByTagName('div');
            switcher.setAttribute(Namespace.css.yearsContainer, `${this._startYear.format({ year: 'numeric' })}-${this._endYear.format({
                year: 'numeric',
            })}`);
            this.optionsStore.options.display.components.decades
                ? switcher.classList.remove(Namespace.css.disabled)
                : switcher.classList.add(Namespace.css.disabled);
            this.validation.isValid(this._startYear, Unit.year)
                ? previous.classList.remove(Namespace.css.disabled)
                : previous.classList.add(Namespace.css.disabled);
            this.validation.isValid(this._endYear, Unit.year)
                ? next.classList.remove(Namespace.css.disabled)
                : next.classList.add(Namespace.css.disabled);
        }
        const innerDate = this.optionsStore.viewDate.clone
            .startOf(Unit.year)
            .manipulate(-1, Unit.year);
        container
            .querySelectorAll(`[data-action="${ActionTypes$1.selectYear}"]`)
            .forEach((containerClone) => {
            const classes = [];
            classes.push(Namespace.css.year);
            if (!this.optionsStore.unset &&
                this.dates.isPicked(innerDate, Unit.year)) {
                classes.push(Namespace.css.active);
            }
            if (!this.validation.isValid(innerDate, Unit.year)) {
                classes.push(Namespace.css.disabled);
            }
            paint(Unit.year, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute('data-value', `${innerDate.year}`);
            containerClone.innerText = innerDate.format({ year: 'numeric' });
            innerDate.manipulate(1, Unit.year);
        });
    }
}

/**
 * Creates and updates the grid for `seconds`
 */
class DecadeDisplay {
    constructor() {
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.dates = serviceLocator.locate(Dates);
        this.validation = serviceLocator.locate(Validation);
    }
    /**
     * Build the container html for the display
     * @private
     */
    getPicker() {
        const container = document.createElement('div');
        container.classList.add(Namespace.css.decadesContainer);
        for (let i = 0; i < 12; i++) {
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.selectDecade);
            container.appendChild(div);
        }
        return container;
    }
    /**
     * Populates the grid and updates enabled states
     * @private
     */
    _update(widget, paint) {
        const [start, end] = Dates.getStartEndYear(100, this.optionsStore.viewDate.year);
        this._startDecade = this.optionsStore.viewDate.clone.startOf(Unit.year);
        this._startDecade.year = start;
        this._endDecade = this.optionsStore.viewDate.clone.startOf(Unit.year);
        this._endDecade.year = end;
        const container = widget.getElementsByClassName(Namespace.css.decadesContainer)[0];
        const [previous, switcher, next] = container.parentElement
            .getElementsByClassName(Namespace.css.calendarHeader)[0]
            .getElementsByTagName('div');
        if (this.optionsStore.currentView === 'decades') {
            switcher.setAttribute(Namespace.css.decadesContainer, `${this._startDecade.format({
                year: 'numeric',
            })}-${this._endDecade.format({ year: 'numeric' })}`);
            this.validation.isValid(this._startDecade, Unit.year)
                ? previous.classList.remove(Namespace.css.disabled)
                : previous.classList.add(Namespace.css.disabled);
            this.validation.isValid(this._endDecade, Unit.year)
                ? next.classList.remove(Namespace.css.disabled)
                : next.classList.add(Namespace.css.disabled);
        }
        const pickedYears = this.dates.picked.map((x) => x.year);
        container
            .querySelectorAll(`[data-action="${ActionTypes$1.selectDecade}"]`)
            .forEach((containerClone, index) => {
            if (index === 0) {
                containerClone.classList.add(Namespace.css.old);
                if (this._startDecade.year - 10 < 0) {
                    containerClone.textContent = ' ';
                    previous.classList.add(Namespace.css.disabled);
                    containerClone.classList.add(Namespace.css.disabled);
                    containerClone.setAttribute('data-value', '');
                    return;
                }
                else {
                    containerClone.innerText = this._startDecade.clone
                        .manipulate(-10, Unit.year)
                        .format({ year: 'numeric' });
                    containerClone.setAttribute('data-value', `${this._startDecade.year}`);
                    return;
                }
            }
            const classes = [];
            classes.push(Namespace.css.decade);
            const startDecadeYear = this._startDecade.year;
            const endDecadeYear = this._startDecade.year + 9;
            if (!this.optionsStore.unset &&
                pickedYears.filter((x) => x >= startDecadeYear && x <= endDecadeYear)
                    .length > 0) {
                classes.push(Namespace.css.active);
            }
            paint('decade', this._startDecade, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute('data-value', `${this._startDecade.year}`);
            containerClone.innerText = `${this._startDecade.format({
                year: 'numeric',
            })}`;
            this._startDecade.manipulate(10, Unit.year);
        });
    }
}

/**
 * Creates the clock display
 */
class TimeDisplay {
    constructor() {
        this._gridColumns = '';
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.dates = serviceLocator.locate(Dates);
        this.validation = serviceLocator.locate(Validation);
    }
    /**
     * Build the container html for the clock display
     * @private
     */
    getPicker(iconTag) {
        const container = document.createElement('div');
        container.classList.add(Namespace.css.clockContainer);
        container.append(...this._grid(iconTag));
        return container;
    }
    /**
     * Populates the various elements with in the clock display
     * like the current hour and if the manipulation icons are enabled.
     * @private
     */
    _update(widget) {
        const timesDiv = (widget.getElementsByClassName(Namespace.css.clockContainer)[0]);
        let lastPicked = this.dates.lastPicked?.clone;
        if (!lastPicked && this.optionsStore.options.useCurrent)
            lastPicked = this.optionsStore.viewDate.clone;
        timesDiv
            .querySelectorAll('.disabled')
            .forEach((element) => element.classList.remove(Namespace.css.disabled));
        if (this.optionsStore.options.display.components.hours) {
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, Unit.hours), Unit.hours)) {
                timesDiv
                    .querySelector(`[data-action=${ActionTypes$1.incrementHours}]`)
                    .classList.add(Namespace.css.disabled);
            }
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, Unit.hours), Unit.hours)) {
                timesDiv
                    .querySelector(`[data-action=${ActionTypes$1.decrementHours}]`)
                    .classList.add(Namespace.css.disabled);
            }
            timesDiv.querySelector(`[data-time-component=${Unit.hours}]`).innerText = lastPicked
                ? lastPicked.getHoursFormatted(this.optionsStore.options.localization.hourCycle)
                : '--';
        }
        if (this.optionsStore.options.display.components.minutes) {
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, Unit.minutes), Unit.minutes)) {
                timesDiv
                    .querySelector(`[data-action=${ActionTypes$1.incrementMinutes}]`)
                    .classList.add(Namespace.css.disabled);
            }
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, Unit.minutes), Unit.minutes)) {
                timesDiv
                    .querySelector(`[data-action=${ActionTypes$1.decrementMinutes}]`)
                    .classList.add(Namespace.css.disabled);
            }
            timesDiv.querySelector(`[data-time-component=${Unit.minutes}]`).innerText = lastPicked ? lastPicked.minutesFormatted : '--';
        }
        if (this.optionsStore.options.display.components.seconds) {
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(1, Unit.seconds), Unit.seconds)) {
                timesDiv
                    .querySelector(`[data-action=${ActionTypes$1.incrementSeconds}]`)
                    .classList.add(Namespace.css.disabled);
            }
            if (!this.validation.isValid(this.optionsStore.viewDate.clone.manipulate(-1, Unit.seconds), Unit.seconds)) {
                timesDiv
                    .querySelector(`[data-action=${ActionTypes$1.decrementSeconds}]`)
                    .classList.add(Namespace.css.disabled);
            }
            timesDiv.querySelector(`[data-time-component=${Unit.seconds}]`).innerText = lastPicked ? lastPicked.secondsFormatted : '--';
        }
        if (this.optionsStore.isTwelveHour) {
            const toggle = timesDiv.querySelector(`[data-action=${ActionTypes$1.toggleMeridiem}]`);
            const meridiemDate = (lastPicked || this.optionsStore.viewDate).clone;
            toggle.innerText = meridiemDate.meridiem();
            if (!this.validation.isValid(meridiemDate.manipulate(meridiemDate.hours >= 12 ? -12 : 12, Unit.hours))) {
                toggle.classList.add(Namespace.css.disabled);
            }
            else {
                toggle.classList.remove(Namespace.css.disabled);
            }
        }
        timesDiv.style.gridTemplateAreas = `"${this._gridColumns}"`;
    }
    /**
     * Creates the table for the clock display depending on what options are selected.
     * @private
     */
    _grid(iconTag) {
        this._gridColumns = '';
        const top = [], middle = [], bottom = [], separator = document.createElement('div'), upIcon = iconTag(this.optionsStore.options.display.icons.up), downIcon = iconTag(this.optionsStore.options.display.icons.down);
        separator.classList.add(Namespace.css.separator, Namespace.css.noHighlight);
        const separatorColon = separator.cloneNode(true);
        separatorColon.innerHTML = ':';
        const getSeparator = (colon = false) => {
            return colon
                ? separatorColon.cloneNode(true)
                : separator.cloneNode(true);
        };
        if (this.optionsStore.options.display.components.hours) {
            let divElement = document.createElement('div');
            divElement.setAttribute('title', this.optionsStore.options.localization.incrementHour);
            divElement.setAttribute('data-action', ActionTypes$1.incrementHours);
            divElement.appendChild(upIcon.cloneNode(true));
            top.push(divElement);
            divElement = document.createElement('div');
            divElement.setAttribute('title', this.optionsStore.options.localization.pickHour);
            divElement.setAttribute('data-action', ActionTypes$1.showHours);
            divElement.setAttribute('data-time-component', Unit.hours);
            middle.push(divElement);
            divElement = document.createElement('div');
            divElement.setAttribute('title', this.optionsStore.options.localization.decrementHour);
            divElement.setAttribute('data-action', ActionTypes$1.decrementHours);
            divElement.appendChild(downIcon.cloneNode(true));
            bottom.push(divElement);
            this._gridColumns += 'a';
        }
        if (this.optionsStore.options.display.components.minutes) {
            this._gridColumns += ' a';
            if (this.optionsStore.options.display.components.hours) {
                top.push(getSeparator());
                middle.push(getSeparator(true));
                bottom.push(getSeparator());
                this._gridColumns += ' a';
            }
            let divElement = document.createElement('div');
            divElement.setAttribute('title', this.optionsStore.options.localization.incrementMinute);
            divElement.setAttribute('data-action', ActionTypes$1.incrementMinutes);
            divElement.appendChild(upIcon.cloneNode(true));
            top.push(divElement);
            divElement = document.createElement('div');
            divElement.setAttribute('title', this.optionsStore.options.localization.pickMinute);
            divElement.setAttribute('data-action', ActionTypes$1.showMinutes);
            divElement.setAttribute('data-time-component', Unit.minutes);
            middle.push(divElement);
            divElement = document.createElement('div');
            divElement.setAttribute('title', this.optionsStore.options.localization.decrementMinute);
            divElement.setAttribute('data-action', ActionTypes$1.decrementMinutes);
            divElement.appendChild(downIcon.cloneNode(true));
            bottom.push(divElement);
        }
        if (this.optionsStore.options.display.components.seconds) {
            this._gridColumns += ' a';
            if (this.optionsStore.options.display.components.minutes) {
                top.push(getSeparator());
                middle.push(getSeparator(true));
                bottom.push(getSeparator());
                this._gridColumns += ' a';
            }
            let divElement = document.createElement('div');
            divElement.setAttribute('title', this.optionsStore.options.localization.incrementSecond);
            divElement.setAttribute('data-action', ActionTypes$1.incrementSeconds);
            divElement.appendChild(upIcon.cloneNode(true));
            top.push(divElement);
            divElement = document.createElement('div');
            divElement.setAttribute('title', this.optionsStore.options.localization.pickSecond);
            divElement.setAttribute('data-action', ActionTypes$1.showSeconds);
            divElement.setAttribute('data-time-component', Unit.seconds);
            middle.push(divElement);
            divElement = document.createElement('div');
            divElement.setAttribute('title', this.optionsStore.options.localization.decrementSecond);
            divElement.setAttribute('data-action', ActionTypes$1.decrementSeconds);
            divElement.appendChild(downIcon.cloneNode(true));
            bottom.push(divElement);
        }
        if (this.optionsStore.isTwelveHour) {
            this._gridColumns += ' a';
            let divElement = getSeparator();
            top.push(divElement);
            const button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.setAttribute('title', this.optionsStore.options.localization.toggleMeridiem);
            button.setAttribute('data-action', ActionTypes$1.toggleMeridiem);
            button.setAttribute('tabindex', '-1');
            if (Namespace.css.toggleMeridiem.includes(',')) {
                //todo move this to paint function?
                button.classList.add(...Namespace.css.toggleMeridiem.split(','));
            }
            else
                button.classList.add(Namespace.css.toggleMeridiem);
            divElement = document.createElement('div');
            divElement.classList.add(Namespace.css.noHighlight);
            divElement.appendChild(button);
            middle.push(divElement);
            divElement = getSeparator();
            bottom.push(divElement);
        }
        this._gridColumns = this._gridColumns.trim();
        return [...top, ...middle, ...bottom];
    }
}

/**
 * Creates and updates the grid for `hours`
 */
class HourDisplay {
    constructor() {
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.validation = serviceLocator.locate(Validation);
    }
    /**
     * Build the container html for the display
     * @private
     */
    getPicker() {
        const container = document.createElement('div');
        container.classList.add(Namespace.css.hourContainer);
        for (let i = 0; i < (this.optionsStore.isTwelveHour ? 12 : 24); i++) {
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.selectHour);
            container.appendChild(div);
        }
        return container;
    }
    /**
     * Populates the grid and updates enabled states
     * @private
     */
    _update(widget, paint) {
        const container = widget.getElementsByClassName(Namespace.css.hourContainer)[0];
        const innerDate = this.optionsStore.viewDate.clone.startOf(Unit.date);
        container
            .querySelectorAll(`[data-action="${ActionTypes$1.selectHour}"]`)
            .forEach((containerClone) => {
            const classes = [];
            classes.push(Namespace.css.hour);
            if (!this.validation.isValid(innerDate, Unit.hours)) {
                classes.push(Namespace.css.disabled);
            }
            paint(Unit.hours, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute('data-value', `${innerDate.hours}`);
            containerClone.innerText = innerDate.getHoursFormatted(this.optionsStore.options.localization.hourCycle);
            innerDate.manipulate(1, Unit.hours);
        });
    }
}

/**
 * Creates and updates the grid for `minutes`
 */
class MinuteDisplay {
    constructor() {
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.validation = serviceLocator.locate(Validation);
    }
    /**
     * Build the container html for the display
     * @private
     */
    getPicker() {
        const container = document.createElement('div');
        container.classList.add(Namespace.css.minuteContainer);
        const step = this.optionsStore.options.stepping === 1
            ? 5
            : this.optionsStore.options.stepping;
        for (let i = 0; i < 60 / step; i++) {
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.selectMinute);
            container.appendChild(div);
        }
        return container;
    }
    /**
     * Populates the grid and updates enabled states
     * @private
     */
    _update(widget, paint) {
        const container = widget.getElementsByClassName(Namespace.css.minuteContainer)[0];
        const innerDate = this.optionsStore.viewDate.clone.startOf(Unit.hours);
        const step = this.optionsStore.options.stepping === 1
            ? 5
            : this.optionsStore.options.stepping;
        container
            .querySelectorAll(`[data-action="${ActionTypes$1.selectMinute}"]`)
            .forEach((containerClone) => {
            const classes = [];
            classes.push(Namespace.css.minute);
            if (!this.validation.isValid(innerDate, Unit.minutes)) {
                classes.push(Namespace.css.disabled);
            }
            paint(Unit.minutes, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute('data-value', `${innerDate.minutes}`);
            containerClone.innerText = innerDate.minutesFormatted;
            innerDate.manipulate(step, Unit.minutes);
        });
    }
}

/**
 * Creates and updates the grid for `seconds`
 */
class secondDisplay {
    constructor() {
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.validation = serviceLocator.locate(Validation);
    }
    /**
     * Build the container html for the display
     * @private
     */
    getPicker() {
        const container = document.createElement('div');
        container.classList.add(Namespace.css.secondContainer);
        for (let i = 0; i < 12; i++) {
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.selectSecond);
            container.appendChild(div);
        }
        return container;
    }
    /**
     * Populates the grid and updates enabled states
     * @private
     */
    _update(widget, paint) {
        const container = widget.getElementsByClassName(Namespace.css.secondContainer)[0];
        const innerDate = this.optionsStore.viewDate.clone.startOf(Unit.minutes);
        container
            .querySelectorAll(`[data-action="${ActionTypes$1.selectSecond}"]`)
            .forEach((containerClone) => {
            const classes = [];
            classes.push(Namespace.css.second);
            if (!this.validation.isValid(innerDate, Unit.seconds)) {
                classes.push(Namespace.css.disabled);
            }
            paint(Unit.seconds, innerDate, classes, containerClone);
            containerClone.classList.remove(...containerClone.classList);
            containerClone.classList.add(...classes);
            containerClone.setAttribute('data-value', `${innerDate.seconds}`);
            containerClone.innerText = innerDate.secondsFormatted;
            innerDate.manipulate(5, Unit.seconds);
        });
    }
}

/**
 * Provides a collapse functionality to the view changes
 */
class Collapse {
    /**
     * Flips the show/hide state of `target`
     * @param target html element to affect.
     */
    static toggle(target) {
        if (target.classList.contains(Namespace.css.show)) {
            this.hide(target);
        }
        else {
            this.show(target);
        }
    }
    /**
     * Skips any animation or timeouts and immediately set the element to show.
     * @param target
     */
    static showImmediately(target) {
        target.classList.remove(Namespace.css.collapsing);
        target.classList.add(Namespace.css.collapse, Namespace.css.show);
        target.style.height = '';
    }
    /**
     * If `target` is not already showing, then show after the animation.
     * @param target
     */
    static show(target) {
        if (target.classList.contains(Namespace.css.collapsing) ||
            target.classList.contains(Namespace.css.show))
            return;
        const complete = () => {
            Collapse.showImmediately(target);
        };
        target.style.height = '0';
        target.classList.remove(Namespace.css.collapse);
        target.classList.add(Namespace.css.collapsing);
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        setTimeout(complete, this.getTransitionDurationFromElement(target));
        target.style.height = `${target.scrollHeight}px`;
    }
    /**
     * Skips any animation or timeouts and immediately set the element to hide.
     * @param target
     */
    static hideImmediately(target) {
        if (!target)
            return;
        target.classList.remove(Namespace.css.collapsing, Namespace.css.show);
        target.classList.add(Namespace.css.collapse);
    }
    /**
     * If `target` is not already hidden, then hide after the animation.
     * @param target HTML Element
     */
    static hide(target) {
        if (target.classList.contains(Namespace.css.collapsing) ||
            !target.classList.contains(Namespace.css.show))
            return;
        const complete = () => {
            Collapse.hideImmediately(target);
        };
        target.style.height = `${target.getBoundingClientRect()['height']}px`;
        const reflow = (element) => element.offsetHeight;
        reflow(target);
        target.classList.remove(Namespace.css.collapse, Namespace.css.show);
        target.classList.add(Namespace.css.collapsing);
        target.style.height = '';
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        setTimeout(complete, this.getTransitionDurationFromElement(target));
    }
}
/**
 * Gets the transition duration from the `element` by getting css properties
 * `transition-duration` and `transition-delay`
 * @param element HTML Element
 */
Collapse.getTransitionDurationFromElement = (element) => {
    if (!element) {
        return 0;
    }
    // Get transition-duration of the element
    let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);
    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
    }
    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return ((Number.parseFloat(transitionDuration) +
        Number.parseFloat(transitionDelay)) *
        1000);
};

/**
 * Main class for all things display related.
 */
class Display {
    constructor() {
        this._isVisible = false;
        /**
         * A document click event to hide the widget if click is outside
         * @private
         * @param e MouseEvent
         */
        this._documentClickEvent = (e) => {
            if (this.optionsStore.options.debug || window.debug)
                return; //eslint-disable-line @typescript-eslint/no-explicit-any
            if (this._isVisible &&
                !e.composedPath().includes(this.widget) && // click inside the widget
                !e.composedPath()?.includes(this.optionsStore.element) // click on the element
            ) {
                this.hide();
            }
        };
        /**
         * Click event for any action like selecting a date
         * @param e MouseEvent
         * @private
         */
        this._actionsClickEvent = (e) => {
            this._eventEmitters.action.emit({ e: e });
        };
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.validation = serviceLocator.locate(Validation);
        this.dates = serviceLocator.locate(Dates);
        this.dateDisplay = serviceLocator.locate(DateDisplay);
        this.monthDisplay = serviceLocator.locate(MonthDisplay);
        this.yearDisplay = serviceLocator.locate(YearDisplay);
        this.decadeDisplay = serviceLocator.locate(DecadeDisplay);
        this.timeDisplay = serviceLocator.locate(TimeDisplay);
        this.hourDisplay = serviceLocator.locate(HourDisplay);
        this.minuteDisplay = serviceLocator.locate(MinuteDisplay);
        this.secondDisplay = serviceLocator.locate(secondDisplay);
        this._eventEmitters = serviceLocator.locate(EventEmitters);
        this._widget = undefined;
        this._eventEmitters.updateDisplay.subscribe((result) => {
            this._update(result);
        });
    }
    /**
     * Returns the widget body or undefined
     * @private
     */
    get widget() {
        return this._widget;
    }
    get dateContainer() {
        return this.widget?.querySelector(`div.${Namespace.css.dateContainer}`);
    }
    get timeContainer() {
        return this.widget?.querySelector(`div.${Namespace.css.timeContainer}`);
    }
    /**
     * Returns this visible state of the picker (shown)
     */
    get isVisible() {
        return this._isVisible;
    }
    /**
     * Updates the table for a particular unit. Used when an option as changed or
     * whenever the class list might need to be refreshed.
     * @param unit
     * @private
     */
    _update(unit) {
        if (!this.widget)
            return;
        switch (unit) {
            case Unit.seconds:
                this.secondDisplay._update(this.widget, this.paint);
                break;
            case Unit.minutes:
                this.minuteDisplay._update(this.widget, this.paint);
                break;
            case Unit.hours:
                this.hourDisplay._update(this.widget, this.paint);
                break;
            case Unit.date:
                this.dateDisplay._update(this.widget, this.paint);
                break;
            case Unit.month:
                this.monthDisplay._update(this.widget, this.paint);
                break;
            case Unit.year:
                this.yearDisplay._update(this.widget, this.paint);
                break;
            case 'decade':
                this.decadeDisplay._update(this.widget, this.paint);
                break;
            case 'clock':
                if (!this._hasTime)
                    break;
                this.timeDisplay._update(this.widget);
                this._update(Unit.hours);
                this._update(Unit.minutes);
                this._update(Unit.seconds);
                break;
            case 'calendar':
                this._update(Unit.date);
                this._update(Unit.year);
                this._update(Unit.month);
                this.decadeDisplay._update(this.widget, this.paint);
                this._updateCalendarHeader();
                break;
            case 'all':
                if (this._hasTime) {
                    this._update('clock');
                }
                if (this._hasDate) {
                    this._update('calendar');
                }
        }
    }
    // noinspection JSUnusedLocalSymbols
    /**
     * Allows developers to add/remove classes from an element.
     * @param _unit
     * @param _date
     * @param _classes
     * @param _element
     */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    paint(_unit, _date, _classes, _element) {
        // implemented in plugin
    }
    /**
     * Shows the picker and creates a Popper instance if needed.
     * Add document click event to hide when clicking outside the picker.
     * fires Events#show
     */
    show() {
        if (this.widget == undefined) {
            this._showSetDefaultIfNeeded();
            this._buildWidget();
            this._updateTheme();
            this._showSetupViewMode();
            if (!this.optionsStore.options.display.inline) {
                // If needed to change the parent container
                const container = this.optionsStore.options?.container || document.body;
                const placement = this.optionsStore.options?.display?.placement || 'bottom';
                container.appendChild(this.widget);
                this.createPopup(this.optionsStore.element, this.widget, {
                    modifiers: [{ name: 'eventListeners', enabled: true }],
                    //#2400
                    placement: document.documentElement.dir === 'rtl'
                        ? `${placement}-end`
                        : `${placement}-start`,
                }).then();
            }
            else {
                this.optionsStore.element.appendChild(this.widget);
            }
            if (this.optionsStore.options.display.viewMode == 'clock') {
                this._eventEmitters.action.emit({
                    e: null,
                    action: ActionTypes$1.showClock,
                });
            }
            this.widget
                .querySelectorAll('[data-action]')
                .forEach((element) => element.addEventListener('click', this._actionsClickEvent));
            // show the clock when using sideBySide
            if (this._hasTime && this.optionsStore.options.display.sideBySide) {
                this.timeDisplay._update(this.widget);
                this.widget.getElementsByClassName(Namespace.css.clockContainer)[0].style.display = 'grid';
            }
        }
        this.widget.classList.add(Namespace.css.show);
        if (!this.optionsStore.options.display.inline) {
            this.updatePopup();
            document.addEventListener('click', this._documentClickEvent);
        }
        this._eventEmitters.triggerEvent.emit({ type: Namespace.events.show });
        this._isVisible = true;
    }
    _showSetupViewMode() {
        // If modeView is only clock
        const onlyClock = this._hasTime && !this._hasDate;
        // reset the view to the clock if there's no date components
        if (onlyClock) {
            this.optionsStore.currentView = 'clock';
            this._eventEmitters.action.emit({
                e: null,
                action: ActionTypes$1.showClock,
            });
        }
        // otherwise return to the calendar view
        else if (!this.optionsStore.currentCalendarViewMode) {
            this.optionsStore.currentCalendarViewMode =
                this.optionsStore.minimumCalendarViewMode;
        }
        if (!onlyClock && this.optionsStore.options.display.viewMode !== 'clock') {
            if (this._hasTime) {
                if (!this.optionsStore.options.display.sideBySide) {
                    Collapse.hideImmediately(this.timeContainer);
                }
                else {
                    Collapse.show(this.timeContainer);
                }
            }
            Collapse.show(this.dateContainer);
        }
        if (this._hasDate) {
            this._showMode();
        }
    }
    _showSetDefaultIfNeeded() {
        if (this.dates.picked.length != 0)
            return;
        if (this.optionsStore.options.useCurrent &&
            !this.optionsStore.options.defaultDate) {
            const date = new DateTime().setLocalization(this.optionsStore.options.localization);
            if (!this.optionsStore.options.keepInvalid) {
                let tries = 0;
                let direction = 1;
                if (this.optionsStore.options.restrictions.maxDate?.isBefore(date)) {
                    direction = -1;
                }
                while (!this.validation.isValid(date) && tries > 31) {
                    date.manipulate(direction, Unit.date);
                    tries++;
                }
            }
            this.dates.setValue(date);
        }
        if (this.optionsStore.options.defaultDate) {
            this.dates.setValue(this.optionsStore.options.defaultDate);
        }
    }
    async createPopup(element, widget, 
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    options) {
        let createPopperFunction;
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (window?.Popper) {
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            createPopperFunction = window?.Popper?.createPopper;
        }
        else {
            const { createPopper } = await __webpack_require__.e(/*! import() */ "vendors-node_modules_popperjs_core_lib_index_js").then(__webpack_require__.bind(__webpack_require__, /*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js"));
            createPopperFunction = createPopper;
        }
        if (createPopperFunction) {
            this._popperInstance = createPopperFunction(element, widget, options);
        }
    }
    updatePopup() {
        this._popperInstance?.update();
    }
    /**
     * Changes the calendar view mode. E.g. month <-> year
     * @param direction -/+ number to move currentViewMode
     * @private
     */
    _showMode(direction) {
        if (!this.widget) {
            return;
        }
        if (direction) {
            const max = Math.max(this.optionsStore.minimumCalendarViewMode, Math.min(3, this.optionsStore.currentCalendarViewMode + direction));
            if (this.optionsStore.currentCalendarViewMode == max)
                return;
            this.optionsStore.currentCalendarViewMode = max;
        }
        this.widget
            .querySelectorAll(`.${Namespace.css.dateContainer} > div:not(.${Namespace.css.calendarHeader}), .${Namespace.css.timeContainer} > div:not(.${Namespace.css.clockContainer})`)
            .forEach((e) => (e.style.display = 'none'));
        const datePickerMode = CalendarModes[this.optionsStore.currentCalendarViewMode];
        const picker = this.widget.querySelector(`.${datePickerMode.className}`);
        switch (datePickerMode.className) {
            case Namespace.css.decadesContainer:
                this.decadeDisplay._update(this.widget, this.paint);
                break;
            case Namespace.css.yearsContainer:
                this.yearDisplay._update(this.widget, this.paint);
                break;
            case Namespace.css.monthsContainer:
                this.monthDisplay._update(this.widget, this.paint);
                break;
            case Namespace.css.daysContainer:
                this.dateDisplay._update(this.widget, this.paint);
                break;
        }
        picker.style.display = 'grid';
        if (this.optionsStore.options.display.sideBySide)
            (this.widget.querySelectorAll(`.${Namespace.css.clockContainer}`)[0]).style.display = 'grid';
        this._updateCalendarHeader();
        this._eventEmitters.viewUpdate.emit();
    }
    /**
     * Changes the theme. E.g. light, dark or auto
     * @param theme the theme name
     * @private
     */
    _updateTheme(theme) {
        if (!this.widget) {
            return;
        }
        if (theme) {
            if (this.optionsStore.options.display.theme === theme)
                return;
            this.optionsStore.options.display.theme = theme;
        }
        this.widget.classList.remove('light', 'dark');
        this.widget.classList.add(this._getThemeClass());
        if (this.optionsStore.options.display.theme === 'auto') {
            window
                .matchMedia(Namespace.css.isDarkPreferredQuery)
                .addEventListener('change', () => this._updateTheme());
        }
        else {
            window
                .matchMedia(Namespace.css.isDarkPreferredQuery)
                .removeEventListener('change', () => this._updateTheme());
        }
    }
    _getThemeClass() {
        const currentTheme = this.optionsStore.options.display.theme || 'auto';
        const isDarkMode = window.matchMedia &&
            window.matchMedia(Namespace.css.isDarkPreferredQuery).matches;
        switch (currentTheme) {
            case 'light':
                return Namespace.css.lightTheme;
            case 'dark':
                return Namespace.css.darkTheme;
            case 'auto':
                return isDarkMode ? Namespace.css.darkTheme : Namespace.css.lightTheme;
        }
    }
    _updateCalendarHeader() {
        if (!this._hasDate)
            return;
        const showing = [
            ...this.widget.querySelector(`.${Namespace.css.dateContainer} div[style*="display: grid"]`).classList,
        ].find((x) => x.startsWith(Namespace.css.dateContainer));
        const [previous, switcher, next] = this.widget
            .getElementsByClassName(Namespace.css.calendarHeader)[0]
            .getElementsByTagName('div');
        switch (showing) {
            case Namespace.css.decadesContainer:
                previous.setAttribute('title', this.optionsStore.options.localization.previousCentury);
                switcher.setAttribute('title', '');
                next.setAttribute('title', this.optionsStore.options.localization.nextCentury);
                break;
            case Namespace.css.yearsContainer:
                previous.setAttribute('title', this.optionsStore.options.localization.previousDecade);
                switcher.setAttribute('title', this.optionsStore.options.localization.selectDecade);
                next.setAttribute('title', this.optionsStore.options.localization.nextDecade);
                break;
            case Namespace.css.monthsContainer:
                previous.setAttribute('title', this.optionsStore.options.localization.previousYear);
                switcher.setAttribute('title', this.optionsStore.options.localization.selectYear);
                next.setAttribute('title', this.optionsStore.options.localization.nextYear);
                break;
            case Namespace.css.daysContainer:
                previous.setAttribute('title', this.optionsStore.options.localization.previousMonth);
                switcher.setAttribute('title', this.optionsStore.options.localization.selectMonth);
                next.setAttribute('title', this.optionsStore.options.localization.nextMonth);
                switcher.setAttribute(showing, this.optionsStore.viewDate.format(this.optionsStore.options.localization.dayViewHeaderFormat));
                break;
        }
        switcher.innerText = switcher.getAttribute(showing);
    }
    /**
     * Hides the picker if needed.
     * Remove document click event to hide when clicking outside the picker.
     * fires Events#hide
     */
    hide() {
        if (!this.widget || !this._isVisible)
            return;
        this.widget.classList.remove(Namespace.css.show);
        if (this._isVisible) {
            this._eventEmitters.triggerEvent.emit({
                type: Namespace.events.hide,
                date: this.optionsStore.unset ? null : this.dates.lastPicked?.clone,
            });
            this._isVisible = false;
        }
        document.removeEventListener('click', this._documentClickEvent);
    }
    /**
     * Toggles the picker's open state. Fires a show/hide event depending.
     */
    toggle() {
        return this._isVisible ? this.hide() : this.show();
    }
    /**
     * Removes document and data-action click listener and reset the widget
     * @private
     */
    _dispose() {
        document.removeEventListener('click', this._documentClickEvent);
        if (!this.widget)
            return;
        this.widget
            .querySelectorAll('[data-action]')
            .forEach((element) => element.removeEventListener('click', this._actionsClickEvent));
        this.widget.parentNode.removeChild(this.widget);
        this._widget = undefined;
    }
    /**
     * Builds the widgets html template.
     * @private
     */
    _buildWidget() {
        const template = document.createElement('div');
        template.classList.add(Namespace.css.widget);
        const dateView = document.createElement('div');
        dateView.classList.add(Namespace.css.dateContainer);
        dateView.append(this.getHeadTemplate(), this.decadeDisplay.getPicker(), this.yearDisplay.getPicker(), this.monthDisplay.getPicker(), this.dateDisplay.getPicker());
        const timeView = document.createElement('div');
        timeView.classList.add(Namespace.css.timeContainer);
        timeView.appendChild(this.timeDisplay.getPicker(this._iconTag.bind(this)));
        timeView.appendChild(this.hourDisplay.getPicker());
        timeView.appendChild(this.minuteDisplay.getPicker());
        timeView.appendChild(this.secondDisplay.getPicker());
        const toolbar = document.createElement('div');
        toolbar.classList.add(Namespace.css.toolbar);
        toolbar.append(...this.getToolbarElements());
        if (this.optionsStore.options.display.inline) {
            template.classList.add(Namespace.css.inline);
        }
        if (this.optionsStore.options.display.calendarWeeks) {
            template.classList.add('calendarWeeks');
        }
        if (this.optionsStore.options.display.sideBySide && this._hasDateAndTime) {
            this._buildWidgetSideBySide(template, dateView, timeView, toolbar);
            return;
        }
        if (this.optionsStore.options.display.toolbarPlacement === 'top') {
            template.appendChild(toolbar);
        }
        const setupComponentView = (hasFirst, hasSecond, element, shouldShow) => {
            if (!hasFirst)
                return;
            if (hasSecond) {
                element.classList.add(Namespace.css.collapse);
                if (shouldShow)
                    element.classList.add(Namespace.css.show);
            }
            template.appendChild(element);
        };
        setupComponentView(this._hasDate, this._hasTime, dateView, this.optionsStore.options.display.viewMode !== 'clock');
        setupComponentView(this._hasTime, this._hasDate, timeView, this.optionsStore.options.display.viewMode === 'clock');
        if (this.optionsStore.options.display.toolbarPlacement === 'bottom') {
            template.appendChild(toolbar);
        }
        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        arrow.setAttribute('data-popper-arrow', '');
        template.appendChild(arrow);
        this._widget = template;
    }
    _buildWidgetSideBySide(template, dateView, timeView, toolbar) {
        template.classList.add(Namespace.css.sideBySide);
        if (this.optionsStore.options.display.toolbarPlacement === 'top') {
            template.appendChild(toolbar);
        }
        const row = document.createElement('div');
        row.classList.add('td-row');
        dateView.classList.add('td-half');
        timeView.classList.add('td-half');
        row.appendChild(dateView);
        row.appendChild(timeView);
        template.appendChild(row);
        if (this.optionsStore.options.display.toolbarPlacement === 'bottom') {
            template.appendChild(toolbar);
        }
        this._widget = template;
    }
    /**
     * Returns true if the hours, minutes, or seconds component is turned on
     */
    get _hasTime() {
        return (this.optionsStore.options.display.components.clock &&
            (this.optionsStore.options.display.components.hours ||
                this.optionsStore.options.display.components.minutes ||
                this.optionsStore.options.display.components.seconds));
    }
    /**
     * Returns true if the year, month, or date component is turned on
     */
    get _hasDate() {
        return (this.optionsStore.options.display.components.calendar &&
            (this.optionsStore.options.display.components.year ||
                this.optionsStore.options.display.components.month ||
                this.optionsStore.options.display.components.date));
    }
    get _hasDateAndTime() {
        return this._hasDate && this._hasTime;
    }
    /**
     * Get the toolbar html based on options like buttons => today
     * @private
     */
    getToolbarElements() {
        const toolbar = [];
        if (this.optionsStore.options.display.buttons.today) {
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.today);
            div.setAttribute('title', this.optionsStore.options.localization.today);
            div.appendChild(this._iconTag(this.optionsStore.options.display.icons.today));
            toolbar.push(div);
        }
        if (!this.optionsStore.options.display.sideBySide &&
            this._hasDate &&
            this._hasTime) {
            let title, icon;
            if (this.optionsStore.options.display.viewMode === 'clock') {
                title = this.optionsStore.options.localization.selectDate;
                icon = this.optionsStore.options.display.icons.date;
            }
            else {
                title = this.optionsStore.options.localization.selectTime;
                icon = this.optionsStore.options.display.icons.time;
            }
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.togglePicker);
            div.setAttribute('title', title);
            div.appendChild(this._iconTag(icon));
            toolbar.push(div);
        }
        if (this.optionsStore.options.display.buttons.clear) {
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.clear);
            div.setAttribute('title', this.optionsStore.options.localization.clear);
            div.appendChild(this._iconTag(this.optionsStore.options.display.icons.clear));
            toolbar.push(div);
        }
        if (this.optionsStore.options.display.buttons.close) {
            const div = document.createElement('div');
            div.setAttribute('data-action', ActionTypes$1.close);
            div.setAttribute('title', this.optionsStore.options.localization.close);
            div.appendChild(this._iconTag(this.optionsStore.options.display.icons.close));
            toolbar.push(div);
        }
        return toolbar;
    }
    /***
     * Builds the base header template with next and previous icons
     * @private
     */
    getHeadTemplate() {
        const calendarHeader = document.createElement('div');
        calendarHeader.classList.add(Namespace.css.calendarHeader);
        const previous = document.createElement('div');
        previous.classList.add(Namespace.css.previous);
        previous.setAttribute('data-action', ActionTypes$1.previous);
        previous.appendChild(this._iconTag(this.optionsStore.options.display.icons.previous));
        const switcher = document.createElement('div');
        switcher.classList.add(Namespace.css.switch);
        switcher.setAttribute('data-action', ActionTypes$1.changeCalendarView);
        const next = document.createElement('div');
        next.classList.add(Namespace.css.next);
        next.setAttribute('data-action', ActionTypes$1.next);
        next.appendChild(this._iconTag(this.optionsStore.options.display.icons.next));
        calendarHeader.append(previous, switcher, next);
        return calendarHeader;
    }
    /**
     * Builds an icon tag as either an `<i>`
     * or with icons => type is `sprites` then a svg tag instead
     * @param iconClass
     * @private
     */
    _iconTag(iconClass) {
        if (this.optionsStore.options.display.icons.type === 'sprites') {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            icon.setAttribute('xlink:href', iconClass); // Deprecated. Included for backward compatibility
            icon.setAttribute('href', iconClass);
            svg.appendChild(icon);
            return svg;
        }
        const icon = document.createElement('i');
        icon.classList.add(...iconClass.split(' '));
        return icon;
    }
    /**
     * Causes the widget to get rebuilt on next show. If the picker is already open
     * then hide and reshow it.
     * @private
     */
    _rebuild() {
        const wasVisible = this._isVisible;
        this._dispose();
        if (wasVisible)
            this.show();
    }
    refreshCurrentView() {
        //if the widget is not showing, just destroy it
        if (!this._isVisible)
            this._dispose();
        switch (this.optionsStore.currentView) {
            case 'clock':
                this._update('clock');
                break;
            case 'calendar':
                this._update(Unit.date);
                break;
            case 'months':
                this._update(Unit.month);
                break;
            case 'years':
                this._update(Unit.year);
                break;
            case 'decades':
                this._update('decade');
                break;
        }
    }
}

/**
 * Logic for various click actions
 */
class Actions {
    constructor() {
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.dates = serviceLocator.locate(Dates);
        this.validation = serviceLocator.locate(Validation);
        this.display = serviceLocator.locate(Display);
        this._eventEmitters = serviceLocator.locate(EventEmitters);
        this._eventEmitters.action.subscribe((result) => {
            this.do(result.e, result.action);
        });
    }
    /**
     * Performs the selected `action`. See ActionTypes
     * @param e This is normally a click event
     * @param action If not provided, then look for a [data-action]
     */
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    do(e, action) {
        const currentTarget = e?.currentTarget;
        if (currentTarget?.classList?.contains(Namespace.css.disabled))
            return;
        action = action || currentTarget?.dataset?.action;
        const lastPicked = (this.dates.lastPicked || this.optionsStore.viewDate)
            .clone;
        switch (action) {
            case ActionTypes$1.next:
            case ActionTypes$1.previous:
                this.handleNextPrevious(action);
                break;
            case ActionTypes$1.changeCalendarView:
                this.display._showMode(1);
                this.display._updateCalendarHeader();
                break;
            case ActionTypes$1.selectMonth:
            case ActionTypes$1.selectYear:
            case ActionTypes$1.selectDecade:
                this.handleSelectCalendarMode(action, currentTarget);
                break;
            case ActionTypes$1.selectDay:
                this.handleSelectDay(currentTarget);
                break;
            case ActionTypes$1.selectHour: {
                let hour = +currentTarget.dataset.value;
                if (lastPicked.hours >= 12 && this.optionsStore.isTwelveHour)
                    hour += 12;
                lastPicked.hours = hour;
                this.dates.setValue(lastPicked, this.dates.lastPickedIndex);
                this.hideOrClock(e);
                break;
            }
            case ActionTypes$1.selectMinute: {
                lastPicked.minutes = +currentTarget.dataset.value;
                this.dates.setValue(lastPicked, this.dates.lastPickedIndex);
                this.hideOrClock(e);
                break;
            }
            case ActionTypes$1.selectSecond: {
                lastPicked.seconds = +currentTarget.dataset.value;
                this.dates.setValue(lastPicked, this.dates.lastPickedIndex);
                this.hideOrClock(e);
                break;
            }
            case ActionTypes$1.incrementHours:
                this.manipulateAndSet(lastPicked, Unit.hours);
                break;
            case ActionTypes$1.incrementMinutes:
                this.manipulateAndSet(lastPicked, Unit.minutes, this.optionsStore.options.stepping);
                break;
            case ActionTypes$1.incrementSeconds:
                this.manipulateAndSet(lastPicked, Unit.seconds);
                break;
            case ActionTypes$1.decrementHours:
                this.manipulateAndSet(lastPicked, Unit.hours, -1);
                break;
            case ActionTypes$1.decrementMinutes:
                this.manipulateAndSet(lastPicked, Unit.minutes, this.optionsStore.options.stepping * -1);
                break;
            case ActionTypes$1.decrementSeconds:
                this.manipulateAndSet(lastPicked, Unit.seconds, -1);
                break;
            case ActionTypes$1.toggleMeridiem:
                this.manipulateAndSet(lastPicked, Unit.hours, this.dates.lastPicked.hours >= 12 ? -12 : 12);
                break;
            case ActionTypes$1.togglePicker:
                this.handleToggle(currentTarget);
                break;
            case ActionTypes$1.showClock:
            case ActionTypes$1.showHours:
            case ActionTypes$1.showMinutes:
            case ActionTypes$1.showSeconds:
                //make sure the clock is actually displaying
                if (!this.optionsStore.options.display.sideBySide &&
                    this.optionsStore.currentView !== 'clock') {
                    //hide calendar
                    Collapse.hideImmediately(this.display.dateContainer);
                    //show clock
                    Collapse.showImmediately(this.display.timeContainer);
                }
                this.handleShowClockContainers(action);
                break;
            case ActionTypes$1.clear:
                this.dates.setValue(null);
                this.display._updateCalendarHeader();
                break;
            case ActionTypes$1.close:
                this.display.hide();
                break;
            case ActionTypes$1.today: {
                const today = new DateTime().setLocalization(this.optionsStore.options.localization);
                this._eventEmitters.updateViewDate.emit(today);
                //todo this this really a good idea?
                if (this.validation.isValid(today, Unit.date))
                    this.dates.setValue(today, this.dates.lastPickedIndex);
                break;
            }
        }
    }
    handleShowClockContainers(action) {
        if (!this.display._hasTime) {
            Namespace.errorMessages.throwError('Cannot show clock containers when time is disabled.');
            /* ignore coverage: should never happen */
            return;
        }
        this.optionsStore.currentView = 'clock';
        this.display.widget
            .querySelectorAll(`.${Namespace.css.timeContainer} > div`)
            .forEach((htmlElement) => (htmlElement.style.display = 'none'));
        let classToUse = '';
        switch (action) {
            case ActionTypes$1.showClock:
                classToUse = Namespace.css.clockContainer;
                this.display._update('clock');
                break;
            case ActionTypes$1.showHours:
                classToUse = Namespace.css.hourContainer;
                this.display._update(Unit.hours);
                break;
            case ActionTypes$1.showMinutes:
                classToUse = Namespace.css.minuteContainer;
                this.display._update(Unit.minutes);
                break;
            case ActionTypes$1.showSeconds:
                classToUse = Namespace.css.secondContainer;
                this.display._update(Unit.seconds);
                break;
        }
        (this.display.widget.getElementsByClassName(classToUse)[0]).style.display = 'grid';
    }
    handleNextPrevious(action) {
        const { unit, step } = CalendarModes[this.optionsStore.currentCalendarViewMode];
        if (action === ActionTypes$1.next)
            this.optionsStore.viewDate.manipulate(step, unit);
        else
            this.optionsStore.viewDate.manipulate(step * -1, unit);
        this._eventEmitters.viewUpdate.emit();
        this.display._showMode();
    }
    /**
     * After setting the value it will either show the clock or hide the widget.
     * @param e
     */
    hideOrClock(e) {
        if (!this.optionsStore.isTwelveHour &&
            !this.optionsStore.options.display.components.minutes &&
            !this.optionsStore.options.display.keepOpen &&
            !this.optionsStore.options.display.inline) {
            this.display.hide();
        }
        else {
            this.do(e, ActionTypes$1.showClock);
        }
    }
    /**
     * Common function to manipulate {@link lastPicked} by `unit`.
     * @param lastPicked
     * @param unit
     * @param value Value to change by
     */
    manipulateAndSet(lastPicked, unit, value = 1) {
        const newDate = lastPicked.manipulate(value, unit);
        if (this.validation.isValid(newDate, unit)) {
            this.dates.setValue(newDate, this.dates.lastPickedIndex);
        }
    }
    handleSelectCalendarMode(action, currentTarget) {
        const value = +currentTarget.dataset.value;
        switch (action) {
            case ActionTypes$1.selectMonth:
                this.optionsStore.viewDate.month = value;
                break;
            case ActionTypes$1.selectYear:
            case ActionTypes$1.selectDecade:
                this.optionsStore.viewDate.year = value;
                break;
        }
        this.dates.setValue(this.optionsStore.viewDate, this.dates.lastPickedIndex);
        if (this.optionsStore.currentCalendarViewMode ===
            this.optionsStore.minimumCalendarViewMode) {
            if (!this.optionsStore.options.display.inline) {
                this.display.hide();
            }
        }
        else {
            this.display._showMode(-1);
        }
    }
    handleToggle(currentTarget) {
        if (currentTarget.getAttribute('title') ===
            this.optionsStore.options.localization.selectDate) {
            currentTarget.setAttribute('title', this.optionsStore.options.localization.selectTime);
            currentTarget.innerHTML = this.display._iconTag(this.optionsStore.options.display.icons.time).outerHTML;
            this.display._updateCalendarHeader();
            this.optionsStore.refreshCurrentView();
        }
        else {
            currentTarget.setAttribute('title', this.optionsStore.options.localization.selectDate);
            currentTarget.innerHTML = this.display._iconTag(this.optionsStore.options.display.icons.date).outerHTML;
            if (this.display._hasTime) {
                this.handleShowClockContainers(ActionTypes$1.showClock);
                this.display._update('clock');
            }
        }
        this.display.widget
            .querySelectorAll(`.${Namespace.css.dateContainer}, .${Namespace.css.timeContainer}`)
            .forEach((htmlElement) => Collapse.toggle(htmlElement));
        this._eventEmitters.viewUpdate.emit();
    }
    handleSelectDay(currentTarget) {
        const day = this.optionsStore.viewDate.clone;
        if (currentTarget.classList.contains(Namespace.css.old)) {
            day.manipulate(-1, Unit.month);
        }
        if (currentTarget.classList.contains(Namespace.css.new)) {
            day.manipulate(1, Unit.month);
        }
        day.date = +currentTarget.dataset.day;
        if (this.optionsStore.options.dateRange)
            this.handleDateRange(day);
        else if (this.optionsStore.options.multipleDates) {
            this.handleMultiDate(day);
        }
        else {
            this.dates.setValue(day, this.dates.lastPickedIndex);
        }
        if (!this.display._hasTime &&
            !this.optionsStore.options.display.keepOpen &&
            !this.optionsStore.options.display.inline &&
            !this.optionsStore.options.multipleDates &&
            !this.optionsStore.options.dateRange) {
            this.display.hide();
        }
    }
    handleMultiDate(day) {
        let index = this.dates.pickedIndex(day, Unit.date);
        console.log(index);
        if (index !== -1) {
            this.dates.setValue(null, index); //deselect multi-date
        }
        else {
            index = this.dates.lastPickedIndex + 1;
            if (this.dates.picked.length === 0)
                index = 0;
            this.dates.setValue(day, index);
        }
    }
    handleDateRange(day) {
        switch (this.dates.picked.length) {
            case 2: {
                this.dates.clear();
                break;
            }
            case 1: {
                const other = this.dates.picked[0];
                if (day.getTime() === other.getTime()) {
                    this.dates.clear();
                    break;
                }
                if (day.isBefore(other)) {
                    this.dates.setValue(day, 0);
                    this.dates.setValue(other, 1);
                    return;
                }
                else {
                    this.dates.setValue(day, 1);
                    return;
                }
            }
        }
        this.dates.setValue(day, 0);
    }
}

/**
 * A robust and powerful date/time picker component.
 */
class TempusDominus {
    constructor(element, options = {}) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._subscribers = {};
        this._isDisabled = false;
        /**
         * Event for when the input field changes. This is a class level method so there's
         * something for the remove listener function.
         * @private
         */
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._inputChangeEvent = (event) => {
            const internallyTriggered = event?.detail;
            if (internallyTriggered)
                return;
            const setViewDate = () => {
                if (this.dates.lastPicked)
                    this.optionsStore.viewDate = this.dates.lastPicked.clone;
            };
            const value = this.optionsStore.input.value;
            if (this.optionsStore.options.multipleDates) {
                try {
                    const valueSplit = value.split(this.optionsStore.options.multipleDatesSeparator);
                    for (let i = 0; i < valueSplit.length; i++) {
                        this.dates.setFromInput(valueSplit[i], i);
                    }
                    setViewDate();
                }
                catch {
                    console.warn('TD: Something went wrong trying to set the multipleDates values from the input field.');
                }
            }
            else {
                this.dates.setFromInput(value, 0);
                setViewDate();
            }
        };
        /**
         * Event for when the toggle is clicked. This is a class level method so there's
         * something for the remove listener function.
         * @private
         */
        this._toggleClickEvent = () => {
            if (this.optionsStore.element?.disabled ||
                this.optionsStore.input?.disabled ||
                //if we just have the input and allow input toggle is enabled, then don't cause a toggle
                (this._toggle.nodeName === 'INPUT' &&
                    this._toggle?.type === 'text' &&
                    this.optionsStore.options.allowInputToggle))
                return;
            this.toggle();
        };
        /**
         * Event for when the toggle is clicked. This is a class level method so there's
         * something for the remove listener function.
         * @private
         */
        this._openClickEvent = () => {
            if (this.optionsStore.element?.disabled ||
                this.optionsStore.input?.disabled)
                return;
            if (!this.display.isVisible)
                this.show();
        };
        setupServiceLocator();
        this._eventEmitters = serviceLocator.locate(EventEmitters);
        this.optionsStore = serviceLocator.locate(OptionsStore);
        this.display = serviceLocator.locate(Display);
        this.dates = serviceLocator.locate(Dates);
        this.actions = serviceLocator.locate(Actions);
        if (!element) {
            Namespace.errorMessages.mustProvideElement();
        }
        this.optionsStore.element = element;
        this._initializeOptions(options, DefaultOptions, true);
        this.optionsStore.viewDate.setLocalization(this.optionsStore.options.localization);
        this.optionsStore.unset = true;
        this._initializeInput();
        this._initializeToggle();
        if (this.optionsStore.options.display.inline)
            this.display.show();
        this._eventEmitters.triggerEvent.subscribe((e) => {
            this._triggerEvent(e);
        });
        this._eventEmitters.viewUpdate.subscribe(() => {
            this._viewUpdate();
        });
        this._eventEmitters.updateViewDate.subscribe((dateTime) => {
            this.viewDate = dateTime;
        });
    }
    get viewDate() {
        return this.optionsStore.viewDate;
    }
    set viewDate(value) {
        this.optionsStore.viewDate = value;
        this.optionsStore.viewDate.setLocalization(this.optionsStore.options.localization);
        this.display._update(this.optionsStore.currentView === 'clock' ? 'clock' : 'calendar');
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Update the picker options. If `reset` is provide `options` will be merged with DefaultOptions instead.
     * @param options
     * @param reset
     * @public
     */
    updateOptions(options, reset = false) {
        if (reset)
            this._initializeOptions(options, DefaultOptions);
        else
            this._initializeOptions(options, this.optionsStore.options);
        this.optionsStore.viewDate.setLocalization(this.optionsStore.options.localization);
        this.display.refreshCurrentView();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Toggles the picker open or closed. If the picker is disabled, nothing will happen.
     * @public
     */
    toggle() {
        if (this._isDisabled)
            return;
        this.display.toggle();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Shows the picker unless the picker is disabled.
     * @public
     */
    show() {
        if (this._isDisabled)
            return;
        this.display.show();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Hides the picker unless the picker is disabled.
     * @public
     */
    hide() {
        this.display.hide();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Disables the picker and the target input field.
     * @public
     */
    disable() {
        this._isDisabled = true;
        // todo this might be undesired. If a dev disables the input field to
        // only allow using the picker, this will break that.
        this.optionsStore.input?.setAttribute('disabled', 'disabled');
        this.display.hide();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Enables the picker and the target input field.
     * @public
     */
    enable() {
        this._isDisabled = false;
        this.optionsStore.input?.removeAttribute('disabled');
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Clears all the selected dates
     * @public
     */
    clear() {
        this.optionsStore.input.value = '';
        this.dates.clear();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Allows for a direct subscription to picker events, without having to use addEventListener on the element.
     * @param eventTypes See Namespace.Events
     * @param callbacks Function to call when event is triggered
     * @public
     */
    subscribe(eventTypes, callbacks //eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        if (typeof eventTypes === 'string') {
            eventTypes = [eventTypes];
        }
        let callBackArray; //eslint-disable-line @typescript-eslint/no-explicit-any
        if (!Array.isArray(callbacks)) {
            callBackArray = [callbacks];
        }
        else {
            callBackArray = callbacks;
        }
        if (eventTypes.length !== callBackArray.length) {
            Namespace.errorMessages.subscribeMismatch();
        }
        const returnArray = [];
        for (let i = 0; i < eventTypes.length; i++) {
            const eventType = eventTypes[i];
            if (!Array.isArray(this._subscribers[eventType])) {
                this._subscribers[eventType] = [];
            }
            this._subscribers[eventType].push(callBackArray[i]);
            returnArray.push({
                unsubscribe: this._unsubscribe.bind(this, eventType, this._subscribers[eventType].length - 1),
            });
            if (eventTypes.length === 1) {
                return returnArray[0];
            }
        }
        return returnArray;
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Hides the picker and removes event listeners
     */
    dispose() {
        this.display.hide();
        // this will clear the document click event listener
        this.display._dispose();
        this._eventEmitters.destroy();
        this.optionsStore.input?.removeEventListener('change', this._inputChangeEvent);
        if (this.optionsStore.options.allowInputToggle) {
            this.optionsStore.input?.removeEventListener('click', this._openClickEvent);
            this.optionsStore.input?.removeEventListener('focus', this._openClickEvent);
        }
        this._toggle?.removeEventListener('click', this._toggleClickEvent);
        this._subscribers = {};
    }
    /**
     * Updates the options to use the provided language.
     * THe language file must be loaded first.
     * @param language
     */
    locale(language) {
        const asked = loadedLocales[language];
        if (!asked)
            return;
        this.updateOptions({
            localization: asked,
        });
    }
    /**
     * Triggers an event like ChangeEvent when the picker has updated the value
     * of a selected date.
     * @param event Accepts a BaseEvent object.
     * @private
     */
    _triggerEvent(event) {
        event.viewMode = this.optionsStore.currentView;
        const isChangeEvent = event.type === Namespace.events.change;
        if (isChangeEvent) {
            const { date, oldDate, isClear } = event;
            if ((date && oldDate && date.isSame(oldDate)) ||
                (!isClear && !date && !oldDate)) {
                return;
            }
            this._handleAfterChangeEvent(event);
            this.optionsStore.input?.dispatchEvent(
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            new CustomEvent('change', { detail: event }));
        }
        this.optionsStore.element.dispatchEvent(
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        new CustomEvent(event.type, { detail: event }));
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (window.jQuery) {
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            const $ = window.jQuery;
            if (isChangeEvent && this.optionsStore.input) {
                $(this.optionsStore.input).trigger(event);
            }
            else {
                $(this.optionsStore.element).trigger(event);
            }
        }
        this._publish(event);
    }
    _publish(event) {
        // return if event is not subscribed
        if (!Array.isArray(this._subscribers[event.type])) {
            return;
        }
        // Trigger callback for each subscriber
        this._subscribers[event.type].forEach((callback) => {
            callback(event);
        });
    }
    /**
     * Fires a ViewUpdate event when, for example, the month view is changed.
     * @private
     */
    _viewUpdate() {
        this._triggerEvent({
            type: Namespace.events.update,
            viewDate: this.optionsStore.viewDate.clone,
        });
    }
    _unsubscribe(eventName, index) {
        this._subscribers[eventName].splice(index, 1);
    }
    /**
     * Merges two Option objects together and validates options type
     * @param config new Options
     * @param mergeTo Options to merge into
     * @param includeDataset When true, the elements data-td attributes will be included in the
     * @private
     */
    _initializeOptions(config, mergeTo, includeDataset = false) {
        let newConfig = OptionConverter.deepCopy(config);
        newConfig = OptionConverter._mergeOptions(newConfig, mergeTo);
        if (includeDataset)
            newConfig = OptionConverter._dataToOptions(this.optionsStore.element, newConfig);
        OptionConverter._validateConflicts(newConfig);
        newConfig.viewDate = newConfig.viewDate.setLocalization(newConfig.localization);
        if (!this.optionsStore.viewDate.isSame(newConfig.viewDate)) {
            this.optionsStore.viewDate = newConfig.viewDate;
        }
        /**
         * Sets the minimum view allowed by the picker. For example the case of only
         * allowing year and month to be selected but not date.
         */
        if (newConfig.display.components.year) {
            this.optionsStore.minimumCalendarViewMode = 2;
        }
        if (newConfig.display.components.month) {
            this.optionsStore.minimumCalendarViewMode = 1;
        }
        if (newConfig.display.components.date) {
            this.optionsStore.minimumCalendarViewMode = 0;
        }
        this.optionsStore.currentCalendarViewMode = Math.max(this.optionsStore.minimumCalendarViewMode, this.optionsStore.currentCalendarViewMode);
        // Update view mode if needed
        if (CalendarModes[this.optionsStore.currentCalendarViewMode].name !==
            newConfig.display.viewMode) {
            this.optionsStore.currentCalendarViewMode = Math.max(CalendarModes.findIndex((x) => x.name === newConfig.display.viewMode), this.optionsStore.minimumCalendarViewMode);
        }
        if (this.display?.isVisible) {
            this.display._update('all');
        }
        if (newConfig.display.components.useTwentyfourHour &&
            newConfig.localization.hourCycle === undefined)
            newConfig.localization.hourCycle = 'h24';
        else if (newConfig.localization.hourCycle === undefined) {
            newConfig.localization.hourCycle = guessHourCycle(newConfig.localization.locale);
        }
        if (newConfig.restrictions.maxDate &&
            this.viewDate.isAfter(newConfig.restrictions.maxDate))
            this.viewDate = newConfig.restrictions.maxDate;
        if (newConfig.restrictions.minDate &&
            this.viewDate.isBefore(newConfig.restrictions.minDate))
            this.viewDate = newConfig.restrictions.minDate;
        this.optionsStore.options = newConfig;
    }
    /**
     * Checks if an input field is being used, attempts to locate one and sets an
     * event listener if found.
     * @private
     */
    _initializeInput() {
        if (this.optionsStore.element.tagName == 'INPUT') {
            this.optionsStore.input = this.optionsStore.element;
        }
        else {
            const query = this.optionsStore.element.dataset.tdTargetInput;
            if (query == undefined || query == 'nearest') {
                this.optionsStore.input =
                    this.optionsStore.element.querySelector('input');
            }
            else {
                this.optionsStore.input =
                    this.optionsStore.element.querySelector(query);
            }
        }
        if (!this.optionsStore.input)
            return;
        if (!this.optionsStore.input.value && this.optionsStore.options.defaultDate)
            this.optionsStore.input.value = this.dates.formatInput(this.optionsStore.options.defaultDate);
        this.optionsStore.input.addEventListener('change', this._inputChangeEvent);
        if (this.optionsStore.options.allowInputToggle) {
            this.optionsStore.input.addEventListener('click', this._openClickEvent);
            this.optionsStore.input.addEventListener('focus', this._openClickEvent);
        }
        if (this.optionsStore.input.value) {
            this._inputChangeEvent();
        }
    }
    /**
     * Attempts to locate a toggle for the picker and sets an event listener
     * @private
     */
    _initializeToggle() {
        if (this.optionsStore.options.display.inline)
            return;
        let query = this.optionsStore.element.dataset.tdTargetToggle;
        if (query == 'nearest') {
            query = '[data-td-toggle="datetimepicker"]';
        }
        this._toggle =
            query == undefined
                ? this.optionsStore.element
                : this.optionsStore.element.querySelector(query);
        this._toggle.addEventListener('click', this._toggleClickEvent);
    }
    /**
     * If the option is enabled this will render the clock view after a date pick.
     * @param e change event
     * @private
     */
    _handleAfterChangeEvent(e) {
        if (
        // options is disabled
        !this.optionsStore.options.promptTimeOnDateChange ||
            this.optionsStore.options.multipleDates ||
            this.optionsStore.options.display.inline ||
            this.optionsStore.options.display.sideBySide ||
            // time is disabled
            !this.display._hasTime ||
            // clock component is already showing
            this.display.widget
                ?.getElementsByClassName(Namespace.css.show)[0]
                .classList.contains(Namespace.css.timeContainer))
            return;
        // First time ever. If useCurrent option is set to true (default), do nothing
        // because the first date is selected automatically.
        // or date didn't change (time did) or date changed because time did.
        if ((!e.oldDate && this.optionsStore.options.useCurrent) ||
            (e.oldDate && e.date?.isSame(e.oldDate))) {
            return;
        }
        clearTimeout(this._currentPromptTimeTimeout);
        this._currentPromptTimeTimeout = setTimeout(() => {
            if (this.display.widget) {
                this._eventEmitters.action.emit({
                    e: {
                        currentTarget: this.display.widget.querySelector('[data-action="togglePicker"]'),
                    },
                    action: ActionTypes$1.togglePicker,
                });
            }
        }, this.optionsStore.options.promptTimeOnDateChangeTransitionDelay);
    }
}
/**
 * Whenever a locale is loaded via a plugin then store it here based on the
 * locale name. E.g. loadedLocales['ru']
 */
const loadedLocales = {};
// noinspection JSUnusedGlobalSymbols
/**
 * Called from a locale plugin.
 * @param l locale object for localization options
 */
const loadLocale = (l) => {
    if (loadedLocales[l.name])
        return;
    loadedLocales[l.name] = l.localization;
};
/**
 * A sets the global localization options to the provided locale name.
 * `loadLocale` MUST be called first.
 * @param l
 */
const locale = (l) => {
    const asked = loadedLocales[l];
    if (!asked)
        return;
    DefaultOptions.localization = asked;
};
// noinspection JSUnusedGlobalSymbols
/**
 * Called from a plugin to extend or override picker defaults.
 * @param plugin
 * @param option
 */
const extend = function (plugin, option = undefined) {
    if (!plugin)
        return tempusDominus;
    if (!plugin.installed) {
        // install plugin only once
        plugin(option, { TempusDominus, Dates, Display, DateTime, Namespace }, tempusDominus);
        plugin.installed = true;
    }
    return tempusDominus;
};
const version = '6.7.13';
const tempusDominus = {
    TempusDominus,
    extend,
    loadLocale,
    locale,
    Namespace,
    DefaultOptions,
    DateTime,
    Unit,
    version,
    DefaultEnLocalization,
};


//# sourceMappingURL=tempus-dominus.esm.js.map


/***/ }),

/***/ "./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts":
/*!**************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseIDEAspect: () => (/* binding */ BaseIDEAspect),
/* harmony export */   FOMR_BUILDER_PATH_STRING: () => (/* binding */ FOMR_BUILDER_PATH_STRING),
/* harmony export */   getFormBuilderFieldPath: () => (/* binding */ getFormBuilderFieldPath)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ObjectHelpers */ "./src/WebBased/IDEAspects/BaseClasses/ObjectHelpers.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");




// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }
const FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
function getFormBuilderFieldPath(formBuilderField) {
    return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}
class BaseIDEAspect {
    /**
     * Base Constructor for all IDEAspects, forces the implementation of the load and save methods
     * @param componentName //The name of the component e.g. Aspect.QuickView
     * @param loadSaveLocation //The location to load and save the data from e.g. model.aspect.FormBuilder.formData
     * @param element //The element that the aspect is bound to
     * @param configuration //The configuration passed in from the blade and the design time configuration
     * @param baseModel //The base model passed in from the blade
     * @param defaults //The defaults passed in from the widget to set incase of bad configuration or missing configuration
     */
    constructor(componentName, loadSaveLocation, element, configuration, baseModel) {
        this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
        this.LocationToSaveOrLoadData = loadSaveLocation;
        this.thisComponentName = componentName;
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration;
        this.baseModel = baseModel;
        this.defaults = this.setDefaults(); //setup the default by calling the abstract method in the child class
        // this.data = undefined;
        // Merge the configuration with the defaults
        this.configuration = $.extend(this.defaults, this.originalConfiguration);
        this.element = element;
        //create a new model
        this.model = this.configuration._host.model;
        this.enabled = this.model.canEdit;
        this.blade = this.configuration._host.blade;
        this.loaded = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false);
        // Map the base model properties
        this.sharedoId = this.configuration._host?.model.id;
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName = this.configuration._host.model.sharedoTypeSystemName;
        if (!this.sharedoTypeSystemName || this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }
        this.options = (0,_KOConverter__WEBPACK_IMPORTED_MODULE_1__.toObservableObject)(this.configuration);
        // Validation
        this.validation = {};
        this.validationErrorCount = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0);
        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave(); //setup the location to load and save the data from by calling the abstract method in the child class
    }
    get data() {
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }
        let nestedData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.getNestedProperty)(this.model, this.LocationToSaveOrLoadData);
        this.log("Data found at location", "green", nestedData);
        let retValue = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(nestedData);
        this.log("Data found at location", "green", retValue);
        return retValue;
    }
    set data(value) {
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to save data to set - this method should be overriden", "red");
            this._data = value;
            return;
        }
        let valueToSet = value;
        // if(this.LocationToSaveOrLoadData.includes("formBuilder"))
        // {
        //     //formbuilder Data always need to be string
        //     this.log("Setting formbuilder data - converting to string", "green", value)
        //     valueToSet = JSON.stringify(value);
        //     this.log("after Setting formbuilder data - converted to string", "green", valueToSet)
        // }
        this.log("Setting data at location", "green", valueToSet);
        (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.setNestedProperty)(this.model, this.LocationToSaveOrLoadData, valueToSet);
    }
    /**
     * Called by the aspect IDE adapter when the model is saved. Manipulate the
     * model as required.
     */
    onSave(model) {
        this.log("Saving, model passed in we need to persist to", "green", this.data);
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to save data to set - this method should be overriden", "red");
            return;
        }
        let dataToPersist = this.data;
        let currentData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.getNestedProperty)(model, this.LocationToSaveOrLoadData);
        if (currentData) {
            this.log(`Current data at location ${this.LocationToSaveOrLoadData} :`, "magenta", currentData);
        }
        if (!currentData) {
            // this.log("Data does not exist, we will create", "orange");
            //  setNestedProperty(model, this.LocationToSaveOrLoadData, {});
            // currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        }
        this.log(`New data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
        (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.setNestedProperty)(model, this.LocationToSaveOrLoadData, dataToPersist);
    }
    ;
    onDestroy(model) {
        this.log("IDEAspects.Example : onDestroy");
    }
    ;
    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {
        this.log("IDEAspects.Example : loadAndBind");
        this.log("Loading data (model:any) passed in", "green");
        this.log("Loading data based on location to save", "green", this.LocationToSaveOrLoadData);
    }
    ;
    /**
     * Called by the aspect IDE adapter before the model is saved
     */
    onBeforeSave(model) {
        this.log("IDEAspects.Example : onBeforeSave");
    }
    /**
     * Called by the aspect IDE adapter after the model has been saved.
     */
    onAfterSave(model) {
        this.log("IDEAspects.Example : onAfterSave");
    }
    /**
     * Called by the aspect IDE adapter when it reloads aspect data
     */
    onReload(model) {
        this.log("IDEAspects.Example : onReload");
    }
    /**
     * Provides logging for the component based on the debug configuration
     * @param message
     * @param color
     * @param data
     */
    log(message, color, data) {
        if (this.configuration.debug?.enabled) {
            if (this.configuration.debug.logToConsole) {
                if (!color)
                    color = "black";
                // let lineNo = extractLineNumberFromStack((new Error()).stack);
                console.log(`%c ${this.thisComponentName} - ${message}`, `color:${color}`, data);
            }
        }
    }
    /**
     *
     * @returns Formbuild if it exists or creates it if it does not
     *
     */
    formbuilder() {
        if (!this.blade?.model?.aspectData?.formBuilder?.formData) {
            this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
        }
        else {
            this.log("blade.model.aspectData.formBuilder.formData found", "green");
        }
        //Ensure the path exists
        this.blade = this.blade || {};
        this.blade.model = this.blade.model || {};
        this.blade.model.aspectData = this.blade.model.aspectData || {};
        this.blade.model.aspectData.formBuilder = this.blade.model.aspectData.formBuilder || { formData: {} };
        return this.blade.model.aspectData.formBuilder.formData;
    }
    formbuilderField(formbuilderField, setValue) {
        if (!this.formbuilder()) {
            this.log("Form builder does not exist! ", "red");
            throw new Error("Form builder does not exist!");
        }
        let foundValue = this.formbuilder()[formbuilderField];
        if (!foundValue) {
            this.log(`Form builder does not contain field ${formbuilderField} `, "orange");
            this.log(`Creating field ${formbuilderField} `, "blue");
            this.formbuilder()[formbuilderField] = undefined;
        }
        //Are we doing a set
        if (setValue) {
            this.log(`Setting ${formbuilderField} to ${setValue}`, "green");
            this.formbuilder()[formbuilderField] = setValue;
            return setValue;
        }
        return foundValue;
    }
}


/***/ }),

/***/ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts":
/*!************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toObservableObject: () => (/* binding */ toObservableObject)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);

function toObservableObject(obj) {
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            //check if obj[key] is already a observable
            if (knockout__WEBPACK_IMPORTED_MODULE_0__.isObservable(obj[key])) {
                result[key] = obj[key];
                continue;
            }
            result[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(obj[key]);
        }
    }
    return result;
}


/***/ }),

/***/ "./src/WebBased/IDEAspects/BaseClasses/ObjectHelpers.ts":
/*!**************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/ObjectHelpers.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNestedProperty: () => (/* binding */ getNestedProperty),
/* harmony export */   setNestedProperty: () => (/* binding */ setNestedProperty)
/* harmony export */ });
function setNestedProperty(obj, propertyPath, value) {
    const properties = propertyPath.split('.');
    let current = obj;
    for (let i = 0; i < properties.length - 1; i++) {
        const prop = properties[i];
        if (!current[prop]) {
            current[prop] = {};
        }
        current = current[prop];
    }
    current[properties[properties.length - 1]] = value;
}
function getNestedProperty(obj, propertyPath) {
    const properties = propertyPath.split('.');
    let current = obj;
    for (const prop of properties) {
        if (current[prop] === undefined) {
            return undefined;
        }
        current = current[prop];
    }
    return current;
}


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "knockout":
/*!*********************!*\
  !*** external "ko" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = ko;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "IDEAspects:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/_ideFiles/IDEAspects/DatePickerAspect/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"DatePickerAspect": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkIDEAspects"] = self["webpackChunkIDEAspects"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************************************************************!*\
  !*** ./src/WebBased/IDEAspects/DatePickerAspect/DatePickerAspect.ts ***!
  \**********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatePickerAspect: () => (/* binding */ DatePickerAspect)
/* harmony export */ });
/* harmony import */ var _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eonasdan/tempus-dominus */ "./node_modules/@eonasdan/tempus-dominus/dist/js/tempus-dominus.esm.js");
/* harmony import */ var _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseClasses/BaseIDEAspect */ "./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts");


let thisWidgetSystemName = "DatePickerAspect";
//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css
document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`);
class DatePickerAspect extends _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_1__.BaseIDEAspect {
    constructor(element, configuration, baseModel) {
        super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel);
    }
    //Abstract methods - must be implemented by the derived class
    setDefaults() {
        return {
            // Aspect widget config parameters
            title: undefined,
            formBuilderField: undefined,
            pickerEnabled: true,
            eventToFireOnUpdate: ["IDEAspects.DatePickerAspect.Update"],
            defaultDateFromNowHours: 3,
            datePickerOptions: {
                display: {
                    inline: true,
                    sideBySide: true,
                    theme: "light"
                }
            },
            debug: {
                enabled: false,
                logToConsole: false,
                showInAspect: false
            }
        };
    }
    //Abstract methods - must be implemented by the derived class
    setLocationOfDataToLoadAndSave() {
        if (!this.configuration.formBuilderField) {
            this.log("No formbuilder field set in configuration - check aspect configuration", "red");
            throw new Error("No formbuilder field set in configuration - check aspect configuration");
        }
        return (0,_BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_1__.getFormBuilderFieldPath)(this.configuration.formBuilderField);
    }
    setPickerEnabledState(newValue) {
        if (!this.datePickerDiv) {
            return;
        }
        if (newValue) {
            this.datePickerDiv.classList.toggle("disabled", false);
        }
        else {
            this.datePickerDiv.classList.toggle("disabled", true);
        }
    }
    /**
     * Sanatise the data before saving, form build data needs to be a string
     */
    set modelDataAsDate(newValue) {
        this.data = newValue?.toISOString() || undefined;
    }
    /**
     * Gets the data from form builder and converts to DateTime
     */
    get modelDataAsDate() {
        let retValue;
        let foundValue = this.data;
        if (!foundValue) {
            foundValue = this.generateDefaultDate();
        }
        retValue = this.ensureDate(foundValue);
        this.modelDataAsDate = retValue; //set the value to ensure it is valid
        return retValue;
    }
    /**
     * @returns get today date + defaultDateFromNowHours (if set in configuration)
     */
    generateDefaultDate() {
        let defaultDate = new _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime(_eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime.now());
        if (this.configuration.defaultDateFromNowHours) {
            defaultDate.setHours(defaultDate.getHours() + this.configuration.defaultDateFromNowHours);
        }
        return defaultDate;
    }
    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {
        if (this.element === undefined) {
            return;
        }
        let element = this.element.querySelector(".IDEAspects-DatePickerAspect");
        if (!element) {
            this.log("No element found", "red");
            return;
        }
        //check if already exists remove it
        if (this.datePickerDiv) {
            this.log("Already exists", "red");
            this.datePickerDiv.remove();
            return;
        }
        //Build the date picker div 
        this.datePickerDiv = document.createElement("div");
        this.datePickerDiv.classList.add("the-picker");
        this.datePickerDiv.classList.add("log-event");
        this.datePickerDiv.id = this.uniqueId;
        let input = document.createElement("input");
        input.id = this.uniqueId + "Input";
        input.type = "text";
        input.classList.add("form-control");
        input.setAttribute("data-td-target", "#" + this.uniqueId);
        this.datePickerDiv.appendChild(input);
        // let span = document.createElement("span");
        // span.classList.add("input-group-text");
        // span.setAttribute("data-td-target", "#" + this.uniqueId);
        // span.setAttribute("data-td-toggle", "datetimepicker");
        // let i = document.createElement("i"); 
        // i.classList.add("fas");
        // i.classList.add("fa-calendar");
        // span.appendChild(i); 
        // this.datePickerDiv.appendChild(span);
        element.appendChild(this.datePickerDiv);
        this.dateTimePicker = new _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.TempusDominus(this.datePickerDiv, this.options.datePickerOptions() || {});
        this.options.datePickerOptions.subscribe((newValue) => {
            this.loadAndBind();
        });
        this.setPickerEnabledState(this.options.pickerEnabled());
        //Set the value of the picker to the value in the model
        this.dateTimePicker.dates.setValue(this.modelDataAsDate, this.dateTimePicker.dates.lastPickedIndex);
        this.dateTimePicker.subscribe("change.td", (e) => {
            this.log("Date Changed", "red", e);
            this.options.eventToFireOnUpdate()?.forEach((event) => {
                $ui.events.broadcast(event, {
                    source: this,
                    formbuilderField: this.formbuilderField,
                    value: this.getCurrentSelectedDate()
                }); //fire event and pass in the date
            });
            this.modelDataAsDate = this.getCurrentSelectedDate();
        });
    }
    ;
    /**
     * Ensure the date is a valid date
        * @param d
        * @returns a DateTime based on the input or a default date if the input is not valid
    **/
    ensureDate(d) {
        let retValue;
        //check if d is a date
        if (d instanceof _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime) {
            return d;
        }
        try {
            retValue = new _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime(_eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime.parse(d));
            if (!_eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime.isValid(retValue)) {
                retValue = this.generateDefaultDate();
                ;
            }
        }
        catch (e) {
            this.log(`Unable to parse date ${d} (setting date to default date) - check aspect configuration `, "red");
            retValue = this.generateDefaultDate();
        }
        return retValue;
    }
    load(model) {
        this.log("Load");
    }
    ;
    reload(model) {
        this.log("Reload");
    }
    ;
    getCurrentSelectedDate() {
        return this.dateTimePicker?.dates.picked[0];
    }
    onSave(model) {
        this.log("Save");
        this.modelDataAsDate = this.getCurrentSelectedDate();
        super.onSave(model);
    }
}

})();

var __webpack_export_target__ = (IDEAspects = typeof IDEAspects === "undefined" ? {} : IDEAspects);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlckFzcGVjdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsV0FBVyxxQkFBcUIsWUFBWTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFVBQVUsSUFBSSxzQkFBc0I7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFdBQVcsMkJBQTJCLFlBQVksOEJBQThCLFNBQVMsdUJBQXVCLHdCQUF3QjtBQUM3SztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsV0FBVyxrQkFBa0IsWUFBWSxnQkFBZ0IsU0FBUywwQkFBMEIsYUFBYTtBQUM5STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFdBQVcsRUFBRSxZQUFZLHNDQUFzQyxPQUFPLE1BQU0sTUFBTTtBQUN2SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsV0FBVyw2QkFBNkIsS0FBSyxrQkFBa0IsV0FBVztBQUMvRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsV0FBVztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFdBQVc7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsV0FBVyxxREFBcUQsUUFBUTtBQUM3RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxXQUFXLHNCQUFzQixRQUFRO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsV0FBVztBQUNuQztBQUNBO0FBQ0Esd0JBQXdCLFdBQVcsVUFBVSxTQUFTLHlEQUF5RCxZQUFZO0FBQzNIO0FBQ0E7QUFDQSxxQ0FBcUMsV0FBVyxFQUFFLFFBQVE7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixTQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDLDZCQUE2QixTQUFTO0FBQ3RDLDZCQUE2QixTQUFTO0FBQ3RDLGlDQUFpQyxTQUFTO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLEtBQUs7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG1CQUFtQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMkNBQTJDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdDQUFnQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQWdEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MseUJBQXlCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxnQkFBZ0I7QUFDekU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMkJBQTJCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQkFBa0I7QUFDM0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMkJBQTJCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQkFBa0I7QUFDM0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsb0JBQW9CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHlDQUF5QztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsc0NBQXNDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE1BQU07QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1Q0FBdUM7QUFDekU7QUFDQTtBQUNBLDZCQUE2QixVQUFVO0FBQ3ZDLDZCQUE2QixVQUFVO0FBQ3ZDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCw2QkFBNkI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZSxRQUFRLGdOQUF3QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw2QkFBNkIsYUFBYSw2QkFBNkIsTUFBTSw2QkFBNkIsYUFBYSw2QkFBNkI7QUFDdEw7QUFDQTtBQUNBLHFEQUFxRCx5QkFBeUI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsNkJBQTZCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsNkJBQTZCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDZCQUE2QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxrQkFBa0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsNEJBQTRCLEtBQUssNEJBQTRCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHVCQUF1QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsZUFBZTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZUFBZTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QixDQUFDO0lBQUEsQ0FBQztJQUVGLHNCQUFzQjtRQUNsQixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRWUsTUFBTSxDQUFDLEtBQVU7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3JELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztDQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9AZW9uYXNkYW4vdGVtcHVzLWRvbWludXMvZGlzdC9qcy90ZW1wdXMtZG9taW51cy5lc20uanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3QudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0tPQ29udmVydGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9PYmplY3RIZWxwZXJzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvZXh0ZXJuYWwgdmFyIFwia29cIiIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9EYXRlUGlja2VyQXNwZWN0L0RhdGVQaWNrZXJBc3BlY3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gICogVGVtcHVzIERvbWludXMgdjYuNy4xMyAoaHR0cHM6Ly9nZXRkYXRlcGlja2VyLmNvbS8pXG4gICogQ29weXJpZ2h0IDIwMTMtMjAyMyBKb25hdGhhbiBQZXRlcnNvblxuICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL0VvbmFzZGFuL3RlbXB1cy1kb21pbnVzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICovXG5jbGFzcyBUZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuY2xhc3MgRXJyb3JNZXNzYWdlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYmFzZSA9ICdURDonO1xuICAgICAgICAvLyNlbmRyZWdpb25cbiAgICAgICAgLy8jcmVnaW9uIHVzZWQgd2l0aCBub3RpZnkuZXJyb3JcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZWQgd2l0aCBhbiBFcnJvciBFdmVudCB0eXBlIGlmIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlIHRoYXRcbiAgICAgICAgICogZmFpbHMgcmVzdHJpY3Rpb24gdmFsaWRhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmFpbGVkVG9TZXRJbnZhbGlkRGF0ZSA9ICdGYWlsZWQgdG8gc2V0IGludmFsaWQgZGF0ZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2VkIHdpdGggYW4gRXJyb3IgRXZlbnQgdHlwZSB3aGVuIGEgdXNlciBjaGFuZ2VzIHRoZSB2YWx1ZSBvZiB0aGVcbiAgICAgICAgICogaW5wdXQgZmllbGQgZGlyZWN0bHksIGFuZCBkb2VzIG5vdCBwcm92aWRlIGEgdmFsaWQgZGF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmFpbGVkVG9QYXJzZUlucHV0ID0gJ0ZhaWxlZCBwYXJzZSBpbnB1dCBmaWVsZCc7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgIH1cbiAgICAvLyNyZWdpb24gb3V0IHRvIGNvbnNvbGVcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaW5kaWNhdGluZyB0aGF0IGEga2V5IGluIHRoZSBvcHRpb25zIG9iamVjdCBpcyBpbnZhbGlkLlxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lXG4gICAgICovXG4gICAgdW5leHBlY3RlZE9wdGlvbihvcHRpb25OYW1lKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBVbmV4cGVjdGVkIG9wdGlvbjogJHtvcHRpb25OYW1lfSBkb2VzIG5vdCBtYXRjaCBhIGtub3duIG9wdGlvbi5gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDE7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaW5kaWNhdGluZyB0aGF0IG9uZSBtb3JlIGtleXMgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IGlzIGludmFsaWQuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKi9cbiAgICB1bmV4cGVjdGVkT3B0aW9ucyhvcHRpb25OYW1lKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfTogJHtvcHRpb25OYW1lLmpvaW4oJywgJyl9YCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSAxO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIHdoZW4gYW4gb3B0aW9uIGlzIHByb3ZpZGUgYW4gdW5zdXBwb3J0ZWQgdmFsdWUuXG4gICAgICogRm9yIGV4YW1wbGUgYSB2YWx1ZSBvZiAnY2hlZXNlJyBmb3IgdG9vbGJhclBsYWNlbWVudCB3aGljaCBvbmx5IHN1cHBvcnRzXG4gICAgICogJ3RvcCcsICdib3R0b20nLCAnZGVmYXVsdCcuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKiBAcGFyYW0gYmFkVmFsdWVcbiAgICAgKiBAcGFyYW0gdmFsaWRPcHRpb25zXG4gICAgICovXG4gICAgdW5leHBlY3RlZE9wdGlvblZhbHVlKG9wdGlvbk5hbWUsIGJhZFZhbHVlLCB2YWxpZE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IFVuZXhwZWN0ZWQgb3B0aW9uIHZhbHVlOiAke29wdGlvbk5hbWV9IGRvZXMgbm90IGFjY2VwdCBhIHZhbHVlIG9mIFwiJHtiYWRWYWx1ZX1cIi4gVmFsaWQgdmFsdWVzIGFyZTogJHt2YWxpZE9wdGlvbnMuam9pbignLCAnKX1gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDI7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3Igd2hlbiBhbiBvcHRpb24gdmFsdWUgaXMgdGhlIHdyb25nIHR5cGUuXG4gICAgICogRm9yIGV4YW1wbGUgYSBzdHJpbmcgdmFsdWUgd2FzIHByb3ZpZGVkIHRvIG11bHRpcGxlRGF0ZXMgd2hpY2ggb25seVxuICAgICAqIHN1cHBvcnRzIHRydWUgb3IgZmFsc2UuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKiBAcGFyYW0gYmFkVHlwZVxuICAgICAqIEBwYXJhbSBleHBlY3RlZFR5cGVcbiAgICAgKi9cbiAgICB0eXBlTWlzbWF0Y2gob3B0aW9uTmFtZSwgYmFkVHlwZSwgZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBNaXNtYXRjaCB0eXBlczogJHtvcHRpb25OYW1lfSBoYXMgYSB0eXBlIG9mICR7YmFkVHlwZX0gaW5zdGVhZCBvZiB0aGUgcmVxdWlyZWQgJHtleHBlY3RlZFR5cGV9YCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSAzO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIHdoZW4gYW4gb3B0aW9uIHZhbHVlIGlzICBvdXRzaWRlIG9mIHRoZSBleHBlY3RlZCByYW5nZS5cbiAgICAgKiBGb3IgZXhhbXBsZSByZXN0cmljdGlvbnMuZGF5c09mV2Vla0Rpc2FibGVkIGV4Y2VwdHMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDYuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKiBAcGFyYW0gbG93ZXJcbiAgICAgKiBAcGFyYW0gdXBwZXJcbiAgICAgKi9cbiAgICBudW1iZXJzT3V0T2ZSYW5nZShvcHRpb25OYW1lLCBsb3dlciwgdXBwZXIpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9ICR7b3B0aW9uTmFtZX0gZXhwZWN0ZWQgYW4gYXJyYXkgb2YgbnVtYmVyIGJldHdlZW4gJHtsb3dlcn0gYW5kICR7dXBwZXJ9LmApO1xuICAgICAgICBlcnJvci5jb2RlID0gNDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciB3aGVuIGEgdmFsdWUgZm9yIGEgZGF0ZSBvcHRpb25zIGNvdWxkbid0IGJlIHBhcnNlZC4gRWl0aGVyXG4gICAgICogdGhlIG9wdGlvbiB3YXMgYW4gaW52YWxpZCBzdHJpbmcgb3IgYW4gaW52YWxpZCBEYXRlIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZVxuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICogQHBhcmFtIHNvZnQgSWYgdHJ1ZSwgbG9ncyBhIHdhcm5pbmcgaW5zdGVhZCBvZiBhbiBlcnJvci5cbiAgICAgKi9cbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZmFpbGVkVG9QYXJzZURhdGUob3B0aW9uTmFtZSwgZGF0ZSwgc29mdCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBDb3VsZCBub3QgY29ycmVjdGx5IHBhcnNlIFwiJHtkYXRlfVwiIHRvIGEgZGF0ZSBmb3IgJHtvcHRpb25OYW1lfS5gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDU7XG4gICAgICAgIGlmICghc29mdClcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3Mgd2hlbiBhbiBlbGVtZW50IHRvIGF0dGFjaCB0byB3YXMgbm90IHByb3ZpZGVkIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBtdXN0UHJvdmlkZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBObyBlbGVtZW50IHdhcyBwcm92aWRlZC5gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDY7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgaWYgcHJvdmlkaW5nIGFuIGFycmF5IGZvciB0aGUgZXZlbnRzIHRvIHN1YnNjcmliZSBtZXRob2QgZG9lc24ndCBoYXZlXG4gICAgICogdGhlIHNhbWUgbnVtYmVyIG9mIGNhbGxiYWNrcy4gRS5nLiwgc3Vic2NyaWJlKFsxLDJdLCBbMV0pXG4gICAgICovXG4gICAgc3Vic2NyaWJlTWlzbWF0Y2goKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBUaGUgc3Vic2NyaWJlZCBldmVudHMgZG9lcyBub3QgbWF0Y2ggdGhlIG51bWJlciBvZiBjYWxsYmFja3NgKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDc7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgaWYgdGhlIGNvbmZpZ3VyYXRpb24gaGFzIGNvbmZsaWN0aW5nIHJ1bGVzIGUuZy4gbWluRGF0ZSBpcyBhZnRlciBtYXhEYXRlXG4gICAgICovXG4gICAgY29uZmxpY3RpbmdDb25maWd1cmF0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IEEgY29uZmlndXJhdGlvbiB2YWx1ZSBjb25mbGljdHMgd2l0aCBhbm90aGVyIHJ1bGUuICR7bWVzc2FnZX1gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDg7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjdXN0b21EYXRlRm9ybWF0IGVycm9yc1xuICAgICAqL1xuICAgIGN1c3RvbURhdGVGb3JtYXRFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBDdXN0b20gRGF0ZSBGb3JtYXQ6ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2dzIGEgd2FybmluZyBpZiBhIGRhdGUgb3B0aW9uIHZhbHVlIGlzIHByb3ZpZGVkIGFzIGEgc3RyaW5nLCBpbnN0ZWFkIG9mXG4gICAgICogYSBkYXRlL2RhdGV0aW1lIG9iamVjdC5cbiAgICAgKi9cbiAgICBkYXRlU3RyaW5nKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5iYXNlfSBVc2luZyBhIHN0cmluZyBmb3IgZGF0ZSBvcHRpb25zIGlzIG5vdCByZWNvbW1lbmRlZCB1bmxlc3MgeW91IHNwZWNpZnkgYW4gSVNPIHN0cmluZyBvciB1c2UgdGhlIGN1c3RvbURhdGVGb3JtYXQgcGx1Z2luLmApO1xuICAgIH1cbiAgICBkZXByZWNhdGVkV2FybmluZyhtZXNzYWdlLCByZW1lZGlhdGlvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5iYXNlfSBXYXJuaW5nICR7bWVzc2FnZX0gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24uICR7cmVtZWRpYXRpb259YCk7XG4gICAgfVxuICAgIHRocm93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gJHttZXNzYWdlfWApO1xuICAgICAgICBlcnJvci5jb2RlID0gOTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG4vLyB0aGlzIGlzIG5vdCB0aGUgd2F5IEkgd2FudCB0aGlzIHRvIHN0YXkgYnV0IG5lc3RlZCBjbGFzc2VzIHNlZW1lZCB0byBibG93biB1cCBvbmNlIGl0cyBjb21waWxlZC5cbmNvbnN0IE5BTUUgPSAndGVtcHVzLWRvbWludXMnLCBkYXRhS2V5ID0gJ3RkJztcbi8qKlxuICogRXZlbnRzXG4gKi9cbmNsYXNzIEV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMua2V5ID0gYC4ke2RhdGFLZXl9YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoYW5nZSBldmVudC4gRmlyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZS5cbiAgICAgICAgICogU2VlIGFsc28gRXZlbnRUeXBlcy5DaGFuZ2VFdmVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jaGFuZ2UgPSBgY2hhbmdlJHt0aGlzLmtleX1gO1xuICAgICAgICAvKipcbiAgICAgICAgICogRW1pdCB3aGVuIHRoZSB2aWV3IGNoYW5nZXMgZm9yIGV4YW1wbGUgZnJvbSBtb250aCB2aWV3IHRvIHRoZSB5ZWFyIHZpZXcuXG4gICAgICAgICAqIFNlZSBhbHNvIEV2ZW50VHlwZXMuVmlld1VwZGF0ZUV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnVwZGF0ZSA9IGB1cGRhdGUke3RoaXMua2V5fWA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbWl0cyB3aGVuIGEgc2VsZWN0ZWQgZGF0ZSBvciB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBmaWVsZCBmYWlscyB0byBtZWV0IHRoZSBwcm92aWRlZCB2YWxpZGF0aW9uIHJ1bGVzLlxuICAgICAgICAgKiBTZWUgYWxzbyBFdmVudFR5cGVzLkZhaWxFdmVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lcnJvciA9IGBlcnJvciR7dGhpcy5rZXl9YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3cgZXZlbnRcbiAgICAgICAgICogQGV2ZW50IEV2ZW50cyNzaG93XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNob3cgPSBgc2hvdyR7dGhpcy5rZXl9YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhpZGUgZXZlbnRcbiAgICAgICAgICogQGV2ZW50IEV2ZW50cyNoaWRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhpZGUgPSBgaGlkZSR7dGhpcy5rZXl9YDtcbiAgICAgICAgLy8gYmx1ciBhbmQgZm9jdXMgYXJlIHVzZWQgaW4gdGhlIGpRdWVyeSBwcm92aWRlciBidXQgYXJlIG90aGVyd2lzZSB1bnVzZWQuXG4gICAgICAgIC8vIGtleXVwL2Rvd24gd2lsbCBiZSB1c2VkIGxhdGVyIGZvciBrZXliaW5kaW5nIG9wdGlvbnNcbiAgICAgICAgdGhpcy5ibHVyID0gYGJsdXIke3RoaXMua2V5fWA7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBgZm9jdXMke3RoaXMua2V5fWA7XG4gICAgICAgIHRoaXMua2V5dXAgPSBga2V5dXAke3RoaXMua2V5fWA7XG4gICAgICAgIHRoaXMua2V5ZG93biA9IGBrZXlkb3duJHt0aGlzLmtleX1gO1xuICAgIH1cbn1cbmNsYXNzIENzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2lkZ2V0ID0gYCR7TkFNRX0td2lkZ2V0YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhvbGQgdGhlIHByZXZpb3VzLCBuZXh0IGFuZCBzd2l0Y2hlciBkaXZzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhbGVuZGFySGVhZGVyID0gJ2NhbGVuZGFyLWhlYWRlcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZWxlbWVudCBmb3IgdGhlIGFjdGlvbiB0byBjaGFuZ2UgdGhlIGNhbGVuZGFyIHZpZXcuIEUuZy4gbW9udGggLT4geWVhci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3dpdGNoID0gJ3BpY2tlci1zd2l0Y2gnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVsZW1lbnRzIGZvciBhbGwgdGhlIHRvb2xiYXIgb3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50b29sYmFyID0gJ3Rvb2xiYXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGhlIGhvdmVyIGFuZCByb3VuZGluZyBhZmZlY3QuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5vSGlnaGxpZ2h0ID0gJ25vLWhpZ2hsaWdodCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSB3aWRnZXQgZWxlbWVudCB3aGVuIHRoZSBzaWRlIGJ5IHNpZGUgb3B0aW9uIGlzIGluIHVzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2lkZUJ5U2lkZSA9ICd0aW1lcGlja2VyLXNicyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZWxlbWVudCBmb3IgdGhlIGFjdGlvbiB0byBjaGFuZ2UgdGhlIGNhbGVuZGFyIHZpZXcsIGUuZy4gQXVndXN0IC0+IEp1bHlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucHJldmlvdXMgPSAncHJldmlvdXMnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVsZW1lbnQgZm9yIHRoZSBhY3Rpb24gdG8gY2hhbmdlIHRoZSBjYWxlbmRhciB2aWV3LCBlLmcuIEF1Z3VzdCAtPiBTZXB0ZW1iZXJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmV4dCA9ICduZXh0JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gYW55IGFjdGlvbiB0aGF0IHdvdWxkIHZpb2xhdGUgYW55IHJlc3RyaWN0aW9uIG9wdGlvbnMuIEFMc28gYXBwbGllZFxuICAgICAgICAgKiB0byBhbiBpbnB1dCBmaWVsZCBpZiB0aGUgZGlzYWJsZWQgZnVuY3Rpb24gaXMgY2FsbGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9ICdkaXNhYmxlZCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGFueSBkYXRlIHRoYXQgaXMgbGVzcyB0aGFuIHJlcXVlc3RlZCB2aWV3LFxuICAgICAgICAgKiBlLmcuIHRoZSBsYXN0IGRheSBvZiB0aGUgcHJldmlvdXMgbW9udGguXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9sZCA9ICdvbGQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBhbnkgZGF0ZSB0aGF0IGlzIGdyZWF0ZXIgdGhhbiBvZiByZXF1ZXN0ZWQgdmlldyxcbiAgICAgICAgICogZS5nLiB0aGUgbGFzdCBkYXkgb2YgdGhlIHByZXZpb3VzIG1vbnRoLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uZXcgPSAnbmV3JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gYW55IGRhdGUgdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmFjdGl2ZSA9ICdhY3RpdmUnO1xuICAgICAgICAvLyNyZWdpb24gZGF0ZSBlbGVtZW50XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIGNhbGVuZGFyIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRhdGVDb250YWluZXIgPSAnZGF0ZS1jb250YWluZXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBkZWNhZGVzIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRlY2FkZXNDb250YWluZXIgPSBgJHt0aGlzLmRhdGVDb250YWluZXJ9LWRlY2FkZXNgO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlbGVtZW50cyB3aXRoaW4gdGhlIGRlY2FkZSBjb250YWluZXIsIGUuZy4gMjAyMCwgMjAzMFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZWNhZGUgPSAnZGVjYWRlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgeWVhcnMgdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMueWVhcnNDb250YWluZXIgPSBgJHt0aGlzLmRhdGVDb250YWluZXJ9LXllYXJzYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gZWxlbWVudHMgd2l0aGluIHRoZSB5ZWFycyBjb250YWluZXIsIGUuZy4gMjAyMSwgMjAyMVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy55ZWFyID0gJ3llYXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBtb250aCB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb250aHNDb250YWluZXIgPSBgJHt0aGlzLmRhdGVDb250YWluZXJ9LW1vbnRoc2A7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGVsZW1lbnRzIHdpdGhpbiB0aGUgbW9udGggY29udGFpbmVyLCBlLmcuIEphbnVhcnksIEZlYnJ1YXJ5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vbnRoID0gJ21vbnRoJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgY2FsZW5kYXIgdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGF5c0NvbnRhaW5lciA9IGAke3RoaXMuZGF0ZUNvbnRhaW5lcn0tZGF5c2A7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGVsZW1lbnRzIHdpdGhpbiB0aGUgZGF5IGNvbnRhaW5lciwgZS5nLiAxLCAyLi4zMVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kYXkgPSAnZGF5JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGRpc3BsYXkuY2FsZW5kYXJXZWVrcyBpcyBlbmFibGVkLCBhIGNvbHVtbiBkaXNwbGF5aW5nIHRoZSB3ZWVrIG9mIHllYXJcbiAgICAgICAgICogaXMgc2hvd24uIFRoaXMgY2xhc3MgaXMgYXBwbGllZCB0byBlYWNoIGNlbGwgaW4gdGhhdCBjb2x1bW4uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhbGVuZGFyV2Vla3MgPSAnY3cnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgZmlyc3Qgcm93IG9mIHRoZSBjYWxlbmRhciB2aWV3LCBlLmcuIFN1bmRheSwgTW9uZGF5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRheU9mVGhlV2VlayA9ICdkb3cnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgY3VycmVudCBkYXRlIG9uIHRoZSBjYWxlbmRhciB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50b2RheSA9ICd0b2RheSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSBsb2NhbGUncyB3ZWVrZW5kIGRhdGVzIG9uIHRoZSBjYWxlbmRhciB2aWV3LCBlLmcuIFN1bmRheSwgU2F0dXJkYXlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2Vla2VuZCA9ICd3ZWVrZW5kJztcbiAgICAgICAgdGhpcy5yYW5nZUluID0gJ3JhbmdlLWluJztcbiAgICAgICAgdGhpcy5yYW5nZVN0YXJ0ID0gJ3JhbmdlLXN0YXJ0JztcbiAgICAgICAgdGhpcy5yYW5nZUVuZCA9ICdyYW5nZS1lbmQnO1xuICAgICAgICAvLyNlbmRyZWdpb25cbiAgICAgICAgLy8jcmVnaW9uIHRpbWUgZWxlbWVudFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIGFsbCB0aW1lIHJlbGF0ZWQgZWxlbWVudHMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRpbWVDb250YWluZXIgPSAndGltZS1jb250YWluZXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0aGUgc2VwYXJhdG9yIGNvbHVtbnMgYmV0d2VlbiB0aW1lIGVsZW1lbnRzLCBlLmcuIGhvdXIgKjoqIG1pbnV0ZSAqOiogc2Vjb25kXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlcGFyYXRvciA9ICdzZXBhcmF0b3InO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBjbG9jayB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbG9ja0NvbnRhaW5lciA9IGAke3RoaXMudGltZUNvbnRhaW5lcn0tY2xvY2tgO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBob3VycyBzZWxlY3Rpb24gdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaG91ckNvbnRhaW5lciA9IGAke3RoaXMudGltZUNvbnRhaW5lcn0taG91cmA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIG1pbnV0ZXMgc2VsZWN0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1pbnV0ZUNvbnRhaW5lciA9IGAke3RoaXMudGltZUNvbnRhaW5lcn0tbWludXRlYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgc2Vjb25kcyBzZWxlY3Rpb24gdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2Vjb25kQ29udGFpbmVyID0gYCR7dGhpcy50aW1lQ29udGFpbmVyfS1zZWNvbmRgO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlYWNoIGVsZW1lbnQgaW4gdGhlIGhvdXJzIHNlbGVjdGlvbiB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ob3VyID0gJ2hvdXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlYWNoIGVsZW1lbnQgaW4gdGhlIG1pbnV0ZXMgc2VsZWN0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1pbnV0ZSA9ICdtaW51dGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlYWNoIGVsZW1lbnQgaW4gdGhlIHNlY29uZHMgc2VsZWN0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlY29uZCA9ICdzZWNvbmQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCBBTS9QTSB0b2dnbGUgYnV0dG9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50b2dnbGVNZXJpZGllbSA9ICd0b2dnbGVNZXJpZGllbSc7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvLyNyZWdpb24gY29sbGFwc2VcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdGhlIGVsZW1lbnQgb2YgdGhlIGN1cnJlbnQgdmlldyBtb2RlLCBlLmcuIGNhbGVuZGFyIG9yIGNsb2NrLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zaG93ID0gJ3Nob3cnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgY3VycmVudGx5IHNob3dpbmcgdmlldyBtb2RlIGR1cmluZyBhIHRyYW5zaXRpb25cbiAgICAgICAgICogYmV0d2VlbiBjYWxlbmRhciBhbmQgY2xvY2sgdmlld3NcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29sbGFwc2luZyA9ICd0ZC1jb2xsYXBzaW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIGN1cnJlbnRseSBoaWRkZW4gdmlldyBtb2RlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb2xsYXBzZSA9ICd0ZC1jb2xsYXBzZSc7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgd2lkZ2V0IHdoZW4gdGhlIG9wdGlvbiBkaXNwbGF5LmlubGluZSBpcyBlbmFibGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbmxpbmUgPSAnaW5saW5lJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIHdpZGdldCB3aGVuIHRoZSBvcHRpb24gZGlzcGxheS50aGVtZSBpcyBsaWdodC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGlnaHRUaGVtZSA9ICdsaWdodCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSB3aWRnZXQgd2hlbiB0aGUgb3B0aW9uIGRpc3BsYXkudGhlbWUgaXMgZGFyay5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGFya1RoZW1lID0gJ2RhcmsnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVXNlZCBmb3IgZGV0ZWN0aW5nIGlmIHRoZSBzeXN0ZW0gY29sb3IgcHJlZmVyZW5jZSBpcyBkYXJrIG1vZGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNEYXJrUHJlZmVycmVkUXVlcnkgPSAnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSc7XG4gICAgfVxufVxuY2xhc3MgTmFtZXNwYWNlIHtcbn1cbk5hbWVzcGFjZS5OQU1FID0gTkFNRTtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbk5hbWVzcGFjZS5kYXRhS2V5ID0gZGF0YUtleTtcbk5hbWVzcGFjZS5ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG5OYW1lc3BhY2UuY3NzID0gbmV3IENzcygpO1xuTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMgPSBuZXcgRXJyb3JNZXNzYWdlcygpO1xuXG5jb25zdCBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uID0ge1xuICAgIGRhdGVGb3JtYXRzOiB7XG4gICAgICAgIExUUzogJ2g6bW06c3MgVCcsXG4gICAgICAgIExUOiAnaDptbSBUJyxcbiAgICAgICAgTDogJ01NL2RkL3l5eXknLFxuICAgICAgICBMTDogJ01NTU0gZCwgeXl5eScsXG4gICAgICAgIExMTDogJ01NTU0gZCwgeXl5eSBoOm1tIFQnLFxuICAgICAgICBMTExMOiAnZGRkZCwgTU1NTSBkLCB5eXl5IGg6bW0gVCcsXG4gICAgfSxcbiAgICBmb3JtYXQ6ICdMIExUJyxcbiAgICBsb2NhbGU6ICdkZWZhdWx0JyxcbiAgICBob3VyQ3ljbGU6IHVuZGVmaW5lZCxcbiAgICBvcmRpbmFsOiAobikgPT4ge1xuICAgICAgICBjb25zdCBzID0gWyd0aCcsICdzdCcsICduZCcsICdyZCddO1xuICAgICAgICBjb25zdCB2ID0gbiAlIDEwMDtcbiAgICAgICAgcmV0dXJuIGBbJHtufSR7c1sodiAtIDIwKSAlIDEwXSB8fCBzW3ZdIHx8IHNbMF19XWA7XG4gICAgfSxcbn07XG52YXIgRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxID0geyAuLi5EZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uIH07XG5cbnZhciBVbml0O1xuKGZ1bmN0aW9uIChVbml0KSB7XG4gICAgVW5pdFtcInNlY29uZHNcIl0gPSBcInNlY29uZHNcIjtcbiAgICBVbml0W1wibWludXRlc1wiXSA9IFwibWludXRlc1wiO1xuICAgIFVuaXRbXCJob3Vyc1wiXSA9IFwiaG91cnNcIjtcbiAgICBVbml0W1wiZGF0ZVwiXSA9IFwiZGF0ZVwiO1xuICAgIFVuaXRbXCJtb250aFwiXSA9IFwibW9udGhcIjtcbiAgICBVbml0W1wieWVhclwiXSA9IFwieWVhclwiO1xufSkoVW5pdCB8fCAoVW5pdCA9IHt9KSk7XG5jb25zdCB0d29EaWdpdFRlbXBsYXRlID0ge1xuICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgeWVhcjogJ251bWVyaWMnLFxuICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICBzZWNvbmQ6ICcyLWRpZ2l0Jyxcbn07XG4vKipcbiAqIFJldHVybnMgYW4gSW50bCBmb3JtYXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvYmplY3RcbiAqIEBwYXJhbSB1bml0XG4gKi9cbmNvbnN0IGdldEZvcm1hdEJ5VW5pdCA9ICh1bml0KSA9PiB7XG4gICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0ZVN0eWxlOiAnc2hvcnQnIH07XG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbW9udGg6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiB7IHllYXI6ICdudW1lcmljJyB9O1xuICAgIH1cbn07XG4vKipcbiAqIEF0dGVtcHRzIHRvIGd1ZXNzIHRoZSBob3VyIGN5Y2xlIG9mIHRoZSBnaXZlbiBsb2NhbFxuICogQHBhcmFtIGxvY2FsZVxuICovXG5jb25zdCBndWVzc0hvdXJDeWNsZSA9IChsb2NhbGUpID0+IHtcbiAgICBpZiAoIWxvY2FsZSlcbiAgICAgICAgcmV0dXJuICdoMTInO1xuICAgIC8vIG5vaW5zcGVjdGlvbiBTcGVsbENoZWNraW5nSW5zcGVjdGlvblxuICAgIGNvbnN0IHRlbXBsYXRlID0ge1xuICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgICAgICBudW1iZXJpbmdTeXN0ZW06ICdsYXRuJyxcbiAgICB9O1xuICAgIGNvbnN0IGR0ID0gbmV3IERhdGVUaW1lKCkuc2V0TG9jYWxpemF0aW9uKHsgbG9jYWxlIH0pO1xuICAgIGR0LmhvdXJzID0gMDtcbiAgICBjb25zdCBzdGFydCA9IGR0LnBhcnRzKHVuZGVmaW5lZCwgdGVtcGxhdGUpLmhvdXI7XG4gICAgLy9taWRuaWdodCBpcyAxMiBzbyBlbi1VUyBzdHlsZSAxMiBBTVxuICAgIGlmIChzdGFydCA9PT0gJzEyJylcbiAgICAgICAgcmV0dXJuICdoMTInO1xuICAgIC8vbWlkbmlnaHQgaXMgMjQgaXMgZnJvbSAwMC0yNFxuICAgIGlmIChzdGFydCA9PT0gJzI0JylcbiAgICAgICAgcmV0dXJuICdoMjQnO1xuICAgIGR0LmhvdXJzID0gMjM7XG4gICAgY29uc3QgZW5kID0gZHQucGFydHModW5kZWZpbmVkLCB0ZW1wbGF0ZSkuaG91cjtcbiAgICAvL2lmIG1pZG5pZ2h0IGlzIDAwIGFuZCBob3VyIDIzIGlzIDExIHRoZW5cbiAgICBpZiAoc3RhcnQgPT09ICcwMCcgJiYgZW5kID09PSAnMTEnKVxuICAgICAgICByZXR1cm4gJ2gxMSc7XG4gICAgaWYgKHN0YXJ0ID09PSAnMDAnICYmIGVuZCA9PT0gJzIzJylcbiAgICAgICAgcmV0dXJuICdoMjMnO1xuICAgIGNvbnNvbGUud2FybihgY291bGRuJ3QgZGV0ZXJtaW5lIGhvdXIgY3ljbGUgZm9yICR7bG9jYWxlfS4gc3RhcnQ6ICR7c3RhcnR9LiBlbmQ6ICR7ZW5kfWApO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuLyoqXG4gKiBGb3IgdGhlIG1vc3QgcGFydCB0aGlzIG9iamVjdCBiZWhhdmVzIGV4YWN0bHkgdGhlIHNhbWUgd2F5XG4gKiBhcyB0aGUgbmF0aXZlIERhdGUgb2JqZWN0IHdpdGggYSBsaXR0bGUgZXh0cmEgc3BpY2UuXG4gKi9cbmNsYXNzIERhdGVUaW1lIGV4dGVuZHMgRGF0ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMubG9jYWxpemF0aW9uID0gRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxO1xuICAgICAgICB0aGlzLm5vbkxlYXBMYWRkZXIgPSBbXG4gICAgICAgICAgICAwLCAzMSwgNTksIDkwLCAxMjAsIDE1MSwgMTgxLCAyMTIsIDI0MywgMjczLCAzMDQsIDMzNCxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5sZWFwTGFkZGVyID0gWzAsIDMxLCA2MCwgOTEsIDEyMSwgMTUyLCAxODIsIDIxMywgMjQ0LCAyNzQsIDMwNSwgMzM1XTtcbiAgICAgICAgLy8jcmVnaW9uIENERiBzdHVmZlxuICAgICAgICB0aGlzLmRhdGVUaW1lUmVnZXggPSBcbiAgICAgICAgLy9pcyByZWdleCBjYW5ub3QgYmUgc2ltcGxpZmllZCBiZXlvbmQgd2hhdCBpdCBhbHJlYWR5IGlzXG4gICAgICAgIC8oXFxbW15bXFxdXSpdKXx5ezEsNH18TXsxLDR9fGR7MSw0fXxIezEsMn18aHsxLDJ9fHR8VHxtezEsMn18c3sxLDJ9fGZ7M30vZzsgLy9OT1NPTkFSXG4gICAgICAgIHRoaXMuZm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15bXFxdXSpdKXwoWy1fOi8uLCgpXFxzXSspfChUfHR8eXl5eXx5eT98TU0/TT9NP3xEb3xkZD98aGg/fEhIP3xtbT98c3M/KS9nOyAvL05PU09OQVIgaXMgcmVnZXggY2Fubm90IGJlIHNpbXBsaWZpZWQgYmV5b25kIHdoYXQgaXQgYWxyZWFkeSBpc1xuICAgICAgICB0aGlzLm1hdGNoMiA9IC9cXGRcXGQvOyAvLyAwMCAtIDk5XG4gICAgICAgIHRoaXMubWF0Y2gzID0gL1xcZHszfS87IC8vIDAwMCAtIDk5OVxuICAgICAgICB0aGlzLm1hdGNoNCA9IC9cXGR7NH0vOyAvLyAwMDAwIC0gOTk5OVxuICAgICAgICB0aGlzLm1hdGNoMXRvMiA9IC9cXGRcXGQ/LzsgLy8gMCAtIDk5XG4gICAgICAgIHRoaXMubWF0Y2hTaWduZWQgPSAvWystXT9cXGQrLzsgLy8gLWluZiAtIGluZlxuICAgICAgICB0aGlzLm1hdGNoT2Zmc2V0ID0gL1srLV1cXGRcXGQ6PyhcXGRcXGQpP3xaLzsgLy8gKzAwOjAwIC0wMDowMCArMDAwMCBvciAtMDAwMCArMDAgb3IgWlxuICAgICAgICB0aGlzLm1hdGNoV29yZCA9IC9bXlxcZF86LyxcXC0oKVxcc10rLzsgLy8gV29yZFxuICAgICAgICB0aGlzLnpvbmVFeHByZXNzaW9ucyA9IFtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hPZmZzZXQsXG4gICAgICAgICAgICAob2JqLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgIG9iai5vZmZzZXQgPSB0aGlzLm9mZnNldEZyb21TdHJpbmcoaW5wdXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5leHByZXNzaW9ucyA9IHtcbiAgICAgICAgICAgIHQ6IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoV29yZCxcbiAgICAgICAgICAgICAgICAob2piLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvamIuYWZ0ZXJub29uID0gdGhpcy5tZXJpZGllbU1hdGNoKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFQ6IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoV29yZCxcbiAgICAgICAgICAgICAgICAob2piLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvamIuYWZ0ZXJub29uID0gdGhpcy5tZXJpZGllbU1hdGNoKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGZmZjogW1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2gzLFxuICAgICAgICAgICAgICAgIChvamIsIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9qYi5taWxsaXNlY29uZHMgPSAraW5wdXQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ3NlY29uZHMnKV0sXG4gICAgICAgICAgICBzczogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdzZWNvbmRzJyldLFxuICAgICAgICAgICAgbTogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdtaW51dGVzJyldLFxuICAgICAgICAgICAgbW06IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnbWludXRlcycpXSxcbiAgICAgICAgICAgIEg6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnaG91cnMnKV0sXG4gICAgICAgICAgICBoOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ2hvdXJzJyldLFxuICAgICAgICAgICAgSEg6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnaG91cnMnKV0sXG4gICAgICAgICAgICBoaDogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdob3VycycpXSxcbiAgICAgICAgICAgIGQ6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnZGF5JyldLFxuICAgICAgICAgICAgZGQ6IFt0aGlzLm1hdGNoMiwgdGhpcy5hZGRJbnB1dCgnZGF5JyldLFxuICAgICAgICAgICAgRG86IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoV29yZCxcbiAgICAgICAgICAgICAgICAob2piLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBbb2piLmRheV0gPSBpbnB1dC5tYXRjaCgvXFxkKy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubG9jYWxpemF0aW9uLm9yZGluYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDMxOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsaXphdGlvbi5vcmRpbmFsKGkpLnJlcGxhY2UoL1tbXFxdXS9nLCAnJykgPT09IGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2piLmRheSA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIE06IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnbW9udGgnKV0sXG4gICAgICAgICAgICBNTTogW3RoaXMubWF0Y2gyLCB0aGlzLmFkZElucHV0KCdtb250aCcpXSxcbiAgICAgICAgICAgIE1NTTogW1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hXb3JkLFxuICAgICAgICAgICAgICAgIChvYmosIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRocyA9IHRoaXMuZ2V0QWxsTW9udGhzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoc1Nob3J0ID0gdGhpcy5nZXRBbGxNb250aHMoJ3Nob3J0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSAobW9udGhzU2hvcnQgfHwgbW9udGhzLm1hcCgoXykgPT4gXy5zbGljZSgwLCAzKSkpLmluZGV4T2YoaW5wdXQpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmoubW9udGggPSBtYXRjaEluZGV4ICUgMTIgfHwgbWF0Y2hJbmRleDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIE1NTU06IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoV29yZCxcbiAgICAgICAgICAgICAgICAob2JqLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb250aHMgPSB0aGlzLmdldEFsbE1vbnRocygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gbW9udGhzLmluZGV4T2YoaW5wdXQpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmoubW9udGggPSBtYXRjaEluZGV4ICUgMTIgfHwgbWF0Y2hJbmRleDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHk6IFt0aGlzLm1hdGNoU2lnbmVkLCB0aGlzLmFkZElucHV0KCd5ZWFyJyldLFxuICAgICAgICAgICAgeXk6IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoMixcbiAgICAgICAgICAgICAgICAob2JqLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvYmoueWVhciA9IHRoaXMucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgeXl5eTogW3RoaXMubWF0Y2g0LCB0aGlzLmFkZElucHV0KCd5ZWFyJyldLFxuICAgICAgICAgICAgLy8gejogdGhpcy56b25lRXhwcmVzc2lvbnMsXG4gICAgICAgICAgICAvLyB6ejogdGhpcy56b25lRXhwcmVzc2lvbnMsXG4gICAgICAgICAgICAvLyB6eno6IHRoaXMuem9uZUV4cHJlc3Npb25zXG4gICAgICAgIH07XG4gICAgICAgIC8vI2VuZHJlZ2lvbiBDREYgc3R1ZmZcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhaW5hYmxlIHdheSB0byBzZXQgdGhlIHtAbGluayBsb2NhbGV9XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHNldExvY2FsaXphdGlvbiB3aXRoIGEgRm9ybWF0TG9jYWxpemF0aW9uIG9iamVjdCBpbnN0ZWFkXG4gICAgICovXG4gICAgc2V0TG9jYWxlKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2NhbGl6YXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxpemF0aW9uID0gRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxO1xuICAgICAgICAgICAgdGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYWluYWJsZSB3YXkgdG8gc2V0IHRoZSB7QGxpbmsgbG9jYWxpemF0aW9ufVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHNldExvY2FsaXphdGlvbih2YWx1ZSkge1xuICAgICAgICB0aGlzLmxvY2FsaXphdGlvbiA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBwbGFpbiBKUyBkYXRlIG9iamVjdCB0byBhIERhdGVUaW1lIG9iamVjdC5cbiAgICAgKiBEb2luZyB0aGlzIGFsbG93cyBhY2Nlc3MgdG8gZm9ybWF0LCBldGMuXG4gICAgICogQHBhcmFtICBkYXRlXG4gICAgICogQHBhcmFtIGxvY2FsZSB0aGlzIHBhcmFtZXRlciBpcyBkZXByZWNhdGVkLiBVc2UgZm9ybWF0TG9jYWxpemF0aW9uIGluc3RlYWQuXG4gICAgICogQHBhcmFtIGZvcm1hdExvY2FsaXphdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBjb252ZXJ0KGRhdGUsIGxvY2FsZSA9ICdkZWZhdWx0JywgZm9ybWF0TG9jYWxpemF0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghZGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQSBkYXRlIGlzIHJlcXVpcmVkYCk7XG4gICAgICAgIGlmICghZm9ybWF0TG9jYWxpemF0aW9uKSB7XG4gICAgICAgICAgICBmb3JtYXRMb2NhbGl6YXRpb24gPSBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDE7XG4gICAgICAgICAgICBmb3JtYXRMb2NhbGl6YXRpb24ubG9jYWxlID0gbG9jYWxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpLCBkYXRlLmdldFNlY29uZHMoKSwgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSkuc2V0TG9jYWxpemF0aW9uKGZvcm1hdExvY2FsaXphdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5hdGl2ZSBkYXRlIG1hbmlwdWxhdGlvbnMgYXJlIG5vdCBwdXJlIGZ1bmN0aW9ucy4gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGEgZHVwbGljYXRlIG9mIHRoZSBEYXRlVGltZSBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0IGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXRlLCB0aGlzLmhvdXJzLCB0aGlzLm1pbnV0ZXMsIHRoaXMuc2Vjb25kcywgdGhpcy5nZXRNaWxsaXNlY29uZHMoKSkuc2V0TG9jYWxpemF0aW9uKHRoaXMubG9jYWxpemF0aW9uKTtcbiAgICB9XG4gICAgc3RhdGljIGlzVmFsaWQoZCkge1xuICAgICAgICBpZiAoZCA9PT0gdW5kZWZpbmVkIHx8IEpTT04uc3RyaW5naWZ5KGQpID09PSAnbnVsbCcpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChkLmNvbnN0cnVjdG9yLm5hbWUgPT09IERhdGVUaW1lLm5hbWUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IGRhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSB7QGxpbmsgdW5pdH0gcHJvdmlkZWRcbiAgICAgKiBFeGFtcGxlOiBDb25zaWRlciBhIGRhdGUgb2YgXCJBcHJpbCAzMCwgMjAyMSwgMTE6NDU6MzIuOTg0IEFNXCIgPT4gbmV3IERhdGVUaW1lKDIwMjEsIDMsIDMwLCAxMSwgNDUsIDMyLCA5ODQpLnN0YXJ0T2YoJ21vbnRoJylcbiAgICAgKiB3b3VsZCByZXR1cm4gQXByaWwgMSwgMjAyMSwgMTI6MDA6MDAuMDAwIEFNIChtaWRuaWdodClcbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqIEBwYXJhbSBzdGFydE9mVGhlV2VlayBBbGxvd3MgZm9yIHRoZSBjaGFuZ2luZyB0aGUgc3RhcnQgb2YgdGhlIHdlZWsuXG4gICAgICovXG4gICAgc3RhcnRPZih1bml0LCBzdGFydE9mVGhlV2VlayA9IDApIHtcbiAgICAgICAgaWYgKHRoaXNbdW5pdF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5pdCAnJHt1bml0fScgaXMgbm90IHZhbGlkYCk7XG4gICAgICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaWxsaXNlY29uZHMoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlY29uZHMoMCwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdob3Vycyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaW51dGVzKDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dlZWtEYXknOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2Vla0RheSA9PT0gc3RhcnRPZlRoZVdlZWspXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNvbnN0IGdvQmFjayA9ICh0aGlzLndlZWtEYXkgLSBzdGFydE9mVGhlV2VlayArIDcpICUgNztcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGUoZ29CYWNrICogLTEsIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb250aCgwLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCBkYXRlIHRvIHRoZSBlbmQgb2YgdGhlIHtAbGluayB1bml0fSBwcm92aWRlZFxuICAgICAqIEV4YW1wbGU6IENvbnNpZGVyIGEgZGF0ZSBvZiBcIkFwcmlsIDMwLCAyMDIxLCAxMTo0NTozMi45ODQgQU1cIiA9PiBuZXcgRGF0ZVRpbWUoMjAyMSwgMywgMzAsIDExLCA0NSwgMzIsIDk4NCkuZW5kT2YoJ21vbnRoJylcbiAgICAgKiB3b3VsZCByZXR1cm4gQXByaWwgMzAsIDIwMjEsIDExOjU5OjU5Ljk5OSBQTVxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICogQHBhcmFtIHN0YXJ0T2ZUaGVXZWVrXG4gICAgICovXG4gICAgZW5kT2YodW5pdCwgc3RhcnRPZlRoZVdlZWsgPSAwKSB7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWlsbGlzZWNvbmRzKDk5OSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlY29uZHMoNTksIDk5OSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdob3Vycyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaW51dGVzKDU5LCA1OSwgOTk5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dlZWtEYXknOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRPZihVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZE9mV2VlayA9IDYgKyBzdGFydE9mVGhlV2VlaztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53ZWVrRGF5ID09PSBlbmRPZldlZWspXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZShlbmRPZldlZWsgLSB0aGlzLndlZWtEYXksIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRPZihVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZSgxLCBVbml0Lm1vbnRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb250aCgxMSwgMzEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgYSB7QGxpbmsgdW5pdH0gdmFsdWUuIFZhbHVlIGNhbiBiZSBwb3NpdGl2ZSBvciBuZWdhdGl2ZVxuICAgICAqIEV4YW1wbGU6IENvbnNpZGVyIGEgZGF0ZSBvZiBcIkFwcmlsIDMwLCAyMDIxLCAxMTo0NTozMi45ODQgQU1cIiA9PiBuZXcgRGF0ZVRpbWUoMjAyMSwgMywgMzAsIDExLCA0NSwgMzIsIDk4NCkubWFuaXB1bGF0ZSgxLCAnbW9udGgnKVxuICAgICAqIHdvdWxkIHJldHVybiBNYXkgMzAsIDIwMjEsIDExOjQ1OjMyLjk4NCBBTVxuICAgICAqIEBwYXJhbSB2YWx1ZSBBIHBvc2l0aXZlIG9yIG5lZ2F0aXZlIG51bWJlclxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICovXG4gICAgbWFuaXB1bGF0ZSh2YWx1ZSwgdW5pdCkge1xuICAgICAgICBpZiAodGhpc1t1bml0XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbml0ICcke3VuaXR9JyBpcyBub3QgdmFsaWRgKTtcbiAgICAgICAgdGhpc1t1bml0XSArPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0cnVlIGlmIHtAbGluayBjb21wYXJlfSBpcyBiZWZvcmUgdGhpcyBkYXRlXG4gICAgICogQHBhcmFtIGNvbXBhcmUgVGhlIERhdGUvRGF0ZVRpbWUgdG8gY29tcGFyZVxuICAgICAqIEBwYXJhbSB1bml0IElmIHByb3ZpZGVkLCB1c2VzIHtAbGluayBzdGFydE9mfSBmb3JcbiAgICAgKiBjb21wYXJpc29uLlxuICAgICAqL1xuICAgIGlzQmVmb3JlKGNvbXBhcmUsIHVuaXQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNvbXBhcmlzb25zIGlzIHVuZGVmaW5lZCwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZChjb21wYXJlKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF1bml0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpIDwgY29tcGFyZS52YWx1ZU9mKCk7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICByZXR1cm4gKHRoaXMuY2xvbmUuc3RhcnRPZih1bml0KS52YWx1ZU9mKCkgPCBjb21wYXJlLmNsb25lLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRydWUgaWYge0BsaW5rIGNvbXBhcmV9IGlzIGFmdGVyIHRoaXMgZGF0ZVxuICAgICAqIEBwYXJhbSBjb21wYXJlIFRoZSBEYXRlL0RhdGVUaW1lIHRvIGNvbXBhcmVcbiAgICAgKiBAcGFyYW0gdW5pdCBJZiBwcm92aWRlZCwgdXNlcyB7QGxpbmsgc3RhcnRPZn0gZm9yXG4gICAgICogY29tcGFyaXNvbi5cbiAgICAgKi9cbiAgICBpc0FmdGVyKGNvbXBhcmUsIHVuaXQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNvbXBhcmlzb25zIGlzIHVuZGVmaW5lZCwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZChjb21wYXJlKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF1bml0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID4gY29tcGFyZS52YWx1ZU9mKCk7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICByZXR1cm4gKHRoaXMuY2xvbmUuc3RhcnRPZih1bml0KS52YWx1ZU9mKCkgPiBjb21wYXJlLmNsb25lLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRydWUgaWYge0BsaW5rIGNvbXBhcmV9IGlzIHNhbWUgdGhpcyBkYXRlXG4gICAgICogQHBhcmFtIGNvbXBhcmUgVGhlIERhdGUvRGF0ZVRpbWUgdG8gY29tcGFyZVxuICAgICAqIEBwYXJhbSB1bml0IElmIHByb3ZpZGVkLCB1c2VzIHtAbGluayBzdGFydE9mfSBmb3JcbiAgICAgKiBjb21wYXJpc29uLlxuICAgICAqL1xuICAgIGlzU2FtZShjb21wYXJlLCB1bml0KSB7XG4gICAgICAgIC8vIElmIHRoZSBjb21wYXJpc29ucyBpcyB1bmRlZmluZWQsIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAoIURhdGVUaW1lLmlzVmFsaWQoY29tcGFyZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghdW5pdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA9PT0gY29tcGFyZS52YWx1ZU9mKCk7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICBjb21wYXJlID0gRGF0ZVRpbWUuY29udmVydChjb21wYXJlKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLmNsb25lLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpID09PSBjb21wYXJlLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhpcyBpcyBiZXR3ZWVuIHR3byBvdGhlciBEYXRlVGltZXMsIG9wdGlvbmFsbHkgbG9va2luZyBhdCB1bml0IHNjYWxlLiBUaGUgbWF0Y2ggaXMgZXhjbHVzaXZlLlxuICAgICAqIEBwYXJhbSBsZWZ0XG4gICAgICogQHBhcmFtIHJpZ2h0XG4gICAgICogQHBhcmFtIHVuaXQuXG4gICAgICogQHBhcmFtIGluY2x1c2l2aXR5LiBBIFsgaW5kaWNhdGVzIGluY2x1c2lvbiBvZiBhIHZhbHVlLiBBICggaW5kaWNhdGVzIGV4Y2x1c2lvbi5cbiAgICAgKiBJZiB0aGUgaW5jbHVzaXZpdHkgcGFyYW1ldGVyIGlzIHVzZWQsIGJvdGggaW5kaWNhdG9ycyBtdXN0IGJlIHBhc3NlZC5cbiAgICAgKi9cbiAgICBpc0JldHdlZW4obGVmdCwgcmlnaHQsIHVuaXQsIGluY2x1c2l2aXR5ID0gJygpJykge1xuICAgICAgICAvLyBJZiBvbmUgb2YgdGhlIGNvbXBhcmlzb25zIGlzIHVuZGVmaW5lZCwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZChsZWZ0KSB8fCAhRGF0ZVRpbWUuaXNWYWxpZChyaWdodCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIElmIGEgdW5pdCBpcyBwcm92aWRlZCBhbmQgaXMgbm90IGEgdmFsaWQgcHJvcGVydHkgb2YgdGhlIERhdGVUaW1lIG9iamVjdCwgdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgaWYgKHVuaXQgJiYgdGhpc1t1bml0XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlZnRJbmNsdXNpdml0eSA9IGluY2x1c2l2aXR5WzBdID09PSAnKCc7XG4gICAgICAgIGNvbnN0IHJpZ2h0SW5jbHVzaXZpdHkgPSBpbmNsdXNpdml0eVsxXSA9PT0gJyknO1xuICAgICAgICBjb25zdCBpc0xlZnRJblJhbmdlID0gbGVmdEluY2x1c2l2aXR5XG4gICAgICAgICAgICA/IHRoaXMuaXNBZnRlcihsZWZ0LCB1bml0KVxuICAgICAgICAgICAgOiAhdGhpcy5pc0JlZm9yZShsZWZ0LCB1bml0KTtcbiAgICAgICAgY29uc3QgaXNSaWdodEluUmFuZ2UgPSByaWdodEluY2x1c2l2aXR5XG4gICAgICAgICAgICA/IHRoaXMuaXNCZWZvcmUocmlnaHQsIHVuaXQpXG4gICAgICAgICAgICA6ICF0aGlzLmlzQWZ0ZXIocmlnaHQsIHVuaXQpO1xuICAgICAgICByZXR1cm4gaXNMZWZ0SW5SYW5nZSAmJiBpc1JpZ2h0SW5SYW5nZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmbGF0dGVuZWQgb2JqZWN0IG9mIHRoZSBkYXRlLiBEb2VzIG5vdCBpbmNsdWRlIGxpdGVyYWxzXG4gICAgICogQHBhcmFtIGxvY2FsZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZVxuICAgICAqL1xuICAgIHBhcnRzKGxvY2FsZSA9IHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSwgdGVtcGxhdGUgPSB7IGRhdGVTdHlsZTogJ2Z1bGwnLCB0aW1lU3R5bGU6ICdsb25nJyB9KSB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0ge307XG4gICAgICAgIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgdGVtcGxhdGUpXG4gICAgICAgICAgICAuZm9ybWF0VG9QYXJ0cyh0aGlzKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4geC50eXBlICE9PSAnbGl0ZXJhbCcpXG4gICAgICAgICAgICAuZm9yRWFjaCgoeCkgPT4gKHBhcnRzW3gudHlwZV0gPSB4LnZhbHVlKSk7XG4gICAgICAgIHJldHVybiBwYXJ0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5nZXRTZWNvbmRzKClcbiAgICAgKi9cbiAgICBnZXQgc2Vjb25kcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLnNldFNlY29uZHMoKVxuICAgICAqL1xuICAgIHNldCBzZWNvbmRzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U2Vjb25kcyh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHdvIGRpZ2l0IGhvdXJzXG4gICAgICovXG4gICAgZ2V0IHNlY29uZHNGb3JtYXR0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzKHVuZGVmaW5lZCwgdHdvRGlnaXRUZW1wbGF0ZSkuc2Vjb25kO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLmdldE1pbnV0ZXMoKVxuICAgICAqL1xuICAgIGdldCBtaW51dGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNaW51dGVzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuc2V0TWludXRlcygpXG4gICAgICovXG4gICAgc2V0IG1pbnV0ZXModmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRNaW51dGVzKHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0d28gZGlnaXQgbWludXRlc1xuICAgICAqL1xuICAgIGdldCBtaW51dGVzRm9ybWF0dGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cyh1bmRlZmluZWQsIHR3b0RpZ2l0VGVtcGxhdGUpLm1pbnV0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5nZXRIb3VycygpXG4gICAgICovXG4gICAgZ2V0IGhvdXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRIb3VycygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLnNldEhvdXJzKClcbiAgICAgKi9cbiAgICBzZXQgaG91cnModmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRIb3Vycyh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHdvIGRpZ2l0IGhvdXIsIGUuZy4gMDEuLi4xMFxuICAgICAqIEBwYXJhbSBob3VyQ3ljbGUgUHJvdmlkaW5nIGFuIGhvdXIgY3ljbGUgd2lsbCBjaGFuZ2UgMDAgdG8gMjQgZGVwZW5kaW5nIG9uIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICAgKi9cbiAgICBnZXRIb3Vyc0Zvcm1hdHRlZChob3VyQ3ljbGUgPSAnaDEyJykge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cyh1bmRlZmluZWQsIHsgLi4udHdvRGlnaXRUZW1wbGF0ZSwgaG91ckN5Y2xlOiBob3VyQ3ljbGUgfSlcbiAgICAgICAgICAgIC5ob3VyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1lcmlkaWVtIG9mIHRoZSBkYXRlLiBFLmcuIEFNIG9yIFBNLlxuICAgICAqIElmIHRoZSB7QGxpbmsgbG9jYWxlfSBwcm92aWRlcyBhIFwiZGF5UGVyaW9kXCIgdGhlbiB0aGlzIHdpbGwgYmUgcmV0dXJuZWQsXG4gICAgICogb3RoZXJ3aXNlIGl0IHdpbGwgcmV0dXJuIEFNIG9yIFBNLlxuICAgICAqIEBwYXJhbSBsb2NhbGVcbiAgICAgKi9cbiAgICBtZXJpZGllbShsb2NhbGUgPSB0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwge1xuICAgICAgICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgICAgICAgaG91cjEyOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgICAgICAgLmZvcm1hdFRvUGFydHModGhpcylcbiAgICAgICAgICAgIC5maW5kKChwKSA9PiBwLnR5cGUgPT09ICdkYXlQZXJpb2QnKT8udmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0RGF0ZSgpXG4gICAgICovXG4gICAgZ2V0IGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5zZXREYXRlKClcbiAgICAgKi9cbiAgICBzZXQgZGF0ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldERhdGUodmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdHdvIGRpZ2l0IGRhdGVcbiAgICAgKi9cbiAgICBnZXQgZGF0ZUZvcm1hdHRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHModW5kZWZpbmVkLCB0d29EaWdpdFRlbXBsYXRlKS5kYXk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0RGF5KClcbiAgICAgKi9cbiAgICBnZXQgd2Vla0RheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF5KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0TW9udGgoKVxuICAgICAqL1xuICAgIGdldCBtb250aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TW9udGgoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5zZXRNb250aCgpXG4gICAgICovXG4gICAgc2V0IG1vbnRoKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldE1vbnRoID0gbmV3IERhdGUodGhpcy55ZWFyLCB2YWx1ZSArIDEpO1xuICAgICAgICB0YXJnZXRNb250aC5zZXREYXRlKDApO1xuICAgICAgICBjb25zdCBlbmRPZk1vbnRoID0gdGFyZ2V0TW9udGguZ2V0RGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5kYXRlID4gZW5kT2ZNb250aCkge1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gZW5kT2ZNb250aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldE1vbnRoKHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHR3byBkaWdpdCwgaHVtYW4gZXhwZWN0ZWQgbW9udGguIEUuZy4gSmFudWFyeSA9IDEsIERlY2VtYmVyID0gMTJcbiAgICAgKi9cbiAgICBnZXQgbW9udGhGb3JtYXR0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzKHVuZGVmaW5lZCwgdHdvRGlnaXRUZW1wbGF0ZSkubW9udGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAqL1xuICAgIGdldCB5ZWFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdWxsWWVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLnNldEZ1bGxZZWFyKClcbiAgICAgKi9cbiAgICBzZXQgeWVhcih2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldEZ1bGxZZWFyKHZhbHVlKTtcbiAgICB9XG4gICAgLy8gYm9ycm93ZWQgYSBidW5jaCBvZiBzdHVmZiBmcm9tIEx1eG9uXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgd2VlayBvZiB0aGUgeWVhclxuICAgICAqL1xuICAgIGdldCB3ZWVrKCkge1xuICAgICAgICBjb25zdCBvcmRpbmFsID0gdGhpcy5jb21wdXRlT3JkaW5hbCgpLCB3ZWVrZGF5ID0gdGhpcy5nZXRVVENEYXkoKTtcbiAgICAgICAgbGV0IHdlZWtOdW1iZXIgPSBNYXRoLmZsb29yKChvcmRpbmFsIC0gd2Vla2RheSArIDEwKSAvIDcpO1xuICAgICAgICBpZiAod2Vla051bWJlciA8IDEpIHtcbiAgICAgICAgICAgIHdlZWtOdW1iZXIgPSB0aGlzLndlZWtzSW5XZWVrWWVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHdlZWtOdW1iZXIgPiB0aGlzLndlZWtzSW5XZWVrWWVhcigpKSB7XG4gICAgICAgICAgICB3ZWVrTnVtYmVyID0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2Vla051bWJlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHdlZWtzIGluIHRoZSB5ZWFyXG4gICAgICovXG4gICAgd2Vla3NJbldlZWtZZWFyKCkge1xuICAgICAgICBjb25zdCBwMSA9ICh0aGlzLnllYXIgK1xuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLnllYXIgLyA0KSAtXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMueWVhciAvIDEwMCkgK1xuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLnllYXIgLyA0MDApKSAlXG4gICAgICAgICAgICA3LCBsYXN0ID0gdGhpcy55ZWFyIC0gMSwgcDIgPSAobGFzdCArXG4gICAgICAgICAgICBNYXRoLmZsb29yKGxhc3QgLyA0KSAtXG4gICAgICAgICAgICBNYXRoLmZsb29yKGxhc3QgLyAxMDApICtcbiAgICAgICAgICAgIE1hdGguZmxvb3IobGFzdCAvIDQwMCkpICVcbiAgICAgICAgICAgIDc7XG4gICAgICAgIHJldHVybiBwMSA9PT0gNCB8fCBwMiA9PT0gMyA/IDUzIDogNTI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gaWYgdGhlIHllYXIgaXMgYSBsZWFwIHllYXIgb3Igbm90LlxuICAgICAqL1xuICAgIGdldCBpc0xlYXBZZWFyKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMueWVhciAlIDQgPT09IDAgJiYgKHRoaXMueWVhciAlIDEwMCAhPT0gMCB8fCB0aGlzLnllYXIgJSA0MDAgPT09IDApKTtcbiAgICB9XG4gICAgY29tcHV0ZU9yZGluYWwoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlICtcbiAgICAgICAgICAgICh0aGlzLmlzTGVhcFllYXIgPyB0aGlzLmxlYXBMYWRkZXIgOiB0aGlzLm5vbkxlYXBMYWRkZXIpW3RoaXMubW9udGhdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgbW9udGggdmFsdWVzIGJhc2VkIG9uIHRoZSBjdXJyZW50IGxvY2FsZVxuICAgICAqL1xuICAgIGdldEFsbE1vbnRocyhmb3JtYXQgPSAnbG9uZycpIHtcbiAgICAgICAgY29uc3QgYXBwbHlGb3JtYXQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUsIHtcbiAgICAgICAgICAgIG1vbnRoOiBmb3JtYXQsXG4gICAgICAgIH0pLmZvcm1hdDtcbiAgICAgICAgcmV0dXJuIFsuLi5BcnJheSgxMikua2V5cygpXS5tYXAoKG0pID0+IGFwcGx5Rm9ybWF0KG5ldyBEYXRlKDIwMjEsIG0pKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIGFuIGV4cGFuZGVkIHRva2VuIHNldCAoZS5nLiBMVC9MVFMpXG4gICAgICovXG4gICAgcmVwbGFjZVRva2Vucyhmb3JtYXRTdHIsIGZvcm1hdHMpIHtcbiAgICAgICAgLyoqKlxuICAgICAgICAgKiBfID0+IG1hdGNoXG4gICAgICAgICAqIGEgPT4gZmlyc3QgY2FwdHVyZSBncm91cC4gQW55dGhpbmcgYmV0d2VlbiBbIGFuZCBdXG4gICAgICAgICAqIGIgPT4gc2Vjb25kIGNhcHR1cmUgZ3JvdXBcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmb3JtYXRTdHIucmVwbGFjZSgvKFxcW1teW1xcXV0qXSl8KExUUz98bHsxLDR9fEx7MSw0fSkvZywgKF8sIGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IEIgPSBiICYmIGIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBhIHx8IGZvcm1hdHNbQl0gfHwgRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmRhdGVGb3JtYXRzW0JdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcGFyc2VUd29EaWdpdFllYXIoaW5wdXQpIHtcbiAgICAgICAgaW5wdXQgPSAraW5wdXQ7XG4gICAgICAgIHJldHVybiBpbnB1dCArIChpbnB1dCA+IDY4ID8gMTkwMCA6IDIwMDApO1xuICAgIH1cbiAgICBvZmZzZXRGcm9tU3RyaW5nKHN0cmluZykge1xuICAgICAgICBpZiAoIXN0cmluZylcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBpZiAoc3RyaW5nID09PSAnWicpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgY29uc3QgW2ZpcnN0LCBzZWNvbmQsIHRoaXJkXSA9IHN0cmluZy5tYXRjaCgvKFsrLV18XFxkXFxkKS9nKTtcbiAgICAgICAgY29uc3QgbWludXRlcyA9ICsoc2Vjb25kICogNjApICsgKCt0aGlyZCB8fCAwKTtcbiAgICAgICAgY29uc3Qgc2lnbmVkID0gZmlyc3QgPT09ICcrJyA/IC1taW51dGVzIDogbWludXRlcztcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMgPT09IDAgPyAwIDogc2lnbmVkOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHogPSAtNCwgenogPSAtMDQsIHp6eiA9IC0wNDAwXG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKiBAcGFyYW0gc3R5bGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHpvbmVJbmZvcm1hdGlvbihkYXRlLCBzdHlsZSkge1xuICAgICAgICBsZXQgbmFtZSA9IGRhdGVcbiAgICAgICAgICAgIC5wYXJ0cyh0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUsIHsgdGltZVpvbmVOYW1lOiAnbG9uZ09mZnNldCcgfSlcbiAgICAgICAgICAgIC50aW1lWm9uZU5hbWUucmVwbGFjZSgnR01UJywgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgnOicsICcnKTtcbiAgICAgICAgY29uc3QgbmVnYXRpdmUgPSBuYW1lLmluY2x1ZGVzKCctJyk7XG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoJy0nLCAnJyk7XG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ3onKVxuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDEsIDIpO1xuICAgICAgICBlbHNlIGlmIChzdHlsZSA9PT0gJ3p6JylcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZygwLCAyKTtcbiAgICAgICAgcmV0dXJuIGAke25lZ2F0aXZlID8gJy0nIDogJyd9JHtuYW1lfWA7XG4gICAgfVxuICAgIGFkZElucHV0KHByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiAodGltZSwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgIHRpbWVbcHJvcGVydHldID0gK2lucHV0O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBtZXJpZGllbU1hdGNoKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IG1lcmlkaWVtID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlLCB7XG4gICAgICAgICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICBob3VyMTI6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZm9ybWF0VG9QYXJ0cyhuZXcgRGF0ZSgyMDIyLCAzLCA0LCAxMykpXG4gICAgICAgICAgICAuZmluZCgocCkgPT4gcC50eXBlID09PSAnZGF5UGVyaW9kJyk/LnZhbHVlO1xuICAgICAgICByZXR1cm4gaW5wdXQudG9Mb3dlckNhc2UoKSA9PT0gbWVyaWRpZW0udG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgY29ycmVjdEhvdXJzKHRpbWUpIHtcbiAgICAgICAgY29uc3QgeyBhZnRlcm5vb24gfSA9IHRpbWU7XG4gICAgICAgIGlmIChhZnRlcm5vb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgeyBob3VycyB9ID0gdGltZTtcbiAgICAgICAgICAgIGlmIChhZnRlcm5vb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoaG91cnMgPCAxMikge1xuICAgICAgICAgICAgICAgICAgICB0aW1lLmhvdXJzICs9IDEyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgICAgICAgICAgIHRpbWUuaG91cnMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHRpbWUuYWZ0ZXJub29uO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1ha2VQYXJzZXIoZm9ybWF0KSB7XG4gICAgICAgIGZvcm1hdCA9IHRoaXMucmVwbGFjZVRva2Vucyhmb3JtYXQsIHRoaXMubG9jYWxpemF0aW9uLmRhdGVGb3JtYXRzKTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBmb3JtYXQubWF0Y2godGhpcy5mb3JtYXR0aW5nVG9rZW5zKTtcbiAgICAgICAgY29uc3QgeyBsZW5ndGggfSA9IGFycmF5O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IGFycmF5W2ldO1xuICAgICAgICAgICAgY29uc3QgcGFyc2VUbyA9IHRoaXMuZXhwcmVzc2lvbnNbdG9rZW5dO1xuICAgICAgICAgICAgY29uc3QgcmVnZXggPSBwYXJzZVRvICYmIHBhcnNlVG9bMF07XG4gICAgICAgICAgICBjb25zdCBwYXJzZXIgPSBwYXJzZVRvICYmIHBhcnNlVG9bMV07XG4gICAgICAgICAgICBpZiAocGFyc2VyKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSB7IHJlZ2V4LCBwYXJzZXIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gdG9rZW4ucmVwbGFjZSgvXlxcW1teW1xcXV0qXSQvZywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB7XG4gICAgICAgICAgICAgICAgaG91cnM6IDAsXG4gICAgICAgICAgICAgICAgbWludXRlczogMCxcbiAgICAgICAgICAgICAgICBzZWNvbmRzOiAwLFxuICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kczogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgc3RhcnQgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ICs9IHRva2VuLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVnZXgsIHBhcnNlciB9ID0gdG9rZW47XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQgPSBpbnB1dC5zbGljZShzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhwYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmNhbGwodGhpcywgdGltZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UodmFsdWUsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvcnJlY3RIb3Vycyh0aW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0aW1lO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBjcmVhdGUgYSBEYXRlVGltZSBmcm9tIGEgc3RyaW5nLlxuICAgICAqIEBwYXJhbSBpbnB1dCBkYXRlIGFzIHN0cmluZ1xuICAgICAqIEBwYXJhbSBsb2NhbGl6YXRpb24gcHJvdmlkZXMgdGhlIGRhdGUgdGVtcGxhdGUgdGhlIHN0cmluZyBpcyBpbiB2aWEgdGhlIGZvcm1hdCBwcm9wZXJ0eVxuICAgICAqL1xuICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIHN0YXRpYyBmcm9tU3RyaW5nKGlucHV0LCBsb2NhbGl6YXRpb24pIHtcbiAgICAgICAgaWYgKCFsb2NhbGl6YXRpb24/LmZvcm1hdCkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY3VzdG9tRGF0ZUZvcm1hdEVycm9yKCdObyBmb3JtYXQgd2FzIHByb3ZpZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGVUaW1lKCk7XG4gICAgICAgICAgICBkdC5zZXRMb2NhbGl6YXRpb24obG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgIGlmIChbJ3gnLCAnWCddLmluZGV4T2YobG9jYWxpemF0aW9uLmZvcm1hdCkgPiAtMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKChsb2NhbGl6YXRpb24uZm9ybWF0ID09PSAnWCcgPyAxMDAwIDogMSkgKiAraW5wdXQpO1xuICAgICAgICAgICAgY29uc3QgcGFyc2VyID0gZHQubWFrZVBhcnNlcihsb2NhbGl6YXRpb24uZm9ybWF0KTtcbiAgICAgICAgICAgIGNvbnN0IHsgeWVhciwgbW9udGgsIGRheSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcywgem9uZSB9ID0gcGFyc2VyKGlucHV0KTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBkYXkgfHwgKCF5ZWFyICYmICFtb250aCA/IGR0LmdldERhdGUoKSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHllYXIgfHwgZHQuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIGxldCBNID0gMDtcbiAgICAgICAgICAgIGlmICghKHllYXIgJiYgIW1vbnRoKSkge1xuICAgICAgICAgICAgICAgIE0gPSBtb250aCA+IDAgPyBtb250aCAtIDEgOiBkdC5nZXRNb250aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHpvbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKERhdGUuVVRDKHksIE0sIGQsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMgKyB6b25lLm9mZnNldCAqIDYwICogMTAwMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZSh5LCBNLCBkLCBob3VycywgbWludXRlcywgc2Vjb25kcywgbWlsbGlzZWNvbmRzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY3VzdG9tRGF0ZUZvcm1hdEVycm9yKGBVbmFibGUgdG8gcGFyc2UgcHJvdmlkZWQgaW5wdXQ6ICR7aW5wdXR9LCBmb3JtYXQ6ICR7bG9jYWxpemF0aW9uLmZvcm1hdH1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIGZvcm1hdC5cbiAgICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvSW50bC9EYXRlVGltZUZvcm1hdFxuICAgICAqIGZvciB2YWxpZCB0ZW1wbGF0ZXMgYW5kIGxvY2FsZSBvYmplY3RzXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIEFuIG9wdGlvbmFsIG9iamVjdC4gSWYgcHJvdmlkZWQsIG1ldGhvZCB3aWxsIHVzZSBJbnRsLiwgb3RoZXJ3aXNlIHRoZSBsb2NhbGl6YXRpb25zIGZvcm1hdCBwcm9wZXJ0aWVzXG4gICAgICogQHBhcmFtIGxvY2FsZSBDYW4gYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncy4gVXNlcyBicm93c2VyIGRlZmF1bHRzIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBmb3JtYXQodGVtcGxhdGUsIGxvY2FsZSA9IHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSkge1xuICAgICAgICBpZiAodGVtcGxhdGUgJiYgdHlwZW9mIHRlbXBsYXRlID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHRlbXBsYXRlKS5mb3JtYXQodGhpcyk7XG4gICAgICAgIGNvbnN0IGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZVRva2VucyhcbiAgICAgICAgLy90cnkgdGVtcGxhdGUgZmlyc3RcbiAgICAgICAgdGVtcGxhdGUgfHxcbiAgICAgICAgICAgIC8vb3RoZXJ3aXNlIHRyeSBsb2NhbGl6YXRpb24gZm9ybWF0XG4gICAgICAgICAgICB0aGlzLmxvY2FsaXphdGlvbi5mb3JtYXQgfHxcbiAgICAgICAgICAgIC8vb3RoZXJ3aXNlIHRyeSBkYXRlICsgdGltZVxuICAgICAgICAgICAgYCR7RGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmRhdGVGb3JtYXRzLkx9LCAke0RlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5kYXRlRm9ybWF0cy5MVH1gLCB0aGlzLmxvY2FsaXphdGlvbi5kYXRlRm9ybWF0cyk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9ICh0ZW1wbGF0ZSkgPT4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlLCB0ZW1wbGF0ZSkuZm9ybWF0KHRoaXMpO1xuICAgICAgICBpZiAoIXRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZSlcbiAgICAgICAgICAgIHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZSA9IGd1ZXNzSG91ckN5Y2xlKHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSk7XG4gICAgICAgIC8vaWYgdGhlIGZvcm1hdCBhc2tzIGZvciBhIHR3ZW50eS1mb3VyLWhvdXIgc3RyaW5nIGJ1dCB0aGUgaG91ciBjeWNsZSBpcyBub3QsIHRoZW4gbWFrZSBhIGJhc2UgZ3Vlc3NcbiAgICAgICAgY29uc3QgSEhDeWNsZSA9IHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZS5zdGFydHNXaXRoKCdoMScpXG4gICAgICAgICAgICA/ICdoMjQnXG4gICAgICAgICAgICA6IHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZTtcbiAgICAgICAgY29uc3QgaGhDeWNsZSA9IHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZS5zdGFydHNXaXRoKCdoMicpXG4gICAgICAgICAgICA/ICdoMTInXG4gICAgICAgICAgICA6IHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZTtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHtcbiAgICAgICAgICAgIHl5OiBmb3JtYXR0ZXIoeyB5ZWFyOiAnMi1kaWdpdCcgfSksXG4gICAgICAgICAgICB5eXl5OiB0aGlzLnllYXIsXG4gICAgICAgICAgICBNOiBmb3JtYXR0ZXIoeyBtb250aDogJ251bWVyaWMnIH0pLFxuICAgICAgICAgICAgTU06IHRoaXMubW9udGhGb3JtYXR0ZWQsXG4gICAgICAgICAgICBNTU06IHRoaXMuZ2V0QWxsTW9udGhzKCdzaG9ydCcpW3RoaXMuZ2V0TW9udGgoKV0sXG4gICAgICAgICAgICBNTU1NOiB0aGlzLmdldEFsbE1vbnRocygpW3RoaXMuZ2V0TW9udGgoKV0sXG4gICAgICAgICAgICBkOiB0aGlzLmRhdGUsXG4gICAgICAgICAgICBkZDogdGhpcy5kYXRlRm9ybWF0dGVkLFxuICAgICAgICAgICAgZGRkOiBmb3JtYXR0ZXIoeyB3ZWVrZGF5OiAnc2hvcnQnIH0pLFxuICAgICAgICAgICAgZGRkZDogZm9ybWF0dGVyKHsgd2Vla2RheTogJ2xvbmcnIH0pLFxuICAgICAgICAgICAgSDogdGhpcy5nZXRIb3VycygpLFxuICAgICAgICAgICAgSEg6IHRoaXMuZ2V0SG91cnNGb3JtYXR0ZWQoSEhDeWNsZSksXG4gICAgICAgICAgICBoOiB0aGlzLmhvdXJzID4gMTIgPyB0aGlzLmhvdXJzIC0gMTIgOiB0aGlzLmhvdXJzLFxuICAgICAgICAgICAgaGg6IHRoaXMuZ2V0SG91cnNGb3JtYXR0ZWQoaGhDeWNsZSksXG4gICAgICAgICAgICB0OiB0aGlzLm1lcmlkaWVtKCksXG4gICAgICAgICAgICBUOiB0aGlzLm1lcmlkaWVtKCkudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgIG06IHRoaXMubWludXRlcyxcbiAgICAgICAgICAgIG1tOiB0aGlzLm1pbnV0ZXNGb3JtYXR0ZWQsXG4gICAgICAgICAgICBzOiB0aGlzLnNlY29uZHMsXG4gICAgICAgICAgICBzczogdGhpcy5zZWNvbmRzRm9ybWF0dGVkLFxuICAgICAgICAgICAgZmZmOiB0aGlzLmdldE1pbGxpc2Vjb25kcygpLFxuICAgICAgICAgICAgLy8gejogdGhpcy56b25lSW5mb3JtYXRpb24oZGF0ZVRpbWUsICd6JyksIC8vLTRcbiAgICAgICAgICAgIC8vIHp6OiB0aGlzLnpvbmVJbmZvcm1hdGlvbihkYXRlVGltZSwgJ3p6JyksIC8vLTA0XG4gICAgICAgICAgICAvLyB6eno6IHRoaXMuem9uZUluZm9ybWF0aW9uKGRhdGVUaW1lLCAnenp6JykgLy8tMDQwMFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZm9ybWF0U3RyaW5nXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLmRhdGVUaW1lUmVnZXgsIChtYXRjaCwgJDEpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkMSB8fCBtYXRjaGVzW21hdGNoXTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXFsvZywgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXS9nLCAnJyk7XG4gICAgfVxufVxuXG5jbGFzcyBTZXJ2aWNlTG9jYXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGxvY2F0ZShpZGVudGlmaWVyKSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSB0aGlzLmNhY2hlLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHNlcnZpY2UpXG4gICAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBuZXcgaWRlbnRpZmllcigpO1xuICAgICAgICB0aGlzLmNhY2hlLnNldChpZGVudGlmaWVyLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5jb25zdCBzZXR1cFNlcnZpY2VMb2NhdG9yID0gKCkgPT4ge1xuICAgIHNlcnZpY2VMb2NhdG9yID0gbmV3IFNlcnZpY2VMb2NhdG9yKCk7XG59O1xubGV0IHNlcnZpY2VMb2NhdG9yO1xuXG5jb25zdCBDYWxlbmRhck1vZGVzID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ2NhbGVuZGFyJyxcbiAgICAgICAgY2xhc3NOYW1lOiBOYW1lc3BhY2UuY3NzLmRheXNDb250YWluZXIsXG4gICAgICAgIHVuaXQ6IFVuaXQubW9udGgsXG4gICAgICAgIHN0ZXA6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdtb250aHMnLFxuICAgICAgICBjbGFzc05hbWU6IE5hbWVzcGFjZS5jc3MubW9udGhzQ29udGFpbmVyLFxuICAgICAgICB1bml0OiBVbml0LnllYXIsXG4gICAgICAgIHN0ZXA6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd5ZWFycycsXG4gICAgICAgIGNsYXNzTmFtZTogTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lcixcbiAgICAgICAgdW5pdDogVW5pdC55ZWFyLFxuICAgICAgICBzdGVwOiAxMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2RlY2FkZXMnLFxuICAgICAgICBjbGFzc05hbWU6IE5hbWVzcGFjZS5jc3MuZGVjYWRlc0NvbnRhaW5lcixcbiAgICAgICAgdW5pdDogVW5pdC55ZWFyLFxuICAgICAgICBzdGVwOiAxMDAsXG4gICAgfSxcbl07XG5cbmNsYXNzIE9wdGlvbnNTdG9yZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRDYWxlbmRhclZpZXdNb2RlID0gMDtcbiAgICAgICAgdGhpcy5fdmlld0RhdGUgPSBuZXcgRGF0ZVRpbWUoKTtcbiAgICAgICAgdGhpcy5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSAnY2FsZW5kYXInO1xuICAgIH1cbiAgICBnZXQgY3VycmVudENhbGVuZGFyVmlld01vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZTtcbiAgICB9XG4gICAgc2V0IGN1cnJlbnRDYWxlbmRhclZpZXdNb2RlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRDYWxlbmRhclZpZXdNb2RlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSBDYWxlbmRhck1vZGVzW3ZhbHVlXS5uYW1lO1xuICAgIH1cbiAgICBnZXQgdmlld0RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWV3RGF0ZTtcbiAgICB9XG4gICAgc2V0IHZpZXdEYXRlKHYpIHtcbiAgICAgICAgdGhpcy5fdmlld0RhdGUgPSB2O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnZpZXdEYXRlID0gdjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hlbiBzd2l0Y2hpbmcgYmFjayB0byB0aGUgY2FsZW5kYXIgZnJvbSB0aGUgY2xvY2ssXG4gICAgICogdGhpcyBzZXRzIGN1cnJlbnRWaWV3IHRvIHRoZSBjb3JyZWN0IGNhbGVuZGFyIHZpZXcuXG4gICAgICovXG4gICAgcmVmcmVzaEN1cnJlbnRWaWV3KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gQ2FsZW5kYXJNb2Rlc1t0aGlzLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlXS5uYW1lO1xuICAgIH1cbiAgICBnZXQgaXNUd2VsdmVIb3VyKCkge1xuICAgICAgICByZXR1cm4gWydoMTInLCAnaDExJ10uaW5jbHVkZXModGhpcy5vcHRpb25zLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBNYWluIGNsYXNzIGZvciBkYXRlIHZhbGlkYXRpb24gcnVsZXMgYmFzZWQgb24gdGhlIG9wdGlvbnMgcHJvdmlkZWQuXG4gKi9cbmNsYXNzIFZhbGlkYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSB0YXJnZXQgZGF0ZSBpcyB2YWxpZCBiYXNlZCBvbiB0aGUgcnVsZXMgcHJvdmlkZWQgaW4gdGhlIG9wdGlvbnMuXG4gICAgICogR3JhbnVsYXJpdHkgY2FuIGJlIHByb3ZpZGVkIHRvIGNoZWNrIHBvcnRpb25zIG9mIHRoZSBkYXRlIGluc3RlYWQgb2YgdGhlIHdob2xlLlxuICAgICAqIEBwYXJhbSB0YXJnZXREYXRlXG4gICAgICogQHBhcmFtIGdyYW51bGFyaXR5XG4gICAgICovXG4gICAgaXNWYWxpZCh0YXJnZXREYXRlLCBncmFudWxhcml0eSkge1xuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWREaXNhYmxlZERhdGVzSXNWYWxpZChncmFudWxhcml0eSwgdGFyZ2V0RGF0ZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChncmFudWxhcml0eSAhPT0gVW5pdC5tb250aCAmJlxuICAgICAgICAgICAgZ3JhbnVsYXJpdHkgIT09IFVuaXQueWVhciAmJlxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGF5c09mV2Vla0Rpc2FibGVkPy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kYXlzT2ZXZWVrRGlzYWJsZWQuaW5kZXhPZih0YXJnZXREYXRlLndlZWtEYXkpICE9PSAtMSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLl9taW5NYXhJc1ZhbGlkKGdyYW51bGFyaXR5LCB0YXJnZXREYXRlKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGdyYW51bGFyaXR5ID09PSBVbml0LmhvdXJzIHx8XG4gICAgICAgICAgICBncmFudWxhcml0eSA9PT0gVW5pdC5taW51dGVzIHx8XG4gICAgICAgICAgICBncmFudWxhcml0eSA9PT0gVW5pdC5zZWNvbmRzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWREaXNhYmxlZEhvdXJzSXNWYWxpZCh0YXJnZXREYXRlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzPy5maWx0ZXIoKGludGVybmFsKSA9PiB0YXJnZXREYXRlLmlzQmV0d2VlbihpbnRlcm5hbC5mcm9tLCBpbnRlcm5hbC50bykpLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9lbmFibGVkRGlzYWJsZWREYXRlc0lzVmFsaWQoZ3JhbnVsYXJpdHksIHRhcmdldERhdGUpIHtcbiAgICAgICAgaWYgKGdyYW51bGFyaXR5ICE9PSBVbml0LmRhdGUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkRGF0ZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgdGhpcy5faXNJbkRpc2FibGVkRGF0ZXModGFyZ2V0RGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub2luc3BlY3Rpb24gUmVkdW5kYW50SWZTdGF0ZW1lbnRKU1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZERhdGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICF0aGlzLl9pc0luRW5hYmxlZERhdGVzKHRhcmdldERhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIGRpc2FibGVkRGF0ZXMgb3B0aW9uIGlzIGluIHVzZSBhbmQgcmV0dXJucyB0cnVlIChtZWFuaW5nIGludmFsaWQpXG4gICAgICogaWYgdGhlIGB0ZXN0RGF0ZWAgaXMgd2l0aCBpbiB0aGUgYXJyYXkuIEdyYW51bGFyaXR5IGlzIGJ5IGRhdGUuXG4gICAgICogQHBhcmFtIHRlc3REYXRlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNJbkRpc2FibGVkRGF0ZXModGVzdERhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZERhdGVzIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZERhdGVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWREYXRlcy5maW5kKCh4KSA9PiB4LmlzU2FtZSh0ZXN0RGF0ZSwgVW5pdC5kYXRlKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIGVuYWJsZWREYXRlcyBvcHRpb24gaXMgaW4gdXNlIGFuZCByZXR1cm5zIHRydWUgKG1lYW5pbmcgdmFsaWQpXG4gICAgICogaWYgdGhlIGB0ZXN0RGF0ZWAgaXMgd2l0aCBpbiB0aGUgYXJyYXkuIEdyYW51bGFyaXR5IGlzIGJ5IGRhdGUuXG4gICAgICogQHBhcmFtIHRlc3REYXRlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNJbkVuYWJsZWREYXRlcyh0ZXN0RGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWREYXRlcyB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZERhdGVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gISF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkRGF0ZXMuZmluZCgoeCkgPT4geC5pc1NhbWUodGVzdERhdGUsIFVuaXQuZGF0ZSkpO1xuICAgIH1cbiAgICBfbWluTWF4SXNWYWxpZChncmFudWxhcml0eSwgdGFyZ2V0RGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMubWluRGF0ZSAmJlxuICAgICAgICAgICAgdGFyZ2V0RGF0ZS5pc0JlZm9yZSh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5taW5EYXRlLCBncmFudWxhcml0eSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub2luc3BlY3Rpb24gUmVkdW5kYW50SWZTdGF0ZW1lbnRKU1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMubWF4RGF0ZSAmJlxuICAgICAgICAgICAgdGFyZ2V0RGF0ZS5pc0FmdGVyKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLm1heERhdGUsIGdyYW51bGFyaXR5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBfZW5hYmxlZERpc2FibGVkSG91cnNJc1ZhbGlkKHRhcmdldERhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkSG91cnMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgdGhpcy5faXNJbkRpc2FibGVkSG91cnModGFyZ2V0RGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub2luc3BlY3Rpb24gUmVkdW5kYW50SWZTdGF0ZW1lbnRKU1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZEhvdXJzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICF0aGlzLl9pc0luRW5hYmxlZEhvdXJzKHRhcmdldERhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIGRpc2FibGVkSG91cnMgb3B0aW9uIGlzIGluIHVzZSBhbmQgcmV0dXJucyB0cnVlIChtZWFuaW5nIGludmFsaWQpXG4gICAgICogaWYgdGhlIGB0ZXN0RGF0ZWAgaXMgd2l0aCBpbiB0aGUgYXJyYXkuIEdyYW51bGFyaXR5IGlzIGJ5IGhvdXJzLlxuICAgICAqIEBwYXJhbSB0ZXN0RGF0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzSW5EaXNhYmxlZEhvdXJzKHRlc3REYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWRIb3VycyB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWRIb3Vycy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSB0ZXN0RGF0ZS5ob3VycztcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkSG91cnMuaW5jbHVkZXMoZm9ybWF0dGVkRGF0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIGVuYWJsZWRIb3VycyBvcHRpb24gaXMgaW4gdXNlIGFuZCByZXR1cm5zIHRydWUgKG1lYW5pbmcgdmFsaWQpXG4gICAgICogaWYgdGhlIGB0ZXN0RGF0ZWAgaXMgd2l0aCBpbiB0aGUgYXJyYXkuIEdyYW51bGFyaXR5IGlzIGJ5IGhvdXJzLlxuICAgICAqIEBwYXJhbSB0ZXN0RGF0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzSW5FbmFibGVkSG91cnModGVzdERhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkSG91cnMgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWRIb3Vycy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IHRlc3REYXRlLmhvdXJzO1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZEhvdXJzLmluY2x1ZGVzKGZvcm1hdHRlZERhdGUpO1xuICAgIH1cbiAgICBkYXRlUmFuZ2VJc1ZhbGlkKGRhdGVzLCBpbmRleCwgdGFyZ2V0KSB7XG4gICAgICAgIC8vIGlmIHdlJ3JlIG5vdCB1c2luZyB0aGUgb3B0aW9uLCB0aGVuIHJldHVybiB2YWxpZFxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGF0ZVJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vIGlmIHdlJ3ZlIG9ubHkgc2VsZWN0ZWQgMC4uMSBkYXRlcywgYW5kIHdlJ3JlIG5vdCBzZXR0aW5nIHRoZSBlbmQgZGF0ZVxuICAgICAgICAvLyB0aGVuIHJldHVybiB2YWxpZC4gV2Ugb25seSB3YW50IHRvIHZhbGlkYXRlIHRoZSByYW5nZSBpZiBib3RoIGFyZSBzZWxlY3RlZCxcbiAgICAgICAgLy8gYmVjYXVzZSB0aGUgb3RoZXIgdmFsaWRhdGlvbiBvbiB0aGUgdGFyZ2V0IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuICAgICAgICBpZiAoZGF0ZXMubGVuZ3RoICE9PSAyICYmIGluZGV4ICE9PSAxKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vIGluaXRpYWxpemUgc3RhcnQgZGF0ZVxuICAgICAgICBjb25zdCBzdGFydCA9IGRhdGVzWzBdLmNsb25lO1xuICAgICAgICAvLyBjaGVjayBpZiBzdGFydCBkYXRlIGlzIG5vdCB0aGUgc2FtZSBhcyB0YXJnZXQgZGF0ZVxuICAgICAgICBpZiAoc3RhcnQuaXNTYW1lKHRhcmdldCwgVW5pdC5kYXRlKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyBhZGQgb25lIGRheSB0byBzdGFydDsgc3RhcnQgaGFzIGFscmVhZHkgYmVlbiB2YWxpZGF0ZWRcbiAgICAgICAgc3RhcnQubWFuaXB1bGF0ZSgxLCBVbml0LmRhdGUpO1xuICAgICAgICAvLyBjaGVjayBlYWNoIGRhdGUgaW4gdGhlIHJhbmdlIHRvIG1ha2Ugc3VyZSBpdCdzIHZhbGlkXG4gICAgICAgIHdoaWxlICghc3RhcnQuaXNTYW1lKHRhcmdldCwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLmlzVmFsaWQoc3RhcnQsIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICBpZiAoIXZhbGlkKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHN0YXJ0Lm1hbmlwdWxhdGUoMSwgVW5pdC5kYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSBbXTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzLnVuc3Vic2NyaWJlLmJpbmQodGhpcywgdGhpcy5zdWJzY3JpYmVycy5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmUoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBlbWl0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSBudWxsO1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gW107XG4gICAgfVxufVxuY2xhc3MgRXZlbnRFbWl0dGVycyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLnZpZXdVcGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHRoaXMudXBkYXRlVmlld0RhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy52aWV3VXBkYXRlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5hY3Rpb24uZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXdEYXRlLmRlc3Ryb3koKTtcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRFbkxvY2FsaXphdGlvbiA9IHtcbiAgICBjbGVhcjogJ0NsZWFyIHNlbGVjdGlvbicsXG4gICAgY2xvc2U6ICdDbG9zZSB0aGUgcGlja2VyJyxcbiAgICBkYXRlRm9ybWF0czogRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmRhdGVGb3JtYXRzLFxuICAgIGRheVZpZXdIZWFkZXJGb3JtYXQ6IHsgbW9udGg6ICdsb25nJywgeWVhcjogJzItZGlnaXQnIH0sXG4gICAgZGVjcmVtZW50SG91cjogJ0RlY3JlbWVudCBIb3VyJyxcbiAgICBkZWNyZW1lbnRNaW51dGU6ICdEZWNyZW1lbnQgTWludXRlJyxcbiAgICBkZWNyZW1lbnRTZWNvbmQ6ICdEZWNyZW1lbnQgU2Vjb25kJyxcbiAgICBmb3JtYXQ6IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5mb3JtYXQsXG4gICAgaG91ckN5Y2xlOiBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEuaG91ckN5Y2xlLFxuICAgIGluY3JlbWVudEhvdXI6ICdJbmNyZW1lbnQgSG91cicsXG4gICAgaW5jcmVtZW50TWludXRlOiAnSW5jcmVtZW50IE1pbnV0ZScsXG4gICAgaW5jcmVtZW50U2Vjb25kOiAnSW5jcmVtZW50IFNlY29uZCcsXG4gICAgbG9jYWxlOiBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEubG9jYWxlLFxuICAgIG5leHRDZW50dXJ5OiAnTmV4dCBDZW50dXJ5JyxcbiAgICBuZXh0RGVjYWRlOiAnTmV4dCBEZWNhZGUnLFxuICAgIG5leHRNb250aDogJ05leHQgTW9udGgnLFxuICAgIG5leHRZZWFyOiAnTmV4dCBZZWFyJyxcbiAgICBvcmRpbmFsOiBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEub3JkaW5hbCxcbiAgICBwaWNrSG91cjogJ1BpY2sgSG91cicsXG4gICAgcGlja01pbnV0ZTogJ1BpY2sgTWludXRlJyxcbiAgICBwaWNrU2Vjb25kOiAnUGljayBTZWNvbmQnLFxuICAgIHByZXZpb3VzQ2VudHVyeTogJ1ByZXZpb3VzIENlbnR1cnknLFxuICAgIHByZXZpb3VzRGVjYWRlOiAnUHJldmlvdXMgRGVjYWRlJyxcbiAgICBwcmV2aW91c01vbnRoOiAnUHJldmlvdXMgTW9udGgnLFxuICAgIHByZXZpb3VzWWVhcjogJ1ByZXZpb3VzIFllYXInLFxuICAgIHNlbGVjdERhdGU6ICdTZWxlY3QgRGF0ZScsXG4gICAgc2VsZWN0RGVjYWRlOiAnU2VsZWN0IERlY2FkZScsXG4gICAgc2VsZWN0TW9udGg6ICdTZWxlY3QgTW9udGgnLFxuICAgIHNlbGVjdFRpbWU6ICdTZWxlY3QgVGltZScsXG4gICAgc2VsZWN0WWVhcjogJ1NlbGVjdCBZZWFyJyxcbiAgICBzdGFydE9mVGhlV2VlazogMCxcbiAgICB0b2RheTogJ0dvIHRvIHRvZGF5JyxcbiAgICB0b2dnbGVNZXJpZGllbTogJ1RvZ2dsZSBNZXJpZGllbScsXG59O1xuY29uc3QgRGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgYWxsb3dJbnB1dFRvZ2dsZTogZmFsc2UsXG4gICAgY29udGFpbmVyOiB1bmRlZmluZWQsXG4gICAgZGF0ZVJhbmdlOiBmYWxzZSxcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgZGVmYXVsdERhdGU6IHVuZGVmaW5lZCxcbiAgICBkaXNwbGF5OiB7XG4gICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICB0eXBlOiAnaWNvbnMnLFxuICAgICAgICAgICAgdGltZTogJ2ZhLXNvbGlkIGZhLWNsb2NrJyxcbiAgICAgICAgICAgIGRhdGU6ICdmYS1zb2xpZCBmYS1jYWxlbmRhcicsXG4gICAgICAgICAgICB1cDogJ2ZhLXNvbGlkIGZhLWFycm93LXVwJyxcbiAgICAgICAgICAgIGRvd246ICdmYS1zb2xpZCBmYS1hcnJvdy1kb3duJyxcbiAgICAgICAgICAgIHByZXZpb3VzOiAnZmEtc29saWQgZmEtY2hldnJvbi1sZWZ0JyxcbiAgICAgICAgICAgIG5leHQ6ICdmYS1zb2xpZCBmYS1jaGV2cm9uLXJpZ2h0JyxcbiAgICAgICAgICAgIHRvZGF5OiAnZmEtc29saWQgZmEtY2FsZW5kYXItY2hlY2snLFxuICAgICAgICAgICAgY2xlYXI6ICdmYS1zb2xpZCBmYS10cmFzaCcsXG4gICAgICAgICAgICBjbG9zZTogJ2ZhLXNvbGlkIGZhLXhtYXJrJyxcbiAgICAgICAgfSxcbiAgICAgICAgc2lkZUJ5U2lkZTogZmFsc2UsXG4gICAgICAgIGNhbGVuZGFyV2Vla3M6IGZhbHNlLFxuICAgICAgICB2aWV3TW9kZTogJ2NhbGVuZGFyJyxcbiAgICAgICAgdG9vbGJhclBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICAgIGtlZXBPcGVuOiBmYWxzZSxcbiAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgdG9kYXk6IGZhbHNlLFxuICAgICAgICAgICAgY2xlYXI6IGZhbHNlLFxuICAgICAgICAgICAgY2xvc2U6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBjYWxlbmRhcjogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGU6IHRydWUsXG4gICAgICAgICAgICBtb250aDogdHJ1ZSxcbiAgICAgICAgICAgIHllYXI6IHRydWUsXG4gICAgICAgICAgICBkZWNhZGVzOiB0cnVlLFxuICAgICAgICAgICAgY2xvY2s6IHRydWUsXG4gICAgICAgICAgICBob3VyczogdHJ1ZSxcbiAgICAgICAgICAgIG1pbnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBzZWNvbmRzOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZVR3ZW50eWZvdXJIb3VyOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICAgIGlubGluZTogZmFsc2UsXG4gICAgICAgIHRoZW1lOiAnYXV0bycsXG4gICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgfSxcbiAgICBrZWVwSW52YWxpZDogZmFsc2UsXG4gICAgbG9jYWxpemF0aW9uOiBkZWZhdWx0RW5Mb2NhbGl6YXRpb24sXG4gICAgbWV0YToge30sXG4gICAgbXVsdGlwbGVEYXRlczogZmFsc2UsXG4gICAgbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJzsgJyxcbiAgICBwcm9tcHRUaW1lT25EYXRlQ2hhbmdlOiBmYWxzZSxcbiAgICBwcm9tcHRUaW1lT25EYXRlQ2hhbmdlVHJhbnNpdGlvbkRlbGF5OiAyMDAsXG4gICAgcmVzdHJpY3Rpb25zOiB7XG4gICAgICAgIG1pbkRhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4RGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICBkaXNhYmxlZERhdGVzOiBbXSxcbiAgICAgICAgZW5hYmxlZERhdGVzOiBbXSxcbiAgICAgICAgZGF5c09mV2Vla0Rpc2FibGVkOiBbXSxcbiAgICAgICAgZGlzYWJsZWRUaW1lSW50ZXJ2YWxzOiBbXSxcbiAgICAgICAgZGlzYWJsZWRIb3VyczogW10sXG4gICAgICAgIGVuYWJsZWRIb3VyczogW10sXG4gICAgfSxcbiAgICBzdGVwcGluZzogMSxcbiAgICB1c2VDdXJyZW50OiB0cnVlLFxuICAgIHZpZXdEYXRlOiBuZXcgRGF0ZVRpbWUoKSxcbn07XG5jb25zdCBEZWZhdWx0RW5Mb2NhbGl6YXRpb24gPSB7IC4uLmRlZmF1bHRFbkxvY2FsaXphdGlvbiB9O1xuXG4vKipcbiAqIEF0dGVtcHRzIHRvIHByb3ZlIGBkYCBpcyBhIERhdGVUaW1lIG9yIERhdGUgb3IgY2FuIGJlIGNvbnZlcnRlZCBpbnRvIG9uZS5cbiAqIEBwYXJhbSBkIElmIGEgc3RyaW5nIHdpbGwgYXR0ZW1wdCBjcmVhdGluZyBhIGRhdGUgZnJvbSBpdC5cbiAqIEBwYXJhbSBsb2NhbGl6YXRpb24gb2JqZWN0IGNvbnRhaW5pbmcgbG9jYWxlIGFuZCBmb3JtYXQgc2V0dGluZ3MuIE9ubHkgdXNlZCB3aXRoIHRoZSBjdXN0b20gZm9ybWF0c1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdHJ5Q29udmVydFRvRGF0ZVRpbWUoZCwgbG9jYWxpemF0aW9uKSB7XG4gICAgaWYgKCFkKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBpZiAoZC5jb25zdHJ1Y3Rvci5uYW1lID09PSBEYXRlVGltZS5uYW1lKVxuICAgICAgICByZXR1cm4gZDtcbiAgICBpZiAoZC5jb25zdHJ1Y3Rvci5uYW1lID09PSBEYXRlLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIERhdGVUaW1lLmNvbnZlcnQoZCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZCA9PT0gdHlwZW9mICcnKSB7XG4gICAgICAgIGNvbnN0IGRhdGVUaW1lID0gRGF0ZVRpbWUuZnJvbVN0cmluZyhkLCBsb2NhbGl6YXRpb24pO1xuICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoZGF0ZVRpbWUpID09PSAnbnVsbCcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlVGltZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vKipcbiAqIEF0dGVtcHRzIHRvIGNvbnZlcnQgYGRgIHRvIGEgRGF0ZVRpbWUgb2JqZWN0XG4gKiBAcGFyYW0gZCB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0gb3B0aW9uTmFtZSBQcm92aWRlcyB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzIGUuZy4gZGlzYWJsZWREYXRlc1xuICogQHBhcmFtIGxvY2FsaXphdGlvbiBvYmplY3QgY29udGFpbmluZyBsb2NhbGUgYW5kIGZvcm1hdCBzZXR0aW5ncy4gT25seSB1c2VkIHdpdGggdGhlIGN1c3RvbSBmb3JtYXRzXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRUb0RhdGVUaW1lKGQsIG9wdGlvbk5hbWUsIGxvY2FsaXphdGlvbikge1xuICAgIGlmICh0eXBlb2YgZCA9PT0gdHlwZW9mICcnICYmIG9wdGlvbk5hbWUgIT09ICdpbnB1dCcpIHtcbiAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuZGF0ZVN0cmluZygpO1xuICAgIH1cbiAgICBjb25zdCBjb252ZXJ0ZWQgPSB0cnlDb252ZXJ0VG9EYXRlVGltZShkLCBsb2NhbGl6YXRpb24pO1xuICAgIGlmICghY29udmVydGVkKSB7XG4gICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmZhaWxlZFRvUGFyc2VEYXRlKG9wdGlvbk5hbWUsIGQsIG9wdGlvbk5hbWUgPT09ICdpbnB1dCcpO1xuICAgIH1cbiAgICByZXR1cm4gY29udmVydGVkO1xufVxuLyoqXG4gKiBUeXBlIGNoZWNrcyB0aGF0IGB2YWx1ZWAgaXMgYW4gYXJyYXkgb2YgRGF0ZSBvciBEYXRlVGltZVxuICogQHBhcmFtIG9wdGlvbk5hbWUgUHJvdmlkZXMgdGV4dCB0byBlcnJvciBtZXNzYWdlcyBlLmcuIGRpc2FibGVkRGF0ZXNcbiAqIEBwYXJhbSB2YWx1ZSBPcHRpb24gdmFsdWVcbiAqIEBwYXJhbSBwcm92aWRlZFR5cGUgVXNlZCB0byBwcm92aWRlIHRleHQgdG8gZXJyb3IgbWVzc2FnZXNcbiAqIEBwYXJhbSBsb2NhbGl6YXRpb25cbiAqL1xuZnVuY3Rpb24gdHlwZUNoZWNrRGF0ZUFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxucHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24gPSBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChvcHRpb25OYW1lLCBwcm92aWRlZFR5cGUsICdhcnJheSBvZiBEYXRlVGltZSBvciBEYXRlJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZCA9IHZhbHVlW2ldO1xuICAgICAgICBjb25zdCBkYXRlVGltZSA9IGNvbnZlcnRUb0RhdGVUaW1lKGQsIG9wdGlvbk5hbWUsIGxvY2FsaXphdGlvbik7XG4gICAgICAgIGRhdGVUaW1lLnNldExvY2FsaXphdGlvbihsb2NhbGl6YXRpb24pO1xuICAgICAgICB2YWx1ZVtpXSA9IGRhdGVUaW1lO1xuICAgIH1cbn1cbi8qKlxuICogVHlwZSBjaGVja3MgdGhhdCBgdmFsdWVgIGlzIGFuIGFycmF5IG9mIG51bWJlcnNcbiAqIEBwYXJhbSBvcHRpb25OYW1lIFByb3ZpZGVzIHRleHQgdG8gZXJyb3IgbWVzc2FnZXMgZS5nLiBkaXNhYmxlZERhdGVzXG4gKiBAcGFyYW0gdmFsdWUgT3B0aW9uIHZhbHVlXG4gKiBAcGFyYW0gcHJvdmlkZWRUeXBlIFVzZWQgdG8gcHJvdmlkZSB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzXG4gKi9cbmZ1bmN0aW9uIHR5cGVDaGVja051bWJlckFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxucHJvdmlkZWRUeXBlKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5zb21lKCh4KSA9PiB0eXBlb2YgeCAhPT0gdHlwZW9mIDApKSB7XG4gICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChvcHRpb25OYW1lLCBwcm92aWRlZFR5cGUsICdhcnJheSBvZiBudW1iZXJzJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYW5kYXRvcnlEYXRlKGtleSkge1xuICAgIHJldHVybiAoeyB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24gfSkgPT4ge1xuICAgICAgICBjb25zdCBkYXRlVGltZSA9IGNvbnZlcnRUb0RhdGVUaW1lKHZhbHVlLCBrZXksIGxvY2FsaXphdGlvbik7XG4gICAgICAgIGlmIChkYXRlVGltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXRlVGltZS5zZXRMb2NhbGl6YXRpb24obG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlVGltZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBvcHRpb25hbERhdGUoa2V5KSB7XG4gICAgY29uc3QgbWFuZGF0b3J5ID0gbWFuZGF0b3J5RGF0ZShrZXkpO1xuICAgIHJldHVybiAoYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFuZGF0b3J5KGFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudW1iZXJzSW5SYW5nZShrZXksIGxvd2VyLCB1cHBlcikge1xuICAgIHJldHVybiAoeyB2YWx1ZSwgcHJvdmlkZWRUeXBlIH0pID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICB0eXBlQ2hlY2tOdW1iZXJBcnJheShrZXksIHZhbHVlLCBwcm92aWRlZFR5cGUpO1xuICAgICAgICBpZiAodmFsdWUuc29tZSgoeCkgPT4geCA8IGxvd2VyIHx8IHggPiB1cHBlcikpXG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5udW1iZXJzT3V0T2ZSYW5nZShrZXksIGxvd2VyLCB1cHBlcik7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdmFsaWRIb3VyUmFuZ2Uoa2V5KSB7XG4gICAgcmV0dXJuIG51bWJlcnNJblJhbmdlKGtleSwgMCwgMjMpO1xufVxuZnVuY3Rpb24gdmFsaWREYXRlQXJyYXkoa2V5KSB7XG4gICAgcmV0dXJuICh7IHZhbHVlLCBwcm92aWRlZFR5cGUsIGxvY2FsaXphdGlvbiB9KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgdHlwZUNoZWNrRGF0ZUFycmF5KGtleSwgdmFsdWUsIHByb3ZpZGVkVHlwZSwgbG9jYWxpemF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59XG5mdW5jdGlvbiB2YWxpZEtleU9wdGlvbihrZXlPcHRpb25zKSB7XG4gICAgcmV0dXJuICh7IHZhbHVlLCBwYXRoIH0pID0+IHtcbiAgICAgICAgaWYgKCFrZXlPcHRpb25zLmluY2x1ZGVzKHZhbHVlKSlcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnVuZXhwZWN0ZWRPcHRpb25WYWx1ZShwYXRoLnN1YnN0cmluZygxKSwgdmFsdWUsIGtleU9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn1cbmNvbnN0IG9wdGlvblByb2Nlc3NvcnMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBkZWZhdWx0RGF0ZTogbWFuZGF0b3J5RGF0ZSgnZGVmYXVsdERhdGUnKSxcbiAgICB2aWV3RGF0ZTogbWFuZGF0b3J5RGF0ZSgndmlld0RhdGUnKSxcbiAgICBtaW5EYXRlOiBvcHRpb25hbERhdGUoJ3Jlc3RyaWN0aW9ucy5taW5EYXRlJyksXG4gICAgbWF4RGF0ZTogb3B0aW9uYWxEYXRlKCdyZXN0cmljdGlvbnMubWF4RGF0ZScpLFxuICAgIGRpc2FibGVkSG91cnM6IHZhbGlkSG91clJhbmdlKCdyZXN0cmljdGlvbnMuZGlzYWJsZWRIb3VycycpLFxuICAgIGVuYWJsZWRIb3VyczogdmFsaWRIb3VyUmFuZ2UoJ3Jlc3RyaWN0aW9ucy5lbmFibGVkSG91cnMnKSxcbiAgICBkaXNhYmxlZERhdGVzOiB2YWxpZERhdGVBcnJheSgncmVzdHJpY3Rpb25zLmRpc2FibGVkRGF0ZXMnKSxcbiAgICBlbmFibGVkRGF0ZXM6IHZhbGlkRGF0ZUFycmF5KCdyZXN0cmljdGlvbnMuZW5hYmxlZERhdGVzJyksXG4gICAgZGF5c09mV2Vla0Rpc2FibGVkOiBudW1iZXJzSW5SYW5nZSgncmVzdHJpY3Rpb25zLmRheXNPZldlZWtEaXNhYmxlZCcsIDAsIDYpLFxuICAgIGRpc2FibGVkVGltZUludGVydmFsczogKHsga2V5LCB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24gfSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChrZXksIHByb3ZpZGVkVHlwZSwgJ2FycmF5IG9mIHsgZnJvbTogRGF0ZVRpbWV8RGF0ZSwgdG86IERhdGVUaW1lfERhdGUgfScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlT2JqZWN0ID0gdmFsdWU7IC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVPYmplY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlT2JqZWN0W2ldKS5mb3JFYWNoKCh2aykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk9wdGlvbk5hbWUgPSBgJHtrZXl9WyR7aX1dLiR7dmt9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBkID0gdmFsdWVPYmplY3RbaV1bdmtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVUaW1lID0gY29udmVydFRvRGF0ZVRpbWUoZCwgc3ViT3B0aW9uTmFtZSwgbG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgICAgICBkYXRlVGltZS5zZXRMb2NhbGl6YXRpb24obG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgICAgICB2YWx1ZU9iamVjdFtpXVt2a10gPSBkYXRlVGltZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZU9iamVjdDtcbiAgICB9LFxuICAgIHRvb2xiYXJQbGFjZW1lbnQ6IHZhbGlkS2V5T3B0aW9uKFsndG9wJywgJ2JvdHRvbScsICdkZWZhdWx0J10pLFxuICAgIHR5cGU6IHZhbGlkS2V5T3B0aW9uKFsnaWNvbnMnLCAnc3ByaXRlcyddKSxcbiAgICB2aWV3TW9kZTogdmFsaWRLZXlPcHRpb24oW1xuICAgICAgICAnY2xvY2snLFxuICAgICAgICAnY2FsZW5kYXInLFxuICAgICAgICAnbW9udGhzJyxcbiAgICAgICAgJ3llYXJzJyxcbiAgICAgICAgJ2RlY2FkZXMnLFxuICAgIF0pLFxuICAgIHRoZW1lOiB2YWxpZEtleU9wdGlvbihbJ2xpZ2h0JywgJ2RhcmsnLCAnYXV0byddKSxcbiAgICBwbGFjZW1lbnQ6IHZhbGlkS2V5T3B0aW9uKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgICBtZXRhOiAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSxcbiAgICBkYXlWaWV3SGVhZGVyRm9ybWF0OiAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSxcbiAgICBjb250YWluZXI6ICh7IHZhbHVlLCBwYXRoIH0pID0+IHtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICAhKHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHxcbiAgICAgICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIEVsZW1lbnQgfHxcbiAgICAgICAgICAgICAgICB2YWx1ZT8uYXBwZW5kQ2hpbGQpKSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy50eXBlTWlzbWF0Y2gocGF0aC5zdWJzdHJpbmcoMSksIHR5cGVvZiB2YWx1ZSwgJ0hUTUxFbGVtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgdXNlVHdlbnR5Zm91ckhvdXI6ICh7IHZhbHVlLCBwYXRoLCBwcm92aWRlZFR5cGUsIGRlZmF1bHRUeXBlIH0pID0+IHtcbiAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuZGVwcmVjYXRlZFdhcm5pbmcoJ3VzZVR3ZW50eWZvdXJIb3VyJywgJ1BsZWFzZSB1c2UgXCJvcHRpb25zLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGVcIiBpbnN0ZWFkJyk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHByb3ZpZGVkVHlwZSA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy50eXBlTWlzbWF0Y2gocGF0aCwgcHJvdmlkZWRUeXBlLCBkZWZhdWx0VHlwZSk7XG4gICAgfSxcbiAgICBob3VyQ3ljbGU6IHZhbGlkS2V5T3B0aW9uKFsnaDExJywgJ2gxMicsICdoMjMnLCAnaDI0J10pLFxufSk7XG5jb25zdCBkZWZhdWx0UHJvY2Vzc29yID0gKHsgdmFsdWUsIGRlZmF1bHRUeXBlLCBwcm92aWRlZFR5cGUsIHBhdGgsIH0pID0+IHtcbiAgICBzd2l0Y2ggKGRlZmF1bHRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09IHRydWU7XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICByZXR1cm4gK3ZhbHVlO1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChwYXRoLCBwcm92aWRlZFR5cGUsIGRlZmF1bHRUeXBlKTtcbiAgICB9XG59O1xuZnVuY3Rpb24gcHJvY2Vzc0tleShhcmdzKSB7XG4gICAgcmV0dXJuIChvcHRpb25Qcm9jZXNzb3JzW2FyZ3Mua2V5XSB8fCBkZWZhdWx0UHJvY2Vzc29yKShhcmdzKTtcbn1cblxuY2xhc3MgT3B0aW9uQ29udmVydGVyIHtcbiAgICBzdGF0aWMgZGVlcENvcHkoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgbyA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhpbnB1dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBpbnB1dFtrZXldO1xuICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudCBpbnN0YW5jZW9mIERhdGVUaW1lKSB7XG4gICAgICAgICAgICAgICAgb1trZXldID0gaW5wdXRFbGVtZW50LmNsb25lO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0RWxlbWVudCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBuZXcgRGF0ZShpbnB1dEVsZW1lbnQudmFsdWVPZigpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvW2tleV0gPSBpbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0RWxlbWVudCAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fFxuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGlucHV0RWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBPcHRpb25Db252ZXJ0ZXIuZGVlcENvcHkoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kcyB2YWx1ZSBvdXQgb2YgYW4gb2JqZWN0IGJhc2VkIG9uIGEgc3RyaW5nLCBwZXJpb2QgZGVsaW1pdGVkLCBwYXRoXG4gICAgICogQHBhcmFtIHBhdGhzXG4gICAgICogQHBhcmFtIG9ialxuICAgICAqL1xuICAgIHN0YXRpYyBvYmplY3RQYXRoKHBhdGhzLCBvYmopIHtcbiAgICAgICAgaWYgKHBhdGhzLmNoYXJBdCgwKSA9PT0gJy4nKVxuICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5zbGljZSgxKTtcbiAgICAgICAgaWYgKCFwYXRocylcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIHJldHVybiBwYXRoc1xuICAgICAgICAgICAgLnNwbGl0KCcuJylcbiAgICAgICAgICAgIC5yZWR1Y2UoKHZhbHVlLCBrZXkpID0+IE9wdGlvbkNvbnZlcnRlci5pc1ZhbHVlKHZhbHVlKSB8fCBPcHRpb25Db252ZXJ0ZXIuaXNWYWx1ZSh2YWx1ZVtrZXldKVxuICAgICAgICAgICAgPyB2YWx1ZVtrZXldXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCwgb2JqKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHNwcmVhZCBvcGVyYXRvciBjYXVzZWQgc3ViIGtleXMgdG8gYmUgbWlzc2luZyBhZnRlciBtZXJnaW5nLlxuICAgICAqIFRoaXMgaXMgdG8gZml4IHRoYXQgaXNzdWUgYnkgdXNpbmcgc3ByZWFkIG9uIHRoZSBjaGlsZCBvYmplY3RzIGZpcnN0LlxuICAgICAqIEFsc28gaGFuZGxlcyBjb21wbGV4IG9wdGlvbnMgbGlrZSBkaXNhYmxlZERhdGVzXG4gICAgICogQHBhcmFtIHByb3ZpZGVkIEFuIG9wdGlvbiBmcm9tIG5ldyBwcm92aWRlZE9wdGlvbnNcbiAgICAgKiBAcGFyYW0gY29weVRvIERlc3RpbmF0aW9uIG9iamVjdC4gVGhpcyB3YXMgYWRkZWQgdG8gcHJldmVudCByZWZlcmVuY2UgY29waWVzXG4gICAgICogQHBhcmFtIGxvY2FsaXphdGlvblxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICovXG4gICAgc3RhdGljIHNwcmVhZChwcm92aWRlZCwgY29weVRvLCBsb2NhbGl6YXRpb24sIHBhdGggPSAnJykge1xuICAgICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IE9wdGlvbkNvbnZlcnRlci5vYmplY3RQYXRoKHBhdGgsIERlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgY29uc3QgdW5zdXBwb3J0ZWRPcHRpb25zID0gT2JqZWN0LmtleXMocHJvdmlkZWQpLmZpbHRlcigoeCkgPT4gIU9iamVjdC5rZXlzKGRlZmF1bHRPcHRpb25zKS5pbmNsdWRlcyh4KSk7XG4gICAgICAgIGlmICh1bnN1cHBvcnRlZE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmxhdHRlbmVkT3B0aW9ucyA9IE9wdGlvbkNvbnZlcnRlci5nZXRGbGF0dGVuRGVmYXVsdE9wdGlvbnMoKTtcbiAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IHVuc3VwcG9ydGVkT3B0aW9ucy5tYXAoKHgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBgXCIke3BhdGh9LiR7eH1cIiBpbiBub3QgYSBrbm93biBvcHRpb24uYDtcbiAgICAgICAgICAgICAgICBjb25zdCBkaWRZb3VNZWFuID0gZmxhdHRlbmVkT3B0aW9ucy5maW5kKCh5KSA9PiB5LmluY2x1ZGVzKHgpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlkWW91TWVhbilcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgKz0gYCBEaWQgeW91IG1lYW4gXCIke2RpZFlvdU1lYW59XCI/YDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnVuZXhwZWN0ZWRPcHRpb25zKGVycm9ycyk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMocHJvdmlkZWQpXG4gICAgICAgICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gJ19fcHJvdG9fXycgJiYga2V5ICE9PSAnY29uc3RydWN0b3InKVxuICAgICAgICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgcGF0aCArPSBgLiR7a2V5fWA7XG4gICAgICAgICAgICBpZiAocGF0aC5jaGFyQXQoMCkgPT09ICcuJylcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zbGljZSgxKTtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25WYWx1ZSA9IGRlZmF1bHRPcHRpb25zW2tleV07XG4gICAgICAgICAgICBjb25zdCBwcm92aWRlZFR5cGUgPSB0eXBlb2YgcHJvdmlkZWRba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRUeXBlID0gdHlwZW9mIGRlZmF1bHRPcHRpb25WYWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvdmlkZWRba2V5XTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29weVRvW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sYXN0SW5kZXhPZihgLiR7a2V5fWApKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmF1bHRPcHRpb25WYWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheShwcm92aWRlZFtrZXldKSAmJlxuICAgICAgICAgICAgICAgICEoZGVmYXVsdE9wdGlvblZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICAgICAgICAgICAgICAgICBPcHRpb25Db252ZXJ0ZXIuaWdub3JlUHJvcGVydGllcy5pbmNsdWRlcyhrZXkpKSkge1xuICAgICAgICAgICAgICAgIE9wdGlvbkNvbnZlcnRlci5zcHJlYWQocHJvdmlkZWRba2V5XSwgY29weVRvW2tleV0sIGxvY2FsaXphdGlvbiwgcGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3B5VG9ba2V5XSA9IE9wdGlvbkNvbnZlcnRlci5wcm9jZXNzS2V5KGtleSwgdmFsdWUsIHByb3ZpZGVkVHlwZSwgZGVmYXVsdFR5cGUsIHBhdGgsIGxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sYXN0SW5kZXhPZihgLiR7a2V5fWApKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBwcm9jZXNzS2V5KGtleSwgdmFsdWUsIC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcHJvdmlkZWRUeXBlLCBkZWZhdWx0VHlwZSwgcGF0aCwgbG9jYWxpemF0aW9uKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzS2V5KHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgcHJvdmlkZWRUeXBlLFxuICAgICAgICAgICAgZGVmYXVsdFR5cGUsXG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbG9jYWxpemF0aW9uLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIF9tZXJnZU9wdGlvbnMocHJvdmlkZWRPcHRpb25zLCBtZXJnZVRvKSB7XG4gICAgICAgIGNvbnN0IG5ld0NvbmZpZyA9IE9wdGlvbkNvbnZlcnRlci5kZWVwQ29weShtZXJnZVRvKTtcbiAgICAgICAgLy9zZWUgaWYgdGhlIG9wdGlvbnMgc3BlY2lmeSBhIGxvY2FsZVxuICAgICAgICBjb25zdCBsb2NhbGl6YXRpb24gPSBtZXJnZVRvLmxvY2FsaXphdGlvbj8ubG9jYWxlICE9PSAnZGVmYXVsdCdcbiAgICAgICAgICAgID8gbWVyZ2VUby5sb2NhbGl6YXRpb25cbiAgICAgICAgICAgIDogcHJvdmlkZWRPcHRpb25zPy5sb2NhbGl6YXRpb24gfHwgRGVmYXVsdE9wdGlvbnMubG9jYWxpemF0aW9uO1xuICAgICAgICBPcHRpb25Db252ZXJ0ZXIuc3ByZWFkKHByb3ZpZGVkT3B0aW9ucywgbmV3Q29uZmlnLCBsb2NhbGl6YXRpb24sICcnKTtcbiAgICAgICAgcmV0dXJuIG5ld0NvbmZpZztcbiAgICB9XG4gICAgc3RhdGljIF9kYXRhVG9PcHRpb25zKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZURhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVsZW1lbnQuZGF0YXNldCkpO1xuICAgICAgICBpZiAoZURhdGE/LnRkVGFyZ2V0SW5wdXQpXG4gICAgICAgICAgICBkZWxldGUgZURhdGEudGRUYXJnZXRJbnB1dDtcbiAgICAgICAgaWYgKGVEYXRhPy50ZFRhcmdldFRvZ2dsZSlcbiAgICAgICAgICAgIGRlbGV0ZSBlRGF0YS50ZFRhcmdldFRvZ2dsZTtcbiAgICAgICAgaWYgKCFlRGF0YSB8fFxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZURhdGEpLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgZURhdGEuY29uc3RydWN0b3IgIT09IERPTVN0cmluZ01hcClcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICBjb25zdCBkYXRhT3B0aW9ucyA9IHt9O1xuICAgICAgICAvLyBiZWNhdXNlIGRhdGFzZXQgcmV0dXJucyBjYW1lbENhc2UgaW5jbHVkaW5nIHRoZSAndGQnIGtleSB0aGUgb3B0aW9uXG4gICAgICAgIC8vIGtleSB3b24ndCBhbGlnblxuICAgICAgICBjb25zdCBvYmplY3RUb05vcm1hbGl6ZWQgPSAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb3dlcmVkID0ge307XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goKHgpID0+IHtcbiAgICAgICAgICAgICAgICBsb3dlcmVkW3gudG9Mb3dlckNhc2UoKV0gPSB4O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbG93ZXJlZDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplT2JqZWN0ID0gdGhpcy5ub3JtYWxpemVPYmplY3Qob2JqZWN0VG9Ob3JtYWxpemVkKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uc0xvd2VyID0gb2JqZWN0VG9Ob3JtYWxpemVkKG9wdGlvbnMpO1xuICAgICAgICBPYmplY3Qua2V5cyhlRGF0YSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguc3RhcnRzV2l0aChOYW1lc3BhY2UuZGF0YUtleSkpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4LnN1YnN0cmluZygyKSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBrZXlPcHRpb24gPSBvcHRpb25zTG93ZXJba2V5LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgICAgLy8gZGF0YXNldCBtZXJnZXMgZGFzaGVzIHRvIGNhbWVsQ2FzZS4uLiB5YXlcbiAgICAgICAgICAgIC8vIGkuZS4ga2V5ID0gZGlzcGxheV9jb21wb25lbnRzX3NlY29uZHNcbiAgICAgICAgICAgIGlmIChrZXkuaW5jbHVkZXMoJ18nKSkge1xuICAgICAgICAgICAgICAgIC8vIFtkaXNwbGF5LCBjb21wb25lbnRzLCBzZWNvbmRzXVxuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0ID0ga2V5LnNwbGl0KCdfJyk7XG4gICAgICAgICAgICAgICAgLy8gZGlzcGxheVxuICAgICAgICAgICAgICAgIGtleU9wdGlvbiA9IG9wdGlvbnNMb3dlcltzcGxpdFswXS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5T3B0aW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXlPcHRpb25dLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YU9wdGlvbnNba2V5T3B0aW9uXSA9IG5vcm1hbGl6ZU9iamVjdChzcGxpdCwgMSwgb3B0aW9uc1trZXlPcHRpb25dLCBlRGF0YVtgdGQke2tleX1gXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3Iga2V5ID0gbXVsdGlwbGVEYXRlXG4gICAgICAgICAgICBlbHNlIGlmIChrZXlPcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRhdGFPcHRpb25zW2tleU9wdGlvbl0gPSBlRGF0YVtgdGQke2tleX1gXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXJnZU9wdGlvbnMoZGF0YU9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvL3RvZG8gY2xlYW4gdGhpcyB1cFxuICAgIHN0YXRpYyBub3JtYWxpemVPYmplY3Qob2JqZWN0VG9Ob3JtYWxpemVkKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZU9iamVjdCA9IChzcGxpdCwgaW5kZXgsIG9wdGlvblN1Ymdyb3VwLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gZmlyc3Qgcm91bmQgPSBkaXNwbGF5IHsgLi4uIH1cbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRPcHRpb25zID0gb2JqZWN0VG9Ob3JtYWxpemVkKG9wdGlvblN1Ymdyb3VwKTtcbiAgICAgICAgICAgIGNvbnN0IGtleU9wdGlvbiA9IG5vcm1hbGl6ZWRPcHRpb25zW3NwbGl0W2luZGV4XS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICAgIGNvbnN0IGludGVybmFsT2JqZWN0ID0ge307XG4gICAgICAgICAgICBpZiAoa2V5T3B0aW9uID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsT2JqZWN0O1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhbm90aGVyIG9iamVjdCwgY29udGludWUgZG93biB0aGUgcmFiYml0IGhvbGVcbiAgICAgICAgICAgIGlmIChvcHRpb25TdWJncm91cFtrZXlPcHRpb25dLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGludGVybmFsT2JqZWN0W2tleU9wdGlvbl0gPSBub3JtYWxpemVPYmplY3Qoc3BsaXQsIGluZGV4LCBvcHRpb25TdWJncm91cFtrZXlPcHRpb25dLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnRlcm5hbE9iamVjdFtrZXlPcHRpb25dID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxPYmplY3Q7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub3JtYWxpemVPYmplY3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIHByb3ZlIGBkYCBpcyBhIERhdGVUaW1lIG9yIERhdGUgb3IgY2FuIGJlIGNvbnZlcnRlZCBpbnRvIG9uZS5cbiAgICAgKiBAcGFyYW0gZCBJZiBhIHN0cmluZyB3aWxsIGF0dGVtcHQgY3JlYXRpbmcgYSBkYXRlIGZyb20gaXQuXG4gICAgICogQHBhcmFtIGxvY2FsaXphdGlvbiBvYmplY3QgY29udGFpbmluZyBsb2NhbGUgYW5kIGZvcm1hdCBzZXR0aW5ncy4gT25seSB1c2VkIHdpdGggdGhlIGN1c3RvbSBmb3JtYXRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzdGF0aWMgX2RhdGVUeXBlQ2hlY2soZCwgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBsb2NhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRyeUNvbnZlcnRUb0RhdGVUaW1lKGQsIGxvY2FsaXphdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFR5cGUgY2hlY2tzIHRoYXQgYHZhbHVlYCBpcyBhbiBhcnJheSBvZiBEYXRlIG9yIERhdGVUaW1lXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWUgUHJvdmlkZXMgdGV4dCB0byBlcnJvciBtZXNzYWdlcyBlLmcuIGRpc2FibGVkRGF0ZXNcbiAgICAgKiBAcGFyYW0gdmFsdWUgT3B0aW9uIHZhbHVlXG4gICAgICogQHBhcmFtIHByb3ZpZGVkVHlwZSBVc2VkIHRvIHByb3ZpZGUgdGV4dCB0byBlcnJvciBtZXNzYWdlc1xuICAgICAqIEBwYXJhbSBsb2NhbGl6YXRpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgX3R5cGVDaGVja0RhdGVBcnJheShvcHRpb25OYW1lLCB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVDaGVja0RhdGVBcnJheShvcHRpb25OYW1lLCB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUeXBlIGNoZWNrcyB0aGF0IGB2YWx1ZWAgaXMgYW4gYXJyYXkgb2YgbnVtYmVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lIFByb3ZpZGVzIHRleHQgdG8gZXJyb3IgbWVzc2FnZXMgZS5nLiBkaXNhYmxlZERhdGVzXG4gICAgICogQHBhcmFtIHZhbHVlIE9wdGlvbiB2YWx1ZVxuICAgICAqIEBwYXJhbSBwcm92aWRlZFR5cGUgVXNlZCB0byBwcm92aWRlIHRleHQgdG8gZXJyb3IgbWVzc2FnZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgX3R5cGVDaGVja051bWJlckFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCBwcm92aWRlZFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVDaGVja051bWJlckFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCBwcm92aWRlZFR5cGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBjb252ZXJ0IGBkYCB0byBhIERhdGVUaW1lIG9iamVjdFxuICAgICAqIEBwYXJhbSBkIHZhbHVlIHRvIGNvbnZlcnRcbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZSBQcm92aWRlcyB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzIGUuZy4gZGlzYWJsZWREYXRlc1xuICAgICAqIEBwYXJhbSBsb2NhbGl6YXRpb24gb2JqZWN0IGNvbnRhaW5pbmcgbG9jYWxlIGFuZCBmb3JtYXQgc2V0dGluZ3MuIE9ubHkgdXNlZCB3aXRoIHRoZSBjdXN0b20gZm9ybWF0c1xuICAgICAqL1xuICAgIHN0YXRpYyBkYXRlQ29udmVyc2lvbihkLCAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIG9wdGlvbk5hbWUsIGxvY2FsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gY29udmVydFRvRGF0ZVRpbWUoZCwgb3B0aW9uTmFtZSwgbG9jYWxpemF0aW9uKTtcbiAgICB9XG4gICAgc3RhdGljIGdldEZsYXR0ZW5EZWZhdWx0T3B0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZsYXR0ZW5EZWZhdWx0cylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mbGF0dGVuRGVmYXVsdHM7XG4gICAgICAgIGNvbnN0IGRlZXBLZXlzID0gKHQsIHByZSA9IFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICBpZiAoT2JqZWN0KHQpID09PSB0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHQpLmZsYXRNYXAoKFtrLCB2XSkgPT4gZGVlcEtleXModiwgWy4uLnByZSwga10pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmUuam9pbignLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9mbGF0dGVuRGVmYXVsdHMgPSBkZWVwS2V5cyhEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9mbGF0dGVuRGVmYXVsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNvbWUgb3B0aW9ucyBjb25mbGljdCBsaWtlIG1pbi9tYXggZGF0ZS4gVmVyaWZ5IHRoYXQgdGhlc2Uga2luZHMgb2Ygb3B0aW9uc1xuICAgICAqIGFyZSBzZXQgY29ycmVjdGx5LlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBzdGF0aWMgX3ZhbGlkYXRlQ29uZmxpY3RzKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLmRpc3BsYXkuc2lkZUJ5U2lkZSAmJlxuICAgICAgICAgICAgKCFjb25maWcuZGlzcGxheS5jb21wb25lbnRzLmNsb2NrIHx8XG4gICAgICAgICAgICAgICAgIShjb25maWcuZGlzcGxheS5jb21wb25lbnRzLmhvdXJzIHx8XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMubWludXRlcyB8fFxuICAgICAgICAgICAgICAgICAgICBjb25maWcuZGlzcGxheS5jb21wb25lbnRzLnNlY29uZHMpKSkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY29uZmxpY3RpbmdDb25maWd1cmF0aW9uKCdDYW5ub3QgdXNlIHNpZGUgYnkgc2lkZSBtb2RlIHdpdGhvdXQgdGhlIGNsb2NrIGNvbXBvbmVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLnJlc3RyaWN0aW9ucy5taW5EYXRlICYmIGNvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZSkge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5yZXN0cmljdGlvbnMubWluRGF0ZS5pc0FmdGVyKGNvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5jb25mbGljdGluZ0NvbmZpZ3VyYXRpb24oJ21pbkRhdGUgaXMgYWZ0ZXIgbWF4RGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZS5pc0JlZm9yZShjb25maWcucmVzdHJpY3Rpb25zLm1pbkRhdGUpKSB7XG4gICAgICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY29uZmxpY3RpbmdDb25maWd1cmF0aW9uKCdtYXhEYXRlIGlzIGJlZm9yZSBtaW5EYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5tdWx0aXBsZURhdGVzICYmIGNvbmZpZy5kYXRlUmFuZ2UpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmNvbmZsaWN0aW5nQ29uZmlndXJhdGlvbignQ2Fubm90IHVzcyBvcHRpb24gXCJtdWx0aXBsZURhdGVzXCIgd2l0aCBcImRhdGVSYW5nZVwiJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5PcHRpb25Db252ZXJ0ZXIuaWdub3JlUHJvcGVydGllcyA9IFtcbiAgICAnbWV0YScsXG4gICAgJ2RheVZpZXdIZWFkZXJGb3JtYXQnLFxuICAgICdjb250YWluZXInLFxuICAgICdkYXRlRm9ybXMnLFxuICAgICdvcmRpbmFsJyxcbl07XG5PcHRpb25Db252ZXJ0ZXIuaXNWYWx1ZSA9IChhKSA9PiBhICE9IG51bGw7IC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IHVuZGVmaW5lZCArIG51bGxcblxuY2xhc3MgRGF0ZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9kYXRlcyA9IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRXZlbnRFbWl0dGVycyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFycmF5IG9mIHNlbGVjdGVkIGRhdGVzXG4gICAgICovXG4gICAgZ2V0IHBpY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLl9kYXRlc107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhc3QgcGlja2VkIHZhbHVlLlxuICAgICAqL1xuICAgIGdldCBsYXN0UGlja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZXNbdGhpcy5sYXN0UGlja2VkSW5kZXhdPy5jbG9uZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHBpY2tlZCBkYXRlcyAtMSBvciAwIGlmIG5vbmUgYXJlIHNlbGVjdGVkLlxuICAgICAqL1xuICAgIGdldCBsYXN0UGlja2VkSW5kZXgoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVzLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvcm1hdHMgYSBEYXRlVGltZSBvYmplY3QgdG8gYSBzdHJpbmcuIFVzZWQgd2hlbiBzZXR0aW5nIHRoZSBpbnB1dCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAqL1xuICAgIGZvcm1hdElucHV0KGRhdGUpIHtcbiAgICAgICAgaWYgKCFkYXRlKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBkYXRlLmxvY2FsaXphdGlvbiA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uO1xuICAgICAgICByZXR1cm4gZGF0ZS5mb3JtYXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogcGFyc2UgdGhlIHZhbHVlIGludG8gYSBEYXRlVGltZSBvYmplY3QuXG4gICAgICogdGhpcyBjYW4gYmUgb3ZlcndyaXR0ZW4gdG8gc3VwcGx5IHlvdXIgb3duIHBhcnNpbmcuXG4gICAgICovXG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHBhcnNlSW5wdXQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbkNvbnZlcnRlci5kYXRlQ29udmVyc2lvbih2YWx1ZSwgJ2lucHV0JywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBjb252ZXJ0IHRoZSBwcm92aWRlZCB2YWx1ZSB0byBhIERhdGVUaW1lIG9iamVjdC5cbiAgICAgKiBJZiB2YWx1ZSBpcyBudWxsfHVuZGVmaW5lZCB0aGVuIGNsZWFyIHRoZSB2YWx1ZSBvZiB0aGUgcHJvdmlkZWQgaW5kZXggKG9yIDApLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBjb252ZXJ0IG9yIG51bGx8dW5kZWZpbmVkXG4gICAgICogQHBhcmFtIGluZGV4IFdoZW4gdXNpbmcgbXVsdGlkYXRlcyB0aGlzIGlzIHRoZSBpbmRleCBpbiB0aGUgYXJyYXlcbiAgICAgKi9cbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgc2V0RnJvbUlucHV0KHZhbHVlLCBpbmRleCkge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHVuZGVmaW5lZCwgaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IHRoaXMucGFyc2VJbnB1dCh2YWx1ZSk7XG4gICAgICAgIGlmIChjb252ZXJ0ZWQpIHtcbiAgICAgICAgICAgIGNvbnZlcnRlZC5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShjb252ZXJ0ZWQsIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbmV3IERhdGVUaW1lIHRvIHNlbGVjdGVkIGRhdGVzIGFycmF5XG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKi9cbiAgICBhZGQoZGF0ZSkge1xuICAgICAgICB0aGlzLl9kYXRlcy5wdXNoKGRhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGB0YXJnZXREYXRlYCBpcyBwYXJ0IG9mIHRoZSBzZWxlY3RlZCBkYXRlcyBhcnJheS5cbiAgICAgKiBJZiBgdW5pdGAgaXMgcHJvdmlkZWQgdGhlbiBhIGdyYW51bGFyaXR5IHRvIHRoYXQgdW5pdCB3aWxsIGJlIHVzZWQuXG4gICAgICogQHBhcmFtIHRhcmdldERhdGVcbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqL1xuICAgIGlzUGlja2VkKHRhcmdldERhdGUsIHVuaXQpIHtcbiAgICAgICAgaWYgKCFEYXRlVGltZS5pc1ZhbGlkKHRhcmdldERhdGUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXVuaXQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZXMuZmluZCgoeCkgPT4geC5pc1NhbWUodGFyZ2V0RGF0ZSkpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGZvcm1hdCA9IGdldEZvcm1hdEJ5VW5pdCh1bml0KTtcbiAgICAgICAgY29uc3QgaW5uZXJEYXRlRm9ybWF0dGVkID0gdGFyZ2V0RGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9kYXRlc1xuICAgICAgICAgICAgLm1hcCgoeCkgPT4geC5mb3JtYXQoZm9ybWF0KSlcbiAgICAgICAgICAgIC5maW5kKCh4KSA9PiB4ID09PSBpbm5lckRhdGVGb3JtYXR0ZWQpICE9PSB1bmRlZmluZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBhdCB3aGljaCBgdGFyZ2V0RGF0ZWAgaXMgaW4gdGhlIGFycmF5LlxuICAgICAqIFRoaXMgaXMgdXNlZCBmb3IgdXBkYXRpbmcgb3IgcmVtb3ZpbmcgYSBkYXRlIHdoZW4gbXVsdGktZGF0ZSBpcyB1c2VkXG4gICAgICogSWYgYHVuaXRgIGlzIHByb3ZpZGVkIHRoZW4gYSBncmFudWxhcml0eSB0byB0aGF0IHVuaXQgd2lsbCBiZSB1c2VkLlxuICAgICAqIEBwYXJhbSB0YXJnZXREYXRlXG4gICAgICogQHBhcmFtIHVuaXRcbiAgICAgKi9cbiAgICBwaWNrZWRJbmRleCh0YXJnZXREYXRlLCB1bml0KSB7XG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZCh0YXJnZXREYXRlKSlcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgaWYgKCF1bml0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVzLm1hcCgoeCkgPT4geC52YWx1ZU9mKCkpLmluZGV4T2YodGFyZ2V0RGF0ZS52YWx1ZU9mKCkpO1xuICAgICAgICBjb25zdCBmb3JtYXQgPSBnZXRGb3JtYXRCeVVuaXQodW5pdCk7XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZUZvcm1hdHRlZCA9IHRhcmdldERhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlcy5tYXAoKHgpID0+IHguZm9ybWF0KGZvcm1hdCkpLmluZGV4T2YoaW5uZXJEYXRlRm9ybWF0dGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGFsbCBzZWxlY3RlZCBkYXRlcy5cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IE5hbWVzcGFjZS5ldmVudHMuY2hhbmdlLFxuICAgICAgICAgICAgZGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb2xkRGF0ZTogdGhpcy5sYXN0UGlja2VkLFxuICAgICAgICAgICAgaXNDbGVhcjogdHJ1ZSxcbiAgICAgICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9kYXRlcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuaW5wdXQpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZURpc3BsYXkuZW1pdCgnYWxsJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIFwiYm9vayBlbmRcIiB5ZWFycyBnaXZlbiBhIGB5ZWFyYCBhbmQgYSBgZmFjdG9yYFxuICAgICAqIEBwYXJhbSBmYWN0b3IgZS5nLiAxMDAgZm9yIGRlY2FkZXNcbiAgICAgKiBAcGFyYW0geWVhciBlLmcuIDIwMjFcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0U3RhcnRFbmRZZWFyKGZhY3RvciwgeWVhcikge1xuICAgICAgICBjb25zdCBzdGVwID0gZmFjdG9yIC8gMTAsIHN0YXJ0WWVhciA9IE1hdGguZmxvb3IoeWVhciAvIGZhY3RvcikgKiBmYWN0b3IsIGVuZFllYXIgPSBzdGFydFllYXIgKyBzdGVwICogOSwgZm9jdXNWYWx1ZSA9IE1hdGguZmxvb3IoeWVhciAvIHN0ZXApICogc3RlcDtcbiAgICAgICAgcmV0dXJuIFtzdGFydFllYXIsIGVuZFllYXIsIGZvY3VzVmFsdWVdO1xuICAgIH1cbiAgICB1cGRhdGVJbnB1dCh0YXJnZXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5mb3JtYXRJbnB1dCh0YXJnZXQpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLl9kYXRlc1xuICAgICAgICAgICAgICAgIC5tYXAoKGQpID0+IHRoaXMuZm9ybWF0SW5wdXQoZCkpXG4gICAgICAgICAgICAgICAgLmpvaW4odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWUgIT0gbmV3VmFsdWUpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBlaXRoZXIgY2xlYXIgb3Igc2V0IHRoZSBgdGFyZ2V0YCBkYXRlIGF0IGBpbmRleGAuXG4gICAgICogSWYgdGhlIGB0YXJnZXRgIGlzIG51bGwgdGhlbiB0aGUgZGF0ZSB3aWxsIGJlIGNsZWFyZWQuXG4gICAgICogSWYgbXVsdGktZGF0ZSBpcyBiZWluZyB1c2VkIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIGFycmF5LlxuICAgICAqIElmIGB0YXJnZXRgIGlzIHZhbGlkIGFuZCBtdWx0aS1kYXRlIGlzIHVzZWQgdGhlbiBpZiBgaW5kZXhgIGlzXG4gICAgICogcHJvdmlkZWQgdGhlIGRhdGUgYXQgdGhhdCBpbmRleCB3aWxsIGJlIHJlcGxhY2VkLCBvdGhlcndpc2UgaXQgaXMgYXBwZW5kZWQuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqL1xuICAgIHNldFZhbHVlKHRhcmdldCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3Qgbm9JbmRleCA9IHR5cGVvZiBpbmRleCA9PT0gJ3VuZGVmaW5lZCcsIGlzQ2xlYXIgPSAhdGFyZ2V0ICYmIG5vSW5kZXg7XG4gICAgICAgIGxldCBvbGREYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgPyBudWxsIDogdGhpcy5fZGF0ZXNbaW5kZXhdPy5jbG9uZTtcbiAgICAgICAgaWYgKCFvbGREYXRlICYmICF0aGlzLm9wdGlvbnNTdG9yZS51bnNldCAmJiBub0luZGV4ICYmIGlzQ2xlYXIpIHtcbiAgICAgICAgICAgIG9sZERhdGUgPSB0aGlzLmxhc3RQaWNrZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldCAmJiBvbGREYXRlPy5pc1NhbWUodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dCh0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhc2Ugb2YgY2FsbGluZyBzZXRWYWx1ZShudWxsKVxuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0VmFsdWVOdWxsKGlzQ2xlYXIsIGluZGV4LCBvbGREYXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbmRleCA9IGluZGV4IHx8IDA7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5jbG9uZTtcbiAgICAgICAgLy8gbWludXRlIHN0ZXBwaW5nIGlzIGJlaW5nIHVzZWQsIGZvcmNlIHRoZSBtaW51dGUgdG8gdGhlIGNsb3Nlc3QgdmFsdWVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcgIT09IDEpIHtcbiAgICAgICAgICAgIHRhcmdldC5taW51dGVzID1cbiAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHRhcmdldC5taW51dGVzIC8gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZykgKlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nO1xuICAgICAgICAgICAgdGFyZ2V0LnN0YXJ0T2YoVW5pdC5taW51dGVzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvblVwZGF0ZSA9IChpc1ZhbGlkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9kYXRlc1tpbmRleF0gPSB0YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZVZpZXdEYXRlLmVtaXQodGFyZ2V0LmNsb25lKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQodGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZURpc3BsYXkuZW1pdCgnYWxsJyk7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5lbWl0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBOYW1lc3BhY2UuZXZlbnRzLmNoYW5nZSxcbiAgICAgICAgICAgICAgICBkYXRlOiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgb2xkRGF0ZSxcbiAgICAgICAgICAgICAgICBpc0NsZWFyLFxuICAgICAgICAgICAgICAgIGlzVmFsaWQ6IGlzVmFsaWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRhcmdldCkgJiZcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5kYXRlUmFuZ2VJc1ZhbGlkKHRoaXMucGlja2VkLCBpbmRleCwgdGFyZ2V0KSkge1xuICAgICAgICAgICAgb25VcGRhdGUodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMua2VlcEludmFsaWQpIHtcbiAgICAgICAgICAgIG9uVXBkYXRlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IE5hbWVzcGFjZS5ldmVudHMuZXJyb3IsXG4gICAgICAgICAgICByZWFzb246IE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmZhaWxlZFRvU2V0SW52YWxpZERhdGUsXG4gICAgICAgICAgICBkYXRlOiB0YXJnZXQsXG4gICAgICAgICAgICBvbGREYXRlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NldFZhbHVlTnVsbChpc0NsZWFyLCBpbmRleCwgb2xkRGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlcyB8fFxuICAgICAgICAgICAgdGhpcy5fZGF0ZXMubGVuZ3RoID09PSAxIHx8XG4gICAgICAgICAgICBpc0NsZWFyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS51bnNldCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9kYXRlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGF0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0KCk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudHJpZ2dlckV2ZW50LmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogTmFtZXNwYWNlLmV2ZW50cy5jaGFuZ2UsXG4gICAgICAgICAgICBkYXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvbGREYXRlLFxuICAgICAgICAgICAgaXNDbGVhcixcbiAgICAgICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZURpc3BsYXkuZW1pdCgnYWxsJyk7XG4gICAgfVxufVxuXG52YXIgQWN0aW9uVHlwZXM7XG4oZnVuY3Rpb24gKEFjdGlvblR5cGVzKSB7XG4gICAgQWN0aW9uVHlwZXNbXCJuZXh0XCJdID0gXCJuZXh0XCI7XG4gICAgQWN0aW9uVHlwZXNbXCJwcmV2aW91c1wiXSA9IFwicHJldmlvdXNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImNoYW5nZUNhbGVuZGFyVmlld1wiXSA9IFwiY2hhbmdlQ2FsZW5kYXJWaWV3XCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzZWxlY3RNb250aFwiXSA9IFwic2VsZWN0TW9udGhcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdFllYXJcIl0gPSBcInNlbGVjdFllYXJcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdERlY2FkZVwiXSA9IFwic2VsZWN0RGVjYWRlXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzZWxlY3REYXlcIl0gPSBcInNlbGVjdERheVwiO1xuICAgIEFjdGlvblR5cGVzW1wic2VsZWN0SG91clwiXSA9IFwic2VsZWN0SG91clwiO1xuICAgIEFjdGlvblR5cGVzW1wic2VsZWN0TWludXRlXCJdID0gXCJzZWxlY3RNaW51dGVcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdFNlY29uZFwiXSA9IFwic2VsZWN0U2Vjb25kXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJpbmNyZW1lbnRIb3Vyc1wiXSA9IFwiaW5jcmVtZW50SG91cnNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImluY3JlbWVudE1pbnV0ZXNcIl0gPSBcImluY3JlbWVudE1pbnV0ZXNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImluY3JlbWVudFNlY29uZHNcIl0gPSBcImluY3JlbWVudFNlY29uZHNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImRlY3JlbWVudEhvdXJzXCJdID0gXCJkZWNyZW1lbnRIb3Vyc1wiO1xuICAgIEFjdGlvblR5cGVzW1wiZGVjcmVtZW50TWludXRlc1wiXSA9IFwiZGVjcmVtZW50TWludXRlc1wiO1xuICAgIEFjdGlvblR5cGVzW1wiZGVjcmVtZW50U2Vjb25kc1wiXSA9IFwiZGVjcmVtZW50U2Vjb25kc1wiO1xuICAgIEFjdGlvblR5cGVzW1widG9nZ2xlTWVyaWRpZW1cIl0gPSBcInRvZ2dsZU1lcmlkaWVtXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJ0b2dnbGVQaWNrZXJcIl0gPSBcInRvZ2dsZVBpY2tlclwiO1xuICAgIEFjdGlvblR5cGVzW1wic2hvd0Nsb2NrXCJdID0gXCJzaG93Q2xvY2tcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNob3dIb3Vyc1wiXSA9IFwic2hvd0hvdXJzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzaG93TWludXRlc1wiXSA9IFwic2hvd01pbnV0ZXNcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNob3dTZWNvbmRzXCJdID0gXCJzaG93U2Vjb25kc1wiO1xuICAgIEFjdGlvblR5cGVzW1wiY2xlYXJcIl0gPSBcImNsZWFyXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJjbG9zZVwiXSA9IFwiY2xvc2VcIjtcbiAgICBBY3Rpb25UeXBlc1tcInRvZGF5XCJdID0gXCJ0b2RheVwiO1xufSkoQWN0aW9uVHlwZXMgfHwgKEFjdGlvblR5cGVzID0ge30pKTtcbnZhciBBY3Rpb25UeXBlcyQxID0gQWN0aW9uVHlwZXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYGRhdGVgXG4gKi9cbmNsYXNzIERhdGVEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kYXlzQ29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZCguLi50aGlzLl9kYXlzT2ZUaGVXZWVrKCkpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jYWxlbmRhcldlZWtzLCBOYW1lc3BhY2UuY3NzLm5vSGlnaGxpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgcmFuZ2VIb3ZlckV2ZW50LCByYW5nZUhvdmVyT3V0RXZlbnQgfSA9IHRoaXMuaGFuZGxlTW91c2VFdmVudHMoY29udGFpbmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSAhPT0gMCAmJiBpICUgNyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jYWxlbmRhcldlZWtzLCBOYW1lc3BhY2UuY3NzLm5vSGlnaGxpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0RGF5KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICAgICAgLy8gaWYgaG92ZXIgaXMgc3VwcG9ydGVkIHRoZW4gYWRkIHRoZSBldmVudHNcbiAgICAgICAgICAgIGlmIChtYXRjaE1lZGlhKCcoaG92ZXI6IGhvdmVyKScpLm1hdGNoZXMgJiZcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSkge1xuICAgICAgICAgICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCByYW5nZUhvdmVyRXZlbnQpO1xuICAgICAgICAgICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHJhbmdlSG92ZXJPdXRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGVzIHRoZSBncmlkIGFuZCB1cGRhdGVzIGVuYWJsZWQgc3RhdGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHdpZGdldCwgcGFpbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5kYXlzQ29udGFpbmVyKVswXTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2FsZW5kYXJWaWV3KGNvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lXG4gICAgICAgICAgICAuc3RhcnRPZihVbml0Lm1vbnRoKVxuICAgICAgICAgICAgLnN0YXJ0T2YoJ3dlZWtEYXknLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zdGFydE9mVGhlV2VlaylcbiAgICAgICAgICAgIC5tYW5pcHVsYXRlKDEyLCBVbml0LmhvdXJzKTtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2FsZW5kYXJXZWVrcyhjb250YWluZXIsIGlubmVyRGF0ZS5jbG9uZSk7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3REYXl9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kYXkpO1xuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS5pc0JlZm9yZSh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSwgVW5pdC5tb250aCkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5vbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS5pc0FmdGVyKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLCBVbml0Lm1vbnRoKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLm5ldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ICYmXG4gICAgICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGF0ZVJhbmdlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5pc1BpY2tlZChpbm5lckRhdGUsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5hY3RpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzU2FtZShuZXcgRGF0ZVRpbWUoKSwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLnRvZGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUud2Vla0RheSA9PT0gMCB8fCBpbm5lckRhdGUud2Vla0RheSA9PT0gNikge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLndlZWtlbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faGFuZGxlRGF0ZVJhbmdlKGlubmVyRGF0ZSwgY2xhc3Nlcyk7XG4gICAgICAgICAgICBwYWludChVbml0LmRhdGUsIGlubmVyRGF0ZSwgY2xhc3NlcywgZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uZWxlbWVudC5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCB0aGlzLl9kYXRlVG9EYXRhVmFsdWUoaW5uZXJEYXRlKSk7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1kYXknLCBgJHtpbm5lckRhdGUuZGF0ZX1gKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gaW5uZXJEYXRlLnBhcnRzKHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgICAgICAgfSkuZGF5O1xuICAgICAgICAgICAgaW5uZXJEYXRlLm1hbmlwdWxhdGUoMSwgVW5pdC5kYXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9kYXRlVG9EYXRhVmFsdWUoZGF0ZSkge1xuICAgICAgICBpZiAoIURhdGVUaW1lLmlzVmFsaWQoZGF0ZSkpXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIHJldHVybiBgJHtkYXRlLnllYXJ9LSR7ZGF0ZS5tb250aEZvcm1hdHRlZH0tJHtkYXRlLmRhdGVGb3JtYXR0ZWR9YDtcbiAgICB9XG4gICAgX2hhbmRsZURhdGVSYW5nZShpbm5lckRhdGUsIGNsYXNzZXMpIHtcbiAgICAgICAgY29uc3QgcmFuZ2VTdGFydCA9IHRoaXMuZGF0ZXMucGlja2VkWzBdO1xuICAgICAgICBjb25zdCByYW5nZUVuZCA9IHRoaXMuZGF0ZXMucGlja2VkWzFdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kYXRlUmFuZ2UpIHtcbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUuaXNCZXR3ZWVuKHJhbmdlU3RhcnQsIHJhbmdlRW5kLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MucmFuZ2VJbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzU2FtZShyYW5nZVN0YXJ0LCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MucmFuZ2VTdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzU2FtZShyYW5nZUVuZCwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLnJhbmdlRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVNb3VzZUV2ZW50cyhjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgcmFuZ2VIb3ZlckV2ZW50ID0gKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBlPy5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSAwIG9yIDIgc2VsZWN0ZWQgb3IgaWYgdGhlIHRhcmdldCBpcyBkaXNhYmxlZCB0aGVuIGlnbm9yZVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXMucGlja2VkLmxlbmd0aCAhPT0gMSB8fFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIHNlbGVjdCBhbGwgdGhlIGRhdGUgZGl2c1xuICAgICAgICAgICAgY29uc3QgYWxsRGF5cyA9IFsuLi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmRheScpXTtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZGF0ZSB2YWx1ZSBmcm9tIHRoZSBlbGVtZW50IGJlaW5nIGhvdmVyZWQgb3ZlclxuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBjdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xuICAgICAgICAgICAgLy8gZm9ybWF0IHRoZSBzdHJpbmcgdG8gYSBkYXRlXG4gICAgICAgICAgICBjb25zdCBpbm5lckRhdGUgPSBEYXRlVGltZS5mcm9tU3RyaW5nKGF0dHJpYnV0ZVZhbHVlLCB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiAneXl5eS1NTS1kZCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHBvc2l0aW9uIG9mIHRoZSB0YXJnZXQgaW4gdGhlIGRhdGUgY29udGFpbmVyXG4gICAgICAgICAgICBjb25zdCBkYXlJbmRleCA9IGFsbERheXMuZmluZEluZGV4KChlKSA9PiBlLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpID09PSBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBmaXJzdCBhbmQgc2Vjb25kIHNlbGVjdGVkIGRhdGVzXG4gICAgICAgICAgICBjb25zdCByYW5nZVN0YXJ0ID0gdGhpcy5kYXRlcy5waWNrZWRbMF07XG4gICAgICAgICAgICBjb25zdCByYW5nZUVuZCA9IHRoaXMuZGF0ZXMucGlja2VkWzFdO1xuICAgICAgICAgICAgLy9mb3JtYXQgdGhlIHN0YXJ0IGRhdGUgc28gdGhhdCBpdCBjYW4gYmUgZm91bmQgYnkgdGhlIGF0dHJpYnV0ZVxuICAgICAgICAgICAgY29uc3QgcmFuZ2VTdGFydEZvcm1hdHRlZCA9IHRoaXMuX2RhdGVUb0RhdGFWYWx1ZShyYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlU3RhcnRJbmRleCA9IGFsbERheXMuZmluZEluZGV4KChlKSA9PiBlLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpID09PSByYW5nZVN0YXJ0Rm9ybWF0dGVkKTtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlU3RhcnRFbGVtZW50ID0gYWxsRGF5c1tyYW5nZVN0YXJ0SW5kZXhdO1xuICAgICAgICAgICAgLy9tYWtlIHN1cmUgd2UgZG9uJ3QgbGVhdmUgc3RhcnQvZW5kIGNsYXNzZXMgaWYgd2UgZG9uJ3QgbmVlZCB0aGVtXG4gICAgICAgICAgICBpZiAoIWlubmVyRGF0ZS5pc1NhbWUocmFuZ2VTdGFydCwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnJhbmdlU3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpbm5lckRhdGUuaXNTYW1lKHJhbmdlRW5kLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MucmFuZ2VFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBmaWd1cmVzIG91dCB3aGljaCBkaXJlY3QgZnJvbSBzdGFydCBkYXRlIGlzIHNlbGVjdGVkXG4gICAgICAgICAgICAvLyB0aGUgc2VsZWN0aW9uIFwiY2FwXCIgY2xhc3NlcyBhcmUgYXBwbGllZCBpZiBuZWVkZWRcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBhbGwgdGhlIGRhdGVzIGJldHdlZW4gd2lsbCBnZXQgdGhlIGByYW5nZUluYCBjbGFzcy5cbiAgICAgICAgICAgIC8vIFdlIG1ha2UgdGhpcyBzZWxlY3Rpb24gYmFzZWQgb24gdGhlIGVsZW1lbnQncyBpbmRleCBhbmQgdGhlIHJhbmdlU3RhcnQgaW5kZXhcbiAgICAgICAgICAgIGxldCBsYW1iZGE7XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzQmVmb3JlKHJhbmdlU3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MucmFuZ2VTdGFydCk7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydEVsZW1lbnQ/LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0RWxlbWVudD8uY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnJhbmdlRW5kKTtcbiAgICAgICAgICAgICAgICBsYW1iZGEgPSAoXywgaW5kZXgpID0+IGluZGV4ID4gZGF5SW5kZXggJiYgaW5kZXggPCByYW5nZVN0YXJ0SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5yYW5nZUVuZCk7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydEVsZW1lbnQ/LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZUVuZCk7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydEVsZW1lbnQ/LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5yYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICBsYW1iZGEgPSAoXywgaW5kZXgpID0+IGluZGV4IDwgZGF5SW5kZXggJiYgaW5kZXggPiByYW5nZVN0YXJ0SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbGxEYXlzLmZpbHRlcihsYW1iZGEpLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5yYW5nZUluKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCByYW5nZUhvdmVyT3V0RXZlbnQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgLy8gZmluZCBhbGwgdGhlIGRhdGVzIGluIHRoZSBjb250YWluZXJcbiAgICAgICAgICAgIGNvbnN0IGFsbERheXMgPSBbLi4uY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kYXknKV07XG4gICAgICAgICAgICAvLyBpZiBvbmx5IHRoZSBzdGFydCBpcyBzZWxlY3RlZCwgcmVtb3ZlIGFsbCB0aGUgcmFuZ2VJbiBjbGFzc2VzXG4gICAgICAgICAgICAvLyB3ZSBkbyB0aGlzIGJlY2F1c2Ugb25jZSB0aGUgdXNlciBob3ZlcnMgb3ZlciBhIG5ldyBkYXRlIHRoZSByYW5nZSB3aWxsIGJlIHJlY2FsY3VsYXRlZC5cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLnBpY2tlZC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgYWxsRGF5cy5mb3JFYWNoKChlKSA9PiBlLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZUluKSk7XG4gICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIDAgb3IgMiBkYXRlcyBzZWxlY3RlZCB0aGVuIGlnbm9yZVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXMucGlja2VkLmxlbmd0aCAhPT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gZT8uY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZWxlbWVudHMgZGF0ZSBmcm9tIHRoZSBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IG5ldyBEYXRlVGltZShjdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpKTtcbiAgICAgICAgICAgIC8vIHZlcmlmeSBzZWxlY3Rpb25zIGFuZCByZW1vdmUgaW52YWxpZCBjbGFzc2VzXG4gICAgICAgICAgICBpZiAoIWlubmVyRGF0ZS5pc1NhbWUodGhpcy5kYXRlcy5waWNrZWRbMF0sIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaW5uZXJEYXRlLmlzU2FtZSh0aGlzLmRhdGVzLnBpY2tlZFsxXSwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnJhbmdlRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2VIb3ZlckV2ZW50LCByYW5nZUhvdmVyT3V0RXZlbnQgfTtcbiAgICB9XG4gICAgX3VwZGF0ZUNhbGVuZGFyVmlldyhjb250YWluZXIpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3ICE9PSAnY2FsZW5kYXInKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBbcHJldmlvdXMsIHN3aXRjaGVyLCBuZXh0XSA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNhbGVuZGFySGVhZGVyKVswXVxuICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKTtcbiAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKE5hbWVzcGFjZS5jc3MuZGF5c0NvbnRhaW5lciwgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuZm9ybWF0KHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmRheVZpZXdIZWFkZXJGb3JtYXQpKTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMubW9udGhcbiAgICAgICAgICAgID8gc3dpdGNoZXIuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgOiBzd2l0Y2hlci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0Lm1vbnRoKSwgVW5pdC5tb250aClcbiAgICAgICAgICAgID8gcHJldmlvdXMuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgOiBwcmV2aW91cy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKDEsIFVuaXQubW9udGgpLCBVbml0Lm1vbnRoKVxuICAgICAgICAgICAgPyBuZXh0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgIDogbmV4dC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgIH1cbiAgICAvKioqXG4gICAgICogR2VuZXJhdGVzIGEgaHRtbCByb3cgdGhhdCBjb250YWlucyB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kYXlzT2ZUaGVXZWVrKCkge1xuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZVxuICAgICAgICAgICAgLnN0YXJ0T2YoJ3dlZWtEYXknLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zdGFydE9mVGhlV2VlaylcbiAgICAgICAgICAgIC5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaHRtbERpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNhbGVuZGFyV2Vla3MsIE5hbWVzcGFjZS5jc3Mubm9IaWdobGlnaHQpO1xuICAgICAgICAgICAgaHRtbERpdkVsZW1lbnQuaW5uZXJUZXh0ID0gJyMnO1xuICAgICAgICAgICAgcm93LnB1c2goaHRtbERpdkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaHRtbERpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRheU9mVGhlV2VlaywgTmFtZXNwYWNlLmNzcy5ub0hpZ2hsaWdodCk7XG4gICAgICAgICAgICBodG1sRGl2RWxlbWVudC5pbm5lclRleHQgPSBpbm5lckRhdGUuZm9ybWF0KHsgd2Vla2RheTogJ3Nob3J0JyB9KTtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDEsIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICByb3cucHVzaChodG1sRGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICB9XG4gICAgX2hhbmRsZUNhbGVuZGFyV2Vla3MoY29udGFpbmVyLCBpbm5lckRhdGUpIHtcbiAgICAgICAgWy4uLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGAuJHtOYW1lc3BhY2UuY3NzLmNhbGVuZGFyV2Vla3N9YCldXG4gICAgICAgICAgICAuZmlsdGVyKChlKSA9PiBlLmlubmVyVGV4dCAhPT0gJyMnKVxuICAgICAgICAgICAgLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7aW5uZXJEYXRlLndlZWt9YDtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDcsIFVuaXQuZGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCB1cGRhdGVzIHRoZSBncmlkIGZvciBgbW9udGhgXG4gKi9cbmNsYXNzIE1vbnRoRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZXMpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjb250YWluZXIgaHRtbCBmb3IgdGhlIGRpc3BsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFBpY2tlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MubW9udGhzQ29udGFpbmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zZWxlY3RNb250aCk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLm1vbnRoc0NvbnRhaW5lcilbMF07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9PT0gJ21vbnRocycpIHtcbiAgICAgICAgICAgIGNvbnN0IFtwcmV2aW91cywgc3dpdGNoZXIsIG5leHRdID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNhbGVuZGFySGVhZGVyKVswXVxuICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2Jyk7XG4gICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoTmFtZXNwYWNlLmNzcy5tb250aHNDb250YWluZXIsIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmZvcm1hdCh7IHllYXI6ICdudW1lcmljJyB9KSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy55ZWFyXG4gICAgICAgICAgICAgICAgPyBzd2l0Y2hlci5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBzd2l0Y2hlci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgtMSwgVW5pdC55ZWFyKSwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gcHJldmlvdXMuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogcHJldmlvdXMuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoMSwgVW5pdC55ZWFyKSwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gbmV4dC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBuZXh0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUuc3RhcnRPZihVbml0LnllYXIpO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hY3Rpb249XCIke0FjdGlvblR5cGVzJDEuc2VsZWN0TW9udGh9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb250YWluZXJDbG9uZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLm1vbnRoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLmlzUGlja2VkKGlubmVyRGF0ZSwgVW5pdC5tb250aCkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5hY3RpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQubW9udGgpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoVW5pdC5tb250aCwgaW5uZXJEYXRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7aW5kZXh9YCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5pbm5lclRleHQgPSBgJHtpbm5lckRhdGUuZm9ybWF0KHsgbW9udGg6ICdzaG9ydCcgfSl9YDtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDEsIFVuaXQubW9udGgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYHllYXJgXG4gKi9cbmNsYXNzIFllYXJEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lcik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0WWVhcik7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICB0aGlzLl9zdGFydFllYXIgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0LnllYXIpO1xuICAgICAgICB0aGlzLl9lbmRZZWFyID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgxMCwgVW5pdC55ZWFyKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lcilbMF07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9PT0gJ3llYXJzJykge1xuICAgICAgICAgICAgY29uc3QgW3ByZXZpb3VzLCBzd2l0Y2hlciwgbmV4dF0gPSBjb250YWluZXIucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXIpWzBdXG4gICAgICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKTtcbiAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZShOYW1lc3BhY2UuY3NzLnllYXJzQ29udGFpbmVyLCBgJHt0aGlzLl9zdGFydFllYXIuZm9ybWF0KHsgeWVhcjogJ251bWVyaWMnIH0pfS0ke3RoaXMuX2VuZFllYXIuZm9ybWF0KHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICB9KX1gKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmRlY2FkZXNcbiAgICAgICAgICAgICAgICA/IHN3aXRjaGVyLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IHN3aXRjaGVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLl9zdGFydFllYXIsIFVuaXQueWVhcilcbiAgICAgICAgICAgICAgICA/IHByZXZpb3VzLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IHByZXZpb3VzLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLl9lbmRZZWFyLCBVbml0LnllYXIpXG4gICAgICAgICAgICAgICAgPyBuZXh0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IG5leHQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZVxuICAgICAgICAgICAgLnN0YXJ0T2YoVW5pdC55ZWFyKVxuICAgICAgICAgICAgLm1hbmlwdWxhdGUoLTEsIFVuaXQueWVhcik7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3RZZWFyfVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGFpbmVyQ2xvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLnllYXIpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS51bnNldCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuaXNQaWNrZWQoaW5uZXJEYXRlLCBVbml0LnllYXIpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuYWN0aXZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQoaW5uZXJEYXRlLCBVbml0LnllYXIpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoVW5pdC55ZWFyLCBpbm5lckRhdGUsIGNsYXNzZXMsIGNvbnRhaW5lckNsb25lKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5yZW1vdmUoLi4uY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCBgJHtpbm5lckRhdGUueWVhcn1gKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IGlubmVyRGF0ZS5mb3JtYXQoeyB5ZWFyOiAnbnVtZXJpYycgfSk7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSgxLCBVbml0LnllYXIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYHNlY29uZHNgXG4gKi9cbmNsYXNzIERlY2FkZURpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRlY2FkZXNDb250YWluZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNlbGVjdERlY2FkZSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBEYXRlcy5nZXRTdGFydEVuZFllYXIoMTAwLCB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS55ZWFyKTtcbiAgICAgICAgdGhpcy5fc3RhcnREZWNhZGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5zdGFydE9mKFVuaXQueWVhcik7XG4gICAgICAgIHRoaXMuX3N0YXJ0RGVjYWRlLnllYXIgPSBzdGFydDtcbiAgICAgICAgdGhpcy5fZW5kRGVjYWRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUuc3RhcnRPZihVbml0LnllYXIpO1xuICAgICAgICB0aGlzLl9lbmREZWNhZGUueWVhciA9IGVuZDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyKVswXTtcbiAgICAgICAgY29uc3QgW3ByZXZpb3VzLCBzd2l0Y2hlciwgbmV4dF0gPSBjb250YWluZXIucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5jYWxlbmRhckhlYWRlcilbMF1cbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2Jyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9PT0gJ2RlY2FkZXMnKSB7XG4gICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyLCBgJHt0aGlzLl9zdGFydERlY2FkZS5mb3JtYXQoe1xuICAgICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIH0pfS0ke3RoaXMuX2VuZERlY2FkZS5mb3JtYXQoeyB5ZWFyOiAnbnVtZXJpYycgfSl9YCk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLl9zdGFydERlY2FkZSwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gcHJldmlvdXMuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogcHJldmlvdXMuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMuX2VuZERlY2FkZSwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gbmV4dC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBuZXh0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGlja2VkWWVhcnMgPSB0aGlzLmRhdGVzLnBpY2tlZC5tYXAoKHgpID0+IHgueWVhcik7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3REZWNhZGV9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb250YWluZXJDbG9uZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5vbGQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGFydERlY2FkZS55ZWFyIC0gMTAgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnRleHRDb250ZW50ID0gJyAnO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IHRoaXMuX3N0YXJ0RGVjYWRlLmNsb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFuaXB1bGF0ZSgtMTAsIFVuaXQueWVhcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mb3JtYXQoeyB5ZWFyOiAnbnVtZXJpYycgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIGAke3RoaXMuX3N0YXJ0RGVjYWRlLnllYXJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kZWNhZGUpO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREZWNhZGVZZWFyID0gdGhpcy5fc3RhcnREZWNhZGUueWVhcjtcbiAgICAgICAgICAgIGNvbnN0IGVuZERlY2FkZVllYXIgPSB0aGlzLl9zdGFydERlY2FkZS55ZWFyICsgOTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgJiZcbiAgICAgICAgICAgICAgICBwaWNrZWRZZWFycy5maWx0ZXIoKHgpID0+IHggPj0gc3RhcnREZWNhZGVZZWFyICYmIHggPD0gZW5kRGVjYWRlWWVhcilcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5hY3RpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoJ2RlY2FkZScsIHRoaXMuX3N0YXJ0RGVjYWRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7dGhpcy5fc3RhcnREZWNhZGUueWVhcn1gKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IGAke3RoaXMuX3N0YXJ0RGVjYWRlLmZvcm1hdCh7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgfSl9YDtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0RGVjYWRlLm1hbmlwdWxhdGUoMTAsIFVuaXQueWVhcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBjbG9jayBkaXNwbGF5XG4gKi9cbmNsYXNzIFRpbWVEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgPSAnJztcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgY2xvY2sgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKGljb25UYWcpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY2xvY2tDb250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKC4uLnRoaXMuX2dyaWQoaWNvblRhZykpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIHZhcmlvdXMgZWxlbWVudHMgd2l0aCBpbiB0aGUgY2xvY2sgZGlzcGxheVxuICAgICAqIGxpa2UgdGhlIGN1cnJlbnQgaG91ciBhbmQgaWYgdGhlIG1hbmlwdWxhdGlvbiBpY29ucyBhcmUgZW5hYmxlZC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0KSB7XG4gICAgICAgIGNvbnN0IHRpbWVzRGl2ID0gKHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2xvY2tDb250YWluZXIpWzBdKTtcbiAgICAgICAgbGV0IGxhc3RQaWNrZWQgPSB0aGlzLmRhdGVzLmxhc3RQaWNrZWQ/LmNsb25lO1xuICAgICAgICBpZiAoIWxhc3RQaWNrZWQgJiYgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy51c2VDdXJyZW50KVxuICAgICAgICAgICAgbGFzdFBpY2tlZCA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lO1xuICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaXNhYmxlZCcpXG4gICAgICAgICAgICAuZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmhvdXJzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoMSwgVW5pdC5ob3VycyksIFVuaXQuaG91cnMpKSB7XG4gICAgICAgICAgICAgICAgdGltZXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFjdGlvbj0ke0FjdGlvblR5cGVzJDEuaW5jcmVtZW50SG91cnN9XWApXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0LmhvdXJzKSwgVW5pdC5ob3VycykpIHtcbiAgICAgICAgICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRIb3Vyc31dYClcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lc0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS10aW1lLWNvbXBvbmVudD0ke1VuaXQuaG91cnN9XWApLmlubmVyVGV4dCA9IGxhc3RQaWNrZWRcbiAgICAgICAgICAgICAgICA/IGxhc3RQaWNrZWQuZ2V0SG91cnNGb3JtYXR0ZWQodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlKVxuICAgICAgICAgICAgICAgIDogJy0tJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMubWludXRlcykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKDEsIFVuaXQubWludXRlcyksIFVuaXQubWludXRlcykpIHtcbiAgICAgICAgICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRNaW51dGVzfV1gKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgtMSwgVW5pdC5taW51dGVzKSwgVW5pdC5taW51dGVzKSkge1xuICAgICAgICAgICAgICAgIHRpbWVzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3Rpb249JHtBY3Rpb25UeXBlcyQxLmRlY3JlbWVudE1pbnV0ZXN9XWApXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXNEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtdGltZS1jb21wb25lbnQ9JHtVbml0Lm1pbnV0ZXN9XWApLmlubmVyVGV4dCA9IGxhc3RQaWNrZWQgPyBsYXN0UGlja2VkLm1pbnV0ZXNGb3JtYXR0ZWQgOiAnLS0nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5zZWNvbmRzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoMSwgVW5pdC5zZWNvbmRzKSwgVW5pdC5zZWNvbmRzKSkge1xuICAgICAgICAgICAgICAgIHRpbWVzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3Rpb249JHtBY3Rpb25UeXBlcyQxLmluY3JlbWVudFNlY29uZHN9XWApXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0LnNlY29uZHMpLCBVbml0LnNlY29uZHMpKSB7XG4gICAgICAgICAgICAgICAgdGltZXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFjdGlvbj0ke0FjdGlvblR5cGVzJDEuZGVjcmVtZW50U2Vjb25kc31dYClcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lc0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS10aW1lLWNvbXBvbmVudD0ke1VuaXQuc2Vjb25kc31dYCkuaW5uZXJUZXh0ID0gbGFzdFBpY2tlZCA/IGxhc3RQaWNrZWQuc2Vjb25kc0Zvcm1hdHRlZCA6ICctLSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmlzVHdlbHZlSG91cikge1xuICAgICAgICAgICAgY29uc3QgdG9nZ2xlID0gdGltZXNEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS50b2dnbGVNZXJpZGllbX1dYCk7XG4gICAgICAgICAgICBjb25zdCBtZXJpZGllbURhdGUgPSAobGFzdFBpY2tlZCB8fCB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSkuY2xvbmU7XG4gICAgICAgICAgICB0b2dnbGUuaW5uZXJUZXh0ID0gbWVyaWRpZW1EYXRlLm1lcmlkaWVtKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKG1lcmlkaWVtRGF0ZS5tYW5pcHVsYXRlKG1lcmlkaWVtRGF0ZS5ob3VycyA+PSAxMiA/IC0xMiA6IDEyLCBVbml0LmhvdXJzKSkpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRpbWVzRGl2LnN0eWxlLmdyaWRUZW1wbGF0ZUFyZWFzID0gYFwiJHt0aGlzLl9ncmlkQ29sdW1uc31cImA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIHRhYmxlIGZvciB0aGUgY2xvY2sgZGlzcGxheSBkZXBlbmRpbmcgb24gd2hhdCBvcHRpb25zIGFyZSBzZWxlY3RlZC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9ncmlkKGljb25UYWcpIHtcbiAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgPSAnJztcbiAgICAgICAgY29uc3QgdG9wID0gW10sIG1pZGRsZSA9IFtdLCBib3R0b20gPSBbXSwgc2VwYXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIHVwSWNvbiA9IGljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnVwKSwgZG93bkljb24gPSBpY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy5kb3duKTtcbiAgICAgICAgc2VwYXJhdG9yLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zZXBhcmF0b3IsIE5hbWVzcGFjZS5jc3Mubm9IaWdobGlnaHQpO1xuICAgICAgICBjb25zdCBzZXBhcmF0b3JDb2xvbiA9IHNlcGFyYXRvci5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIHNlcGFyYXRvckNvbG9uLmlubmVySFRNTCA9ICc6JztcbiAgICAgICAgY29uc3QgZ2V0U2VwYXJhdG9yID0gKGNvbG9uID0gZmFsc2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvblxuICAgICAgICAgICAgICAgID8gc2VwYXJhdG9yQ29sb24uY2xvbmVOb2RlKHRydWUpXG4gICAgICAgICAgICAgICAgOiBzZXBhcmF0b3IuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuaG91cnMpIHtcbiAgICAgICAgICAgIGxldCBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5pbmNyZW1lbnRIb3VyKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuaW5jcmVtZW50SG91cnMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZCh1cEljb24uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHRvcC5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ucGlja0hvdXIpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zaG93SG91cnMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZS1jb21wb25lbnQnLCBVbml0LmhvdXJzKTtcbiAgICAgICAgICAgIG1pZGRsZS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uZGVjcmVtZW50SG91cik7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmRlY3JlbWVudEhvdXJzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoZG93bkljb24uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIGJvdHRvbS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgKz0gJ2EnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5taW51dGVzKSB7XG4gICAgICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyArPSAnIGEnO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmhvdXJzKSB7XG4gICAgICAgICAgICAgICAgdG9wLnB1c2goZ2V0U2VwYXJhdG9yKCkpO1xuICAgICAgICAgICAgICAgIG1pZGRsZS5wdXNoKGdldFNlcGFyYXRvcih0cnVlKSk7XG4gICAgICAgICAgICAgICAgYm90dG9tLnB1c2goZ2V0U2VwYXJhdG9yKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zICs9ICcgYSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uaW5jcmVtZW50TWludXRlKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuaW5jcmVtZW50TWludXRlcyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LmFwcGVuZENoaWxkKHVwSWNvbi5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgdG9wLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5waWNrTWludXRlKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2hvd01pbnV0ZXMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZS1jb21wb25lbnQnLCBVbml0Lm1pbnV0ZXMpO1xuICAgICAgICAgICAgbWlkZGxlLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5kZWNyZW1lbnRNaW51dGUpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRNaW51dGVzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoZG93bkljb24uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIGJvdHRvbS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5zZWNvbmRzKSB7XG4gICAgICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyArPSAnIGEnO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLm1pbnV0ZXMpIHtcbiAgICAgICAgICAgICAgICB0b3AucHVzaChnZXRTZXBhcmF0b3IoKSk7XG4gICAgICAgICAgICAgICAgbWlkZGxlLnB1c2goZ2V0U2VwYXJhdG9yKHRydWUpKTtcbiAgICAgICAgICAgICAgICBib3R0b20ucHVzaChnZXRTZXBhcmF0b3IoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgKz0gJyBhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5pbmNyZW1lbnRTZWNvbmQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRTZWNvbmRzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQodXBJY29uLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICB0b3AucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnBpY2tTZWNvbmQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zaG93U2Vjb25kcyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aW1lLWNvbXBvbmVudCcsIFVuaXQuc2Vjb25kcyk7XG4gICAgICAgICAgICBtaWRkbGUucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmRlY3JlbWVudFNlY29uZCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmRlY3JlbWVudFNlY29uZHMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZChkb3duSWNvbi5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgYm90dG9tLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmlzVHdlbHZlSG91cikge1xuICAgICAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgKz0gJyBhJztcbiAgICAgICAgICAgIGxldCBkaXZFbGVtZW50ID0gZ2V0U2VwYXJhdG9yKCk7XG4gICAgICAgICAgICB0b3AucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24udG9nZ2xlTWVyaWRpZW0pO1xuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnRvZ2dsZU1lcmlkaWVtKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICBpZiAoTmFtZXNwYWNlLmNzcy50b2dnbGVNZXJpZGllbS5pbmNsdWRlcygnLCcpKSB7XG4gICAgICAgICAgICAgICAgLy90b2RvIG1vdmUgdGhpcyB0byBwYWludCBmdW5jdGlvbj9cbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCguLi5OYW1lc3BhY2UuY3NzLnRvZ2dsZU1lcmlkaWVtLnNwbGl0KCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MudG9nZ2xlTWVyaWRpZW0pO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Mubm9IaWdobGlnaHQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICAgICAgbWlkZGxlLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZ2V0U2VwYXJhdG9yKCk7XG4gICAgICAgICAgICBib3R0b20ucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyA9IHRoaXMuX2dyaWRDb2x1bW5zLnRyaW0oKTtcbiAgICAgICAgcmV0dXJuIFsuLi50b3AsIC4uLm1pZGRsZSwgLi4uYm90dG9tXTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYGhvdXJzYFxuICovXG5jbGFzcyBIb3VyRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5ob3VyQ29udGFpbmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAodGhpcy5vcHRpb25zU3RvcmUuaXNUd2VsdmVIb3VyID8gMTIgOiAyNCk7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0SG91cik7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmhvdXJDb250YWluZXIpWzBdO1xuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3RIb3VyfVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGFpbmVyQ2xvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmhvdXIpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQuaG91cnMpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoVW5pdC5ob3VycywgaW5uZXJEYXRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7aW5uZXJEYXRlLmhvdXJzfWApO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuaW5uZXJUZXh0ID0gaW5uZXJEYXRlLmdldEhvdXJzRm9ybWF0dGVkKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmhvdXJDeWNsZSk7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSgxLCBVbml0LmhvdXJzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgZm9yIGBtaW51dGVzYFxuICovXG5jbGFzcyBNaW51dGVEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLm1pbnV0ZUNvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nID09PSAxXG4gICAgICAgICAgICA/IDVcbiAgICAgICAgICAgIDogdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MCAvIHN0ZXA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0TWludXRlKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgZ3JpZCBhbmQgdXBkYXRlcyBlbmFibGVkIHN0YXRlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh3aWRnZXQsIHBhaW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MubWludXRlQ29udGFpbmVyKVswXTtcbiAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUuc3RhcnRPZihVbml0LmhvdXJzKTtcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcgPT09IDFcbiAgICAgICAgICAgID8gNVxuICAgICAgICAgICAgOiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hY3Rpb249XCIke0FjdGlvblR5cGVzJDEuc2VsZWN0TWludXRlfVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGFpbmVyQ2xvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLm1pbnV0ZSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKGlubmVyRGF0ZSwgVW5pdC5taW51dGVzKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhaW50KFVuaXQubWludXRlcywgaW5uZXJEYXRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7aW5uZXJEYXRlLm1pbnV0ZXN9YCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5pbm5lclRleHQgPSBpbm5lckRhdGUubWludXRlc0Zvcm1hdHRlZDtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKHN0ZXAsIFVuaXQubWludXRlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCB1cGRhdGVzIHRoZSBncmlkIGZvciBgc2Vjb25kc2BcbiAqL1xuY2xhc3Mgc2Vjb25kRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zZWNvbmRDb250YWluZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNlbGVjdFNlY29uZCk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLnNlY29uZENvbnRhaW5lcilbMF07XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLnN0YXJ0T2YoVW5pdC5taW51dGVzKTtcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtYWN0aW9uPVwiJHtBY3Rpb25UeXBlcyQxLnNlbGVjdFNlY29uZH1cIl1gKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbnRhaW5lckNsb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5zZWNvbmQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQuc2Vjb25kcykpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWludChVbml0LnNlY29uZHMsIGlubmVyRGF0ZSwgY2xhc3NlcywgY29udGFpbmVyQ2xvbmUpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LnJlbW92ZSguLi5jb250YWluZXJDbG9uZS5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIGAke2lubmVyRGF0ZS5zZWNvbmRzfWApO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuaW5uZXJUZXh0ID0gaW5uZXJEYXRlLnNlY29uZHNGb3JtYXR0ZWQ7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSg1LCBVbml0LnNlY29uZHMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYSBjb2xsYXBzZSBmdW5jdGlvbmFsaXR5IHRvIHRoZSB2aWV3IGNoYW5nZXNcbiAqL1xuY2xhc3MgQ29sbGFwc2Uge1xuICAgIC8qKlxuICAgICAqIEZsaXBzIHRoZSBzaG93L2hpZGUgc3RhdGUgb2YgYHRhcmdldGBcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IGh0bWwgZWxlbWVudCB0byBhZmZlY3QuXG4gICAgICovXG4gICAgc3RhdGljIHRvZ2dsZSh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5zaG93KSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3codGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTa2lwcyBhbnkgYW5pbWF0aW9uIG9yIHRpbWVvdXRzIGFuZCBpbW1lZGlhdGVseSBzZXQgdGhlIGVsZW1lbnQgdG8gc2hvdy5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICovXG4gICAgc3RhdGljIHNob3dJbW1lZGlhdGVseSh0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5jb2xsYXBzaW5nKTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jb2xsYXBzZSwgTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBgdGFyZ2V0YCBpcyBub3QgYWxyZWFkeSBzaG93aW5nLCB0aGVuIHNob3cgYWZ0ZXIgdGhlIGFuaW1hdGlvbi5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICovXG4gICAgc3RhdGljIHNob3codGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3MuY29sbGFwc2luZykgfHxcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5zaG93KSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBDb2xsYXBzZS5zaG93SW1tZWRpYXRlbHkodGFyZ2V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcwJztcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5jb2xsYXBzZSk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY29sbGFwc2luZyk7XG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBzZXRUaW1lb3V0KGNvbXBsZXRlLCB0aGlzLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRhcmdldCkpO1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0LnNjcm9sbEhlaWdodH1weGA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNraXBzIGFueSBhbmltYXRpb24gb3IgdGltZW91dHMgYW5kIGltbWVkaWF0ZWx5IHNldCB0aGUgZWxlbWVudCB0byBoaWRlLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKi9cbiAgICBzdGF0aWMgaGlkZUltbWVkaWF0ZWx5KHRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5jb2xsYXBzaW5nLCBOYW1lc3BhY2UuY3NzLnNob3cpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNvbGxhcHNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgYHRhcmdldGAgaXMgbm90IGFscmVhZHkgaGlkZGVuLCB0aGVuIGhpZGUgYWZ0ZXIgdGhlIGFuaW1hdGlvbi5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0IEhUTUwgRWxlbWVudFxuICAgICAqL1xuICAgIHN0YXRpYyBoaWRlKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLmNvbGxhcHNpbmcpIHx8XG4gICAgICAgICAgICAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLnNob3cpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIENvbGxhcHNlLmhpZGVJbW1lZGlhdGVseSh0YXJnZXQpO1xuICAgICAgICB9O1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpWydoZWlnaHQnXX1weGA7XG4gICAgICAgIGNvbnN0IHJlZmxvdyA9IChlbGVtZW50KSA9PiBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgcmVmbG93KHRhcmdldCk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuY29sbGFwc2UsIE5hbWVzcGFjZS5jc3Muc2hvdyk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY29sbGFwc2luZyk7XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIHNldFRpbWVvdXQoY29tcGxldGUsIHRoaXMuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGFyZ2V0KSk7XG4gICAgfVxufVxuLyoqXG4gKiBHZXRzIHRoZSB0cmFuc2l0aW9uIGR1cmF0aW9uIGZyb20gdGhlIGBlbGVtZW50YCBieSBnZXR0aW5nIGNzcyBwcm9wZXJ0aWVzXG4gKiBgdHJhbnNpdGlvbi1kdXJhdGlvbmAgYW5kIGB0cmFuc2l0aW9uLWRlbGF5YFxuICogQHBhcmFtIGVsZW1lbnQgSFRNTCBFbGVtZW50XG4gKi9cbkNvbGxhcHNlLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50ID0gKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIC8vIEdldCB0cmFuc2l0aW9uLWR1cmF0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgbGV0IHsgdHJhbnNpdGlvbkR1cmF0aW9uLCB0cmFuc2l0aW9uRGVsYXkgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uID0gTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICBjb25zdCBmbG9hdFRyYW5zaXRpb25EZWxheSA9IE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSk7XG4gICAgLy8gUmV0dXJuIDAgaWYgZWxlbWVudCBvciB0cmFuc2l0aW9uIGR1cmF0aW9uIGlzIG5vdCBmb3VuZFxuICAgIGlmICghZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gJiYgIWZsb2F0VHJhbnNpdGlvbkRlbGF5KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICAvLyBJZiBtdWx0aXBsZSBkdXJhdGlvbnMgYXJlIGRlZmluZWQsIHRha2UgdGhlIGZpcnN0XG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uID0gdHJhbnNpdGlvbkR1cmF0aW9uLnNwbGl0KCcsJylbMF07XG4gICAgdHJhbnNpdGlvbkRlbGF5ID0gdHJhbnNpdGlvbkRlbGF5LnNwbGl0KCcsJylbMF07XG4gICAgcmV0dXJuICgoTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKSArXG4gICAgICAgIE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSkpICpcbiAgICAgICAgMTAwMCk7XG59O1xuXG4vKipcbiAqIE1haW4gY2xhc3MgZm9yIGFsbCB0aGluZ3MgZGlzcGxheSByZWxhdGVkLlxuICovXG5jbGFzcyBEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGRvY3VtZW50IGNsaWNrIGV2ZW50IHRvIGhpZGUgdGhlIHdpZGdldCBpZiBjbGljayBpcyBvdXRzaWRlXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSBlIE1vdXNlRXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q2xpY2tFdmVudCA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWJ1ZyB8fCB3aW5kb3cuZGVidWcpXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzVmlzaWJsZSAmJlxuICAgICAgICAgICAgICAgICFlLmNvbXBvc2VkUGF0aCgpLmluY2x1ZGVzKHRoaXMud2lkZ2V0KSAmJiAvLyBjbGljayBpbnNpZGUgdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgICFlLmNvbXBvc2VkUGF0aCgpPy5pbmNsdWRlcyh0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50KSAvLyBjbGljayBvbiB0aGUgZWxlbWVudFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGljayBldmVudCBmb3IgYW55IGFjdGlvbiBsaWtlIHNlbGVjdGluZyBhIGRhdGVcbiAgICAgICAgICogQHBhcmFtIGUgTW91c2VFdmVudFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYWN0aW9uc0NsaWNrRXZlbnQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy5hY3Rpb24uZW1pdCh7IGU6IGUgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMuZGF0ZURpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZURpc3BsYXkpO1xuICAgICAgICB0aGlzLm1vbnRoRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShNb250aERpc3BsYXkpO1xuICAgICAgICB0aGlzLnllYXJEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFllYXJEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5kZWNhZGVEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERlY2FkZURpc3BsYXkpO1xuICAgICAgICB0aGlzLnRpbWVEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFRpbWVEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5ob3VyRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShIb3VyRGlzcGxheSk7XG4gICAgICAgIHRoaXMubWludXRlRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShNaW51dGVEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5zZWNvbmREaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKHNlY29uZERpc3BsYXkpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKEV2ZW50RW1pdHRlcnMpO1xuICAgICAgICB0aGlzLl93aWRnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlRGlzcGxheS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlKHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB3aWRnZXQgYm9keSBvciB1bmRlZmluZWRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCB3aWRnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWRnZXQ7XG4gICAgfVxuICAgIGdldCBkYXRlQ29udGFpbmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXQ/LnF1ZXJ5U2VsZWN0b3IoYGRpdi4ke05hbWVzcGFjZS5jc3MuZGF0ZUNvbnRhaW5lcn1gKTtcbiAgICB9XG4gICAgZ2V0IHRpbWVDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldD8ucXVlcnlTZWxlY3RvcihgZGl2LiR7TmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyfWApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoaXMgdmlzaWJsZSBzdGF0ZSBvZiB0aGUgcGlja2VyIChzaG93bilcbiAgICAgKi9cbiAgICBnZXQgaXNWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB0YWJsZSBmb3IgYSBwYXJ0aWN1bGFyIHVuaXQuIFVzZWQgd2hlbiBhbiBvcHRpb24gYXMgY2hhbmdlZCBvclxuICAgICAqIHdoZW5ldmVyIHRoZSBjbGFzcyBsaXN0IG1pZ2h0IG5lZWQgdG8gYmUgcmVmcmVzaGVkLlxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHVuaXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlIFVuaXQuc2Vjb25kczpcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZERpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVuaXQubWludXRlczpcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVuaXQuaG91cnM6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVW5pdC5kYXRlOlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVuaXQubW9udGg6XG4gICAgICAgICAgICAgICAgdGhpcy5tb250aERpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVuaXQueWVhcjpcbiAgICAgICAgICAgICAgICB0aGlzLnllYXJEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRlY2FkZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjbG9jayc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUaW1lKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0LmhvdXJzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5taW51dGVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5zZWNvbmRzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NhbGVuZGFyJzpcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC55ZWFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5tb250aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNhZGVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbGVuZGFySGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhbGwnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oYXNUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZSgnY2xvY2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2hhc0RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKCdjYWxlbmRhcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBBbGxvd3MgZGV2ZWxvcGVycyB0byBhZGQvcmVtb3ZlIGNsYXNzZXMgZnJvbSBhbiBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBfdW5pdFxuICAgICAqIEBwYXJhbSBfZGF0ZVxuICAgICAqIEBwYXJhbSBfY2xhc3Nlc1xuICAgICAqIEBwYXJhbSBfZWxlbWVudFxuICAgICAqL1xuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICAgIHBhaW50KF91bml0LCBfZGF0ZSwgX2NsYXNzZXMsIF9lbGVtZW50KSB7XG4gICAgICAgIC8vIGltcGxlbWVudGVkIGluIHBsdWdpblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgcGlja2VyIGFuZCBjcmVhdGVzIGEgUG9wcGVyIGluc3RhbmNlIGlmIG5lZWRlZC5cbiAgICAgKiBBZGQgZG9jdW1lbnQgY2xpY2sgZXZlbnQgdG8gaGlkZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgdGhlIHBpY2tlci5cbiAgICAgKiBmaXJlcyBFdmVudHMjc2hvd1xuICAgICAqL1xuICAgIHNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLndpZGdldCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTZXREZWZhdWx0SWZOZWVkZWQoKTtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkV2lkZ2V0KCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVUaGVtZSgpO1xuICAgICAgICAgICAgdGhpcy5fc2hvd1NldHVwVmlld01vZGUoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zPy5jb250YWluZXIgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZW1lbnQgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zPy5kaXNwbGF5Py5wbGFjZW1lbnQgfHwgJ2JvdHRvbSc7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud2lkZ2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVBvcHVwKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQsIHRoaXMud2lkZ2V0LCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyczogW3sgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogdHJ1ZSB9XSxcbiAgICAgICAgICAgICAgICAgICAgLy8jMjQwMFxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXIgPT09ICdydGwnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGAke3BsYWNlbWVudH0tZW5kYFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtwbGFjZW1lbnR9LXN0YXJ0YCxcbiAgICAgICAgICAgICAgICB9KS50aGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMud2lkZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudmlld01vZGUgPT0gJ2Nsb2NrJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMuYWN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53aWRnZXRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWN0aW9uXScpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9hY3Rpb25zQ2xpY2tFdmVudCkpO1xuICAgICAgICAgICAgLy8gc2hvdyB0aGUgY2xvY2sgd2hlbiB1c2luZyBzaWRlQnlTaWRlXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVGltZSAmJiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuc2lkZUJ5U2lkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCk7XG4gICAgICAgICAgICAgICAgdGhpcy53aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNsb2NrQ29udGFpbmVyKVswXS5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcHVwKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2RvY3VtZW50Q2xpY2tFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuZW1pdCh7IHR5cGU6IE5hbWVzcGFjZS5ldmVudHMuc2hvdyB9KTtcbiAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgX3Nob3dTZXR1cFZpZXdNb2RlKCkge1xuICAgICAgICAvLyBJZiBtb2RlVmlldyBpcyBvbmx5IGNsb2NrXG4gICAgICAgIGNvbnN0IG9ubHlDbG9jayA9IHRoaXMuX2hhc1RpbWUgJiYgIXRoaXMuX2hhc0RhdGU7XG4gICAgICAgIC8vIHJlc2V0IHRoZSB2aWV3IHRvIHRoZSBjbG9jayBpZiB0aGVyZSdzIG5vIGRhdGUgY29tcG9uZW50c1xuICAgICAgICBpZiAob25seUNsb2NrKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9ICdjbG9jayc7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLmFjdGlvbi5lbWl0KHtcbiAgICAgICAgICAgICAgICBlOiBudWxsLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogQWN0aW9uVHlwZXMkMS5zaG93Q2xvY2ssXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdGhlcndpc2UgcmV0dXJuIHRvIHRoZSBjYWxlbmRhciB2aWV3XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUgPVxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb25seUNsb2NrICYmIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS52aWV3TW9kZSAhPT0gJ2Nsb2NrJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc1RpbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIENvbGxhcHNlLmhpZGVJbW1lZGlhdGVseSh0aGlzLnRpbWVDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgQ29sbGFwc2Uuc2hvdyh0aGlzLnRpbWVDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIENvbGxhcHNlLnNob3codGhpcy5kYXRlQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faGFzRGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd01vZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfc2hvd1NldERlZmF1bHRJZk5lZWRlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZXMucGlja2VkLmxlbmd0aCAhPSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy51c2VDdXJyZW50ICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlVGltZSgpLnNldExvY2FsaXphdGlvbih0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMua2VlcEludmFsaWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJpZXMgPSAwO1xuICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5tYXhEYXRlPy5pc0JlZm9yZShkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChkYXRlKSAmJiB0cmllcyA+IDMxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUubWFuaXB1bGF0ZShkaXJlY3Rpb24sIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWVzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZSh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRlZmF1bHREYXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjcmVhdGVQb3B1cChlbGVtZW50LCB3aWRnZXQsIFxuICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBvcHRpb25zKSB7XG4gICAgICAgIGxldCBjcmVhdGVQb3BwZXJGdW5jdGlvbjtcbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBpZiAod2luZG93Py5Qb3BwZXIpIHtcbiAgICAgICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGNyZWF0ZVBvcHBlckZ1bmN0aW9uID0gd2luZG93Py5Qb3BwZXI/LmNyZWF0ZVBvcHBlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY3JlYXRlUG9wcGVyIH0gPSBhd2FpdCBpbXBvcnQoJ0Bwb3BwZXJqcy9jb3JlJyk7XG4gICAgICAgICAgICBjcmVhdGVQb3BwZXJGdW5jdGlvbiA9IGNyZWF0ZVBvcHBlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3JlYXRlUG9wcGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gY3JlYXRlUG9wcGVyRnVuY3Rpb24oZWxlbWVudCwgd2lkZ2V0LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQb3B1cCgpIHtcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2U/LnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSBjYWxlbmRhciB2aWV3IG1vZGUuIEUuZy4gbW9udGggPC0+IHllYXJcbiAgICAgKiBAcGFyYW0gZGlyZWN0aW9uIC0vKyBudW1iZXIgdG8gbW92ZSBjdXJyZW50Vmlld01vZGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9zaG93TW9kZShkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlLCBNYXRoLm1pbigzLCB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSArIGRpcmVjdGlvbikpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlID09IG1heClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9IG1heDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpZGdldFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke05hbWVzcGFjZS5jc3MuZGF0ZUNvbnRhaW5lcn0gPiBkaXY6bm90KC4ke05hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXJ9KSwgLiR7TmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyfSA+IGRpdjpub3QoLiR7TmFtZXNwYWNlLmNzcy5jbG9ja0NvbnRhaW5lcn0pYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChlKSA9PiAoZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKSk7XG4gICAgICAgIGNvbnN0IGRhdGVQaWNrZXJNb2RlID0gQ2FsZW5kYXJNb2Rlc1t0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZV07XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoYC4ke2RhdGVQaWNrZXJNb2RlLmNsYXNzTmFtZX1gKTtcbiAgICAgICAgc3dpdGNoIChkYXRlUGlja2VyTW9kZS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVjYWRlRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICB0aGlzLnllYXJEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLm1vbnRoc0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnRoRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy5kYXlzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcGlja2VyLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuc2lkZUJ5U2lkZSlcbiAgICAgICAgICAgICh0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtOYW1lc3BhY2UuY3NzLmNsb2NrQ29udGFpbmVyfWApWzBdKS5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xuICAgICAgICB0aGlzLl91cGRhdGVDYWxlbmRhckhlYWRlcigpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnZpZXdVcGRhdGUuZW1pdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSB0aGVtZS4gRS5nLiBsaWdodCwgZGFyayBvciBhdXRvXG4gICAgICogQHBhcmFtIHRoZW1lIHRoZSB0aGVtZSBuYW1lXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlVGhlbWUodGhlbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGVtZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50aGVtZSA9PT0gdGhlbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRoZW1lID0gdGhlbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbGlnaHQnLCAnZGFyaycpO1xuICAgICAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QuYWRkKHRoaXMuX2dldFRoZW1lQ2xhc3MoKSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudGhlbWUgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgd2luZG93XG4gICAgICAgICAgICAgICAgLm1hdGNoTWVkaWEoTmFtZXNwYWNlLmNzcy5pc0RhcmtQcmVmZXJyZWRRdWVyeSlcbiAgICAgICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5fdXBkYXRlVGhlbWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3dcbiAgICAgICAgICAgICAgICAubWF0Y2hNZWRpYShOYW1lc3BhY2UuY3NzLmlzRGFya1ByZWZlcnJlZFF1ZXJ5KVxuICAgICAgICAgICAgICAgIC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLl91cGRhdGVUaGVtZSgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0VGhlbWVDbGFzcygpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRoZW1lID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRoZW1lIHx8ICdhdXRvJztcbiAgICAgICAgY29uc3QgaXNEYXJrTW9kZSA9IHdpbmRvdy5tYXRjaE1lZGlhICYmXG4gICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYShOYW1lc3BhY2UuY3NzLmlzRGFya1ByZWZlcnJlZFF1ZXJ5KS5tYXRjaGVzO1xuICAgICAgICBzd2l0Y2ggKGN1cnJlbnRUaGVtZSkge1xuICAgICAgICAgICAgY2FzZSAnbGlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBOYW1lc3BhY2UuY3NzLmxpZ2h0VGhlbWU7XG4gICAgICAgICAgICBjYXNlICdkYXJrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFtZXNwYWNlLmNzcy5kYXJrVGhlbWU7XG4gICAgICAgICAgICBjYXNlICdhdXRvJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNEYXJrTW9kZSA/IE5hbWVzcGFjZS5jc3MuZGFya1RoZW1lIDogTmFtZXNwYWNlLmNzcy5saWdodFRoZW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIF91cGRhdGVDYWxlbmRhckhlYWRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9oYXNEYXRlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBzaG93aW5nID0gW1xuICAgICAgICAgICAgLi4udGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihgLiR7TmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyfSBkaXZbc3R5bGUqPVwiZGlzcGxheTogZ3JpZFwiXWApLmNsYXNzTGlzdCxcbiAgICAgICAgXS5maW5kKCh4KSA9PiB4LnN0YXJ0c1dpdGgoTmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyKSk7XG4gICAgICAgIGNvbnN0IFtwcmV2aW91cywgc3dpdGNoZXIsIG5leHRdID0gdGhpcy53aWRnZXRcbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXIpWzBdXG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpO1xuICAgICAgICBzd2l0Y2ggKHNob3dpbmcpIHtcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHByZXZpb3VzLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5wcmV2aW91c0NlbnR1cnkpO1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnJyk7XG4gICAgICAgICAgICAgICAgbmV4dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ubmV4dENlbnR1cnkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLnllYXJzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHByZXZpb3VzLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5wcmV2aW91c0RlY2FkZSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdERlY2FkZSk7XG4gICAgICAgICAgICAgICAgbmV4dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ubmV4dERlY2FkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MubW9udGhzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHByZXZpb3VzLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5wcmV2aW91c1llYXIpO1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3RZZWFyKTtcbiAgICAgICAgICAgICAgICBuZXh0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5uZXh0WWVhcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MuZGF5c0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ucHJldmlvdXNNb250aCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdE1vbnRoKTtcbiAgICAgICAgICAgICAgICBuZXh0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5uZXh0TW9udGgpO1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZShzaG93aW5nLCB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5mb3JtYXQodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uZGF5Vmlld0hlYWRlckZvcm1hdCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaGVyLmlubmVyVGV4dCA9IHN3aXRjaGVyLmdldEF0dHJpYnV0ZShzaG93aW5nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBpY2tlciBpZiBuZWVkZWQuXG4gICAgICogUmVtb3ZlIGRvY3VtZW50IGNsaWNrIGV2ZW50IHRvIGhpZGUgd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwaWNrZXIuXG4gICAgICogZmlyZXMgRXZlbnRzI2hpZGVcbiAgICAgKi9cbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAoIXRoaXMud2lkZ2V0IHx8ICF0aGlzLl9pc1Zpc2libGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgaWYgKHRoaXMuX2lzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuZW1pdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogTmFtZXNwYWNlLmV2ZW50cy5oaWRlLFxuICAgICAgICAgICAgICAgIGRhdGU6IHRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ID8gbnVsbCA6IHRoaXMuZGF0ZXMubGFzdFBpY2tlZD8uY2xvbmUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2lzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fZG9jdW1lbnRDbGlja0V2ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgcGlja2VyJ3Mgb3BlbiBzdGF0ZS4gRmlyZXMgYSBzaG93L2hpZGUgZXZlbnQgZGVwZW5kaW5nLlxuICAgICAqL1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZG9jdW1lbnQgYW5kIGRhdGEtYWN0aW9uIGNsaWNrIGxpc3RlbmVyIGFuZCByZXNldCB0aGUgd2lkZ2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZGlzcG9zZSgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9kb2N1bWVudENsaWNrRXZlbnQpO1xuICAgICAgICBpZiAoIXRoaXMud2lkZ2V0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLndpZGdldFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjdGlvbl0nKVxuICAgICAgICAgICAgLmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9hY3Rpb25zQ2xpY2tFdmVudCkpO1xuICAgICAgICB0aGlzLndpZGdldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMud2lkZ2V0KTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIHdpZGdldHMgaHRtbCB0ZW1wbGF0ZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9idWlsZFdpZGdldCgpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLndpZGdldCk7XG4gICAgICAgIGNvbnN0IGRhdGVWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRhdGVWaWV3LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyKTtcbiAgICAgICAgZGF0ZVZpZXcuYXBwZW5kKHRoaXMuZ2V0SGVhZFRlbXBsYXRlKCksIHRoaXMuZGVjYWRlRGlzcGxheS5nZXRQaWNrZXIoKSwgdGhpcy55ZWFyRGlzcGxheS5nZXRQaWNrZXIoKSwgdGhpcy5tb250aERpc3BsYXkuZ2V0UGlja2VyKCksIHRoaXMuZGF0ZURpc3BsYXkuZ2V0UGlja2VyKCkpO1xuICAgICAgICBjb25zdCB0aW1lVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aW1lVmlldy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MudGltZUNvbnRhaW5lcik7XG4gICAgICAgIHRpbWVWaWV3LmFwcGVuZENoaWxkKHRoaXMudGltZURpc3BsYXkuZ2V0UGlja2VyKHRoaXMuX2ljb25UYWcuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aW1lVmlldy5hcHBlbmRDaGlsZCh0aGlzLmhvdXJEaXNwbGF5LmdldFBpY2tlcigpKTtcbiAgICAgICAgdGltZVZpZXcuYXBwZW5kQ2hpbGQodGhpcy5taW51dGVEaXNwbGF5LmdldFBpY2tlcigpKTtcbiAgICAgICAgdGltZVZpZXcuYXBwZW5kQ2hpbGQodGhpcy5zZWNvbmREaXNwbGF5LmdldFBpY2tlcigpKTtcbiAgICAgICAgY29uc3QgdG9vbGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b29sYmFyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy50b29sYmFyKTtcbiAgICAgICAgdG9vbGJhci5hcHBlbmQoLi4udGhpcy5nZXRUb29sYmFyRWxlbWVudHMoKSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuaW5saW5lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoJ2NhbGVuZGFyV2Vla3MnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnNpZGVCeVNpZGUgJiYgdGhpcy5faGFzRGF0ZUFuZFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkV2lkZ2V0U2lkZUJ5U2lkZSh0ZW1wbGF0ZSwgZGF0ZVZpZXcsIHRpbWVWaWV3LCB0b29sYmFyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRvb2xiYXJQbGFjZW1lbnQgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZCh0b29sYmFyKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXR1cENvbXBvbmVudFZpZXcgPSAoaGFzRmlyc3QsIGhhc1NlY29uZCwgZWxlbWVudCwgc2hvdWxkU2hvdykgPT4ge1xuICAgICAgICAgICAgaWYgKCFoYXNGaXJzdClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoaGFzU2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY29sbGFwc2UpO1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRTaG93KVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9O1xuICAgICAgICBzZXR1cENvbXBvbmVudFZpZXcodGhpcy5faGFzRGF0ZSwgdGhpcy5faGFzVGltZSwgZGF0ZVZpZXcsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS52aWV3TW9kZSAhPT0gJ2Nsb2NrJyk7XG4gICAgICAgIHNldHVwQ29tcG9uZW50Vmlldyh0aGlzLl9oYXNUaW1lLCB0aGlzLl9oYXNEYXRlLCB0aW1lVmlldywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnZpZXdNb2RlID09PSAnY2xvY2snKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50b29sYmFyUGxhY2VtZW50ID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQodG9vbGJhcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXJyb3cuY2xhc3NMaXN0LmFkZCgnYXJyb3cnKTtcbiAgICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKCdkYXRhLXBvcHBlci1hcnJvdycsICcnKTtcbiAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQoYXJyb3cpO1xuICAgICAgICB0aGlzLl93aWRnZXQgPSB0ZW1wbGF0ZTtcbiAgICB9XG4gICAgX2J1aWxkV2lkZ2V0U2lkZUJ5U2lkZSh0ZW1wbGF0ZSwgZGF0ZVZpZXcsIHRpbWVWaWV3LCB0b29sYmFyKSB7XG4gICAgICAgIHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zaWRlQnlTaWRlKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50b29sYmFyUGxhY2VtZW50ID09PSAndG9wJykge1xuICAgICAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQodG9vbGJhcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCd0ZC1yb3cnKTtcbiAgICAgICAgZGF0ZVZpZXcuY2xhc3NMaXN0LmFkZCgndGQtaGFsZicpO1xuICAgICAgICB0aW1lVmlldy5jbGFzc0xpc3QuYWRkKCd0ZC1oYWxmJyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChkYXRlVmlldyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0aW1lVmlldyk7XG4gICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudG9vbGJhclBsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKHRvb2xiYXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHRlbXBsYXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGhvdXJzLCBtaW51dGVzLCBvciBzZWNvbmRzIGNvbXBvbmVudCBpcyB0dXJuZWQgb25cbiAgICAgKi9cbiAgICBnZXQgX2hhc1RpbWUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuY2xvY2sgJiZcbiAgICAgICAgICAgICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5ob3VycyB8fFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLm1pbnV0ZXMgfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5zZWNvbmRzKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgeWVhciwgbW9udGgsIG9yIGRhdGUgY29tcG9uZW50IGlzIHR1cm5lZCBvblxuICAgICAqL1xuICAgIGdldCBfaGFzRGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5jYWxlbmRhciAmJlxuICAgICAgICAgICAgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLnllYXIgfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5tb250aCB8fFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmRhdGUpKTtcbiAgICB9XG4gICAgZ2V0IF9oYXNEYXRlQW5kVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0RhdGUgJiYgdGhpcy5faGFzVGltZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0b29sYmFyIGh0bWwgYmFzZWQgb24gb3B0aW9ucyBsaWtlIGJ1dHRvbnMgPT4gdG9kYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFRvb2xiYXJFbGVtZW50cygpIHtcbiAgICAgICAgY29uc3QgdG9vbGJhciA9IFtdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmJ1dHRvbnMudG9kYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnRvZGF5KTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24udG9kYXkpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnRvZGF5KSk7XG4gICAgICAgICAgICB0b29sYmFyLnB1c2goZGl2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlICYmXG4gICAgICAgICAgICB0aGlzLl9oYXNEYXRlICYmXG4gICAgICAgICAgICB0aGlzLl9oYXNUaW1lKSB7XG4gICAgICAgICAgICBsZXQgdGl0bGUsIGljb247XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnZpZXdNb2RlID09PSAnY2xvY2snKSB7XG4gICAgICAgICAgICAgICAgdGl0bGUgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3REYXRlO1xuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMuZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpdGxlID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0VGltZTtcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS50b2dnbGVQaWNrZXIpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aXRsZSk7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5faWNvblRhZyhpY29uKSk7XG4gICAgICAgICAgICB0b29sYmFyLnB1c2goZGl2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmJ1dHRvbnMuY2xlYXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmNsZWFyKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uY2xlYXIpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLmNsZWFyKSk7XG4gICAgICAgICAgICB0b29sYmFyLnB1c2goZGl2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmJ1dHRvbnMuY2xvc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmNsb3NlKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uY2xvc2UpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLmNsb3NlKSk7XG4gICAgICAgICAgICB0b29sYmFyLnB1c2goZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9vbGJhcjtcbiAgICB9XG4gICAgLyoqKlxuICAgICAqIEJ1aWxkcyB0aGUgYmFzZSBoZWFkZXIgdGVtcGxhdGUgd2l0aCBuZXh0IGFuZCBwcmV2aW91cyBpY29uc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0SGVhZFRlbXBsYXRlKCkge1xuICAgICAgICBjb25zdCBjYWxlbmRhckhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjYWxlbmRhckhlYWRlci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXIpO1xuICAgICAgICBjb25zdCBwcmV2aW91cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcmV2aW91cy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MucHJldmlvdXMpO1xuICAgICAgICBwcmV2aW91cy5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5wcmV2aW91cyk7XG4gICAgICAgIHByZXZpb3VzLmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnByZXZpb3VzKSk7XG4gICAgICAgIGNvbnN0IHN3aXRjaGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN3aXRjaGVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zd2l0Y2gpO1xuICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5jaGFuZ2VDYWxlbmRhclZpZXcpO1xuICAgICAgICBjb25zdCBuZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5leHQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLm5leHQpO1xuICAgICAgICBuZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLm5leHQpO1xuICAgICAgICBuZXh0LmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLm5leHQpKTtcbiAgICAgICAgY2FsZW5kYXJIZWFkZXIuYXBwZW5kKHByZXZpb3VzLCBzd2l0Y2hlciwgbmV4dCk7XG4gICAgICAgIHJldHVybiBjYWxlbmRhckhlYWRlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGRzIGFuIGljb24gdGFnIGFzIGVpdGhlciBhbiBgPGk+YFxuICAgICAqIG9yIHdpdGggaWNvbnMgPT4gdHlwZSBpcyBgc3ByaXRlc2AgdGhlbiBhIHN2ZyB0YWcgaW5zdGVhZFxuICAgICAqIEBwYXJhbSBpY29uQ2xhc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pY29uVGFnKGljb25DbGFzcykge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnR5cGUgPT09ICdzcHJpdGVzJykge1xuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3VzZScpO1xuICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnLCBpY29uQ2xhc3MpOyAvLyBEZXByZWNhdGVkLiBJbmNsdWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBpY29uQ2xhc3MpO1xuICAgICAgICAgICAgc3ZnLmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICAgICAgcmV0dXJuIHN2ZztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoLi4uaWNvbkNsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgICByZXR1cm4gaWNvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2F1c2VzIHRoZSB3aWRnZXQgdG8gZ2V0IHJlYnVpbHQgb24gbmV4dCBzaG93LiBJZiB0aGUgcGlja2VyIGlzIGFscmVhZHkgb3BlblxuICAgICAqIHRoZW4gaGlkZSBhbmQgcmVzaG93IGl0LlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlYnVpbGQoKSB7XG4gICAgICAgIGNvbnN0IHdhc1Zpc2libGUgPSB0aGlzLl9pc1Zpc2libGU7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICAgICAgaWYgKHdhc1Zpc2libGUpXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gICAgcmVmcmVzaEN1cnJlbnRWaWV3KCkge1xuICAgICAgICAvL2lmIHRoZSB3aWRnZXQgaXMgbm90IHNob3dpbmcsIGp1c3QgZGVzdHJveSBpdFxuICAgICAgICBpZiAoIXRoaXMuX2lzVmlzaWJsZSlcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Vmlldykge1xuICAgICAgICAgICAgY2FzZSAnY2xvY2snOlxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZSgnY2xvY2snKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NhbGVuZGFyJzpcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQubW9udGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0LnllYXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGVjYWRlcyc6XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKCdkZWNhZGUnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBMb2dpYyBmb3IgdmFyaW91cyBjbGljayBhY3Rpb25zXG4gKi9cbmNsYXNzIEFjdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGlzcGxheSk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRXZlbnRFbWl0dGVycyk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMuYWN0aW9uLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvKHJlc3VsdC5lLCByZXN1bHQuYWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBzZWxlY3RlZCBgYWN0aW9uYC4gU2VlIEFjdGlvblR5cGVzXG4gICAgICogQHBhcmFtIGUgVGhpcyBpcyBub3JtYWxseSBhIGNsaWNrIGV2ZW50XG4gICAgICogQHBhcmFtIGFjdGlvbiBJZiBub3QgcHJvdmlkZWQsIHRoZW4gbG9vayBmb3IgYSBbZGF0YS1hY3Rpb25dXG4gICAgICovXG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGRvKGUsIGFjdGlvbikge1xuICAgICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gZT8uY3VycmVudFRhcmdldDtcbiAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQ/LmNsYXNzTGlzdD8uY29udGFpbnMoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGFjdGlvbiA9IGFjdGlvbiB8fCBjdXJyZW50VGFyZ2V0Py5kYXRhc2V0Py5hY3Rpb247XG4gICAgICAgIGNvbnN0IGxhc3RQaWNrZWQgPSAodGhpcy5kYXRlcy5sYXN0UGlja2VkIHx8IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlKVxuICAgICAgICAgICAgLmNsb25lO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLm5leHQ6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEucHJldmlvdXM6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVOZXh0UHJldmlvdXMoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5jaGFuZ2VDYWxlbmRhclZpZXc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll9zaG93TW9kZSgxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZUNhbGVuZGFySGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0TW9udGg6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0WWVhcjpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3REZWNhZGU6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RDYWxlbmRhck1vZGUoYWN0aW9uLCBjdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3REYXk6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3REYXkoY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0SG91cjoge1xuICAgICAgICAgICAgICAgIGxldCBob3VyID0gK2N1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFBpY2tlZC5ob3VycyA+PSAxMiAmJiB0aGlzLm9wdGlvbnNTdG9yZS5pc1R3ZWx2ZUhvdXIpXG4gICAgICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICAgICAgbGFzdFBpY2tlZC5ob3VycyA9IGhvdXI7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShsYXN0UGlja2VkLCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlT3JDbG9jayhlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3RNaW51dGU6IHtcbiAgICAgICAgICAgICAgICBsYXN0UGlja2VkLm1pbnV0ZXMgPSArY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUobGFzdFBpY2tlZCwgdGhpcy5kYXRlcy5sYXN0UGlja2VkSW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU9yQ2xvY2soZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0U2Vjb25kOiB7XG4gICAgICAgICAgICAgICAgbGFzdFBpY2tlZC5zZWNvbmRzID0gK2N1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGxhc3RQaWNrZWQsIHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVPckNsb2NrKGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmluY3JlbWVudEhvdXJzOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0LmhvdXJzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRNaW51dGVzOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0Lm1pbnV0ZXMsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmluY3JlbWVudFNlY29uZHM6XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQuc2Vjb25kcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuZGVjcmVtZW50SG91cnM6XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQuaG91cnMsIC0xKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRNaW51dGVzOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0Lm1pbnV0ZXMsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcgKiAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuZGVjcmVtZW50U2Vjb25kczpcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGVBbmRTZXQobGFzdFBpY2tlZCwgVW5pdC5zZWNvbmRzLCAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEudG9nZ2xlTWVyaWRpZW06XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQuaG91cnMsIHRoaXMuZGF0ZXMubGFzdFBpY2tlZC5ob3VycyA+PSAxMiA/IC0xMiA6IDEyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS50b2dnbGVQaWNrZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVUb2dnbGUoY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrOlxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dIb3VyczpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93TWludXRlczpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93U2Vjb25kczpcbiAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSB0aGUgY2xvY2sgaXMgYWN0dWFsbHkgZGlzcGxheWluZ1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnNpZGVCeVNpZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgIT09ICdjbG9jaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9oaWRlIGNhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgIENvbGxhcHNlLmhpZGVJbW1lZGlhdGVseSh0aGlzLmRpc3BsYXkuZGF0ZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIC8vc2hvdyBjbG9ja1xuICAgICAgICAgICAgICAgICAgICBDb2xsYXBzZS5zaG93SW1tZWRpYXRlbHkodGhpcy5kaXNwbGF5LnRpbWVDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNob3dDbG9ja0NvbnRhaW5lcnMoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5jbGVhcjpcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlQ2FsZW5kYXJIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5jbG9zZTpcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnRvZGF5OiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZVRpbWUoKS5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlVmlld0RhdGUuZW1pdCh0b2RheSk7XG4gICAgICAgICAgICAgICAgLy90b2RvIHRoaXMgdGhpcyByZWFsbHkgYSBnb29kIGlkZWE/XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRvZGF5LCBVbml0LmRhdGUpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKHRvZGF5LCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlU2hvd0Nsb2NrQ29udGFpbmVycyhhY3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc3BsYXkuX2hhc1RpbWUpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnRocm93RXJyb3IoJ0Nhbm5vdCBzaG93IGNsb2NrIGNvbnRhaW5lcnMgd2hlbiB0aW1lIGlzIGRpc2FibGVkLicpO1xuICAgICAgICAgICAgLyogaWdub3JlIGNvdmVyYWdlOiBzaG91bGQgbmV2ZXIgaGFwcGVuICovXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgPSAnY2xvY2snO1xuICAgICAgICB0aGlzLmRpc3BsYXkud2lkZ2V0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLiR7TmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyfSA+IGRpdmApXG4gICAgICAgICAgICAuZm9yRWFjaCgoaHRtbEVsZW1lbnQpID0+IChodG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKSk7XG4gICAgICAgIGxldCBjbGFzc1RvVXNlID0gJyc7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9Vc2UgPSBOYW1lc3BhY2UuY3NzLmNsb2NrQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlKCdjbG9jaycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dIb3VyczpcbiAgICAgICAgICAgICAgICBjbGFzc1RvVXNlID0gTmFtZXNwYWNlLmNzcy5ob3VyQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlKFVuaXQuaG91cnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dNaW51dGVzOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9Vc2UgPSBOYW1lc3BhY2UuY3NzLm1pbnV0ZUNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZShVbml0Lm1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dTZWNvbmRzOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9Vc2UgPSBOYW1lc3BhY2UuY3NzLnNlY29uZENvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZShVbml0LnNlY29uZHMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgICh0aGlzLmRpc3BsYXkud2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NUb1VzZSlbMF0pLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XG4gICAgfVxuICAgIGhhbmRsZU5leHRQcmV2aW91cyhhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgeyB1bml0LCBzdGVwIH0gPSBDYWxlbmRhck1vZGVzW3RoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlXTtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gQWN0aW9uVHlwZXMkMS5uZXh0KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUubWFuaXB1bGF0ZShzdGVwLCB1bml0KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUubWFuaXB1bGF0ZShzdGVwICogLTEsIHVuaXQpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnZpZXdVcGRhdGUuZW1pdCgpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuX3Nob3dNb2RlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFmdGVyIHNldHRpbmcgdGhlIHZhbHVlIGl0IHdpbGwgZWl0aGVyIHNob3cgdGhlIGNsb2NrIG9yIGhpZGUgdGhlIHdpZGdldC5cbiAgICAgKiBAcGFyYW0gZVxuICAgICAqL1xuICAgIGhpZGVPckNsb2NrKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5pc1R3ZWx2ZUhvdXIgJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5taW51dGVzICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmtlZXBPcGVuICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG8oZSwgQWN0aW9uVHlwZXMkMS5zaG93Q2xvY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbW1vbiBmdW5jdGlvbiB0byBtYW5pcHVsYXRlIHtAbGluayBsYXN0UGlja2VkfSBieSBgdW5pdGAuXG4gICAgICogQHBhcmFtIGxhc3RQaWNrZWRcbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBjaGFuZ2UgYnlcbiAgICAgKi9cbiAgICBtYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIHVuaXQsIHZhbHVlID0gMSkge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gbGFzdFBpY2tlZC5tYW5pcHVsYXRlKHZhbHVlLCB1bml0KTtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKG5ld0RhdGUsIHVuaXQpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKG5ld0RhdGUsIHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVTZWxlY3RDYWxlbmRhck1vZGUoYWN0aW9uLCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gK2N1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3RNb250aDpcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5tb250aCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdFllYXI6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0RGVjYWRlOlxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLnllYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9PT1cbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll9zaG93TW9kZSgtMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlVG9nZ2xlKGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCd0aXRsZScpID09PVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0RGF0ZSkge1xuICAgICAgICAgICAgY3VycmVudFRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0VGltZSk7XG4gICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmlubmVySFRNTCA9IHRoaXMuZGlzcGxheS5faWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMudGltZSkub3V0ZXJIVE1MO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGVDYWxlbmRhckhlYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUucmVmcmVzaEN1cnJlbnRWaWV3KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50VGFyZ2V0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3REYXRlKTtcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuaW5uZXJIVE1MID0gdGhpcy5kaXNwbGF5Ll9pY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy5kYXRlKS5vdXRlckhUTUw7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5Ll9oYXNUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTaG93Q2xvY2tDb250YWluZXJzKEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZSgnY2xvY2snKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpc3BsYXkud2lkZ2V0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLiR7TmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyfSwgLiR7TmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyfWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoaHRtbEVsZW1lbnQpID0+IENvbGxhcHNlLnRvZ2dsZShodG1sRWxlbWVudCkpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnZpZXdVcGRhdGUuZW1pdCgpO1xuICAgIH1cbiAgICBoYW5kbGVTZWxlY3REYXkoY3VycmVudFRhcmdldCkge1xuICAgICAgICBjb25zdCBkYXkgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZTtcbiAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3Mub2xkKSkge1xuICAgICAgICAgICAgZGF5Lm1hbmlwdWxhdGUoLTEsIFVuaXQubW9udGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLm5ldykpIHtcbiAgICAgICAgICAgIGRheS5tYW5pcHVsYXRlKDEsIFVuaXQubW9udGgpO1xuICAgICAgICB9XG4gICAgICAgIGRheS5kYXRlID0gK2N1cnJlbnRUYXJnZXQuZGF0YXNldC5kYXk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSlcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRGF0ZVJhbmdlKGRheSk7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlcykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNdWx0aURhdGUoZGF5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUoZGF5LCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmRpc3BsYXkuX2hhc1RpbWUgJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkua2VlcE9wZW4gJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kYXRlUmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlTXVsdGlEYXRlKGRheSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGVzLnBpY2tlZEluZGV4KGRheSwgVW5pdC5kYXRlKTtcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKG51bGwsIGluZGV4KTsgLy9kZXNlbGVjdCBtdWx0aS1kYXRlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4ICsgMTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLnBpY2tlZC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXksIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVEYXRlUmFuZ2UoZGF5KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5kYXRlcy5waWNrZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDI6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlciA9IHRoaXMuZGF0ZXMucGlja2VkWzBdO1xuICAgICAgICAgICAgICAgIGlmIChkYXkuZ2V0VGltZSgpID09PSBvdGhlci5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRheS5pc0JlZm9yZShvdGhlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXksIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKG90aGVyLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUoZGF5LCAwKTtcbiAgICB9XG59XG5cbi8qKlxuICogQSByb2J1c3QgYW5kIHBvd2VyZnVsIGRhdGUvdGltZSBwaWNrZXIgY29tcG9uZW50LlxuICovXG5jbGFzcyBUZW1wdXNEb21pbnVzIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB0aGlzLl9zdWJzY3JpYmVycyA9IHt9O1xuICAgICAgICB0aGlzLl9pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFdmVudCBmb3Igd2hlbiB0aGUgaW5wdXQgZmllbGQgY2hhbmdlcy4gVGhpcyBpcyBhIGNsYXNzIGxldmVsIG1ldGhvZCBzbyB0aGVyZSdzXG4gICAgICAgICAqIHNvbWV0aGluZyBmb3IgdGhlIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgdGhpcy5faW5wdXRDaGFuZ2VFdmVudCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW50ZXJuYWxseVRyaWdnZXJlZCA9IGV2ZW50Py5kZXRhaWw7XG4gICAgICAgICAgICBpZiAoaW50ZXJuYWxseVRyaWdnZXJlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBzZXRWaWV3RGF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRlcy5sYXN0UGlja2VkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSA9IHRoaXMuZGF0ZXMubGFzdFBpY2tlZC5jbG9uZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlcykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BsaXQgPSB2YWx1ZS5zcGxpdCh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlU3BsaXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0RnJvbUlucHV0KHZhbHVlU3BsaXRbaV0sIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNldFZpZXdEYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdURDogU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIHNldCB0aGUgbXVsdGlwbGVEYXRlcyB2YWx1ZXMgZnJvbSB0aGUgaW5wdXQgZmllbGQuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRGcm9tSW5wdXQodmFsdWUsIDApO1xuICAgICAgICAgICAgICAgIHNldFZpZXdEYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFdmVudCBmb3Igd2hlbiB0aGUgdG9nZ2xlIGlzIGNsaWNrZWQuIFRoaXMgaXMgYSBjbGFzcyBsZXZlbCBtZXRob2Qgc28gdGhlcmUnc1xuICAgICAgICAgKiBzb21ldGhpbmcgZm9yIHRoZSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl90b2dnbGVDbGlja0V2ZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQ/LmRpc2FibGVkIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LmRpc2FibGVkIHx8XG4gICAgICAgICAgICAgICAgLy9pZiB3ZSBqdXN0IGhhdmUgdGhlIGlucHV0IGFuZCBhbGxvdyBpbnB1dCB0b2dnbGUgaXMgZW5hYmxlZCwgdGhlbiBkb24ndCBjYXVzZSBhIHRvZ2dsZVxuICAgICAgICAgICAgICAgICh0aGlzLl90b2dnbGUubm9kZU5hbWUgPT09ICdJTlBVVCcgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlPy50eXBlID09PSAndGV4dCcgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5hbGxvd0lucHV0VG9nZ2xlKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRXZlbnQgZm9yIHdoZW4gdGhlIHRvZ2dsZSBpcyBjbGlja2VkLiBUaGlzIGlzIGEgY2xhc3MgbGV2ZWwgbWV0aG9kIHNvIHRoZXJlJ3NcbiAgICAgICAgICogc29tZXRoaW5nIGZvciB0aGUgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb3BlbkNsaWNrRXZlbnQgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudD8uZGlzYWJsZWQgfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8uZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRpc3BsYXkuaXNWaXNpYmxlKVxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9O1xuICAgICAgICBzZXR1cFNlcnZpY2VMb2NhdG9yKCk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRXZlbnRFbWl0dGVycyk7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShBY3Rpb25zKTtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5tdXN0UHJvdmlkZUVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZU9wdGlvbnMob3B0aW9ucywgRGVmYXVsdE9wdGlvbnMsIHRydWUpO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS51bnNldCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVJbnB1dCgpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplVG9nZ2xlKCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKVxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnZpZXdVcGRhdGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdVcGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlVmlld0RhdGUuc3Vic2NyaWJlKChkYXRlVGltZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZSA9IGRhdGVUaW1lO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHZpZXdEYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGU7XG4gICAgfVxuICAgIHNldCB2aWV3RGF0ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZSh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9PT0gJ2Nsb2NrJyA/ICdjbG9jaycgOiAnY2FsZW5kYXInKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcGlja2VyIG9wdGlvbnMuIElmIGByZXNldGAgaXMgcHJvdmlkZSBgb3B0aW9uc2Agd2lsbCBiZSBtZXJnZWQgd2l0aCBEZWZhdWx0T3B0aW9ucyBpbnN0ZWFkLlxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICogQHBhcmFtIHJlc2V0XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVwZGF0ZU9wdGlvbnMob3B0aW9ucywgcmVzZXQgPSBmYWxzZSkge1xuICAgICAgICBpZiAocmVzZXQpXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplT3B0aW9ucyhvcHRpb25zLCBEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVPcHRpb25zKG9wdGlvbnMsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICB0aGlzLmRpc3BsYXkucmVmcmVzaEN1cnJlbnRWaWV3KCk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBwaWNrZXIgb3BlbiBvciBjbG9zZWQuIElmIHRoZSBwaWNrZXIgaXMgZGlzYWJsZWQsIG5vdGhpbmcgd2lsbCBoYXBwZW4uXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuZGlzcGxheS50b2dnbGUoKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBwaWNrZXIgdW5sZXNzIHRoZSBwaWNrZXIgaXMgZGlzYWJsZWQuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0Rpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmRpc3BsYXkuc2hvdygpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBpY2tlciB1bmxlc3MgdGhlIHBpY2tlciBpcyBkaXNhYmxlZC5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRoZSBwaWNrZXIgYW5kIHRoZSB0YXJnZXQgaW5wdXQgZmllbGQuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuX2lzRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAvLyB0b2RvIHRoaXMgbWlnaHQgYmUgdW5kZXNpcmVkLiBJZiBhIGRldiBkaXNhYmxlcyB0aGUgaW5wdXQgZmllbGQgdG9cbiAgICAgICAgLy8gb25seSBhbGxvdyB1c2luZyB0aGUgcGlja2VyLCB0aGlzIHdpbGwgYnJlYWsgdGhhdC5cbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgdGhlIHBpY2tlciBhbmQgdGhlIHRhcmdldCBpbnB1dCBmaWVsZC5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLl9pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBzZWxlY3RlZCBkYXRlc1xuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5kYXRlcy5jbGVhcigpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogQWxsb3dzIGZvciBhIGRpcmVjdCBzdWJzY3JpcHRpb24gdG8gcGlja2VyIGV2ZW50cywgd2l0aG91dCBoYXZpbmcgdG8gdXNlIGFkZEV2ZW50TGlzdGVuZXIgb24gdGhlIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZXMgU2VlIE5hbWVzcGFjZS5FdmVudHNcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tzIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBldmVudCBpcyB0cmlnZ2VyZWRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc3Vic2NyaWJlKGV2ZW50VHlwZXMsIGNhbGxiYWNrcyAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICkge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50VHlwZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBldmVudFR5cGVzID0gW2V2ZW50VHlwZXNdO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjYWxsQmFja0FycmF5OyAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2FsbGJhY2tzKSkge1xuICAgICAgICAgICAgY2FsbEJhY2tBcnJheSA9IFtjYWxsYmFja3NdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FsbEJhY2tBcnJheSA9IGNhbGxiYWNrcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnRUeXBlcy5sZW5ndGggIT09IGNhbGxCYWNrQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5zdWJzY3JpYmVNaXNtYXRjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJldHVybkFycmF5ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZXZlbnRUeXBlID0gZXZlbnRUeXBlc1tpXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLl9zdWJzY3JpYmVyc1tldmVudFR5cGVdKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50VHlwZV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50VHlwZV0ucHVzaChjYWxsQmFja0FycmF5W2ldKTtcbiAgICAgICAgICAgIHJldHVybkFycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlOiB0aGlzLl91bnN1YnNjcmliZS5iaW5kKHRoaXMsIGV2ZW50VHlwZSwgdGhpcy5fc3Vic2NyaWJlcnNbZXZlbnRUeXBlXS5sZW5ndGggLSAxKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkFycmF5WzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5BcnJheTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBwaWNrZXIgYW5kIHJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICAgICAgLy8gdGhpcyB3aWxsIGNsZWFyIHRoZSBkb2N1bWVudCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLmRpc3BsYXkuX2Rpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9pbnB1dENoYW5nZUV2ZW50KTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuYWxsb3dJbnB1dFRvZ2dsZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb3BlbkNsaWNrRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fb3BlbkNsaWNrRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RvZ2dsZT8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90b2dnbGVDbGlja0V2ZW50KTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaWJlcnMgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgb3B0aW9ucyB0byB1c2UgdGhlIHByb3ZpZGVkIGxhbmd1YWdlLlxuICAgICAqIFRIZSBsYW5ndWFnZSBmaWxlIG11c3QgYmUgbG9hZGVkIGZpcnN0LlxuICAgICAqIEBwYXJhbSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGxvY2FsZShsYW5ndWFnZSkge1xuICAgICAgICBjb25zdCBhc2tlZCA9IGxvYWRlZExvY2FsZXNbbGFuZ3VhZ2VdO1xuICAgICAgICBpZiAoIWFza2VkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoe1xuICAgICAgICAgICAgbG9jYWxpemF0aW9uOiBhc2tlZCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGFuIGV2ZW50IGxpa2UgQ2hhbmdlRXZlbnQgd2hlbiB0aGUgcGlja2VyIGhhcyB1cGRhdGVkIHRoZSB2YWx1ZVxuICAgICAqIG9mIGEgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKiBAcGFyYW0gZXZlbnQgQWNjZXB0cyBhIEJhc2VFdmVudCBvYmplY3QuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdHJpZ2dlckV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnZpZXdNb2RlID0gdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXc7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlRXZlbnQgPSBldmVudC50eXBlID09PSBOYW1lc3BhY2UuZXZlbnRzLmNoYW5nZTtcbiAgICAgICAgaWYgKGlzQ2hhbmdlRXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0ZSwgb2xkRGF0ZSwgaXNDbGVhciB9ID0gZXZlbnQ7XG4gICAgICAgICAgICBpZiAoKGRhdGUgJiYgb2xkRGF0ZSAmJiBkYXRlLmlzU2FtZShvbGREYXRlKSkgfHxcbiAgICAgICAgICAgICAgICAoIWlzQ2xlYXIgJiYgIWRhdGUgJiYgIW9sZERhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faGFuZGxlQWZ0ZXJDaGFuZ2VFdmVudChldmVudCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8uZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywgeyBkZXRhaWw6IGV2ZW50IH0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KGV2ZW50LnR5cGUsIHsgZGV0YWlsOiBldmVudCB9KSk7XG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGNvbnN0ICQgPSB3aW5kb3cualF1ZXJ5O1xuICAgICAgICAgICAgaWYgKGlzQ2hhbmdlRXZlbnQgJiYgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMub3B0aW9uc1N0b3JlLmlucHV0KS50cmlnZ2VyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudCkudHJpZ2dlcihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHVibGlzaChldmVudCk7XG4gICAgfVxuICAgIF9wdWJsaXNoKGV2ZW50KSB7XG4gICAgICAgIC8vIHJldHVybiBpZiBldmVudCBpcyBub3Qgc3Vic2NyaWJlZFxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5fc3Vic2NyaWJlcnNbZXZlbnQudHlwZV0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVHJpZ2dlciBjYWxsYmFjayBmb3IgZWFjaCBzdWJzY3JpYmVyXG4gICAgICAgIHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50LnR5cGVdLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyBhIFZpZXdVcGRhdGUgZXZlbnQgd2hlbiwgZm9yIGV4YW1wbGUsIHRoZSBtb250aCB2aWV3IGlzIGNoYW5nZWQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdmlld1VwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IE5hbWVzcGFjZS5ldmVudHMudXBkYXRlLFxuICAgICAgICAgICAgdmlld0RhdGU6IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3Vuc3Vic2NyaWJlKGV2ZW50TmFtZSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaWJlcnNbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZXMgdHdvIE9wdGlvbiBvYmplY3RzIHRvZ2V0aGVyIGFuZCB2YWxpZGF0ZXMgb3B0aW9ucyB0eXBlXG4gICAgICogQHBhcmFtIGNvbmZpZyBuZXcgT3B0aW9uc1xuICAgICAqIEBwYXJhbSBtZXJnZVRvIE9wdGlvbnMgdG8gbWVyZ2UgaW50b1xuICAgICAqIEBwYXJhbSBpbmNsdWRlRGF0YXNldCBXaGVuIHRydWUsIHRoZSBlbGVtZW50cyBkYXRhLXRkIGF0dHJpYnV0ZXMgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pbml0aWFsaXplT3B0aW9ucyhjb25maWcsIG1lcmdlVG8sIGluY2x1ZGVEYXRhc2V0ID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IG5ld0NvbmZpZyA9IE9wdGlvbkNvbnZlcnRlci5kZWVwQ29weShjb25maWcpO1xuICAgICAgICBuZXdDb25maWcgPSBPcHRpb25Db252ZXJ0ZXIuX21lcmdlT3B0aW9ucyhuZXdDb25maWcsIG1lcmdlVG8pO1xuICAgICAgICBpZiAoaW5jbHVkZURhdGFzZXQpXG4gICAgICAgICAgICBuZXdDb25maWcgPSBPcHRpb25Db252ZXJ0ZXIuX2RhdGFUb09wdGlvbnModGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudCwgbmV3Q29uZmlnKTtcbiAgICAgICAgT3B0aW9uQ29udmVydGVyLl92YWxpZGF0ZUNvbmZsaWN0cyhuZXdDb25maWcpO1xuICAgICAgICBuZXdDb25maWcudmlld0RhdGUgPSBuZXdDb25maWcudmlld0RhdGUuc2V0TG9jYWxpemF0aW9uKG5ld0NvbmZpZy5sb2NhbGl6YXRpb24pO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmlzU2FtZShuZXdDb25maWcudmlld0RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSA9IG5ld0NvbmZpZy52aWV3RGF0ZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgbWluaW11bSB2aWV3IGFsbG93ZWQgYnkgdGhlIHBpY2tlci4gRm9yIGV4YW1wbGUgdGhlIGNhc2Ugb2Ygb25seVxuICAgICAgICAgKiBhbGxvd2luZyB5ZWFyIGFuZCBtb250aCB0byBiZSBzZWxlY3RlZCBidXQgbm90IGRhdGUuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAobmV3Q29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy55ZWFyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0NvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMubW9udGgpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3Q29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy5kYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUgPSBNYXRoLm1heCh0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSwgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUpO1xuICAgICAgICAvLyBVcGRhdGUgdmlldyBtb2RlIGlmIG5lZWRlZFxuICAgICAgICBpZiAoQ2FsZW5kYXJNb2Rlc1t0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZV0ubmFtZSAhPT1cbiAgICAgICAgICAgIG5ld0NvbmZpZy5kaXNwbGF5LnZpZXdNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9IE1hdGgubWF4KENhbGVuZGFyTW9kZXMuZmluZEluZGV4KCh4KSA9PiB4Lm5hbWUgPT09IG5ld0NvbmZpZy5kaXNwbGF5LnZpZXdNb2RlKSwgdGhpcy5vcHRpb25zU3RvcmUubWluaW11bUNhbGVuZGFyVmlld01vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXk/LmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGUoJ2FsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdDb25maWcuZGlzcGxheS5jb21wb25lbnRzLnVzZVR3ZW50eWZvdXJIb3VyICYmXG4gICAgICAgICAgICBuZXdDb25maWcubG9jYWxpemF0aW9uLmhvdXJDeWNsZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbmV3Q29uZmlnLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUgPSAnaDI0JztcbiAgICAgICAgZWxzZSBpZiAobmV3Q29uZmlnLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbmV3Q29uZmlnLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUgPSBndWVzc0hvdXJDeWNsZShuZXdDb25maWcubG9jYWxpemF0aW9uLmxvY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0NvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZSAmJlxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZS5pc0FmdGVyKG5ld0NvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZSkpXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlID0gbmV3Q29uZmlnLnJlc3RyaWN0aW9ucy5tYXhEYXRlO1xuICAgICAgICBpZiAobmV3Q29uZmlnLnJlc3RyaWN0aW9ucy5taW5EYXRlICYmXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlLmlzQmVmb3JlKG5ld0NvbmZpZy5yZXN0cmljdGlvbnMubWluRGF0ZSkpXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlID0gbmV3Q29uZmlnLnJlc3RyaWN0aW9ucy5taW5EYXRlO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zID0gbmV3Q29uZmlnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYW4gaW5wdXQgZmllbGQgaXMgYmVpbmcgdXNlZCwgYXR0ZW1wdHMgdG8gbG9jYXRlIG9uZSBhbmQgc2V0cyBhblxuICAgICAqIGV2ZW50IGxpc3RlbmVyIGlmIGZvdW5kLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXRpYWxpemVJbnB1dCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQudGFnTmFtZSA9PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dCA9IHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQuZGF0YXNldC50ZFRhcmdldElucHV0O1xuICAgICAgICAgICAgaWYgKHF1ZXJ5ID09IHVuZGVmaW5lZCB8fCBxdWVyeSA9PSAnbmVhcmVzdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dCA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0ID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLmlucHV0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlICYmIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGVmYXVsdERhdGUpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSA9IHRoaXMuZGF0ZXMuZm9ybWF0SW5wdXQodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWZhdWx0RGF0ZSk7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX2lucHV0Q2hhbmdlRXZlbnQpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5hbGxvd0lucHV0VG9nZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29wZW5DbGlja0V2ZW50KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fb3BlbkNsaWNrRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXRDaGFuZ2VFdmVudCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIGxvY2F0ZSBhIHRvZ2dsZSBmb3IgdGhlIHBpY2tlciBhbmQgc2V0cyBhbiBldmVudCBsaXN0ZW5lclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXRpYWxpemVUb2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LmRhdGFzZXQudGRUYXJnZXRUb2dnbGU7XG4gICAgICAgIGlmIChxdWVyeSA9PSAnbmVhcmVzdCcpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gJ1tkYXRhLXRkLXRvZ2dsZT1cImRhdGV0aW1lcGlja2VyXCJdJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b2dnbGUgPVxuICAgICAgICAgICAgcXVlcnkgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50XG4gICAgICAgICAgICAgICAgOiB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICAgICAgICB0aGlzLl90b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90b2dnbGVDbGlja0V2ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlIG9wdGlvbiBpcyBlbmFibGVkIHRoaXMgd2lsbCByZW5kZXIgdGhlIGNsb2NrIHZpZXcgYWZ0ZXIgYSBkYXRlIHBpY2suXG4gICAgICogQHBhcmFtIGUgY2hhbmdlIGV2ZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlQWZ0ZXJDaGFuZ2VFdmVudChlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgLy8gb3B0aW9ucyBpcyBkaXNhYmxlZFxuICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5wcm9tcHRUaW1lT25EYXRlQ2hhbmdlIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXMgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlIHx8XG4gICAgICAgICAgICAvLyB0aW1lIGlzIGRpc2FibGVkXG4gICAgICAgICAgICAhdGhpcy5kaXNwbGF5Ll9oYXNUaW1lIHx8XG4gICAgICAgICAgICAvLyBjbG9jayBjb21wb25lbnQgaXMgYWxyZWFkeSBzaG93aW5nXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkud2lkZ2V0XG4gICAgICAgICAgICAgICAgPy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3Muc2hvdylbMF1cbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3MudGltZUNvbnRhaW5lcikpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEZpcnN0IHRpbWUgZXZlci4gSWYgdXNlQ3VycmVudCBvcHRpb24gaXMgc2V0IHRvIHRydWUgKGRlZmF1bHQpLCBkbyBub3RoaW5nXG4gICAgICAgIC8vIGJlY2F1c2UgdGhlIGZpcnN0IGRhdGUgaXMgc2VsZWN0ZWQgYXV0b21hdGljYWxseS5cbiAgICAgICAgLy8gb3IgZGF0ZSBkaWRuJ3QgY2hhbmdlICh0aW1lIGRpZCkgb3IgZGF0ZSBjaGFuZ2VkIGJlY2F1c2UgdGltZSBkaWQuXG4gICAgICAgIGlmICgoIWUub2xkRGF0ZSAmJiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnVzZUN1cnJlbnQpIHx8XG4gICAgICAgICAgICAoZS5vbGREYXRlICYmIGUuZGF0ZT8uaXNTYW1lKGUub2xkRGF0ZSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2N1cnJlbnRQcm9tcHRUaW1lVGltZW91dCk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQcm9tcHRUaW1lVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheS53aWRnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLmFjdGlvbi5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcy5kaXNwbGF5LndpZGdldC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3Rpb249XCJ0b2dnbGVQaWNrZXJcIl0nKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBBY3Rpb25UeXBlcyQxLnRvZ2dsZVBpY2tlcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5wcm9tcHRUaW1lT25EYXRlQ2hhbmdlVHJhbnNpdGlvbkRlbGF5KTtcbiAgICB9XG59XG4vKipcbiAqIFdoZW5ldmVyIGEgbG9jYWxlIGlzIGxvYWRlZCB2aWEgYSBwbHVnaW4gdGhlbiBzdG9yZSBpdCBoZXJlIGJhc2VkIG9uIHRoZVxuICogbG9jYWxlIG5hbWUuIEUuZy4gbG9hZGVkTG9jYWxlc1sncnUnXVxuICovXG5jb25zdCBsb2FkZWRMb2NhbGVzID0ge307XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4vKipcbiAqIENhbGxlZCBmcm9tIGEgbG9jYWxlIHBsdWdpbi5cbiAqIEBwYXJhbSBsIGxvY2FsZSBvYmplY3QgZm9yIGxvY2FsaXphdGlvbiBvcHRpb25zXG4gKi9cbmNvbnN0IGxvYWRMb2NhbGUgPSAobCkgPT4ge1xuICAgIGlmIChsb2FkZWRMb2NhbGVzW2wubmFtZV0pXG4gICAgICAgIHJldHVybjtcbiAgICBsb2FkZWRMb2NhbGVzW2wubmFtZV0gPSBsLmxvY2FsaXphdGlvbjtcbn07XG4vKipcbiAqIEEgc2V0cyB0aGUgZ2xvYmFsIGxvY2FsaXphdGlvbiBvcHRpb25zIHRvIHRoZSBwcm92aWRlZCBsb2NhbGUgbmFtZS5cbiAqIGBsb2FkTG9jYWxlYCBNVVNUIGJlIGNhbGxlZCBmaXJzdC5cbiAqIEBwYXJhbSBsXG4gKi9cbmNvbnN0IGxvY2FsZSA9IChsKSA9PiB7XG4gICAgY29uc3QgYXNrZWQgPSBsb2FkZWRMb2NhbGVzW2xdO1xuICAgIGlmICghYXNrZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBEZWZhdWx0T3B0aW9ucy5sb2NhbGl6YXRpb24gPSBhc2tlZDtcbn07XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4vKipcbiAqIENhbGxlZCBmcm9tIGEgcGx1Z2luIHRvIGV4dGVuZCBvciBvdmVycmlkZSBwaWNrZXIgZGVmYXVsdHMuXG4gKiBAcGFyYW0gcGx1Z2luXG4gKiBAcGFyYW0gb3B0aW9uXG4gKi9cbmNvbnN0IGV4dGVuZCA9IGZ1bmN0aW9uIChwbHVnaW4sIG9wdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgIGlmICghcGx1Z2luKVxuICAgICAgICByZXR1cm4gdGVtcHVzRG9taW51cztcbiAgICBpZiAoIXBsdWdpbi5pbnN0YWxsZWQpIHtcbiAgICAgICAgLy8gaW5zdGFsbCBwbHVnaW4gb25seSBvbmNlXG4gICAgICAgIHBsdWdpbihvcHRpb24sIHsgVGVtcHVzRG9taW51cywgRGF0ZXMsIERpc3BsYXksIERhdGVUaW1lLCBOYW1lc3BhY2UgfSwgdGVtcHVzRG9taW51cyk7XG4gICAgICAgIHBsdWdpbi5pbnN0YWxsZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcHVzRG9taW51cztcbn07XG5jb25zdCB2ZXJzaW9uID0gJzYuNy4xMyc7XG5jb25zdCB0ZW1wdXNEb21pbnVzID0ge1xuICAgIFRlbXB1c0RvbWludXMsXG4gICAgZXh0ZW5kLFxuICAgIGxvYWRMb2NhbGUsXG4gICAgbG9jYWxlLFxuICAgIE5hbWVzcGFjZSxcbiAgICBEZWZhdWx0T3B0aW9ucyxcbiAgICBEYXRlVGltZSxcbiAgICBVbml0LFxuICAgIHZlcnNpb24sXG4gICAgRGVmYXVsdEVuTG9jYWxpemF0aW9uLFxufTtcblxuZXhwb3J0IHsgRGF0ZVRpbWUsIERlZmF1bHRFbkxvY2FsaXphdGlvbiwgRGVmYXVsdE9wdGlvbnMsIE5hbWVzcGFjZSwgVGVtcHVzRG9taW51cywgVW5pdCwgZXh0ZW5kLCBsb2FkTG9jYWxlLCBsb2NhbGUsIHZlcnNpb24gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlbXB1cy1kb21pbnVzLmVzbS5qcy5tYXBcbiIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHsgSVNoYXJlZG9CbGFkZU1vZGVsLCBUU2hhcmVEb0JsYWRlLCBJQ29uZmlndXJhdGlvbkhvc3QgfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9TaGFyZWRvQXNwZWN0TW9kZWxzXCI7XG5pbXBvcnQgeyBJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcbmltcG9ydCB7IHRvT2JzZXJ2YWJsZU9iamVjdCB9IGZyb20gXCIuL0tPQ29udmVydGVyXCI7XG5pbXBvcnQgeyBnZXROZXN0ZWRQcm9wZXJ0eSwgc2V0TmVzdGVkUHJvcGVydHkgfSBmcm9tIFwiLi9PYmplY3RIZWxwZXJzXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBUU2hhcmVkbyB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1RTaGFyZWRvXCI7XG5cbmV4cG9ydCB0eXBlIERlZmF1bHRzPFQ+ID0gVCAmIHsgZGVidWc6IElEZWJ1ZyB9XG5cbmludGVyZmFjZSBJREVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBtb2RlbDogSVNoYXJlZG9CbGFkZU1vZGVsO1xuICAgIGJsYWRlOiBUU2hhcmVEb0JsYWRlO1xufVxuXG50eXBlIE9ic2VydmFibGVpZnk8VD4gPSB7XG4gICAgW1AgaW4ga2V5b2YgVF06IGtvLk9ic2VydmFibGU8VFtQXT47XG59O1xuXG5leHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSB7IFtLIGluIGtleW9mIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPl06IGtvLk9ic2VydmFibGU8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdPjsgfVxuXG5leHBvcnQgdHlwZSBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IFRDb25maWcgJiB7XG4gICAgZGVidWc6IElEZWJ1Zztcbn1cblxuZXhwb3J0IHR5cGUgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+ID0gSUNvbmZpZ3VyYXRpb25Ib3N0ICYgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG4vLyBhYnN0cmFjdCBjbGFzcyBDcmVhdG9yPFRDb25maWc+IHtcbi8vICAgICBwdWJsaWMgYWJzdHJhY3QgRmFjdG9yeU1ldGhvZChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+LCBiYXNlTW9kZWw6IGFueSk6IGFueTtcbi8vIH1cblxuXG5cbmV4cG9ydCBjb25zdCBGT01SX0JVSUxERVJfUEFUSF9TVFJJTkcgPSBcImFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGFcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtQnVpbGRlckZpZWxkUGF0aChmb3JtQnVpbGRlckZpZWxkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYCR7Rk9NUl9CVUlMREVSX1BBVEhfU1RSSU5HfS4ke2Zvcm1CdWlsZGVyRmllbGR9YDtcbn1cblxudHlwZSBPYnNlcnZhYmxlUGVyc29uPFRDb25maWc+ID0gT2JzZXJ2YWJsZWlmeTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4+O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUlERUFzcGVjdDxUQ29uZmlnLCBUUGVyc2l0YW5jZT4gIHtcbiAgICBfZGF0YTphbnk7IC8vbm9uIG1vZGVsIGRhdGEgc3RvcmFnZVxuICAgIG9yaWdpbmFsQ29uZmlndXJhdGlvbjogVENvbmZpZztcbiAgICBjb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgZGVmYXVsdHM6IERlZmF1bHRzPFRDb25maWc+IHwgdW5kZWZpbmVkO1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICBibGFkZTogVFNoYXJlRG9CbGFkZTtcbiAgICBsb2FkZWQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47XG4gICAgc2hhcmVkb0lkOiBhbnk7XG4gICAgc2hhcmVkb1R5cGVTeXN0ZW1OYW1lOiBrby5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgdmFsaWRhdGlvbjogYW55O1xuICAgIHZhbGlkYXRpb25FcnJvckNvdW50OiBrby5PYnNlcnZhYmxlPG51bWJlcj47XG4gICAgYmFzZU1vZGVsOiBUU2hhcmVkbzxhbnk+O1xuICAgIHRoaXNDb21wb25lbnROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICBcbiAgICBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGE6IHN0cmluZyB8IHVuZGVmaW5lZDsgLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tXG4gICAgb3B0aW9uczogT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+XG4gICAgdW5pcXVlSWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEJhc2UgQ29uc3RydWN0b3IgZm9yIGFsbCBJREVBc3BlY3RzLCBmb3JjZXMgdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsb2FkIGFuZCBzYXZlIG1ldGhvZHNcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50TmFtZSAvL1RoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBBc3BlY3QuUXVpY2tWaWV3XG4gICAgICogQHBhcmFtIGxvYWRTYXZlTG9jYXRpb24gLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tIGUuZy4gbW9kZWwuYXNwZWN0LkZvcm1CdWlsZGVyLmZvcm1EYXRhXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLy9UaGUgZWxlbWVudCB0aGF0IHRoZSBhc3BlY3QgaXMgYm91bmQgdG9cbiAgICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbiAvL1RoZSBjb25maWd1cmF0aW9uIHBhc3NlZCBpbiBmcm9tIHRoZSBibGFkZSBhbmQgdGhlIGRlc2lnbiB0aW1lIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gYmFzZU1vZGVsIC8vVGhlIGJhc2UgbW9kZWwgcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlXG4gICAgICogQHBhcmFtIGRlZmF1bHRzIC8vVGhlIGRlZmF1bHRzIHBhc3NlZCBpbiBmcm9tIHRoZSB3aWRnZXQgdG8gc2V0IGluY2FzZSBvZiBiYWQgY29uZmlndXJhdGlvbiBvciBtaXNzaW5nIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnROYW1lOiBzdHJpbmcsIGxvYWRTYXZlTG9jYXRpb246IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIGNvbmZpZ3VyYXRpb246IFRDb25maWcsIGJhc2VNb2RlbDogVFNoYXJlZG88YW55Pikge1xuXG4gICAgICAgICAgXG4gICAgICAgIHRoaXMudW5pcXVlSWQgPSB1dWlkKCk7XG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gbG9hZFNhdmVMb2NhdGlvbjtcbiAgICAgICAgdGhpcy50aGlzQ29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIC8vU2hhcmVEbyBwYXNzZXMgdGhlIGNvbmZpZyBhcyB3ZWxsIGFzIG90aGVyIHN0dWZmLCBzbyB3ZSBuZWVkIHRvIGV4dHJhY3QgdGhlIGNvbmZpZ1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24gYXMgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgICAgICB0aGlzLmJhc2VNb2RlbCA9IGJhc2VNb2RlbDtcblxuICAgICAgICB0aGlzLmRlZmF1bHRzID0gdGhpcy5zZXREZWZhdWx0cygpOyAvL3NldHVwIHRoZSBkZWZhdWx0IGJ5IGNhbGxpbmcgdGhlIGFic3RyYWN0IG1ldGhvZCBpbiB0aGUgY2hpbGQgY2xhc3NcbiAgICAgICBcbiAgICAgICAgLy8gdGhpcy5kYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBNZXJnZSB0aGUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZCh0aGlzLmRlZmF1bHRzLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbikgYXMgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50OyBcbiAgICAgICAgLy9jcmVhdGUgYSBuZXcgbW9kZWxcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdC5tb2RlbDtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdGhpcy5tb2RlbC5jYW5FZGl0O1xuICAgICAgICB0aGlzLmJsYWRlID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0LmJsYWRlO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICAvLyBNYXAgdGhlIGJhc2UgbW9kZWwgcHJvcGVydGllc1xuICAgICAgICB0aGlzLnNoYXJlZG9JZCA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWwuaWQ7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvSWQgfHwgdGhpcy5zaGFyZWRvSWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvSWQgZm91bmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3QubW9kZWwuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIHx8IHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIGZvdW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gdG9PYnNlcnZhYmxlT2JqZWN0KHRoaXMuY29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgLy8gVmFsaWRhdGlvblxuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB7fTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCA9IGtvLm9ic2VydmFibGUoMCk7XG5cbiAgICAgICAgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSB0aGlzLnNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOyAvL3NldHVwIHRoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gYnkgY2FsbGluZyB0aGUgYWJzdHJhY3QgbWV0aG9kIGluIHRoZSBjaGlsZCBjbGFzc1xuXG5cbiAgICB9XG5cbiAgICBnZXQgZGF0YSgpIDogVFBlcnNpdGFuY2UgfCB1bmRlZmluZWQge1xuICAgIFxuICAgICAgICBpZih0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGxvY2F0aW9uIHRvIGxvYWQgZGF0YSBmcm9tIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIiwgXCJyZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXN0ZWREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkodGhpcy5tb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgIFxuICAgICAgICB0aGlzLmxvZyhcIkRhdGEgZm91bmQgYXQgbG9jYXRpb25cIiwgXCJncmVlblwiLCBuZXN0ZWREYXRhKTtcbiAgICAgICAgbGV0IHJldFZhbHVlID0ga28udG9KUyhuZXN0ZWREYXRhKTtcbiAgICAgICAgdGhpcy5sb2coXCJEYXRhIGZvdW5kIGF0IGxvY2F0aW9uXCIsIFwiZ3JlZW5cIiwgcmV0VmFsdWUpO1xuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IGRhdGEodmFsdWU6IFRQZXJzaXRhbmNlIHwgdW5kZWZpbmVkKSB7XG4gICAgICBcbiAgICAgICAgaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBzYXZlIGRhdGEgdG8gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IHZhbHVlVG9TZXQ6IGFueSA9IHZhbHVlO1xuICAgICAgICAvLyBpZih0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YS5pbmNsdWRlcyhcImZvcm1CdWlsZGVyXCIpKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICAvL2Zvcm1idWlsZGVyIERhdGEgYWx3YXlzIG5lZWQgdG8gYmUgc3RyaW5nXG4gICAgICAgIC8vICAgICB0aGlzLmxvZyhcIlNldHRpbmcgZm9ybWJ1aWxkZXIgZGF0YSAtIGNvbnZlcnRpbmcgdG8gc3RyaW5nXCIsIFwiZ3JlZW5cIiwgdmFsdWUpXG4gICAgICAgIC8vICAgICB2YWx1ZVRvU2V0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAvLyAgICAgdGhpcy5sb2coXCJhZnRlciBTZXR0aW5nIGZvcm1idWlsZGVyIGRhdGEgLSBjb252ZXJ0ZWQgdG8gc3RyaW5nXCIsIFwiZ3JlZW5cIiwgdmFsdWVUb1NldClcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLmxvZyhcIlNldHRpbmcgZGF0YSBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsdmFsdWVUb1NldCk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB2YWx1ZVRvU2V0KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogISBpbXBvcnRhbnQ6IE1hbmRhdG9yeSBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHNldCB0aGUgZGVmYXVsdHNcbiAgICAgKiAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgY29uc3RydWN0b3IgdG8gc2V0IHRoZSBkZWZhdWx0c1xuICAgICAqIEByZXR1cm5zIERlZmF1bHRzPFRDb25maWc+XG4gICAgICogQG1lbWJlcm9mIEJhc2VJREVBc3BlY3RcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXREZWZhdWx0cygpOiBEZWZhdWx0czxUQ29uZmlnPjtcblxuICAgIC8qKlxuICAgICAqICEgaW1wb3J0YW50OiBNYW5kYXRvcnkgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byBzZXQgdGhlIGRlZmF1bHRzIGZvciB0aGUgd2lkZ2V0Lmpzb25cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRFeGFtcGxlRm9yTW9kZWxsZXIoKTogRGVmYXVsdHM8VENvbmZpZz47XG5cbiAgICAgLyoqXG4gICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG9cbiAgICAgKiBFeGFtcGxlcyBvZiB0aGlzIGFyZTpcbiAgICAgKiAtIGFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEue2Zvcm1CdWlsZGVyRmllbGR9XG4gICAgICogLSBhc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlclxuICAgICAqIC0gdW5kZWZpbmVkIChpZiBubyBkYXRhIGlzIHRvIGJlIGxvYWRlZCBvciBzYXZlZCBieSB0aGUgYmFzZSBjbGFzcylcbiAgICAgKiBAcmV0dXJucyBUaGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gbG9hZCBhbmQgc2F2ZSB0byBPUiB1bmRlZmluZWQgaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3NcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiB0aGUgbW9kZWwgaXMgc2F2ZWQuIE1hbmlwdWxhdGUgdGhlXG4gICAgICogbW9kZWwgYXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgcHVibGljIG9uU2F2ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nKFwiU2F2aW5nLCBtb2RlbCBwYXNzZWQgaW4gd2UgbmVlZCB0byBwZXJzaXN0IHRvXCIsIFwiZ3JlZW5cIiwgdGhpcy5kYXRhKTtcblxuICAgICAgICBpZih0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGxvY2F0aW9uIHRvIHNhdmUgZGF0YSB0byBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgZGF0YVRvUGVyc2lzdCA9IHRoaXMuZGF0YTtcbiAgICAgICAgbGV0IGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgaWYoY3VycmVudERhdGEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBDdXJyZW50IGRhdGEgYXQgbG9jYXRpb24gJHt0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YX0gOmAsIFwibWFnZW50YVwiLCBjdXJyZW50RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50RGF0YSkge1xuICAgICAgICAgICAvLyB0aGlzLmxvZyhcIkRhdGEgZG9lcyBub3QgZXhpc3QsIHdlIHdpbGwgY3JlYXRlXCIsIFwib3JhbmdlXCIpO1xuICAgICAgICAgIC8vICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIHt9KTtcbiAgICAgICAgICAgLy8gY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKGBOZXcgZGF0YSB0byBwZXJzaXN0IHRvIGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLCBcImJsdWVcIiwgZGF0YVRvUGVyc2lzdCk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgZGF0YVRvUGVyc2lzdCk7XG4gICAgfTtcblxuXG4gICBcblxuICAgIG9uRGVzdHJveShtb2RlbD86IGFueSkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uRGVzdHJveVwiKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBVSSBmcmFtZXdvcmsgYWZ0ZXIgaW5pdGlhbCBjcmVhdGlvbiBhbmQgYmluZGluZyB0byBsb2FkIGRhdGFcbiAgICAgKiBpbnRvIGl0J3MgbW9kZWxcbiAgICAgKi9cbiAgICBsb2FkQW5kQmluZCgpIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBsb2FkQW5kQmluZFwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgKG1vZGVsOmFueSkgcGFzc2VkIGluXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIGJhc2VkIG9uIGxvY2F0aW9uIHRvIHNhdmVcIiwgXCJncmVlblwiLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGJlZm9yZSB0aGUgbW9kZWwgaXMgc2F2ZWRcbiAgICAgKi9cbiAgICBvbkJlZm9yZVNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkJlZm9yZVNhdmVcIik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciBhZnRlciB0aGUgbW9kZWwgaGFzIGJlZW4gc2F2ZWQuXG4gICAgICovXG4gICAgb25BZnRlclNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkFmdGVyU2F2ZVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIGl0IHJlbG9hZHMgYXNwZWN0IGRhdGFcbiAgICAgKi9cbiAgICBvblJlbG9hZChtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uUmVsb2FkXCIpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBsb2dnaW5nIGZvciB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBkZWJ1ZyBjb25maWd1cmF0aW9uXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIGNvbG9yIFxuICAgICAqIEBwYXJhbSBkYXRhIFxuICAgICAqL1xuICAgIGxvZyhtZXNzYWdlOiBzdHJpbmcsIGNvbG9yPzogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uZGVidWc/LmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uZGVidWcubG9nVG9Db25zb2xlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb2xvcikgY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGxpbmVObyA9IGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKChuZXcgRXJyb3IoKSkuc3RhY2spO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyAke3RoaXMudGhpc0NvbXBvbmVudE5hbWV9IC0gJHttZXNzYWdlfWAsIGBjb2xvcjoke2NvbG9yfWAsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBGb3JtYnVpbGQgaWYgaXQgZXhpc3RzIG9yIGNyZWF0ZXMgaXQgaWYgaXQgZG9lcyBub3RcbiAgICAgKiBcbiAgICAgKi9cbiAgICBmb3JtYnVpbGRlcigpIHtcblxuICAgICAgICBpZiAoIXRoaXMuYmxhZGU/Lm1vZGVsPy5hc3BlY3REYXRhPy5mb3JtQnVpbGRlcj8uZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBub3QgZm91bmQgLSB3aWxsIGNyZWF0ZSB0aGUgcGF0aFwiLCBcImJsdWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgZm91bmRcIiwgXCJncmVlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRW5zdXJlIHRoZSBwYXRoIGV4aXN0c1xuICAgICAgICB0aGlzLmJsYWRlID0gdGhpcy5ibGFkZSB8fCB7fTtcbiAgICAgICAgdGhpcy5ibGFkZS5tb2RlbCA9IHRoaXMuYmxhZGUubW9kZWwgfHwge307XG4gICAgICAgIHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YSA9IHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YSB8fCB7fTtcbiAgICAgICAgdGhpcy5ibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyID0gdGhpcy5ibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyIHx8IHsgZm9ybURhdGE6IHt9IH07XG5cbiAgIFxuICAgICAgICByZXR1cm4gdGhpcy5ibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhO1xuXG4gICAgfVxuXG4gICAgZm9ybWJ1aWxkZXJGaWVsZChmb3JtYnVpbGRlckZpZWxkOnN0cmluZywgc2V0VmFsdWU/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZvcm1idWlsZGVyKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0ISBcIiwgXCJyZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGb3JtIGJ1aWxkZXIgZG9lcyBub3QgZXhpc3QhXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZvdW5kVmFsdWUgPSB0aGlzLmZvcm1idWlsZGVyKClbZm9ybWJ1aWxkZXJGaWVsZF1cbiAgICAgICAgaWYgKCFmb3VuZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgRm9ybSBidWlsZGVyIGRvZXMgbm90IGNvbnRhaW4gZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGBDcmVhdGluZyBmaWVsZCAke2Zvcm1idWlsZGVyRmllbGR9IGAsIFwiYmx1ZVwiKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWJ1aWxkZXIoKVtmb3JtYnVpbGRlckZpZWxkXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQXJlIHdlIGRvaW5nIGEgc2V0XG4gICAgICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYFNldHRpbmcgJHtmb3JtYnVpbGRlckZpZWxkfSB0byAke3NldFZhbHVlfWAsIFwiZ3JlZW5cIik7XG4gICAgICAgICAgICB0aGlzLmZvcm1idWlsZGVyKClbZm9ybWJ1aWxkZXJGaWVsZF0gPSBzZXRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBzZXRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZFZhbHVlO1xuICAgIH1cblxufVxuIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVPYmplY3Q8VCBleHRlbmRzIG9iamVjdD4ob2JqOiBUKTogeyBbSyBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW0tdPiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAvL2NoZWNrIGlmIG9ialtrZXldIGlzIGFscmVhZHkgYSBvYnNlcnZhYmxlXG4gICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGtvLm9ic2VydmFibGUob2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRbcHJvcF0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRbcHJvcF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICB9XG4gICAgY3VycmVudFtwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBwcm9wZXJ0eVBhdGguc3BsaXQoJy4nKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChjdXJyZW50W3Byb3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xufVxuIiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJJREVBc3BlY3RzOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvX2lkZUZpbGVzL0lERUFzcGVjdHMvRGF0ZVBpY2tlckFzcGVjdC9cIjsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJEYXRlUGlja2VyQXNwZWN0XCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5qID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSA/IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA6IHVuZGVmaW5lZDtcblx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cblx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG5cdFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiAoaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF0pKTtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG5cdFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuXHRcdFx0XHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCk7XG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdFx0XHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhWzFdKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkLCBcImNodW5rLVwiICsgY2h1bmtJZCwgY2h1bmtJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG59O1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rSURFQXNwZWN0c1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtJREVBc3BlY3RzXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJpbXBvcnQgeyBEYXRlVGltZSwgVGVtcHVzRG9taW51cyB9IGZyb20gJ0Blb25hc2Rhbi90ZW1wdXMtZG9taW51cyc7XHJcbi8vaHR0cHM6Ly9nZXRkYXRlcGlja2VyLmNvbS82L29wdGlvbnMvZGlzcGxheS5odG1sXHJcbmltcG9ydCB7IElEYXRlUGlja2VyQXNwZWN0T3B0aW9ucyB9IGZyb20gXCIuL0lDb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCB7IEJhc2VJREVBc3BlY3QsIERlZmF1bHRzLCBnZXRGb3JtQnVpbGRlckZpZWxkUGF0aCB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0XCI7XHJcblxyXG5sZXQgdGhpc1dpZGdldFN5c3RlbU5hbWUgPSBcIkRhdGVQaWNrZXJBc3BlY3RcIjtcclxuXHJcblxyXG4vL2FkZCBzdHlsZSB0byBoZWFkOiBodHRwczovL3VucGtnLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzLXdlYkBsYXRlc3QvZGlzdC9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi5taW4uY3NzXHJcbmRvY3VtZW50LmhlYWQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnNcIj5gKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyQXNwZWN0IGV4dGVuZHMgQmFzZUlERUFzcGVjdDxJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnMsIGFueT4ge1xyXG4gICAgXHJcbiAgICBkYXRlUGlja2VyRGl2OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIGRhdGVUaW1lUGlja2VyOiBUZW1wdXNEb21pbnVzIHwgdW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSURhdGVQaWNrZXJBc3BlY3RPcHRpb25zLCBiYXNlTW9kZWw6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKFwiU2luZ2xlVmFsdWVBc3BlY3RcIiwgXCJhc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlclwiLCBlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpXHJcbiAgICB9XHJcblxyXG4gICAgLy9BYnN0cmFjdCBtZXRob2RzIC0gbXVzdCBiZSBpbXBsZW1lbnRlZCBieSB0aGUgZGVyaXZlZCBjbGFzc1xyXG4gICAgc2V0RGVmYXVsdHMoKTogRGVmYXVsdHM8SURhdGVQaWNrZXJBc3BlY3RPcHRpb25zPiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLy8gQXNwZWN0IHdpZGdldCBjb25maWcgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICB0aXRsZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBmb3JtQnVpbGRlckZpZWxkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHBpY2tlckVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGV2ZW50VG9GaXJlT25VcGRhdGU6IFtcIklERUFzcGVjdHMuRGF0ZVBpY2tlckFzcGVjdC5VcGRhdGVcIl0sXHJcbiAgICAgICAgICAgIGRlZmF1bHREYXRlRnJvbU5vd0hvdXJzOiAzLFxyXG4gICAgICAgICAgICBkYXRlUGlja2VyT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaWRlQnlTaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiBcImxpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVidWc6IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgIC8vQWJzdHJhY3QgbWV0aG9kcyAtIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGRlcml2ZWQgY2xhc3NcclxuICAgIHNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZ3VyYXRpb24uZm9ybUJ1aWxkZXJGaWVsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gZm9ybWJ1aWxkZXIgZmllbGQgc2V0IGluIGNvbmZpZ3VyYXRpb24gLSBjaGVjayBhc3BlY3QgY29uZmlndXJhdGlvblwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZm9ybWJ1aWxkZXIgZmllbGQgc2V0IGluIGNvbmZpZ3VyYXRpb24gLSBjaGVjayBhc3BlY3QgY29uZmlndXJhdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdldEZvcm1CdWlsZGVyRmllbGRQYXRoKHRoaXMuY29uZmlndXJhdGlvbi5mb3JtQnVpbGRlckZpZWxkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFBpY2tlckVuYWJsZWRTdGF0ZShuZXdWYWx1ZTogYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVBpY2tlckRpdikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyRGl2LmNsYXNzTGlzdC50b2dnbGUoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyRGl2LmNsYXNzTGlzdC50b2dnbGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYW5hdGlzZSB0aGUgZGF0YSBiZWZvcmUgc2F2aW5nLCBmb3JtIGJ1aWxkIGRhdGEgbmVlZHMgdG8gYmUgYSBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgc2V0IG1vZGVsRGF0YUFzRGF0ZShuZXdWYWx1ZTogRGF0ZVRpbWUgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBuZXdWYWx1ZT8udG9JU09TdHJpbmcoKSB8fCB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBkYXRhIGZyb20gZm9ybSBidWlsZGVyIGFuZCBjb252ZXJ0cyB0byBEYXRlVGltZVxyXG4gICAgICovXHJcbiAgICBnZXQgbW9kZWxEYXRhQXNEYXRlKCk6IERhdGVUaW1lIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgcmV0VmFsdWU6IERhdGVUaW1lXHJcblxyXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIGlmICghZm91bmRWYWx1ZSkge1xyXG4gICAgICAgICAgICBmb3VuZFZhbHVlID0gdGhpcy5nZW5lcmF0ZURlZmF1bHREYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldFZhbHVlID0gdGhpcy5lbnN1cmVEYXRlKGZvdW5kVmFsdWUpO1xyXG5cclxuICAgICAgICB0aGlzLm1vZGVsRGF0YUFzRGF0ZSA9IHJldFZhbHVlOyAvL3NldCB0aGUgdmFsdWUgdG8gZW5zdXJlIGl0IGlzIHZhbGlkXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybnMgZ2V0IHRvZGF5IGRhdGUgKyBkZWZhdWx0RGF0ZUZyb21Ob3dIb3VycyAoaWYgc2V0IGluIGNvbmZpZ3VyYXRpb24pXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVEZWZhdWx0RGF0ZSgpIHtcclxuICAgICAgICBsZXQgZGVmYXVsdERhdGUgPSBuZXcgRGF0ZVRpbWUoRGF0ZVRpbWUubm93KCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uZGVmYXVsdERhdGVGcm9tTm93SG91cnMpIHtcclxuICAgICAgICAgICAgZGVmYXVsdERhdGUuc2V0SG91cnMoZGVmYXVsdERhdGUuZ2V0SG91cnMoKSArIHRoaXMuY29uZmlndXJhdGlvbi5kZWZhdWx0RGF0ZUZyb21Ob3dIb3Vycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBieSB0aGUgVUkgZnJhbWV3b3JrIGFmdGVyIGluaXRpYWwgY3JlYXRpb24gYW5kIGJpbmRpbmcgdG8gbG9hZCBkYXRhXHJcbiAgICAgKiBpbnRvIGl0J3MgbW9kZWxcclxuICAgICAqL1xyXG4gICAgbG9hZEFuZEJpbmQoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLklERUFzcGVjdHMtRGF0ZVBpY2tlckFzcGVjdFwiKTtcclxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBlbGVtZW50IGZvdW5kXCIsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIGFscmVhZHkgZXhpc3RzIHJlbW92ZSBpdFxyXG4gICAgICAgIGlmICh0aGlzLmRhdGVQaWNrZXJEaXYpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJBbHJlYWR5IGV4aXN0c1wiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyRGl2LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0J1aWxkIHRoZSBkYXRlIHBpY2tlciBkaXYgXHJcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0aGlzLmRhdGVQaWNrZXJEaXYuY2xhc3NMaXN0LmFkZChcInRoZS1waWNrZXJcIik7XHJcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyRGl2LmNsYXNzTGlzdC5hZGQoXCJsb2ctZXZlbnRcIik7XHJcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyRGl2LmlkID0gdGhpcy51bmlxdWVJZDtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGlucHV0LmlkID0gdGhpcy51bmlxdWVJZCArIFwiSW5wdXRcIjtcclxuICAgICAgICBpbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZChcImZvcm0tY29udHJvbFwiKTtcclxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRkLXRhcmdldFwiLCBcIiNcIiArIHRoaXMudW5pcXVlSWQpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gICAgICAgIC8vIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgLy8gc3Bhbi5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZ3JvdXAtdGV4dFwiKTtcclxuICAgICAgICAvLyBzcGFuLnNldEF0dHJpYnV0ZShcImRhdGEtdGQtdGFyZ2V0XCIsIFwiI1wiICsgdGhpcy51bmlxdWVJZCk7XHJcbiAgICAgICAgLy8gc3Bhbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRkLXRvZ2dsZVwiLCBcImRhdGV0aW1lcGlja2VyXCIpO1xyXG4gICAgICAgIC8vIGxldCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7IFxyXG4gICAgICAgIC8vIGkuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAvLyBpLmNsYXNzTGlzdC5hZGQoXCJmYS1jYWxlbmRhclwiKTtcclxuICAgICAgICAvLyBzcGFuLmFwcGVuZENoaWxkKGkpOyBcclxuICAgICAgICAvLyB0aGlzLmRhdGVQaWNrZXJEaXYuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5kYXRlUGlja2VyRGl2KTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRlVGltZVBpY2tlciA9IG5ldyBUZW1wdXNEb21pbnVzKHRoaXMuZGF0ZVBpY2tlckRpdiwgdGhpcy5vcHRpb25zLmRhdGVQaWNrZXJPcHRpb25zKCkgfHwge30pO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5kYXRlUGlja2VyT3B0aW9ucy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEFuZEJpbmQoKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2V0UGlja2VyRW5hYmxlZFN0YXRlKHRoaXMub3B0aW9ucy5waWNrZXJFbmFibGVkKCkpO1xyXG4gICAgICAgIC8vU2V0IHRoZSB2YWx1ZSBvZiB0aGUgcGlja2VyIHRvIHRoZSB2YWx1ZSBpbiB0aGUgbW9kZWxcclxuICAgICAgICB0aGlzLmRhdGVUaW1lUGlja2VyLmRhdGVzLnNldFZhbHVlKFxyXG4gICAgICAgICAgICB0aGlzLm1vZGVsRGF0YUFzRGF0ZSxcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZVBpY2tlci5kYXRlcy5sYXN0UGlja2VkSW5kZXhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGVUaW1lUGlja2VyLnN1YnNjcmliZShcImNoYW5nZS50ZFwiLCAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRGF0ZSBDaGFuZ2VkXCIsIFwicmVkXCIsIGUpO1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZXZlbnRUb0ZpcmVPblVwZGF0ZSgpPy5mb3JFYWNoKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHVpLmV2ZW50cy5icm9hZGNhc3QoZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1idWlsZGVyRmllbGQ6IHRoaXMuZm9ybWJ1aWxkZXJGaWVsZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2V0Q3VycmVudFNlbGVjdGVkRGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7IC8vZmlyZSBldmVudCBhbmQgcGFzcyBpbiB0aGUgZGF0ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbERhdGFBc0RhdGUgPSB0aGlzLmdldEN1cnJlbnRTZWxlY3RlZERhdGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5zdXJlIHRoZSBkYXRlIGlzIGEgdmFsaWQgZGF0ZVxyXG4gICAgICAgICogQHBhcmFtIGRcclxuICAgICAgICAqIEByZXR1cm5zIGEgRGF0ZVRpbWUgYmFzZWQgb24gdGhlIGlucHV0IG9yIGEgZGVmYXVsdCBkYXRlIGlmIHRoZSBpbnB1dCBpcyBub3QgdmFsaWRcclxuICAgICoqL1xyXG4gICAgZW5zdXJlRGF0ZShkOiBhbnkpIDogRGF0ZVRpbWUge1xyXG4gICAgICAgIGxldCByZXRWYWx1ZTogRGF0ZVRpbWU7XHJcbiAgICAgICAgLy9jaGVjayBpZiBkIGlzIGEgZGF0ZVxyXG4gICAgICAgIGlmIChkIGluc3RhbmNlb2YgRGF0ZVRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgcmV0VmFsdWUgPSBuZXcgRGF0ZVRpbWUoRGF0ZVRpbWUucGFyc2UoZCkpO1xyXG4gICAgICAgICAgICBpZighRGF0ZVRpbWUuaXNWYWxpZChyZXRWYWx1ZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldFZhbHVlPSB0aGlzLmdlbmVyYXRlRGVmYXVsdERhdGUoKTs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKGBVbmFibGUgdG8gcGFyc2UgZGF0ZSAke2R9IChzZXR0aW5nIGRhdGUgdG8gZGVmYXVsdCBkYXRlKSAtIGNoZWNrIGFzcGVjdCBjb25maWd1cmF0aW9uIGAsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuZ2VuZXJhdGVEZWZhdWx0RGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBsb2FkKG1vZGVsOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmxvZyhcIkxvYWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbG9hZChtb2RlbDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5sb2coXCJSZWxvYWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEN1cnJlbnRTZWxlY3RlZERhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVQaWNrZXI/LmRhdGVzLnBpY2tlZFswXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgb25TYXZlKG1vZGVsOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvZyhcIlNhdmVcIik7XHJcbiAgICAgICAgdGhpcy5tb2RlbERhdGFBc0RhdGUgPSB0aGlzLmdldEN1cnJlbnRTZWxlY3RlZERhdGUoKTtcclxuICAgICAgICBzdXBlci5vblNhdmUobW9kZWwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9