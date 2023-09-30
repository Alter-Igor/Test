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

/***/ "./src/Common/HtmlHelper.ts":
/*!**********************************!*\
  !*** ./src/Common/HtmlHelper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addHighlightClass: () => (/* binding */ addHighlightClass),
/* harmony export */   escapeHtml: () => (/* binding */ escapeHtml)
/* harmony export */ });
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function addHighlightClass(content, targetWord) {
    return content.replace(new RegExp(`\\b${targetWord}\\b`, 'gi'), function (match) {
        return `<span class="highlight">${match}</span>`;
    });
}


/***/ }),

/***/ "./src/Common/JsonToHTMLConverter.ts":
/*!*******************************************!*\
  !*** ./src/Common/JsonToHTMLConverter.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonToHtmlConverter: () => (/* binding */ JsonToHtmlConverter)
/* harmony export */ });
class JsonToHtmlConverter {
    static convert(json) {
        if (json == null)
            return this.escapeHtml("<em>null</em>");
        if (typeof json !== "object")
            return this.escapeHtml(json.toString());
        if (Array.isArray(json)) {
            return this.arrayToHtml(json);
        }
        else {
            return this.objectToHtml(json);
        }
    }
    static arrayToHtml(arr) {
        const itemsHtml = arr.map(item => `<li>${this.convert(item)}</li>`).join("");
        return `<ul>${itemsHtml}</ul>`;
    }
    static objectToHtml(obj) {
        const propertiesHtml = Object.keys(obj)
            .map(key => `<li>${this.escapeHtml(key)}: ${this.convert(obj[key])}</li>`)
            .join("");
        return `<ul>${propertiesHtml}</ul>`;
    }
    static escapeHtml(unsafe) {
        return unsafe.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
// Usage example:
const json = {
    code: "ERROR_CODE",
    message: "Something went wrong",
    details: {
        info: "Detailed information about the error",
        timestamp: new Date().toISOString(),
        items: [1, 2, 3]
    }
};


/***/ }),

/***/ "./src/Common/Log.ts":
/*!***************************!*\
  !*** ./src/Common/Log.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Section: () => (/* binding */ Section),
/* harmony export */   clearSec: () => (/* binding */ clearSec),
/* harmony export */   err: () => (/* binding */ err),
/* harmony export */   hl: () => (/* binding */ hl),
/* harmony export */   hl1: () => (/* binding */ hl1),
/* harmony export */   imp: () => (/* binding */ imp),
/* harmony export */   inf: () => (/* binding */ inf),
/* harmony export */   l: () => (/* binding */ l),
/* harmony export */   lh: () => (/* binding */ lh),
/* harmony export */   lh1: () => (/* binding */ lh1),
/* harmony export */   lh2: () => (/* binding */ lh2),
/* harmony export */   lh3: () => (/* binding */ lh3),
/* harmony export */   nv: () => (/* binding */ nv),
/* harmony export */   runTest: () => (/* binding */ runTest),
/* harmony export */   secBackOne: () => (/* binding */ secBackOne),
/* harmony export */   suc: () => (/* binding */ suc),
/* harmony export */   wrn: () => (/* binding */ wrn)
/* harmony export */ });
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk */ "./node_modules/chalk/source/index.js");
/* harmony import */ var _StackHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StackHelper */ "./src/Common/StackHelper.ts");


chalk__WEBPACK_IMPORTED_MODULE_1__["default"].level = 3;
let defaultMode = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].reset;
let lastSec;
function clearSec() {
    // for(let i = 0; i < 10; i++){
    // console.groupEnd()
    // }
    if (lastSec?.group) {
        for (let i = 0; i < lastSec?.group; i++) {
            console.groupEnd();
        }
    }
    lastSec = new Section("Root", defaultMode);
}
function secBackOne() {
    lastSec = lastSec?.parent;
    console.groupEnd();
}
class Section {
    constructor(sectionName, c, section) {
        this.indent = 0;
        this.indentPad = "";
        this.group = 0;
        this.c = c;
        this.sectionName = sectionName;
        if (section) {
            this.indent = section.indent + 1;
            this.indentPad = "-".repeat(this.indent * 2) + " ";
        }
        lastSec = this;
        this.parent = section;
    }
    log(...args) {
        console.log(defaultMode(args));
    }
    lh1(heading) {
        return lh1(this.indentPad + heading, this);
    }
    lh2(heading) {
        return lh2(this.indentPad + heading, this);
    }
    lh3(heading) {
        return lh3(this.indentPad + heading, this);
    }
    l(...args) {
        return l(this, ...args);
    }
}
function l(...args) {
    let sec = lastSec;
    let firstArg;
    let firstArgModifed;
    args.forEach((arg) => {
        if (arg instanceof Section) {
            sec = arg;
        }
        if (!firstArg && arg.constructor.name === "String") {
            firstArg = args.shift();
        }
    });
    //removed Section from args
    args = args.filter((arg) => {
        return !(arg instanceof Section);
    });
    // let c = sec?.c || mode;
    let c = defaultMode;
    let indentPad = sec?.indentPad || "";
    if (!firstArg) {
        firstArg = "";
    }
    firstArgModifed = firstArg;
    firstArgModifed = indentPad + firstArg;
    //remove color formatting from first arg
    let totLen = firstArgModifed.length - firstArgModifed.replace(/\u001b\[.*?m/g, '').length - 2;
    console.log(firstArgModifed);
    //removed Section from args
    args.forEach((arg) => {
        console.log(arg);
    });
}
function logHeadingSection(c, heading, section) {
    let sec = new Section(heading, c, section);
    let time = new Date(Date.now()).toLocaleString();
    let path = "";
    if (section) {
        path = section.sectionName;
        while (section.parent) {
            section = section.parent;
            path = section.sectionName + " -> " + path;
        }
    }
    //add add heading to end of path and only add -> if path is not empty
    if (path.length > 0) {
        path += " -> ";
    }
    path += heading;
    //position the heading in the middle of the screen
    // console.log(c(heading.padStart((cwidth / 2) + (heading.length / 2), " ").padEnd(cwidth, " ")));
    console.groupCollapsed(c(path));
    sec.group++;
    return sec;
}
function lh1(heading, section = lastSec) {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgBlack.greenBright.bold;
    return logHeadingSection(c, heading, section);
}
function lh2(heading, section = lastSec) {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgGray.cyanBright.bold;
    return logHeadingSection(c, heading, section);
}
function lh3(heading, section = lastSec) {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgGray.magentaBright.bold;
    return logHeadingSection(c, heading, section);
}
const lh = lh1;
const imp = (text) => {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].red.bold.bgBlack;
    return c(text);
};
const inf = (text) => {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].blue.bold;
    return c(text);
};
const wrn = (text) => {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].yellow.bold;
    return c(text);
};
const err = (text) => {
    let er = (new Error());
    let lineNo = (0,_StackHelper__WEBPACK_IMPORTED_MODULE_0__.extractLineNumberFromStack)(er.stack);
    let caller = (0,_StackHelper__WEBPACK_IMPORTED_MODULE_0__.extractCallerFromStack)(er.stack);
    let preText = `[${caller}:${lineNo}]`;
    text = preText + " " + text;
    console.log(er);
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].red.bold;
    return c(text);
};
const suc = (text) => {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].green.bold;
    return c(text);
};
const hl = (text) => {
    return chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgBlue(text);
};
const hl1 = (text) => {
    return chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgMagenta(text);
};
const nv = (name, value) => {
    return chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgBlueBright(name.padEnd(30, " ")) + " : " + chalk__WEBPACK_IMPORTED_MODULE_1__["default"].cyanBright(value);
};
let exampleJSon = {
    "name": "test",
    "age": 10,
    "address": {
        "street": "123 Fake Street",
        "city": "London",
        "postcode": "SW1A 1AA"
    }
};
function runTest() {
    console.log("-- test --");
    let sec = lh1("Test Heading 1");
    l(imp("Auto Sec - This is something important"));
    l("Auto Sec - Line 1");
    l("Auto Sec - Line 2");
    l("Auto Sec - Line INFO: " + imp("This is something important"));
    l("Auto Sec - Line WITH ADDITINAL INFO: " + imp("This is something important") + " and this is some additional info");
    l("Auto Sec - Test 2:" + imp("An important value"));
    l("after auto sec Test 3:" + inf("An info value"));
    l("Test 4:" + wrn("An warn value"));
    l("Test 5:" + err("An error value"));
    l("Test 6:" + suc("An success value"));
    l("Test 7:" + hl("An highlight value"));
    l("Test 8:" + hl1("An highlight value"));
    l(nv("Name", "Value"));
    l(nv("Example Name", "http://www.example.com"));
    l(nv("Example Name", "http://www.example.com"));
    sec = sec.lh2("Heading 2");
    sec.l("Test");
    sec.l("Test 2:" + imp("An important value"));
    l("Test 3:" + inf("An info value"));
    l("Test 4:" + wrn("An warn value"));
    l("Test 5:" + err("An error value"));
    l("Test 6:" + suc("An success value"));
    l("Test 7:" + hl("An highlight value"));
    l("Test 8:" + hl1("An highlight value"));
    l(nv("Name", "Value"));
    l(nv("Example Name", "http://www.example.com"));
    l(nv("Example Name", "http://www.example.com"));
    sec = sec.lh3("Head 3");
    l("Test");
    l("Test 2:" + imp("An important value"));
    l("Test 3:" + inf("An info value"));
    l("Test 4:" + wrn("An warn value"));
    l("Test 5:" + err("An error value"));
    l("Test 6:" + suc("An success value"));
    l("Test 7:" + hl("An highlight value"));
    l("Test 8:" + hl1("An highlight value"));
    l(nv("Name", "Value"));
    l(nv("Example Name", "http://www.example.com"));
    l(nv("Example Name", "http://www.example.com"));
    clearSec();
    l("Test Clear Sec");
    l("Test 2:" + imp("An important value"));
    l("Test 3:" + inf("An info value"));
    l("Test 4:" + wrn("An warn value"));
    l("Test 5:" + err("An error value"));
    l("Test 6:" + suc("An success value"));
    l("Test 7:" + hl("An highlight value"));
    l("Test 8:" + hl1("An highlight value"));
    l(nv("Name", "Value"));
    l(nv("Example Name", "http://www.example.com"));
    l(nv("Example Name", "http://www.example.com"));
    l("Test JSON:", exampleJSon);
}
// runTest()
clearSec();
// export {colors};


/***/ }),

/***/ "./src/Common/StackHelper.ts":
/*!***********************************!*\
  !*** ./src/Common/StackHelper.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractCallerFromStack: () => (/* binding */ extractCallerFromStack),
/* harmony export */   extractLineNumberFromStack: () => (/* binding */ extractLineNumberFromStack)
/* harmony export */ });
function extractLineNumberFromStack(stack) {
    if (!stack)
        return null;
    // Extract lines from stack
    const stackLines = stack.split('\n');
    // Find the line with the error (usually the second line)
    const errorLine = stackLines[1] || '';
    // Extract line number from the error line using regex
    const match = errorLine.match(/:(\d+):(\d+)$/);
    return match ? parseInt(match[1]) : null;
}
function extractCallerFromStack(stack) {
    if (!stack)
        return null;
    // Extract lines from stack
    const stackLines = stack.split('\n');
    // Find the line with the caller function (usually the third line)
    const callerLine = stackLines[2] || '';
    // Extract caller function name using regex
    const match = callerLine.match(/at ([\w.<>]+)/);
    return match ? match[1] : null;
}


/***/ }),

/***/ "./src/WebBased/Common/EventsHelper.ts":
/*!*********************************************!*\
  !*** ./src/WebBased/Common/EventsHelper.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fireEvent: () => (/* binding */ fireEvent)
/* harmony export */ });
function fireEvent(event) {
    $ui.events.broadcast(event.eventPath, event);
}


/***/ }),

/***/ "./src/WebBased/Common/ObjectHelper.ts":
/*!*********************************************!*\
  !*** ./src/WebBased/Common/ObjectHelper.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flattenObject: () => (/* binding */ flattenObject),
/* harmony export */   getNestedProperty: () => (/* binding */ getNestedProperty),
/* harmony export */   setAllFieldsToNull: () => (/* binding */ setAllFieldsToNull),
/* harmony export */   setNestedProperty: () => (/* binding */ setNestedProperty),
/* harmony export */   strToClass: () => (/* binding */ strToClass)
/* harmony export */ });
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/Log */ "./src/Common/Log.ts");

function strToClass(className, base) {
    const classParts = className.split('.');
    let classReference = base;
    for (const part of classParts) {
        if (!classReference[part]) {
            return undefined;
        }
        classReference = classReference[part];
    }
    ;
    return classReference;
}
function setAllFieldsToNull(model) {
    let keys = Object.keys(model);
    keys.forEach((key) => {
        model[key] = null;
    });
}
function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i))
            continue;
        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x))
                    continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        }
        else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}
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
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.inf)(`getNestedProperty(${propertyPath})`), obj);
    const properties = propertyPath.split('.');
    let current = obj;
    for (const prop of properties) {
        // Check if the property has an array index, e.g., "data[0]"
        const matches = prop.match(/^([a-zA-Z0-9_]+)\[([0-9]+)\]$/);
        if (matches) {
            const arrayProp = matches[1];
            const index = parseInt(matches[2], 10);
            if (!Array.isArray(current[arrayProp]) || current[arrayProp][index] === undefined) {
                (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)(`getNestedProperty(${propertyPath}): arrayProp or index is undefined`), obj);
                return undefined;
            }
            current = current[arrayProp][index];
        }
        else if (current[prop] === undefined) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)(`getNestedProperty(${propertyPath}): prop is undefined`), obj);
            return undefined;
        }
        else {
            current = current[prop];
        }
    }
    return current;
}


/***/ }),

/***/ "./src/WebBased/Common/api/api.ts":
/*!****************************************!*\
  !*** ./src/WebBased/Common/api/api.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeDelete: () => (/* binding */ executeDelete),
/* harmony export */   executeFetch: () => (/* binding */ executeFetch),
/* harmony export */   executeGet: () => (/* binding */ executeGet),
/* harmony export */   executeGetv2: () => (/* binding */ executeGetv2),
/* harmony export */   executePost: () => (/* binding */ executePost),
/* harmony export */   executePut: () => (/* binding */ executePut),
/* harmony export */   getBearerToken: () => (/* binding */ getBearerToken),
/* harmony export */   getCookies: () => (/* binding */ getCookies)
/* harmony export */ });
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Common/Log */ "./src/Common/Log.ts");
/**
 * This file contains the api calls to the backend.
 * utilising the axios library to make the calls.
 * inclusing of webpackIgnore is to allow the webpack to ignore the calls and not try to bundle them.
 */

async function executePost(api, postBody) {
    //return await $ajax.post(/* webpackIgnore: true */ validateApi(api), postBody);
    return (await executeFetch(api, "POST", postBody)).data;
}
// export async function executeGet<T>(api: string) : Promise<T>{
//     return await $ajax.get(/* webpackIgnore: true */ validateApi(api));
// } 
async function executeGet(api) {
    return (await executeFetch(api, "GET", undefined)).data;
}
async function executeGetv2(api) {
    return executeFetch(api, "GET", undefined);
}
async function executePut(api, postBody) {
    //return await $ajax.put(/* webpackIgnore: true */ validateApi(api), postBody);
    return (await executeFetch(api, "PUT", postBody)).data;
}
async function executeDelete(api) {
    //return await $ajax.delete(/* webpackIgnore: true */ validateApi(api));
    return (await executeFetch(api, "DELETE", undefined)).data;
}
function validateApi(api) {
    let location = window.document.location.origin;
    //if api does not include the location then add it.
    if (api.indexOf(location) === -1) {
        //check if api start with a / if not add it.
        if (api.indexOf("/") !== 0) {
            api = "/" + api;
        }
        api = location + api;
    }
    return api;
}
async function executeFetch(api, method, data) {
    let retValue = {
        data: undefined,
        response: undefined,
        info: {
            success: false,
            error: []
        }
    };
    //to get new token TODO: check if fail then call
    // await $ajax.get("https://hsf-vnext.sharedo.co.uk/security/refreshTokens?_=" + Date.now);
    let url = validateApi(api);
    let fetchHeaders = buildHeaders();
    let response = await fetch(url, {
        method: method,
        headers: fetchHeaders,
        body: data ? JSON.stringify(data) : undefined
    }).then(async (response) => {
        retValue.response = response;
        if (response.ok === false) {
            retValue.info.error.push({
                code: "API_ERROR",
                message: `An error occured while trying to call the API. statusText: ${response.statusText}`,
                userMessage: "An error occured while trying to call the API."
            });
        }
        let data;
        //check if response is JSON
        try {
            if (response.headers.get("content-type")?.includes("application/json")) {
                data = await response.json();
            }
            else {
                data = await response.text();
            }
            retValue.info.success = true;
        }
        catch (e) {
            retValue.info.error.push({
                code: "API_ERROR",
                message: `An error occured while trying to extract the data from the API. Message: ${e?.message || "Unknown"}`,
                userMessage: `An error occured while trying to extract the data from the API.`
            });
        }
        return { data, response };
    }).catch((error) => {
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)(`Error from API Call ${url}`), error);
        retValue.info.error.push({
            code: "API_ERROR",
            message: error.message,
            userMessage: error.message
        });
        return { data: undefined, response: undefined };
    });
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.lh1)(`Response from ${url}`);
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)(response);
    retValue.data = response.data;
    if (retValue.info.error.length > 0) {
        retValue.info.success = false;
        retValue.info.error.forEach(e => {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)(`Error from API Call ${url}`), e);
        });
    }
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.secBackOne)();
    return retValue;
}
function buildHeaders() {
    let bearer = getBearerToken();
    let fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    if (bearer) {
        fetchHeaders.append("Authorization", bearer);
    }
    return fetchHeaders;
}
function getCookies() {
    let retValue = {};
    let cookies = document.cookie.split(";").reduce(function (cookies, cookie) {
        var parts = cookie.split("=");
        if (parts.length === 2) {
            var key = parts[0].trim();
            var value = parts[1];
            retValue[key] = value;
        }
        return cookies;
    }, {});
    return retValue;
}
;
function getBearerToken() {
    var cookies = getCookies();
    var token = cookies["_api"];
    if (token)
        return "Bearer " + token;
    return null;
}
;


/***/ }),

/***/ "./src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts":
/*!*******************************************************************!*\
  !*** ./src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeFindByQuery: () => (/* binding */ executeFindByQuery)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ "./src/WebBased/Common/api/api.ts");

function executeFindByQuery(inputOption) {
    return (0,_api__WEBPACK_IMPORTED_MODULE_0__.executePost)("/api/v1/public/workItem/findByQuery", inputOption).then((result) => {
        return result;
    });
}


/***/ }),

/***/ "./src/WebBased/Common/api/searchForAttributeWithParents.ts":
/*!******************************************************************!*\
  !*** ./src/WebBased/Common/api/searchForAttributeWithParents.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   searchForAttribute: () => (/* binding */ searchForAttribute),
/* harmony export */   searchForAttributeRecursive: () => (/* binding */ searchForAttributeRecursive)
/* harmony export */ });
/* harmony import */ var _executeFindByQuery_FindByQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./executeFindByQuery/FindByQuery */ "./src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts");

async function searchForAttributeRecursive(workItemId, attributeName, parents, maxDepth) {
    let useMaxDepth = maxDepth ? true : false;
    if (maxDepth && maxDepth > 0) {
        useMaxDepth = true;
    }
    let retValue = { found: false, value: undefined, parentId: undefined, depth: 0, foundInWorkItemId: undefined, wasFoundInAncestor: false, foundInWorkTypeSystemName: undefined };
    retValue = await searchForAttribute(workItemId, attributeName);
    if (retValue.found) {
        return retValue;
    }
    if (!parents) {
        console.log("No parents or children to search so only searching current work item");
        return retValue;
    }
    if (parents) {
        console.log("Searching parents");
        let depth = 0;
        let searchParent = async (parentId) => {
            depth++;
            let r = { found: false,
                value: undefined,
                parentId: undefined, depth: depth,
                foundInWorkItemId: undefined,
                wasFoundInAncestor: false,
                foundInWorkTypeSystemName: undefined
            };
            if (!parentId) {
                console.log("No parent found");
                return r;
            }
            r = await searchForAttribute(parentId, attributeName);
            r.depth = depth; //update depth as it will be 0
            if (r.found) {
                console.log("Found attribute in parent");
                r.wasFoundInAncestor = true;
                return r;
            }
            else {
                if (useMaxDepth && depth >= maxDepth) {
                    console.log("Max depth reached");
                    return r;
                }
                if (!r.parentId) {
                    console.log("No parent found");
                    return r;
                }
                console.log("Not found in parent");
                return searchParent(r.parentId);
            }
        };
        retValue = await searchParent(retValue.parentId);
    }
    return retValue;
}
async function searchForAttribute(workItemId, attributeName) {
    //get the matter
    let retValue = {
        found: false, value: undefined,
        parentId: undefined, depth: 0,
        foundInWorkItemId: undefined,
        wasFoundInAncestor: false,
        foundInWorkTypeSystemName: undefined
    };
    let req = {
        "search": {
            "workItemIds": [
                workItemId
            ]
        },
        "enrich": [
            {
                "path": "title"
            },
            {
                "path": "parent.id"
            },
            {
                "path": "type.systemName"
            },
            {
                "path": "reference"
            },
            {
                "path": attributeName
            }
        ]
    };
    console.log("Searching using ShareDo Id: " + workItemId);
    let httpResultFindByQuery = await (0,_executeFindByQuery_FindByQuery__WEBPACK_IMPORTED_MODULE_0__.executeFindByQuery)(req);
    console.log(`Work item ${workItemId} found`);
    console.log(JSON.stringify(httpResultFindByQuery.results));
    let typeSystemName = httpResultFindByQuery.results[0].data["type.systemName"];
    let parentId = httpResultFindByQuery.results[0].data["parent.id"];
    let attribute = httpResultFindByQuery.results[0].data[attributeName];
    console.log(`Type system name is ${typeSystemName}`);
    console.log(`Parent Id is ${parentId}`);
    console.log(`Attribute [${attributeName}] is ${attribute}`);
    retValue.value = attribute;
    if (attribute) {
        retValue.found = true;
        retValue.foundInWorkItemId = workItemId;
        retValue.foundInWorkTypeSystemName = typeSystemName;
    }
    retValue.parentId = parentId;
    return retValue;
}


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
/* harmony export */   ERROR_DIV_SELECTOR: () => (/* binding */ ERROR_DIV_SELECTOR),
/* harmony export */   FOMR_BUILDER_PATH_STRING: () => (/* binding */ FOMR_BUILDER_PATH_STRING),
/* harmony export */   getFormBuilderFieldPath: () => (/* binding */ getFormBuilderFieldPath)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/EventsHelper */ "./src/WebBased/Common/EventsHelper.ts");
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Common/Log */ "./src/Common/Log.ts");
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Common/ObjectHelper */ "./src/WebBased/Common/ObjectHelper.ts");
/* harmony import */ var _Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Common/HtmlHelper */ "./src/Common/HtmlHelper.ts");
/* harmony import */ var _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Common/JsonToHTMLConverter */ "./src/Common/JsonToHTMLConverter.ts");
/* harmony import */ var _Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Common/api/searchForAttributeWithParents */ "./src/WebBased/Common/api/searchForAttributeWithParents.ts");









console.log("v: - 5.27");
const FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
const ERROR_DIV_SELECTOR = "#render-errors-here";
// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }
function getFormBuilderFieldPath(formBuilderField) {
    return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}
class BaseIDEAspect {
    constructor(...arr) {
        this.widgetSettings = this.setWidgetJsonSettings();
        this.thisComponentName = this.setThisComponentName();
        this.defaults = this.setDefaults(); //setup the default by calling the abstract method in the child class
        this.errorDivSelector = ERROR_DIV_SELECTOR;
        this.errors = knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray();
        if (arr.length === 0) {
            //This is the base constructor
            return;
        }
        if (arr.length === 3) {
            //This is the constructor that is called by the IDE
            this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_8__["default"])();
            this._initialise(arr[0], arr[1], arr[2]);
            this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
            this.fireEvent("onSetup", this.model);
            this.setup();
            this.fireEvent("afterSetup", this.model);
            this.setupLiveConfig();
            this.setupErrorManager();
            this.addAspectLogOutput();
            return;
        }
    }
    _initialise(element, configuration, baseModel) {
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration;
        this.baseModel = baseModel;
        // this.originalConfiguration
        let baseDefaults = {
            debug: {
                enabled: false,
                logToConsole: false,
                showInAspect: false,
                liveConfig: false
            }
        };
        configuration.debug = $.extend(baseDefaults.debug, configuration.debug);
        // this.originalConfiguration.debug = $.extend(baseDefaults.debug, this.originalConfiguration.debug) as IDebug;
        // configuration.debug = $.extend(baseDefaults, configuration.debug) as IDebug;
        // this.configuration = $.extend(baseDefaults, this.originalConfiguration) as IBaseIDEAspectConfiguration<TConfig>;
        // this.data = undefined;
        // Merge the configuration with the defaults
        this.configuration = $.extend(this.defaults, this.originalConfiguration);
        //create a new model
        this.model = this.configuration._host.model;
        this.enabled = this.model.canEdit;
        this.blade = this.configuration._host.blade;
        this.loaded = this.loaded || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false);
        // Map the base model properties
        this.sharedoId = this.configuration._host?.model.id;
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName = this.configuration._host.model.sharedoTypeSystemName;
        if (!this.sharedoTypeSystemName || this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }
        this.options = (0,_KOConverter__WEBPACK_IMPORTED_MODULE_3__.toObservableObject)(this.configuration, this.options);
        // Validation
        this.validation = {};
        this.validationErrorCount = this.validationErrorCount || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0);
        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave(); //setup the location to load and save the data from by calling the abstract method in the child class
        this.fireEvent("onInitialise", this.model);
    }
    clearErrors() {
        this.errors?.removeAll();
    }
    setupErrorManager() {
        this.l("Setting up error manager");
        this.errors?.subscribe((newValue) => {
            this.inf("Errors changed", newValue);
            this.buildErrorDiv();
        });
    }
    setupLiveConfig() {
        this.options.debug.subscribe((newValue) => {
            if (newValue.liveConfig) {
                this.activateLiveConfig(newValue.liveConfig);
            }
        });
        this.activateLiveConfig(this.options.debug().liveConfig()); //TODO fix typings
    }
    activateLiveConfig(active) {
        if (!active) {
            this.liveConfigDiv?.remove();
            return;
        }
        if (this.liveConfigDiv) { //leave alone if already active
            return;
        }
        this.l("Setting up live config");
        const serializedData = JSON.stringify(this.configuration, (key, value) => {
            if (key === "_host") {
                return undefined;
            }
            return value;
        }, 4);
        //clone the config
        let config = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(serializedData);
        this.liveConfigData = {
            config: config,
        };
        let timeout = false;
        this.liveConfigDiv = this.createLiveConfigDiv();
        this.element.prepend(this.liveConfigDiv);
        setTimeout(() => {
            config.subscribe((newValue) => {
                // console.log("The new value is " + newValue)
                if (timeout) {
                    return;
                }
                setTimeout(() => {
                    timeout = false;
                    let newConfig = JSON.parse(config());
                    this._initialise(this.element, newConfig, this.baseModel);
                    this.reset(newConfig);
                }, 500);
                timeout = true;
            });
        }, 3000);
        // ko.applyBindings(this.liveConfigData, this.liveConfigDiv);x
        // }
    }
    ensureStylesLoaded(href) {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement('link');
            link.href = href;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            document.head.appendChild(link);
        }
    }
    createLiveConfigDiv() {
        // Create the outer <div> with class "col-sm-12 formbuilder-editor-json"
        const outerDiv = document.createElement('div');
        outerDiv.className = 'col-sm-12 formbuilder-editor-json';
        // Create the inner <div> with the specified attributes
        const innerDiv = document.createElement('div');
        innerDiv.id = 'liveConfig';
        innerDiv.className = 'form-control textarea';
        innerDiv.style.height = '300px';
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: liveConfigData.config, enable: true, event: { focusout: liveConfigData.onFocusOut }');
        innerDiv.setAttribute('data-bind', 'syntaxEditor: liveConfigData.config');
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: model.config');
        // Append the innerDiv to the outerDiv
        outerDiv.appendChild(innerDiv);
        return outerDiv;
    }
    async getData() {
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }
        let nestedData = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.getNestedProperty)(this.model, this.LocationToSaveOrLoadData);
        if (nestedData !== undefined) {
            this.log("Data found at location", "green", nestedData);
            let retValue = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(nestedData);
            this.log("Data found at location", "green", retValue);
            return retValue;
        }
        if (nestedData === undefined && this.options.dataSettings().getValueUsingParents === true) {
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__.searchForAttributeRecursive)(this.sharedoId, this.LocationToSaveOrLoadData, this.options.dataSettings().getValueUsingParents, this.options.dataSettings().maxDepth).then((data) => {
                if (data.found) {
                    return data.value;
                }
                return nestedData;
            });
        }
    }
    buildErrorDiv() {
        this.inf("Building error div");
        let errorDiv = this.element.querySelector(this.errorDivSelector);
        if (!errorDiv) {
            return;
        }
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)("errorDiv.innerHTML");
        errorDiv.innerHTML = ""; //clean out the div
        if (!this.errors) {
            this.errors = knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray();
        }
        if (this.errors().length === 0) {
            return;
        }
        let errorContainerDiv = document.createElement("div");
        errorDiv.appendChild(errorContainerDiv);
        errorContainerDiv.className = "ide-aspect-error-container";
        let titleDiv = document.createElement("div");
        titleDiv.className = "ide-aspect-error-title";
        titleDiv.innerText = "There has been an error:";
        errorContainerDiv.appendChild(titleDiv);
        let foreachDiv = document.createElement("div");
        errorContainerDiv.appendChild(foreachDiv);
        this.errors().forEach((error) => {
            let userMessageDiv = document.createElement("div");
            userMessageDiv.className = "ide-aspect-error-user-message";
            userMessageDiv.innerHTML = error.userMessage;
            userMessageDiv.onclick = () => {
                //create a div that can scoll
                let detailedMessageDiv = document.createElement("div");
                detailedMessageDiv.className = "ide-aspect-error-detailed-message";
                const code = (0,_Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(error.code || "");
                const message = (0,_Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(error.message || "");
                const userMessage = (0,_Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(error.userMessage || "");
                const errorStack = (0,_Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(error.errorStack || "");
                const additionalInfo = _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_6__.JsonToHtmlConverter.convert(error.additionalInfo || {});
                const html = `
                            <div>
                            <h2>Error: ${code}</h2>
                            <p><strong>Message:</strong> ${message}</p>
                            <p><strong>User Message:</strong> ${userMessage}</p>
                            <p><strong>Stack:</strong> ${errorStack}</p>
                            <p><strong>Additional Info:</strong> ${additionalInfo}</p>
                            </div>`;
                detailedMessageDiv.innerHTML = html;
                $ui.errorDialog(detailedMessageDiv);
            };
            foreachDiv.appendChild(userMessageDiv);
            if (error.suggestions && error.suggestions.length > 0) {
                let suggestionsDiv = document.createElement("div");
                suggestionsDiv.className = "ide-aspect-error-suggestions";
                suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${error.suggestions.join("<br/>")}`;
                foreachDiv.appendChild(suggestionsDiv);
            }
            if (error.actions && error.actions.length > 0) {
                let actionsDiv = document.createElement("div");
                actionsDiv.className = "ide-aspect-error-actions";
                actionsDiv.innerHTML = `<b>Actions:</b><br/>${error.actions.join("<br/>")}`;
                foreachDiv.appendChild(actionsDiv);
            }
            if (error.internalSuggestions && error.internalSuggestions.length > 0) {
                let internalSuggestionsDiv = document.createElement("div");
                internalSuggestionsDiv.className = "ide-aspect-error-internal-suggestions";
                internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${error.internalSuggestions.join("<br/>")}`;
                foreachDiv.appendChild(internalSuggestionsDiv);
            }
        });
        if (this.options.debug().supportRequestEnabled) {
            let actionDiv = document.createElement("div");
            actionDiv.className = "ide-aspect-error-support-action";
            errorContainerDiv.appendChild(actionDiv);
            let button = document.createElement("button");
            button.className = "btn btn-primary";
            // button.setAttribute("data-bind","click:createSupportTask,visible:options.debug..supportRequestEnabled");
            button.innerText = "Create Support Task";
            actionDiv.appendChild(button);
        }
    }
    setData(value) {
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
        (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.setNestedProperty)(this.model, this.LocationToSaveOrLoadData, valueToSet);
        this.fireEvent("onDataChanged", this.model);
    }
    // abstract setDependantScriptFiles(): string[];
    // abstract setDependantStyleFiles(): string[];
    // abstract setDependantTemplateFiles(): string[];
    // abstract setDependantMenuTemplateFiles(): string[];
    // abstract setDependantComponentFiles(): string[];
    // abstract setWidgetDesignerSettings(): IWidgetJsonDesigner;
    // abstract setPriority() : number;
    /**
     * Called by the aspect IDE adapter when the model is saved. Manipulate the
     * model as required.
     */
    async onSave(model) {
        this.fireEvent("onSave", model);
        let dataToSave = await this.getData();
        this.log("Saving, model passed in we need to persist to", "green", dataToSave);
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to save data to set - this method should be overriden", "red");
            return;
        }
        let dataToPersist = await this.getData();
        let currentData = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.getNestedProperty)(model, this.LocationToSaveOrLoadData);
        if (currentData) {
            this.log(`Current data at location ${this.LocationToSaveOrLoadData} :`, "magenta", currentData);
        }
        if (!currentData) {
            // this.log("Data does not exist, we will create", "orange");
            //  setNestedProperty(model, this.LocationToSaveOrLoadData, {});
            // currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        }
        this.log(`New data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
        (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.setNestedProperty)(model, this.LocationToSaveOrLoadData, dataToPersist);
    }
    ;
    onDestroy(model) {
        this.log("IDEAspects.Example : onDestroy");
        this.fireEvent("onDestroy", model);
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
        this.fireEvent("onLoad", this.model);
    }
    ;
    /**
     * Called by the aspect IDE adapter before the model is saved
     */
    onBeforeSave(model) {
        this.log("IDEAspects.Example : onBeforeSave");
        this.fireEvent("onBeforeSave", model);
    }
    /**
     * Called by the aspect IDE adapter after the model has been saved.
     */
    onAfterSave(model) {
        this.log("IDEAspects.Example : onAfterSave");
        this.fireEvent("onAfterSave", model);
    }
    /**
     * Called by the aspect IDE adapter when it reloads aspect data
     */
    onReload(model) {
        this.log("IDEAspects.Example : onReload");
        this.fireEvent("onReload", model);
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
    canLog() {
        return this.configuration.debug?.enabled;
    }
    logToConsole() {
        return this.canLog() && this.configuration.debug?.logToConsole;
    }
    logToAspect() {
        return this.canLog() && this.configuration.debug?.showInAspect;
    }
    inf(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.inf)(message), ...args);
        }
    }
    wrn(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.wrn)(message), ...args);
        }
    }
    err(message, ...args) {
        //get the previous caller
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.err)(message), ...args);
        }
    }
    nv(name, value) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.nv)(name, value));
        }
    }
    lh1(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.lh1)(message), ...args);
        }
    }
    clearSec() {
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.clearSec)();
    }
    l(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)(message, ...args);
        }
        if (this.logToAspect()) {
            let aspectLogOutput = this.aspectLogOutput;
            if (aspectLogOutput) {
                aspectLogOutput.innerText += `${message}\n`;
            }
        }
    }
    addAspectLogOutput() {
        if (!this.logToAspect()) {
            return;
        }
        ;
        this.aspectLogOutput = document.createElement("div");
        let aspectLogOutput = this.aspectLogOutput;
        aspectLogOutput.id = `aspectLogOutput-${this.uniqueId}`;
        aspectLogOutput.style.border = "1px solid black";
        aspectLogOutput.style.padding = "5px";
        aspectLogOutput.style.margin = "5px";
        aspectLogOutput.style.height = "200px";
        aspectLogOutput.style.overflow = "auto";
        aspectLogOutput.style.backgroundColor = "white";
        aspectLogOutput.style.color = "black";
        aspectLogOutput.style.fontSize = "10px";
        aspectLogOutput.style.fontFamily = "monospace";
        aspectLogOutput.style.whiteSpace = "pre-wrap";
        aspectLogOutput.style.wordWrap = "break-word";
        aspectLogOutput.style.display = "none";
        aspectLogOutput.style.position = "relative";
        aspectLogOutput.style.zIndex = "1000";
        aspectLogOutput.style.bottom = "0px";
        aspectLogOutput.style.left = "0px";
        aspectLogOutput.style.right = "0px";
        aspectLogOutput.style.marginLeft = "auto";
        aspectLogOutput.style.marginRight = "auto";
        aspectLogOutput.style.marginBottom = "auto";
        aspectLogOutput.style.marginTop = "auto";
        aspectLogOutput.style.backgroundColor = "rgba(255,255,255,0.8)";
        aspectLogOutput.style.borderRadius = "5px";
        aspectLogOutput.style.padding = "5px";
        aspectLogOutput.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.75)";
        this.element.prepend(aspectLogOutput);
    }
    fireEvent(eventName, data) {
        let event = {
            eventPath: this.thisComponentName + "." + eventName,
            eventName: eventName,
            source: this,
            data: data
        };
        (0,_Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__.fireEvent)(event);
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
        return this.ensureFormbuilder(this.blade.model);
        // return this.blade!.model!.aspectData!.formBuilder!.formData;
    }
    /**
     * Ensures there is a form builder in the passed in model and returns it
     * @param model
     * @returns
     */
    ensureFormbuilder(model) {
        if (!model?.aspectData?.formBuilder?.formData) {
            this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
        }
        else {
            this.log("blade.model.aspectData.formBuilder.formData found", "green");
        }
        //Ensure the path exists
        model = model || {};
        model.aspectData = model.aspectData || {};
        model.aspectData.formBuilder = model.aspectData.formBuilder || { formData: {} };
        return model.aspectData.formBuilder.formData;
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
// class MyClass {
//     public constructor();
//     public constructor(p1: number);
//     public constructor(p1: string, p2: string);
//     public constructor(p1: string, p2: string, p3: string);
//     public constructor(...arr: any[]) {
//         if (arr.length === 2) {
//             console.log('two arguments constructor called.');
//         } else if (arr.length === 3) {
//             console.log('three arguments constructor called.');
//         } else if (arr.length === 1) {
//             console.log('one argument constructor called.');
//         }
//     }
// }
// let x = new MyClass()


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

function toObservableObject(obj, existing) {
    if (!existing)
        existing = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "__ko_mapping__" && key !== "_host") {
            const value = obj[key];
            if (Array.isArray(value)) {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray(value.map(item => toObservableObject(item, {})));
                }
                else {
                    existing[key](value.map(item => toObservableObject(item, {})));
                }
            }
            else if (value !== null && typeof value === 'object') {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(toObservableObject(value, {}));
                }
                else {
                    existing[key](toObservableObject(value, existing[key]()));
                }
            }
            else {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(value);
                }
                else {
                    existing[key](value);
                }
            }
        }
    }
    return existing;
}
// export type I_IDE_Aspect_Modeller_Configuration<TConfig> = TConfig & {
//     debug: IDebug;
//   }
// export type ObservableConfigurationOptions<TConfig> = 
// { [K in keyof IBaseIDEAspectConfiguration<TConfig>]: ko.Observable<IBaseIDEAspectConfiguration<TConfig>[K]>; }
// export interface IConfigurationHost {
//     _host: {
//         blade: Sharedo.Core.Case.Sharedo.AddEditSharedo;
//         enabled: ko.Observable<boolean>; // Using 'any' for return type as it's not clear what these functions return
//         model: Sharedo.Core.Case.Sharedo.Models.Sharedo;
//     }
// }
// export type IBaseIDEAspectConfiguration<TConfig> = IConfigurationHost & I_IDE_Aspect_Modeller_Configuration<TConfig>;
// interface RootObject {
//   l1: string;
//   o1: O1;
// }
// interface O1 {
//   l2: string;
//   o2: O2;
//   a1: A1[];
// }
// interface A1 {
//   l4: string;
// }
// interface O2 {
//   l3: string;
// }
// // Now let's use the function:
// const x: I_IDE_Aspect_Modeller_Configuration<RootObject> = {
//     l1: "l1",
//     o1: {
//         l2:"l2",
//         o2: {
//             l3: "l3",
//         },
//         a1: [
//             { l4: "l4" }
//         ]
//     },
//     debug:
//     {
//         enabled: false,
//         logToConsole: false,
//         showInAspect: false
//     }
// }
// let m :  NestedObservableObject<I_IDE_Aspect_Modeller_Configuration<RootObject>>
// let y = toObservableObject(x,{} as any) as  NestedObservableObject<I_IDE_Aspect_Modeller_Configuration<RootObject>>
// let p = y.debug().liveConfig!()
// export function toObservableObject(obj: any, existingObservables?:ko.Observable<any>): ko.Observable {
//     const result = existingObservables || {} as ko.Observable;
//     for (const key in obj) {
//         if(key === "__ko_mapping__") continue;
//         if(key === "_host") continue;
//         if (Object.prototype.hasOwnProperty.call(obj, key)) {
//             let newv = obj[key];
//             let curr = (result as any)[key] ;
//             if (!Array.isArray(newv) && typeof newv === "object" && newv !== null && !ko.isObservable(newv)) {
//                 (result as any)[key] = toObservableObject(newv as object) 
//                 console.log("toObservableObject", (result as any)[key]);
//                 (result as any)[key] = ko.observable((result as any)[key]);
//                 continue;
//             }
//             if (Array.isArray(newv)) {
//                 if (curr && ko.isObservableArray(curr)) {
//                     (result as any)[key](newv);
//                 } else {
//                     (result as any)[key] = ko.observableArray(newv) as any;
//                 }
//                 continue;
//             }
//             if (ko.isObservable(newv)) {
//                 newv = newv(); // pull out the value
//             }
//             if (curr && ko.isObservable(curr)) {
//                 (result as any)[key](newv); // update the existing observable
//             } else {
//                 (result as any)[key] = ko.observable(newv);
//             }
//         }
//     }
//     return result;
// }


/***/ }),

/***/ "./src/WebBased/IDEAspects/DatePickerAspect/DatePickerAspectConfiguration.ts":
/*!***********************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/DatePickerAspect/DatePickerAspectConfiguration.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setting: () => (/* binding */ setting)
/* harmony export */ });
const setting = {
    type: 'widget',
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": false,
        "allowInSharedoPortalDesigner": false,
        "allowAspectAdapter": true,
        "title": "Date Picker Aspect",
        "icon": "fa-cog",
        "description": "Date Picker Aspect",
        "categories": [],
        "isConfigurable": true,
        "configurationWidget": null,
        "defaultConfigurationJson": {
            "formBuilderField": "eDiscoveryUpdatePlannedDate",
            "defaultValue": {
                "defaultDateFromNowHours": 24,
                "getValueUsingParents": true,
                "maxDepth": 0,
            },
            "title": "Updated planned due date:",
            "pickerEnabled": true,
            "eventToFireOnUpdate": ["IDEAspects.DatePickerAspect.Update"],
            "datePickerOptions": {
                "display": {
                    "inline": true,
                    "sideBySide": true,
                    "theme": "light"
                }
            },
            "debug": {
                "enabled": true,
                "logToConsole": true,
                "showInAspect": true
            },
            "eventsToReactTo": [],
            "dataSettings": {
                "getValueUsingParents": false,
                "maxDepth": 0,
            }
        }
    },
    "scripts": [],
    "styles": [
        "DatePickerAspect.css"
    ],
    "templates": [
        "DatePickerAspect.html"
    ],
    "menuTemplates": [],
    "components": []
};


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

/***/ }),

/***/ "./node_modules/chalk/source/index.js":
/*!********************************************!*\
  !*** ./node_modules/chalk/source/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Chalk: () => (/* binding */ Chalk),
/* harmony export */   backgroundColorNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.backgroundColorNames),
/* harmony export */   backgroundColors: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.backgroundColorNames),
/* harmony export */   chalkStderr: () => (/* binding */ chalkStderr),
/* harmony export */   colorNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.colorNames),
/* harmony export */   colors: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.colorNames),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   foregroundColorNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.foregroundColorNames),
/* harmony export */   foregroundColors: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.foregroundColorNames),
/* harmony export */   modifierNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.modifierNames),
/* harmony export */   modifiers: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.modifierNames),
/* harmony export */   supportsColor: () => (/* binding */ stdoutColor),
/* harmony export */   supportsColorStderr: () => (/* binding */ stderrColor)
/* harmony export */ });
/* harmony import */ var _ansi_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor/ansi-styles/index.js */ "./node_modules/chalk/source/vendor/ansi-styles/index.js");
/* harmony import */ var _supports_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #supports-color */ "./node_modules/chalk/source/vendor/supports-color/browser.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities.js */ "./node_modules/chalk/source/utilities.js");




const {stdout: stdoutColor, stderr: stderrColor} = _supports_color__WEBPACK_IMPORTED_MODULE_0__["default"];

const GENERATOR = Symbol('GENERATOR');
const STYLER = Symbol('STYLER');
const IS_EMPTY = Symbol('IS_EMPTY');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m',
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

class Chalk {
	constructor(options) {
		// eslint-disable-next-line no-constructor-return
		return chalkFactory(options);
	}
}

const chalkFactory = options => {
	const chalk = (...strings) => strings.join(' ');
	applyOptions(chalk, options);

	Object.setPrototypeOf(chalk, createChalk.prototype);

	return chalk;
};

function createChalk(options) {
	return chalkFactory(options);
}

Object.setPrototypeOf(createChalk.prototype, Function.prototype);

for (const [styleName, style] of Object.entries(_ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"])) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		},
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this[STYLER], true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	},
};

const getModelAnsi = (model, level, type, ...arguments_) => {
	if (model === 'rgb') {
		if (level === 'ansi16m') {
			return _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"][type].ansi16m(...arguments_);
		}

		if (level === 'ansi256') {
			return _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"][type].ansi256(_ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].rgbToAnsi256(...arguments_));
		}

		return _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"][type].ansi(_ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].rgbToAnsi(...arguments_));
	}

	if (model === 'hex') {
		return getModelAnsi('rgb', level, type, ..._ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].hexToRgb(...arguments_));
	}

	return _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"][type][model](...arguments_);
};

const usedModels = ['rgb', 'hex', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(getModelAnsi(model, levelMapping[level], 'color', ...arguments_), _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].color.close, this[STYLER]);
				return createBuilder(this, styler, this[IS_EMPTY]);
			};
		},
	};

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(getModelAnsi(model, levelMapping[level], 'bgColor', ...arguments_), _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].bgColor.close, this[STYLER]);
				return createBuilder(this, styler, this[IS_EMPTY]);
			};
		},
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this[GENERATOR].level;
		},
		set(level) {
			this[GENERATOR].level = level;
		},
	},
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent,
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	// Single argument is hot path, implicit coercion is faster than anything
	// eslint-disable-next-line no-implicit-coercion
	const builder = (...arguments_) => applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));

	// We alter the prototype because we must return a function, but there is
	// no way to create a function with a different prototype
	Object.setPrototypeOf(builder, proto);

	builder[GENERATOR] = self;
	builder[STYLER] = _styler;
	builder[IS_EMPTY] = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self[IS_EMPTY] ? '' : string;
	}

	let styler = self[STYLER];

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.includes('\u001B')) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_2__.stringReplaceAll)(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_2__.stringEncaseCRLFWithFirstIndex)(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

Object.defineProperties(createChalk.prototype, styles);

const chalk = createChalk();
const chalkStderr = createChalk({level: stderrColor ? stderrColor.level : 0});





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chalk);


/***/ }),

/***/ "./node_modules/chalk/source/utilities.js":
/*!************************************************!*\
  !*** ./node_modules/chalk/source/utilities.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stringEncaseCRLFWithFirstIndex: () => (/* binding */ stringEncaseCRLFWithFirstIndex),
/* harmony export */   stringReplaceAll: () => (/* binding */ stringReplaceAll)
/* harmony export */ });
// TODO: When targeting Node.js 16, use `String.prototype.replaceAll`.
function stringReplaceAll(string, substring, replacer) {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.slice(endIndex, index) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.slice(endIndex);
	return returnValue;
}

function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.slice(endIndex, (gotCR ? index - 1 : index)) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.slice(endIndex);
	return returnValue;
}


/***/ }),

/***/ "./node_modules/chalk/source/vendor/ansi-styles/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/chalk/source/vendor/ansi-styles/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   backgroundColorNames: () => (/* binding */ backgroundColorNames),
/* harmony export */   colorNames: () => (/* binding */ colorNames),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   foregroundColorNames: () => (/* binding */ foregroundColorNames),
/* harmony export */   modifierNames: () => (/* binding */ modifierNames)
/* harmony export */ });
const ANSI_BACKGROUND_OFFSET = 10;

const wrapAnsi16 = (offset = 0) => code => `\u001B[${code + offset}m`;

const wrapAnsi256 = (offset = 0) => code => `\u001B[${38 + offset};5;${code}m`;

const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\u001B[${38 + offset};2;${red};${green};${blue}m`;

const styles = {
	modifier: {
		reset: [0, 0],
		// 21 isn't widely supported and 22 does the same thing
		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		overline: [53, 55],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29],
	},
	color: {
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],

		// Bright color
		blackBright: [90, 39],
		gray: [90, 39], // Alias of `blackBright`
		grey: [90, 39], // Alias of `blackBright`
		redBright: [91, 39],
		greenBright: [92, 39],
		yellowBright: [93, 39],
		blueBright: [94, 39],
		magentaBright: [95, 39],
		cyanBright: [96, 39],
		whiteBright: [97, 39],
	},
	bgColor: {
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],

		// Bright color
		bgBlackBright: [100, 49],
		bgGray: [100, 49], // Alias of `bgBlackBright`
		bgGrey: [100, 49], // Alias of `bgBlackBright`
		bgRedBright: [101, 49],
		bgGreenBright: [102, 49],
		bgYellowBright: [103, 49],
		bgBlueBright: [104, 49],
		bgMagentaBright: [105, 49],
		bgCyanBright: [106, 49],
		bgWhiteBright: [107, 49],
	},
};

const modifierNames = Object.keys(styles.modifier);
const foregroundColorNames = Object.keys(styles.color);
const backgroundColorNames = Object.keys(styles.bgColor);
const colorNames = [...foregroundColorNames, ...backgroundColorNames];

function assembleStyles() {
	const codes = new Map();

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`,
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false,
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false,
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = wrapAnsi16();
	styles.color.ansi256 = wrapAnsi256();
	styles.color.ansi16m = wrapAnsi16m();
	styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
	styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
	styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);

	// From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js
	Object.defineProperties(styles, {
		rgbToAnsi256: {
			value(red, green, blue) {
				// We use the extended greyscale palette here, with the exception of
				// black and white. normal palette only has 4 greyscale shades.
				if (red === green && green === blue) {
					if (red < 8) {
						return 16;
					}

					if (red > 248) {
						return 231;
					}

					return Math.round(((red - 8) / 247) * 24) + 232;
				}

				return 16
					+ (36 * Math.round(red / 255 * 5))
					+ (6 * Math.round(green / 255 * 5))
					+ Math.round(blue / 255 * 5);
			},
			enumerable: false,
		},
		hexToRgb: {
			value(hex) {
				const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
				if (!matches) {
					return [0, 0, 0];
				}

				let [colorString] = matches;

				if (colorString.length === 3) {
					colorString = [...colorString].map(character => character + character).join('');
				}

				const integer = Number.parseInt(colorString, 16);

				return [
					/* eslint-disable no-bitwise */
					(integer >> 16) & 0xFF,
					(integer >> 8) & 0xFF,
					integer & 0xFF,
					/* eslint-enable no-bitwise */
				];
			},
			enumerable: false,
		},
		hexToAnsi256: {
			value: hex => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
			enumerable: false,
		},
		ansi256ToAnsi: {
			value(code) {
				if (code < 8) {
					return 30 + code;
				}

				if (code < 16) {
					return 90 + (code - 8);
				}

				let red;
				let green;
				let blue;

				if (code >= 232) {
					red = (((code - 232) * 10) + 8) / 255;
					green = red;
					blue = red;
				} else {
					code -= 16;

					const remainder = code % 36;

					red = Math.floor(code / 36) / 5;
					green = Math.floor(remainder / 6) / 5;
					blue = (remainder % 6) / 5;
				}

				const value = Math.max(red, green, blue) * 2;

				if (value === 0) {
					return 30;
				}

				// eslint-disable-next-line no-bitwise
				let result = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red));

				if (value === 2) {
					result += 60;
				}

				return result;
			},
			enumerable: false,
		},
		rgbToAnsi: {
			value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
			enumerable: false,
		},
		hexToAnsi: {
			value: hex => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
			enumerable: false,
		},
	});

	return styles;
}

const ansiStyles = assembleStyles();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ansiStyles);


/***/ }),

/***/ "./node_modules/chalk/source/vendor/supports-color/browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/chalk/source/vendor/supports-color/browser.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-env browser */

const level = (() => {
	if (navigator.userAgentData) {
		const brand = navigator.userAgentData.brands.find(({brand}) => brand === 'Chromium');
		if (brand && brand.version > 93) {
			return 3;
		}
	}

	if (/\b(Chrome|Chromium)\//.test(navigator.userAgent)) {
		return 1;
	}

	return 0;
})();

const colorSupport = level !== 0 && {
	level,
	hasBasic: true,
	has256: level >= 2,
	has16m: level >= 3,
};

const supportsColor = {
	stdout: colorSupport,
	stderr: colorSupport,
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (supportsColor);


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
/* harmony import */ var _DatePickerAspectConfiguration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DatePickerAspectConfiguration */ "./src/WebBased/IDEAspects/DatePickerAspect/DatePickerAspectConfiguration.ts");
/* harmony import */ var _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BaseClasses/BaseIDEAspect */ "./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts");

//https://getdatepicker.com/6/options/display.html


let thisWidgetSystemName = "DatePickerAspect";
//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css
class DatePickerAspect extends _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__.BaseIDEAspect {
    refresh(newConfig) {
        // throw new Error('Method not implemented.');
    }
    reset(newConfig) {
        // throw new Error('Method not implemented.');
    }
    // constructor(element: HTMLElement, configuration: IDatePickerAspectOptions, baseModel: any) {
    //     super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel)
    // }
    //Abstract methods - must be implemented by the derived class
    setThisComponentName() {
        return "DatePickerAspect";
    }
    setup() {
        document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`);
    }
    setWidgetJsonSettings() {
        return _DatePickerAspectConfiguration__WEBPACK_IMPORTED_MODULE_1__.setting;
    }
    setDefaults() {
        return {
            // Aspect widget config parameters
            title: undefined,
            formBuilderField: undefined,
            pickerEnabled: true,
            eventToFireOnUpdate: ["IDEAspects.DatePickerAspect.Update"],
            defaultValue: {
                defaultDateFromNowHours: 24,
                getValueUsingParents: true,
                maxDepth: 0,
            },
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
            },
            eventsToReactTo: [],
            dataSettings: {
                getValueUsingParents: false,
                maxDepth: 0,
            }
        };
    }
    //Abstract methods - must be implemented by the derived class
    setLocationOfDataToLoadAndSave() {
        if (!this.configuration.formBuilderField) {
            this.log("No formbuilder field set in configuration - check aspect configuration", "red");
            throw new Error("No formbuilder field set in configuration - check aspect configuration");
        }
        return (0,_BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__.getFormBuilderFieldPath)(this.configuration.formBuilderField);
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
    setModelDataAsDate(newValue) {
        this.setData(newValue?.toISOString() || undefined);
    }
    /**
     * Gets the data from form builder and converts to DateTime
     */
    async getModelDataAsDate() {
        let retValue;
        let foundValue = await this.getData();
        if (!foundValue) {
            foundValue = this.generateDefaultDate();
        }
        retValue = this.ensureDate(foundValue);
        this.setModelDataAsDate(retValue); //set the value to ensure it is valid
        return retValue;
    }
    /**
     * @returns get today date + defaultDateFromNowHours (if set in configuration)
     */
    generateDefaultDate() {
        let defaultDate = new _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime(_eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime.now());
        if (this.configuration.defaultValue?.defaultDateFromNowHours) {
            defaultDate.setHours(defaultDate.getHours() + this.configuration.defaultValue.defaultDateFromNowHours);
        }
        return defaultDate;
    }
    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    async loadAndBind() {
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
        this.dateTimePicker = new _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.TempusDominus(this.datePickerDiv, this.configuration.datePickerOptions || {});
        this.options.datePickerOptions.subscribe((newValue) => {
            this.loadAndBind();
        });
        this.setPickerEnabledState(this.options.pickerEnabled());
        //Set the value of the picker to the value in the model
        let dateToSet = await this.getModelDataAsDate();
        this.dateTimePicker.dates.setValue(dateToSet, this.dateTimePicker.dates.lastPickedIndex);
        this.dateTimePicker.subscribe("change.td", (e) => {
            this.log("Date Changed", "red", e);
            this.options.eventToFireOnUpdate()?.forEach((event) => {
                $ui.events.broadcast(event, {
                    source: this,
                    formbuilderField: this.formbuilderField,
                    value: this.getCurrentSelectedDate()
                }); //fire event and pass in the date
            });
            this.setModelDataAsDate(this.getCurrentSelectedDate());
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
    async onSave(model) {
        this.log("Save");
        this.setModelDataAsDate(this.getCurrentSelectedDate());
        super.onSave(model);
    }
}

})();

var __webpack_export_target__ = (IDEAspects = typeof IDEAspects === "undefined" ? {} : IDEAspects);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG1CQUFtQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMkNBQTJDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdDQUFnQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLG1DQUFtQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxQkFBcUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1DQUFtQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxhQUFhO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix3Q0FBd0M7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Ysd0NBQXdDO0FBQ3hIO0FBQ0EsbUNBQW1DO0FBQ25DLHdCQUF3Qix3QkFBd0I7QUFDaEQ7QUFDQSx5Q0FBeUMsSUFBSSxHQUFHLEVBQUUsSUFBSSxHQUFHO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQiw0QkFBNEIsT0FBTztBQUNuQyxrQkFBa0IsYUFBYTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwwQkFBMEIsd0NBQXdDO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNELDRCQUE0Qix5Q0FBeUM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsS0FBSyxHQUFHLEVBQUU7QUFDMUM7QUFDQTtBQUNBLCtDQUErQyxXQUFXO0FBQzFEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsSUFBSTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELElBQUk7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxJQUFJO0FBQzlELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0dBQXNHLElBQUk7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsSUFBSTtBQUN4RDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQWdEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MseUJBQXlCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxnQkFBZ0I7QUFDekU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMkJBQTJCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQkFBa0I7QUFDM0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMkJBQTJCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQkFBa0I7QUFDM0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsb0JBQW9CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHlDQUF5QztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsc0NBQXNDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE1BQU07QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1Q0FBdUM7QUFDekU7QUFDQTtBQUNBLDZCQUE2QixVQUFVO0FBQ3ZDLDZCQUE2QixVQUFVO0FBQ3ZDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCw2QkFBNkI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZSxRQUFRLGdOQUF3QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw2QkFBNkIsYUFBYSw2QkFBNkIsTUFBTSw2QkFBNkIsYUFBYSw2QkFBNkI7QUFDdEw7QUFDQTtBQUNBLHFEQUFxRCx5QkFBeUI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsNkJBQTZCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsNkJBQTZCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDZCQUE2QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxrQkFBa0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsNEJBQTRCLEtBQUssNEJBQTRCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHVCQUF1QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsZUFBZTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZUFBZTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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ZW1wdXMtZG9taW51cy9kaXN0L2pzL3RlbXB1cy1kb21pbnVzLmVzbS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0NvbW1vbi9IdG1sSGVscGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvQ29tbW9uL0pzb25Ub0hUTUxDb252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9Db21tb24vTG9nLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvQ29tbW9uL1N0YWNrSGVscGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL0V2ZW50c0hlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9PYmplY3RIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL2FwaS50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvZXhlY3V0ZUZpbmRCeVF1ZXJ5L0ZpbmRCeVF1ZXJ5LnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9zZWFyY2hGb3JBdHRyaWJ1dGVXaXRoUGFyZW50cy50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvQmFzZUlERUFzcGVjdC50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvS09Db252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0RhdGVQaWNrZXJBc3BlY3QvRGF0ZVBpY2tlckFzcGVjdENvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy9leHRlcm5hbCB2YXIgXCJrb1wiIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL2luZGV4LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdmVuZG9yL3N1cHBvcnRzLWNvbG9yL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvRGF0ZVBpY2tlckFzcGVjdC9EYXRlUGlja2VyQXNwZWN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICAqIFRlbXB1cyBEb21pbnVzIHY2LjcuMTMgKGh0dHBzOi8vZ2V0ZGF0ZXBpY2tlci5jb20vKVxuICAqIENvcHlyaWdodCAyMDEzLTIwMjMgSm9uYXRoYW4gUGV0ZXJzb25cbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS9Fb25hc2Rhbi90ZW1wdXMtZG9taW51cy9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAqL1xuY2xhc3MgVGRFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cbmNsYXNzIEVycm9yTWVzc2FnZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJhc2UgPSAnVEQ6JztcbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8vI3JlZ2lvbiB1c2VkIHdpdGggbm90aWZ5LmVycm9yXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2VkIHdpdGggYW4gRXJyb3IgRXZlbnQgdHlwZSBpZiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZSB0aGF0XG4gICAgICAgICAqIGZhaWxzIHJlc3RyaWN0aW9uIHZhbGlkYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZhaWxlZFRvU2V0SW52YWxpZERhdGUgPSAnRmFpbGVkIHRvIHNldCBpbnZhbGlkIGRhdGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVXNlZCB3aXRoIGFuIEVycm9yIEV2ZW50IHR5cGUgd2hlbiBhIHVzZXIgY2hhbmdlcyB0aGUgdmFsdWUgb2YgdGhlXG4gICAgICAgICAqIGlucHV0IGZpZWxkIGRpcmVjdGx5LCBhbmQgZG9lcyBub3QgcHJvdmlkZSBhIHZhbGlkIGRhdGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZhaWxlZFRvUGFyc2VJbnB1dCA9ICdGYWlsZWQgcGFyc2UgaW5wdXQgZmllbGQnO1xuICAgICAgICAvLyNlbmRyZWdpb25cbiAgICB9XG4gICAgLy8jcmVnaW9uIG91dCB0byBjb25zb2xlXG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGluZGljYXRpbmcgdGhhdCBhIGtleSBpbiB0aGUgb3B0aW9ucyBvYmplY3QgaXMgaW52YWxpZC5cbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZVxuICAgICAqL1xuICAgIHVuZXhwZWN0ZWRPcHRpb24ob3B0aW9uTmFtZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gVW5leHBlY3RlZCBvcHRpb246ICR7b3B0aW9uTmFtZX0gZG9lcyBub3QgbWF0Y2ggYSBrbm93biBvcHRpb24uYCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSAxO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGluZGljYXRpbmcgdGhhdCBvbmUgbW9yZSBrZXlzIGluIHRoZSBvcHRpb25zIG9iamVjdCBpcyBpbnZhbGlkLlxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lXG4gICAgICovXG4gICAgdW5leHBlY3RlZE9wdGlvbnMob3B0aW9uTmFtZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX06ICR7b3B0aW9uTmFtZS5qb2luKCcsICcpfWApO1xuICAgICAgICBlcnJvci5jb2RlID0gMTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciB3aGVuIGFuIG9wdGlvbiBpcyBwcm92aWRlIGFuIHVuc3VwcG9ydGVkIHZhbHVlLlxuICAgICAqIEZvciBleGFtcGxlIGEgdmFsdWUgb2YgJ2NoZWVzZScgZm9yIHRvb2xiYXJQbGFjZW1lbnQgd2hpY2ggb25seSBzdXBwb3J0c1xuICAgICAqICd0b3AnLCAnYm90dG9tJywgJ2RlZmF1bHQnLlxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lXG4gICAgICogQHBhcmFtIGJhZFZhbHVlXG4gICAgICogQHBhcmFtIHZhbGlkT3B0aW9uc1xuICAgICAqL1xuICAgIHVuZXhwZWN0ZWRPcHRpb25WYWx1ZShvcHRpb25OYW1lLCBiYWRWYWx1ZSwgdmFsaWRPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBVbmV4cGVjdGVkIG9wdGlvbiB2YWx1ZTogJHtvcHRpb25OYW1lfSBkb2VzIG5vdCBhY2NlcHQgYSB2YWx1ZSBvZiBcIiR7YmFkVmFsdWV9XCIuIFZhbGlkIHZhbHVlcyBhcmU6ICR7dmFsaWRPcHRpb25zLmpvaW4oJywgJyl9YCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSAyO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIHdoZW4gYW4gb3B0aW9uIHZhbHVlIGlzIHRoZSB3cm9uZyB0eXBlLlxuICAgICAqIEZvciBleGFtcGxlIGEgc3RyaW5nIHZhbHVlIHdhcyBwcm92aWRlZCB0byBtdWx0aXBsZURhdGVzIHdoaWNoIG9ubHlcbiAgICAgKiBzdXBwb3J0cyB0cnVlIG9yIGZhbHNlLlxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lXG4gICAgICogQHBhcmFtIGJhZFR5cGVcbiAgICAgKiBAcGFyYW0gZXhwZWN0ZWRUeXBlXG4gICAgICovXG4gICAgdHlwZU1pc21hdGNoKG9wdGlvbk5hbWUsIGJhZFR5cGUsIGV4cGVjdGVkVHlwZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gTWlzbWF0Y2ggdHlwZXM6ICR7b3B0aW9uTmFtZX0gaGFzIGEgdHlwZSBvZiAke2JhZFR5cGV9IGluc3RlYWQgb2YgdGhlIHJlcXVpcmVkICR7ZXhwZWN0ZWRUeXBlfWApO1xuICAgICAgICBlcnJvci5jb2RlID0gMztcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciB3aGVuIGFuIG9wdGlvbiB2YWx1ZSBpcyAgb3V0c2lkZSBvZiB0aGUgZXhwZWN0ZWQgcmFuZ2UuXG4gICAgICogRm9yIGV4YW1wbGUgcmVzdHJpY3Rpb25zLmRheXNPZldlZWtEaXNhYmxlZCBleGNlcHRzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCA2LlxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lXG4gICAgICogQHBhcmFtIGxvd2VyXG4gICAgICogQHBhcmFtIHVwcGVyXG4gICAgICovXG4gICAgbnVtYmVyc091dE9mUmFuZ2Uob3B0aW9uTmFtZSwgbG93ZXIsIHVwcGVyKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSAke29wdGlvbk5hbWV9IGV4cGVjdGVkIGFuIGFycmF5IG9mIG51bWJlciBiZXR3ZWVuICR7bG93ZXJ9IGFuZCAke3VwcGVyfS5gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDQ7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3Igd2hlbiBhIHZhbHVlIGZvciBhIGRhdGUgb3B0aW9ucyBjb3VsZG4ndCBiZSBwYXJzZWQuIEVpdGhlclxuICAgICAqIHRoZSBvcHRpb24gd2FzIGFuIGludmFsaWQgc3RyaW5nIG9yIGFuIGludmFsaWQgRGF0ZSBvYmplY3QuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAqIEBwYXJhbSBzb2Z0IElmIHRydWUsIGxvZ3MgYSB3YXJuaW5nIGluc3RlYWQgb2YgYW4gZXJyb3IuXG4gICAgICovXG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGZhaWxlZFRvUGFyc2VEYXRlKG9wdGlvbk5hbWUsIGRhdGUsIHNvZnQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gQ291bGQgbm90IGNvcnJlY3RseSBwYXJzZSBcIiR7ZGF0ZX1cIiB0byBhIGRhdGUgZm9yICR7b3B0aW9uTmFtZX0uYCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSA1O1xuICAgICAgICBpZiAoIXNvZnQpXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIHdoZW4gYW4gZWxlbWVudCB0byBhdHRhY2ggdG8gd2FzIG5vdCBwcm92aWRlZCBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICovXG4gICAgbXVzdFByb3ZpZGVFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gTm8gZWxlbWVudCB3YXMgcHJvdmlkZWQuYCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSA2O1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIHByb3ZpZGluZyBhbiBhcnJheSBmb3IgdGhlIGV2ZW50cyB0byBzdWJzY3JpYmUgbWV0aG9kIGRvZXNuJ3QgaGF2ZVxuICAgICAqIHRoZSBzYW1lIG51bWJlciBvZiBjYWxsYmFja3MuIEUuZy4sIHN1YnNjcmliZShbMSwyXSwgWzFdKVxuICAgICAqL1xuICAgIHN1YnNjcmliZU1pc21hdGNoKCkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gVGhlIHN1YnNjcmliZWQgZXZlbnRzIGRvZXMgbm90IG1hdGNoIHRoZSBudW1iZXIgb2YgY2FsbGJhY2tzYCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSA3O1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGlmIHRoZSBjb25maWd1cmF0aW9uIGhhcyBjb25mbGljdGluZyBydWxlcyBlLmcuIG1pbkRhdGUgaXMgYWZ0ZXIgbWF4RGF0ZVxuICAgICAqL1xuICAgIGNvbmZsaWN0aW5nQ29uZmlndXJhdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBBIGNvbmZpZ3VyYXRpb24gdmFsdWUgY29uZmxpY3RzIHdpdGggYW5vdGhlciBydWxlLiAke21lc3NhZ2V9YCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSA4O1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY3VzdG9tRGF0ZUZvcm1hdCBlcnJvcnNcbiAgICAgKi9cbiAgICBjdXN0b21EYXRlRm9ybWF0RXJyb3IobWVzc2FnZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gQ3VzdG9tIERhdGUgRm9ybWF0OiAke21lc3NhZ2V9YCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSA5O1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9ncyBhIHdhcm5pbmcgaWYgYSBkYXRlIG9wdGlvbiB2YWx1ZSBpcyBwcm92aWRlZCBhcyBhIHN0cmluZywgaW5zdGVhZCBvZlxuICAgICAqIGEgZGF0ZS9kYXRldGltZSBvYmplY3QuXG4gICAgICovXG4gICAgZGF0ZVN0cmluZygpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGAke3RoaXMuYmFzZX0gVXNpbmcgYSBzdHJpbmcgZm9yIGRhdGUgb3B0aW9ucyBpcyBub3QgcmVjb21tZW5kZWQgdW5sZXNzIHlvdSBzcGVjaWZ5IGFuIElTTyBzdHJpbmcgb3IgdXNlIHRoZSBjdXN0b21EYXRlRm9ybWF0IHBsdWdpbi5gKTtcbiAgICB9XG4gICAgZGVwcmVjYXRlZFdhcm5pbmcobWVzc2FnZSwgcmVtZWRpYXRpb24pIHtcbiAgICAgICAgY29uc29sZS53YXJuKGAke3RoaXMuYmFzZX0gV2FybmluZyAke21lc3NhZ2V9IGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uLiAke3JlbWVkaWF0aW9ufWApO1xuICAgIH1cbiAgICB0aHJvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuLy8gdGhpcyBpcyBub3QgdGhlIHdheSBJIHdhbnQgdGhpcyB0byBzdGF5IGJ1dCBuZXN0ZWQgY2xhc3NlcyBzZWVtZWQgdG8gYmxvd24gdXAgb25jZSBpdHMgY29tcGlsZWQuXG5jb25zdCBOQU1FID0gJ3RlbXB1cy1kb21pbnVzJywgZGF0YUtleSA9ICd0ZCc7XG4vKipcbiAqIEV2ZW50c1xuICovXG5jbGFzcyBFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmtleSA9IGAuJHtkYXRhS2V5fWA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGFuZ2UgZXZlbnQuIEZpcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUuXG4gICAgICAgICAqIFNlZSBhbHNvIEV2ZW50VHlwZXMuQ2hhbmdlRXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2hhbmdlID0gYGNoYW5nZSR7dGhpcy5rZXl9YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVtaXQgd2hlbiB0aGUgdmlldyBjaGFuZ2VzIGZvciBleGFtcGxlIGZyb20gbW9udGggdmlldyB0byB0aGUgeWVhciB2aWV3LlxuICAgICAgICAgKiBTZWUgYWxzbyBFdmVudFR5cGVzLlZpZXdVcGRhdGVFdmVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy51cGRhdGUgPSBgdXBkYXRlJHt0aGlzLmtleX1gO1xuICAgICAgICAvKipcbiAgICAgICAgICogRW1pdHMgd2hlbiBhIHNlbGVjdGVkIGRhdGUgb3IgdmFsdWUgZnJvbSB0aGUgaW5wdXQgZmllbGQgZmFpbHMgdG8gbWVldCB0aGUgcHJvdmlkZWQgdmFsaWRhdGlvbiBydWxlcy5cbiAgICAgICAgICogU2VlIGFsc28gRXZlbnRUeXBlcy5GYWlsRXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZXJyb3IgPSBgZXJyb3Ike3RoaXMua2V5fWA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IGV2ZW50XG4gICAgICAgICAqIEBldmVudCBFdmVudHMjc2hvd1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zaG93ID0gYHNob3cke3RoaXMua2V5fWA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIaWRlIGV2ZW50XG4gICAgICAgICAqIEBldmVudCBFdmVudHMjaGlkZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oaWRlID0gYGhpZGUke3RoaXMua2V5fWA7XG4gICAgICAgIC8vIGJsdXIgYW5kIGZvY3VzIGFyZSB1c2VkIGluIHRoZSBqUXVlcnkgcHJvdmlkZXIgYnV0IGFyZSBvdGhlcndpc2UgdW51c2VkLlxuICAgICAgICAvLyBrZXl1cC9kb3duIHdpbGwgYmUgdXNlZCBsYXRlciBmb3Iga2V5YmluZGluZyBvcHRpb25zXG4gICAgICAgIHRoaXMuYmx1ciA9IGBibHVyJHt0aGlzLmtleX1gO1xuICAgICAgICB0aGlzLmZvY3VzID0gYGZvY3VzJHt0aGlzLmtleX1gO1xuICAgICAgICB0aGlzLmtleXVwID0gYGtleXVwJHt0aGlzLmtleX1gO1xuICAgICAgICB0aGlzLmtleWRvd24gPSBga2V5ZG93biR7dGhpcy5rZXl9YDtcbiAgICB9XG59XG5jbGFzcyBDc3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndpZGdldCA9IGAke05BTUV9LXdpZGdldGA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIb2xkIHRoZSBwcmV2aW91cywgbmV4dCBhbmQgc3dpdGNoZXIgZGl2c1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jYWxlbmRhckhlYWRlciA9ICdjYWxlbmRhci1oZWFkZXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVsZW1lbnQgZm9yIHRoZSBhY3Rpb24gdG8gY2hhbmdlIHRoZSBjYWxlbmRhciB2aWV3LiBFLmcuIG1vbnRoIC0+IHllYXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN3aXRjaCA9ICdwaWNrZXItc3dpdGNoJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBlbGVtZW50cyBmb3IgYWxsIHRoZSB0b29sYmFyIG9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudG9vbGJhciA9ICd0b29sYmFyJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRoZSBob3ZlciBhbmQgcm91bmRpbmcgYWZmZWN0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ub0hpZ2hsaWdodCA9ICduby1oaWdobGlnaHQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgd2lkZ2V0IGVsZW1lbnQgd2hlbiB0aGUgc2lkZSBieSBzaWRlIG9wdGlvbiBpcyBpbiB1c2UuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNpZGVCeVNpZGUgPSAndGltZXBpY2tlci1zYnMnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVsZW1lbnQgZm9yIHRoZSBhY3Rpb24gdG8gY2hhbmdlIHRoZSBjYWxlbmRhciB2aWV3LCBlLmcuIEF1Z3VzdCAtPiBKdWx5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnByZXZpb3VzID0gJ3ByZXZpb3VzJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBlbGVtZW50IGZvciB0aGUgYWN0aW9uIHRvIGNoYW5nZSB0aGUgY2FsZW5kYXIgdmlldywgZS5nLiBBdWd1c3QgLT4gU2VwdGVtYmVyXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5leHQgPSAnbmV4dCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGFueSBhY3Rpb24gdGhhdCB3b3VsZCB2aW9sYXRlIGFueSByZXN0cmljdGlvbiBvcHRpb25zLiBBTHNvIGFwcGxpZWRcbiAgICAgICAgICogdG8gYW4gaW5wdXQgZmllbGQgaWYgdGhlIGRpc2FibGVkIGZ1bmN0aW9uIGlzIGNhbGxlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSAnZGlzYWJsZWQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBhbnkgZGF0ZSB0aGF0IGlzIGxlc3MgdGhhbiByZXF1ZXN0ZWQgdmlldyxcbiAgICAgICAgICogZS5nLiB0aGUgbGFzdCBkYXkgb2YgdGhlIHByZXZpb3VzIG1vbnRoLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbGQgPSAnb2xkJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gYW55IGRhdGUgdGhhdCBpcyBncmVhdGVyIHRoYW4gb2YgcmVxdWVzdGVkIHZpZXcsXG4gICAgICAgICAqIGUuZy4gdGhlIGxhc3QgZGF5IG9mIHRoZSBwcmV2aW91cyBtb250aC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmV3ID0gJ25ldyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGFueSBkYXRlIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hY3RpdmUgPSAnYWN0aXZlJztcbiAgICAgICAgLy8jcmVnaW9uIGRhdGUgZWxlbWVudFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBjYWxlbmRhciB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kYXRlQ29udGFpbmVyID0gJ2RhdGUtY29udGFpbmVyJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgZGVjYWRlcyB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZWNhZGVzQ29udGFpbmVyID0gYCR7dGhpcy5kYXRlQ29udGFpbmVyfS1kZWNhZGVzYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gZWxlbWVudHMgd2l0aGluIHRoZSBkZWNhZGUgY29udGFpbmVyLCBlLmcuIDIwMjAsIDIwMzBcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGVjYWRlID0gJ2RlY2FkZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIHllYXJzIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnllYXJzQ29udGFpbmVyID0gYCR7dGhpcy5kYXRlQ29udGFpbmVyfS15ZWFyc2A7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGVsZW1lbnRzIHdpdGhpbiB0aGUgeWVhcnMgY29udGFpbmVyLCBlLmcuIDIwMjEsIDIwMjFcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMueWVhciA9ICd5ZWFyJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgbW9udGggdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW9udGhzQ29udGFpbmVyID0gYCR7dGhpcy5kYXRlQ29udGFpbmVyfS1tb250aHNgO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlbGVtZW50cyB3aXRoaW4gdGhlIG1vbnRoIGNvbnRhaW5lciwgZS5nLiBKYW51YXJ5LCBGZWJydWFyeVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb250aCA9ICdtb250aCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIGNhbGVuZGFyIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRheXNDb250YWluZXIgPSBgJHt0aGlzLmRhdGVDb250YWluZXJ9LWRheXNgO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlbGVtZW50cyB3aXRoaW4gdGhlIGRheSBjb250YWluZXIsIGUuZy4gMSwgMi4uMzFcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGF5ID0gJ2RheSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBkaXNwbGF5LmNhbGVuZGFyV2Vla3MgaXMgZW5hYmxlZCwgYSBjb2x1bW4gZGlzcGxheWluZyB0aGUgd2VlayBvZiB5ZWFyXG4gICAgICAgICAqIGlzIHNob3duLiBUaGlzIGNsYXNzIGlzIGFwcGxpZWQgdG8gZWFjaCBjZWxsIGluIHRoYXQgY29sdW1uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jYWxlbmRhcldlZWtzID0gJ2N3JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIGZpcnN0IHJvdyBvZiB0aGUgY2FsZW5kYXIgdmlldywgZS5nLiBTdW5kYXksIE1vbmRheVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kYXlPZlRoZVdlZWsgPSAnZG93JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIGN1cnJlbnQgZGF0ZSBvbiB0aGUgY2FsZW5kYXIgdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudG9kYXkgPSAndG9kYXknO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgbG9jYWxlJ3Mgd2Vla2VuZCBkYXRlcyBvbiB0aGUgY2FsZW5kYXIgdmlldywgZS5nLiBTdW5kYXksIFNhdHVyZGF5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndlZWtlbmQgPSAnd2Vla2VuZCc7XG4gICAgICAgIHRoaXMucmFuZ2VJbiA9ICdyYW5nZS1pbic7XG4gICAgICAgIHRoaXMucmFuZ2VTdGFydCA9ICdyYW5nZS1zdGFydCc7XG4gICAgICAgIHRoaXMucmFuZ2VFbmQgPSAncmFuZ2UtZW5kJztcbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8vI3JlZ2lvbiB0aW1lIGVsZW1lbnRcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciBhbGwgdGltZSByZWxhdGVkIGVsZW1lbnRzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50aW1lQ29udGFpbmVyID0gJ3RpbWUtY29udGFpbmVyJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdGhlIHNlcGFyYXRvciBjb2x1bW5zIGJldHdlZW4gdGltZSBlbGVtZW50cywgZS5nLiBob3VyICo6KiBtaW51dGUgKjoqIHNlY29uZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZXBhcmF0b3IgPSAnc2VwYXJhdG9yJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgY2xvY2sgdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xvY2tDb250YWluZXIgPSBgJHt0aGlzLnRpbWVDb250YWluZXJ9LWNsb2NrYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgaG91cnMgc2VsZWN0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhvdXJDb250YWluZXIgPSBgJHt0aGlzLnRpbWVDb250YWluZXJ9LWhvdXJgO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBtaW51dGVzIHNlbGVjdGlvbiB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5taW51dGVDb250YWluZXIgPSBgJHt0aGlzLnRpbWVDb250YWluZXJ9LW1pbnV0ZWA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIHNlY29uZHMgc2VsZWN0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlY29uZENvbnRhaW5lciA9IGAke3RoaXMudGltZUNvbnRhaW5lcn0tc2Vjb25kYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gZWFjaCBlbGVtZW50IGluIHRoZSBob3VycyBzZWxlY3Rpb24gdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaG91ciA9ICdob3VyJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gZWFjaCBlbGVtZW50IGluIHRoZSBtaW51dGVzIHNlbGVjdGlvbiB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5taW51dGUgPSAnbWludXRlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gZWFjaCBlbGVtZW50IGluIHRoZSBzZWNvbmRzIHNlbGVjdGlvbiB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZWNvbmQgPSAnc2Vjb25kJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgQU0vUE0gdG9nZ2xlIGJ1dHRvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudG9nZ2xlTWVyaWRpZW0gPSAndG9nZ2xlTWVyaWRpZW0nO1xuICAgICAgICAvLyNlbmRyZWdpb25cbiAgICAgICAgLy8jcmVnaW9uIGNvbGxhcHNlXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRoZSBlbGVtZW50IG9mIHRoZSBjdXJyZW50IHZpZXcgbW9kZSwgZS5nLiBjYWxlbmRhciBvciBjbG9jay5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2hvdyA9ICdzaG93JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIGN1cnJlbnRseSBzaG93aW5nIHZpZXcgbW9kZSBkdXJpbmcgYSB0cmFuc2l0aW9uXG4gICAgICAgICAqIGJldHdlZW4gY2FsZW5kYXIgYW5kIGNsb2NrIHZpZXdzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNvbGxhcHNpbmcgPSAndGQtY29sbGFwc2luZyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSBjdXJyZW50bHkgaGlkZGVuIHZpZXcgbW9kZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29sbGFwc2UgPSAndGQtY29sbGFwc2UnO1xuICAgICAgICAvLyNlbmRyZWdpb25cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIHdpZGdldCB3aGVuIHRoZSBvcHRpb24gZGlzcGxheS5pbmxpbmUgaXMgZW5hYmxlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5saW5lID0gJ2lubGluZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSB3aWRnZXQgd2hlbiB0aGUgb3B0aW9uIGRpc3BsYXkudGhlbWUgaXMgbGlnaHQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpZ2h0VGhlbWUgPSAnbGlnaHQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgd2lkZ2V0IHdoZW4gdGhlIG9wdGlvbiBkaXNwbGF5LnRoZW1lIGlzIGRhcmsuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRhcmtUaGVtZSA9ICdkYXJrJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZWQgZm9yIGRldGVjdGluZyBpZiB0aGUgc3lzdGVtIGNvbG9yIHByZWZlcmVuY2UgaXMgZGFyayBtb2RlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzRGFya1ByZWZlcnJlZFF1ZXJ5ID0gJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknO1xuICAgIH1cbn1cbmNsYXNzIE5hbWVzcGFjZSB7XG59XG5OYW1lc3BhY2UuTkFNRSA9IE5BTUU7XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5OYW1lc3BhY2UuZGF0YUtleSA9IGRhdGFLZXk7XG5OYW1lc3BhY2UuZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuTmFtZXNwYWNlLmNzcyA9IG5ldyBDc3MoKTtcbk5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzID0gbmV3IEVycm9yTWVzc2FnZXMoKTtcblxuY29uc3QgRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiA9IHtcbiAgICBkYXRlRm9ybWF0czoge1xuICAgICAgICBMVFM6ICdoOm1tOnNzIFQnLFxuICAgICAgICBMVDogJ2g6bW0gVCcsXG4gICAgICAgIEw6ICdNTS9kZC95eXl5JyxcbiAgICAgICAgTEw6ICdNTU1NIGQsIHl5eXknLFxuICAgICAgICBMTEw6ICdNTU1NIGQsIHl5eXkgaDptbSBUJyxcbiAgICAgICAgTExMTDogJ2RkZGQsIE1NTU0gZCwgeXl5eSBoOm1tIFQnLFxuICAgIH0sXG4gICAgZm9ybWF0OiAnTCBMVCcsXG4gICAgbG9jYWxlOiAnZGVmYXVsdCcsXG4gICAgaG91ckN5Y2xlOiB1bmRlZmluZWQsXG4gICAgb3JkaW5hbDogKG4pID0+IHtcbiAgICAgICAgY29uc3QgcyA9IFsndGgnLCAnc3QnLCAnbmQnLCAncmQnXTtcbiAgICAgICAgY29uc3QgdiA9IG4gJSAxMDA7XG4gICAgICAgIHJldHVybiBgWyR7bn0ke3NbKHYgLSAyMCkgJSAxMF0gfHwgc1t2XSB8fCBzWzBdfV1gO1xuICAgIH0sXG59O1xudmFyIERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMSA9IHsgLi4uRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiB9O1xuXG52YXIgVW5pdDtcbihmdW5jdGlvbiAoVW5pdCkge1xuICAgIFVuaXRbXCJzZWNvbmRzXCJdID0gXCJzZWNvbmRzXCI7XG4gICAgVW5pdFtcIm1pbnV0ZXNcIl0gPSBcIm1pbnV0ZXNcIjtcbiAgICBVbml0W1wiaG91cnNcIl0gPSBcImhvdXJzXCI7XG4gICAgVW5pdFtcImRhdGVcIl0gPSBcImRhdGVcIjtcbiAgICBVbml0W1wibW9udGhcIl0gPSBcIm1vbnRoXCI7XG4gICAgVW5pdFtcInllYXJcIl0gPSBcInllYXJcIjtcbn0pKFVuaXQgfHwgKFVuaXQgPSB7fSkpO1xuY29uc3QgdHdvRGlnaXRUZW1wbGF0ZSA9IHtcbiAgICBtb250aDogJzItZGlnaXQnLFxuICAgIGRheTogJzItZGlnaXQnLFxuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgc2Vjb25kOiAnMi1kaWdpdCcsXG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIEludGwgZm9ybWF0IG9iamVjdCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb2JqZWN0XG4gKiBAcGFyYW0gdW5pdFxuICovXG5jb25zdCBnZXRGb3JtYXRCeVVuaXQgPSAodW5pdCkgPT4ge1xuICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGVTdHlsZTogJ3Nob3J0JyB9O1xuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1vbnRoOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICByZXR1cm4geyB5ZWFyOiAnbnVtZXJpYycgfTtcbiAgICB9XG59O1xuLyoqXG4gKiBBdHRlbXB0cyB0byBndWVzcyB0aGUgaG91ciBjeWNsZSBvZiB0aGUgZ2l2ZW4gbG9jYWxcbiAqIEBwYXJhbSBsb2NhbGVcbiAqL1xuY29uc3QgZ3Vlc3NIb3VyQ3ljbGUgPSAobG9jYWxlKSA9PiB7XG4gICAgaWYgKCFsb2NhbGUpXG4gICAgICAgIHJldHVybiAnaDEyJztcbiAgICAvLyBub2luc3BlY3Rpb24gU3BlbGxDaGVja2luZ0luc3BlY3Rpb25cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHtcbiAgICAgICAgaG91cjogJzItZGlnaXQnLFxuICAgICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICAgICAgbnVtYmVyaW5nU3lzdGVtOiAnbGF0bicsXG4gICAgfTtcbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlVGltZSgpLnNldExvY2FsaXphdGlvbih7IGxvY2FsZSB9KTtcbiAgICBkdC5ob3VycyA9IDA7XG4gICAgY29uc3Qgc3RhcnQgPSBkdC5wYXJ0cyh1bmRlZmluZWQsIHRlbXBsYXRlKS5ob3VyO1xuICAgIC8vbWlkbmlnaHQgaXMgMTIgc28gZW4tVVMgc3R5bGUgMTIgQU1cbiAgICBpZiAoc3RhcnQgPT09ICcxMicpXG4gICAgICAgIHJldHVybiAnaDEyJztcbiAgICAvL21pZG5pZ2h0IGlzIDI0IGlzIGZyb20gMDAtMjRcbiAgICBpZiAoc3RhcnQgPT09ICcyNCcpXG4gICAgICAgIHJldHVybiAnaDI0JztcbiAgICBkdC5ob3VycyA9IDIzO1xuICAgIGNvbnN0IGVuZCA9IGR0LnBhcnRzKHVuZGVmaW5lZCwgdGVtcGxhdGUpLmhvdXI7XG4gICAgLy9pZiBtaWRuaWdodCBpcyAwMCBhbmQgaG91ciAyMyBpcyAxMSB0aGVuXG4gICAgaWYgKHN0YXJ0ID09PSAnMDAnICYmIGVuZCA9PT0gJzExJylcbiAgICAgICAgcmV0dXJuICdoMTEnO1xuICAgIGlmIChzdGFydCA9PT0gJzAwJyAmJiBlbmQgPT09ICcyMycpXG4gICAgICAgIHJldHVybiAnaDIzJztcbiAgICBjb25zb2xlLndhcm4oYGNvdWxkbid0IGRldGVybWluZSBob3VyIGN5Y2xlIGZvciAke2xvY2FsZX0uIHN0YXJ0OiAke3N0YXJ0fS4gZW5kOiAke2VuZH1gKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbi8qKlxuICogRm9yIHRoZSBtb3N0IHBhcnQgdGhpcyBvYmplY3QgYmVoYXZlcyBleGFjdGx5IHRoZSBzYW1lIHdheVxuICogYXMgdGhlIG5hdGl2ZSBEYXRlIG9iamVjdCB3aXRoIGEgbGl0dGxlIGV4dHJhIHNwaWNlLlxuICovXG5jbGFzcyBEYXRlVGltZSBleHRlbmRzIERhdGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmxvY2FsaXphdGlvbiA9IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMTtcbiAgICAgICAgdGhpcy5ub25MZWFwTGFkZGVyID0gW1xuICAgICAgICAgICAgMCwgMzEsIDU5LCA5MCwgMTIwLCAxNTEsIDE4MSwgMjEyLCAyNDMsIDI3MywgMzA0LCAzMzQsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMubGVhcExhZGRlciA9IFswLCAzMSwgNjAsIDkxLCAxMjEsIDE1MiwgMTgyLCAyMTMsIDI0NCwgMjc0LCAzMDUsIDMzNV07XG4gICAgICAgIC8vI3JlZ2lvbiBDREYgc3R1ZmZcbiAgICAgICAgdGhpcy5kYXRlVGltZVJlZ2V4ID0gXG4gICAgICAgIC8vaXMgcmVnZXggY2Fubm90IGJlIHNpbXBsaWZpZWQgYmV5b25kIHdoYXQgaXQgYWxyZWFkeSBpc1xuICAgICAgICAvKFxcW1teW1xcXV0qXSl8eXsxLDR9fE17MSw0fXxkezEsNH18SHsxLDJ9fGh7MSwyfXx0fFR8bXsxLDJ9fHN7MSwyfXxmezN9L2c7IC8vTk9TT05BUlxuICAgICAgICB0aGlzLmZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teW1xcXV0qXSl8KFstXzovLiwoKVxcc10rKXwoVHx0fHl5eXl8eXk/fE1NP00/TT98RG98ZGQ/fGhoP3xISD98bW0/fHNzPykvZzsgLy9OT1NPTkFSIGlzIHJlZ2V4IGNhbm5vdCBiZSBzaW1wbGlmaWVkIGJleW9uZCB3aGF0IGl0IGFscmVhZHkgaXNcbiAgICAgICAgdGhpcy5tYXRjaDIgPSAvXFxkXFxkLzsgLy8gMDAgLSA5OVxuICAgICAgICB0aGlzLm1hdGNoMyA9IC9cXGR7M30vOyAvLyAwMDAgLSA5OTlcbiAgICAgICAgdGhpcy5tYXRjaDQgPSAvXFxkezR9LzsgLy8gMDAwMCAtIDk5OTlcbiAgICAgICAgdGhpcy5tYXRjaDF0bzIgPSAvXFxkXFxkPy87IC8vIDAgLSA5OVxuICAgICAgICB0aGlzLm1hdGNoU2lnbmVkID0gL1srLV0/XFxkKy87IC8vIC1pbmYgLSBpbmZcbiAgICAgICAgdGhpcy5tYXRjaE9mZnNldCA9IC9bKy1dXFxkXFxkOj8oXFxkXFxkKT98Wi87IC8vICswMDowMCAtMDA6MDAgKzAwMDAgb3IgLTAwMDAgKzAwIG9yIFpcbiAgICAgICAgdGhpcy5tYXRjaFdvcmQgPSAvW15cXGRfOi8sXFwtKClcXHNdKy87IC8vIFdvcmRcbiAgICAgICAgdGhpcy56b25lRXhwcmVzc2lvbnMgPSBbXG4gICAgICAgICAgICB0aGlzLm1hdGNoT2Zmc2V0LFxuICAgICAgICAgICAgKG9iaiwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICBvYmoub2Zmc2V0ID0gdGhpcy5vZmZzZXRGcm9tU3RyaW5nKGlucHV0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbnMgPSB7XG4gICAgICAgICAgICB0OiBbXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaFdvcmQsXG4gICAgICAgICAgICAgICAgKG9qYiwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2piLmFmdGVybm9vbiA9IHRoaXMubWVyaWRpZW1NYXRjaChpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBUOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaFdvcmQsXG4gICAgICAgICAgICAgICAgKG9qYiwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2piLmFmdGVybm9vbiA9IHRoaXMubWVyaWRpZW1NYXRjaChpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBmZmY6IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoMyxcbiAgICAgICAgICAgICAgICAob2piLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvamIubWlsbGlzZWNvbmRzID0gK2lucHV0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgczogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdzZWNvbmRzJyldLFxuICAgICAgICAgICAgc3M6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnc2Vjb25kcycpXSxcbiAgICAgICAgICAgIG06IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnbWludXRlcycpXSxcbiAgICAgICAgICAgIG1tOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ21pbnV0ZXMnKV0sXG4gICAgICAgICAgICBIOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ2hvdXJzJyldLFxuICAgICAgICAgICAgaDogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdob3VycycpXSxcbiAgICAgICAgICAgIEhIOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ2hvdXJzJyldLFxuICAgICAgICAgICAgaGg6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnaG91cnMnKV0sXG4gICAgICAgICAgICBkOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ2RheScpXSxcbiAgICAgICAgICAgIGRkOiBbdGhpcy5tYXRjaDIsIHRoaXMuYWRkSW5wdXQoJ2RheScpXSxcbiAgICAgICAgICAgIERvOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaFdvcmQsXG4gICAgICAgICAgICAgICAgKG9qYiwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgW29qYi5kYXldID0gaW5wdXQubWF0Y2goL1xcZCsvKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxvY2FsaXphdGlvbi5vcmRpbmFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAzMTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2NhbGl6YXRpb24ub3JkaW5hbChpKS5yZXBsYWNlKC9bW1xcXV0vZywgJycpID09PSBpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9qYi5kYXkgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBNOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ21vbnRoJyldLFxuICAgICAgICAgICAgTU06IFt0aGlzLm1hdGNoMiwgdGhpcy5hZGRJbnB1dCgnbW9udGgnKV0sXG4gICAgICAgICAgICBNTU06IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoV29yZCxcbiAgICAgICAgICAgICAgICAob2JqLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb250aHMgPSB0aGlzLmdldEFsbE1vbnRocygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb250aHNTaG9ydCA9IHRoaXMuZ2V0QWxsTW9udGhzKCdzaG9ydCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gKG1vbnRoc1Nob3J0IHx8IG1vbnRocy5tYXAoKF8pID0+IF8uc2xpY2UoMCwgMykpKS5pbmRleE9mKGlucHV0KSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaEluZGV4IDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2JqLm1vbnRoID0gbWF0Y2hJbmRleCAlIDEyIHx8IG1hdGNoSW5kZXg7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBNTU1NOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaFdvcmQsXG4gICAgICAgICAgICAgICAgKG9iaiwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9udGhzID0gdGhpcy5nZXRBbGxNb250aHMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IG1vbnRocy5pbmRleE9mKGlucHV0KSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaEluZGV4IDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2JqLm1vbnRoID0gbWF0Y2hJbmRleCAlIDEyIHx8IG1hdGNoSW5kZXg7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB5OiBbdGhpcy5tYXRjaFNpZ25lZCwgdGhpcy5hZGRJbnB1dCgneWVhcicpXSxcbiAgICAgICAgICAgIHl5OiBbXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaDIsXG4gICAgICAgICAgICAgICAgKG9iaiwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnllYXIgPSB0aGlzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHl5eXk6IFt0aGlzLm1hdGNoNCwgdGhpcy5hZGRJbnB1dCgneWVhcicpXSxcbiAgICAgICAgICAgIC8vIHo6IHRoaXMuem9uZUV4cHJlc3Npb25zLFxuICAgICAgICAgICAgLy8geno6IHRoaXMuem9uZUV4cHJlc3Npb25zLFxuICAgICAgICAgICAgLy8genp6OiB0aGlzLnpvbmVFeHByZXNzaW9uc1xuICAgICAgICB9O1xuICAgICAgICAvLyNlbmRyZWdpb24gQ0RGIHN0dWZmXG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYWluYWJsZSB3YXkgdG8gc2V0IHRoZSB7QGxpbmsgbG9jYWxlfVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBkZXByZWNhdGVkIHVzZSBzZXRMb2NhbGl6YXRpb24gd2l0aCBhIEZvcm1hdExvY2FsaXphdGlvbiBvYmplY3QgaW5zdGVhZFxuICAgICAqL1xuICAgIHNldExvY2FsZSh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMubG9jYWxpemF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsaXphdGlvbiA9IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFpbmFibGUgd2F5IHRvIHNldCB0aGUge0BsaW5rIGxvY2FsaXphdGlvbn1cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRMb2NhbGl6YXRpb24odmFsdWUpIHtcbiAgICAgICAgdGhpcy5sb2NhbGl6YXRpb24gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgcGxhaW4gSlMgZGF0ZSBvYmplY3QgdG8gYSBEYXRlVGltZSBvYmplY3QuXG4gICAgICogRG9pbmcgdGhpcyBhbGxvd3MgYWNjZXNzIHRvIGZvcm1hdCwgZXRjLlxuICAgICAqIEBwYXJhbSAgZGF0ZVxuICAgICAqIEBwYXJhbSBsb2NhbGUgdGhpcyBwYXJhbWV0ZXIgaXMgZGVwcmVjYXRlZC4gVXNlIGZvcm1hdExvY2FsaXphdGlvbiBpbnN0ZWFkLlxuICAgICAqIEBwYXJhbSBmb3JtYXRMb2NhbGl6YXRpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgY29udmVydChkYXRlLCBsb2NhbGUgPSAnZGVmYXVsdCcsIGZvcm1hdExvY2FsaXphdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIWRhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgZGF0ZSBpcyByZXF1aXJlZGApO1xuICAgICAgICBpZiAoIWZvcm1hdExvY2FsaXphdGlvbikge1xuICAgICAgICAgICAgZm9ybWF0TG9jYWxpemF0aW9uID0gRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxO1xuICAgICAgICAgICAgZm9ybWF0TG9jYWxpemF0aW9uLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSwgZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSwgZGF0ZS5nZXRTZWNvbmRzKCksIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkpLnNldExvY2FsaXphdGlvbihmb3JtYXRMb2NhbGl6YXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBOYXRpdmUgZGF0ZSBtYW5pcHVsYXRpb25zIGFyZSBub3QgcHVyZSBmdW5jdGlvbnMuIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIGR1cGxpY2F0ZSBvZiB0aGUgRGF0ZVRpbWUgb2JqZWN0LlxuICAgICAqL1xuICAgIGdldCBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIHRoaXMuZGF0ZSwgdGhpcy5ob3VycywgdGhpcy5taW51dGVzLCB0aGlzLnNlY29uZHMsIHRoaXMuZ2V0TWlsbGlzZWNvbmRzKCkpLnNldExvY2FsaXphdGlvbih0aGlzLmxvY2FsaXphdGlvbik7XG4gICAgfVxuICAgIHN0YXRpYyBpc1ZhbGlkKGQpIHtcbiAgICAgICAgaWYgKGQgPT09IHVuZGVmaW5lZCB8fCBKU09OLnN0cmluZ2lmeShkKSA9PT0gJ251bGwnKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZC5jb25zdHJ1Y3Rvci5uYW1lID09PSBEYXRlVGltZS5uYW1lKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCBkYXRlIHRvIHRoZSBzdGFydCBvZiB0aGUge0BsaW5rIHVuaXR9IHByb3ZpZGVkXG4gICAgICogRXhhbXBsZTogQ29uc2lkZXIgYSBkYXRlIG9mIFwiQXByaWwgMzAsIDIwMjEsIDExOjQ1OjMyLjk4NCBBTVwiID0+IG5ldyBEYXRlVGltZSgyMDIxLCAzLCAzMCwgMTEsIDQ1LCAzMiwgOTg0KS5zdGFydE9mKCdtb250aCcpXG4gICAgICogd291bGQgcmV0dXJuIEFwcmlsIDEsIDIwMjEsIDEyOjAwOjAwLjAwMCBBTSAobWlkbmlnaHQpXG4gICAgICogQHBhcmFtIHVuaXRcbiAgICAgKiBAcGFyYW0gc3RhcnRPZlRoZVdlZWsgQWxsb3dzIGZvciB0aGUgY2hhbmdpbmcgdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrLlxuICAgICAqL1xuICAgIHN0YXJ0T2YodW5pdCwgc3RhcnRPZlRoZVdlZWsgPSAwKSB7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWlsbGlzZWNvbmRzKDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWludXRlcyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWNvbmRzKDAsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaG91cnMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWludXRlcygwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrRGF5Jzoge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRPZihVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLndlZWtEYXkgPT09IHN0YXJ0T2ZUaGVXZWVrKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjb25zdCBnb0JhY2sgPSAodGhpcy53ZWVrRGF5IC0gc3RhcnRPZlRoZVdlZWsgKyA3KSAlIDc7XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlKGdvQmFjayAqIC0xLCBVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRPZihVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZSgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRPZihVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9udGgoMCwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgZGF0ZSB0byB0aGUgZW5kIG9mIHRoZSB7QGxpbmsgdW5pdH0gcHJvdmlkZWRcbiAgICAgKiBFeGFtcGxlOiBDb25zaWRlciBhIGRhdGUgb2YgXCJBcHJpbCAzMCwgMjAyMSwgMTE6NDU6MzIuOTg0IEFNXCIgPT4gbmV3IERhdGVUaW1lKDIwMjEsIDMsIDMwLCAxMSwgNDUsIDMyLCA5ODQpLmVuZE9mKCdtb250aCcpXG4gICAgICogd291bGQgcmV0dXJuIEFwcmlsIDMwLCAyMDIxLCAxMTo1OTo1OS45OTkgUE1cbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqIEBwYXJhbSBzdGFydE9mVGhlV2Vla1xuICAgICAqL1xuICAgIGVuZE9mKHVuaXQsIHN0YXJ0T2ZUaGVXZWVrID0gMCkge1xuICAgICAgICBpZiAodGhpc1t1bml0XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbml0ICcke3VuaXR9JyBpcyBub3QgdmFsaWRgKTtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1pbGxpc2Vjb25kcyg5OTkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWludXRlcyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWNvbmRzKDU5LCA5OTkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaG91cnMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWludXRlcyg1OSwgNTksIDk5OSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrRGF5Jzoge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kT2YoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRPZldlZWsgPSA2ICsgc3RhcnRPZlRoZVdlZWs7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2Vla0RheSA9PT0gZW5kT2ZXZWVrKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGUoZW5kT2ZXZWVrIC0gdGhpcy53ZWVrRGF5LCBVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIHRoaXMuZW5kT2YoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGUoMSwgVW5pdC5tb250aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRPZihVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9udGgoMTEsIDMxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIGEge0BsaW5rIHVuaXR9IHZhbHVlLiBWYWx1ZSBjYW4gYmUgcG9zaXRpdmUgb3IgbmVnYXRpdmVcbiAgICAgKiBFeGFtcGxlOiBDb25zaWRlciBhIGRhdGUgb2YgXCJBcHJpbCAzMCwgMjAyMSwgMTE6NDU6MzIuOTg0IEFNXCIgPT4gbmV3IERhdGVUaW1lKDIwMjEsIDMsIDMwLCAxMSwgNDUsIDMyLCA5ODQpLm1hbmlwdWxhdGUoMSwgJ21vbnRoJylcbiAgICAgKiB3b3VsZCByZXR1cm4gTWF5IDMwLCAyMDIxLCAxMTo0NTozMi45ODQgQU1cbiAgICAgKiBAcGFyYW0gdmFsdWUgQSBwb3NpdGl2ZSBvciBuZWdhdGl2ZSBudW1iZXJcbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqL1xuICAgIG1hbmlwdWxhdGUodmFsdWUsIHVuaXQpIHtcbiAgICAgICAgaWYgKHRoaXNbdW5pdF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5pdCAnJHt1bml0fScgaXMgbm90IHZhbGlkYCk7XG4gICAgICAgIHRoaXNbdW5pdF0gKz0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB7QGxpbmsgY29tcGFyZX0gaXMgYmVmb3JlIHRoaXMgZGF0ZVxuICAgICAqIEBwYXJhbSBjb21wYXJlIFRoZSBEYXRlL0RhdGVUaW1lIHRvIGNvbXBhcmVcbiAgICAgKiBAcGFyYW0gdW5pdCBJZiBwcm92aWRlZCwgdXNlcyB7QGxpbmsgc3RhcnRPZn0gZm9yXG4gICAgICogY29tcGFyaXNvbi5cbiAgICAgKi9cbiAgICBpc0JlZm9yZShjb21wYXJlLCB1bml0KSB7XG4gICAgICAgIC8vIElmIHRoZSBjb21wYXJpc29ucyBpcyB1bmRlZmluZWQsIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAoIURhdGVUaW1lLmlzVmFsaWQoY29tcGFyZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghdW5pdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA8IGNvbXBhcmUudmFsdWVPZigpO1xuICAgICAgICBpZiAodGhpc1t1bml0XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbml0ICcke3VuaXR9JyBpcyBub3QgdmFsaWRgKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLmNsb25lLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpIDwgY29tcGFyZS5jbG9uZS5zdGFydE9mKHVuaXQpLnZhbHVlT2YoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0cnVlIGlmIHtAbGluayBjb21wYXJlfSBpcyBhZnRlciB0aGlzIGRhdGVcbiAgICAgKiBAcGFyYW0gY29tcGFyZSBUaGUgRGF0ZS9EYXRlVGltZSB0byBjb21wYXJlXG4gICAgICogQHBhcmFtIHVuaXQgSWYgcHJvdmlkZWQsIHVzZXMge0BsaW5rIHN0YXJ0T2Z9IGZvclxuICAgICAqIGNvbXBhcmlzb24uXG4gICAgICovXG4gICAgaXNBZnRlcihjb21wYXJlLCB1bml0KSB7XG4gICAgICAgIC8vIElmIHRoZSBjb21wYXJpc29ucyBpcyB1bmRlZmluZWQsIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAoIURhdGVUaW1lLmlzVmFsaWQoY29tcGFyZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghdW5pdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA+IGNvbXBhcmUudmFsdWVPZigpO1xuICAgICAgICBpZiAodGhpc1t1bml0XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbml0ICcke3VuaXR9JyBpcyBub3QgdmFsaWRgKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLmNsb25lLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpID4gY29tcGFyZS5jbG9uZS5zdGFydE9mKHVuaXQpLnZhbHVlT2YoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0cnVlIGlmIHtAbGluayBjb21wYXJlfSBpcyBzYW1lIHRoaXMgZGF0ZVxuICAgICAqIEBwYXJhbSBjb21wYXJlIFRoZSBEYXRlL0RhdGVUaW1lIHRvIGNvbXBhcmVcbiAgICAgKiBAcGFyYW0gdW5pdCBJZiBwcm92aWRlZCwgdXNlcyB7QGxpbmsgc3RhcnRPZn0gZm9yXG4gICAgICogY29tcGFyaXNvbi5cbiAgICAgKi9cbiAgICBpc1NhbWUoY29tcGFyZSwgdW5pdCkge1xuICAgICAgICAvLyBJZiB0aGUgY29tcGFyaXNvbnMgaXMgdW5kZWZpbmVkLCByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKCFEYXRlVGltZS5pc1ZhbGlkKGNvbXBhcmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXVuaXQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPT09IGNvbXBhcmUudmFsdWVPZigpO1xuICAgICAgICBpZiAodGhpc1t1bml0XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbml0ICcke3VuaXR9JyBpcyBub3QgdmFsaWRgKTtcbiAgICAgICAgY29tcGFyZSA9IERhdGVUaW1lLmNvbnZlcnQoY29tcGFyZSk7XG4gICAgICAgIHJldHVybiAodGhpcy5jbG9uZS5zdGFydE9mKHVuaXQpLnZhbHVlT2YoKSA9PT0gY29tcGFyZS5zdGFydE9mKHVuaXQpLnZhbHVlT2YoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoaXMgaXMgYmV0d2VlbiB0d28gb3RoZXIgRGF0ZVRpbWVzLCBvcHRpb25hbGx5IGxvb2tpbmcgYXQgdW5pdCBzY2FsZS4gVGhlIG1hdGNoIGlzIGV4Y2x1c2l2ZS5cbiAgICAgKiBAcGFyYW0gbGVmdFxuICAgICAqIEBwYXJhbSByaWdodFxuICAgICAqIEBwYXJhbSB1bml0LlxuICAgICAqIEBwYXJhbSBpbmNsdXNpdml0eS4gQSBbIGluZGljYXRlcyBpbmNsdXNpb24gb2YgYSB2YWx1ZS4gQSAoIGluZGljYXRlcyBleGNsdXNpb24uXG4gICAgICogSWYgdGhlIGluY2x1c2l2aXR5IHBhcmFtZXRlciBpcyB1c2VkLCBib3RoIGluZGljYXRvcnMgbXVzdCBiZSBwYXNzZWQuXG4gICAgICovXG4gICAgaXNCZXR3ZWVuKGxlZnQsIHJpZ2h0LCB1bml0LCBpbmNsdXNpdml0eSA9ICcoKScpIHtcbiAgICAgICAgLy8gSWYgb25lIG9mIHRoZSBjb21wYXJpc29ucyBpcyB1bmRlZmluZWQsIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAoIURhdGVUaW1lLmlzVmFsaWQobGVmdCkgfHwgIURhdGVUaW1lLmlzVmFsaWQocmlnaHQpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBJZiBhIHVuaXQgaXMgcHJvdmlkZWQgYW5kIGlzIG5vdCBhIHZhbGlkIHByb3BlcnR5IG9mIHRoZSBEYXRlVGltZSBvYmplY3QsIHRocm93IGFuIGVycm9yXG4gICAgICAgIGlmICh1bml0ICYmIHRoaXNbdW5pdF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbml0ICcke3VuaXR9JyBpcyBub3QgdmFsaWRgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZWZ0SW5jbHVzaXZpdHkgPSBpbmNsdXNpdml0eVswXSA9PT0gJygnO1xuICAgICAgICBjb25zdCByaWdodEluY2x1c2l2aXR5ID0gaW5jbHVzaXZpdHlbMV0gPT09ICcpJztcbiAgICAgICAgY29uc3QgaXNMZWZ0SW5SYW5nZSA9IGxlZnRJbmNsdXNpdml0eVxuICAgICAgICAgICAgPyB0aGlzLmlzQWZ0ZXIobGVmdCwgdW5pdClcbiAgICAgICAgICAgIDogIXRoaXMuaXNCZWZvcmUobGVmdCwgdW5pdCk7XG4gICAgICAgIGNvbnN0IGlzUmlnaHRJblJhbmdlID0gcmlnaHRJbmNsdXNpdml0eVxuICAgICAgICAgICAgPyB0aGlzLmlzQmVmb3JlKHJpZ2h0LCB1bml0KVxuICAgICAgICAgICAgOiAhdGhpcy5pc0FmdGVyKHJpZ2h0LCB1bml0KTtcbiAgICAgICAgcmV0dXJuIGlzTGVmdEluUmFuZ2UgJiYgaXNSaWdodEluUmFuZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgZmxhdHRlbmVkIG9iamVjdCBvZiB0aGUgZGF0ZS4gRG9lcyBub3QgaW5jbHVkZSBsaXRlcmFsc1xuICAgICAqIEBwYXJhbSBsb2NhbGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGVcbiAgICAgKi9cbiAgICBwYXJ0cyhsb2NhbGUgPSB0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUsIHRlbXBsYXRlID0geyBkYXRlU3R5bGU6ICdmdWxsJywgdGltZVN0eWxlOiAnbG9uZycgfSkge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHt9O1xuICAgICAgICBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHRlbXBsYXRlKVxuICAgICAgICAgICAgLmZvcm1hdFRvUGFydHModGhpcylcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHgudHlwZSAhPT0gJ2xpdGVyYWwnKVxuICAgICAgICAgICAgLmZvckVhY2goKHgpID0+IChwYXJ0c1t4LnR5cGVdID0geC52YWx1ZSkpO1xuICAgICAgICByZXR1cm4gcGFydHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0U2Vjb25kcygpXG4gICAgICovXG4gICAgZ2V0IHNlY29uZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNlY29uZHMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5zZXRTZWNvbmRzKClcbiAgICAgKi9cbiAgICBzZXQgc2Vjb25kcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFNlY29uZHModmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHR3byBkaWdpdCBob3Vyc1xuICAgICAqL1xuICAgIGdldCBzZWNvbmRzRm9ybWF0dGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cyh1bmRlZmluZWQsIHR3b0RpZ2l0VGVtcGxhdGUpLnNlY29uZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5nZXRNaW51dGVzKClcbiAgICAgKi9cbiAgICBnZXQgbWludXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWludXRlcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLnNldE1pbnV0ZXMoKVxuICAgICAqL1xuICAgIHNldCBtaW51dGVzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0TWludXRlcyh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHdvIGRpZ2l0IG1pbnV0ZXNcbiAgICAgKi9cbiAgICBnZXQgbWludXRlc0Zvcm1hdHRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHModW5kZWZpbmVkLCB0d29EaWdpdFRlbXBsYXRlKS5taW51dGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0SG91cnMoKVxuICAgICAqL1xuICAgIGdldCBob3VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SG91cnMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5zZXRIb3VycygpXG4gICAgICovXG4gICAgc2V0IGhvdXJzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0SG91cnModmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHR3byBkaWdpdCBob3VyLCBlLmcuIDAxLi4uMTBcbiAgICAgKiBAcGFyYW0gaG91ckN5Y2xlIFByb3ZpZGluZyBhbiBob3VyIGN5Y2xlIHdpbGwgY2hhbmdlIDAwIHRvIDI0IGRlcGVuZGluZyBvbiB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAgICovXG4gICAgZ2V0SG91cnNGb3JtYXR0ZWQoaG91ckN5Y2xlID0gJ2gxMicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHModW5kZWZpbmVkLCB7IC4uLnR3b0RpZ2l0VGVtcGxhdGUsIGhvdXJDeWNsZTogaG91ckN5Y2xlIH0pXG4gICAgICAgICAgICAuaG91cjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtZXJpZGllbSBvZiB0aGUgZGF0ZS4gRS5nLiBBTSBvciBQTS5cbiAgICAgKiBJZiB0aGUge0BsaW5rIGxvY2FsZX0gcHJvdmlkZXMgYSBcImRheVBlcmlvZFwiIHRoZW4gdGhpcyB3aWxsIGJlIHJldHVybmVkLFxuICAgICAqIG90aGVyd2lzZSBpdCB3aWxsIHJldHVybiBBTSBvciBQTS5cbiAgICAgKiBAcGFyYW0gbG9jYWxlXG4gICAgICovXG4gICAgbWVyaWRpZW0obG9jYWxlID0gdGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHtcbiAgICAgICAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIGhvdXIxMjogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5mb3JtYXRUb1BhcnRzKHRoaXMpXG4gICAgICAgICAgICAuZmluZCgocCkgPT4gcC50eXBlID09PSAnZGF5UGVyaW9kJyk/LnZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLmdldERhdGUoKVxuICAgICAqL1xuICAgIGdldCBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuc2V0RGF0ZSgpXG4gICAgICovXG4gICAgc2V0IGRhdGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXREYXRlKHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHR3byBkaWdpdCBkYXRlXG4gICAgICovXG4gICAgZ2V0IGRhdGVGb3JtYXR0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzKHVuZGVmaW5lZCwgdHdvRGlnaXRUZW1wbGF0ZSkuZGF5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLmdldERheSgpXG4gICAgICovXG4gICAgZ2V0IHdlZWtEYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERheSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLmdldE1vbnRoKClcbiAgICAgKi9cbiAgICBnZXQgbW9udGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1vbnRoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuc2V0TW9udGgoKVxuICAgICAqL1xuICAgIHNldCBtb250aCh2YWx1ZSkge1xuICAgICAgICBjb25zdCB0YXJnZXRNb250aCA9IG5ldyBEYXRlKHRoaXMueWVhciwgdmFsdWUgKyAxKTtcbiAgICAgICAgdGFyZ2V0TW9udGguc2V0RGF0ZSgwKTtcbiAgICAgICAgY29uc3QgZW5kT2ZNb250aCA9IHRhcmdldE1vbnRoLmdldERhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZSA+IGVuZE9mTW9udGgpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGVuZE9mTW9udGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRNb250aCh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0d28gZGlnaXQsIGh1bWFuIGV4cGVjdGVkIG1vbnRoLiBFLmcuIEphbnVhcnkgPSAxLCBEZWNlbWJlciA9IDEyXG4gICAgICovXG4gICAgZ2V0IG1vbnRoRm9ybWF0dGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cyh1bmRlZmluZWQsIHR3b0RpZ2l0VGVtcGxhdGUpLm1vbnRoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgKi9cbiAgICBnZXQgeWVhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnVsbFllYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5zZXRGdWxsWWVhcigpXG4gICAgICovXG4gICAgc2V0IHllYXIodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRGdWxsWWVhcih2YWx1ZSk7XG4gICAgfVxuICAgIC8vIGJvcnJvd2VkIGEgYnVuY2ggb2Ygc3R1ZmYgZnJvbSBMdXhvblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHdlZWsgb2YgdGhlIHllYXJcbiAgICAgKi9cbiAgICBnZXQgd2VlaygpIHtcbiAgICAgICAgY29uc3Qgb3JkaW5hbCA9IHRoaXMuY29tcHV0ZU9yZGluYWwoKSwgd2Vla2RheSA9IHRoaXMuZ2V0VVRDRGF5KCk7XG4gICAgICAgIGxldCB3ZWVrTnVtYmVyID0gTWF0aC5mbG9vcigob3JkaW5hbCAtIHdlZWtkYXkgKyAxMCkgLyA3KTtcbiAgICAgICAgaWYgKHdlZWtOdW1iZXIgPCAxKSB7XG4gICAgICAgICAgICB3ZWVrTnVtYmVyID0gdGhpcy53ZWVrc0luV2Vla1llYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh3ZWVrTnVtYmVyID4gdGhpcy53ZWVrc0luV2Vla1llYXIoKSkge1xuICAgICAgICAgICAgd2Vla051bWJlciA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdlZWtOdW1iZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiB3ZWVrcyBpbiB0aGUgeWVhclxuICAgICAqL1xuICAgIHdlZWtzSW5XZWVrWWVhcigpIHtcbiAgICAgICAgY29uc3QgcDEgPSAodGhpcy55ZWFyICtcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy55ZWFyIC8gNCkgLVxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLnllYXIgLyAxMDApICtcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy55ZWFyIC8gNDAwKSkgJVxuICAgICAgICAgICAgNywgbGFzdCA9IHRoaXMueWVhciAtIDEsIHAyID0gKGxhc3QgK1xuICAgICAgICAgICAgTWF0aC5mbG9vcihsYXN0IC8gNCkgLVxuICAgICAgICAgICAgTWF0aC5mbG9vcihsYXN0IC8gMTAwKSArXG4gICAgICAgICAgICBNYXRoLmZsb29yKGxhc3QgLyA0MDApKSAlXG4gICAgICAgICAgICA3O1xuICAgICAgICByZXR1cm4gcDEgPT09IDQgfHwgcDIgPT09IDMgPyA1MyA6IDUyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIGlmIHRoZSB5ZWFyIGlzIGEgbGVhcCB5ZWFyIG9yIG5vdC5cbiAgICAgKi9cbiAgICBnZXQgaXNMZWFwWWVhcigpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnllYXIgJSA0ID09PSAwICYmICh0aGlzLnllYXIgJSAxMDAgIT09IDAgfHwgdGhpcy55ZWFyICUgNDAwID09PSAwKSk7XG4gICAgfVxuICAgIGNvbXB1dGVPcmRpbmFsKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZSArXG4gICAgICAgICAgICAodGhpcy5pc0xlYXBZZWFyID8gdGhpcy5sZWFwTGFkZGVyIDogdGhpcy5ub25MZWFwTGFkZGVyKVt0aGlzLm1vbnRoXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIG1vbnRoIHZhbHVlcyBiYXNlZCBvbiB0aGUgY3VycmVudCBsb2NhbGVcbiAgICAgKi9cbiAgICBnZXRBbGxNb250aHMoZm9ybWF0ID0gJ2xvbmcnKSB7XG4gICAgICAgIGNvbnN0IGFwcGx5Rm9ybWF0ID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlLCB7XG4gICAgICAgICAgICBtb250aDogZm9ybWF0LFxuICAgICAgICB9KS5mb3JtYXQ7XG4gICAgICAgIHJldHVybiBbLi4uQXJyYXkoMTIpLmtleXMoKV0ubWFwKChtKSA9PiBhcHBseUZvcm1hdChuZXcgRGF0ZSgyMDIxLCBtKSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBhbiBleHBhbmRlZCB0b2tlbiBzZXQgKGUuZy4gTFQvTFRTKVxuICAgICAqL1xuICAgIHJlcGxhY2VUb2tlbnMoZm9ybWF0U3RyLCBmb3JtYXRzKSB7XG4gICAgICAgIC8qKipcbiAgICAgICAgICogXyA9PiBtYXRjaFxuICAgICAgICAgKiBhID0+IGZpcnN0IGNhcHR1cmUgZ3JvdXAuIEFueXRoaW5nIGJldHdlZW4gWyBhbmQgXVxuICAgICAgICAgKiBiID0+IHNlY29uZCBjYXB0dXJlIGdyb3VwXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZm9ybWF0U3RyLnJlcGxhY2UoLyhcXFtbXltcXF1dKl0pfChMVFM/fGx7MSw0fXxMezEsNH0pL2csIChfLCBhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBCID0gYiAmJiBiLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICByZXR1cm4gYSB8fCBmb3JtYXRzW0JdIHx8IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5kYXRlRm9ybWF0c1tCXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KSB7XG4gICAgICAgIGlucHV0ID0gK2lucHV0O1xuICAgICAgICByZXR1cm4gaW5wdXQgKyAoaW5wdXQgPiA2OCA/IDE5MDAgOiAyMDAwKTtcbiAgICB9XG4gICAgb2Zmc2V0RnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFzdHJpbmcpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgaWYgKHN0cmluZyA9PT0gJ1onKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGNvbnN0IFtmaXJzdCwgc2Vjb25kLCB0aGlyZF0gPSBzdHJpbmcubWF0Y2goLyhbKy1dfFxcZFxcZCkvZyk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSArKHNlY29uZCAqIDYwKSArICgrdGhpcmQgfHwgMCk7XG4gICAgICAgIGNvbnN0IHNpZ25lZCA9IGZpcnN0ID09PSAnKycgPyAtbWludXRlcyA6IG1pbnV0ZXM7XG4gICAgICAgIHJldHVybiBtaW51dGVzID09PSAwID8gMCA6IHNpZ25lZDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgIH1cbiAgICAvKipcbiAgICAgKiB6ID0gLTQsIHp6ID0gLTA0LCB6enogPSAtMDQwMFxuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICogQHBhcmFtIHN0eWxlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB6b25lSW5mb3JtYXRpb24oZGF0ZSwgc3R5bGUpIHtcbiAgICAgICAgbGV0IG5hbWUgPSBkYXRlXG4gICAgICAgICAgICAucGFydHModGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlLCB7IHRpbWVab25lTmFtZTogJ2xvbmdPZmZzZXQnIH0pXG4gICAgICAgICAgICAudGltZVpvbmVOYW1lLnJlcGxhY2UoJ0dNVCcsICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoJzonLCAnJyk7XG4gICAgICAgIGNvbnN0IG5lZ2F0aXZlID0gbmFtZS5pbmNsdWRlcygnLScpO1xuICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKCctJywgJycpO1xuICAgICAgICBpZiAoc3R5bGUgPT09ICd6JylcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZygxLCAyKTtcbiAgICAgICAgZWxzZSBpZiAoc3R5bGUgPT09ICd6eicpXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMCwgMik7XG4gICAgICAgIHJldHVybiBgJHtuZWdhdGl2ZSA/ICctJyA6ICcnfSR7bmFtZX1gO1xuICAgIH1cbiAgICBhZGRJbnB1dChwcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4gKHRpbWUsIGlucHV0KSA9PiB7XG4gICAgICAgICAgICB0aW1lW3Byb3BlcnR5XSA9ICtpbnB1dDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbWVyaWRpZW1NYXRjaChpbnB1dCkge1xuICAgICAgICBjb25zdCBtZXJpZGllbSA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSwge1xuICAgICAgICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgICAgICAgaG91cjEyOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgICAgICAgLmZvcm1hdFRvUGFydHMobmV3IERhdGUoMjAyMiwgMywgNCwgMTMpKVxuICAgICAgICAgICAgLmZpbmQoKHApID0+IHAudHlwZSA9PT0gJ2RheVBlcmlvZCcpPy52YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlucHV0LnRvTG93ZXJDYXNlKCkgPT09IG1lcmlkaWVtLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIGNvcnJlY3RIb3Vycyh0aW1lKSB7XG4gICAgICAgIGNvbnN0IHsgYWZ0ZXJub29uIH0gPSB0aW1lO1xuICAgICAgICBpZiAoYWZ0ZXJub29uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgaG91cnMgfSA9IHRpbWU7XG4gICAgICAgICAgICBpZiAoYWZ0ZXJub29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXJzIDwgMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZS5ob3VycyArPSAxMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICB0aW1lLmhvdXJzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSB0aW1lLmFmdGVybm9vbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtYWtlUGFyc2VyKGZvcm1hdCkge1xuICAgICAgICBmb3JtYXQgPSB0aGlzLnJlcGxhY2VUb2tlbnMoZm9ybWF0LCB0aGlzLmxvY2FsaXphdGlvbi5kYXRlRm9ybWF0cyk7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gZm9ybWF0Lm1hdGNoKHRoaXMuZm9ybWF0dGluZ1Rva2Vucyk7XG4gICAgICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBhcnJheTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBhcnJheVtpXTtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlVG8gPSB0aGlzLmV4cHJlc3Npb25zW3Rva2VuXTtcbiAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gcGFyc2VUbyAmJiBwYXJzZVRvWzBdO1xuICAgICAgICAgICAgY29uc3QgcGFyc2VyID0gcGFyc2VUbyAmJiBwYXJzZVRvWzFdO1xuICAgICAgICAgICAgaWYgKHBhcnNlcikge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0geyByZWdleCwgcGFyc2VyIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IHRva2VuLnJlcGxhY2UoL15cXFtbXltcXF1dKl0kL2csICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGlucHV0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0ge1xuICAgICAgICAgICAgICAgIGhvdXJzOiAwLFxuICAgICAgICAgICAgICAgIG1pbnV0ZXM6IDAsXG4gICAgICAgICAgICAgICAgc2Vjb25kczogMCxcbiAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHM6IDAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIHN0YXJ0ID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBhcnJheVtpXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBzdGFydCArPSB0b2tlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHJlZ2V4LCBwYXJzZXIgfSA9IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0ID0gaW5wdXQuc2xpY2Uoc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWMocGFydCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlci5jYWxsKHRoaXMsIHRpbWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKHZhbHVlLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb3JyZWN0SG91cnModGltZSk7XG4gICAgICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gY3JlYXRlIGEgRGF0ZVRpbWUgZnJvbSBhIHN0cmluZy5cbiAgICAgKiBAcGFyYW0gaW5wdXQgZGF0ZSBhcyBzdHJpbmdcbiAgICAgKiBAcGFyYW0gbG9jYWxpemF0aW9uIHByb3ZpZGVzIHRoZSBkYXRlIHRlbXBsYXRlIHRoZSBzdHJpbmcgaXMgaW4gdmlhIHRoZSBmb3JtYXQgcHJvcGVydHlcbiAgICAgKi9cbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBzdGF0aWMgZnJvbVN0cmluZyhpbnB1dCwgbG9jYWxpemF0aW9uKSB7XG4gICAgICAgIGlmICghbG9jYWxpemF0aW9uPy5mb3JtYXQpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmN1c3RvbURhdGVGb3JtYXRFcnJvcignTm8gZm9ybWF0IHdhcyBwcm92aWRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBkdCA9IG5ldyBEYXRlVGltZSgpO1xuICAgICAgICAgICAgZHQuc2V0TG9jYWxpemF0aW9uKGxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICBpZiAoWyd4JywgJ1gnXS5pbmRleE9mKGxvY2FsaXphdGlvbi5mb3JtYXQpID4gLTEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZSgobG9jYWxpemF0aW9uLmZvcm1hdCA9PT0gJ1gnID8gMTAwMCA6IDEpICogK2lucHV0KTtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlciA9IGR0Lm1ha2VQYXJzZXIobG9jYWxpemF0aW9uLmZvcm1hdCk7XG4gICAgICAgICAgICBjb25zdCB7IHllYXIsIG1vbnRoLCBkYXksIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMsIHpvbmUgfSA9IHBhcnNlcihpbnB1dCk7XG4gICAgICAgICAgICBjb25zdCBkID0gZGF5IHx8ICgheWVhciAmJiAhbW9udGggPyBkdC5nZXREYXRlKCkgOiAxKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB5ZWFyIHx8IGR0LmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICBsZXQgTSA9IDA7XG4gICAgICAgICAgICBpZiAoISh5ZWFyICYmICFtb250aCkpIHtcbiAgICAgICAgICAgICAgICBNID0gbW9udGggPiAwID8gbW9udGggLSAxIDogZHQuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh6b25lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZShEYXRlLlVUQyh5LCBNLCBkLCBob3VycywgbWludXRlcywgc2Vjb25kcywgbWlsbGlzZWNvbmRzICsgem9uZS5vZmZzZXQgKiA2MCAqIDEwMDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoeSwgTSwgZCwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmN1c3RvbURhdGVGb3JtYXRFcnJvcihgVW5hYmxlIHRvIHBhcnNlIHByb3ZpZGVkIGlucHV0OiAke2lucHV0fSwgZm9ybWF0OiAke2xvY2FsaXphdGlvbi5mb3JtYXR9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyBmb3JtYXQuXG4gICAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0ludGwvRGF0ZVRpbWVGb3JtYXRcbiAgICAgKiBmb3IgdmFsaWQgdGVtcGxhdGVzIGFuZCBsb2NhbGUgb2JqZWN0c1xuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSBBbiBvcHRpb25hbCBvYmplY3QuIElmIHByb3ZpZGVkLCBtZXRob2Qgd2lsbCB1c2UgSW50bC4sIG90aGVyd2lzZSB0aGUgbG9jYWxpemF0aW9ucyBmb3JtYXQgcHJvcGVydGllc1xuICAgICAqIEBwYXJhbSBsb2NhbGUgQ2FuIGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MuIFVzZXMgYnJvd3NlciBkZWZhdWx0cyBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZm9ybWF0KHRlbXBsYXRlLCBsb2NhbGUgPSB0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUpIHtcbiAgICAgICAgaWYgKHRlbXBsYXRlICYmIHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB0ZW1wbGF0ZSkuZm9ybWF0KHRoaXMpO1xuICAgICAgICBjb25zdCBmb3JtYXRTdHJpbmcgPSB0aGlzLnJlcGxhY2VUb2tlbnMoXG4gICAgICAgIC8vdHJ5IHRlbXBsYXRlIGZpcnN0XG4gICAgICAgIHRlbXBsYXRlIHx8XG4gICAgICAgICAgICAvL290aGVyd2lzZSB0cnkgbG9jYWxpemF0aW9uIGZvcm1hdFxuICAgICAgICAgICAgdGhpcy5sb2NhbGl6YXRpb24uZm9ybWF0IHx8XG4gICAgICAgICAgICAvL290aGVyd2lzZSB0cnkgZGF0ZSArIHRpbWVcbiAgICAgICAgICAgIGAke0RlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5kYXRlRm9ybWF0cy5MfSwgJHtEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEuZGF0ZUZvcm1hdHMuTFR9YCwgdGhpcy5sb2NhbGl6YXRpb24uZGF0ZUZvcm1hdHMpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSAodGVtcGxhdGUpID0+IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSwgdGVtcGxhdGUpLmZvcm1hdCh0aGlzKTtcbiAgICAgICAgaWYgKCF0aGlzLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUpXG4gICAgICAgICAgICB0aGlzLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUgPSBndWVzc0hvdXJDeWNsZSh0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUpO1xuICAgICAgICAvL2lmIHRoZSBmb3JtYXQgYXNrcyBmb3IgYSB0d2VudHktZm91ci1ob3VyIHN0cmluZyBidXQgdGhlIGhvdXIgY3ljbGUgaXMgbm90LCB0aGVuIG1ha2UgYSBiYXNlIGd1ZXNzXG4gICAgICAgIGNvbnN0IEhIQ3ljbGUgPSB0aGlzLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUuc3RhcnRzV2l0aCgnaDEnKVxuICAgICAgICAgICAgPyAnaDI0J1xuICAgICAgICAgICAgOiB0aGlzLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGU7XG4gICAgICAgIGNvbnN0IGhoQ3ljbGUgPSB0aGlzLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUuc3RhcnRzV2l0aCgnaDInKVxuICAgICAgICAgICAgPyAnaDEyJ1xuICAgICAgICAgICAgOiB0aGlzLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGU7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB7XG4gICAgICAgICAgICB5eTogZm9ybWF0dGVyKHsgeWVhcjogJzItZGlnaXQnIH0pLFxuICAgICAgICAgICAgeXl5eTogdGhpcy55ZWFyLFxuICAgICAgICAgICAgTTogZm9ybWF0dGVyKHsgbW9udGg6ICdudW1lcmljJyB9KSxcbiAgICAgICAgICAgIE1NOiB0aGlzLm1vbnRoRm9ybWF0dGVkLFxuICAgICAgICAgICAgTU1NOiB0aGlzLmdldEFsbE1vbnRocygnc2hvcnQnKVt0aGlzLmdldE1vbnRoKCldLFxuICAgICAgICAgICAgTU1NTTogdGhpcy5nZXRBbGxNb250aHMoKVt0aGlzLmdldE1vbnRoKCldLFxuICAgICAgICAgICAgZDogdGhpcy5kYXRlLFxuICAgICAgICAgICAgZGQ6IHRoaXMuZGF0ZUZvcm1hdHRlZCxcbiAgICAgICAgICAgIGRkZDogZm9ybWF0dGVyKHsgd2Vla2RheTogJ3Nob3J0JyB9KSxcbiAgICAgICAgICAgIGRkZGQ6IGZvcm1hdHRlcih7IHdlZWtkYXk6ICdsb25nJyB9KSxcbiAgICAgICAgICAgIEg6IHRoaXMuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgIEhIOiB0aGlzLmdldEhvdXJzRm9ybWF0dGVkKEhIQ3ljbGUpLFxuICAgICAgICAgICAgaDogdGhpcy5ob3VycyA+IDEyID8gdGhpcy5ob3VycyAtIDEyIDogdGhpcy5ob3VycyxcbiAgICAgICAgICAgIGhoOiB0aGlzLmdldEhvdXJzRm9ybWF0dGVkKGhoQ3ljbGUpLFxuICAgICAgICAgICAgdDogdGhpcy5tZXJpZGllbSgpLFxuICAgICAgICAgICAgVDogdGhpcy5tZXJpZGllbSgpLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICBtOiB0aGlzLm1pbnV0ZXMsXG4gICAgICAgICAgICBtbTogdGhpcy5taW51dGVzRm9ybWF0dGVkLFxuICAgICAgICAgICAgczogdGhpcy5zZWNvbmRzLFxuICAgICAgICAgICAgc3M6IHRoaXMuc2Vjb25kc0Zvcm1hdHRlZCxcbiAgICAgICAgICAgIGZmZjogdGhpcy5nZXRNaWxsaXNlY29uZHMoKSxcbiAgICAgICAgICAgIC8vIHo6IHRoaXMuem9uZUluZm9ybWF0aW9uKGRhdGVUaW1lLCAneicpLCAvLy00XG4gICAgICAgICAgICAvLyB6ejogdGhpcy56b25lSW5mb3JtYXRpb24oZGF0ZVRpbWUsICd6eicpLCAvLy0wNFxuICAgICAgICAgICAgLy8genp6OiB0aGlzLnpvbmVJbmZvcm1hdGlvbihkYXRlVGltZSwgJ3p6eicpIC8vLTA0MDBcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZvcm1hdFN0cmluZ1xuICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5kYXRlVGltZVJlZ2V4LCAobWF0Y2gsICQxKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJDEgfHwgbWF0Y2hlc1ttYXRjaF07XG4gICAgICAgIH0pXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxbL2csICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL10vZywgJycpO1xuICAgIH1cbn1cblxuY2xhc3MgU2VydmljZUxvY2F0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBsb2NhdGUoaWRlbnRpZmllcikge1xuICAgICAgICBjb25zdCBzZXJ2aWNlID0gdGhpcy5jYWNoZS5nZXQoaWRlbnRpZmllcik7XG4gICAgICAgIGlmIChzZXJ2aWNlKVxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gbmV3IGlkZW50aWZpZXIoKTtcbiAgICAgICAgdGhpcy5jYWNoZS5zZXQoaWRlbnRpZmllciwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuY29uc3Qgc2V0dXBTZXJ2aWNlTG9jYXRvciA9ICgpID0+IHtcbiAgICBzZXJ2aWNlTG9jYXRvciA9IG5ldyBTZXJ2aWNlTG9jYXRvcigpO1xufTtcbmxldCBzZXJ2aWNlTG9jYXRvcjtcblxuY29uc3QgQ2FsZW5kYXJNb2RlcyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdjYWxlbmRhcicsXG4gICAgICAgIGNsYXNzTmFtZTogTmFtZXNwYWNlLmNzcy5kYXlzQ29udGFpbmVyLFxuICAgICAgICB1bml0OiBVbml0Lm1vbnRoLFxuICAgICAgICBzdGVwOiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnbW9udGhzJyxcbiAgICAgICAgY2xhc3NOYW1lOiBOYW1lc3BhY2UuY3NzLm1vbnRoc0NvbnRhaW5lcixcbiAgICAgICAgdW5pdDogVW5pdC55ZWFyLFxuICAgICAgICBzdGVwOiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAneWVhcnMnLFxuICAgICAgICBjbGFzc05hbWU6IE5hbWVzcGFjZS5jc3MueWVhcnNDb250YWluZXIsXG4gICAgICAgIHVuaXQ6IFVuaXQueWVhcixcbiAgICAgICAgc3RlcDogMTAsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdkZWNhZGVzJyxcbiAgICAgICAgY2xhc3NOYW1lOiBOYW1lc3BhY2UuY3NzLmRlY2FkZXNDb250YWluZXIsXG4gICAgICAgIHVuaXQ6IFVuaXQueWVhcixcbiAgICAgICAgc3RlcDogMTAwLFxuICAgIH0sXG5dO1xuXG5jbGFzcyBPcHRpb25zU3RvcmUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9IDA7XG4gICAgICAgIHRoaXMuX3ZpZXdEYXRlID0gbmV3IERhdGVUaW1lKCk7XG4gICAgICAgIHRoaXMubWluaW11bUNhbGVuZGFyVmlld01vZGUgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gJ2NhbGVuZGFyJztcbiAgICB9XG4gICAgZ2V0IGN1cnJlbnRDYWxlbmRhclZpZXdNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudENhbGVuZGFyVmlld01vZGU7XG4gICAgfVxuICAgIHNldCBjdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gQ2FsZW5kYXJNb2Rlc1t2YWx1ZV0ubmFtZTtcbiAgICB9XG4gICAgZ2V0IHZpZXdEYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlld0RhdGU7XG4gICAgfVxuICAgIHNldCB2aWV3RGF0ZSh2KSB7XG4gICAgICAgIHRoaXMuX3ZpZXdEYXRlID0gdjtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucylcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy52aWV3RGF0ZSA9IHY7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZW4gc3dpdGNoaW5nIGJhY2sgdG8gdGhlIGNhbGVuZGFyIGZyb20gdGhlIGNsb2NrLFxuICAgICAqIHRoaXMgc2V0cyBjdXJyZW50VmlldyB0byB0aGUgY29ycmVjdCBjYWxlbmRhciB2aWV3LlxuICAgICAqL1xuICAgIHJlZnJlc2hDdXJyZW50VmlldygpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IENhbGVuZGFyTW9kZXNbdGhpcy5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZV0ubmFtZTtcbiAgICB9XG4gICAgZ2V0IGlzVHdlbHZlSG91cigpIHtcbiAgICAgICAgcmV0dXJuIFsnaDEyJywgJ2gxMSddLmluY2x1ZGVzKHRoaXMub3B0aW9ucy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlKTtcbiAgICB9XG59XG5cbi8qKlxuICogTWFpbiBjbGFzcyBmb3IgZGF0ZSB2YWxpZGF0aW9uIHJ1bGVzIGJhc2VkIG9uIHRoZSBvcHRpb25zIHByb3ZpZGVkLlxuICovXG5jbGFzcyBWYWxpZGF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgdGFyZ2V0IGRhdGUgaXMgdmFsaWQgYmFzZWQgb24gdGhlIHJ1bGVzIHByb3ZpZGVkIGluIHRoZSBvcHRpb25zLlxuICAgICAqIEdyYW51bGFyaXR5IGNhbiBiZSBwcm92aWRlZCB0byBjaGVjayBwb3J0aW9ucyBvZiB0aGUgZGF0ZSBpbnN0ZWFkIG9mIHRoZSB3aG9sZS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0RGF0ZVxuICAgICAqIEBwYXJhbSBncmFudWxhcml0eVxuICAgICAqL1xuICAgIGlzVmFsaWQodGFyZ2V0RGF0ZSwgZ3JhbnVsYXJpdHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVkRGlzYWJsZWREYXRlc0lzVmFsaWQoZ3JhbnVsYXJpdHksIHRhcmdldERhdGUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZ3JhbnVsYXJpdHkgIT09IFVuaXQubW9udGggJiZcbiAgICAgICAgICAgIGdyYW51bGFyaXR5ICE9PSBVbml0LnllYXIgJiZcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRheXNPZldlZWtEaXNhYmxlZD8ubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGF5c09mV2Vla0Rpc2FibGVkLmluZGV4T2YodGFyZ2V0RGF0ZS53ZWVrRGF5KSAhPT0gLTEpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5fbWluTWF4SXNWYWxpZChncmFudWxhcml0eSwgdGFyZ2V0RGF0ZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChncmFudWxhcml0eSA9PT0gVW5pdC5ob3VycyB8fFxuICAgICAgICAgICAgZ3JhbnVsYXJpdHkgPT09IFVuaXQubWludXRlcyB8fFxuICAgICAgICAgICAgZ3JhbnVsYXJpdHkgPT09IFVuaXQuc2Vjb25kcykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVkRGlzYWJsZWRIb3Vyc0lzVmFsaWQodGFyZ2V0RGF0ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkVGltZUludGVydmFscz8uZmlsdGVyKChpbnRlcm5hbCkgPT4gdGFyZ2V0RGF0ZS5pc0JldHdlZW4oaW50ZXJuYWwuZnJvbSwgaW50ZXJuYWwudG8pKS5sZW5ndGggIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBfZW5hYmxlZERpc2FibGVkRGF0ZXNJc1ZhbGlkKGdyYW51bGFyaXR5LCB0YXJnZXREYXRlKSB7XG4gICAgICAgIGlmIChncmFudWxhcml0eSAhPT0gVW5pdC5kYXRlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZERhdGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgIHRoaXMuX2lzSW5EaXNhYmxlZERhdGVzKHRhcmdldERhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFJlZHVuZGFudElmU3RhdGVtZW50SlNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWREYXRlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAhdGhpcy5faXNJbkVuYWJsZWREYXRlcyh0YXJnZXREYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBkaXNhYmxlZERhdGVzIG9wdGlvbiBpcyBpbiB1c2UgYW5kIHJldHVybnMgdHJ1ZSAobWVhbmluZyBpbnZhbGlkKVxuICAgICAqIGlmIHRoZSBgdGVzdERhdGVgIGlzIHdpdGggaW4gdGhlIGFycmF5LiBHcmFudWxhcml0eSBpcyBieSBkYXRlLlxuICAgICAqIEBwYXJhbSB0ZXN0RGF0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzSW5EaXNhYmxlZERhdGVzKHRlc3REYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWREYXRlcyB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWREYXRlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiAhIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkRGF0ZXMuZmluZCgoeCkgPT4geC5pc1NhbWUodGVzdERhdGUsIFVuaXQuZGF0ZSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBlbmFibGVkRGF0ZXMgb3B0aW9uIGlzIGluIHVzZSBhbmQgcmV0dXJucyB0cnVlIChtZWFuaW5nIHZhbGlkKVxuICAgICAqIGlmIHRoZSBgdGVzdERhdGVgIGlzIHdpdGggaW4gdGhlIGFycmF5LiBHcmFudWxhcml0eSBpcyBieSBkYXRlLlxuICAgICAqIEBwYXJhbSB0ZXN0RGF0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzSW5FbmFibGVkRGF0ZXModGVzdERhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkRGF0ZXMgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWREYXRlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZERhdGVzLmZpbmQoKHgpID0+IHguaXNTYW1lKHRlc3REYXRlLCBVbml0LmRhdGUpKTtcbiAgICB9XG4gICAgX21pbk1heElzVmFsaWQoZ3JhbnVsYXJpdHksIHRhcmdldERhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLm1pbkRhdGUgJiZcbiAgICAgICAgICAgIHRhcmdldERhdGUuaXNCZWZvcmUodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMubWluRGF0ZSwgZ3JhbnVsYXJpdHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFJlZHVuZGFudElmU3RhdGVtZW50SlNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLm1heERhdGUgJiZcbiAgICAgICAgICAgIHRhcmdldERhdGUuaXNBZnRlcih0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5tYXhEYXRlLCBncmFudWxhcml0eSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgX2VuYWJsZWREaXNhYmxlZEhvdXJzSXNWYWxpZCh0YXJnZXREYXRlKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZEhvdXJzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgIHRoaXMuX2lzSW5EaXNhYmxlZEhvdXJzKHRhcmdldERhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFJlZHVuZGFudElmU3RhdGVtZW50SlNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWRIb3Vycy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAhdGhpcy5faXNJbkVuYWJsZWRIb3Vycyh0YXJnZXREYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBkaXNhYmxlZEhvdXJzIG9wdGlvbiBpcyBpbiB1c2UgYW5kIHJldHVybnMgdHJ1ZSAobWVhbmluZyBpbnZhbGlkKVxuICAgICAqIGlmIHRoZSBgdGVzdERhdGVgIGlzIHdpdGggaW4gdGhlIGFycmF5LiBHcmFudWxhcml0eSBpcyBieSBob3Vycy5cbiAgICAgKiBAcGFyYW0gdGVzdERhdGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0luRGlzYWJsZWRIb3Vycyh0ZXN0RGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkSG91cnMgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkSG91cnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gdGVzdERhdGUuaG91cnM7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZEhvdXJzLmluY2x1ZGVzKGZvcm1hdHRlZERhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBlbmFibGVkSG91cnMgb3B0aW9uIGlzIGluIHVzZSBhbmQgcmV0dXJucyB0cnVlIChtZWFuaW5nIHZhbGlkKVxuICAgICAqIGlmIHRoZSBgdGVzdERhdGVgIGlzIHdpdGggaW4gdGhlIGFycmF5LiBHcmFudWxhcml0eSBpcyBieSBob3Vycy5cbiAgICAgKiBAcGFyYW0gdGVzdERhdGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0luRW5hYmxlZEhvdXJzKHRlc3REYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZEhvdXJzIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkSG91cnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSB0ZXN0RGF0ZS5ob3VycztcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWRIb3Vycy5pbmNsdWRlcyhmb3JtYXR0ZWREYXRlKTtcbiAgICB9XG4gICAgZGF0ZVJhbmdlSXNWYWxpZChkYXRlcywgaW5kZXgsIHRhcmdldCkge1xuICAgICAgICAvLyBpZiB3ZSdyZSBub3QgdXNpbmcgdGhlIG9wdGlvbiwgdGhlbiByZXR1cm4gdmFsaWRcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyBpZiB3ZSd2ZSBvbmx5IHNlbGVjdGVkIDAuLjEgZGF0ZXMsIGFuZCB3ZSdyZSBub3Qgc2V0dGluZyB0aGUgZW5kIGRhdGVcbiAgICAgICAgLy8gdGhlbiByZXR1cm4gdmFsaWQuIFdlIG9ubHkgd2FudCB0byB2YWxpZGF0ZSB0aGUgcmFuZ2UgaWYgYm90aCBhcmUgc2VsZWN0ZWQsXG4gICAgICAgIC8vIGJlY2F1c2UgdGhlIG90aGVyIHZhbGlkYXRpb24gb24gdGhlIHRhcmdldCBoYXMgYWxyZWFkeSBvY2N1cnJlZC5cbiAgICAgICAgaWYgKGRhdGVzLmxlbmd0aCAhPT0gMiAmJiBpbmRleCAhPT0gMSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyBpbml0aWFsaXplIHN0YXJ0IGRhdGVcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBkYXRlc1swXS5jbG9uZTtcbiAgICAgICAgLy8gY2hlY2sgaWYgc3RhcnQgZGF0ZSBpcyBub3QgdGhlIHNhbWUgYXMgdGFyZ2V0IGRhdGVcbiAgICAgICAgaWYgKHN0YXJ0LmlzU2FtZSh0YXJnZXQsIFVuaXQuZGF0ZSkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gYWRkIG9uZSBkYXkgdG8gc3RhcnQ7IHN0YXJ0IGhhcyBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkXG4gICAgICAgIHN0YXJ0Lm1hbmlwdWxhdGUoMSwgVW5pdC5kYXRlKTtcbiAgICAgICAgLy8gY2hlY2sgZWFjaCBkYXRlIGluIHRoZSByYW5nZSB0byBtYWtlIHN1cmUgaXQncyB2YWxpZFxuICAgICAgICB3aGlsZSAoIXN0YXJ0LmlzU2FtZSh0YXJnZXQsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy5pc1ZhbGlkKHN0YXJ0LCBVbml0LmRhdGUpO1xuICAgICAgICAgICAgaWYgKCF2YWxpZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBzdGFydC5tYW5pcHVsYXRlKDEsIFVuaXQuZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5jbGFzcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gW107XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcy51bnN1YnNjcmliZS5iaW5kKHRoaXMsIHRoaXMuc3Vic2NyaWJlcnMubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgZW1pdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycyA9IFtdO1xuICAgIH1cbn1cbmNsYXNzIEV2ZW50RW1pdHRlcnMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy52aWV3VXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXdEYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIH1cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudmlld1VwZGF0ZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlzcGxheS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuYWN0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3RGF0ZS5kZXN0cm95KCk7XG4gICAgfVxufVxuXG5jb25zdCBkZWZhdWx0RW5Mb2NhbGl6YXRpb24gPSB7XG4gICAgY2xlYXI6ICdDbGVhciBzZWxlY3Rpb24nLFxuICAgIGNsb3NlOiAnQ2xvc2UgdGhlIHBpY2tlcicsXG4gICAgZGF0ZUZvcm1hdHM6IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5kYXRlRm9ybWF0cyxcbiAgICBkYXlWaWV3SGVhZGVyRm9ybWF0OiB7IG1vbnRoOiAnbG9uZycsIHllYXI6ICcyLWRpZ2l0JyB9LFxuICAgIGRlY3JlbWVudEhvdXI6ICdEZWNyZW1lbnQgSG91cicsXG4gICAgZGVjcmVtZW50TWludXRlOiAnRGVjcmVtZW50IE1pbnV0ZScsXG4gICAgZGVjcmVtZW50U2Vjb25kOiAnRGVjcmVtZW50IFNlY29uZCcsXG4gICAgZm9ybWF0OiBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEuZm9ybWF0LFxuICAgIGhvdXJDeWNsZTogRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmhvdXJDeWNsZSxcbiAgICBpbmNyZW1lbnRIb3VyOiAnSW5jcmVtZW50IEhvdXInLFxuICAgIGluY3JlbWVudE1pbnV0ZTogJ0luY3JlbWVudCBNaW51dGUnLFxuICAgIGluY3JlbWVudFNlY29uZDogJ0luY3JlbWVudCBTZWNvbmQnLFxuICAgIGxvY2FsZTogRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmxvY2FsZSxcbiAgICBuZXh0Q2VudHVyeTogJ05leHQgQ2VudHVyeScsXG4gICAgbmV4dERlY2FkZTogJ05leHQgRGVjYWRlJyxcbiAgICBuZXh0TW9udGg6ICdOZXh0IE1vbnRoJyxcbiAgICBuZXh0WWVhcjogJ05leHQgWWVhcicsXG4gICAgb3JkaW5hbDogRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLm9yZGluYWwsXG4gICAgcGlja0hvdXI6ICdQaWNrIEhvdXInLFxuICAgIHBpY2tNaW51dGU6ICdQaWNrIE1pbnV0ZScsXG4gICAgcGlja1NlY29uZDogJ1BpY2sgU2Vjb25kJyxcbiAgICBwcmV2aW91c0NlbnR1cnk6ICdQcmV2aW91cyBDZW50dXJ5JyxcbiAgICBwcmV2aW91c0RlY2FkZTogJ1ByZXZpb3VzIERlY2FkZScsXG4gICAgcHJldmlvdXNNb250aDogJ1ByZXZpb3VzIE1vbnRoJyxcbiAgICBwcmV2aW91c1llYXI6ICdQcmV2aW91cyBZZWFyJyxcbiAgICBzZWxlY3REYXRlOiAnU2VsZWN0IERhdGUnLFxuICAgIHNlbGVjdERlY2FkZTogJ1NlbGVjdCBEZWNhZGUnLFxuICAgIHNlbGVjdE1vbnRoOiAnU2VsZWN0IE1vbnRoJyxcbiAgICBzZWxlY3RUaW1lOiAnU2VsZWN0IFRpbWUnLFxuICAgIHNlbGVjdFllYXI6ICdTZWxlY3QgWWVhcicsXG4gICAgc3RhcnRPZlRoZVdlZWs6IDAsXG4gICAgdG9kYXk6ICdHbyB0byB0b2RheScsXG4gICAgdG9nZ2xlTWVyaWRpZW06ICdUb2dnbGUgTWVyaWRpZW0nLFxufTtcbmNvbnN0IERlZmF1bHRPcHRpb25zID0ge1xuICAgIGFsbG93SW5wdXRUb2dnbGU6IGZhbHNlLFxuICAgIGNvbnRhaW5lcjogdW5kZWZpbmVkLFxuICAgIGRhdGVSYW5nZTogZmFsc2UsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIGRlZmF1bHREYXRlOiB1bmRlZmluZWQsXG4gICAgZGlzcGxheToge1xuICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgdHlwZTogJ2ljb25zJyxcbiAgICAgICAgICAgIHRpbWU6ICdmYS1zb2xpZCBmYS1jbG9jaycsXG4gICAgICAgICAgICBkYXRlOiAnZmEtc29saWQgZmEtY2FsZW5kYXInLFxuICAgICAgICAgICAgdXA6ICdmYS1zb2xpZCBmYS1hcnJvdy11cCcsXG4gICAgICAgICAgICBkb3duOiAnZmEtc29saWQgZmEtYXJyb3ctZG93bicsXG4gICAgICAgICAgICBwcmV2aW91czogJ2ZhLXNvbGlkIGZhLWNoZXZyb24tbGVmdCcsXG4gICAgICAgICAgICBuZXh0OiAnZmEtc29saWQgZmEtY2hldnJvbi1yaWdodCcsXG4gICAgICAgICAgICB0b2RheTogJ2ZhLXNvbGlkIGZhLWNhbGVuZGFyLWNoZWNrJyxcbiAgICAgICAgICAgIGNsZWFyOiAnZmEtc29saWQgZmEtdHJhc2gnLFxuICAgICAgICAgICAgY2xvc2U6ICdmYS1zb2xpZCBmYS14bWFyaycsXG4gICAgICAgIH0sXG4gICAgICAgIHNpZGVCeVNpZGU6IGZhbHNlLFxuICAgICAgICBjYWxlbmRhcldlZWtzOiBmYWxzZSxcbiAgICAgICAgdmlld01vZGU6ICdjYWxlbmRhcicsXG4gICAgICAgIHRvb2xiYXJQbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgICAgICBrZWVwT3BlbjogZmFsc2UsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGNsZWFyOiBmYWxzZSxcbiAgICAgICAgICAgIGNsb3NlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgY2FsZW5kYXI6IHRydWUsXG4gICAgICAgICAgICBkYXRlOiB0cnVlLFxuICAgICAgICAgICAgbW9udGg6IHRydWUsXG4gICAgICAgICAgICB5ZWFyOiB0cnVlLFxuICAgICAgICAgICAgZGVjYWRlczogdHJ1ZSxcbiAgICAgICAgICAgIGNsb2NrOiB0cnVlLFxuICAgICAgICAgICAgaG91cnM6IHRydWUsXG4gICAgICAgICAgICBtaW51dGVzOiB0cnVlLFxuICAgICAgICAgICAgc2Vjb25kczogZmFsc2UsXG4gICAgICAgICAgICB1c2VUd2VudHlmb3VySG91cjogdW5kZWZpbmVkLFxuICAgICAgICB9LFxuICAgICAgICBpbmxpbmU6IGZhbHNlLFxuICAgICAgICB0aGVtZTogJ2F1dG8nLFxuICAgICAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgIH0sXG4gICAga2VlcEludmFsaWQ6IGZhbHNlLFxuICAgIGxvY2FsaXphdGlvbjogZGVmYXVsdEVuTG9jYWxpemF0aW9uLFxuICAgIG1ldGE6IHt9LFxuICAgIG11bHRpcGxlRGF0ZXM6IGZhbHNlLFxuICAgIG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6ICc7ICcsXG4gICAgcHJvbXB0VGltZU9uRGF0ZUNoYW5nZTogZmFsc2UsXG4gICAgcHJvbXB0VGltZU9uRGF0ZUNoYW5nZVRyYW5zaXRpb25EZWxheTogMjAwLFxuICAgIHJlc3RyaWN0aW9uczoge1xuICAgICAgICBtaW5EYXRlOiB1bmRlZmluZWQsXG4gICAgICAgIG1heERhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgZGlzYWJsZWREYXRlczogW10sXG4gICAgICAgIGVuYWJsZWREYXRlczogW10sXG4gICAgICAgIGRheXNPZldlZWtEaXNhYmxlZDogW10sXG4gICAgICAgIGRpc2FibGVkVGltZUludGVydmFsczogW10sXG4gICAgICAgIGRpc2FibGVkSG91cnM6IFtdLFxuICAgICAgICBlbmFibGVkSG91cnM6IFtdLFxuICAgIH0sXG4gICAgc3RlcHBpbmc6IDEsXG4gICAgdXNlQ3VycmVudDogdHJ1ZSxcbiAgICB2aWV3RGF0ZTogbmV3IERhdGVUaW1lKCksXG59O1xuY29uc3QgRGVmYXVsdEVuTG9jYWxpemF0aW9uID0geyAuLi5kZWZhdWx0RW5Mb2NhbGl6YXRpb24gfTtcblxuLyoqXG4gKiBBdHRlbXB0cyB0byBwcm92ZSBgZGAgaXMgYSBEYXRlVGltZSBvciBEYXRlIG9yIGNhbiBiZSBjb252ZXJ0ZWQgaW50byBvbmUuXG4gKiBAcGFyYW0gZCBJZiBhIHN0cmluZyB3aWxsIGF0dGVtcHQgY3JlYXRpbmcgYSBkYXRlIGZyb20gaXQuXG4gKiBAcGFyYW0gbG9jYWxpemF0aW9uIG9iamVjdCBjb250YWluaW5nIGxvY2FsZSBhbmQgZm9ybWF0IHNldHRpbmdzLiBPbmx5IHVzZWQgd2l0aCB0aGUgY3VzdG9tIGZvcm1hdHNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHRyeUNvbnZlcnRUb0RhdGVUaW1lKGQsIGxvY2FsaXphdGlvbikge1xuICAgIGlmICghZClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKGQuY29uc3RydWN0b3IubmFtZSA9PT0gRGF0ZVRpbWUubmFtZSlcbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgaWYgKGQuY29uc3RydWN0b3IubmFtZSA9PT0gRGF0ZS5uYW1lKSB7XG4gICAgICAgIHJldHVybiBEYXRlVGltZS5jb252ZXJ0KGQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGQgPT09IHR5cGVvZiAnJykge1xuICAgICAgICBjb25zdCBkYXRlVGltZSA9IERhdGVUaW1lLmZyb21TdHJpbmcoZCwgbG9jYWxpemF0aW9uKTtcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KGRhdGVUaW1lKSA9PT0gJ251bGwnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZVRpbWU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuLyoqXG4gKiBBdHRlbXB0cyB0byBjb252ZXJ0IGBkYCB0byBhIERhdGVUaW1lIG9iamVjdFxuICogQHBhcmFtIGQgdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtIG9wdGlvbk5hbWUgUHJvdmlkZXMgdGV4dCB0byBlcnJvciBtZXNzYWdlcyBlLmcuIGRpc2FibGVkRGF0ZXNcbiAqIEBwYXJhbSBsb2NhbGl6YXRpb24gb2JqZWN0IGNvbnRhaW5pbmcgbG9jYWxlIGFuZCBmb3JtYXQgc2V0dGluZ3MuIE9ubHkgdXNlZCB3aXRoIHRoZSBjdXN0b20gZm9ybWF0c1xuICovXG5mdW5jdGlvbiBjb252ZXJ0VG9EYXRlVGltZShkLCBvcHRpb25OYW1lLCBsb2NhbGl6YXRpb24pIHtcbiAgICBpZiAodHlwZW9mIGQgPT09IHR5cGVvZiAnJyAmJiBvcHRpb25OYW1lICE9PSAnaW5wdXQnKSB7XG4gICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmRhdGVTdHJpbmcoKTtcbiAgICB9XG4gICAgY29uc3QgY29udmVydGVkID0gdHJ5Q29udmVydFRvRGF0ZVRpbWUoZCwgbG9jYWxpemF0aW9uKTtcbiAgICBpZiAoIWNvbnZlcnRlZCkge1xuICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5mYWlsZWRUb1BhcnNlRGF0ZShvcHRpb25OYW1lLCBkLCBvcHRpb25OYW1lID09PSAnaW5wdXQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnZlcnRlZDtcbn1cbi8qKlxuICogVHlwZSBjaGVja3MgdGhhdCBgdmFsdWVgIGlzIGFuIGFycmF5IG9mIERhdGUgb3IgRGF0ZVRpbWVcbiAqIEBwYXJhbSBvcHRpb25OYW1lIFByb3ZpZGVzIHRleHQgdG8gZXJyb3IgbWVzc2FnZXMgZS5nLiBkaXNhYmxlZERhdGVzXG4gKiBAcGFyYW0gdmFsdWUgT3B0aW9uIHZhbHVlXG4gKiBAcGFyYW0gcHJvdmlkZWRUeXBlIFVzZWQgdG8gcHJvdmlkZSB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzXG4gKiBAcGFyYW0gbG9jYWxpemF0aW9uXG4gKi9cbmZ1bmN0aW9uIHR5cGVDaGVja0RhdGVBcnJheShvcHRpb25OYW1lLCB2YWx1ZSwgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbnByb3ZpZGVkVHlwZSwgbG9jYWxpemF0aW9uID0gRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy50eXBlTWlzbWF0Y2gob3B0aW9uTmFtZSwgcHJvdmlkZWRUeXBlLCAnYXJyYXkgb2YgRGF0ZVRpbWUgb3IgRGF0ZScpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGQgPSB2YWx1ZVtpXTtcbiAgICAgICAgY29uc3QgZGF0ZVRpbWUgPSBjb252ZXJ0VG9EYXRlVGltZShkLCBvcHRpb25OYW1lLCBsb2NhbGl6YXRpb24pO1xuICAgICAgICBkYXRlVGltZS5zZXRMb2NhbGl6YXRpb24obG9jYWxpemF0aW9uKTtcbiAgICAgICAgdmFsdWVbaV0gPSBkYXRlVGltZTtcbiAgICB9XG59XG4vKipcbiAqIFR5cGUgY2hlY2tzIHRoYXQgYHZhbHVlYCBpcyBhbiBhcnJheSBvZiBudW1iZXJzXG4gKiBAcGFyYW0gb3B0aW9uTmFtZSBQcm92aWRlcyB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzIGUuZy4gZGlzYWJsZWREYXRlc1xuICogQHBhcmFtIHZhbHVlIE9wdGlvbiB2YWx1ZVxuICogQHBhcmFtIHByb3ZpZGVkVHlwZSBVc2VkIHRvIHByb3ZpZGUgdGV4dCB0byBlcnJvciBtZXNzYWdlc1xuICovXG5mdW5jdGlvbiB0eXBlQ2hlY2tOdW1iZXJBcnJheShvcHRpb25OYW1lLCB2YWx1ZSwgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbnByb3ZpZGVkVHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUuc29tZSgoeCkgPT4gdHlwZW9mIHggIT09IHR5cGVvZiAwKSkge1xuICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy50eXBlTWlzbWF0Y2gob3B0aW9uTmFtZSwgcHJvdmlkZWRUeXBlLCAnYXJyYXkgb2YgbnVtYmVycycpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFuZGF0b3J5RGF0ZShrZXkpIHtcbiAgICByZXR1cm4gKHsgdmFsdWUsIHByb3ZpZGVkVHlwZSwgbG9jYWxpemF0aW9uIH0pID0+IHtcbiAgICAgICAgY29uc3QgZGF0ZVRpbWUgPSBjb252ZXJ0VG9EYXRlVGltZSh2YWx1ZSwga2V5LCBsb2NhbGl6YXRpb24pO1xuICAgICAgICBpZiAoZGF0ZVRpbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGF0ZVRpbWUuc2V0TG9jYWxpemF0aW9uKGxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZVRpbWU7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gb3B0aW9uYWxEYXRlKGtleSkge1xuICAgIGNvbnN0IG1hbmRhdG9yeSA9IG1hbmRhdG9yeURhdGUoa2V5KTtcbiAgICByZXR1cm4gKGFyZ3MpID0+IHtcbiAgICAgICAgaWYgKGFyZ3MudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hbmRhdG9yeShhcmdzKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gbnVtYmVyc0luUmFuZ2Uoa2V5LCBsb3dlciwgdXBwZXIpIHtcbiAgICByZXR1cm4gKHsgdmFsdWUsIHByb3ZpZGVkVHlwZSB9KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgdHlwZUNoZWNrTnVtYmVyQXJyYXkoa2V5LCB2YWx1ZSwgcHJvdmlkZWRUeXBlKTtcbiAgICAgICAgaWYgKHZhbHVlLnNvbWUoKHgpID0+IHggPCBsb3dlciB8fCB4ID4gdXBwZXIpKVxuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMubnVtYmVyc091dE9mUmFuZ2Uoa2V5LCBsb3dlciwgdXBwZXIpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHZhbGlkSG91clJhbmdlKGtleSkge1xuICAgIHJldHVybiBudW1iZXJzSW5SYW5nZShrZXksIDAsIDIzKTtcbn1cbmZ1bmN0aW9uIHZhbGlkRGF0ZUFycmF5KGtleSkge1xuICAgIHJldHVybiAoeyB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24gfSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHR5cGVDaGVja0RhdGVBcnJheShrZXksIHZhbHVlLCBwcm92aWRlZFR5cGUsIGxvY2FsaXphdGlvbik7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdmFsaWRLZXlPcHRpb24oa2V5T3B0aW9ucykge1xuICAgIHJldHVybiAoeyB2YWx1ZSwgcGF0aCB9KSA9PiB7XG4gICAgICAgIGlmICgha2V5T3B0aW9ucy5pbmNsdWRlcyh2YWx1ZSkpXG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy51bmV4cGVjdGVkT3B0aW9uVmFsdWUocGF0aC5zdWJzdHJpbmcoMSksIHZhbHVlLCBrZXlPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59XG5jb25zdCBvcHRpb25Qcm9jZXNzb3JzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgZGVmYXVsdERhdGU6IG1hbmRhdG9yeURhdGUoJ2RlZmF1bHREYXRlJyksXG4gICAgdmlld0RhdGU6IG1hbmRhdG9yeURhdGUoJ3ZpZXdEYXRlJyksXG4gICAgbWluRGF0ZTogb3B0aW9uYWxEYXRlKCdyZXN0cmljdGlvbnMubWluRGF0ZScpLFxuICAgIG1heERhdGU6IG9wdGlvbmFsRGF0ZSgncmVzdHJpY3Rpb25zLm1heERhdGUnKSxcbiAgICBkaXNhYmxlZEhvdXJzOiB2YWxpZEhvdXJSYW5nZSgncmVzdHJpY3Rpb25zLmRpc2FibGVkSG91cnMnKSxcbiAgICBlbmFibGVkSG91cnM6IHZhbGlkSG91clJhbmdlKCdyZXN0cmljdGlvbnMuZW5hYmxlZEhvdXJzJyksXG4gICAgZGlzYWJsZWREYXRlczogdmFsaWREYXRlQXJyYXkoJ3Jlc3RyaWN0aW9ucy5kaXNhYmxlZERhdGVzJyksXG4gICAgZW5hYmxlZERhdGVzOiB2YWxpZERhdGVBcnJheSgncmVzdHJpY3Rpb25zLmVuYWJsZWREYXRlcycpLFxuICAgIGRheXNPZldlZWtEaXNhYmxlZDogbnVtYmVyc0luUmFuZ2UoJ3Jlc3RyaWN0aW9ucy5kYXlzT2ZXZWVrRGlzYWJsZWQnLCAwLCA2KSxcbiAgICBkaXNhYmxlZFRpbWVJbnRlcnZhbHM6ICh7IGtleSwgdmFsdWUsIHByb3ZpZGVkVHlwZSwgbG9jYWxpemF0aW9uIH0pID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy50eXBlTWlzbWF0Y2goa2V5LCBwcm92aWRlZFR5cGUsICdhcnJheSBvZiB7IGZyb206IERhdGVUaW1lfERhdGUsIHRvOiBEYXRlVGltZXxEYXRlIH0nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZU9iamVjdCA9IHZhbHVlOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlT2JqZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZU9iamVjdFtpXSkuZm9yRWFjaCgodmspID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJPcHRpb25OYW1lID0gYCR7a2V5fVske2l9XS4ke3ZrfWA7XG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IHZhbHVlT2JqZWN0W2ldW3ZrXTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVGltZSA9IGNvbnZlcnRUb0RhdGVUaW1lKGQsIHN1Yk9wdGlvbk5hbWUsIGxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICAgICAgZGF0ZVRpbWUuc2V0TG9jYWxpemF0aW9uKGxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICAgICAgdmFsdWVPYmplY3RbaV1bdmtdID0gZGF0ZVRpbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVPYmplY3Q7XG4gICAgfSxcbiAgICB0b29sYmFyUGxhY2VtZW50OiB2YWxpZEtleU9wdGlvbihbJ3RvcCcsICdib3R0b20nLCAnZGVmYXVsdCddKSxcbiAgICB0eXBlOiB2YWxpZEtleU9wdGlvbihbJ2ljb25zJywgJ3Nwcml0ZXMnXSksXG4gICAgdmlld01vZGU6IHZhbGlkS2V5T3B0aW9uKFtcbiAgICAgICAgJ2Nsb2NrJyxcbiAgICAgICAgJ2NhbGVuZGFyJyxcbiAgICAgICAgJ21vbnRocycsXG4gICAgICAgICd5ZWFycycsXG4gICAgICAgICdkZWNhZGVzJyxcbiAgICBdKSxcbiAgICB0aGVtZTogdmFsaWRLZXlPcHRpb24oWydsaWdodCcsICdkYXJrJywgJ2F1dG8nXSksXG4gICAgcGxhY2VtZW50OiB2YWxpZEtleU9wdGlvbihbJ3RvcCcsICdib3R0b20nXSksXG4gICAgbWV0YTogKHsgdmFsdWUgfSkgPT4gdmFsdWUsXG4gICAgZGF5Vmlld0hlYWRlckZvcm1hdDogKHsgdmFsdWUgfSkgPT4gdmFsdWUsXG4gICAgY29udGFpbmVyOiAoeyB2YWx1ZSwgcGF0aCB9KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgISh2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8XG4gICAgICAgICAgICAgICAgdmFsdWUgaW5zdGFuY2VvZiBFbGVtZW50IHx8XG4gICAgICAgICAgICAgICAgdmFsdWU/LmFwcGVuZENoaWxkKSkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMudHlwZU1pc21hdGNoKHBhdGguc3Vic3RyaW5nKDEpLCB0eXBlb2YgdmFsdWUsICdIVE1MRWxlbWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHVzZVR3ZW50eWZvdXJIb3VyOiAoeyB2YWx1ZSwgcGF0aCwgcHJvdmlkZWRUeXBlLCBkZWZhdWx0VHlwZSB9KSA9PiB7XG4gICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmRlcHJlY2F0ZWRXYXJuaW5nKCd1c2VUd2VudHlmb3VySG91cicsICdQbGVhc2UgdXNlIFwib3B0aW9ucy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlXCIgaW5zdGVhZCcpO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBwcm92aWRlZFR5cGUgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMudHlwZU1pc21hdGNoKHBhdGgsIHByb3ZpZGVkVHlwZSwgZGVmYXVsdFR5cGUpO1xuICAgIH0sXG4gICAgaG91ckN5Y2xlOiB2YWxpZEtleU9wdGlvbihbJ2gxMScsICdoMTInLCAnaDIzJywgJ2gyNCddKSxcbn0pO1xuY29uc3QgZGVmYXVsdFByb2Nlc3NvciA9ICh7IHZhbHVlLCBkZWZhdWx0VHlwZSwgcHJvdmlkZWRUeXBlLCBwYXRoLCB9KSA9PiB7XG4gICAgc3dpdGNoIChkZWZhdWx0VHlwZSkge1xuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSB0cnVlO1xuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgcmV0dXJuICt2YWx1ZTtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy50eXBlTWlzbWF0Y2gocGF0aCwgcHJvdmlkZWRUeXBlLCBkZWZhdWx0VHlwZSk7XG4gICAgfVxufTtcbmZ1bmN0aW9uIHByb2Nlc3NLZXkoYXJncykge1xuICAgIHJldHVybiAob3B0aW9uUHJvY2Vzc29yc1thcmdzLmtleV0gfHwgZGVmYXVsdFByb2Nlc3NvcikoYXJncyk7XG59XG5cbmNsYXNzIE9wdGlvbkNvbnZlcnRlciB7XG4gICAgc3RhdGljIGRlZXBDb3B5KGlucHV0KSB7XG4gICAgICAgIGNvbnN0IG8gPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMoaW5wdXQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gaW5wdXRba2V5XTtcbiAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBEYXRlVGltZSkge1xuICAgICAgICAgICAgICAgIG9ba2V5XSA9IGlucHV0RWxlbWVudC5jbG9uZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgb1trZXldID0gbmV3IERhdGUoaW5wdXRFbGVtZW50LnZhbHVlT2YoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb1trZXldID0gaW5wdXRFbGVtZW50O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dEVsZW1lbnQgIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHxcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgb1trZXldID0gT3B0aW9uQ29udmVydGVyLmRlZXBDb3B5KGlucHV0RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZHMgdmFsdWUgb3V0IG9mIGFuIG9iamVjdCBiYXNlZCBvbiBhIHN0cmluZywgcGVyaW9kIGRlbGltaXRlZCwgcGF0aFxuICAgICAqIEBwYXJhbSBwYXRoc1xuICAgICAqIEBwYXJhbSBvYmpcbiAgICAgKi9cbiAgICBzdGF0aWMgb2JqZWN0UGF0aChwYXRocywgb2JqKSB7XG4gICAgICAgIGlmIChwYXRocy5jaGFyQXQoMCkgPT09ICcuJylcbiAgICAgICAgICAgIHBhdGhzID0gcGF0aHMuc2xpY2UoMSk7XG4gICAgICAgIGlmICghcGF0aHMpXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICByZXR1cm4gcGF0aHNcbiAgICAgICAgICAgIC5zcGxpdCgnLicpXG4gICAgICAgICAgICAucmVkdWNlKCh2YWx1ZSwga2V5KSA9PiBPcHRpb25Db252ZXJ0ZXIuaXNWYWx1ZSh2YWx1ZSkgfHwgT3B0aW9uQ29udmVydGVyLmlzVmFsdWUodmFsdWVba2V5XSlcbiAgICAgICAgICAgID8gdmFsdWVba2V5XVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsIG9iaik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzcHJlYWQgb3BlcmF0b3IgY2F1c2VkIHN1YiBrZXlzIHRvIGJlIG1pc3NpbmcgYWZ0ZXIgbWVyZ2luZy5cbiAgICAgKiBUaGlzIGlzIHRvIGZpeCB0aGF0IGlzc3VlIGJ5IHVzaW5nIHNwcmVhZCBvbiB0aGUgY2hpbGQgb2JqZWN0cyBmaXJzdC5cbiAgICAgKiBBbHNvIGhhbmRsZXMgY29tcGxleCBvcHRpb25zIGxpa2UgZGlzYWJsZWREYXRlc1xuICAgICAqIEBwYXJhbSBwcm92aWRlZCBBbiBvcHRpb24gZnJvbSBuZXcgcHJvdmlkZWRPcHRpb25zXG4gICAgICogQHBhcmFtIGNvcHlUbyBEZXN0aW5hdGlvbiBvYmplY3QuIFRoaXMgd2FzIGFkZGVkIHRvIHByZXZlbnQgcmVmZXJlbmNlIGNvcGllc1xuICAgICAqIEBwYXJhbSBsb2NhbGl6YXRpb25cbiAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAqL1xuICAgIHN0YXRpYyBzcHJlYWQocHJvdmlkZWQsIGNvcHlUbywgbG9jYWxpemF0aW9uLCBwYXRoID0gJycpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBPcHRpb25Db252ZXJ0ZXIub2JqZWN0UGF0aChwYXRoLCBEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHVuc3VwcG9ydGVkT3B0aW9ucyA9IE9iamVjdC5rZXlzKHByb3ZpZGVkKS5maWx0ZXIoKHgpID0+ICFPYmplY3Qua2V5cyhkZWZhdWx0T3B0aW9ucykuaW5jbHVkZXMoeCkpO1xuICAgICAgICBpZiAodW5zdXBwb3J0ZWRPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lZE9wdGlvbnMgPSBPcHRpb25Db252ZXJ0ZXIuZ2V0RmxhdHRlbkRlZmF1bHRPcHRpb25zKCk7XG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgPSB1bnN1cHBvcnRlZE9wdGlvbnMubWFwKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yID0gYFwiJHtwYXRofS4ke3h9XCIgaW4gbm90IGEga25vd24gb3B0aW9uLmA7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlkWW91TWVhbiA9IGZsYXR0ZW5lZE9wdGlvbnMuZmluZCgoeSkgPT4geS5pbmNsdWRlcyh4KSk7XG4gICAgICAgICAgICAgICAgaWYgKGRpZFlvdU1lYW4pXG4gICAgICAgICAgICAgICAgICAgIGVycm9yICs9IGAgRGlkIHlvdSBtZWFuIFwiJHtkaWRZb3VNZWFufVwiP2A7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy51bmV4cGVjdGVkT3B0aW9ucyhlcnJvcnMpO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5rZXlzKHByb3ZpZGVkKVxuICAgICAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09ICdfX3Byb3RvX18nICYmIGtleSAhPT0gJ2NvbnN0cnVjdG9yJylcbiAgICAgICAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIHBhdGggKz0gYC4ke2tleX1gO1xuICAgICAgICAgICAgaWYgKHBhdGguY2hhckF0KDApID09PSAnLicpXG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguc2xpY2UoMSk7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0T3B0aW9uVmFsdWUgPSBkZWZhdWx0T3B0aW9uc1trZXldO1xuICAgICAgICAgICAgY29uc3QgcHJvdmlkZWRUeXBlID0gdHlwZW9mIHByb3ZpZGVkW2tleV07XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0VHlwZSA9IHR5cGVvZiBkZWZhdWx0T3B0aW9uVmFsdWU7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3ZpZGVkW2tleV07XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvcHlUb1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyaW5nKDAsIHBhdGgubGFzdEluZGV4T2YoYC4ke2tleX1gKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZhdWx0T3B0aW9uVmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkocHJvdmlkZWRba2V5XSkgJiZcbiAgICAgICAgICAgICAgICAhKGRlZmF1bHRPcHRpb25WYWx1ZSBpbnN0YW5jZW9mIERhdGUgfHxcbiAgICAgICAgICAgICAgICAgICAgT3B0aW9uQ29udmVydGVyLmlnbm9yZVByb3BlcnRpZXMuaW5jbHVkZXMoa2V5KSkpIHtcbiAgICAgICAgICAgICAgICBPcHRpb25Db252ZXJ0ZXIuc3ByZWFkKHByb3ZpZGVkW2tleV0sIGNvcHlUb1trZXldLCBsb2NhbGl6YXRpb24sIHBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29weVRvW2tleV0gPSBPcHRpb25Db252ZXJ0ZXIucHJvY2Vzc0tleShrZXksIHZhbHVlLCBwcm92aWRlZFR5cGUsIGRlZmF1bHRUeXBlLCBwYXRoLCBsb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyaW5nKDAsIHBhdGgubGFzdEluZGV4T2YoYC4ke2tleX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgcHJvY2Vzc0tleShrZXksIHZhbHVlLCAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHByb3ZpZGVkVHlwZSwgZGVmYXVsdFR5cGUsIHBhdGgsIGxvY2FsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc0tleSh7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIHByb3ZpZGVkVHlwZSxcbiAgICAgICAgICAgIGRlZmF1bHRUeXBlLFxuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIGxvY2FsaXphdGlvbixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBfbWVyZ2VPcHRpb25zKHByb3ZpZGVkT3B0aW9ucywgbWVyZ2VUbykge1xuICAgICAgICBjb25zdCBuZXdDb25maWcgPSBPcHRpb25Db252ZXJ0ZXIuZGVlcENvcHkobWVyZ2VUbyk7XG4gICAgICAgIC8vc2VlIGlmIHRoZSBvcHRpb25zIHNwZWNpZnkgYSBsb2NhbGVcbiAgICAgICAgY29uc3QgbG9jYWxpemF0aW9uID0gbWVyZ2VUby5sb2NhbGl6YXRpb24/LmxvY2FsZSAhPT0gJ2RlZmF1bHQnXG4gICAgICAgICAgICA/IG1lcmdlVG8ubG9jYWxpemF0aW9uXG4gICAgICAgICAgICA6IHByb3ZpZGVkT3B0aW9ucz8ubG9jYWxpemF0aW9uIHx8IERlZmF1bHRPcHRpb25zLmxvY2FsaXphdGlvbjtcbiAgICAgICAgT3B0aW9uQ29udmVydGVyLnNwcmVhZChwcm92aWRlZE9wdGlvbnMsIG5ld0NvbmZpZywgbG9jYWxpemF0aW9uLCAnJyk7XG4gICAgICAgIHJldHVybiBuZXdDb25maWc7XG4gICAgfVxuICAgIHN0YXRpYyBfZGF0YVRvT3B0aW9ucyhlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGVEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlbGVtZW50LmRhdGFzZXQpKTtcbiAgICAgICAgaWYgKGVEYXRhPy50ZFRhcmdldElucHV0KVxuICAgICAgICAgICAgZGVsZXRlIGVEYXRhLnRkVGFyZ2V0SW5wdXQ7XG4gICAgICAgIGlmIChlRGF0YT8udGRUYXJnZXRUb2dnbGUpXG4gICAgICAgICAgICBkZWxldGUgZURhdGEudGRUYXJnZXRUb2dnbGU7XG4gICAgICAgIGlmICghZURhdGEgfHxcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGVEYXRhKS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgIGVEYXRhLmNvbnN0cnVjdG9yICE9PSBET01TdHJpbmdNYXApXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgY29uc3QgZGF0YU9wdGlvbnMgPSB7fTtcbiAgICAgICAgLy8gYmVjYXVzZSBkYXRhc2V0IHJldHVybnMgY2FtZWxDYXNlIGluY2x1ZGluZyB0aGUgJ3RkJyBrZXkgdGhlIG9wdGlvblxuICAgICAgICAvLyBrZXkgd29uJ3QgYWxpZ25cbiAgICAgICAgY29uc3Qgb2JqZWN0VG9Ob3JtYWxpemVkID0gKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbG93ZXJlZCA9IHt9O1xuICAgICAgICAgICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgbG93ZXJlZFt4LnRvTG93ZXJDYXNlKCldID0geDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGxvd2VyZWQ7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZU9iamVjdCA9IHRoaXMubm9ybWFsaXplT2JqZWN0KG9iamVjdFRvTm9ybWFsaXplZCk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNMb3dlciA9IG9iamVjdFRvTm9ybWFsaXplZChvcHRpb25zKTtcbiAgICAgICAgT2JqZWN0LmtleXMoZURhdGEpXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LnN0YXJ0c1dpdGgoTmFtZXNwYWNlLmRhdGFLZXkpKVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4geC5zdWJzdHJpbmcoMikpXG4gICAgICAgICAgICAuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5T3B0aW9uID0gb3B0aW9uc0xvd2VyW2tleS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICAgIC8vIGRhdGFzZXQgbWVyZ2VzIGRhc2hlcyB0byBjYW1lbENhc2UuLi4geWF5XG4gICAgICAgICAgICAvLyBpLmUuIGtleSA9IGRpc3BsYXlfY29tcG9uZW50c19zZWNvbmRzXG4gICAgICAgICAgICBpZiAoa2V5LmluY2x1ZGVzKCdfJykpIHtcbiAgICAgICAgICAgICAgICAvLyBbZGlzcGxheSwgY29tcG9uZW50cywgc2Vjb25kc11cbiAgICAgICAgICAgICAgICBjb25zdCBzcGxpdCA9IGtleS5zcGxpdCgnXycpO1xuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlcbiAgICAgICAgICAgICAgICBrZXlPcHRpb24gPSBvcHRpb25zTG93ZXJbc3BsaXRbMF0udG9Mb3dlckNhc2UoKV07XG4gICAgICAgICAgICAgICAgaWYgKGtleU9wdGlvbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5T3B0aW9uXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFPcHRpb25zW2tleU9wdGlvbl0gPSBub3JtYWxpemVPYmplY3Qoc3BsaXQsIDEsIG9wdGlvbnNba2V5T3B0aW9uXSwgZURhdGFbYHRkJHtrZXl9YF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG9yIGtleSA9IG11bHRpcGxlRGF0ZVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5T3B0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkYXRhT3B0aW9uc1trZXlPcHRpb25dID0gZURhdGFbYHRkJHtrZXl9YF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVyZ2VPcHRpb25zKGRhdGFPcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLy90b2RvIGNsZWFuIHRoaXMgdXBcbiAgICBzdGF0aWMgbm9ybWFsaXplT2JqZWN0KG9iamVjdFRvTm9ybWFsaXplZCkge1xuICAgICAgICBjb25zdCBub3JtYWxpemVPYmplY3QgPSAoc3BsaXQsIGluZGV4LCBvcHRpb25TdWJncm91cCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIC8vIGZpcnN0IHJvdW5kID0gZGlzcGxheSB7IC4uLiB9XG4gICAgICAgICAgICBjb25zdCBub3JtYWxpemVkT3B0aW9ucyA9IG9iamVjdFRvTm9ybWFsaXplZChvcHRpb25TdWJncm91cCk7XG4gICAgICAgICAgICBjb25zdCBrZXlPcHRpb24gPSBub3JtYWxpemVkT3B0aW9uc1tzcGxpdFtpbmRleF0udG9Mb3dlckNhc2UoKV07XG4gICAgICAgICAgICBjb25zdCBpbnRlcm5hbE9iamVjdCA9IHt9O1xuICAgICAgICAgICAgaWYgKGtleU9wdGlvbiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbE9iamVjdDtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW5vdGhlciBvYmplY3QsIGNvbnRpbnVlIGRvd24gdGhlIHJhYmJpdCBob2xlXG4gICAgICAgICAgICBpZiAob3B0aW9uU3ViZ3JvdXBba2V5T3B0aW9uXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICBpbnRlcm5hbE9iamVjdFtrZXlPcHRpb25dID0gbm9ybWFsaXplT2JqZWN0KHNwbGl0LCBpbmRleCwgb3B0aW9uU3ViZ3JvdXBba2V5T3B0aW9uXSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW50ZXJuYWxPYmplY3Rba2V5T3B0aW9uXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGludGVybmFsT2JqZWN0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplT2JqZWN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBwcm92ZSBgZGAgaXMgYSBEYXRlVGltZSBvciBEYXRlIG9yIGNhbiBiZSBjb252ZXJ0ZWQgaW50byBvbmUuXG4gICAgICogQHBhcmFtIGQgSWYgYSBzdHJpbmcgd2lsbCBhdHRlbXB0IGNyZWF0aW5nIGEgZGF0ZSBmcm9tIGl0LlxuICAgICAqIEBwYXJhbSBsb2NhbGl6YXRpb24gb2JqZWN0IGNvbnRhaW5pbmcgbG9jYWxlIGFuZCBmb3JtYXQgc2V0dGluZ3MuIE9ubHkgdXNlZCB3aXRoIHRoZSBjdXN0b20gZm9ybWF0c1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3RhdGljIF9kYXRlVHlwZUNoZWNrKGQsIC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgbG9jYWxpemF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0cnlDb252ZXJ0VG9EYXRlVGltZShkLCBsb2NhbGl6YXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUeXBlIGNoZWNrcyB0aGF0IGB2YWx1ZWAgaXMgYW4gYXJyYXkgb2YgRGF0ZSBvciBEYXRlVGltZVxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lIFByb3ZpZGVzIHRleHQgdG8gZXJyb3IgbWVzc2FnZXMgZS5nLiBkaXNhYmxlZERhdGVzXG4gICAgICogQHBhcmFtIHZhbHVlIE9wdGlvbiB2YWx1ZVxuICAgICAqIEBwYXJhbSBwcm92aWRlZFR5cGUgVXNlZCB0byBwcm92aWRlIHRleHQgdG8gZXJyb3IgbWVzc2FnZXNcbiAgICAgKiBAcGFyYW0gbG9jYWxpemF0aW9uXG4gICAgICovXG4gICAgc3RhdGljIF90eXBlQ2hlY2tEYXRlQXJyYXkob3B0aW9uTmFtZSwgdmFsdWUsIHByb3ZpZGVkVHlwZSwgbG9jYWxpemF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0eXBlQ2hlY2tEYXRlQXJyYXkob3B0aW9uTmFtZSwgdmFsdWUsIHByb3ZpZGVkVHlwZSwgbG9jYWxpemF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHlwZSBjaGVja3MgdGhhdCBgdmFsdWVgIGlzIGFuIGFycmF5IG9mIG51bWJlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZSBQcm92aWRlcyB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzIGUuZy4gZGlzYWJsZWREYXRlc1xuICAgICAqIEBwYXJhbSB2YWx1ZSBPcHRpb24gdmFsdWVcbiAgICAgKiBAcGFyYW0gcHJvdmlkZWRUeXBlIFVzZWQgdG8gcHJvdmlkZSB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzXG4gICAgICovXG4gICAgc3RhdGljIF90eXBlQ2hlY2tOdW1iZXJBcnJheShvcHRpb25OYW1lLCB2YWx1ZSwgcHJvdmlkZWRUeXBlKSB7XG4gICAgICAgIHJldHVybiB0eXBlQ2hlY2tOdW1iZXJBcnJheShvcHRpb25OYW1lLCB2YWx1ZSwgcHJvdmlkZWRUeXBlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gY29udmVydCBgZGAgdG8gYSBEYXRlVGltZSBvYmplY3RcbiAgICAgKiBAcGFyYW0gZCB2YWx1ZSB0byBjb252ZXJ0XG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWUgUHJvdmlkZXMgdGV4dCB0byBlcnJvciBtZXNzYWdlcyBlLmcuIGRpc2FibGVkRGF0ZXNcbiAgICAgKiBAcGFyYW0gbG9jYWxpemF0aW9uIG9iamVjdCBjb250YWluaW5nIGxvY2FsZSBhbmQgZm9ybWF0IHNldHRpbmdzLiBPbmx5IHVzZWQgd2l0aCB0aGUgY3VzdG9tIGZvcm1hdHNcbiAgICAgKi9cbiAgICBzdGF0aWMgZGF0ZUNvbnZlcnNpb24oZCwgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBvcHRpb25OYW1lLCBsb2NhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRUb0RhdGVUaW1lKGQsIG9wdGlvbk5hbWUsIGxvY2FsaXphdGlvbik7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRGbGF0dGVuRGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9mbGF0dGVuRGVmYXVsdHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmxhdHRlbkRlZmF1bHRzO1xuICAgICAgICBjb25zdCBkZWVwS2V5cyA9ICh0LCBwcmUgPSBbXSkgPT4ge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgaWYgKE9iamVjdCh0KSA9PT0gdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0KS5mbGF0TWFwKChbaywgdl0pID0+IGRlZXBLZXlzKHYsIFsuLi5wcmUsIGtdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJlLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZmxhdHRlbkRlZmF1bHRzID0gZGVlcEtleXMoRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZmxhdHRlbkRlZmF1bHRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTb21lIG9wdGlvbnMgY29uZmxpY3QgbGlrZSBtaW4vbWF4IGRhdGUuIFZlcmlmeSB0aGF0IHRoZXNlIGtpbmRzIG9mIG9wdGlvbnNcbiAgICAgKiBhcmUgc2V0IGNvcnJlY3RseS5cbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgc3RhdGljIF92YWxpZGF0ZUNvbmZsaWN0cyhjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5kaXNwbGF5LnNpZGVCeVNpZGUgJiZcbiAgICAgICAgICAgICghY29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy5jbG9jayB8fFxuICAgICAgICAgICAgICAgICEoY29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy5ob3VycyB8fFxuICAgICAgICAgICAgICAgICAgICBjb25maWcuZGlzcGxheS5jb21wb25lbnRzLm1pbnV0ZXMgfHxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy5zZWNvbmRzKSkpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmNvbmZsaWN0aW5nQ29uZmlndXJhdGlvbignQ2Fubm90IHVzZSBzaWRlIGJ5IHNpZGUgbW9kZSB3aXRob3V0IHRoZSBjbG9jayBjb21wb25lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5yZXN0cmljdGlvbnMubWluRGF0ZSAmJiBjb25maWcucmVzdHJpY3Rpb25zLm1heERhdGUpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcucmVzdHJpY3Rpb25zLm1pbkRhdGUuaXNBZnRlcihjb25maWcucmVzdHJpY3Rpb25zLm1heERhdGUpKSB7XG4gICAgICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY29uZmxpY3RpbmdDb25maWd1cmF0aW9uKCdtaW5EYXRlIGlzIGFmdGVyIG1heERhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcucmVzdHJpY3Rpb25zLm1heERhdGUuaXNCZWZvcmUoY29uZmlnLnJlc3RyaWN0aW9ucy5taW5EYXRlKSkge1xuICAgICAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmNvbmZsaWN0aW5nQ29uZmlndXJhdGlvbignbWF4RGF0ZSBpcyBiZWZvcmUgbWluRGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcubXVsdGlwbGVEYXRlcyAmJiBjb25maWcuZGF0ZVJhbmdlKSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5jb25mbGljdGluZ0NvbmZpZ3VyYXRpb24oJ0Nhbm5vdCB1c3Mgb3B0aW9uIFwibXVsdGlwbGVEYXRlc1wiIHdpdGggXCJkYXRlUmFuZ2VcIicpO1xuICAgICAgICB9XG4gICAgfVxufVxuT3B0aW9uQ29udmVydGVyLmlnbm9yZVByb3BlcnRpZXMgPSBbXG4gICAgJ21ldGEnLFxuICAgICdkYXlWaWV3SGVhZGVyRm9ybWF0JyxcbiAgICAnY29udGFpbmVyJyxcbiAgICAnZGF0ZUZvcm1zJyxcbiAgICAnb3JkaW5hbCcsXG5dO1xuT3B0aW9uQ29udmVydGVyLmlzVmFsdWUgPSAoYSkgPT4gYSAhPSBudWxsOyAvLyBldmVyeXRoaW5nIGV4Y2VwdCB1bmRlZmluZWQgKyBudWxsXG5cbmNsYXNzIERhdGVzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZGF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKEV2ZW50RW1pdHRlcnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBhcnJheSBvZiBzZWxlY3RlZCBkYXRlc1xuICAgICAqL1xuICAgIGdldCBwaWNrZWQoKSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5fZGF0ZXNdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IHBpY2tlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICBnZXQgbGFzdFBpY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVzW3RoaXMubGFzdFBpY2tlZEluZGV4XT8uY2xvbmU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiBwaWNrZWQgZGF0ZXMgLTEgb3IgMCBpZiBub25lIGFyZSBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBnZXQgbGFzdFBpY2tlZEluZGV4KCkge1xuICAgICAgICBpZiAodGhpcy5fZGF0ZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlcy5sZW5ndGggLSAxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3JtYXRzIGEgRGF0ZVRpbWUgb2JqZWN0IHRvIGEgc3RyaW5nLiBVc2VkIHdoZW4gc2V0dGluZyB0aGUgaW5wdXQgdmFsdWUuXG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKi9cbiAgICBmb3JtYXRJbnB1dChkYXRlKSB7XG4gICAgICAgIGlmICghZGF0ZSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgZGF0ZS5sb2NhbGl6YXRpb24gPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbjtcbiAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHBhcnNlIHRoZSB2YWx1ZSBpbnRvIGEgRGF0ZVRpbWUgb2JqZWN0LlxuICAgICAqIHRoaXMgY2FuIGJlIG92ZXJ3cml0dGVuIHRvIHN1cHBseSB5b3VyIG93biBwYXJzaW5nLlxuICAgICAqL1xuICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBwYXJzZUlucHV0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBPcHRpb25Db252ZXJ0ZXIuZGF0ZUNvbnZlcnNpb24odmFsdWUsICdpbnB1dCcsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpZXMgdG8gY29udmVydCB0aGUgcHJvdmlkZWQgdmFsdWUgdG8gYSBEYXRlVGltZSBvYmplY3QuXG4gICAgICogSWYgdmFsdWUgaXMgbnVsbHx1bmRlZmluZWQgdGhlbiBjbGVhciB0aGUgdmFsdWUgb2YgdGhlIHByb3ZpZGVkIGluZGV4IChvciAwKS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gY29udmVydCBvciBudWxsfHVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSBpbmRleCBXaGVuIHVzaW5nIG11bHRpZGF0ZXMgdGhpcyBpcyB0aGUgaW5kZXggaW4gdGhlIGFycmF5XG4gICAgICovXG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHNldEZyb21JbnB1dCh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh1bmRlZmluZWQsIGluZGV4KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSB0aGlzLnBhcnNlSW5wdXQodmFsdWUpO1xuICAgICAgICBpZiAoY29udmVydGVkKSB7XG4gICAgICAgICAgICBjb252ZXJ0ZWQuc2V0TG9jYWxpemF0aW9uKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoY29udmVydGVkLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyBEYXRlVGltZSB0byBzZWxlY3RlZCBkYXRlcyBhcnJheVxuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICovXG4gICAgYWRkKGRhdGUpIHtcbiAgICAgICAgdGhpcy5fZGF0ZXMucHVzaChkYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBgdGFyZ2V0RGF0ZWAgaXMgcGFydCBvZiB0aGUgc2VsZWN0ZWQgZGF0ZXMgYXJyYXkuXG4gICAgICogSWYgYHVuaXRgIGlzIHByb3ZpZGVkIHRoZW4gYSBncmFudWxhcml0eSB0byB0aGF0IHVuaXQgd2lsbCBiZSB1c2VkLlxuICAgICAqIEBwYXJhbSB0YXJnZXREYXRlXG4gICAgICogQHBhcmFtIHVuaXRcbiAgICAgKi9cbiAgICBpc1BpY2tlZCh0YXJnZXREYXRlLCB1bml0KSB7XG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZCh0YXJnZXREYXRlKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF1bml0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVzLmZpbmQoKHgpID0+IHguaXNTYW1lKHRhcmdldERhdGUpKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBmb3JtYXQgPSBnZXRGb3JtYXRCeVVuaXQodW5pdCk7XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZUZvcm1hdHRlZCA9IHRhcmdldERhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIHJldHVybiAodGhpcy5fZGF0ZXNcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHguZm9ybWF0KGZvcm1hdCkpXG4gICAgICAgICAgICAuZmluZCgoeCkgPT4geCA9PT0gaW5uZXJEYXRlRm9ybWF0dGVkKSAhPT0gdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggYXQgd2hpY2ggYHRhcmdldERhdGVgIGlzIGluIHRoZSBhcnJheS5cbiAgICAgKiBUaGlzIGlzIHVzZWQgZm9yIHVwZGF0aW5nIG9yIHJlbW92aW5nIGEgZGF0ZSB3aGVuIG11bHRpLWRhdGUgaXMgdXNlZFxuICAgICAqIElmIGB1bml0YCBpcyBwcm92aWRlZCB0aGVuIGEgZ3JhbnVsYXJpdHkgdG8gdGhhdCB1bml0IHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0RGF0ZVxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICovXG4gICAgcGlja2VkSW5kZXgodGFyZ2V0RGF0ZSwgdW5pdCkge1xuICAgICAgICBpZiAoIURhdGVUaW1lLmlzVmFsaWQodGFyZ2V0RGF0ZSkpXG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIGlmICghdW5pdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlcy5tYXAoKHgpID0+IHgudmFsdWVPZigpKS5pbmRleE9mKHRhcmdldERhdGUudmFsdWVPZigpKTtcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gZ2V0Rm9ybWF0QnlVbml0KHVuaXQpO1xuICAgICAgICBjb25zdCBpbm5lckRhdGVGb3JtYXR0ZWQgPSB0YXJnZXREYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZXMubWFwKCh4KSA9PiB4LmZvcm1hdChmb3JtYXQpKS5pbmRleE9mKGlubmVyRGF0ZUZvcm1hdHRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyBhbGwgc2VsZWN0ZWQgZGF0ZXMuXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBOYW1lc3BhY2UuZXZlbnRzLmNoYW5nZSxcbiAgICAgICAgICAgIGRhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG9sZERhdGU6IHRoaXMubGFzdFBpY2tlZCxcbiAgICAgICAgICAgIGlzQ2xlYXI6IHRydWUsXG4gICAgICAgICAgICBpc1ZhbGlkOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZGF0ZXMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmlucHV0KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy51cGRhdGVEaXNwbGF5LmVtaXQoJ2FsbCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIHRoZSBcImJvb2sgZW5kXCIgeWVhcnMgZ2l2ZW4gYSBgeWVhcmAgYW5kIGEgYGZhY3RvcmBcbiAgICAgKiBAcGFyYW0gZmFjdG9yIGUuZy4gMTAwIGZvciBkZWNhZGVzXG4gICAgICogQHBhcmFtIHllYXIgZS5nLiAyMDIxXG4gICAgICovXG4gICAgc3RhdGljIGdldFN0YXJ0RW5kWWVhcihmYWN0b3IsIHllYXIpIHtcbiAgICAgICAgY29uc3Qgc3RlcCA9IGZhY3RvciAvIDEwLCBzdGFydFllYXIgPSBNYXRoLmZsb29yKHllYXIgLyBmYWN0b3IpICogZmFjdG9yLCBlbmRZZWFyID0gc3RhcnRZZWFyICsgc3RlcCAqIDksIGZvY3VzVmFsdWUgPSBNYXRoLmZsb29yKHllYXIgLyBzdGVwKSAqIHN0ZXA7XG4gICAgICAgIHJldHVybiBbc3RhcnRZZWFyLCBlbmRZZWFyLCBmb2N1c1ZhbHVlXTtcbiAgICB9XG4gICAgdXBkYXRlSW5wdXQodGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMuZm9ybWF0SW5wdXQodGFyZ2V0KTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlcyB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kYXRlUmFuZ2UpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5fZGF0ZXNcbiAgICAgICAgICAgICAgICAubWFwKChkKSA9PiB0aGlzLmZvcm1hdElucHV0KGQpKVxuICAgICAgICAgICAgICAgIC5qb2luKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlc1NlcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlICE9IG5ld1ZhbHVlKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gZWl0aGVyIGNsZWFyIG9yIHNldCB0aGUgYHRhcmdldGAgZGF0ZSBhdCBgaW5kZXhgLlxuICAgICAqIElmIHRoZSBgdGFyZ2V0YCBpcyBudWxsIHRoZW4gdGhlIGRhdGUgd2lsbCBiZSBjbGVhcmVkLlxuICAgICAqIElmIG11bHRpLWRhdGUgaXMgYmVpbmcgdXNlZCB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBhcnJheS5cbiAgICAgKiBJZiBgdGFyZ2V0YCBpcyB2YWxpZCBhbmQgbXVsdGktZGF0ZSBpcyB1c2VkIHRoZW4gaWYgYGluZGV4YCBpc1xuICAgICAqIHByb3ZpZGVkIHRoZSBkYXRlIGF0IHRoYXQgaW5kZXggd2lsbCBiZSByZXBsYWNlZCwgb3RoZXJ3aXNlIGl0IGlzIGFwcGVuZGVkLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKi9cbiAgICBzZXRWYWx1ZSh0YXJnZXQsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IG5vSW5kZXggPSB0eXBlb2YgaW5kZXggPT09ICd1bmRlZmluZWQnLCBpc0NsZWFyID0gIXRhcmdldCAmJiBub0luZGV4O1xuICAgICAgICBsZXQgb2xkRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ID8gbnVsbCA6IHRoaXMuX2RhdGVzW2luZGV4XT8uY2xvbmU7XG4gICAgICAgIGlmICghb2xkRGF0ZSAmJiAhdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgJiYgbm9JbmRleCAmJiBpc0NsZWFyKSB7XG4gICAgICAgICAgICBvbGREYXRlID0gdGhpcy5sYXN0UGlja2VkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXQgJiYgb2xkRGF0ZT8uaXNTYW1lKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQodGFyZ2V0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBjYXNlIG9mIGNhbGxpbmcgc2V0VmFsdWUobnVsbClcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFZhbHVlTnVsbChpc0NsZWFyLCBpbmRleCwgb2xkRGF0ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQuY2xvbmU7XG4gICAgICAgIC8vIG1pbnV0ZSBzdGVwcGluZyBpcyBiZWluZyB1c2VkLCBmb3JjZSB0aGUgbWludXRlIHRvIHRoZSBjbG9zZXN0IHZhbHVlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nICE9PSAxKSB7XG4gICAgICAgICAgICB0YXJnZXQubWludXRlcyA9XG4gICAgICAgICAgICAgICAgTWF0aC5yb3VuZCh0YXJnZXQubWludXRlcyAvIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcpICpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZztcbiAgICAgICAgICAgIHRhcmdldC5zdGFydE9mKFVuaXQubWludXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb25VcGRhdGUgPSAoaXNWYWxpZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZGF0ZXNbaW5kZXhdID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy51cGRhdGVWaWV3RGF0ZS5lbWl0KHRhcmdldC5jbG9uZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0KHRhcmdldCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS51bnNldCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy51cGRhdGVEaXNwbGF5LmVtaXQoJ2FsbCcpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuZW1pdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogTmFtZXNwYWNlLmV2ZW50cy5jaGFuZ2UsXG4gICAgICAgICAgICAgICAgZGF0ZTogdGFyZ2V0LFxuICAgICAgICAgICAgICAgIG9sZERhdGUsXG4gICAgICAgICAgICAgICAgaXNDbGVhcixcbiAgICAgICAgICAgICAgICBpc1ZhbGlkOiBpc1ZhbGlkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0YXJnZXQpICYmXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uZGF0ZVJhbmdlSXNWYWxpZCh0aGlzLnBpY2tlZCwgaW5kZXgsIHRhcmdldCkpIHtcbiAgICAgICAgICAgIG9uVXBkYXRlKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmtlZXBJbnZhbGlkKSB7XG4gICAgICAgICAgICBvblVwZGF0ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBOYW1lc3BhY2UuZXZlbnRzLmVycm9yLFxuICAgICAgICAgICAgcmVhc29uOiBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5mYWlsZWRUb1NldEludmFsaWREYXRlLFxuICAgICAgICAgICAgZGF0ZTogdGFyZ2V0LFxuICAgICAgICAgICAgb2xkRGF0ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9zZXRWYWx1ZU51bGwoaXNDbGVhciwgaW5kZXgsIG9sZERhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXMgfHxcbiAgICAgICAgICAgIHRoaXMuX2RhdGVzLmxlbmd0aCA9PT0gMSB8fFxuICAgICAgICAgICAgaXNDbGVhcikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZGF0ZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dCgpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IE5hbWVzcGFjZS5ldmVudHMuY2hhbmdlLFxuICAgICAgICAgICAgZGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb2xkRGF0ZSxcbiAgICAgICAgICAgIGlzQ2xlYXIsXG4gICAgICAgICAgICBpc1ZhbGlkOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy51cGRhdGVEaXNwbGF5LmVtaXQoJ2FsbCcpO1xuICAgIH1cbn1cblxudmFyIEFjdGlvblR5cGVzO1xuKGZ1bmN0aW9uIChBY3Rpb25UeXBlcykge1xuICAgIEFjdGlvblR5cGVzW1wibmV4dFwiXSA9IFwibmV4dFwiO1xuICAgIEFjdGlvblR5cGVzW1wicHJldmlvdXNcIl0gPSBcInByZXZpb3VzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJjaGFuZ2VDYWxlbmRhclZpZXdcIl0gPSBcImNoYW5nZUNhbGVuZGFyVmlld1wiO1xuICAgIEFjdGlvblR5cGVzW1wic2VsZWN0TW9udGhcIl0gPSBcInNlbGVjdE1vbnRoXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzZWxlY3RZZWFyXCJdID0gXCJzZWxlY3RZZWFyXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzZWxlY3REZWNhZGVcIl0gPSBcInNlbGVjdERlY2FkZVwiO1xuICAgIEFjdGlvblR5cGVzW1wic2VsZWN0RGF5XCJdID0gXCJzZWxlY3REYXlcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdEhvdXJcIl0gPSBcInNlbGVjdEhvdXJcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdE1pbnV0ZVwiXSA9IFwic2VsZWN0TWludXRlXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzZWxlY3RTZWNvbmRcIl0gPSBcInNlbGVjdFNlY29uZFwiO1xuICAgIEFjdGlvblR5cGVzW1wiaW5jcmVtZW50SG91cnNcIl0gPSBcImluY3JlbWVudEhvdXJzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJpbmNyZW1lbnRNaW51dGVzXCJdID0gXCJpbmNyZW1lbnRNaW51dGVzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJpbmNyZW1lbnRTZWNvbmRzXCJdID0gXCJpbmNyZW1lbnRTZWNvbmRzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJkZWNyZW1lbnRIb3Vyc1wiXSA9IFwiZGVjcmVtZW50SG91cnNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImRlY3JlbWVudE1pbnV0ZXNcIl0gPSBcImRlY3JlbWVudE1pbnV0ZXNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImRlY3JlbWVudFNlY29uZHNcIl0gPSBcImRlY3JlbWVudFNlY29uZHNcIjtcbiAgICBBY3Rpb25UeXBlc1tcInRvZ2dsZU1lcmlkaWVtXCJdID0gXCJ0b2dnbGVNZXJpZGllbVwiO1xuICAgIEFjdGlvblR5cGVzW1widG9nZ2xlUGlja2VyXCJdID0gXCJ0b2dnbGVQaWNrZXJcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNob3dDbG9ja1wiXSA9IFwic2hvd0Nsb2NrXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzaG93SG91cnNcIl0gPSBcInNob3dIb3Vyc1wiO1xuICAgIEFjdGlvblR5cGVzW1wic2hvd01pbnV0ZXNcIl0gPSBcInNob3dNaW51dGVzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzaG93U2Vjb25kc1wiXSA9IFwic2hvd1NlY29uZHNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImNsZWFyXCJdID0gXCJjbGVhclwiO1xuICAgIEFjdGlvblR5cGVzW1wiY2xvc2VcIl0gPSBcImNsb3NlXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJ0b2RheVwiXSA9IFwidG9kYXlcIjtcbn0pKEFjdGlvblR5cGVzIHx8IChBY3Rpb25UeXBlcyA9IHt9KSk7XG52YXIgQWN0aW9uVHlwZXMkMSA9IEFjdGlvblR5cGVzO1xuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgZm9yIGBkYXRlYFxuICovXG5jbGFzcyBEYXRlRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZXMpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjb250YWluZXIgaHRtbCBmb3IgdGhlIGRpc3BsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFBpY2tlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGF5c0NvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoLi4udGhpcy5fZGF5c09mVGhlV2VlaygpKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJXZWVrcywgTmFtZXNwYWNlLmNzcy5ub0hpZ2hsaWdodCk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHJhbmdlSG92ZXJFdmVudCwgcmFuZ2VIb3Zlck91dEV2ZW50IH0gPSB0aGlzLmhhbmRsZU1vdXNlRXZlbnRzKGNvbnRhaW5lcik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDI7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgIT09IDAgJiYgaSAlIDcgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJXZWVrcywgTmFtZXNwYWNlLmNzcy5ub0hpZ2hsaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNlbGVjdERheSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgICAgIC8vIGlmIGhvdmVyIGlzIHN1cHBvcnRlZCB0aGVuIGFkZCB0aGUgZXZlbnRzXG4gICAgICAgICAgICBpZiAobWF0Y2hNZWRpYSgnKGhvdmVyOiBob3ZlciknKS5tYXRjaGVzICYmXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kYXRlUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgcmFuZ2VIb3ZlckV2ZW50KTtcbiAgICAgICAgICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCByYW5nZUhvdmVyT3V0RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgZ3JpZCBhbmQgdXBkYXRlcyBlbmFibGVkIHN0YXRlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh3aWRnZXQsIHBhaW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuZGF5c0NvbnRhaW5lcilbMF07XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNhbGVuZGFyVmlldyhjb250YWluZXIpO1xuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZVxuICAgICAgICAgICAgLnN0YXJ0T2YoVW5pdC5tb250aClcbiAgICAgICAgICAgIC5zdGFydE9mKCd3ZWVrRGF5JywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc3RhcnRPZlRoZVdlZWspXG4gICAgICAgICAgICAubWFuaXB1bGF0ZSgxMiwgVW5pdC5ob3Vycyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUNhbGVuZGFyV2Vla3MoY29udGFpbmVyLCBpbm5lckRhdGUuY2xvbmUpO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hY3Rpb249XCIke0FjdGlvblR5cGVzJDEuc2VsZWN0RGF5fVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGF5KTtcbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUuaXNCZWZvcmUodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUsIFVuaXQubW9udGgpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3Mub2xkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUuaXNBZnRlcih0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSwgVW5pdC5tb250aCkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5uZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS51bnNldCAmJlxuICAgICAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuaXNQaWNrZWQoaW5uZXJEYXRlLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuYWN0aXZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQoaW5uZXJEYXRlLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS5pc1NhbWUobmV3IERhdGVUaW1lKCksIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy50b2RheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLndlZWtEYXkgPT09IDAgfHwgaW5uZXJEYXRlLndlZWtEYXkgPT09IDYpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy53ZWVrZW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZURhdGVSYW5nZShpbm5lckRhdGUsIGNsYXNzZXMpO1xuICAgICAgICAgICAgcGFpbnQoVW5pdC5kYXRlLCBpbm5lckRhdGUsIGNsYXNzZXMsIGVsZW1lbnQpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKC4uLmVsZW1lbnQuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgdGhpcy5fZGF0ZVRvRGF0YVZhbHVlKGlubmVyRGF0ZSkpO1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGF5JywgYCR7aW5uZXJEYXRlLmRhdGV9YCk7XG4gICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGlubmVyRGF0ZS5wYXJ0cyh1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgIH0pLmRheTtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDEsIFVuaXQuZGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZGF0ZVRvRGF0YVZhbHVlKGRhdGUpIHtcbiAgICAgICAgaWYgKCFEYXRlVGltZS5pc1ZhbGlkKGRhdGUpKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICByZXR1cm4gYCR7ZGF0ZS55ZWFyfS0ke2RhdGUubW9udGhGb3JtYXR0ZWR9LSR7ZGF0ZS5kYXRlRm9ybWF0dGVkfWA7XG4gICAgfVxuICAgIF9oYW5kbGVEYXRlUmFuZ2UoaW5uZXJEYXRlLCBjbGFzc2VzKSB7XG4gICAgICAgIGNvbnN0IHJhbmdlU3RhcnQgPSB0aGlzLmRhdGVzLnBpY2tlZFswXTtcbiAgICAgICAgY29uc3QgcmFuZ2VFbmQgPSB0aGlzLmRhdGVzLnBpY2tlZFsxXTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGF0ZVJhbmdlKSB7XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzQmV0d2VlbihyYW5nZVN0YXJ0LCByYW5nZUVuZCwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLnJhbmdlSW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS5pc1NhbWUocmFuZ2VTdGFydCwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLnJhbmdlU3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS5pc1NhbWUocmFuZ2VFbmQsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5yYW5nZUVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlTW91c2VFdmVudHMoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IHJhbmdlSG92ZXJFdmVudCA9IChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gZT8uY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgMCBvciAyIHNlbGVjdGVkIG9yIGlmIHRoZSB0YXJnZXQgaXMgZGlzYWJsZWQgdGhlbiBpZ25vcmVcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLnBpY2tlZC5sZW5ndGggIT09IDEgfHxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLmRpc2FibGVkKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBzZWxlY3QgYWxsIHRoZSBkYXRlIGRpdnNcbiAgICAgICAgICAgIGNvbnN0IGFsbERheXMgPSBbLi4uY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kYXknKV07XG4gICAgICAgICAgICAvLyBnZXQgdGhlIGRhdGUgdmFsdWUgZnJvbSB0aGUgZWxlbWVudCBiZWluZyBob3ZlcmVkIG92ZXJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKTtcbiAgICAgICAgICAgIC8vIGZvcm1hdCB0aGUgc3RyaW5nIHRvIGEgZGF0ZVxuICAgICAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gRGF0ZVRpbWUuZnJvbVN0cmluZyhhdHRyaWJ1dGVWYWx1ZSwge1xuICAgICAgICAgICAgICAgIGZvcm1hdDogJ3l5eXktTU0tZGQnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0IGluIHRoZSBkYXRlIGNvbnRhaW5lclxuICAgICAgICAgICAgY29uc3QgZGF5SW5kZXggPSBhbGxEYXlzLmZpbmRJbmRleCgoZSkgPT4gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSA9PT0gYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICAgICAgLy8gZmluZCB0aGUgZmlyc3QgYW5kIHNlY29uZCBzZWxlY3RlZCBkYXRlc1xuICAgICAgICAgICAgY29uc3QgcmFuZ2VTdGFydCA9IHRoaXMuZGF0ZXMucGlja2VkWzBdO1xuICAgICAgICAgICAgY29uc3QgcmFuZ2VFbmQgPSB0aGlzLmRhdGVzLnBpY2tlZFsxXTtcbiAgICAgICAgICAgIC8vZm9ybWF0IHRoZSBzdGFydCBkYXRlIHNvIHRoYXQgaXQgY2FuIGJlIGZvdW5kIGJ5IHRoZSBhdHRyaWJ1dGVcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlU3RhcnRGb3JtYXR0ZWQgPSB0aGlzLl9kYXRlVG9EYXRhVmFsdWUocmFuZ2VTdGFydCk7XG4gICAgICAgICAgICBjb25zdCByYW5nZVN0YXJ0SW5kZXggPSBhbGxEYXlzLmZpbmRJbmRleCgoZSkgPT4gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSA9PT0gcmFuZ2VTdGFydEZvcm1hdHRlZCk7XG4gICAgICAgICAgICBjb25zdCByYW5nZVN0YXJ0RWxlbWVudCA9IGFsbERheXNbcmFuZ2VTdGFydEluZGV4XTtcbiAgICAgICAgICAgIC8vbWFrZSBzdXJlIHdlIGRvbid0IGxlYXZlIHN0YXJ0L2VuZCBjbGFzc2VzIGlmIHdlIGRvbid0IG5lZWQgdGhlbVxuICAgICAgICAgICAgaWYgKCFpbm5lckRhdGUuaXNTYW1lKHJhbmdlU3RhcnQsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaW5uZXJEYXRlLmlzU2FtZShyYW5nZUVuZCwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnJhbmdlRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgZmlndXJlcyBvdXQgd2hpY2ggZGlyZWN0IGZyb20gc3RhcnQgZGF0ZSBpcyBzZWxlY3RlZFxuICAgICAgICAgICAgLy8gdGhlIHNlbGVjdGlvbiBcImNhcFwiIGNsYXNzZXMgYXJlIGFwcGxpZWQgaWYgbmVlZGVkXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgYWxsIHRoZSBkYXRlcyBiZXR3ZWVuIHdpbGwgZ2V0IHRoZSBgcmFuZ2VJbmAgY2xhc3MuXG4gICAgICAgICAgICAvLyBXZSBtYWtlIHRoaXMgc2VsZWN0aW9uIGJhc2VkIG9uIHRoZSBlbGVtZW50J3MgaW5kZXggYW5kIHRoZSByYW5nZVN0YXJ0IGluZGV4XG4gICAgICAgICAgICBsZXQgbGFtYmRhO1xuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS5pc0JlZm9yZShyYW5nZVN0YXJ0KSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnJhbmdlU3RhcnQpO1xuICAgICAgICAgICAgICAgIHJhbmdlU3RhcnRFbGVtZW50Py5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MucmFuZ2VTdGFydCk7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydEVsZW1lbnQ/LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5yYW5nZUVuZCk7XG4gICAgICAgICAgICAgICAgbGFtYmRhID0gKF8sIGluZGV4KSA9PiBpbmRleCA+IGRheUluZGV4ICYmIGluZGV4IDwgcmFuZ2VTdGFydEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MucmFuZ2VFbmQpO1xuICAgICAgICAgICAgICAgIHJhbmdlU3RhcnRFbGVtZW50Py5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MucmFuZ2VFbmQpO1xuICAgICAgICAgICAgICAgIHJhbmdlU3RhcnRFbGVtZW50Py5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MucmFuZ2VTdGFydCk7XG4gICAgICAgICAgICAgICAgbGFtYmRhID0gKF8sIGluZGV4KSA9PiBpbmRleCA8IGRheUluZGV4ICYmIGluZGV4ID4gcmFuZ2VTdGFydEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWxsRGF5cy5maWx0ZXIobGFtYmRhKS5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MucmFuZ2VJbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmFuZ2VIb3Zlck91dEV2ZW50ID0gKGUpID0+IHtcbiAgICAgICAgICAgIC8vIGZpbmQgYWxsIHRoZSBkYXRlcyBpbiB0aGUgY29udGFpbmVyXG4gICAgICAgICAgICBjb25zdCBhbGxEYXlzID0gWy4uLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuZGF5JyldO1xuICAgICAgICAgICAgLy8gaWYgb25seSB0aGUgc3RhcnQgaXMgc2VsZWN0ZWQsIHJlbW92ZSBhbGwgdGhlIHJhbmdlSW4gY2xhc3Nlc1xuICAgICAgICAgICAgLy8gd2UgZG8gdGhpcyBiZWNhdXNlIG9uY2UgdGhlIHVzZXIgaG92ZXJzIG92ZXIgYSBuZXcgZGF0ZSB0aGUgcmFuZ2Ugd2lsbCBiZSByZWNhbGN1bGF0ZWQuXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlcy5waWNrZWQubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgICAgIGFsbERheXMuZm9yRWFjaCgoZSkgPT4gZS5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MucmFuZ2VJbikpO1xuICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSAwIG9yIDIgZGF0ZXMgc2VsZWN0ZWQgdGhlbiBpZ25vcmVcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLnBpY2tlZC5sZW5ndGggIT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRhcmdldCA9IGU/LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIGVsZW1lbnRzIGRhdGUgZnJvbSB0aGUgYXR0cmlidXRlIHZhbHVlXG4gICAgICAgICAgICBjb25zdCBpbm5lckRhdGUgPSBuZXcgRGF0ZVRpbWUoY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSk7XG4gICAgICAgICAgICAvLyB2ZXJpZnkgc2VsZWN0aW9ucyBhbmQgcmVtb3ZlIGludmFsaWQgY2xhc3Nlc1xuICAgICAgICAgICAgaWYgKCFpbm5lckRhdGUuaXNTYW1lKHRoaXMuZGF0ZXMucGlja2VkWzBdLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MucmFuZ2VTdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlubmVyRGF0ZS5pc1NhbWUodGhpcy5kYXRlcy5waWNrZWRbMV0sIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZUVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7IHJhbmdlSG92ZXJFdmVudCwgcmFuZ2VIb3Zlck91dEV2ZW50IH07XG4gICAgfVxuICAgIF91cGRhdGVDYWxlbmRhclZpZXcoY29udGFpbmVyKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyAhPT0gJ2NhbGVuZGFyJylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgW3ByZXZpb3VzLCBzd2l0Y2hlciwgbmV4dF0gPSBjb250YWluZXIucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5jYWxlbmRhckhlYWRlcilbMF1cbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2Jyk7XG4gICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZShOYW1lc3BhY2UuY3NzLmRheXNDb250YWluZXIsIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmZvcm1hdCh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5kYXlWaWV3SGVhZGVyRm9ybWF0KSk7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLm1vbnRoXG4gICAgICAgICAgICA/IHN3aXRjaGVyLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgIDogc3dpdGNoZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgtMSwgVW5pdC5tb250aCksIFVuaXQubW9udGgpXG4gICAgICAgICAgICA/IHByZXZpb3VzLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgIDogcHJldmlvdXMuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgxLCBVbml0Lm1vbnRoKSwgVW5pdC5tb250aClcbiAgICAgICAgICAgID8gbmV4dC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICA6IG5leHQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICB9XG4gICAgLyoqKlxuICAgICAqIEdlbmVyYXRlcyBhIGh0bWwgcm93IHRoYXQgY29udGFpbnMgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZGF5c09mVGhlV2VlaygpIHtcbiAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmVcbiAgICAgICAgICAgIC5zdGFydE9mKCd3ZWVrRGF5JywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc3RhcnRPZlRoZVdlZWspXG4gICAgICAgICAgICAuc3RhcnRPZihVbml0LmRhdGUpO1xuICAgICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICAgICAgY29uc3QgaHRtbERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGh0bWxEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jYWxlbmRhcldlZWtzLCBOYW1lc3BhY2UuY3NzLm5vSGlnaGxpZ2h0KTtcbiAgICAgICAgICAgIGh0bWxEaXZFbGVtZW50LmlubmVyVGV4dCA9ICcjJztcbiAgICAgICAgICAgIHJvdy5wdXNoKGh0bWxEaXZFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaHRtbERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGh0bWxEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kYXlPZlRoZVdlZWssIE5hbWVzcGFjZS5jc3Mubm9IaWdobGlnaHQpO1xuICAgICAgICAgICAgaHRtbERpdkVsZW1lbnQuaW5uZXJUZXh0ID0gaW5uZXJEYXRlLmZvcm1hdCh7IHdlZWtkYXk6ICdzaG9ydCcgfSk7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSgxLCBVbml0LmRhdGUpO1xuICAgICAgICAgICAgcm93LnB1c2goaHRtbERpdkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgfVxuICAgIF9oYW5kbGVDYWxlbmRhcldlZWtzKGNvbnRhaW5lciwgaW5uZXJEYXRlKSB7XG4gICAgICAgIFsuLi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgLiR7TmFtZXNwYWNlLmNzcy5jYWxlbmRhcldlZWtzfWApXVxuICAgICAgICAgICAgLmZpbHRlcigoZSkgPT4gZS5pbm5lclRleHQgIT09ICcjJylcbiAgICAgICAgICAgIC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGAke2lubmVyRGF0ZS53ZWVrfWA7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSg3LCBVbml0LmRhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYG1vbnRoYFxuICovXG5jbGFzcyBNb250aERpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLm1vbnRoc0NvbnRhaW5lcik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0TW9udGgpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGVzIHRoZSBncmlkIGFuZCB1cGRhdGVzIGVuYWJsZWQgc3RhdGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHdpZGdldCwgcGFpbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5tb250aHNDb250YWluZXIpWzBdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgPT09ICdtb250aHMnKSB7XG4gICAgICAgICAgICBjb25zdCBbcHJldmlvdXMsIHN3aXRjaGVyLCBuZXh0XSA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5jYWxlbmRhckhlYWRlcilbMF1cbiAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpO1xuICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKE5hbWVzcGFjZS5jc3MubW9udGhzQ29udGFpbmVyLCB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5mb3JtYXQoeyB5ZWFyOiAnbnVtZXJpYycgfSkpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMueWVhclxuICAgICAgICAgICAgICAgID8gc3dpdGNoZXIuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogc3dpdGNoZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoLTEsIFVuaXQueWVhciksIFVuaXQueWVhcilcbiAgICAgICAgICAgICAgICA/IHByZXZpb3VzLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IHByZXZpb3VzLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKDEsIFVuaXQueWVhciksIFVuaXQueWVhcilcbiAgICAgICAgICAgICAgICA/IG5leHQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogbmV4dC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLnN0YXJ0T2YoVW5pdC55ZWFyKTtcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtYWN0aW9uPVwiJHtBY3Rpb25UeXBlcyQxLnNlbGVjdE1vbnRofVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGFpbmVyQ2xvbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5tb250aCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ICYmXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5pc1BpY2tlZChpbm5lckRhdGUsIFVuaXQubW9udGgpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuYWN0aXZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQoaW5uZXJEYXRlLCBVbml0Lm1vbnRoKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhaW50KFVuaXQubW9udGgsIGlubmVyRGF0ZSwgY2xhc3NlcywgY29udGFpbmVyQ2xvbmUpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LnJlbW92ZSguLi5jb250YWluZXJDbG9uZS5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIGAke2luZGV4fWApO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuaW5uZXJUZXh0ID0gYCR7aW5uZXJEYXRlLmZvcm1hdCh7IG1vbnRoOiAnc2hvcnQnIH0pfWA7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSgxLCBVbml0Lm1vbnRoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgZm9yIGB5ZWFyYFxuICovXG5jbGFzcyBZZWFyRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZXMpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjb250YWluZXIgaHRtbCBmb3IgdGhlIGRpc3BsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFBpY2tlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MueWVhcnNDb250YWluZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNlbGVjdFllYXIpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGVzIHRoZSBncmlkIGFuZCB1cGRhdGVzIGVuYWJsZWQgc3RhdGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHdpZGdldCwgcGFpbnQpIHtcbiAgICAgICAgdGhpcy5fc3RhcnRZZWFyID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgtMSwgVW5pdC55ZWFyKTtcbiAgICAgICAgdGhpcy5fZW5kWWVhciA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoMTAsIFVuaXQueWVhcik7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MueWVhcnNDb250YWluZXIpWzBdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgPT09ICd5ZWFycycpIHtcbiAgICAgICAgICAgIGNvbnN0IFtwcmV2aW91cywgc3dpdGNoZXIsIG5leHRdID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNhbGVuZGFySGVhZGVyKVswXVxuICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2Jyk7XG4gICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lciwgYCR7dGhpcy5fc3RhcnRZZWFyLmZvcm1hdCh7IHllYXI6ICdudW1lcmljJyB9KX0tJHt0aGlzLl9lbmRZZWFyLmZvcm1hdCh7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgfSl9YCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5kZWNhZGVzXG4gICAgICAgICAgICAgICAgPyBzd2l0Y2hlci5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBzd2l0Y2hlci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5fc3RhcnRZZWFyLCBVbml0LnllYXIpXG4gICAgICAgICAgICAgICAgPyBwcmV2aW91cy5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBwcmV2aW91cy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5fZW5kWWVhciwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gbmV4dC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBuZXh0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmVcbiAgICAgICAgICAgIC5zdGFydE9mKFVuaXQueWVhcilcbiAgICAgICAgICAgIC5tYW5pcHVsYXRlKC0xLCBVbml0LnllYXIpO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hY3Rpb249XCIke0FjdGlvblR5cGVzJDEuc2VsZWN0WWVhcn1cIl1gKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbnRhaW5lckNsb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy55ZWFyKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLmlzUGlja2VkKGlubmVyRGF0ZSwgVW5pdC55ZWFyKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmFjdGl2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKGlubmVyRGF0ZSwgVW5pdC55ZWFyKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhaW50KFVuaXQueWVhciwgaW5uZXJEYXRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7aW5uZXJEYXRlLnllYXJ9YCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5pbm5lclRleHQgPSBpbm5lckRhdGUuZm9ybWF0KHsgeWVhcjogJ251bWVyaWMnIH0pO1xuICAgICAgICAgICAgaW5uZXJEYXRlLm1hbmlwdWxhdGUoMSwgVW5pdC55ZWFyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgZm9yIGBzZWNvbmRzYFxuICovXG5jbGFzcyBEZWNhZGVEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zZWxlY3REZWNhZGUpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGVzIHRoZSBncmlkIGFuZCB1cGRhdGVzIGVuYWJsZWQgc3RhdGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHdpZGdldCwgcGFpbnQpIHtcbiAgICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gRGF0ZXMuZ2V0U3RhcnRFbmRZZWFyKDEwMCwgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUueWVhcik7XG4gICAgICAgIHRoaXMuX3N0YXJ0RGVjYWRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUuc3RhcnRPZihVbml0LnllYXIpO1xuICAgICAgICB0aGlzLl9zdGFydERlY2FkZS55ZWFyID0gc3RhcnQ7XG4gICAgICAgIHRoaXMuX2VuZERlY2FkZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLnN0YXJ0T2YoVW5pdC55ZWFyKTtcbiAgICAgICAgdGhpcy5fZW5kRGVjYWRlLnllYXIgPSBlbmQ7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuZGVjYWRlc0NvbnRhaW5lcilbMF07XG4gICAgICAgIGNvbnN0IFtwcmV2aW91cywgc3dpdGNoZXIsIG5leHRdID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXIpWzBdXG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgPT09ICdkZWNhZGVzJykge1xuICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKE5hbWVzcGFjZS5jc3MuZGVjYWRlc0NvbnRhaW5lciwgYCR7dGhpcy5fc3RhcnREZWNhZGUuZm9ybWF0KHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICB9KX0tJHt0aGlzLl9lbmREZWNhZGUuZm9ybWF0KHsgeWVhcjogJ251bWVyaWMnIH0pfWApO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5fc3RhcnREZWNhZGUsIFVuaXQueWVhcilcbiAgICAgICAgICAgICAgICA/IHByZXZpb3VzLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IHByZXZpb3VzLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLl9lbmREZWNhZGUsIFVuaXQueWVhcilcbiAgICAgICAgICAgICAgICA/IG5leHQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogbmV4dC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBpY2tlZFllYXJzID0gdGhpcy5kYXRlcy5waWNrZWQubWFwKCh4KSA9PiB4LnllYXIpO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hY3Rpb249XCIke0FjdGlvblR5cGVzJDEuc2VsZWN0RGVjYWRlfVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGFpbmVyQ2xvbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Mub2xkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhcnREZWNhZGUueWVhciAtIDEwIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbG9uZS50ZXh0Q29udGVudCA9ICcgJztcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgJycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbG9uZS5pbm5lclRleHQgPSB0aGlzLl9zdGFydERlY2FkZS5jbG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hbmlwdWxhdGUoLTEwLCBVbml0LnllYXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZm9ybWF0KHsgeWVhcjogJ251bWVyaWMnIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCBgJHt0aGlzLl9zdGFydERlY2FkZS55ZWFyfWApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGVjYWRlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGVjYWRlWWVhciA9IHRoaXMuX3N0YXJ0RGVjYWRlLnllYXI7XG4gICAgICAgICAgICBjb25zdCBlbmREZWNhZGVZZWFyID0gdGhpcy5fc3RhcnREZWNhZGUueWVhciArIDk7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ICYmXG4gICAgICAgICAgICAgICAgcGlja2VkWWVhcnMuZmlsdGVyKCh4KSA9PiB4ID49IHN0YXJ0RGVjYWRlWWVhciAmJiB4IDw9IGVuZERlY2FkZVllYXIpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuYWN0aXZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhaW50KCdkZWNhZGUnLCB0aGlzLl9zdGFydERlY2FkZSwgY2xhc3NlcywgY29udGFpbmVyQ2xvbmUpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LnJlbW92ZSguLi5jb250YWluZXJDbG9uZS5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIGAke3RoaXMuX3N0YXJ0RGVjYWRlLnllYXJ9YCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5pbm5lclRleHQgPSBgJHt0aGlzLl9zdGFydERlY2FkZS5mb3JtYXQoe1xuICAgICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIH0pfWA7XG4gICAgICAgICAgICB0aGlzLl9zdGFydERlY2FkZS5tYW5pcHVsYXRlKDEwLCBVbml0LnllYXIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgY2xvY2sgZGlzcGxheVxuICovXG5jbGFzcyBUaW1lRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zID0gJyc7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZXMpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjb250YWluZXIgaHRtbCBmb3IgdGhlIGNsb2NrIGRpc3BsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFBpY2tlcihpY29uVGFnKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNsb2NrQ29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZCguLi50aGlzLl9ncmlkKGljb25UYWcpKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGVzIHRoZSB2YXJpb3VzIGVsZW1lbnRzIHdpdGggaW4gdGhlIGNsb2NrIGRpc3BsYXlcbiAgICAgKiBsaWtlIHRoZSBjdXJyZW50IGhvdXIgYW5kIGlmIHRoZSBtYW5pcHVsYXRpb24gaWNvbnMgYXJlIGVuYWJsZWQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHdpZGdldCkge1xuICAgICAgICBjb25zdCB0aW1lc0RpdiA9ICh3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNsb2NrQ29udGFpbmVyKVswXSk7XG4gICAgICAgIGxldCBsYXN0UGlja2VkID0gdGhpcy5kYXRlcy5sYXN0UGlja2VkPy5jbG9uZTtcbiAgICAgICAgaWYgKCFsYXN0UGlja2VkICYmIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMudXNlQ3VycmVudClcbiAgICAgICAgICAgIGxhc3RQaWNrZWQgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZTtcbiAgICAgICAgdGltZXNEaXZcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlzYWJsZWQnKVxuICAgICAgICAgICAgLmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5ob3Vycykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKDEsIFVuaXQuaG91cnMpLCBVbml0LmhvdXJzKSkge1xuICAgICAgICAgICAgICAgIHRpbWVzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3Rpb249JHtBY3Rpb25UeXBlcyQxLmluY3JlbWVudEhvdXJzfV1gKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgtMSwgVW5pdC5ob3VycyksIFVuaXQuaG91cnMpKSB7XG4gICAgICAgICAgICAgICAgdGltZXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFjdGlvbj0ke0FjdGlvblR5cGVzJDEuZGVjcmVtZW50SG91cnN9XWApXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXNEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtdGltZS1jb21wb25lbnQ9JHtVbml0LmhvdXJzfV1gKS5pbm5lclRleHQgPSBsYXN0UGlja2VkXG4gICAgICAgICAgICAgICAgPyBsYXN0UGlja2VkLmdldEhvdXJzRm9ybWF0dGVkKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmhvdXJDeWNsZSlcbiAgICAgICAgICAgICAgICA6ICctLSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLm1pbnV0ZXMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgxLCBVbml0Lm1pbnV0ZXMpLCBVbml0Lm1pbnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgdGltZXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFjdGlvbj0ke0FjdGlvblR5cGVzJDEuaW5jcmVtZW50TWludXRlc31dYClcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoLTEsIFVuaXQubWludXRlcyksIFVuaXQubWludXRlcykpIHtcbiAgICAgICAgICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRNaW51dGVzfV1gKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVzRGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRpbWUtY29tcG9uZW50PSR7VW5pdC5taW51dGVzfV1gKS5pbm5lclRleHQgPSBsYXN0UGlja2VkID8gbGFzdFBpY2tlZC5taW51dGVzRm9ybWF0dGVkIDogJy0tJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuc2Vjb25kcykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKDEsIFVuaXQuc2Vjb25kcyksIFVuaXQuc2Vjb25kcykpIHtcbiAgICAgICAgICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRTZWNvbmRzfV1gKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgtMSwgVW5pdC5zZWNvbmRzKSwgVW5pdC5zZWNvbmRzKSkge1xuICAgICAgICAgICAgICAgIHRpbWVzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3Rpb249JHtBY3Rpb25UeXBlcyQxLmRlY3JlbWVudFNlY29uZHN9XWApXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXNEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtdGltZS1jb21wb25lbnQ9JHtVbml0LnNlY29uZHN9XWApLmlubmVyVGV4dCA9IGxhc3RQaWNrZWQgPyBsYXN0UGlja2VkLnNlY29uZHNGb3JtYXR0ZWQgOiAnLS0nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5pc1R3ZWx2ZUhvdXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvZ2dsZSA9IHRpbWVzRGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFjdGlvbj0ke0FjdGlvblR5cGVzJDEudG9nZ2xlTWVyaWRpZW19XWApO1xuICAgICAgICAgICAgY29uc3QgbWVyaWRpZW1EYXRlID0gKGxhc3RQaWNrZWQgfHwgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUpLmNsb25lO1xuICAgICAgICAgICAgdG9nZ2xlLmlubmVyVGV4dCA9IG1lcmlkaWVtRGF0ZS5tZXJpZGllbSgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChtZXJpZGllbURhdGUubWFuaXB1bGF0ZShtZXJpZGllbURhdGUuaG91cnMgPj0gMTIgPyAtMTIgOiAxMiwgVW5pdC5ob3VycykpKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aW1lc0Rpdi5zdHlsZS5ncmlkVGVtcGxhdGVBcmVhcyA9IGBcIiR7dGhpcy5fZ3JpZENvbHVtbnN9XCJgO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSB0YWJsZSBmb3IgdGhlIGNsb2NrIGRpc3BsYXkgZGVwZW5kaW5nIG9uIHdoYXQgb3B0aW9ucyBhcmUgc2VsZWN0ZWQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ3JpZChpY29uVGFnKSB7XG4gICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zID0gJyc7XG4gICAgICAgIGNvbnN0IHRvcCA9IFtdLCBtaWRkbGUgPSBbXSwgYm90dG9tID0gW10sIHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLCB1cEljb24gPSBpY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy51cCksIGRvd25JY29uID0gaWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMuZG93bik7XG4gICAgICAgIHNlcGFyYXRvci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Muc2VwYXJhdG9yLCBOYW1lc3BhY2UuY3NzLm5vSGlnaGxpZ2h0KTtcbiAgICAgICAgY29uc3Qgc2VwYXJhdG9yQ29sb24gPSBzZXBhcmF0b3IuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBzZXBhcmF0b3JDb2xvbi5pbm5lckhUTUwgPSAnOic7XG4gICAgICAgIGNvbnN0IGdldFNlcGFyYXRvciA9IChjb2xvbiA9IGZhbHNlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29sb25cbiAgICAgICAgICAgICAgICA/IHNlcGFyYXRvckNvbG9uLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICAgICAgICAgIDogc2VwYXJhdG9yLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmhvdXJzKSB7XG4gICAgICAgICAgICBsZXQgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uaW5jcmVtZW50SG91cik7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmluY3JlbWVudEhvdXJzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQodXBJY29uLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICB0b3AucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnBpY2tIb3VyKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2hvd0hvdXJzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRpbWUtY29tcG9uZW50JywgVW5pdC5ob3Vycyk7XG4gICAgICAgICAgICBtaWRkbGUucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmRlY3JlbWVudEhvdXIpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRIb3Vycyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LmFwcGVuZENoaWxkKGRvd25JY29uLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBib3R0b20ucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zICs9ICdhJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMubWludXRlcykge1xuICAgICAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgKz0gJyBhJztcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5ob3Vycykge1xuICAgICAgICAgICAgICAgIHRvcC5wdXNoKGdldFNlcGFyYXRvcigpKTtcbiAgICAgICAgICAgICAgICBtaWRkbGUucHVzaChnZXRTZXBhcmF0b3IodHJ1ZSkpO1xuICAgICAgICAgICAgICAgIGJvdHRvbS5wdXNoKGdldFNlcGFyYXRvcigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyArPSAnIGEnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmluY3JlbWVudE1pbnV0ZSk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmluY3JlbWVudE1pbnV0ZXMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZCh1cEljb24uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHRvcC5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ucGlja01pbnV0ZSk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNob3dNaW51dGVzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRpbWUtY29tcG9uZW50JywgVW5pdC5taW51dGVzKTtcbiAgICAgICAgICAgIG1pZGRsZS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uZGVjcmVtZW50TWludXRlKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuZGVjcmVtZW50TWludXRlcyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LmFwcGVuZENoaWxkKGRvd25JY29uLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBib3R0b20ucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuc2Vjb25kcykge1xuICAgICAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgKz0gJyBhJztcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5taW51dGVzKSB7XG4gICAgICAgICAgICAgICAgdG9wLnB1c2goZ2V0U2VwYXJhdG9yKCkpO1xuICAgICAgICAgICAgICAgIG1pZGRsZS5wdXNoKGdldFNlcGFyYXRvcih0cnVlKSk7XG4gICAgICAgICAgICAgICAgYm90dG9tLnB1c2goZ2V0U2VwYXJhdG9yKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zICs9ICcgYSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uaW5jcmVtZW50U2Vjb25kKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuaW5jcmVtZW50U2Vjb25kcyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LmFwcGVuZENoaWxkKHVwSWNvbi5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgdG9wLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5waWNrU2Vjb25kKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2hvd1NlY29uZHMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZS1jb21wb25lbnQnLCBVbml0LnNlY29uZHMpO1xuICAgICAgICAgICAgbWlkZGxlLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5kZWNyZW1lbnRTZWNvbmQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRTZWNvbmRzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoZG93bkljb24uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIGJvdHRvbS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5pc1R3ZWx2ZUhvdXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zICs9ICcgYSc7XG4gICAgICAgICAgICBsZXQgZGl2RWxlbWVudCA9IGdldFNlcGFyYXRvcigpO1xuICAgICAgICAgICAgdG9wLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnRvZ2dsZU1lcmlkaWVtKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS50b2dnbGVNZXJpZGllbSk7XG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgICAgaWYgKE5hbWVzcGFjZS5jc3MudG9nZ2xlTWVyaWRpZW0uaW5jbHVkZXMoJywnKSkge1xuICAgICAgICAgICAgICAgIC8vdG9kbyBtb3ZlIHRoaXMgdG8gcGFpbnQgZnVuY3Rpb24/XG4gICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoLi4uTmFtZXNwYWNlLmNzcy50b2dnbGVNZXJpZGllbS5zcGxpdCgnLCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnRvZ2dsZU1lcmlkaWVtKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLm5vSGlnaGxpZ2h0KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgICAgIG1pZGRsZS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGdldFNlcGFyYXRvcigpO1xuICAgICAgICAgICAgYm90dG9tLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgPSB0aGlzLl9ncmlkQ29sdW1ucy50cmltKCk7XG4gICAgICAgIHJldHVybiBbLi4udG9wLCAuLi5taWRkbGUsIC4uLmJvdHRvbV07XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgZm9yIGBob3Vyc2BcbiAqL1xuY2xhc3MgSG91ckRpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjb250YWluZXIgaHRtbCBmb3IgdGhlIGRpc3BsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFBpY2tlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuaG91ckNvbnRhaW5lcik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKHRoaXMub3B0aW9uc1N0b3JlLmlzVHdlbHZlSG91ciA/IDEyIDogMjQpOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNlbGVjdEhvdXIpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGVzIHRoZSBncmlkIGFuZCB1cGRhdGVzIGVuYWJsZWQgc3RhdGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHdpZGdldCwgcGFpbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5ob3VyQ29udGFpbmVyKVswXTtcbiAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUuc3RhcnRPZihVbml0LmRhdGUpO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hY3Rpb249XCIke0FjdGlvblR5cGVzJDEuc2VsZWN0SG91cn1cIl1gKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbnRhaW5lckNsb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5ob3VyKTtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQoaW5uZXJEYXRlLCBVbml0LmhvdXJzKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhaW50KFVuaXQuaG91cnMsIGlubmVyRGF0ZSwgY2xhc3NlcywgY29udGFpbmVyQ2xvbmUpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LnJlbW92ZSguLi5jb250YWluZXJDbG9uZS5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIGAke2lubmVyRGF0ZS5ob3Vyc31gKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IGlubmVyRGF0ZS5nZXRIb3Vyc0Zvcm1hdHRlZCh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUpO1xuICAgICAgICAgICAgaW5uZXJEYXRlLm1hbmlwdWxhdGUoMSwgVW5pdC5ob3Vycyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCB1cGRhdGVzIHRoZSBncmlkIGZvciBgbWludXRlc2BcbiAqL1xuY2xhc3MgTWludXRlRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5taW51dGVDb250YWluZXIpO1xuICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZyA9PT0gMVxuICAgICAgICAgICAgPyA1XG4gICAgICAgICAgICA6IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjAgLyBzdGVwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNlbGVjdE1pbnV0ZSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLm1pbnV0ZUNvbnRhaW5lcilbMF07XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLnN0YXJ0T2YoVW5pdC5ob3Vycyk7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nID09PSAxXG4gICAgICAgICAgICA/IDVcbiAgICAgICAgICAgIDogdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZztcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtYWN0aW9uPVwiJHtBY3Rpb25UeXBlcyQxLnNlbGVjdE1pbnV0ZX1cIl1gKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbnRhaW5lckNsb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5taW51dGUpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQubWludXRlcykpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWludChVbml0Lm1pbnV0ZXMsIGlubmVyRGF0ZSwgY2xhc3NlcywgY29udGFpbmVyQ2xvbmUpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LnJlbW92ZSguLi5jb250YWluZXJDbG9uZS5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIGAke2lubmVyRGF0ZS5taW51dGVzfWApO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuaW5uZXJUZXh0ID0gaW5uZXJEYXRlLm1pbnV0ZXNGb3JtYXR0ZWQ7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZShzdGVwLCBVbml0Lm1pbnV0ZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYHNlY29uZHNgXG4gKi9cbmNsYXNzIHNlY29uZERpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjb250YWluZXIgaHRtbCBmb3IgdGhlIGRpc3BsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFBpY2tlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Muc2Vjb25kQ29udGFpbmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zZWxlY3RTZWNvbmQpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGVzIHRoZSBncmlkIGFuZCB1cGRhdGVzIGVuYWJsZWQgc3RhdGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHdpZGdldCwgcGFpbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5zZWNvbmRDb250YWluZXIpWzBdO1xuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5zdGFydE9mKFVuaXQubWludXRlcyk7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3RTZWNvbmR9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb250YWluZXJDbG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3Muc2Vjb25kKTtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQoaW5uZXJEYXRlLCBVbml0LnNlY29uZHMpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoVW5pdC5zZWNvbmRzLCBpbm5lckRhdGUsIGNsYXNzZXMsIGNvbnRhaW5lckNsb25lKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5yZW1vdmUoLi4uY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCBgJHtpbm5lckRhdGUuc2Vjb25kc31gKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IGlubmVyRGF0ZS5zZWNvbmRzRm9ybWF0dGVkO1xuICAgICAgICAgICAgaW5uZXJEYXRlLm1hbmlwdWxhdGUoNSwgVW5pdC5zZWNvbmRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgY29sbGFwc2UgZnVuY3Rpb25hbGl0eSB0byB0aGUgdmlldyBjaGFuZ2VzXG4gKi9cbmNsYXNzIENvbGxhcHNlIHtcbiAgICAvKipcbiAgICAgKiBGbGlwcyB0aGUgc2hvdy9oaWRlIHN0YXRlIG9mIGB0YXJnZXRgXG4gICAgICogQHBhcmFtIHRhcmdldCBodG1sIGVsZW1lbnQgdG8gYWZmZWN0LlxuICAgICAqL1xuICAgIHN0YXRpYyB0b2dnbGUodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3Muc2hvdykpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2tpcHMgYW55IGFuaW1hdGlvbiBvciB0aW1lb3V0cyBhbmQgaW1tZWRpYXRlbHkgc2V0IHRoZSBlbGVtZW50IHRvIHNob3cuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqL1xuICAgIHN0YXRpYyBzaG93SW1tZWRpYXRlbHkodGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuY29sbGFwc2luZyk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY29sbGFwc2UsIE5hbWVzcGFjZS5jc3Muc2hvdyk7XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgYHRhcmdldGAgaXMgbm90IGFscmVhZHkgc2hvd2luZywgdGhlbiBzaG93IGFmdGVyIHRoZSBhbmltYXRpb24uXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqL1xuICAgIHN0YXRpYyBzaG93KHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLmNvbGxhcHNpbmcpIHx8XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3Muc2hvdykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgQ29sbGFwc2Uuc2hvd0ltbWVkaWF0ZWx5KHRhcmdldCk7XG4gICAgICAgIH07XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnMCc7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuY29sbGFwc2UpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNvbGxhcHNpbmcpO1xuICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgc2V0VGltZW91dChjb21wbGV0ZSwgdGhpcy5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0YXJnZXQpKTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5zY3JvbGxIZWlnaHR9cHhgO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTa2lwcyBhbnkgYW5pbWF0aW9uIG9yIHRpbWVvdXRzIGFuZCBpbW1lZGlhdGVseSBzZXQgdGhlIGVsZW1lbnQgdG8gaGlkZS5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICovXG4gICAgc3RhdGljIGhpZGVJbW1lZGlhdGVseSh0YXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuY29sbGFwc2luZywgTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jb2xsYXBzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIGB0YXJnZXRgIGlzIG5vdCBhbHJlYWR5IGhpZGRlbiwgdGhlbiBoaWRlIGFmdGVyIHRoZSBhbmltYXRpb24uXG4gICAgICogQHBhcmFtIHRhcmdldCBIVE1MIEVsZW1lbnRcbiAgICAgKi9cbiAgICBzdGF0aWMgaGlkZSh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5jb2xsYXBzaW5nKSB8fFxuICAgICAgICAgICAgIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5zaG93KSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBDb2xsYXBzZS5oaWRlSW1tZWRpYXRlbHkodGFyZ2V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVsnaGVpZ2h0J119cHhgO1xuICAgICAgICBjb25zdCByZWZsb3cgPSAoZWxlbWVudCkgPT4gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHJlZmxvdyh0YXJnZXQpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmNvbGxhcHNlLCBOYW1lc3BhY2UuY3NzLnNob3cpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNvbGxhcHNpbmcpO1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBzZXRUaW1lb3V0KGNvbXBsZXRlLCB0aGlzLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRhcmdldCkpO1xuICAgIH1cbn1cbi8qKlxuICogR2V0cyB0aGUgdHJhbnNpdGlvbiBkdXJhdGlvbiBmcm9tIHRoZSBgZWxlbWVudGAgYnkgZ2V0dGluZyBjc3MgcHJvcGVydGllc1xuICogYHRyYW5zaXRpb24tZHVyYXRpb25gIGFuZCBgdHJhbnNpdGlvbi1kZWxheWBcbiAqIEBwYXJhbSBlbGVtZW50IEhUTUwgRWxlbWVudFxuICovXG5Db2xsYXBzZS5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCA9IChlbGVtZW50KSA9PiB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICAvLyBHZXQgdHJhbnNpdGlvbi1kdXJhdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgIGxldCB7IHRyYW5zaXRpb25EdXJhdGlvbiwgdHJhbnNpdGlvbkRlbGF5IH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICBjb25zdCBmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiA9IE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgY29uc3QgZmxvYXRUcmFuc2l0aW9uRGVsYXkgPSBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpO1xuICAgIC8vIFJldHVybiAwIGlmIGVsZW1lbnQgb3IgdHJhbnNpdGlvbiBkdXJhdGlvbiBpcyBub3QgZm91bmRcbiAgICBpZiAoIWZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uICYmICFmbG9hdFRyYW5zaXRpb25EZWxheSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbiA9IHRyYW5zaXRpb25EdXJhdGlvbi5zcGxpdCgnLCcpWzBdO1xuICAgIHRyYW5zaXRpb25EZWxheSA9IHRyYW5zaXRpb25EZWxheS5zcGxpdCgnLCcpWzBdO1xuICAgIHJldHVybiAoKE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EdXJhdGlvbikgK1xuICAgICAgICBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpKSAqXG4gICAgICAgIDEwMDApO1xufTtcblxuLyoqXG4gKiBNYWluIGNsYXNzIGZvciBhbGwgdGhpbmdzIGRpc3BsYXkgcmVsYXRlZC5cbiAqL1xuY2xhc3MgRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2lzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBkb2N1bWVudCBjbGljayBldmVudCB0byBoaWRlIHRoZSB3aWRnZXQgaWYgY2xpY2sgaXMgb3V0c2lkZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcGFyYW0gZSBNb3VzZUV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9kb2N1bWVudENsaWNrRXZlbnQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGVidWcgfHwgd2luZG93LmRlYnVnKVxuICAgICAgICAgICAgICAgIHJldHVybjsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1Zpc2libGUgJiZcbiAgICAgICAgICAgICAgICAhZS5jb21wb3NlZFBhdGgoKS5pbmNsdWRlcyh0aGlzLndpZGdldCkgJiYgLy8gY2xpY2sgaW5zaWRlIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICAhZS5jb21wb3NlZFBhdGgoKT8uaW5jbHVkZXModGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudCkgLy8gY2xpY2sgb24gdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2xpY2sgZXZlbnQgZm9yIGFueSBhY3Rpb24gbGlrZSBzZWxlY3RpbmcgYSBkYXRlXG4gICAgICAgICAqIEBwYXJhbSBlIE1vdXNlRXZlbnRcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FjdGlvbnNDbGlja0V2ZW50ID0gKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMuYWN0aW9uLmVtaXQoeyBlOiBlIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZXMpO1xuICAgICAgICB0aGlzLmRhdGVEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5tb250aERpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoTW9udGhEaXNwbGF5KTtcbiAgICAgICAgdGhpcy55ZWFyRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShZZWFyRGlzcGxheSk7XG4gICAgICAgIHRoaXMuZGVjYWRlRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEZWNhZGVEaXNwbGF5KTtcbiAgICAgICAgdGhpcy50aW1lRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShUaW1lRGlzcGxheSk7XG4gICAgICAgIHRoaXMuaG91ckRpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoSG91ckRpc3BsYXkpO1xuICAgICAgICB0aGlzLm1pbnV0ZURpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoTWludXRlRGlzcGxheSk7XG4gICAgICAgIHRoaXMuc2Vjb25kRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShzZWNvbmREaXNwbGF5KTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShFdmVudEVtaXR0ZXJzKTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZURpc3BsYXkuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgd2lkZ2V0IGJvZHkgb3IgdW5kZWZpbmVkXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXQgd2lkZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkZ2V0O1xuICAgIH1cbiAgICBnZXQgZGF0ZUNvbnRhaW5lcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0Py5xdWVyeVNlbGVjdG9yKGBkaXYuJHtOYW1lc3BhY2UuY3NzLmRhdGVDb250YWluZXJ9YCk7XG4gICAgfVxuICAgIGdldCB0aW1lQ29udGFpbmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXQ/LnF1ZXJ5U2VsZWN0b3IoYGRpdi4ke05hbWVzcGFjZS5jc3MudGltZUNvbnRhaW5lcn1gKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGlzIHZpc2libGUgc3RhdGUgb2YgdGhlIHBpY2tlciAoc2hvd24pXG4gICAgICovXG4gICAgZ2V0IGlzVmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdGFibGUgZm9yIGEgcGFydGljdWxhciB1bml0LiBVc2VkIHdoZW4gYW4gb3B0aW9uIGFzIGNoYW5nZWQgb3JcbiAgICAgKiB3aGVuZXZlciB0aGUgY2xhc3MgbGlzdCBtaWdodCBuZWVkIHRvIGJlIHJlZnJlc2hlZC5cbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh1bml0KSB7XG4gICAgICAgIGlmICghdGhpcy53aWRnZXQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICAgICAgY2FzZSBVbml0LnNlY29uZHM6XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmREaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVbml0Lm1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVbml0LmhvdXJzOlxuICAgICAgICAgICAgICAgIHRoaXMuaG91ckRpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVuaXQuZGF0ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVbml0Lm1vbnRoOlxuICAgICAgICAgICAgICAgIHRoaXMubW9udGhEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVbml0LnllYXI6XG4gICAgICAgICAgICAgICAgdGhpcy55ZWFyRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNhZGVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2xvY2snOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faGFzVGltZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5ob3Vycyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQubWludXRlcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQuc2Vjb25kcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjYWxlbmRhcic6XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQueWVhcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQubW9udGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjYWRlRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDYWxlbmRhckhlYWRlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYWxsJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faGFzVGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoJ2Nsb2NrJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oYXNEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZSgnY2FsZW5kYXInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogQWxsb3dzIGRldmVsb3BlcnMgdG8gYWRkL3JlbW92ZSBjbGFzc2VzIGZyb20gYW4gZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gX3VuaXRcbiAgICAgKiBAcGFyYW0gX2RhdGVcbiAgICAgKiBAcGFyYW0gX2NsYXNzZXNcbiAgICAgKiBAcGFyYW0gX2VsZW1lbnRcbiAgICAgKi9cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgICBwYWludChfdW5pdCwgX2RhdGUsIF9jbGFzc2VzLCBfZWxlbWVudCkge1xuICAgICAgICAvLyBpbXBsZW1lbnRlZCBpbiBwbHVnaW5cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIHBpY2tlciBhbmQgY3JlYXRlcyBhIFBvcHBlciBpbnN0YW5jZSBpZiBuZWVkZWQuXG4gICAgICogQWRkIGRvY3VtZW50IGNsaWNrIGV2ZW50IHRvIGhpZGUgd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwaWNrZXIuXG4gICAgICogZmlyZXMgRXZlbnRzI3Nob3dcbiAgICAgKi9cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAodGhpcy53aWRnZXQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG93U2V0RGVmYXVsdElmTmVlZGVkKCk7XG4gICAgICAgICAgICB0aGlzLl9idWlsZFdpZGdldCgpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVGhlbWUoKTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTZXR1cFZpZXdNb2RlKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBuZWVkZWQgdG8gY2hhbmdlIHRoZSBwYXJlbnQgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucz8uY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2VtZW50ID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucz8uZGlzcGxheT8ucGxhY2VtZW50IHx8ICdib3R0b20nO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLndpZGdldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQb3B1cCh0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LCB0aGlzLndpZGdldCwge1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IFt7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IHRydWUgfV0sXG4gICAgICAgICAgICAgICAgICAgIC8vIzI0MDBcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyID09PSAncnRsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBgJHtwbGFjZW1lbnR9LWVuZGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYCR7cGxhY2VtZW50fS1zdGFydGAsXG4gICAgICAgICAgICAgICAgfSkudGhlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLndpZGdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnZpZXdNb2RlID09ICdjbG9jaycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLmFjdGlvbi5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBBY3Rpb25UeXBlcyQxLnNob3dDbG9jayxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud2lkZ2V0XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjdGlvbl0nKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fYWN0aW9uc0NsaWNrRXZlbnQpKTtcbiAgICAgICAgICAgIC8vIHNob3cgdGhlIGNsb2NrIHdoZW4gdXNpbmcgc2lkZUJ5U2lkZVxuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc1RpbWUgJiYgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnNpZGVCeVNpZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMud2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5jbG9ja0NvbnRhaW5lcilbMF0uc3R5bGUuZGlzcGxheSA9ICdncmlkJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Muc2hvdyk7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3B1cCgpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9kb2N1bWVudENsaWNrRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudHJpZ2dlckV2ZW50LmVtaXQoeyB0eXBlOiBOYW1lc3BhY2UuZXZlbnRzLnNob3cgfSk7XG4gICAgICAgIHRoaXMuX2lzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuICAgIF9zaG93U2V0dXBWaWV3TW9kZSgpIHtcbiAgICAgICAgLy8gSWYgbW9kZVZpZXcgaXMgb25seSBjbG9ja1xuICAgICAgICBjb25zdCBvbmx5Q2xvY2sgPSB0aGlzLl9oYXNUaW1lICYmICF0aGlzLl9oYXNEYXRlO1xuICAgICAgICAvLyByZXNldCB0aGUgdmlldyB0byB0aGUgY2xvY2sgaWYgdGhlcmUncyBubyBkYXRlIGNvbXBvbmVudHNcbiAgICAgICAgaWYgKG9ubHlDbG9jaykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgPSAnY2xvY2snO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy5hY3Rpb24uZW1pdCh7XG4gICAgICAgICAgICAgICAgZTogbnVsbCxcbiAgICAgICAgICAgICAgICBhY3Rpb246IEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3RoZXJ3aXNlIHJldHVybiB0byB0aGUgY2FsZW5kYXIgdmlld1xuICAgICAgICBlbHNlIGlmICghdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlID1cbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9ubHlDbG9jayAmJiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudmlld01vZGUgIT09ICdjbG9jaycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNUaW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuc2lkZUJ5U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICBDb2xsYXBzZS5oaWRlSW1tZWRpYXRlbHkodGhpcy50aW1lQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIENvbGxhcHNlLnNob3codGhpcy50aW1lQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBDb2xsYXBzZS5zaG93KHRoaXMuZGF0ZUNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2hhc0RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dNb2RlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3Nob3dTZXREZWZhdWx0SWZOZWVkZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGVzLnBpY2tlZC5sZW5ndGggIT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMudXNlQ3VycmVudCAmJlxuICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGVmYXVsdERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZVRpbWUoKS5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmtlZXBJbnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyaWVzID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMubWF4RGF0ZT8uaXNCZWZvcmUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQoZGF0ZSkgJiYgdHJpZXMgPiAzMSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlLm1hbmlwdWxhdGUoZGlyZWN0aW9uLCBVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICB0cmllcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUoZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGVmYXVsdERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWZhdWx0RGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlUG9wdXAoZWxlbWVudCwgd2lkZ2V0LCBcbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgb3B0aW9ucykge1xuICAgICAgICBsZXQgY3JlYXRlUG9wcGVyRnVuY3Rpb247XG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgaWYgKHdpbmRvdz8uUG9wcGVyKSB7XG4gICAgICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBjcmVhdGVQb3BwZXJGdW5jdGlvbiA9IHdpbmRvdz8uUG9wcGVyPy5jcmVhdGVQb3BwZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7IGNyZWF0ZVBvcHBlciB9ID0gYXdhaXQgaW1wb3J0KCdAcG9wcGVyanMvY29yZScpO1xuICAgICAgICAgICAgY3JlYXRlUG9wcGVyRnVuY3Rpb24gPSBjcmVhdGVQb3BwZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNyZWF0ZVBvcHBlckZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZSA9IGNyZWF0ZVBvcHBlckZ1bmN0aW9uKGVsZW1lbnQsIHdpZGdldCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlUG9wdXAoKSB7XG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlPy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlcyB0aGUgY2FsZW5kYXIgdmlldyBtb2RlLiBFLmcuIG1vbnRoIDwtPiB5ZWFyXG4gICAgICogQHBhcmFtIGRpcmVjdGlvbiAtLysgbnVtYmVyIHRvIG1vdmUgY3VycmVudFZpZXdNb2RlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2hvd01vZGUoZGlyZWN0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy53aWRnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heCh0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSwgTWF0aC5taW4oMywgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUgKyBkaXJlY3Rpb24pKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9PSBtYXgpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUgPSBtYXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aWRnZXRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtOYW1lc3BhY2UuY3NzLmRhdGVDb250YWluZXJ9ID4gZGl2Om5vdCguJHtOYW1lc3BhY2UuY3NzLmNhbGVuZGFySGVhZGVyfSksIC4ke05hbWVzcGFjZS5jc3MudGltZUNvbnRhaW5lcn0gPiBkaXY6bm90KC4ke05hbWVzcGFjZS5jc3MuY2xvY2tDb250YWluZXJ9KWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoZSkgPT4gKGUuc3R5bGUuZGlzcGxheSA9ICdub25lJykpO1xuICAgICAgICBjb25zdCBkYXRlUGlja2VyTW9kZSA9IENhbGVuZGFyTW9kZXNbdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGVdO1xuICAgICAgICBjb25zdCBwaWNrZXIgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKGAuJHtkYXRlUGlja2VyTW9kZS5jbGFzc05hbWV9YCk7XG4gICAgICAgIHN3aXRjaCAoZGF0ZVBpY2tlck1vZGUuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MuZGVjYWRlc0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICB0aGlzLmRlY2FkZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MueWVhcnNDb250YWluZXI6XG4gICAgICAgICAgICAgICAgdGhpcy55ZWFyRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy5tb250aHNDb250YWluZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5tb250aERpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MuZGF5c0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHBpY2tlci5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnNpZGVCeVNpZGUpXG4gICAgICAgICAgICAodGhpcy53aWRnZXQucXVlcnlTZWxlY3RvckFsbChgLiR7TmFtZXNwYWNlLmNzcy5jbG9ja0NvbnRhaW5lcn1gKVswXSkuc3R5bGUuZGlzcGxheSA9ICdncmlkJztcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2FsZW5kYXJIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy52aWV3VXBkYXRlLmVtaXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlcyB0aGUgdGhlbWUuIEUuZy4gbGlnaHQsIGRhcmsgb3IgYXV0b1xuICAgICAqIEBwYXJhbSB0aGVtZSB0aGUgdGhlbWUgbmFtZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZVRoZW1lKHRoZW1lKSB7XG4gICAgICAgIGlmICghdGhpcy53aWRnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhlbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudGhlbWUgPT09IHRoZW1lKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50aGVtZSA9IHRoZW1lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2xpZ2h0JywgJ2RhcmsnKTtcbiAgICAgICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLl9nZXRUaGVtZUNsYXNzKCkpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRoZW1lID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHdpbmRvd1xuICAgICAgICAgICAgICAgIC5tYXRjaE1lZGlhKE5hbWVzcGFjZS5jc3MuaXNEYXJrUHJlZmVycmVkUXVlcnkpXG4gICAgICAgICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuX3VwZGF0ZVRoZW1lKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2luZG93XG4gICAgICAgICAgICAgICAgLm1hdGNoTWVkaWEoTmFtZXNwYWNlLmNzcy5pc0RhcmtQcmVmZXJyZWRRdWVyeSlcbiAgICAgICAgICAgICAgICAucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5fdXBkYXRlVGhlbWUoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFRoZW1lQ2xhc3MoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaGVtZSA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50aGVtZSB8fCAnYXV0byc7XG4gICAgICAgIGNvbnN0IGlzRGFya01vZGUgPSB3aW5kb3cubWF0Y2hNZWRpYSAmJlxuICAgICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEoTmFtZXNwYWNlLmNzcy5pc0RhcmtQcmVmZXJyZWRRdWVyeSkubWF0Y2hlcztcbiAgICAgICAgc3dpdGNoIChjdXJyZW50VGhlbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2xpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFtZXNwYWNlLmNzcy5saWdodFRoZW1lO1xuICAgICAgICAgICAgY2FzZSAnZGFyayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hbWVzcGFjZS5jc3MuZGFya1RoZW1lO1xuICAgICAgICAgICAgY2FzZSAnYXV0byc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzRGFya01vZGUgPyBOYW1lc3BhY2UuY3NzLmRhcmtUaGVtZSA6IE5hbWVzcGFjZS5jc3MubGlnaHRUaGVtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfdXBkYXRlQ2FsZW5kYXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5faGFzRGF0ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3Qgc2hvd2luZyA9IFtcbiAgICAgICAgICAgIC4uLnRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoYC4ke05hbWVzcGFjZS5jc3MuZGF0ZUNvbnRhaW5lcn0gZGl2W3N0eWxlKj1cImRpc3BsYXk6IGdyaWRcIl1gKS5jbGFzc0xpc3QsXG4gICAgICAgIF0uZmluZCgoeCkgPT4geC5zdGFydHNXaXRoKE5hbWVzcGFjZS5jc3MuZGF0ZUNvbnRhaW5lcikpO1xuICAgICAgICBjb25zdCBbcHJldmlvdXMsIHN3aXRjaGVyLCBuZXh0XSA9IHRoaXMud2lkZ2V0XG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNhbGVuZGFySGVhZGVyKVswXVxuICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKTtcbiAgICAgICAgc3dpdGNoIChzaG93aW5nKSB7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MuZGVjYWRlc0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ucHJldmlvdXNDZW50dXJ5KTtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJycpO1xuICAgICAgICAgICAgICAgIG5leHQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLm5leHRDZW50dXJ5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ucHJldmlvdXNEZWNhZGUpO1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3REZWNhZGUpO1xuICAgICAgICAgICAgICAgIG5leHQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLm5leHREZWNhZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLm1vbnRoc0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ucHJldmlvdXNZZWFyKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0WWVhcik7XG4gICAgICAgICAgICAgICAgbmV4dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ubmV4dFllYXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLmRheXNDb250YWluZXI6XG4gICAgICAgICAgICAgICAgcHJldmlvdXMuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnByZXZpb3VzTW9udGgpO1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3RNb250aCk7XG4gICAgICAgICAgICAgICAgbmV4dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ubmV4dE1vbnRoKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoc2hvd2luZywgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuZm9ybWF0KHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmRheVZpZXdIZWFkZXJGb3JtYXQpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2hlci5pbm5lclRleHQgPSBzd2l0Y2hlci5nZXRBdHRyaWJ1dGUoc2hvd2luZyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBwaWNrZXIgaWYgbmVlZGVkLlxuICAgICAqIFJlbW92ZSBkb2N1bWVudCBjbGljayBldmVudCB0byBoaWRlIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSB0aGUgcGlja2VyLlxuICAgICAqIGZpcmVzIEV2ZW50cyNoaWRlXG4gICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldCB8fCAhdGhpcy5faXNWaXNpYmxlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3Muc2hvdyk7XG4gICAgICAgIGlmICh0aGlzLl9pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudHJpZ2dlckV2ZW50LmVtaXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IE5hbWVzcGFjZS5ldmVudHMuaGlkZSxcbiAgICAgICAgICAgICAgICBkYXRlOiB0aGlzLm9wdGlvbnNTdG9yZS51bnNldCA/IG51bGwgOiB0aGlzLmRhdGVzLmxhc3RQaWNrZWQ/LmNsb25lLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9pc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2RvY3VtZW50Q2xpY2tFdmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIHBpY2tlcidzIG9wZW4gc3RhdGUuIEZpcmVzIGEgc2hvdy9oaWRlIGV2ZW50IGRlcGVuZGluZy5cbiAgICAgKi9cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1Zpc2libGUgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGRvY3VtZW50IGFuZCBkYXRhLWFjdGlvbiBjbGljayBsaXN0ZW5lciBhbmQgcmVzZXQgdGhlIHdpZGdldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Rpc3Bvc2UoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fZG9jdW1lbnRDbGlja0V2ZW50KTtcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy53aWRnZXRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY3Rpb25dJylcbiAgICAgICAgICAgIC5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fYWN0aW9uc0NsaWNrRXZlbnQpKTtcbiAgICAgICAgdGhpcy53aWRnZXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLndpZGdldCk7XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSB3aWRnZXRzIGh0bWwgdGVtcGxhdGUuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYnVpbGRXaWRnZXQoKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy53aWRnZXQpO1xuICAgICAgICBjb25zdCBkYXRlVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkYXRlVmlldy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGF0ZUNvbnRhaW5lcik7XG4gICAgICAgIGRhdGVWaWV3LmFwcGVuZCh0aGlzLmdldEhlYWRUZW1wbGF0ZSgpLCB0aGlzLmRlY2FkZURpc3BsYXkuZ2V0UGlja2VyKCksIHRoaXMueWVhckRpc3BsYXkuZ2V0UGlja2VyKCksIHRoaXMubW9udGhEaXNwbGF5LmdldFBpY2tlcigpLCB0aGlzLmRhdGVEaXNwbGF5LmdldFBpY2tlcigpKTtcbiAgICAgICAgY29uc3QgdGltZVZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGltZVZpZXcuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnRpbWVDb250YWluZXIpO1xuICAgICAgICB0aW1lVmlldy5hcHBlbmRDaGlsZCh0aGlzLnRpbWVEaXNwbGF5LmdldFBpY2tlcih0aGlzLl9pY29uVGFnLmJpbmQodGhpcykpKTtcbiAgICAgICAgdGltZVZpZXcuYXBwZW5kQ2hpbGQodGhpcy5ob3VyRGlzcGxheS5nZXRQaWNrZXIoKSk7XG4gICAgICAgIHRpbWVWaWV3LmFwcGVuZENoaWxkKHRoaXMubWludXRlRGlzcGxheS5nZXRQaWNrZXIoKSk7XG4gICAgICAgIHRpbWVWaWV3LmFwcGVuZENoaWxkKHRoaXMuc2Vjb25kRGlzcGxheS5nZXRQaWNrZXIoKSk7XG4gICAgICAgIGNvbnN0IHRvb2xiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9vbGJhci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MudG9vbGJhcik7XG4gICAgICAgIHRvb2xiYXIuYXBwZW5kKC4uLnRoaXMuZ2V0VG9vbGJhckVsZW1lbnRzKCkpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSkge1xuICAgICAgICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmlubGluZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5jbGFzc0xpc3QuYWRkKCdjYWxlbmRhcldlZWtzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlICYmIHRoaXMuX2hhc0RhdGVBbmRUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9idWlsZFdpZGdldFNpZGVCeVNpZGUodGVtcGxhdGUsIGRhdGVWaWV3LCB0aW1lVmlldywgdG9vbGJhcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50b29sYmFyUGxhY2VtZW50ID09PSAndG9wJykge1xuICAgICAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQodG9vbGJhcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0dXBDb21wb25lbnRWaWV3ID0gKGhhc0ZpcnN0LCBoYXNTZWNvbmQsIGVsZW1lbnQsIHNob3VsZFNob3cpID0+IHtcbiAgICAgICAgICAgIGlmICghaGFzRmlyc3QpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGhhc1NlY29uZCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNvbGxhcHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkU2hvdylcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Muc2hvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgc2V0dXBDb21wb25lbnRWaWV3KHRoaXMuX2hhc0RhdGUsIHRoaXMuX2hhc1RpbWUsIGRhdGVWaWV3LCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudmlld01vZGUgIT09ICdjbG9jaycpO1xuICAgICAgICBzZXR1cENvbXBvbmVudFZpZXcodGhpcy5faGFzVGltZSwgdGhpcy5faGFzRGF0ZSwgdGltZVZpZXcsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS52aWV3TW9kZSA9PT0gJ2Nsb2NrJyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudG9vbGJhclBsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKHRvb2xiYXIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFycm93LmNsYXNzTGlzdC5hZGQoJ2Fycm93Jyk7XG4gICAgICAgIGFycm93LnNldEF0dHJpYnV0ZSgnZGF0YS1wb3BwZXItYXJyb3cnLCAnJyk7XG4gICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKGFycm93KTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0ID0gdGVtcGxhdGU7XG4gICAgfVxuICAgIF9idWlsZFdpZGdldFNpZGVCeVNpZGUodGVtcGxhdGUsIGRhdGVWaWV3LCB0aW1lVmlldywgdG9vbGJhcikge1xuICAgICAgICB0ZW1wbGF0ZS5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Muc2lkZUJ5U2lkZSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudG9vbGJhclBsYWNlbWVudCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKHRvb2xiYXIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgndGQtcm93Jyk7XG4gICAgICAgIGRhdGVWaWV3LmNsYXNzTGlzdC5hZGQoJ3RkLWhhbGYnKTtcbiAgICAgICAgdGltZVZpZXcuY2xhc3NMaXN0LmFkZCgndGQtaGFsZicpO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGF0ZVZpZXcpO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQodGltZVZpZXcpO1xuICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRvb2xiYXJQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZCh0b29sYmFyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93aWRnZXQgPSB0ZW1wbGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBob3VycywgbWludXRlcywgb3Igc2Vjb25kcyBjb21wb25lbnQgaXMgdHVybmVkIG9uXG4gICAgICovXG4gICAgZ2V0IF9oYXNUaW1lKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmNsb2NrICYmXG4gICAgICAgICAgICAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuaG91cnMgfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5taW51dGVzIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuc2Vjb25kcykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHllYXIsIG1vbnRoLCBvciBkYXRlIGNvbXBvbmVudCBpcyB0dXJuZWQgb25cbiAgICAgKi9cbiAgICBnZXQgX2hhc0RhdGUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuY2FsZW5kYXIgJiZcbiAgICAgICAgICAgICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy55ZWFyIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMubW9udGggfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5kYXRlKSk7XG4gICAgfVxuICAgIGdldCBfaGFzRGF0ZUFuZFRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNEYXRlICYmIHRoaXMuX2hhc1RpbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9vbGJhciBodG1sIGJhc2VkIG9uIG9wdGlvbnMgbGlrZSBidXR0b25zID0+IHRvZGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRUb29sYmFyRWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IHRvb2xiYXIgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5idXR0b25zLnRvZGF5KSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS50b2RheSk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnRvZGF5KTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aGlzLl9pY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy50b2RheSkpO1xuICAgICAgICAgICAgdG9vbGJhci5wdXNoKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuc2lkZUJ5U2lkZSAmJlxuICAgICAgICAgICAgdGhpcy5faGFzRGF0ZSAmJlxuICAgICAgICAgICAgdGhpcy5faGFzVGltZSkge1xuICAgICAgICAgICAgbGV0IHRpdGxlLCBpY29uO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS52aWV3TW9kZSA9PT0gJ2Nsb2NrJykge1xuICAgICAgICAgICAgICAgIHRpdGxlID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0RGF0ZTtcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLmRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aXRsZSA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdFRpbWU7XG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy50aW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEudG9nZ2xlUGlja2VyKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGl0bGUpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcoaWNvbikpO1xuICAgICAgICAgICAgdG9vbGJhci5wdXNoKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5idXR0b25zLmNsZWFyKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5jbGVhcik7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmNsZWFyKTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aGlzLl9pY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy5jbGVhcikpO1xuICAgICAgICAgICAgdG9vbGJhci5wdXNoKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5idXR0b25zLmNsb3NlKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5jbG9zZSk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmNsb3NlKTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aGlzLl9pY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy5jbG9zZSkpO1xuICAgICAgICAgICAgdG9vbGJhci5wdXNoKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvb2xiYXI7XG4gICAgfVxuICAgIC8qKipcbiAgICAgKiBCdWlsZHMgdGhlIGJhc2UgaGVhZGVyIHRlbXBsYXRlIHdpdGggbmV4dCBhbmQgcHJldmlvdXMgaWNvbnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldEhlYWRUZW1wbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgY2FsZW5kYXJIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2FsZW5kYXJIZWFkZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNhbGVuZGFySGVhZGVyKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJldmlvdXMuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnByZXZpb3VzKTtcbiAgICAgICAgcHJldmlvdXMuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEucHJldmlvdXMpO1xuICAgICAgICBwcmV2aW91cy5hcHBlbmRDaGlsZCh0aGlzLl9pY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy5wcmV2aW91cykpO1xuICAgICAgICBjb25zdCBzd2l0Y2hlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzd2l0Y2hlci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Muc3dpdGNoKTtcbiAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuY2hhbmdlQ2FsZW5kYXJWaWV3KTtcbiAgICAgICAgY29uc3QgbmV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXh0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5uZXh0KTtcbiAgICAgICAgbmV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5uZXh0KTtcbiAgICAgICAgbmV4dC5hcHBlbmRDaGlsZCh0aGlzLl9pY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy5uZXh0KSk7XG4gICAgICAgIGNhbGVuZGFySGVhZGVyLmFwcGVuZChwcmV2aW91cywgc3dpdGNoZXIsIG5leHQpO1xuICAgICAgICByZXR1cm4gY2FsZW5kYXJIZWFkZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyBhbiBpY29uIHRhZyBhcyBlaXRoZXIgYW4gYDxpPmBcbiAgICAgKiBvciB3aXRoIGljb25zID0+IHR5cGUgaXMgYHNwcml0ZXNgIHRoZW4gYSBzdmcgdGFnIGluc3RlYWRcbiAgICAgKiBAcGFyYW0gaWNvbkNsYXNzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaWNvblRhZyhpY29uQ2xhc3MpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy50eXBlID09PSAnc3ByaXRlcycpIHtcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJyk7XG4gICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICd1c2UnKTtcbiAgICAgICAgICAgIGljb24uc2V0QXR0cmlidXRlKCd4bGluazpocmVmJywgaWNvbkNsYXNzKTsgLy8gRGVwcmVjYXRlZC4gSW5jbHVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgIGljb24uc2V0QXR0cmlidXRlKCdocmVmJywgaWNvbkNsYXNzKTtcbiAgICAgICAgICAgIHN2Zy5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgICAgICAgIHJldHVybiBzdmc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKC4uLmljb25DbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgICAgcmV0dXJuIGljb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhdXNlcyB0aGUgd2lkZ2V0IHRvIGdldCByZWJ1aWx0IG9uIG5leHQgc2hvdy4gSWYgdGhlIHBpY2tlciBpcyBhbHJlYWR5IG9wZW5cbiAgICAgKiB0aGVuIGhpZGUgYW5kIHJlc2hvdyBpdC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZWJ1aWxkKCkge1xuICAgICAgICBjb25zdCB3YXNWaXNpYmxlID0gdGhpcy5faXNWaXNpYmxlO1xuICAgICAgICB0aGlzLl9kaXNwb3NlKCk7XG4gICAgICAgIGlmICh3YXNWaXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICAgIHJlZnJlc2hDdXJyZW50VmlldygpIHtcbiAgICAgICAgLy9pZiB0aGUgd2lkZ2V0IGlzIG5vdCBzaG93aW5nLCBqdXN0IGRlc3Ryb3kgaXRcbiAgICAgICAgaWYgKCF0aGlzLl9pc1Zpc2libGUpXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlKCk7XG4gICAgICAgIHN3aXRjaCAodGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Nsb2NrJzpcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoJ2Nsb2NrJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjYWxlbmRhcic6XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0Lm1vbnRoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC55ZWFyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RlY2FkZXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZSgnZGVjYWRlJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogTG9naWMgZm9yIHZhcmlvdXMgY2xpY2sgYWN0aW9uc1xuICovXG5jbGFzcyBBY3Rpb25zIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERpc3BsYXkpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKEV2ZW50RW1pdHRlcnMpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLmFjdGlvbi5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kbyhyZXN1bHQuZSwgcmVzdWx0LmFjdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyB0aGUgc2VsZWN0ZWQgYGFjdGlvbmAuIFNlZSBBY3Rpb25UeXBlc1xuICAgICAqIEBwYXJhbSBlIFRoaXMgaXMgbm9ybWFsbHkgYSBjbGljayBldmVudFxuICAgICAqIEBwYXJhbSBhY3Rpb24gSWYgbm90IHByb3ZpZGVkLCB0aGVuIGxvb2sgZm9yIGEgW2RhdGEtYWN0aW9uXVxuICAgICAqL1xuICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBkbyhlLCBhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRhcmdldCA9IGU/LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGlmIChjdXJyZW50VGFyZ2V0Py5jbGFzc0xpc3Q/LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBhY3Rpb24gPSBhY3Rpb24gfHwgY3VycmVudFRhcmdldD8uZGF0YXNldD8uYWN0aW9uO1xuICAgICAgICBjb25zdCBsYXN0UGlja2VkID0gKHRoaXMuZGF0ZXMubGFzdFBpY2tlZCB8fCB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSlcbiAgICAgICAgICAgIC5jbG9uZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5uZXh0OlxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnByZXZpb3VzOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTmV4dFByZXZpb3VzKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuY2hhbmdlQ2FsZW5kYXJWaWV3OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fc2hvd01vZGUoMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGVDYWxlbmRhckhlYWRlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdE1vbnRoOlxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdFllYXI6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0RGVjYWRlOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Q2FsZW5kYXJNb2RlKGFjdGlvbiwgY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0RGF5OlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0RGF5KGN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdEhvdXI6IHtcbiAgICAgICAgICAgICAgICBsZXQgaG91ciA9ICtjdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RQaWNrZWQuaG91cnMgPj0gMTIgJiYgdGhpcy5vcHRpb25zU3RvcmUuaXNUd2VsdmVIb3VyKVxuICAgICAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xuICAgICAgICAgICAgICAgIGxhc3RQaWNrZWQuaG91cnMgPSBob3VyO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUobGFzdFBpY2tlZCwgdGhpcy5kYXRlcy5sYXN0UGlja2VkSW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU9yQ2xvY2soZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0TWludXRlOiB7XG4gICAgICAgICAgICAgICAgbGFzdFBpY2tlZC5taW51dGVzID0gK2N1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGxhc3RQaWNrZWQsIHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVPckNsb2NrKGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdFNlY29uZDoge1xuICAgICAgICAgICAgICAgIGxhc3RQaWNrZWQuc2Vjb25kcyA9ICtjdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShsYXN0UGlja2VkLCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlT3JDbG9jayhlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRIb3VyczpcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGVBbmRTZXQobGFzdFBpY2tlZCwgVW5pdC5ob3Vycyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuaW5jcmVtZW50TWludXRlczpcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGVBbmRTZXQobGFzdFBpY2tlZCwgVW5pdC5taW51dGVzLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRTZWNvbmRzOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0LnNlY29uZHMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmRlY3JlbWVudEhvdXJzOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0LmhvdXJzLCAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuZGVjcmVtZW50TWludXRlczpcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGVBbmRTZXQobGFzdFBpY2tlZCwgVW5pdC5taW51dGVzLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nICogLTEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmRlY3JlbWVudFNlY29uZHM6XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQuc2Vjb25kcywgLTEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnRvZ2dsZU1lcmlkaWVtOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0LmhvdXJzLCB0aGlzLmRhdGVzLmxhc3RQaWNrZWQuaG91cnMgPj0gMTIgPyAtMTIgOiAxMik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEudG9nZ2xlUGlja2VyOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVG9nZ2xlKGN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dDbG9jazpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93SG91cnM6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd01pbnV0ZXM6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd1NlY29uZHM6XG4gICAgICAgICAgICAgICAgLy9tYWtlIHN1cmUgdGhlIGNsb2NrIGlzIGFjdHVhbGx5IGRpc3BsYXlpbmdcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3ICE9PSAnY2xvY2snKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaGlkZSBjYWxlbmRhclxuICAgICAgICAgICAgICAgICAgICBDb2xsYXBzZS5oaWRlSW1tZWRpYXRlbHkodGhpcy5kaXNwbGF5LmRhdGVDb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICAvL3Nob3cgY2xvY2tcbiAgICAgICAgICAgICAgICAgICAgQ29sbGFwc2Uuc2hvd0ltbWVkaWF0ZWx5KHRoaXMuZGlzcGxheS50aW1lQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTaG93Q2xvY2tDb250YWluZXJzKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuY2xlYXI6XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZUNhbGVuZGFySGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuY2xvc2U6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS50b2RheToge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGVUaW1lKCkuc2V0TG9jYWxpemF0aW9uKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZVZpZXdEYXRlLmVtaXQodG9kYXkpO1xuICAgICAgICAgICAgICAgIC8vdG9kbyB0aGlzIHRoaXMgcmVhbGx5IGEgZ29vZCBpZGVhP1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0b2RheSwgVW5pdC5kYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZSh0b2RheSwgdGhpcy5kYXRlcy5sYXN0UGlja2VkSW5kZXgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVNob3dDbG9ja0NvbnRhaW5lcnMoYWN0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNwbGF5Ll9oYXNUaW1lKSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy50aHJvd0Vycm9yKCdDYW5ub3Qgc2hvdyBjbG9jayBjb250YWluZXJzIHdoZW4gdGltZSBpcyBkaXNhYmxlZC4nKTtcbiAgICAgICAgICAgIC8qIGlnbm9yZSBjb3ZlcmFnZTogc2hvdWxkIG5ldmVyIGhhcHBlbiAqL1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3ID0gJ2Nsb2NrJztcbiAgICAgICAgdGhpcy5kaXNwbGF5LndpZGdldFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke05hbWVzcGFjZS5jc3MudGltZUNvbnRhaW5lcn0gPiBkaXZgKVxuICAgICAgICAgICAgLmZvckVhY2goKGh0bWxFbGVtZW50KSA9PiAoaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJykpO1xuICAgICAgICBsZXQgY2xhc3NUb1VzZSA9ICcnO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dDbG9jazpcbiAgICAgICAgICAgICAgICBjbGFzc1RvVXNlID0gTmFtZXNwYWNlLmNzcy5jbG9ja0NvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZSgnY2xvY2snKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93SG91cnM6XG4gICAgICAgICAgICAgICAgY2xhc3NUb1VzZSA9IE5hbWVzcGFjZS5jc3MuaG91ckNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZShVbml0LmhvdXJzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93TWludXRlczpcbiAgICAgICAgICAgICAgICBjbGFzc1RvVXNlID0gTmFtZXNwYWNlLmNzcy5taW51dGVDb250YWluZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGUoVW5pdC5taW51dGVzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93U2Vjb25kczpcbiAgICAgICAgICAgICAgICBjbGFzc1RvVXNlID0gTmFtZXNwYWNlLmNzcy5zZWNvbmRDb250YWluZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGUoVW5pdC5zZWNvbmRzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAodGhpcy5kaXNwbGF5LndpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzVG9Vc2UpWzBdKS5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xuICAgIH1cbiAgICBoYW5kbGVOZXh0UHJldmlvdXMoYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHsgdW5pdCwgc3RlcCB9ID0gQ2FsZW5kYXJNb2Rlc1t0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZV07XG4gICAgICAgIGlmIChhY3Rpb24gPT09IEFjdGlvblR5cGVzJDEubmV4dClcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLm1hbmlwdWxhdGUoc3RlcCwgdW5pdCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLm1hbmlwdWxhdGUoc3RlcCAqIC0xLCB1bml0KTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy52aWV3VXBkYXRlLmVtaXQoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5Ll9zaG93TW9kZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZnRlciBzZXR0aW5nIHRoZSB2YWx1ZSBpdCB3aWxsIGVpdGhlciBzaG93IHRoZSBjbG9jayBvciBoaWRlIHRoZSB3aWRnZXQuXG4gICAgICogQHBhcmFtIGVcbiAgICAgKi9cbiAgICBoaWRlT3JDbG9jayhlKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUuaXNUd2VsdmVIb3VyICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMubWludXRlcyAmJlxuICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5rZWVwT3BlbiAmJlxuICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvKGUsIEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21tb24gZnVuY3Rpb24gdG8gbWFuaXB1bGF0ZSB7QGxpbmsgbGFzdFBpY2tlZH0gYnkgYHVuaXRgLlxuICAgICAqIEBwYXJhbSBsYXN0UGlja2VkXG4gICAgICogQHBhcmFtIHVuaXRcbiAgICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gY2hhbmdlIGJ5XG4gICAgICovXG4gICAgbWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCB1bml0LCB2YWx1ZSA9IDEpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IGxhc3RQaWNrZWQubWFuaXB1bGF0ZSh2YWx1ZSwgdW5pdCk7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChuZXdEYXRlLCB1bml0KSkge1xuICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShuZXdEYXRlLCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlU2VsZWN0Q2FsZW5kYXJNb2RlKGFjdGlvbiwgY3VycmVudFRhcmdldCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9ICtjdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0TW9udGg6XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUubW9udGggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3RZZWFyOlxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdERlY2FkZTpcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS55ZWFyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZSh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSwgdGhpcy5kYXRlcy5sYXN0UGlja2VkSW5kZXgpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUgPT09XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fc2hvd01vZGUoLTEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVRvZ2dsZShjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGlmIChjdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgndGl0bGUnKSA9PT1cbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdERhdGUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdFRpbWUpO1xuICAgICAgICAgICAgY3VycmVudFRhcmdldC5pbm5lckhUTUwgPSB0aGlzLmRpc3BsYXkuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnRpbWUpLm91dGVySFRNTDtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlQ2FsZW5kYXJIZWFkZXIoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnJlZnJlc2hDdXJyZW50VmlldygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0RGF0ZSk7XG4gICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmlubmVySFRNTCA9IHRoaXMuZGlzcGxheS5faWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMuZGF0ZSkub3V0ZXJIVE1MO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheS5faGFzVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2hvd0Nsb2NrQ29udGFpbmVycyhBY3Rpb25UeXBlcyQxLnNob3dDbG9jayk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGUoJ2Nsb2NrJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXNwbGF5LndpZGdldFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke05hbWVzcGFjZS5jc3MuZGF0ZUNvbnRhaW5lcn0sIC4ke05hbWVzcGFjZS5jc3MudGltZUNvbnRhaW5lcn1gKVxuICAgICAgICAgICAgLmZvckVhY2goKGh0bWxFbGVtZW50KSA9PiBDb2xsYXBzZS50b2dnbGUoaHRtbEVsZW1lbnQpKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy52aWV3VXBkYXRlLmVtaXQoKTtcbiAgICB9XG4gICAgaGFuZGxlU2VsZWN0RGF5KGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgZGF5ID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmU7XG4gICAgICAgIGlmIChjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLm9sZCkpIHtcbiAgICAgICAgICAgIGRheS5tYW5pcHVsYXRlKC0xLCBVbml0Lm1vbnRoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5uZXcpKSB7XG4gICAgICAgICAgICBkYXkubWFuaXB1bGF0ZSgxLCBVbml0Lm1vbnRoKTtcbiAgICAgICAgfVxuICAgICAgICBkYXkuZGF0ZSA9ICtjdXJyZW50VGFyZ2V0LmRhdGFzZXQuZGF5O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kYXRlUmFuZ2UpXG4gICAgICAgICAgICB0aGlzLmhhbmRsZURhdGVSYW5nZShkYXkpO1xuICAgICAgICBlbHNlIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTXVsdGlEYXRlKGRheSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGRheSwgdGhpcy5kYXRlcy5sYXN0UGlja2VkSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5kaXNwbGF5Ll9oYXNUaW1lICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmtlZXBPcGVuICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSAmJlxuICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlcyAmJlxuICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGF0ZVJhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZU11bHRpRGF0ZShkYXkpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5kYXRlcy5waWNrZWRJbmRleChkYXksIFVuaXQuZGF0ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShudWxsLCBpbmRleCk7IC8vZGVzZWxlY3QgbXVsdGktZGF0ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCArIDE7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlcy5waWNrZWQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUoZGF5LCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlRGF0ZVJhbmdlKGRheSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGF0ZXMucGlja2VkLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAyOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAxOiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSB0aGlzLmRhdGVzLnBpY2tlZFswXTtcbiAgICAgICAgICAgICAgICBpZiAoZGF5LmdldFRpbWUoKSA9PT0gb3RoZXIuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXkuaXNCZWZvcmUob3RoZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUoZGF5LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShvdGhlciwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUoZGF5LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGRheSwgMCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEEgcm9idXN0IGFuZCBwb3dlcmZ1bCBkYXRlL3RpbWUgcGlja2VyIGNvbXBvbmVudC5cbiAqL1xuY2xhc3MgVGVtcHVzRG9taW51cyB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgdGhpcy5fc3Vic2NyaWJlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5faXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogRXZlbnQgZm9yIHdoZW4gdGhlIGlucHV0IGZpZWxkIGNoYW5nZXMuIFRoaXMgaXMgYSBjbGFzcyBsZXZlbCBtZXRob2Qgc28gdGhlcmUnc1xuICAgICAgICAgKiBzb21ldGhpbmcgZm9yIHRoZSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHRoaXMuX2lucHV0Q2hhbmdlRXZlbnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGludGVybmFsbHlUcmlnZ2VyZWQgPSBldmVudD8uZGV0YWlsO1xuICAgICAgICAgICAgaWYgKGludGVybmFsbHlUcmlnZ2VyZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3Qgc2V0Vmlld0RhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXMubGFzdFBpY2tlZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUgPSB0aGlzLmRhdGVzLmxhc3RQaWNrZWQuY2xvbmU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXMpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwbGl0ID0gdmFsdWUuc3BsaXQodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZVNwbGl0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldEZyb21JbnB1dCh2YWx1ZVNwbGl0W2ldLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZXRWaWV3RGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVEQ6IFNvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBzZXQgdGhlIG11bHRpcGxlRGF0ZXMgdmFsdWVzIGZyb20gdGhlIGlucHV0IGZpZWxkLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0RnJvbUlucHV0KHZhbHVlLCAwKTtcbiAgICAgICAgICAgICAgICBzZXRWaWV3RGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRXZlbnQgZm9yIHdoZW4gdGhlIHRvZ2dsZSBpcyBjbGlja2VkLiBUaGlzIGlzIGEgY2xhc3MgbGV2ZWwgbWV0aG9kIHNvIHRoZXJlJ3NcbiAgICAgICAgICogc29tZXRoaW5nIGZvciB0aGUgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fdG9nZ2xlQ2xpY2tFdmVudCA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50Py5kaXNhYmxlZCB8fFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5kaXNhYmxlZCB8fFxuICAgICAgICAgICAgICAgIC8vaWYgd2UganVzdCBoYXZlIHRoZSBpbnB1dCBhbmQgYWxsb3cgaW5wdXQgdG9nZ2xlIGlzIGVuYWJsZWQsIHRoZW4gZG9uJ3QgY2F1c2UgYSB0b2dnbGVcbiAgICAgICAgICAgICAgICAodGhpcy5fdG9nZ2xlLm5vZGVOYW1lID09PSAnSU5QVVQnICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvZ2dsZT8udHlwZSA9PT0gJ3RleHQnICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuYWxsb3dJbnB1dFRvZ2dsZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV2ZW50IGZvciB3aGVuIHRoZSB0b2dnbGUgaXMgY2xpY2tlZC4gVGhpcyBpcyBhIGNsYXNzIGxldmVsIG1ldGhvZCBzbyB0aGVyZSdzXG4gICAgICAgICAqIHNvbWV0aGluZyBmb3IgdGhlIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX29wZW5DbGlja0V2ZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQ/LmRpc2FibGVkIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmICghdGhpcy5kaXNwbGF5LmlzVmlzaWJsZSlcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2V0dXBTZXJ2aWNlTG9jYXRvcigpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKEV2ZW50RW1pdHRlcnMpO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGlzcGxheSk7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZXMpO1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoQWN0aW9ucyk7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMubXVzdFByb3ZpZGVFbGVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVPcHRpb25zKG9wdGlvbnMsIERlZmF1bHRPcHRpb25zLCB0cnVlKTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuc2V0TG9jYWxpemF0aW9uKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uKTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplSW5wdXQoKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVRvZ2dsZSgpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSlcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudHJpZ2dlckV2ZW50LnN1YnNjcmliZSgoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckV2ZW50KGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy52aWV3VXBkYXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl92aWV3VXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZVZpZXdEYXRlLnN1YnNjcmliZSgoZGF0ZVRpbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUgPSBkYXRlVGltZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCB2aWV3RGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlO1xuICAgIH1cbiAgICBzZXQgdmlld0RhdGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuc2V0TG9jYWxpemF0aW9uKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGUodGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgPT09ICdjbG9jaycgPyAnY2xvY2snIDogJ2NhbGVuZGFyJyk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHBpY2tlciBvcHRpb25zLiBJZiBgcmVzZXRgIGlzIHByb3ZpZGUgYG9wdGlvbnNgIHdpbGwgYmUgbWVyZ2VkIHdpdGggRGVmYXVsdE9wdGlvbnMgaW5zdGVhZC5cbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSByZXNldFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1cGRhdGVPcHRpb25zKG9wdGlvbnMsIHJlc2V0ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHJlc2V0KVxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZU9wdGlvbnMob3B0aW9ucywgRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplT3B0aW9ucyhvcHRpb25zLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuc2V0TG9jYWxpemF0aW9uKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnJlZnJlc2hDdXJyZW50VmlldygpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgcGlja2VyIG9wZW4gb3IgY2xvc2VkLiBJZiB0aGUgcGlja2VyIGlzIGRpc2FibGVkLCBub3RoaW5nIHdpbGwgaGFwcGVuLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0Rpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmRpc3BsYXkudG9nZ2xlKCk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgcGlja2VyIHVubGVzcyB0aGUgcGlja2VyIGlzIGRpc2FibGVkLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAodGhpcy5faXNEaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnNob3coKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBwaWNrZXIgdW5sZXNzIHRoZSBwaWNrZXIgaXMgZGlzYWJsZWQuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheS5oaWRlKCk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyB0aGUgcGlja2VyIGFuZCB0aGUgdGFyZ2V0IGlucHV0IGZpZWxkLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLl9pc0Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gdG9kbyB0aGlzIG1pZ2h0IGJlIHVuZGVzaXJlZC4gSWYgYSBkZXYgZGlzYWJsZXMgdGhlIGlucHV0IGZpZWxkIHRvXG4gICAgICAgIC8vIG9ubHkgYWxsb3cgdXNpbmcgdGhlIHBpY2tlciwgdGhpcyB3aWxsIGJyZWFrIHRoYXQuXG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIHRoaXMuZGlzcGxheS5oaWRlKCk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHRoZSBwaWNrZXIgYW5kIHRoZSB0YXJnZXQgaW5wdXQgZmllbGQuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5faXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGFsbCB0aGUgc2VsZWN0ZWQgZGF0ZXNcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuZGF0ZXMuY2xlYXIoKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIEFsbG93cyBmb3IgYSBkaXJlY3Qgc3Vic2NyaXB0aW9uIHRvIHBpY2tlciBldmVudHMsIHdpdGhvdXQgaGF2aW5nIHRvIHVzZSBhZGRFdmVudExpc3RlbmVyIG9uIHRoZSBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBldmVudFR5cGVzIFNlZSBOYW1lc3BhY2UuRXZlbnRzXG4gICAgICogQHBhcmFtIGNhbGxiYWNrcyBGdW5jdGlvbiB0byBjYWxsIHdoZW4gZXZlbnQgaXMgdHJpZ2dlcmVkXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHN1YnNjcmliZShldmVudFR5cGVzLCBjYWxsYmFja3MgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICApIHtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudFR5cGVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZXZlbnRUeXBlcyA9IFtldmVudFR5cGVzXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FsbEJhY2tBcnJheTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNhbGxiYWNrcykpIHtcbiAgICAgICAgICAgIGNhbGxCYWNrQXJyYXkgPSBbY2FsbGJhY2tzXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxCYWNrQXJyYXkgPSBjYWxsYmFja3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50VHlwZXMubGVuZ3RoICE9PSBjYWxsQmFja0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuc3Vic2NyaWJlTWlzbWF0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXR1cm5BcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50VHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IGV2ZW50VHlwZXNbaV07XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5fc3Vic2NyaWJlcnNbZXZlbnRUeXBlXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmVyc1tldmVudFR5cGVdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmVyc1tldmVudFR5cGVdLnB1c2goY2FsbEJhY2tBcnJheVtpXSk7XG4gICAgICAgICAgICByZXR1cm5BcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZTogdGhpcy5fdW5zdWJzY3JpYmUuYmluZCh0aGlzLCBldmVudFR5cGUsIHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50VHlwZV0ubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5BcnJheVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJuQXJyYXk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgcGlja2VyIGFuZCByZW1vdmVzIGV2ZW50IGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheS5oaWRlKCk7XG4gICAgICAgIC8vIHRoaXMgd2lsbCBjbGVhciB0aGUgZG9jdW1lbnQgY2xpY2sgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5kaXNwbGF5Ll9kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5faW5wdXRDaGFuZ2VFdmVudCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmFsbG93SW5wdXRUb2dnbGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29wZW5DbGlja0V2ZW50KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX29wZW5DbGlja0V2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b2dnbGU/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fdG9nZ2xlQ2xpY2tFdmVudCk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmliZXJzID0ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIG9wdGlvbnMgdG8gdXNlIHRoZSBwcm92aWRlZCBsYW5ndWFnZS5cbiAgICAgKiBUSGUgbGFuZ3VhZ2UgZmlsZSBtdXN0IGJlIGxvYWRlZCBmaXJzdC5cbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBsb2NhbGUobGFuZ3VhZ2UpIHtcbiAgICAgICAgY29uc3QgYXNrZWQgPSBsb2FkZWRMb2NhbGVzW2xhbmd1YWdlXTtcbiAgICAgICAgaWYgKCFhc2tlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy51cGRhdGVPcHRpb25zKHtcbiAgICAgICAgICAgIGxvY2FsaXphdGlvbjogYXNrZWQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbiBldmVudCBsaWtlIENoYW5nZUV2ZW50IHdoZW4gdGhlIHBpY2tlciBoYXMgdXBkYXRlZCB0aGUgdmFsdWVcbiAgICAgKiBvZiBhIHNlbGVjdGVkIGRhdGUuXG4gICAgICogQHBhcmFtIGV2ZW50IEFjY2VwdHMgYSBCYXNlRXZlbnQgb2JqZWN0LlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyaWdnZXJFdmVudChldmVudCkge1xuICAgICAgICBldmVudC52aWV3TW9kZSA9IHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3O1xuICAgICAgICBjb25zdCBpc0NoYW5nZUV2ZW50ID0gZXZlbnQudHlwZSA9PT0gTmFtZXNwYWNlLmV2ZW50cy5jaGFuZ2U7XG4gICAgICAgIGlmIChpc0NoYW5nZUV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGUsIG9sZERhdGUsIGlzQ2xlYXIgfSA9IGV2ZW50O1xuICAgICAgICAgICAgaWYgKChkYXRlICYmIG9sZERhdGUgJiYgZGF0ZS5pc1NhbWUob2xkRGF0ZSkpIHx8XG4gICAgICAgICAgICAgICAgKCFpc0NsZWFyICYmICFkYXRlICYmICFvbGREYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUFmdGVyQ2hhbmdlRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHsgZGV0YWlsOiBldmVudCB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIG5ldyBDdXN0b21FdmVudChldmVudC50eXBlLCB7IGRldGFpbDogZXZlbnQgfSkpO1xuICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGlmICh3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBjb25zdCAkID0gd2luZG93LmpRdWVyeTtcbiAgICAgICAgICAgIGlmIChpc0NoYW5nZUV2ZW50ICYmIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dCkudHJpZ2dlcihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQpLnRyaWdnZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3B1Ymxpc2goZXZlbnQpO1xuICAgIH1cbiAgICBfcHVibGlzaChldmVudCkge1xuICAgICAgICAvLyByZXR1cm4gaWYgZXZlbnQgaXMgbm90IHN1YnNjcmliZWRcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50LnR5cGVdKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRyaWdnZXIgY2FsbGJhY2sgZm9yIGVhY2ggc3Vic2NyaWJlclxuICAgICAgICB0aGlzLl9zdWJzY3JpYmVyc1tldmVudC50eXBlXS5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlyZXMgYSBWaWV3VXBkYXRlIGV2ZW50IHdoZW4sIGZvciBleGFtcGxlLCB0aGUgbW9udGggdmlldyBpcyBjaGFuZ2VkLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3ZpZXdVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBOYW1lc3BhY2UuZXZlbnRzLnVwZGF0ZSxcbiAgICAgICAgICAgIHZpZXdEYXRlOiB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF91bnN1YnNjcmliZShldmVudE5hbWUsIGluZGV4KSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50TmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVyZ2VzIHR3byBPcHRpb24gb2JqZWN0cyB0b2dldGhlciBhbmQgdmFsaWRhdGVzIG9wdGlvbnMgdHlwZVxuICAgICAqIEBwYXJhbSBjb25maWcgbmV3IE9wdGlvbnNcbiAgICAgKiBAcGFyYW0gbWVyZ2VUbyBPcHRpb25zIHRvIG1lcmdlIGludG9cbiAgICAgKiBAcGFyYW0gaW5jbHVkZURhdGFzZXQgV2hlbiB0cnVlLCB0aGUgZWxlbWVudHMgZGF0YS10ZCBhdHRyaWJ1dGVzIHdpbGwgYmUgaW5jbHVkZWQgaW4gdGhlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaW5pdGlhbGl6ZU9wdGlvbnMoY29uZmlnLCBtZXJnZVRvLCBpbmNsdWRlRGF0YXNldCA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBuZXdDb25maWcgPSBPcHRpb25Db252ZXJ0ZXIuZGVlcENvcHkoY29uZmlnKTtcbiAgICAgICAgbmV3Q29uZmlnID0gT3B0aW9uQ29udmVydGVyLl9tZXJnZU9wdGlvbnMobmV3Q29uZmlnLCBtZXJnZVRvKTtcbiAgICAgICAgaWYgKGluY2x1ZGVEYXRhc2V0KVxuICAgICAgICAgICAgbmV3Q29uZmlnID0gT3B0aW9uQ29udmVydGVyLl9kYXRhVG9PcHRpb25zKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQsIG5ld0NvbmZpZyk7XG4gICAgICAgIE9wdGlvbkNvbnZlcnRlci5fdmFsaWRhdGVDb25mbGljdHMobmV3Q29uZmlnKTtcbiAgICAgICAgbmV3Q29uZmlnLnZpZXdEYXRlID0gbmV3Q29uZmlnLnZpZXdEYXRlLnNldExvY2FsaXphdGlvbihuZXdDb25maWcubG9jYWxpemF0aW9uKTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5pc1NhbWUobmV3Q29uZmlnLnZpZXdEYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUgPSBuZXdDb25maWcudmlld0RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIG1pbmltdW0gdmlldyBhbGxvd2VkIGJ5IHRoZSBwaWNrZXIuIEZvciBleGFtcGxlIHRoZSBjYXNlIG9mIG9ubHlcbiAgICAgICAgICogYWxsb3dpbmcgeWVhciBhbmQgbW9udGggdG8gYmUgc2VsZWN0ZWQgYnV0IG5vdCBkYXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKG5ld0NvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMueWVhcikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUubWluaW11bUNhbGVuZGFyVmlld01vZGUgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdDb25maWcuZGlzcGxheS5jb21wb25lbnRzLm1vbnRoKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0NvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMuZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUubWluaW11bUNhbGVuZGFyVmlld01vZGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlID0gTWF0aC5tYXgodGhpcy5vcHRpb25zU3RvcmUubWluaW11bUNhbGVuZGFyVmlld01vZGUsIHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlKTtcbiAgICAgICAgLy8gVXBkYXRlIHZpZXcgbW9kZSBpZiBuZWVkZWRcbiAgICAgICAgaWYgKENhbGVuZGFyTW9kZXNbdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGVdLm5hbWUgIT09XG4gICAgICAgICAgICBuZXdDb25maWcuZGlzcGxheS52aWV3TW9kZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUgPSBNYXRoLm1heChDYWxlbmRhck1vZGVzLmZpbmRJbmRleCgoeCkgPT4geC5uYW1lID09PSBuZXdDb25maWcuZGlzcGxheS52aWV3TW9kZSksIHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5Py5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlKCdhbGwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3Q29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy51c2VUd2VudHlmb3VySG91ciAmJlxuICAgICAgICAgICAgbmV3Q29uZmlnLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG5ld0NvbmZpZy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlID0gJ2gyNCc7XG4gICAgICAgIGVsc2UgaWYgKG5ld0NvbmZpZy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5ld0NvbmZpZy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlID0gZ3Vlc3NIb3VyQ3ljbGUobmV3Q29uZmlnLmxvY2FsaXphdGlvbi5sb2NhbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdDb25maWcucmVzdHJpY3Rpb25zLm1heERhdGUgJiZcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUuaXNBZnRlcihuZXdDb25maWcucmVzdHJpY3Rpb25zLm1heERhdGUpKVxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZSA9IG5ld0NvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZTtcbiAgICAgICAgaWYgKG5ld0NvbmZpZy5yZXN0cmljdGlvbnMubWluRGF0ZSAmJlxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZS5pc0JlZm9yZShuZXdDb25maWcucmVzdHJpY3Rpb25zLm1pbkRhdGUpKVxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZSA9IG5ld0NvbmZpZy5yZXN0cmljdGlvbnMubWluRGF0ZTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucyA9IG5ld0NvbmZpZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGFuIGlucHV0IGZpZWxkIGlzIGJlaW5nIHVzZWQsIGF0dGVtcHRzIHRvIGxvY2F0ZSBvbmUgYW5kIHNldHMgYW5cbiAgICAgKiBldmVudCBsaXN0ZW5lciBpZiBmb3VuZC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pbml0aWFsaXplSW5wdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LnRhZ05hbWUgPT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQgPSB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LmRhdGFzZXQudGRUYXJnZXRJbnB1dDtcbiAgICAgICAgICAgIGlmIChxdWVyeSA9PSB1bmRlZmluZWQgfHwgcXVlcnkgPT0gJ25lYXJlc3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dCA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSAmJiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRlZmF1bHREYXRlKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWUgPSB0aGlzLmRhdGVzLmZvcm1hdElucHV0KHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGVmYXVsdERhdGUpO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9pbnB1dENoYW5nZUV2ZW50KTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuYWxsb3dJbnB1dFRvZ2dsZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vcGVuQ2xpY2tFdmVudCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX29wZW5DbGlja0V2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0Q2hhbmdlRXZlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBsb2NhdGUgYSB0b2dnbGUgZm9yIHRoZSBwaWNrZXIgYW5kIHNldHMgYW4gZXZlbnQgbGlzdGVuZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pbml0aWFsaXplVG9nZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudC5kYXRhc2V0LnRkVGFyZ2V0VG9nZ2xlO1xuICAgICAgICBpZiAocXVlcnkgPT0gJ25lYXJlc3QnKSB7XG4gICAgICAgICAgICBxdWVyeSA9ICdbZGF0YS10ZC10b2dnbGU9XCJkYXRldGltZXBpY2tlclwiXSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdG9nZ2xlID1cbiAgICAgICAgICAgIHF1ZXJ5ID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgID8gdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudFxuICAgICAgICAgICAgICAgIDogdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fdG9nZ2xlQ2xpY2tFdmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIHRoZSBvcHRpb24gaXMgZW5hYmxlZCB0aGlzIHdpbGwgcmVuZGVyIHRoZSBjbG9jayB2aWV3IGFmdGVyIGEgZGF0ZSBwaWNrLlxuICAgICAqIEBwYXJhbSBlIGNoYW5nZSBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2hhbmRsZUFmdGVyQ2hhbmdlRXZlbnQoZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgIC8vIG9wdGlvbnMgaXMgZGlzYWJsZWRcbiAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucHJvbXB0VGltZU9uRGF0ZUNoYW5nZSB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuc2lkZUJ5U2lkZSB8fFxuICAgICAgICAgICAgLy8gdGltZSBpcyBkaXNhYmxlZFxuICAgICAgICAgICAgIXRoaXMuZGlzcGxheS5faGFzVGltZSB8fFxuICAgICAgICAgICAgLy8gY2xvY2sgY29tcG9uZW50IGlzIGFscmVhZHkgc2hvd2luZ1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LndpZGdldFxuICAgICAgICAgICAgICAgID8uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLnNob3cpWzBdXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLnRpbWVDb250YWluZXIpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBGaXJzdCB0aW1lIGV2ZXIuIElmIHVzZUN1cnJlbnQgb3B0aW9uIGlzIHNldCB0byB0cnVlIChkZWZhdWx0KSwgZG8gbm90aGluZ1xuICAgICAgICAvLyBiZWNhdXNlIHRoZSBmaXJzdCBkYXRlIGlzIHNlbGVjdGVkIGF1dG9tYXRpY2FsbHkuXG4gICAgICAgIC8vIG9yIGRhdGUgZGlkbid0IGNoYW5nZSAodGltZSBkaWQpIG9yIGRhdGUgY2hhbmdlZCBiZWNhdXNlIHRpbWUgZGlkLlxuICAgICAgICBpZiAoKCFlLm9sZERhdGUgJiYgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy51c2VDdXJyZW50KSB8fFxuICAgICAgICAgICAgKGUub2xkRGF0ZSAmJiBlLmRhdGU/LmlzU2FtZShlLm9sZERhdGUpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9jdXJyZW50UHJvbXB0VGltZVRpbWVvdXQpO1xuICAgICAgICB0aGlzLl9jdXJyZW50UHJvbXB0VGltZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkud2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy5hY3Rpb24uZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXMuZGlzcGxheS53aWRnZXQucXVlcnlTZWxlY3RvcignW2RhdGEtYWN0aW9uPVwidG9nZ2xlUGlja2VyXCJdJyksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogQWN0aW9uVHlwZXMkMS50b2dnbGVQaWNrZXIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucHJvbXB0VGltZU9uRGF0ZUNoYW5nZVRyYW5zaXRpb25EZWxheSk7XG4gICAgfVxufVxuLyoqXG4gKiBXaGVuZXZlciBhIGxvY2FsZSBpcyBsb2FkZWQgdmlhIGEgcGx1Z2luIHRoZW4gc3RvcmUgaXQgaGVyZSBiYXNlZCBvbiB0aGVcbiAqIGxvY2FsZSBuYW1lLiBFLmcuIGxvYWRlZExvY2FsZXNbJ3J1J11cbiAqL1xuY29uc3QgbG9hZGVkTG9jYWxlcyA9IHt9O1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuLyoqXG4gKiBDYWxsZWQgZnJvbSBhIGxvY2FsZSBwbHVnaW4uXG4gKiBAcGFyYW0gbCBsb2NhbGUgb2JqZWN0IGZvciBsb2NhbGl6YXRpb24gb3B0aW9uc1xuICovXG5jb25zdCBsb2FkTG9jYWxlID0gKGwpID0+IHtcbiAgICBpZiAobG9hZGVkTG9jYWxlc1tsLm5hbWVdKVxuICAgICAgICByZXR1cm47XG4gICAgbG9hZGVkTG9jYWxlc1tsLm5hbWVdID0gbC5sb2NhbGl6YXRpb247XG59O1xuLyoqXG4gKiBBIHNldHMgdGhlIGdsb2JhbCBsb2NhbGl6YXRpb24gb3B0aW9ucyB0byB0aGUgcHJvdmlkZWQgbG9jYWxlIG5hbWUuXG4gKiBgbG9hZExvY2FsZWAgTVVTVCBiZSBjYWxsZWQgZmlyc3QuXG4gKiBAcGFyYW0gbFxuICovXG5jb25zdCBsb2NhbGUgPSAobCkgPT4ge1xuICAgIGNvbnN0IGFza2VkID0gbG9hZGVkTG9jYWxlc1tsXTtcbiAgICBpZiAoIWFza2VkKVxuICAgICAgICByZXR1cm47XG4gICAgRGVmYXVsdE9wdGlvbnMubG9jYWxpemF0aW9uID0gYXNrZWQ7XG59O1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuLyoqXG4gKiBDYWxsZWQgZnJvbSBhIHBsdWdpbiB0byBleHRlbmQgb3Igb3ZlcnJpZGUgcGlja2VyIGRlZmF1bHRzLlxuICogQHBhcmFtIHBsdWdpblxuICogQHBhcmFtIG9wdGlvblxuICovXG5jb25zdCBleHRlbmQgPSBmdW5jdGlvbiAocGx1Z2luLCBvcHRpb24gPSB1bmRlZmluZWQpIHtcbiAgICBpZiAoIXBsdWdpbilcbiAgICAgICAgcmV0dXJuIHRlbXB1c0RvbWludXM7XG4gICAgaWYgKCFwbHVnaW4uaW5zdGFsbGVkKSB7XG4gICAgICAgIC8vIGluc3RhbGwgcGx1Z2luIG9ubHkgb25jZVxuICAgICAgICBwbHVnaW4ob3B0aW9uLCB7IFRlbXB1c0RvbWludXMsIERhdGVzLCBEaXNwbGF5LCBEYXRlVGltZSwgTmFtZXNwYWNlIH0sIHRlbXB1c0RvbWludXMpO1xuICAgICAgICBwbHVnaW4uaW5zdGFsbGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXB1c0RvbWludXM7XG59O1xuY29uc3QgdmVyc2lvbiA9ICc2LjcuMTMnO1xuY29uc3QgdGVtcHVzRG9taW51cyA9IHtcbiAgICBUZW1wdXNEb21pbnVzLFxuICAgIGV4dGVuZCxcbiAgICBsb2FkTG9jYWxlLFxuICAgIGxvY2FsZSxcbiAgICBOYW1lc3BhY2UsXG4gICAgRGVmYXVsdE9wdGlvbnMsXG4gICAgRGF0ZVRpbWUsXG4gICAgVW5pdCxcbiAgICB2ZXJzaW9uLFxuICAgIERlZmF1bHRFbkxvY2FsaXphdGlvbixcbn07XG5cbmV4cG9ydCB7IERhdGVUaW1lLCBEZWZhdWx0RW5Mb2NhbGl6YXRpb24sIERlZmF1bHRPcHRpb25zLCBOYW1lc3BhY2UsIFRlbXB1c0RvbWludXMsIFVuaXQsIGV4dGVuZCwgbG9hZExvY2FsZSwgbG9jYWxlLCB2ZXJzaW9uIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZW1wdXMtZG9taW51cy5lc20uanMubWFwXG4iLCJcblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodW5zYWZlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdW5zYWZlXG4gICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRIaWdobGlnaHRDbGFzcyhjb250ZW50OiBzdHJpbmcsIHRhcmdldFdvcmQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBjb250ZW50LnJlcGxhY2UobmV3IFJlZ0V4cChgXFxcXGIke3RhcmdldFdvcmR9XFxcXGJgLCAnZ2knKSwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cImhpZ2hsaWdodFwiPiR7bWF0Y2h9PC9zcGFuPmA7XG4gIH0pO1xufVxuIiwiXG5leHBvcnQgY2xhc3MgSnNvblRvSHRtbENvbnZlcnRlciB7XG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0KGpzb246IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChqc29uID09IG51bGwpIHJldHVybiB0aGlzLmVzY2FwZUh0bWwoXCI8ZW0+bnVsbDwvZW0+XCIpO1xuICAgICAgICBpZiAodHlwZW9mIGpzb24gIT09IFwib2JqZWN0XCIpIHJldHVybiB0aGlzLmVzY2FwZUh0bWwoanNvbi50b1N0cmluZygpKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlUb0h0bWwoanNvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RUb0h0bWwoanNvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhcnJheVRvSHRtbChhcnI6IGFueVtdKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaXRlbXNIdG1sID0gYXJyLm1hcChpdGVtID0+IGA8bGk+JHt0aGlzLmNvbnZlcnQoaXRlbSl9PC9saT5gKS5qb2luKFwiXCIpO1xuICAgICAgICByZXR1cm4gYDx1bD4ke2l0ZW1zSHRtbH08L3VsPmA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgb2JqZWN0VG9IdG1sKG9iajogYW55KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHJvcGVydGllc0h0bWwgPSBPYmplY3Qua2V5cyhvYmopXG4gICAgICAgICAgICAubWFwKGtleSA9PiBgPGxpPiR7dGhpcy5lc2NhcGVIdG1sKGtleSl9OiAke3RoaXMuY29udmVydChvYmpba2V5XSl9PC9saT5gKVxuICAgICAgICAgICAgLmpvaW4oXCJcIik7XG4gICAgICAgIHJldHVybiBgPHVsPiR7cHJvcGVydGllc0h0bWx9PC91bD5gO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGVzY2FwZUh0bWwodW5zYWZlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdW5zYWZlLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG4gICAgfVxufVxuXG4vLyBVc2FnZSBleGFtcGxlOlxuY29uc3QganNvbiA9IHtcbiAgICBjb2RlOiBcIkVSUk9SX0NPREVcIixcbiAgICBtZXNzYWdlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCIsXG4gICAgZGV0YWlsczoge1xuICAgICAgICBpbmZvOiBcIkRldGFpbGVkIGluZm9ybWF0aW9uIGFib3V0IHRoZSBlcnJvclwiLFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgaXRlbXM6IFsxLCAyLCAzXVxuICAgIH1cbn07XG5cbiIsImltcG9ydCBjaGFsaywgeyBDaGFsa0luc3RhbmNlIH0gZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHsgZXh0cmFjdENhbGxlckZyb21TdGFjaywgZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2sgfSBmcm9tICcuL1N0YWNrSGVscGVyJztcblxuY2hhbGsubGV2ZWwgPSAzO1xubGV0IGRlZmF1bHRNb2RlOiBDaGFsa0luc3RhbmNlID0gY2hhbGsucmVzZXQ7XG5cblxubGV0IGxhc3RTZWM6IFNlY3Rpb24gfCB1bmRlZmluZWQ7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2VjKCkge1xuXG4gICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKyspe1xuICAgIC8vIGNvbnNvbGUuZ3JvdXBFbmQoKVxuICAgIC8vIH1cblxuICAgIGlmIChsYXN0U2VjPy5ncm91cCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RTZWM/Lmdyb3VwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsYXN0U2VjID0gbmV3IFNlY3Rpb24oXCJSb290XCIsIGRlZmF1bHRNb2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlY0JhY2tPbmUoKSB7XG4gICAgbGFzdFNlYyA9IGxhc3RTZWM/LnBhcmVudDtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBTZWN0aW9uIHtcbiAgICBzZWN0aW9uTmFtZTogc3RyaW5nO1xuICAgIHBhcmVudDogU2VjdGlvbiB8IHVuZGVmaW5lZDtcbiAgICBjOiBDaGFsa0luc3RhbmNlXG4gICAgaW5kZW50ID0gMDtcbiAgICBpbmRlbnRQYWQgPSBcIlwiO1xuICAgIGdyb3VwOiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKHNlY3Rpb25OYW1lOiBzdHJpbmcsIGM6IENoYWxrSW5zdGFuY2UsIHNlY3Rpb24/OiBTZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuYyA9IGM7XG4gICAgICAgIHRoaXMuc2VjdGlvbk5hbWUgPSBzZWN0aW9uTmFtZTtcbiAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50ID0gc2VjdGlvbi5pbmRlbnQgKyAxO1xuICAgICAgICAgICAgdGhpcy5pbmRlbnRQYWQgPSBcIi1cIi5yZXBlYXQodGhpcy5pbmRlbnQgKiAyKSArIFwiIFwiO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RTZWMgPSB0aGlzO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHNlY3Rpb247XG4gICAgfVxuICAgIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkZWZhdWx0TW9kZShhcmdzKSk7XG4gICAgfVxuICAgIGxoMShoZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxoMSh0aGlzLmluZGVudFBhZCArIGhlYWRpbmcsIHRoaXMpXG4gICAgfVxuICAgIGxoMihoZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxoMih0aGlzLmluZGVudFBhZCArIGhlYWRpbmcsIHRoaXMpXG4gICAgfVxuICAgIGxoMyhoZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxoMyh0aGlzLmluZGVudFBhZCArIGhlYWRpbmcsIHRoaXMpXG4gICAgfVxuICAgIGwoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIGwodGhpcywgLi4uYXJncyk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbCguLi5hcmdzOiBhbnlbXSkge1xuXG4gICAgbGV0IHNlYzogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWM7XG4gICAgbGV0IGZpcnN0QXJnOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZpcnN0QXJnTW9kaWZlZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBTZWN0aW9uKSB7XG4gICAgICAgICAgICBzZWMgPSBhcmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmaXJzdEFyZyAmJiBhcmcuY29uc3RydWN0b3IubmFtZSA9PT0gXCJTdHJpbmdcIikge1xuICAgICAgICAgICAgZmlyc3RBcmcgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy9yZW1vdmVkIFNlY3Rpb24gZnJvbSBhcmdzXG4gICAgYXJncyA9IGFyZ3MuZmlsdGVyKChhcmcpID0+IHtcbiAgICAgICAgcmV0dXJuICEoYXJnIGluc3RhbmNlb2YgU2VjdGlvbik7XG4gICAgfSlcblxuXG4gICAgLy8gbGV0IGMgPSBzZWM/LmMgfHwgbW9kZTtcbiAgICBsZXQgYyA9IGRlZmF1bHRNb2RlO1xuICAgIGxldCBpbmRlbnRQYWQgPSBzZWM/LmluZGVudFBhZCB8fCBcIlwiO1xuXG4gICAgaWYgKCFmaXJzdEFyZykge1xuICAgICAgICBmaXJzdEFyZyA9IFwiXCI7XG4gICAgfVxuICAgIGZpcnN0QXJnTW9kaWZlZCA9IGZpcnN0QXJnO1xuXG4gICAgZmlyc3RBcmdNb2RpZmVkID0gaW5kZW50UGFkICsgZmlyc3RBcmc7XG4gICAgLy9yZW1vdmUgY29sb3IgZm9ybWF0dGluZyBmcm9tIGZpcnN0IGFyZ1xuICAgIGxldCB0b3RMZW4gPSBmaXJzdEFyZ01vZGlmZWQubGVuZ3RoIC0gZmlyc3RBcmdNb2RpZmVkLnJlcGxhY2UoL1xcdTAwMWJcXFsuKj9tL2csICcnKS5sZW5ndGggLSAyO1xuXG5cbiAgICBjb25zb2xlLmxvZyhmaXJzdEFyZ01vZGlmZWQpO1xuXG4gICAgLy9yZW1vdmVkIFNlY3Rpb24gZnJvbSBhcmdzXG5cbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmcpO1xuICAgIH0pXG5cblxufVxuXG5cblxuZnVuY3Rpb24gbG9nSGVhZGluZ1NlY3Rpb24oYzogQ2hhbGtJbnN0YW5jZSwgaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uPzogU2VjdGlvbikge1xuXG4gICAgbGV0IHNlYyA9IG5ldyBTZWN0aW9uKGhlYWRpbmcsIGMsIHNlY3Rpb24pO1xuICAgIGxldCB0aW1lID0gbmV3IERhdGUoRGF0ZS5ub3coKSkudG9Mb2NhbGVTdHJpbmcoKTtcblxuICAgIGxldCBwYXRoID0gXCJcIjtcbiAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICBwYXRoID0gc2VjdGlvbi5zZWN0aW9uTmFtZTtcbiAgICAgICAgd2hpbGUgKHNlY3Rpb24ucGFyZW50KSB7XG4gICAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbi5wYXJlbnQ7XG4gICAgICAgICAgICBwYXRoID0gc2VjdGlvbi5zZWN0aW9uTmFtZSArIFwiIC0+IFwiICsgcGF0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vYWRkIGFkZCBoZWFkaW5nIHRvIGVuZCBvZiBwYXRoIGFuZCBvbmx5IGFkZCAtPiBpZiBwYXRoIGlzIG5vdCBlbXB0eVxuICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcGF0aCArPSBcIiAtPiBcIjtcbiAgICB9XG4gICAgcGF0aCArPSBoZWFkaW5nO1xuXG5cblxuICAgIC8vcG9zaXRpb24gdGhlIGhlYWRpbmcgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2NyZWVuXG4gICAgLy8gY29uc29sZS5sb2coYyhoZWFkaW5nLnBhZFN0YXJ0KChjd2lkdGggLyAyKSArIChoZWFkaW5nLmxlbmd0aCAvIDIpLCBcIiBcIikucGFkRW5kKGN3aWR0aCwgXCIgXCIpKSk7XG4gICAgY29uc29sZS5ncm91cENvbGxhcHNlZChjKHBhdGgpKTtcbiAgICBzZWMuZ3JvdXArKztcblxuICAgIHJldHVybiBzZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDEoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdCbGFjay5ncmVlbkJyaWdodC5ib2xkO1xuICAgIHJldHVybiBsb2dIZWFkaW5nU2VjdGlvbihjLCBoZWFkaW5nLCBzZWN0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMihoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0dyYXkuY3lhbkJyaWdodC5ib2xkO1xuICAgIHJldHVybiBsb2dIZWFkaW5nU2VjdGlvbihjLCBoZWFkaW5nLCBzZWN0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMyhoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0dyYXkubWFnZW50YUJyaWdodC5ib2xkO1xuICAgIHJldHVybiBsb2dIZWFkaW5nU2VjdGlvbihjLCBoZWFkaW5nLCBzZWN0aW9uKTtcbn1cblxuXG5leHBvcnQgY29uc3QgbGggPSBsaDE7XG5cblxuZXhwb3J0IGNvbnN0IGltcCA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLnJlZC5ib2xkLmJnQmxhY2s7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBpbmYgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5ibHVlLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCB3cm4gPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay55ZWxsb3cuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn0gXG5cbmV4cG9ydCBjb25zdCBlcnIgPSAodGV4dDogc3RyaW5nKSA9PiB7XG5cbiAgICBsZXQgZXIgPSAobmV3IEVycm9yKCkpO1xuICAgIGxldCBsaW5lTm8gPSBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayhlci5zdGFjayk7XG4gICAgbGV0IGNhbGxlciA9IGV4dHJhY3RDYWxsZXJGcm9tU3RhY2soZXIuc3RhY2spO1xuXG4gICAgbGV0IHByZVRleHQgPSBgWyR7Y2FsbGVyfToke2xpbmVOb31dYDtcblxuICAgIHRleHQgPSBwcmVUZXh0ICsgXCIgXCIgKyB0ZXh0O1xuICAgIFxuICAgIGNvbnNvbGUubG9nKGVyKTtcblxuICAgIGxldCBjID0gY2hhbGsucmVkLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBzdWMgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5ncmVlbi5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaGwgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnQmx1ZSh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGhsMSA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdNYWdlbnRhKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgbnYgPSAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnQmx1ZUJyaWdodChuYW1lLnBhZEVuZCgzMCwgXCIgXCIpKSArIFwiIDogXCIgKyBjaGFsay5jeWFuQnJpZ2h0KHZhbHVlKTtcbn1cblxuIFxubGV0IGV4YW1wbGVKU29uID1cbntcbiAgICBcIm5hbWVcIjogXCJ0ZXN0XCIsXG4gICAgXCJhZ2VcIjogMTAsXG4gICAgXCJhZGRyZXNzXCI6IHtcbiAgICAgICAgXCJzdHJlZXRcIjogXCIxMjMgRmFrZSBTdHJlZXRcIixcbiAgICAgICAgXCJjaXR5XCI6IFwiTG9uZG9uXCIsXG4gICAgICAgIFwicG9zdGNvZGVcIjogXCJTVzFBIDFBQVwiXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuVGVzdCgpIHtcblxuXG4gICAgY29uc29sZS5sb2coXCItLSB0ZXN0IC0tXCIpXG5cbiAgICBsZXQgc2VjID0gbGgxKFwiVGVzdCBIZWFkaW5nIDFcIilcbiAgICBsKGltcChcIkF1dG8gU2VjIC0gVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgMVwiKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgMlwiKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgSU5GTzogXCIgKyBpbXAoXCJUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSBXSVRIIEFERElUSU5BTCBJTkZPOiBcIiArIGltcChcIlRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSArIFwiIGFuZCB0aGlzIGlzIHNvbWUgYWRkaXRpb25hbCBpbmZvXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJhZnRlciBhdXRvIHNlYyBUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG4gICAgc2VjID0gc2VjLmxoMihcIkhlYWRpbmcgMlwiKVxuICAgIHNlYy5sKFwiVGVzdFwiKVxuICAgIHNlYy5sKFwiVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG5cbiAgICBzZWMgPSBzZWMubGgzKFwiSGVhZCAzXCIpXG4gICAgbChcIlRlc3RcIilcbiAgICBsKFwiVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG4gICAgY2xlYXJTZWMoKTtcbiAgICBsKFwiVGVzdCBDbGVhciBTZWNcIilcbiAgICBsKFwiVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG5cblxuICAgIGwoXCJUZXN0IEpTT046XCIsIGV4YW1wbGVKU29uKTtcblxufVxuXG4vLyBydW5UZXN0KClcbmNsZWFyU2VjKCk7XG5cbi8vIGV4cG9ydCB7Y29sb3JzfTtcbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKHN0YWNrOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAoIXN0YWNrKSByZXR1cm4gbnVsbDtcbiAgICAvLyBFeHRyYWN0IGxpbmVzIGZyb20gc3RhY2tcbiAgICBjb25zdCBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIC8vIEZpbmQgdGhlIGxpbmUgd2l0aCB0aGUgZXJyb3IgKHVzdWFsbHkgdGhlIHNlY29uZCBsaW5lKVxuICAgIGNvbnN0IGVycm9yTGluZSA9IHN0YWNrTGluZXNbMV0gfHwgJyc7XG4gICAgLy8gRXh0cmFjdCBsaW5lIG51bWJlciBmcm9tIHRoZSBlcnJvciBsaW5lIHVzaW5nIHJlZ2V4XG4gICAgY29uc3QgbWF0Y2ggPSBlcnJvckxpbmUubWF0Y2goLzooXFxkKyk6KFxcZCspJC8pO1xuICAgIHJldHVybiBtYXRjaCA/IHBhcnNlSW50KG1hdGNoWzFdKSA6IG51bGw7XG4gIH1cbiAgXG4gZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RDYWxsZXJGcm9tU3RhY2soc3RhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghc3RhY2spIHJldHVybiBudWxsO1xuICAgIC8vIEV4dHJhY3QgbGluZXMgZnJvbSBzdGFja1xuICAgIGNvbnN0IHN0YWNrTGluZXMgPSBzdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgLy8gRmluZCB0aGUgbGluZSB3aXRoIHRoZSBjYWxsZXIgZnVuY3Rpb24gKHVzdWFsbHkgdGhlIHRoaXJkIGxpbmUpXG4gICAgY29uc3QgY2FsbGVyTGluZSA9IHN0YWNrTGluZXNbMl0gfHwgJyc7XG4gICAgLy8gRXh0cmFjdCBjYWxsZXIgZnVuY3Rpb24gbmFtZSB1c2luZyByZWdleFxuICAgIGNvbnN0IG1hdGNoID0gY2FsbGVyTGluZS5tYXRjaCgvYXQgKFtcXHcuPD5dKykvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IG51bGw7XG4gIH0iLCJcblxuZXhwb3J0IGludGVyZmFjZSBTaGFyZURvRXZlbnQge1xuICAgIGV2ZW50UGF0aDogc3RyaW5nO1xuICAgIGV2ZW50TmFtZTogc3RyaW5nO1xuICAgIHNvdXJjZTogYW55O1xuICAgIGRhdGE6IGFueTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZUV2ZW50KGV2ZW50OlNoYXJlRG9FdmVudCkge1xuXG4gICAgJHVpLmV2ZW50cy5icm9hZGNhc3QoZXZlbnQuZXZlbnRQYXRoLCBldmVudCk7XG59IiwiaW1wb3J0IHsgbCwgaW5mLCBlcnIgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0xvZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyVG9DbGFzcyhjbGFzc05hbWU6c3RyaW5nLCBiYXNlOmFueSkge1xuICAgIGNvbnN0IGNsYXNzUGFydHMgPSBjbGFzc05hbWUuc3BsaXQoJy4nKTtcbiAgICBsZXQgY2xhc3NSZWZlcmVuY2UgPSBiYXNlO1xuXG4gICAgZm9yIChjb25zdCBwYXJ0IG9mIGNsYXNzUGFydHMpIHtcbiAgICAgICAgaWYoIWNsYXNzUmVmZXJlbmNlW3BhcnRdKSBcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjbGFzc1JlZmVyZW5jZSA9IGNsYXNzUmVmZXJlbmNlW3BhcnRdO1xuICAgIH07IFxuICAgIHJldHVybiBjbGFzc1JlZmVyZW5jZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWxsRmllbGRzVG9OdWxsKG1vZGVsOmFueSkge1xuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobW9kZWwpO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5OiBhbnkpID0+IHtcbiAgICAgICAgbW9kZWxba2V5XSA9IG51bGw7XG4gICAgfSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5PYmplY3Qob2I6IGFueSkge1xuICAgIHZhciB0b1JldHVybjogYW55ID0ge307XG5cbiAgICBmb3IgKHZhciBpIGluIG9iKSB7XG4gICAgICAgIGlmICghb2IuaGFzT3duUHJvcGVydHkoaSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmICgodHlwZW9mIG9iW2ldKSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFyIGZsYXRPYmplY3QgPSBmbGF0dGVuT2JqZWN0KG9iW2ldKTtcbiAgICAgICAgICAgIGZvciAodmFyIHggaW4gZmxhdE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGlmICghZmxhdE9iamVjdC5oYXNPd25Qcm9wZXJ0eSh4KSkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICB0b1JldHVybltpICsgJy4nICsgeF0gPSBmbGF0T2JqZWN0W3hdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9SZXR1cm5baV0gPSBvYltpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG9SZXR1cm47XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldE5lc3RlZFByb3BlcnR5KG9iajogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBwcm9wZXJ0eVBhdGguc3BsaXQoJy4nKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHJvcCA9IHByb3BlcnRpZXNbaV07XG4gICAgICAgIGlmICghY3VycmVudFtwcm9wXSkge1xuICAgICAgICAgICAgY3VycmVudFtwcm9wXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgIH1cbiAgICBjdXJyZW50W3Byb3BlcnRpZXNbcHJvcGVydGllcy5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5lc3RlZFByb3BlcnR5KG9iajogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyk6IGFueSB7XG4gICAgbChpbmYoYGdldE5lc3RlZFByb3BlcnR5KCR7cHJvcGVydHlQYXRofSlgKSxvYmopO1xuICAgIFxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBwcm9wZXJ0eVBhdGguc3BsaXQoJy4nKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBwcm9wZXJ0eSBoYXMgYW4gYXJyYXkgaW5kZXgsIGUuZy4sIFwiZGF0YVswXVwiXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBwcm9wLm1hdGNoKC9eKFthLXpBLVowLTlfXSspXFxbKFswLTldKylcXF0kLyk7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5UHJvcCA9IG1hdGNoZXNbMV07XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KG1hdGNoZXNbMl0sIDEwKTtcblxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGN1cnJlbnRbYXJyYXlQcm9wXSkgfHwgY3VycmVudFthcnJheVByb3BdW2luZGV4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbChlcnIoYGdldE5lc3RlZFByb3BlcnR5KCR7cHJvcGVydHlQYXRofSk6IGFycmF5UHJvcCBvciBpbmRleCBpcyB1bmRlZmluZWRgKSxvYmopXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbYXJyYXlQcm9wXVtpbmRleF07XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFtwcm9wXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsKGVycihgZ2V0TmVzdGVkUHJvcGVydHkoJHtwcm9wZXJ0eVBhdGh9KTogcHJvcCBpcyB1bmRlZmluZWRgKSxvYmopXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudDtcbn0iLCJcbi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIHRoZSBhcGkgY2FsbHMgdG8gdGhlIGJhY2tlbmQuXG4gKiB1dGlsaXNpbmcgdGhlIGF4aW9zIGxpYnJhcnkgdG8gbWFrZSB0aGUgY2FsbHMuXG4gKiBpbmNsdXNpbmcgb2Ygd2VicGFja0lnbm9yZSBpcyB0byBhbGxvdyB0aGUgd2VicGFjayB0byBpZ25vcmUgdGhlIGNhbGxzIGFuZCBub3QgdHJ5IHRvIGJ1bmRsZSB0aGVtLlxuICovXG5cbmltcG9ydCB7IGVyciwgaW5mLCBsLCBsaDEsIHNlY0JhY2tPbmUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0xvZ1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVBvc3Q8VD4oYXBpOiBzdHJpbmcsIHBvc3RCb2R5OiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5wb3N0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJQT1NUXCIsIHBvc3RCb2R5KSkuZGF0YTtcbn1cblxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXQ8VD4oYXBpOiBzdHJpbmcpIDogUHJvbWlzZTxUPntcbi8vICAgICByZXR1cm4gYXdhaXQgJGFqYXguZ2V0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSk7XG4vLyB9IFxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJHRVRcIiwgdW5kZWZpbmVkKSkuZGF0YTtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldHYyPFQ+KGFwaTogc3RyaW5nKXtcbiAgICByZXR1cm4gIGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiR0VUXCIsIHVuZGVmaW5lZCk7XG59XG5cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVB1dDxUPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSk6IFByb21pc2U8VD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnB1dCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSksIHBvc3RCb2R5KTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiUFVUXCIsIHBvc3RCb2R5KSkuZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVEZWxldGU8VD4oYXBpOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5kZWxldGUoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpKTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiREVMRVRFXCIsIHVuZGVmaW5lZCkpLmRhdGE7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQXBpKGFwaTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbG9jYXRpb24gPSB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luO1xuXG4gICAgLy9pZiBhcGkgZG9lcyBub3QgaW5jbHVkZSB0aGUgbG9jYXRpb24gdGhlbiBhZGQgaXQuXG4gICAgaWYgKGFwaS5pbmRleE9mKGxvY2F0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgLy9jaGVjayBpZiBhcGkgc3RhcnQgd2l0aCBhIC8gaWYgbm90IGFkZCBpdC5cbiAgICAgICAgaWYgKGFwaS5pbmRleE9mKFwiL1wiKSAhPT0gMCkge1xuICAgICAgICAgICAgYXBpID0gXCIvXCIgKyBhcGk7XG4gICAgICAgIH1cblxuICAgICAgICBhcGkgPSBsb2NhdGlvbiArIGFwaTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaTtcblxufVxuXG5leHBvcnQgdHlwZSBURXhlY3V0ZUZldGNoUmVzcG9uc2UgPVxuICAgIHtcbiAgICAgICAgZGF0YTogYW55IHwgdW5kZWZpbmVkLFxuICAgICAgICByZXNwb25zZTogUmVzcG9uc2UgfCB1bmRlZmluZWQsXG4gICAgICAgIGluZm86XG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGJvb2xlYW4sXG4gICAgICAgICAgICBlcnJvcjogQXJyYXk8VFVzZXJFcnJvcnM+XG4gICAgICAgIH1cbiAgICB9XG5cbmV4cG9ydCB0eXBlIFRVc2VyRXJyb3JzID1cbiAgICB7XG4gICAgICAgIGNvZGU6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICB1c2VyTWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBzdWdnZXN0aW9ucz86IEFycmF5PHN0cmluZz5cbiAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9ucz86IEFycmF5PHN0cmluZz5cbiAgICAgICAgYWN0aW9ucz86IEFycmF5PHN0cmluZz5cbiAgICAgICAgZXJyb3JTdGFjaz86IHN0cmluZyxcbiAgICAgICAgYWRkaXRpb25hbEluZm8/OiBhbnlcbiAgICB9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRmV0Y2g8VD4oYXBpOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPFRFeGVjdXRlRmV0Y2hSZXNwb25zZT4ge1xuICAgIGxldCByZXRWYWx1ZTogVEV4ZWN1dGVGZXRjaFJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiB1bmRlZmluZWQsXG4gICAgICAgIGluZm86IHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFtdXG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIC8vdG8gZ2V0IG5ldyB0b2tlbiBUT0RPOiBjaGVjayBpZiBmYWlsIHRoZW4gY2FsbFxuICAgIC8vIGF3YWl0ICRhamF4LmdldChcImh0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvc2VjdXJpdHkvcmVmcmVzaFRva2Vucz9fPVwiICsgRGF0ZS5ub3cpO1xuXG4gICAgXG5cbiAgICBsZXQgdXJsID0gdmFsaWRhdGVBcGkoYXBpKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gYnVpbGRIZWFkZXJzKCk7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBmZXRjaEhlYWRlcnMsXG4gICAgICAgIGJvZHk6IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgICApLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldFZhbHVlLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIGlmIChyZXNwb25zZS5vayA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLiBzdGF0dXNUZXh0OiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCxcbiAgICAgICAgICAgICAgICB1c2VyTWVzc2FnZTogXCJBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBjYWxsIHRoZSBBUEkuXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIC8vY2hlY2sgaWYgcmVzcG9uc2UgaXMgSlNPTlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpPy5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldFZhbHVlLmluZm8uc3VjY2VzcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGU6IGFueSkge1xuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBleHRyYWN0IHRoZSBkYXRhIGZyb20gdGhlIEFQSS4gTWVzc2FnZTogJHtlPy5tZXNzYWdlIHx8IFwiVW5rbm93blwifWAsXG4gICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBleHRyYWN0IHRoZSBkYXRhIGZyb20gdGhlIEFQSS5gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkYXRhLCByZXNwb25zZSB9O1xuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsKGVycihgRXJyb3IgZnJvbSBBUEkgQ2FsbCAke3VybH1gKSwgZXJyb3IpO1xuXG4gICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7IGRhdGE6IHVuZGVmaW5lZCwgcmVzcG9uc2U6IHVuZGVmaW5lZCB9O1xuICAgIH0pXG5cbiAgICBsaDEoYFJlc3BvbnNlIGZyb20gJHt1cmx9YCk7XG4gICAgbChyZXNwb25zZSk7XG5cbiAgICByZXRWYWx1ZS5kYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgIGlmKHJldFZhbHVlLmluZm8uZXJyb3IubGVuZ3RoID4gMCl7XG4gICAgICAgIHJldFZhbHVlLmluZm8uc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBsKGVycihgRXJyb3IgZnJvbSBBUEkgQ2FsbCAke3VybH1gKSwgZSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VjQmFja09uZSgpO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufVxuXG5mdW5jdGlvbiBidWlsZEhlYWRlcnMoKSB7XG4gICAgbGV0IGJlYXJlciA9IGdldEJlYXJlclRva2VuKCk7XG4gICAgbGV0IGZldGNoSGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgZmV0Y2hIZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgaWYgKGJlYXJlcikge1xuICAgICAgICBmZXRjaEhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBiZWFyZXIpO1xuICAgIH1cbiAgICByZXR1cm4gZmV0Y2hIZWFkZXJzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWVzKCk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIGxldCByZXRWYWx1ZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICAgIGxldCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKS5yZWR1Y2UoZnVuY3Rpb24gKGNvb2tpZXMsIGNvb2tpZSkge1xuICAgICAgICB2YXIgcGFydHMgPSBjb29raWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFydHNbMV07XG5cbiAgICAgICAgICAgIHJldFZhbHVlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29va2llcztcbiAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVhcmVyVG9rZW4oKSB7XG4gICAgdmFyIGNvb2tpZXMgPSBnZXRDb29raWVzKCk7XG4gICAgdmFyIHRva2VuID0gY29va2llc1tcIl9hcGlcIl07XG5cbiAgICBpZiAodG9rZW4pIHJldHVybiBcIkJlYXJlciBcIiArIHRva2VuO1xuICAgIHJldHVybiBudWxsO1xufTsiLCJpbXBvcnQgeyBleGVjdXRlUG9zdCB9IGZyb20gXCIuLi9hcGlcIjtcbmltcG9ydCB7IElGaW5kQnlRdWVyeU9wdGlvbnMgfSBmcm9tIFwiLi9JRmluZEJ5UXVlcnlJbnB1dFwiO1xuaW1wb3J0IHsgSUZpbmRCeVF1ZXJ5UmVzdWx0IH0gZnJvbSBcIi4vSUZpbmRCeVF1ZXJ5UmVzdWx0XCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVGaW5kQnlRdWVyeTxUPihpbnB1dE9wdGlvbjogSUZpbmRCeVF1ZXJ5T3B0aW9ucyk6IFByb21pc2U8SUZpbmRCeVF1ZXJ5UmVzdWx0PFQ+Plxue1xuICAgIHJldHVybiBleGVjdXRlUG9zdDxJRmluZEJ5UXVlcnlSZXN1bHQ8VD4+KFwiL2FwaS92MS9wdWJsaWMvd29ya0l0ZW0vZmluZEJ5UXVlcnlcIiwgaW5wdXRPcHRpb24pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xufSIsImltcG9ydCB7IGV4ZWN1dGVGaW5kQnlRdWVyeSB9IGZyb20gXCIuL2V4ZWN1dGVGaW5kQnlRdWVyeS9GaW5kQnlRdWVyeVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIHNlYXJjaFJlc3VsdCBcbntcbiAgICBmb3VuZDpib29sZWFuLCBcbiAgICB2YWx1ZTpzdHJpbmcgfCB1bmRlZmluZWQsIFxuICAgIHBhcmVudElkOnN0cmluZyB8IHVuZGVmaW5lZFxuICAgIGRlcHRoOm51bWJlcixcbiAgICBmb3VuZEluV29ya0l0ZW1JZDpzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgd2FzRm91bmRJbkFuY2VzdG9yOmJvb2xlYW4sXG4gICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTpzdHJpbmcgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZSh3b3JrSXRlbUlkOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgcGFyZW50czogYm9vbGVhbiwgbWF4RGVwdGg/OiBudW1iZXIgfCB1bmRlZmluZWQpXG4ge1xuICAgIGxldCB1c2VNYXhEZXB0aCA6IGJvb2xlYW4gPSBtYXhEZXB0aCA/IHRydWUgOiBmYWxzZTtcbiAgICBpZihtYXhEZXB0aCAmJiBtYXhEZXB0aCA+IDApe1xuICAgICAgICB1c2VNYXhEZXB0aCA9IHRydWU7XG4gICAgfVxuXG5cbiAgICBsZXQgcmV0VmFsdWU6c2VhcmNoUmVzdWx0ID0ge2ZvdW5kOmZhbHNlLCB2YWx1ZTp1bmRlZmluZWQsIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6MCwgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLCB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkfTtcblxuICAgIHJldFZhbHVlID0gYXdhaXQgc2VhcmNoRm9yQXR0cmlidXRlKHdvcmtJdGVtSWQsIGF0dHJpYnV0ZU5hbWUpO1xuXG4gICAgaWYocmV0VmFsdWUuZm91bmQpe1xuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgfVxuXG4gICAgaWYoIXBhcmVudHMgKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnRzIG9yIGNoaWxkcmVuIHRvIHNlYXJjaCBzbyBvbmx5IHNlYXJjaGluZyBjdXJyZW50IHdvcmsgaXRlbVwiKTtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlXG4gICAgfVxuXG4gICAgaWYocGFyZW50cyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIHBhcmVudHNcIik7XG4gICAgICAgIGxldCBkZXB0aCA9IDA7XG4gICAgICAgIGxldCBzZWFyY2hQYXJlbnQgPSBhc3luYyAocGFyZW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgZGVwdGgrKztcbiAgICAgICAgICAgIGxldCByOiBzZWFyY2hSZXN1bHQgPSB7Zm91bmQ6ZmFsc2UsXG4gICAgICAgICAgICAgICAgIHZhbHVlOnVuZGVmaW5lZCwgXG4gICAgICAgICAgICAgICAgIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6ZGVwdGgsIC8vZGVwdGggaGVyZSB3aWxsIGJlIG92ZXJyaWRlbiBpZiB0aGVyZSBpcyBhIHBhcmVudFxuICAgICAgICAgICAgICAgICBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgICB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKCFwYXJlbnRJZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnQgZm91bmRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICByID0gYXdhaXQgc2VhcmNoRm9yQXR0cmlidXRlKHBhcmVudElkLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgICByLmRlcHRoID0gZGVwdGg7IC8vdXBkYXRlIGRlcHRoIGFzIGl0IHdpbGwgYmUgMFxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoci5mb3VuZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBhdHRyaWJ1dGUgaW4gcGFyZW50XCIpO1xuICAgICAgICAgICAgICAgIHIud2FzRm91bmRJbkFuY2VzdG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBpZih1c2VNYXhEZXB0aCAmJiBkZXB0aCA+PSBtYXhEZXB0aCEpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1heCBkZXB0aCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBpZighci5wYXJlbnRJZCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgZm91bmQgaW4gcGFyZW50XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hQYXJlbnQoci5wYXJlbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXRWYWx1ZSA9IGF3YWl0IHNlYXJjaFBhcmVudChyZXRWYWx1ZS5wYXJlbnRJZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xuXG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEZvckF0dHJpYnV0ZSh3b3JrSXRlbUlkOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZykge1xuICAgIC8vZ2V0IHRoZSBtYXR0ZXJcbiAgICBsZXQgcmV0VmFsdWUgOnNlYXJjaFJlc3VsdCA9IHtcbiAgICAgICAgZm91bmQ6ZmFsc2UsIHZhbHVlOnVuZGVmaW5lZCxcbiAgICAgICAgIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6MCxcbiAgICAgICAgICBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsXG4gICAgICAgICAgIHdhc0ZvdW5kSW5BbmNlc3RvcjpmYWxzZSxcbiAgICAgICAgICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTp1bmRlZmluZWR9O1xuICAgIGxldCByZXEgPSB7XG4gICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwid29ya0l0ZW1JZHNcIjogW1xuICAgICAgICAgICAgICAgIHdvcmtJdGVtSWRcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJlbnJpY2hcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInRpdGxlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwicGFyZW50LmlkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwidHlwZS5zeXN0ZW1OYW1lXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwicmVmZXJlbmNlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyB1c2luZyBTaGFyZURvIElkOiBcIiArIHdvcmtJdGVtSWQpO1xuICAgIGxldCBodHRwUmVzdWx0RmluZEJ5UXVlcnkgPSBhd2FpdCBleGVjdXRlRmluZEJ5UXVlcnk8YW55PihyZXEpO1xuICAgIGNvbnNvbGUubG9nKGBXb3JrIGl0ZW0gJHt3b3JrSXRlbUlkfSBmb3VuZGApO1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzKSk7XG5cblxuICAgIGxldCB0eXBlU3lzdGVtTmFtZSA9IGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbXCJ0eXBlLnN5c3RlbU5hbWVcIl07XG4gICAgbGV0IHBhcmVudElkID0gICAgICAgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVtcInBhcmVudC5pZFwiXTtcbiAgICBsZXQgYXR0cmlidXRlID0gICAgICBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW2F0dHJpYnV0ZU5hbWVdIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhgVHlwZSBzeXN0ZW0gbmFtZSBpcyAke3R5cGVTeXN0ZW1OYW1lfWApO1xuICAgIGNvbnNvbGUubG9nKGBQYXJlbnQgSWQgaXMgJHtwYXJlbnRJZH1gKTtcbiAgICBjb25zb2xlLmxvZyhgQXR0cmlidXRlIFske2F0dHJpYnV0ZU5hbWV9XSBpcyAke2F0dHJpYnV0ZX1gKTtcblxuICAgIHJldFZhbHVlLnZhbHVlID0gYXR0cmlidXRlO1xuICAgIGlmKGF0dHJpYnV0ZSl7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcmV0VmFsdWUuZm91bmRJbldvcmtJdGVtSWQgPSB3b3JrSXRlbUlkO1xuICAgICAgICByZXRWYWx1ZS5mb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lID0gdHlwZVN5c3RlbU5hbWU7XG4gICAgfVxuICAgIHJldFZhbHVlLnBhcmVudElkID0gcGFyZW50SWQ7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgXG59IiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XG5pbXBvcnQgeyBJU2hhcmVkb0JsYWRlTW9kZWwsIFRTaGFyZURvQmxhZGUsIElDb25maWd1cmF0aW9uSG9zdCB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1NoYXJlZG9Bc3BlY3RNb2RlbHNcIjtcbmltcG9ydCB7IElEZWJ1ZywgT2JzZXJ2YWJsZUlEZWJ1ZyB9IGZyb20gXCIuL0lEZWJ1Z1wiO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgVFNoYXJlZG8gfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9UU2hhcmVkb1wiO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5ncywgSVdpZGdldEpzb24sIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uIH0gZnJvbSBcIi4vSVdpZGdldEpzb25cIjtcbmltcG9ydCB7IFNoYXJlRG9FdmVudCwgZmlyZUV2ZW50IH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9FdmVudHNIZWxwZXJcIjtcbmltcG9ydCB7IGNsZWFyU2VjLCBlcnIsIGluZiwgbCwgbGgxLCBudiwgd3JuIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Mb2dcIlxuaW1wb3J0IHsgSUZvcm1CdWlsZGVyRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL0FzcGVjdC9JRm9ybUJ1aWxkZXJcIjtcbmltcG9ydCB7IFRVc2VyRXJyb3JzIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvYXBpXCI7XG5pbXBvcnQgeyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0LCB0b09ic2VydmFibGVPYmplY3QgfSBmcm9tIFwiLi9LT0NvbnZlcnRlclwiO1xuaW1wb3J0IHsgZ2V0TmVzdGVkUHJvcGVydHksIHNldE5lc3RlZFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9PYmplY3RIZWxwZXJcIjtcbmltcG9ydCB7IGVzY2FwZUh0bWwgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IEpzb25Ub0h0bWxDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0pzb25Ub0hUTUxDb252ZXJ0ZXJcIjtcbmltcG9ydCB7IHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZSB9IGZyb20gXCIuLi8uLi9Db21tb24vYXBpL3NlYXJjaEZvckF0dHJpYnV0ZVdpdGhQYXJlbnRzXCI7XG5cblxuY29uc29sZS5sb2coXCJ2OiAtIDUuMjdcIilcblxuZXhwb3J0IGNvbnN0IEZPTVJfQlVJTERFUl9QQVRIX1NUUklORyA9IFwiYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YVwiO1xuZXhwb3J0IGNvbnN0IEVSUk9SX0RJVl9TRUxFQ1RPUiA9IFwiI3JlbmRlci1lcnJvcnMtaGVyZVwiO1xuXG5cblxuXG5cblxuaW50ZXJmYWNlIElERUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIG1vZGVsOiBJU2hhcmVkb0JsYWRlTW9kZWw7XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGU7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZWlmeTxUPiA9IHtcbiAgICBbUCBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW1BdPjtcbn07XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9XG4gICAgeyBbSyBpbiBrZXlvZiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5dOiBrby5PYnNlcnZhYmxlPElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPltLXT47IH1cblxuLy8gZXhwb3J0IHR5cGUgSU9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9ICB7ZGVidWc6IGtvLk9ic2VydmFibGU8T2JzZXJ2YWJsZUlEZWJ1Zz59ICZcbi8vIHtcbi8vICAgICBbSyBpbiBrZXlvZiBUQ29uZmlnXTogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUQ29uZmlnPltLXTtcblxuLy8gfVxuXG5leHBvcnQgdHlwZSBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBJQ29uZmlndXJhdGlvbkhvc3QgJiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbi8vIGFic3RyYWN0IGNsYXNzIENyZWF0b3I8VENvbmZpZz4ge1xuLy8gICAgIHB1YmxpYyBhYnN0cmFjdCBGYWN0b3J5TWV0aG9kKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4sIGJhc2VNb2RlbDogYW55KTogYW55O1xuLy8gfVxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybUJ1aWxkZXJGaWVsZFBhdGgoZm9ybUJ1aWxkZXJGaWVsZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGAke0ZPTVJfQlVJTERFUl9QQVRIX1NUUklOR30uJHtmb3JtQnVpbGRlckZpZWxkfWA7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZVBlcnNvbjxUQ29uZmlnPiA9IE9ic2VydmFibGVpZnk8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+PjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VJREVBc3BlY3Q8VENvbmZpZywgVFBlcnNpdGFuY2U+ICB7XG4gICAgX2RhdGE6IGFueTsgLy9ub24gbW9kZWwgZGF0YSBzdG9yYWdlXG4gICAgb3JpZ2luYWxDb25maWd1cmF0aW9uITogVENvbmZpZztcbiAgICBjb25maWd1cmF0aW9uITogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGRlZmF1bHRzOiBJRGVmYXVsdFNldHRpbmdzPFRDb25maWc+IHwgdW5kZWZpbmVkO1xuICAgIGVsZW1lbnQhOiBIVE1MRWxlbWVudDtcbiAgICBtb2RlbDogYW55O1xuICAgIGVuYWJsZWQhOiBib29sZWFuO1xuICAgIGJsYWRlITogVFNoYXJlRG9CbGFkZTtcbiAgICBsb2FkZWQhOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNoYXJlZG9JZDogYW55O1xuICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSE6IGtvLk9ic2VydmFibGU8c3RyaW5nPjtcbiAgICB2YWxpZGF0aW9uOiBhbnk7XG4gICAgdmFsaWRhdGlvbkVycm9yQ291bnQhOiBrby5PYnNlcnZhYmxlPG51bWJlcj47XG4gICAgYmFzZU1vZGVsITogVFNoYXJlZG88YW55PjtcbiAgICB0aGlzQ29tcG9uZW50TmFtZSE6IHN0cmluZztcbiAgICBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGE6IHN0cmluZyB8IHVuZGVmaW5lZDsgLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tXG4gICAgb3B0aW9ucyE6IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPlxuICAgIHVuaXF1ZUlkITogc3RyaW5nO1xuICAgIHdpZGdldFNldHRpbmdzITogSVdpZGdldEpzb248VENvbmZpZz47XG4gICAgYXNwZWN0TG9nT3V0cHV0OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICBsaXZlQ29uZmlnRGl2OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICBsaXZlQ29uZmlnRGF0YTogYW55O1xuICAgIGVycm9yRGl2U2VsZWN0b3I6IHN0cmluZztcbiAgICBlcnJvcnM6IGtvLk9ic2VydmFibGVBcnJheTxUVXNlckVycm9ycz4gfCB1bmRlZmluZWQ7XG4gICAgXG4gICAgXG5cblxuXG4gICAgLyoqXG4gICAgICogQmFzZSBDb25zdHJ1Y3RvciBmb3IgYWxsIElERUFzcGVjdHMsIGZvcmNlcyB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvYWQgYW5kIHNhdmUgbWV0aG9kc1xuICAgICAqIEBwYXJhbSBjb21wb25lbnROYW1lIC8vVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBlLmcuIEFzcGVjdC5RdWlja1ZpZXdcbiAgICAgKiBAcGFyYW0gbG9hZFNhdmVMb2NhdGlvbiAvL1RoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gZS5nLiBtb2RlbC5hc3BlY3QuRm9ybUJ1aWxkZXIuZm9ybURhdGFcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAvL1RoZSBlbGVtZW50IHRoYXQgdGhlIGFzcGVjdCBpcyBib3VuZCB0b1xuICAgICAqIEBwYXJhbSBjb25maWd1cmF0aW9uIC8vVGhlIGNvbmZpZ3VyYXRpb24gcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlIGFuZCB0aGUgZGVzaWduIHRpbWUgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBiYXNlTW9kZWwgLy9UaGUgYmFzZSBtb2RlbCBwYXNzZWQgaW4gZnJvbSB0aGUgYmxhZGVcbiAgICAgKiBAcGFyYW0gZGVmYXVsdHMgLy9UaGUgZGVmYXVsdHMgcGFzc2VkIGluIGZyb20gdGhlIHdpZGdldCB0byBzZXQgaW5jYXNlIG9mIGJhZCBjb25maWd1cmF0aW9uIG9yIG1pc3NpbmcgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IFRDb25maWcsIGJhc2VNb2RlbDogVFNoYXJlZG88YW55PilcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoLi4uYXJyOiBhbnlbXSkge1xuXG4gICAgICAgIHRoaXMud2lkZ2V0U2V0dGluZ3MgPSB0aGlzLnNldFdpZGdldEpzb25TZXR0aW5ncygpO1xuICAgICAgICB0aGlzLnRoaXNDb21wb25lbnROYW1lID0gdGhpcy5zZXRUaGlzQ29tcG9uZW50TmFtZSgpO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gdGhpcy5zZXREZWZhdWx0cygpOyAvL3NldHVwIHRoZSBkZWZhdWx0IGJ5IGNhbGxpbmcgdGhlIGFic3RyYWN0IG1ldGhvZCBpbiB0aGUgY2hpbGQgY2xhc3NcblxuICAgICAgICB0aGlzLmVycm9yRGl2U2VsZWN0b3IgPSBFUlJPUl9ESVZfU0VMRUNUT1I7XG4gICAgICAgIHRoaXMuZXJyb3JzID0ga28ub2JzZXJ2YWJsZUFycmF5PFRVc2VyRXJyb3JzPigpO1xuXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGJhc2UgY29uc3RydWN0b3JcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNvbnN0cnVjdG9yIHRoYXQgaXMgY2FsbGVkIGJ5IHRoZSBJREVcbiAgICAgICAgICAgIHRoaXMudW5pcXVlSWQgPSB1dWlkKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpc2UoYXJyWzBdLCBhcnJbMV0sIGFyclsyXSk7XG4gICAgICAgICAgICB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IHRoaXMuc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uU2V0dXBcIiwgdGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudChcImFmdGVyU2V0dXBcIiwgdGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwTGl2ZUNvbmZpZygpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cEVycm9yTWFuYWdlcigpO1xuICAgICAgICAgICAgdGhpcy5hZGRBc3BlY3RMb2dPdXRwdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX2luaXRpYWxpc2UoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+LCBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT4pIHtcblxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAvL1NoYXJlRG8gcGFzc2VzIHRoZSBjb25maWcgYXMgd2VsbCBhcyBvdGhlciBzdHVmZiwgc28gd2UgbmVlZCB0byBleHRyYWN0IHRoZSBjb25maWdcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIGFzIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICAgICAgdGhpcy5iYXNlTW9kZWwgPSBiYXNlTW9kZWw7XG5cbiAgICAgICAgLy8gdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb25cblxuICAgICAgICBsZXQgYmFzZURlZmF1bHRzOiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxhbnk+ID0ge1xuICAgICAgICAgICAgZGVidWc6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2dUb0NvbnNvbGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGl2ZUNvbmZpZzogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoYmFzZURlZmF1bHRzLmRlYnVnLCBjb25maWd1cmF0aW9uLmRlYnVnKSBhcyBJRGVidWc7XG5cbiAgICAgICAgLy8gdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24uZGVidWcgPSAkLmV4dGVuZChiYXNlRGVmYXVsdHMuZGVidWcsIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmRlYnVnKSBhcyBJRGVidWc7XG5cbiAgICAgICAgLy8gY29uZmlndXJhdGlvbi5kZWJ1ZyA9ICQuZXh0ZW5kKGJhc2VEZWZhdWx0cywgY29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnO1xuXG4gICAgICAgIC8vIHRoaXMuY29uZmlndXJhdGlvbiA9ICQuZXh0ZW5kKGJhc2VEZWZhdWx0cywgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24pIGFzIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICAgICAgLy8gdGhpcy5kYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBNZXJnZSB0aGUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZCh0aGlzLmRlZmF1bHRzLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbikgYXMgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuXG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IG1vZGVsXG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3QubW9kZWw7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMubW9kZWwuY2FuRWRpdDtcbiAgICAgICAgdGhpcy5ibGFkZSA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdC5ibGFkZTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0aGlzLmxvYWRlZCB8fCBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgLy8gTWFwIHRoZSBiYXNlIG1vZGVsIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5zaGFyZWRvSWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsLmlkO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb0lkIHx8IHRoaXMuc2hhcmVkb0lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb0lkIGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Lm1vZGVsLnNoYXJlZG9UeXBlU3lzdGVtTmFtZTtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSB8fCB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgICh0aGlzLm9wdGlvbnMgYXMgYW55KSA9IHRvT2JzZXJ2YWJsZU9iamVjdCh0aGlzLmNvbmZpZ3VyYXRpb24sICh0aGlzLm9wdGlvbnMgYXMgYW55KSk7XG5cblxuICAgICAgICAvLyBWYWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvckNvdW50ID0gdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCB8fCBrby5vYnNlcnZhYmxlKDApO1xuXG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTsgLy9zZXR1cCB0aGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tIGJ5IGNhbGxpbmcgdGhlIGFic3RyYWN0IG1ldGhvZCBpbiB0aGUgY2hpbGQgY2xhc3NcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkluaXRpYWxpc2VcIiwgdGhpcy5tb2RlbCk7XG4gICAgfVxuXG4gICAgY2xlYXJFcnJvcnMoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JzPy5yZW1vdmVBbGwoKTtcbiAgICB9XG5cbiAgICBzZXR1cEVycm9yTWFuYWdlcigpIHtcblxuICAgICAgICB0aGlzLmwoXCJTZXR0aW5nIHVwIGVycm9yIG1hbmFnZXJcIik7XG4gICAgICAgIHRoaXMuZXJyb3JzPy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluZihcIkVycm9ycyBjaGFuZ2VkXCIsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRFcnJvckRpdigpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHNldHVwTGl2ZUNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmRlYnVnLnN1YnNjcmliZSgobmV3VmFsdWU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLmxpdmVDb25maWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2YXRlTGl2ZUNvbmZpZyhuZXdWYWx1ZS5saXZlQ29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVMaXZlQ29uZmlnKCh0aGlzLm9wdGlvbnMuZGVidWcoKS5saXZlQ29uZmlnIGFzIGFueSkoKSk7IC8vVE9ETyBmaXggdHlwaW5nc1xuICAgIH1cblxuICAgIGFjdGl2YXRlTGl2ZUNvbmZpZyhhY3RpdmU6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZUNvbmZpZ0Rpdj8ucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXZlQ29uZmlnRGl2KSB7IC8vbGVhdmUgYWxvbmUgaWYgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubChcIlNldHRpbmcgdXAgbGl2ZSBjb25maWdcIik7XG5cbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZERhdGEgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmNvbmZpZ3VyYXRpb24sIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcIl9ob3N0XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9LCA0KTtcblxuICAgICAgICAvL2Nsb25lIHRoZSBjb25maWdcbiAgICAgICAgbGV0IGNvbmZpZyA9IGtvLm9ic2VydmFibGUoc2VyaWFsaXplZERhdGEpO1xuXG4gICAgICAgIHRoaXMubGl2ZUNvbmZpZ0RhdGEgPSB7XG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgdGltZW91dDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cblxuICAgICAgICB0aGlzLmxpdmVDb25maWdEaXYgPSB0aGlzLmNyZWF0ZUxpdmVDb25maWdEaXYoKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnQucHJlcGVuZCh0aGlzLmxpdmVDb25maWdEaXYpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uZmlnLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRoZSBuZXcgdmFsdWUgaXMgXCIgKyBuZXdWYWx1ZSlcblxuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpc2UodGhpcy5lbGVtZW50LCBuZXdDb25maWcsIHRoaXMuYmFzZU1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldChuZXdDb25maWcpO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHRydWU7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAzMDAwKTtcblxuXG4gICAgICAgIC8vIGtvLmFwcGx5QmluZGluZ3ModGhpcy5saXZlQ29uZmlnRGF0YSwgdGhpcy5saXZlQ29uZmlnRGl2KTt4XG5cbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFic3RyYWN0IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gcmVmcmVzaCB0aGUgYXNwZWN0IGJhc2VkIG9uIHRoZSBuZXcgY29uZmlnXG4gICAgICogQHBhcmFtIG5ld0NvbmZpZyBcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByZWZyZXNoKG5ld0NvbmZpZzogYW55KTogdm9pZDtcblxuICAgIC8qKlxuICAgICogQWJzdHJhY3QgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byByZXNldCB0aGUgYXNwZWN0IGJhc2VkIG9uIHRoZSBuZXcgY29uZmlnXG4gICAgKiBAcGFyYW0gbmV3Q29uZmlnIFxuICAgICovXG4gICAgYWJzdHJhY3QgcmVzZXQobmV3Q29uZmlnOiBhbnkpOiB2b2lkO1xuXG4gICAgZW5zdXJlU3R5bGVzTG9hZGVkKGhyZWY6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpbmtbaHJlZj1cIiR7aHJlZn1cIl1gKSkge1xuICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9IGhyZWY7XG4gICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTGl2ZUNvbmZpZ0RpdigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgb3V0ZXIgPGRpdj4gd2l0aCBjbGFzcyBcImNvbC1zbS0xMiBmb3JtYnVpbGRlci1lZGl0b3ItanNvblwiXG4gICAgICAgIGNvbnN0IG91dGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG91dGVyRGl2LmNsYXNzTmFtZSA9ICdjb2wtc20tMTIgZm9ybWJ1aWxkZXItZWRpdG9yLWpzb24nO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgaW5uZXIgPGRpdj4gd2l0aCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXNcbiAgICAgICAgY29uc3QgaW5uZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5uZXJEaXYuaWQgPSAnbGl2ZUNvbmZpZyc7XG4gICAgICAgIGlubmVyRGl2LmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wgdGV4dGFyZWEnO1xuICAgICAgICBpbm5lckRpdi5zdHlsZS5oZWlnaHQgPSAnMzAwcHgnO1xuICAgICAgICAvLyBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsICdzeW50YXhFZGl0b3I6IGxpdmVDb25maWdEYXRhLmNvbmZpZywgZW5hYmxlOiB0cnVlLCBldmVudDogeyBmb2N1c291dDogbGl2ZUNvbmZpZ0RhdGEub25Gb2N1c091dCB9Jyk7XG4gICAgICAgIGlubmVyRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgJ3N5bnRheEVkaXRvcjogbGl2ZUNvbmZpZ0RhdGEuY29uZmlnJyk7XG4gICAgICAgIC8vIGlubmVyRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgJ3N5bnRheEVkaXRvcjogbW9kZWwuY29uZmlnJyk7XG4gICAgICAgIC8vIEFwcGVuZCB0aGUgaW5uZXJEaXYgdG8gdGhlIG91dGVyRGl2XG4gICAgICAgIG91dGVyRGl2LmFwcGVuZENoaWxkKGlubmVyRGl2KTtcblxuICAgICAgICByZXR1cm4gb3V0ZXJEaXY7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0RGF0YSgpIHtcblxuICAgICAgICBpZiAodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBsb2FkIGRhdGEgZnJvbSBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmVzdGVkRGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcblxuICAgICAgICBpZihuZXN0ZWREYXRhICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRGF0YSBmb3VuZCBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsIG5lc3RlZERhdGEpO1xuICAgICAgICAgICAgbGV0IHJldFZhbHVlID0ga28udG9KUyhuZXN0ZWREYXRhKTtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRGF0YSBmb3VuZCBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsIHJldFZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiByZXRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgXG5cbiAgICAgICAgaWYobmVzdGVkRGF0YSA9PT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9ucy5kYXRhU2V0dGluZ3MoKS5nZXRWYWx1ZVVzaW5nUGFyZW50cyA9PT0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZSh0aGlzLnNoYXJlZG9JZCx0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSx0aGlzLm9wdGlvbnMuZGF0YVNldHRpbmdzKCkuZ2V0VmFsdWVVc2luZ1BhcmVudHMhLHRoaXMub3B0aW9ucy5kYXRhU2V0dGluZ3MoKS5tYXhEZXB0aCkudGhlbigoZGF0YSk9PntcbiAgICAgICAgICAgICAgICBpZihkYXRhLmZvdW5kKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXN0ZWREYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYnVpbGRFcnJvckRpdigpIHtcbiAgICAgICAgdGhpcy5pbmYoXCJCdWlsZGluZyBlcnJvciBkaXZcIilcbiAgICAgICAgbGV0IGVycm9yRGl2ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lcnJvckRpdlNlbGVjdG9yKTtcbiAgICAgICAgaWYgKCFlcnJvckRpdiApIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbChcImVycm9yRGl2LmlubmVySFRNTFwiKVxuICAgICAgICBlcnJvckRpdi5pbm5lckhUTUwgPSBcIlwiOyAvL2NsZWFuIG91dCB0aGUgZGl2XG5cbiAgICAgICAgaWYoIXRoaXMuZXJyb3JzKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IGtvLm9ic2VydmFibGVBcnJheTxUVXNlckVycm9ycz4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmVycm9ycygpLmxlbmd0aCA9PT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVycm9yQ29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZXJyb3JEaXYuYXBwZW5kQ2hpbGQoZXJyb3JDb250YWluZXJEaXYpO1xuXG4gICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1jb250YWluZXJcIjtcbiAgICAgICAgbGV0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGl0bGVEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXRpdGxlXCI7XG4gICAgICAgIHRpdGxlRGl2LmlubmVyVGV4dCA9IFwiVGhlcmUgaGFzIGJlZW4gYW4gZXJyb3I6XCI7XG4gICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcbiAgICAgICAgbGV0IGZvcmVhY2hEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChmb3JlYWNoRGl2KTtcbiAgICAgICBcbiAgICAgICAgdGhpcy5lcnJvcnMoKS5mb3JFYWNoKChlcnJvcikgPT4ge1xuXG4gICAgICAgICAgICBsZXQgdXNlck1lc3NhZ2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdXNlck1lc3NhZ2VEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXVzZXItbWVzc2FnZVwiO1xuICAgICAgICAgICAgdXNlck1lc3NhZ2VEaXYuaW5uZXJIVE1MID0gZXJyb3IudXNlck1lc3NhZ2U7XG5cblxuICAgICAgICAgXG4gICAgICAgICAgICB1c2VyTWVzc2FnZURpdi5vbmNsaWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgYSBkaXYgdGhhdCBjYW4gc2NvbGxcbiAgICAgICAgICAgICAgICBsZXQgZGV0YWlsZWRNZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBkZXRhaWxlZE1lc3NhZ2VEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWRldGFpbGVkLW1lc3NhZ2VcIjtcbiAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGVzY2FwZUh0bWwoZXJyb3IuY29kZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXNjYXBlSHRtbChlcnJvci5tZXNzYWdlIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJNZXNzYWdlID0gZXNjYXBlSHRtbChlcnJvci51c2VyTWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvclN0YWNrID0gZXNjYXBlSHRtbChlcnJvci5lcnJvclN0YWNrIHx8IFwiXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbEluZm8gPSBKc29uVG9IdG1sQ29udmVydGVyLmNvbnZlcnQoZXJyb3IuYWRkaXRpb25hbEluZm8gfHwge30pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaHRtbCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5FcnJvcjogJHtjb2RlfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5NZXNzYWdlOjwvc3Ryb25nPiAke21lc3NhZ2V9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+VXNlciBNZXNzYWdlOjwvc3Ryb25nPiAke3VzZXJNZXNzYWdlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlN0YWNrOjwvc3Ryb25nPiAke2Vycm9yU3RhY2t9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+QWRkaXRpb25hbCBJbmZvOjwvc3Ryb25nPiAke2FkZGl0aW9uYWxJbmZvfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG5cbiAgICAgICAgICAgICAgICBkZXRhaWxlZE1lc3NhZ2VEaXYuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAgICAgICAgICR1aS5lcnJvckRpYWxvZyhkZXRhaWxlZE1lc3NhZ2VEaXYpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZCh1c2VyTWVzc2FnZURpdik7XG5cbiAgICAgICAgICAgIGlmIChlcnJvci5zdWdnZXN0aW9ucyAmJiBlcnJvci5zdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1Z2dlc3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3Itc3VnZ2VzdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uc0Rpdi5pbm5lckhUTUwgPSBgPGI+U3VnZ2VzdGlvbnM6PC9iPjxici8+JHtlcnJvci5zdWdnZXN0aW9ucy5qb2luKFwiPGJyLz5cIil9YDtcbiAgICAgICAgICAgICAgICBmb3JlYWNoRGl2LmFwcGVuZENoaWxkKHN1Z2dlc3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVycm9yLmFjdGlvbnMgJiYgZXJyb3IuYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGFjdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWFjdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBhY3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5BY3Rpb25zOjwvYj48YnIvPiR7ZXJyb3IuYWN0aW9ucy5qb2luKFwiPGJyLz5cIil9YDtcbiAgICAgICAgICAgICAgICBmb3JlYWNoRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNEaXYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3IuaW50ZXJuYWxTdWdnZXN0aW9ucyAmJiBlcnJvci5pbnRlcm5hbFN1Z2dlc3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJuYWxTdWdnZXN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItaW50ZXJuYWwtc3VnZ2VzdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5JbnRlcm5hbCBTdWdnZXN0aW9uczo8L2I+PGJyLz4ke2Vycm9yLmludGVybmFsU3VnZ2VzdGlvbnMuam9pbihcIjxici8+XCIpfWA7XG4gICAgICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZChpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKCkuc3VwcG9ydFJlcXVlc3RFbmFibGVkKSB7XG4gICAgICAgICAgICBsZXQgYWN0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGFjdGlvbkRpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3Itc3VwcG9ydC1hY3Rpb25cIjtcbiAgICAgICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGFjdGlvbkRpdik7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcImJ0biBidG4tcHJpbWFyeVwiO1xuICAgICAgICAgICAgLy8gYnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmluZFwiLFwiY2xpY2s6Y3JlYXRlU3VwcG9ydFRhc2ssdmlzaWJsZTpvcHRpb25zLmRlYnVnLi5zdXBwb3J0UmVxdWVzdEVuYWJsZWRcIik7XG4gICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJDcmVhdGUgU3VwcG9ydCBUYXNrXCI7XG4gICAgICAgICAgICBhY3Rpb25EaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgfVxuXG5cblxuXG4gICAgfVxuXG4gICAgc2V0RGF0YSh2YWx1ZTogVFBlcnNpdGFuY2UgfCB1bmRlZmluZWQpIHtcblxuICAgICAgICBpZiAodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBzYXZlIGRhdGEgdG8gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IHZhbHVlVG9TZXQ6IGFueSA9IHZhbHVlO1xuICAgICAgICAvLyBpZih0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YS5pbmNsdWRlcyhcImZvcm1CdWlsZGVyXCIpKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICAvL2Zvcm1idWlsZGVyIERhdGEgYWx3YXlzIG5lZWQgdG8gYmUgc3RyaW5nXG4gICAgICAgIC8vICAgICB0aGlzLmxvZyhcIlNldHRpbmcgZm9ybWJ1aWxkZXIgZGF0YSAtIGNvbnZlcnRpbmcgdG8gc3RyaW5nXCIsIFwiZ3JlZW5cIiwgdmFsdWUpXG4gICAgICAgIC8vICAgICB2YWx1ZVRvU2V0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAvLyAgICAgdGhpcy5sb2coXCJhZnRlciBTZXR0aW5nIGZvcm1idWlsZGVyIGRhdGEgLSBjb252ZXJ0ZWQgdG8gc3RyaW5nXCIsIFwiZ3JlZW5cIiwgdmFsdWVUb1NldClcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLmxvZyhcIlNldHRpbmcgZGF0YSBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsIHZhbHVlVG9TZXQpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eSh0aGlzLm1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgdmFsdWVUb1NldCk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25EYXRhQ2hhbmdlZFwiLCB0aGlzLm1vZGVsKTtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0c1xuICAgICAqICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBjb25zdHJ1Y3RvciB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogQHJldHVybnMgRGVmYXVsdHM8VENvbmZpZz5cbiAgICAgKiBAbWVtYmVyb2YgQmFzZUlERUFzcGVjdFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIFxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldERlZmF1bHRzKCk6IElEZWZhdWx0U2V0dGluZ3M8VENvbmZpZz47XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0cyBmb3IgdGhlIHdpZGdldC5qc29uXG4gICAgLy8gICovXG4gICAgLy8gYWJzdHJhY3Qgc2V0RXhhbXBsZUZvck1vZGVsbGVyKCk6IERlZmF1bHRzPFRDb25maWc+O1xuXG4gICAgLyoqXG4gICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gbG9hZCBhbmQgc2F2ZSB0b1xuICAgICogRXhhbXBsZXMgb2YgdGhpcyBhcmU6XG4gICAgKiAtIGFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEue2Zvcm1CdWlsZGVyRmllbGR9XG4gICAgKiAtIGFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXG4gICAgKiAtIHVuZGVmaW5lZCAoaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3MpXG4gICAgKiBAcmV0dXJucyBUaGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gbG9hZCBhbmQgc2F2ZSB0byBPUiB1bmRlZmluZWQgaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3NcbiAgICAqL1xuICAgIGFic3RyYWN0IHNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IGUuZy4gUXVpY2tWaWV3IFxuICAgICAqIFRoaXMgd2lsbCBhbHNvIGJlIHVzZWQgZHVyaW5nIHRoZSBidWlsZCBhbmQgd2lsbCBiZSBhcHBlbmRlZCB3aXRoIHRoZSBCdWlsdCBUYXJnZXQgZS5nLiBJREVBc3BlY3RzLlF1aWNrVmlld1xuICAgICAqL1xuICAgIGFic3RyYWN0IHNldFRoaXNDb21wb25lbnROYW1lKCk6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIGZpcnN0IG1ldGhvZCBvbmNlIHRoZSBjbGFzcyBoYXMgYmVlbiBjb25zdHJ1Y3RlZCwgZGVmYXVsdCBjb250cnVjdG9yIGxvZ2ljIHNob3VsZCBiZSBwbGFjZWQgaGVyZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldHVwKCk6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBzZXR0aW5ncyBmb3IgdGhlIHdpZGdldC5qc29uIHRoYXQgd2lsbCBiZSBnZW5lcmF0ZWRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248VENvbmZpZz47XG5cblxuXG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U2NyaXB0RmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U3R5bGVGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudE1lbnVUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudENvbXBvbmVudEZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldFdpZGdldERlc2lnbmVyU2V0dGluZ3MoKTogSVdpZGdldEpzb25EZXNpZ25lcjtcbiAgICAvLyBhYnN0cmFjdCBzZXRQcmlvcml0eSgpIDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiB0aGUgbW9kZWwgaXMgc2F2ZWQuIE1hbmlwdWxhdGUgdGhlXG4gICAgICogbW9kZWwgYXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgIGFzeW5jIG9uU2F2ZShtb2RlbDogYW55KSB7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25TYXZlXCIsIG1vZGVsKTtcblxuICAgICAgICBsZXQgZGF0YVRvU2F2ZSA9IGF3YWl0IHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICB0aGlzLmxvZyhcIlNhdmluZywgbW9kZWwgcGFzc2VkIGluIHdlIG5lZWQgdG8gcGVyc2lzdCB0b1wiLCBcImdyZWVuXCIsIGRhdGFUb1NhdmUpO1xuXG4gICAgICAgIGlmICh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGxvY2F0aW9uIHRvIHNhdmUgZGF0YSB0byBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgZGF0YVRvUGVyc2lzdCA9IGF3YWl0IHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICBsZXQgY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICBpZiAoY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBDdXJyZW50IGRhdGEgYXQgbG9jYXRpb24gJHt0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YX0gOmAsIFwibWFnZW50YVwiLCBjdXJyZW50RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50RGF0YSkge1xuICAgICAgICAgICAgLy8gdGhpcy5sb2coXCJEYXRhIGRvZXMgbm90IGV4aXN0LCB3ZSB3aWxsIGNyZWF0ZVwiLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIC8vICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIHt9KTtcbiAgICAgICAgICAgIC8vIGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZyhgTmV3IGRhdGEgdG8gcGVyc2lzdCB0byBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfSA6YCwgXCJibHVlXCIsIGRhdGFUb1BlcnNpc3QpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIGRhdGFUb1BlcnNpc3QpO1xuXG4gICAgfTtcblxuXG5cblxuICAgIG9uRGVzdHJveShtb2RlbD86IGFueSkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uRGVzdHJveVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkRlc3Ryb3lcIiwgbW9kZWwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayBhZnRlciBpbml0aWFsIGNyZWF0aW9uIGFuZCBiaW5kaW5nIHRvIGxvYWQgZGF0YVxuICAgICAqIGludG8gaXQncyBtb2RlbFxuICAgICAqL1xuICAgIGxvYWRBbmRCaW5kKCkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IGxvYWRBbmRCaW5kXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWw6YW55KSBwYXNzZWQgaW5cIiwgXCJncmVlblwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgYmFzZWQgb24gbG9jYXRpb24gdG8gc2F2ZVwiLCBcImdyZWVuXCIsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkxvYWRcIiwgdGhpcy5tb2RlbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGJlZm9yZSB0aGUgbW9kZWwgaXMgc2F2ZWRcbiAgICAgKi9cbiAgICBvbkJlZm9yZVNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkJlZm9yZVNhdmVcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25CZWZvcmVTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGFmdGVyIHRoZSBtb2RlbCBoYXMgYmVlbiBzYXZlZC5cbiAgICAgKi9cbiAgICBvbkFmdGVyU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQWZ0ZXJTYXZlXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uQWZ0ZXJTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIGl0IHJlbG9hZHMgYXNwZWN0IGRhdGFcbiAgICAgKi9cbiAgICBvblJlbG9hZChtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uUmVsb2FkXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uUmVsb2FkXCIsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGxvZ2dpbmcgZm9yIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRlYnVnIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBcbiAgICAgKiBAcGFyYW0gY29sb3IgXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICovXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZywgY29sb3I/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5kZWJ1Zz8uZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5kZWJ1Zy5sb2dUb0NvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSBjb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAvLyBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soKG5ldyBFcnJvcigpKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjICR7dGhpcy50aGlzQ29tcG9uZW50TmFtZX0gLSAke21lc3NhZ2V9YCwgYGNvbG9yOiR7Y29sb3J9YCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Mb2coKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb24uZGVidWc/LmVuYWJsZWQ7XG4gICAgfVxuICAgIGxvZ1RvQ29uc29sZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuTG9nKCkgJiYgdGhpcy5jb25maWd1cmF0aW9uLmRlYnVnPy5sb2dUb0NvbnNvbGU7XG4gICAgfVxuICAgIGxvZ1RvQXNwZWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5Mb2coKSAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uZGVidWc/LnNob3dJbkFzcGVjdFxuICAgIH1cblxuXG4gICAgaW5mKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwoaW5mKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdybihtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKHdybihtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlcnIobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuXG4gICAgICAgIC8vZ2V0IHRoZSBwcmV2aW91cyBjYWxsZXJcblxuXG5cbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwoZXJyKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG52KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChudihuYW1lLCB2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGgxKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwobGgxKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2VjKCkge1xuICAgICAgICBjbGVhclNlYygpO1xuICAgIH1cblxuICAgIGwobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sb2dUb0FzcGVjdCgpKSB7XG4gICAgICAgICAgICBsZXQgYXNwZWN0TG9nT3V0cHV0ID0gdGhpcy5hc3BlY3RMb2dPdXRwdXQ7XG4gICAgICAgICAgICBpZiAoYXNwZWN0TG9nT3V0cHV0KSB7XG4gICAgICAgICAgICAgICAgYXNwZWN0TG9nT3V0cHV0LmlubmVyVGV4dCArPSBgJHttZXNzYWdlfVxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRBc3BlY3RMb2dPdXRwdXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2dUb0FzcGVjdCgpKSB7IHJldHVybiB9O1xuXG4gICAgICAgIHRoaXMuYXNwZWN0TG9nT3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbGV0IGFzcGVjdExvZ091dHB1dCA9IHRoaXMuYXNwZWN0TG9nT3V0cHV0O1xuXG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5pZCA9IGBhc3BlY3RMb2dPdXRwdXQtJHt0aGlzLnVuaXF1ZUlkfWA7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucGFkZGluZyA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW4gPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuZm9udFNpemUgPSBcIjEwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIm1vbm9zcGFjZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLXdyYXBcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLndvcmRXcmFwID0gXCJicmVhay13b3JkXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnpJbmRleCA9IFwiMTAwMFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm90dG9tID0gXCIwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucmlnaHQgPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luTGVmdCA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luUmlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luVG9wID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC44KVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnBhZGRpbmcgPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm94U2hhZG93ID0gXCIwcHggMHB4IDVweCAwcHggcmdiYSgwLDAsMCwwLjc1KVwiO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5wcmVwZW5kKGFzcGVjdExvZ091dHB1dCk7XG5cbiAgICB9XG5cbiAgICBmaXJlRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBsZXQgZXZlbnQ6IFNoYXJlRG9FdmVudCA9IHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogdGhpcy50aGlzQ29tcG9uZW50TmFtZSArIFwiLlwiICsgZXZlbnROYW1lLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH1cbiAgICAgICAgZmlyZUV2ZW50KGV2ZW50KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIEZvcm1idWlsZCBpZiBpdCBleGlzdHMgb3IgY3JlYXRlcyBpdCBpZiBpdCBkb2VzIG5vdFxuICAgICAqIFxuICAgICAqL1xuICAgIGZvcm1idWlsZGVyKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5ibGFkZT8ubW9kZWw/LmFzcGVjdERhdGE/LmZvcm1CdWlsZGVyPy5mb3JtRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIG5vdCBmb3VuZCAtIHdpbGwgY3JlYXRlIHRoZSBwYXRoXCIsIFwiYmx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBmb3VuZFwiLCBcImdyZWVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9FbnN1cmUgdGhlIHBhdGggZXhpc3RzXG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLmJsYWRlIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVGb3JtYnVpbGRlcih0aGlzLmJsYWRlLm1vZGVsKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5ibGFkZSEubW9kZWwhLmFzcGVjdERhdGEhLmZvcm1CdWlsZGVyIS5mb3JtRGF0YTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuc3VyZXMgdGhlcmUgaXMgYSBmb3JtIGJ1aWxkZXIgaW4gdGhlIHBhc3NlZCBpbiBtb2RlbCBhbmQgcmV0dXJucyBpdFxuICAgICAqIEBwYXJhbSBtb2RlbCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBlbnN1cmVGb3JtYnVpbGRlcihtb2RlbDogYW55KTogSUZvcm1CdWlsZGVyRGF0YSB7XG5cbiAgICAgICAgaWYgKCFtb2RlbD8uYXNwZWN0RGF0YT8uZm9ybUJ1aWxkZXI/LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgbm90IGZvdW5kIC0gd2lsbCBjcmVhdGUgdGhlIHBhdGhcIiwgXCJibHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIGZvdW5kXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Vuc3VyZSB0aGUgcGF0aCBleGlzdHNcblxuICAgICAgICBtb2RlbCA9IG1vZGVsIHx8IHt9O1xuICAgICAgICBtb2RlbC5hc3BlY3REYXRhID0gbW9kZWwuYXNwZWN0RGF0YSB8fCB7fTtcbiAgICAgICAgbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciA9IG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIgfHwgeyBmb3JtRGF0YToge30gfTtcblxuXG4gICAgICAgIHJldHVybiBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhO1xuICAgIH1cblxuXG4gICAgZm9ybWJ1aWxkZXJGaWVsZChmb3JtYnVpbGRlckZpZWxkOiBzdHJpbmcsIHNldFZhbHVlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYnVpbGRlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCEgXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gdGhpcy5mb3JtYnVpbGRlcigpW2Zvcm1idWlsZGVyRmllbGRdXG4gICAgICAgIGlmICghZm91bmRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYEZvcm0gYnVpbGRlciBkb2VzIG5vdCBjb250YWluIGZpZWxkICR7Zm9ybWJ1aWxkZXJGaWVsZH0gYCwgXCJvcmFuZ2VcIik7XG4gICAgICAgICAgICB0aGlzLmxvZyhgQ3JlYXRpbmcgZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcImJsdWVcIik7XG4gICAgICAgICAgICB0aGlzLmZvcm1idWlsZGVyKClbZm9ybWJ1aWxkZXJGaWVsZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FyZSB3ZSBkb2luZyBhIHNldFxuICAgICAgICBpZiAoc2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBTZXR0aW5nICR7Zm9ybWJ1aWxkZXJGaWVsZH0gdG8gJHtzZXRWYWx1ZX1gLCBcImdyZWVuXCIpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYnVpbGRlcigpW2Zvcm1idWlsZGVyRmllbGRdID0gc2V0VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gc2V0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRWYWx1ZTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIGNsYXNzIE15Q2xhc3Mge1xuXG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKCk7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBudW1iZXIpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogc3RyaW5nLCBwMjogc3RyaW5nKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IHN0cmluZywgcDI6IHN0cmluZywgcDM6IHN0cmluZyk7XG5cbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IoLi4uYXJyOiBhbnlbXSkge1xuLy8gICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3R3byBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDMpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aHJlZSBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDEpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbmUgYXJndW1lbnQgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyB9XG5cbi8vIGxldCB4ID0gbmV3IE15Q2xhc3MoKSIsImltcG9ydCAqIGFzIGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCB7IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uIH0gZnJvbSAnLi9JV2lkZ2V0SnNvbic7XG5cbmV4cG9ydCB0eXBlIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4gPSB7XG4gICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBBcnJheTxpbmZlciBVPiA/IGtvLk9ic2VydmFibGVBcnJheTxOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFU+PiA6XG4gICAgVFtLXSBleHRlbmRzIG9iamVjdCA/IGtvLk9ic2VydmFibGU8TmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUW0tdPj4gOlxuICAgIGtvLk9ic2VydmFibGU8VFtLXT47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0PFQ+KG9iajogVCwgZXhpc3Rpbmc6IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4pOiBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+IHtcbiAgICBcbiAgICBpZighZXhpc3RpbmcpIGV4aXN0aW5nID0ge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPjtcbiAgIFxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBrZXkgIT09IFwiX19rb19tYXBwaW5nX19cIiAmJiBrZXkgIT09IFwiX2hvc3RcIikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBvYmpba2V5IGFzIGtleW9mIFRdO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IGtvLm9ic2VydmFibGVBcnJheSh2YWx1ZS5tYXAoaXRlbSA9PiB0b09ic2VydmFibGVPYmplY3QoaXRlbSwge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDx0eXBlb2YgaXRlbT4pKSkgYXMgYW55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0odmFsdWUubWFwKGl0ZW0gPT4gdG9PYnNlcnZhYmxlT2JqZWN0KGl0ZW0sIHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8dHlwZW9mIGl0ZW0+KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldID0ga28ub2JzZXJ2YWJsZSh0b09ic2VydmFibGVPYmplY3QodmFsdWUsIHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8dHlwZW9mIHZhbHVlPikpIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKHRvT2JzZXJ2YWJsZU9iamVjdCgodmFsdWUgYXMgYW55KSwgKGV4aXN0aW5nW2tleV0oKSBhcyBhbnkpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgKGV4aXN0aW5nW2tleV0gYXMgYW55KSA9IGtvLm9ic2VydmFibGUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0oKHZhbHVlIGFzIGFueSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBleGlzdGluZyBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xufVxuZXhwb3J0IGludGVyZmFjZSBJRGVidWcge1xuICAgIHN1cHBvcnRSZXF1ZXN0RW5hYmxlZD86IGJvb2xlYW47XG4gICAgICBlbmFibGVkOiBib29sZWFuO1xuICAgICAgbG9nVG9Db25zb2xlOiBib29sZWFuO1xuICAgICAgc2hvd0luQXNwZWN0OiBib29sZWFuO1xuICAgICAgbGl2ZUNvbmZpZz86IGJvb2xlYW47XG4gICAgfVxuICBcblxuLy8gZXhwb3J0IHR5cGUgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBUQ29uZmlnICYge1xuLy8gICAgIGRlYnVnOiBJRGVidWc7XG4vLyAgIH1cblxuLy8gZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0gXG4vLyB7IFtLIGluIGtleW9mIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPl06IGtvLk9ic2VydmFibGU8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdPjsgfVxuXG4vLyBleHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uSG9zdCB7XG4vLyAgICAgX2hvc3Q6IHtcbi8vICAgICAgICAgYmxhZGU6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uQWRkRWRpdFNoYXJlZG87XG4vLyAgICAgICAgIGVuYWJsZWQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47IC8vIFVzaW5nICdhbnknIGZvciByZXR1cm4gdHlwZSBhcyBpdCdzIG5vdCBjbGVhciB3aGF0IHRoZXNlIGZ1bmN0aW9ucyByZXR1cm5cbi8vICAgICAgICAgbW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG87XG4vLyAgICAgfVxuLy8gfVxuXG4vLyBleHBvcnQgdHlwZSBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBJQ29uZmlndXJhdGlvbkhvc3QgJiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcblxuLy8gaW50ZXJmYWNlIFJvb3RPYmplY3Qge1xuLy8gICBsMTogc3RyaW5nO1xuLy8gICBvMTogTzE7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMSB7XG4vLyAgIGwyOiBzdHJpbmc7XG4vLyAgIG8yOiBPMjtcbi8vICAgYTE6IEExW107XG4vLyB9XG5cbi8vIGludGVyZmFjZSBBMSB7XG4vLyAgIGw0OiBzdHJpbmc7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMiB7XG4vLyAgIGwzOiBzdHJpbmc7XG4vLyB9XG4vLyAvLyBOb3cgbGV0J3MgdXNlIHRoZSBmdW5jdGlvbjpcbi8vIGNvbnN0IHg6IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+ID0ge1xuLy8gICAgIGwxOiBcImwxXCIsXG4vLyAgICAgbzE6IHtcbi8vICAgICAgICAgbDI6XCJsMlwiLFxuLy8gICAgICAgICBvMjoge1xuLy8gICAgICAgICAgICAgbDM6IFwibDNcIixcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYTE6IFtcbi8vICAgICAgICAgICAgIHsgbDQ6IFwibDRcIiB9XG4vLyAgICAgICAgIF1cbi8vICAgICB9LFxuLy8gICAgIGRlYnVnOlxuLy8gICAgIHtcbi8vICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4vLyAgICAgICAgIGxvZ1RvQ29uc29sZTogZmFsc2UsXG4vLyAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2Vcbi8vICAgICB9XG4vLyB9XG5cbi8vIGxldCBtIDogIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4+XG5cbi8vIGxldCB5ID0gdG9PYnNlcnZhYmxlT2JqZWN0KHgse30gYXMgYW55KSBhcyAgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0Pj5cblxuLy8gbGV0IHAgPSB5LmRlYnVnKCkubGl2ZUNvbmZpZyEoKVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0KG9iajogYW55LCBleGlzdGluZ09ic2VydmFibGVzPzprby5PYnNlcnZhYmxlPGFueT4pOiBrby5PYnNlcnZhYmxlIHtcbi8vICAgICBjb25zdCByZXN1bHQgPSBleGlzdGluZ09ic2VydmFibGVzIHx8IHt9IGFzIGtvLk9ic2VydmFibGU7XG5cbi8vICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbi8vICAgICAgICAgaWYoa2V5ID09PSBcIl9fa29fbWFwcGluZ19fXCIpIGNvbnRpbnVlO1xuLy8gICAgICAgICBpZihrZXkgPT09IFwiX2hvc3RcIikgY29udGludWU7XG5cbi8vICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbi8vICAgICAgICAgICAgIGxldCBuZXd2ID0gb2JqW2tleV07XG4vLyAgICAgICAgICAgICBsZXQgY3VyciA9IChyZXN1bHQgYXMgYW55KVtrZXldIDtcblxuLy8gICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG5ld3YpICYmIHR5cGVvZiBuZXd2ID09PSBcIm9iamVjdFwiICYmIG5ld3YgIT09IG51bGwgJiYgIWtvLmlzT2JzZXJ2YWJsZShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0gdG9PYnNlcnZhYmxlT2JqZWN0KG5ld3YgYXMgb2JqZWN0KSBcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRvT2JzZXJ2YWJsZU9iamVjdFwiLCAocmVzdWx0IGFzIGFueSlba2V5XSk7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKChyZXN1bHQgYXMgYW55KVtrZXldKTtcbi8vICAgICAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICBpZiAoY3VyciAmJiBrby5pc09ic2VydmFibGVBcnJheShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XShuZXd2KTtcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGVBcnJheShuZXd2KSBhcyBhbnk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgbmV3diA9IG5ld3YoKTsgLy8gcHVsbCBvdXQgdGhlIHZhbHVlXG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChjdXJyICYmIGtvLmlzT2JzZXJ2YWJsZShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldKG5ld3YpOyAvLyB1cGRhdGUgdGhlIGV4aXN0aW5nIG9ic2VydmFibGVcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKG5ld3YpO1xuICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgcmV0dXJuIHJlc3VsdDtcbi8vIH1cbiIsImltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdAZW9uYXNkYW4vdGVtcHVzLWRvbWludXMnO1xuaW1wb3J0IHsgSVdpZGdldEpzb24gfSBmcm9tICcuLi9CYXNlQ2xhc3Nlcy9JV2lkZ2V0SnNvbic7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnMge1xuICAgIHRpdGxlOiBzdHJpbmcgIHwgdW5kZWZpbmVkOyAvL3RoZSB0aXRsZSB0byBkaXNwbGF5IGFib3ZlIHRoZSBkYXRlIHBpY2tlclxuICAgIGZvcm1CdWlsZGVyRmllbGQ6IHN0cmluZyAgfCB1bmRlZmluZWQ7IC8vdGhlIGZvcm0gYnVpbGRlciBmaWVsZCB0byBnZXQgdGhlIHZhbHVlIGZyb20gYW5kIHNldCB0aGUgdmFsdWUgdG9cbiAgICBwaWNrZXJFbmFibGVkOiBib29sZWFuICB8IHVuZGVmaW5lZDsgLy9pZiB0cnVlLCB0aGUgZGF0ZSBwaWNrZXIgd2lsbCBiZSBlbmFibGVkXG4gICAgZXZlbnRUb0ZpcmVPblVwZGF0ZTogQXJyYXk8c3RyaW5nPiB8IHVuZGVmaW5lZDsgLy90aGUgZXZlbnQgdG8gZmlyZSB3aGVuIHRoZSBkYXRlIGlzIHVwZGF0ZWRcbiAgICBkYXRlUGlja2VyT3B0aW9uczogT3B0aW9ucyAgfCB1bmRlZmluZWQ7IC8vdGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgZGF0ZSBwaWNrZXIgXG4gICAgZGVmYXVsdFZhbHVlOlxuICAgIHtcbiAgICAgICAgZGVmYXVsdERhdGVGcm9tTm93SG91cnM6IG51bWJlciAgfCB1bmRlZmluZWQ7IC8vd2hlbiBubyB2YWx1ZSBpcyBzZXQsIHNldCB0aGUgZGF0ZSB0byBub3cgKyB0aGlzIG51bWJlciBvZiBob3Vyc1xuICAgICAgICBnZXRWYWx1ZVVzaW5nUGFyZW50czpib29sZWFuIHwgdW5kZWZpbmVkLCAvL2lmIHRydWUsIHdpbGwgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBwYXJlbnQgZGF0YSBjb250ZXh0IGlmIG5vdCBmb3VuZCBpbiB0aGUgY3VycmVudCBkYXRhIGNvbnRleHRcbiAgICAgICAgbWF4RGVwdGg6IG51bWJlciB8IHVuZGVmaW5lZCwgLy90aGUgbWF4IGRlcHRoIHRvIHNlYXJjaCBmb3IgdGhlIHZhbHVlIGluIHRoZSBwYXJlbnQgYW5kIHBhcmVudCBvZiBwYXJlbnQgZGF0YSBjb250ZXh0IDAgPSBjdXJyZW50IGRhdGEgY29udGV4dCBvbmx5XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgY29uc3Qgc2V0dGluZyA6IElXaWRnZXRKc29uPElEYXRlUGlja2VyQXNwZWN0T3B0aW9ucz49IHtcbiAgICB0eXBlOiAnd2lkZ2V0JyxcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogZmFsc2UsXG4gICAgICAgIFwiYWxsb3dBc3BlY3RBZGFwdGVyXCI6IHRydWUsXG4gICAgICAgIFwidGl0bGVcIjogXCJEYXRlIFBpY2tlciBBc3BlY3RcIixcbiAgICAgICAgXCJpY29uXCI6IFwiZmEtY29nXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJEYXRlIFBpY2tlciBBc3BlY3RcIixcbiAgICAgICAgXCJjYXRlZ29yaWVzXCI6IFtdLFxuICAgICAgICBcImlzQ29uZmlndXJhYmxlXCI6IHRydWUsXG4gICAgICAgIFwiY29uZmlndXJhdGlvbldpZGdldFwiOiBudWxsLFxuXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6IHtcbiAgICAgICAgICAgIFwiZm9ybUJ1aWxkZXJGaWVsZFwiOiBcImVEaXNjb3ZlcnlVcGRhdGVQbGFubmVkRGF0ZVwiLFxuICAgICAgICAgICAgXCJkZWZhdWx0VmFsdWVcIjp7XG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0RGF0ZUZyb21Ob3dIb3Vyc1wiOiAyNCxcbiAgICAgICAgICAgICAgICBcImdldFZhbHVlVXNpbmdQYXJlbnRzXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICBcIm1heERlcHRoXCI6IDAsXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBcInRpdGxlXCI6IFwiVXBkYXRlZCBwbGFubmVkIGR1ZSBkYXRlOlwiLFxuICAgICAgICAgICAgXCJwaWNrZXJFbmFibGVkXCI6IHRydWUsXG4gICAgICAgICAgICBcImV2ZW50VG9GaXJlT25VcGRhdGVcIjogW1wiSURFQXNwZWN0cy5EYXRlUGlja2VyQXNwZWN0LlVwZGF0ZVwiXSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXCJkYXRlUGlja2VyT3B0aW9uc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJpbmxpbmVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgXCJzaWRlQnlTaWRlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFwidGhlbWVcIjogXCJsaWdodFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZGVidWdcIjoge1xuICAgICAgICAgICAgICAgIFwiZW5hYmxlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgIFwibG9nVG9Db25zb2xlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJzaG93SW5Bc3BlY3RcIjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZXZlbnRzVG9SZWFjdFRvXCI6IFtdLFxuICAgICAgICAgICAgXCJkYXRhU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgICAgIFwiZ2V0VmFsdWVVc2luZ1BhcmVudHNcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgXCJtYXhEZXB0aFwiOiAwLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBcInNjcmlwdHNcIjogW10sXG4gICAgXCJzdHlsZXNcIjogW1xuICAgICAgICBcIkRhdGVQaWNrZXJBc3BlY3QuY3NzXCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVzXCI6IFtcbiAgICAgICAgXCJEYXRlUGlja2VyQXNwZWN0Lmh0bWxcIlxuICAgIF0sXG4gICAgXCJtZW51VGVtcGxhdGVzXCI6IFtdLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXVxufSIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsIm1vZHVsZS5leHBvcnRzID0ga287IiwiaW1wb3J0IGFuc2lTdHlsZXMgZnJvbSAnI2Fuc2ktc3R5bGVzJztcbmltcG9ydCBzdXBwb3J0c0NvbG9yIGZyb20gJyNzdXBwb3J0cy1jb2xvcic7XG5pbXBvcnQgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9vcmRlclxuXHRzdHJpbmdSZXBsYWNlQWxsLFxuXHRzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgsXG59IGZyb20gJy4vdXRpbGl0aWVzLmpzJztcblxuY29uc3Qge3N0ZG91dDogc3Rkb3V0Q29sb3IsIHN0ZGVycjogc3RkZXJyQ29sb3J9ID0gc3VwcG9ydHNDb2xvcjtcblxuY29uc3QgR0VORVJBVE9SID0gU3ltYm9sKCdHRU5FUkFUT1InKTtcbmNvbnN0IFNUWUxFUiA9IFN5bWJvbCgnU1RZTEVSJyk7XG5jb25zdCBJU19FTVBUWSA9IFN5bWJvbCgnSVNfRU1QVFknKTtcblxuLy8gYHN1cHBvcnRzQ29sb3IubGV2ZWxgIOKGkiBgYW5zaVN0eWxlcy5jb2xvcltuYW1lXWAgbWFwcGluZ1xuY29uc3QgbGV2ZWxNYXBwaW5nID0gW1xuXHQnYW5zaScsXG5cdCdhbnNpJyxcblx0J2Fuc2kyNTYnLFxuXHQnYW5zaTE2bScsXG5dO1xuXG5jb25zdCBzdHlsZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5jb25zdCBhcHBseU9wdGlvbnMgPSAob2JqZWN0LCBvcHRpb25zID0ge30pID0+IHtcblx0aWYgKG9wdGlvbnMubGV2ZWwgJiYgIShOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubGV2ZWwpICYmIG9wdGlvbnMubGV2ZWwgPj0gMCAmJiBvcHRpb25zLmxldmVsIDw9IDMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYGxldmVsYCBvcHRpb24gc2hvdWxkIGJlIGFuIGludGVnZXIgZnJvbSAwIHRvIDMnKTtcblx0fVxuXG5cdC8vIERldGVjdCBsZXZlbCBpZiBub3Qgc2V0IG1hbnVhbGx5XG5cdGNvbnN0IGNvbG9yTGV2ZWwgPSBzdGRvdXRDb2xvciA/IHN0ZG91dENvbG9yLmxldmVsIDogMDtcblx0b2JqZWN0LmxldmVsID0gb3B0aW9ucy5sZXZlbCA9PT0gdW5kZWZpbmVkID8gY29sb3JMZXZlbCA6IG9wdGlvbnMubGV2ZWw7XG59O1xuXG5leHBvcnQgY2xhc3MgQ2hhbGsge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0cnVjdG9yLXJldHVyblxuXHRcdHJldHVybiBjaGFsa0ZhY3Rvcnkob3B0aW9ucyk7XG5cdH1cbn1cblxuY29uc3QgY2hhbGtGYWN0b3J5ID0gb3B0aW9ucyA9PiB7XG5cdGNvbnN0IGNoYWxrID0gKC4uLnN0cmluZ3MpID0+IHN0cmluZ3Muam9pbignICcpO1xuXHRhcHBseU9wdGlvbnMoY2hhbGssIG9wdGlvbnMpO1xuXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihjaGFsaywgY3JlYXRlQ2hhbGsucHJvdG90eXBlKTtcblxuXHRyZXR1cm4gY2hhbGs7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDaGFsayhvcHRpb25zKSB7XG5cdHJldHVybiBjaGFsa0ZhY3Rvcnkob3B0aW9ucyk7XG59XG5cbk9iamVjdC5zZXRQcm90b3R5cGVPZihjcmVhdGVDaGFsay5wcm90b3R5cGUsIEZ1bmN0aW9uLnByb3RvdHlwZSk7XG5cbmZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGFuc2lTdHlsZXMpKSB7XG5cdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKHRoaXMsIGNyZWF0ZVN0eWxlcihzdHlsZS5vcGVuLCBzdHlsZS5jbG9zZSwgdGhpc1tTVFlMRVJdKSwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHN0eWxlTmFtZSwge3ZhbHVlOiBidWlsZGVyfSk7XG5cdFx0XHRyZXR1cm4gYnVpbGRlcjtcblx0XHR9LFxuXHR9O1xufVxuXG5zdHlsZXMudmlzaWJsZSA9IHtcblx0Z2V0KCkge1xuXHRcdGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKHRoaXMsIHRoaXNbU1RZTEVSXSwgdHJ1ZSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd2aXNpYmxlJywge3ZhbHVlOiBidWlsZGVyfSk7XG5cdFx0cmV0dXJuIGJ1aWxkZXI7XG5cdH0sXG59O1xuXG5jb25zdCBnZXRNb2RlbEFuc2kgPSAobW9kZWwsIGxldmVsLCB0eXBlLCAuLi5hcmd1bWVudHNfKSA9PiB7XG5cdGlmIChtb2RlbCA9PT0gJ3JnYicpIHtcblx0XHRpZiAobGV2ZWwgPT09ICdhbnNpMTZtJykge1xuXHRcdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaTE2bSguLi5hcmd1bWVudHNfKTtcblx0XHR9XG5cblx0XHRpZiAobGV2ZWwgPT09ICdhbnNpMjU2Jykge1xuXHRcdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaTI1NihhbnNpU3R5bGVzLnJnYlRvQW5zaTI1NiguLi5hcmd1bWVudHNfKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaShhbnNpU3R5bGVzLnJnYlRvQW5zaSguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRpZiAobW9kZWwgPT09ICdoZXgnKSB7XG5cdFx0cmV0dXJuIGdldE1vZGVsQW5zaSgncmdiJywgbGV2ZWwsIHR5cGUsIC4uLmFuc2lTdHlsZXMuaGV4VG9SZ2IoLi4uYXJndW1lbnRzXykpO1xuXHR9XG5cblx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV1bbW9kZWxdKC4uLmFyZ3VtZW50c18pO1xufTtcblxuY29uc3QgdXNlZE1vZGVscyA9IFsncmdiJywgJ2hleCcsICdhbnNpMjU2J107XG5cbmZvciAoY29uc3QgbW9kZWwgb2YgdXNlZE1vZGVscykge1xuXHRzdHlsZXNbbW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IHtsZXZlbH0gPSB0aGlzO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlciA9IGNyZWF0ZVN0eWxlcihnZXRNb2RlbEFuc2kobW9kZWwsIGxldmVsTWFwcGluZ1tsZXZlbF0sICdjb2xvcicsIC4uLmFyZ3VtZW50c18pLCBhbnNpU3R5bGVzLmNvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcblxuXHRjb25zdCBiZ01vZGVsID0gJ2JnJyArIG1vZGVsWzBdLnRvVXBwZXJDYXNlKCkgKyBtb2RlbC5zbGljZSgxKTtcblx0c3R5bGVzW2JnTW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IHtsZXZlbH0gPSB0aGlzO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlciA9IGNyZWF0ZVN0eWxlcihnZXRNb2RlbEFuc2kobW9kZWwsIGxldmVsTWFwcGluZ1tsZXZlbF0sICdiZ0NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuYmdDb2xvci5jbG9zZSwgdGhpc1tTVFlMRVJdKTtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZUJ1aWxkZXIodGhpcywgc3R5bGVyLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cdH07XG59XG5cbmNvbnN0IHByb3RvID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoKCkgPT4ge30sIHtcblx0Li4uc3R5bGVzLFxuXHRsZXZlbDoge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIHRoaXNbR0VORVJBVE9SXS5sZXZlbDtcblx0XHR9LFxuXHRcdHNldChsZXZlbCkge1xuXHRcdFx0dGhpc1tHRU5FUkFUT1JdLmxldmVsID0gbGV2ZWw7XG5cdFx0fSxcblx0fSxcbn0pO1xuXG5jb25zdCBjcmVhdGVTdHlsZXIgPSAob3BlbiwgY2xvc2UsIHBhcmVudCkgPT4ge1xuXHRsZXQgb3BlbkFsbDtcblx0bGV0IGNsb3NlQWxsO1xuXHRpZiAocGFyZW50ID09PSB1bmRlZmluZWQpIHtcblx0XHRvcGVuQWxsID0gb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlO1xuXHR9IGVsc2Uge1xuXHRcdG9wZW5BbGwgPSBwYXJlbnQub3BlbkFsbCArIG9wZW47XG5cdFx0Y2xvc2VBbGwgPSBjbG9zZSArIHBhcmVudC5jbG9zZUFsbDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0b3Blbixcblx0XHRjbG9zZSxcblx0XHRvcGVuQWxsLFxuXHRcdGNsb3NlQWxsLFxuXHRcdHBhcmVudCxcblx0fTtcbn07XG5cbmNvbnN0IGNyZWF0ZUJ1aWxkZXIgPSAoc2VsZiwgX3N0eWxlciwgX2lzRW1wdHkpID0+IHtcblx0Ly8gU2luZ2xlIGFyZ3VtZW50IGlzIGhvdCBwYXRoLCBpbXBsaWNpdCBjb2VyY2lvbiBpcyBmYXN0ZXIgdGhhbiBhbnl0aGluZ1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb25cblx0Y29uc3QgYnVpbGRlciA9ICguLi5hcmd1bWVudHNfKSA9PiBhcHBseVN0eWxlKGJ1aWxkZXIsIChhcmd1bWVudHNfLmxlbmd0aCA9PT0gMSkgPyAoJycgKyBhcmd1bWVudHNfWzBdKSA6IGFyZ3VtZW50c18uam9pbignICcpKTtcblxuXHQvLyBXZSBhbHRlciB0aGUgcHJvdG90eXBlIGJlY2F1c2Ugd2UgbXVzdCByZXR1cm4gYSBmdW5jdGlvbiwgYnV0IHRoZXJlIGlzXG5cdC8vIG5vIHdheSB0byBjcmVhdGUgYSBmdW5jdGlvbiB3aXRoIGEgZGlmZmVyZW50IHByb3RvdHlwZVxuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoYnVpbGRlciwgcHJvdG8pO1xuXG5cdGJ1aWxkZXJbR0VORVJBVE9SXSA9IHNlbGY7XG5cdGJ1aWxkZXJbU1RZTEVSXSA9IF9zdHlsZXI7XG5cdGJ1aWxkZXJbSVNfRU1QVFldID0gX2lzRW1wdHk7XG5cblx0cmV0dXJuIGJ1aWxkZXI7XG59O1xuXG5jb25zdCBhcHBseVN0eWxlID0gKHNlbGYsIHN0cmluZykgPT4ge1xuXHRpZiAoc2VsZi5sZXZlbCA8PSAwIHx8ICFzdHJpbmcpIHtcblx0XHRyZXR1cm4gc2VsZltJU19FTVBUWV0gPyAnJyA6IHN0cmluZztcblx0fVxuXG5cdGxldCBzdHlsZXIgPSBzZWxmW1NUWUxFUl07XG5cblx0aWYgKHN0eWxlciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHN0cmluZztcblx0fVxuXG5cdGNvbnN0IHtvcGVuQWxsLCBjbG9zZUFsbH0gPSBzdHlsZXI7XG5cdGlmIChzdHJpbmcuaW5jbHVkZXMoJ1xcdTAwMUInKSkge1xuXHRcdHdoaWxlIChzdHlsZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Ly8gUmVwbGFjZSBhbnkgaW5zdGFuY2VzIGFscmVhZHkgcHJlc2VudCB3aXRoIGEgcmUtb3BlbmluZyBjb2RlXG5cdFx0XHQvLyBvdGhlcndpc2Ugb25seSB0aGUgcGFydCBvZiB0aGUgc3RyaW5nIHVudGlsIHNhaWQgY2xvc2luZyBjb2RlXG5cdFx0XHQvLyB3aWxsIGJlIGNvbG9yZWQsIGFuZCB0aGUgcmVzdCB3aWxsIHNpbXBseSBiZSAncGxhaW4nLlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN0eWxlci5jbG9zZSwgc3R5bGVyLm9wZW4pO1xuXG5cdFx0XHRzdHlsZXIgPSBzdHlsZXIucGFyZW50O1xuXHRcdH1cblx0fVxuXG5cdC8vIFdlIGNhbiBtb3ZlIGJvdGggbmV4dCBhY3Rpb25zIG91dCBvZiBsb29wLCBiZWNhdXNlIHJlbWFpbmluZyBhY3Rpb25zIGluIGxvb3Agd29uJ3QgaGF2ZVxuXHQvLyBhbnkvdmlzaWJsZSBlZmZlY3Qgb24gcGFydHMgd2UgYWRkIGhlcmUuIENsb3NlIHRoZSBzdHlsaW5nIGJlZm9yZSBhIGxpbmVicmVhayBhbmQgcmVvcGVuXG5cdC8vIGFmdGVyIG5leHQgbGluZSB0byBmaXggYSBibGVlZCBpc3N1ZSBvbiBtYWNPUzogaHR0cHM6Ly9naXRodWIuY29tL2NoYWxrL2NoYWxrL3B1bGwvOTJcblx0Y29uc3QgbGZJbmRleCA9IHN0cmluZy5pbmRleE9mKCdcXG4nKTtcblx0aWYgKGxmSW5kZXggIT09IC0xKSB7XG5cdFx0c3RyaW5nID0gc3RyaW5nRW5jYXNlQ1JMRldpdGhGaXJzdEluZGV4KHN0cmluZywgY2xvc2VBbGwsIG9wZW5BbGwsIGxmSW5kZXgpO1xuXHR9XG5cblx0cmV0dXJuIG9wZW5BbGwgKyBzdHJpbmcgKyBjbG9zZUFsbDtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgc3R5bGVzKTtcblxuY29uc3QgY2hhbGsgPSBjcmVhdGVDaGFsaygpO1xuZXhwb3J0IGNvbnN0IGNoYWxrU3RkZXJyID0gY3JlYXRlQ2hhbGsoe2xldmVsOiBzdGRlcnJDb2xvciA/IHN0ZGVyckNvbG9yLmxldmVsIDogMH0pO1xuXG5leHBvcnQge1xuXHRtb2RpZmllck5hbWVzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyxcblx0YmFja2dyb3VuZENvbG9yTmFtZXMsXG5cdGNvbG9yTmFtZXMsXG5cblx0Ly8gVE9ETzogUmVtb3ZlIHRoZXNlIGFsaWFzZXMgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvblxuXHRtb2RpZmllck5hbWVzIGFzIG1vZGlmaWVycyxcblx0Zm9yZWdyb3VuZENvbG9yTmFtZXMgYXMgZm9yZWdyb3VuZENvbG9ycyxcblx0YmFja2dyb3VuZENvbG9yTmFtZXMgYXMgYmFja2dyb3VuZENvbG9ycyxcblx0Y29sb3JOYW1lcyBhcyBjb2xvcnMsXG59IGZyb20gJy4vdmVuZG9yL2Fuc2ktc3R5bGVzL2luZGV4LmpzJztcblxuZXhwb3J0IHtcblx0c3Rkb3V0Q29sb3IgYXMgc3VwcG9ydHNDb2xvcixcblx0c3RkZXJyQ29sb3IgYXMgc3VwcG9ydHNDb2xvclN0ZGVycixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoYWxrO1xuIiwiLy8gVE9ETzogV2hlbiB0YXJnZXRpbmcgTm9kZS5qcyAxNiwgdXNlIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VBbGxgLlxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1JlcGxhY2VBbGwoc3RyaW5nLCBzdWJzdHJpbmcsIHJlcGxhY2VyKSB7XG5cdGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZyk7XG5cdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qgc3Vic3RyaW5nTGVuZ3RoID0gc3Vic3RyaW5nLmxlbmd0aDtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIGluZGV4KSArIHN1YnN0cmluZyArIHJlcGxhY2VyO1xuXHRcdGVuZEluZGV4ID0gaW5kZXggKyBzdWJzdHJpbmdMZW5ndGg7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZihzdWJzdHJpbmcsIGVuZEluZGV4KTtcblx0fSB3aGlsZSAoaW5kZXggIT09IC0xKTtcblxuXHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgpO1xuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBwcmVmaXgsIHBvc3RmaXgsIGluZGV4KSB7XG5cdGxldCBlbmRJbmRleCA9IDA7XG5cdGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuXHRkbyB7XG5cdFx0Y29uc3QgZ290Q1IgPSBzdHJpbmdbaW5kZXggLSAxXSA9PT0gJ1xccic7XG5cdFx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4LCAoZ290Q1IgPyBpbmRleCAtIDEgOiBpbmRleCkpICsgcHJlZml4ICsgKGdvdENSID8gJ1xcclxcbicgOiAnXFxuJykgKyBwb3N0Zml4O1xuXHRcdGVuZEluZGV4ID0gaW5kZXggKyAxO1xuXHRcdGluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicsIGVuZEluZGV4KTtcblx0fSB3aGlsZSAoaW5kZXggIT09IC0xKTtcblxuXHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgpO1xuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG4iLCJjb25zdCBBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUID0gMTA7XG5cbmNvbnN0IHdyYXBBbnNpMTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlske2NvZGUgKyBvZmZzZXR9bWA7XG5cbmNvbnN0IHdyYXBBbnNpMjU2ID0gKG9mZnNldCA9IDApID0+IGNvZGUgPT4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07NTske2NvZGV9bWA7XG5cbmNvbnN0IHdyYXBBbnNpMTZtID0gKG9mZnNldCA9IDApID0+IChyZWQsIGdyZWVuLCBibHVlKSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTsyOyR7cmVkfTske2dyZWVufTske2JsdWV9bWA7XG5cbmNvbnN0IHN0eWxlcyA9IHtcblx0bW9kaWZpZXI6IHtcblx0XHRyZXNldDogWzAsIDBdLFxuXHRcdC8vIDIxIGlzbid0IHdpZGVseSBzdXBwb3J0ZWQgYW5kIDIyIGRvZXMgdGhlIHNhbWUgdGhpbmdcblx0XHRib2xkOiBbMSwgMjJdLFxuXHRcdGRpbTogWzIsIDIyXSxcblx0XHRpdGFsaWM6IFszLCAyM10sXG5cdFx0dW5kZXJsaW5lOiBbNCwgMjRdLFxuXHRcdG92ZXJsaW5lOiBbNTMsIDU1XSxcblx0XHRpbnZlcnNlOiBbNywgMjddLFxuXHRcdGhpZGRlbjogWzgsIDI4XSxcblx0XHRzdHJpa2V0aHJvdWdoOiBbOSwgMjldLFxuXHR9LFxuXHRjb2xvcjoge1xuXHRcdGJsYWNrOiBbMzAsIDM5XSxcblx0XHRyZWQ6IFszMSwgMzldLFxuXHRcdGdyZWVuOiBbMzIsIDM5XSxcblx0XHR5ZWxsb3c6IFszMywgMzldLFxuXHRcdGJsdWU6IFszNCwgMzldLFxuXHRcdG1hZ2VudGE6IFszNSwgMzldLFxuXHRcdGN5YW46IFszNiwgMzldLFxuXHRcdHdoaXRlOiBbMzcsIDM5XSxcblxuXHRcdC8vIEJyaWdodCBjb2xvclxuXHRcdGJsYWNrQnJpZ2h0OiBbOTAsIDM5XSxcblx0XHRncmF5OiBbOTAsIDM5XSwgLy8gQWxpYXMgb2YgYGJsYWNrQnJpZ2h0YFxuXHRcdGdyZXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0cmVkQnJpZ2h0OiBbOTEsIDM5XSxcblx0XHRncmVlbkJyaWdodDogWzkyLCAzOV0sXG5cdFx0eWVsbG93QnJpZ2h0OiBbOTMsIDM5XSxcblx0XHRibHVlQnJpZ2h0OiBbOTQsIDM5XSxcblx0XHRtYWdlbnRhQnJpZ2h0OiBbOTUsIDM5XSxcblx0XHRjeWFuQnJpZ2h0OiBbOTYsIDM5XSxcblx0XHR3aGl0ZUJyaWdodDogWzk3LCAzOV0sXG5cdH0sXG5cdGJnQ29sb3I6IHtcblx0XHRiZ0JsYWNrOiBbNDAsIDQ5XSxcblx0XHRiZ1JlZDogWzQxLCA0OV0sXG5cdFx0YmdHcmVlbjogWzQyLCA0OV0sXG5cdFx0YmdZZWxsb3c6IFs0MywgNDldLFxuXHRcdGJnQmx1ZTogWzQ0LCA0OV0sXG5cdFx0YmdNYWdlbnRhOiBbNDUsIDQ5XSxcblx0XHRiZ0N5YW46IFs0NiwgNDldLFxuXHRcdGJnV2hpdGU6IFs0NywgNDldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmdCbGFja0JyaWdodDogWzEwMCwgNDldLFxuXHRcdGJnR3JheTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ0dyZXk6IFsxMDAsIDQ5XSwgLy8gQWxpYXMgb2YgYGJnQmxhY2tCcmlnaHRgXG5cdFx0YmdSZWRCcmlnaHQ6IFsxMDEsIDQ5XSxcblx0XHRiZ0dyZWVuQnJpZ2h0OiBbMTAyLCA0OV0sXG5cdFx0YmdZZWxsb3dCcmlnaHQ6IFsxMDMsIDQ5XSxcblx0XHRiZ0JsdWVCcmlnaHQ6IFsxMDQsIDQ5XSxcblx0XHRiZ01hZ2VudGFCcmlnaHQ6IFsxMDUsIDQ5XSxcblx0XHRiZ0N5YW5CcmlnaHQ6IFsxMDYsIDQ5XSxcblx0XHRiZ1doaXRlQnJpZ2h0OiBbMTA3LCA0OV0sXG5cdH0sXG59O1xuXG5leHBvcnQgY29uc3QgbW9kaWZpZXJOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5tb2RpZmllcik7XG5leHBvcnQgY29uc3QgZm9yZWdyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuY29sb3IpO1xuZXhwb3J0IGNvbnN0IGJhY2tncm91bmRDb2xvck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLmJnQ29sb3IpO1xuZXhwb3J0IGNvbnN0IGNvbG9yTmFtZXMgPSBbLi4uZm9yZWdyb3VuZENvbG9yTmFtZXMsIC4uLmJhY2tncm91bmRDb2xvck5hbWVzXTtcblxuZnVuY3Rpb24gYXNzZW1ibGVTdHlsZXMoKSB7XG5cdGNvbnN0IGNvZGVzID0gbmV3IE1hcCgpO1xuXG5cdGZvciAoY29uc3QgW2dyb3VwTmFtZSwgZ3JvdXBdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlcykpIHtcblx0XHRmb3IgKGNvbnN0IFtzdHlsZU5hbWUsIHN0eWxlXSBvZiBPYmplY3QuZW50cmllcyhncm91cCkpIHtcblx0XHRcdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdFx0XHRvcGVuOiBgXFx1MDAxQlske3N0eWxlWzBdfW1gLFxuXHRcdFx0XHRjbG9zZTogYFxcdTAwMUJbJHtzdHlsZVsxXX1tYCxcblx0XHRcdH07XG5cblx0XHRcdGdyb3VwW3N0eWxlTmFtZV0gPSBzdHlsZXNbc3R5bGVOYW1lXTtcblxuXHRcdFx0Y29kZXMuc2V0KHN0eWxlWzBdLCBzdHlsZVsxXSk7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgZ3JvdXBOYW1lLCB7XG5cdFx0XHR2YWx1ZTogZ3JvdXAsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9KTtcblx0fVxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHlsZXMsICdjb2RlcycsIHtcblx0XHR2YWx1ZTogY29kZXMsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdH0pO1xuXG5cdHN0eWxlcy5jb2xvci5jbG9zZSA9ICdcXHUwMDFCWzM5bSc7XG5cdHN0eWxlcy5iZ0NvbG9yLmNsb3NlID0gJ1xcdTAwMUJbNDltJztcblxuXHRzdHlsZXMuY29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoKTtcblx0c3R5bGVzLmNvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kgPSB3cmFwQW5zaTE2KEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpMjU2ID0gd3JhcEFuc2kyNTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kxNm0gPSB3cmFwQW5zaTE2bShBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblxuXHQvLyBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9RaXgtL2NvbG9yLWNvbnZlcnQvYmxvYi8zZjBlMGQ0ZTkyZTIzNTc5NmNjYjE3ZjZlODVjNzIwOTRhNjUxZjQ5L2NvbnZlcnNpb25zLmpzXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0eWxlcywge1xuXHRcdHJnYlRvQW5zaTI1Njoge1xuXHRcdFx0dmFsdWUocmVkLCBncmVlbiwgYmx1ZSkge1xuXHRcdFx0XHQvLyBXZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHRcdFx0XHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0XHRcdFx0aWYgKHJlZCA9PT0gZ3JlZW4gJiYgZ3JlZW4gPT09IGJsdWUpIHtcblx0XHRcdFx0XHRpZiAocmVkIDwgOCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDE2O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZWQgPiAyNDgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAyMzE7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoKChyZWQgLSA4KSAvIDI0NykgKiAyNCkgKyAyMzI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gMTZcblx0XHRcdFx0XHQrICgzNiAqIE1hdGgucm91bmQocmVkIC8gMjU1ICogNSkpXG5cdFx0XHRcdFx0KyAoNiAqIE1hdGgucm91bmQoZ3JlZW4gLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrIE1hdGgucm91bmQoYmx1ZSAvIDI1NSAqIDUpO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9SZ2I6IHtcblx0XHRcdHZhbHVlKGhleCkge1xuXHRcdFx0XHRjb25zdCBtYXRjaGVzID0gL1thLWZcXGRdezZ9fFthLWZcXGRdezN9L2kuZXhlYyhoZXgudG9TdHJpbmcoMTYpKTtcblx0XHRcdFx0aWYgKCFtYXRjaGVzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFswLCAwLCAwXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBbY29sb3JTdHJpbmddID0gbWF0Y2hlcztcblxuXHRcdFx0XHRpZiAoY29sb3JTdHJpbmcubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRcdFx0Y29sb3JTdHJpbmcgPSBbLi4uY29sb3JTdHJpbmddLm1hcChjaGFyYWN0ZXIgPT4gY2hhcmFjdGVyICsgY2hhcmFjdGVyKS5qb2luKCcnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGludGVnZXIgPSBOdW1iZXIucGFyc2VJbnQoY29sb3JTdHJpbmcsIDE2KTtcblxuXHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0XHRcdFx0XHQoaW50ZWdlciA+PiAxNikgJiAweEZGLFxuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDgpICYgMHhGRixcblx0XHRcdFx0XHRpbnRlZ2VyICYgMHhGRixcblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cblx0XHRcdFx0XTtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaTI1Njoge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMucmdiVG9BbnNpMjU2KC4uLnN0eWxlcy5oZXhUb1JnYihoZXgpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0YW5zaTI1NlRvQW5zaToge1xuXHRcdFx0dmFsdWUoY29kZSkge1xuXHRcdFx0XHRpZiAoY29kZSA8IDgpIHtcblx0XHRcdFx0XHRyZXR1cm4gMzAgKyBjb2RlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGNvZGUgPCAxNikge1xuXHRcdFx0XHRcdHJldHVybiA5MCArIChjb2RlIC0gOCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgcmVkO1xuXHRcdFx0XHRsZXQgZ3JlZW47XG5cdFx0XHRcdGxldCBibHVlO1xuXG5cdFx0XHRcdGlmIChjb2RlID49IDIzMikge1xuXHRcdFx0XHRcdHJlZCA9ICgoKGNvZGUgLSAyMzIpICogMTApICsgOCkgLyAyNTU7XG5cdFx0XHRcdFx0Z3JlZW4gPSByZWQ7XG5cdFx0XHRcdFx0Ymx1ZSA9IHJlZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb2RlIC09IDE2O1xuXG5cdFx0XHRcdFx0Y29uc3QgcmVtYWluZGVyID0gY29kZSAlIDM2O1xuXG5cdFx0XHRcdFx0cmVkID0gTWF0aC5mbG9vcihjb2RlIC8gMzYpIC8gNTtcblx0XHRcdFx0XHRncmVlbiA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gNikgLyA1O1xuXHRcdFx0XHRcdGJsdWUgPSAocmVtYWluZGVyICUgNikgLyA1O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBNYXRoLm1heChyZWQsIGdyZWVuLCBibHVlKSAqIDI7XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDMwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0bGV0IHJlc3VsdCA9IDMwICsgKChNYXRoLnJvdW5kKGJsdWUpIDw8IDIpIHwgKE1hdGgucm91bmQoZ3JlZW4pIDw8IDEpIHwgTWF0aC5yb3VuZChyZWQpKTtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDIpIHtcblx0XHRcdFx0XHRyZXN1bHQgKz0gNjA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0cmdiVG9BbnNpOiB7XG5cdFx0XHR2YWx1ZTogKHJlZCwgZ3JlZW4sIGJsdWUpID0+IHN0eWxlcy5hbnNpMjU2VG9BbnNpKHN0eWxlcy5yZ2JUb0Fuc2kyNTYocmVkLCBncmVlbiwgYmx1ZSkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiBoZXggPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLmhleFRvQW5zaTI1NihoZXgpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdH0pO1xuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmNvbnN0IGFuc2lTdHlsZXMgPSBhc3NlbWJsZVN0eWxlcygpO1xuXG5leHBvcnQgZGVmYXVsdCBhbnNpU3R5bGVzO1xuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmNvbnN0IGxldmVsID0gKCgpID0+IHtcblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnREYXRhKSB7XG5cdFx0Y29uc3QgYnJhbmQgPSBuYXZpZ2F0b3IudXNlckFnZW50RGF0YS5icmFuZHMuZmluZCgoe2JyYW5kfSkgPT4gYnJhbmQgPT09ICdDaHJvbWl1bScpO1xuXHRcdGlmIChicmFuZCAmJiBicmFuZC52ZXJzaW9uID4gOTMpIHtcblx0XHRcdHJldHVybiAzO1xuXHRcdH1cblx0fVxuXG5cdGlmICgvXFxiKENocm9tZXxDaHJvbWl1bSlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiAwO1xufSkoKTtcblxuY29uc3QgY29sb3JTdXBwb3J0ID0gbGV2ZWwgIT09IDAgJiYge1xuXHRsZXZlbCxcblx0aGFzQmFzaWM6IHRydWUsXG5cdGhhczI1NjogbGV2ZWwgPj0gMixcblx0aGFzMTZtOiBsZXZlbCA+PSAzLFxufTtcblxuY29uc3Qgc3VwcG9ydHNDb2xvciA9IHtcblx0c3Rkb3V0OiBjb2xvclN1cHBvcnQsXG5cdHN0ZGVycjogY29sb3JTdXBwb3J0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydHNDb2xvcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcIklERUFzcGVjdHM6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9faWRlRmlsZXMvSURFQXNwZWN0cy9EYXRlUGlja2VyQXNwZWN0L1wiOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIkRhdGVQaWNrZXJBc3BlY3RcIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtJREVBc3BlY3RzXCJdID0gc2VsZltcIndlYnBhY2tDaHVua0lERUFzcGVjdHNcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsImltcG9ydCB7IERhdGVUaW1lLCBUZW1wdXNEb21pbnVzIH0gZnJvbSAnQGVvbmFzZGFuL3RlbXB1cy1kb21pbnVzJztcclxuLy9odHRwczovL2dldGRhdGVwaWNrZXIuY29tLzYvb3B0aW9ucy9kaXNwbGF5Lmh0bWxcclxuaW1wb3J0IHsgSURhdGVQaWNrZXJBc3BlY3RPcHRpb25zLCBzZXR0aW5nfSBmcm9tIFwiLi9EYXRlUGlja2VyQXNwZWN0Q29uZmlndXJhdGlvblwiO1xyXG5pbXBvcnQgeyBJRGVmYXVsdFNldHRpbmdzLCBJV2lkZ2V0SnNvbn0gZnJvbSAnLi4vQmFzZUNsYXNzZXMvSVdpZGdldEpzb24nO1xyXG5pbXBvcnQgeyBCYXNlSURFQXNwZWN0LCBnZXRGb3JtQnVpbGRlckZpZWxkUGF0aCB9IGZyb20gJy4uL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3QnO1xyXG5cclxubGV0IHRoaXNXaWRnZXRTeXN0ZW1OYW1lID0gXCJEYXRlUGlja2VyQXNwZWN0XCI7XHJcblxyXG5cclxuLy9hZGQgc3R5bGUgdG8gaGVhZDogaHR0cHM6Ly91bnBrZy5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy13ZWJAbGF0ZXN0L2Rpc3QvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIubWluLmNzc1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJBc3BlY3QgZXh0ZW5kcyBCYXNlSURFQXNwZWN0PElEYXRlUGlja2VyQXNwZWN0T3B0aW9ucywgYW55PiB7XHJcbiAgICByZWZyZXNoKG5ld0NvbmZpZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gICAgfVxyXG4gICAgcmVzZXQobmV3Q29uZmlnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBcclxuICAgIGRhdGVQaWNrZXJEaXY6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgZGF0ZVRpbWVQaWNrZXI6IFRlbXB1c0RvbWludXMgfCB1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIC8vIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnMsIGJhc2VNb2RlbDogYW55KSB7XHJcbiAgICAvLyAgICAgc3VwZXIoXCJTaW5nbGVWYWx1ZUFzcGVjdFwiLCBcImFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXCIsIGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbClcclxuICAgIC8vIH1cclxuXHJcbiAgICAvL0Fic3RyYWN0IG1ldGhvZHMgLSBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IHRoZSBkZXJpdmVkIGNsYXNzXHJcblxyXG4gICAgc2V0VGhpc0NvbXBvbmVudE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJEYXRlUGlja2VyQXNwZWN0XCI7XHJcbiAgICB9XHJcbiAgICBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBkb2N1bWVudC5oZWFkLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zXCI+YCk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248SURhdGVQaWNrZXJBc3BlY3RPcHRpb25zPiB7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmc7XHJcbiAgICB9XHJcbiAgIFxyXG5cclxuICAgIHNldERlZmF1bHRzKCk6IElEZWZhdWx0U2V0dGluZ3M8SURhdGVQaWNrZXJBc3BlY3RPcHRpb25zPiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLy8gQXNwZWN0IHdpZGdldCBjb25maWcgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICB0aXRsZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBmb3JtQnVpbGRlckZpZWxkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHBpY2tlckVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGV2ZW50VG9GaXJlT25VcGRhdGU6IFtcIklERUFzcGVjdHMuRGF0ZVBpY2tlckFzcGVjdC5VcGRhdGVcIl0sXHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZToge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdERhdGVGcm9tTm93SG91cnM6IDI0LFxyXG4gICAgICAgICAgICAgICAgZ2V0VmFsdWVVc2luZ1BhcmVudHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtYXhEZXB0aDogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0ZVBpY2tlck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2lkZUJ5U2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZTogXCJsaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlYnVnOiB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGxvZ1RvQ29uc29sZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV2ZW50c1RvUmVhY3RUbzogW10sXHJcbiAgICAgICAgICAgIGRhdGFTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgZ2V0VmFsdWVVc2luZ1BhcmVudHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWF4RGVwdGg6IDAsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAvL0Fic3RyYWN0IG1ldGhvZHMgLSBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IHRoZSBkZXJpdmVkIGNsYXNzXHJcbiAgICBzZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZighdGhpcy5jb25maWd1cmF0aW9uLmZvcm1CdWlsZGVyRmllbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGZvcm1idWlsZGVyIGZpZWxkIHNldCBpbiBjb25maWd1cmF0aW9uIC0gY2hlY2sgYXNwZWN0IGNvbmZpZ3VyYXRpb25cIiwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZvcm1idWlsZGVyIGZpZWxkIHNldCBpbiBjb25maWd1cmF0aW9uIC0gY2hlY2sgYXNwZWN0IGNvbmZpZ3VyYXRpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnZXRGb3JtQnVpbGRlckZpZWxkUGF0aCh0aGlzLmNvbmZpZ3VyYXRpb24uZm9ybUJ1aWxkZXJGaWVsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQaWNrZXJFbmFibGVkU3RhdGUobmV3VmFsdWU6IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVQaWNrZXJEaXYpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2FuYXRpc2UgdGhlIGRhdGEgYmVmb3JlIHNhdmluZywgZm9ybSBidWlsZCBkYXRhIG5lZWRzIHRvIGJlIGEgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHNldE1vZGVsRGF0YUFzRGF0ZShuZXdWYWx1ZTogRGF0ZVRpbWUgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEobmV3VmFsdWU/LnRvSVNPU3RyaW5nKCkgfHwgdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGRhdGEgZnJvbSBmb3JtIGJ1aWxkZXIgYW5kIGNvbnZlcnRzIHRvIERhdGVUaW1lXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGdldE1vZGVsRGF0YUFzRGF0ZSgpIHtcclxuICAgICAgICBsZXQgcmV0VmFsdWU6IERhdGVUaW1lXHJcblxyXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gYXdhaXQgdGhpcy5nZXREYXRhKCk7XHJcbiAgICAgICAgaWYgKCFmb3VuZFZhbHVlKSB7XHJcbiAgICAgICAgICAgIGZvdW5kVmFsdWUgPSB0aGlzLmdlbmVyYXRlRGVmYXVsdERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmVuc3VyZURhdGUoZm91bmRWYWx1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TW9kZWxEYXRhQXNEYXRlKHJldFZhbHVlKTsgLy9zZXQgdGhlIHZhbHVlIHRvIGVuc3VyZSBpdCBpcyB2YWxpZFxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIGdldCB0b2RheSBkYXRlICsgZGVmYXVsdERhdGVGcm9tTm93SG91cnMgKGlmIHNldCBpbiBjb25maWd1cmF0aW9uKVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlRGVmYXVsdERhdGUoKSB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHREYXRlID0gbmV3IERhdGVUaW1lKERhdGVUaW1lLm5vdygpKTtcclxuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmRlZmF1bHRWYWx1ZT8uZGVmYXVsdERhdGVGcm9tTm93SG91cnMpIHtcclxuICAgICAgICAgICAgZGVmYXVsdERhdGUuc2V0SG91cnMoZGVmYXVsdERhdGUuZ2V0SG91cnMoKSArIHRoaXMuY29uZmlndXJhdGlvbi5kZWZhdWx0VmFsdWUuZGVmYXVsdERhdGVGcm9tTm93SG91cnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVmYXVsdERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayBhZnRlciBpbml0aWFsIGNyZWF0aW9uIGFuZCBiaW5kaW5nIHRvIGxvYWQgZGF0YVxyXG4gICAgICogaW50byBpdCdzIG1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGxvYWRBbmRCaW5kKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5JREVBc3BlY3RzLURhdGVQaWNrZXJBc3BlY3RcIik7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gZWxlbWVudCBmb3VuZFwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiBhbHJlYWR5IGV4aXN0cyByZW1vdmUgaXRcclxuICAgICAgICBpZiAodGhpcy5kYXRlUGlja2VyRGl2KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiQWxyZWFkeSBleGlzdHNcIiwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9CdWlsZCB0aGUgZGF0ZSBwaWNrZXIgZGl2IFxyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyRGl2LmNsYXNzTGlzdC5hZGQoXCJ0aGUtcGlja2VyXCIpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5jbGFzc0xpc3QuYWRkKFwibG9nLWV2ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5pZCA9IHRoaXMudW5pcXVlSWQ7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBpbnB1dC5pZCA9IHRoaXMudW5pcXVlSWQgKyBcIklucHV0XCI7XHJcbiAgICAgICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiZGF0YS10ZC10YXJnZXRcIiwgXCIjXCIgKyB0aGlzLnVuaXF1ZUlkKTtcclxuICAgICAgICB0aGlzLmRhdGVQaWNrZXJEaXYuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICAgICAgICAvLyBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIC8vIHNwYW4uY2xhc3NMaXN0LmFkZChcImlucHV0LWdyb3VwLXRleHRcIik7XHJcbiAgICAgICAgLy8gc3Bhbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRkLXRhcmdldFwiLCBcIiNcIiArIHRoaXMudW5pcXVlSWQpO1xyXG4gICAgICAgIC8vIHNwYW4uc2V0QXR0cmlidXRlKFwiZGF0YS10ZC10b2dnbGVcIiwgXCJkYXRldGltZXBpY2tlclwiKTtcclxuICAgICAgICAvLyBsZXQgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpOyBcclxuICAgICAgICAvLyBpLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgLy8gaS5jbGFzc0xpc3QuYWRkKFwiZmEtY2FsZW5kYXJcIik7XHJcbiAgICAgICAgLy8gc3Bhbi5hcHBlbmRDaGlsZChpKTsgXHJcbiAgICAgICAgLy8gdGhpcy5kYXRlUGlja2VyRGl2LmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZGF0ZVBpY2tlckRpdik7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVQaWNrZXIgPSBuZXcgVGVtcHVzRG9taW51cyh0aGlzLmRhdGVQaWNrZXJEaXYsIHRoaXMuY29uZmlndXJhdGlvbi5kYXRlUGlja2VyT3B0aW9ucyB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmRhdGVQaWNrZXJPcHRpb25zLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQW5kQmluZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZXRQaWNrZXJFbmFibGVkU3RhdGUodGhpcy5vcHRpb25zLnBpY2tlckVuYWJsZWQoKSk7XHJcbiAgICAgICAgLy9TZXQgdGhlIHZhbHVlIG9mIHRoZSBwaWNrZXIgdG8gdGhlIHZhbHVlIGluIHRoZSBtb2RlbFxyXG4gICAgICAgIGxldCBkYXRlVG9TZXQgPSBhd2FpdCB0aGlzLmdldE1vZGVsRGF0YUFzRGF0ZSgpXHJcbiAgICAgICAgdGhpcy5kYXRlVGltZVBpY2tlci5kYXRlcy5zZXRWYWx1ZShcclxuICAgICAgICAgICAgZGF0ZVRvU2V0LFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lUGlja2VyLmRhdGVzLmxhc3RQaWNrZWRJbmRleFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVQaWNrZXIuc3Vic2NyaWJlKFwiY2hhbmdlLnRkXCIsIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJEYXRlIENoYW5nZWRcIiwgXCJyZWRcIiwgZSk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5ldmVudFRvRmlyZU9uVXBkYXRlKCk/LmZvckVhY2goKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkdWkuZXZlbnRzLmJyb2FkY2FzdChldmVudCxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWJ1aWxkZXJGaWVsZDogdGhpcy5mb3JtYnVpbGRlckZpZWxkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5nZXRDdXJyZW50U2VsZWN0ZWREYXRlKClcclxuICAgICAgICAgICAgICAgICAgICB9KTsgLy9maXJlIGV2ZW50IGFuZCBwYXNzIGluIHRoZSBkYXRlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsRGF0YUFzRGF0ZSh0aGlzLmdldEN1cnJlbnRTZWxlY3RlZERhdGUoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuc3VyZSB0aGUgZGF0ZSBpcyBhIHZhbGlkIGRhdGVcclxuICAgICAgICAqIEBwYXJhbSBkXHJcbiAgICAgICAgKiBAcmV0dXJucyBhIERhdGVUaW1lIGJhc2VkIG9uIHRoZSBpbnB1dCBvciBhIGRlZmF1bHQgZGF0ZSBpZiB0aGUgaW5wdXQgaXMgbm90IHZhbGlkXHJcbiAgICAqKi9cclxuICAgIGVuc3VyZURhdGUoZDogYW55KSA6IERhdGVUaW1lIHtcclxuICAgICAgICBsZXQgcmV0VmFsdWU6IERhdGVUaW1lO1xyXG4gICAgICAgIC8vY2hlY2sgaWYgZCBpcyBhIGRhdGVcclxuICAgICAgICBpZiAoZCBpbnN0YW5jZW9mIERhdGVUaW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgIHJldFZhbHVlID0gbmV3IERhdGVUaW1lKERhdGVUaW1lLnBhcnNlKGQpKTtcclxuICAgICAgICAgICAgaWYoIURhdGVUaW1lLmlzVmFsaWQocmV0VmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXRWYWx1ZT0gdGhpcy5nZW5lcmF0ZURlZmF1bHREYXRlKCk7O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhgVW5hYmxlIHRvIHBhcnNlIGRhdGUgJHtkfSAoc2V0dGluZyBkYXRlIHRvIGRlZmF1bHQgZGF0ZSkgLSBjaGVjayBhc3BlY3QgY29uZmlndXJhdGlvbiBgLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmdlbmVyYXRlRGVmYXVsdERhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbG9hZChtb2RlbDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZWxvYWQobW9kZWw6IGFueSkge1xyXG4gICAgICAgIHRoaXMubG9nKFwiUmVsb2FkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRDdXJyZW50U2VsZWN0ZWREYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lUGlja2VyPy5kYXRlcy5waWNrZWRbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIG9uU2F2ZShtb2RlbDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5sb2coXCJTYXZlXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0TW9kZWxEYXRhQXNEYXRlKHRoaXMuZ2V0Q3VycmVudFNlbGVjdGVkRGF0ZSgpKTtcclxuICAgICAgICBzdXBlci5vblNhdmUobW9kZWwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9