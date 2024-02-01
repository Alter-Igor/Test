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

/***/ "./node_modules/detect-browser/es/index.js":
/*!*************************************************!*\
  !*** ./node_modules/detect-browser/es/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BotInfo: () => (/* binding */ BotInfo),
/* harmony export */   BrowserInfo: () => (/* binding */ BrowserInfo),
/* harmony export */   NodeInfo: () => (/* binding */ NodeInfo),
/* harmony export */   ReactNativeInfo: () => (/* binding */ ReactNativeInfo),
/* harmony export */   SearchBotDeviceInfo: () => (/* binding */ SearchBotDeviceInfo),
/* harmony export */   browserName: () => (/* binding */ browserName),
/* harmony export */   detect: () => (/* binding */ detect),
/* harmony export */   detectOS: () => (/* binding */ detectOS),
/* harmony export */   getNodeVersion: () => (/* binding */ getNodeVersion),
/* harmony export */   parseUserAgent: () => (/* binding */ parseUserAgent)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var BrowserInfo = /** @class */ (function () {
    function BrowserInfo(name, version, os) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.type = 'browser';
    }
    return BrowserInfo;
}());

var NodeInfo = /** @class */ (function () {
    function NodeInfo(version) {
        this.version = version;
        this.type = 'node';
        this.name = 'node';
        this.os = process.platform;
    }
    return NodeInfo;
}());

var SearchBotDeviceInfo = /** @class */ (function () {
    function SearchBotDeviceInfo(name, version, os, bot) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.bot = bot;
        this.type = 'bot-device';
    }
    return SearchBotDeviceInfo;
}());

var BotInfo = /** @class */ (function () {
    function BotInfo() {
        this.type = 'bot';
        this.bot = true; // NOTE: deprecated test name instead
        this.name = 'bot';
        this.version = null;
        this.os = null;
    }
    return BotInfo;
}());

var ReactNativeInfo = /** @class */ (function () {
    function ReactNativeInfo() {
        this.type = 'react-native';
        this.name = 'react-native';
        this.version = null;
        this.os = null;
    }
    return ReactNativeInfo;
}());

// tslint:disable-next-line:max-line-length
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
    ['aol', /AOLShield\/([0-9\._]+)/],
    ['edge', /Edge\/([0-9\._]+)/],
    ['edge-ios', /EdgiOS\/([0-9\._]+)/],
    ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
    ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
    ['samsung', /SamsungBrowser\/([0-9\.]+)/],
    ['silk', /\bSilk\/([0-9._-]+)\b/],
    ['miui', /MiuiBrowser\/([0-9\.]+)$/],
    ['beaker', /BeakerBrowser\/([0-9\.]+)/],
    ['edge-chromium', /EdgA?\/([0-9\.]+)/],
    [
        'chromium-webview',
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
    ],
    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
    ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
    ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
    ['fxios', /FxiOS\/([0-9\.]+)/],
    ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
    ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
    ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
    ['pie', /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
    ['pie', /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
    ['netfront', /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
    ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
    ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ['ie', /MSIE\s(7\.0)/],
    ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ['android', /Android\s([0-9\.]+)/],
    ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ['safari', /Version\/([0-9\._]+).*Safari/],
    ['facebook', /FB[AS]V\/([0-9\.]+)/],
    ['instagram', /Instagram\s([0-9\.]+)/],
    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
    ['curl', /^curl\/([0-9\.]+)$/],
    ['searchbot', SEARCHBOX_UA_REGEX],
];
var operatingSystemRules = [
    ['iOS', /iP(hone|od|ad)/],
    ['Android OS', /Android/],
    ['BlackBerry OS', /BlackBerry|BB10/],
    ['Windows Mobile', /IEMobile/],
    ['Amazon OS', /Kindle/],
    ['Windows 3.11', /Win16/],
    ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
    ['Windows 98', /(Windows 98)|(Win98)/],
    ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
    ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
    ['Windows Server 2003', /(Windows NT 5.2)/],
    ['Windows Vista', /(Windows NT 6.0)/],
    ['Windows 7', /(Windows NT 6.1)/],
    ['Windows 8', /(Windows NT 6.2)/],
    ['Windows 8.1', /(Windows NT 6.3)/],
    ['Windows 10', /(Windows NT 10.0)/],
    ['Windows ME', /Windows ME/],
    ['Windows CE', /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
    ['Open BSD', /OpenBSD/],
    ['Sun OS', /SunOS/],
    ['Chrome OS', /CrOS/],
    ['Linux', /(Linux)|(X11)/],
    ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
    ['QNX', /QNX/],
    ['BeOS', /BeOS/],
    ['OS/2', /OS\/2/],
];
function detect(userAgent) {
    if (!!userAgent) {
        return parseUserAgent(userAgent);
    }
    if (typeof document === 'undefined' &&
        typeof navigator !== 'undefined' &&
        navigator.product === 'ReactNative') {
        return new ReactNativeInfo();
    }
    if (typeof navigator !== 'undefined') {
        return parseUserAgent(navigator.userAgent);
    }
    return getNodeVersion();
}
function matchUserAgent(ua) {
    // opted for using reduce here rather than Array#first with a regex.test call
    // this is primarily because using the reduce we only perform the regex
    // execution once rather than once for the test and for the exec again below
    // probably something that needs to be benchmarked though
    return (ua !== '' &&
        userAgentRules.reduce(function (matched, _a) {
            var browser = _a[0], regex = _a[1];
            if (matched) {
                return matched;
            }
            var uaMatch = regex.exec(ua);
            return !!uaMatch && [browser, uaMatch];
        }, false));
}
function browserName(ua) {
    var data = matchUserAgent(ua);
    return data ? data[0] : null;
}
function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) {
        return null;
    }
    var name = matchedRule[0], match = matchedRule[1];
    if (name === 'searchbot') {
        return new BotInfo();
    }
    // Do not use RegExp for split operation as some browser do not support it (See: http://blog.stevenlevithan.com/archives/cross-browser-split)
    var versionParts = match[1] && match[1].split('.').join('_').split('_').slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) {
            versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
        }
    }
    else {
        versionParts = [];
    }
    var version = versionParts.join('.');
    var os = detectOS(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) {
        return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
    }
    return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
    for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
            return os;
        }
    }
    return null;
}
function getNodeVersion() {
    var isNode = typeof process !== 'undefined' && process.version;
    return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
    var output = [];
    for (var ii = 0; ii < count; ii++) {
        output.push('0');
    }
    return output;
}


/***/ }),

/***/ "./src/Common/Base64Encoding.ts":
/*!**************************************!*\
  !*** ./src/Common/Base64Encoding.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64ToUtf8: () => (/* binding */ base64ToUtf8),
/* harmony export */   utf8ToBase64: () => (/* binding */ utf8ToBase64)
/* harmony export */ });
function utf8ToBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
    }));
}
function base64ToUtf8(str) {
    return decodeURIComponent(atob(str).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


/***/ }),

/***/ "./src/Common/Debound.ts":
/*!*******************************!*\
  !*** ./src/Common/Debound.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounceFunction: () => (/* binding */ debounceFunction)
/* harmony export */ });
let timer;
function debounceFunction(func, wait) {
    return function executedFunction() {
        const later = () => {
            clearTimeout(timer);
            func();
        };
        clearTimeout(timer);
        timer = window.setTimeout(later, wait); // Cast to number if TypeScript complains
    };
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

/***/ "./src/Interfaces/api/graph/IGraphQuery.ts":
/*!*************************************************!*\
  !*** ./src/Interfaces/api/graph/IGraphQuery.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IGraphQueryDfaults: () => (/* binding */ IGraphQueryDfaults)
/* harmony export */ });
const IGraphQueryDfaults = {
    "fields": [
        {
            "path": "workitem.title"
        },
        {
            "path": "workitem.id"
        }
    ],
    "debug": false,
    "allowParallelExecution": true,
    "executeCalculatedFields": true,
    "responseType": "flat",
    "entityType": undefined,
    "entityId": ""
};


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
/* harmony export */   getValueFromKOObject: () => (/* binding */ getValueFromKOObject),
/* harmony export */   gvko: () => (/* binding */ gvko),
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
/**
 * This function should be temporary and will be removed once the typescript typing are fixed
 * What is does is check if the passed in object is a knockout observable and if it is it returns the value
 * @param koObject
 * @returns
 */
function getValueFromKOObject(koObject) {
    if (typeof koObject === "function") {
        return koObject();
    }
    return koObject;
}
function gvko(koObject) {
    return ko.toJS(koObject);
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
/* harmony export */   executePostv2: () => (/* binding */ executePostv2),
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
async function executePostv2(api, postBody) {
    //return await $ajax.post(/* webpackIgnore: true */ validateApi(api), postBody);
    return executeFetch(api, "POST", postBody);
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
async function executeFetch(api, method, data, retryCounter) {
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
            if (response.status === 401) {
                retryCounter = retryCounter || 1;
                if (retryCounter > 3) {
                    retValue.info.error.push({
                        code: "API_ERROR",
                        message: `An error occured while trying to call the API after 3 attempts. statusText: ${response.statusText}`,
                        userMessage: "An error occured while trying to call the API."
                    });
                    return { data: undefined, response };
                }
                await $ajax.get("https://hsf-vnext.sharedo.co.uk/security/refreshTokens?_=" + Date.now);
                return await executeFetch(api, method, data, retryCounter);
            }
            retValue.info.error.push({
                code: "API_ERROR",
                message: `An error occured while trying to call the API. statusText: ${response.statusText}`,
                userMessage: "An error occured while trying to call the API."
            });
        }
        let responseData;
        //check if response is JSON
        try {
            if (response.headers.get("content-type")?.includes("application/json")) {
                responseData = await response.json();
            }
            else {
                responseData = await response.text();
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
        return { data: responseData, response };
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

/***/ "./src/WebBased/Common/api/executeFindByGraph/executeFindByGraph.ts":
/*!**************************************************************************!*\
  !*** ./src/WebBased/Common/api/executeFindByGraph/executeFindByGraph.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeFindByGraph: () => (/* binding */ executeFindByGraph)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ "./src/WebBased/Common/api/api.ts");

function executeFindByGraph(inputOption) {
    return (0,_api__WEBPACK_IMPORTED_MODULE_0__.executePostv2)("/api/graph/workitem/query", inputOption);
}


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
    if (!httpResultFindByQuery) {
        console.log("No result found");
        return retValue;
    }
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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/EventsHelper */ "./src/WebBased/Common/EventsHelper.ts");
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Common/Log */ "./src/Common/Log.ts");
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Common/ObjectHelper */ "./src/WebBased/Common/ObjectHelper.ts");
/* harmony import */ var _Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Common/api/searchForAttributeWithParents */ "./src/WebBased/Common/api/searchForAttributeWithParents.ts");
/* harmony import */ var _DefaultSettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DefaultSettings */ "./src/WebBased/IDEAspects/BaseClasses/DefaultSettings.ts");
/* harmony import */ var _Common_Debound__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Common/Debound */ "./src/Common/Debound.ts");
/* harmony import */ var _Interfaces_api_graph_IGraphQuery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../Interfaces/api/graph/IGraphQuery */ "./src/Interfaces/api/graph/IGraphQuery.ts");
/* harmony import */ var _Common_api_executeFindByGraph_executeFindByGraph__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Common/api/executeFindByGraph/executeFindByGraph */ "./src/WebBased/Common/api/executeFindByGraph/executeFindByGraph.ts");
/* harmony import */ var _helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../helpers/evaluteRule */ "./src/helpers/evaluteRule.ts");
/* harmony import */ var detect_browser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! detect-browser */ "./node_modules/detect-browser/es/index.js");
/* harmony import */ var _Template_TemplateApplicator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Template/TemplateApplicator */ "./src/WebBased/IDEAspects/BaseClasses/Template/TemplateApplicator.ts");














console.log("v: - 3.29");
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
        this.disposables = [];
        this.refreshLog = new Array();
        this.errorDivSelector = ERROR_DIV_SELECTOR;
        this.errors = knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray();
        if (arr.length === 0) {
            //This is the base constructor
            return;
        }
        if (arr.length === 3) {
            //This is the constructor that is called by the IDE
            this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_12__["default"])();
            this._initialise(arr[0], arr[1], arr[2]);
            // this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
            this.fireEvent("onSetup", this.model);
            this.setup();
            this.fireEvent("afterSetup", this.model);
            this.setupLiveConfig();
            this.setupEventWatcher();
            this.setupErrorManager();
            this.addAspectLogOutput();
            return;
        }
    }
    _initialise(element, polutedConfiguration, baseModel) {
        //let configuration = polutedConfiguration.configuration; //Poluted as Sharedo added additional information to thsi object depending on where its instansiated
        this.sharedoConfiguration = polutedConfiguration;
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = polutedConfiguration;
        this.baseModel = baseModel;
        // this.originalConfiguration
        // let baseDefaults: IDefaultConfigSettings<any> = {
        //     debug: {
        //         enabled: false,
        //         logToConsole: false,
        //         showInAspect: false,
        //         liveConfig: false
        //     }
        // }
        //check that we have a sub configuration
        if (!this.sharedoConfiguration.configuration) {
            console.error("No configuration found in the sharedoConfiguration - check the aspect or widget config that ther eis a base configuration of configuration:{}");
            throw new Error("No configuration found in the sharedoConfiguration");
        }
        this.sharedoConfiguration.configuration = $.extend(_DefaultSettings__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_CONFIGURATION_SETTINGS, this.sharedoConfiguration.configuration); //make sure debug is set or use defaults
        // this.originalConfiguration.debug = $.extend(baseDefaults.debug, this.originalConfiguration.debug) as IDebug;
        // configuration.debug = $.extend(baseDefaults, configuration.debug) as IDebug;
        // this.data = undefined;
        // Merge the configuration with the defaults
        this.sharedoConfiguration.configuration = $.extend(this.defaults, this.originalConfiguration.configuration);
        //create a new model
        this.model = this.sharedoConfiguration._host?.model;
        // this.enabled = this.model?.canEdit;
        this.blade = this.sharedoConfiguration._host?.blade;
        this.loaded = this.loaded || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false);
        // Map the base model properties
        this.sharedoId =
            this.sharedoConfiguration._host?.model.id ||
                $ui.pageContext?.sharedoId ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName =
            this.sharedoConfiguration._host?.model?.sharedoTypeSystemName ||
                $ui.pageContext?.sharedoTypeName ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        if (!this.sharedoTypeSystemName || !this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }
        this.parentSharedoId =
            this.sharedoConfiguration._host?.model?.parentSharedoId ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        this.phaseName =
            this.sharedoConfiguration._host?.model?.phaseName ||
                $ui.pageContext?.phaseName ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        this.phaseIsOpen =
            this.sharedoConfiguration._host?.model?.phaseIsOpen ||
                $ui.pageContext?.phaseIsOpen ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        // this.shareDoOptions = toObservableObject(this.sharedoConfiguration, this.shareDoOptions);
        // this._shareDoOptions = this.shareDoOptions as ObservableSharedoConfigurationOptions<unknown>
        // Validation
        this.validation = {};
        this.validationErrorCount = this.validationErrorCount || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0);
        this.applyComponentConfiguration(this.sharedoConfiguration.configuration);
        //setup the location to load and save the data from by calling the abstract method in the child class
        //! --> LocationToSaveOrLoadData <-- - this should be called at the end of this function to ensure that the options and configuration data is availabel to the child class
        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
        this.fireEvent("onInitialise", this.model);
    }
    applyComponentConfiguration(configuration) {
        let configurationAsObservables = (0,_KOConverter__WEBPACK_IMPORTED_MODULE_3__.toObservableObject)(configuration, this.options);
        this.configuration = configuration;
        this.options = configurationAsObservables;
        // ! Note line below is for typing within the IDEBase, the line above is for typing within the child class
        this._options =
            configurationAsObservables;
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
        this._options?.debug.subscribe((newValue) => {
            if (newValue.liveConfig) {
                this.activateLiveConfig(newValue.liveConfig);
            }
        });
        this.activateLiveConfig(this._options?.debug().liveConfig()); //TODO fix typings
    }
    activateLiveConfig(active) {
        if (!active) {
            this.liveConfigDiv?.remove();
            return;
        }
        if (this.liveConfigDiv) {
            //leave alone if already active
            return;
        }
        this.l("Setting up live config");
        const serializedData = JSON.stringify(this.sharedoConfiguration, (key, value) => {
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
        let applyChange = () => {
            this.applyComponentConfiguration(JSON.parse(config()).configuration);
            this.liveConfigurationRefreshed();
            this.buildErrorDiv();
        };
        setTimeout(() => {
            config.subscribe((newValue) => {
                const debouncedApplyChange = (0,_Common_Debound__WEBPACK_IMPORTED_MODULE_7__.debounceFunction)(applyChange, 3000);
                debouncedApplyChange();
                // console.log("The new value is " + newValue)
                // if (timeout) {
                //     return;
                // }
                // setTimeout(() => {
                //     timeout = false;
                //     let newConfig = JSON.parse(config())
                //     this.applyComponentConfiguration(newConfig.configuration);
                //     this.liveConfigurationRefreshed();
                //     // this.refresh(newConfig);
                //     // this.reset(newConfig);
                // }, 500);
                // timeout = true;
            });
        }, 3000);
        // ko.applyBindings(this.liveConfigData, this.liveConfigDiv);x
        // }
    }
    ensureStylesLoaded(href) {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.href = href;
            link.rel = "stylesheet";
            link.type = "text/css";
            document.head.appendChild(link);
        }
    }
    createLiveConfigDiv() {
        // Create the outer <div> with class "col-sm-12 formbuilder-editor-json"
        const outerDiv = document.createElement("div");
        outerDiv.className = "col-sm-12 formbuilder-editor-json";
        // Create the inner <div> with the specified attributes
        const innerDiv = document.createElement("div");
        innerDiv.id = "liveConfig";
        innerDiv.className = "form-control textarea";
        innerDiv.style.height = "300px";
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: liveConfigData.config, enable: true, event: { focusout: liveConfigData.onFocusOut }');
        innerDiv.setAttribute("data-bind", "syntaxEditor: liveConfigData.config");
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: model.config');
        // Append the innerDiv to the outerDiv
        outerDiv.appendChild(innerDiv);
        return outerDiv;
    }
    setupEventWatcher() {
        this._options?.eventsToReactTo()?.forEach((eventToWatch) => {
            console.log("Subscribing to event", eventToWatch);
            this.disposables.push($ui.events.subscribe(eventToWatch.eventPath(), (e) => {
                this.refreshComponent(eventToWatch.eventPath(), eventToWatch.methodToCall());
            }, this));
        });
        let refreshOn = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._options?.refreshOn());
        if (refreshOn) {
            if (refreshOn.sharedoIdChanged) {
                this.disposables.push(this.sharedoId.subscribe((newValue) => {
                    this.refreshComponent("sharedoIdChanged", "refresh");
                }));
            }
            if (refreshOn.sharedoParentIdChanged) {
                this.disposables.push(this.parentSharedoId.subscribe((newValue) => {
                    this.refreshComponent("sharedoParentIdChanged", "refresh");
                }));
            }
            if (refreshOn.sharedoPhaseChanged) {
                this.disposables.push(this.phaseName.subscribe((newValue) => {
                    this.refreshComponent("sharedoPhaseChanged", "refresh");
                }));
            }
        }
    }
    refreshComponent(eventPath, methodToCall) {
        this.refreshLog = this.refreshLog || [];
        if (this.lastRefresh) {
            //TODO: change this so we collect all refreshes and do them in one go
            let secondsSinceLastRefresh = (new Date().getTime() - this.lastRefresh.getTime()) / 100;
            console.log("Seconds since last refresh", secondsSinceLastRefresh);
            if (secondsSinceLastRefresh < 10) {
                console.log("Skipping refresh, too soon");
                return;
            }
        }
        this.lastRefresh = new Date();
        console.log("Refreshing component");
        let logItem = {
            eventPath: eventPath,
            methodToCall: methodToCall,
            time: new Date(),
            success: false,
        };
        try {
            if (methodToCall) {
                // let params = widgets.parameters;
                console.log("Executing method", methodToCall);
                let componentToRefresh = this;
                if (!componentToRefresh[methodToCall]) {
                    console.log(`Method not found on component ${this.thisComponentName}`, methodToCall);
                }
                {
                    componentToRefresh[methodToCall](); //todo: parameters
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            logItem.success = true;
            this.refreshLog.push(logItem);
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
        // this.errors().forEach((error) => {
        for (let i = 0; i < this.errors().length; i++) {
            let error = this.errors()[i];
            //Look for any trapping and add to the error object
            this.addErrorTrapping(error);
            //Render the error div and add to the foreach div
            foreachDiv.appendChild(this.buildIndividualError(error));
        }
    }
    buildIndividualError(error) {
        let templateApplicator = new _Template_TemplateApplicator__WEBPACK_IMPORTED_MODULE_11__.TemplateApplicator();
        let dataContext = this.getDataContext([{ obj: error, key: "error" }]);
        let linkedTrappedError = error.linkedTrappedError;
        let individualErrorDiv = document.createElement("div");
        individualErrorDiv.className = "ide-aspect-error-individual-error";
        if (linkedTrappedError) {
            templateApplicator.addCSS(linkedTrappedError.classRules, individualErrorDiv, "dataContext", dataContext);
            templateApplicator.addStyle(linkedTrappedError.styleRules, individualErrorDiv, "dataContext", dataContext);
        }
        let userMessageDiv = document.createElement("div");
        userMessageDiv.className = "ide-aspect-error-user-message";
        let suggestionsDiv;
        let supportButtonDiv;
        let actionsDiv;
        // actionsDiv.className = "ide-aspect-error-actions";
        let internalSuggestionsDiv;
        // internalSuggestionsDiv.className = "ide-aspect-error-internal-suggestions";
        userMessageDiv.innerHTML =
            linkedTrappedError?.userFreindlyMessage ||
                error.userMessage ||
                error.message ||
                "Unknown error";
        if (linkedTrappedError?.userFreindlyHTMLMessageTemplate) {
            let userFreindlyMessage = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.executeEmbeddedCode)(linkedTrappedError.userFreindlyHTMLMessageTemplate, dataContext);
            userMessageDiv.innerHTML = userFreindlyMessage;
            //Find section divs in the template if they exist
            suggestionsDiv =
                userMessageDiv.querySelector(".ide-aspect-error-suggestions") || suggestionsDiv;
            actionsDiv =
                userMessageDiv.querySelector(".ide-aspect-error-actions") || actionsDiv;
            internalSuggestionsDiv =
                userMessageDiv.querySelector(".ide-aspect-error-internal-suggestions") || internalSuggestionsDiv;
        }
        individualErrorDiv.appendChild(userMessageDiv);
        // userMessageDiv.onclick = () => {
        //     //create a div that can scoll
        //     let detailedMessageDiv = document.createElement("div");
        //     detailedMessageDiv.className = "ide-aspect-error-detailed-message";
        //     const code = escapeHtml(error.code || "");
        //     const message = escapeHtml(error.message || "");
        //     const userMessage = escapeHtml(error.userMessage || "");
        //     const errorStack = escapeHtml(error.errorStack || "");
        //     const additionalInfo = JsonToHtmlConverter.convert(error.additionalInfo || {});
        //     const html = `
        //                     <div>
        //                     <h2>Error: ${code}</h2>
        //                     <p><strong>Message:</strong> ${message}</p>
        //                     <p><strong>User Message:</strong> ${userMessage}</p>
        //                     <p><strong>Stack:</strong> ${errorStack}</p>
        //                     <p><strong>Additional Info:</strong> ${additionalInfo}</p>
        //                     </div>`;
        //     detailedMessageDiv.innerHTML = html;
        //     $ui.errorDialog(detailedMessageDiv);
        // }
        //create the sections divs if they done exists and add to the individual error div
        {
            if (!suggestionsDiv) {
                suggestionsDiv = document.createElement("div");
                individualErrorDiv.appendChild(suggestionsDiv);
            }
            if (!actionsDiv) {
                actionsDiv = document.createElement("div");
                individualErrorDiv.appendChild(actionsDiv);
            }
            if (!internalSuggestionsDiv) {
                internalSuggestionsDiv = document.createElement("div");
                individualErrorDiv.appendChild(internalSuggestionsDiv);
            }
            if (!supportButtonDiv) {
                supportButtonDiv = document.createElement("div");
                individualErrorDiv.appendChild(supportButtonDiv);
            }
        }
        let resolutionSuggestions = linkedTrappedError?.resolutionSuggestions ||
            error.internalSuggestions ||
            [];
        if (resolutionSuggestions.length > 0) {
            suggestionsDiv.className = "ide-aspect-error-suggestions";
            suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${resolutionSuggestions.join("<br/>")}`;
        }
        let actions = error.sharedoErrorActions || [];
        if (actions.length > 0) {
            actionsDiv.innerHTML = `<b>Actions:</b><br/>${actions.join("<br/>")}`;
        }
        let internalSuggestions = error.internalSuggestions || [];
        if (internalSuggestions.length > 0) {
            internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${internalSuggestions.join("<br/>")}`;
        }
        let supportButton = linkedTrappedError?.supportButton ||
            this.configuration?.errorManagement?.unTrappedErrorsSupportButton;
        if (supportButton && supportButton.enabled) {
            let actionDiv = document.createElement("div");
            actionDiv.className = "ide-aspect-error-support-action";
            individualErrorDiv.appendChild(actionDiv);
            let button = document.createElement("button");
            button.className = "btn btn-primary";
            button.onclick = () => {
                this.createOpenPanel(supportButton, dataContext);
            };
            templateApplicator.addCSS(supportButton.classRules, actionDiv, "dataContext", dataContext);
            templateApplicator.addStyle(supportButton.styleRules, actionDiv, "dataContext", dataContext);
            button.innerText = supportButton.title;
            actionDiv.appendChild(button);
        }
        return individualErrorDiv;
    }
    createOpenPanel(supportButton, dataContext) {
        if (!supportButton) {
            return;
        }
        let buttonConfig = supportButton.raiseSupportTicketSharedoCommand;
        let supportTicketMessage = buttonConfig.description || supportButton.supportTicketMessage || "";
        let config = {
            title: (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.executeEmbeddedCode)(buttonConfig.title, dataContext),
            typeSystemName: (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.executeEmbeddedCode)(buttonConfig.typeSystemName, dataContext),
            description: (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.executeEmbeddedCode)(supportTicketMessage, dataContext)
        };
        $ui.nav.invoke({
            invokeType: "panel",
            invoke: "Sharedo.Core.Case.Sharedo.AddEditSharedo",
            config: config,
        });
    }
    addErrorTrapping(error) {
        //run rules in error traps to see if this error has been trapped bhy a rule
        let errorTrapped = false;
        // let errorTraps = gvko<IErrorTrap[]>(this._options?.errorManagement()?.errorTraps) || [];
        let errorTraps = this.configuration?.errorManagement?.errorTraps || [];
        // errorTraps.forEach((trap) => {
        for (let errorTrapsIndex = 0; errorTrapsIndex < errorTraps.length; errorTrapsIndex++) {
            let trap = errorTraps[errorTrapsIndex];
            if (trap.enabled === false) {
                continue;
            }
            try {
                let dataContext = this.getDataContext([{ obj: error, key: "error" }]);
                (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)(`Evaluating rule [${trap.rule}] on error ${error} with dataContext:`, dataContext);
                let ruleResult = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.evaluteRule)(trap.rule, dataContext);
                if (ruleResult) {
                    errorTrapped = true;
                    error.linkedTrappedError = trap;
                    break;
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    getDataContext(additional) {
        const browser = (0,detect_browser__WEBPACK_IMPORTED_MODULE_13__.detect)();
        let dataContext = {
            thisComponentName: this.thisComponentName,
            user: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS($ui.pageContext?.user),
            pageContext: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS($ui.pageContext),
            aspectData: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this.baseModel),
            configuration: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._options),
            browser: browser,
        };
        let additionalData = additional || [];
        for (let i = 0; i < additionalData.length; i++) {
            let item = additionalData[i];
            dataContext[item.key] = item.obj;
        }
        return dataContext;
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
    onSave(model) {
        this.fireEvent("onSave", model);
        let dataToSave = this._data;
        this.log("Saving, model passed in we need to persist to", "green", dataToSave);
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to save data to set - this method should be overriden", "red");
            return;
        }
        let dataToPersist = this._data;
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
        this.l("Data saved", model);
    }
    /**
     * Gets the data to load, defaults to LocationToSaveOrLoadData unless a fieldPath is passed in
     * @param fieldPath
     * @returns
     */
    async getData(fieldPath) {
        if (this._data) {
            return this._data;
        }
        fieldPath = fieldPath || this.LocationToSaveOrLoadData;
        //This section is d=use due to typing issue that needs to be resolved.
        // let useParents = gvko(this._options.dataSettings().getValueUsingParents) as boolean | undefined
        // let shareDoId= gvko(this.sharedoId)
        // let maxDepth = gvko(this._options.dataSettings().maxDepth) as number | undefined
        // let LocationToSaveOrLoadData = gvko(this.LocationToSaveOrLoadData) as string | undefined
        //end area of typing issue
        let useParents = this._options?.dataSettings().getValueUsingParents();
        let shareDoId = this.sharedoId();
        let maxDepth = this._options?.dataSettings().maxDepth();
        // let LocationToSaveOrLoadData = gvko(this.LocationToSaveOrLoadData);
        if (fieldPath === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }
        this._data = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.getNestedProperty)(this.model, fieldPath);
        if (this._data !== undefined) {
            this.l("Data found at location", this._data);
            this._data = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._data);
            return this._data;
        }
        //if data ot found in the current model, look via the search
        if (this._data === undefined && useParents === false && shareDoId) {
            //! TODO Fix Typings
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_5__.searchForAttributeRecursive)(shareDoId, fieldPath, false).then((data) => {
                if (data.found) {
                    this._data = data.value;
                }
                return this._data;
            });
        }
        if (this._data === undefined && useParents === true) {
            //! TODO Fix Typings
            let idToUser = this.sharedoId() || this.parentSharedoId();
            if (!idToUser) {
                this.log("No id to use for search both sharedoId and parentSharedoId are undefined");
                return this._data;
            }
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_5__.searchForAttributeRecursive)(idToUser, fieldPath, useParents, maxDepth).then((data) => {
                if (data.found) {
                    this._data = data.value;
                }
                return this._data;
            });
        }
    }
    searchForAttributeRecursive(id, attribute, useParents, maxDepth) {
        return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_5__.searchForAttributeRecursive)(id, attribute, useParents, maxDepth);
    }
    async searchByGraph(fieldPath, useParent = false) {
        let inputOption = _Interfaces_api_graph_IGraphQuery__WEBPACK_IMPORTED_MODULE_8__.IGraphQueryDfaults;
        let shareDoId = this.sharedoId();
        let parentId = this.parentSharedoId();
        let query = {
            path: fieldPath,
        };
        inputOption.fields.push(query);
        if (useParent === false && shareDoId) {
            //! TODO Fix Typings
            inputOption.entityId = shareDoId;
        }
        else if (useParent === true && parentId) {
            //! TODO Fix Typings
            inputOption.entityId = parentId;
        }
        if (!inputOption.entityId) {
            this.log("No id to use for search both sharedoId and parentSharedoId are undefined");
            return;
        }
        let result = await (0,_Common_api_executeFindByGraph_executeFindByGraph__WEBPACK_IMPORTED_MODULE_9__.executeFindByGraph)(inputOption);
        if (result.info.success === false) {
            this.log("Error executing search", "red", result.info);
            return;
        }
        return result.data?.data[fieldPath];
    }
    setData(value) {
        let valueToPersist = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(value);
        let previousValue = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._data);
        this._data = valueToPersist;
        this.fireValueChangedEvent("onDataBeforeChanged", {
            previousValue: previousValue,
            newValue: valueToPersist,
        });
        if (this.LocationToSaveOrLoadData === undefined) {
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
        (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.setNestedProperty)(this.model, this.LocationToSaveOrLoadData, this._data);
        this.fireEvent("onDataChanged", this.model);
    }
    onDestroy(model) {
        this.log("IDEAspects.Example : onDestroy");
        this.fireEvent("onDestroy", model);
        $ui.util.dispose(this.disposables);
    }
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
    debugSettings() {
        let debugSetting = (0,_DefaultSettings__WEBPACK_IMPORTED_MODULE_6__.DEBUG_DEFAULT)();
        if (this._options?.debug()) {
            debugSetting = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._options?.debug());
        }
        return debugSetting;
    }
    /**
     * Provides logging for the component based on the debug configuration
     * @param message
     * @param color
     * @param data
     */
    log(message, color, data) {
        if (this.debugSettings().enabled) {
            if (this.debugSettings().logToConsole) {
                if (!color)
                    color = "black";
                // let lineNo = extractLineNumberFromStack((new Error()).stack);
                console.log(`%c ${this.thisComponentName} - ${message}`, `color:${color}`, data);
            }
        }
    }
    canLog() {
        return this.debugSettings().enabled;
    }
    logToConsole() {
        return this.canLog() && this.debugSettings().logToConsole;
    }
    logToAspect() {
        return this.canLog() && this.debugSettings().showInAspect;
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
            data: data,
        };
        (0,_Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__.fireEvent)(event);
    }
    fireValueChangedEvent(eventName, changedData) {
        let event = {
            eventPath: this.thisComponentName + "." + eventName,
            eventName: eventName,
            source: this,
            data: changedData,
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
        if (!this.blade) {
            //TODO: if no blade where is form builder data
            return undefined;
        }
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
        model.aspectData.formBuilder = model.aspectData.formBuilder || {
            formData: {},
        };
        return model.aspectData.formBuilder.formData;
    }
    formbuilderField(formbuilderField, setValue) {
        if (!this.formbuilder()) {
            this.log("Form builder does not exist! ", "red");
            throw new Error("Form builder does not exist!");
        }
        let formBuilder = this.formbuilder();
        if (!formBuilder) {
            return;
        }
        let foundValue = formBuilder[formbuilderField];
        if (!foundValue) {
            this.log(`Form builder does not contain field ${formbuilderField} `, "orange");
            this.log(`Creating field ${formbuilderField} `, "blue");
            formBuilder[formbuilderField] = undefined;
        }
        //Are we doing a set
        if (setValue) {
            this.log(`Setting ${formbuilderField} to ${setValue}`, "green");
            formBuilder[formbuilderField] = setValue;
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

/***/ "./src/WebBased/IDEAspects/BaseClasses/DefaultSettings.ts":
/*!****************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/DefaultSettings.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_DEFAULT: () => (/* binding */ DEBUG_DEFAULT),
/* harmony export */   DEFAULT_CONFIGURATION_SETTINGS: () => (/* binding */ DEFAULT_CONFIGURATION_SETTINGS),
/* harmony export */   DEFAULT_ERROR_MANAGEMENT_SETTINGS: () => (/* binding */ DEFAULT_ERROR_MANAGEMENT_SETTINGS),
/* harmony export */   DEFAULT_ERROR_MANAGEMENT_TRAPS: () => (/* binding */ DEFAULT_ERROR_MANAGEMENT_TRAPS),
/* harmony export */   DEFAULT_SHAREDO_COMMAND: () => (/* binding */ DEFAULT_SHAREDO_COMMAND),
/* harmony export */   DEFAULT_SUPPORT_BUTTON: () => (/* binding */ DEFAULT_SUPPORT_BUTTON),
/* harmony export */   REFRESH_ON_DEFAULTS: () => (/* binding */ REFRESH_ON_DEFAULTS)
/* harmony export */ });
const DEBUG_DEFAULT = () => {
    //! this is a function for debug purpose only
    let retValue = {
        enabled: true,
        logToConsole: true,
        showInAspect: false,
        liveConfig: false,
    };
    return retValue;
};
const DEFAULT_SHAREDO_COMMAND = {
    typeSystemName: "task",
    title: "Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle}",
    description: undefined
};
const DEFAULT_SUPPORT_BUTTON = {
    raiseSupportTicket: true,
    supportTicketMessage: "Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle} context ${JSON.stringify(dataContext)}",
    raiseSupportTicketSharedoCommand: DEFAULT_SHAREDO_COMMAND,
    dataContext: "Populated by the system",
    title: "Raise Support Ticket",
    styleRules: undefined,
    classRules: undefined,
    toolTip: "Raise a support ticket with the support desk",
    enabled: false
};
const REFRESH_ON_DEFAULTS = {
    sharedoIdChanged: false,
    sharedoParentIdChanged: false,
    sharedoPhaseChanged: false,
};
const DEFAULT_ERROR_MANAGEMENT_TRAPS = [
    {
        dataContext: null,
        enabled: true,
        rule: "dataContext.error.message.toLowerCase().includes('forbidden')",
        userFreindlyMessage: "The matter is not accessible to you. It may be behind a Information Barrier.",
        resolutionSuggestions: ["Please contact the matter owner for access."],
        userFreindlyHTMLMessageTemplate: undefined,
        supportButton: DEFAULT_SUPPORT_BUTTON,
        styleRules: [
            {
                rule: "true",
                style: "box-shadow: 1px 1px 10px #d46060;",
            },
        ],
        classRules: [
            {
                rule: "true",
                cssClass: "ems-selected-item",
            },
            {
                rule: "true",
                cssClass: "ems-show",
            },
        ],
    },
];
//classRules: ems-selected-item ems-show' style='box-shadow: 1px 1px 10px #d46060;',
//
//"Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle}"
const DEFAULT_ERROR_MANAGEMENT_SETTINGS = {
    errorTraps: DEFAULT_ERROR_MANAGEMENT_TRAPS,
    enabled: true,
    displayUnTrappedErrorInAspect: true,
    unTrappedErrorsSupportButton: undefined,
};
const DEFAULT_CONFIGURATION_SETTINGS = {
    debug: DEBUG_DEFAULT(),
    refreshOn: REFRESH_ON_DEFAULTS,
    eventsToReactTo: [
        {
            eventPath: "sharedo.updated",
            methodToCall: "refresh",
        },
        {
            eventPath: "sharedo.core.case.sharedo-updated",
            methodToCall: "refresh",
        },
    ],
    dataSettings: {
        getValueUsingParents: false,
        maxDepth: 0,
    },
    errorManagement: DEFAULT_ERROR_MANAGEMENT_SETTINGS,
};


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
                    // existing[key]=ensureIsObservableArray(existing, key)
                    existing[key](value.map(item => toObservableObject(item, {})));
                }
            }
            else if (value !== null && typeof value === 'object') {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(toObservableObject(value, {}));
                }
                else {
                    // existing[key]  = ensureIsObservable(existing, key);
                    existing[key](toObservableObject(value, existing[key]()));
                }
            }
            else {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(value);
                }
                else {
                    // existing[key] = ensureIsObservable(existing, key);
                    existing[key](value);
                }
            }
        }
    }
    return existing;
}
function ensureIsObservable(existing, key) {
    if (knockout__WEBPACK_IMPORTED_MODULE_0__.isObservable(existing[key])) {
        return existing[key];
    }
    else {
        return knockout__WEBPACK_IMPORTED_MODULE_0__.observable();
    }
}
function ensureIsObservableArray(existing, key) {
    if (knockout__WEBPACK_IMPORTED_MODULE_0__.isObservableArray(existing[key])) {
        return existing[key];
    }
    else {
        return knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray();
    }
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

/***/ "./src/WebBased/IDEAspects/BaseClasses/Template/TemplateApplicator.ts":
/*!****************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/Template/TemplateApplicator.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplateApplicator: () => (/* binding */ TemplateApplicator)
/* harmony export */ });
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Common/Log */ "./src/Common/Log.ts");
/* harmony import */ var _helpers_VakueExtractor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../helpers/VakueExtractor */ "./src/helpers/VakueExtractor.ts");
/* harmony import */ var _helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../helpers/evaluteRule */ "./src/helpers/evaluteRule.ts");



class TemplateApplicator {
    constructor() {
    }
    setupElement(element, valueAccessor, allBindings, viewModel, bindingContext) {
        let instruction = allBindings().matterSearchBinding;
        if (!instruction) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)("No instruction defined"));
            return;
        }
        if (instruction.type == "IFieldPlacement") {
            let rowField = instruction.object;
            this.buildPlacements(rowField, "dataContextName", viewModel, element);
        }
    }
    updateElement(element, valueAccessor, allBindings, viewModel, bindingContext) {
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)("updateElement", element, valueAccessor, allBindings, viewModel, bindingContext);
    }
    buildPlacements(placement, dataContextName, viewModel, container) {
        let rowCounter = 0;
        const rootDiv = document.createElement('div');
        container.appendChild(rootDiv);
        if (placement.container) {
            container.classList.add('ems-container');
            let containerParent = container.parentElement;
            if (containerParent) {
                containerParent.classList.add('ems-container-parent');
                this.addCSS(placement.container.cssClass, containerParent, dataContextName, viewModel);
                this.addStyle(placement.container.style, containerParent, dataContextName, viewModel);
            }
        }
        // rootDiv.classList.add('flex-row');
        rootDiv.classList.add('ems-placement-item');
        rootDiv.id = 'resultItem';
        this.addCSS(placement.cssClass, rootDiv, dataContextName, viewModel);
        this.addStyle(placement.style, rootDiv, dataContextName, viewModel);
        if (placement.icon) {
            this.addIcons(placement.icon, dataContextName, rootDiv, viewModel);
        }
        const divRowContainer = document.createElement('div');
        divRowContainer.classList.add('ems-row-container');
        rootDiv.appendChild(divRowContainer);
        placement.rows?.forEach(row => {
            rowCounter++;
            const rowDiv = document.createElement('div');
            rowDiv.style.alignItems = row.alignItems || 'space-between';
            rowDiv.classList.add('ems-row' + rowCounter);
            rowDiv.classList.add('ems-row');
            this.addCSS(row.cssClass, rowDiv, dataContextName, viewModel);
            this.addStyle(row.style, rowDiv, dataContextName, viewModel);
            row.fields?.forEach(field => {
                this.addField(field, dataContextName, rowDiv, viewModel);
            });
            divRowContainer.appendChild(rowDiv);
        });
    }
    addField(field, dataContextName, rowDiv, viewModel) {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('ems-row-group');
        this.addCSS(field.cssClass, fieldDiv, dataContextName, viewModel);
        if (field.width)
            fieldDiv.style.width = `${field.width}px`;
        if (field.position)
            fieldDiv.style.textAlign = field.position;
        this.addStyle(field.style, fieldDiv, dataContextName, viewModel);
        if (field.label) {
            const labelElem = document.createElement('label');
            labelElem.textContent = field.label;
            labelElem.classList.add('ems-label');
            fieldDiv.appendChild(labelElem);
        }
        this.addIcons(field.icon, dataContextName, fieldDiv, viewModel); //TODO
        const spanElem = document.createElement('span');
        // addCustomBinding(spanElem, field,"IFieldRowField");
        // else {
        //   spanElem.setAttribute('data-bind', `text:${dataContextName}.${field.field}`);
        // }
        spanElem.classList.add('ems-field-value');
        if (field.field instanceof Array) {
            this.addFieldArray(field.field, field.formatter, spanElem, viewModel);
        }
        if (typeof field.field === "string") {
            this.setInnerHTML(field.field, field.formatter, viewModel, spanElem);
        }
        fieldDiv.appendChild(spanElem);
        rowDiv.appendChild(fieldDiv);
    }
    setInnerHTML(value, formatter, viewModel, element) {
        let valueToSet = (0,_helpers_VakueExtractor__WEBPACK_IMPORTED_MODULE_1__.extractValue)(value, viewModel, formatter);
        element.innerHTML = valueToSet;
    }
    addIcons(icons, dataContextName, fieldDiv, viewModel) {
        if (!icons)
            return;
        if (typeof icons === "string") {
            icons = [{ icon: icons }];
        }
        icons.forEach(iconRule => {
            // <div class="column-auto" style="margin-right:5px">
            // <span class="fa card-icon" data-bind="css:icon"></span>
            // </div>
            const iconElem = document.createElement('span');
            iconElem.className = 'fa card-icon ' + iconRule.icon;
            iconElem.classList.add('ems-icon');
            if (iconRule.cssClass)
                iconElem.classList.add(iconRule.cssClass);
            if (typeof iconRule.style === "string")
                iconElem.setAttribute('style', iconRule.style);
            if (iconRule.rule) {
                console.log("iconRule.rule", iconRule.rule);
                // let fullRulePath = `${iconRule.rule}`
                // if (dataContextName) {
                //   fullRulePath = `${dataContextName}.${iconRule.rule}`;
                // }
                // iconElem.setAttribute('data-bind', `visible:$root.evalFunc("${fullRulePath}",${dataContextName}, "${dataContextName}")`);
                let value = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(iconRule.rule, viewModel);
                if (!value) {
                    iconElem.style.display = "none";
                }
            }
            if (iconRule.position === 'before') {
                fieldDiv.insertBefore(iconElem, fieldDiv.firstChild);
            }
            if (iconRule.position === 'after') {
                fieldDiv.appendChild(iconElem);
            }
            if (!iconRule.position) {
                fieldDiv.appendChild(iconElem);
            }
        });
    }
    addCSS(cssClass, rootDiv, dataContextName, viewModel) {
        if (typeof cssClass === "string") {
            cssClass = [{ cssClass: cssClass }];
        }
        if (cssClass instanceof Array) {
            let arrItem = cssClass;
            for (let i = 0; i < arrItem.length; i++) {
                let cssRule = arrItem[i];
                let cssValue = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.executeEmbeddedCode)(cssRule.cssClass, viewModel);
                if (cssRule.rule) {
                    let currentDataBind = rootDiv.getAttribute('data-bind') || '';
                    if (currentDataBind) {
                        currentDataBind += ',';
                    }
                    //rootDiv.setAttribute('data-bind', `${currentDataBind} css: { ${cssRule.cssClass} : $root.evalFunc("${dataContextName}.${cssRule.rule}",${dataContextName}, "${dataContextName}") }`);
                    let rule = cssRule.rule;
                    let value = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(rule, viewModel);
                    if (value) {
                        rootDiv.classList.add(cssValue);
                    }
                }
                else {
                    rootDiv.classList.add(cssValue);
                }
            }
        }
    }
    addFieldArray(fields, formatter, fieldDiv, viewModel) {
        if (!fields)
            return;
        fields.forEach(field => {
            if (field.rule) {
                console.log("fieldRule.rule", field.rule);
                let value = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(field.rule, viewModel);
                if (value) {
                    this.setInnerHTML(field.field, formatter, viewModel, fieldDiv);
                    // fieldDiv.innerHTML = fieldValue;
                }
            }
            else {
                this.setInnerHTML(field.field, formatter, viewModel, fieldDiv);
            }
        });
    }
    addStyle(style, rootDiv, dataContextName, viewModel) {
        if (style == undefined)
            return;
        if (typeof style === "string") {
            style = [{ style: style }];
        }
        // if(!Array.isArray(style))
        // {
        //   style = [style];
        // }
        if (style instanceof Array) {
            let arrItem = style;
            for (let i = 0; i < arrItem.length; i++) {
                let styleRule = arrItem[i].rule;
                if (styleRule) {
                    let currentDataBind = rootDiv.getAttribute('data-bind') || '';
                    if (currentDataBind) {
                        currentDataBind += ',';
                    }
                    //rootDiv.setAttribute('data-bind', `${currentDataBind} css: { ${cssRule.cssClass} : $root.evalFunc("${dataContextName}.${cssRule.rule}",${dataContextName}, "${dataContextName}") }`);
                    let value = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(styleRule, viewModel);
                    if (value) {
                        this.setStyles(style, viewModel, dataContextName, rootDiv);
                    }
                }
                else {
                    this.setStyles(style, viewModel, dataContextName, rootDiv);
                }
            }
        }
        else {
            this.setStyles(style, viewModel, dataContextName, rootDiv);
        }
    }
    setStyles(style, data, dataContextName, rootDiv) {
        let retValue = {};
        if (!style) {
            return "";
        }
        ;
        if (typeof style === "string") {
            let n = {
                style: style
            };
            return this.buildStyleNameValue(n, retValue);
        }
        if (Array.isArray(style)) {
            let arrItem = style;
            if (Array.isArray(arrItem)) {
                for (let i = 0; i < arrItem.length; i++) {
                    let styleRuleOrNameValue = arrItem[i];
                    if (styleRuleOrNameValue.rule) {
                        if ((0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(styleRuleOrNameValue.rule, data)) {
                            if (!styleRuleOrNameValue.style)
                                continue;
                            retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
                        }
                    }
                    else {
                        retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
                    }
                }
            }
            for (let i = 0; i < arrItem.length; i++) {
                let styleRuleOrNameValue = arrItem[i];
                if (styleRuleOrNameValue.rule) {
                    if ((0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(styleRuleOrNameValue.rule, data)) {
                        if (!styleRuleOrNameValue.style)
                            continue;
                        retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
                    }
                }
                else {
                    retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
                }
            }
        }
        else {
            if (typeof style === "object") { //must be a NameValue
                retValue = style;
            }
        }
        //loop through the retValue and add styles to element
        for (let key in retValue) {
            if (retValue.hasOwnProperty(key)) {
                rootDiv.style[key] = retValue[key];
            }
        }
    }
    buildStyleNameValue(rule, retValue) {
        if (typeof rule.style === "object") {
            retValue = { ...retValue, ...rule.style };
        }
        if (typeof rule.style === "string") {
            let styleItems = rule.style.split(";");
            for (let i = 0; i < styleItems.length; i++) {
                let styleItem = styleItems[i];
                let nameValue = styleItem.split(":");
                if (nameValue.length == 2) {
                    retValue[nameValue[0].trim()] = nameValue[1].trim();
                }
            }
        }
        return retValue;
    }
}


/***/ }),

/***/ "./src/WebBased/IDEAspects/DatePickerAspect/DatePickerAspectConfiguration.ts":
/*!***********************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/DatePickerAspect/DatePickerAspectConfiguration.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DATE_PICKER_DEFAULTS: () => (/* binding */ DATE_PICKER_DEFAULTS),
/* harmony export */   DATE_PICKER_WIDGET_DEFAULTS: () => (/* binding */ DATE_PICKER_WIDGET_DEFAULTS)
/* harmony export */ });
/* harmony import */ var _BaseClasses_DefaultSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseClasses/DefaultSettings */ "./src/WebBased/IDEAspects/BaseClasses/DefaultSettings.ts");

const DATE_PICKER_DEFAULTS = {
    "formBuilderField": "eDiscoveryUpdatePlannedDate",
    "getValueOptions": [
        {
            "rule": "!dataContext.aspectData.formBuilder.formData.eDiscoveryUpdatePlannedDate",
            "fieldPath": "form-alt-ediscovery-job-desired-completion-date-date-only.job-desired-completion-date",
        }
    ],
    "hideInputBox": true,
    "defaultValue": {
        "defaultDateFromNowHours": 24,
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
    "debug": (0,_BaseClasses_DefaultSettings__WEBPACK_IMPORTED_MODULE_0__.DEBUG_DEFAULT)(),
    "refreshOn": {
        "sharedoIdChanged": false,
        "sharedoParentIdChanged": false,
        "sharedoPhaseChanged": false,
    },
    "eventsToReactTo": [],
    "dataSettings": {
        "getValueUsingParents": false,
        "maxDepth": 0,
    },
    "errorManagement": _BaseClasses_DefaultSettings__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_ERROR_MANAGEMENT_SETTINGS
};
const DATE_PICKER_WIDGET_DEFAULTS = {
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
        "defaultConfigurationJson": { configuration: DATE_PICKER_DEFAULTS }
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

/***/ "./src/helpers/Formatter.ts":
/*!**********************************!*\
  !*** ./src/helpers/Formatter.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatFunc: () => (/* binding */ formatFunc),
/* harmony export */   formatValue: () => (/* binding */ formatValue)
/* harmony export */ });
/**
 * * Format a value using a formatter string
 * * Examples:
 * * 1. value
 * * 2. value.toUpperCase()
 * * 3. value ? value.toUpperCase() : ""
 * * 4. value ? value.toUpperCase() : "No Value"
 * * 5. new Date(value).toLocaleDateString()
 * * 6. value ? new Date(value).toLocaleDateString() : ""
 * @param value
 * @param formatter
 * @returns
 */
function formatValue(value, formatter) {
    // Create a new function based on the formatter
    let dynamicFunc;
    let returnValue;
    try {
        dynamicFunc = new Function('value', `return (${formatter});`);
        // Invoke the function with the given value
        returnValue = dynamicFunc(value);
    }
    catch (e) {
        returnValue = `Error formatting value ${value} with formatter ${formatter} - ${e}`;
    }
    return returnValue;
}
const formatFunc = formatValue; // For backwards compatibility


/***/ }),

/***/ "./src/helpers/VakueExtractor.ts":
/*!***************************************!*\
  !*** ./src/helpers/VakueExtractor.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractValue: () => (/* binding */ extractValue)
/* harmony export */ });
/* harmony import */ var _evaluteRule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./evaluteRule */ "./src/helpers/evaluteRule.ts");
/* harmony import */ var _Formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Formatter */ "./src/helpers/Formatter.ts");


/**
 * This function will extract the value from the value string.
 * The value string can be a simple string, or a function call.
 * @param value The value to extract or calculated value
 * @param viewModel The view model to use for the function call and data context
 * @param formatter A formatter to use on the value e.g. value.ToUpper()
 * @returns
 */
function extractValue(value, viewModel, formatter, dataContextName) {
    let valueToSet = (0,_evaluteRule__WEBPACK_IMPORTED_MODULE_0__.executeEmbeddedCode)(value, viewModel, dataContextName);
    if (typeof valueToSet !== "string") {
        valueToSet = JSON.stringify(valueToSet, null, 2);
    }
    if (formatter) {
        valueToSet = (0,_Formatter__WEBPACK_IMPORTED_MODULE_1__.formatFunc)(valueToSet, formatter);
    }
    return valueToSet;
}


/***/ }),

/***/ "./src/helpers/evaluteRule.ts":
/*!************************************!*\
  !*** ./src/helpers/evaluteRule.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkAndLogUndefined: () => (/* binding */ checkAndLogUndefined),
/* harmony export */   evaluteRule: () => (/* binding */ evaluteRule),
/* harmony export */   executeEmbeddedCode: () => (/* binding */ executeEmbeddedCode),
/* harmony export */   executeFunc: () => (/* binding */ executeFunc)
/* harmony export */ });
/* harmony import */ var _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common/JsonToHTMLConverter */ "./src/Common/JsonToHTMLConverter.ts");
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Log */ "./src/Common/Log.ts");
/* harmony import */ var _Common_Base64Encoding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/Base64Encoding */ "./src/Common/Base64Encoding.ts");



function evaluteRule(rule, dataContext, dataContextName) {
    if (!rule) {
        return false;
    }
    try {
        const returnValue = executeFunc(rule, dataContext, dataContextName);
        if (typeof returnValue === 'boolean') {
            return returnValue;
        }
        else {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.err)((`Rule [${rule}] did not return a boolean value. It returned: ${returnValue}`)));
            return false; // Default value if the rule doesn't return a boolean
        }
    }
    catch (e) {
        console.log(`Error evaluating rule [${rule}] with data context`, e);
        return false; // Default value in case of an error
    }
}
function executeFunc(expression, dataContext, dataContextName) {
    // Create a new function based on the formatter
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.inf)(`evaluteRule(${expression})`), dataContext);
    if (expression === "") {
        return "";
    }
    if (!expression) {
        return undefined;
    }
    let dynamicFunc;
    try {
        let dataContextNameToUse = 'dataContext';
        //replace the dataContextName with the dataContextNameToUse
        // Replace the dataContextName with the dataContextNameToUse
        if (dataContextName) {
            // Escape special characters in the string for use in regular expressions
            const escapedDataContextName = dataContextName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedDataContextName, 'g');
            expression = expression.replace(regex, dataContextNameToUse);
        }
        checkAndLogUndefined(dataContext, expression, dataContextNameToUse);
        dynamicFunc = new Function(`${dataContextNameToUse}`, `return (${expression});`);
    }
    catch (e) {
        let errMessage = `Error creating function for expression [${expression}]`;
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.err)(errMessage), e);
        return errMessage;
    }
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.inf)(`evaluteRule(${expression}) - dynamicFunc: `), dynamicFunc);
    try {
        const returnValue = dynamicFunc(dataContext);
        return returnValue;
    }
    catch (e) {
        console.log(`Error evaluating rule [${expression}] with data context`, e);
        return `${e}`; // Default value in case of an error
    }
}
function checkAndLogUndefined(obj, rule, dataContextName) {
    const props = rule.split('.');
    let current = {};
    current[dataContextName] = obj;
    for (let i = 0; i < props.length; i++) {
        if (current[props[i]] === undefined) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.err)(`Error while evaluating a rule ${rule}! The property ${dataContextName}.${props.slice(0, i + 1).join('.')} is undefined.`));
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.err)(`Check the configuration of the rule ${rule}!`));
            return undefined;
        }
        current = current[props[i]];
    }
    return current;
}
/**
 * Example: "title: ${title.toUpperCase()} Matter Search ${2 + 2}"
 * Resurn: "title: TITLE MATTER SEARCH 4"
 * @param input
 * @param dataContext
 * @param dataContextName
 * @returns
 */
function executeEmbeddedCode(input, dataContext, dataContextName) {
    if (!input) {
        return "";
    }
    return input.replace(/\$\{(.+?)\}/g, (_, code) => {
        try {
            // WARNING: Eval can execute arbitrary code and is unsafe
            // Only use with trusted input
            dataContext["helpers"] = dataContext["helpers"] || {};
            dataContext["helpers"].utf8ToBase64 = _Common_Base64Encoding__WEBPACK_IMPORTED_MODULE_2__.utf8ToBase64;
            let val = executeFunc(code, dataContext, dataContextName);
            if (val === undefined) {
                val = '';
            }
            // val = JSON.stringify(val, undefined, 2);
            val = _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_0__.JsonToHtmlConverter.convert(val);
            //remove outter " from val
            // val = val.substring(1, val.length - 1);
            return val;
        }
        catch (error) {
            console.error('Failed to execute embedded code:', error);
            let val = '';
            if (error.message) {
                val = error.message;
            }
            else {
                val = JSON.stringify(error);
            }
            return JSON.stringify(val);
        }
    });
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
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/evaluteRule */ "./src/helpers/evaluteRule.ts");

//https://getdatepicker.com/6/options/display.html




let thisWidgetSystemName = "DatePickerAspect";
// "fieldPath": "form-alt-ediscovery-job-desired-completion-date-date-only.job-desired-completion-date",
// "title": "Desired Date",
//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css
class DatePickerAspect extends _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__.BaseIDEAspect {
    liveConfigurationRefreshed() {
        this.loadAndBind();
    }
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
        return _DatePickerAspectConfiguration__WEBPACK_IMPORTED_MODULE_1__.DATE_PICKER_WIDGET_DEFAULTS;
    }
    setDefaults() {
        return _DatePickerAspectConfiguration__WEBPACK_IMPORTED_MODULE_1__.DATE_PICKER_DEFAULTS;
    }
    //Abstract methods - must be implemented by the derived class
    setLocationOfDataToLoadAndSave() {
        if (!this.sharedoConfiguration.configuration.formBuilderField) {
            this.err("No formbuilder field set in configuration - check aspect configuration");
            throw new Error("No formbuilder field set in configuration - check aspect configuration");
        }
        let formBuilderField = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_4__.executeEmbeddedCode)(this.sharedoConfiguration.configuration.formBuilderField, this.getDataContext());
        return (0,_BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__.getFormBuilderFieldPath)(formBuilderField);
    }
    getDataContext() {
        let dataContext = knockout__WEBPACK_IMPORTED_MODULE_3___default().toJS(this.model);
        let formBuilderData = this.formbuilder();
        dataContext["formBuilder"] = formBuilderData; //to make it easier to access the formbuilder data
        return dataContext;
    }
    async getValueToPopulate() {
        let dataContext = this.getDataContext();
        let retValue = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_4__.executeEmbeddedCode)(this.configuration?.formBuilderField, dataContext) || "";
        if (retValue) {
            retValue = await this.getData();
            if (retValue) {
                retValue = JSON.stringify(retValue, null, 2);
            }
        }
        if (this.configuration?.getValueOptions) {
            if (typeof this.configuration?.getValueOptions === "string") {
                retValue = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_4__.executeEmbeddedCode)(this.configuration?.getValueOptions, dataContext);
            }
            if (Array.isArray(this.configuration?.getValueOptions)) {
                // this.configuration.getValueOptions.forEach((option) => {
                for (let i = 0; i < this.configuration.getValueOptions.length; i++) {
                    let option = this.configuration.getValueOptions[i];
                    let value = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_4__.evaluteRule)(option.rule, dataContext);
                    if (value) {
                        retValue = await this.searchByGraph(option.fieldPath, true);
                        break; //we stop as soon as we have a true rule
                    }
                }
                ;
            }
        }
        return retValue;
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
        let foundValue = await this.getValueToPopulate();
        //  let foundValue = await this.getData(fieldPath);
        if (!foundValue) {
            retValue = this.generateDefaultDate();
        }
        else {
            retValue = this.ensureDate(foundValue);
        }
        this.setModelDataAsDate(retValue); //set the value to ensure it is valid
        return retValue;
    }
    /**
     * @returns get today date + defaultDateFromNowHours (if set in configuration)
     */
    generateDefaultDate() {
        let defaultDate = new _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime(_eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.DateTime.now());
        let defaultDateFromNowHours = this.options?.defaultValue().defaultDateFromNowHours();
        if (defaultDateFromNowHours) {
            defaultDate.setHours(defaultDate.getHours() + defaultDateFromNowHours);
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
        }
        if (this.dateTimePicker) {
            this.dateTimePicker.dispose();
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
        if (this.options?.hideInputBox()) {
            input.classList.add("hidden");
        }
        this.options?.hideInputBox.subscribe((newValue) => {
            if (newValue) {
                input.classList.add("hidden");
            }
            else {
                input.classList.remove("hidden");
            }
        });
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
        let datePickerOption = knockout__WEBPACK_IMPORTED_MODULE_3___default().toJS(this.options?.datePickerOptions());
        try {
            this.dateTimePicker = new _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.TempusDominus(this.datePickerDiv, datePickerOption);
            // this.options?.datePickerOptions.subscribe((newValue) => { ///! causing recurring
            //     this.loadAndBind();
            // });
            this.setPickerEnabledState(this.options?.pickerEnabled());
            //Set the value of the picker to the value in the model
            let dateToSet = await this.getModelDataAsDate();
            this.dateTimePicker.dates.setValue(dateToSet, this.dateTimePicker.dates.lastPickedIndex);
            this.dateTimePicker.subscribe("change.td", (e) => {
                this.log("Date Changed", "red", e);
                this.options?.eventToFireOnUpdate()?.forEach((event) => {
                    $ui.events.broadcast(event, {
                        source: this,
                        formbuilderField: this.options?.formBuilderField(),
                        value: this.getCurrentSelectedDate()
                    }); //fire event and pass in the date
                });
                this.setModelDataAsDate(this.getCurrentSelectedDate());
            });
        }
        catch (e) {
            this.log("Error parsing date picker options", "red", e);
            //create error div
            let errorDiv = document.createElement("div");
            errorDiv.classList.add("alert");
            errorDiv.classList.add("alert-danger");
            errorDiv.classList.add("alert-dismissible");
            errorDiv.classList.add("fade");
            errorDiv.classList.add("show");
            errorDiv.setAttribute("role", "alert");
            errorDiv.innerHTML = `<strong>Error parsing date picker options</strong> - check aspect configuration <br> ${e}`;
            this.datePickerDiv.appendChild(errorDiv);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG1CQUFtQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMkNBQTJDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdDQUFnQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQWdEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MseUJBQXlCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxnQkFBZ0I7QUFDekU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMkJBQTJCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQkFBa0I7QUFDM0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMkJBQTJCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQkFBa0I7QUFDM0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsb0JBQW9CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHlDQUF5QztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsc0NBQXNDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE1BQU07QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1Q0FBdUM7QUFDekU7QUFDQTtBQUNBLDZCQUE2QixVQUFVO0FBQ3ZDLDZCQUE2QixVQUFVO0FBQ3ZDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCw2QkFBNkI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZSxRQUFRLGdOQUF3QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw2QkFBNkIsYUFBYSw2QkFBNkIsTUFBTSw2QkFBNkIsYUFBYSw2QkFBNkI7QUFDdEw7QUFDQTtBQUNBLHFEQUFxRCx5QkFBeUI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsNkJBQTZCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsNkJBQTZCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDZCQUE2QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxrQkFBa0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsNEJBQTRCLEtBQUssNEJBQTRCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHVCQUF1QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsZUFBZTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZUFBZTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QVU7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUN2RCxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvQGVvbmFzZGFuL3RlbXB1cy1kb21pbnVzL2Rpc3QvanMvdGVtcHVzLWRvbWludXMuZXNtLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvZGV0ZWN0LWJyb3dzZXIvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9Db21tb24vQmFzZTY0RW5jb2RpbmcudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9Db21tb24vRGVib3VuZC50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0NvbW1vbi9Kc29uVG9IVE1MQ29udmVydGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvQ29tbW9uL0xvZy50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0NvbW1vbi9TdGFja0hlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0ludGVyZmFjZXMvYXBpL2dyYXBoL0lHcmFwaFF1ZXJ5LnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL0V2ZW50c0hlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9PYmplY3RIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL2FwaS50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvZXhlY3V0ZUZpbmRCeUdyYXBoL2V4ZWN1dGVGaW5kQnlHcmFwaC50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvZXhlY3V0ZUZpbmRCeVF1ZXJ5L0ZpbmRCeVF1ZXJ5LnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9zZWFyY2hGb3JBdHRyaWJ1dGVXaXRoUGFyZW50cy50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvQmFzZUlERUFzcGVjdC50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvRGVmYXVsdFNldHRpbmdzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9LT0NvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvVGVtcGxhdGUvVGVtcGxhdGVBcHBsaWNhdG9yLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9EYXRlUGlja2VyQXNwZWN0L0RhdGVQaWNrZXJBc3BlY3RDb25maWd1cmF0aW9uLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvaGVscGVycy9Gb3JtYXR0ZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9oZWxwZXJzL1Zha3VlRXh0cmFjdG9yLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvaGVscGVycy9ldmFsdXRlUnVsZS50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3ZlbmRvci9hbnNpLXN0eWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3Ivc3VwcG9ydHMtY29sb3IvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9EYXRlUGlja2VyQXNwZWN0L0RhdGVQaWNrZXJBc3BlY3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gICogVGVtcHVzIERvbWludXMgdjYuNy4xMyAoaHR0cHM6Ly9nZXRkYXRlcGlja2VyLmNvbS8pXG4gICogQ29weXJpZ2h0IDIwMTMtMjAyMyBKb25hdGhhbiBQZXRlcnNvblxuICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL0VvbmFzZGFuL3RlbXB1cy1kb21pbnVzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICovXG5jbGFzcyBUZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuY2xhc3MgRXJyb3JNZXNzYWdlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYmFzZSA9ICdURDonO1xuICAgICAgICAvLyNlbmRyZWdpb25cbiAgICAgICAgLy8jcmVnaW9uIHVzZWQgd2l0aCBub3RpZnkuZXJyb3JcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZWQgd2l0aCBhbiBFcnJvciBFdmVudCB0eXBlIGlmIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlIHRoYXRcbiAgICAgICAgICogZmFpbHMgcmVzdHJpY3Rpb24gdmFsaWRhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmFpbGVkVG9TZXRJbnZhbGlkRGF0ZSA9ICdGYWlsZWQgdG8gc2V0IGludmFsaWQgZGF0ZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2VkIHdpdGggYW4gRXJyb3IgRXZlbnQgdHlwZSB3aGVuIGEgdXNlciBjaGFuZ2VzIHRoZSB2YWx1ZSBvZiB0aGVcbiAgICAgICAgICogaW5wdXQgZmllbGQgZGlyZWN0bHksIGFuZCBkb2VzIG5vdCBwcm92aWRlIGEgdmFsaWQgZGF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmFpbGVkVG9QYXJzZUlucHV0ID0gJ0ZhaWxlZCBwYXJzZSBpbnB1dCBmaWVsZCc7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgIH1cbiAgICAvLyNyZWdpb24gb3V0IHRvIGNvbnNvbGVcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaW5kaWNhdGluZyB0aGF0IGEga2V5IGluIHRoZSBvcHRpb25zIG9iamVjdCBpcyBpbnZhbGlkLlxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lXG4gICAgICovXG4gICAgdW5leHBlY3RlZE9wdGlvbihvcHRpb25OYW1lKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBVbmV4cGVjdGVkIG9wdGlvbjogJHtvcHRpb25OYW1lfSBkb2VzIG5vdCBtYXRjaCBhIGtub3duIG9wdGlvbi5gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDE7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaW5kaWNhdGluZyB0aGF0IG9uZSBtb3JlIGtleXMgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IGlzIGludmFsaWQuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKi9cbiAgICB1bmV4cGVjdGVkT3B0aW9ucyhvcHRpb25OYW1lKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfTogJHtvcHRpb25OYW1lLmpvaW4oJywgJyl9YCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSAxO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIHdoZW4gYW4gb3B0aW9uIGlzIHByb3ZpZGUgYW4gdW5zdXBwb3J0ZWQgdmFsdWUuXG4gICAgICogRm9yIGV4YW1wbGUgYSB2YWx1ZSBvZiAnY2hlZXNlJyBmb3IgdG9vbGJhclBsYWNlbWVudCB3aGljaCBvbmx5IHN1cHBvcnRzXG4gICAgICogJ3RvcCcsICdib3R0b20nLCAnZGVmYXVsdCcuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKiBAcGFyYW0gYmFkVmFsdWVcbiAgICAgKiBAcGFyYW0gdmFsaWRPcHRpb25zXG4gICAgICovXG4gICAgdW5leHBlY3RlZE9wdGlvblZhbHVlKG9wdGlvbk5hbWUsIGJhZFZhbHVlLCB2YWxpZE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IFVuZXhwZWN0ZWQgb3B0aW9uIHZhbHVlOiAke29wdGlvbk5hbWV9IGRvZXMgbm90IGFjY2VwdCBhIHZhbHVlIG9mIFwiJHtiYWRWYWx1ZX1cIi4gVmFsaWQgdmFsdWVzIGFyZTogJHt2YWxpZE9wdGlvbnMuam9pbignLCAnKX1gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDI7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3Igd2hlbiBhbiBvcHRpb24gdmFsdWUgaXMgdGhlIHdyb25nIHR5cGUuXG4gICAgICogRm9yIGV4YW1wbGUgYSBzdHJpbmcgdmFsdWUgd2FzIHByb3ZpZGVkIHRvIG11bHRpcGxlRGF0ZXMgd2hpY2ggb25seVxuICAgICAqIHN1cHBvcnRzIHRydWUgb3IgZmFsc2UuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKiBAcGFyYW0gYmFkVHlwZVxuICAgICAqIEBwYXJhbSBleHBlY3RlZFR5cGVcbiAgICAgKi9cbiAgICB0eXBlTWlzbWF0Y2gob3B0aW9uTmFtZSwgYmFkVHlwZSwgZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBNaXNtYXRjaCB0eXBlczogJHtvcHRpb25OYW1lfSBoYXMgYSB0eXBlIG9mICR7YmFkVHlwZX0gaW5zdGVhZCBvZiB0aGUgcmVxdWlyZWQgJHtleHBlY3RlZFR5cGV9YCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSAzO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIHdoZW4gYW4gb3B0aW9uIHZhbHVlIGlzICBvdXRzaWRlIG9mIHRoZSBleHBlY3RlZCByYW5nZS5cbiAgICAgKiBGb3IgZXhhbXBsZSByZXN0cmljdGlvbnMuZGF5c09mV2Vla0Rpc2FibGVkIGV4Y2VwdHMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDYuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKiBAcGFyYW0gbG93ZXJcbiAgICAgKiBAcGFyYW0gdXBwZXJcbiAgICAgKi9cbiAgICBudW1iZXJzT3V0T2ZSYW5nZShvcHRpb25OYW1lLCBsb3dlciwgdXBwZXIpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9ICR7b3B0aW9uTmFtZX0gZXhwZWN0ZWQgYW4gYXJyYXkgb2YgbnVtYmVyIGJldHdlZW4gJHtsb3dlcn0gYW5kICR7dXBwZXJ9LmApO1xuICAgICAgICBlcnJvci5jb2RlID0gNDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciB3aGVuIGEgdmFsdWUgZm9yIGEgZGF0ZSBvcHRpb25zIGNvdWxkbid0IGJlIHBhcnNlZC4gRWl0aGVyXG4gICAgICogdGhlIG9wdGlvbiB3YXMgYW4gaW52YWxpZCBzdHJpbmcgb3IgYW4gaW52YWxpZCBEYXRlIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZVxuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICogQHBhcmFtIHNvZnQgSWYgdHJ1ZSwgbG9ncyBhIHdhcm5pbmcgaW5zdGVhZCBvZiBhbiBlcnJvci5cbiAgICAgKi9cbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZmFpbGVkVG9QYXJzZURhdGUob3B0aW9uTmFtZSwgZGF0ZSwgc29mdCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBDb3VsZCBub3QgY29ycmVjdGx5IHBhcnNlIFwiJHtkYXRlfVwiIHRvIGEgZGF0ZSBmb3IgJHtvcHRpb25OYW1lfS5gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDU7XG4gICAgICAgIGlmICghc29mdClcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3Mgd2hlbiBhbiBlbGVtZW50IHRvIGF0dGFjaCB0byB3YXMgbm90IHByb3ZpZGVkIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBtdXN0UHJvdmlkZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBObyBlbGVtZW50IHdhcyBwcm92aWRlZC5gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDY7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgaWYgcHJvdmlkaW5nIGFuIGFycmF5IGZvciB0aGUgZXZlbnRzIHRvIHN1YnNjcmliZSBtZXRob2QgZG9lc24ndCBoYXZlXG4gICAgICogdGhlIHNhbWUgbnVtYmVyIG9mIGNhbGxiYWNrcy4gRS5nLiwgc3Vic2NyaWJlKFsxLDJdLCBbMV0pXG4gICAgICovXG4gICAgc3Vic2NyaWJlTWlzbWF0Y2goKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBUaGUgc3Vic2NyaWJlZCBldmVudHMgZG9lcyBub3QgbWF0Y2ggdGhlIG51bWJlciBvZiBjYWxsYmFja3NgKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDc7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgaWYgdGhlIGNvbmZpZ3VyYXRpb24gaGFzIGNvbmZsaWN0aW5nIHJ1bGVzIGUuZy4gbWluRGF0ZSBpcyBhZnRlciBtYXhEYXRlXG4gICAgICovXG4gICAgY29uZmxpY3RpbmdDb25maWd1cmF0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IEEgY29uZmlndXJhdGlvbiB2YWx1ZSBjb25mbGljdHMgd2l0aCBhbm90aGVyIHJ1bGUuICR7bWVzc2FnZX1gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDg7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjdXN0b21EYXRlRm9ybWF0IGVycm9yc1xuICAgICAqL1xuICAgIGN1c3RvbURhdGVGb3JtYXRFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSBDdXN0b20gRGF0ZSBGb3JtYXQ6ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2dzIGEgd2FybmluZyBpZiBhIGRhdGUgb3B0aW9uIHZhbHVlIGlzIHByb3ZpZGVkIGFzIGEgc3RyaW5nLCBpbnN0ZWFkIG9mXG4gICAgICogYSBkYXRlL2RhdGV0aW1lIG9iamVjdC5cbiAgICAgKi9cbiAgICBkYXRlU3RyaW5nKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5iYXNlfSBVc2luZyBhIHN0cmluZyBmb3IgZGF0ZSBvcHRpb25zIGlzIG5vdCByZWNvbW1lbmRlZCB1bmxlc3MgeW91IHNwZWNpZnkgYW4gSVNPIHN0cmluZyBvciB1c2UgdGhlIGN1c3RvbURhdGVGb3JtYXQgcGx1Z2luLmApO1xuICAgIH1cbiAgICBkZXByZWNhdGVkV2FybmluZyhtZXNzYWdlLCByZW1lZGlhdGlvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5iYXNlfSBXYXJuaW5nICR7bWVzc2FnZX0gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24uICR7cmVtZWRpYXRpb259YCk7XG4gICAgfVxuICAgIHRocm93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gJHttZXNzYWdlfWApO1xuICAgICAgICBlcnJvci5jb2RlID0gOTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG4vLyB0aGlzIGlzIG5vdCB0aGUgd2F5IEkgd2FudCB0aGlzIHRvIHN0YXkgYnV0IG5lc3RlZCBjbGFzc2VzIHNlZW1lZCB0byBibG93biB1cCBvbmNlIGl0cyBjb21waWxlZC5cbmNvbnN0IE5BTUUgPSAndGVtcHVzLWRvbWludXMnLCBkYXRhS2V5ID0gJ3RkJztcbi8qKlxuICogRXZlbnRzXG4gKi9cbmNsYXNzIEV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMua2V5ID0gYC4ke2RhdGFLZXl9YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoYW5nZSBldmVudC4gRmlyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZS5cbiAgICAgICAgICogU2VlIGFsc28gRXZlbnRUeXBlcy5DaGFuZ2VFdmVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jaGFuZ2UgPSBgY2hhbmdlJHt0aGlzLmtleX1gO1xuICAgICAgICAvKipcbiAgICAgICAgICogRW1pdCB3aGVuIHRoZSB2aWV3IGNoYW5nZXMgZm9yIGV4YW1wbGUgZnJvbSBtb250aCB2aWV3IHRvIHRoZSB5ZWFyIHZpZXcuXG4gICAgICAgICAqIFNlZSBhbHNvIEV2ZW50VHlwZXMuVmlld1VwZGF0ZUV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnVwZGF0ZSA9IGB1cGRhdGUke3RoaXMua2V5fWA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbWl0cyB3aGVuIGEgc2VsZWN0ZWQgZGF0ZSBvciB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBmaWVsZCBmYWlscyB0byBtZWV0IHRoZSBwcm92aWRlZCB2YWxpZGF0aW9uIHJ1bGVzLlxuICAgICAgICAgKiBTZWUgYWxzbyBFdmVudFR5cGVzLkZhaWxFdmVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lcnJvciA9IGBlcnJvciR7dGhpcy5rZXl9YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3cgZXZlbnRcbiAgICAgICAgICogQGV2ZW50IEV2ZW50cyNzaG93XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNob3cgPSBgc2hvdyR7dGhpcy5rZXl9YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhpZGUgZXZlbnRcbiAgICAgICAgICogQGV2ZW50IEV2ZW50cyNoaWRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhpZGUgPSBgaGlkZSR7dGhpcy5rZXl9YDtcbiAgICAgICAgLy8gYmx1ciBhbmQgZm9jdXMgYXJlIHVzZWQgaW4gdGhlIGpRdWVyeSBwcm92aWRlciBidXQgYXJlIG90aGVyd2lzZSB1bnVzZWQuXG4gICAgICAgIC8vIGtleXVwL2Rvd24gd2lsbCBiZSB1c2VkIGxhdGVyIGZvciBrZXliaW5kaW5nIG9wdGlvbnNcbiAgICAgICAgdGhpcy5ibHVyID0gYGJsdXIke3RoaXMua2V5fWA7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBgZm9jdXMke3RoaXMua2V5fWA7XG4gICAgICAgIHRoaXMua2V5dXAgPSBga2V5dXAke3RoaXMua2V5fWA7XG4gICAgICAgIHRoaXMua2V5ZG93biA9IGBrZXlkb3duJHt0aGlzLmtleX1gO1xuICAgIH1cbn1cbmNsYXNzIENzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2lkZ2V0ID0gYCR7TkFNRX0td2lkZ2V0YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhvbGQgdGhlIHByZXZpb3VzLCBuZXh0IGFuZCBzd2l0Y2hlciBkaXZzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhbGVuZGFySGVhZGVyID0gJ2NhbGVuZGFyLWhlYWRlcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZWxlbWVudCBmb3IgdGhlIGFjdGlvbiB0byBjaGFuZ2UgdGhlIGNhbGVuZGFyIHZpZXcuIEUuZy4gbW9udGggLT4geWVhci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3dpdGNoID0gJ3BpY2tlci1zd2l0Y2gnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVsZW1lbnRzIGZvciBhbGwgdGhlIHRvb2xiYXIgb3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50b29sYmFyID0gJ3Rvb2xiYXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGhlIGhvdmVyIGFuZCByb3VuZGluZyBhZmZlY3QuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5vSGlnaGxpZ2h0ID0gJ25vLWhpZ2hsaWdodCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSB3aWRnZXQgZWxlbWVudCB3aGVuIHRoZSBzaWRlIGJ5IHNpZGUgb3B0aW9uIGlzIGluIHVzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2lkZUJ5U2lkZSA9ICd0aW1lcGlja2VyLXNicyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZWxlbWVudCBmb3IgdGhlIGFjdGlvbiB0byBjaGFuZ2UgdGhlIGNhbGVuZGFyIHZpZXcsIGUuZy4gQXVndXN0IC0+IEp1bHlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucHJldmlvdXMgPSAncHJldmlvdXMnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVsZW1lbnQgZm9yIHRoZSBhY3Rpb24gdG8gY2hhbmdlIHRoZSBjYWxlbmRhciB2aWV3LCBlLmcuIEF1Z3VzdCAtPiBTZXB0ZW1iZXJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmV4dCA9ICduZXh0JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gYW55IGFjdGlvbiB0aGF0IHdvdWxkIHZpb2xhdGUgYW55IHJlc3RyaWN0aW9uIG9wdGlvbnMuIEFMc28gYXBwbGllZFxuICAgICAgICAgKiB0byBhbiBpbnB1dCBmaWVsZCBpZiB0aGUgZGlzYWJsZWQgZnVuY3Rpb24gaXMgY2FsbGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9ICdkaXNhYmxlZCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGFueSBkYXRlIHRoYXQgaXMgbGVzcyB0aGFuIHJlcXVlc3RlZCB2aWV3LFxuICAgICAgICAgKiBlLmcuIHRoZSBsYXN0IGRheSBvZiB0aGUgcHJldmlvdXMgbW9udGguXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9sZCA9ICdvbGQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBhbnkgZGF0ZSB0aGF0IGlzIGdyZWF0ZXIgdGhhbiBvZiByZXF1ZXN0ZWQgdmlldyxcbiAgICAgICAgICogZS5nLiB0aGUgbGFzdCBkYXkgb2YgdGhlIHByZXZpb3VzIG1vbnRoLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uZXcgPSAnbmV3JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gYW55IGRhdGUgdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmFjdGl2ZSA9ICdhY3RpdmUnO1xuICAgICAgICAvLyNyZWdpb24gZGF0ZSBlbGVtZW50XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIGNhbGVuZGFyIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRhdGVDb250YWluZXIgPSAnZGF0ZS1jb250YWluZXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBkZWNhZGVzIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRlY2FkZXNDb250YWluZXIgPSBgJHt0aGlzLmRhdGVDb250YWluZXJ9LWRlY2FkZXNgO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlbGVtZW50cyB3aXRoaW4gdGhlIGRlY2FkZSBjb250YWluZXIsIGUuZy4gMjAyMCwgMjAzMFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZWNhZGUgPSAnZGVjYWRlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgeWVhcnMgdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMueWVhcnNDb250YWluZXIgPSBgJHt0aGlzLmRhdGVDb250YWluZXJ9LXllYXJzYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gZWxlbWVudHMgd2l0aGluIHRoZSB5ZWFycyBjb250YWluZXIsIGUuZy4gMjAyMSwgMjAyMVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy55ZWFyID0gJ3llYXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBtb250aCB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb250aHNDb250YWluZXIgPSBgJHt0aGlzLmRhdGVDb250YWluZXJ9LW1vbnRoc2A7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGVsZW1lbnRzIHdpdGhpbiB0aGUgbW9udGggY29udGFpbmVyLCBlLmcuIEphbnVhcnksIEZlYnJ1YXJ5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vbnRoID0gJ21vbnRoJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgY2FsZW5kYXIgdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGF5c0NvbnRhaW5lciA9IGAke3RoaXMuZGF0ZUNvbnRhaW5lcn0tZGF5c2A7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGVsZW1lbnRzIHdpdGhpbiB0aGUgZGF5IGNvbnRhaW5lciwgZS5nLiAxLCAyLi4zMVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kYXkgPSAnZGF5JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGRpc3BsYXkuY2FsZW5kYXJXZWVrcyBpcyBlbmFibGVkLCBhIGNvbHVtbiBkaXNwbGF5aW5nIHRoZSB3ZWVrIG9mIHllYXJcbiAgICAgICAgICogaXMgc2hvd24uIFRoaXMgY2xhc3MgaXMgYXBwbGllZCB0byBlYWNoIGNlbGwgaW4gdGhhdCBjb2x1bW4uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhbGVuZGFyV2Vla3MgPSAnY3cnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgZmlyc3Qgcm93IG9mIHRoZSBjYWxlbmRhciB2aWV3LCBlLmcuIFN1bmRheSwgTW9uZGF5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRheU9mVGhlV2VlayA9ICdkb3cnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgY3VycmVudCBkYXRlIG9uIHRoZSBjYWxlbmRhciB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50b2RheSA9ICd0b2RheSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSBsb2NhbGUncyB3ZWVrZW5kIGRhdGVzIG9uIHRoZSBjYWxlbmRhciB2aWV3LCBlLmcuIFN1bmRheSwgU2F0dXJkYXlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2Vla2VuZCA9ICd3ZWVrZW5kJztcbiAgICAgICAgdGhpcy5yYW5nZUluID0gJ3JhbmdlLWluJztcbiAgICAgICAgdGhpcy5yYW5nZVN0YXJ0ID0gJ3JhbmdlLXN0YXJ0JztcbiAgICAgICAgdGhpcy5yYW5nZUVuZCA9ICdyYW5nZS1lbmQnO1xuICAgICAgICAvLyNlbmRyZWdpb25cbiAgICAgICAgLy8jcmVnaW9uIHRpbWUgZWxlbWVudFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIGFsbCB0aW1lIHJlbGF0ZWQgZWxlbWVudHMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRpbWVDb250YWluZXIgPSAndGltZS1jb250YWluZXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0aGUgc2VwYXJhdG9yIGNvbHVtbnMgYmV0d2VlbiB0aW1lIGVsZW1lbnRzLCBlLmcuIGhvdXIgKjoqIG1pbnV0ZSAqOiogc2Vjb25kXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlcGFyYXRvciA9ICdzZXBhcmF0b3InO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBjbG9jayB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbG9ja0NvbnRhaW5lciA9IGAke3RoaXMudGltZUNvbnRhaW5lcn0tY2xvY2tgO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBob3VycyBzZWxlY3Rpb24gdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaG91ckNvbnRhaW5lciA9IGAke3RoaXMudGltZUNvbnRhaW5lcn0taG91cmA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIG1pbnV0ZXMgc2VsZWN0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1pbnV0ZUNvbnRhaW5lciA9IGAke3RoaXMudGltZUNvbnRhaW5lcn0tbWludXRlYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgc2Vjb25kcyBzZWxlY3Rpb24gdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2Vjb25kQ29udGFpbmVyID0gYCR7dGhpcy50aW1lQ29udGFpbmVyfS1zZWNvbmRgO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlYWNoIGVsZW1lbnQgaW4gdGhlIGhvdXJzIHNlbGVjdGlvbiB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ob3VyID0gJ2hvdXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlYWNoIGVsZW1lbnQgaW4gdGhlIG1pbnV0ZXMgc2VsZWN0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1pbnV0ZSA9ICdtaW51dGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlYWNoIGVsZW1lbnQgaW4gdGhlIHNlY29uZHMgc2VsZWN0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlY29uZCA9ICdzZWNvbmQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCBBTS9QTSB0b2dnbGUgYnV0dG9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50b2dnbGVNZXJpZGllbSA9ICd0b2dnbGVNZXJpZGllbSc7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvLyNyZWdpb24gY29sbGFwc2VcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdGhlIGVsZW1lbnQgb2YgdGhlIGN1cnJlbnQgdmlldyBtb2RlLCBlLmcuIGNhbGVuZGFyIG9yIGNsb2NrLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zaG93ID0gJ3Nob3cnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgY3VycmVudGx5IHNob3dpbmcgdmlldyBtb2RlIGR1cmluZyBhIHRyYW5zaXRpb25cbiAgICAgICAgICogYmV0d2VlbiBjYWxlbmRhciBhbmQgY2xvY2sgdmlld3NcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29sbGFwc2luZyA9ICd0ZC1jb2xsYXBzaW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIGN1cnJlbnRseSBoaWRkZW4gdmlldyBtb2RlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb2xsYXBzZSA9ICd0ZC1jb2xsYXBzZSc7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgd2lkZ2V0IHdoZW4gdGhlIG9wdGlvbiBkaXNwbGF5LmlubGluZSBpcyBlbmFibGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbmxpbmUgPSAnaW5saW5lJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIHdpZGdldCB3aGVuIHRoZSBvcHRpb24gZGlzcGxheS50aGVtZSBpcyBsaWdodC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGlnaHRUaGVtZSA9ICdsaWdodCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSB3aWRnZXQgd2hlbiB0aGUgb3B0aW9uIGRpc3BsYXkudGhlbWUgaXMgZGFyay5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGFya1RoZW1lID0gJ2RhcmsnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVXNlZCBmb3IgZGV0ZWN0aW5nIGlmIHRoZSBzeXN0ZW0gY29sb3IgcHJlZmVyZW5jZSBpcyBkYXJrIG1vZGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNEYXJrUHJlZmVycmVkUXVlcnkgPSAnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSc7XG4gICAgfVxufVxuY2xhc3MgTmFtZXNwYWNlIHtcbn1cbk5hbWVzcGFjZS5OQU1FID0gTkFNRTtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbk5hbWVzcGFjZS5kYXRhS2V5ID0gZGF0YUtleTtcbk5hbWVzcGFjZS5ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG5OYW1lc3BhY2UuY3NzID0gbmV3IENzcygpO1xuTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMgPSBuZXcgRXJyb3JNZXNzYWdlcygpO1xuXG5jb25zdCBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uID0ge1xuICAgIGRhdGVGb3JtYXRzOiB7XG4gICAgICAgIExUUzogJ2g6bW06c3MgVCcsXG4gICAgICAgIExUOiAnaDptbSBUJyxcbiAgICAgICAgTDogJ01NL2RkL3l5eXknLFxuICAgICAgICBMTDogJ01NTU0gZCwgeXl5eScsXG4gICAgICAgIExMTDogJ01NTU0gZCwgeXl5eSBoOm1tIFQnLFxuICAgICAgICBMTExMOiAnZGRkZCwgTU1NTSBkLCB5eXl5IGg6bW0gVCcsXG4gICAgfSxcbiAgICBmb3JtYXQ6ICdMIExUJyxcbiAgICBsb2NhbGU6ICdkZWZhdWx0JyxcbiAgICBob3VyQ3ljbGU6IHVuZGVmaW5lZCxcbiAgICBvcmRpbmFsOiAobikgPT4ge1xuICAgICAgICBjb25zdCBzID0gWyd0aCcsICdzdCcsICduZCcsICdyZCddO1xuICAgICAgICBjb25zdCB2ID0gbiAlIDEwMDtcbiAgICAgICAgcmV0dXJuIGBbJHtufSR7c1sodiAtIDIwKSAlIDEwXSB8fCBzW3ZdIHx8IHNbMF19XWA7XG4gICAgfSxcbn07XG52YXIgRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxID0geyAuLi5EZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uIH07XG5cbnZhciBVbml0O1xuKGZ1bmN0aW9uIChVbml0KSB7XG4gICAgVW5pdFtcInNlY29uZHNcIl0gPSBcInNlY29uZHNcIjtcbiAgICBVbml0W1wibWludXRlc1wiXSA9IFwibWludXRlc1wiO1xuICAgIFVuaXRbXCJob3Vyc1wiXSA9IFwiaG91cnNcIjtcbiAgICBVbml0W1wiZGF0ZVwiXSA9IFwiZGF0ZVwiO1xuICAgIFVuaXRbXCJtb250aFwiXSA9IFwibW9udGhcIjtcbiAgICBVbml0W1wieWVhclwiXSA9IFwieWVhclwiO1xufSkoVW5pdCB8fCAoVW5pdCA9IHt9KSk7XG5jb25zdCB0d29EaWdpdFRlbXBsYXRlID0ge1xuICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgeWVhcjogJ251bWVyaWMnLFxuICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICBzZWNvbmQ6ICcyLWRpZ2l0Jyxcbn07XG4vKipcbiAqIFJldHVybnMgYW4gSW50bCBmb3JtYXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvYmplY3RcbiAqIEBwYXJhbSB1bml0XG4gKi9cbmNvbnN0IGdldEZvcm1hdEJ5VW5pdCA9ICh1bml0KSA9PiB7XG4gICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0ZVN0eWxlOiAnc2hvcnQnIH07XG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbW9udGg6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHJldHVybiB7IHllYXI6ICdudW1lcmljJyB9O1xuICAgIH1cbn07XG4vKipcbiAqIEF0dGVtcHRzIHRvIGd1ZXNzIHRoZSBob3VyIGN5Y2xlIG9mIHRoZSBnaXZlbiBsb2NhbFxuICogQHBhcmFtIGxvY2FsZVxuICovXG5jb25zdCBndWVzc0hvdXJDeWNsZSA9IChsb2NhbGUpID0+IHtcbiAgICBpZiAoIWxvY2FsZSlcbiAgICAgICAgcmV0dXJuICdoMTInO1xuICAgIC8vIG5vaW5zcGVjdGlvbiBTcGVsbENoZWNraW5nSW5zcGVjdGlvblxuICAgIGNvbnN0IHRlbXBsYXRlID0ge1xuICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgICAgICBudW1iZXJpbmdTeXN0ZW06ICdsYXRuJyxcbiAgICB9O1xuICAgIGNvbnN0IGR0ID0gbmV3IERhdGVUaW1lKCkuc2V0TG9jYWxpemF0aW9uKHsgbG9jYWxlIH0pO1xuICAgIGR0LmhvdXJzID0gMDtcbiAgICBjb25zdCBzdGFydCA9IGR0LnBhcnRzKHVuZGVmaW5lZCwgdGVtcGxhdGUpLmhvdXI7XG4gICAgLy9taWRuaWdodCBpcyAxMiBzbyBlbi1VUyBzdHlsZSAxMiBBTVxuICAgIGlmIChzdGFydCA9PT0gJzEyJylcbiAgICAgICAgcmV0dXJuICdoMTInO1xuICAgIC8vbWlkbmlnaHQgaXMgMjQgaXMgZnJvbSAwMC0yNFxuICAgIGlmIChzdGFydCA9PT0gJzI0JylcbiAgICAgICAgcmV0dXJuICdoMjQnO1xuICAgIGR0LmhvdXJzID0gMjM7XG4gICAgY29uc3QgZW5kID0gZHQucGFydHModW5kZWZpbmVkLCB0ZW1wbGF0ZSkuaG91cjtcbiAgICAvL2lmIG1pZG5pZ2h0IGlzIDAwIGFuZCBob3VyIDIzIGlzIDExIHRoZW5cbiAgICBpZiAoc3RhcnQgPT09ICcwMCcgJiYgZW5kID09PSAnMTEnKVxuICAgICAgICByZXR1cm4gJ2gxMSc7XG4gICAgaWYgKHN0YXJ0ID09PSAnMDAnICYmIGVuZCA9PT0gJzIzJylcbiAgICAgICAgcmV0dXJuICdoMjMnO1xuICAgIGNvbnNvbGUud2FybihgY291bGRuJ3QgZGV0ZXJtaW5lIGhvdXIgY3ljbGUgZm9yICR7bG9jYWxlfS4gc3RhcnQ6ICR7c3RhcnR9LiBlbmQ6ICR7ZW5kfWApO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuLyoqXG4gKiBGb3IgdGhlIG1vc3QgcGFydCB0aGlzIG9iamVjdCBiZWhhdmVzIGV4YWN0bHkgdGhlIHNhbWUgd2F5XG4gKiBhcyB0aGUgbmF0aXZlIERhdGUgb2JqZWN0IHdpdGggYSBsaXR0bGUgZXh0cmEgc3BpY2UuXG4gKi9cbmNsYXNzIERhdGVUaW1lIGV4dGVuZHMgRGF0ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMubG9jYWxpemF0aW9uID0gRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxO1xuICAgICAgICB0aGlzLm5vbkxlYXBMYWRkZXIgPSBbXG4gICAgICAgICAgICAwLCAzMSwgNTksIDkwLCAxMjAsIDE1MSwgMTgxLCAyMTIsIDI0MywgMjczLCAzMDQsIDMzNCxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5sZWFwTGFkZGVyID0gWzAsIDMxLCA2MCwgOTEsIDEyMSwgMTUyLCAxODIsIDIxMywgMjQ0LCAyNzQsIDMwNSwgMzM1XTtcbiAgICAgICAgLy8jcmVnaW9uIENERiBzdHVmZlxuICAgICAgICB0aGlzLmRhdGVUaW1lUmVnZXggPSBcbiAgICAgICAgLy9pcyByZWdleCBjYW5ub3QgYmUgc2ltcGxpZmllZCBiZXlvbmQgd2hhdCBpdCBhbHJlYWR5IGlzXG4gICAgICAgIC8oXFxbW15bXFxdXSpdKXx5ezEsNH18TXsxLDR9fGR7MSw0fXxIezEsMn18aHsxLDJ9fHR8VHxtezEsMn18c3sxLDJ9fGZ7M30vZzsgLy9OT1NPTkFSXG4gICAgICAgIHRoaXMuZm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15bXFxdXSpdKXwoWy1fOi8uLCgpXFxzXSspfChUfHR8eXl5eXx5eT98TU0/TT9NP3xEb3xkZD98aGg/fEhIP3xtbT98c3M/KS9nOyAvL05PU09OQVIgaXMgcmVnZXggY2Fubm90IGJlIHNpbXBsaWZpZWQgYmV5b25kIHdoYXQgaXQgYWxyZWFkeSBpc1xuICAgICAgICB0aGlzLm1hdGNoMiA9IC9cXGRcXGQvOyAvLyAwMCAtIDk5XG4gICAgICAgIHRoaXMubWF0Y2gzID0gL1xcZHszfS87IC8vIDAwMCAtIDk5OVxuICAgICAgICB0aGlzLm1hdGNoNCA9IC9cXGR7NH0vOyAvLyAwMDAwIC0gOTk5OVxuICAgICAgICB0aGlzLm1hdGNoMXRvMiA9IC9cXGRcXGQ/LzsgLy8gMCAtIDk5XG4gICAgICAgIHRoaXMubWF0Y2hTaWduZWQgPSAvWystXT9cXGQrLzsgLy8gLWluZiAtIGluZlxuICAgICAgICB0aGlzLm1hdGNoT2Zmc2V0ID0gL1srLV1cXGRcXGQ6PyhcXGRcXGQpP3xaLzsgLy8gKzAwOjAwIC0wMDowMCArMDAwMCBvciAtMDAwMCArMDAgb3IgWlxuICAgICAgICB0aGlzLm1hdGNoV29yZCA9IC9bXlxcZF86LyxcXC0oKVxcc10rLzsgLy8gV29yZFxuICAgICAgICB0aGlzLnpvbmVFeHByZXNzaW9ucyA9IFtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hPZmZzZXQsXG4gICAgICAgICAgICAob2JqLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgIG9iai5vZmZzZXQgPSB0aGlzLm9mZnNldEZyb21TdHJpbmcoaW5wdXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5leHByZXNzaW9ucyA9IHtcbiAgICAgICAgICAgIHQ6IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoV29yZCxcbiAgICAgICAgICAgICAgICAob2piLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvamIuYWZ0ZXJub29uID0gdGhpcy5tZXJpZGllbU1hdGNoKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFQ6IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoV29yZCxcbiAgICAgICAgICAgICAgICAob2piLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvamIuYWZ0ZXJub29uID0gdGhpcy5tZXJpZGllbU1hdGNoKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGZmZjogW1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2gzLFxuICAgICAgICAgICAgICAgIChvamIsIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9qYi5taWxsaXNlY29uZHMgPSAraW5wdXQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ3NlY29uZHMnKV0sXG4gICAgICAgICAgICBzczogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdzZWNvbmRzJyldLFxuICAgICAgICAgICAgbTogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdtaW51dGVzJyldLFxuICAgICAgICAgICAgbW06IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnbWludXRlcycpXSxcbiAgICAgICAgICAgIEg6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnaG91cnMnKV0sXG4gICAgICAgICAgICBoOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ2hvdXJzJyldLFxuICAgICAgICAgICAgSEg6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnaG91cnMnKV0sXG4gICAgICAgICAgICBoaDogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdob3VycycpXSxcbiAgICAgICAgICAgIGQ6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnZGF5JyldLFxuICAgICAgICAgICAgZGQ6IFt0aGlzLm1hdGNoMiwgdGhpcy5hZGRJbnB1dCgnZGF5JyldLFxuICAgICAgICAgICAgRG86IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoV29yZCxcbiAgICAgICAgICAgICAgICAob2piLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBbb2piLmRheV0gPSBpbnB1dC5tYXRjaCgvXFxkKy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubG9jYWxpemF0aW9uLm9yZGluYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDMxOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsaXphdGlvbi5vcmRpbmFsKGkpLnJlcGxhY2UoL1tbXFxdXS9nLCAnJykgPT09IGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2piLmRheSA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIE06IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnbW9udGgnKV0sXG4gICAgICAgICAgICBNTTogW3RoaXMubWF0Y2gyLCB0aGlzLmFkZElucHV0KCdtb250aCcpXSxcbiAgICAgICAgICAgIE1NTTogW1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hXb3JkLFxuICAgICAgICAgICAgICAgIChvYmosIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRocyA9IHRoaXMuZ2V0QWxsTW9udGhzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoc1Nob3J0ID0gdGhpcy5nZXRBbGxNb250aHMoJ3Nob3J0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSAobW9udGhzU2hvcnQgfHwgbW9udGhzLm1hcCgoXykgPT4gXy5zbGljZSgwLCAzKSkpLmluZGV4T2YoaW5wdXQpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmoubW9udGggPSBtYXRjaEluZGV4ICUgMTIgfHwgbWF0Y2hJbmRleDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIE1NTU06IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoV29yZCxcbiAgICAgICAgICAgICAgICAob2JqLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb250aHMgPSB0aGlzLmdldEFsbE1vbnRocygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaEluZGV4ID0gbW9udGhzLmluZGV4T2YoaW5wdXQpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmoubW9udGggPSBtYXRjaEluZGV4ICUgMTIgfHwgbWF0Y2hJbmRleDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHk6IFt0aGlzLm1hdGNoU2lnbmVkLCB0aGlzLmFkZElucHV0KCd5ZWFyJyldLFxuICAgICAgICAgICAgeXk6IFtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoMixcbiAgICAgICAgICAgICAgICAob2JqLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvYmoueWVhciA9IHRoaXMucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgeXl5eTogW3RoaXMubWF0Y2g0LCB0aGlzLmFkZElucHV0KCd5ZWFyJyldLFxuICAgICAgICAgICAgLy8gejogdGhpcy56b25lRXhwcmVzc2lvbnMsXG4gICAgICAgICAgICAvLyB6ejogdGhpcy56b25lRXhwcmVzc2lvbnMsXG4gICAgICAgICAgICAvLyB6eno6IHRoaXMuem9uZUV4cHJlc3Npb25zXG4gICAgICAgIH07XG4gICAgICAgIC8vI2VuZHJlZ2lvbiBDREYgc3R1ZmZcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhaW5hYmxlIHdheSB0byBzZXQgdGhlIHtAbGluayBsb2NhbGV9XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHNldExvY2FsaXphdGlvbiB3aXRoIGEgRm9ybWF0TG9jYWxpemF0aW9uIG9iamVjdCBpbnN0ZWFkXG4gICAgICovXG4gICAgc2V0TG9jYWxlKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2NhbGl6YXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxpemF0aW9uID0gRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxO1xuICAgICAgICAgICAgdGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYWluYWJsZSB3YXkgdG8gc2V0IHRoZSB7QGxpbmsgbG9jYWxpemF0aW9ufVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHNldExvY2FsaXphdGlvbih2YWx1ZSkge1xuICAgICAgICB0aGlzLmxvY2FsaXphdGlvbiA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBwbGFpbiBKUyBkYXRlIG9iamVjdCB0byBhIERhdGVUaW1lIG9iamVjdC5cbiAgICAgKiBEb2luZyB0aGlzIGFsbG93cyBhY2Nlc3MgdG8gZm9ybWF0LCBldGMuXG4gICAgICogQHBhcmFtICBkYXRlXG4gICAgICogQHBhcmFtIGxvY2FsZSB0aGlzIHBhcmFtZXRlciBpcyBkZXByZWNhdGVkLiBVc2UgZm9ybWF0TG9jYWxpemF0aW9uIGluc3RlYWQuXG4gICAgICogQHBhcmFtIGZvcm1hdExvY2FsaXphdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBjb252ZXJ0KGRhdGUsIGxvY2FsZSA9ICdkZWZhdWx0JywgZm9ybWF0TG9jYWxpemF0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghZGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQSBkYXRlIGlzIHJlcXVpcmVkYCk7XG4gICAgICAgIGlmICghZm9ybWF0TG9jYWxpemF0aW9uKSB7XG4gICAgICAgICAgICBmb3JtYXRMb2NhbGl6YXRpb24gPSBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDE7XG4gICAgICAgICAgICBmb3JtYXRMb2NhbGl6YXRpb24ubG9jYWxlID0gbG9jYWxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpLCBkYXRlLmdldFNlY29uZHMoKSwgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSkuc2V0TG9jYWxpemF0aW9uKGZvcm1hdExvY2FsaXphdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5hdGl2ZSBkYXRlIG1hbmlwdWxhdGlvbnMgYXJlIG5vdCBwdXJlIGZ1bmN0aW9ucy4gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGEgZHVwbGljYXRlIG9mIHRoZSBEYXRlVGltZSBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0IGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXRlLCB0aGlzLmhvdXJzLCB0aGlzLm1pbnV0ZXMsIHRoaXMuc2Vjb25kcywgdGhpcy5nZXRNaWxsaXNlY29uZHMoKSkuc2V0TG9jYWxpemF0aW9uKHRoaXMubG9jYWxpemF0aW9uKTtcbiAgICB9XG4gICAgc3RhdGljIGlzVmFsaWQoZCkge1xuICAgICAgICBpZiAoZCA9PT0gdW5kZWZpbmVkIHx8IEpTT04uc3RyaW5naWZ5KGQpID09PSAnbnVsbCcpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChkLmNvbnN0cnVjdG9yLm5hbWUgPT09IERhdGVUaW1lLm5hbWUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IGRhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSB7QGxpbmsgdW5pdH0gcHJvdmlkZWRcbiAgICAgKiBFeGFtcGxlOiBDb25zaWRlciBhIGRhdGUgb2YgXCJBcHJpbCAzMCwgMjAyMSwgMTE6NDU6MzIuOTg0IEFNXCIgPT4gbmV3IERhdGVUaW1lKDIwMjEsIDMsIDMwLCAxMSwgNDUsIDMyLCA5ODQpLnN0YXJ0T2YoJ21vbnRoJylcbiAgICAgKiB3b3VsZCByZXR1cm4gQXByaWwgMSwgMjAyMSwgMTI6MDA6MDAuMDAwIEFNIChtaWRuaWdodClcbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqIEBwYXJhbSBzdGFydE9mVGhlV2VlayBBbGxvd3MgZm9yIHRoZSBjaGFuZ2luZyB0aGUgc3RhcnQgb2YgdGhlIHdlZWsuXG4gICAgICovXG4gICAgc3RhcnRPZih1bml0LCBzdGFydE9mVGhlV2VlayA9IDApIHtcbiAgICAgICAgaWYgKHRoaXNbdW5pdF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5pdCAnJHt1bml0fScgaXMgbm90IHZhbGlkYCk7XG4gICAgICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaWxsaXNlY29uZHMoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlY29uZHMoMCwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdob3Vycyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaW51dGVzKDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dlZWtEYXknOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2Vla0RheSA9PT0gc3RhcnRPZlRoZVdlZWspXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNvbnN0IGdvQmFjayA9ICh0aGlzLndlZWtEYXkgLSBzdGFydE9mVGhlV2VlayArIDcpICUgNztcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGUoZ29CYWNrICogLTEsIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb250aCgwLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCBkYXRlIHRvIHRoZSBlbmQgb2YgdGhlIHtAbGluayB1bml0fSBwcm92aWRlZFxuICAgICAqIEV4YW1wbGU6IENvbnNpZGVyIGEgZGF0ZSBvZiBcIkFwcmlsIDMwLCAyMDIxLCAxMTo0NTozMi45ODQgQU1cIiA9PiBuZXcgRGF0ZVRpbWUoMjAyMSwgMywgMzAsIDExLCA0NSwgMzIsIDk4NCkuZW5kT2YoJ21vbnRoJylcbiAgICAgKiB3b3VsZCByZXR1cm4gQXByaWwgMzAsIDIwMjEsIDExOjU5OjU5Ljk5OSBQTVxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICogQHBhcmFtIHN0YXJ0T2ZUaGVXZWVrXG4gICAgICovXG4gICAgZW5kT2YodW5pdCwgc3RhcnRPZlRoZVdlZWsgPSAwKSB7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWlsbGlzZWNvbmRzKDk5OSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlY29uZHMoNTksIDk5OSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdob3Vycyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaW51dGVzKDU5LCA1OSwgOTk5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dlZWtEYXknOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRPZihVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZE9mV2VlayA9IDYgKyBzdGFydE9mVGhlV2VlaztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53ZWVrRGF5ID09PSBlbmRPZldlZWspXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZShlbmRPZldlZWsgLSB0aGlzLndlZWtEYXksIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRPZihVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZSgxLCBVbml0Lm1vbnRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb250aCgxMSwgMzEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgYSB7QGxpbmsgdW5pdH0gdmFsdWUuIFZhbHVlIGNhbiBiZSBwb3NpdGl2ZSBvciBuZWdhdGl2ZVxuICAgICAqIEV4YW1wbGU6IENvbnNpZGVyIGEgZGF0ZSBvZiBcIkFwcmlsIDMwLCAyMDIxLCAxMTo0NTozMi45ODQgQU1cIiA9PiBuZXcgRGF0ZVRpbWUoMjAyMSwgMywgMzAsIDExLCA0NSwgMzIsIDk4NCkubWFuaXB1bGF0ZSgxLCAnbW9udGgnKVxuICAgICAqIHdvdWxkIHJldHVybiBNYXkgMzAsIDIwMjEsIDExOjQ1OjMyLjk4NCBBTVxuICAgICAqIEBwYXJhbSB2YWx1ZSBBIHBvc2l0aXZlIG9yIG5lZ2F0aXZlIG51bWJlclxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICovXG4gICAgbWFuaXB1bGF0ZSh2YWx1ZSwgdW5pdCkge1xuICAgICAgICBpZiAodGhpc1t1bml0XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbml0ICcke3VuaXR9JyBpcyBub3QgdmFsaWRgKTtcbiAgICAgICAgdGhpc1t1bml0XSArPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0cnVlIGlmIHtAbGluayBjb21wYXJlfSBpcyBiZWZvcmUgdGhpcyBkYXRlXG4gICAgICogQHBhcmFtIGNvbXBhcmUgVGhlIERhdGUvRGF0ZVRpbWUgdG8gY29tcGFyZVxuICAgICAqIEBwYXJhbSB1bml0IElmIHByb3ZpZGVkLCB1c2VzIHtAbGluayBzdGFydE9mfSBmb3JcbiAgICAgKiBjb21wYXJpc29uLlxuICAgICAqL1xuICAgIGlzQmVmb3JlKGNvbXBhcmUsIHVuaXQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNvbXBhcmlzb25zIGlzIHVuZGVmaW5lZCwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZChjb21wYXJlKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF1bml0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpIDwgY29tcGFyZS52YWx1ZU9mKCk7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICByZXR1cm4gKHRoaXMuY2xvbmUuc3RhcnRPZih1bml0KS52YWx1ZU9mKCkgPCBjb21wYXJlLmNsb25lLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRydWUgaWYge0BsaW5rIGNvbXBhcmV9IGlzIGFmdGVyIHRoaXMgZGF0ZVxuICAgICAqIEBwYXJhbSBjb21wYXJlIFRoZSBEYXRlL0RhdGVUaW1lIHRvIGNvbXBhcmVcbiAgICAgKiBAcGFyYW0gdW5pdCBJZiBwcm92aWRlZCwgdXNlcyB7QGxpbmsgc3RhcnRPZn0gZm9yXG4gICAgICogY29tcGFyaXNvbi5cbiAgICAgKi9cbiAgICBpc0FmdGVyKGNvbXBhcmUsIHVuaXQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNvbXBhcmlzb25zIGlzIHVuZGVmaW5lZCwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZChjb21wYXJlKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF1bml0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID4gY29tcGFyZS52YWx1ZU9mKCk7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICByZXR1cm4gKHRoaXMuY2xvbmUuc3RhcnRPZih1bml0KS52YWx1ZU9mKCkgPiBjb21wYXJlLmNsb25lLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRydWUgaWYge0BsaW5rIGNvbXBhcmV9IGlzIHNhbWUgdGhpcyBkYXRlXG4gICAgICogQHBhcmFtIGNvbXBhcmUgVGhlIERhdGUvRGF0ZVRpbWUgdG8gY29tcGFyZVxuICAgICAqIEBwYXJhbSB1bml0IElmIHByb3ZpZGVkLCB1c2VzIHtAbGluayBzdGFydE9mfSBmb3JcbiAgICAgKiBjb21wYXJpc29uLlxuICAgICAqL1xuICAgIGlzU2FtZShjb21wYXJlLCB1bml0KSB7XG4gICAgICAgIC8vIElmIHRoZSBjb21wYXJpc29ucyBpcyB1bmRlZmluZWQsIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAoIURhdGVUaW1lLmlzVmFsaWQoY29tcGFyZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghdW5pdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA9PT0gY29tcGFyZS52YWx1ZU9mKCk7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICBjb21wYXJlID0gRGF0ZVRpbWUuY29udmVydChjb21wYXJlKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLmNsb25lLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpID09PSBjb21wYXJlLnN0YXJ0T2YodW5pdCkudmFsdWVPZigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhpcyBpcyBiZXR3ZWVuIHR3byBvdGhlciBEYXRlVGltZXMsIG9wdGlvbmFsbHkgbG9va2luZyBhdCB1bml0IHNjYWxlLiBUaGUgbWF0Y2ggaXMgZXhjbHVzaXZlLlxuICAgICAqIEBwYXJhbSBsZWZ0XG4gICAgICogQHBhcmFtIHJpZ2h0XG4gICAgICogQHBhcmFtIHVuaXQuXG4gICAgICogQHBhcmFtIGluY2x1c2l2aXR5LiBBIFsgaW5kaWNhdGVzIGluY2x1c2lvbiBvZiBhIHZhbHVlLiBBICggaW5kaWNhdGVzIGV4Y2x1c2lvbi5cbiAgICAgKiBJZiB0aGUgaW5jbHVzaXZpdHkgcGFyYW1ldGVyIGlzIHVzZWQsIGJvdGggaW5kaWNhdG9ycyBtdXN0IGJlIHBhc3NlZC5cbiAgICAgKi9cbiAgICBpc0JldHdlZW4obGVmdCwgcmlnaHQsIHVuaXQsIGluY2x1c2l2aXR5ID0gJygpJykge1xuICAgICAgICAvLyBJZiBvbmUgb2YgdGhlIGNvbXBhcmlzb25zIGlzIHVuZGVmaW5lZCwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZChsZWZ0KSB8fCAhRGF0ZVRpbWUuaXNWYWxpZChyaWdodCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIElmIGEgdW5pdCBpcyBwcm92aWRlZCBhbmQgaXMgbm90IGEgdmFsaWQgcHJvcGVydHkgb2YgdGhlIERhdGVUaW1lIG9iamVjdCwgdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgaWYgKHVuaXQgJiYgdGhpc1t1bml0XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlZnRJbmNsdXNpdml0eSA9IGluY2x1c2l2aXR5WzBdID09PSAnKCc7XG4gICAgICAgIGNvbnN0IHJpZ2h0SW5jbHVzaXZpdHkgPSBpbmNsdXNpdml0eVsxXSA9PT0gJyknO1xuICAgICAgICBjb25zdCBpc0xlZnRJblJhbmdlID0gbGVmdEluY2x1c2l2aXR5XG4gICAgICAgICAgICA/IHRoaXMuaXNBZnRlcihsZWZ0LCB1bml0KVxuICAgICAgICAgICAgOiAhdGhpcy5pc0JlZm9yZShsZWZ0LCB1bml0KTtcbiAgICAgICAgY29uc3QgaXNSaWdodEluUmFuZ2UgPSByaWdodEluY2x1c2l2aXR5XG4gICAgICAgICAgICA/IHRoaXMuaXNCZWZvcmUocmlnaHQsIHVuaXQpXG4gICAgICAgICAgICA6ICF0aGlzLmlzQWZ0ZXIocmlnaHQsIHVuaXQpO1xuICAgICAgICByZXR1cm4gaXNMZWZ0SW5SYW5nZSAmJiBpc1JpZ2h0SW5SYW5nZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmbGF0dGVuZWQgb2JqZWN0IG9mIHRoZSBkYXRlLiBEb2VzIG5vdCBpbmNsdWRlIGxpdGVyYWxzXG4gICAgICogQHBhcmFtIGxvY2FsZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZVxuICAgICAqL1xuICAgIHBhcnRzKGxvY2FsZSA9IHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSwgdGVtcGxhdGUgPSB7IGRhdGVTdHlsZTogJ2Z1bGwnLCB0aW1lU3R5bGU6ICdsb25nJyB9KSB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0ge307XG4gICAgICAgIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgdGVtcGxhdGUpXG4gICAgICAgICAgICAuZm9ybWF0VG9QYXJ0cyh0aGlzKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4geC50eXBlICE9PSAnbGl0ZXJhbCcpXG4gICAgICAgICAgICAuZm9yRWFjaCgoeCkgPT4gKHBhcnRzW3gudHlwZV0gPSB4LnZhbHVlKSk7XG4gICAgICAgIHJldHVybiBwYXJ0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5nZXRTZWNvbmRzKClcbiAgICAgKi9cbiAgICBnZXQgc2Vjb25kcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLnNldFNlY29uZHMoKVxuICAgICAqL1xuICAgIHNldCBzZWNvbmRzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U2Vjb25kcyh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHdvIGRpZ2l0IGhvdXJzXG4gICAgICovXG4gICAgZ2V0IHNlY29uZHNGb3JtYXR0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzKHVuZGVmaW5lZCwgdHdvRGlnaXRUZW1wbGF0ZSkuc2Vjb25kO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLmdldE1pbnV0ZXMoKVxuICAgICAqL1xuICAgIGdldCBtaW51dGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNaW51dGVzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuc2V0TWludXRlcygpXG4gICAgICovXG4gICAgc2V0IG1pbnV0ZXModmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRNaW51dGVzKHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0d28gZGlnaXQgbWludXRlc1xuICAgICAqL1xuICAgIGdldCBtaW51dGVzRm9ybWF0dGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cyh1bmRlZmluZWQsIHR3b0RpZ2l0VGVtcGxhdGUpLm1pbnV0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5nZXRIb3VycygpXG4gICAgICovXG4gICAgZ2V0IGhvdXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRIb3VycygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLnNldEhvdXJzKClcbiAgICAgKi9cbiAgICBzZXQgaG91cnModmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRIb3Vycyh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHdvIGRpZ2l0IGhvdXIsIGUuZy4gMDEuLi4xMFxuICAgICAqIEBwYXJhbSBob3VyQ3ljbGUgUHJvdmlkaW5nIGFuIGhvdXIgY3ljbGUgd2lsbCBjaGFuZ2UgMDAgdG8gMjQgZGVwZW5kaW5nIG9uIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICAgKi9cbiAgICBnZXRIb3Vyc0Zvcm1hdHRlZChob3VyQ3ljbGUgPSAnaDEyJykge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cyh1bmRlZmluZWQsIHsgLi4udHdvRGlnaXRUZW1wbGF0ZSwgaG91ckN5Y2xlOiBob3VyQ3ljbGUgfSlcbiAgICAgICAgICAgIC5ob3VyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1lcmlkaWVtIG9mIHRoZSBkYXRlLiBFLmcuIEFNIG9yIFBNLlxuICAgICAqIElmIHRoZSB7QGxpbmsgbG9jYWxlfSBwcm92aWRlcyBhIFwiZGF5UGVyaW9kXCIgdGhlbiB0aGlzIHdpbGwgYmUgcmV0dXJuZWQsXG4gICAgICogb3RoZXJ3aXNlIGl0IHdpbGwgcmV0dXJuIEFNIG9yIFBNLlxuICAgICAqIEBwYXJhbSBsb2NhbGVcbiAgICAgKi9cbiAgICBtZXJpZGllbShsb2NhbGUgPSB0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwge1xuICAgICAgICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgICAgICAgaG91cjEyOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgICAgICAgLmZvcm1hdFRvUGFydHModGhpcylcbiAgICAgICAgICAgIC5maW5kKChwKSA9PiBwLnR5cGUgPT09ICdkYXlQZXJpb2QnKT8udmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0RGF0ZSgpXG4gICAgICovXG4gICAgZ2V0IGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5zZXREYXRlKClcbiAgICAgKi9cbiAgICBzZXQgZGF0ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldERhdGUodmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdHdvIGRpZ2l0IGRhdGVcbiAgICAgKi9cbiAgICBnZXQgZGF0ZUZvcm1hdHRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHModW5kZWZpbmVkLCB0d29EaWdpdFRlbXBsYXRlKS5kYXk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0RGF5KClcbiAgICAgKi9cbiAgICBnZXQgd2Vla0RheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF5KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0TW9udGgoKVxuICAgICAqL1xuICAgIGdldCBtb250aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TW9udGgoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5zZXRNb250aCgpXG4gICAgICovXG4gICAgc2V0IG1vbnRoKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldE1vbnRoID0gbmV3IERhdGUodGhpcy55ZWFyLCB2YWx1ZSArIDEpO1xuICAgICAgICB0YXJnZXRNb250aC5zZXREYXRlKDApO1xuICAgICAgICBjb25zdCBlbmRPZk1vbnRoID0gdGFyZ2V0TW9udGguZ2V0RGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5kYXRlID4gZW5kT2ZNb250aCkge1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gZW5kT2ZNb250aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldE1vbnRoKHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHR3byBkaWdpdCwgaHVtYW4gZXhwZWN0ZWQgbW9udGguIEUuZy4gSmFudWFyeSA9IDEsIERlY2VtYmVyID0gMTJcbiAgICAgKi9cbiAgICBnZXQgbW9udGhGb3JtYXR0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzKHVuZGVmaW5lZCwgdHdvRGlnaXRUZW1wbGF0ZSkubW9udGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAqL1xuICAgIGdldCB5ZWFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdWxsWWVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLnNldEZ1bGxZZWFyKClcbiAgICAgKi9cbiAgICBzZXQgeWVhcih2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldEZ1bGxZZWFyKHZhbHVlKTtcbiAgICB9XG4gICAgLy8gYm9ycm93ZWQgYSBidW5jaCBvZiBzdHVmZiBmcm9tIEx1eG9uXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgd2VlayBvZiB0aGUgeWVhclxuICAgICAqL1xuICAgIGdldCB3ZWVrKCkge1xuICAgICAgICBjb25zdCBvcmRpbmFsID0gdGhpcy5jb21wdXRlT3JkaW5hbCgpLCB3ZWVrZGF5ID0gdGhpcy5nZXRVVENEYXkoKTtcbiAgICAgICAgbGV0IHdlZWtOdW1iZXIgPSBNYXRoLmZsb29yKChvcmRpbmFsIC0gd2Vla2RheSArIDEwKSAvIDcpO1xuICAgICAgICBpZiAod2Vla051bWJlciA8IDEpIHtcbiAgICAgICAgICAgIHdlZWtOdW1iZXIgPSB0aGlzLndlZWtzSW5XZWVrWWVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHdlZWtOdW1iZXIgPiB0aGlzLndlZWtzSW5XZWVrWWVhcigpKSB7XG4gICAgICAgICAgICB3ZWVrTnVtYmVyID0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2Vla051bWJlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHdlZWtzIGluIHRoZSB5ZWFyXG4gICAgICovXG4gICAgd2Vla3NJbldlZWtZZWFyKCkge1xuICAgICAgICBjb25zdCBwMSA9ICh0aGlzLnllYXIgK1xuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLnllYXIgLyA0KSAtXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMueWVhciAvIDEwMCkgK1xuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLnllYXIgLyA0MDApKSAlXG4gICAgICAgICAgICA3LCBsYXN0ID0gdGhpcy55ZWFyIC0gMSwgcDIgPSAobGFzdCArXG4gICAgICAgICAgICBNYXRoLmZsb29yKGxhc3QgLyA0KSAtXG4gICAgICAgICAgICBNYXRoLmZsb29yKGxhc3QgLyAxMDApICtcbiAgICAgICAgICAgIE1hdGguZmxvb3IobGFzdCAvIDQwMCkpICVcbiAgICAgICAgICAgIDc7XG4gICAgICAgIHJldHVybiBwMSA9PT0gNCB8fCBwMiA9PT0gMyA/IDUzIDogNTI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gaWYgdGhlIHllYXIgaXMgYSBsZWFwIHllYXIgb3Igbm90LlxuICAgICAqL1xuICAgIGdldCBpc0xlYXBZZWFyKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMueWVhciAlIDQgPT09IDAgJiYgKHRoaXMueWVhciAlIDEwMCAhPT0gMCB8fCB0aGlzLnllYXIgJSA0MDAgPT09IDApKTtcbiAgICB9XG4gICAgY29tcHV0ZU9yZGluYWwoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlICtcbiAgICAgICAgICAgICh0aGlzLmlzTGVhcFllYXIgPyB0aGlzLmxlYXBMYWRkZXIgOiB0aGlzLm5vbkxlYXBMYWRkZXIpW3RoaXMubW9udGhdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgbW9udGggdmFsdWVzIGJhc2VkIG9uIHRoZSBjdXJyZW50IGxvY2FsZVxuICAgICAqL1xuICAgIGdldEFsbE1vbnRocyhmb3JtYXQgPSAnbG9uZycpIHtcbiAgICAgICAgY29uc3QgYXBwbHlGb3JtYXQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUsIHtcbiAgICAgICAgICAgIG1vbnRoOiBmb3JtYXQsXG4gICAgICAgIH0pLmZvcm1hdDtcbiAgICAgICAgcmV0dXJuIFsuLi5BcnJheSgxMikua2V5cygpXS5tYXAoKG0pID0+IGFwcGx5Rm9ybWF0KG5ldyBEYXRlKDIwMjEsIG0pKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIGFuIGV4cGFuZGVkIHRva2VuIHNldCAoZS5nLiBMVC9MVFMpXG4gICAgICovXG4gICAgcmVwbGFjZVRva2Vucyhmb3JtYXRTdHIsIGZvcm1hdHMpIHtcbiAgICAgICAgLyoqKlxuICAgICAgICAgKiBfID0+IG1hdGNoXG4gICAgICAgICAqIGEgPT4gZmlyc3QgY2FwdHVyZSBncm91cC4gQW55dGhpbmcgYmV0d2VlbiBbIGFuZCBdXG4gICAgICAgICAqIGIgPT4gc2Vjb25kIGNhcHR1cmUgZ3JvdXBcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmb3JtYXRTdHIucmVwbGFjZSgvKFxcW1teW1xcXV0qXSl8KExUUz98bHsxLDR9fEx7MSw0fSkvZywgKF8sIGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IEIgPSBiICYmIGIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBhIHx8IGZvcm1hdHNbQl0gfHwgRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmRhdGVGb3JtYXRzW0JdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcGFyc2VUd29EaWdpdFllYXIoaW5wdXQpIHtcbiAgICAgICAgaW5wdXQgPSAraW5wdXQ7XG4gICAgICAgIHJldHVybiBpbnB1dCArIChpbnB1dCA+IDY4ID8gMTkwMCA6IDIwMDApO1xuICAgIH1cbiAgICBvZmZzZXRGcm9tU3RyaW5nKHN0cmluZykge1xuICAgICAgICBpZiAoIXN0cmluZylcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBpZiAoc3RyaW5nID09PSAnWicpXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgY29uc3QgW2ZpcnN0LCBzZWNvbmQsIHRoaXJkXSA9IHN0cmluZy5tYXRjaCgvKFsrLV18XFxkXFxkKS9nKTtcbiAgICAgICAgY29uc3QgbWludXRlcyA9ICsoc2Vjb25kICogNjApICsgKCt0aGlyZCB8fCAwKTtcbiAgICAgICAgY29uc3Qgc2lnbmVkID0gZmlyc3QgPT09ICcrJyA/IC1taW51dGVzIDogbWludXRlcztcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMgPT09IDAgPyAwIDogc2lnbmVkOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHogPSAtNCwgenogPSAtMDQsIHp6eiA9IC0wNDAwXG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKiBAcGFyYW0gc3R5bGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHpvbmVJbmZvcm1hdGlvbihkYXRlLCBzdHlsZSkge1xuICAgICAgICBsZXQgbmFtZSA9IGRhdGVcbiAgICAgICAgICAgIC5wYXJ0cyh0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUsIHsgdGltZVpvbmVOYW1lOiAnbG9uZ09mZnNldCcgfSlcbiAgICAgICAgICAgIC50aW1lWm9uZU5hbWUucmVwbGFjZSgnR01UJywgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgnOicsICcnKTtcbiAgICAgICAgY29uc3QgbmVnYXRpdmUgPSBuYW1lLmluY2x1ZGVzKCctJyk7XG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoJy0nLCAnJyk7XG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ3onKVxuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDEsIDIpO1xuICAgICAgICBlbHNlIGlmIChzdHlsZSA9PT0gJ3p6JylcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZygwLCAyKTtcbiAgICAgICAgcmV0dXJuIGAke25lZ2F0aXZlID8gJy0nIDogJyd9JHtuYW1lfWA7XG4gICAgfVxuICAgIGFkZElucHV0KHByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiAodGltZSwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgIHRpbWVbcHJvcGVydHldID0gK2lucHV0O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBtZXJpZGllbU1hdGNoKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IG1lcmlkaWVtID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlLCB7XG4gICAgICAgICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICBob3VyMTI6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZm9ybWF0VG9QYXJ0cyhuZXcgRGF0ZSgyMDIyLCAzLCA0LCAxMykpXG4gICAgICAgICAgICAuZmluZCgocCkgPT4gcC50eXBlID09PSAnZGF5UGVyaW9kJyk/LnZhbHVlO1xuICAgICAgICByZXR1cm4gaW5wdXQudG9Mb3dlckNhc2UoKSA9PT0gbWVyaWRpZW0udG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgY29ycmVjdEhvdXJzKHRpbWUpIHtcbiAgICAgICAgY29uc3QgeyBhZnRlcm5vb24gfSA9IHRpbWU7XG4gICAgICAgIGlmIChhZnRlcm5vb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgeyBob3VycyB9ID0gdGltZTtcbiAgICAgICAgICAgIGlmIChhZnRlcm5vb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoaG91cnMgPCAxMikge1xuICAgICAgICAgICAgICAgICAgICB0aW1lLmhvdXJzICs9IDEyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgICAgICAgICAgIHRpbWUuaG91cnMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHRpbWUuYWZ0ZXJub29uO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1ha2VQYXJzZXIoZm9ybWF0KSB7XG4gICAgICAgIGZvcm1hdCA9IHRoaXMucmVwbGFjZVRva2Vucyhmb3JtYXQsIHRoaXMubG9jYWxpemF0aW9uLmRhdGVGb3JtYXRzKTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBmb3JtYXQubWF0Y2godGhpcy5mb3JtYXR0aW5nVG9rZW5zKTtcbiAgICAgICAgY29uc3QgeyBsZW5ndGggfSA9IGFycmF5O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IGFycmF5W2ldO1xuICAgICAgICAgICAgY29uc3QgcGFyc2VUbyA9IHRoaXMuZXhwcmVzc2lvbnNbdG9rZW5dO1xuICAgICAgICAgICAgY29uc3QgcmVnZXggPSBwYXJzZVRvICYmIHBhcnNlVG9bMF07XG4gICAgICAgICAgICBjb25zdCBwYXJzZXIgPSBwYXJzZVRvICYmIHBhcnNlVG9bMV07XG4gICAgICAgICAgICBpZiAocGFyc2VyKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSB7IHJlZ2V4LCBwYXJzZXIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gdG9rZW4ucmVwbGFjZSgvXlxcW1teW1xcXV0qXSQvZywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB7XG4gICAgICAgICAgICAgICAgaG91cnM6IDAsXG4gICAgICAgICAgICAgICAgbWludXRlczogMCxcbiAgICAgICAgICAgICAgICBzZWNvbmRzOiAwLFxuICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kczogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgc3RhcnQgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ICs9IHRva2VuLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVnZXgsIHBhcnNlciB9ID0gdG9rZW47XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQgPSBpbnB1dC5zbGljZShzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhwYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmNhbGwodGhpcywgdGltZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UodmFsdWUsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvcnJlY3RIb3Vycyh0aW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0aW1lO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBjcmVhdGUgYSBEYXRlVGltZSBmcm9tIGEgc3RyaW5nLlxuICAgICAqIEBwYXJhbSBpbnB1dCBkYXRlIGFzIHN0cmluZ1xuICAgICAqIEBwYXJhbSBsb2NhbGl6YXRpb24gcHJvdmlkZXMgdGhlIGRhdGUgdGVtcGxhdGUgdGhlIHN0cmluZyBpcyBpbiB2aWEgdGhlIGZvcm1hdCBwcm9wZXJ0eVxuICAgICAqL1xuICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIHN0YXRpYyBmcm9tU3RyaW5nKGlucHV0LCBsb2NhbGl6YXRpb24pIHtcbiAgICAgICAgaWYgKCFsb2NhbGl6YXRpb24/LmZvcm1hdCkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY3VzdG9tRGF0ZUZvcm1hdEVycm9yKCdObyBmb3JtYXQgd2FzIHByb3ZpZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGVUaW1lKCk7XG4gICAgICAgICAgICBkdC5zZXRMb2NhbGl6YXRpb24obG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgIGlmIChbJ3gnLCAnWCddLmluZGV4T2YobG9jYWxpemF0aW9uLmZvcm1hdCkgPiAtMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKChsb2NhbGl6YXRpb24uZm9ybWF0ID09PSAnWCcgPyAxMDAwIDogMSkgKiAraW5wdXQpO1xuICAgICAgICAgICAgY29uc3QgcGFyc2VyID0gZHQubWFrZVBhcnNlcihsb2NhbGl6YXRpb24uZm9ybWF0KTtcbiAgICAgICAgICAgIGNvbnN0IHsgeWVhciwgbW9udGgsIGRheSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcywgem9uZSB9ID0gcGFyc2VyKGlucHV0KTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBkYXkgfHwgKCF5ZWFyICYmICFtb250aCA/IGR0LmdldERhdGUoKSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHllYXIgfHwgZHQuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIGxldCBNID0gMDtcbiAgICAgICAgICAgIGlmICghKHllYXIgJiYgIW1vbnRoKSkge1xuICAgICAgICAgICAgICAgIE0gPSBtb250aCA+IDAgPyBtb250aCAtIDEgOiBkdC5nZXRNb250aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHpvbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKERhdGUuVVRDKHksIE0sIGQsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMgKyB6b25lLm9mZnNldCAqIDYwICogMTAwMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZSh5LCBNLCBkLCBob3VycywgbWludXRlcywgc2Vjb25kcywgbWlsbGlzZWNvbmRzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY3VzdG9tRGF0ZUZvcm1hdEVycm9yKGBVbmFibGUgdG8gcGFyc2UgcHJvdmlkZWQgaW5wdXQ6ICR7aW5wdXR9LCBmb3JtYXQ6ICR7bG9jYWxpemF0aW9uLmZvcm1hdH1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIGZvcm1hdC5cbiAgICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvSW50bC9EYXRlVGltZUZvcm1hdFxuICAgICAqIGZvciB2YWxpZCB0ZW1wbGF0ZXMgYW5kIGxvY2FsZSBvYmplY3RzXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIEFuIG9wdGlvbmFsIG9iamVjdC4gSWYgcHJvdmlkZWQsIG1ldGhvZCB3aWxsIHVzZSBJbnRsLiwgb3RoZXJ3aXNlIHRoZSBsb2NhbGl6YXRpb25zIGZvcm1hdCBwcm9wZXJ0aWVzXG4gICAgICogQHBhcmFtIGxvY2FsZSBDYW4gYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncy4gVXNlcyBicm93c2VyIGRlZmF1bHRzIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBmb3JtYXQodGVtcGxhdGUsIGxvY2FsZSA9IHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSkge1xuICAgICAgICBpZiAodGVtcGxhdGUgJiYgdHlwZW9mIHRlbXBsYXRlID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHRlbXBsYXRlKS5mb3JtYXQodGhpcyk7XG4gICAgICAgIGNvbnN0IGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZVRva2VucyhcbiAgICAgICAgLy90cnkgdGVtcGxhdGUgZmlyc3RcbiAgICAgICAgdGVtcGxhdGUgfHxcbiAgICAgICAgICAgIC8vb3RoZXJ3aXNlIHRyeSBsb2NhbGl6YXRpb24gZm9ybWF0XG4gICAgICAgICAgICB0aGlzLmxvY2FsaXphdGlvbi5mb3JtYXQgfHxcbiAgICAgICAgICAgIC8vb3RoZXJ3aXNlIHRyeSBkYXRlICsgdGltZVxuICAgICAgICAgICAgYCR7RGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmRhdGVGb3JtYXRzLkx9LCAke0RlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5kYXRlRm9ybWF0cy5MVH1gLCB0aGlzLmxvY2FsaXphdGlvbi5kYXRlRm9ybWF0cyk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9ICh0ZW1wbGF0ZSkgPT4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlLCB0ZW1wbGF0ZSkuZm9ybWF0KHRoaXMpO1xuICAgICAgICBpZiAoIXRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZSlcbiAgICAgICAgICAgIHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZSA9IGd1ZXNzSG91ckN5Y2xlKHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSk7XG4gICAgICAgIC8vaWYgdGhlIGZvcm1hdCBhc2tzIGZvciBhIHR3ZW50eS1mb3VyLWhvdXIgc3RyaW5nIGJ1dCB0aGUgaG91ciBjeWNsZSBpcyBub3QsIHRoZW4gbWFrZSBhIGJhc2UgZ3Vlc3NcbiAgICAgICAgY29uc3QgSEhDeWNsZSA9IHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZS5zdGFydHNXaXRoKCdoMScpXG4gICAgICAgICAgICA/ICdoMjQnXG4gICAgICAgICAgICA6IHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZTtcbiAgICAgICAgY29uc3QgaGhDeWNsZSA9IHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZS5zdGFydHNXaXRoKCdoMicpXG4gICAgICAgICAgICA/ICdoMTInXG4gICAgICAgICAgICA6IHRoaXMubG9jYWxpemF0aW9uLmhvdXJDeWNsZTtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHtcbiAgICAgICAgICAgIHl5OiBmb3JtYXR0ZXIoeyB5ZWFyOiAnMi1kaWdpdCcgfSksXG4gICAgICAgICAgICB5eXl5OiB0aGlzLnllYXIsXG4gICAgICAgICAgICBNOiBmb3JtYXR0ZXIoeyBtb250aDogJ251bWVyaWMnIH0pLFxuICAgICAgICAgICAgTU06IHRoaXMubW9udGhGb3JtYXR0ZWQsXG4gICAgICAgICAgICBNTU06IHRoaXMuZ2V0QWxsTW9udGhzKCdzaG9ydCcpW3RoaXMuZ2V0TW9udGgoKV0sXG4gICAgICAgICAgICBNTU1NOiB0aGlzLmdldEFsbE1vbnRocygpW3RoaXMuZ2V0TW9udGgoKV0sXG4gICAgICAgICAgICBkOiB0aGlzLmRhdGUsXG4gICAgICAgICAgICBkZDogdGhpcy5kYXRlRm9ybWF0dGVkLFxuICAgICAgICAgICAgZGRkOiBmb3JtYXR0ZXIoeyB3ZWVrZGF5OiAnc2hvcnQnIH0pLFxuICAgICAgICAgICAgZGRkZDogZm9ybWF0dGVyKHsgd2Vla2RheTogJ2xvbmcnIH0pLFxuICAgICAgICAgICAgSDogdGhpcy5nZXRIb3VycygpLFxuICAgICAgICAgICAgSEg6IHRoaXMuZ2V0SG91cnNGb3JtYXR0ZWQoSEhDeWNsZSksXG4gICAgICAgICAgICBoOiB0aGlzLmhvdXJzID4gMTIgPyB0aGlzLmhvdXJzIC0gMTIgOiB0aGlzLmhvdXJzLFxuICAgICAgICAgICAgaGg6IHRoaXMuZ2V0SG91cnNGb3JtYXR0ZWQoaGhDeWNsZSksXG4gICAgICAgICAgICB0OiB0aGlzLm1lcmlkaWVtKCksXG4gICAgICAgICAgICBUOiB0aGlzLm1lcmlkaWVtKCkudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgIG06IHRoaXMubWludXRlcyxcbiAgICAgICAgICAgIG1tOiB0aGlzLm1pbnV0ZXNGb3JtYXR0ZWQsXG4gICAgICAgICAgICBzOiB0aGlzLnNlY29uZHMsXG4gICAgICAgICAgICBzczogdGhpcy5zZWNvbmRzRm9ybWF0dGVkLFxuICAgICAgICAgICAgZmZmOiB0aGlzLmdldE1pbGxpc2Vjb25kcygpLFxuICAgICAgICAgICAgLy8gejogdGhpcy56b25lSW5mb3JtYXRpb24oZGF0ZVRpbWUsICd6JyksIC8vLTRcbiAgICAgICAgICAgIC8vIHp6OiB0aGlzLnpvbmVJbmZvcm1hdGlvbihkYXRlVGltZSwgJ3p6JyksIC8vLTA0XG4gICAgICAgICAgICAvLyB6eno6IHRoaXMuem9uZUluZm9ybWF0aW9uKGRhdGVUaW1lLCAnenp6JykgLy8tMDQwMFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZm9ybWF0U3RyaW5nXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLmRhdGVUaW1lUmVnZXgsIChtYXRjaCwgJDEpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkMSB8fCBtYXRjaGVzW21hdGNoXTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXFsvZywgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXS9nLCAnJyk7XG4gICAgfVxufVxuXG5jbGFzcyBTZXJ2aWNlTG9jYXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGxvY2F0ZShpZGVudGlmaWVyKSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSB0aGlzLmNhY2hlLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHNlcnZpY2UpXG4gICAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBuZXcgaWRlbnRpZmllcigpO1xuICAgICAgICB0aGlzLmNhY2hlLnNldChpZGVudGlmaWVyLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5jb25zdCBzZXR1cFNlcnZpY2VMb2NhdG9yID0gKCkgPT4ge1xuICAgIHNlcnZpY2VMb2NhdG9yID0gbmV3IFNlcnZpY2VMb2NhdG9yKCk7XG59O1xubGV0IHNlcnZpY2VMb2NhdG9yO1xuXG5jb25zdCBDYWxlbmRhck1vZGVzID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ2NhbGVuZGFyJyxcbiAgICAgICAgY2xhc3NOYW1lOiBOYW1lc3BhY2UuY3NzLmRheXNDb250YWluZXIsXG4gICAgICAgIHVuaXQ6IFVuaXQubW9udGgsXG4gICAgICAgIHN0ZXA6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdtb250aHMnLFxuICAgICAgICBjbGFzc05hbWU6IE5hbWVzcGFjZS5jc3MubW9udGhzQ29udGFpbmVyLFxuICAgICAgICB1bml0OiBVbml0LnllYXIsXG4gICAgICAgIHN0ZXA6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd5ZWFycycsXG4gICAgICAgIGNsYXNzTmFtZTogTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lcixcbiAgICAgICAgdW5pdDogVW5pdC55ZWFyLFxuICAgICAgICBzdGVwOiAxMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2RlY2FkZXMnLFxuICAgICAgICBjbGFzc05hbWU6IE5hbWVzcGFjZS5jc3MuZGVjYWRlc0NvbnRhaW5lcixcbiAgICAgICAgdW5pdDogVW5pdC55ZWFyLFxuICAgICAgICBzdGVwOiAxMDAsXG4gICAgfSxcbl07XG5cbmNsYXNzIE9wdGlvbnNTdG9yZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRDYWxlbmRhclZpZXdNb2RlID0gMDtcbiAgICAgICAgdGhpcy5fdmlld0RhdGUgPSBuZXcgRGF0ZVRpbWUoKTtcbiAgICAgICAgdGhpcy5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSAnY2FsZW5kYXInO1xuICAgIH1cbiAgICBnZXQgY3VycmVudENhbGVuZGFyVmlld01vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZTtcbiAgICB9XG4gICAgc2V0IGN1cnJlbnRDYWxlbmRhclZpZXdNb2RlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRDYWxlbmRhclZpZXdNb2RlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSBDYWxlbmRhck1vZGVzW3ZhbHVlXS5uYW1lO1xuICAgIH1cbiAgICBnZXQgdmlld0RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWV3RGF0ZTtcbiAgICB9XG4gICAgc2V0IHZpZXdEYXRlKHYpIHtcbiAgICAgICAgdGhpcy5fdmlld0RhdGUgPSB2O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnZpZXdEYXRlID0gdjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hlbiBzd2l0Y2hpbmcgYmFjayB0byB0aGUgY2FsZW5kYXIgZnJvbSB0aGUgY2xvY2ssXG4gICAgICogdGhpcyBzZXRzIGN1cnJlbnRWaWV3IHRvIHRoZSBjb3JyZWN0IGNhbGVuZGFyIHZpZXcuXG4gICAgICovXG4gICAgcmVmcmVzaEN1cnJlbnRWaWV3KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gQ2FsZW5kYXJNb2Rlc1t0aGlzLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlXS5uYW1lO1xuICAgIH1cbiAgICBnZXQgaXNUd2VsdmVIb3VyKCkge1xuICAgICAgICByZXR1cm4gWydoMTInLCAnaDExJ10uaW5jbHVkZXModGhpcy5vcHRpb25zLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBNYWluIGNsYXNzIGZvciBkYXRlIHZhbGlkYXRpb24gcnVsZXMgYmFzZWQgb24gdGhlIG9wdGlvbnMgcHJvdmlkZWQuXG4gKi9cbmNsYXNzIFZhbGlkYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSB0YXJnZXQgZGF0ZSBpcyB2YWxpZCBiYXNlZCBvbiB0aGUgcnVsZXMgcHJvdmlkZWQgaW4gdGhlIG9wdGlvbnMuXG4gICAgICogR3JhbnVsYXJpdHkgY2FuIGJlIHByb3ZpZGVkIHRvIGNoZWNrIHBvcnRpb25zIG9mIHRoZSBkYXRlIGluc3RlYWQgb2YgdGhlIHdob2xlLlxuICAgICAqIEBwYXJhbSB0YXJnZXREYXRlXG4gICAgICogQHBhcmFtIGdyYW51bGFyaXR5XG4gICAgICovXG4gICAgaXNWYWxpZCh0YXJnZXREYXRlLCBncmFudWxhcml0eSkge1xuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWREaXNhYmxlZERhdGVzSXNWYWxpZChncmFudWxhcml0eSwgdGFyZ2V0RGF0ZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChncmFudWxhcml0eSAhPT0gVW5pdC5tb250aCAmJlxuICAgICAgICAgICAgZ3JhbnVsYXJpdHkgIT09IFVuaXQueWVhciAmJlxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGF5c09mV2Vla0Rpc2FibGVkPy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kYXlzT2ZXZWVrRGlzYWJsZWQuaW5kZXhPZih0YXJnZXREYXRlLndlZWtEYXkpICE9PSAtMSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLl9taW5NYXhJc1ZhbGlkKGdyYW51bGFyaXR5LCB0YXJnZXREYXRlKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGdyYW51bGFyaXR5ID09PSBVbml0LmhvdXJzIHx8XG4gICAgICAgICAgICBncmFudWxhcml0eSA9PT0gVW5pdC5taW51dGVzIHx8XG4gICAgICAgICAgICBncmFudWxhcml0eSA9PT0gVW5pdC5zZWNvbmRzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWREaXNhYmxlZEhvdXJzSXNWYWxpZCh0YXJnZXREYXRlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWRUaW1lSW50ZXJ2YWxzPy5maWx0ZXIoKGludGVybmFsKSA9PiB0YXJnZXREYXRlLmlzQmV0d2VlbihpbnRlcm5hbC5mcm9tLCBpbnRlcm5hbC50bykpLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9lbmFibGVkRGlzYWJsZWREYXRlc0lzVmFsaWQoZ3JhbnVsYXJpdHksIHRhcmdldERhdGUpIHtcbiAgICAgICAgaWYgKGdyYW51bGFyaXR5ICE9PSBVbml0LmRhdGUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkRGF0ZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgdGhpcy5faXNJbkRpc2FibGVkRGF0ZXModGFyZ2V0RGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub2luc3BlY3Rpb24gUmVkdW5kYW50SWZTdGF0ZW1lbnRKU1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZERhdGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICF0aGlzLl9pc0luRW5hYmxlZERhdGVzKHRhcmdldERhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIGRpc2FibGVkRGF0ZXMgb3B0aW9uIGlzIGluIHVzZSBhbmQgcmV0dXJucyB0cnVlIChtZWFuaW5nIGludmFsaWQpXG4gICAgICogaWYgdGhlIGB0ZXN0RGF0ZWAgaXMgd2l0aCBpbiB0aGUgYXJyYXkuIEdyYW51bGFyaXR5IGlzIGJ5IGRhdGUuXG4gICAgICogQHBhcmFtIHRlc3REYXRlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNJbkRpc2FibGVkRGF0ZXModGVzdERhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZERhdGVzIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZERhdGVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWREYXRlcy5maW5kKCh4KSA9PiB4LmlzU2FtZSh0ZXN0RGF0ZSwgVW5pdC5kYXRlKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIGVuYWJsZWREYXRlcyBvcHRpb24gaXMgaW4gdXNlIGFuZCByZXR1cm5zIHRydWUgKG1lYW5pbmcgdmFsaWQpXG4gICAgICogaWYgdGhlIGB0ZXN0RGF0ZWAgaXMgd2l0aCBpbiB0aGUgYXJyYXkuIEdyYW51bGFyaXR5IGlzIGJ5IGRhdGUuXG4gICAgICogQHBhcmFtIHRlc3REYXRlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNJbkVuYWJsZWREYXRlcyh0ZXN0RGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWREYXRlcyB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZERhdGVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gISF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkRGF0ZXMuZmluZCgoeCkgPT4geC5pc1NhbWUodGVzdERhdGUsIFVuaXQuZGF0ZSkpO1xuICAgIH1cbiAgICBfbWluTWF4SXNWYWxpZChncmFudWxhcml0eSwgdGFyZ2V0RGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMubWluRGF0ZSAmJlxuICAgICAgICAgICAgdGFyZ2V0RGF0ZS5pc0JlZm9yZSh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5taW5EYXRlLCBncmFudWxhcml0eSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub2luc3BlY3Rpb24gUmVkdW5kYW50SWZTdGF0ZW1lbnRKU1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMubWF4RGF0ZSAmJlxuICAgICAgICAgICAgdGFyZ2V0RGF0ZS5pc0FmdGVyKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLm1heERhdGUsIGdyYW51bGFyaXR5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBfZW5hYmxlZERpc2FibGVkSG91cnNJc1ZhbGlkKHRhcmdldERhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkSG91cnMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgdGhpcy5faXNJbkRpc2FibGVkSG91cnModGFyZ2V0RGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub2luc3BlY3Rpb24gUmVkdW5kYW50SWZTdGF0ZW1lbnRKU1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZEhvdXJzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICF0aGlzLl9pc0luRW5hYmxlZEhvdXJzKHRhcmdldERhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIGRpc2FibGVkSG91cnMgb3B0aW9uIGlzIGluIHVzZSBhbmQgcmV0dXJucyB0cnVlIChtZWFuaW5nIGludmFsaWQpXG4gICAgICogaWYgdGhlIGB0ZXN0RGF0ZWAgaXMgd2l0aCBpbiB0aGUgYXJyYXkuIEdyYW51bGFyaXR5IGlzIGJ5IGhvdXJzLlxuICAgICAqIEBwYXJhbSB0ZXN0RGF0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzSW5EaXNhYmxlZEhvdXJzKHRlc3REYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWRIb3VycyB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWRIb3Vycy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSB0ZXN0RGF0ZS5ob3VycztcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkSG91cnMuaW5jbHVkZXMoZm9ybWF0dGVkRGF0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIGVuYWJsZWRIb3VycyBvcHRpb24gaXMgaW4gdXNlIGFuZCByZXR1cm5zIHRydWUgKG1lYW5pbmcgdmFsaWQpXG4gICAgICogaWYgdGhlIGB0ZXN0RGF0ZWAgaXMgd2l0aCBpbiB0aGUgYXJyYXkuIEdyYW51bGFyaXR5IGlzIGJ5IGhvdXJzLlxuICAgICAqIEBwYXJhbSB0ZXN0RGF0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzSW5FbmFibGVkSG91cnModGVzdERhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkSG91cnMgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWRIb3Vycy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IHRlc3REYXRlLmhvdXJzO1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZEhvdXJzLmluY2x1ZGVzKGZvcm1hdHRlZERhdGUpO1xuICAgIH1cbiAgICBkYXRlUmFuZ2VJc1ZhbGlkKGRhdGVzLCBpbmRleCwgdGFyZ2V0KSB7XG4gICAgICAgIC8vIGlmIHdlJ3JlIG5vdCB1c2luZyB0aGUgb3B0aW9uLCB0aGVuIHJldHVybiB2YWxpZFxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGF0ZVJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vIGlmIHdlJ3ZlIG9ubHkgc2VsZWN0ZWQgMC4uMSBkYXRlcywgYW5kIHdlJ3JlIG5vdCBzZXR0aW5nIHRoZSBlbmQgZGF0ZVxuICAgICAgICAvLyB0aGVuIHJldHVybiB2YWxpZC4gV2Ugb25seSB3YW50IHRvIHZhbGlkYXRlIHRoZSByYW5nZSBpZiBib3RoIGFyZSBzZWxlY3RlZCxcbiAgICAgICAgLy8gYmVjYXVzZSB0aGUgb3RoZXIgdmFsaWRhdGlvbiBvbiB0aGUgdGFyZ2V0IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuICAgICAgICBpZiAoZGF0ZXMubGVuZ3RoICE9PSAyICYmIGluZGV4ICE9PSAxKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vIGluaXRpYWxpemUgc3RhcnQgZGF0ZVxuICAgICAgICBjb25zdCBzdGFydCA9IGRhdGVzWzBdLmNsb25lO1xuICAgICAgICAvLyBjaGVjayBpZiBzdGFydCBkYXRlIGlzIG5vdCB0aGUgc2FtZSBhcyB0YXJnZXQgZGF0ZVxuICAgICAgICBpZiAoc3RhcnQuaXNTYW1lKHRhcmdldCwgVW5pdC5kYXRlKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyBhZGQgb25lIGRheSB0byBzdGFydDsgc3RhcnQgaGFzIGFscmVhZHkgYmVlbiB2YWxpZGF0ZWRcbiAgICAgICAgc3RhcnQubWFuaXB1bGF0ZSgxLCBVbml0LmRhdGUpO1xuICAgICAgICAvLyBjaGVjayBlYWNoIGRhdGUgaW4gdGhlIHJhbmdlIHRvIG1ha2Ugc3VyZSBpdCdzIHZhbGlkXG4gICAgICAgIHdoaWxlICghc3RhcnQuaXNTYW1lKHRhcmdldCwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLmlzVmFsaWQoc3RhcnQsIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICBpZiAoIXZhbGlkKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHN0YXJ0Lm1hbmlwdWxhdGUoMSwgVW5pdC5kYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSBbXTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzLnVuc3Vic2NyaWJlLmJpbmQodGhpcywgdGhpcy5zdWJzY3JpYmVycy5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmUoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBlbWl0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSBudWxsO1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gW107XG4gICAgfVxufVxuY2xhc3MgRXZlbnRFbWl0dGVycyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLnZpZXdVcGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHRoaXMudXBkYXRlVmlld0RhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy52aWV3VXBkYXRlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5hY3Rpb24uZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXdEYXRlLmRlc3Ryb3koKTtcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRFbkxvY2FsaXphdGlvbiA9IHtcbiAgICBjbGVhcjogJ0NsZWFyIHNlbGVjdGlvbicsXG4gICAgY2xvc2U6ICdDbG9zZSB0aGUgcGlja2VyJyxcbiAgICBkYXRlRm9ybWF0czogRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmRhdGVGb3JtYXRzLFxuICAgIGRheVZpZXdIZWFkZXJGb3JtYXQ6IHsgbW9udGg6ICdsb25nJywgeWVhcjogJzItZGlnaXQnIH0sXG4gICAgZGVjcmVtZW50SG91cjogJ0RlY3JlbWVudCBIb3VyJyxcbiAgICBkZWNyZW1lbnRNaW51dGU6ICdEZWNyZW1lbnQgTWludXRlJyxcbiAgICBkZWNyZW1lbnRTZWNvbmQ6ICdEZWNyZW1lbnQgU2Vjb25kJyxcbiAgICBmb3JtYXQ6IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5mb3JtYXQsXG4gICAgaG91ckN5Y2xlOiBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEuaG91ckN5Y2xlLFxuICAgIGluY3JlbWVudEhvdXI6ICdJbmNyZW1lbnQgSG91cicsXG4gICAgaW5jcmVtZW50TWludXRlOiAnSW5jcmVtZW50IE1pbnV0ZScsXG4gICAgaW5jcmVtZW50U2Vjb25kOiAnSW5jcmVtZW50IFNlY29uZCcsXG4gICAgbG9jYWxlOiBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEubG9jYWxlLFxuICAgIG5leHRDZW50dXJ5OiAnTmV4dCBDZW50dXJ5JyxcbiAgICBuZXh0RGVjYWRlOiAnTmV4dCBEZWNhZGUnLFxuICAgIG5leHRNb250aDogJ05leHQgTW9udGgnLFxuICAgIG5leHRZZWFyOiAnTmV4dCBZZWFyJyxcbiAgICBvcmRpbmFsOiBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEub3JkaW5hbCxcbiAgICBwaWNrSG91cjogJ1BpY2sgSG91cicsXG4gICAgcGlja01pbnV0ZTogJ1BpY2sgTWludXRlJyxcbiAgICBwaWNrU2Vjb25kOiAnUGljayBTZWNvbmQnLFxuICAgIHByZXZpb3VzQ2VudHVyeTogJ1ByZXZpb3VzIENlbnR1cnknLFxuICAgIHByZXZpb3VzRGVjYWRlOiAnUHJldmlvdXMgRGVjYWRlJyxcbiAgICBwcmV2aW91c01vbnRoOiAnUHJldmlvdXMgTW9udGgnLFxuICAgIHByZXZpb3VzWWVhcjogJ1ByZXZpb3VzIFllYXInLFxuICAgIHNlbGVjdERhdGU6ICdTZWxlY3QgRGF0ZScsXG4gICAgc2VsZWN0RGVjYWRlOiAnU2VsZWN0IERlY2FkZScsXG4gICAgc2VsZWN0TW9udGg6ICdTZWxlY3QgTW9udGgnLFxuICAgIHNlbGVjdFRpbWU6ICdTZWxlY3QgVGltZScsXG4gICAgc2VsZWN0WWVhcjogJ1NlbGVjdCBZZWFyJyxcbiAgICBzdGFydE9mVGhlV2VlazogMCxcbiAgICB0b2RheTogJ0dvIHRvIHRvZGF5JyxcbiAgICB0b2dnbGVNZXJpZGllbTogJ1RvZ2dsZSBNZXJpZGllbScsXG59O1xuY29uc3QgRGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgYWxsb3dJbnB1dFRvZ2dsZTogZmFsc2UsXG4gICAgY29udGFpbmVyOiB1bmRlZmluZWQsXG4gICAgZGF0ZVJhbmdlOiBmYWxzZSxcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgZGVmYXVsdERhdGU6IHVuZGVmaW5lZCxcbiAgICBkaXNwbGF5OiB7XG4gICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICB0eXBlOiAnaWNvbnMnLFxuICAgICAgICAgICAgdGltZTogJ2ZhLXNvbGlkIGZhLWNsb2NrJyxcbiAgICAgICAgICAgIGRhdGU6ICdmYS1zb2xpZCBmYS1jYWxlbmRhcicsXG4gICAgICAgICAgICB1cDogJ2ZhLXNvbGlkIGZhLWFycm93LXVwJyxcbiAgICAgICAgICAgIGRvd246ICdmYS1zb2xpZCBmYS1hcnJvdy1kb3duJyxcbiAgICAgICAgICAgIHByZXZpb3VzOiAnZmEtc29saWQgZmEtY2hldnJvbi1sZWZ0JyxcbiAgICAgICAgICAgIG5leHQ6ICdmYS1zb2xpZCBmYS1jaGV2cm9uLXJpZ2h0JyxcbiAgICAgICAgICAgIHRvZGF5OiAnZmEtc29saWQgZmEtY2FsZW5kYXItY2hlY2snLFxuICAgICAgICAgICAgY2xlYXI6ICdmYS1zb2xpZCBmYS10cmFzaCcsXG4gICAgICAgICAgICBjbG9zZTogJ2ZhLXNvbGlkIGZhLXhtYXJrJyxcbiAgICAgICAgfSxcbiAgICAgICAgc2lkZUJ5U2lkZTogZmFsc2UsXG4gICAgICAgIGNhbGVuZGFyV2Vla3M6IGZhbHNlLFxuICAgICAgICB2aWV3TW9kZTogJ2NhbGVuZGFyJyxcbiAgICAgICAgdG9vbGJhclBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICAgIGtlZXBPcGVuOiBmYWxzZSxcbiAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgdG9kYXk6IGZhbHNlLFxuICAgICAgICAgICAgY2xlYXI6IGZhbHNlLFxuICAgICAgICAgICAgY2xvc2U6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBjYWxlbmRhcjogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGU6IHRydWUsXG4gICAgICAgICAgICBtb250aDogdHJ1ZSxcbiAgICAgICAgICAgIHllYXI6IHRydWUsXG4gICAgICAgICAgICBkZWNhZGVzOiB0cnVlLFxuICAgICAgICAgICAgY2xvY2s6IHRydWUsXG4gICAgICAgICAgICBob3VyczogdHJ1ZSxcbiAgICAgICAgICAgIG1pbnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBzZWNvbmRzOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZVR3ZW50eWZvdXJIb3VyOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICAgIGlubGluZTogZmFsc2UsXG4gICAgICAgIHRoZW1lOiAnYXV0bycsXG4gICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgfSxcbiAgICBrZWVwSW52YWxpZDogZmFsc2UsXG4gICAgbG9jYWxpemF0aW9uOiBkZWZhdWx0RW5Mb2NhbGl6YXRpb24sXG4gICAgbWV0YToge30sXG4gICAgbXVsdGlwbGVEYXRlczogZmFsc2UsXG4gICAgbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJzsgJyxcbiAgICBwcm9tcHRUaW1lT25EYXRlQ2hhbmdlOiBmYWxzZSxcbiAgICBwcm9tcHRUaW1lT25EYXRlQ2hhbmdlVHJhbnNpdGlvbkRlbGF5OiAyMDAsXG4gICAgcmVzdHJpY3Rpb25zOiB7XG4gICAgICAgIG1pbkRhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4RGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICBkaXNhYmxlZERhdGVzOiBbXSxcbiAgICAgICAgZW5hYmxlZERhdGVzOiBbXSxcbiAgICAgICAgZGF5c09mV2Vla0Rpc2FibGVkOiBbXSxcbiAgICAgICAgZGlzYWJsZWRUaW1lSW50ZXJ2YWxzOiBbXSxcbiAgICAgICAgZGlzYWJsZWRIb3VyczogW10sXG4gICAgICAgIGVuYWJsZWRIb3VyczogW10sXG4gICAgfSxcbiAgICBzdGVwcGluZzogMSxcbiAgICB1c2VDdXJyZW50OiB0cnVlLFxuICAgIHZpZXdEYXRlOiBuZXcgRGF0ZVRpbWUoKSxcbn07XG5jb25zdCBEZWZhdWx0RW5Mb2NhbGl6YXRpb24gPSB7IC4uLmRlZmF1bHRFbkxvY2FsaXphdGlvbiB9O1xuXG4vKipcbiAqIEF0dGVtcHRzIHRvIHByb3ZlIGBkYCBpcyBhIERhdGVUaW1lIG9yIERhdGUgb3IgY2FuIGJlIGNvbnZlcnRlZCBpbnRvIG9uZS5cbiAqIEBwYXJhbSBkIElmIGEgc3RyaW5nIHdpbGwgYXR0ZW1wdCBjcmVhdGluZyBhIGRhdGUgZnJvbSBpdC5cbiAqIEBwYXJhbSBsb2NhbGl6YXRpb24gb2JqZWN0IGNvbnRhaW5pbmcgbG9jYWxlIGFuZCBmb3JtYXQgc2V0dGluZ3MuIE9ubHkgdXNlZCB3aXRoIHRoZSBjdXN0b20gZm9ybWF0c1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdHJ5Q29udmVydFRvRGF0ZVRpbWUoZCwgbG9jYWxpemF0aW9uKSB7XG4gICAgaWYgKCFkKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBpZiAoZC5jb25zdHJ1Y3Rvci5uYW1lID09PSBEYXRlVGltZS5uYW1lKVxuICAgICAgICByZXR1cm4gZDtcbiAgICBpZiAoZC5jb25zdHJ1Y3Rvci5uYW1lID09PSBEYXRlLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIERhdGVUaW1lLmNvbnZlcnQoZCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZCA9PT0gdHlwZW9mICcnKSB7XG4gICAgICAgIGNvbnN0IGRhdGVUaW1lID0gRGF0ZVRpbWUuZnJvbVN0cmluZyhkLCBsb2NhbGl6YXRpb24pO1xuICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoZGF0ZVRpbWUpID09PSAnbnVsbCcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlVGltZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vKipcbiAqIEF0dGVtcHRzIHRvIGNvbnZlcnQgYGRgIHRvIGEgRGF0ZVRpbWUgb2JqZWN0XG4gKiBAcGFyYW0gZCB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0gb3B0aW9uTmFtZSBQcm92aWRlcyB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzIGUuZy4gZGlzYWJsZWREYXRlc1xuICogQHBhcmFtIGxvY2FsaXphdGlvbiBvYmplY3QgY29udGFpbmluZyBsb2NhbGUgYW5kIGZvcm1hdCBzZXR0aW5ncy4gT25seSB1c2VkIHdpdGggdGhlIGN1c3RvbSBmb3JtYXRzXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRUb0RhdGVUaW1lKGQsIG9wdGlvbk5hbWUsIGxvY2FsaXphdGlvbikge1xuICAgIGlmICh0eXBlb2YgZCA9PT0gdHlwZW9mICcnICYmIG9wdGlvbk5hbWUgIT09ICdpbnB1dCcpIHtcbiAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuZGF0ZVN0cmluZygpO1xuICAgIH1cbiAgICBjb25zdCBjb252ZXJ0ZWQgPSB0cnlDb252ZXJ0VG9EYXRlVGltZShkLCBsb2NhbGl6YXRpb24pO1xuICAgIGlmICghY29udmVydGVkKSB7XG4gICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmZhaWxlZFRvUGFyc2VEYXRlKG9wdGlvbk5hbWUsIGQsIG9wdGlvbk5hbWUgPT09ICdpbnB1dCcpO1xuICAgIH1cbiAgICByZXR1cm4gY29udmVydGVkO1xufVxuLyoqXG4gKiBUeXBlIGNoZWNrcyB0aGF0IGB2YWx1ZWAgaXMgYW4gYXJyYXkgb2YgRGF0ZSBvciBEYXRlVGltZVxuICogQHBhcmFtIG9wdGlvbk5hbWUgUHJvdmlkZXMgdGV4dCB0byBlcnJvciBtZXNzYWdlcyBlLmcuIGRpc2FibGVkRGF0ZXNcbiAqIEBwYXJhbSB2YWx1ZSBPcHRpb24gdmFsdWVcbiAqIEBwYXJhbSBwcm92aWRlZFR5cGUgVXNlZCB0byBwcm92aWRlIHRleHQgdG8gZXJyb3IgbWVzc2FnZXNcbiAqIEBwYXJhbSBsb2NhbGl6YXRpb25cbiAqL1xuZnVuY3Rpb24gdHlwZUNoZWNrRGF0ZUFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxucHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24gPSBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChvcHRpb25OYW1lLCBwcm92aWRlZFR5cGUsICdhcnJheSBvZiBEYXRlVGltZSBvciBEYXRlJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZCA9IHZhbHVlW2ldO1xuICAgICAgICBjb25zdCBkYXRlVGltZSA9IGNvbnZlcnRUb0RhdGVUaW1lKGQsIG9wdGlvbk5hbWUsIGxvY2FsaXphdGlvbik7XG4gICAgICAgIGRhdGVUaW1lLnNldExvY2FsaXphdGlvbihsb2NhbGl6YXRpb24pO1xuICAgICAgICB2YWx1ZVtpXSA9IGRhdGVUaW1lO1xuICAgIH1cbn1cbi8qKlxuICogVHlwZSBjaGVja3MgdGhhdCBgdmFsdWVgIGlzIGFuIGFycmF5IG9mIG51bWJlcnNcbiAqIEBwYXJhbSBvcHRpb25OYW1lIFByb3ZpZGVzIHRleHQgdG8gZXJyb3IgbWVzc2FnZXMgZS5nLiBkaXNhYmxlZERhdGVzXG4gKiBAcGFyYW0gdmFsdWUgT3B0aW9uIHZhbHVlXG4gKiBAcGFyYW0gcHJvdmlkZWRUeXBlIFVzZWQgdG8gcHJvdmlkZSB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzXG4gKi9cbmZ1bmN0aW9uIHR5cGVDaGVja051bWJlckFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxucHJvdmlkZWRUeXBlKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5zb21lKCh4KSA9PiB0eXBlb2YgeCAhPT0gdHlwZW9mIDApKSB7XG4gICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChvcHRpb25OYW1lLCBwcm92aWRlZFR5cGUsICdhcnJheSBvZiBudW1iZXJzJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYW5kYXRvcnlEYXRlKGtleSkge1xuICAgIHJldHVybiAoeyB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24gfSkgPT4ge1xuICAgICAgICBjb25zdCBkYXRlVGltZSA9IGNvbnZlcnRUb0RhdGVUaW1lKHZhbHVlLCBrZXksIGxvY2FsaXphdGlvbik7XG4gICAgICAgIGlmIChkYXRlVGltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXRlVGltZS5zZXRMb2NhbGl6YXRpb24obG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlVGltZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBvcHRpb25hbERhdGUoa2V5KSB7XG4gICAgY29uc3QgbWFuZGF0b3J5ID0gbWFuZGF0b3J5RGF0ZShrZXkpO1xuICAgIHJldHVybiAoYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFuZGF0b3J5KGFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudW1iZXJzSW5SYW5nZShrZXksIGxvd2VyLCB1cHBlcikge1xuICAgIHJldHVybiAoeyB2YWx1ZSwgcHJvdmlkZWRUeXBlIH0pID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICB0eXBlQ2hlY2tOdW1iZXJBcnJheShrZXksIHZhbHVlLCBwcm92aWRlZFR5cGUpO1xuICAgICAgICBpZiAodmFsdWUuc29tZSgoeCkgPT4geCA8IGxvd2VyIHx8IHggPiB1cHBlcikpXG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5udW1iZXJzT3V0T2ZSYW5nZShrZXksIGxvd2VyLCB1cHBlcik7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdmFsaWRIb3VyUmFuZ2Uoa2V5KSB7XG4gICAgcmV0dXJuIG51bWJlcnNJblJhbmdlKGtleSwgMCwgMjMpO1xufVxuZnVuY3Rpb24gdmFsaWREYXRlQXJyYXkoa2V5KSB7XG4gICAgcmV0dXJuICh7IHZhbHVlLCBwcm92aWRlZFR5cGUsIGxvY2FsaXphdGlvbiB9KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgdHlwZUNoZWNrRGF0ZUFycmF5KGtleSwgdmFsdWUsIHByb3ZpZGVkVHlwZSwgbG9jYWxpemF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59XG5mdW5jdGlvbiB2YWxpZEtleU9wdGlvbihrZXlPcHRpb25zKSB7XG4gICAgcmV0dXJuICh7IHZhbHVlLCBwYXRoIH0pID0+IHtcbiAgICAgICAgaWYgKCFrZXlPcHRpb25zLmluY2x1ZGVzKHZhbHVlKSlcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnVuZXhwZWN0ZWRPcHRpb25WYWx1ZShwYXRoLnN1YnN0cmluZygxKSwgdmFsdWUsIGtleU9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn1cbmNvbnN0IG9wdGlvblByb2Nlc3NvcnMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBkZWZhdWx0RGF0ZTogbWFuZGF0b3J5RGF0ZSgnZGVmYXVsdERhdGUnKSxcbiAgICB2aWV3RGF0ZTogbWFuZGF0b3J5RGF0ZSgndmlld0RhdGUnKSxcbiAgICBtaW5EYXRlOiBvcHRpb25hbERhdGUoJ3Jlc3RyaWN0aW9ucy5taW5EYXRlJyksXG4gICAgbWF4RGF0ZTogb3B0aW9uYWxEYXRlKCdyZXN0cmljdGlvbnMubWF4RGF0ZScpLFxuICAgIGRpc2FibGVkSG91cnM6IHZhbGlkSG91clJhbmdlKCdyZXN0cmljdGlvbnMuZGlzYWJsZWRIb3VycycpLFxuICAgIGVuYWJsZWRIb3VyczogdmFsaWRIb3VyUmFuZ2UoJ3Jlc3RyaWN0aW9ucy5lbmFibGVkSG91cnMnKSxcbiAgICBkaXNhYmxlZERhdGVzOiB2YWxpZERhdGVBcnJheSgncmVzdHJpY3Rpb25zLmRpc2FibGVkRGF0ZXMnKSxcbiAgICBlbmFibGVkRGF0ZXM6IHZhbGlkRGF0ZUFycmF5KCdyZXN0cmljdGlvbnMuZW5hYmxlZERhdGVzJyksXG4gICAgZGF5c09mV2Vla0Rpc2FibGVkOiBudW1iZXJzSW5SYW5nZSgncmVzdHJpY3Rpb25zLmRheXNPZldlZWtEaXNhYmxlZCcsIDAsIDYpLFxuICAgIGRpc2FibGVkVGltZUludGVydmFsczogKHsga2V5LCB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24gfSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChrZXksIHByb3ZpZGVkVHlwZSwgJ2FycmF5IG9mIHsgZnJvbTogRGF0ZVRpbWV8RGF0ZSwgdG86IERhdGVUaW1lfERhdGUgfScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlT2JqZWN0ID0gdmFsdWU7IC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVPYmplY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlT2JqZWN0W2ldKS5mb3JFYWNoKCh2aykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk9wdGlvbk5hbWUgPSBgJHtrZXl9WyR7aX1dLiR7dmt9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBkID0gdmFsdWVPYmplY3RbaV1bdmtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVUaW1lID0gY29udmVydFRvRGF0ZVRpbWUoZCwgc3ViT3B0aW9uTmFtZSwgbG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgICAgICBkYXRlVGltZS5zZXRMb2NhbGl6YXRpb24obG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgICAgICB2YWx1ZU9iamVjdFtpXVt2a10gPSBkYXRlVGltZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZU9iamVjdDtcbiAgICB9LFxuICAgIHRvb2xiYXJQbGFjZW1lbnQ6IHZhbGlkS2V5T3B0aW9uKFsndG9wJywgJ2JvdHRvbScsICdkZWZhdWx0J10pLFxuICAgIHR5cGU6IHZhbGlkS2V5T3B0aW9uKFsnaWNvbnMnLCAnc3ByaXRlcyddKSxcbiAgICB2aWV3TW9kZTogdmFsaWRLZXlPcHRpb24oW1xuICAgICAgICAnY2xvY2snLFxuICAgICAgICAnY2FsZW5kYXInLFxuICAgICAgICAnbW9udGhzJyxcbiAgICAgICAgJ3llYXJzJyxcbiAgICAgICAgJ2RlY2FkZXMnLFxuICAgIF0pLFxuICAgIHRoZW1lOiB2YWxpZEtleU9wdGlvbihbJ2xpZ2h0JywgJ2RhcmsnLCAnYXV0byddKSxcbiAgICBwbGFjZW1lbnQ6IHZhbGlkS2V5T3B0aW9uKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgICBtZXRhOiAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSxcbiAgICBkYXlWaWV3SGVhZGVyRm9ybWF0OiAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSxcbiAgICBjb250YWluZXI6ICh7IHZhbHVlLCBwYXRoIH0pID0+IHtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICAhKHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHxcbiAgICAgICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIEVsZW1lbnQgfHxcbiAgICAgICAgICAgICAgICB2YWx1ZT8uYXBwZW5kQ2hpbGQpKSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy50eXBlTWlzbWF0Y2gocGF0aC5zdWJzdHJpbmcoMSksIHR5cGVvZiB2YWx1ZSwgJ0hUTUxFbGVtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgdXNlVHdlbnR5Zm91ckhvdXI6ICh7IHZhbHVlLCBwYXRoLCBwcm92aWRlZFR5cGUsIGRlZmF1bHRUeXBlIH0pID0+IHtcbiAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuZGVwcmVjYXRlZFdhcm5pbmcoJ3VzZVR3ZW50eWZvdXJIb3VyJywgJ1BsZWFzZSB1c2UgXCJvcHRpb25zLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGVcIiBpbnN0ZWFkJyk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHByb3ZpZGVkVHlwZSA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy50eXBlTWlzbWF0Y2gocGF0aCwgcHJvdmlkZWRUeXBlLCBkZWZhdWx0VHlwZSk7XG4gICAgfSxcbiAgICBob3VyQ3ljbGU6IHZhbGlkS2V5T3B0aW9uKFsnaDExJywgJ2gxMicsICdoMjMnLCAnaDI0J10pLFxufSk7XG5jb25zdCBkZWZhdWx0UHJvY2Vzc29yID0gKHsgdmFsdWUsIGRlZmF1bHRUeXBlLCBwcm92aWRlZFR5cGUsIHBhdGgsIH0pID0+IHtcbiAgICBzd2l0Y2ggKGRlZmF1bHRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09IHRydWU7XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICByZXR1cm4gK3ZhbHVlO1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChwYXRoLCBwcm92aWRlZFR5cGUsIGRlZmF1bHRUeXBlKTtcbiAgICB9XG59O1xuZnVuY3Rpb24gcHJvY2Vzc0tleShhcmdzKSB7XG4gICAgcmV0dXJuIChvcHRpb25Qcm9jZXNzb3JzW2FyZ3Mua2V5XSB8fCBkZWZhdWx0UHJvY2Vzc29yKShhcmdzKTtcbn1cblxuY2xhc3MgT3B0aW9uQ29udmVydGVyIHtcbiAgICBzdGF0aWMgZGVlcENvcHkoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgbyA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhpbnB1dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBpbnB1dFtrZXldO1xuICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudCBpbnN0YW5jZW9mIERhdGVUaW1lKSB7XG4gICAgICAgICAgICAgICAgb1trZXldID0gaW5wdXRFbGVtZW50LmNsb25lO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0RWxlbWVudCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBuZXcgRGF0ZShpbnB1dEVsZW1lbnQudmFsdWVPZigpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvW2tleV0gPSBpbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0RWxlbWVudCAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fFxuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGlucHV0RWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBPcHRpb25Db252ZXJ0ZXIuZGVlcENvcHkoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kcyB2YWx1ZSBvdXQgb2YgYW4gb2JqZWN0IGJhc2VkIG9uIGEgc3RyaW5nLCBwZXJpb2QgZGVsaW1pdGVkLCBwYXRoXG4gICAgICogQHBhcmFtIHBhdGhzXG4gICAgICogQHBhcmFtIG9ialxuICAgICAqL1xuICAgIHN0YXRpYyBvYmplY3RQYXRoKHBhdGhzLCBvYmopIHtcbiAgICAgICAgaWYgKHBhdGhzLmNoYXJBdCgwKSA9PT0gJy4nKVxuICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5zbGljZSgxKTtcbiAgICAgICAgaWYgKCFwYXRocylcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIHJldHVybiBwYXRoc1xuICAgICAgICAgICAgLnNwbGl0KCcuJylcbiAgICAgICAgICAgIC5yZWR1Y2UoKHZhbHVlLCBrZXkpID0+IE9wdGlvbkNvbnZlcnRlci5pc1ZhbHVlKHZhbHVlKSB8fCBPcHRpb25Db252ZXJ0ZXIuaXNWYWx1ZSh2YWx1ZVtrZXldKVxuICAgICAgICAgICAgPyB2YWx1ZVtrZXldXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCwgb2JqKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHNwcmVhZCBvcGVyYXRvciBjYXVzZWQgc3ViIGtleXMgdG8gYmUgbWlzc2luZyBhZnRlciBtZXJnaW5nLlxuICAgICAqIFRoaXMgaXMgdG8gZml4IHRoYXQgaXNzdWUgYnkgdXNpbmcgc3ByZWFkIG9uIHRoZSBjaGlsZCBvYmplY3RzIGZpcnN0LlxuICAgICAqIEFsc28gaGFuZGxlcyBjb21wbGV4IG9wdGlvbnMgbGlrZSBkaXNhYmxlZERhdGVzXG4gICAgICogQHBhcmFtIHByb3ZpZGVkIEFuIG9wdGlvbiBmcm9tIG5ldyBwcm92aWRlZE9wdGlvbnNcbiAgICAgKiBAcGFyYW0gY29weVRvIERlc3RpbmF0aW9uIG9iamVjdC4gVGhpcyB3YXMgYWRkZWQgdG8gcHJldmVudCByZWZlcmVuY2UgY29waWVzXG4gICAgICogQHBhcmFtIGxvY2FsaXphdGlvblxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICovXG4gICAgc3RhdGljIHNwcmVhZChwcm92aWRlZCwgY29weVRvLCBsb2NhbGl6YXRpb24sIHBhdGggPSAnJykge1xuICAgICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IE9wdGlvbkNvbnZlcnRlci5vYmplY3RQYXRoKHBhdGgsIERlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgY29uc3QgdW5zdXBwb3J0ZWRPcHRpb25zID0gT2JqZWN0LmtleXMocHJvdmlkZWQpLmZpbHRlcigoeCkgPT4gIU9iamVjdC5rZXlzKGRlZmF1bHRPcHRpb25zKS5pbmNsdWRlcyh4KSk7XG4gICAgICAgIGlmICh1bnN1cHBvcnRlZE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmxhdHRlbmVkT3B0aW9ucyA9IE9wdGlvbkNvbnZlcnRlci5nZXRGbGF0dGVuRGVmYXVsdE9wdGlvbnMoKTtcbiAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IHVuc3VwcG9ydGVkT3B0aW9ucy5tYXAoKHgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBgXCIke3BhdGh9LiR7eH1cIiBpbiBub3QgYSBrbm93biBvcHRpb24uYDtcbiAgICAgICAgICAgICAgICBjb25zdCBkaWRZb3VNZWFuID0gZmxhdHRlbmVkT3B0aW9ucy5maW5kKCh5KSA9PiB5LmluY2x1ZGVzKHgpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlkWW91TWVhbilcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgKz0gYCBEaWQgeW91IG1lYW4gXCIke2RpZFlvdU1lYW59XCI/YDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnVuZXhwZWN0ZWRPcHRpb25zKGVycm9ycyk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMocHJvdmlkZWQpXG4gICAgICAgICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gJ19fcHJvdG9fXycgJiYga2V5ICE9PSAnY29uc3RydWN0b3InKVxuICAgICAgICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgcGF0aCArPSBgLiR7a2V5fWA7XG4gICAgICAgICAgICBpZiAocGF0aC5jaGFyQXQoMCkgPT09ICcuJylcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zbGljZSgxKTtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25WYWx1ZSA9IGRlZmF1bHRPcHRpb25zW2tleV07XG4gICAgICAgICAgICBjb25zdCBwcm92aWRlZFR5cGUgPSB0eXBlb2YgcHJvdmlkZWRba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRUeXBlID0gdHlwZW9mIGRlZmF1bHRPcHRpb25WYWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvdmlkZWRba2V5XTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29weVRvW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sYXN0SW5kZXhPZihgLiR7a2V5fWApKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmF1bHRPcHRpb25WYWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheShwcm92aWRlZFtrZXldKSAmJlxuICAgICAgICAgICAgICAgICEoZGVmYXVsdE9wdGlvblZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICAgICAgICAgICAgICAgICBPcHRpb25Db252ZXJ0ZXIuaWdub3JlUHJvcGVydGllcy5pbmNsdWRlcyhrZXkpKSkge1xuICAgICAgICAgICAgICAgIE9wdGlvbkNvbnZlcnRlci5zcHJlYWQocHJvdmlkZWRba2V5XSwgY29weVRvW2tleV0sIGxvY2FsaXphdGlvbiwgcGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3B5VG9ba2V5XSA9IE9wdGlvbkNvbnZlcnRlci5wcm9jZXNzS2V5KGtleSwgdmFsdWUsIHByb3ZpZGVkVHlwZSwgZGVmYXVsdFR5cGUsIHBhdGgsIGxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sYXN0SW5kZXhPZihgLiR7a2V5fWApKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBwcm9jZXNzS2V5KGtleSwgdmFsdWUsIC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcHJvdmlkZWRUeXBlLCBkZWZhdWx0VHlwZSwgcGF0aCwgbG9jYWxpemF0aW9uKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzS2V5KHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgcHJvdmlkZWRUeXBlLFxuICAgICAgICAgICAgZGVmYXVsdFR5cGUsXG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbG9jYWxpemF0aW9uLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIF9tZXJnZU9wdGlvbnMocHJvdmlkZWRPcHRpb25zLCBtZXJnZVRvKSB7XG4gICAgICAgIGNvbnN0IG5ld0NvbmZpZyA9IE9wdGlvbkNvbnZlcnRlci5kZWVwQ29weShtZXJnZVRvKTtcbiAgICAgICAgLy9zZWUgaWYgdGhlIG9wdGlvbnMgc3BlY2lmeSBhIGxvY2FsZVxuICAgICAgICBjb25zdCBsb2NhbGl6YXRpb24gPSBtZXJnZVRvLmxvY2FsaXphdGlvbj8ubG9jYWxlICE9PSAnZGVmYXVsdCdcbiAgICAgICAgICAgID8gbWVyZ2VUby5sb2NhbGl6YXRpb25cbiAgICAgICAgICAgIDogcHJvdmlkZWRPcHRpb25zPy5sb2NhbGl6YXRpb24gfHwgRGVmYXVsdE9wdGlvbnMubG9jYWxpemF0aW9uO1xuICAgICAgICBPcHRpb25Db252ZXJ0ZXIuc3ByZWFkKHByb3ZpZGVkT3B0aW9ucywgbmV3Q29uZmlnLCBsb2NhbGl6YXRpb24sICcnKTtcbiAgICAgICAgcmV0dXJuIG5ld0NvbmZpZztcbiAgICB9XG4gICAgc3RhdGljIF9kYXRhVG9PcHRpb25zKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZURhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVsZW1lbnQuZGF0YXNldCkpO1xuICAgICAgICBpZiAoZURhdGE/LnRkVGFyZ2V0SW5wdXQpXG4gICAgICAgICAgICBkZWxldGUgZURhdGEudGRUYXJnZXRJbnB1dDtcbiAgICAgICAgaWYgKGVEYXRhPy50ZFRhcmdldFRvZ2dsZSlcbiAgICAgICAgICAgIGRlbGV0ZSBlRGF0YS50ZFRhcmdldFRvZ2dsZTtcbiAgICAgICAgaWYgKCFlRGF0YSB8fFxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZURhdGEpLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgZURhdGEuY29uc3RydWN0b3IgIT09IERPTVN0cmluZ01hcClcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICBjb25zdCBkYXRhT3B0aW9ucyA9IHt9O1xuICAgICAgICAvLyBiZWNhdXNlIGRhdGFzZXQgcmV0dXJucyBjYW1lbENhc2UgaW5jbHVkaW5nIHRoZSAndGQnIGtleSB0aGUgb3B0aW9uXG4gICAgICAgIC8vIGtleSB3b24ndCBhbGlnblxuICAgICAgICBjb25zdCBvYmplY3RUb05vcm1hbGl6ZWQgPSAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb3dlcmVkID0ge307XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goKHgpID0+IHtcbiAgICAgICAgICAgICAgICBsb3dlcmVkW3gudG9Mb3dlckNhc2UoKV0gPSB4O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbG93ZXJlZDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplT2JqZWN0ID0gdGhpcy5ub3JtYWxpemVPYmplY3Qob2JqZWN0VG9Ob3JtYWxpemVkKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uc0xvd2VyID0gb2JqZWN0VG9Ob3JtYWxpemVkKG9wdGlvbnMpO1xuICAgICAgICBPYmplY3Qua2V5cyhlRGF0YSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguc3RhcnRzV2l0aChOYW1lc3BhY2UuZGF0YUtleSkpXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4LnN1YnN0cmluZygyKSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBrZXlPcHRpb24gPSBvcHRpb25zTG93ZXJba2V5LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgICAgLy8gZGF0YXNldCBtZXJnZXMgZGFzaGVzIHRvIGNhbWVsQ2FzZS4uLiB5YXlcbiAgICAgICAgICAgIC8vIGkuZS4ga2V5ID0gZGlzcGxheV9jb21wb25lbnRzX3NlY29uZHNcbiAgICAgICAgICAgIGlmIChrZXkuaW5jbHVkZXMoJ18nKSkge1xuICAgICAgICAgICAgICAgIC8vIFtkaXNwbGF5LCBjb21wb25lbnRzLCBzZWNvbmRzXVxuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0ID0ga2V5LnNwbGl0KCdfJyk7XG4gICAgICAgICAgICAgICAgLy8gZGlzcGxheVxuICAgICAgICAgICAgICAgIGtleU9wdGlvbiA9IG9wdGlvbnNMb3dlcltzcGxpdFswXS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5T3B0aW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXlPcHRpb25dLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YU9wdGlvbnNba2V5T3B0aW9uXSA9IG5vcm1hbGl6ZU9iamVjdChzcGxpdCwgMSwgb3B0aW9uc1trZXlPcHRpb25dLCBlRGF0YVtgdGQke2tleX1gXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3Iga2V5ID0gbXVsdGlwbGVEYXRlXG4gICAgICAgICAgICBlbHNlIGlmIChrZXlPcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRhdGFPcHRpb25zW2tleU9wdGlvbl0gPSBlRGF0YVtgdGQke2tleX1gXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXJnZU9wdGlvbnMoZGF0YU9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvL3RvZG8gY2xlYW4gdGhpcyB1cFxuICAgIHN0YXRpYyBub3JtYWxpemVPYmplY3Qob2JqZWN0VG9Ob3JtYWxpemVkKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZU9iamVjdCA9IChzcGxpdCwgaW5kZXgsIG9wdGlvblN1Ymdyb3VwLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gZmlyc3Qgcm91bmQgPSBkaXNwbGF5IHsgLi4uIH1cbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRPcHRpb25zID0gb2JqZWN0VG9Ob3JtYWxpemVkKG9wdGlvblN1Ymdyb3VwKTtcbiAgICAgICAgICAgIGNvbnN0IGtleU9wdGlvbiA9IG5vcm1hbGl6ZWRPcHRpb25zW3NwbGl0W2luZGV4XS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICAgIGNvbnN0IGludGVybmFsT2JqZWN0ID0ge307XG4gICAgICAgICAgICBpZiAoa2V5T3B0aW9uID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsT2JqZWN0O1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhbm90aGVyIG9iamVjdCwgY29udGludWUgZG93biB0aGUgcmFiYml0IGhvbGVcbiAgICAgICAgICAgIGlmIChvcHRpb25TdWJncm91cFtrZXlPcHRpb25dLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGludGVybmFsT2JqZWN0W2tleU9wdGlvbl0gPSBub3JtYWxpemVPYmplY3Qoc3BsaXQsIGluZGV4LCBvcHRpb25TdWJncm91cFtrZXlPcHRpb25dLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnRlcm5hbE9iamVjdFtrZXlPcHRpb25dID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxPYmplY3Q7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub3JtYWxpemVPYmplY3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIHByb3ZlIGBkYCBpcyBhIERhdGVUaW1lIG9yIERhdGUgb3IgY2FuIGJlIGNvbnZlcnRlZCBpbnRvIG9uZS5cbiAgICAgKiBAcGFyYW0gZCBJZiBhIHN0cmluZyB3aWxsIGF0dGVtcHQgY3JlYXRpbmcgYSBkYXRlIGZyb20gaXQuXG4gICAgICogQHBhcmFtIGxvY2FsaXphdGlvbiBvYmplY3QgY29udGFpbmluZyBsb2NhbGUgYW5kIGZvcm1hdCBzZXR0aW5ncy4gT25seSB1c2VkIHdpdGggdGhlIGN1c3RvbSBmb3JtYXRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzdGF0aWMgX2RhdGVUeXBlQ2hlY2soZCwgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBsb2NhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRyeUNvbnZlcnRUb0RhdGVUaW1lKGQsIGxvY2FsaXphdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFR5cGUgY2hlY2tzIHRoYXQgYHZhbHVlYCBpcyBhbiBhcnJheSBvZiBEYXRlIG9yIERhdGVUaW1lXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWUgUHJvdmlkZXMgdGV4dCB0byBlcnJvciBtZXNzYWdlcyBlLmcuIGRpc2FibGVkRGF0ZXNcbiAgICAgKiBAcGFyYW0gdmFsdWUgT3B0aW9uIHZhbHVlXG4gICAgICogQHBhcmFtIHByb3ZpZGVkVHlwZSBVc2VkIHRvIHByb3ZpZGUgdGV4dCB0byBlcnJvciBtZXNzYWdlc1xuICAgICAqIEBwYXJhbSBsb2NhbGl6YXRpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgX3R5cGVDaGVja0RhdGVBcnJheShvcHRpb25OYW1lLCB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVDaGVja0RhdGVBcnJheShvcHRpb25OYW1lLCB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUeXBlIGNoZWNrcyB0aGF0IGB2YWx1ZWAgaXMgYW4gYXJyYXkgb2YgbnVtYmVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lIFByb3ZpZGVzIHRleHQgdG8gZXJyb3IgbWVzc2FnZXMgZS5nLiBkaXNhYmxlZERhdGVzXG4gICAgICogQHBhcmFtIHZhbHVlIE9wdGlvbiB2YWx1ZVxuICAgICAqIEBwYXJhbSBwcm92aWRlZFR5cGUgVXNlZCB0byBwcm92aWRlIHRleHQgdG8gZXJyb3IgbWVzc2FnZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgX3R5cGVDaGVja051bWJlckFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCBwcm92aWRlZFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVDaGVja051bWJlckFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCBwcm92aWRlZFR5cGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBjb252ZXJ0IGBkYCB0byBhIERhdGVUaW1lIG9iamVjdFxuICAgICAqIEBwYXJhbSBkIHZhbHVlIHRvIGNvbnZlcnRcbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZSBQcm92aWRlcyB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzIGUuZy4gZGlzYWJsZWREYXRlc1xuICAgICAqIEBwYXJhbSBsb2NhbGl6YXRpb24gb2JqZWN0IGNvbnRhaW5pbmcgbG9jYWxlIGFuZCBmb3JtYXQgc2V0dGluZ3MuIE9ubHkgdXNlZCB3aXRoIHRoZSBjdXN0b20gZm9ybWF0c1xuICAgICAqL1xuICAgIHN0YXRpYyBkYXRlQ29udmVyc2lvbihkLCAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIG9wdGlvbk5hbWUsIGxvY2FsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gY29udmVydFRvRGF0ZVRpbWUoZCwgb3B0aW9uTmFtZSwgbG9jYWxpemF0aW9uKTtcbiAgICB9XG4gICAgc3RhdGljIGdldEZsYXR0ZW5EZWZhdWx0T3B0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZsYXR0ZW5EZWZhdWx0cylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mbGF0dGVuRGVmYXVsdHM7XG4gICAgICAgIGNvbnN0IGRlZXBLZXlzID0gKHQsIHByZSA9IFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICBpZiAoT2JqZWN0KHQpID09PSB0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHQpLmZsYXRNYXAoKFtrLCB2XSkgPT4gZGVlcEtleXModiwgWy4uLnByZSwga10pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmUuam9pbignLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9mbGF0dGVuRGVmYXVsdHMgPSBkZWVwS2V5cyhEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9mbGF0dGVuRGVmYXVsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNvbWUgb3B0aW9ucyBjb25mbGljdCBsaWtlIG1pbi9tYXggZGF0ZS4gVmVyaWZ5IHRoYXQgdGhlc2Uga2luZHMgb2Ygb3B0aW9uc1xuICAgICAqIGFyZSBzZXQgY29ycmVjdGx5LlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBzdGF0aWMgX3ZhbGlkYXRlQ29uZmxpY3RzKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLmRpc3BsYXkuc2lkZUJ5U2lkZSAmJlxuICAgICAgICAgICAgKCFjb25maWcuZGlzcGxheS5jb21wb25lbnRzLmNsb2NrIHx8XG4gICAgICAgICAgICAgICAgIShjb25maWcuZGlzcGxheS5jb21wb25lbnRzLmhvdXJzIHx8XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMubWludXRlcyB8fFxuICAgICAgICAgICAgICAgICAgICBjb25maWcuZGlzcGxheS5jb21wb25lbnRzLnNlY29uZHMpKSkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY29uZmxpY3RpbmdDb25maWd1cmF0aW9uKCdDYW5ub3QgdXNlIHNpZGUgYnkgc2lkZSBtb2RlIHdpdGhvdXQgdGhlIGNsb2NrIGNvbXBvbmVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLnJlc3RyaWN0aW9ucy5taW5EYXRlICYmIGNvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZSkge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5yZXN0cmljdGlvbnMubWluRGF0ZS5pc0FmdGVyKGNvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5jb25mbGljdGluZ0NvbmZpZ3VyYXRpb24oJ21pbkRhdGUgaXMgYWZ0ZXIgbWF4RGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZS5pc0JlZm9yZShjb25maWcucmVzdHJpY3Rpb25zLm1pbkRhdGUpKSB7XG4gICAgICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY29uZmxpY3RpbmdDb25maWd1cmF0aW9uKCdtYXhEYXRlIGlzIGJlZm9yZSBtaW5EYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5tdWx0aXBsZURhdGVzICYmIGNvbmZpZy5kYXRlUmFuZ2UpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmNvbmZsaWN0aW5nQ29uZmlndXJhdGlvbignQ2Fubm90IHVzcyBvcHRpb24gXCJtdWx0aXBsZURhdGVzXCIgd2l0aCBcImRhdGVSYW5nZVwiJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5PcHRpb25Db252ZXJ0ZXIuaWdub3JlUHJvcGVydGllcyA9IFtcbiAgICAnbWV0YScsXG4gICAgJ2RheVZpZXdIZWFkZXJGb3JtYXQnLFxuICAgICdjb250YWluZXInLFxuICAgICdkYXRlRm9ybXMnLFxuICAgICdvcmRpbmFsJyxcbl07XG5PcHRpb25Db252ZXJ0ZXIuaXNWYWx1ZSA9IChhKSA9PiBhICE9IG51bGw7IC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IHVuZGVmaW5lZCArIG51bGxcblxuY2xhc3MgRGF0ZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9kYXRlcyA9IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRXZlbnRFbWl0dGVycyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFycmF5IG9mIHNlbGVjdGVkIGRhdGVzXG4gICAgICovXG4gICAgZ2V0IHBpY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLl9kYXRlc107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhc3QgcGlja2VkIHZhbHVlLlxuICAgICAqL1xuICAgIGdldCBsYXN0UGlja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZXNbdGhpcy5sYXN0UGlja2VkSW5kZXhdPy5jbG9uZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHBpY2tlZCBkYXRlcyAtMSBvciAwIGlmIG5vbmUgYXJlIHNlbGVjdGVkLlxuICAgICAqL1xuICAgIGdldCBsYXN0UGlja2VkSW5kZXgoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVzLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvcm1hdHMgYSBEYXRlVGltZSBvYmplY3QgdG8gYSBzdHJpbmcuIFVzZWQgd2hlbiBzZXR0aW5nIHRoZSBpbnB1dCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAqL1xuICAgIGZvcm1hdElucHV0KGRhdGUpIHtcbiAgICAgICAgaWYgKCFkYXRlKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBkYXRlLmxvY2FsaXphdGlvbiA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uO1xuICAgICAgICByZXR1cm4gZGF0ZS5mb3JtYXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogcGFyc2UgdGhlIHZhbHVlIGludG8gYSBEYXRlVGltZSBvYmplY3QuXG4gICAgICogdGhpcyBjYW4gYmUgb3ZlcndyaXR0ZW4gdG8gc3VwcGx5IHlvdXIgb3duIHBhcnNpbmcuXG4gICAgICovXG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHBhcnNlSW5wdXQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbkNvbnZlcnRlci5kYXRlQ29udmVyc2lvbih2YWx1ZSwgJ2lucHV0JywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBjb252ZXJ0IHRoZSBwcm92aWRlZCB2YWx1ZSB0byBhIERhdGVUaW1lIG9iamVjdC5cbiAgICAgKiBJZiB2YWx1ZSBpcyBudWxsfHVuZGVmaW5lZCB0aGVuIGNsZWFyIHRoZSB2YWx1ZSBvZiB0aGUgcHJvdmlkZWQgaW5kZXggKG9yIDApLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBjb252ZXJ0IG9yIG51bGx8dW5kZWZpbmVkXG4gICAgICogQHBhcmFtIGluZGV4IFdoZW4gdXNpbmcgbXVsdGlkYXRlcyB0aGlzIGlzIHRoZSBpbmRleCBpbiB0aGUgYXJyYXlcbiAgICAgKi9cbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgc2V0RnJvbUlucHV0KHZhbHVlLCBpbmRleCkge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHVuZGVmaW5lZCwgaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IHRoaXMucGFyc2VJbnB1dCh2YWx1ZSk7XG4gICAgICAgIGlmIChjb252ZXJ0ZWQpIHtcbiAgICAgICAgICAgIGNvbnZlcnRlZC5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShjb252ZXJ0ZWQsIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbmV3IERhdGVUaW1lIHRvIHNlbGVjdGVkIGRhdGVzIGFycmF5XG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKi9cbiAgICBhZGQoZGF0ZSkge1xuICAgICAgICB0aGlzLl9kYXRlcy5wdXNoKGRhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGB0YXJnZXREYXRlYCBpcyBwYXJ0IG9mIHRoZSBzZWxlY3RlZCBkYXRlcyBhcnJheS5cbiAgICAgKiBJZiBgdW5pdGAgaXMgcHJvdmlkZWQgdGhlbiBhIGdyYW51bGFyaXR5IHRvIHRoYXQgdW5pdCB3aWxsIGJlIHVzZWQuXG4gICAgICogQHBhcmFtIHRhcmdldERhdGVcbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqL1xuICAgIGlzUGlja2VkKHRhcmdldERhdGUsIHVuaXQpIHtcbiAgICAgICAgaWYgKCFEYXRlVGltZS5pc1ZhbGlkKHRhcmdldERhdGUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXVuaXQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZXMuZmluZCgoeCkgPT4geC5pc1NhbWUodGFyZ2V0RGF0ZSkpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGZvcm1hdCA9IGdldEZvcm1hdEJ5VW5pdCh1bml0KTtcbiAgICAgICAgY29uc3QgaW5uZXJEYXRlRm9ybWF0dGVkID0gdGFyZ2V0RGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9kYXRlc1xuICAgICAgICAgICAgLm1hcCgoeCkgPT4geC5mb3JtYXQoZm9ybWF0KSlcbiAgICAgICAgICAgIC5maW5kKCh4KSA9PiB4ID09PSBpbm5lckRhdGVGb3JtYXR0ZWQpICE9PSB1bmRlZmluZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBhdCB3aGljaCBgdGFyZ2V0RGF0ZWAgaXMgaW4gdGhlIGFycmF5LlxuICAgICAqIFRoaXMgaXMgdXNlZCBmb3IgdXBkYXRpbmcgb3IgcmVtb3ZpbmcgYSBkYXRlIHdoZW4gbXVsdGktZGF0ZSBpcyB1c2VkXG4gICAgICogSWYgYHVuaXRgIGlzIHByb3ZpZGVkIHRoZW4gYSBncmFudWxhcml0eSB0byB0aGF0IHVuaXQgd2lsbCBiZSB1c2VkLlxuICAgICAqIEBwYXJhbSB0YXJnZXREYXRlXG4gICAgICogQHBhcmFtIHVuaXRcbiAgICAgKi9cbiAgICBwaWNrZWRJbmRleCh0YXJnZXREYXRlLCB1bml0KSB7XG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZCh0YXJnZXREYXRlKSlcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgaWYgKCF1bml0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVzLm1hcCgoeCkgPT4geC52YWx1ZU9mKCkpLmluZGV4T2YodGFyZ2V0RGF0ZS52YWx1ZU9mKCkpO1xuICAgICAgICBjb25zdCBmb3JtYXQgPSBnZXRGb3JtYXRCeVVuaXQodW5pdCk7XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZUZvcm1hdHRlZCA9IHRhcmdldERhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlcy5tYXAoKHgpID0+IHguZm9ybWF0KGZvcm1hdCkpLmluZGV4T2YoaW5uZXJEYXRlRm9ybWF0dGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGFsbCBzZWxlY3RlZCBkYXRlcy5cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IE5hbWVzcGFjZS5ldmVudHMuY2hhbmdlLFxuICAgICAgICAgICAgZGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb2xkRGF0ZTogdGhpcy5sYXN0UGlja2VkLFxuICAgICAgICAgICAgaXNDbGVhcjogdHJ1ZSxcbiAgICAgICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9kYXRlcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuaW5wdXQpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZURpc3BsYXkuZW1pdCgnYWxsJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIFwiYm9vayBlbmRcIiB5ZWFycyBnaXZlbiBhIGB5ZWFyYCBhbmQgYSBgZmFjdG9yYFxuICAgICAqIEBwYXJhbSBmYWN0b3IgZS5nLiAxMDAgZm9yIGRlY2FkZXNcbiAgICAgKiBAcGFyYW0geWVhciBlLmcuIDIwMjFcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0U3RhcnRFbmRZZWFyKGZhY3RvciwgeWVhcikge1xuICAgICAgICBjb25zdCBzdGVwID0gZmFjdG9yIC8gMTAsIHN0YXJ0WWVhciA9IE1hdGguZmxvb3IoeWVhciAvIGZhY3RvcikgKiBmYWN0b3IsIGVuZFllYXIgPSBzdGFydFllYXIgKyBzdGVwICogOSwgZm9jdXNWYWx1ZSA9IE1hdGguZmxvb3IoeWVhciAvIHN0ZXApICogc3RlcDtcbiAgICAgICAgcmV0dXJuIFtzdGFydFllYXIsIGVuZFllYXIsIGZvY3VzVmFsdWVdO1xuICAgIH1cbiAgICB1cGRhdGVJbnB1dCh0YXJnZXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5mb3JtYXRJbnB1dCh0YXJnZXQpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLl9kYXRlc1xuICAgICAgICAgICAgICAgIC5tYXAoKGQpID0+IHRoaXMuZm9ybWF0SW5wdXQoZCkpXG4gICAgICAgICAgICAgICAgLmpvaW4odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWUgIT0gbmV3VmFsdWUpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBlaXRoZXIgY2xlYXIgb3Igc2V0IHRoZSBgdGFyZ2V0YCBkYXRlIGF0IGBpbmRleGAuXG4gICAgICogSWYgdGhlIGB0YXJnZXRgIGlzIG51bGwgdGhlbiB0aGUgZGF0ZSB3aWxsIGJlIGNsZWFyZWQuXG4gICAgICogSWYgbXVsdGktZGF0ZSBpcyBiZWluZyB1c2VkIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIGFycmF5LlxuICAgICAqIElmIGB0YXJnZXRgIGlzIHZhbGlkIGFuZCBtdWx0aS1kYXRlIGlzIHVzZWQgdGhlbiBpZiBgaW5kZXhgIGlzXG4gICAgICogcHJvdmlkZWQgdGhlIGRhdGUgYXQgdGhhdCBpbmRleCB3aWxsIGJlIHJlcGxhY2VkLCBvdGhlcndpc2UgaXQgaXMgYXBwZW5kZWQuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqL1xuICAgIHNldFZhbHVlKHRhcmdldCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3Qgbm9JbmRleCA9IHR5cGVvZiBpbmRleCA9PT0gJ3VuZGVmaW5lZCcsIGlzQ2xlYXIgPSAhdGFyZ2V0ICYmIG5vSW5kZXg7XG4gICAgICAgIGxldCBvbGREYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgPyBudWxsIDogdGhpcy5fZGF0ZXNbaW5kZXhdPy5jbG9uZTtcbiAgICAgICAgaWYgKCFvbGREYXRlICYmICF0aGlzLm9wdGlvbnNTdG9yZS51bnNldCAmJiBub0luZGV4ICYmIGlzQ2xlYXIpIHtcbiAgICAgICAgICAgIG9sZERhdGUgPSB0aGlzLmxhc3RQaWNrZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldCAmJiBvbGREYXRlPy5pc1NhbWUodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dCh0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhc2Ugb2YgY2FsbGluZyBzZXRWYWx1ZShudWxsKVxuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0VmFsdWVOdWxsKGlzQ2xlYXIsIGluZGV4LCBvbGREYXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbmRleCA9IGluZGV4IHx8IDA7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5jbG9uZTtcbiAgICAgICAgLy8gbWludXRlIHN0ZXBwaW5nIGlzIGJlaW5nIHVzZWQsIGZvcmNlIHRoZSBtaW51dGUgdG8gdGhlIGNsb3Nlc3QgdmFsdWVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcgIT09IDEpIHtcbiAgICAgICAgICAgIHRhcmdldC5taW51dGVzID1cbiAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHRhcmdldC5taW51dGVzIC8gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZykgKlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nO1xuICAgICAgICAgICAgdGFyZ2V0LnN0YXJ0T2YoVW5pdC5taW51dGVzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvblVwZGF0ZSA9IChpc1ZhbGlkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9kYXRlc1tpbmRleF0gPSB0YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZVZpZXdEYXRlLmVtaXQodGFyZ2V0LmNsb25lKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQodGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZURpc3BsYXkuZW1pdCgnYWxsJyk7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5lbWl0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBOYW1lc3BhY2UuZXZlbnRzLmNoYW5nZSxcbiAgICAgICAgICAgICAgICBkYXRlOiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgb2xkRGF0ZSxcbiAgICAgICAgICAgICAgICBpc0NsZWFyLFxuICAgICAgICAgICAgICAgIGlzVmFsaWQ6IGlzVmFsaWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRhcmdldCkgJiZcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5kYXRlUmFuZ2VJc1ZhbGlkKHRoaXMucGlja2VkLCBpbmRleCwgdGFyZ2V0KSkge1xuICAgICAgICAgICAgb25VcGRhdGUodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMua2VlcEludmFsaWQpIHtcbiAgICAgICAgICAgIG9uVXBkYXRlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6IE5hbWVzcGFjZS5ldmVudHMuZXJyb3IsXG4gICAgICAgICAgICByZWFzb246IE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmZhaWxlZFRvU2V0SW52YWxpZERhdGUsXG4gICAgICAgICAgICBkYXRlOiB0YXJnZXQsXG4gICAgICAgICAgICBvbGREYXRlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NldFZhbHVlTnVsbChpc0NsZWFyLCBpbmRleCwgb2xkRGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlcyB8fFxuICAgICAgICAgICAgdGhpcy5fZGF0ZXMubGVuZ3RoID09PSAxIHx8XG4gICAgICAgICAgICBpc0NsZWFyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS51bnNldCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9kYXRlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGF0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0KCk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudHJpZ2dlckV2ZW50LmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogTmFtZXNwYWNlLmV2ZW50cy5jaGFuZ2UsXG4gICAgICAgICAgICBkYXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvbGREYXRlLFxuICAgICAgICAgICAgaXNDbGVhcixcbiAgICAgICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnVwZGF0ZURpc3BsYXkuZW1pdCgnYWxsJyk7XG4gICAgfVxufVxuXG52YXIgQWN0aW9uVHlwZXM7XG4oZnVuY3Rpb24gKEFjdGlvblR5cGVzKSB7XG4gICAgQWN0aW9uVHlwZXNbXCJuZXh0XCJdID0gXCJuZXh0XCI7XG4gICAgQWN0aW9uVHlwZXNbXCJwcmV2aW91c1wiXSA9IFwicHJldmlvdXNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImNoYW5nZUNhbGVuZGFyVmlld1wiXSA9IFwiY2hhbmdlQ2FsZW5kYXJWaWV3XCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzZWxlY3RNb250aFwiXSA9IFwic2VsZWN0TW9udGhcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdFllYXJcIl0gPSBcInNlbGVjdFllYXJcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdERlY2FkZVwiXSA9IFwic2VsZWN0RGVjYWRlXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzZWxlY3REYXlcIl0gPSBcInNlbGVjdERheVwiO1xuICAgIEFjdGlvblR5cGVzW1wic2VsZWN0SG91clwiXSA9IFwic2VsZWN0SG91clwiO1xuICAgIEFjdGlvblR5cGVzW1wic2VsZWN0TWludXRlXCJdID0gXCJzZWxlY3RNaW51dGVcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdFNlY29uZFwiXSA9IFwic2VsZWN0U2Vjb25kXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJpbmNyZW1lbnRIb3Vyc1wiXSA9IFwiaW5jcmVtZW50SG91cnNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImluY3JlbWVudE1pbnV0ZXNcIl0gPSBcImluY3JlbWVudE1pbnV0ZXNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImluY3JlbWVudFNlY29uZHNcIl0gPSBcImluY3JlbWVudFNlY29uZHNcIjtcbiAgICBBY3Rpb25UeXBlc1tcImRlY3JlbWVudEhvdXJzXCJdID0gXCJkZWNyZW1lbnRIb3Vyc1wiO1xuICAgIEFjdGlvblR5cGVzW1wiZGVjcmVtZW50TWludXRlc1wiXSA9IFwiZGVjcmVtZW50TWludXRlc1wiO1xuICAgIEFjdGlvblR5cGVzW1wiZGVjcmVtZW50U2Vjb25kc1wiXSA9IFwiZGVjcmVtZW50U2Vjb25kc1wiO1xuICAgIEFjdGlvblR5cGVzW1widG9nZ2xlTWVyaWRpZW1cIl0gPSBcInRvZ2dsZU1lcmlkaWVtXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJ0b2dnbGVQaWNrZXJcIl0gPSBcInRvZ2dsZVBpY2tlclwiO1xuICAgIEFjdGlvblR5cGVzW1wic2hvd0Nsb2NrXCJdID0gXCJzaG93Q2xvY2tcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNob3dIb3Vyc1wiXSA9IFwic2hvd0hvdXJzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzaG93TWludXRlc1wiXSA9IFwic2hvd01pbnV0ZXNcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNob3dTZWNvbmRzXCJdID0gXCJzaG93U2Vjb25kc1wiO1xuICAgIEFjdGlvblR5cGVzW1wiY2xlYXJcIl0gPSBcImNsZWFyXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJjbG9zZVwiXSA9IFwiY2xvc2VcIjtcbiAgICBBY3Rpb25UeXBlc1tcInRvZGF5XCJdID0gXCJ0b2RheVwiO1xufSkoQWN0aW9uVHlwZXMgfHwgKEFjdGlvblR5cGVzID0ge30pKTtcbnZhciBBY3Rpb25UeXBlcyQxID0gQWN0aW9uVHlwZXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYGRhdGVgXG4gKi9cbmNsYXNzIERhdGVEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kYXlzQ29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZCguLi50aGlzLl9kYXlzT2ZUaGVXZWVrKCkpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jYWxlbmRhcldlZWtzLCBOYW1lc3BhY2UuY3NzLm5vSGlnaGxpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgcmFuZ2VIb3ZlckV2ZW50LCByYW5nZUhvdmVyT3V0RXZlbnQgfSA9IHRoaXMuaGFuZGxlTW91c2VFdmVudHMoY29udGFpbmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSAhPT0gMCAmJiBpICUgNyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jYWxlbmRhcldlZWtzLCBOYW1lc3BhY2UuY3NzLm5vSGlnaGxpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0RGF5KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICAgICAgLy8gaWYgaG92ZXIgaXMgc3VwcG9ydGVkIHRoZW4gYWRkIHRoZSBldmVudHNcbiAgICAgICAgICAgIGlmIChtYXRjaE1lZGlhKCcoaG92ZXI6IGhvdmVyKScpLm1hdGNoZXMgJiZcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSkge1xuICAgICAgICAgICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCByYW5nZUhvdmVyRXZlbnQpO1xuICAgICAgICAgICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHJhbmdlSG92ZXJPdXRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGVzIHRoZSBncmlkIGFuZCB1cGRhdGVzIGVuYWJsZWQgc3RhdGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHdpZGdldCwgcGFpbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5kYXlzQ29udGFpbmVyKVswXTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2FsZW5kYXJWaWV3KGNvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lXG4gICAgICAgICAgICAuc3RhcnRPZihVbml0Lm1vbnRoKVxuICAgICAgICAgICAgLnN0YXJ0T2YoJ3dlZWtEYXknLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zdGFydE9mVGhlV2VlaylcbiAgICAgICAgICAgIC5tYW5pcHVsYXRlKDEyLCBVbml0LmhvdXJzKTtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2FsZW5kYXJXZWVrcyhjb250YWluZXIsIGlubmVyRGF0ZS5jbG9uZSk7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3REYXl9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kYXkpO1xuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS5pc0JlZm9yZSh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSwgVW5pdC5tb250aCkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5vbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS5pc0FmdGVyKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLCBVbml0Lm1vbnRoKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLm5ldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ICYmXG4gICAgICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGF0ZVJhbmdlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5pc1BpY2tlZChpbm5lckRhdGUsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5hY3RpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzU2FtZShuZXcgRGF0ZVRpbWUoKSwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLnRvZGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUud2Vla0RheSA9PT0gMCB8fCBpbm5lckRhdGUud2Vla0RheSA9PT0gNikge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLndlZWtlbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faGFuZGxlRGF0ZVJhbmdlKGlubmVyRGF0ZSwgY2xhc3Nlcyk7XG4gICAgICAgICAgICBwYWludChVbml0LmRhdGUsIGlubmVyRGF0ZSwgY2xhc3NlcywgZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uZWxlbWVudC5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCB0aGlzLl9kYXRlVG9EYXRhVmFsdWUoaW5uZXJEYXRlKSk7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1kYXknLCBgJHtpbm5lckRhdGUuZGF0ZX1gKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gaW5uZXJEYXRlLnBhcnRzKHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgICAgICAgfSkuZGF5O1xuICAgICAgICAgICAgaW5uZXJEYXRlLm1hbmlwdWxhdGUoMSwgVW5pdC5kYXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9kYXRlVG9EYXRhVmFsdWUoZGF0ZSkge1xuICAgICAgICBpZiAoIURhdGVUaW1lLmlzVmFsaWQoZGF0ZSkpXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIHJldHVybiBgJHtkYXRlLnllYXJ9LSR7ZGF0ZS5tb250aEZvcm1hdHRlZH0tJHtkYXRlLmRhdGVGb3JtYXR0ZWR9YDtcbiAgICB9XG4gICAgX2hhbmRsZURhdGVSYW5nZShpbm5lckRhdGUsIGNsYXNzZXMpIHtcbiAgICAgICAgY29uc3QgcmFuZ2VTdGFydCA9IHRoaXMuZGF0ZXMucGlja2VkWzBdO1xuICAgICAgICBjb25zdCByYW5nZUVuZCA9IHRoaXMuZGF0ZXMucGlja2VkWzFdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kYXRlUmFuZ2UpIHtcbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUuaXNCZXR3ZWVuKHJhbmdlU3RhcnQsIHJhbmdlRW5kLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MucmFuZ2VJbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzU2FtZShyYW5nZVN0YXJ0LCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MucmFuZ2VTdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzU2FtZShyYW5nZUVuZCwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLnJhbmdlRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVNb3VzZUV2ZW50cyhjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgcmFuZ2VIb3ZlckV2ZW50ID0gKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBlPy5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSAwIG9yIDIgc2VsZWN0ZWQgb3IgaWYgdGhlIHRhcmdldCBpcyBkaXNhYmxlZCB0aGVuIGlnbm9yZVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXMucGlja2VkLmxlbmd0aCAhPT0gMSB8fFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIHNlbGVjdCBhbGwgdGhlIGRhdGUgZGl2c1xuICAgICAgICAgICAgY29uc3QgYWxsRGF5cyA9IFsuLi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmRheScpXTtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZGF0ZSB2YWx1ZSBmcm9tIHRoZSBlbGVtZW50IGJlaW5nIGhvdmVyZWQgb3ZlclxuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBjdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xuICAgICAgICAgICAgLy8gZm9ybWF0IHRoZSBzdHJpbmcgdG8gYSBkYXRlXG4gICAgICAgICAgICBjb25zdCBpbm5lckRhdGUgPSBEYXRlVGltZS5mcm9tU3RyaW5nKGF0dHJpYnV0ZVZhbHVlLCB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiAneXl5eS1NTS1kZCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHBvc2l0aW9uIG9mIHRoZSB0YXJnZXQgaW4gdGhlIGRhdGUgY29udGFpbmVyXG4gICAgICAgICAgICBjb25zdCBkYXlJbmRleCA9IGFsbERheXMuZmluZEluZGV4KChlKSA9PiBlLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpID09PSBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBmaXJzdCBhbmQgc2Vjb25kIHNlbGVjdGVkIGRhdGVzXG4gICAgICAgICAgICBjb25zdCByYW5nZVN0YXJ0ID0gdGhpcy5kYXRlcy5waWNrZWRbMF07XG4gICAgICAgICAgICBjb25zdCByYW5nZUVuZCA9IHRoaXMuZGF0ZXMucGlja2VkWzFdO1xuICAgICAgICAgICAgLy9mb3JtYXQgdGhlIHN0YXJ0IGRhdGUgc28gdGhhdCBpdCBjYW4gYmUgZm91bmQgYnkgdGhlIGF0dHJpYnV0ZVxuICAgICAgICAgICAgY29uc3QgcmFuZ2VTdGFydEZvcm1hdHRlZCA9IHRoaXMuX2RhdGVUb0RhdGFWYWx1ZShyYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlU3RhcnRJbmRleCA9IGFsbERheXMuZmluZEluZGV4KChlKSA9PiBlLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpID09PSByYW5nZVN0YXJ0Rm9ybWF0dGVkKTtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlU3RhcnRFbGVtZW50ID0gYWxsRGF5c1tyYW5nZVN0YXJ0SW5kZXhdO1xuICAgICAgICAgICAgLy9tYWtlIHN1cmUgd2UgZG9uJ3QgbGVhdmUgc3RhcnQvZW5kIGNsYXNzZXMgaWYgd2UgZG9uJ3QgbmVlZCB0aGVtXG4gICAgICAgICAgICBpZiAoIWlubmVyRGF0ZS5pc1NhbWUocmFuZ2VTdGFydCwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnJhbmdlU3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpbm5lckRhdGUuaXNTYW1lKHJhbmdlRW5kLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MucmFuZ2VFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBmaWd1cmVzIG91dCB3aGljaCBkaXJlY3QgZnJvbSBzdGFydCBkYXRlIGlzIHNlbGVjdGVkXG4gICAgICAgICAgICAvLyB0aGUgc2VsZWN0aW9uIFwiY2FwXCIgY2xhc3NlcyBhcmUgYXBwbGllZCBpZiBuZWVkZWRcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBhbGwgdGhlIGRhdGVzIGJldHdlZW4gd2lsbCBnZXQgdGhlIGByYW5nZUluYCBjbGFzcy5cbiAgICAgICAgICAgIC8vIFdlIG1ha2UgdGhpcyBzZWxlY3Rpb24gYmFzZWQgb24gdGhlIGVsZW1lbnQncyBpbmRleCBhbmQgdGhlIHJhbmdlU3RhcnQgaW5kZXhcbiAgICAgICAgICAgIGxldCBsYW1iZGE7XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzQmVmb3JlKHJhbmdlU3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MucmFuZ2VTdGFydCk7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydEVsZW1lbnQ/LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0RWxlbWVudD8uY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnJhbmdlRW5kKTtcbiAgICAgICAgICAgICAgICBsYW1iZGEgPSAoXywgaW5kZXgpID0+IGluZGV4ID4gZGF5SW5kZXggJiYgaW5kZXggPCByYW5nZVN0YXJ0SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5yYW5nZUVuZCk7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydEVsZW1lbnQ/LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZUVuZCk7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydEVsZW1lbnQ/LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5yYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICBsYW1iZGEgPSAoXywgaW5kZXgpID0+IGluZGV4IDwgZGF5SW5kZXggJiYgaW5kZXggPiByYW5nZVN0YXJ0SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbGxEYXlzLmZpbHRlcihsYW1iZGEpLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5yYW5nZUluKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCByYW5nZUhvdmVyT3V0RXZlbnQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgLy8gZmluZCBhbGwgdGhlIGRhdGVzIGluIHRoZSBjb250YWluZXJcbiAgICAgICAgICAgIGNvbnN0IGFsbERheXMgPSBbLi4uY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kYXknKV07XG4gICAgICAgICAgICAvLyBpZiBvbmx5IHRoZSBzdGFydCBpcyBzZWxlY3RlZCwgcmVtb3ZlIGFsbCB0aGUgcmFuZ2VJbiBjbGFzc2VzXG4gICAgICAgICAgICAvLyB3ZSBkbyB0aGlzIGJlY2F1c2Ugb25jZSB0aGUgdXNlciBob3ZlcnMgb3ZlciBhIG5ldyBkYXRlIHRoZSByYW5nZSB3aWxsIGJlIHJlY2FsY3VsYXRlZC5cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLnBpY2tlZC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgYWxsRGF5cy5mb3JFYWNoKChlKSA9PiBlLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZUluKSk7XG4gICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIDAgb3IgMiBkYXRlcyBzZWxlY3RlZCB0aGVuIGlnbm9yZVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXMucGlja2VkLmxlbmd0aCAhPT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gZT8uY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZWxlbWVudHMgZGF0ZSBmcm9tIHRoZSBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IG5ldyBEYXRlVGltZShjdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpKTtcbiAgICAgICAgICAgIC8vIHZlcmlmeSBzZWxlY3Rpb25zIGFuZCByZW1vdmUgaW52YWxpZCBjbGFzc2VzXG4gICAgICAgICAgICBpZiAoIWlubmVyRGF0ZS5pc1NhbWUodGhpcy5kYXRlcy5waWNrZWRbMF0sIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaW5uZXJEYXRlLmlzU2FtZSh0aGlzLmRhdGVzLnBpY2tlZFsxXSwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnJhbmdlRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2VIb3ZlckV2ZW50LCByYW5nZUhvdmVyT3V0RXZlbnQgfTtcbiAgICB9XG4gICAgX3VwZGF0ZUNhbGVuZGFyVmlldyhjb250YWluZXIpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3ICE9PSAnY2FsZW5kYXInKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBbcHJldmlvdXMsIHN3aXRjaGVyLCBuZXh0XSA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNhbGVuZGFySGVhZGVyKVswXVxuICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKTtcbiAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKE5hbWVzcGFjZS5jc3MuZGF5c0NvbnRhaW5lciwgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuZm9ybWF0KHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmRheVZpZXdIZWFkZXJGb3JtYXQpKTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMubW9udGhcbiAgICAgICAgICAgID8gc3dpdGNoZXIuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgOiBzd2l0Y2hlci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0Lm1vbnRoKSwgVW5pdC5tb250aClcbiAgICAgICAgICAgID8gcHJldmlvdXMuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgOiBwcmV2aW91cy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKDEsIFVuaXQubW9udGgpLCBVbml0Lm1vbnRoKVxuICAgICAgICAgICAgPyBuZXh0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgIDogbmV4dC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgIH1cbiAgICAvKioqXG4gICAgICogR2VuZXJhdGVzIGEgaHRtbCByb3cgdGhhdCBjb250YWlucyB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kYXlzT2ZUaGVXZWVrKCkge1xuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZVxuICAgICAgICAgICAgLnN0YXJ0T2YoJ3dlZWtEYXknLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zdGFydE9mVGhlV2VlaylcbiAgICAgICAgICAgIC5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaHRtbERpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNhbGVuZGFyV2Vla3MsIE5hbWVzcGFjZS5jc3Mubm9IaWdobGlnaHQpO1xuICAgICAgICAgICAgaHRtbERpdkVsZW1lbnQuaW5uZXJUZXh0ID0gJyMnO1xuICAgICAgICAgICAgcm93LnB1c2goaHRtbERpdkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaHRtbERpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRheU9mVGhlV2VlaywgTmFtZXNwYWNlLmNzcy5ub0hpZ2hsaWdodCk7XG4gICAgICAgICAgICBodG1sRGl2RWxlbWVudC5pbm5lclRleHQgPSBpbm5lckRhdGUuZm9ybWF0KHsgd2Vla2RheTogJ3Nob3J0JyB9KTtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDEsIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICByb3cucHVzaChodG1sRGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICB9XG4gICAgX2hhbmRsZUNhbGVuZGFyV2Vla3MoY29udGFpbmVyLCBpbm5lckRhdGUpIHtcbiAgICAgICAgWy4uLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGAuJHtOYW1lc3BhY2UuY3NzLmNhbGVuZGFyV2Vla3N9YCldXG4gICAgICAgICAgICAuZmlsdGVyKChlKSA9PiBlLmlubmVyVGV4dCAhPT0gJyMnKVxuICAgICAgICAgICAgLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7aW5uZXJEYXRlLndlZWt9YDtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDcsIFVuaXQuZGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCB1cGRhdGVzIHRoZSBncmlkIGZvciBgbW9udGhgXG4gKi9cbmNsYXNzIE1vbnRoRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZXMpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjb250YWluZXIgaHRtbCBmb3IgdGhlIGRpc3BsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFBpY2tlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MubW9udGhzQ29udGFpbmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zZWxlY3RNb250aCk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLm1vbnRoc0NvbnRhaW5lcilbMF07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9PT0gJ21vbnRocycpIHtcbiAgICAgICAgICAgIGNvbnN0IFtwcmV2aW91cywgc3dpdGNoZXIsIG5leHRdID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNhbGVuZGFySGVhZGVyKVswXVxuICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2Jyk7XG4gICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoTmFtZXNwYWNlLmNzcy5tb250aHNDb250YWluZXIsIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmZvcm1hdCh7IHllYXI6ICdudW1lcmljJyB9KSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy55ZWFyXG4gICAgICAgICAgICAgICAgPyBzd2l0Y2hlci5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBzd2l0Y2hlci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgtMSwgVW5pdC55ZWFyKSwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gcHJldmlvdXMuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogcHJldmlvdXMuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoMSwgVW5pdC55ZWFyKSwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gbmV4dC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBuZXh0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUuc3RhcnRPZihVbml0LnllYXIpO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hY3Rpb249XCIke0FjdGlvblR5cGVzJDEuc2VsZWN0TW9udGh9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb250YWluZXJDbG9uZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLm1vbnRoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLmlzUGlja2VkKGlubmVyRGF0ZSwgVW5pdC5tb250aCkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5hY3RpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQubW9udGgpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoVW5pdC5tb250aCwgaW5uZXJEYXRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7aW5kZXh9YCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5pbm5lclRleHQgPSBgJHtpbm5lckRhdGUuZm9ybWF0KHsgbW9udGg6ICdzaG9ydCcgfSl9YDtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDEsIFVuaXQubW9udGgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYHllYXJgXG4gKi9cbmNsYXNzIFllYXJEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lcik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0WWVhcik7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICB0aGlzLl9zdGFydFllYXIgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0LnllYXIpO1xuICAgICAgICB0aGlzLl9lbmRZZWFyID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgxMCwgVW5pdC55ZWFyKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lcilbMF07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9PT0gJ3llYXJzJykge1xuICAgICAgICAgICAgY29uc3QgW3ByZXZpb3VzLCBzd2l0Y2hlciwgbmV4dF0gPSBjb250YWluZXIucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXIpWzBdXG4gICAgICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKTtcbiAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZShOYW1lc3BhY2UuY3NzLnllYXJzQ29udGFpbmVyLCBgJHt0aGlzLl9zdGFydFllYXIuZm9ybWF0KHsgeWVhcjogJ251bWVyaWMnIH0pfS0ke3RoaXMuX2VuZFllYXIuZm9ybWF0KHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICB9KX1gKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmRlY2FkZXNcbiAgICAgICAgICAgICAgICA/IHN3aXRjaGVyLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IHN3aXRjaGVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLl9zdGFydFllYXIsIFVuaXQueWVhcilcbiAgICAgICAgICAgICAgICA/IHByZXZpb3VzLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IHByZXZpb3VzLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLl9lbmRZZWFyLCBVbml0LnllYXIpXG4gICAgICAgICAgICAgICAgPyBuZXh0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IG5leHQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZVxuICAgICAgICAgICAgLnN0YXJ0T2YoVW5pdC55ZWFyKVxuICAgICAgICAgICAgLm1hbmlwdWxhdGUoLTEsIFVuaXQueWVhcik7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3RZZWFyfVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGFpbmVyQ2xvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLnllYXIpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS51bnNldCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuaXNQaWNrZWQoaW5uZXJEYXRlLCBVbml0LnllYXIpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuYWN0aXZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQoaW5uZXJEYXRlLCBVbml0LnllYXIpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoVW5pdC55ZWFyLCBpbm5lckRhdGUsIGNsYXNzZXMsIGNvbnRhaW5lckNsb25lKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5yZW1vdmUoLi4uY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCBgJHtpbm5lckRhdGUueWVhcn1gKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IGlubmVyRGF0ZS5mb3JtYXQoeyB5ZWFyOiAnbnVtZXJpYycgfSk7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSgxLCBVbml0LnllYXIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYHNlY29uZHNgXG4gKi9cbmNsYXNzIERlY2FkZURpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRlY2FkZXNDb250YWluZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNlbGVjdERlY2FkZSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBEYXRlcy5nZXRTdGFydEVuZFllYXIoMTAwLCB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS55ZWFyKTtcbiAgICAgICAgdGhpcy5fc3RhcnREZWNhZGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5zdGFydE9mKFVuaXQueWVhcik7XG4gICAgICAgIHRoaXMuX3N0YXJ0RGVjYWRlLnllYXIgPSBzdGFydDtcbiAgICAgICAgdGhpcy5fZW5kRGVjYWRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUuc3RhcnRPZihVbml0LnllYXIpO1xuICAgICAgICB0aGlzLl9lbmREZWNhZGUueWVhciA9IGVuZDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyKVswXTtcbiAgICAgICAgY29uc3QgW3ByZXZpb3VzLCBzd2l0Y2hlciwgbmV4dF0gPSBjb250YWluZXIucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5jYWxlbmRhckhlYWRlcilbMF1cbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2Jyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9PT0gJ2RlY2FkZXMnKSB7XG4gICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyLCBgJHt0aGlzLl9zdGFydERlY2FkZS5mb3JtYXQoe1xuICAgICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIH0pfS0ke3RoaXMuX2VuZERlY2FkZS5mb3JtYXQoeyB5ZWFyOiAnbnVtZXJpYycgfSl9YCk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLl9zdGFydERlY2FkZSwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gcHJldmlvdXMuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogcHJldmlvdXMuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMuX2VuZERlY2FkZSwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gbmV4dC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBuZXh0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGlja2VkWWVhcnMgPSB0aGlzLmRhdGVzLnBpY2tlZC5tYXAoKHgpID0+IHgueWVhcik7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3REZWNhZGV9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb250YWluZXJDbG9uZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5vbGQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGFydERlY2FkZS55ZWFyIC0gMTAgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnRleHRDb250ZW50ID0gJyAnO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IHRoaXMuX3N0YXJ0RGVjYWRlLmNsb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFuaXB1bGF0ZSgtMTAsIFVuaXQueWVhcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mb3JtYXQoeyB5ZWFyOiAnbnVtZXJpYycgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIGAke3RoaXMuX3N0YXJ0RGVjYWRlLnllYXJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kZWNhZGUpO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREZWNhZGVZZWFyID0gdGhpcy5fc3RhcnREZWNhZGUueWVhcjtcbiAgICAgICAgICAgIGNvbnN0IGVuZERlY2FkZVllYXIgPSB0aGlzLl9zdGFydERlY2FkZS55ZWFyICsgOTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgJiZcbiAgICAgICAgICAgICAgICBwaWNrZWRZZWFycy5maWx0ZXIoKHgpID0+IHggPj0gc3RhcnREZWNhZGVZZWFyICYmIHggPD0gZW5kRGVjYWRlWWVhcilcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5hY3RpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoJ2RlY2FkZScsIHRoaXMuX3N0YXJ0RGVjYWRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7dGhpcy5fc3RhcnREZWNhZGUueWVhcn1gKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IGAke3RoaXMuX3N0YXJ0RGVjYWRlLmZvcm1hdCh7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgfSl9YDtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0RGVjYWRlLm1hbmlwdWxhdGUoMTAsIFVuaXQueWVhcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBjbG9jayBkaXNwbGF5XG4gKi9cbmNsYXNzIFRpbWVEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgPSAnJztcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgY2xvY2sgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKGljb25UYWcpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY2xvY2tDb250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKC4uLnRoaXMuX2dyaWQoaWNvblRhZykpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIHZhcmlvdXMgZWxlbWVudHMgd2l0aCBpbiB0aGUgY2xvY2sgZGlzcGxheVxuICAgICAqIGxpa2UgdGhlIGN1cnJlbnQgaG91ciBhbmQgaWYgdGhlIG1hbmlwdWxhdGlvbiBpY29ucyBhcmUgZW5hYmxlZC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0KSB7XG4gICAgICAgIGNvbnN0IHRpbWVzRGl2ID0gKHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2xvY2tDb250YWluZXIpWzBdKTtcbiAgICAgICAgbGV0IGxhc3RQaWNrZWQgPSB0aGlzLmRhdGVzLmxhc3RQaWNrZWQ/LmNsb25lO1xuICAgICAgICBpZiAoIWxhc3RQaWNrZWQgJiYgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy51c2VDdXJyZW50KVxuICAgICAgICAgICAgbGFzdFBpY2tlZCA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lO1xuICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaXNhYmxlZCcpXG4gICAgICAgICAgICAuZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmhvdXJzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoMSwgVW5pdC5ob3VycyksIFVuaXQuaG91cnMpKSB7XG4gICAgICAgICAgICAgICAgdGltZXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFjdGlvbj0ke0FjdGlvblR5cGVzJDEuaW5jcmVtZW50SG91cnN9XWApXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0LmhvdXJzKSwgVW5pdC5ob3VycykpIHtcbiAgICAgICAgICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRIb3Vyc31dYClcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lc0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS10aW1lLWNvbXBvbmVudD0ke1VuaXQuaG91cnN9XWApLmlubmVyVGV4dCA9IGxhc3RQaWNrZWRcbiAgICAgICAgICAgICAgICA/IGxhc3RQaWNrZWQuZ2V0SG91cnNGb3JtYXR0ZWQodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlKVxuICAgICAgICAgICAgICAgIDogJy0tJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMubWludXRlcykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKDEsIFVuaXQubWludXRlcyksIFVuaXQubWludXRlcykpIHtcbiAgICAgICAgICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRNaW51dGVzfV1gKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgtMSwgVW5pdC5taW51dGVzKSwgVW5pdC5taW51dGVzKSkge1xuICAgICAgICAgICAgICAgIHRpbWVzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3Rpb249JHtBY3Rpb25UeXBlcyQxLmRlY3JlbWVudE1pbnV0ZXN9XWApXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXNEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtdGltZS1jb21wb25lbnQ9JHtVbml0Lm1pbnV0ZXN9XWApLmlubmVyVGV4dCA9IGxhc3RQaWNrZWQgPyBsYXN0UGlja2VkLm1pbnV0ZXNGb3JtYXR0ZWQgOiAnLS0nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5zZWNvbmRzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoMSwgVW5pdC5zZWNvbmRzKSwgVW5pdC5zZWNvbmRzKSkge1xuICAgICAgICAgICAgICAgIHRpbWVzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3Rpb249JHtBY3Rpb25UeXBlcyQxLmluY3JlbWVudFNlY29uZHN9XWApXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0LnNlY29uZHMpLCBVbml0LnNlY29uZHMpKSB7XG4gICAgICAgICAgICAgICAgdGltZXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFjdGlvbj0ke0FjdGlvblR5cGVzJDEuZGVjcmVtZW50U2Vjb25kc31dYClcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lc0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS10aW1lLWNvbXBvbmVudD0ke1VuaXQuc2Vjb25kc31dYCkuaW5uZXJUZXh0ID0gbGFzdFBpY2tlZCA/IGxhc3RQaWNrZWQuc2Vjb25kc0Zvcm1hdHRlZCA6ICctLSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmlzVHdlbHZlSG91cikge1xuICAgICAgICAgICAgY29uc3QgdG9nZ2xlID0gdGltZXNEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS50b2dnbGVNZXJpZGllbX1dYCk7XG4gICAgICAgICAgICBjb25zdCBtZXJpZGllbURhdGUgPSAobGFzdFBpY2tlZCB8fCB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSkuY2xvbmU7XG4gICAgICAgICAgICB0b2dnbGUuaW5uZXJUZXh0ID0gbWVyaWRpZW1EYXRlLm1lcmlkaWVtKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKG1lcmlkaWVtRGF0ZS5tYW5pcHVsYXRlKG1lcmlkaWVtRGF0ZS5ob3VycyA+PSAxMiA/IC0xMiA6IDEyLCBVbml0LmhvdXJzKSkpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRpbWVzRGl2LnN0eWxlLmdyaWRUZW1wbGF0ZUFyZWFzID0gYFwiJHt0aGlzLl9ncmlkQ29sdW1uc31cImA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIHRhYmxlIGZvciB0aGUgY2xvY2sgZGlzcGxheSBkZXBlbmRpbmcgb24gd2hhdCBvcHRpb25zIGFyZSBzZWxlY3RlZC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9ncmlkKGljb25UYWcpIHtcbiAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgPSAnJztcbiAgICAgICAgY29uc3QgdG9wID0gW10sIG1pZGRsZSA9IFtdLCBib3R0b20gPSBbXSwgc2VwYXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIHVwSWNvbiA9IGljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnVwKSwgZG93bkljb24gPSBpY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy5kb3duKTtcbiAgICAgICAgc2VwYXJhdG9yLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zZXBhcmF0b3IsIE5hbWVzcGFjZS5jc3Mubm9IaWdobGlnaHQpO1xuICAgICAgICBjb25zdCBzZXBhcmF0b3JDb2xvbiA9IHNlcGFyYXRvci5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIHNlcGFyYXRvckNvbG9uLmlubmVySFRNTCA9ICc6JztcbiAgICAgICAgY29uc3QgZ2V0U2VwYXJhdG9yID0gKGNvbG9uID0gZmFsc2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvblxuICAgICAgICAgICAgICAgID8gc2VwYXJhdG9yQ29sb24uY2xvbmVOb2RlKHRydWUpXG4gICAgICAgICAgICAgICAgOiBzZXBhcmF0b3IuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuaG91cnMpIHtcbiAgICAgICAgICAgIGxldCBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5pbmNyZW1lbnRIb3VyKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuaW5jcmVtZW50SG91cnMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZCh1cEljb24uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHRvcC5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ucGlja0hvdXIpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zaG93SG91cnMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZS1jb21wb25lbnQnLCBVbml0LmhvdXJzKTtcbiAgICAgICAgICAgIG1pZGRsZS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uZGVjcmVtZW50SG91cik7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmRlY3JlbWVudEhvdXJzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoZG93bkljb24uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIGJvdHRvbS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgKz0gJ2EnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5taW51dGVzKSB7XG4gICAgICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyArPSAnIGEnO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmhvdXJzKSB7XG4gICAgICAgICAgICAgICAgdG9wLnB1c2goZ2V0U2VwYXJhdG9yKCkpO1xuICAgICAgICAgICAgICAgIG1pZGRsZS5wdXNoKGdldFNlcGFyYXRvcih0cnVlKSk7XG4gICAgICAgICAgICAgICAgYm90dG9tLnB1c2goZ2V0U2VwYXJhdG9yKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zICs9ICcgYSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uaW5jcmVtZW50TWludXRlKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuaW5jcmVtZW50TWludXRlcyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LmFwcGVuZENoaWxkKHVwSWNvbi5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgdG9wLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5waWNrTWludXRlKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2hvd01pbnV0ZXMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZS1jb21wb25lbnQnLCBVbml0Lm1pbnV0ZXMpO1xuICAgICAgICAgICAgbWlkZGxlLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5kZWNyZW1lbnRNaW51dGUpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRNaW51dGVzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoZG93bkljb24uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIGJvdHRvbS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5zZWNvbmRzKSB7XG4gICAgICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyArPSAnIGEnO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLm1pbnV0ZXMpIHtcbiAgICAgICAgICAgICAgICB0b3AucHVzaChnZXRTZXBhcmF0b3IoKSk7XG4gICAgICAgICAgICAgICAgbWlkZGxlLnB1c2goZ2V0U2VwYXJhdG9yKHRydWUpKTtcbiAgICAgICAgICAgICAgICBib3R0b20ucHVzaChnZXRTZXBhcmF0b3IoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgKz0gJyBhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5pbmNyZW1lbnRTZWNvbmQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRTZWNvbmRzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQodXBJY29uLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICB0b3AucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnBpY2tTZWNvbmQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zaG93U2Vjb25kcyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aW1lLWNvbXBvbmVudCcsIFVuaXQuc2Vjb25kcyk7XG4gICAgICAgICAgICBtaWRkbGUucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmRlY3JlbWVudFNlY29uZCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmRlY3JlbWVudFNlY29uZHMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZChkb3duSWNvbi5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgYm90dG9tLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmlzVHdlbHZlSG91cikge1xuICAgICAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgKz0gJyBhJztcbiAgICAgICAgICAgIGxldCBkaXZFbGVtZW50ID0gZ2V0U2VwYXJhdG9yKCk7XG4gICAgICAgICAgICB0b3AucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24udG9nZ2xlTWVyaWRpZW0pO1xuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnRvZ2dsZU1lcmlkaWVtKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICBpZiAoTmFtZXNwYWNlLmNzcy50b2dnbGVNZXJpZGllbS5pbmNsdWRlcygnLCcpKSB7XG4gICAgICAgICAgICAgICAgLy90b2RvIG1vdmUgdGhpcyB0byBwYWludCBmdW5jdGlvbj9cbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCguLi5OYW1lc3BhY2UuY3NzLnRvZ2dsZU1lcmlkaWVtLnNwbGl0KCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MudG9nZ2xlTWVyaWRpZW0pO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Mubm9IaWdobGlnaHQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICAgICAgbWlkZGxlLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZ2V0U2VwYXJhdG9yKCk7XG4gICAgICAgICAgICBib3R0b20ucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyA9IHRoaXMuX2dyaWRDb2x1bW5zLnRyaW0oKTtcbiAgICAgICAgcmV0dXJuIFsuLi50b3AsIC4uLm1pZGRsZSwgLi4uYm90dG9tXTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYGhvdXJzYFxuICovXG5jbGFzcyBIb3VyRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5ob3VyQ29udGFpbmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAodGhpcy5vcHRpb25zU3RvcmUuaXNUd2VsdmVIb3VyID8gMTIgOiAyNCk7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0SG91cik7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmhvdXJDb250YWluZXIpWzBdO1xuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5zdGFydE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3RIb3VyfVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGFpbmVyQ2xvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmhvdXIpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQuaG91cnMpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoVW5pdC5ob3VycywgaW5uZXJEYXRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7aW5uZXJEYXRlLmhvdXJzfWApO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuaW5uZXJUZXh0ID0gaW5uZXJEYXRlLmdldEhvdXJzRm9ybWF0dGVkKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmhvdXJDeWNsZSk7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSgxLCBVbml0LmhvdXJzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgZm9yIGBtaW51dGVzYFxuICovXG5jbGFzcyBNaW51dGVEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLm1pbnV0ZUNvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nID09PSAxXG4gICAgICAgICAgICA/IDVcbiAgICAgICAgICAgIDogdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MCAvIHN0ZXA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0TWludXRlKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgZ3JpZCBhbmQgdXBkYXRlcyBlbmFibGVkIHN0YXRlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh3aWRnZXQsIHBhaW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MubWludXRlQ29udGFpbmVyKVswXTtcbiAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUuc3RhcnRPZihVbml0LmhvdXJzKTtcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcgPT09IDFcbiAgICAgICAgICAgID8gNVxuICAgICAgICAgICAgOiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hY3Rpb249XCIke0FjdGlvblR5cGVzJDEuc2VsZWN0TWludXRlfVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGFpbmVyQ2xvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLm1pbnV0ZSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKGlubmVyRGF0ZSwgVW5pdC5taW51dGVzKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhaW50KFVuaXQubWludXRlcywgaW5uZXJEYXRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7aW5uZXJEYXRlLm1pbnV0ZXN9YCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5pbm5lclRleHQgPSBpbm5lckRhdGUubWludXRlc0Zvcm1hdHRlZDtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKHN0ZXAsIFVuaXQubWludXRlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCB1cGRhdGVzIHRoZSBncmlkIGZvciBgc2Vjb25kc2BcbiAqL1xuY2xhc3Mgc2Vjb25kRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zZWNvbmRDb250YWluZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNlbGVjdFNlY29uZCk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLnNlY29uZENvbnRhaW5lcilbMF07XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLnN0YXJ0T2YoVW5pdC5taW51dGVzKTtcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtYWN0aW9uPVwiJHtBY3Rpb25UeXBlcyQxLnNlbGVjdFNlY29uZH1cIl1gKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbnRhaW5lckNsb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5zZWNvbmQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQuc2Vjb25kcykpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWludChVbml0LnNlY29uZHMsIGlubmVyRGF0ZSwgY2xhc3NlcywgY29udGFpbmVyQ2xvbmUpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LnJlbW92ZSguLi5jb250YWluZXJDbG9uZS5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIGAke2lubmVyRGF0ZS5zZWNvbmRzfWApO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuaW5uZXJUZXh0ID0gaW5uZXJEYXRlLnNlY29uZHNGb3JtYXR0ZWQ7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSg1LCBVbml0LnNlY29uZHMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYSBjb2xsYXBzZSBmdW5jdGlvbmFsaXR5IHRvIHRoZSB2aWV3IGNoYW5nZXNcbiAqL1xuY2xhc3MgQ29sbGFwc2Uge1xuICAgIC8qKlxuICAgICAqIEZsaXBzIHRoZSBzaG93L2hpZGUgc3RhdGUgb2YgYHRhcmdldGBcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IGh0bWwgZWxlbWVudCB0byBhZmZlY3QuXG4gICAgICovXG4gICAgc3RhdGljIHRvZ2dsZSh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5zaG93KSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3codGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTa2lwcyBhbnkgYW5pbWF0aW9uIG9yIHRpbWVvdXRzIGFuZCBpbW1lZGlhdGVseSBzZXQgdGhlIGVsZW1lbnQgdG8gc2hvdy5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICovXG4gICAgc3RhdGljIHNob3dJbW1lZGlhdGVseSh0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5jb2xsYXBzaW5nKTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jb2xsYXBzZSwgTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBgdGFyZ2V0YCBpcyBub3QgYWxyZWFkeSBzaG93aW5nLCB0aGVuIHNob3cgYWZ0ZXIgdGhlIGFuaW1hdGlvbi5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICovXG4gICAgc3RhdGljIHNob3codGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3MuY29sbGFwc2luZykgfHxcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5zaG93KSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBDb2xsYXBzZS5zaG93SW1tZWRpYXRlbHkodGFyZ2V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcwJztcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5jb2xsYXBzZSk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY29sbGFwc2luZyk7XG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBzZXRUaW1lb3V0KGNvbXBsZXRlLCB0aGlzLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRhcmdldCkpO1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0LnNjcm9sbEhlaWdodH1weGA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNraXBzIGFueSBhbmltYXRpb24gb3IgdGltZW91dHMgYW5kIGltbWVkaWF0ZWx5IHNldCB0aGUgZWxlbWVudCB0byBoaWRlLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKi9cbiAgICBzdGF0aWMgaGlkZUltbWVkaWF0ZWx5KHRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5jb2xsYXBzaW5nLCBOYW1lc3BhY2UuY3NzLnNob3cpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNvbGxhcHNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgYHRhcmdldGAgaXMgbm90IGFscmVhZHkgaGlkZGVuLCB0aGVuIGhpZGUgYWZ0ZXIgdGhlIGFuaW1hdGlvbi5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0IEhUTUwgRWxlbWVudFxuICAgICAqL1xuICAgIHN0YXRpYyBoaWRlKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLmNvbGxhcHNpbmcpIHx8XG4gICAgICAgICAgICAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLnNob3cpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIENvbGxhcHNlLmhpZGVJbW1lZGlhdGVseSh0YXJnZXQpO1xuICAgICAgICB9O1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpWydoZWlnaHQnXX1weGA7XG4gICAgICAgIGNvbnN0IHJlZmxvdyA9IChlbGVtZW50KSA9PiBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgcmVmbG93KHRhcmdldCk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuY29sbGFwc2UsIE5hbWVzcGFjZS5jc3Muc2hvdyk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY29sbGFwc2luZyk7XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIHNldFRpbWVvdXQoY29tcGxldGUsIHRoaXMuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGFyZ2V0KSk7XG4gICAgfVxufVxuLyoqXG4gKiBHZXRzIHRoZSB0cmFuc2l0aW9uIGR1cmF0aW9uIGZyb20gdGhlIGBlbGVtZW50YCBieSBnZXR0aW5nIGNzcyBwcm9wZXJ0aWVzXG4gKiBgdHJhbnNpdGlvbi1kdXJhdGlvbmAgYW5kIGB0cmFuc2l0aW9uLWRlbGF5YFxuICogQHBhcmFtIGVsZW1lbnQgSFRNTCBFbGVtZW50XG4gKi9cbkNvbGxhcHNlLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50ID0gKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIC8vIEdldCB0cmFuc2l0aW9uLWR1cmF0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgbGV0IHsgdHJhbnNpdGlvbkR1cmF0aW9uLCB0cmFuc2l0aW9uRGVsYXkgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uID0gTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICBjb25zdCBmbG9hdFRyYW5zaXRpb25EZWxheSA9IE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSk7XG4gICAgLy8gUmV0dXJuIDAgaWYgZWxlbWVudCBvciB0cmFuc2l0aW9uIGR1cmF0aW9uIGlzIG5vdCBmb3VuZFxuICAgIGlmICghZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gJiYgIWZsb2F0VHJhbnNpdGlvbkRlbGF5KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICAvLyBJZiBtdWx0aXBsZSBkdXJhdGlvbnMgYXJlIGRlZmluZWQsIHRha2UgdGhlIGZpcnN0XG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uID0gdHJhbnNpdGlvbkR1cmF0aW9uLnNwbGl0KCcsJylbMF07XG4gICAgdHJhbnNpdGlvbkRlbGF5ID0gdHJhbnNpdGlvbkRlbGF5LnNwbGl0KCcsJylbMF07XG4gICAgcmV0dXJuICgoTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKSArXG4gICAgICAgIE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSkpICpcbiAgICAgICAgMTAwMCk7XG59O1xuXG4vKipcbiAqIE1haW4gY2xhc3MgZm9yIGFsbCB0aGluZ3MgZGlzcGxheSByZWxhdGVkLlxuICovXG5jbGFzcyBEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGRvY3VtZW50IGNsaWNrIGV2ZW50IHRvIGhpZGUgdGhlIHdpZGdldCBpZiBjbGljayBpcyBvdXRzaWRlXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSBlIE1vdXNlRXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q2xpY2tFdmVudCA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWJ1ZyB8fCB3aW5kb3cuZGVidWcpXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzVmlzaWJsZSAmJlxuICAgICAgICAgICAgICAgICFlLmNvbXBvc2VkUGF0aCgpLmluY2x1ZGVzKHRoaXMud2lkZ2V0KSAmJiAvLyBjbGljayBpbnNpZGUgdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgICFlLmNvbXBvc2VkUGF0aCgpPy5pbmNsdWRlcyh0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50KSAvLyBjbGljayBvbiB0aGUgZWxlbWVudFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGljayBldmVudCBmb3IgYW55IGFjdGlvbiBsaWtlIHNlbGVjdGluZyBhIGRhdGVcbiAgICAgICAgICogQHBhcmFtIGUgTW91c2VFdmVudFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYWN0aW9uc0NsaWNrRXZlbnQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy5hY3Rpb24uZW1pdCh7IGU6IGUgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMuZGF0ZURpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZURpc3BsYXkpO1xuICAgICAgICB0aGlzLm1vbnRoRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShNb250aERpc3BsYXkpO1xuICAgICAgICB0aGlzLnllYXJEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFllYXJEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5kZWNhZGVEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERlY2FkZURpc3BsYXkpO1xuICAgICAgICB0aGlzLnRpbWVEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFRpbWVEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5ob3VyRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShIb3VyRGlzcGxheSk7XG4gICAgICAgIHRoaXMubWludXRlRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShNaW51dGVEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5zZWNvbmREaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKHNlY29uZERpc3BsYXkpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKEV2ZW50RW1pdHRlcnMpO1xuICAgICAgICB0aGlzLl93aWRnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlRGlzcGxheS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlKHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB3aWRnZXQgYm9keSBvciB1bmRlZmluZWRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldCB3aWRnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWRnZXQ7XG4gICAgfVxuICAgIGdldCBkYXRlQ29udGFpbmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXQ/LnF1ZXJ5U2VsZWN0b3IoYGRpdi4ke05hbWVzcGFjZS5jc3MuZGF0ZUNvbnRhaW5lcn1gKTtcbiAgICB9XG4gICAgZ2V0IHRpbWVDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldD8ucXVlcnlTZWxlY3RvcihgZGl2LiR7TmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyfWApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoaXMgdmlzaWJsZSBzdGF0ZSBvZiB0aGUgcGlja2VyIChzaG93bilcbiAgICAgKi9cbiAgICBnZXQgaXNWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB0YWJsZSBmb3IgYSBwYXJ0aWN1bGFyIHVuaXQuIFVzZWQgd2hlbiBhbiBvcHRpb24gYXMgY2hhbmdlZCBvclxuICAgICAqIHdoZW5ldmVyIHRoZSBjbGFzcyBsaXN0IG1pZ2h0IG5lZWQgdG8gYmUgcmVmcmVzaGVkLlxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHVuaXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlIFVuaXQuc2Vjb25kczpcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZERpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVuaXQubWludXRlczpcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVuaXQuaG91cnM6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVW5pdC5kYXRlOlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVuaXQubW9udGg6XG4gICAgICAgICAgICAgICAgdGhpcy5tb250aERpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVuaXQueWVhcjpcbiAgICAgICAgICAgICAgICB0aGlzLnllYXJEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRlY2FkZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjbG9jayc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUaW1lKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0LmhvdXJzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5taW51dGVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5zZWNvbmRzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NhbGVuZGFyJzpcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC55ZWFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5tb250aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNhZGVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbGVuZGFySGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhbGwnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oYXNUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZSgnY2xvY2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2hhc0RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKCdjYWxlbmRhcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBBbGxvd3MgZGV2ZWxvcGVycyB0byBhZGQvcmVtb3ZlIGNsYXNzZXMgZnJvbSBhbiBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBfdW5pdFxuICAgICAqIEBwYXJhbSBfZGF0ZVxuICAgICAqIEBwYXJhbSBfY2xhc3Nlc1xuICAgICAqIEBwYXJhbSBfZWxlbWVudFxuICAgICAqL1xuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICAgIHBhaW50KF91bml0LCBfZGF0ZSwgX2NsYXNzZXMsIF9lbGVtZW50KSB7XG4gICAgICAgIC8vIGltcGxlbWVudGVkIGluIHBsdWdpblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgcGlja2VyIGFuZCBjcmVhdGVzIGEgUG9wcGVyIGluc3RhbmNlIGlmIG5lZWRlZC5cbiAgICAgKiBBZGQgZG9jdW1lbnQgY2xpY2sgZXZlbnQgdG8gaGlkZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgdGhlIHBpY2tlci5cbiAgICAgKiBmaXJlcyBFdmVudHMjc2hvd1xuICAgICAqL1xuICAgIHNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLndpZGdldCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTZXREZWZhdWx0SWZOZWVkZWQoKTtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkV2lkZ2V0KCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVUaGVtZSgpO1xuICAgICAgICAgICAgdGhpcy5fc2hvd1NldHVwVmlld01vZGUoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zPy5jb250YWluZXIgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZW1lbnQgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zPy5kaXNwbGF5Py5wbGFjZW1lbnQgfHwgJ2JvdHRvbSc7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud2lkZ2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVBvcHVwKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQsIHRoaXMud2lkZ2V0LCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyczogW3sgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogdHJ1ZSB9XSxcbiAgICAgICAgICAgICAgICAgICAgLy8jMjQwMFxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXIgPT09ICdydGwnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGAke3BsYWNlbWVudH0tZW5kYFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtwbGFjZW1lbnR9LXN0YXJ0YCxcbiAgICAgICAgICAgICAgICB9KS50aGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMud2lkZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudmlld01vZGUgPT0gJ2Nsb2NrJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMuYWN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53aWRnZXRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWN0aW9uXScpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9hY3Rpb25zQ2xpY2tFdmVudCkpO1xuICAgICAgICAgICAgLy8gc2hvdyB0aGUgY2xvY2sgd2hlbiB1c2luZyBzaWRlQnlTaWRlXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVGltZSAmJiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuc2lkZUJ5U2lkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCk7XG4gICAgICAgICAgICAgICAgdGhpcy53aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNsb2NrQ29udGFpbmVyKVswXS5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcHVwKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2RvY3VtZW50Q2xpY2tFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuZW1pdCh7IHR5cGU6IE5hbWVzcGFjZS5ldmVudHMuc2hvdyB9KTtcbiAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgX3Nob3dTZXR1cFZpZXdNb2RlKCkge1xuICAgICAgICAvLyBJZiBtb2RlVmlldyBpcyBvbmx5IGNsb2NrXG4gICAgICAgIGNvbnN0IG9ubHlDbG9jayA9IHRoaXMuX2hhc1RpbWUgJiYgIXRoaXMuX2hhc0RhdGU7XG4gICAgICAgIC8vIHJlc2V0IHRoZSB2aWV3IHRvIHRoZSBjbG9jayBpZiB0aGVyZSdzIG5vIGRhdGUgY29tcG9uZW50c1xuICAgICAgICBpZiAob25seUNsb2NrKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9ICdjbG9jayc7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLmFjdGlvbi5lbWl0KHtcbiAgICAgICAgICAgICAgICBlOiBudWxsLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogQWN0aW9uVHlwZXMkMS5zaG93Q2xvY2ssXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdGhlcndpc2UgcmV0dXJuIHRvIHRoZSBjYWxlbmRhciB2aWV3XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUgPVxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb25seUNsb2NrICYmIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS52aWV3TW9kZSAhPT0gJ2Nsb2NrJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc1RpbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIENvbGxhcHNlLmhpZGVJbW1lZGlhdGVseSh0aGlzLnRpbWVDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgQ29sbGFwc2Uuc2hvdyh0aGlzLnRpbWVDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIENvbGxhcHNlLnNob3codGhpcy5kYXRlQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faGFzRGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd01vZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfc2hvd1NldERlZmF1bHRJZk5lZWRlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZXMucGlja2VkLmxlbmd0aCAhPSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy51c2VDdXJyZW50ICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlVGltZSgpLnNldExvY2FsaXphdGlvbih0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMua2VlcEludmFsaWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJpZXMgPSAwO1xuICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5tYXhEYXRlPy5pc0JlZm9yZShkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChkYXRlKSAmJiB0cmllcyA+IDMxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUubWFuaXB1bGF0ZShkaXJlY3Rpb24sIFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWVzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZSh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRlZmF1bHREYXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjcmVhdGVQb3B1cChlbGVtZW50LCB3aWRnZXQsIFxuICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBvcHRpb25zKSB7XG4gICAgICAgIGxldCBjcmVhdGVQb3BwZXJGdW5jdGlvbjtcbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBpZiAod2luZG93Py5Qb3BwZXIpIHtcbiAgICAgICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGNyZWF0ZVBvcHBlckZ1bmN0aW9uID0gd2luZG93Py5Qb3BwZXI/LmNyZWF0ZVBvcHBlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY3JlYXRlUG9wcGVyIH0gPSBhd2FpdCBpbXBvcnQoJ0Bwb3BwZXJqcy9jb3JlJyk7XG4gICAgICAgICAgICBjcmVhdGVQb3BwZXJGdW5jdGlvbiA9IGNyZWF0ZVBvcHBlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3JlYXRlUG9wcGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gY3JlYXRlUG9wcGVyRnVuY3Rpb24oZWxlbWVudCwgd2lkZ2V0LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQb3B1cCgpIHtcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2U/LnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSBjYWxlbmRhciB2aWV3IG1vZGUuIEUuZy4gbW9udGggPC0+IHllYXJcbiAgICAgKiBAcGFyYW0gZGlyZWN0aW9uIC0vKyBudW1iZXIgdG8gbW92ZSBjdXJyZW50Vmlld01vZGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9zaG93TW9kZShkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlLCBNYXRoLm1pbigzLCB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSArIGRpcmVjdGlvbikpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlID09IG1heClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9IG1heDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpZGdldFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke05hbWVzcGFjZS5jc3MuZGF0ZUNvbnRhaW5lcn0gPiBkaXY6bm90KC4ke05hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXJ9KSwgLiR7TmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyfSA+IGRpdjpub3QoLiR7TmFtZXNwYWNlLmNzcy5jbG9ja0NvbnRhaW5lcn0pYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChlKSA9PiAoZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKSk7XG4gICAgICAgIGNvbnN0IGRhdGVQaWNrZXJNb2RlID0gQ2FsZW5kYXJNb2Rlc1t0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZV07XG4gICAgICAgIGNvbnN0IHBpY2tlciA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoYC4ke2RhdGVQaWNrZXJNb2RlLmNsYXNzTmFtZX1gKTtcbiAgICAgICAgc3dpdGNoIChkYXRlUGlja2VyTW9kZS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVjYWRlRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy55ZWFyc0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICB0aGlzLnllYXJEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLm1vbnRoc0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnRoRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy5kYXlzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcGlja2VyLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuc2lkZUJ5U2lkZSlcbiAgICAgICAgICAgICh0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtOYW1lc3BhY2UuY3NzLmNsb2NrQ29udGFpbmVyfWApWzBdKS5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xuICAgICAgICB0aGlzLl91cGRhdGVDYWxlbmRhckhlYWRlcigpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnZpZXdVcGRhdGUuZW1pdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSB0aGVtZS4gRS5nLiBsaWdodCwgZGFyayBvciBhdXRvXG4gICAgICogQHBhcmFtIHRoZW1lIHRoZSB0aGVtZSBuYW1lXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlVGhlbWUodGhlbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGVtZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50aGVtZSA9PT0gdGhlbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRoZW1lID0gdGhlbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbGlnaHQnLCAnZGFyaycpO1xuICAgICAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QuYWRkKHRoaXMuX2dldFRoZW1lQ2xhc3MoKSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudGhlbWUgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgd2luZG93XG4gICAgICAgICAgICAgICAgLm1hdGNoTWVkaWEoTmFtZXNwYWNlLmNzcy5pc0RhcmtQcmVmZXJyZWRRdWVyeSlcbiAgICAgICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5fdXBkYXRlVGhlbWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3dcbiAgICAgICAgICAgICAgICAubWF0Y2hNZWRpYShOYW1lc3BhY2UuY3NzLmlzRGFya1ByZWZlcnJlZFF1ZXJ5KVxuICAgICAgICAgICAgICAgIC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLl91cGRhdGVUaGVtZSgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0VGhlbWVDbGFzcygpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRoZW1lID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRoZW1lIHx8ICdhdXRvJztcbiAgICAgICAgY29uc3QgaXNEYXJrTW9kZSA9IHdpbmRvdy5tYXRjaE1lZGlhICYmXG4gICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYShOYW1lc3BhY2UuY3NzLmlzRGFya1ByZWZlcnJlZFF1ZXJ5KS5tYXRjaGVzO1xuICAgICAgICBzd2l0Y2ggKGN1cnJlbnRUaGVtZSkge1xuICAgICAgICAgICAgY2FzZSAnbGlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBOYW1lc3BhY2UuY3NzLmxpZ2h0VGhlbWU7XG4gICAgICAgICAgICBjYXNlICdkYXJrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFtZXNwYWNlLmNzcy5kYXJrVGhlbWU7XG4gICAgICAgICAgICBjYXNlICdhdXRvJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNEYXJrTW9kZSA/IE5hbWVzcGFjZS5jc3MuZGFya1RoZW1lIDogTmFtZXNwYWNlLmNzcy5saWdodFRoZW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIF91cGRhdGVDYWxlbmRhckhlYWRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9oYXNEYXRlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBzaG93aW5nID0gW1xuICAgICAgICAgICAgLi4udGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihgLiR7TmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyfSBkaXZbc3R5bGUqPVwiZGlzcGxheTogZ3JpZFwiXWApLmNsYXNzTGlzdCxcbiAgICAgICAgXS5maW5kKCh4KSA9PiB4LnN0YXJ0c1dpdGgoTmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyKSk7XG4gICAgICAgIGNvbnN0IFtwcmV2aW91cywgc3dpdGNoZXIsIG5leHRdID0gdGhpcy53aWRnZXRcbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXIpWzBdXG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpO1xuICAgICAgICBzd2l0Y2ggKHNob3dpbmcpIHtcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHByZXZpb3VzLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5wcmV2aW91c0NlbnR1cnkpO1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnJyk7XG4gICAgICAgICAgICAgICAgbmV4dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ubmV4dENlbnR1cnkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLnllYXJzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHByZXZpb3VzLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5wcmV2aW91c0RlY2FkZSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdERlY2FkZSk7XG4gICAgICAgICAgICAgICAgbmV4dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ubmV4dERlY2FkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MubW9udGhzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHByZXZpb3VzLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5wcmV2aW91c1llYXIpO1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3RZZWFyKTtcbiAgICAgICAgICAgICAgICBuZXh0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5uZXh0WWVhcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MuZGF5c0NvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ucHJldmlvdXNNb250aCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdE1vbnRoKTtcbiAgICAgICAgICAgICAgICBuZXh0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5uZXh0TW9udGgpO1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZShzaG93aW5nLCB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5mb3JtYXQodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uZGF5Vmlld0hlYWRlckZvcm1hdCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaGVyLmlubmVyVGV4dCA9IHN3aXRjaGVyLmdldEF0dHJpYnV0ZShzaG93aW5nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBpY2tlciBpZiBuZWVkZWQuXG4gICAgICogUmVtb3ZlIGRvY3VtZW50IGNsaWNrIGV2ZW50IHRvIGhpZGUgd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwaWNrZXIuXG4gICAgICogZmlyZXMgRXZlbnRzI2hpZGVcbiAgICAgKi9cbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAoIXRoaXMud2lkZ2V0IHx8ICF0aGlzLl9pc1Zpc2libGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgaWYgKHRoaXMuX2lzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuZW1pdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogTmFtZXNwYWNlLmV2ZW50cy5oaWRlLFxuICAgICAgICAgICAgICAgIGRhdGU6IHRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ID8gbnVsbCA6IHRoaXMuZGF0ZXMubGFzdFBpY2tlZD8uY2xvbmUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2lzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fZG9jdW1lbnRDbGlja0V2ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgcGlja2VyJ3Mgb3BlbiBzdGF0ZS4gRmlyZXMgYSBzaG93L2hpZGUgZXZlbnQgZGVwZW5kaW5nLlxuICAgICAqL1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZG9jdW1lbnQgYW5kIGRhdGEtYWN0aW9uIGNsaWNrIGxpc3RlbmVyIGFuZCByZXNldCB0aGUgd2lkZ2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZGlzcG9zZSgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9kb2N1bWVudENsaWNrRXZlbnQpO1xuICAgICAgICBpZiAoIXRoaXMud2lkZ2V0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLndpZGdldFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjdGlvbl0nKVxuICAgICAgICAgICAgLmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9hY3Rpb25zQ2xpY2tFdmVudCkpO1xuICAgICAgICB0aGlzLndpZGdldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMud2lkZ2V0KTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIHdpZGdldHMgaHRtbCB0ZW1wbGF0ZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9idWlsZFdpZGdldCgpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLndpZGdldCk7XG4gICAgICAgIGNvbnN0IGRhdGVWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRhdGVWaWV3LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyKTtcbiAgICAgICAgZGF0ZVZpZXcuYXBwZW5kKHRoaXMuZ2V0SGVhZFRlbXBsYXRlKCksIHRoaXMuZGVjYWRlRGlzcGxheS5nZXRQaWNrZXIoKSwgdGhpcy55ZWFyRGlzcGxheS5nZXRQaWNrZXIoKSwgdGhpcy5tb250aERpc3BsYXkuZ2V0UGlja2VyKCksIHRoaXMuZGF0ZURpc3BsYXkuZ2V0UGlja2VyKCkpO1xuICAgICAgICBjb25zdCB0aW1lVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aW1lVmlldy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MudGltZUNvbnRhaW5lcik7XG4gICAgICAgIHRpbWVWaWV3LmFwcGVuZENoaWxkKHRoaXMudGltZURpc3BsYXkuZ2V0UGlja2VyKHRoaXMuX2ljb25UYWcuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aW1lVmlldy5hcHBlbmRDaGlsZCh0aGlzLmhvdXJEaXNwbGF5LmdldFBpY2tlcigpKTtcbiAgICAgICAgdGltZVZpZXcuYXBwZW5kQ2hpbGQodGhpcy5taW51dGVEaXNwbGF5LmdldFBpY2tlcigpKTtcbiAgICAgICAgdGltZVZpZXcuYXBwZW5kQ2hpbGQodGhpcy5zZWNvbmREaXNwbGF5LmdldFBpY2tlcigpKTtcbiAgICAgICAgY29uc3QgdG9vbGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b29sYmFyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy50b29sYmFyKTtcbiAgICAgICAgdG9vbGJhci5hcHBlbmQoLi4udGhpcy5nZXRUb29sYmFyRWxlbWVudHMoKSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuaW5saW5lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoJ2NhbGVuZGFyV2Vla3MnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnNpZGVCeVNpZGUgJiYgdGhpcy5faGFzRGF0ZUFuZFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkV2lkZ2V0U2lkZUJ5U2lkZSh0ZW1wbGF0ZSwgZGF0ZVZpZXcsIHRpbWVWaWV3LCB0b29sYmFyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRvb2xiYXJQbGFjZW1lbnQgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZCh0b29sYmFyKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXR1cENvbXBvbmVudFZpZXcgPSAoaGFzRmlyc3QsIGhhc1NlY29uZCwgZWxlbWVudCwgc2hvdWxkU2hvdykgPT4ge1xuICAgICAgICAgICAgaWYgKCFoYXNGaXJzdClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoaGFzU2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY29sbGFwc2UpO1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRTaG93KVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9O1xuICAgICAgICBzZXR1cENvbXBvbmVudFZpZXcodGhpcy5faGFzRGF0ZSwgdGhpcy5faGFzVGltZSwgZGF0ZVZpZXcsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS52aWV3TW9kZSAhPT0gJ2Nsb2NrJyk7XG4gICAgICAgIHNldHVwQ29tcG9uZW50Vmlldyh0aGlzLl9oYXNUaW1lLCB0aGlzLl9oYXNEYXRlLCB0aW1lVmlldywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnZpZXdNb2RlID09PSAnY2xvY2snKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50b29sYmFyUGxhY2VtZW50ID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQodG9vbGJhcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXJyb3cuY2xhc3NMaXN0LmFkZCgnYXJyb3cnKTtcbiAgICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKCdkYXRhLXBvcHBlci1hcnJvdycsICcnKTtcbiAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQoYXJyb3cpO1xuICAgICAgICB0aGlzLl93aWRnZXQgPSB0ZW1wbGF0ZTtcbiAgICB9XG4gICAgX2J1aWxkV2lkZ2V0U2lkZUJ5U2lkZSh0ZW1wbGF0ZSwgZGF0ZVZpZXcsIHRpbWVWaWV3LCB0b29sYmFyKSB7XG4gICAgICAgIHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zaWRlQnlTaWRlKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50b29sYmFyUGxhY2VtZW50ID09PSAndG9wJykge1xuICAgICAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQodG9vbGJhcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCd0ZC1yb3cnKTtcbiAgICAgICAgZGF0ZVZpZXcuY2xhc3NMaXN0LmFkZCgndGQtaGFsZicpO1xuICAgICAgICB0aW1lVmlldy5jbGFzc0xpc3QuYWRkKCd0ZC1oYWxmJyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChkYXRlVmlldyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0aW1lVmlldyk7XG4gICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudG9vbGJhclBsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKHRvb2xiYXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHRlbXBsYXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGhvdXJzLCBtaW51dGVzLCBvciBzZWNvbmRzIGNvbXBvbmVudCBpcyB0dXJuZWQgb25cbiAgICAgKi9cbiAgICBnZXQgX2hhc1RpbWUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuY2xvY2sgJiZcbiAgICAgICAgICAgICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5ob3VycyB8fFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLm1pbnV0ZXMgfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5zZWNvbmRzKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgeWVhciwgbW9udGgsIG9yIGRhdGUgY29tcG9uZW50IGlzIHR1cm5lZCBvblxuICAgICAqL1xuICAgIGdldCBfaGFzRGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5jYWxlbmRhciAmJlxuICAgICAgICAgICAgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLnllYXIgfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5tb250aCB8fFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmRhdGUpKTtcbiAgICB9XG4gICAgZ2V0IF9oYXNEYXRlQW5kVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0RhdGUgJiYgdGhpcy5faGFzVGltZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0b29sYmFyIGh0bWwgYmFzZWQgb24gb3B0aW9ucyBsaWtlIGJ1dHRvbnMgPT4gdG9kYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFRvb2xiYXJFbGVtZW50cygpIHtcbiAgICAgICAgY29uc3QgdG9vbGJhciA9IFtdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmJ1dHRvbnMudG9kYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnRvZGF5KTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24udG9kYXkpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnRvZGF5KSk7XG4gICAgICAgICAgICB0b29sYmFyLnB1c2goZGl2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlICYmXG4gICAgICAgICAgICB0aGlzLl9oYXNEYXRlICYmXG4gICAgICAgICAgICB0aGlzLl9oYXNUaW1lKSB7XG4gICAgICAgICAgICBsZXQgdGl0bGUsIGljb247XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnZpZXdNb2RlID09PSAnY2xvY2snKSB7XG4gICAgICAgICAgICAgICAgdGl0bGUgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3REYXRlO1xuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMuZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpdGxlID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0VGltZTtcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS50b2dnbGVQaWNrZXIpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aXRsZSk7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5faWNvblRhZyhpY29uKSk7XG4gICAgICAgICAgICB0b29sYmFyLnB1c2goZGl2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmJ1dHRvbnMuY2xlYXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmNsZWFyKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uY2xlYXIpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLmNsZWFyKSk7XG4gICAgICAgICAgICB0b29sYmFyLnB1c2goZGl2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmJ1dHRvbnMuY2xvc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmNsb3NlKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uY2xvc2UpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLmNsb3NlKSk7XG4gICAgICAgICAgICB0b29sYmFyLnB1c2goZGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9vbGJhcjtcbiAgICB9XG4gICAgLyoqKlxuICAgICAqIEJ1aWxkcyB0aGUgYmFzZSBoZWFkZXIgdGVtcGxhdGUgd2l0aCBuZXh0IGFuZCBwcmV2aW91cyBpY29uc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0SGVhZFRlbXBsYXRlKCkge1xuICAgICAgICBjb25zdCBjYWxlbmRhckhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjYWxlbmRhckhlYWRlci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXIpO1xuICAgICAgICBjb25zdCBwcmV2aW91cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcmV2aW91cy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MucHJldmlvdXMpO1xuICAgICAgICBwcmV2aW91cy5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5wcmV2aW91cyk7XG4gICAgICAgIHByZXZpb3VzLmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnByZXZpb3VzKSk7XG4gICAgICAgIGNvbnN0IHN3aXRjaGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN3aXRjaGVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5zd2l0Y2gpO1xuICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5jaGFuZ2VDYWxlbmRhclZpZXcpO1xuICAgICAgICBjb25zdCBuZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5leHQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLm5leHQpO1xuICAgICAgICBuZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLm5leHQpO1xuICAgICAgICBuZXh0LmFwcGVuZENoaWxkKHRoaXMuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLm5leHQpKTtcbiAgICAgICAgY2FsZW5kYXJIZWFkZXIuYXBwZW5kKHByZXZpb3VzLCBzd2l0Y2hlciwgbmV4dCk7XG4gICAgICAgIHJldHVybiBjYWxlbmRhckhlYWRlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGRzIGFuIGljb24gdGFnIGFzIGVpdGhlciBhbiBgPGk+YFxuICAgICAqIG9yIHdpdGggaWNvbnMgPT4gdHlwZSBpcyBgc3ByaXRlc2AgdGhlbiBhIHN2ZyB0YWcgaW5zdGVhZFxuICAgICAqIEBwYXJhbSBpY29uQ2xhc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pY29uVGFnKGljb25DbGFzcykge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLnR5cGUgPT09ICdzcHJpdGVzJykge1xuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3VzZScpO1xuICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnLCBpY29uQ2xhc3MpOyAvLyBEZXByZWNhdGVkLiBJbmNsdWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBpY29uQ2xhc3MpO1xuICAgICAgICAgICAgc3ZnLmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICAgICAgcmV0dXJuIHN2ZztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoLi4uaWNvbkNsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgICByZXR1cm4gaWNvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2F1c2VzIHRoZSB3aWRnZXQgdG8gZ2V0IHJlYnVpbHQgb24gbmV4dCBzaG93LiBJZiB0aGUgcGlja2VyIGlzIGFscmVhZHkgb3BlblxuICAgICAqIHRoZW4gaGlkZSBhbmQgcmVzaG93IGl0LlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlYnVpbGQoKSB7XG4gICAgICAgIGNvbnN0IHdhc1Zpc2libGUgPSB0aGlzLl9pc1Zpc2libGU7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICAgICAgaWYgKHdhc1Zpc2libGUpXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gICAgcmVmcmVzaEN1cnJlbnRWaWV3KCkge1xuICAgICAgICAvL2lmIHRoZSB3aWRnZXQgaXMgbm90IHNob3dpbmcsIGp1c3QgZGVzdHJveSBpdFxuICAgICAgICBpZiAoIXRoaXMuX2lzVmlzaWJsZSlcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Vmlldykge1xuICAgICAgICAgICAgY2FzZSAnY2xvY2snOlxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZSgnY2xvY2snKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NhbGVuZGFyJzpcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQubW9udGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0LnllYXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGVjYWRlcyc6XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKCdkZWNhZGUnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBMb2dpYyBmb3IgdmFyaW91cyBjbGljayBhY3Rpb25zXG4gKi9cbmNsYXNzIEFjdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGlzcGxheSk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRXZlbnRFbWl0dGVycyk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMuYWN0aW9uLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvKHJlc3VsdC5lLCByZXN1bHQuYWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBzZWxlY3RlZCBgYWN0aW9uYC4gU2VlIEFjdGlvblR5cGVzXG4gICAgICogQHBhcmFtIGUgVGhpcyBpcyBub3JtYWxseSBhIGNsaWNrIGV2ZW50XG4gICAgICogQHBhcmFtIGFjdGlvbiBJZiBub3QgcHJvdmlkZWQsIHRoZW4gbG9vayBmb3IgYSBbZGF0YS1hY3Rpb25dXG4gICAgICovXG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGRvKGUsIGFjdGlvbikge1xuICAgICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gZT8uY3VycmVudFRhcmdldDtcbiAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQ/LmNsYXNzTGlzdD8uY29udGFpbnMoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGFjdGlvbiA9IGFjdGlvbiB8fCBjdXJyZW50VGFyZ2V0Py5kYXRhc2V0Py5hY3Rpb247XG4gICAgICAgIGNvbnN0IGxhc3RQaWNrZWQgPSAodGhpcy5kYXRlcy5sYXN0UGlja2VkIHx8IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlKVxuICAgICAgICAgICAgLmNsb25lO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLm5leHQ6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEucHJldmlvdXM6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVOZXh0UHJldmlvdXMoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5jaGFuZ2VDYWxlbmRhclZpZXc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll9zaG93TW9kZSgxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZUNhbGVuZGFySGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0TW9udGg6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0WWVhcjpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3REZWNhZGU6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RDYWxlbmRhck1vZGUoYWN0aW9uLCBjdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3REYXk6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3REYXkoY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0SG91cjoge1xuICAgICAgICAgICAgICAgIGxldCBob3VyID0gK2N1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFBpY2tlZC5ob3VycyA+PSAxMiAmJiB0aGlzLm9wdGlvbnNTdG9yZS5pc1R3ZWx2ZUhvdXIpXG4gICAgICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICAgICAgbGFzdFBpY2tlZC5ob3VycyA9IGhvdXI7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShsYXN0UGlja2VkLCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlT3JDbG9jayhlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3RNaW51dGU6IHtcbiAgICAgICAgICAgICAgICBsYXN0UGlja2VkLm1pbnV0ZXMgPSArY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUobGFzdFBpY2tlZCwgdGhpcy5kYXRlcy5sYXN0UGlja2VkSW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU9yQ2xvY2soZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0U2Vjb25kOiB7XG4gICAgICAgICAgICAgICAgbGFzdFBpY2tlZC5zZWNvbmRzID0gK2N1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGxhc3RQaWNrZWQsIHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVPckNsb2NrKGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmluY3JlbWVudEhvdXJzOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0LmhvdXJzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRNaW51dGVzOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0Lm1pbnV0ZXMsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmluY3JlbWVudFNlY29uZHM6XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQuc2Vjb25kcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuZGVjcmVtZW50SG91cnM6XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQuaG91cnMsIC0xKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRNaW51dGVzOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0Lm1pbnV0ZXMsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcgKiAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuZGVjcmVtZW50U2Vjb25kczpcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGVBbmRTZXQobGFzdFBpY2tlZCwgVW5pdC5zZWNvbmRzLCAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEudG9nZ2xlTWVyaWRpZW06XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQuaG91cnMsIHRoaXMuZGF0ZXMubGFzdFBpY2tlZC5ob3VycyA+PSAxMiA/IC0xMiA6IDEyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS50b2dnbGVQaWNrZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVUb2dnbGUoY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrOlxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dIb3VyczpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93TWludXRlczpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93U2Vjb25kczpcbiAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSB0aGUgY2xvY2sgaXMgYWN0dWFsbHkgZGlzcGxheWluZ1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnNpZGVCeVNpZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgIT09ICdjbG9jaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9oaWRlIGNhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgIENvbGxhcHNlLmhpZGVJbW1lZGlhdGVseSh0aGlzLmRpc3BsYXkuZGF0ZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIC8vc2hvdyBjbG9ja1xuICAgICAgICAgICAgICAgICAgICBDb2xsYXBzZS5zaG93SW1tZWRpYXRlbHkodGhpcy5kaXNwbGF5LnRpbWVDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNob3dDbG9ja0NvbnRhaW5lcnMoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5jbGVhcjpcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlQ2FsZW5kYXJIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5jbG9zZTpcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnRvZGF5OiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZVRpbWUoKS5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlVmlld0RhdGUuZW1pdCh0b2RheSk7XG4gICAgICAgICAgICAgICAgLy90b2RvIHRoaXMgdGhpcyByZWFsbHkgYSBnb29kIGlkZWE/XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRvZGF5LCBVbml0LmRhdGUpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKHRvZGF5LCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlU2hvd0Nsb2NrQ29udGFpbmVycyhhY3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc3BsYXkuX2hhc1RpbWUpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnRocm93RXJyb3IoJ0Nhbm5vdCBzaG93IGNsb2NrIGNvbnRhaW5lcnMgd2hlbiB0aW1lIGlzIGRpc2FibGVkLicpO1xuICAgICAgICAgICAgLyogaWdub3JlIGNvdmVyYWdlOiBzaG91bGQgbmV2ZXIgaGFwcGVuICovXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgPSAnY2xvY2snO1xuICAgICAgICB0aGlzLmRpc3BsYXkud2lkZ2V0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLiR7TmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyfSA+IGRpdmApXG4gICAgICAgICAgICAuZm9yRWFjaCgoaHRtbEVsZW1lbnQpID0+IChodG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKSk7XG4gICAgICAgIGxldCBjbGFzc1RvVXNlID0gJyc7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9Vc2UgPSBOYW1lc3BhY2UuY3NzLmNsb2NrQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlKCdjbG9jaycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dIb3VyczpcbiAgICAgICAgICAgICAgICBjbGFzc1RvVXNlID0gTmFtZXNwYWNlLmNzcy5ob3VyQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlKFVuaXQuaG91cnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dNaW51dGVzOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9Vc2UgPSBOYW1lc3BhY2UuY3NzLm1pbnV0ZUNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZShVbml0Lm1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dTZWNvbmRzOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9Vc2UgPSBOYW1lc3BhY2UuY3NzLnNlY29uZENvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZShVbml0LnNlY29uZHMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgICh0aGlzLmRpc3BsYXkud2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NUb1VzZSlbMF0pLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XG4gICAgfVxuICAgIGhhbmRsZU5leHRQcmV2aW91cyhhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgeyB1bml0LCBzdGVwIH0gPSBDYWxlbmRhck1vZGVzW3RoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlXTtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gQWN0aW9uVHlwZXMkMS5uZXh0KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUubWFuaXB1bGF0ZShzdGVwLCB1bml0KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUubWFuaXB1bGF0ZShzdGVwICogLTEsIHVuaXQpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnZpZXdVcGRhdGUuZW1pdCgpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuX3Nob3dNb2RlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFmdGVyIHNldHRpbmcgdGhlIHZhbHVlIGl0IHdpbGwgZWl0aGVyIHNob3cgdGhlIGNsb2NrIG9yIGhpZGUgdGhlIHdpZGdldC5cbiAgICAgKiBAcGFyYW0gZVxuICAgICAqL1xuICAgIGhpZGVPckNsb2NrKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5pc1R3ZWx2ZUhvdXIgJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5taW51dGVzICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmtlZXBPcGVuICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG8oZSwgQWN0aW9uVHlwZXMkMS5zaG93Q2xvY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbW1vbiBmdW5jdGlvbiB0byBtYW5pcHVsYXRlIHtAbGluayBsYXN0UGlja2VkfSBieSBgdW5pdGAuXG4gICAgICogQHBhcmFtIGxhc3RQaWNrZWRcbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBjaGFuZ2UgYnlcbiAgICAgKi9cbiAgICBtYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIHVuaXQsIHZhbHVlID0gMSkge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gbGFzdFBpY2tlZC5tYW5pcHVsYXRlKHZhbHVlLCB1bml0KTtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKG5ld0RhdGUsIHVuaXQpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKG5ld0RhdGUsIHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVTZWxlY3RDYWxlbmRhck1vZGUoYWN0aW9uLCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gK2N1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3RNb250aDpcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5tb250aCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdFllYXI6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0RGVjYWRlOlxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLnllYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9PT1cbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll9zaG93TW9kZSgtMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlVG9nZ2xlKGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCd0aXRsZScpID09PVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0RGF0ZSkge1xuICAgICAgICAgICAgY3VycmVudFRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0VGltZSk7XG4gICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmlubmVySFRNTCA9IHRoaXMuZGlzcGxheS5faWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMudGltZSkub3V0ZXJIVE1MO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGVDYWxlbmRhckhlYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUucmVmcmVzaEN1cnJlbnRWaWV3KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50VGFyZ2V0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3REYXRlKTtcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuaW5uZXJIVE1MID0gdGhpcy5kaXNwbGF5Ll9pY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy5kYXRlKS5vdXRlckhUTUw7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5Ll9oYXNUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTaG93Q2xvY2tDb250YWluZXJzKEFjdGlvblR5cGVzJDEuc2hvd0Nsb2NrKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZSgnY2xvY2snKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpc3BsYXkud2lkZ2V0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLiR7TmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyfSwgLiR7TmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyfWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoaHRtbEVsZW1lbnQpID0+IENvbGxhcHNlLnRvZ2dsZShodG1sRWxlbWVudCkpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnZpZXdVcGRhdGUuZW1pdCgpO1xuICAgIH1cbiAgICBoYW5kbGVTZWxlY3REYXkoY3VycmVudFRhcmdldCkge1xuICAgICAgICBjb25zdCBkYXkgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZTtcbiAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3Mub2xkKSkge1xuICAgICAgICAgICAgZGF5Lm1hbmlwdWxhdGUoLTEsIFVuaXQubW9udGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLm5ldykpIHtcbiAgICAgICAgICAgIGRheS5tYW5pcHVsYXRlKDEsIFVuaXQubW9udGgpO1xuICAgICAgICB9XG4gICAgICAgIGRheS5kYXRlID0gK2N1cnJlbnRUYXJnZXQuZGF0YXNldC5kYXk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSlcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRGF0ZVJhbmdlKGRheSk7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlcykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNdWx0aURhdGUoZGF5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUoZGF5LCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmRpc3BsYXkuX2hhc1RpbWUgJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkua2VlcE9wZW4gJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kYXRlUmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlTXVsdGlEYXRlKGRheSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGVzLnBpY2tlZEluZGV4KGRheSwgVW5pdC5kYXRlKTtcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKG51bGwsIGluZGV4KTsgLy9kZXNlbGVjdCBtdWx0aS1kYXRlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4ICsgMTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLnBpY2tlZC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXksIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVEYXRlUmFuZ2UoZGF5KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5kYXRlcy5waWNrZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDI6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlciA9IHRoaXMuZGF0ZXMucGlja2VkWzBdO1xuICAgICAgICAgICAgICAgIGlmIChkYXkuZ2V0VGltZSgpID09PSBvdGhlci5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRheS5pc0JlZm9yZShvdGhlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXksIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKG90aGVyLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUoZGF5LCAwKTtcbiAgICB9XG59XG5cbi8qKlxuICogQSByb2J1c3QgYW5kIHBvd2VyZnVsIGRhdGUvdGltZSBwaWNrZXIgY29tcG9uZW50LlxuICovXG5jbGFzcyBUZW1wdXNEb21pbnVzIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB0aGlzLl9zdWJzY3JpYmVycyA9IHt9O1xuICAgICAgICB0aGlzLl9pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFdmVudCBmb3Igd2hlbiB0aGUgaW5wdXQgZmllbGQgY2hhbmdlcy4gVGhpcyBpcyBhIGNsYXNzIGxldmVsIG1ldGhvZCBzbyB0aGVyZSdzXG4gICAgICAgICAqIHNvbWV0aGluZyBmb3IgdGhlIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgdGhpcy5faW5wdXRDaGFuZ2VFdmVudCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW50ZXJuYWxseVRyaWdnZXJlZCA9IGV2ZW50Py5kZXRhaWw7XG4gICAgICAgICAgICBpZiAoaW50ZXJuYWxseVRyaWdnZXJlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBzZXRWaWV3RGF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRlcy5sYXN0UGlja2VkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSA9IHRoaXMuZGF0ZXMubGFzdFBpY2tlZC5jbG9uZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlcykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BsaXQgPSB2YWx1ZS5zcGxpdCh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlU3BsaXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0RnJvbUlucHV0KHZhbHVlU3BsaXRbaV0sIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNldFZpZXdEYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdURDogU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIHNldCB0aGUgbXVsdGlwbGVEYXRlcyB2YWx1ZXMgZnJvbSB0aGUgaW5wdXQgZmllbGQuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRGcm9tSW5wdXQodmFsdWUsIDApO1xuICAgICAgICAgICAgICAgIHNldFZpZXdEYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFdmVudCBmb3Igd2hlbiB0aGUgdG9nZ2xlIGlzIGNsaWNrZWQuIFRoaXMgaXMgYSBjbGFzcyBsZXZlbCBtZXRob2Qgc28gdGhlcmUnc1xuICAgICAgICAgKiBzb21ldGhpbmcgZm9yIHRoZSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl90b2dnbGVDbGlja0V2ZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQ/LmRpc2FibGVkIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LmRpc2FibGVkIHx8XG4gICAgICAgICAgICAgICAgLy9pZiB3ZSBqdXN0IGhhdmUgdGhlIGlucHV0IGFuZCBhbGxvdyBpbnB1dCB0b2dnbGUgaXMgZW5hYmxlZCwgdGhlbiBkb24ndCBjYXVzZSBhIHRvZ2dsZVxuICAgICAgICAgICAgICAgICh0aGlzLl90b2dnbGUubm9kZU5hbWUgPT09ICdJTlBVVCcgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlPy50eXBlID09PSAndGV4dCcgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5hbGxvd0lucHV0VG9nZ2xlKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRXZlbnQgZm9yIHdoZW4gdGhlIHRvZ2dsZSBpcyBjbGlja2VkLiBUaGlzIGlzIGEgY2xhc3MgbGV2ZWwgbWV0aG9kIHNvIHRoZXJlJ3NcbiAgICAgICAgICogc29tZXRoaW5nIGZvciB0aGUgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb3BlbkNsaWNrRXZlbnQgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudD8uZGlzYWJsZWQgfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8uZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRpc3BsYXkuaXNWaXNpYmxlKVxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9O1xuICAgICAgICBzZXR1cFNlcnZpY2VMb2NhdG9yKCk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRXZlbnRFbWl0dGVycyk7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShBY3Rpb25zKTtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5tdXN0UHJvdmlkZUVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZU9wdGlvbnMob3B0aW9ucywgRGVmYXVsdE9wdGlvbnMsIHRydWUpO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS51bnNldCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVJbnB1dCgpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplVG9nZ2xlKCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKVxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnZpZXdVcGRhdGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdVcGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlVmlld0RhdGUuc3Vic2NyaWJlKChkYXRlVGltZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZSA9IGRhdGVUaW1lO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHZpZXdEYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGU7XG4gICAgfVxuICAgIHNldCB2aWV3RGF0ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZSh0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9PT0gJ2Nsb2NrJyA/ICdjbG9jaycgOiAnY2FsZW5kYXInKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcGlja2VyIG9wdGlvbnMuIElmIGByZXNldGAgaXMgcHJvdmlkZSBgb3B0aW9uc2Agd2lsbCBiZSBtZXJnZWQgd2l0aCBEZWZhdWx0T3B0aW9ucyBpbnN0ZWFkLlxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICogQHBhcmFtIHJlc2V0XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVwZGF0ZU9wdGlvbnMob3B0aW9ucywgcmVzZXQgPSBmYWxzZSkge1xuICAgICAgICBpZiAocmVzZXQpXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplT3B0aW9ucyhvcHRpb25zLCBEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVPcHRpb25zKG9wdGlvbnMsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5zZXRMb2NhbGl6YXRpb24odGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24pO1xuICAgICAgICB0aGlzLmRpc3BsYXkucmVmcmVzaEN1cnJlbnRWaWV3KCk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBwaWNrZXIgb3BlbiBvciBjbG9zZWQuIElmIHRoZSBwaWNrZXIgaXMgZGlzYWJsZWQsIG5vdGhpbmcgd2lsbCBoYXBwZW4uXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuZGlzcGxheS50b2dnbGUoKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBwaWNrZXIgdW5sZXNzIHRoZSBwaWNrZXIgaXMgZGlzYWJsZWQuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0Rpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmRpc3BsYXkuc2hvdygpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBpY2tlciB1bmxlc3MgdGhlIHBpY2tlciBpcyBkaXNhYmxlZC5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRoZSBwaWNrZXIgYW5kIHRoZSB0YXJnZXQgaW5wdXQgZmllbGQuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuX2lzRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAvLyB0b2RvIHRoaXMgbWlnaHQgYmUgdW5kZXNpcmVkLiBJZiBhIGRldiBkaXNhYmxlcyB0aGUgaW5wdXQgZmllbGQgdG9cbiAgICAgICAgLy8gb25seSBhbGxvdyB1c2luZyB0aGUgcGlja2VyLCB0aGlzIHdpbGwgYnJlYWsgdGhhdC5cbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgdGhlIHBpY2tlciBhbmQgdGhlIHRhcmdldCBpbnB1dCBmaWVsZC5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLl9pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBzZWxlY3RlZCBkYXRlc1xuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5kYXRlcy5jbGVhcigpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogQWxsb3dzIGZvciBhIGRpcmVjdCBzdWJzY3JpcHRpb24gdG8gcGlja2VyIGV2ZW50cywgd2l0aG91dCBoYXZpbmcgdG8gdXNlIGFkZEV2ZW50TGlzdGVuZXIgb24gdGhlIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZXMgU2VlIE5hbWVzcGFjZS5FdmVudHNcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tzIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBldmVudCBpcyB0cmlnZ2VyZWRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc3Vic2NyaWJlKGV2ZW50VHlwZXMsIGNhbGxiYWNrcyAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICkge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50VHlwZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBldmVudFR5cGVzID0gW2V2ZW50VHlwZXNdO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjYWxsQmFja0FycmF5OyAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2FsbGJhY2tzKSkge1xuICAgICAgICAgICAgY2FsbEJhY2tBcnJheSA9IFtjYWxsYmFja3NdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FsbEJhY2tBcnJheSA9IGNhbGxiYWNrcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnRUeXBlcy5sZW5ndGggIT09IGNhbGxCYWNrQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5zdWJzY3JpYmVNaXNtYXRjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJldHVybkFycmF5ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZXZlbnRUeXBlID0gZXZlbnRUeXBlc1tpXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLl9zdWJzY3JpYmVyc1tldmVudFR5cGVdKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50VHlwZV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50VHlwZV0ucHVzaChjYWxsQmFja0FycmF5W2ldKTtcbiAgICAgICAgICAgIHJldHVybkFycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlOiB0aGlzLl91bnN1YnNjcmliZS5iaW5kKHRoaXMsIGV2ZW50VHlwZSwgdGhpcy5fc3Vic2NyaWJlcnNbZXZlbnRUeXBlXS5sZW5ndGggLSAxKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkFycmF5WzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5BcnJheTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBwaWNrZXIgYW5kIHJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICAgICAgLy8gdGhpcyB3aWxsIGNsZWFyIHRoZSBkb2N1bWVudCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLmRpc3BsYXkuX2Rpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9pbnB1dENoYW5nZUV2ZW50KTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuYWxsb3dJbnB1dFRvZ2dsZSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb3BlbkNsaWNrRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fb3BlbkNsaWNrRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RvZ2dsZT8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90b2dnbGVDbGlja0V2ZW50KTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaWJlcnMgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgb3B0aW9ucyB0byB1c2UgdGhlIHByb3ZpZGVkIGxhbmd1YWdlLlxuICAgICAqIFRIZSBsYW5ndWFnZSBmaWxlIG11c3QgYmUgbG9hZGVkIGZpcnN0LlxuICAgICAqIEBwYXJhbSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGxvY2FsZShsYW5ndWFnZSkge1xuICAgICAgICBjb25zdCBhc2tlZCA9IGxvYWRlZExvY2FsZXNbbGFuZ3VhZ2VdO1xuICAgICAgICBpZiAoIWFza2VkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoe1xuICAgICAgICAgICAgbG9jYWxpemF0aW9uOiBhc2tlZCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGFuIGV2ZW50IGxpa2UgQ2hhbmdlRXZlbnQgd2hlbiB0aGUgcGlja2VyIGhhcyB1cGRhdGVkIHRoZSB2YWx1ZVxuICAgICAqIG9mIGEgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKiBAcGFyYW0gZXZlbnQgQWNjZXB0cyBhIEJhc2VFdmVudCBvYmplY3QuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdHJpZ2dlckV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnZpZXdNb2RlID0gdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXc7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlRXZlbnQgPSBldmVudC50eXBlID09PSBOYW1lc3BhY2UuZXZlbnRzLmNoYW5nZTtcbiAgICAgICAgaWYgKGlzQ2hhbmdlRXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0ZSwgb2xkRGF0ZSwgaXNDbGVhciB9ID0gZXZlbnQ7XG4gICAgICAgICAgICBpZiAoKGRhdGUgJiYgb2xkRGF0ZSAmJiBkYXRlLmlzU2FtZShvbGREYXRlKSkgfHxcbiAgICAgICAgICAgICAgICAoIWlzQ2xlYXIgJiYgIWRhdGUgJiYgIW9sZERhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faGFuZGxlQWZ0ZXJDaGFuZ2VFdmVudChldmVudCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8uZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywgeyBkZXRhaWw6IGV2ZW50IH0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KGV2ZW50LnR5cGUsIHsgZGV0YWlsOiBldmVudCB9KSk7XG4gICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGNvbnN0ICQgPSB3aW5kb3cualF1ZXJ5O1xuICAgICAgICAgICAgaWYgKGlzQ2hhbmdlRXZlbnQgJiYgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMub3B0aW9uc1N0b3JlLmlucHV0KS50cmlnZ2VyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudCkudHJpZ2dlcihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHVibGlzaChldmVudCk7XG4gICAgfVxuICAgIF9wdWJsaXNoKGV2ZW50KSB7XG4gICAgICAgIC8vIHJldHVybiBpZiBldmVudCBpcyBub3Qgc3Vic2NyaWJlZFxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5fc3Vic2NyaWJlcnNbZXZlbnQudHlwZV0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVHJpZ2dlciBjYWxsYmFjayBmb3IgZWFjaCBzdWJzY3JpYmVyXG4gICAgICAgIHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50LnR5cGVdLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyBhIFZpZXdVcGRhdGUgZXZlbnQgd2hlbiwgZm9yIGV4YW1wbGUsIHRoZSBtb250aCB2aWV3IGlzIGNoYW5nZWQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdmlld1VwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IE5hbWVzcGFjZS5ldmVudHMudXBkYXRlLFxuICAgICAgICAgICAgdmlld0RhdGU6IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3Vuc3Vic2NyaWJlKGV2ZW50TmFtZSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaWJlcnNbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZXMgdHdvIE9wdGlvbiBvYmplY3RzIHRvZ2V0aGVyIGFuZCB2YWxpZGF0ZXMgb3B0aW9ucyB0eXBlXG4gICAgICogQHBhcmFtIGNvbmZpZyBuZXcgT3B0aW9uc1xuICAgICAqIEBwYXJhbSBtZXJnZVRvIE9wdGlvbnMgdG8gbWVyZ2UgaW50b1xuICAgICAqIEBwYXJhbSBpbmNsdWRlRGF0YXNldCBXaGVuIHRydWUsIHRoZSBlbGVtZW50cyBkYXRhLXRkIGF0dHJpYnV0ZXMgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pbml0aWFsaXplT3B0aW9ucyhjb25maWcsIG1lcmdlVG8sIGluY2x1ZGVEYXRhc2V0ID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IG5ld0NvbmZpZyA9IE9wdGlvbkNvbnZlcnRlci5kZWVwQ29weShjb25maWcpO1xuICAgICAgICBuZXdDb25maWcgPSBPcHRpb25Db252ZXJ0ZXIuX21lcmdlT3B0aW9ucyhuZXdDb25maWcsIG1lcmdlVG8pO1xuICAgICAgICBpZiAoaW5jbHVkZURhdGFzZXQpXG4gICAgICAgICAgICBuZXdDb25maWcgPSBPcHRpb25Db252ZXJ0ZXIuX2RhdGFUb09wdGlvbnModGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudCwgbmV3Q29uZmlnKTtcbiAgICAgICAgT3B0aW9uQ29udmVydGVyLl92YWxpZGF0ZUNvbmZsaWN0cyhuZXdDb25maWcpO1xuICAgICAgICBuZXdDb25maWcudmlld0RhdGUgPSBuZXdDb25maWcudmlld0RhdGUuc2V0TG9jYWxpemF0aW9uKG5ld0NvbmZpZy5sb2NhbGl6YXRpb24pO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmlzU2FtZShuZXdDb25maWcudmlld0RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZSA9IG5ld0NvbmZpZy52aWV3RGF0ZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgbWluaW11bSB2aWV3IGFsbG93ZWQgYnkgdGhlIHBpY2tlci4gRm9yIGV4YW1wbGUgdGhlIGNhc2Ugb2Ygb25seVxuICAgICAgICAgKiBhbGxvd2luZyB5ZWFyIGFuZCBtb250aCB0byBiZSBzZWxlY3RlZCBidXQgbm90IGRhdGUuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAobmV3Q29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy55ZWFyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0NvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMubW9udGgpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3Q29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy5kYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUgPSBNYXRoLm1heCh0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSwgdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUpO1xuICAgICAgICAvLyBVcGRhdGUgdmlldyBtb2RlIGlmIG5lZWRlZFxuICAgICAgICBpZiAoQ2FsZW5kYXJNb2Rlc1t0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZV0ubmFtZSAhPT1cbiAgICAgICAgICAgIG5ld0NvbmZpZy5kaXNwbGF5LnZpZXdNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9IE1hdGgubWF4KENhbGVuZGFyTW9kZXMuZmluZEluZGV4KCh4KSA9PiB4Lm5hbWUgPT09IG5ld0NvbmZpZy5kaXNwbGF5LnZpZXdNb2RlKSwgdGhpcy5vcHRpb25zU3RvcmUubWluaW11bUNhbGVuZGFyVmlld01vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXk/LmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGUoJ2FsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdDb25maWcuZGlzcGxheS5jb21wb25lbnRzLnVzZVR3ZW50eWZvdXJIb3VyICYmXG4gICAgICAgICAgICBuZXdDb25maWcubG9jYWxpemF0aW9uLmhvdXJDeWNsZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbmV3Q29uZmlnLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUgPSAnaDI0JztcbiAgICAgICAgZWxzZSBpZiAobmV3Q29uZmlnLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbmV3Q29uZmlnLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUgPSBndWVzc0hvdXJDeWNsZShuZXdDb25maWcubG9jYWxpemF0aW9uLmxvY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0NvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZSAmJlxuICAgICAgICAgICAgdGhpcy52aWV3RGF0ZS5pc0FmdGVyKG5ld0NvbmZpZy5yZXN0cmljdGlvbnMubWF4RGF0ZSkpXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlID0gbmV3Q29uZmlnLnJlc3RyaWN0aW9ucy5tYXhEYXRlO1xuICAgICAgICBpZiAobmV3Q29uZmlnLnJlc3RyaWN0aW9ucy5taW5EYXRlICYmXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlLmlzQmVmb3JlKG5ld0NvbmZpZy5yZXN0cmljdGlvbnMubWluRGF0ZSkpXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlID0gbmV3Q29uZmlnLnJlc3RyaWN0aW9ucy5taW5EYXRlO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zID0gbmV3Q29uZmlnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYW4gaW5wdXQgZmllbGQgaXMgYmVpbmcgdXNlZCwgYXR0ZW1wdHMgdG8gbG9jYXRlIG9uZSBhbmQgc2V0cyBhblxuICAgICAqIGV2ZW50IGxpc3RlbmVyIGlmIGZvdW5kLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXRpYWxpemVJbnB1dCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQudGFnTmFtZSA9PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dCA9IHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQuZGF0YXNldC50ZFRhcmdldElucHV0O1xuICAgICAgICAgICAgaWYgKHF1ZXJ5ID09IHVuZGVmaW5lZCB8fCBxdWVyeSA9PSAnbmVhcmVzdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dCA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0ID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLmlucHV0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlICYmIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGVmYXVsdERhdGUpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSA9IHRoaXMuZGF0ZXMuZm9ybWF0SW5wdXQodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWZhdWx0RGF0ZSk7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX2lucHV0Q2hhbmdlRXZlbnQpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5hbGxvd0lucHV0VG9nZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29wZW5DbGlja0V2ZW50KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fb3BlbkNsaWNrRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXRDaGFuZ2VFdmVudCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIGxvY2F0ZSBhIHRvZ2dsZSBmb3IgdGhlIHBpY2tlciBhbmQgc2V0cyBhbiBldmVudCBsaXN0ZW5lclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXRpYWxpemVUb2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LmRhdGFzZXQudGRUYXJnZXRUb2dnbGU7XG4gICAgICAgIGlmIChxdWVyeSA9PSAnbmVhcmVzdCcpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gJ1tkYXRhLXRkLXRvZ2dsZT1cImRhdGV0aW1lcGlja2VyXCJdJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b2dnbGUgPVxuICAgICAgICAgICAgcXVlcnkgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50XG4gICAgICAgICAgICAgICAgOiB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICAgICAgICB0aGlzLl90b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90b2dnbGVDbGlja0V2ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlIG9wdGlvbiBpcyBlbmFibGVkIHRoaXMgd2lsbCByZW5kZXIgdGhlIGNsb2NrIHZpZXcgYWZ0ZXIgYSBkYXRlIHBpY2suXG4gICAgICogQHBhcmFtIGUgY2hhbmdlIGV2ZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlQWZ0ZXJDaGFuZ2VFdmVudChlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgLy8gb3B0aW9ucyBpcyBkaXNhYmxlZFxuICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5wcm9tcHRUaW1lT25EYXRlQ2hhbmdlIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXMgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlIHx8XG4gICAgICAgICAgICAvLyB0aW1lIGlzIGRpc2FibGVkXG4gICAgICAgICAgICAhdGhpcy5kaXNwbGF5Ll9oYXNUaW1lIHx8XG4gICAgICAgICAgICAvLyBjbG9jayBjb21wb25lbnQgaXMgYWxyZWFkeSBzaG93aW5nXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkud2lkZ2V0XG4gICAgICAgICAgICAgICAgPy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3Muc2hvdylbMF1cbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3MudGltZUNvbnRhaW5lcikpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEZpcnN0IHRpbWUgZXZlci4gSWYgdXNlQ3VycmVudCBvcHRpb24gaXMgc2V0IHRvIHRydWUgKGRlZmF1bHQpLCBkbyBub3RoaW5nXG4gICAgICAgIC8vIGJlY2F1c2UgdGhlIGZpcnN0IGRhdGUgaXMgc2VsZWN0ZWQgYXV0b21hdGljYWxseS5cbiAgICAgICAgLy8gb3IgZGF0ZSBkaWRuJ3QgY2hhbmdlICh0aW1lIGRpZCkgb3IgZGF0ZSBjaGFuZ2VkIGJlY2F1c2UgdGltZSBkaWQuXG4gICAgICAgIGlmICgoIWUub2xkRGF0ZSAmJiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnVzZUN1cnJlbnQpIHx8XG4gICAgICAgICAgICAoZS5vbGREYXRlICYmIGUuZGF0ZT8uaXNTYW1lKGUub2xkRGF0ZSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2N1cnJlbnRQcm9tcHRUaW1lVGltZW91dCk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQcm9tcHRUaW1lVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheS53aWRnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLmFjdGlvbi5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcy5kaXNwbGF5LndpZGdldC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3Rpb249XCJ0b2dnbGVQaWNrZXJcIl0nKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBBY3Rpb25UeXBlcyQxLnRvZ2dsZVBpY2tlcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5wcm9tcHRUaW1lT25EYXRlQ2hhbmdlVHJhbnNpdGlvbkRlbGF5KTtcbiAgICB9XG59XG4vKipcbiAqIFdoZW5ldmVyIGEgbG9jYWxlIGlzIGxvYWRlZCB2aWEgYSBwbHVnaW4gdGhlbiBzdG9yZSBpdCBoZXJlIGJhc2VkIG9uIHRoZVxuICogbG9jYWxlIG5hbWUuIEUuZy4gbG9hZGVkTG9jYWxlc1sncnUnXVxuICovXG5jb25zdCBsb2FkZWRMb2NhbGVzID0ge307XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4vKipcbiAqIENhbGxlZCBmcm9tIGEgbG9jYWxlIHBsdWdpbi5cbiAqIEBwYXJhbSBsIGxvY2FsZSBvYmplY3QgZm9yIGxvY2FsaXphdGlvbiBvcHRpb25zXG4gKi9cbmNvbnN0IGxvYWRMb2NhbGUgPSAobCkgPT4ge1xuICAgIGlmIChsb2FkZWRMb2NhbGVzW2wubmFtZV0pXG4gICAgICAgIHJldHVybjtcbiAgICBsb2FkZWRMb2NhbGVzW2wubmFtZV0gPSBsLmxvY2FsaXphdGlvbjtcbn07XG4vKipcbiAqIEEgc2V0cyB0aGUgZ2xvYmFsIGxvY2FsaXphdGlvbiBvcHRpb25zIHRvIHRoZSBwcm92aWRlZCBsb2NhbGUgbmFtZS5cbiAqIGBsb2FkTG9jYWxlYCBNVVNUIGJlIGNhbGxlZCBmaXJzdC5cbiAqIEBwYXJhbSBsXG4gKi9cbmNvbnN0IGxvY2FsZSA9IChsKSA9PiB7XG4gICAgY29uc3QgYXNrZWQgPSBsb2FkZWRMb2NhbGVzW2xdO1xuICAgIGlmICghYXNrZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBEZWZhdWx0T3B0aW9ucy5sb2NhbGl6YXRpb24gPSBhc2tlZDtcbn07XG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4vKipcbiAqIENhbGxlZCBmcm9tIGEgcGx1Z2luIHRvIGV4dGVuZCBvciBvdmVycmlkZSBwaWNrZXIgZGVmYXVsdHMuXG4gKiBAcGFyYW0gcGx1Z2luXG4gKiBAcGFyYW0gb3B0aW9uXG4gKi9cbmNvbnN0IGV4dGVuZCA9IGZ1bmN0aW9uIChwbHVnaW4sIG9wdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgIGlmICghcGx1Z2luKVxuICAgICAgICByZXR1cm4gdGVtcHVzRG9taW51cztcbiAgICBpZiAoIXBsdWdpbi5pbnN0YWxsZWQpIHtcbiAgICAgICAgLy8gaW5zdGFsbCBwbHVnaW4gb25seSBvbmNlXG4gICAgICAgIHBsdWdpbihvcHRpb24sIHsgVGVtcHVzRG9taW51cywgRGF0ZXMsIERpc3BsYXksIERhdGVUaW1lLCBOYW1lc3BhY2UgfSwgdGVtcHVzRG9taW51cyk7XG4gICAgICAgIHBsdWdpbi5pbnN0YWxsZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcHVzRG9taW51cztcbn07XG5jb25zdCB2ZXJzaW9uID0gJzYuNy4xMyc7XG5jb25zdCB0ZW1wdXNEb21pbnVzID0ge1xuICAgIFRlbXB1c0RvbWludXMsXG4gICAgZXh0ZW5kLFxuICAgIGxvYWRMb2NhbGUsXG4gICAgbG9jYWxlLFxuICAgIE5hbWVzcGFjZSxcbiAgICBEZWZhdWx0T3B0aW9ucyxcbiAgICBEYXRlVGltZSxcbiAgICBVbml0LFxuICAgIHZlcnNpb24sXG4gICAgRGVmYXVsdEVuTG9jYWxpemF0aW9uLFxufTtcblxuZXhwb3J0IHsgRGF0ZVRpbWUsIERlZmF1bHRFbkxvY2FsaXphdGlvbiwgRGVmYXVsdE9wdGlvbnMsIE5hbWVzcGFjZSwgVGVtcHVzRG9taW51cywgVW5pdCwgZXh0ZW5kLCBsb2FkTG9jYWxlLCBsb2NhbGUsIHZlcnNpb24gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlbXB1cy1kb21pbnVzLmVzbS5qcy5tYXBcbiIsInZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbnZhciBCcm93c2VySW5mbyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcm93c2VySW5mbyhuYW1lLCB2ZXJzaW9uLCBvcykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLm9zID0gb3M7XG4gICAgICAgIHRoaXMudHlwZSA9ICdicm93c2VyJztcbiAgICB9XG4gICAgcmV0dXJuIEJyb3dzZXJJbmZvO1xufSgpKTtcbmV4cG9ydCB7IEJyb3dzZXJJbmZvIH07XG52YXIgTm9kZUluZm8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTm9kZUluZm8odmVyc2lvbikge1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLnR5cGUgPSAnbm9kZSc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdub2RlJztcbiAgICAgICAgdGhpcy5vcyA9IHByb2Nlc3MucGxhdGZvcm07XG4gICAgfVxuICAgIHJldHVybiBOb2RlSW5mbztcbn0oKSk7XG5leHBvcnQgeyBOb2RlSW5mbyB9O1xudmFyIFNlYXJjaEJvdERldmljZUluZm8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VhcmNoQm90RGV2aWNlSW5mbyhuYW1lLCB2ZXJzaW9uLCBvcywgYm90KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMub3MgPSBvcztcbiAgICAgICAgdGhpcy5ib3QgPSBib3Q7XG4gICAgICAgIHRoaXMudHlwZSA9ICdib3QtZGV2aWNlJztcbiAgICB9XG4gICAgcmV0dXJuIFNlYXJjaEJvdERldmljZUluZm87XG59KCkpO1xuZXhwb3J0IHsgU2VhcmNoQm90RGV2aWNlSW5mbyB9O1xudmFyIEJvdEluZm8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQm90SW5mbygpIHtcbiAgICAgICAgdGhpcy50eXBlID0gJ2JvdCc7XG4gICAgICAgIHRoaXMuYm90ID0gdHJ1ZTsgLy8gTk9URTogZGVwcmVjYXRlZCB0ZXN0IG5hbWUgaW5zdGVhZFxuICAgICAgICB0aGlzLm5hbWUgPSAnYm90JztcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5vcyA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBCb3RJbmZvO1xufSgpKTtcbmV4cG9ydCB7IEJvdEluZm8gfTtcbnZhciBSZWFjdE5hdGl2ZUluZm8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVhY3ROYXRpdmVJbmZvKCkge1xuICAgICAgICB0aGlzLnR5cGUgPSAncmVhY3QtbmF0aXZlJztcbiAgICAgICAgdGhpcy5uYW1lID0gJ3JlYWN0LW5hdGl2ZSc7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IG51bGw7XG4gICAgICAgIHRoaXMub3MgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3ROYXRpdmVJbmZvO1xufSgpKTtcbmV4cG9ydCB7IFJlYWN0TmF0aXZlSW5mbyB9O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxudmFyIFNFQVJDSEJPWF9VQV9SRUdFWCA9IC9hbGV4YXxib3R8Y3Jhd2woZXJ8aW5nKXxmYWNlYm9va2V4dGVybmFsaGl0fGZlZWRidXJuZXJ8Z29vZ2xlIHdlYiBwcmV2aWV3fG5hZ2lvc3xwb3N0cmFua3xwaW5nZG9tfHNsdXJwfHNwaWRlcnx5YWhvbyF8eWFuZGV4LztcbnZhciBTRUFSQ0hCT1RfT1NfUkVHRVggPSAvKG51aGt8Y3VybHxHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrXFwgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpLztcbnZhciBSRVFVSVJFRF9WRVJTSU9OX1BBUlRTID0gMztcbnZhciB1c2VyQWdlbnRSdWxlcyA9IFtcbiAgICBbJ2FvbCcsIC9BT0xTaGllbGRcXC8oWzAtOVxcLl9dKykvXSxcbiAgICBbJ2VkZ2UnLCAvRWRnZVxcLyhbMC05XFwuX10rKS9dLFxuICAgIFsnZWRnZS1pb3MnLCAvRWRnaU9TXFwvKFswLTlcXC5fXSspL10sXG4gICAgWyd5YW5kZXhicm93c2VyJywgL1lhQnJvd3NlclxcLyhbMC05XFwuX10rKS9dLFxuICAgIFsna2FrYW90YWxrJywgL0tBS0FPVEFMS1xccyhbMC05XFwuXSspL10sXG4gICAgWydzYW1zdW5nJywgL1NhbXN1bmdCcm93c2VyXFwvKFswLTlcXC5dKykvXSxcbiAgICBbJ3NpbGsnLCAvXFxiU2lsa1xcLyhbMC05Ll8tXSspXFxiL10sXG4gICAgWydtaXVpJywgL01pdWlCcm93c2VyXFwvKFswLTlcXC5dKykkL10sXG4gICAgWydiZWFrZXInLCAvQmVha2VyQnJvd3NlclxcLyhbMC05XFwuXSspL10sXG4gICAgWydlZGdlLWNocm9taXVtJywgL0VkZ0E/XFwvKFswLTlcXC5dKykvXSxcbiAgICBbXG4gICAgICAgICdjaHJvbWl1bS13ZWJ2aWV3JyxcbiAgICAgICAgLyg/IUNocm9tLipPUFIpd3ZcXCkuKkNocm9tKD86ZXxpdW0pXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvLFxuICAgIF0sXG4gICAgWydjaHJvbWUnLCAvKD8hQ2hyb20uKk9QUilDaHJvbSg/OmV8aXVtKVxcLyhbMC05XFwuXSspKDo/XFxzfCQpL10sXG4gICAgWydwaGFudG9tanMnLCAvUGhhbnRvbUpTXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvXSxcbiAgICBbJ2NyaW9zJywgL0NyaU9TXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvXSxcbiAgICBbJ2ZpcmVmb3gnLCAvRmlyZWZveFxcLyhbMC05XFwuXSspKD86XFxzfCQpL10sXG4gICAgWydmeGlvcycsIC9GeGlPU1xcLyhbMC05XFwuXSspL10sXG4gICAgWydvcGVyYS1taW5pJywgL09wZXJhIE1pbmkuKlZlcnNpb25cXC8oWzAtOVxcLl0rKS9dLFxuICAgIFsnb3BlcmEnLCAvT3BlcmFcXC8oWzAtOVxcLl0rKSg/Olxcc3wkKS9dLFxuICAgIFsnb3BlcmEnLCAvT1BSXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvXSxcbiAgICBbJ3BpZScsIC9eTWljcm9zb2Z0IFBvY2tldCBJbnRlcm5ldCBFeHBsb3JlclxcLyhcXGQrXFwuXFxkKykkL10sXG4gICAgWydwaWUnLCAvXk1vemlsbGFcXC9cXGRcXC5cXGQrXFxzXFwoY29tcGF0aWJsZTtcXHMoPzpNU1A/SUV8TVNJbnRlcm5ldCBFeHBsb3JlcikgKFxcZCtcXC5cXGQrKTsuKldpbmRvd3MgQ0UuKlxcKSQvXSxcbiAgICBbJ25ldGZyb250JywgL15Nb3ppbGxhXFwvXFxkXFwuXFxkKy4qTmV0RnJvbnRcXC8oXFxkLlxcZCkvXSxcbiAgICBbJ2llJywgL1RyaWRlbnRcXC83XFwuMC4qcnZcXDooWzAtOVxcLl0rKS4qXFwpLipHZWNrbyQvXSxcbiAgICBbJ2llJywgL01TSUVcXHMoWzAtOVxcLl0rKTsuKlRyaWRlbnRcXC9bNC03XS4wL10sXG4gICAgWydpZScsIC9NU0lFXFxzKDdcXC4wKS9dLFxuICAgIFsnYmIxMCcsIC9CQjEwO1xcc1RvdWNoLipWZXJzaW9uXFwvKFswLTlcXC5dKykvXSxcbiAgICBbJ2FuZHJvaWQnLCAvQW5kcm9pZFxccyhbMC05XFwuXSspL10sXG4gICAgWydpb3MnLCAvVmVyc2lvblxcLyhbMC05XFwuX10rKS4qTW9iaWxlLipTYWZhcmkuKi9dLFxuICAgIFsnc2FmYXJpJywgL1ZlcnNpb25cXC8oWzAtOVxcLl9dKykuKlNhZmFyaS9dLFxuICAgIFsnZmFjZWJvb2snLCAvRkJbQVNdVlxcLyhbMC05XFwuXSspL10sXG4gICAgWydpbnN0YWdyYW0nLCAvSW5zdGFncmFtXFxzKFswLTlcXC5dKykvXSxcbiAgICBbJ2lvcy13ZWJ2aWV3JywgL0FwcGxlV2ViS2l0XFwvKFswLTlcXC5dKykuKk1vYmlsZS9dLFxuICAgIFsnaW9zLXdlYnZpZXcnLCAvQXBwbGVXZWJLaXRcXC8oWzAtOVxcLl0rKS4qR2Vja29cXCkkL10sXG4gICAgWydjdXJsJywgL15jdXJsXFwvKFswLTlcXC5dKykkL10sXG4gICAgWydzZWFyY2hib3QnLCBTRUFSQ0hCT1hfVUFfUkVHRVhdLFxuXTtcbnZhciBvcGVyYXRpbmdTeXN0ZW1SdWxlcyA9IFtcbiAgICBbJ2lPUycsIC9pUChob25lfG9kfGFkKS9dLFxuICAgIFsnQW5kcm9pZCBPUycsIC9BbmRyb2lkL10sXG4gICAgWydCbGFja0JlcnJ5IE9TJywgL0JsYWNrQmVycnl8QkIxMC9dLFxuICAgIFsnV2luZG93cyBNb2JpbGUnLCAvSUVNb2JpbGUvXSxcbiAgICBbJ0FtYXpvbiBPUycsIC9LaW5kbGUvXSxcbiAgICBbJ1dpbmRvd3MgMy4xMScsIC9XaW4xNi9dLFxuICAgIFsnV2luZG93cyA5NScsIC8oV2luZG93cyA5NSl8KFdpbjk1KXwoV2luZG93c185NSkvXSxcbiAgICBbJ1dpbmRvd3MgOTgnLCAvKFdpbmRvd3MgOTgpfChXaW45OCkvXSxcbiAgICBbJ1dpbmRvd3MgMjAwMCcsIC8oV2luZG93cyBOVCA1LjApfChXaW5kb3dzIDIwMDApL10sXG4gICAgWydXaW5kb3dzIFhQJywgLyhXaW5kb3dzIE5UIDUuMSl8KFdpbmRvd3MgWFApL10sXG4gICAgWydXaW5kb3dzIFNlcnZlciAyMDAzJywgLyhXaW5kb3dzIE5UIDUuMikvXSxcbiAgICBbJ1dpbmRvd3MgVmlzdGEnLCAvKFdpbmRvd3MgTlQgNi4wKS9dLFxuICAgIFsnV2luZG93cyA3JywgLyhXaW5kb3dzIE5UIDYuMSkvXSxcbiAgICBbJ1dpbmRvd3MgOCcsIC8oV2luZG93cyBOVCA2LjIpL10sXG4gICAgWydXaW5kb3dzIDguMScsIC8oV2luZG93cyBOVCA2LjMpL10sXG4gICAgWydXaW5kb3dzIDEwJywgLyhXaW5kb3dzIE5UIDEwLjApL10sXG4gICAgWydXaW5kb3dzIE1FJywgL1dpbmRvd3MgTUUvXSxcbiAgICBbJ1dpbmRvd3MgQ0UnLCAvV2luZG93cyBDRXxXaW5DRXxNaWNyb3NvZnQgUG9ja2V0IEludGVybmV0IEV4cGxvcmVyL10sXG4gICAgWydPcGVuIEJTRCcsIC9PcGVuQlNEL10sXG4gICAgWydTdW4gT1MnLCAvU3VuT1MvXSxcbiAgICBbJ0Nocm9tZSBPUycsIC9Dck9TL10sXG4gICAgWydMaW51eCcsIC8oTGludXgpfChYMTEpL10sXG4gICAgWydNYWMgT1MnLCAvKE1hY19Qb3dlclBDKXwoTWFjaW50b3NoKS9dLFxuICAgIFsnUU5YJywgL1FOWC9dLFxuICAgIFsnQmVPUycsIC9CZU9TL10sXG4gICAgWydPUy8yJywgL09TXFwvMi9dLFxuXTtcbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3QodXNlckFnZW50KSB7XG4gICAgaWYgKCEhdXNlckFnZW50KSB7XG4gICAgICAgIHJldHVybiBwYXJzZVVzZXJBZ2VudCh1c2VyQWdlbnQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgICAgICByZXR1cm4gbmV3IFJlYWN0TmF0aXZlSW5mbygpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlVXNlckFnZW50KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0Tm9kZVZlcnNpb24oKTtcbn1cbmZ1bmN0aW9uIG1hdGNoVXNlckFnZW50KHVhKSB7XG4gICAgLy8gb3B0ZWQgZm9yIHVzaW5nIHJlZHVjZSBoZXJlIHJhdGhlciB0aGFuIEFycmF5I2ZpcnN0IHdpdGggYSByZWdleC50ZXN0IGNhbGxcbiAgICAvLyB0aGlzIGlzIHByaW1hcmlseSBiZWNhdXNlIHVzaW5nIHRoZSByZWR1Y2Ugd2Ugb25seSBwZXJmb3JtIHRoZSByZWdleFxuICAgIC8vIGV4ZWN1dGlvbiBvbmNlIHJhdGhlciB0aGFuIG9uY2UgZm9yIHRoZSB0ZXN0IGFuZCBmb3IgdGhlIGV4ZWMgYWdhaW4gYmVsb3dcbiAgICAvLyBwcm9iYWJseSBzb21ldGhpbmcgdGhhdCBuZWVkcyB0byBiZSBiZW5jaG1hcmtlZCB0aG91Z2hcbiAgICByZXR1cm4gKHVhICE9PSAnJyAmJlxuICAgICAgICB1c2VyQWdlbnRSdWxlcy5yZWR1Y2UoZnVuY3Rpb24gKG1hdGNoZWQsIF9hKSB7XG4gICAgICAgICAgICB2YXIgYnJvd3NlciA9IF9hWzBdLCByZWdleCA9IF9hWzFdO1xuICAgICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB1YU1hdGNoID0gcmVnZXguZXhlYyh1YSk7XG4gICAgICAgICAgICByZXR1cm4gISF1YU1hdGNoICYmIFticm93c2VyLCB1YU1hdGNoXTtcbiAgICAgICAgfSwgZmFsc2UpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyTmFtZSh1YSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hVc2VyQWdlbnQodWEpO1xuICAgIHJldHVybiBkYXRhID8gZGF0YVswXSA6IG51bGw7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVc2VyQWdlbnQodWEpIHtcbiAgICB2YXIgbWF0Y2hlZFJ1bGUgPSBtYXRjaFVzZXJBZ2VudCh1YSk7XG4gICAgaWYgKCFtYXRjaGVkUnVsZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIG5hbWUgPSBtYXRjaGVkUnVsZVswXSwgbWF0Y2ggPSBtYXRjaGVkUnVsZVsxXTtcbiAgICBpZiAobmFtZSA9PT0gJ3NlYXJjaGJvdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCb3RJbmZvKCk7XG4gICAgfVxuICAgIC8vIERvIG5vdCB1c2UgUmVnRXhwIGZvciBzcGxpdCBvcGVyYXRpb24gYXMgc29tZSBicm93c2VyIGRvIG5vdCBzdXBwb3J0IGl0IChTZWU6IGh0dHA6Ly9ibG9nLnN0ZXZlbmxldml0aGFuLmNvbS9hcmNoaXZlcy9jcm9zcy1icm93c2VyLXNwbGl0KVxuICAgIHZhciB2ZXJzaW9uUGFydHMgPSBtYXRjaFsxXSAmJiBtYXRjaFsxXS5zcGxpdCgnLicpLmpvaW4oJ18nKS5zcGxpdCgnXycpLnNsaWNlKDAsIDMpO1xuICAgIGlmICh2ZXJzaW9uUGFydHMpIHtcbiAgICAgICAgaWYgKHZlcnNpb25QYXJ0cy5sZW5ndGggPCBSRVFVSVJFRF9WRVJTSU9OX1BBUlRTKSB7XG4gICAgICAgICAgICB2ZXJzaW9uUGFydHMgPSBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIHZlcnNpb25QYXJ0cywgdHJ1ZSksIGNyZWF0ZVZlcnNpb25QYXJ0cyhSRVFVSVJFRF9WRVJTSU9OX1BBUlRTIC0gdmVyc2lvblBhcnRzLmxlbmd0aCksIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2ZXJzaW9uUGFydHMgPSBbXTtcbiAgICB9XG4gICAgdmFyIHZlcnNpb24gPSB2ZXJzaW9uUGFydHMuam9pbignLicpO1xuICAgIHZhciBvcyA9IGRldGVjdE9TKHVhKTtcbiAgICB2YXIgc2VhcmNoQm90TWF0Y2ggPSBTRUFSQ0hCT1RfT1NfUkVHRVguZXhlYyh1YSk7XG4gICAgaWYgKHNlYXJjaEJvdE1hdGNoICYmIHNlYXJjaEJvdE1hdGNoWzFdKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoQm90RGV2aWNlSW5mbyhuYW1lLCB2ZXJzaW9uLCBvcywgc2VhcmNoQm90TWF0Y2hbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEJyb3dzZXJJbmZvKG5hbWUsIHZlcnNpb24sIG9zKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RPUyh1YSkge1xuICAgIGZvciAodmFyIGlpID0gMCwgY291bnQgPSBvcGVyYXRpbmdTeXN0ZW1SdWxlcy5sZW5ndGg7IGlpIDwgY291bnQ7IGlpKyspIHtcbiAgICAgICAgdmFyIF9hID0gb3BlcmF0aW5nU3lzdGVtUnVsZXNbaWldLCBvcyA9IF9hWzBdLCByZWdleCA9IF9hWzFdO1xuICAgICAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKHVhKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gb3M7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZVZlcnNpb24oKSB7XG4gICAgdmFyIGlzTm9kZSA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnZlcnNpb247XG4gICAgcmV0dXJuIGlzTm9kZSA/IG5ldyBOb2RlSW5mbyhwcm9jZXNzLnZlcnNpb24uc2xpY2UoMSkpIDogbnVsbDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVZlcnNpb25QYXJ0cyhjb3VudCkge1xuICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgY291bnQ7IGlpKyspIHtcbiAgICAgICAgb3V0cHV0LnB1c2goJzAnKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB1dGY4VG9CYXNlNjQoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBidG9hKGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoLyUoWzAtOUEtRl17Mn0pL2csIChtYXRjaCwgcDEpID0+IHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQocDEsIDE2KSk7XG4gICAgfSkpO1xufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGJhc2U2NFRvVXRmOChzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChhdG9iKHN0cikuc3BsaXQoJycpLm1hcChjID0+IHtcbiAgICAgICAgcmV0dXJuICclJyArICgnMDAnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIH0pLmpvaW4oJycpKTtcbn0iLCJsZXQgdGltZXI6IG51bWJlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlRnVuY3Rpb24oZnVuYzogKCkgPT4gdm9pZCwgd2FpdDogbnVtYmVyKTogKCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGVkRnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChsYXRlciwgd2FpdCkgYXMgdW5rbm93biBhcyBudW1iZXI7IC8vIENhc3QgdG8gbnVtYmVyIGlmIFR5cGVTY3JpcHQgY29tcGxhaW5zXG4gICAgfTtcbn1cbiAiLCJcbmV4cG9ydCBjbGFzcyBKc29uVG9IdG1sQ29udmVydGVyIHtcbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnQoanNvbjogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGpzb24gPT0gbnVsbCkgcmV0dXJuIHRoaXMuZXNjYXBlSHRtbChcIjxlbT5udWxsPC9lbT5cIik7XG4gICAgICAgIGlmICh0eXBlb2YganNvbiAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHRoaXMuZXNjYXBlSHRtbChqc29uLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheVRvSHRtbChqc29uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdFRvSHRtbChqc29uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFycmF5VG9IdG1sKGFycjogYW55W10pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBpdGVtc0h0bWwgPSBhcnIubWFwKGl0ZW0gPT4gYDxsaT4ke3RoaXMuY29udmVydChpdGVtKX08L2xpPmApLmpvaW4oXCJcIik7XG4gICAgICAgIHJldHVybiBgPHVsPiR7aXRlbXNIdG1sfTwvdWw+YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBvYmplY3RUb0h0bWwob2JqOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzSHRtbCA9IE9iamVjdC5rZXlzKG9iailcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IGA8bGk+JHt0aGlzLmVzY2FwZUh0bWwoa2V5KX06ICR7dGhpcy5jb252ZXJ0KG9ialtrZXldKX08L2xpPmApXG4gICAgICAgICAgICAuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIGA8dWw+JHtwcm9wZXJ0aWVzSHRtbH08L3VsPmA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZXNjYXBlSHRtbCh1bnNhZmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB1bnNhZmUucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbiAgICB9XG59XG5cbi8vIFVzYWdlIGV4YW1wbGU6XG5jb25zdCBqc29uID0ge1xuICAgIGNvZGU6IFwiRVJST1JfQ09ERVwiLFxuICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIixcbiAgICBkZXRhaWxzOiB7XG4gICAgICAgIGluZm86IFwiRGV0YWlsZWQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGVycm9yXCIsXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBpdGVtczogWzEsIDIsIDNdXG4gICAgfVxufTtcblxuIiwiaW1wb3J0IGNoYWxrLCB7IENoYWxrSW5zdGFuY2UgfSBmcm9tICdjaGFsayc7XG5pbXBvcnQgeyBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrLCBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayB9IGZyb20gJy4vU3RhY2tIZWxwZXInO1xuXG5jaGFsay5sZXZlbCA9IDM7XG5sZXQgZGVmYXVsdE1vZGU6IENoYWxrSW5zdGFuY2UgPSBjaGFsay5yZXNldDtcblxuXG5sZXQgbGFzdFNlYzogU2VjdGlvbiB8IHVuZGVmaW5lZDtcblxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZWMoKSB7XG5cbiAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKyl7XG4gICAgLy8gY29uc29sZS5ncm91cEVuZCgpXG4gICAgLy8gfVxuXG4gICAgaWYgKGxhc3RTZWM/Lmdyb3VwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdFNlYz8uZ3JvdXA7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxhc3RTZWMgPSBuZXcgU2VjdGlvbihcIlJvb3RcIiwgZGVmYXVsdE1vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VjQmFja09uZSgpIHtcbiAgICBsYXN0U2VjID0gbGFzdFNlYz8ucGFyZW50O1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNlY3Rpb24ge1xuICAgIHNlY3Rpb25OYW1lOiBzdHJpbmc7XG4gICAgcGFyZW50OiBTZWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIGM6IENoYWxrSW5zdGFuY2VcbiAgICBpbmRlbnQgPSAwO1xuICAgIGluZGVudFBhZCA9IFwiXCI7XG4gICAgZ3JvdXA6IG51bWJlciA9IDA7XG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbk5hbWU6IHN0cmluZywgYzogQ2hhbGtJbnN0YW5jZSwgc2VjdGlvbj86IFNlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jID0gYztcbiAgICAgICAgdGhpcy5zZWN0aW9uTmFtZSA9IHNlY3Rpb25OYW1lO1xuICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnQgPSBzZWN0aW9uLmluZGVudCArIDE7XG4gICAgICAgICAgICB0aGlzLmluZGVudFBhZCA9IFwiLVwiLnJlcGVhdCh0aGlzLmluZGVudCAqIDIpICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFNlYyA9IHRoaXM7XG4gICAgICAgIHRoaXMucGFyZW50ID0gc2VjdGlvbjtcbiAgICB9XG4gICAgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRlZmF1bHRNb2RlKGFyZ3MpKTtcbiAgICB9XG4gICAgbGgxKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgxKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbGgyKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgyKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbGgzKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgzKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbCguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gbCh0aGlzLCAuLi5hcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsKC4uLmFyZ3M6IGFueVtdKSB7XG5cbiAgICBsZXQgc2VjOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYztcbiAgICBsZXQgZmlyc3RBcmc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZmlyc3RBcmdNb2RpZmVkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHNlYyA9IGFyZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZpcnN0QXJnICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIlN0cmluZ1wiKSB7XG4gICAgICAgICAgICBmaXJzdEFyZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvL3JlbW92ZWQgU2VjdGlvbiBmcm9tIGFyZ3NcbiAgICBhcmdzID0gYXJncy5maWx0ZXIoKGFyZykgPT4ge1xuICAgICAgICByZXR1cm4gIShhcmcgaW5zdGFuY2VvZiBTZWN0aW9uKTtcbiAgICB9KVxuXG5cbiAgICAvLyBsZXQgYyA9IHNlYz8uYyB8fCBtb2RlO1xuICAgIGxldCBjID0gZGVmYXVsdE1vZGU7XG4gICAgbGV0IGluZGVudFBhZCA9IHNlYz8uaW5kZW50UGFkIHx8IFwiXCI7XG5cbiAgICBpZiAoIWZpcnN0QXJnKSB7XG4gICAgICAgIGZpcnN0QXJnID0gXCJcIjtcbiAgICB9XG4gICAgZmlyc3RBcmdNb2RpZmVkID0gZmlyc3RBcmc7XG5cbiAgICBmaXJzdEFyZ01vZGlmZWQgPSBpbmRlbnRQYWQgKyBmaXJzdEFyZztcbiAgICAvL3JlbW92ZSBjb2xvciBmb3JtYXR0aW5nIGZyb20gZmlyc3QgYXJnXG4gICAgbGV0IHRvdExlbiA9IGZpcnN0QXJnTW9kaWZlZC5sZW5ndGggLSBmaXJzdEFyZ01vZGlmZWQucmVwbGFjZSgvXFx1MDAxYlxcWy4qP20vZywgJycpLmxlbmd0aCAtIDI7XG5cblxuICAgIGNvbnNvbGUubG9nKGZpcnN0QXJnTW9kaWZlZCk7XG5cbiAgICAvL3JlbW92ZWQgU2VjdGlvbiBmcm9tIGFyZ3NcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XG4gICAgfSlcblxuXG59XG5cblxuXG5mdW5jdGlvbiBsb2dIZWFkaW5nU2VjdGlvbihjOiBDaGFsa0luc3RhbmNlLCBoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb24/OiBTZWN0aW9uKSB7XG5cbiAgICBsZXQgc2VjID0gbmV3IFNlY3Rpb24oaGVhZGluZywgYywgc2VjdGlvbik7XG4gICAgbGV0IHRpbWUgPSBuZXcgRGF0ZShEYXRlLm5vdygpKS50b0xvY2FsZVN0cmluZygpO1xuXG4gICAgbGV0IHBhdGggPSBcIlwiO1xuICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgIHBhdGggPSBzZWN0aW9uLnNlY3Rpb25OYW1lO1xuICAgICAgICB3aGlsZSAoc2VjdGlvbi5wYXJlbnQpIHtcbiAgICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9uLnBhcmVudDtcbiAgICAgICAgICAgIHBhdGggPSBzZWN0aW9uLnNlY3Rpb25OYW1lICsgXCIgLT4gXCIgKyBwYXRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9hZGQgYWRkIGhlYWRpbmcgdG8gZW5kIG9mIHBhdGggYW5kIG9ubHkgYWRkIC0+IGlmIHBhdGggaXMgbm90IGVtcHR5XG4gICAgaWYgKHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXRoICs9IFwiIC0+IFwiO1xuICAgIH1cbiAgICBwYXRoICs9IGhlYWRpbmc7XG5cblxuXG4gICAgLy9wb3NpdGlvbiB0aGUgaGVhZGluZyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW5cbiAgICAvLyBjb25zb2xlLmxvZyhjKGhlYWRpbmcucGFkU3RhcnQoKGN3aWR0aCAvIDIpICsgKGhlYWRpbmcubGVuZ3RoIC8gMiksIFwiIFwiKS5wYWRFbmQoY3dpZHRoLCBcIiBcIikpKTtcbiAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKGMocGF0aCkpO1xuICAgIHNlYy5ncm91cCsrO1xuXG4gICAgcmV0dXJuIHNlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMShoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0JsYWNrLmdyZWVuQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgyKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnR3JheS5jeWFuQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgzKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnR3JheS5tYWdlbnRhQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5cbmV4cG9ydCBjb25zdCBsaCA9IGxoMTtcblxuXG5leHBvcnQgY29uc3QgaW1wID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsucmVkLmJvbGQuYmdCbGFjaztcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGluZiA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLmJsdWUuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHdybiA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLnllbGxvdy5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufSBcblxuZXhwb3J0IGNvbnN0IGVyciA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcblxuICAgIGxldCBlciA9IChuZXcgRXJyb3IoKSk7XG4gICAgbGV0IGxpbmVObyA9IGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKGVyLnN0YWNrKTtcbiAgICBsZXQgY2FsbGVyID0gZXh0cmFjdENhbGxlckZyb21TdGFjayhlci5zdGFjayk7XG5cbiAgICBsZXQgcHJlVGV4dCA9IGBbJHtjYWxsZXJ9OiR7bGluZU5vfV1gO1xuXG4gICAgdGV4dCA9IHByZVRleHQgKyBcIiBcIiArIHRleHQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coZXIpO1xuXG4gICAgbGV0IGMgPSBjaGFsay5yZWQuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHN1YyA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLmdyZWVuLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBobCA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdCbHVlKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaGwxID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ01hZ2VudGEodGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBudiA9IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdCbHVlQnJpZ2h0KG5hbWUucGFkRW5kKDMwLCBcIiBcIikpICsgXCIgOiBcIiArIGNoYWxrLmN5YW5CcmlnaHQodmFsdWUpO1xufVxuXG4gXG5sZXQgZXhhbXBsZUpTb24gPVxue1xuICAgIFwibmFtZVwiOiBcInRlc3RcIixcbiAgICBcImFnZVwiOiAxMCxcbiAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICBcInN0cmVldFwiOiBcIjEyMyBGYWtlIFN0cmVldFwiLFxuICAgICAgICBcImNpdHlcIjogXCJMb25kb25cIixcbiAgICAgICAgXCJwb3N0Y29kZVwiOiBcIlNXMUEgMUFBXCJcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5UZXN0KCkge1xuXG5cbiAgICBjb25zb2xlLmxvZyhcIi0tIHRlc3QgLS1cIilcblxuICAgIGxldCBzZWMgPSBsaDEoXCJUZXN0IEhlYWRpbmcgMVwiKVxuICAgIGwoaW1wKFwiQXV0byBTZWMgLSBUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSAxXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSAyXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSBJTkZPOiBcIiArIGltcChcIlRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSlcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIFdJVEggQURESVRJTkFMIElORk86IFwiICsgaW1wKFwiVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpICsgXCIgYW5kIHRoaXMgaXMgc29tZSBhZGRpdGlvbmFsIGluZm9cIilcbiAgICBsKFwiQXV0byBTZWMgLSBUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcImFmdGVyIGF1dG8gc2VjIFRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cbiAgICBzZWMgPSBzZWMubGgyKFwiSGVhZGluZyAyXCIpXG4gICAgc2VjLmwoXCJUZXN0XCIpXG4gICAgc2VjLmwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cblxuICAgIHNlYyA9IHNlYy5saDMoXCJIZWFkIDNcIilcbiAgICBsKFwiVGVzdFwiKVxuICAgIGwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cbiAgICBjbGVhclNlYygpO1xuICAgIGwoXCJUZXN0IENsZWFyIFNlY1wiKVxuICAgIGwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cblxuXG4gICAgbChcIlRlc3QgSlNPTjpcIiwgZXhhbXBsZUpTb24pO1xuXG59XG5cbi8vIHJ1blRlc3QoKVxuY2xlYXJTZWMoKTtcblxuLy8gZXhwb3J0IHtjb2xvcnN9O1xuIiwiXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soc3RhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCk6IG51bWJlciB8IG51bGwge1xuICAgIGlmICghc3RhY2spIHJldHVybiBudWxsO1xuICAgIC8vIEV4dHJhY3QgbGluZXMgZnJvbSBzdGFja1xuICAgIGNvbnN0IHN0YWNrTGluZXMgPSBzdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgLy8gRmluZCB0aGUgbGluZSB3aXRoIHRoZSBlcnJvciAodXN1YWxseSB0aGUgc2Vjb25kIGxpbmUpXG4gICAgY29uc3QgZXJyb3JMaW5lID0gc3RhY2tMaW5lc1sxXSB8fCAnJztcbiAgICAvLyBFeHRyYWN0IGxpbmUgbnVtYmVyIGZyb20gdGhlIGVycm9yIGxpbmUgdXNpbmcgcmVnZXhcbiAgICBjb25zdCBtYXRjaCA9IGVycm9yTGluZS5tYXRjaCgvOihcXGQrKTooXFxkKykkLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gcGFyc2VJbnQobWF0Y2hbMV0pIDogbnVsbDtcbiAgfVxuICBcbiBleHBvcnQgZnVuY3Rpb24gZXh0cmFjdENhbGxlckZyb21TdGFjayhzdGFjazogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCFzdGFjaykgcmV0dXJuIG51bGw7XG4gICAgLy8gRXh0cmFjdCBsaW5lcyBmcm9tIHN0YWNrXG4gICAgY29uc3Qgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAvLyBGaW5kIHRoZSBsaW5lIHdpdGggdGhlIGNhbGxlciBmdW5jdGlvbiAodXN1YWxseSB0aGUgdGhpcmQgbGluZSlcbiAgICBjb25zdCBjYWxsZXJMaW5lID0gc3RhY2tMaW5lc1syXSB8fCAnJztcbiAgICAvLyBFeHRyYWN0IGNhbGxlciBmdW5jdGlvbiBuYW1lIHVzaW5nIHJlZ2V4XG4gICAgY29uc3QgbWF0Y2ggPSBjYWxsZXJMaW5lLm1hdGNoKC9hdCAoW1xcdy48Pl0rKS8pO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogbnVsbDtcbiAgfSIsIlxuXG5leHBvcnQgY29uc3QgSUdyYXBoUXVlcnlEZmF1bHRzOiBJR3JhcGhRdWVyeSA9IHtcbiAgICBcImZpZWxkc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicGF0aFwiOiBcIndvcmtpdGVtLnRpdGxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJwYXRoXCI6IFwid29ya2l0ZW0uaWRcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcImRlYnVnXCI6IGZhbHNlLFxuICAgIFwiYWxsb3dQYXJhbGxlbEV4ZWN1dGlvblwiOiB0cnVlLFxuICAgIFwiZXhlY3V0ZUNhbGN1bGF0ZWRGaWVsZHNcIjogdHJ1ZSxcbiAgICBcInJlc3BvbnNlVHlwZVwiOiBcImZsYXRcIixcbiAgICBcImVudGl0eVR5cGVcIjp1bmRlZmluZWQsXG4gICAgXCJlbnRpdHlJZFwiOiBcIlwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdyYXBoUXVlcnkge1xuICBmaWVsZHM6IElHcmFwaFF1ZXJ5RmllbGRbXTtcbiAgZGVidWc6IGJvb2xlYW47XG4gIGFsbG93UGFyYWxsZWxFeGVjdXRpb246IGJvb2xlYW47XG4gIGV4ZWN1dGVDYWxjdWxhdGVkRmllbGRzOiBib29sZWFuO1xuICByZXNwb25zZVR5cGU6IHN0cmluZztcbiAgZW50aXR5VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBlbnRpdHlJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElHcmFwaFF1ZXJ5RmllbGQge1xuICBwYXRoOiBzdHJpbmc7XG59IiwiXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVEb0V2ZW50IHtcbiAgICBldmVudFBhdGg6IHN0cmluZztcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBzb3VyY2U6IGFueTtcbiAgICBkYXRhOiBhbnk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChldmVudDpTaGFyZURvRXZlbnQpIHtcblxuICAgICR1aS5ldmVudHMuYnJvYWRjYXN0KGV2ZW50LmV2ZW50UGF0aCwgZXZlbnQpO1xufSIsImltcG9ydCB7IGwsIGluZiwgZXJyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Mb2dcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvQ2xhc3MoY2xhc3NOYW1lOnN0cmluZywgYmFzZTphbnkpIHtcbiAgICBjb25zdCBjbGFzc1BhcnRzID0gY2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgbGV0IGNsYXNzUmVmZXJlbmNlID0gYmFzZTtcblxuICAgIGZvciAoY29uc3QgcGFydCBvZiBjbGFzc1BhcnRzKSB7XG4gICAgICAgIGlmKCFjbGFzc1JlZmVyZW5jZVtwYXJ0XSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2xhc3NSZWZlcmVuY2UgPSBjbGFzc1JlZmVyZW5jZVtwYXJ0XTtcbiAgICB9OyBcbiAgICByZXR1cm4gY2xhc3NSZWZlcmVuY2U7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbEZpZWxkc1RvTnVsbChtb2RlbDphbnkpIHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1vZGVsKTtcbiAgICBrZXlzLmZvckVhY2goKGtleTogYW55KSA9PiB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBudWxsO1xuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KG9iOiBhbnkpIHtcbiAgICB2YXIgdG9SZXR1cm46IGFueSA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSBpbiBvYikge1xuICAgICAgICBpZiAoIW9iLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBvYltpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBmbGF0T2JqZWN0ID0gZmxhdHRlbk9iamVjdChvYltpXSk7XG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGZsYXRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZsYXRPYmplY3QuaGFzT3duUHJvcGVydHkoeCkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdG9SZXR1cm5baSArICcuJyArIHhdID0gZmxhdE9iamVjdFt4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvUmV0dXJuW2ldID0gb2JbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRbcHJvcF0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRbcHJvcF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICB9XG4gICAgY3VycmVudFtwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgIGwoaW5mKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pYCksb2JqKTtcbiAgICBcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcHJvcGVydHkgaGFzIGFuIGFycmF5IGluZGV4LCBlLmcuLCBcImRhdGFbMF1cIlxuICAgICAgICBjb25zdCBtYXRjaGVzID0gcHJvcC5tYXRjaCgvXihbYS16QS1aMC05X10rKVxcWyhbMC05XSspXFxdJC8pO1xuXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheVByb3AgPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChtYXRjaGVzWzJdLCAxMCk7XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJyZW50W2FycmF5UHJvcF0pIHx8IGN1cnJlbnRbYXJyYXlQcm9wXVtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBhcnJheVByb3Agb3IgaW5kZXggaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRbcHJvcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbChlcnIoYGdldE5lc3RlZFByb3BlcnR5KCR7cHJvcGVydHlQYXRofSk6IHByb3AgaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB0ZW1wb3JhcnkgYW5kIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRoZSB0eXBlc2NyaXB0IHR5cGluZyBhcmUgZml4ZWRcbiAgICAgKiBXaGF0IGlzIGRvZXMgaXMgY2hlY2sgaWYgdGhlIHBhc3NlZCBpbiBvYmplY3QgaXMgYSBrbm9ja291dCBvYnNlcnZhYmxlIGFuZCBpZiBpdCBpcyBpdCByZXR1cm5zIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBrb09iamVjdCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVGcm9tS09PYmplY3Q8VD4oa29PYmplY3Q6IGFueSkge1xuICAgICAgICBpZih0eXBlb2Yga29PYmplY3QgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGtvT2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtvT2JqZWN0XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGd2a288VD4oa29PYmplY3Q6IGFueSk6IFQgfCBhbnkge1xuICAgICAgICByZXR1cm4ga28udG9KUyhrb09iamVjdCk7XG4gICAgfSIsIlxuLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgdGhlIGFwaSBjYWxscyB0byB0aGUgYmFja2VuZC5cbiAqIHV0aWxpc2luZyB0aGUgYXhpb3MgbGlicmFyeSB0byBtYWtlIHRoZSBjYWxscy5cbiAqIGluY2x1c2luZyBvZiB3ZWJwYWNrSWdub3JlIGlzIHRvIGFsbG93IHRoZSB3ZWJwYWNrIHRvIGlnbm9yZSB0aGUgY2FsbHMgYW5kIG5vdCB0cnkgdG8gYnVuZGxlIHRoZW0uXG4gKi9cblxuaW1wb3J0IHsgZXJyLCBpbmYsIGwsIGxoMSwgc2VjQmFja09uZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vTG9nXCI7XG5pbXBvcnQgeyBUVXNlckVycm9ycyB9IGZyb20gXCIuLi8uLi9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVQb3N0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucG9zdCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSksIHBvc3RCb2R5KTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiUE9TVFwiLCBwb3N0Qm9keSkpLmRhdGE7XG59XG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0PFQ+KGFwaTogc3RyaW5nKSA6IFByb21pc2U8VD57XG4vLyAgICAgcmV0dXJuIGF3YWl0ICRhamF4LmdldCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuLy8gfSBcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXQ8VD4oYXBpOiBzdHJpbmcpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiR0VUXCIsIHVuZGVmaW5lZCkpLmRhdGE7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXR2MjxUPihhcGk6IHN0cmluZyl7XG4gICAgcmV0dXJuICBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIkdFVFwiLCB1bmRlZmluZWQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVBvc3R2MjxUUmVzcG9uc2U+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KSB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucG9zdCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSksIHBvc3RCb2R5KTtcbiAgICByZXR1cm4gZXhlY3V0ZUZldGNoPFRSZXNwb25zZT4oYXBpLCBcIlBPU1RcIiwgcG9zdEJvZHkpO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUHV0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucHV0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJQVVRcIiwgcG9zdEJvZHkpKS5kYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZURlbGV0ZTxUPihhcGk6IHN0cmluZyk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LmRlbGV0ZSgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJERUxFVEVcIiwgdW5kZWZpbmVkKSkuZGF0YTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcGkoYXBpOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBsb2NhdGlvbiA9IHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW47XG5cbiAgICAvL2lmIGFwaSBkb2VzIG5vdCBpbmNsdWRlIHRoZSBsb2NhdGlvbiB0aGVuIGFkZCBpdC5cbiAgICBpZiAoYXBpLmluZGV4T2YobG9jYXRpb24pID09PSAtMSkge1xuICAgICAgICAvL2NoZWNrIGlmIGFwaSBzdGFydCB3aXRoIGEgLyBpZiBub3QgYWRkIGl0LlxuICAgICAgICBpZiAoYXBpLmluZGV4T2YoXCIvXCIpICE9PSAwKSB7XG4gICAgICAgICAgICBhcGkgPSBcIi9cIiArIGFwaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwaSA9IGxvY2F0aW9uICsgYXBpO1xuICAgIH1cbiAgICByZXR1cm4gYXBpO1xuXG59XG5cbmV4cG9ydCB0eXBlIFRFeGVjdXRlRmV0Y2hSZXNwb25zZTxUUmVzcG9uc2U+ID1cbiAgICB7XG4gICAgICAgIGRhdGE6IFRSZXNwb25zZSB8IHVuZGVmaW5lZCxcbiAgICAgICAgcmVzcG9uc2U6IFJlc3BvbnNlIHwgdW5kZWZpbmVkLFxuICAgICAgICBpbmZvOlxuICAgICAgICB7XG4gICAgICAgICAgICBzdWNjZXNzOiBib29sZWFuLFxuICAgICAgICAgICAgZXJyb3I6IEFycmF5PFRVc2VyRXJyb3JzPlxuICAgICAgICB9XG4gICAgfVxuXG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVGZXRjaDxUUmVzcG9uc2U+KGFwaTogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgZGF0YTogYW55LCByZXRyeUNvdW50ZXI/Om51bWJlcik6IFByb21pc2U8VEV4ZWN1dGVGZXRjaFJlc3BvbnNlPFRSZXNwb25zZT4+IHtcbiAgICBsZXQgcmV0VmFsdWU6IFRFeGVjdXRlRmV0Y2hSZXNwb25zZTxUUmVzcG9uc2U+ID0ge1xuICAgICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiB1bmRlZmluZWQsXG4gICAgICAgIGluZm86IHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFtdXG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIC8vdG8gZ2V0IG5ldyB0b2tlbiBUT0RPOiBjaGVjayBpZiBmYWlsIHRoZW4gY2FsbFxuICAgIC8vIGF3YWl0ICRhamF4LmdldChcImh0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvc2VjdXJpdHkvcmVmcmVzaFRva2Vucz9fPVwiICsgRGF0ZS5ub3cpO1xuXG4gICAgXG5cbiAgICBsZXQgdXJsID0gdmFsaWRhdGVBcGkoYXBpKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gYnVpbGRIZWFkZXJzKCk7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBmZXRjaEhlYWRlcnMsXG4gICAgICAgIGJvZHk6IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgICApLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldFZhbHVlLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIGlmIChyZXNwb25zZS5vayA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKXtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ZXIgPSByZXRyeUNvdW50ZXIgfHwgMTtcbiAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50ZXIgPiAzKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJIGFmdGVyIDMgYXR0ZW1wdHMuIHN0YXR1c1RleHQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB1bmRlZmluZWQsIHJlc3BvbnNlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGF3YWl0ICRhamF4LmdldChcImh0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvc2VjdXJpdHkvcmVmcmVzaFRva2Vucz9fPVwiICsgRGF0ZS5ub3cpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBleGVjdXRlRmV0Y2g8VFJlc3BvbnNlPihhcGksIG1ldGhvZCwgZGF0YSxyZXRyeUNvdW50ZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSS4gc3RhdHVzVGV4dDogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWAsXG4gICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNwb25zZURhdGE7XG4gICAgICAgIC8vY2hlY2sgaWYgcmVzcG9uc2UgaXMgSlNPTlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpPy5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gZXh0cmFjdCB0aGUgZGF0YSBmcm9tIHRoZSBBUEkuIE1lc3NhZ2U6ICR7ZT8ubWVzc2FnZSB8fCBcIlVua25vd25cIn1gLFxuICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gZXh0cmFjdCB0aGUgZGF0YSBmcm9tIHRoZSBBUEkuYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGF0YTogcmVzcG9uc2VEYXRhLCByZXNwb25zZSB9O1xuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsKGVycihgRXJyb3IgZnJvbSBBUEkgQ2FsbCAke3VybH1gKSwgZXJyb3IpO1xuXG4gICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7IGRhdGE6IHVuZGVmaW5lZCwgcmVzcG9uc2U6IHVuZGVmaW5lZCB9O1xuICAgIH0pXG5cbiAgICBsaDEoYFJlc3BvbnNlIGZyb20gJHt1cmx9YCk7XG4gICAgbChyZXNwb25zZSk7XG5cbiAgICByZXRWYWx1ZS5kYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgIGlmKHJldFZhbHVlLmluZm8uZXJyb3IubGVuZ3RoID4gMCl7XG4gICAgICAgIHJldFZhbHVlLmluZm8uc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBsKGVycihgRXJyb3IgZnJvbSBBUEkgQ2FsbCAke3VybH1gKSwgZSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VjQmFja09uZSgpO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufVxuXG5mdW5jdGlvbiBidWlsZEhlYWRlcnMoKSB7XG4gICAgbGV0IGJlYXJlciA9IGdldEJlYXJlclRva2VuKCk7XG4gICAgbGV0IGZldGNoSGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgZmV0Y2hIZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgaWYgKGJlYXJlcikge1xuICAgICAgICBmZXRjaEhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBiZWFyZXIpO1xuICAgIH1cbiAgICByZXR1cm4gZmV0Y2hIZWFkZXJzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWVzKCk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIGxldCByZXRWYWx1ZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICAgIGxldCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKS5yZWR1Y2UoZnVuY3Rpb24gKGNvb2tpZXMsIGNvb2tpZSkge1xuICAgICAgICB2YXIgcGFydHMgPSBjb29raWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFydHNbMV07XG5cbiAgICAgICAgICAgIHJldFZhbHVlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29va2llcztcbiAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVhcmVyVG9rZW4oKSB7XG4gICAgdmFyIGNvb2tpZXMgPSBnZXRDb29raWVzKCk7XG4gICAgdmFyIHRva2VuID0gY29va2llc1tcIl9hcGlcIl07XG5cbiAgICBpZiAodG9rZW4pIHJldHVybiBcIkJlYXJlciBcIiArIHRva2VuO1xuICAgIHJldHVybiBudWxsO1xufTsiLCJcbmltcG9ydCB7IElHcmFwaFF1ZXJ5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvYXBpL2dyYXBoL0lHcmFwaFF1ZXJ5XCI7XG5pbXBvcnQgeyBJR3JhcGhRdWVyeVJlc29uc2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9hcGkvZ3JhcGgvSUdyYXBoUXVlcnlSZXNwb25zZVwiO1xuaW1wb3J0IHsgZXhlY3V0ZVBvc3QsIGV4ZWN1dGVQb3N0djIgfSBmcm9tIFwiLi4vYXBpXCI7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUZpbmRCeUdyYXBoKGlucHV0T3B0aW9uOiBJR3JhcGhRdWVyeSlcbntcbiAgICByZXR1cm4gZXhlY3V0ZVBvc3R2MjxJR3JhcGhRdWVyeVJlc29uc2U+KFwiL2FwaS9ncmFwaC93b3JraXRlbS9xdWVyeVwiLCBpbnB1dE9wdGlvbilcbn1cbiIsImltcG9ydCB7IGV4ZWN1dGVQb3N0IH0gZnJvbSBcIi4uL2FwaVwiO1xuaW1wb3J0IHsgSUZpbmRCeVF1ZXJ5T3B0aW9ucyB9IGZyb20gXCIuL0lGaW5kQnlRdWVyeUlucHV0XCI7XG5pbXBvcnQgeyBJRmluZEJ5UXVlcnlSZXN1bHQgfSBmcm9tIFwiLi9JRmluZEJ5UXVlcnlSZXN1bHRcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUZpbmRCeVF1ZXJ5PFQ+KGlucHV0T3B0aW9uOiBJRmluZEJ5UXVlcnlPcHRpb25zKVxue1xuICAgIHJldHVybiBleGVjdXRlUG9zdDxJRmluZEJ5UXVlcnlSZXN1bHQ8VD4+KFwiL2FwaS92MS9wdWJsaWMvd29ya0l0ZW0vZmluZEJ5UXVlcnlcIiwgaW5wdXRPcHRpb24pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xufSIsImltcG9ydCB7IGV4ZWN1dGVGaW5kQnlRdWVyeSB9IGZyb20gXCIuL2V4ZWN1dGVGaW5kQnlRdWVyeS9GaW5kQnlRdWVyeVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIHNlYXJjaFJlc3VsdCBcbntcbiAgICBmb3VuZDpib29sZWFuLCBcbiAgICB2YWx1ZTpzdHJpbmcgfCB1bmRlZmluZWQsIFxuICAgIHBhcmVudElkOnN0cmluZyB8IHVuZGVmaW5lZFxuICAgIGRlcHRoOm51bWJlcixcbiAgICBmb3VuZEluV29ya0l0ZW1JZDpzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgd2FzRm91bmRJbkFuY2VzdG9yOmJvb2xlYW4sXG4gICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTpzdHJpbmcgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZSh3b3JrSXRlbUlkOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgcGFyZW50czogYm9vbGVhbiwgbWF4RGVwdGg/OiBudW1iZXIgfCB1bmRlZmluZWQpXG4ge1xuICAgIGxldCB1c2VNYXhEZXB0aCA6IGJvb2xlYW4gPSBtYXhEZXB0aCA/IHRydWUgOiBmYWxzZTtcbiAgICBpZihtYXhEZXB0aCAmJiBtYXhEZXB0aCA+IDApe1xuICAgICAgICB1c2VNYXhEZXB0aCA9IHRydWU7XG4gICAgfVxuXG5cbiAgICBsZXQgcmV0VmFsdWU6c2VhcmNoUmVzdWx0ID0ge2ZvdW5kOmZhbHNlLCB2YWx1ZTp1bmRlZmluZWQsIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6MCwgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLCB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkfTtcblxuICAgIHJldFZhbHVlID0gYXdhaXQgc2VhcmNoRm9yQXR0cmlidXRlKHdvcmtJdGVtSWQsIGF0dHJpYnV0ZU5hbWUpO1xuXG4gICAgaWYocmV0VmFsdWUuZm91bmQpe1xuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgfVxuXG4gICAgaWYoIXBhcmVudHMgKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnRzIG9yIGNoaWxkcmVuIHRvIHNlYXJjaCBzbyBvbmx5IHNlYXJjaGluZyBjdXJyZW50IHdvcmsgaXRlbVwiKTtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlXG4gICAgfVxuXG4gICAgaWYocGFyZW50cyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIHBhcmVudHNcIik7XG4gICAgICAgIGxldCBkZXB0aCA9IDA7XG4gICAgICAgIGxldCBzZWFyY2hQYXJlbnQgPSBhc3luYyAocGFyZW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgZGVwdGgrKztcbiAgICAgICAgICAgIGxldCByOiBzZWFyY2hSZXN1bHQgPSB7Zm91bmQ6ZmFsc2UsXG4gICAgICAgICAgICAgICAgIHZhbHVlOnVuZGVmaW5lZCwgXG4gICAgICAgICAgICAgICAgIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6ZGVwdGgsIC8vZGVwdGggaGVyZSB3aWxsIGJlIG92ZXJyaWRlbiBpZiB0aGVyZSBpcyBhIHBhcmVudFxuICAgICAgICAgICAgICAgICBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgICB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKCFwYXJlbnRJZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnQgZm91bmRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICByID0gYXdhaXQgc2VhcmNoRm9yQXR0cmlidXRlKHBhcmVudElkLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgICByLmRlcHRoID0gZGVwdGg7IC8vdXBkYXRlIGRlcHRoIGFzIGl0IHdpbGwgYmUgMFxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoci5mb3VuZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBhdHRyaWJ1dGUgaW4gcGFyZW50XCIpO1xuICAgICAgICAgICAgICAgIHIud2FzRm91bmRJbkFuY2VzdG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBpZih1c2VNYXhEZXB0aCAmJiBkZXB0aCA+PSBtYXhEZXB0aCEpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1heCBkZXB0aCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBpZighci5wYXJlbnRJZCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgZm91bmQgaW4gcGFyZW50XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hQYXJlbnQoci5wYXJlbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXRWYWx1ZSA9IGF3YWl0IHNlYXJjaFBhcmVudChyZXRWYWx1ZS5wYXJlbnRJZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xuXG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEZvckF0dHJpYnV0ZSh3b3JrSXRlbUlkOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZykge1xuICAgIC8vZ2V0IHRoZSBtYXR0ZXJcbiAgICBsZXQgcmV0VmFsdWUgOnNlYXJjaFJlc3VsdCA9IHtcbiAgICAgICAgZm91bmQ6ZmFsc2UsIHZhbHVlOnVuZGVmaW5lZCxcbiAgICAgICAgIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6MCxcbiAgICAgICAgICBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsXG4gICAgICAgICAgIHdhc0ZvdW5kSW5BbmNlc3RvcjpmYWxzZSxcbiAgICAgICAgICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTp1bmRlZmluZWR9O1xuICAgIGxldCByZXEgPSB7XG4gICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwid29ya0l0ZW1JZHNcIjogW1xuICAgICAgICAgICAgICAgIHdvcmtJdGVtSWRcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJlbnJpY2hcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInRpdGxlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwicGFyZW50LmlkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwidHlwZS5zeXN0ZW1OYW1lXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwicmVmZXJlbmNlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyB1c2luZyBTaGFyZURvIElkOiBcIiArIHdvcmtJdGVtSWQpO1xuICAgIGxldCBodHRwUmVzdWx0RmluZEJ5UXVlcnkgPSBhd2FpdCBleGVjdXRlRmluZEJ5UXVlcnk8YW55PihyZXEpO1xuXG4gICAgaWYoIWh0dHBSZXN1bHRGaW5kQnlRdWVyeSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcmVzdWx0IGZvdW5kXCIpO1xuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBXb3JrIGl0ZW0gJHt3b3JrSXRlbUlkfSBmb3VuZGApO1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzKSk7XG5cblxuICAgIGxldCB0eXBlU3lzdGVtTmFtZSA9IGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbXCJ0eXBlLnN5c3RlbU5hbWVcIl07XG4gICAgbGV0IHBhcmVudElkID0gICAgICAgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVtcInBhcmVudC5pZFwiXTtcbiAgICBsZXQgYXR0cmlidXRlID0gICAgICBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW2F0dHJpYnV0ZU5hbWVdIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhgVHlwZSBzeXN0ZW0gbmFtZSBpcyAke3R5cGVTeXN0ZW1OYW1lfWApO1xuICAgIGNvbnNvbGUubG9nKGBQYXJlbnQgSWQgaXMgJHtwYXJlbnRJZH1gKTtcbiAgICBjb25zb2xlLmxvZyhgQXR0cmlidXRlIFske2F0dHJpYnV0ZU5hbWV9XSBpcyAke2F0dHJpYnV0ZX1gKTtcblxuICAgIHJldFZhbHVlLnZhbHVlID0gYXR0cmlidXRlO1xuICAgIGlmKGF0dHJpYnV0ZSl7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcmV0VmFsdWUuZm91bmRJbldvcmtJdGVtSWQgPSB3b3JrSXRlbUlkO1xuICAgICAgICByZXRWYWx1ZS5mb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lID0gdHlwZVN5c3RlbU5hbWU7XG4gICAgfVxuICAgIHJldFZhbHVlLnBhcmVudElkID0gcGFyZW50SWQ7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgXG59IiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XG5pbXBvcnQge1xuICAgIElTaGFyZWRvQmxhZGVNb2RlbCxcbiAgICBUU2hhcmVEb0JsYWRlLFxuICAgIElDb25maWd1cmF0aW9uSG9zdCxcbn0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvU2hhcmVkb0FzcGVjdE1vZGVsc1wiO1xuaW1wb3J0IHsgSURlYnVnIH0gZnJvbSBcIi4vSURlYnVnXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSBcInV1aWRcIjtcbmltcG9ydCB7IFRTaGFyZWRvIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvVFNoYXJlZG9cIjtcbmltcG9ydCB7XG4gICAgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZyxcbiAgICBJRXJyb3JUcmFwLFxuICAgIElTaGFyZWRvUGFuZWxDb25maWcsXG4gICAgSVN1cHBvcnRCdXR0b24sXG4gICAgSVdpZGdldEpzb24sXG4gICAgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb24sXG4gICAgVFVzZXJFcnJvcnMsXG59IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcbmltcG9ydCB7IFNoYXJlRG9FdmVudCwgZmlyZUV2ZW50IH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9FdmVudHNIZWxwZXJcIjtcbmltcG9ydCB7IGNsZWFyU2VjLCBlcnIsIGluZiwgbCwgbGgxLCBudiwgd3JuIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Mb2dcIjtcbmltcG9ydCB7IElGb3JtQnVpbGRlckRhdGEgfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9Bc3BlY3QvSUZvcm1CdWlsZGVyXCI7XG5pbXBvcnQgeyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0LCB0b09ic2VydmFibGVPYmplY3QgfSBmcm9tIFwiLi9LT0NvbnZlcnRlclwiO1xuaW1wb3J0IHtcbiAgICBnZXROZXN0ZWRQcm9wZXJ0eSxcbiAgICBndmtvLFxuICAgIHNldE5lc3RlZFByb3BlcnR5LFxuICAgIHN0clRvQ2xhc3MsXG59IGZyb20gXCIuLi8uLi9Db21tb24vT2JqZWN0SGVscGVyXCI7XG5pbXBvcnQgeyBlc2NhcGVIdG1sIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBKc29uVG9IdG1sQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Kc29uVG9IVE1MQ29udmVydGVyXCI7XG5pbXBvcnQgeyBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9zZWFyY2hGb3JBdHRyaWJ1dGVXaXRoUGFyZW50c1wiO1xuaW1wb3J0IHtcbiAgICBERUJVR19ERUZBVUxULFxuICAgIERFRkFVTFRfQ09ORklHVVJBVElPTl9TRVRUSU5HUyxcbn0gZnJvbSBcIi4vRGVmYXVsdFNldHRpbmdzXCI7XG5pbXBvcnQgeyBkZWJvdW5jZUZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9EZWJvdW5kXCI7XG5pbXBvcnQgeyBleGVjdXRlRmluZEJ5UXVlcnkgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnlcIjtcbmltcG9ydCB7XG4gICAgSUdyYXBoUXVlcnksXG4gICAgSUdyYXBoUXVlcnlEZmF1bHRzIGFzIElHcmFwaFF1ZXJ5RGVmYXVsdHMsXG4gICAgSUdyYXBoUXVlcnlGaWVsZCxcbn0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvYXBpL2dyYXBoL0lHcmFwaFF1ZXJ5XCI7XG5pbXBvcnQgeyBJRmluZEJ5UXVlcnlPcHRpb25zIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvZXhlY3V0ZUZpbmRCeVF1ZXJ5L0lGaW5kQnlRdWVyeUlucHV0XCI7XG5pbXBvcnQgeyBleGVjdXRlRmluZEJ5R3JhcGggfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9leGVjdXRlRmluZEJ5R3JhcGgvZXhlY3V0ZUZpbmRCeUdyYXBoXCI7XG5pbXBvcnQgeyBldmFsdXRlUnVsZSwgZXhlY3V0ZUVtYmVkZGVkQ29kZSB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL2V2YWx1dGVSdWxlXCI7XG5pbXBvcnQgeyBkZXRlY3QgfSBmcm9tIFwiZGV0ZWN0LWJyb3dzZXJcIjtcbmltcG9ydCB7IFRlbXBsYXRlQXBwbGljYXRvciB9IGZyb20gXCIuL1RlbXBsYXRlL1RlbXBsYXRlQXBwbGljYXRvclwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCB7IERhdGFDb250ZXh0IH0gZnJvbSBcIi4uLy4uL0Zvcm1pby9Db21tb24vU2V0RGF0YUNvbnRleHRcIjtcblxuY29uc29sZS5sb2coXCJ2OiAtIDMuMjlcIik7XG5cbmV4cG9ydCBjb25zdCBGT01SX0JVSUxERVJfUEFUSF9TVFJJTkcgPSBcImFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGFcIjtcbmV4cG9ydCBjb25zdCBFUlJPUl9ESVZfU0VMRUNUT1IgPSBcIiNyZW5kZXItZXJyb3JzLWhlcmVcIjtcblxuaW50ZXJmYWNlIElERUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIG1vZGVsOiBJU2hhcmVkb0JsYWRlTW9kZWw7XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGU7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZWlmeTxUPiA9IHtcbiAgICBbUCBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW1BdPjtcbn07XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczI8VENvbmZpZz4gPSB7XG4gICAgW0sgaW4ga2V5b2YgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XToga28uT2JzZXJ2YWJsZTxcbiAgICAgICAgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdXG4gICAgPjtcbn07XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPVxuICAgIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4+O1xuXG5leHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFxuICAgIElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz5cbj47XG5cbi8vIGV4cG9ydCB0eXBlIElPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSAge2RlYnVnOiBrby5PYnNlcnZhYmxlPE9ic2VydmFibGVJRGVidWc+fSAmXG4vLyB7XG4vLyAgICAgW0sgaW4ga2V5b2YgVENvbmZpZ106IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VENvbmZpZz5bS107XG5cbi8vIH1cblxuZXhwb3J0IHR5cGUgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+ID0gSUNvbmZpZ3VyYXRpb25Ib3N0ICZcbiAgICBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbi8vIGFic3RyYWN0IGNsYXNzIENyZWF0b3I8VENvbmZpZz4ge1xuLy8gICAgIHB1YmxpYyBhYnN0cmFjdCBGYWN0b3J5TWV0aG9kKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4sIGJhc2VNb2RlbDogYW55KTogYW55O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybUJ1aWxkZXJGaWVsZFBhdGgoZm9ybUJ1aWxkZXJGaWVsZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGAke0ZPTVJfQlVJTERFUl9QQVRIX1NUUklOR30uJHtmb3JtQnVpbGRlckZpZWxkfWA7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZVBlcnNvbjxUQ29uZmlnPiA9IE9ic2VydmFibGVpZnk8XG4gICAgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XG4+O1xuXG5pbnRlcmZhY2UgSU1vZGVsIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlSURFQXNwZWN0PFRDb25maWcsIFRQZXJzaXRhbmNlPiB7XG4gICAgX2RhdGE6IGFueTsgLy9ub24gbW9kZWwgZGF0YSBzdG9yYWdlXG4gICAgb3JpZ2luYWxDb25maWd1cmF0aW9uITogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgY29uZmlndXJhdGlvbjpcbiAgICAgICAgfCBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+XG4gICAgICAgIHwgdW5kZWZpbmVkO1xuICAgIHNoYXJlZG9Db25maWd1cmF0aW9uITogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGRlZmF1bHRzOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+IHwgdW5kZWZpbmVkO1xuICAgIGVsZW1lbnQhOiBIVE1MRWxlbWVudDtcbiAgICBtb2RlbDogSU1vZGVsIHwgdW5kZWZpbmVkO1xuICAgIC8vIGVuYWJsZWQhOiBib29sZWFuO1xuICAgIGJsYWRlOiBUU2hhcmVEb0JsYWRlIHwgdW5kZWZpbmVkO1xuICAgIGxvYWRlZCE6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47XG4gICAgc2hhcmVkb0lkIToga28uT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIHBhcmVudFNoYXJlZG9JZCE6IGtvLk9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBzaGFyZWRvVHlwZVN5c3RlbU5hbWUhOiBrby5PYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgcGhhc2VOYW1lIToga28uT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIHBoYXNlSXNPcGVuIToga28uT2JzZXJ2YWJsZTxib29sZWFuIHwgdW5kZWZpbmVkPjtcbiAgICB2YWxpZGF0aW9uOiBhbnk7XG4gICAgdmFsaWRhdGlvbkVycm9yQ291bnQhOiBrby5PYnNlcnZhYmxlPG51bWJlcj47XG4gICAgYmFzZU1vZGVsITogVFNoYXJlZG88YW55PjtcbiAgICB0aGlzQ29tcG9uZW50TmFtZSE6IHN0cmluZztcbiAgICBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGE6IHN0cmluZyB8IHVuZGVmaW5lZDsgLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tXG4gICAgc2hhcmVEb09wdGlvbnMhOiBPYnNlcnZhYmxlU2hhcmVkb0NvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+O1xuICAgIF9zaGFyZURvT3B0aW9ucyE6IE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8dW5rbm93bj47IC8vdXNlIGZvciB0eXBpbmdzIG9mIHRoaXMgYmFzZSBpZGUgYXMgVENvbmZpZyBjYXVzZWQgaXNzdWVcbiAgICBvcHRpb25zOlxuICAgICAgICB8IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxcbiAgICAgICAgICAgIElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz5cbiAgICAgICAgPlxuICAgICAgICB8IHVuZGVmaW5lZDtcbiAgICBfb3B0aW9uczpcbiAgICAgICAgfCBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8XG4gICAgICAgICAgICBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPHVua25vd24+XG4gICAgICAgID5cbiAgICAgICAgfCB1bmRlZmluZWQ7XG4gICAgdW5pcXVlSWQhOiBzdHJpbmc7XG4gICAgd2lkZ2V0U2V0dGluZ3MhOiBJV2lkZ2V0SnNvbjxUQ29uZmlnPjtcbiAgICBhc3BlY3RMb2dPdXRwdXQ6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgIGxpdmVDb25maWdEaXY6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgIGxpdmVDb25maWdEYXRhOiBhbnk7XG4gICAgZXJyb3JEaXZTZWxlY3Rvcjogc3RyaW5nO1xuICAgIGVycm9yczoga28uT2JzZXJ2YWJsZUFycmF5PFRVc2VyRXJyb3JzPiB8IHVuZGVmaW5lZDtcbiAgICByZWZyZXNoTG9nOiBBcnJheTxhbnk+O1xuICAgIGxhc3RSZWZyZXNoOiBEYXRlIHwgdW5kZWZpbmVkO1xuICAgIGRpc3Bvc2FibGVzOiBBcnJheTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQmFzZSBDb25zdHJ1Y3RvciBmb3IgYWxsIElERUFzcGVjdHMsIGZvcmNlcyB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvYWQgYW5kIHNhdmUgbWV0aG9kc1xuICAgICAqIEBwYXJhbSBjb21wb25lbnROYW1lIC8vVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBlLmcuIEFzcGVjdC5RdWlja1ZpZXdcbiAgICAgKiBAcGFyYW0gbG9hZFNhdmVMb2NhdGlvbiAvL1RoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gZS5nLiBtb2RlbC5hc3BlY3QuRm9ybUJ1aWxkZXIuZm9ybURhdGFcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAvL1RoZSBlbGVtZW50IHRoYXQgdGhlIGFzcGVjdCBpcyBib3VuZCB0b1xuICAgICAqIEBwYXJhbSBjb25maWd1cmF0aW9uIC8vVGhlIGNvbmZpZ3VyYXRpb24gcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlIGFuZCB0aGUgZGVzaWduIHRpbWUgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBiYXNlTW9kZWwgLy9UaGUgYmFzZSBtb2RlbCBwYXNzZWQgaW4gZnJvbSB0aGUgYmxhZGVcbiAgICAgKiBAcGFyYW0gZGVmYXVsdHMgLy9UaGUgZGVmYXVsdHMgcGFzc2VkIGluIGZyb20gdGhlIHdpZGdldCB0byBzZXQgaW5jYXNlIG9mIGJhZCBjb25maWd1cmF0aW9uIG9yIG1pc3NpbmcgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBjb25maWd1cmF0aW9uOiBUQ29uZmlnLFxuICAgICAgICBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT5cbiAgICApO1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciguLi5hcnI6IGFueVtdKSB7XG4gICAgICAgIHRoaXMud2lkZ2V0U2V0dGluZ3MgPSB0aGlzLnNldFdpZGdldEpzb25TZXR0aW5ncygpO1xuICAgICAgICB0aGlzLnRoaXNDb21wb25lbnROYW1lID0gdGhpcy5zZXRUaGlzQ29tcG9uZW50TmFtZSgpO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gdGhpcy5zZXREZWZhdWx0cygpOyAvL3NldHVwIHRoZSBkZWZhdWx0IGJ5IGNhbGxpbmcgdGhlIGFic3RyYWN0IG1ldGhvZCBpbiB0aGUgY2hpbGQgY2xhc3NcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcyA9IFtdO1xuICAgICAgICB0aGlzLnJlZnJlc2hMb2cgPSBuZXcgQXJyYXk8YW55PigpO1xuXG4gICAgICAgIHRoaXMuZXJyb3JEaXZTZWxlY3RvciA9IEVSUk9SX0RJVl9TRUxFQ1RPUjtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBrby5vYnNlcnZhYmxlQXJyYXk8VFVzZXJFcnJvcnM+KCk7XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgYmFzZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY29uc3RydWN0b3IgdGhhdCBpcyBjYWxsZWQgYnkgdGhlIElERVxuICAgICAgICAgICAgdGhpcy51bmlxdWVJZCA9IHV1aWQoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGlzZShhcnJbMF0sIGFyclsxXSwgYXJyWzJdKTtcbiAgICAgICAgICAgIC8vIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25TZXR1cFwiLCB0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KFwiYWZ0ZXJTZXR1cFwiLCB0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBMaXZlQ29uZmlnKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwRXZlbnRXYXRjaGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwRXJyb3JNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLmFkZEFzcGVjdExvZ091dHB1dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2luaXRpYWxpc2UoXG4gICAgICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBwb2x1dGVkQ29uZmlndXJhdGlvbjogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4sXG4gICAgICAgIGJhc2VNb2RlbDogVFNoYXJlZG88YW55PlxuICAgICkge1xuICAgICAgICAvL2xldCBjb25maWd1cmF0aW9uID0gcG9sdXRlZENvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbjsgLy9Qb2x1dGVkIGFzIFNoYXJlZG8gYWRkZWQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiB0byB0aHNpIG9iamVjdCBkZXBlbmRpbmcgb24gd2hlcmUgaXRzIGluc3RhbnNpYXRlZFxuICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uID0gcG9sdXRlZENvbmZpZ3VyYXRpb247XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIC8vU2hhcmVEbyBwYXNzZXMgdGhlIGNvbmZpZyBhcyB3ZWxsIGFzIG90aGVyIHN0dWZmLCBzbyB3ZSBuZWVkIHRvIGV4dHJhY3QgdGhlIGNvbmZpZ1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbiA9IHBvbHV0ZWRDb25maWd1cmF0aW9uO1xuICAgICAgICB0aGlzLmJhc2VNb2RlbCA9IGJhc2VNb2RlbDtcblxuICAgICAgICAvLyB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvblxuXG4gICAgICAgIC8vIGxldCBiYXNlRGVmYXVsdHM6IElEZWZhdWx0Q29uZmlnU2V0dGluZ3M8YW55PiA9IHtcbiAgICAgICAgLy8gICAgIGRlYnVnOiB7XG4gICAgICAgIC8vICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIC8vICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlLFxuICAgICAgICAvLyAgICAgICAgIGxpdmVDb25maWc6IGZhbHNlXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvL2NoZWNrIHRoYXQgd2UgaGF2ZSBhIHN1YiBjb25maWd1cmF0aW9uXG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgIFwiTm8gY29uZmlndXJhdGlvbiBmb3VuZCBpbiB0aGUgc2hhcmVkb0NvbmZpZ3VyYXRpb24gLSBjaGVjayB0aGUgYXNwZWN0IG9yIHdpZGdldCBjb25maWcgdGhhdCB0aGVyIGVpcyBhIGJhc2UgY29uZmlndXJhdGlvbiBvZiBjb25maWd1cmF0aW9uOnt9XCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb25maWd1cmF0aW9uIGZvdW5kIGluIHRoZSBzaGFyZWRvQ29uZmlndXJhdGlvblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbiA9ICQuZXh0ZW5kKFxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUdVUkFUSU9OX1NFVFRJTkdTLFxuICAgICAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uXG4gICAgICAgICk7IC8vbWFrZSBzdXJlIGRlYnVnIGlzIHNldCBvciB1c2UgZGVmYXVsdHNcbiAgICAgICAgLy8gdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24uZGVidWcgPSAkLmV4dGVuZChiYXNlRGVmYXVsdHMuZGVidWcsIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmRlYnVnKSBhcyBJRGVidWc7XG4gICAgICAgIC8vIGNvbmZpZ3VyYXRpb24uZGVidWcgPSAkLmV4dGVuZChiYXNlRGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24uZGVidWcpIGFzIElEZWJ1ZztcblxuICAgICAgICAvLyB0aGlzLmRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIE1lcmdlIHRoZSBjb25maWd1cmF0aW9uIHdpdGggdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbiA9ICQuZXh0ZW5kKFxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0cyxcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25cbiAgICAgICAgKTtcblxuICAgICAgICAvL2NyZWF0ZSBhIG5ldyBtb2RlbFxuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw7XG4gICAgICAgIC8vIHRoaXMuZW5hYmxlZCA9IHRoaXMubW9kZWw/LmNhbkVkaXQ7XG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5ibGFkZTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0aGlzLmxvYWRlZCB8fCBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgLy8gTWFwIHRoZSBiYXNlIG1vZGVsIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5zaGFyZWRvSWQgPVxuICAgICAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWwuaWQgfHxcbiAgICAgICAgICAgICR1aS5wYWdlQ29udGV4dD8uc2hhcmVkb0lkIHx8XG4gICAgICAgICAgICBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvSWQgfHwgdGhpcy5zaGFyZWRvSWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvSWQgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSA9XG4gICAgICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8uc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIHx8XG4gICAgICAgICAgICAkdWkucGFnZUNvbnRleHQ/LnNoYXJlZG9UeXBlTmFtZSB8fFxuICAgICAgICAgICAga28ub2JzZXJ2YWJsZSh1bmRlZmluZWQpO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIHx8ICF0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFyZW50U2hhcmVkb0lkID1cbiAgICAgICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsPy5wYXJlbnRTaGFyZWRvSWQgfHxcbiAgICAgICAgICAgIGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5waGFzZU5hbWUgPVxuICAgICAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw/LnBoYXNlTmFtZSB8fFxuICAgICAgICAgICAgJHVpLnBhZ2VDb250ZXh0Py5waGFzZU5hbWUgfHxcbiAgICAgICAgICAgIGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5waGFzZUlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8ucGhhc2VJc09wZW4gfHxcbiAgICAgICAgICAgICR1aS5wYWdlQ29udGV4dD8ucGhhc2VJc09wZW4gfHxcbiAgICAgICAgICAgIGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgLy8gdGhpcy5zaGFyZURvT3B0aW9ucyA9IHRvT2JzZXJ2YWJsZU9iamVjdCh0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLCB0aGlzLnNoYXJlRG9PcHRpb25zKTtcbiAgICAgICAgLy8gdGhpcy5fc2hhcmVEb09wdGlvbnMgPSB0aGlzLnNoYXJlRG9PcHRpb25zIGFzIE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8dW5rbm93bj5cblxuICAgICAgICAvLyBWYWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvckNvdW50ID0gdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCB8fCBrby5vYnNlcnZhYmxlKDApO1xuXG4gICAgICAgIHRoaXMuYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbik7XG4gICAgICAgIC8vc2V0dXAgdGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbSBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIC8vISAtLT4gTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhIDwtLSAtIHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBhdCB0aGUgZW5kIG9mIHRoaXMgZnVuY3Rpb24gdG8gZW5zdXJlIHRoYXQgdGhlIG9wdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb24gZGF0YSBpcyBhdmFpbGFiZWwgdG8gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkluaXRpYWxpc2VcIiwgdGhpcy5tb2RlbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseUNvbXBvbmVudENvbmZpZ3VyYXRpb24oXG4gICAgICAgIGNvbmZpZ3VyYXRpb246IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz5cbiAgICApIHtcbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb25Bc09ic2VydmFibGVzID0gdG9PYnNlcnZhYmxlT2JqZWN0KFxuICAgICAgICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGNvbmZpZ3VyYXRpb25Bc09ic2VydmFibGVzO1xuICAgICAgICAvLyAhIE5vdGUgbGluZSBiZWxvdyBpcyBmb3IgdHlwaW5nIHdpdGhpbiB0aGUgSURFQmFzZSwgdGhlIGxpbmUgYWJvdmUgaXMgZm9yIHR5cGluZyB3aXRoaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPVxuICAgICAgICAgICAgY29uZmlndXJhdGlvbkFzT2JzZXJ2YWJsZXMgYXMgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFxuICAgICAgICAgICAgICAgIElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8dW5rbm93bj5cbiAgICAgICAgICAgID47XG4gICAgfVxuXG4gICAgY2xlYXJFcnJvcnMoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JzPy5yZW1vdmVBbGwoKTtcbiAgICB9XG5cbiAgICBzZXR1cEVycm9yTWFuYWdlcigpIHtcbiAgICAgICAgdGhpcy5sKFwiU2V0dGluZyB1cCBlcnJvciBtYW5hZ2VyXCIpO1xuICAgICAgICB0aGlzLmVycm9ycz8uc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbmYoXCJFcnJvcnMgY2hhbmdlZFwiLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkRXJyb3JEaXYoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0dXBMaXZlQ29uZmlnKCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zPy5kZWJ1Zy5zdWJzY3JpYmUoKG5ld1ZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZS5saXZlQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUxpdmVDb25maWcobmV3VmFsdWUubGl2ZUNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVMaXZlQ29uZmlnKHRoaXMuX29wdGlvbnM/LmRlYnVnKCkubGl2ZUNvbmZpZygpKTsgLy9UT0RPIGZpeCB0eXBpbmdzXG4gICAgfVxuXG4gICAgYWN0aXZhdGVMaXZlQ29uZmlnKGFjdGl2ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5saXZlQ29uZmlnRGl2Py5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxpdmVDb25maWdEaXYpIHtcbiAgICAgICAgICAgIC8vbGVhdmUgYWxvbmUgaWYgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubChcIlNldHRpbmcgdXAgbGl2ZSBjb25maWdcIik7XG5cbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZERhdGEgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiX2hvc3RcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgNFxuICAgICAgICApO1xuXG4gICAgICAgIC8vY2xvbmUgdGhlIGNvbmZpZ1xuICAgICAgICBsZXQgY29uZmlnID0ga28ub2JzZXJ2YWJsZShzZXJpYWxpemVkRGF0YSk7XG5cbiAgICAgICAgdGhpcy5saXZlQ29uZmlnRGF0YSA9IHtcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB0aW1lb3V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5saXZlQ29uZmlnRGl2ID0gdGhpcy5jcmVhdGVMaXZlQ29uZmlnRGl2KCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnByZXBlbmQodGhpcy5saXZlQ29uZmlnRGl2KTtcbiAgICAgICAgbGV0IGFwcGx5Q2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbXBvbmVudENvbmZpZ3VyYXRpb24oSlNPTi5wYXJzZShjb25maWcoKSkuY29uZmlndXJhdGlvbik7XG4gICAgICAgICAgICB0aGlzLmxpdmVDb25maWd1cmF0aW9uUmVmcmVzaGVkKCk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkRXJyb3JEaXYoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbmZpZy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVib3VuY2VkQXBwbHlDaGFuZ2UgPSBkZWJvdW5jZUZ1bmN0aW9uKGFwcGx5Q2hhbmdlLCAzMDAwKTtcbiAgICAgICAgICAgICAgICBkZWJvdW5jZWRBcHBseUNoYW5nZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUaGUgbmV3IHZhbHVlIGlzIFwiICsgbmV3VmFsdWUpXG5cbiAgICAgICAgICAgICAgICAvLyBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICB0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBuZXdDb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZygpKVxuXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKG5ld0NvbmZpZy5jb25maWd1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5saXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICAvLyB0aGlzLnJlZnJlc2gobmV3Q29uZmlnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gdGhpcy5yZXNldChuZXdDb25maWcpO1xuICAgICAgICAgICAgICAgIC8vIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgLy8gdGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMzAwMCk7XG5cbiAgICAgICAgLy8ga28uYXBwbHlCaW5kaW5ncyh0aGlzLmxpdmVDb25maWdEYXRhLCB0aGlzLmxpdmVDb25maWdEaXYpO3hcblxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZW5zdXJlU3R5bGVzTG9hZGVkKGhyZWY6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpbmtbaHJlZj1cIiR7aHJlZn1cIl1gKSkge1xuICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICAgICAgICAgICAgbGluay5ocmVmID0gaHJlZjtcbiAgICAgICAgICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgICAgICAgICBsaW5rLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTGl2ZUNvbmZpZ0RpdigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgb3V0ZXIgPGRpdj4gd2l0aCBjbGFzcyBcImNvbC1zbS0xMiBmb3JtYnVpbGRlci1lZGl0b3ItanNvblwiXG4gICAgICAgIGNvbnN0IG91dGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgb3V0ZXJEaXYuY2xhc3NOYW1lID0gXCJjb2wtc20tMTIgZm9ybWJ1aWxkZXItZWRpdG9yLWpzb25cIjtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGlubmVyIDxkaXY+IHdpdGggdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVzXG4gICAgICAgIGNvbnN0IGlubmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW5uZXJEaXYuaWQgPSBcImxpdmVDb25maWdcIjtcbiAgICAgICAgaW5uZXJEaXYuY2xhc3NOYW1lID0gXCJmb3JtLWNvbnRyb2wgdGV4dGFyZWFcIjtcbiAgICAgICAgaW5uZXJEaXYuc3R5bGUuaGVpZ2h0ID0gXCIzMDBweFwiO1xuICAgICAgICAvLyBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsICdzeW50YXhFZGl0b3I6IGxpdmVDb25maWdEYXRhLmNvbmZpZywgZW5hYmxlOiB0cnVlLCBldmVudDogeyBmb2N1c291dDogbGl2ZUNvbmZpZ0RhdGEub25Gb2N1c091dCB9Jyk7XG4gICAgICAgIGlubmVyRGl2LnNldEF0dHJpYnV0ZShcImRhdGEtYmluZFwiLCBcInN5bnRheEVkaXRvcjogbGl2ZUNvbmZpZ0RhdGEuY29uZmlnXCIpO1xuICAgICAgICAvLyBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsICdzeW50YXhFZGl0b3I6IG1vZGVsLmNvbmZpZycpO1xuICAgICAgICAvLyBBcHBlbmQgdGhlIGlubmVyRGl2IHRvIHRoZSBvdXRlckRpdlxuICAgICAgICBvdXRlckRpdi5hcHBlbmRDaGlsZChpbm5lckRpdik7XG5cbiAgICAgICAgcmV0dXJuIG91dGVyRGl2O1xuICAgIH1cblxuICAgIHNldHVwRXZlbnRXYXRjaGVyKCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zPy5ldmVudHNUb1JlYWN0VG8oKT8uZm9yRWFjaCgoZXZlbnRUb1dhdGNoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIHRvIGV2ZW50XCIsIGV2ZW50VG9XYXRjaCk7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgJHVpLmV2ZW50cy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VG9XYXRjaC5ldmVudFBhdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VG9XYXRjaC5ldmVudFBhdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRvV2F0Y2gubWV0aG9kVG9DYWxsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcmVmcmVzaE9uID0ga28udG9KUyh0aGlzLl9vcHRpb25zPy5yZWZyZXNoT24oKSk7XG4gICAgICAgIGlmIChyZWZyZXNoT24pIHtcbiAgICAgICAgICAgIGlmIChyZWZyZXNoT24uc2hhcmVkb0lkQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRvSWQuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50KFwic2hhcmVkb0lkQ2hhbmdlZFwiLCBcInJlZnJlc2hcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlZnJlc2hPbi5zaGFyZWRvUGFyZW50SWRDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFNoYXJlZG9JZC5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb21wb25lbnQoXCJzaGFyZWRvUGFyZW50SWRDaGFuZ2VkXCIsIFwicmVmcmVzaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVmcmVzaE9uLnNoYXJlZG9QaGFzZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGhhc2VOYW1lLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudChcInNoYXJlZG9QaGFzZUNoYW5nZWRcIiwgXCJyZWZyZXNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoQ29tcG9uZW50KFxuICAgICAgICBldmVudFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgbWV0aG9kVG9DYWxsOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoTG9nID0gdGhpcy5yZWZyZXNoTG9nIHx8IFtdO1xuICAgICAgICBpZiAodGhpcy5sYXN0UmVmcmVzaCkge1xuICAgICAgICAgICAgLy9UT0RPOiBjaGFuZ2UgdGhpcyBzbyB3ZSBjb2xsZWN0IGFsbCByZWZyZXNoZXMgYW5kIGRvIHRoZW0gaW4gb25lIGdvXG4gICAgICAgICAgICBsZXQgc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2ggPVxuICAgICAgICAgICAgICAgIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMubGFzdFJlZnJlc2guZ2V0VGltZSgpKSAvIDEwMDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2Vjb25kcyBzaW5jZSBsYXN0IHJlZnJlc2hcIiwgc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2gpO1xuICAgICAgICAgICAgaWYgKHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoIDwgMTApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIHJlZnJlc2gsIHRvbyBzb29uXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdFJlZnJlc2ggPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZnJlc2hpbmcgY29tcG9uZW50XCIpO1xuICAgICAgICBsZXQgbG9nSXRlbSA9IHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogZXZlbnRQYXRoLFxuICAgICAgICAgICAgbWV0aG9kVG9DYWxsOiBtZXRob2RUb0NhbGwsXG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kVG9DYWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IHBhcmFtcyA9IHdpZGdldHMucGFyYW1ldGVycztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4ZWN1dGluZyBtZXRob2RcIiwgbWV0aG9kVG9DYWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50VG9SZWZyZXNoID0gdGhpcyBhcyBhbnk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb21wb25lbnRUb1JlZnJlc2hbbWV0aG9kVG9DYWxsXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGBNZXRob2Qgbm90IGZvdW5kIG9uIGNvbXBvbmVudCAke3RoaXMudGhpc0NvbXBvbmVudE5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZFRvQ2FsbFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFRvUmVmcmVzaFttZXRob2RUb0NhbGxdKCk7IC8vdG9kbzogcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBsb2dJdGVtLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoTG9nLnB1c2gobG9nSXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWlsZEVycm9yRGl2KCkge1xuICAgICAgICB0aGlzLmluZihcIkJ1aWxkaW5nIGVycm9yIGRpdlwiKTtcbiAgICAgICAgbGV0IGVycm9yRGl2ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lcnJvckRpdlNlbGVjdG9yKTtcbiAgICAgICAgaWYgKCFlcnJvckRpdikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbChcImVycm9yRGl2LmlubmVySFRNTFwiKTtcbiAgICAgICAgZXJyb3JEaXYuaW5uZXJIVE1MID0gXCJcIjsgLy9jbGVhbiBvdXQgdGhlIGRpdlxuXG4gICAgICAgIGlmICghdGhpcy5lcnJvcnMpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0ga28ub2JzZXJ2YWJsZUFycmF5PFRVc2VyRXJyb3JzPigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVycm9ycygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVycm9yQ29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZXJyb3JEaXYuYXBwZW5kQ2hpbGQoZXJyb3JDb250YWluZXJEaXYpO1xuXG4gICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1jb250YWluZXJcIjtcbiAgICAgICAgbGV0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGl0bGVEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXRpdGxlXCI7XG4gICAgICAgIHRpdGxlRGl2LmlubmVyVGV4dCA9IFwiVGhlcmUgaGFzIGJlZW4gYW4gZXJyb3I6XCI7XG4gICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcbiAgICAgICAgbGV0IGZvcmVhY2hEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChmb3JlYWNoRGl2KTtcblxuICAgICAgICAvLyB0aGlzLmVycm9ycygpLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lcnJvcnMoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVycm9yID0gdGhpcy5lcnJvcnMoKVtpXTtcbiAgICAgICAgICAgIC8vTG9vayBmb3IgYW55IHRyYXBwaW5nIGFuZCBhZGQgdG8gdGhlIGVycm9yIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvclRyYXBwaW5nKGVycm9yKTtcbiAgICAgICAgICAgIC8vUmVuZGVyIHRoZSBlcnJvciBkaXYgYW5kIGFkZCB0byB0aGUgZm9yZWFjaCBkaXZcbiAgICAgICAgICAgIGZvcmVhY2hEaXYuYXBwZW5kQ2hpbGQodGhpcy5idWlsZEluZGl2aWR1YWxFcnJvcihlcnJvcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRJbmRpdmlkdWFsRXJyb3IoZXJyb3I6IFRVc2VyRXJyb3JzKSB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZUFwcGxpY2F0b3IgPSBuZXcgVGVtcGxhdGVBcHBsaWNhdG9yKCk7XG4gICAgICAgIGxldCBkYXRhQ29udGV4dCA9IHRoaXMuZ2V0RGF0YUNvbnRleHQoW3sgb2JqOiBlcnJvciwga2V5OiBcImVycm9yXCIgfV0pO1xuICAgICAgICBsZXQgbGlua2VkVHJhcHBlZEVycm9yID0gZXJyb3IubGlua2VkVHJhcHBlZEVycm9yO1xuXG4gICAgICAgIGxldCBpbmRpdmlkdWFsRXJyb3JEaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWluZGl2aWR1YWwtZXJyb3JcIjtcbiAgICAgICAgaWYgKGxpbmtlZFRyYXBwZWRFcnJvcikge1xuICAgICAgICAgICAgdGVtcGxhdGVBcHBsaWNhdG9yLmFkZENTUyhcbiAgICAgICAgICAgICAgICBsaW5rZWRUcmFwcGVkRXJyb3IuY2xhc3NSdWxlcyxcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYsXG4gICAgICAgICAgICAgICAgXCJkYXRhQ29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGRhdGFDb250ZXh0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGVtcGxhdGVBcHBsaWNhdG9yLmFkZFN0eWxlKFxuICAgICAgICAgICAgICAgIGxpbmtlZFRyYXBwZWRFcnJvci5zdHlsZVJ1bGVzLFxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxFcnJvckRpdixcbiAgICAgICAgICAgICAgICBcImRhdGFDb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgZGF0YUNvbnRleHRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXNlck1lc3NhZ2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB1c2VyTWVzc2FnZURpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItdXNlci1tZXNzYWdlXCI7XG5cbiAgICAgICAgbGV0IHN1Z2dlc3Rpb25zRGl2OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IHN1cHBvcnRCdXR0b25EaXY6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgYWN0aW9uc0RpdjogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIC8vIGFjdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWFjdGlvbnNcIjtcblxuICAgICAgICBsZXQgaW50ZXJuYWxTdWdnZXN0aW9uc0RpdjogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIC8vIGludGVybmFsU3VnZ2VzdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWludGVybmFsLXN1Z2dlc3Rpb25zXCI7XG5cbiAgICAgICAgdXNlck1lc3NhZ2VEaXYuaW5uZXJIVE1MID1cbiAgICAgICAgICAgIGxpbmtlZFRyYXBwZWRFcnJvcj8udXNlckZyZWluZGx5TWVzc2FnZSB8fFxuICAgICAgICAgICAgZXJyb3IudXNlck1lc3NhZ2UgfHxcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwiVW5rbm93biBlcnJvclwiO1xuXG4gICAgICAgIGlmIChsaW5rZWRUcmFwcGVkRXJyb3I/LnVzZXJGcmVpbmRseUhUTUxNZXNzYWdlVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGxldCB1c2VyRnJlaW5kbHlNZXNzYWdlID0gZXhlY3V0ZUVtYmVkZGVkQ29kZShcbiAgICAgICAgICAgICAgICBsaW5rZWRUcmFwcGVkRXJyb3IudXNlckZyZWluZGx5SFRNTE1lc3NhZ2VUZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRhQ29udGV4dFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlRGl2LmlubmVySFRNTCA9IHVzZXJGcmVpbmRseU1lc3NhZ2U7XG4gICAgICAgICAgICAvL0ZpbmQgc2VjdGlvbiBkaXZzIGluIHRoZSB0ZW1wbGF0ZSBpZiB0aGV5IGV4aXN0XG4gICAgICAgICAgICBzdWdnZXN0aW9uc0RpdiA9XG4gICAgICAgICAgICAgICAgKHVzZXJNZXNzYWdlRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuaWRlLWFzcGVjdC1lcnJvci1zdWdnZXN0aW9uc1wiKSBhc1xuICAgICAgICAgICAgICAgICAgICB8IEhUTUxEaXZFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHwgdW5kZWZpbmVkKSB8fCBzdWdnZXN0aW9uc0RpdjtcbiAgICAgICAgICAgIGFjdGlvbnNEaXYgPVxuICAgICAgICAgICAgICAgICh1c2VyTWVzc2FnZURpdi5xdWVyeVNlbGVjdG9yKFwiLmlkZS1hc3BlY3QtZXJyb3ItYWN0aW9uc1wiKSBhc1xuICAgICAgICAgICAgICAgICAgICB8IEhUTUxEaXZFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHwgdW5kZWZpbmVkKSB8fCBhY3Rpb25zRGl2O1xuICAgICAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9uc0RpdiA9XG4gICAgICAgICAgICAgICAgKHVzZXJNZXNzYWdlRGl2LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAgIFwiLmlkZS1hc3BlY3QtZXJyb3ItaW50ZXJuYWwtc3VnZ2VzdGlvbnNcIlxuICAgICAgICAgICAgICAgICkgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQpIHx8IGludGVybmFsU3VnZ2VzdGlvbnNEaXY7XG4gICAgICAgIH1cblxuICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYuYXBwZW5kQ2hpbGQodXNlck1lc3NhZ2VEaXYpO1xuXG4gICAgICAgIC8vIHVzZXJNZXNzYWdlRGl2Lm9uY2xpY2sgPSAoKSA9PiB7XG5cbiAgICAgICAgLy8gICAgIC8vY3JlYXRlIGEgZGl2IHRoYXQgY2FuIHNjb2xsXG4gICAgICAgIC8vICAgICBsZXQgZGV0YWlsZWRNZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgLy8gICAgIGRldGFpbGVkTWVzc2FnZURpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItZGV0YWlsZWQtbWVzc2FnZVwiO1xuXG4gICAgICAgIC8vICAgICBjb25zdCBjb2RlID0gZXNjYXBlSHRtbChlcnJvci5jb2RlIHx8IFwiXCIpO1xuICAgICAgICAvLyAgICAgY29uc3QgbWVzc2FnZSA9IGVzY2FwZUh0bWwoZXJyb3IubWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IHVzZXJNZXNzYWdlID0gZXNjYXBlSHRtbChlcnJvci51c2VyTWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IGVycm9yU3RhY2sgPSBlc2NhcGVIdG1sKGVycm9yLmVycm9yU3RhY2sgfHwgXCJcIik7XG5cbiAgICAgICAgLy8gICAgIGNvbnN0IGFkZGl0aW9uYWxJbmZvID0gSnNvblRvSHRtbENvbnZlcnRlci5jb252ZXJ0KGVycm9yLmFkZGl0aW9uYWxJbmZvIHx8IHt9KTtcblxuICAgICAgICAvLyAgICAgY29uc3QgaHRtbCA9IGBcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDxoMj5FcnJvcjogJHtjb2RlfTwvaDI+XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5NZXNzYWdlOjwvc3Ryb25nPiAke21lc3NhZ2V9PC9wPlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+VXNlciBNZXNzYWdlOjwvc3Ryb25nPiAke3VzZXJNZXNzYWdlfTwvcD5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlN0YWNrOjwvc3Ryb25nPiAke2Vycm9yU3RhY2t9PC9wPlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+QWRkaXRpb25hbCBJbmZvOjwvc3Ryb25nPiAke2FkZGl0aW9uYWxJbmZvfTwvcD5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG4gICAgICAgIC8vICAgICBkZXRhaWxlZE1lc3NhZ2VEaXYuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgLy8gICAgICR1aS5lcnJvckRpYWxvZyhkZXRhaWxlZE1lc3NhZ2VEaXYpO1xuXG4gICAgICAgIC8vIH1cblxuICAgICAgICAvL2NyZWF0ZSB0aGUgc2VjdGlvbnMgZGl2cyBpZiB0aGV5IGRvbmUgZXhpc3RzIGFuZCBhZGQgdG8gdGhlIGluZGl2aWR1YWwgZXJyb3IgZGl2XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghc3VnZ2VzdGlvbnNEaXYpIHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEVycm9yRGl2LmFwcGVuZENoaWxkKHN1Z2dlc3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFhY3Rpb25zRGl2KSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEVycm9yRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNEaXYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWludGVybmFsU3VnZ2VzdGlvbnNEaXYpIHtcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYuYXBwZW5kQ2hpbGQoaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghc3VwcG9ydEJ1dHRvbkRpdikge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRCdXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxFcnJvckRpdi5hcHBlbmRDaGlsZChzdXBwb3J0QnV0dG9uRGl2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNvbHV0aW9uU3VnZ2VzdGlvbnMgPVxuICAgICAgICAgICAgbGlua2VkVHJhcHBlZEVycm9yPy5yZXNvbHV0aW9uU3VnZ2VzdGlvbnMgfHxcbiAgICAgICAgICAgIGVycm9yLmludGVybmFsU3VnZ2VzdGlvbnMgfHxcbiAgICAgICAgICAgIFtdO1xuICAgICAgICBpZiAocmVzb2x1dGlvblN1Z2dlc3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1zdWdnZXN0aW9uc1wiO1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnNEaXYuaW5uZXJIVE1MID0gYDxiPlN1Z2dlc3Rpb25zOjwvYj48YnIvPiR7cmVzb2x1dGlvblN1Z2dlc3Rpb25zLmpvaW4oXG4gICAgICAgICAgICAgICAgXCI8YnIvPlwiXG4gICAgICAgICAgICApfWA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWN0aW9ucyA9IGVycm9yLnNoYXJlZG9FcnJvckFjdGlvbnMgfHwgW107XG4gICAgICAgIGlmIChhY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGFjdGlvbnNEaXYuaW5uZXJIVE1MID0gYDxiPkFjdGlvbnM6PC9iPjxici8+JHthY3Rpb25zLmpvaW4oXCI8YnIvPlwiKX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGludGVybmFsU3VnZ2VzdGlvbnMgPSBlcnJvci5pbnRlcm5hbFN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICBpZiAoaW50ZXJuYWxTdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5JbnRlcm5hbCBTdWdnZXN0aW9uczo8L2I+PGJyLz4ke2ludGVybmFsU3VnZ2VzdGlvbnMuam9pbihcbiAgICAgICAgICAgICAgICBcIjxici8+XCJcbiAgICAgICAgICAgICl9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdXBwb3J0QnV0dG9uID1cbiAgICAgICAgICAgIGxpbmtlZFRyYXBwZWRFcnJvcj8uc3VwcG9ydEJ1dHRvbiB8fFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uPy5lcnJvck1hbmFnZW1lbnQ/LnVuVHJhcHBlZEVycm9yc1N1cHBvcnRCdXR0b247XG4gICAgICAgIGlmIChzdXBwb3J0QnV0dG9uICYmIHN1cHBvcnRCdXR0b24uZW5hYmxlZCkge1xuICAgICAgICAgICAgbGV0IGFjdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBhY3Rpb25EaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXN1cHBvcnQtYWN0aW9uXCI7XG4gICAgICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uRGl2KTtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1wcmltYXJ5XCI7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3BlblBhbmVsKHN1cHBvcnRCdXR0b24sIGRhdGFDb250ZXh0KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRlbXBsYXRlQXBwbGljYXRvci5hZGRDU1MoXG4gICAgICAgICAgICAgICAgc3VwcG9ydEJ1dHRvbi5jbGFzc1J1bGVzLFxuICAgICAgICAgICAgICAgIGFjdGlvbkRpdixcbiAgICAgICAgICAgICAgICBcImRhdGFDb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgZGF0YUNvbnRleHRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0ZW1wbGF0ZUFwcGxpY2F0b3IuYWRkU3R5bGUoXG4gICAgICAgICAgICAgICAgc3VwcG9ydEJ1dHRvbi5zdHlsZVJ1bGVzLFxuICAgICAgICAgICAgICAgIGFjdGlvbkRpdixcbiAgICAgICAgICAgICAgICBcImRhdGFDb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgZGF0YUNvbnRleHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5pbm5lclRleHQgPSBzdXBwb3J0QnV0dG9uLnRpdGxlO1xuICAgICAgICAgICAgYWN0aW9uRGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kaXZpZHVhbEVycm9yRGl2O1xuICAgIH1cblxuICAgIGNyZWF0ZU9wZW5QYW5lbChcbiAgICAgICAgc3VwcG9ydEJ1dHRvbjogSVN1cHBvcnRCdXR0b24gfCB1bmRlZmluZWQsXG4gICAgICAgIGRhdGFDb250ZXh0OiBhbnlcbiAgICApIHtcbiBcbiAgICAgICAgaWYgKCFzdXBwb3J0QnV0dG9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gXG5cblxuICAgICAgICBsZXQgYnV0dG9uQ29uZmlnID0gc3VwcG9ydEJ1dHRvbi5yYWlzZVN1cHBvcnRUaWNrZXRTaGFyZWRvQ29tbWFuZDtcbiAgICAgICAgbGV0IHN1cHBvcnRUaWNrZXRNZXNzYWdlID0gYnV0dG9uQ29uZmlnLmRlc2NyaXB0aW9uIHx8ICBzdXBwb3J0QnV0dG9uLnN1cHBvcnRUaWNrZXRNZXNzYWdlIHx8IFwiXCI7XG5cbiAgICAgICAgbGV0IGNvbmZpZzogSVNoYXJlZG9QYW5lbENvbmZpZyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiBleGVjdXRlRW1iZWRkZWRDb2RlKGJ1dHRvbkNvbmZpZy50aXRsZSwgZGF0YUNvbnRleHQpLFxuICAgICAgICAgICAgdHlwZVN5c3RlbU5hbWU6IGV4ZWN1dGVFbWJlZGRlZENvZGUoYnV0dG9uQ29uZmlnLnR5cGVTeXN0ZW1OYW1lLCBkYXRhQ29udGV4dCksXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpleGVjdXRlRW1iZWRkZWRDb2RlKHN1cHBvcnRUaWNrZXRNZXNzYWdlLCBkYXRhQ29udGV4dClcbiAgICAgICAgfVxuICAgICAgICAkdWkubmF2Lmludm9rZSh7XG4gICAgICAgICAgICBpbnZva2VUeXBlOiBcInBhbmVsXCIsXG4gICAgICAgICAgICBpbnZva2U6IFwiU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5BZGRFZGl0U2hhcmVkb1wiLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZEVycm9yVHJhcHBpbmcoZXJyb3I6IFRVc2VyRXJyb3JzKSB7XG4gICAgICAgIC8vcnVuIHJ1bGVzIGluIGVycm9yIHRyYXBzIHRvIHNlZSBpZiB0aGlzIGVycm9yIGhhcyBiZWVuIHRyYXBwZWQgYmh5IGEgcnVsZVxuICAgICAgICBsZXQgZXJyb3JUcmFwcGVkID0gZmFsc2U7XG4gICAgICAgIC8vIGxldCBlcnJvclRyYXBzID0gZ3ZrbzxJRXJyb3JUcmFwW10+KHRoaXMuX29wdGlvbnM/LmVycm9yTWFuYWdlbWVudCgpPy5lcnJvclRyYXBzKSB8fCBbXTtcbiAgICAgICAgbGV0IGVycm9yVHJhcHMgPSB0aGlzLmNvbmZpZ3VyYXRpb24/LmVycm9yTWFuYWdlbWVudD8uZXJyb3JUcmFwcyB8fCBbXTtcblxuICAgICAgICAvLyBlcnJvclRyYXBzLmZvckVhY2goKHRyYXApID0+IHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBlcnJvclRyYXBzSW5kZXggPSAwO1xuICAgICAgICAgICAgZXJyb3JUcmFwc0luZGV4IDwgZXJyb3JUcmFwcy5sZW5ndGg7XG4gICAgICAgICAgICBlcnJvclRyYXBzSW5kZXgrK1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCB0cmFwID0gZXJyb3JUcmFwc1tlcnJvclRyYXBzSW5kZXhdO1xuICAgICAgICAgICAgaWYgKHRyYXAuZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFDb250ZXh0ID0gdGhpcy5nZXREYXRhQ29udGV4dChbeyBvYmo6IGVycm9yLCBrZXk6IFwiZXJyb3JcIiB9XSk7XG4gICAgICAgICAgICAgICAgbChcbiAgICAgICAgICAgICAgICAgICAgYEV2YWx1YXRpbmcgcnVsZSBbJHt0cmFwLnJ1bGV9XSBvbiBlcnJvciAke2Vycm9yfSB3aXRoIGRhdGFDb250ZXh0OmAsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFDb250ZXh0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsZXQgcnVsZVJlc3VsdCA9IGV2YWx1dGVSdWxlKHRyYXAucnVsZSwgZGF0YUNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChydWxlUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yVHJhcHBlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmxpbmtlZFRyYXBwZWRFcnJvciA9IHRyYXA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXREYXRhQ29udGV4dChhZGRpdGlvbmFsPzogW3sgb2JqOiBhbnk7IGtleTogc3RyaW5nIH1dIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgICAgICAgY29uc3QgYnJvd3NlciA9IGRldGVjdCgpO1xuICAgICAgICBsZXQgZGF0YUNvbnRleHQ6IGFueSA9IHtcbiAgICAgICAgICAgIHRoaXNDb21wb25lbnROYW1lOiB0aGlzLnRoaXNDb21wb25lbnROYW1lLFxuICAgICAgICAgICAgdXNlcjoga28udG9KUygkdWkucGFnZUNvbnRleHQ/LnVzZXIpLFxuICAgICAgICAgICAgcGFnZUNvbnRleHQ6IGtvLnRvSlMoJHVpLnBhZ2VDb250ZXh0KSxcbiAgICAgICAgICAgIGFzcGVjdERhdGE6IGtvLnRvSlModGhpcy5iYXNlTW9kZWwpLFxuICAgICAgICAgICAgY29uZmlndXJhdGlvbjoga28udG9KUyh0aGlzLl9vcHRpb25zKSxcbiAgICAgICAgICAgIGJyb3dzZXI6IGJyb3dzZXIsXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGFkZGl0aW9uYWxEYXRhID0gYWRkaXRpb25hbCB8fCBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRpdGlvbmFsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBhZGRpdGlvbmFsRGF0YVtpXTtcbiAgICAgICAgICAgIGRhdGFDb250ZXh0W2l0ZW0ua2V5XSA9IGl0ZW0ub2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGFDb250ZXh0O1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZVN1cHBvcnRUYXNrKCkge1xuICAgIC8vICAgICAvL1RPRE86IENyZWF0ZSBhIHN1cHBvcnQgdGFza1xuICAgIC8vICAgICAkdWkubmF2Lmludm9rZSh7XG4gICAgLy8gICAgICAgICBcImludm9rZVR5cGVcIjogXCJwYW5lbFwiLFxuICAgIC8vICAgICAgICAgXCJpbnZva2VcIjogXCJTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLkFkZEVkaXRTaGFyZWRvXCIsXG4gICAgLy8gICAgICAgICBcImNvbmZpZ1wiOiBcIntcXFwidHlwZVN5c3RlbU5hbWVcXFwiOlxcXCJ0YXNrLWVkZGlzY292ZXJ5LWFkaG9jXFxcIixcXFwidGl0bGVcXFwiOlxcXCJcXFwiLFxcXCJTdXBwb3J0IFJlcXVlc3RcXFwiOlxcXCJcXFwifVwiXG4gICAgLy8gICAgIH0pO1xuXG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogQWJzdHJhY3QgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byByZWZyZXNoIHRoZSBhc3BlY3RcbiAgICAgKiBAcGFyYW0gbmV3Q29uZmlnXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmVmcmVzaChuZXdDb25maWc6IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBBYnN0cmFjdCBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHJlc2V0IHRoZSBhc3BlY3QgYmFzZWRcbiAgICAgKiBAcGFyYW0gbmV3Q29uZmlnXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmVzZXQobmV3Q29uZmlnOiBhbnkpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgbGl2ZUNvbmZpZ3VyYXRpb25SZWZyZXNoZWQoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqICEgaW1wb3J0YW50OiBNYW5kYXRvcnkgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIGNvbnN0cnVjdG9yIHRvIHNldCB0aGUgZGVmYXVsdHNcbiAgICAgKiBAcmV0dXJucyBEZWZhdWx0czxUQ29uZmlnPlxuICAgICAqIEBtZW1iZXJvZiBCYXNlSURFQXNwZWN0XG4gICAgICogQGFic3RyYWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXREZWZhdWx0cygpOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+O1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogISBpbXBvcnRhbnQ6IE1hbmRhdG9yeSBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHNldCB0aGUgZGVmYXVsdHMgZm9yIHRoZSB3aWRnZXQuanNvblxuICAgIC8vICAqL1xuICAgIC8vIGFic3RyYWN0IHNldEV4YW1wbGVGb3JNb2RlbGxlcigpOiBEZWZhdWx0czxUQ29uZmlnPjtcblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBsb2FkIGFuZCBzYXZlIHRvXG4gICAgICogRXhhbXBsZXMgb2YgdGhpcyBhcmU6XG4gICAgICogLSBhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhLntmb3JtQnVpbGRlckZpZWxkfVxuICAgICAqIC0gYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXJcbiAgICAgKiAtIHVuZGVmaW5lZCAoaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3MpXG4gICAgICogQHJldHVybnMgVGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG8gT1IgdW5kZWZpbmVkIGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBRdWlja1ZpZXdcbiAgICAgKiBUaGlzIHdpbGwgYWxzbyBiZSB1c2VkIGR1cmluZyB0aGUgYnVpbGQgYW5kIHdpbGwgYmUgYXBwZW5kZWQgd2l0aCB0aGUgQnVpbHQgVGFyZ2V0IGUuZy4gSURFQXNwZWN0cy5RdWlja1ZpZXdcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRUaGlzQ29tcG9uZW50TmFtZSgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgZmlyc3QgbWV0aG9kIG9uY2UgdGhlIGNsYXNzIGhhcyBiZWVuIGNvbnN0cnVjdGVkLCBkZWZhdWx0IGNvbnRydWN0b3IgbG9naWMgc2hvdWxkIGJlIHBsYWNlZCBoZXJlXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0dXAoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBzZXR0aW5ncyBmb3IgdGhlIHdpZGdldC5qc29uIHRoYXQgd2lsbCBiZSBnZW5lcmF0ZWRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248VENvbmZpZz47XG5cbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRTY3JpcHRGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRTdHlsZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudFRlbXBsYXRlRmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50TWVudVRlbXBsYXRlRmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50Q29tcG9uZW50RmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0V2lkZ2V0RGVzaWduZXJTZXR0aW5ncygpOiBJV2lkZ2V0SnNvbkRlc2lnbmVyO1xuICAgIC8vIGFic3RyYWN0IHNldFByaW9yaXR5KCkgOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIHRoZSBtb2RlbCBpcyBzYXZlZC4gTWFuaXB1bGF0ZSB0aGVcbiAgICAgKiBtb2RlbCBhcyByZXF1aXJlZC5cbiAgICAgKi9cbiAgICBvblNhdmUobW9kZWw6IGFueSkge1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uU2F2ZVwiLCBtb2RlbCk7XG5cbiAgICAgICAgbGV0IGRhdGFUb1NhdmUgPSB0aGlzLl9kYXRhO1xuICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgIFwiU2F2aW5nLCBtb2RlbCBwYXNzZWQgaW4gd2UgbmVlZCB0byBwZXJzaXN0IHRvXCIsXG4gICAgICAgICAgICBcImdyZWVuXCIsXG4gICAgICAgICAgICBkYXRhVG9TYXZlXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIFwiTm8gbG9jYXRpb24gdG8gc2F2ZSBkYXRhIHRvIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIixcbiAgICAgICAgICAgICAgICBcInJlZFwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGFUb1BlcnNpc3QgPSB0aGlzLl9kYXRhO1xuICAgICAgICBsZXQgY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICBpZiAoY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIGBDdXJyZW50IGRhdGEgYXQgbG9jYXRpb24gJHt0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YX0gOmAsXG4gICAgICAgICAgICAgICAgXCJtYWdlbnRhXCIsXG4gICAgICAgICAgICAgICAgY3VycmVudERhdGFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50RGF0YSkge1xuICAgICAgICAgICAgLy8gdGhpcy5sb2coXCJEYXRhIGRvZXMgbm90IGV4aXN0LCB3ZSB3aWxsIGNyZWF0ZVwiLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIC8vICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIHt9KTtcbiAgICAgICAgICAgIC8vIGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgIGBOZXcgZGF0YSB0byBwZXJzaXN0IHRvIGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLFxuICAgICAgICAgICAgXCJibHVlXCIsXG4gICAgICAgICAgICBkYXRhVG9QZXJzaXN0XG4gICAgICAgICk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgZGF0YVRvUGVyc2lzdCk7XG5cbiAgICAgICAgdGhpcy5sKFwiRGF0YSBzYXZlZFwiLCBtb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0YSB0byBsb2FkLCBkZWZhdWx0cyB0byBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgdW5sZXNzIGEgZmllbGRQYXRoIGlzIHBhc3NlZCBpblxuICAgICAqIEBwYXJhbSBmaWVsZFBhdGhcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGFzeW5jIGdldERhdGEoZmllbGRQYXRoPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkUGF0aCA9IGZpZWxkUGF0aCB8fCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YTtcblxuICAgICAgICAvL1RoaXMgc2VjdGlvbiBpcyBkPXVzZSBkdWUgdG8gdHlwaW5nIGlzc3VlIHRoYXQgbmVlZHMgdG8gYmUgcmVzb2x2ZWQuXG4gICAgICAgIC8vIGxldCB1c2VQYXJlbnRzID0gZ3Zrbyh0aGlzLl9vcHRpb25zLmRhdGFTZXR0aW5ncygpLmdldFZhbHVlVXNpbmdQYXJlbnRzKSBhcyBib29sZWFuIHwgdW5kZWZpbmVkXG4gICAgICAgIC8vIGxldCBzaGFyZURvSWQ9IGd2a28odGhpcy5zaGFyZWRvSWQpXG4gICAgICAgIC8vIGxldCBtYXhEZXB0aCA9IGd2a28odGhpcy5fb3B0aW9ucy5kYXRhU2V0dGluZ3MoKS5tYXhEZXB0aCkgYXMgbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgICAgIC8vIGxldCBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSBndmtvKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKSBhcyBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICAgICAgLy9lbmQgYXJlYSBvZiB0eXBpbmcgaXNzdWVcblxuICAgICAgICBsZXQgdXNlUGFyZW50cyA9IHRoaXMuX29wdGlvbnM/LmRhdGFTZXR0aW5ncygpLmdldFZhbHVlVXNpbmdQYXJlbnRzKCk7XG4gICAgICAgIGxldCBzaGFyZURvSWQgPSB0aGlzLnNoYXJlZG9JZCgpO1xuICAgICAgICBsZXQgbWF4RGVwdGggPSB0aGlzLl9vcHRpb25zPy5kYXRhU2V0dGluZ3MoKS5tYXhEZXB0aCgpO1xuXG4gICAgICAgIC8vIGxldCBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSBndmtvKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcblxuICAgICAgICBpZiAoZmllbGRQYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIFwiTm8gbG9jYXRpb24gdG8gbG9hZCBkYXRhIGZyb20gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLFxuICAgICAgICAgICAgICAgIFwicmVkXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eSh0aGlzLm1vZGVsLCBmaWVsZFBhdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubChcIkRhdGEgZm91bmQgYXQgbG9jYXRpb25cIiwgdGhpcy5fZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0ga28udG9KUyh0aGlzLl9kYXRhKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiBkYXRhIG90IGZvdW5kIGluIHRoZSBjdXJyZW50IG1vZGVsLCBsb29rIHZpYSB0aGUgc2VhcmNoXG4gICAgICAgIGlmICh0aGlzLl9kYXRhID09PSB1bmRlZmluZWQgJiYgdXNlUGFyZW50cyA9PT0gZmFsc2UgJiYgc2hhcmVEb0lkKSB7XG4gICAgICAgICAgICAvLyEgVE9ETyBGaXggVHlwaW5nc1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShzaGFyZURvSWQsIGZpZWxkUGF0aCwgZmFsc2UpLnRoZW4oXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gdW5kZWZpbmVkICYmIHVzZVBhcmVudHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vISBUT0RPIEZpeCBUeXBpbmdzXG4gICAgICAgICAgICBsZXQgaWRUb1VzZXIgPSB0aGlzLnNoYXJlZG9JZCgpIHx8IHRoaXMucGFyZW50U2hhcmVkb0lkKCk7XG5cbiAgICAgICAgICAgIGlmICghaWRUb1VzZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgXCJObyBpZCB0byB1c2UgZm9yIHNlYXJjaCBib3RoIHNoYXJlZG9JZCBhbmQgcGFyZW50U2hhcmVkb0lkIGFyZSB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlKFxuICAgICAgICAgICAgICAgIGlkVG9Vc2VyLFxuICAgICAgICAgICAgICAgIGZpZWxkUGF0aCxcbiAgICAgICAgICAgICAgICB1c2VQYXJlbnRzLFxuICAgICAgICAgICAgICAgIG1heERlcHRoXG4gICAgICAgICAgICApLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5mb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXR0cmlidXRlOiBzdHJpbmcsXG4gICAgICAgIHVzZVBhcmVudHM6IGJvb2xlYW4sXG4gICAgICAgIG1heERlcHRoOiBudW1iZXIgfCB1bmRlZmluZWRcbiAgICApOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlKGlkLCBhdHRyaWJ1dGUsIHVzZVBhcmVudHMsIG1heERlcHRoKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZWFyY2hCeUdyYXBoKGZpZWxkUGF0aDogc3RyaW5nLCB1c2VQYXJlbnQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgaW5wdXRPcHRpb246IElHcmFwaFF1ZXJ5ID0gSUdyYXBoUXVlcnlEZWZhdWx0cztcbiAgICAgICAgbGV0IHNoYXJlRG9JZCA9IHRoaXMuc2hhcmVkb0lkKCk7XG4gICAgICAgIGxldCBwYXJlbnRJZCA9IHRoaXMucGFyZW50U2hhcmVkb0lkKCk7XG5cbiAgICAgICAgbGV0IHF1ZXJ5OiBJR3JhcGhRdWVyeUZpZWxkID0ge1xuICAgICAgICAgICAgcGF0aDogZmllbGRQYXRoLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlucHV0T3B0aW9uLmZpZWxkcy5wdXNoKHF1ZXJ5KTtcblxuICAgICAgICBpZiAodXNlUGFyZW50ID09PSBmYWxzZSAmJiBzaGFyZURvSWQpIHtcbiAgICAgICAgICAgIC8vISBUT0RPIEZpeCBUeXBpbmdzXG4gICAgICAgICAgICBpbnB1dE9wdGlvbi5lbnRpdHlJZCA9IHNoYXJlRG9JZDtcbiAgICAgICAgfSBlbHNlIGlmICh1c2VQYXJlbnQgPT09IHRydWUgJiYgcGFyZW50SWQpIHtcbiAgICAgICAgICAgIC8vISBUT0RPIEZpeCBUeXBpbmdzXG4gICAgICAgICAgICBpbnB1dE9wdGlvbi5lbnRpdHlJZCA9IHBhcmVudElkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpbnB1dE9wdGlvbi5lbnRpdHlJZCkge1xuICAgICAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICAgICAgXCJObyBpZCB0byB1c2UgZm9yIHNlYXJjaCBib3RoIHNoYXJlZG9JZCBhbmQgcGFyZW50U2hhcmVkb0lkIGFyZSB1bmRlZmluZWRcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRmluZEJ5R3JhcGgoaW5wdXRPcHRpb24pO1xuXG4gICAgICAgIGlmIChyZXN1bHQuaW5mby5zdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJFcnJvciBleGVjdXRpbmcgc2VhcmNoXCIsIFwicmVkXCIsIHJlc3VsdC5pbmZvKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YT8uZGF0YVtmaWVsZFBhdGhdO1xuICAgIH1cblxuICAgIHNldERhdGEodmFsdWU6IFRQZXJzaXRhbmNlIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGxldCB2YWx1ZVRvUGVyc2lzdCA9IGtvLnRvSlModmFsdWUpO1xuICAgICAgICBsZXQgcHJldmlvdXNWYWx1ZSA9IGtvLnRvSlModGhpcy5fZGF0YSk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZVRvUGVyc2lzdDtcbiAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VkRXZlbnQoXCJvbkRhdGFCZWZvcmVDaGFuZ2VkXCIsIHtcbiAgICAgICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgICBuZXdWYWx1ZTogdmFsdWVUb1BlcnNpc3QsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWVUb1NldDogYW55ID0gdmFsdWU7XG4gICAgICAgIC8vIGlmKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLmluY2x1ZGVzKFwiZm9ybUJ1aWxkZXJcIikpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIC8vZm9ybWJ1aWxkZXIgRGF0YSBhbHdheXMgbmVlZCB0byBiZSBzdHJpbmdcbiAgICAgICAgLy8gICAgIHRoaXMubG9nKFwiU2V0dGluZyBmb3JtYnVpbGRlciBkYXRhIC0gY29udmVydGluZyB0byBzdHJpbmdcIiwgXCJncmVlblwiLCB2YWx1ZSlcbiAgICAgICAgLy8gICAgIHZhbHVlVG9TZXQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIC8vICAgICB0aGlzLmxvZyhcImFmdGVyIFNldHRpbmcgZm9ybWJ1aWxkZXIgZGF0YSAtIGNvbnZlcnRlZCB0byBzdHJpbmdcIiwgXCJncmVlblwiLCB2YWx1ZVRvU2V0KVxuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMubG9nKFwiU2V0dGluZyBkYXRhIGF0IGxvY2F0aW9uXCIsIFwiZ3JlZW5cIiwgdmFsdWVUb1NldCk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB0aGlzLl9kYXRhKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkRhdGFDaGFuZ2VkXCIsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveShtb2RlbD86IGFueSkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uRGVzdHJveVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkRlc3Ryb3lcIiwgbW9kZWwpO1xuICAgICAgICAkdWkudXRpbC5kaXNwb3NlKHRoaXMuZGlzcG9zYWJsZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgVUkgZnJhbWV3b3JrIGFmdGVyIGluaXRpYWwgY3JlYXRpb24gYW5kIGJpbmRpbmcgdG8gbG9hZCBkYXRhXG4gICAgICogaW50byBpdCdzIG1vZGVsXG4gICAgICovXG4gICAgbG9hZEFuZEJpbmQoKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogbG9hZEFuZEJpbmRcIik7XG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIChtb2RlbDphbnkpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xuICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgIFwiTG9hZGluZyBkYXRhIGJhc2VkIG9uIGxvY2F0aW9uIHRvIHNhdmVcIixcbiAgICAgICAgICAgIFwiZ3JlZW5cIixcbiAgICAgICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25Mb2FkXCIsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGJlZm9yZSB0aGUgbW9kZWwgaXMgc2F2ZWRcbiAgICAgKi9cbiAgICBvbkJlZm9yZVNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkJlZm9yZVNhdmVcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25CZWZvcmVTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciBhZnRlciB0aGUgbW9kZWwgaGFzIGJlZW4gc2F2ZWQuXG4gICAgICovXG4gICAgb25BZnRlclNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkFmdGVyU2F2ZVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkFmdGVyU2F2ZVwiLCBtb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiBpdCByZWxvYWRzIGFzcGVjdCBkYXRhXG4gICAgICovXG4gICAgb25SZWxvYWQobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvblJlbG9hZFwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvblJlbG9hZFwiLCBtb2RlbCk7XG4gICAgfVxuXG4gICAgZGVidWdTZXR0aW5ncygpIHtcbiAgICAgICAgbGV0IGRlYnVnU2V0dGluZzogSURlYnVnID0gREVCVUdfREVGQVVMVCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zPy5kZWJ1ZygpKSB7XG4gICAgICAgICAgICBkZWJ1Z1NldHRpbmcgPSBrby50b0pTKHRoaXMuX29wdGlvbnM/LmRlYnVnKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlYnVnU2V0dGluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBsb2dnaW5nIGZvciB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBkZWJ1ZyBjb25maWd1cmF0aW9uXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0gY29sb3JcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIGxvZyhtZXNzYWdlOiBzdHJpbmcsIGNvbG9yPzogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnU2V0dGluZ3MoKS5lbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z1NldHRpbmdzKCkubG9nVG9Db25zb2xlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb2xvcikgY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGxpbmVObyA9IGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKChuZXcgRXJyb3IoKSkuc3RhY2spO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBgJWMgJHt0aGlzLnRoaXNDb21wb25lbnROYW1lfSAtICR7bWVzc2FnZX1gLFxuICAgICAgICAgICAgICAgICAgICBgY29sb3I6JHtjb2xvcn1gLFxuICAgICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbkxvZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVidWdTZXR0aW5ncygpLmVuYWJsZWQ7XG4gICAgfVxuICAgIGxvZ1RvQ29uc29sZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuTG9nKCkgJiYgdGhpcy5kZWJ1Z1NldHRpbmdzKCkubG9nVG9Db25zb2xlO1xuICAgIH1cbiAgICBsb2dUb0FzcGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuTG9nKCkgJiYgdGhpcy5kZWJ1Z1NldHRpbmdzKCkuc2hvd0luQXNwZWN0O1xuICAgIH1cblxuICAgIGluZihtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKGluZihtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cm4obWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbCh3cm4obWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXJyKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgLy9nZXQgdGhlIHByZXZpb3VzIGNhbGxlclxuXG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKGVycihtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBudihuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwobnYobmFtZSwgdmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxoMShtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKGxoMShtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlYygpIHtcbiAgICAgICAgY2xlYXJTZWMoKTtcbiAgICB9XG5cbiAgICBsKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubG9nVG9Bc3BlY3QoKSkge1xuICAgICAgICAgICAgbGV0IGFzcGVjdExvZ091dHB1dCA9IHRoaXMuYXNwZWN0TG9nT3V0cHV0O1xuICAgICAgICAgICAgaWYgKGFzcGVjdExvZ091dHB1dCkge1xuICAgICAgICAgICAgICAgIGFzcGVjdExvZ091dHB1dC5pbm5lclRleHQgKz0gYCR7bWVzc2FnZX1cXG5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQXNwZWN0TG9nT3V0cHV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubG9nVG9Bc3BlY3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hc3BlY3RMb2dPdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBsZXQgYXNwZWN0TG9nT3V0cHV0ID0gdGhpcy5hc3BlY3RMb2dPdXRwdXQ7XG5cbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LmlkID0gYGFzcGVjdExvZ091dHB1dC0ke3RoaXMudW5pcXVlSWR9YDtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5wYWRkaW5nID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpbiA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5mb250U2l6ZSA9IFwiMTBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuZm9udEZhbWlseSA9IFwibW9ub3NwYWNlXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtd3JhcFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUud29yZFdyYXAgPSBcImJyZWFrLXdvcmRcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuekluZGV4ID0gXCIxMDAwXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3R0b20gPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5yaWdodCA9IFwiMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5MZWZ0ID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5SaWdodCA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luQm90dG9tID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5Ub3AgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSwwLjgpXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucGFkZGluZyA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3hTaGFkb3cgPSBcIjBweCAwcHggNXB4IDBweCByZ2JhKDAsMCwwLDAuNzUpXCI7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnByZXBlbmQoYXNwZWN0TG9nT3V0cHV0KTtcbiAgICB9XG5cbiAgICBmaXJlRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBsZXQgZXZlbnQ6IFNoYXJlRG9FdmVudCA9IHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogdGhpcy50aGlzQ29tcG9uZW50TmFtZSArIFwiLlwiICsgZXZlbnROYW1lLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICB9O1xuICAgICAgICBmaXJlRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIGZpcmVWYWx1ZUNoYW5nZWRFdmVudChcbiAgICAgICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICAgIGNoYW5nZWREYXRhOiB7IHByZXZpb3VzVmFsdWU6IGFueTsgbmV3VmFsdWU6IGFueSB9XG4gICAgKSB7XG4gICAgICAgIGxldCBldmVudDogU2hhcmVEb0V2ZW50ID0ge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiB0aGlzLnRoaXNDb21wb25lbnROYW1lICsgXCIuXCIgKyBldmVudE5hbWUsXG4gICAgICAgICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIGRhdGE6IGNoYW5nZWREYXRhLFxuICAgICAgICB9O1xuICAgICAgICBmaXJlRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMgRm9ybWJ1aWxkIGlmIGl0IGV4aXN0cyBvciBjcmVhdGVzIGl0IGlmIGl0IGRvZXMgbm90XG4gICAgICpcbiAgICAgKi9cbiAgICBmb3JtYnVpbGRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJsYWRlPy5tb2RlbD8uYXNwZWN0RGF0YT8uZm9ybUJ1aWxkZXI/LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgICAgICBcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgbm90IGZvdW5kIC0gd2lsbCBjcmVhdGUgdGhlIHBhdGhcIixcbiAgICAgICAgICAgICAgICBcImJsdWVcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBmb3VuZFwiLCBcImdyZWVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9FbnN1cmUgdGhlIHBhdGggZXhpc3RzXG4gICAgICAgIGlmICghdGhpcy5ibGFkZSkge1xuICAgICAgICAgICAgLy9UT0RPOiBpZiBubyBibGFkZSB3aGVyZSBpcyBmb3JtIGJ1aWxkZXIgZGF0YVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJsYWRlID0gdGhpcy5ibGFkZSB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlRm9ybWJ1aWxkZXIodGhpcy5ibGFkZS5tb2RlbCk7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuYmxhZGUhLm1vZGVsIS5hc3BlY3REYXRhIS5mb3JtQnVpbGRlciEuZm9ybURhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW5zdXJlcyB0aGVyZSBpcyBhIGZvcm0gYnVpbGRlciBpbiB0aGUgcGFzc2VkIGluIG1vZGVsIGFuZCByZXR1cm5zIGl0XG4gICAgICogQHBhcmFtIG1vZGVsXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBlbnN1cmVGb3JtYnVpbGRlcihtb2RlbDogYW55KTogSUZvcm1CdWlsZGVyRGF0YSB7XG4gICAgICAgIGlmICghbW9kZWw/LmFzcGVjdERhdGE/LmZvcm1CdWlsZGVyPy5mb3JtRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICAgICAgXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIG5vdCBmb3VuZCAtIHdpbGwgY3JlYXRlIHRoZSBwYXRoXCIsXG4gICAgICAgICAgICAgICAgXCJibHVlXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgZm91bmRcIiwgXCJncmVlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRW5zdXJlIHRoZSBwYXRoIGV4aXN0c1xuXG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwge307XG4gICAgICAgIG1vZGVsLmFzcGVjdERhdGEgPSBtb2RlbC5hc3BlY3REYXRhIHx8IHt9O1xuICAgICAgICBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyID0gbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciB8fCB7XG4gICAgICAgICAgICBmb3JtRGF0YToge30sXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGE7XG4gICAgfVxuXG4gICAgZm9ybWJ1aWxkZXJGaWVsZChmb3JtYnVpbGRlckZpZWxkOiBzdHJpbmcsIHNldFZhbHVlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYnVpbGRlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCEgXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3JtQnVpbGRlciA9IHRoaXMuZm9ybWJ1aWxkZXIoKSE7XG4gICAgICAgIGlmICghZm9ybUJ1aWxkZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gZm9ybUJ1aWxkZXJbZm9ybWJ1aWxkZXJGaWVsZF07XG4gICAgICAgIGlmICghZm91bmRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICAgICAgYEZvcm0gYnVpbGRlciBkb2VzIG5vdCBjb250YWluIGZpZWxkICR7Zm9ybWJ1aWxkZXJGaWVsZH0gYCxcbiAgICAgICAgICAgICAgICBcIm9yYW5nZVwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5sb2coYENyZWF0aW5nIGZpZWxkICR7Zm9ybWJ1aWxkZXJGaWVsZH0gYCwgXCJibHVlXCIpO1xuICAgICAgICAgICAgZm9ybUJ1aWxkZXJbZm9ybWJ1aWxkZXJGaWVsZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FyZSB3ZSBkb2luZyBhIHNldFxuICAgICAgICBpZiAoc2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBTZXR0aW5nICR7Zm9ybWJ1aWxkZXJGaWVsZH0gdG8gJHtzZXRWYWx1ZX1gLCBcImdyZWVuXCIpO1xuICAgICAgICAgICAgZm9ybUJ1aWxkZXJbZm9ybWJ1aWxkZXJGaWVsZF0gPSBzZXRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBzZXRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZFZhbHVlO1xuICAgIH1cbn1cblxuLy8gY2xhc3MgTXlDbGFzcyB7XG5cbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IoKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IG51bWJlcik7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBzdHJpbmcsIHAyOiBzdHJpbmcpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogc3RyaW5nLCBwMjogc3RyaW5nLCBwMzogc3RyaW5nKTtcblxuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvciguLi5hcnI6IGFueVtdKSB7XG4vLyAgICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAyKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygndHdvIGFyZ3VtZW50cyBjb25zdHJ1Y3RvciBjYWxsZWQuJyk7XG4vLyAgICAgICAgIH0gZWxzZSBpZiAoYXJyLmxlbmd0aCA9PT0gMykge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3RocmVlIGFyZ3VtZW50cyBjb25zdHJ1Y3RvciBjYWxsZWQuJyk7XG4vLyAgICAgICAgIH0gZWxzZSBpZiAoYXJyLmxlbmd0aCA9PT0gMSkge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ29uZSBhcmd1bWVudCBjb25zdHJ1Y3RvciBjYWxsZWQuJyk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG5cbi8vIH1cblxuLy8gbGV0IHggPSBuZXcgTXlDbGFzcygpXG4iLCJpbXBvcnQgeyBJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcbmltcG9ydCB7XG4gIElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsXG4gIElFcnJvck1hbmFnZW1lbnQsXG4gIElFcnJvclRyYXAsXG4gIElSZWZyZXNoT24sXG4gIElTaGFyZWRvUGFuZWxDb25maWcsXG4gIElTdXBwb3J0QnV0dG9uLFxufSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBjb25zdCBERUJVR19ERUZBVUxUID0gKCkgPT4ge1xuICAvLyEgdGhpcyBpcyBhIGZ1bmN0aW9uIGZvciBkZWJ1ZyBwdXJwb3NlIG9ubHlcblxuICBsZXQgcmV0VmFsdWU6IElEZWJ1ZyA9IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIGxvZ1RvQ29uc29sZTogdHJ1ZSxcbiAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlLFxuICAgIGxpdmVDb25maWc6IGZhbHNlLFxuICB9O1xuICByZXR1cm4gcmV0VmFsdWU7XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TSEFSRURPX0NPTU1BTkQ6IElTaGFyZWRvUGFuZWxDb25maWcgPSB7XG4gIHR5cGVTeXN0ZW1OYW1lOiBcInRhc2tcIixcbiAgdGl0bGU6IFwiU3VwcG9ydCBSZXF1aXJlZCBmb3IgJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmZpcnN0bmFtZX0gJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmxhc3RuYW1lfSBvbiAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnBhZ2VUaXRsZX1cIixcbiAgZGVzY3JpcHRpb246IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TVVBQT1JUX0JVVFRPTjogSVN1cHBvcnRCdXR0b24gPSB7XG4gIHJhaXNlU3VwcG9ydFRpY2tldDogdHJ1ZSxcbiAgc3VwcG9ydFRpY2tldE1lc3NhZ2U6IFwiU3VwcG9ydCBSZXF1aXJlZCBmb3IgJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmZpcnN0bmFtZX0gJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmxhc3RuYW1lfSBvbiAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnBhZ2VUaXRsZX0gY29udGV4dCAke0pTT04uc3RyaW5naWZ5KGRhdGFDb250ZXh0KX1cIixcbiAgcmFpc2VTdXBwb3J0VGlja2V0U2hhcmVkb0NvbW1hbmQ6IERFRkFVTFRfU0hBUkVET19DT01NQU5ELFxuICBkYXRhQ29udGV4dDogXCJQb3B1bGF0ZWQgYnkgdGhlIHN5c3RlbVwiLFxuICB0aXRsZTogXCJSYWlzZSBTdXBwb3J0IFRpY2tldFwiLFxuICBzdHlsZVJ1bGVzOiB1bmRlZmluZWQsXG4gIGNsYXNzUnVsZXM6IHVuZGVmaW5lZCxcbiAgdG9vbFRpcDogXCJSYWlzZSBhIHN1cHBvcnQgdGlja2V0IHdpdGggdGhlIHN1cHBvcnQgZGVza1wiLFxuICBlbmFibGVkOiBmYWxzZVxufTtcblxuXG5cbmV4cG9ydCBjb25zdCBSRUZSRVNIX09OX0RFRkFVTFRTOiBJUmVmcmVzaE9uID0ge1xuICBzaGFyZWRvSWRDaGFuZ2VkOiBmYWxzZSxcbiAgc2hhcmVkb1BhcmVudElkQ2hhbmdlZDogZmFsc2UsXG4gIHNoYXJlZG9QaGFzZUNoYW5nZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9UUkFQUzogSUVycm9yVHJhcFtdID0gW1xuICB7XG4gICAgZGF0YUNvbnRleHQ6IG51bGwsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBydWxlOiBcImRhdGFDb250ZXh0LmVycm9yLm1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZm9yYmlkZGVuJylcIixcbiAgICB1c2VyRnJlaW5kbHlNZXNzYWdlOiBcIlRoZSBtYXR0ZXIgaXMgbm90IGFjY2Vzc2libGUgdG8geW91LiBJdCBtYXkgYmUgYmVoaW5kIGEgSW5mb3JtYXRpb24gQmFycmllci5cIixcbiAgICByZXNvbHV0aW9uU3VnZ2VzdGlvbnM6IFtcIlBsZWFzZSBjb250YWN0IHRoZSBtYXR0ZXIgb3duZXIgZm9yIGFjY2Vzcy5cIl0sXG4gICAgdXNlckZyZWluZGx5SFRNTE1lc3NhZ2VUZW1wbGF0ZTogdW5kZWZpbmVkLFxuICAgIHN1cHBvcnRCdXR0b246IERFRkFVTFRfU1VQUE9SVF9CVVRUT04sXG4gICAgc3R5bGVSdWxlczogW1xuICAgICAge1xuICAgICAgICBydWxlOiBcInRydWVcIixcbiAgICAgICAgc3R5bGU6IFwiYm94LXNoYWRvdzogMXB4IDFweCAxMHB4ICNkNDYwNjA7XCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgY2xhc3NSdWxlczogW1xuICAgICAge1xuICAgICAgICBydWxlOiBcInRydWVcIixcbiAgICAgICAgY3NzQ2xhc3M6IFwiZW1zLXNlbGVjdGVkLWl0ZW1cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJ1bGU6IFwidHJ1ZVwiLFxuICAgICAgICBjc3NDbGFzczogXCJlbXMtc2hvd1wiLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXTtcblxuLy9jbGFzc1J1bGVzOiBlbXMtc2VsZWN0ZWQtaXRlbSBlbXMtc2hvdycgc3R5bGU9J2JveC1zaGFkb3c6IDFweCAxcHggMTBweCAjZDQ2MDYwOycsXG4vL1xuLy9cIlN1cHBvcnQgUmVxdWlyZWQgZm9yICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQudXNlci5maXJzdG5hbWV9ICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQudXNlci5sYXN0bmFtZX0gb24gJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC5wYWdlVGl0bGV9XCJcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9TRVRUSU5HUzogSUVycm9yTWFuYWdlbWVudCA9IHtcbiAgZXJyb3JUcmFwczogREVGQVVMVF9FUlJPUl9NQU5BR0VNRU5UX1RSQVBTLFxuICBlbmFibGVkOiB0cnVlLFxuICBkaXNwbGF5VW5UcmFwcGVkRXJyb3JJbkFzcGVjdDogdHJ1ZSxcbiAgdW5UcmFwcGVkRXJyb3JzU3VwcG9ydEJ1dHRvbjogdW5kZWZpbmVkLFxufTsgXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJR1VSQVRJT05fU0VUVElOR1M6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8dW5rbm93bj4gPVxuICB7XG4gICAgZGVidWc6IERFQlVHX0RFRkFVTFQoKSxcbiAgICByZWZyZXNoT246IFJFRlJFU0hfT05fREVGQVVMVFMsIFxuICAgIGV2ZW50c1RvUmVhY3RUbzogW1xuICAgICAge1xuICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby51cGRhdGVkXCIsXG4gICAgICAgIG1ldGhvZFRvQ2FsbDogXCJyZWZyZXNoXCIsXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5zaGFyZWRvLXVwZGF0ZWRcIixcbiAgICAgICAgbWV0aG9kVG9DYWxsOiBcInJlZnJlc2hcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBkYXRhU2V0dGluZ3M6IHtcbiAgICAgIGdldFZhbHVlVXNpbmdQYXJlbnRzOiBmYWxzZSxcbiAgICAgIG1heERlcHRoOiAwLFxuICAgIH0sXG4gICAgZXJyb3JNYW5hZ2VtZW50OiBERUZBVUxUX0VSUk9SX01BTkFHRU1FTlRfU0VUVElOR1MsXG4gIH07XG4iLCJpbXBvcnQgKiBhcyBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgeyBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCB0eXBlIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4gPSB7XG4gICAgW0sgaW4ga2V5b2YgVF0gICAgICA6IFRbS10gZXh0ZW5kcyBBcnJheTxpbmZlciBVPiA/IGtvLk9ic2VydmFibGVBcnJheTxOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFU+PiA6XG4gICAgVFtLXSBleHRlbmRzIG9iamVjdCA/IGtvLk9ic2VydmFibGU8TmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUW0tdPj4gOiBrby5PYnNlcnZhYmxlPFRbS10+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZU9iamVjdDxUPihvYmo6IFQsIGV4aXN0aW5nPzogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPik6IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4ge1xuICAgIFxuICAgIGlmKCFleGlzdGluZykgZXhpc3RpbmcgPSB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xuICAgXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGtleSAhPT0gXCJfX2tvX21hcHBpbmdfX1wiICYmIGtleSAhPT0gXCJfaG9zdFwiKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXkgYXMga2V5b2YgVF07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldID0ga28ub2JzZXJ2YWJsZUFycmF5KHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XT1lbnN1cmVJc09ic2VydmFibGVBcnJheShleGlzdGluZywga2V5KVxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IGtvLm9ic2VydmFibGUodG9PYnNlcnZhYmxlT2JqZWN0KHZhbHVlLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiB2YWx1ZT4pKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XSAgPSBlbnN1cmVJc09ic2VydmFibGUoZXhpc3RpbmcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0odG9PYnNlcnZhYmxlT2JqZWN0KCh2YWx1ZSBhcyBhbnkpLCAoZXhpc3Rpbmdba2V5XSgpIGFzIGFueSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAoZXhpc3Rpbmdba2V5XSBhcyBhbnkpID0ga28ub2JzZXJ2YWJsZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XSA9IGVuc3VyZUlzT2JzZXJ2YWJsZShleGlzdGluZywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSgodmFsdWUgYXMgYW55KSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBleGlzdGluZyBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xufVxuZXhwb3J0IGludGVyZmFjZSBJRGVidWcge1xuICAgIHN1cHBvcnRSZXF1ZXN0RW5hYmxlZD86IGJvb2xlYW47XG4gICAgICBlbmFibGVkOiBib29sZWFuO1xuICAgICAgbG9nVG9Db25zb2xlOiBib29sZWFuO1xuICAgICAgc2hvd0luQXNwZWN0OiBib29sZWFuO1xuICAgICAgbGl2ZUNvbmZpZz86IGJvb2xlYW47XG4gICAgfVxuICBcblxuXG5mdW5jdGlvbiBlbnN1cmVJc09ic2VydmFibGUoZXhpc3Rpbmc6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKGV4aXN0aW5nW2tleV0pKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1trZXldIDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBrby5vYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuXG5cblxuZnVuY3Rpb24gZW5zdXJlSXNPYnNlcnZhYmxlQXJyYXkoZXhpc3Rpbmc6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlQXJyYXkoZXhpc3Rpbmdba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nW2tleV0gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IHR5cGUgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBUQ29uZmlnICYge1xuLy8gICAgIGRlYnVnOiBJRGVidWc7XG4vLyAgIH1cblxuLy8gZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0gXG4vLyB7IFtLIGluIGtleW9mIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPl06IGtvLk9ic2VydmFibGU8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdPjsgfVxuXG4vLyBleHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uSG9zdCB7XG4vLyAgICAgX2hvc3Q6IHtcbi8vICAgICAgICAgYmxhZGU6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uQWRkRWRpdFNoYXJlZG87XG4vLyAgICAgICAgIGVuYWJsZWQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47IC8vIFVzaW5nICdhbnknIGZvciByZXR1cm4gdHlwZSBhcyBpdCdzIG5vdCBjbGVhciB3aGF0IHRoZXNlIGZ1bmN0aW9ucyByZXR1cm5cbi8vICAgICAgICAgbW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG87XG4vLyAgICAgfVxuLy8gfVxuXG4vLyBleHBvcnQgdHlwZSBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBJQ29uZmlndXJhdGlvbkhvc3QgJiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcblxuLy8gaW50ZXJmYWNlIFJvb3RPYmplY3Qge1xuLy8gICBsMTogc3RyaW5nO1xuLy8gICBvMTogTzE7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMSB7XG4vLyAgIGwyOiBzdHJpbmc7XG4vLyAgIG8yOiBPMjtcbi8vICAgYTE6IEExW107XG4vLyB9XG5cbi8vIGludGVyZmFjZSBBMSB7XG4vLyAgIGw0OiBzdHJpbmc7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMiB7XG4vLyAgIGwzOiBzdHJpbmc7XG4vLyB9XG4vLyAvLyBOb3cgbGV0J3MgdXNlIHRoZSBmdW5jdGlvbjpcbi8vIGNvbnN0IHg6IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+ID0ge1xuLy8gICAgIGwxOiBcImwxXCIsXG4vLyAgICAgbzE6IHtcbi8vICAgICAgICAgbDI6XCJsMlwiLFxuLy8gICAgICAgICBvMjoge1xuLy8gICAgICAgICAgICAgbDM6IFwibDNcIixcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYTE6IFtcbi8vICAgICAgICAgICAgIHsgbDQ6IFwibDRcIiB9XG4vLyAgICAgICAgIF1cbi8vICAgICB9LFxuLy8gICAgIGRlYnVnOlxuLy8gICAgIHtcbi8vICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4vLyAgICAgICAgIGxvZ1RvQ29uc29sZTogZmFsc2UsXG4vLyAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2Vcbi8vICAgICB9XG4vLyB9XG5cbi8vIGxldCBtIDogIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4+XG5cbi8vIGxldCB5ID0gdG9PYnNlcnZhYmxlT2JqZWN0KHgse30gYXMgYW55KSBhcyAgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0Pj5cblxuLy8gbGV0IHAgPSB5LmRlYnVnKCkubGl2ZUNvbmZpZyEoKVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0KG9iajogYW55LCBleGlzdGluZ09ic2VydmFibGVzPzprby5PYnNlcnZhYmxlPGFueT4pOiBrby5PYnNlcnZhYmxlIHtcbi8vICAgICBjb25zdCByZXN1bHQgPSBleGlzdGluZ09ic2VydmFibGVzIHx8IHt9IGFzIGtvLk9ic2VydmFibGU7XG5cbi8vICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbi8vICAgICAgICAgaWYoa2V5ID09PSBcIl9fa29fbWFwcGluZ19fXCIpIGNvbnRpbnVlO1xuLy8gICAgICAgICBpZihrZXkgPT09IFwiX2hvc3RcIikgY29udGludWU7XG5cbi8vICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbi8vICAgICAgICAgICAgIGxldCBuZXd2ID0gb2JqW2tleV07XG4vLyAgICAgICAgICAgICBsZXQgY3VyciA9IChyZXN1bHQgYXMgYW55KVtrZXldIDtcblxuLy8gICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG5ld3YpICYmIHR5cGVvZiBuZXd2ID09PSBcIm9iamVjdFwiICYmIG5ld3YgIT09IG51bGwgJiYgIWtvLmlzT2JzZXJ2YWJsZShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0gdG9PYnNlcnZhYmxlT2JqZWN0KG5ld3YgYXMgb2JqZWN0KSBcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRvT2JzZXJ2YWJsZU9iamVjdFwiLCAocmVzdWx0IGFzIGFueSlba2V5XSk7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKChyZXN1bHQgYXMgYW55KVtrZXldKTtcbi8vICAgICAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICBpZiAoY3VyciAmJiBrby5pc09ic2VydmFibGVBcnJheShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XShuZXd2KTtcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGVBcnJheShuZXd2KSBhcyBhbnk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgbmV3diA9IG5ld3YoKTsgLy8gcHVsbCBvdXQgdGhlIHZhbHVlXG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChjdXJyICYmIGtvLmlzT2JzZXJ2YWJsZShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldKG5ld3YpOyAvLyB1cGRhdGUgdGhlIGV4aXN0aW5nIG9ic2VydmFibGVcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKG5ld3YpO1xuICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgcmV0dXJuIHJlc3VsdDtcbi8vIH1cbiIsImltcG9ydCB7IGVyciwgbCB9IGZyb20gXCIuLi8uLi8uLi8uLi9Db21tb24vTG9nXCI7XG5pbXBvcnQgeyBleHRyYWN0VmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaGVscGVycy9WYWt1ZUV4dHJhY3RvclwiO1xuaW1wb3J0IHsgZXZhbHV0ZVJ1bGUsIGV4ZWN1dGVFbWJlZGRlZENvZGUsIGV4ZWN1dGVGdW5jIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hlbHBlcnMvZXZhbHV0ZVJ1bGVcIjtcbmltcG9ydCB7IElGaWVsZFBsYWNlbWVudCwgSUZpZWxkUm93RmllbGQsIElJY29uUnVsZSwgSUNTU1J1bGUsIElGaWVsZFJ1bGUsIElTdHlsZUVudHJ5LCBJU3R5bGVSdWxlLCBJTmFtZVZhbHVlLCBJQ3NzQ2xhc3NFbnRyeSB9IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcbmltcG9ydCB7IFRDdXN0b21CaW5kaW5nQ29udGV4dCB9IGZyb20gXCIuL1RlbXBsYXRlR2VuZXJhdG9yXCI7XG5cblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlQXBwbGljYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuXG4gIHNldHVwRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWVBY2Nlc3NvcjogKCkgPT4gYW55LCBhbGxCaW5kaW5nczogYW55LCB2aWV3TW9kZWw6IGFueSwgYmluZGluZ0NvbnRleHQ6IGFueSkge1xuICAgIGxldCBpbnN0cnVjdGlvbiA9IGFsbEJpbmRpbmdzKCkubWF0dGVyU2VhcmNoQmluZGluZyBhcyBUQ3VzdG9tQmluZGluZ0NvbnRleHRcbiAgICBpZiAoIWluc3RydWN0aW9uKSB7XG4gICAgICBsKGVycihcIk5vIGluc3RydWN0aW9uIGRlZmluZWRcIikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaW5zdHJ1Y3Rpb24udHlwZSA9PSBcIklGaWVsZFBsYWNlbWVudFwiKSB7XG4gICAgICBsZXQgcm93RmllbGQgPSBpbnN0cnVjdGlvbi5vYmplY3QgYXMgSUZpZWxkUGxhY2VtZW50O1xuICAgICAgdGhpcy5idWlsZFBsYWNlbWVudHMocm93RmllbGQsIFwiZGF0YUNvbnRleHROYW1lXCIsIHZpZXdNb2RlbCwgZWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWVBY2Nlc3NvcjogKCkgPT4gYW55LCBhbGxCaW5kaW5nczogYW55LCB2aWV3TW9kZWw6IGFueSwgYmluZGluZ0NvbnRleHQ6IGFueSkge1xuICAgIGwoXCJ1cGRhdGVFbGVtZW50XCIsIGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzLCB2aWV3TW9kZWwsIGJpbmRpbmdDb250ZXh0KVxuXG4gIH1cblxuXG4gIGJ1aWxkUGxhY2VtZW50cyhwbGFjZW1lbnQ6IElGaWVsZFBsYWNlbWVudCwgZGF0YUNvbnRleHROYW1lOiBzdHJpbmcsIHZpZXdNb2RlbDogYW55LCBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgbGV0IHJvd0NvdW50ZXIgPSAwO1xuICAgIGNvbnN0IHJvb3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm9vdERpdik7XG5cbiAgICBpZiAocGxhY2VtZW50LmNvbnRhaW5lcikge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Vtcy1jb250YWluZXInKTtcbiAgICAgIGxldCBjb250YWluZXJQYXJlbnQgPSBjb250YWluZXIucGFyZW50RWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgIGlmIChjb250YWluZXJQYXJlbnQpIHtcbiAgICAgICAgY29udGFpbmVyUGFyZW50LmNsYXNzTGlzdC5hZGQoJ2Vtcy1jb250YWluZXItcGFyZW50Jyk7XG4gICAgICAgIHRoaXMuYWRkQ1NTKHBsYWNlbWVudC5jb250YWluZXIuY3NzQ2xhc3MsIGNvbnRhaW5lclBhcmVudCwgZGF0YUNvbnRleHROYW1lLCB2aWV3TW9kZWwpO1xuICAgICAgICB0aGlzLmFkZFN0eWxlKHBsYWNlbWVudC5jb250YWluZXIuc3R5bGUsIGNvbnRhaW5lclBhcmVudCwgZGF0YUNvbnRleHROYW1lLCB2aWV3TW9kZWwpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gcm9vdERpdi5jbGFzc0xpc3QuYWRkKCdmbGV4LXJvdycpO1xuICAgIHJvb3REaXYuY2xhc3NMaXN0LmFkZCgnZW1zLXBsYWNlbWVudC1pdGVtJyk7XG4gICAgcm9vdERpdi5pZCA9ICdyZXN1bHRJdGVtJztcbiAgICB0aGlzLmFkZENTUyhwbGFjZW1lbnQuY3NzQ2xhc3MsIHJvb3REaXYsIGRhdGFDb250ZXh0TmFtZSwgdmlld01vZGVsKTtcbiAgICB0aGlzLmFkZFN0eWxlKHBsYWNlbWVudC5zdHlsZSwgcm9vdERpdiwgZGF0YUNvbnRleHROYW1lLCB2aWV3TW9kZWwpO1xuXG4gICAgaWYgKHBsYWNlbWVudC5pY29uKSB7XG4gICAgICB0aGlzLmFkZEljb25zKHBsYWNlbWVudC5pY29uLCBkYXRhQ29udGV4dE5hbWUsIHJvb3REaXYsIHZpZXdNb2RlbCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGl2Um93Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2Um93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Vtcy1yb3ctY29udGFpbmVyJyk7XG5cbiAgICByb290RGl2LmFwcGVuZENoaWxkKGRpdlJvd0NvbnRhaW5lcik7XG5cbiAgICBwbGFjZW1lbnQucm93cz8uZm9yRWFjaChyb3cgPT4ge1xuICAgICAgcm93Q291bnRlcisrO1xuICAgICAgY29uc3Qgcm93RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByb3dEaXYuc3R5bGUuYWxpZ25JdGVtcyA9IHJvdy5hbGlnbkl0ZW1zIHx8ICdzcGFjZS1iZXR3ZWVuJztcbiAgICAgIHJvd0Rpdi5jbGFzc0xpc3QuYWRkKCdlbXMtcm93JyArIHJvd0NvdW50ZXIpO1xuICAgICAgcm93RGl2LmNsYXNzTGlzdC5hZGQoJ2Vtcy1yb3cnKTtcbiAgICAgIHRoaXMuYWRkQ1NTKHJvdy5jc3NDbGFzcywgcm93RGl2LCBkYXRhQ29udGV4dE5hbWUsIHZpZXdNb2RlbCk7XG4gICAgICB0aGlzLmFkZFN0eWxlKHJvdy5zdHlsZSwgcm93RGl2LCBkYXRhQ29udGV4dE5hbWUsIHZpZXdNb2RlbCk7XG4gICAgICByb3cuZmllbGRzPy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgdGhpcy5hZGRGaWVsZChmaWVsZCwgZGF0YUNvbnRleHROYW1lLCByb3dEaXYsIHZpZXdNb2RlbCk7XG4gICAgICB9KTtcbiAgICAgIGRpdlJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dEaXYpO1xuICAgIH0pO1xuICB9XG5cblxuXG4gIGFkZEZpZWxkKGZpZWxkOiBJRmllbGRSb3dGaWVsZCwgZGF0YUNvbnRleHROYW1lOiBzdHJpbmcsIHJvd0RpdjogSFRNTERpdkVsZW1lbnQsIHZpZXdNb2RlbDogYW55KSB7XG4gICAgY29uc3QgZmllbGREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmaWVsZERpdi5jbGFzc0xpc3QuYWRkKCdlbXMtcm93LWdyb3VwJyk7XG4gICAgdGhpcy5hZGRDU1MoZmllbGQuY3NzQ2xhc3MsIGZpZWxkRGl2LCBkYXRhQ29udGV4dE5hbWUsIHZpZXdNb2RlbCk7XG5cbiAgICBpZiAoZmllbGQud2lkdGgpIGZpZWxkRGl2LnN0eWxlLndpZHRoID0gYCR7ZmllbGQud2lkdGh9cHhgO1xuICAgIGlmIChmaWVsZC5wb3NpdGlvbikgZmllbGREaXYuc3R5bGUudGV4dEFsaWduID0gZmllbGQucG9zaXRpb247XG4gICAgdGhpcy5hZGRTdHlsZShmaWVsZC5zdHlsZSwgZmllbGREaXYsIGRhdGFDb250ZXh0TmFtZSwgdmlld01vZGVsKTtcblxuICAgIGlmIChmaWVsZC5sYWJlbCkge1xuICAgICAgY29uc3QgbGFiZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgIGxhYmVsRWxlbS50ZXh0Q29udGVudCA9IGZpZWxkLmxhYmVsO1xuICAgICAgbGFiZWxFbGVtLmNsYXNzTGlzdC5hZGQoJ2Vtcy1sYWJlbCcpO1xuICAgICAgZmllbGREaXYuYXBwZW5kQ2hpbGQobGFiZWxFbGVtKTtcbiAgICB9XG5cblxuICAgIHRoaXMuYWRkSWNvbnMoZmllbGQuaWNvbiwgZGF0YUNvbnRleHROYW1lLCBmaWVsZERpdiwgdmlld01vZGVsKTsgLy9UT0RPXG5cblxuICAgIGNvbnN0IHNwYW5FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG5cblxuICAgIC8vIGFkZEN1c3RvbUJpbmRpbmcoc3BhbkVsZW0sIGZpZWxkLFwiSUZpZWxkUm93RmllbGRcIik7XG4gICAgLy8gZWxzZSB7XG4gICAgLy8gICBzcGFuRWxlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsIGB0ZXh0OiR7ZGF0YUNvbnRleHROYW1lfS4ke2ZpZWxkLmZpZWxkfWApO1xuICAgIC8vIH1cbiAgICBzcGFuRWxlbS5jbGFzc0xpc3QuYWRkKCdlbXMtZmllbGQtdmFsdWUnKTtcblxuICAgIGlmIChmaWVsZC5maWVsZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLmFkZEZpZWxkQXJyYXkoZmllbGQuZmllbGQsIGZpZWxkLmZvcm1hdHRlciwgc3BhbkVsZW0sIHZpZXdNb2RlbCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBmaWVsZC5maWVsZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5zZXRJbm5lckhUTUwoZmllbGQuZmllbGQsIGZpZWxkLmZvcm1hdHRlciwgdmlld01vZGVsLCBzcGFuRWxlbSk7XG4gICAgfVxuXG4gICAgZmllbGREaXYuYXBwZW5kQ2hpbGQoc3BhbkVsZW0pO1xuICAgIHJvd0Rpdi5hcHBlbmRDaGlsZChmaWVsZERpdik7XG5cblxuICB9XG5cbiAgc2V0SW5uZXJIVE1MKHZhbHVlOiBzdHJpbmcsIGZvcm1hdHRlcjogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCwgdmlld01vZGVsOiBhbnksIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IHZhbHVlVG9TZXQgPSBleHRyYWN0VmFsdWUodmFsdWUsIHZpZXdNb2RlbCwgZm9ybWF0dGVyKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHZhbHVlVG9TZXQ7XG4gIH1cblxuICBhZGRJY29ucyhpY29uczogSUljb25SdWxlW10gfCBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsLCBkYXRhQ29udGV4dE5hbWU6IHN0cmluZywgZmllbGREaXY6IEhUTUxEaXZFbGVtZW50LCB2aWV3TW9kZWw6IGFueSkge1xuXG4gICAgaWYgKCFpY29ucykgcmV0dXJuO1xuXG4gICAgaWYgKHR5cGVvZiBpY29ucyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWNvbnMgPSBbeyBpY29uOiBpY29ucyB9XTtcbiAgICB9XG4gICAgaWNvbnMuZm9yRWFjaChpY29uUnVsZSA9PiB7XG4gICAgICAvLyA8ZGl2IGNsYXNzPVwiY29sdW1uLWF1dG9cIiBzdHlsZT1cIm1hcmdpbi1yaWdodDo1cHhcIj5cbiAgICAgIC8vIDxzcGFuIGNsYXNzPVwiZmEgY2FyZC1pY29uXCIgZGF0YS1iaW5kPVwiY3NzOmljb25cIj48L3NwYW4+XG4gICAgICAvLyA8L2Rpdj5cblxuICAgICAgY29uc3QgaWNvbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBpY29uRWxlbS5jbGFzc05hbWUgPSAnZmEgY2FyZC1pY29uICcgKyBpY29uUnVsZS5pY29uO1xuICAgICAgaWNvbkVsZW0uY2xhc3NMaXN0LmFkZCgnZW1zLWljb24nKTtcbiAgICAgIGlmIChpY29uUnVsZS5jc3NDbGFzcykgaWNvbkVsZW0uY2xhc3NMaXN0LmFkZChpY29uUnVsZS5jc3NDbGFzcyk7XG4gICAgICBpZiAodHlwZW9mIGljb25SdWxlLnN0eWxlID09PSBcInN0cmluZ1wiKSBpY29uRWxlbS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgaWNvblJ1bGUuc3R5bGUpO1xuICAgICAgaWYgKGljb25SdWxlLnJ1bGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpY29uUnVsZS5ydWxlXCIsIGljb25SdWxlLnJ1bGUpO1xuXG4gICAgICAgIC8vIGxldCBmdWxsUnVsZVBhdGggPSBgJHtpY29uUnVsZS5ydWxlfWBcbiAgICAgICAgLy8gaWYgKGRhdGFDb250ZXh0TmFtZSkge1xuICAgICAgICAvLyAgIGZ1bGxSdWxlUGF0aCA9IGAke2RhdGFDb250ZXh0TmFtZX0uJHtpY29uUnVsZS5ydWxlfWA7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBpY29uRWxlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsIGB2aXNpYmxlOiRyb290LmV2YWxGdW5jKFwiJHtmdWxsUnVsZVBhdGh9XCIsJHtkYXRhQ29udGV4dE5hbWV9LCBcIiR7ZGF0YUNvbnRleHROYW1lfVwiKWApO1xuICAgICAgICBsZXQgdmFsdWUgPSBldmFsdXRlUnVsZShpY29uUnVsZS5ydWxlLCB2aWV3TW9kZWwpO1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgaWNvbkVsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpY29uUnVsZS5wb3NpdGlvbiA9PT0gJ2JlZm9yZScpIHtcbiAgICAgICAgZmllbGREaXYuaW5zZXJ0QmVmb3JlKGljb25FbGVtLCBmaWVsZERpdi5maXJzdENoaWxkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGljb25SdWxlLnBvc2l0aW9uID09PSAnYWZ0ZXInKSB7XG4gICAgICAgIGZpZWxkRGl2LmFwcGVuZENoaWxkKGljb25FbGVtKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpY29uUnVsZS5wb3NpdGlvbikge1xuICAgICAgICBmaWVsZERpdi5hcHBlbmRDaGlsZChpY29uRWxlbSk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfVxuXG4gIGFkZENTUyhjc3NDbGFzczogSUNzc0NsYXNzRW50cnksIHJvb3REaXY6IEhUTUxEaXZFbGVtZW50LCBkYXRhQ29udGV4dE5hbWU6IHN0cmluZywgdmlld01vZGVsOiBhbnkpIHtcblxuICAgIGlmICh0eXBlb2YgY3NzQ2xhc3MgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNzc0NsYXNzID0gW3sgY3NzQ2xhc3M6IGNzc0NsYXNzIH1dO1xuICAgIH1cblxuICAgIGlmIChjc3NDbGFzcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgYXJySXRlbSA9IGNzc0NsYXNzIGFzIElDU1NSdWxlW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyckl0ZW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGNzc1J1bGUgPSBhcnJJdGVtW2ldO1xuICAgICAgICBsZXQgY3NzVmFsdWUgPSBleGVjdXRlRW1iZWRkZWRDb2RlKGNzc1J1bGUuY3NzQ2xhc3MsIHZpZXdNb2RlbCk7XG5cbiAgICAgICAgaWYgKGNzc1J1bGUucnVsZSkge1xuICAgICAgICAgIGxldCBjdXJyZW50RGF0YUJpbmQgPSByb290RGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJykgfHwgJyc7XG4gICAgICAgICAgaWYgKGN1cnJlbnREYXRhQmluZCkge1xuICAgICAgICAgICAgY3VycmVudERhdGFCaW5kICs9ICcsJztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy9yb290RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgYCR7Y3VycmVudERhdGFCaW5kfSBjc3M6IHsgJHtjc3NSdWxlLmNzc0NsYXNzfSA6ICRyb290LmV2YWxGdW5jKFwiJHtkYXRhQ29udGV4dE5hbWV9LiR7Y3NzUnVsZS5ydWxlfVwiLCR7ZGF0YUNvbnRleHROYW1lfSwgXCIke2RhdGFDb250ZXh0TmFtZX1cIikgfWApO1xuXG4gICAgICAgICAgbGV0IHJ1bGUgPSBjc3NSdWxlLnJ1bGU7XG5cbiAgICAgICAgICBsZXQgdmFsdWUgPSBldmFsdXRlUnVsZShydWxlLCB2aWV3TW9kZWwpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgcm9vdERpdi5jbGFzc0xpc3QuYWRkKGNzc1ZhbHVlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByb290RGl2LmNsYXNzTGlzdC5hZGQoY3NzVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBhZGRGaWVsZEFycmF5KGZpZWxkczogSUZpZWxkUnVsZVtdIHwgdW5kZWZpbmVkIHwgbnVsbCwgZm9ybWF0dGVyOiBzdHJpbmcgfCBudWxsfCB1bmRlZmluZWQsIGZpZWxkRGl2OiBIVE1MRWxlbWVudCwgdmlld01vZGVsOiBhbnkpIHtcblxuXG4gICAgaWYgKCFmaWVsZHMpIHJldHVybjtcblxuXG4gICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuXG5cblxuICAgICAgaWYgKGZpZWxkLnJ1bGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaWVsZFJ1bGUucnVsZVwiLCBmaWVsZC5ydWxlKTtcbiAgICAgICAgbGV0IHZhbHVlID0gZXZhbHV0ZVJ1bGUoZmllbGQucnVsZSwgdmlld01vZGVsKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5zZXRJbm5lckhUTUwoZmllbGQuZmllbGQsIGZvcm1hdHRlciwgdmlld01vZGVsLCBmaWVsZERpdik7XG4gICAgICAgICAgLy8gZmllbGREaXYuaW5uZXJIVE1MID0gZmllbGRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0SW5uZXJIVE1MKGZpZWxkLmZpZWxkLCBmb3JtYXR0ZXIsIHZpZXdNb2RlbCwgZmllbGREaXYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkU3R5bGUoc3R5bGU6IElTdHlsZUVudHJ5LCByb290RGl2OiBIVE1MRGl2RWxlbWVudCwgZGF0YUNvbnRleHROYW1lOiBzdHJpbmcsIHZpZXdNb2RlbDogYW55KSB7XG4gICAgaWYgKHN0eWxlID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHN0eWxlID0gW3sgc3R5bGU6IHN0eWxlIH1dO1xuICAgIH1cblxuICAgIC8vIGlmKCFBcnJheS5pc0FycmF5KHN0eWxlKSlcbiAgICAvLyB7XG4gICAgLy8gICBzdHlsZSA9IFtzdHlsZV07XG4gICAgLy8gfVxuXG4gICAgaWYgKHN0eWxlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBhcnJJdGVtID0gc3R5bGUgYXMgSVN0eWxlUnVsZVtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJJdGVtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzdHlsZVJ1bGUgPSBhcnJJdGVtW2ldLnJ1bGU7XG5cblxuICAgICAgICBpZiAoc3R5bGVSdWxlKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnREYXRhQmluZCA9IHJvb3REaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnKSB8fCAnJztcbiAgICAgICAgICBpZiAoY3VycmVudERhdGFCaW5kKSB7XG4gICAgICAgICAgICBjdXJyZW50RGF0YUJpbmQgKz0gJywnO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL3Jvb3REaXYuc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCBgJHtjdXJyZW50RGF0YUJpbmR9IGNzczogeyAke2Nzc1J1bGUuY3NzQ2xhc3N9IDogJHJvb3QuZXZhbEZ1bmMoXCIke2RhdGFDb250ZXh0TmFtZX0uJHtjc3NSdWxlLnJ1bGV9XCIsJHtkYXRhQ29udGV4dE5hbWV9LCBcIiR7ZGF0YUNvbnRleHROYW1lfVwiKSB9YCk7XG4gICAgICAgICAgbGV0IHZhbHVlID0gZXZhbHV0ZVJ1bGUoc3R5bGVSdWxlLCB2aWV3TW9kZWwpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZXMoc3R5bGUsIHZpZXdNb2RlbCwgZGF0YUNvbnRleHROYW1lLCByb290RGl2KVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3R5bGVzKHN0eWxlLCB2aWV3TW9kZWwsIGRhdGFDb250ZXh0TmFtZSwgcm9vdERpdilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3R5bGVzKHN0eWxlLCB2aWV3TW9kZWwsIGRhdGFDb250ZXh0TmFtZSwgcm9vdERpdilcbiAgICB9XG5cbiAgfVxuXG4gIHNldFN0eWxlcyhzdHlsZTogSVN0eWxlRW50cnksIGRhdGE6IGFueSwgZGF0YUNvbnRleHROYW1lOiBzdHJpbmcsIHJvb3REaXY6IEhUTUxFbGVtZW50KTogYW55IHtcbiAgICBsZXQgcmV0VmFsdWU6IElOYW1lVmFsdWUgPSB7fTtcblxuICAgIGlmICghc3R5bGUpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIHN0eWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBsZXQgbjogSVN0eWxlUnVsZSA9IHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5idWlsZFN0eWxlTmFtZVZhbHVlKG4sIHJldFZhbHVlKTtcbiAgICB9XG5cblxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGUpKSB7XG4gICAgICBsZXQgYXJySXRlbSA9IHN0eWxlIGFzIElTdHlsZVJ1bGVbXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyckl0ZW0pKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJySXRlbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBzdHlsZVJ1bGVPck5hbWVWYWx1ZSA9IGFyckl0ZW1baV07XG4gICAgICAgICAgaWYgKHN0eWxlUnVsZU9yTmFtZVZhbHVlLnJ1bGUpIHtcbiAgICAgICAgICAgIGlmIChldmFsdXRlUnVsZShzdHlsZVJ1bGVPck5hbWVWYWx1ZS5ydWxlLCBkYXRhKSkge1xuICAgICAgICAgICAgICBpZiAoIXN0eWxlUnVsZU9yTmFtZVZhbHVlLnN0eWxlKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmJ1aWxkU3R5bGVOYW1lVmFsdWUoc3R5bGVSdWxlT3JOYW1lVmFsdWUsIHJldFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuYnVpbGRTdHlsZU5hbWVWYWx1ZShzdHlsZVJ1bGVPck5hbWVWYWx1ZSwgcmV0VmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyckl0ZW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHN0eWxlUnVsZU9yTmFtZVZhbHVlID0gYXJySXRlbVtpXTtcbiAgICAgICAgaWYgKHN0eWxlUnVsZU9yTmFtZVZhbHVlLnJ1bGUpIHtcbiAgICAgICAgICBpZiAoZXZhbHV0ZVJ1bGUoc3R5bGVSdWxlT3JOYW1lVmFsdWUucnVsZSwgZGF0YSkpIHtcbiAgICAgICAgICAgIGlmICghc3R5bGVSdWxlT3JOYW1lVmFsdWUuc3R5bGUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmJ1aWxkU3R5bGVOYW1lVmFsdWUoc3R5bGVSdWxlT3JOYW1lVmFsdWUsIHJldFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmJ1aWxkU3R5bGVOYW1lVmFsdWUoc3R5bGVSdWxlT3JOYW1lVmFsdWUsIHJldFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcblxuICAgICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gXCJvYmplY3RcIikgeyAvL211c3QgYmUgYSBOYW1lVmFsdWVcbiAgICAgICAgcmV0VmFsdWUgPSBzdHlsZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL2xvb3AgdGhyb3VnaCB0aGUgcmV0VmFsdWUgYW5kIGFkZCBzdHlsZXMgdG8gZWxlbWVudFxuICAgIGZvciAobGV0IGtleSBpbiByZXRWYWx1ZSkge1xuICAgICAgaWYgKHJldFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgcm9vdERpdi5zdHlsZVtrZXkgYXMgYW55XSA9IHJldFZhbHVlW2tleSBhcyBhbnldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgYnVpbGRTdHlsZU5hbWVWYWx1ZShydWxlOiBJU3R5bGVSdWxlLCByZXRWYWx1ZTogSU5hbWVWYWx1ZSkge1xuXG4gICAgaWYgKHR5cGVvZiBydWxlLnN0eWxlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXRWYWx1ZSA9IHsgLi4ucmV0VmFsdWUsIC4uLnJ1bGUuc3R5bGUgfTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJ1bGUuc3R5bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBzdHlsZUl0ZW1zID0gcnVsZS5zdHlsZS5zcGxpdChcIjtcIik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHN0eWxlSXRlbSA9IHN0eWxlSXRlbXNbaV07XG4gICAgICAgIGxldCBuYW1lVmFsdWUgPSBzdHlsZUl0ZW0uc3BsaXQoXCI6XCIpO1xuICAgICAgICBpZiAobmFtZVZhbHVlLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgcmV0VmFsdWVbbmFtZVZhbHVlWzBdLnRyaW0oKV0gPSBuYW1lVmFsdWVbMV0udHJpbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRWYWx1ZTtcbiAgfVxuXG5cblxufVxuXG5cbiIsImltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdAZW9uYXNkYW4vdGVtcHVzLWRvbWludXMnO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVdpZGdldEpzb24gfSBmcm9tICcuLi9CYXNlQ2xhc3Nlcy9JbnRlcmZhY2VzJztcbmltcG9ydCB7IERFQlVHX0RFRkFVTFQsIERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9TRVRUSU5HUyB9IGZyb20gJy4uL0Jhc2VDbGFzc2VzL0RlZmF1bHRTZXR0aW5ncyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnMge1xuICAgIHRpdGxlOiBzdHJpbmcgIHwgdW5kZWZpbmVkOyAvL3RoZSB0aXRsZSB0byBkaXNwbGF5IGFib3ZlIHRoZSBkYXRlIHBpY2tlclxuICAgIGZvcm1CdWlsZGVyRmllbGQ6IHN0cmluZyAgfCB1bmRlZmluZWQ7IC8vdGhlIGZvcm0gYnVpbGRlciBmaWVsZCB0byBnZXQgdGhlIHZhbHVlIGZyb20gYW5kIHNldCB0aGUgdmFsdWUgdG9cbiAgICBnZXRWYWx1ZU9wdGlvbnM6IGdldFZhbHVlT3B0aW9uW10gfCBzdHJpbmcgIHwgdW5kZWZpbmVkOyAvL3RoZSBmaWVsZCBwYXRoIHRvIGdldCB0aGUgdmFsdWUgZnJvbSAoaWYgZGlmZmVyZW50IGZyb20gdGhlIGZvcm0gYnVpbGRlciBmaWVsZClcbiAgICBwaWNrZXJFbmFibGVkOiBib29sZWFuICB8IHVuZGVmaW5lZDsgLy9pZiB0cnVlLCB0aGUgZGF0ZSBwaWNrZXIgd2lsbCBiZSBlbmFibGVkXG4gICAgZXZlbnRUb0ZpcmVPblVwZGF0ZTogQXJyYXk8c3RyaW5nPiB8IHVuZGVmaW5lZDsgLy90aGUgZXZlbnQgdG8gZmlyZSB3aGVuIHRoZSBkYXRlIGlzIHVwZGF0ZWRcbiAgICBkYXRlUGlja2VyT3B0aW9uczogT3B0aW9ucyAgfCB1bmRlZmluZWQ7IC8vdGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgZGF0ZSBwaWNrZXIgXG4gICAgaGlkZUlucHV0Qm94OiBib29sZWFuICB8IHVuZGVmaW5lZDsgLy9pZiB0cnVlLCB0aGUgaW5wdXQgYm94IHdpbGwgYmUgaGlkZGVuXG4gICAgZGVmYXVsdFZhbHVlOlxuICAgIHtcbiAgICAgICAgZGVmYXVsdERhdGVGcm9tTm93SG91cnM6IG51bWJlciAgfCB1bmRlZmluZWQ7IC8vd2hlbiBubyB2YWx1ZSBpcyBzZXQsIHNldCB0aGUgZGF0ZSB0byBub3cgKyB0aGlzIG51bWJlciBvZiBob3Vyc1xuICAgIH1cbiAgICBcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIGdldFZhbHVlT3B0aW9uXG57XG4gICAgcnVsZTogc3RyaW5nO1xuICAgIGZpZWxkUGF0aDogc3RyaW5nO1xufVxuXG5cblxuZXhwb3J0IGNvbnN0IERBVEVfUElDS0VSX0RFRkFVTFRTIDogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnM+PVxue1xuICAgICAgICAgIFxuICAgIFwiZm9ybUJ1aWxkZXJGaWVsZFwiOiBcImVEaXNjb3ZlcnlVcGRhdGVQbGFubmVkRGF0ZVwiLFxuICAgIFwiZ2V0VmFsdWVPcHRpb25zXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJydWxlXCI6IFwiIWRhdGFDb250ZXh0LmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEuZURpc2NvdmVyeVVwZGF0ZVBsYW5uZWREYXRlXCIsXG4gICAgICAgICAgICBcImZpZWxkUGF0aFwiOlwiZm9ybS1hbHQtZWRpc2NvdmVyeS1qb2ItZGVzaXJlZC1jb21wbGV0aW9uLWRhdGUtZGF0ZS1vbmx5LmpvYi1kZXNpcmVkLWNvbXBsZXRpb24tZGF0ZVwiLFxuICAgICAgICB9XG4gICAgXSxcbiAgICBcImhpZGVJbnB1dEJveFwiOiB0cnVlLFxuICAgIFwiZGVmYXVsdFZhbHVlXCI6e1xuICAgICAgICBcImRlZmF1bHREYXRlRnJvbU5vd0hvdXJzXCI6IDI0LFxuICAgIH0sXG5cbiAgICBcInRpdGxlXCI6IFwiVXBkYXRlZCBwbGFubmVkIGR1ZSBkYXRlOlwiLFxuICAgIFwicGlja2VyRW5hYmxlZFwiOiB0cnVlLFxuICAgIFwiZXZlbnRUb0ZpcmVPblVwZGF0ZVwiOiBbXCJJREVBc3BlY3RzLkRhdGVQaWNrZXJBc3BlY3QuVXBkYXRlXCJdLFxuICAgIFxuICAgIFwiZGF0ZVBpY2tlck9wdGlvbnNcIjoge1xuICAgICAgICBcImRpc3BsYXlcIjoge1xuICAgICAgICAgICAgXCJpbmxpbmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic2lkZUJ5U2lkZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJ0aGVtZVwiOiBcImxpZ2h0XCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJkZWJ1Z1wiOiBERUJVR19ERUZBVUxUKCksXG4gICAgXCJyZWZyZXNoT25cIjoge1xuICAgICAgICBcInNoYXJlZG9JZENoYW5nZWRcIjogZmFsc2UsXG4gICAgICAgIFwic2hhcmVkb1BhcmVudElkQ2hhbmdlZFwiOiBmYWxzZSxcbiAgICAgICAgXCJzaGFyZWRvUGhhc2VDaGFuZ2VkXCI6IGZhbHNlLFxuICAgIH0sXG4gICAgXCJldmVudHNUb1JlYWN0VG9cIjogW10sXG4gICAgXCJkYXRhU2V0dGluZ3NcIjoge1xuICAgICAgICBcImdldFZhbHVlVXNpbmdQYXJlbnRzXCI6IGZhbHNlLFxuICAgICAgICBcIm1heERlcHRoXCI6IDAsXG4gICAgfSxcbiAgICBcImVycm9yTWFuYWdlbWVudFwiOiBERUZBVUxUX0VSUk9SX01BTkFHRU1FTlRfU0VUVElOR1Ncbn1cblxuZXhwb3J0IGNvbnN0IERBVEVfUElDS0VSX1dJREdFVF9ERUZBVUxUUyA6IElXaWRnZXRKc29uPElEYXRlUGlja2VyQXNwZWN0T3B0aW9ucz49IHtcbiAgICB0eXBlOiAnd2lkZ2V0JyxcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogZmFsc2UsXG4gICAgICAgIFwiYWxsb3dBc3BlY3RBZGFwdGVyXCI6IHRydWUsXG4gICAgICAgIFwidGl0bGVcIjogXCJEYXRlIFBpY2tlciBBc3BlY3RcIixcbiAgICAgICAgXCJpY29uXCI6IFwiZmEtY29nXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJEYXRlIFBpY2tlciBBc3BlY3RcIixcbiAgICAgICAgXCJjYXRlZ29yaWVzXCI6IFtdLFxuICAgICAgICBcImlzQ29uZmlndXJhYmxlXCI6IHRydWUsXG4gICAgICAgIFwiY29uZmlndXJhdGlvbldpZGdldFwiOiBudWxsLFxuXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6ICB7IGNvbmZpZ3VyYXRpb246IERBVEVfUElDS0VSX0RFRkFVTFRTfVxuICAgIH0sXG4gICAgXCJzY3JpcHRzXCI6IFtdLFxuICAgIFwic3R5bGVzXCI6IFtcbiAgICAgICAgXCJEYXRlUGlja2VyQXNwZWN0LmNzc1wiXG4gICAgXSxcbiAgICBcInRlbXBsYXRlc1wiOiBbXG4gICAgICAgIFwiRGF0ZVBpY2tlckFzcGVjdC5odG1sXCJcbiAgICBdLFxuICAgIFwibWVudVRlbXBsYXRlc1wiOiBbXSxcbiAgICBcImNvbXBvbmVudHNcIjogW11cbn0iLCJcblxuLyoqXG4gKiAqIEZvcm1hdCBhIHZhbHVlIHVzaW5nIGEgZm9ybWF0dGVyIHN0cmluZ1xuICogKiBFeGFtcGxlczogXG4gKiAqIDEuIHZhbHVlXG4gKiAqIDIuIHZhbHVlLnRvVXBwZXJDYXNlKClcbiAqICogMy4gdmFsdWUgPyB2YWx1ZS50b1VwcGVyQ2FzZSgpIDogXCJcIlxuICogKiA0LiB2YWx1ZSA/IHZhbHVlLnRvVXBwZXJDYXNlKCkgOiBcIk5vIFZhbHVlXCJcbiAqICogNS4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gKiAqIDYuIHZhbHVlID8gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpIDogXCJcIlxuICogQHBhcmFtIHZhbHVlIFxuICogQHBhcmFtIGZvcm1hdHRlciBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsdWU6IGFueSwgZm9ybWF0dGVyOiBzdHJpbmcpOiBhbnkge1xuICAgIC8vIENyZWF0ZSBhIG5ldyBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgZm9ybWF0dGVyXG4gICAgbGV0IGR5bmFtaWNGdW5jIDogRnVuY3Rpb25cbiAgICBsZXQgcmV0dXJuVmFsdWU6IGFueTtcbiAgICB0cnl7XG4gICAgICAgICBkeW5hbWljRnVuYyA9IG5ldyBGdW5jdGlvbigndmFsdWUnLCBgcmV0dXJuICgke2Zvcm1hdHRlcn0pO2ApO1xuICAgIC8vIEludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gdmFsdWVcbiAgICAgcmV0dXJuVmFsdWUgPSBkeW5hbWljRnVuYyh2YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoKGUpXG4gICAge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGBFcnJvciBmb3JtYXR0aW5nIHZhbHVlICR7dmFsdWV9IHdpdGggZm9ybWF0dGVyICR7Zm9ybWF0dGVyfSAtICR7ZX1gO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRGdW5jID0gZm9ybWF0VmFsdWU7IC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSIsImltcG9ydCB7IGV4ZWN1dGVFbWJlZGRlZENvZGUsIGV4ZWN1dGVGdW5jIH0gZnJvbSBcIi4vZXZhbHV0ZVJ1bGVcIjtcbmltcG9ydCB7IGZvcm1hdEZ1bmMgfSBmcm9tIFwiLi9Gb3JtYXR0ZXJcIjtcblxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBleHRyYWN0IHRoZSB2YWx1ZSBmcm9tIHRoZSB2YWx1ZSBzdHJpbmcuXG4gKiBUaGUgdmFsdWUgc3RyaW5nIGNhbiBiZSBhIHNpbXBsZSBzdHJpbmcsIG9yIGEgZnVuY3Rpb24gY2FsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gZXh0cmFjdCBvciBjYWxjdWxhdGVkIHZhbHVlXG4gKiBAcGFyYW0gdmlld01vZGVsIFRoZSB2aWV3IG1vZGVsIHRvIHVzZSBmb3IgdGhlIGZ1bmN0aW9uIGNhbGwgYW5kIGRhdGEgY29udGV4dFxuICogQHBhcmFtIGZvcm1hdHRlciBBIGZvcm1hdHRlciB0byB1c2Ugb24gdGhlIHZhbHVlIGUuZy4gdmFsdWUuVG9VcHBlcigpXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RWYWx1ZSh2YWx1ZTogc3RyaW5nLCB2aWV3TW9kZWw6IGFueSwgZm9ybWF0dGVyOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkLGRhdGFDb250ZXh0TmFtZT86c3RyaW5nKSB7XG4gICAgbGV0IHZhbHVlVG9TZXQgPSBleGVjdXRlRW1iZWRkZWRDb2RlKHZhbHVlLCB2aWV3TW9kZWwsZGF0YUNvbnRleHROYW1lKTtcbiAgXG4gICAgaWYgKHR5cGVvZiB2YWx1ZVRvU2V0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB2YWx1ZVRvU2V0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWVUb1NldCwgbnVsbCwgMik7XG4gICAgfVxuICBcbiAgICBpZiAoZm9ybWF0dGVyKSB7XG4gICAgICB2YWx1ZVRvU2V0ID0gZm9ybWF0RnVuYyh2YWx1ZVRvU2V0LCBmb3JtYXR0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVUb1NldDtcbiAgfSIsImltcG9ydCB7IGRhdGEgfSBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgeyBKc29uVG9IdG1sQ29udmVydGVyIH0gZnJvbSBcIi4uL0NvbW1vbi9Kc29uVG9IVE1MQ29udmVydGVyXCI7XG5pbXBvcnQgeyBsLCBpbmYsIGVyciwgbGgxIH0gZnJvbSBcIi4uL0NvbW1vbi9Mb2dcIjtcbmltcG9ydCB7IHV0ZjhUb0Jhc2U2NCB9IGZyb20gXCIuLi9Db21tb24vQmFzZTY0RW5jb2RpbmdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1dGVSdWxlKHJ1bGU6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwsIGRhdGFDb250ZXh0OiBhbnksIGRhdGFDb250ZXh0TmFtZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuXG4gIGlmICghcnVsZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IGFueSA9IGV4ZWN1dGVGdW5jKHJ1bGUsIGRhdGFDb250ZXh0LCBkYXRhQ29udGV4dE5hbWUpO1xuICAgIGlmICh0eXBlb2YgcmV0dXJuVmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsKGVycigoYFJ1bGUgWyR7cnVsZX1dIGRpZCBub3QgcmV0dXJuIGEgYm9vbGVhbiB2YWx1ZS4gSXQgcmV0dXJuZWQ6ICR7cmV0dXJuVmFsdWV9YCkpKTtcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gRGVmYXVsdCB2YWx1ZSBpZiB0aGUgcnVsZSBkb2Vzbid0IHJldHVybiBhIGJvb2xlYW5cbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgZXZhbHVhdGluZyBydWxlIFske3J1bGV9XSB3aXRoIGRhdGEgY29udGV4dGAsIGUpO1xuICAgIHJldHVybiBmYWxzZTsgLy8gRGVmYXVsdCB2YWx1ZSBpbiBjYXNlIG9mIGFuIGVycm9yXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVGdW5jKGV4cHJlc3Npb246IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwsIGRhdGFDb250ZXh0OiBhbnksIGRhdGFDb250ZXh0TmFtZT86IHN0cmluZykge1xuICAvLyBDcmVhdGUgYSBuZXcgZnVuY3Rpb24gYmFzZWQgb24gdGhlIGZvcm1hdHRlclxuICBsKGluZihgZXZhbHV0ZVJ1bGUoJHtleHByZXNzaW9ufSlgKSwgZGF0YUNvbnRleHQpO1xuXG4gIGlmIChleHByZXNzaW9uID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGxldCBkeW5hbWljRnVuYzogRnVuY3Rpb25cbiAgdHJ5IHtcbiAgICBsZXQgZGF0YUNvbnRleHROYW1lVG9Vc2UgPSAnZGF0YUNvbnRleHQnO1xuXG4gICAgLy9yZXBsYWNlIHRoZSBkYXRhQ29udGV4dE5hbWUgd2l0aCB0aGUgZGF0YUNvbnRleHROYW1lVG9Vc2VcbiAgICAvLyBSZXBsYWNlIHRoZSBkYXRhQ29udGV4dE5hbWUgd2l0aCB0aGUgZGF0YUNvbnRleHROYW1lVG9Vc2VcbiAgICBpZiAoZGF0YUNvbnRleHROYW1lKSB7XG5cbiAgICAgIC8vIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgaW4gdGhlIHN0cmluZyBmb3IgdXNlIGluIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICAgIGNvbnN0IGVzY2FwZWREYXRhQ29udGV4dE5hbWUgPSBkYXRhQ29udGV4dE5hbWUucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcblxuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGVzY2FwZWREYXRhQ29udGV4dE5hbWUsICdnJyk7XG4gICAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi5yZXBsYWNlKHJlZ2V4LCBkYXRhQ29udGV4dE5hbWVUb1VzZSk7XG4gICAgfVxuXG4gICAgY2hlY2tBbmRMb2dVbmRlZmluZWQoZGF0YUNvbnRleHQsIGV4cHJlc3Npb24sIGRhdGFDb250ZXh0TmFtZVRvVXNlKTtcblxuXG5cblxuICAgIGR5bmFtaWNGdW5jID0gbmV3IEZ1bmN0aW9uKGAke2RhdGFDb250ZXh0TmFtZVRvVXNlfWAsIGByZXR1cm4gKCR7ZXhwcmVzc2lvbn0pO2ApO1xuXG4gIH1cbiAgY2F0Y2ggKGUpIHtcbiAgICBsZXQgZXJyTWVzc2FnZSA9IGBFcnJvciBjcmVhdGluZyBmdW5jdGlvbiBmb3IgZXhwcmVzc2lvbiBbJHtleHByZXNzaW9ufV1gO1xuICAgIGwoZXJyKGVyck1lc3NhZ2UpLCBlKTtcbiAgICByZXR1cm4gZXJyTWVzc2FnZTtcbiAgfVxuXG5cbiAgbChpbmYoYGV2YWx1dGVSdWxlKCR7ZXhwcmVzc2lvbn0pIC0gZHluYW1pY0Z1bmM6IGApLCBkeW5hbWljRnVuYyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXR1cm5WYWx1ZTogYW55ID0gZHluYW1pY0Z1bmMoZGF0YUNvbnRleHQpO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGBFcnJvciBldmFsdWF0aW5nIHJ1bGUgWyR7ZXhwcmVzc2lvbn1dIHdpdGggZGF0YSBjb250ZXh0YCwgZSk7XG4gICAgcmV0dXJuIGAke2V9YDsgLy8gRGVmYXVsdCB2YWx1ZSBpbiBjYXNlIG9mIGFuIGVycm9yXG4gIH1cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0FuZExvZ1VuZGVmaW5lZChvYmo6IGFueSwgcnVsZTogc3RyaW5nLCBkYXRhQ29udGV4dE5hbWU6IHN0cmluZykge1xuICBjb25zdCBwcm9wcyA9IHJ1bGUuc3BsaXQoJy4nKTtcbiAgbGV0IGN1cnJlbnQ6IGFueSA9IHt9O1xuICBjdXJyZW50W2RhdGFDb250ZXh0TmFtZV0gPSBvYmo7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjdXJyZW50W3Byb3BzW2ldXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsKGVycihgRXJyb3Igd2hpbGUgZXZhbHVhdGluZyBhIHJ1bGUgJHtydWxlfSEgVGhlIHByb3BlcnR5ICR7ZGF0YUNvbnRleHROYW1lfS4ke3Byb3BzLnNsaWNlKDAsIGkgKyAxKS5qb2luKCcuJyl9IGlzIHVuZGVmaW5lZC5gKSk7XG4gICAgICBsKGVycihgQ2hlY2sgdGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIHJ1bGUgJHtydWxlfSFgKSk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wc1tpXV07XG4gIH1cblxuICByZXR1cm4gY3VycmVudDtcbn1cblxuXG4vKipcbiAqIEV4YW1wbGU6IFwidGl0bGU6ICR7dGl0bGUudG9VcHBlckNhc2UoKX0gTWF0dGVyIFNlYXJjaCAkezIgKyAyfVwiXG4gKiBSZXN1cm46IFwidGl0bGU6IFRJVExFIE1BVFRFUiBTRUFSQ0ggNFwiXG4gKiBAcGFyYW0gaW5wdXQgXG4gKiBAcGFyYW0gZGF0YUNvbnRleHQgXG4gKiBAcGFyYW0gZGF0YUNvbnRleHROYW1lIFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlRW1iZWRkZWRDb2RlKGlucHV0OiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsLCBkYXRhQ29udGV4dDogYW55LCBkYXRhQ29udGV4dE5hbWU/OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gIGlmICghaW5wdXQpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIHJldHVybiBpbnB1dC5yZXBsYWNlKC9cXCRcXHsoLis/KVxcfS9nLCAoXywgY29kZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBXQVJOSU5HOiBFdmFsIGNhbiBleGVjdXRlIGFyYml0cmFyeSBjb2RlIGFuZCBpcyB1bnNhZmVcbiAgICAgIC8vIE9ubHkgdXNlIHdpdGggdHJ1c3RlZCBpbnB1dFxuXG4gICAgICBkYXRhQ29udGV4dFtcImhlbHBlcnNcIl0gPSBkYXRhQ29udGV4dFtcImhlbHBlcnNcIl0gfHwge307XG4gICAgICBkYXRhQ29udGV4dFtcImhlbHBlcnNcIl0udXRmOFRvQmFzZTY0ID0gdXRmOFRvQmFzZTY0O1xuIFxuICAgICAgbGV0IHZhbCA9IGV4ZWN1dGVGdW5jKGNvZGUsIGRhdGFDb250ZXh0LCBkYXRhQ29udGV4dE5hbWUpO1xuICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbCA9ICcnO1xuICAgICAgfVxuICAgICAgLy8gdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIDIpO1xuXG4gICAgICB2YWwgPSBKc29uVG9IdG1sQ29udmVydGVyLmNvbnZlcnQodmFsKTtcbiAgICAgIFxuICAgICAgLy9yZW1vdmUgb3V0dGVyIFwiIGZyb20gdmFsXG4gICAgICAvLyB2YWwgPSB2YWwuc3Vic3RyaW5nKDEsIHZhbC5sZW5ndGggLSAxKTtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGV4ZWN1dGUgZW1iZWRkZWQgY29kZTonLCBlcnJvcik7XG5cbiAgICAgIGxldCB2YWwgPSAnJztcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgIHZhbCA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsID0gSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICB9XG4gIH0pO1xufVxuIiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCJpbXBvcnQgYW5zaVN0eWxlcyBmcm9tICcjYW5zaS1zdHlsZXMnO1xuaW1wb3J0IHN1cHBvcnRzQ29sb3IgZnJvbSAnI3N1cHBvcnRzLWNvbG9yJztcbmltcG9ydCB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L29yZGVyXG5cdHN0cmluZ1JlcGxhY2VBbGwsXG5cdHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleCxcbn0gZnJvbSAnLi91dGlsaXRpZXMuanMnO1xuXG5jb25zdCB7c3Rkb3V0OiBzdGRvdXRDb2xvciwgc3RkZXJyOiBzdGRlcnJDb2xvcn0gPSBzdXBwb3J0c0NvbG9yO1xuXG5jb25zdCBHRU5FUkFUT1IgPSBTeW1ib2woJ0dFTkVSQVRPUicpO1xuY29uc3QgU1RZTEVSID0gU3ltYm9sKCdTVFlMRVInKTtcbmNvbnN0IElTX0VNUFRZID0gU3ltYm9sKCdJU19FTVBUWScpO1xuXG4vLyBgc3VwcG9ydHNDb2xvci5sZXZlbGAg4oaSIGBhbnNpU3R5bGVzLmNvbG9yW25hbWVdYCBtYXBwaW5nXG5jb25zdCBsZXZlbE1hcHBpbmcgPSBbXG5cdCdhbnNpJyxcblx0J2Fuc2knLFxuXHQnYW5zaTI1NicsXG5cdCdhbnNpMTZtJyxcbl07XG5cbmNvbnN0IHN0eWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmNvbnN0IGFwcGx5T3B0aW9ucyA9IChvYmplY3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRpZiAob3B0aW9ucy5sZXZlbCAmJiAhKE51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sZXZlbCkgJiYgb3B0aW9ucy5sZXZlbCA+PSAwICYmIG9wdGlvbnMubGV2ZWwgPD0gMykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgbGV2ZWxgIG9wdGlvbiBzaG91bGQgYmUgYW4gaW50ZWdlciBmcm9tIDAgdG8gMycpO1xuXHR9XG5cblx0Ly8gRGV0ZWN0IGxldmVsIGlmIG5vdCBzZXQgbWFudWFsbHlcblx0Y29uc3QgY29sb3JMZXZlbCA9IHN0ZG91dENvbG9yID8gc3Rkb3V0Q29sb3IubGV2ZWwgOiAwO1xuXHRvYmplY3QubGV2ZWwgPSBvcHRpb25zLmxldmVsID09PSB1bmRlZmluZWQgPyBjb2xvckxldmVsIDogb3B0aW9ucy5sZXZlbDtcbn07XG5cbmV4cG9ydCBjbGFzcyBDaGFsayB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG5cdFx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcblx0fVxufVxuXG5jb25zdCBjaGFsa0ZhY3RvcnkgPSBvcHRpb25zID0+IHtcblx0Y29uc3QgY2hhbGsgPSAoLi4uc3RyaW5ncykgPT4gc3RyaW5ncy5qb2luKCcgJyk7XG5cdGFwcGx5T3B0aW9ucyhjaGFsaywgb3B0aW9ucyk7XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGNoYWxrLCBjcmVhdGVDaGFsay5wcm90b3R5cGUpO1xuXG5cdHJldHVybiBjaGFsaztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWxrKG9wdGlvbnMpIHtcblx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcbn1cblxuT2JqZWN0LnNldFByb3RvdHlwZU9mKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgRnVuY3Rpb24ucHJvdG90eXBlKTtcblxuZm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoYW5zaVN0eWxlcykpIHtcblx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgY3JlYXRlU3R5bGVyKHN0eWxlLm9wZW4sIHN0eWxlLmNsb3NlLCB0aGlzW1NUWUxFUl0pLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgc3R5bGVOYW1lLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRcdHJldHVybiBidWlsZGVyO1xuXHRcdH0sXG5cdH07XG59XG5cbnN0eWxlcy52aXNpYmxlID0ge1xuXHRnZXQoKSB7XG5cdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgdGhpc1tTVFlMRVJdLCB0cnVlKTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Zpc2libGUnLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRyZXR1cm4gYnVpbGRlcjtcblx0fSxcbn07XG5cbmNvbnN0IGdldE1vZGVsQW5zaSA9IChtb2RlbCwgbGV2ZWwsIHR5cGUsIC4uLmFyZ3VtZW50c18pID0+IHtcblx0aWYgKG1vZGVsID09PSAncmdiJykge1xuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kxNm0nKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMTZtKC4uLmFyZ3VtZW50c18pO1xuXHRcdH1cblxuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kyNTYnKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMjU2KGFuc2lTdHlsZXMucmdiVG9BbnNpMjU2KC4uLmFyZ3VtZW50c18pKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpKGFuc2lTdHlsZXMucmdiVG9BbnNpKC4uLmFyZ3VtZW50c18pKTtcblx0fVxuXG5cdGlmIChtb2RlbCA9PT0gJ2hleCcpIHtcblx0XHRyZXR1cm4gZ2V0TW9kZWxBbnNpKCdyZ2InLCBsZXZlbCwgdHlwZSwgLi4uYW5zaVN0eWxlcy5oZXhUb1JnYiguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXVttb2RlbF0oLi4uYXJndW1lbnRzXyk7XG59O1xuXG5jb25zdCB1c2VkTW9kZWxzID0gWydyZ2InLCAnaGV4JywgJ2Fuc2kyNTYnXTtcblxuZm9yIChjb25zdCBtb2RlbCBvZiB1c2VkTW9kZWxzKSB7XG5cdHN0eWxlc1ttb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuY29sb3IuY2xvc2UsIHRoaXNbU1RZTEVSXSk7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVCdWlsZGVyKHRoaXMsIHN0eWxlciwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXHR9O1xuXG5cdGNvbnN0IGJnTW9kZWwgPSAnYmcnICsgbW9kZWxbMF0udG9VcHBlckNhc2UoKSArIG1vZGVsLnNsaWNlKDEpO1xuXHRzdHlsZXNbYmdNb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2JnQ29sb3InLCAuLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5iZ0NvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgcHJvdG8gPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcygoKSA9PiB7fSwge1xuXHQuLi5zdHlsZXMsXG5cdGxldmVsOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tHRU5FUkFUT1JdLmxldmVsO1xuXHRcdH0sXG5cdFx0c2V0KGxldmVsKSB7XG5cdFx0XHR0aGlzW0dFTkVSQVRPUl0ubGV2ZWwgPSBsZXZlbDtcblx0XHR9LFxuXHR9LFxufSk7XG5cbmNvbnN0IGNyZWF0ZVN0eWxlciA9IChvcGVuLCBjbG9zZSwgcGFyZW50KSA9PiB7XG5cdGxldCBvcGVuQWxsO1xuXHRsZXQgY2xvc2VBbGw7XG5cdGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wZW5BbGwgPSBvcGVuO1xuXHRcdGNsb3NlQWxsID0gY2xvc2U7XG5cdH0gZWxzZSB7XG5cdFx0b3BlbkFsbCA9IHBhcmVudC5vcGVuQWxsICsgb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlICsgcGFyZW50LmNsb3NlQWxsO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRvcGVuLFxuXHRcdGNsb3NlLFxuXHRcdG9wZW5BbGwsXG5cdFx0Y2xvc2VBbGwsXG5cdFx0cGFyZW50LFxuXHR9O1xufTtcblxuY29uc3QgY3JlYXRlQnVpbGRlciA9IChzZWxmLCBfc3R5bGVyLCBfaXNFbXB0eSkgPT4ge1xuXHQvLyBTaW5nbGUgYXJndW1lbnQgaXMgaG90IHBhdGgsIGltcGxpY2l0IGNvZXJjaW9uIGlzIGZhc3RlciB0aGFuIGFueXRoaW5nXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvblxuXHRjb25zdCBidWlsZGVyID0gKC4uLmFyZ3VtZW50c18pID0+IGFwcGx5U3R5bGUoYnVpbGRlciwgKGFyZ3VtZW50c18ubGVuZ3RoID09PSAxKSA/ICgnJyArIGFyZ3VtZW50c19bMF0pIDogYXJndW1lbnRzXy5qb2luKCcgJykpO1xuXG5cdC8vIFdlIGFsdGVyIHRoZSBwcm90b3R5cGUgYmVjYXVzZSB3ZSBtdXN0IHJldHVybiBhIGZ1bmN0aW9uLCBidXQgdGhlcmUgaXNcblx0Ly8gbm8gd2F5IHRvIGNyZWF0ZSBhIGZ1bmN0aW9uIHdpdGggYSBkaWZmZXJlbnQgcHJvdG90eXBlXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihidWlsZGVyLCBwcm90byk7XG5cblx0YnVpbGRlcltHRU5FUkFUT1JdID0gc2VsZjtcblx0YnVpbGRlcltTVFlMRVJdID0gX3N0eWxlcjtcblx0YnVpbGRlcltJU19FTVBUWV0gPSBfaXNFbXB0eTtcblxuXHRyZXR1cm4gYnVpbGRlcjtcbn07XG5cbmNvbnN0IGFwcGx5U3R5bGUgPSAoc2VsZiwgc3RyaW5nKSA9PiB7XG5cdGlmIChzZWxmLmxldmVsIDw9IDAgfHwgIXN0cmluZykge1xuXHRcdHJldHVybiBzZWxmW0lTX0VNUFRZXSA/ICcnIDogc3RyaW5nO1xuXHR9XG5cblx0bGV0IHN0eWxlciA9IHNlbGZbU1RZTEVSXTtcblxuXHRpZiAoc3R5bGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qge29wZW5BbGwsIGNsb3NlQWxsfSA9IHN0eWxlcjtcblx0aWYgKHN0cmluZy5pbmNsdWRlcygnXFx1MDAxQicpKSB7XG5cdFx0d2hpbGUgKHN0eWxlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBSZXBsYWNlIGFueSBpbnN0YW5jZXMgYWxyZWFkeSBwcmVzZW50IHdpdGggYSByZS1vcGVuaW5nIGNvZGVcblx0XHRcdC8vIG90aGVyd2lzZSBvbmx5IHRoZSBwYXJ0IG9mIHRoZSBzdHJpbmcgdW50aWwgc2FpZCBjbG9zaW5nIGNvZGVcblx0XHRcdC8vIHdpbGwgYmUgY29sb3JlZCwgYW5kIHRoZSByZXN0IHdpbGwgc2ltcGx5IGJlICdwbGFpbicuXG5cdFx0XHRzdHJpbmcgPSBzdHJpbmdSZXBsYWNlQWxsKHN0cmluZywgc3R5bGVyLmNsb3NlLCBzdHlsZXIub3Blbik7XG5cblx0XHRcdHN0eWxlciA9IHN0eWxlci5wYXJlbnQ7XG5cdFx0fVxuXHR9XG5cblx0Ly8gV2UgY2FuIG1vdmUgYm90aCBuZXh0IGFjdGlvbnMgb3V0IG9mIGxvb3AsIGJlY2F1c2UgcmVtYWluaW5nIGFjdGlvbnMgaW4gbG9vcCB3b24ndCBoYXZlXG5cdC8vIGFueS92aXNpYmxlIGVmZmVjdCBvbiBwYXJ0cyB3ZSBhZGQgaGVyZS4gQ2xvc2UgdGhlIHN0eWxpbmcgYmVmb3JlIGEgbGluZWJyZWFrIGFuZCByZW9wZW5cblx0Ly8gYWZ0ZXIgbmV4dCBsaW5lIHRvIGZpeCBhIGJsZWVkIGlzc3VlIG9uIG1hY09TOiBodHRwczovL2dpdGh1Yi5jb20vY2hhbGsvY2hhbGsvcHVsbC85MlxuXHRjb25zdCBsZkluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuXHRpZiAobGZJbmRleCAhPT0gLTEpIHtcblx0XHRzdHJpbmcgPSBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBjbG9zZUFsbCwgb3BlbkFsbCwgbGZJbmRleCk7XG5cdH1cblxuXHRyZXR1cm4gb3BlbkFsbCArIHN0cmluZyArIGNsb3NlQWxsO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY3JlYXRlQ2hhbGsucHJvdG90eXBlLCBzdHlsZXMpO1xuXG5jb25zdCBjaGFsayA9IGNyZWF0ZUNoYWxrKCk7XG5leHBvcnQgY29uc3QgY2hhbGtTdGRlcnIgPSBjcmVhdGVDaGFsayh7bGV2ZWw6IHN0ZGVyckNvbG9yID8gc3RkZXJyQ29sb3IubGV2ZWwgOiAwfSk7XG5cbmV4cG9ydCB7XG5cdG1vZGlmaWVyTmFtZXMsXG5cdGZvcmVncm91bmRDb2xvck5hbWVzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyxcblx0Y29sb3JOYW1lcyxcblxuXHQvLyBUT0RPOiBSZW1vdmUgdGhlc2UgYWxpYXNlcyBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG5cdG1vZGlmaWVyTmFtZXMgYXMgbW9kaWZpZXJzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyBhcyBmb3JlZ3JvdW5kQ29sb3JzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyBhcyBiYWNrZ3JvdW5kQ29sb3JzLFxuXHRjb2xvck5hbWVzIGFzIGNvbG9ycyxcbn0gZnJvbSAnLi92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMnO1xuXG5leHBvcnQge1xuXHRzdGRvdXRDb2xvciBhcyBzdXBwb3J0c0NvbG9yLFxuXHRzdGRlcnJDb2xvciBhcyBzdXBwb3J0c0NvbG9yU3RkZXJyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hhbGs7XG4iLCIvLyBUT0RPOiBXaGVuIHRhcmdldGluZyBOb2RlLmpzIDE2LCB1c2UgYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbGAuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN1YnN0cmluZywgcmVwbGFjZXIpIHtcblx0bGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKTtcblx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBzdHJpbmc7XG5cdH1cblxuXHRjb25zdCBzdWJzdHJpbmdMZW5ndGggPSBzdWJzdHJpbmcubGVuZ3RoO1xuXHRsZXQgZW5kSW5kZXggPSAwO1xuXHRsZXQgcmV0dXJuVmFsdWUgPSAnJztcblx0ZG8ge1xuXHRcdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCwgaW5kZXgpICsgc3Vic3RyaW5nICsgcmVwbGFjZXI7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIHN1YnN0cmluZ0xlbmd0aDtcblx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleChzdHJpbmcsIHByZWZpeCwgcG9zdGZpeCwgaW5kZXgpIHtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRjb25zdCBnb3RDUiA9IHN0cmluZ1tpbmRleCAtIDFdID09PSAnXFxyJztcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIChnb3RDUiA/IGluZGV4IC0gMSA6IGluZGV4KSkgKyBwcmVmaXggKyAoZ290Q1IgPyAnXFxyXFxuJyA6ICdcXG4nKSArIHBvc3RmaXg7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIDE7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZignXFxuJywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cbiIsImNvbnN0IEFOU0lfQkFDS0dST1VORF9PRkZTRVQgPSAxMDtcblxuY29uc3Qgd3JhcEFuc2kxNiA9IChvZmZzZXQgPSAwKSA9PiBjb2RlID0+IGBcXHUwMDFCWyR7Y29kZSArIG9mZnNldH1tYDtcblxuY29uc3Qgd3JhcEFuc2kyNTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTs1OyR7Y29kZX1tYDtcblxuY29uc3Qgd3JhcEFuc2kxNm0gPSAob2Zmc2V0ID0gMCkgPT4gKHJlZCwgZ3JlZW4sIGJsdWUpID0+IGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzI7JHtyZWR9OyR7Z3JlZW59OyR7Ymx1ZX1tYDtcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRtb2RpZmllcjoge1xuXHRcdHJlc2V0OiBbMCwgMF0sXG5cdFx0Ly8gMjEgaXNuJ3Qgd2lkZWx5IHN1cHBvcnRlZCBhbmQgMjIgZG9lcyB0aGUgc2FtZSB0aGluZ1xuXHRcdGJvbGQ6IFsxLCAyMl0sXG5cdFx0ZGltOiBbMiwgMjJdLFxuXHRcdGl0YWxpYzogWzMsIDIzXSxcblx0XHR1bmRlcmxpbmU6IFs0LCAyNF0sXG5cdFx0b3ZlcmxpbmU6IFs1MywgNTVdLFxuXHRcdGludmVyc2U6IFs3LCAyN10sXG5cdFx0aGlkZGVuOiBbOCwgMjhdLFxuXHRcdHN0cmlrZXRocm91Z2g6IFs5LCAyOV0sXG5cdH0sXG5cdGNvbG9yOiB7XG5cdFx0YmxhY2s6IFszMCwgMzldLFxuXHRcdHJlZDogWzMxLCAzOV0sXG5cdFx0Z3JlZW46IFszMiwgMzldLFxuXHRcdHllbGxvdzogWzMzLCAzOV0sXG5cdFx0Ymx1ZTogWzM0LCAzOV0sXG5cdFx0bWFnZW50YTogWzM1LCAzOV0sXG5cdFx0Y3lhbjogWzM2LCAzOV0sXG5cdFx0d2hpdGU6IFszNywgMzldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmxhY2tCcmlnaHQ6IFs5MCwgMzldLFxuXHRcdGdyYXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0Z3JleTogWzkwLCAzOV0sIC8vIEFsaWFzIG9mIGBibGFja0JyaWdodGBcblx0XHRyZWRCcmlnaHQ6IFs5MSwgMzldLFxuXHRcdGdyZWVuQnJpZ2h0OiBbOTIsIDM5XSxcblx0XHR5ZWxsb3dCcmlnaHQ6IFs5MywgMzldLFxuXHRcdGJsdWVCcmlnaHQ6IFs5NCwgMzldLFxuXHRcdG1hZ2VudGFCcmlnaHQ6IFs5NSwgMzldLFxuXHRcdGN5YW5CcmlnaHQ6IFs5NiwgMzldLFxuXHRcdHdoaXRlQnJpZ2h0OiBbOTcsIDM5XSxcblx0fSxcblx0YmdDb2xvcjoge1xuXHRcdGJnQmxhY2s6IFs0MCwgNDldLFxuXHRcdGJnUmVkOiBbNDEsIDQ5XSxcblx0XHRiZ0dyZWVuOiBbNDIsIDQ5XSxcblx0XHRiZ1llbGxvdzogWzQzLCA0OV0sXG5cdFx0YmdCbHVlOiBbNDQsIDQ5XSxcblx0XHRiZ01hZ2VudGE6IFs0NSwgNDldLFxuXHRcdGJnQ3lhbjogWzQ2LCA0OV0sXG5cdFx0YmdXaGl0ZTogWzQ3LCA0OV0sXG5cblx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRiZ0JsYWNrQnJpZ2h0OiBbMTAwLCA0OV0sXG5cdFx0YmdHcmF5OiBbMTAwLCA0OV0sIC8vIEFsaWFzIG9mIGBiZ0JsYWNrQnJpZ2h0YFxuXHRcdGJnR3JleTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ1JlZEJyaWdodDogWzEwMSwgNDldLFxuXHRcdGJnR3JlZW5CcmlnaHQ6IFsxMDIsIDQ5XSxcblx0XHRiZ1llbGxvd0JyaWdodDogWzEwMywgNDldLFxuXHRcdGJnQmx1ZUJyaWdodDogWzEwNCwgNDldLFxuXHRcdGJnTWFnZW50YUJyaWdodDogWzEwNSwgNDldLFxuXHRcdGJnQ3lhbkJyaWdodDogWzEwNiwgNDldLFxuXHRcdGJnV2hpdGVCcmlnaHQ6IFsxMDcsIDQ5XSxcblx0fSxcbn07XG5cbmV4cG9ydCBjb25zdCBtb2RpZmllck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLm1vZGlmaWVyKTtcbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kQ29sb3JOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5jb2xvcik7XG5leHBvcnQgY29uc3QgYmFja2dyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuYmdDb2xvcik7XG5leHBvcnQgY29uc3QgY29sb3JOYW1lcyA9IFsuLi5mb3JlZ3JvdW5kQ29sb3JOYW1lcywgLi4uYmFja2dyb3VuZENvbG9yTmFtZXNdO1xuXG5mdW5jdGlvbiBhc3NlbWJsZVN0eWxlcygpIHtcblx0Y29uc3QgY29kZXMgPSBuZXcgTWFwKCk7XG5cblx0Zm9yIChjb25zdCBbZ3JvdXBOYW1lLCBncm91cF0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVzKSkge1xuXHRcdGZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGdyb3VwKSkge1xuXHRcdFx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0XHRcdG9wZW46IGBcXHUwMDFCWyR7c3R5bGVbMF19bWAsXG5cdFx0XHRcdGNsb3NlOiBgXFx1MDAxQlske3N0eWxlWzFdfW1gLFxuXHRcdFx0fTtcblxuXHRcdFx0Z3JvdXBbc3R5bGVOYW1lXSA9IHN0eWxlc1tzdHlsZU5hbWVdO1xuXG5cdFx0XHRjb2Rlcy5zZXQoc3R5bGVbMF0sIHN0eWxlWzFdKTtcblx0XHR9XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCBncm91cE5hbWUsIHtcblx0XHRcdHZhbHVlOiBncm91cCxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgJ2NvZGVzJywge1xuXHRcdHZhbHVlOiBjb2Rlcyxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0fSk7XG5cblx0c3R5bGVzLmNvbG9yLmNsb3NlID0gJ1xcdTAwMUJbMzltJztcblx0c3R5bGVzLmJnQ29sb3IuY2xvc2UgPSAnXFx1MDAxQls0OW0nO1xuXG5cdHN0eWxlcy5jb2xvci5hbnNpID0gd3JhcEFuc2kxNigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTI1NiA9IHdyYXBBbnNpMjU2KCk7XG5cdHN0eWxlcy5jb2xvci5hbnNpMTZtID0gd3JhcEFuc2kxNm0oKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NihBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXG5cdC8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL1FpeC0vY29sb3ItY29udmVydC9ibG9iLzNmMGUwZDRlOTJlMjM1Nzk2Y2NiMTdmNmU4NWM3MjA5NGE2NTFmNDkvY29udmVyc2lvbnMuanNcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3R5bGVzLCB7XG5cdFx0cmdiVG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZShyZWQsIGdyZWVuLCBibHVlKSB7XG5cdFx0XHRcdC8vIFdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdFx0XHRcdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRcdFx0XHRpZiAocmVkID09PSBncmVlbiAmJiBncmVlbiA9PT0gYmx1ZSkge1xuXHRcdFx0XHRcdGlmIChyZWQgPCA4KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMTY7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHJlZCA+IDI0OCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDIzMTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHJlZCAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAxNlxuXHRcdFx0XHRcdCsgKDM2ICogTWF0aC5yb3VuZChyZWQgLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrICg2ICogTWF0aC5yb3VuZChncmVlbiAvIDI1NSAqIDUpKVxuXHRcdFx0XHRcdCsgTWF0aC5yb3VuZChibHVlIC8gMjU1ICogNSk7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb1JnYjoge1xuXHRcdFx0dmFsdWUoaGV4KSB7XG5cdFx0XHRcdGNvbnN0IG1hdGNoZXMgPSAvW2EtZlxcZF17Nn18W2EtZlxcZF17M30vaS5leGVjKGhleC50b1N0cmluZygxNikpO1xuXHRcdFx0XHRpZiAoIW1hdGNoZXMpIHtcblx0XHRcdFx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IFtjb2xvclN0cmluZ10gPSBtYXRjaGVzO1xuXG5cdFx0XHRcdGlmIChjb2xvclN0cmluZy5sZW5ndGggPT09IDMpIHtcblx0XHRcdFx0XHRjb2xvclN0cmluZyA9IFsuLi5jb2xvclN0cmluZ10ubWFwKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIgKyBjaGFyYWN0ZXIpLmpvaW4oJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgaW50ZWdlciA9IE51bWJlci5wYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDE2KSAmIDB4RkYsXG5cdFx0XHRcdFx0KGludGVnZXIgPj4gOCkgJiAweEZGLFxuXHRcdFx0XHRcdGludGVnZXIgJiAweEZGLFxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRdO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZTogaGV4ID0+IHN0eWxlcy5yZ2JUb0Fuc2kyNTYoLi4uc3R5bGVzLmhleFRvUmdiKGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRhbnNpMjU2VG9BbnNpOiB7XG5cdFx0XHR2YWx1ZShjb2RlKSB7XG5cdFx0XHRcdGlmIChjb2RlIDwgOCkge1xuXHRcdFx0XHRcdHJldHVybiAzMCArIGNvZGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY29kZSA8IDE2KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDkwICsgKGNvZGUgLSA4KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCByZWQ7XG5cdFx0XHRcdGxldCBncmVlbjtcblx0XHRcdFx0bGV0IGJsdWU7XG5cblx0XHRcdFx0aWYgKGNvZGUgPj0gMjMyKSB7XG5cdFx0XHRcdFx0cmVkID0gKCgoY29kZSAtIDIzMikgKiAxMCkgKyA4KSAvIDI1NTtcblx0XHRcdFx0XHRncmVlbiA9IHJlZDtcblx0XHRcdFx0XHRibHVlID0gcmVkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvZGUgLT0gMTY7XG5cblx0XHRcdFx0XHRjb25zdCByZW1haW5kZXIgPSBjb2RlICUgMzY7XG5cblx0XHRcdFx0XHRyZWQgPSBNYXRoLmZsb29yKGNvZGUgLyAzNikgLyA1O1xuXHRcdFx0XHRcdGdyZWVuID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA2KSAvIDU7XG5cdFx0XHRcdFx0Ymx1ZSA9IChyZW1haW5kZXIgJSA2KSAvIDU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IE1hdGgubWF4KHJlZCwgZ3JlZW4sIGJsdWUpICogMjtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gMzA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gMzAgKyAoKE1hdGgucm91bmQoYmx1ZSkgPDwgMikgfCAoTWF0aC5yb3VuZChncmVlbikgPDwgMSkgfCBNYXRoLnJvdW5kKHJlZCkpO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdFx0XHRcdHJlc3VsdCArPSA2MDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRyZ2JUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiAocmVkLCBncmVlbiwgYmx1ZSkgPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLnJnYlRvQW5zaTI1NihyZWQsIGdyZWVuLCBibHVlKSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaToge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMuYW5zaTI1NlRvQW5zaShzdHlsZXMuaGV4VG9BbnNpMjU2KGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuY29uc3QgYW5zaVN0eWxlcyA9IGFzc2VtYmxlU3R5bGVzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFuc2lTdHlsZXM7XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuY29uc3QgbGV2ZWwgPSAoKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudERhdGEpIHtcblx0XHRjb25zdCBicmFuZCA9IG5hdmlnYXRvci51c2VyQWdlbnREYXRhLmJyYW5kcy5maW5kKCh7YnJhbmR9KSA9PiBicmFuZCA9PT0gJ0Nocm9taXVtJyk7XG5cdFx0aWYgKGJyYW5kICYmIGJyYW5kLnZlcnNpb24gPiA5Mykge1xuXHRcdFx0cmV0dXJuIDM7XG5cdFx0fVxuXHR9XG5cblx0aWYgKC9cXGIoQ2hyb21lfENocm9taXVtKVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0cmV0dXJuIDA7XG59KSgpO1xuXG5jb25zdCBjb2xvclN1cHBvcnQgPSBsZXZlbCAhPT0gMCAmJiB7XG5cdGxldmVsLFxuXHRoYXNCYXNpYzogdHJ1ZSxcblx0aGFzMjU2OiBsZXZlbCA+PSAyLFxuXHRoYXMxNm06IGxldmVsID49IDMsXG59O1xuXG5jb25zdCBzdXBwb3J0c0NvbG9yID0ge1xuXHRzdGRvdXQ6IGNvbG9yU3VwcG9ydCxcblx0c3RkZXJyOiBjb2xvclN1cHBvcnQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0c0NvbG9yO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwiSURFQXNwZWN0czpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL19pZGVGaWxlcy9JREVBc3BlY3RzL0RhdGVQaWNrZXJBc3BlY3QvXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiRGF0ZVBpY2tlckFzcGVjdFwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblxufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua0lERUFzcGVjdHNcIl0gPSBzZWxmW1wid2VicGFja0NodW5rSURFQXNwZWN0c1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiaW1wb3J0IHsgRGF0ZVRpbWUsIE9wdGlvbnMsIFRlbXB1c0RvbWludXMgfSBmcm9tICdAZW9uYXNkYW4vdGVtcHVzLWRvbWludXMnO1xyXG4vL2h0dHBzOi8vZ2V0ZGF0ZXBpY2tlci5jb20vNi9vcHRpb25zL2Rpc3BsYXkuaHRtbFxyXG5pbXBvcnQgeyBJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnMsIERBVEVfUElDS0VSX0RFRkFVTFRTLCBEQVRFX1BJQ0tFUl9XSURHRVRfREVGQVVMVFMgfSBmcm9tIFwiLi9EYXRlUGlja2VyQXNwZWN0Q29uZmlndXJhdGlvblwiO1xyXG5pbXBvcnQgeyBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnLCBJV2lkZ2V0SnNvbiB9IGZyb20gJy4uL0Jhc2VDbGFzc2VzL0ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBCYXNlSURFQXNwZWN0LCBnZXRGb3JtQnVpbGRlckZpZWxkUGF0aCB9IGZyb20gJy4uL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3QnO1xyXG5pbXBvcnQgeyBERUJVR19ERUZBVUxUIH0gZnJvbSAnLi4vQmFzZUNsYXNzZXMvRGVmYXVsdFNldHRpbmdzJztcclxuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcclxuaW1wb3J0IHsgZXZhbHV0ZVJ1bGUsIGV4ZWN1dGVFbWJlZGRlZENvZGUgfSBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL2V2YWx1dGVSdWxlJztcclxuXHJcbmxldCB0aGlzV2lkZ2V0U3lzdGVtTmFtZSA9IFwiRGF0ZVBpY2tlckFzcGVjdFwiO1xyXG5cclxuLy8gXCJmaWVsZFBhdGhcIjogXCJmb3JtLWFsdC1lZGlzY292ZXJ5LWpvYi1kZXNpcmVkLWNvbXBsZXRpb24tZGF0ZS1kYXRlLW9ubHkuam9iLWRlc2lyZWQtY29tcGxldGlvbi1kYXRlXCIsXHJcbi8vIFwidGl0bGVcIjogXCJEZXNpcmVkIERhdGVcIixcclxuLy9hZGQgc3R5bGUgdG8gaGVhZDogaHR0cHM6Ly91bnBrZy5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy13ZWJAbGF0ZXN0L2Rpc3QvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIubWluLmNzc1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJBc3BlY3QgZXh0ZW5kcyBCYXNlSURFQXNwZWN0PElEYXRlUGlja2VyQXNwZWN0T3B0aW9ucywgYW55PiB7XHJcbiAgICBsaXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvYWRBbmRCaW5kKCk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKG5ld0NvbmZpZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gICAgfVxyXG4gICAgcmVzZXQobmV3Q29uZmlnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRhdGVQaWNrZXJEaXY6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgZGF0ZVRpbWVQaWNrZXI6IFRlbXB1c0RvbWludXMgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgLy8gY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElEYXRlUGlja2VyQXNwZWN0T3B0aW9ucywgYmFzZU1vZGVsOiBhbnkpIHtcclxuICAgIC8vICAgICBzdXBlcihcIlNpbmdsZVZhbHVlQXNwZWN0XCIsIFwiYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXJcIiwgZWxlbWVudCwgY29uZmlndXJhdGlvbiwgYmFzZU1vZGVsKVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vQWJzdHJhY3QgbWV0aG9kcyAtIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGRlcml2ZWQgY2xhc3NcclxuXHJcbiAgICBzZXRUaGlzQ29tcG9uZW50TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkRhdGVQaWNrZXJBc3BlY3RcIjtcclxuICAgIH1cclxuICAgIHNldHVwKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5oZWFkLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zXCI+YCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldFdpZGdldEpzb25TZXR0aW5ncygpOiBJV2lkZ2V0SnNvbjxJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnM+IHtcclxuICAgICAgICByZXR1cm4gREFURV9QSUNLRVJfV0lER0VUX0RFRkFVTFRTO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlZmF1bHRzKCk6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8SURhdGVQaWNrZXJBc3BlY3RPcHRpb25zPiB7XHJcbiAgICAgICAgcmV0dXJuIERBVEVfUElDS0VSX0RFRkFVTFRTO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQWJzdHJhY3QgbWV0aG9kcyAtIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGRlcml2ZWQgY2xhc3NcclxuICAgIHNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uLmZvcm1CdWlsZGVyRmllbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnIoXCJObyBmb3JtYnVpbGRlciBmaWVsZCBzZXQgaW4gY29uZmlndXJhdGlvbiAtIGNoZWNrIGFzcGVjdCBjb25maWd1cmF0aW9uXCIpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmb3JtYnVpbGRlciBmaWVsZCBzZXQgaW4gY29uZmlndXJhdGlvbiAtIGNoZWNrIGFzcGVjdCBjb25maWd1cmF0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZvcm1CdWlsZGVyRmllbGQgPSBleGVjdXRlRW1iZWRkZWRDb2RlKHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbi5mb3JtQnVpbGRlckZpZWxkLCB0aGlzLmdldERhdGFDb250ZXh0KCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZ2V0Rm9ybUJ1aWxkZXJGaWVsZFBhdGgoZm9ybUJ1aWxkZXJGaWVsZCk7XHJcbiAgICB9XHJcbiAgICBnZXREYXRhQ29udGV4dCgpOiBhbnkge1xyXG4gICAgICAgIGxldCBkYXRhQ29udGV4dCA9IGtvLnRvSlModGhpcy5tb2RlbCkgYXMgYW55O1xyXG4gICAgICAgIGxldCBmb3JtQnVpbGRlckRhdGE9IHRoaXMuZm9ybWJ1aWxkZXIoKTtcclxuICAgICAgICBkYXRhQ29udGV4dFtcImZvcm1CdWlsZGVyXCJdID0gZm9ybUJ1aWxkZXJEYXRhOyAvL3RvIG1ha2UgaXQgZWFzaWVyIHRvIGFjY2VzcyB0aGUgZm9ybWJ1aWxkZXIgZGF0YVxyXG4gICAgICAgIHJldHVybiBkYXRhQ29udGV4dDtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIGdldFZhbHVlVG9Qb3B1bGF0ZSgpICB7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhQ29udGV4dCA9IHRoaXMuZ2V0RGF0YUNvbnRleHQoKTtcclxuICAgICAgICBsZXQgcmV0VmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGV4ZWN1dGVFbWJlZGRlZENvZGUodGhpcy5jb25maWd1cmF0aW9uPy5mb3JtQnVpbGRlckZpZWxkLGRhdGFDb250ZXh0KSB8fCBcIlwiO1xyXG5cclxuICAgICAgICBpZihyZXRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldFZhbHVlID0gYXdhaXQgdGhpcy5nZXREYXRhKClcclxuICAgICAgICAgICAgaWYocmV0VmFsdWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldFZhbHVlID0gSlNPTi5zdHJpbmdpZnkocmV0VmFsdWUsIG51bGwsIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24/LmdldFZhbHVlT3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlndXJhdGlvbj8uZ2V0VmFsdWVPcHRpb25zID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGV4ZWN1dGVFbWJlZGRlZENvZGUodGhpcy5jb25maWd1cmF0aW9uPy5nZXRWYWx1ZU9wdGlvbnMsIGRhdGFDb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb25maWd1cmF0aW9uPy5nZXRWYWx1ZU9wdGlvbnMpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jb25maWd1cmF0aW9uLmdldFZhbHVlT3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0VmFsdWVPcHRpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gdGhpcy5jb25maWd1cmF0aW9uLmdldFZhbHVlT3B0aW9uc1tpXTtcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGV2YWx1dGVSdWxlKG9wdGlvbi5ydWxlLCBkYXRhQ29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldFZhbHVlID0gYXdhaXQgdGhpcy5zZWFyY2hCeUdyYXBoKG9wdGlvbi5maWVsZFBhdGgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy93ZSBzdG9wIGFzIHNvb24gYXMgd2UgaGF2ZSBhIHRydWUgcnVsZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQaWNrZXJFbmFibGVkU3RhdGUobmV3VmFsdWU6IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVQaWNrZXJEaXYpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2FuYXRpc2UgdGhlIGRhdGEgYmVmb3JlIHNhdmluZywgZm9ybSBidWlsZCBkYXRhIG5lZWRzIHRvIGJlIGEgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHNldE1vZGVsRGF0YUFzRGF0ZShuZXdWYWx1ZTogRGF0ZVRpbWUgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEobmV3VmFsdWU/LnRvSVNPU3RyaW5nKCkgfHwgdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiBHZXRzIHRoZSBkYXRhIGZyb20gZm9ybSBidWlsZGVyIGFuZCBjb252ZXJ0cyB0byBEYXRlVGltZVxyXG4gICAgICovXHJcbiAgICBhc3luYyBnZXRNb2RlbERhdGFBc0RhdGUoKSB7XHJcbiAgICAgICAgbGV0IHJldFZhbHVlOiBEYXRlVGltZVxyXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gYXdhaXQgdGhpcy5nZXRWYWx1ZVRvUG9wdWxhdGUoKTtcclxuXHJcbiAgICAgICAgLy8gIGxldCBmb3VuZFZhbHVlID0gYXdhaXQgdGhpcy5nZXREYXRhKGZpZWxkUGF0aCk7XHJcbiAgICAgICAgaWYgKCFmb3VuZFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5nZW5lcmF0ZURlZmF1bHREYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5lbnN1cmVEYXRlKGZvdW5kVmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRNb2RlbERhdGFBc0RhdGUocmV0VmFsdWUpOyAvL3NldCB0aGUgdmFsdWUgdG8gZW5zdXJlIGl0IGlzIHZhbGlkXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyBnZXQgdG9kYXkgZGF0ZSArIGRlZmF1bHREYXRlRnJvbU5vd0hvdXJzIChpZiBzZXQgaW4gY29uZmlndXJhdGlvbilcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZURlZmF1bHREYXRlKCkge1xyXG4gICAgICAgIGxldCBkZWZhdWx0RGF0ZSA9IG5ldyBEYXRlVGltZShEYXRlVGltZS5ub3coKSk7XHJcbiAgICAgICAgbGV0IGRlZmF1bHREYXRlRnJvbU5vd0hvdXJzID0gdGhpcy5vcHRpb25zPy5kZWZhdWx0VmFsdWUoKS5kZWZhdWx0RGF0ZUZyb21Ob3dIb3VycygpO1xyXG4gICAgICAgIGlmIChkZWZhdWx0RGF0ZUZyb21Ob3dIb3Vycykge1xyXG4gICAgICAgICAgICBkZWZhdWx0RGF0ZS5zZXRIb3VycyhkZWZhdWx0RGF0ZS5nZXRIb3VycygpICsgZGVmYXVsdERhdGVGcm9tTm93SG91cnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVmYXVsdERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayBhZnRlciBpbml0aWFsIGNyZWF0aW9uIGFuZCBiaW5kaW5nIHRvIGxvYWQgZGF0YVxyXG4gICAgICogaW50byBpdCdzIG1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGxvYWRBbmRCaW5kKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5JREVBc3BlY3RzLURhdGVQaWNrZXJBc3BlY3RcIik7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gZWxlbWVudCBmb3VuZFwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiBhbHJlYWR5IGV4aXN0cyByZW1vdmUgaXRcclxuICAgICAgICBpZiAodGhpcy5kYXRlUGlja2VyRGl2KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiQWxyZWFkeSBleGlzdHNcIiwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRhdGVUaW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVQaWNrZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9CdWlsZCB0aGUgZGF0ZSBwaWNrZXIgZGl2IFxyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyRGl2LmNsYXNzTGlzdC5hZGQoXCJ0aGUtcGlja2VyXCIpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5jbGFzc0xpc3QuYWRkKFwibG9nLWV2ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5pZCA9IHRoaXMudW5pcXVlSWQ7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBpbnB1dC5pZCA9IHRoaXMudW5pcXVlSWQgKyBcIklucHV0XCI7XHJcbiAgICAgICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiZGF0YS10ZC10YXJnZXRcIiwgXCIjXCIgKyB0aGlzLnVuaXF1ZUlkKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucz8uaGlkZUlucHV0Qm94KCkpIHtcclxuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPy5oaWRlSW5wdXRCb3guc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gICAgICAgIC8vIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgLy8gc3Bhbi5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZ3JvdXAtdGV4dFwiKTtcclxuICAgICAgICAvLyBzcGFuLnNldEF0dHJpYnV0ZShcImRhdGEtdGQtdGFyZ2V0XCIsIFwiI1wiICsgdGhpcy51bmlxdWVJZCk7XHJcbiAgICAgICAgLy8gc3Bhbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRkLXRvZ2dsZVwiLCBcImRhdGV0aW1lcGlja2VyXCIpO1xyXG4gICAgICAgIC8vIGxldCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7IFxyXG4gICAgICAgIC8vIGkuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAvLyBpLmNsYXNzTGlzdC5hZGQoXCJmYS1jYWxlbmRhclwiKTtcclxuICAgICAgICAvLyBzcGFuLmFwcGVuZENoaWxkKGkpOyBcclxuICAgICAgICAvLyB0aGlzLmRhdGVQaWNrZXJEaXYuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5kYXRlUGlja2VyRGl2KTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGVQaWNrZXJPcHRpb24gPSBrby50b0pTKHRoaXMub3B0aW9ucz8uZGF0ZVBpY2tlck9wdGlvbnMoKSkgYXMgT3B0aW9ucyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZVBpY2tlciA9IG5ldyBUZW1wdXNEb21pbnVzKHRoaXMuZGF0ZVBpY2tlckRpdiwgZGF0ZVBpY2tlck9wdGlvbik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMub3B0aW9ucz8uZGF0ZVBpY2tlck9wdGlvbnMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4geyAvLy8hIGNhdXNpbmcgcmVjdXJyaW5nXHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmxvYWRBbmRCaW5kKCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGlja2VyRW5hYmxlZFN0YXRlKHRoaXMub3B0aW9ucz8ucGlja2VyRW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgLy9TZXQgdGhlIHZhbHVlIG9mIHRoZSBwaWNrZXIgdG8gdGhlIHZhbHVlIGluIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICBsZXQgZGF0ZVRvU2V0ID0gYXdhaXQgdGhpcy5nZXRNb2RlbERhdGFBc0RhdGUoKVxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lUGlja2VyLmRhdGVzLnNldFZhbHVlKFxyXG4gICAgICAgICAgICAgICAgZGF0ZVRvU2V0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZVBpY2tlci5kYXRlcy5sYXN0UGlja2VkSW5kZXhcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVQaWNrZXIuc3Vic2NyaWJlKFwiY2hhbmdlLnRkXCIsIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKFwiRGF0ZSBDaGFuZ2VkXCIsIFwicmVkXCIsIGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zPy5ldmVudFRvRmlyZU9uVXBkYXRlKCk/LmZvckVhY2goKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHVpLmV2ZW50cy5icm9hZGNhc3QoZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1idWlsZGVyRmllbGQ6IHRoaXMub3B0aW9ucz8uZm9ybUJ1aWxkZXJGaWVsZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2V0Q3VycmVudFNlbGVjdGVkRGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAvL2ZpcmUgZXZlbnQgYW5kIHBhc3MgaW4gdGhlIGRhdGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb2RlbERhdGFBc0RhdGUodGhpcy5nZXRDdXJyZW50U2VsZWN0ZWREYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJFcnJvciBwYXJzaW5nIGRhdGUgcGlja2VyIG9wdGlvbnNcIiwgXCJyZWRcIiwgZSk7XHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGVycm9yIGRpdlxyXG4gICAgICAgICAgICBsZXQgZXJyb3JEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBlcnJvckRpdi5jbGFzc0xpc3QuYWRkKFwiYWxlcnRcIik7XHJcbiAgICAgICAgICAgIGVycm9yRGl2LmNsYXNzTGlzdC5hZGQoXCJhbGVydC1kYW5nZXJcIik7XHJcbiAgICAgICAgICAgIGVycm9yRGl2LmNsYXNzTGlzdC5hZGQoXCJhbGVydC1kaXNtaXNzaWJsZVwiKTtcclxuICAgICAgICAgICAgZXJyb3JEaXYuY2xhc3NMaXN0LmFkZChcImZhZGVcIik7XHJcbiAgICAgICAgICAgIGVycm9yRGl2LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xyXG4gICAgICAgICAgICBlcnJvckRpdi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYWxlcnRcIik7XHJcbiAgICAgICAgICAgIGVycm9yRGl2LmlubmVySFRNTCA9IGA8c3Ryb25nPkVycm9yIHBhcnNpbmcgZGF0ZSBwaWNrZXIgb3B0aW9uczwvc3Ryb25nPiAtIGNoZWNrIGFzcGVjdCBjb25maWd1cmF0aW9uIDxicj4gJHtlfWA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJEaXYuYXBwZW5kQ2hpbGQoZXJyb3JEaXYpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5zdXJlIHRoZSBkYXRlIGlzIGEgdmFsaWQgZGF0ZVxyXG4gICAgICAgICogQHBhcmFtIGRcclxuICAgICAgICAqIEByZXR1cm5zIGEgRGF0ZVRpbWUgYmFzZWQgb24gdGhlIGlucHV0IG9yIGEgZGVmYXVsdCBkYXRlIGlmIHRoZSBpbnB1dCBpcyBub3QgdmFsaWRcclxuICAgICoqL1xyXG4gICAgZW5zdXJlRGF0ZShkOiBhbnkpOiBEYXRlVGltZSB7XHJcbiAgICAgICAgbGV0IHJldFZhbHVlOiBEYXRlVGltZTtcclxuICAgICAgICAvL2NoZWNrIGlmIGQgaXMgYSBkYXRlXHJcbiAgICAgICAgaWYgKGQgaW5zdGFuY2VvZiBEYXRlVGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldFZhbHVlID0gbmV3IERhdGVUaW1lKERhdGVUaW1lLnBhcnNlKGQpKTtcclxuICAgICAgICAgICAgaWYgKCFEYXRlVGltZS5pc1ZhbGlkKHJldFZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmdlbmVyYXRlRGVmYXVsdERhdGUoKTs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKGBVbmFibGUgdG8gcGFyc2UgZGF0ZSAke2R9IChzZXR0aW5nIGRhdGUgdG8gZGVmYXVsdCBkYXRlKSAtIGNoZWNrIGFzcGVjdCBjb25maWd1cmF0aW9uIGAsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuZ2VuZXJhdGVEZWZhdWx0RGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBsb2FkKG1vZGVsOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmxvZyhcIkxvYWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbG9hZChtb2RlbDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5sb2coXCJSZWxvYWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEN1cnJlbnRTZWxlY3RlZERhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVQaWNrZXI/LmRhdGVzLnBpY2tlZFswXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgb25TYXZlKG1vZGVsOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmxvZyhcIlNhdmVcIik7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlbERhdGFBc0RhdGUodGhpcy5nZXRDdXJyZW50U2VsZWN0ZWREYXRlKCkpO1xyXG4gICAgICAgIHN1cGVyLm9uU2F2ZShtb2RlbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=