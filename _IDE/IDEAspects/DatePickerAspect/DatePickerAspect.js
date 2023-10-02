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
    return getValueFromKOObject(koObject);
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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/EventsHelper */ "./src/WebBased/Common/EventsHelper.ts");
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Common/Log */ "./src/Common/Log.ts");
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Common/ObjectHelper */ "./src/WebBased/Common/ObjectHelper.ts");
/* harmony import */ var _Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Common/HtmlHelper */ "./src/Common/HtmlHelper.ts");
/* harmony import */ var _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Common/JsonToHTMLConverter */ "./src/Common/JsonToHTMLConverter.ts");
/* harmony import */ var _Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Common/api/searchForAttributeWithParents */ "./src/WebBased/Common/api/searchForAttributeWithParents.ts");
/* harmony import */ var _DebugDefaults__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DebugDefaults */ "./src/WebBased/IDEAspects/BaseClasses/DebugDefaults.ts");










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
            this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_9__["default"])();
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
        this.sharedoConfiguration.configuration.debug = $.extend((0,_DebugDefaults__WEBPACK_IMPORTED_MODULE_8__.DEBUG_DEFAULT)(), this.sharedoConfiguration.configuration.debug); //make sure debug is set or use defaults
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
        this.sharedoId = this.sharedoConfiguration._host?.model.id || $ui.pageContext?.sharedoId || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName = this.sharedoConfiguration._host?.model?.sharedoTypeSystemName || $ui.pageContext?.sharedoTypeName || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        if (!this.sharedoTypeSystemName || !this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }
        this.parentSharedoId = this.sharedoConfiguration._host?.model?.parentSharedoId || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        this.phaseName = this.sharedoConfiguration._host?.model?.phaseName || $ui.pageContext?.phaseName || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        this.phaseIsOpen = this.sharedoConfiguration._host?.model?.phaseIsOpen || $ui.pageContext?.phaseIsOpen || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
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
        this._options = configurationAsObservables;
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
        if (this.liveConfigDiv) { //leave alone if already active
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
        setTimeout(() => {
            config.subscribe((newValue) => {
                // console.log("The new value is " + newValue)
                if (timeout) {
                    return;
                }
                setTimeout(() => {
                    timeout = false;
                    let newConfig = JSON.parse(config());
                    this.applyComponentConfiguration(newConfig.configuration);
                    this.liveConfigurationRefreshed();
                    // this.refresh(newConfig);
                    // this.reset(newConfig);
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
        if (this.lastRefresh) //TODO: change this so we collect all refreshes and do them in one go
         {
            let secondsSinceLastRefresh = (new Date().getTime() - this.lastRefresh.getTime()) / 100;
            console.log("Seconds since last refresh", secondsSinceLastRefresh);
            if (secondsSinceLastRefresh < 10) {
                console.log("Skipping refresh, too soon");
                return;
            }
        }
        this.lastRefresh = new Date();
        console.log("Refreshing component");
        let logItem = { eventPath: eventPath, methodToCall: methodToCall, time: new Date(), success: false };
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
        if (this._options?.debug().supportRequestEnabled) {
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
    ;
    async getData() {
        if (this._data) {
            return this._data;
        }
        //This section is d=use due to typing issue that needs to be resolved.
        // let useParents = gvko(this._options.dataSettings().getValueUsingParents) as boolean | undefined
        // let shareDoId= gvko(this.sharedoId)
        // let maxDepth = gvko(this._options.dataSettings().maxDepth) as number | undefined
        // let LocationToSaveOrLoadData = gvko(this.LocationToSaveOrLoadData) as string | undefined
        //end area of typing issue
        let useParents = this._options?.dataSettings().getValueUsingParents();
        let shareDoId = this.sharedoId();
        let maxDepth = this._options?.dataSettings().maxDepth();
        let LocationToSaveOrLoadData = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.gvko)(this.LocationToSaveOrLoadData);
        if (LocationToSaveOrLoadData === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }
        this._data = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.getNestedProperty)(this.model, LocationToSaveOrLoadData);
        if (this._data !== undefined) {
            this.l("Data found at location", this._data);
            this._data = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._data);
            return this._data;
        }
        //if data ot found in the current model, look via the search
        if (this._data === undefined && useParents === false && shareDoId) //! TODO Fix Typings
         {
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__.searchForAttributeRecursive)(shareDoId, LocationToSaveOrLoadData, false).then((data) => {
                if (data.found) {
                    this._data = data.value;
                }
                return this._data;
            });
        }
        if (this._data === undefined && useParents === true) //! TODO Fix Typings
         {
            let idToUser = this.sharedoId() || this.parentSharedoId();
            if (!idToUser) {
                this.log("No id to use for search both sharedoId and parentSharedoId are undefined");
                return this._data;
            }
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__.searchForAttributeRecursive)(idToUser, LocationToSaveOrLoadData, useParents, maxDepth).then((data) => {
                if (data.found) {
                    this._data = data.value;
                }
                return this._data;
            });
        }
    }
    setData(value) {
        let valueToPersist = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(value);
        let previousValue = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._data);
        this._data = valueToPersist;
        this.fireValueChangedEvent("onDataBeforeChanged", { previousValue: previousValue, newValue: valueToPersist });
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
    debugSettings() {
        let debugSetting = (0,_DebugDefaults__WEBPACK_IMPORTED_MODULE_8__.DEBUG_DEFAULT)();
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
    fireValueChangedEvent(eventName, changedData) {
        let event = {
            eventPath: this.thisComponentName + "." + eventName,
            eventName: eventName,
            source: this,
            data: changedData
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
        model.aspectData.formBuilder = model.aspectData.formBuilder || { formData: {} };
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

/***/ "./src/WebBased/IDEAspects/BaseClasses/DebugDefaults.ts":
/*!**************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/DebugDefaults.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_DEFAULT: () => (/* binding */ DEBUG_DEFAULT),
/* harmony export */   DefaultDataSettings: () => (/* binding */ DefaultDataSettings),
/* harmony export */   REFRESH_ON_DEFAULTS: () => (/* binding */ REFRESH_ON_DEFAULTS)
/* harmony export */ });
const DEBUG_DEFAULT = () => {
    let retValue = {
        supportRequestEnabled: false,
        enabled: true,
        logToConsole: true,
        showInAspect: false,
        liveConfig: false,
    };
    return retValue;
};
const REFRESH_ON_DEFAULTS = {
    sharedoIdChanged: false,
    sharedoParentIdChanged: false,
    sharedoPhaseChanged: false,
};
const DefaultDataSettings = {
    debug: DEBUG_DEFAULT(),
    refreshOn: REFRESH_ON_DEFAULTS,
    eventsToReactTo: [
        {
            eventPath: "sharedo.updated",
            methodToCall: "refresh"
        },
        {
            eventPath: "sharedo.core.case.sharedo-updated",
            methodToCall: "refresh"
        }
    ],
    dataSettings: {
        getValueUsingParents: false,
        maxDepth: 0
    }
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
/* harmony import */ var _BaseClasses_DebugDefaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseClasses/DebugDefaults */ "./src/WebBased/IDEAspects/BaseClasses/DebugDefaults.ts");

const DATE_PICKER_DEFAULTS = {
    "formBuilderField": "eDiscoveryUpdatePlannedDate",
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
    "debug": (0,_BaseClasses_DebugDefaults__WEBPACK_IMPORTED_MODULE_0__.DEBUG_DEFAULT)(),
    "refreshOn": {
        "sharedoIdChanged": false,
        "sharedoParentIdChanged": false,
        "sharedoPhaseChanged": false,
    },
    "eventsToReactTo": [],
    "dataSettings": {
        "getValueUsingParents": false,
        "maxDepth": 0,
    }
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

//https://getdatepicker.com/6/options/display.html



let thisWidgetSystemName = "DatePickerAspect";
// "fieldPath": "form-alt-ediscovery-job-desired-completion-date-date-only.job-desired-completion-date",
// "title": "Desired Date",
//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css
class DatePickerAspect extends _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__.BaseIDEAspect {
    liveConfigurationRefreshed() {
        //TODO: implement
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
        return (0,_BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__.getFormBuilderFieldPath)(this.sharedoConfiguration.configuration.formBuilderField);
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
        this.dateTimePicker = new _eonasdan_tempus_dominus__WEBPACK_IMPORTED_MODULE_0__.TempusDominus(this.datePickerDiv, datePickerOption);
        this.options?.datePickerOptions.subscribe((newValue) => {
            this.loadAndBind();
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG1CQUFtQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMkNBQTJDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdDQUFnQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQWdEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MseUJBQXlCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxnQkFBZ0I7QUFDekU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMkJBQTJCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQkFBa0I7QUFDM0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMkJBQTJCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQkFBa0I7QUFDM0U7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsb0JBQW9CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHlDQUF5QztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsc0NBQXNDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE1BQU07QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1Q0FBdUM7QUFDekU7QUFDQTtBQUNBLDZCQUE2QixVQUFVO0FBQ3ZDLDZCQUE2QixVQUFVO0FBQ3ZDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCw2QkFBNkI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZSxRQUFRLGdOQUF3QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw2QkFBNkIsYUFBYSw2QkFBNkIsTUFBTSw2QkFBNkIsYUFBYSw2QkFBNkI7QUFDdEw7QUFDQTtBQUNBLHFEQUFxRCx5QkFBeUI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsNkJBQTZCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsNkJBQTZCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDZCQUE2QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxrQkFBa0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsNEJBQTRCLEtBQUssNEJBQTRCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHVCQUF1QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsZUFBZTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZUFBZTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztDQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9AZW9uYXNkYW4vdGVtcHVzLWRvbWludXMvZGlzdC9qcy90ZW1wdXMtZG9taW51cy5lc20uanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9Db21tb24vSHRtbEhlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0NvbW1vbi9Kc29uVG9IVE1MQ29udmVydGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvQ29tbW9uL0xvZy50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0NvbW1vbi9TdGFja0hlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9FdmVudHNIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vT2JqZWN0SGVscGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9hcGkudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL2V4ZWN1dGVGaW5kQnlRdWVyeS9GaW5kQnlRdWVyeS50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHMudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3QudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0RlYnVnRGVmYXVsdHMudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0tPQ29udmVydGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9EYXRlUGlja2VyQXNwZWN0L0RhdGVQaWNrZXJBc3BlY3RDb25maWd1cmF0aW9uLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvZXh0ZXJuYWwgdmFyIFwia29cIiIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdmVuZG9yL2Fuc2ktc3R5bGVzL2luZGV4LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3ZlbmRvci9zdXBwb3J0cy1jb2xvci9icm93c2VyLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0RhdGVQaWNrZXJBc3BlY3QvRGF0ZVBpY2tlckFzcGVjdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAgKiBUZW1wdXMgRG9taW51cyB2Ni43LjEzIChodHRwczovL2dldGRhdGVwaWNrZXIuY29tLylcbiAgKiBDb3B5cmlnaHQgMjAxMy0yMDIzIEpvbmF0aGFuIFBldGVyc29uXG4gICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vRW9uYXNkYW4vdGVtcHVzLWRvbWludXMvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgKi9cbmNsYXNzIFRkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG59XG5jbGFzcyBFcnJvck1lc3NhZ2VzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5iYXNlID0gJ1REOic7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvLyNyZWdpb24gdXNlZCB3aXRoIG5vdGlmeS5lcnJvclxuICAgICAgICAvKipcbiAgICAgICAgICogVXNlZCB3aXRoIGFuIEVycm9yIEV2ZW50IHR5cGUgaWYgdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUgdGhhdFxuICAgICAgICAgKiBmYWlscyByZXN0cmljdGlvbiB2YWxpZGF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5mYWlsZWRUb1NldEludmFsaWREYXRlID0gJ0ZhaWxlZCB0byBzZXQgaW52YWxpZCBkYXRlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZWQgd2l0aCBhbiBFcnJvciBFdmVudCB0eXBlIHdoZW4gYSB1c2VyIGNoYW5nZXMgdGhlIHZhbHVlIG9mIHRoZVxuICAgICAgICAgKiBpbnB1dCBmaWVsZCBkaXJlY3RseSwgYW5kIGRvZXMgbm90IHByb3ZpZGUgYSB2YWxpZCBkYXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5mYWlsZWRUb1BhcnNlSW5wdXQgPSAnRmFpbGVkIHBhcnNlIGlucHV0IGZpZWxkJztcbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgfVxuICAgIC8vI3JlZ2lvbiBvdXQgdG8gY29uc29sZVxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBrZXkgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IGlzIGludmFsaWQuXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICAgKi9cbiAgICB1bmV4cGVjdGVkT3B0aW9uKG9wdGlvbk5hbWUpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IFVuZXhwZWN0ZWQgb3B0aW9uOiAke29wdGlvbk5hbWV9IGRvZXMgbm90IG1hdGNoIGEga25vd24gb3B0aW9uLmApO1xuICAgICAgICBlcnJvci5jb2RlID0gMTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciBpbmRpY2F0aW5nIHRoYXQgb25lIG1vcmUga2V5cyBpbiB0aGUgb3B0aW9ucyBvYmplY3QgaXMgaW52YWxpZC5cbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZVxuICAgICAqL1xuICAgIHVuZXhwZWN0ZWRPcHRpb25zKG9wdGlvbk5hbWUpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9OiAke29wdGlvbk5hbWUuam9pbignLCAnKX1gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDE7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3Igd2hlbiBhbiBvcHRpb24gaXMgcHJvdmlkZSBhbiB1bnN1cHBvcnRlZCB2YWx1ZS5cbiAgICAgKiBGb3IgZXhhbXBsZSBhIHZhbHVlIG9mICdjaGVlc2UnIGZvciB0b29sYmFyUGxhY2VtZW50IHdoaWNoIG9ubHkgc3VwcG9ydHNcbiAgICAgKiAndG9wJywgJ2JvdHRvbScsICdkZWZhdWx0Jy5cbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZVxuICAgICAqIEBwYXJhbSBiYWRWYWx1ZVxuICAgICAqIEBwYXJhbSB2YWxpZE9wdGlvbnNcbiAgICAgKi9cbiAgICB1bmV4cGVjdGVkT3B0aW9uVmFsdWUob3B0aW9uTmFtZSwgYmFkVmFsdWUsIHZhbGlkT3B0aW9ucykge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gVW5leHBlY3RlZCBvcHRpb24gdmFsdWU6ICR7b3B0aW9uTmFtZX0gZG9lcyBub3QgYWNjZXB0IGEgdmFsdWUgb2YgXCIke2JhZFZhbHVlfVwiLiBWYWxpZCB2YWx1ZXMgYXJlOiAke3ZhbGlkT3B0aW9ucy5qb2luKCcsICcpfWApO1xuICAgICAgICBlcnJvci5jb2RlID0gMjtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBlcnJvciB3aGVuIGFuIG9wdGlvbiB2YWx1ZSBpcyB0aGUgd3JvbmcgdHlwZS5cbiAgICAgKiBGb3IgZXhhbXBsZSBhIHN0cmluZyB2YWx1ZSB3YXMgcHJvdmlkZWQgdG8gbXVsdGlwbGVEYXRlcyB3aGljaCBvbmx5XG4gICAgICogc3VwcG9ydHMgdHJ1ZSBvciBmYWxzZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZVxuICAgICAqIEBwYXJhbSBiYWRUeXBlXG4gICAgICogQHBhcmFtIGV4cGVjdGVkVHlwZVxuICAgICAqL1xuICAgIHR5cGVNaXNtYXRjaChvcHRpb25OYW1lLCBiYWRUeXBlLCBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IE1pc21hdGNoIHR5cGVzOiAke29wdGlvbk5hbWV9IGhhcyBhIHR5cGUgb2YgJHtiYWRUeXBlfSBpbnN0ZWFkIG9mIHRoZSByZXF1aXJlZCAke2V4cGVjdGVkVHlwZX1gKTtcbiAgICAgICAgZXJyb3IuY29kZSA9IDM7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3Igd2hlbiBhbiBvcHRpb24gdmFsdWUgaXMgIG91dHNpZGUgb2YgdGhlIGV4cGVjdGVkIHJhbmdlLlxuICAgICAqIEZvciBleGFtcGxlIHJlc3RyaWN0aW9ucy5kYXlzT2ZXZWVrRGlzYWJsZWQgZXhjZXB0cyBhIHZhbHVlIGJldHdlZW4gMCBhbmQgNi5cbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZVxuICAgICAqIEBwYXJhbSBsb3dlclxuICAgICAqIEBwYXJhbSB1cHBlclxuICAgICAqL1xuICAgIG51bWJlcnNPdXRPZlJhbmdlKG9wdGlvbk5hbWUsIGxvd2VyLCB1cHBlcikge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gJHtvcHRpb25OYW1lfSBleHBlY3RlZCBhbiBhcnJheSBvZiBudW1iZXIgYmV0d2VlbiAke2xvd2VyfSBhbmQgJHt1cHBlcn0uYCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSA0O1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIHdoZW4gYSB2YWx1ZSBmb3IgYSBkYXRlIG9wdGlvbnMgY291bGRuJ3QgYmUgcGFyc2VkLiBFaXRoZXJcbiAgICAgKiB0aGUgb3B0aW9uIHdhcyBhbiBpbnZhbGlkIHN0cmluZyBvciBhbiBpbnZhbGlkIERhdGUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lXG4gICAgICogQHBhcmFtIGRhdGVcbiAgICAgKiBAcGFyYW0gc29mdCBJZiB0cnVlLCBsb2dzIGEgd2FybmluZyBpbnN0ZWFkIG9mIGFuIGVycm9yLlxuICAgICAqL1xuICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBmYWlsZWRUb1BhcnNlRGF0ZShvcHRpb25OYW1lLCBkYXRlLCBzb2Z0ID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IENvdWxkIG5vdCBjb3JyZWN0bHkgcGFyc2UgXCIke2RhdGV9XCIgdG8gYSBkYXRlIGZvciAke29wdGlvbk5hbWV9LmApO1xuICAgICAgICBlcnJvci5jb2RlID0gNTtcbiAgICAgICAgaWYgKCFzb2Z0KVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRocm93cyB3aGVuIGFuIGVsZW1lbnQgdG8gYXR0YWNoIHRvIHdhcyBub3QgcHJvdmlkZWQgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIG11c3RQcm92aWRlRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IE5vIGVsZW1lbnQgd2FzIHByb3ZpZGVkLmApO1xuICAgICAgICBlcnJvci5jb2RlID0gNjtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiBwcm92aWRpbmcgYW4gYXJyYXkgZm9yIHRoZSBldmVudHMgdG8gc3Vic2NyaWJlIG1ldGhvZCBkb2Vzbid0IGhhdmVcbiAgICAgKiB0aGUgc2FtZSBudW1iZXIgb2YgY2FsbGJhY2tzLiBFLmcuLCBzdWJzY3JpYmUoWzEsMl0sIFsxXSlcbiAgICAgKi9cbiAgICBzdWJzY3JpYmVNaXNtYXRjaCgpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IFRoZSBzdWJzY3JpYmVkIGV2ZW50cyBkb2VzIG5vdCBtYXRjaCB0aGUgbnVtYmVyIG9mIGNhbGxiYWNrc2ApO1xuICAgICAgICBlcnJvci5jb2RlID0gNztcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRocm93cyBpZiB0aGUgY29uZmlndXJhdGlvbiBoYXMgY29uZmxpY3RpbmcgcnVsZXMgZS5nLiBtaW5EYXRlIGlzIGFmdGVyIG1heERhdGVcbiAgICAgKi9cbiAgICBjb25mbGljdGluZ0NvbmZpZ3VyYXRpb24obWVzc2FnZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBUZEVycm9yKGAke3RoaXMuYmFzZX0gQSBjb25maWd1cmF0aW9uIHZhbHVlIGNvbmZsaWN0cyB3aXRoIGFub3RoZXIgcnVsZS4gJHttZXNzYWdlfWApO1xuICAgICAgICBlcnJvci5jb2RlID0gODtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGN1c3RvbURhdGVGb3JtYXQgZXJyb3JzXG4gICAgICovXG4gICAgY3VzdG9tRGF0ZUZvcm1hdEVycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVGRFcnJvcihgJHt0aGlzLmJhc2V9IEN1c3RvbSBEYXRlIEZvcm1hdDogJHttZXNzYWdlfWApO1xuICAgICAgICBlcnJvci5jb2RlID0gOTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvZ3MgYSB3YXJuaW5nIGlmIGEgZGF0ZSBvcHRpb24gdmFsdWUgaXMgcHJvdmlkZWQgYXMgYSBzdHJpbmcsIGluc3RlYWQgb2ZcbiAgICAgKiBhIGRhdGUvZGF0ZXRpbWUgb2JqZWN0LlxuICAgICAqL1xuICAgIGRhdGVTdHJpbmcoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgJHt0aGlzLmJhc2V9IFVzaW5nIGEgc3RyaW5nIGZvciBkYXRlIG9wdGlvbnMgaXMgbm90IHJlY29tbWVuZGVkIHVubGVzcyB5b3Ugc3BlY2lmeSBhbiBJU08gc3RyaW5nIG9yIHVzZSB0aGUgY3VzdG9tRGF0ZUZvcm1hdCBwbHVnaW4uYCk7XG4gICAgfVxuICAgIGRlcHJlY2F0ZWRXYXJuaW5nKG1lc3NhZ2UsIHJlbWVkaWF0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgJHt0aGlzLmJhc2V9IFdhcm5pbmcgJHttZXNzYWdlfSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvbi4gJHtyZW1lZGlhdGlvbn1gKTtcbiAgICB9XG4gICAgdGhyb3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFRkRXJyb3IoYCR7dGhpcy5iYXNlfSAke21lc3NhZ2V9YCk7XG4gICAgICAgIGVycm9yLmNvZGUgPSA5O1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG5cbi8vIHRoaXMgaXMgbm90IHRoZSB3YXkgSSB3YW50IHRoaXMgdG8gc3RheSBidXQgbmVzdGVkIGNsYXNzZXMgc2VlbWVkIHRvIGJsb3duIHVwIG9uY2UgaXRzIGNvbXBpbGVkLlxuY29uc3QgTkFNRSA9ICd0ZW1wdXMtZG9taW51cycsIGRhdGFLZXkgPSAndGQnO1xuLyoqXG4gKiBFdmVudHNcbiAqL1xuY2xhc3MgRXZlbnRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBgLiR7ZGF0YUtleX1gO1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hhbmdlIGV2ZW50LiBGaXJlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlLlxuICAgICAgICAgKiBTZWUgYWxzbyBFdmVudFR5cGVzLkNoYW5nZUV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNoYW5nZSA9IGBjaGFuZ2Uke3RoaXMua2V5fWA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbWl0IHdoZW4gdGhlIHZpZXcgY2hhbmdlcyBmb3IgZXhhbXBsZSBmcm9tIG1vbnRoIHZpZXcgdG8gdGhlIHllYXIgdmlldy5cbiAgICAgICAgICogU2VlIGFsc28gRXZlbnRUeXBlcy5WaWV3VXBkYXRlRXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudXBkYXRlID0gYHVwZGF0ZSR7dGhpcy5rZXl9YDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVtaXRzIHdoZW4gYSBzZWxlY3RlZCBkYXRlIG9yIHZhbHVlIGZyb20gdGhlIGlucHV0IGZpZWxkIGZhaWxzIHRvIG1lZXQgdGhlIHByb3ZpZGVkIHZhbGlkYXRpb24gcnVsZXMuXG4gICAgICAgICAqIFNlZSBhbHNvIEV2ZW50VHlwZXMuRmFpbEV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmVycm9yID0gYGVycm9yJHt0aGlzLmtleX1gO1xuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdyBldmVudFxuICAgICAgICAgKiBAZXZlbnQgRXZlbnRzI3Nob3dcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2hvdyA9IGBzaG93JHt0aGlzLmtleX1gO1xuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSBldmVudFxuICAgICAgICAgKiBAZXZlbnQgRXZlbnRzI2hpZGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGlkZSA9IGBoaWRlJHt0aGlzLmtleX1gO1xuICAgICAgICAvLyBibHVyIGFuZCBmb2N1cyBhcmUgdXNlZCBpbiB0aGUgalF1ZXJ5IHByb3ZpZGVyIGJ1dCBhcmUgb3RoZXJ3aXNlIHVudXNlZC5cbiAgICAgICAgLy8ga2V5dXAvZG93biB3aWxsIGJlIHVzZWQgbGF0ZXIgZm9yIGtleWJpbmRpbmcgb3B0aW9uc1xuICAgICAgICB0aGlzLmJsdXIgPSBgYmx1ciR7dGhpcy5rZXl9YDtcbiAgICAgICAgdGhpcy5mb2N1cyA9IGBmb2N1cyR7dGhpcy5rZXl9YDtcbiAgICAgICAgdGhpcy5rZXl1cCA9IGBrZXl1cCR7dGhpcy5rZXl9YDtcbiAgICAgICAgdGhpcy5rZXlkb3duID0gYGtleWRvd24ke3RoaXMua2V5fWA7XG4gICAgfVxufVxuY2xhc3MgQ3NzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53aWRnZXQgPSBgJHtOQU1FfS13aWRnZXRgO1xuICAgICAgICAvKipcbiAgICAgICAgICogSG9sZCB0aGUgcHJldmlvdXMsIG5leHQgYW5kIHN3aXRjaGVyIGRpdnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2FsZW5kYXJIZWFkZXIgPSAnY2FsZW5kYXItaGVhZGVyJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBlbGVtZW50IGZvciB0aGUgYWN0aW9uIHRvIGNoYW5nZSB0aGUgY2FsZW5kYXIgdmlldy4gRS5nLiBtb250aCAtPiB5ZWFyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zd2l0Y2ggPSAncGlja2VyLXN3aXRjaCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZWxlbWVudHMgZm9yIGFsbCB0aGUgdG9vbGJhciBvcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRvb2xiYXIgPSAndG9vbGJhcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlcyB0aGUgaG92ZXIgYW5kIHJvdW5kaW5nIGFmZmVjdC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubm9IaWdobGlnaHQgPSAnbm8taGlnaGxpZ2h0JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIHdpZGdldCBlbGVtZW50IHdoZW4gdGhlIHNpZGUgYnkgc2lkZSBvcHRpb24gaXMgaW4gdXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zaWRlQnlTaWRlID0gJ3RpbWVwaWNrZXItc2JzJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBlbGVtZW50IGZvciB0aGUgYWN0aW9uIHRvIGNoYW5nZSB0aGUgY2FsZW5kYXIgdmlldywgZS5nLiBBdWd1c3QgLT4gSnVseVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wcmV2aW91cyA9ICdwcmV2aW91cyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZWxlbWVudCBmb3IgdGhlIGFjdGlvbiB0byBjaGFuZ2UgdGhlIGNhbGVuZGFyIHZpZXcsIGUuZy4gQXVndXN0IC0+IFNlcHRlbWJlclxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uZXh0ID0gJ25leHQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBhbnkgYWN0aW9uIHRoYXQgd291bGQgdmlvbGF0ZSBhbnkgcmVzdHJpY3Rpb24gb3B0aW9ucy4gQUxzbyBhcHBsaWVkXG4gICAgICAgICAqIHRvIGFuIGlucHV0IGZpZWxkIGlmIHRoZSBkaXNhYmxlZCBmdW5jdGlvbiBpcyBjYWxsZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gJ2Rpc2FibGVkJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gYW55IGRhdGUgdGhhdCBpcyBsZXNzIHRoYW4gcmVxdWVzdGVkIHZpZXcsXG4gICAgICAgICAqIGUuZy4gdGhlIGxhc3QgZGF5IG9mIHRoZSBwcmV2aW91cyBtb250aC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub2xkID0gJ29sZCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGFueSBkYXRlIHRoYXQgaXMgZ3JlYXRlciB0aGFuIG9mIHJlcXVlc3RlZCB2aWV3LFxuICAgICAgICAgKiBlLmcuIHRoZSBsYXN0IGRheSBvZiB0aGUgcHJldmlvdXMgbW9udGguXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5ldyA9ICduZXcnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBhbnkgZGF0ZSB0aGF0IGlzIGN1cnJlbnRseSBzZWxlY3RlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYWN0aXZlID0gJ2FjdGl2ZSc7XG4gICAgICAgIC8vI3JlZ2lvbiBkYXRlIGVsZW1lbnRcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgY2FsZW5kYXIgdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGF0ZUNvbnRhaW5lciA9ICdkYXRlLWNvbnRhaW5lcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIGRlY2FkZXMgdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGVjYWRlc0NvbnRhaW5lciA9IGAke3RoaXMuZGF0ZUNvbnRhaW5lcn0tZGVjYWRlc2A7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGVsZW1lbnRzIHdpdGhpbiB0aGUgZGVjYWRlIGNvbnRhaW5lciwgZS5nLiAyMDIwLCAyMDMwXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRlY2FkZSA9ICdkZWNhZGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSB5ZWFycyB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy55ZWFyc0NvbnRhaW5lciA9IGAke3RoaXMuZGF0ZUNvbnRhaW5lcn0teWVhcnNgO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byBlbGVtZW50cyB3aXRoaW4gdGhlIHllYXJzIGNvbnRhaW5lciwgZS5nLiAyMDIxLCAyMDIxXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnllYXIgPSAneWVhcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIG1vbnRoIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vbnRoc0NvbnRhaW5lciA9IGAke3RoaXMuZGF0ZUNvbnRhaW5lcn0tbW9udGhzYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gZWxlbWVudHMgd2l0aGluIHRoZSBtb250aCBjb250YWluZXIsIGUuZy4gSmFudWFyeSwgRmVicnVhcnlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW9udGggPSAnbW9udGgnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBjYWxlbmRhciB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kYXlzQ29udGFpbmVyID0gYCR7dGhpcy5kYXRlQ29udGFpbmVyfS1kYXlzYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gZWxlbWVudHMgd2l0aGluIHRoZSBkYXkgY29udGFpbmVyLCBlLmcuIDEsIDIuLjMxXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRheSA9ICdkYXknO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgZGlzcGxheS5jYWxlbmRhcldlZWtzIGlzIGVuYWJsZWQsIGEgY29sdW1uIGRpc3BsYXlpbmcgdGhlIHdlZWsgb2YgeWVhclxuICAgICAgICAgKiBpcyBzaG93bi4gVGhpcyBjbGFzcyBpcyBhcHBsaWVkIHRvIGVhY2ggY2VsbCBpbiB0aGF0IGNvbHVtbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2FsZW5kYXJXZWVrcyA9ICdjdyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSBmaXJzdCByb3cgb2YgdGhlIGNhbGVuZGFyIHZpZXcsIGUuZy4gU3VuZGF5LCBNb25kYXlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGF5T2ZUaGVXZWVrID0gJ2Rvdyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSBjdXJyZW50IGRhdGUgb24gdGhlIGNhbGVuZGFyIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRvZGF5ID0gJ3RvZGF5JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIGxvY2FsZSdzIHdlZWtlbmQgZGF0ZXMgb24gdGhlIGNhbGVuZGFyIHZpZXcsIGUuZy4gU3VuZGF5LCBTYXR1cmRheVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53ZWVrZW5kID0gJ3dlZWtlbmQnO1xuICAgICAgICB0aGlzLnJhbmdlSW4gPSAncmFuZ2UtaW4nO1xuICAgICAgICB0aGlzLnJhbmdlU3RhcnQgPSAncmFuZ2Utc3RhcnQnO1xuICAgICAgICB0aGlzLnJhbmdlRW5kID0gJ3JhbmdlLWVuZCc7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvLyNyZWdpb24gdGltZSBlbGVtZW50XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgYWxsIHRpbWUgcmVsYXRlZCBlbGVtZW50cy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudGltZUNvbnRhaW5lciA9ICd0aW1lLWNvbnRhaW5lcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRoZSBzZXBhcmF0b3IgY29sdW1ucyBiZXR3ZWVuIHRpbWUgZWxlbWVudHMsIGUuZy4gaG91ciAqOiogbWludXRlICo6KiBzZWNvbmRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VwYXJhdG9yID0gJ3NlcGFyYXRvcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIGNsb2NrIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsb2NrQ29udGFpbmVyID0gYCR7dGhpcy50aW1lQ29udGFpbmVyfS1jbG9ja2A7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0ZXIgZWxlbWVudCBmb3IgdGhlIGhvdXJzIHNlbGVjdGlvbiB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ob3VyQ29udGFpbmVyID0gYCR7dGhpcy50aW1lQ29udGFpbmVyfS1ob3VyYDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvdXRlciBlbGVtZW50IGZvciB0aGUgbWludXRlcyBzZWxlY3Rpb24gdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWludXRlQ29udGFpbmVyID0gYCR7dGhpcy50aW1lQ29udGFpbmVyfS1taW51dGVgO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG91dGVyIGVsZW1lbnQgZm9yIHRoZSBzZWNvbmRzIHNlbGVjdGlvbiB2aWV3LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZWNvbmRDb250YWluZXIgPSBgJHt0aGlzLnRpbWVDb250YWluZXJ9LXNlY29uZGA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGVhY2ggZWxlbWVudCBpbiB0aGUgaG91cnMgc2VsZWN0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhvdXIgPSAnaG91cic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGVhY2ggZWxlbWVudCBpbiB0aGUgbWludXRlcyBzZWxlY3Rpb24gdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWludXRlID0gJ21pbnV0ZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIGVhY2ggZWxlbWVudCBpbiB0aGUgc2Vjb25kcyBzZWxlY3Rpb24gdmlldy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2Vjb25kID0gJ3NlY29uZCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIEFNL1BNIHRvZ2dsZSBidXR0b24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRvZ2dsZU1lcmlkaWVtID0gJ3RvZ2dsZU1lcmlkaWVtJztcbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8vI3JlZ2lvbiBjb2xsYXBzZVxuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0aGUgZWxlbWVudCBvZiB0aGUgY3VycmVudCB2aWV3IG1vZGUsIGUuZy4gY2FsZW5kYXIgb3IgY2xvY2suXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNob3cgPSAnc2hvdyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSBjdXJyZW50bHkgc2hvd2luZyB2aWV3IG1vZGUgZHVyaW5nIGEgdHJhbnNpdGlvblxuICAgICAgICAgKiBiZXR3ZWVuIGNhbGVuZGFyIGFuZCBjbG9jayB2aWV3c1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb2xsYXBzaW5nID0gJ3RkLWNvbGxhcHNpbmcnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgY3VycmVudGx5IGhpZGRlbiB2aWV3IG1vZGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNvbGxhcHNlID0gJ3RkLWNvbGxhcHNlJztcbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVkIHRvIHRoZSB3aWRnZXQgd2hlbiB0aGUgb3B0aW9uIGRpc3BsYXkuaW5saW5lIGlzIGVuYWJsZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlubGluZSA9ICdpbmxpbmUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllZCB0byB0aGUgd2lkZ2V0IHdoZW4gdGhlIG9wdGlvbiBkaXNwbGF5LnRoZW1lIGlzIGxpZ2h0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5saWdodFRoZW1lID0gJ2xpZ2h0JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFwcGxpZWQgdG8gdGhlIHdpZGdldCB3aGVuIHRoZSBvcHRpb24gZGlzcGxheS50aGVtZSBpcyBkYXJrLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kYXJrVGhlbWUgPSAnZGFyayc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2VkIGZvciBkZXRlY3RpbmcgaWYgdGhlIHN5c3RlbSBjb2xvciBwcmVmZXJlbmNlIGlzIGRhcmsgbW9kZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc0RhcmtQcmVmZXJyZWRRdWVyeSA9ICcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJztcbiAgICB9XG59XG5jbGFzcyBOYW1lc3BhY2Uge1xufVxuTmFtZXNwYWNlLk5BTUUgPSBOQU1FO1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuTmFtZXNwYWNlLmRhdGFLZXkgPSBkYXRhS2V5O1xuTmFtZXNwYWNlLmV2ZW50cyA9IG5ldyBFdmVudHMoKTtcbk5hbWVzcGFjZS5jc3MgPSBuZXcgQ3NzKCk7XG5OYW1lc3BhY2UuZXJyb3JNZXNzYWdlcyA9IG5ldyBFcnJvck1lc3NhZ2VzKCk7XG5cbmNvbnN0IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24gPSB7XG4gICAgZGF0ZUZvcm1hdHM6IHtcbiAgICAgICAgTFRTOiAnaDptbTpzcyBUJyxcbiAgICAgICAgTFQ6ICdoOm1tIFQnLFxuICAgICAgICBMOiAnTU0vZGQveXl5eScsXG4gICAgICAgIExMOiAnTU1NTSBkLCB5eXl5JyxcbiAgICAgICAgTExMOiAnTU1NTSBkLCB5eXl5IGg6bW0gVCcsXG4gICAgICAgIExMTEw6ICdkZGRkLCBNTU1NIGQsIHl5eXkgaDptbSBUJyxcbiAgICB9LFxuICAgIGZvcm1hdDogJ0wgTFQnLFxuICAgIGxvY2FsZTogJ2RlZmF1bHQnLFxuICAgIGhvdXJDeWNsZTogdW5kZWZpbmVkLFxuICAgIG9yZGluYWw6IChuKSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBbJ3RoJywgJ3N0JywgJ25kJywgJ3JkJ107XG4gICAgICAgIGNvbnN0IHYgPSBuICUgMTAwO1xuICAgICAgICByZXR1cm4gYFske259JHtzWyh2IC0gMjApICUgMTBdIHx8IHNbdl0gfHwgc1swXX1dYDtcbiAgICB9LFxufTtcbnZhciBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEgPSB7IC4uLkRlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24gfTtcblxudmFyIFVuaXQ7XG4oZnVuY3Rpb24gKFVuaXQpIHtcbiAgICBVbml0W1wic2Vjb25kc1wiXSA9IFwic2Vjb25kc1wiO1xuICAgIFVuaXRbXCJtaW51dGVzXCJdID0gXCJtaW51dGVzXCI7XG4gICAgVW5pdFtcImhvdXJzXCJdID0gXCJob3Vyc1wiO1xuICAgIFVuaXRbXCJkYXRlXCJdID0gXCJkYXRlXCI7XG4gICAgVW5pdFtcIm1vbnRoXCJdID0gXCJtb250aFwiO1xuICAgIFVuaXRbXCJ5ZWFyXCJdID0gXCJ5ZWFyXCI7XG59KShVbml0IHx8IChVbml0ID0ge30pKTtcbmNvbnN0IHR3b0RpZ2l0VGVtcGxhdGUgPSB7XG4gICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgaG91cjogJzItZGlnaXQnLFxuICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgIHNlY29uZDogJzItZGlnaXQnLFxufTtcbi8qKlxuICogUmV0dXJucyBhbiBJbnRsIGZvcm1hdCBvYmplY3QgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9iamVjdFxuICogQHBhcmFtIHVuaXRcbiAqL1xuY29uc3QgZ2V0Rm9ybWF0QnlVbml0ID0gKHVuaXQpID0+IHtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICByZXR1cm4geyBkYXRlU3R5bGU6ICdzaG9ydCcgfTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBtb250aDogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgcmV0dXJuIHsgeWVhcjogJ251bWVyaWMnIH07XG4gICAgfVxufTtcbi8qKlxuICogQXR0ZW1wdHMgdG8gZ3Vlc3MgdGhlIGhvdXIgY3ljbGUgb2YgdGhlIGdpdmVuIGxvY2FsXG4gKiBAcGFyYW0gbG9jYWxlXG4gKi9cbmNvbnN0IGd1ZXNzSG91ckN5Y2xlID0gKGxvY2FsZSkgPT4ge1xuICAgIGlmICghbG9jYWxlKVxuICAgICAgICByZXR1cm4gJ2gxMic7XG4gICAgLy8gbm9pbnNwZWN0aW9uIFNwZWxsQ2hlY2tpbmdJbnNwZWN0aW9uXG4gICAgY29uc3QgdGVtcGxhdGUgPSB7XG4gICAgICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgICAgIG51bWJlcmluZ1N5c3RlbTogJ2xhdG4nLFxuICAgIH07XG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZVRpbWUoKS5zZXRMb2NhbGl6YXRpb24oeyBsb2NhbGUgfSk7XG4gICAgZHQuaG91cnMgPSAwO1xuICAgIGNvbnN0IHN0YXJ0ID0gZHQucGFydHModW5kZWZpbmVkLCB0ZW1wbGF0ZSkuaG91cjtcbiAgICAvL21pZG5pZ2h0IGlzIDEyIHNvIGVuLVVTIHN0eWxlIDEyIEFNXG4gICAgaWYgKHN0YXJ0ID09PSAnMTInKVxuICAgICAgICByZXR1cm4gJ2gxMic7XG4gICAgLy9taWRuaWdodCBpcyAyNCBpcyBmcm9tIDAwLTI0XG4gICAgaWYgKHN0YXJ0ID09PSAnMjQnKVxuICAgICAgICByZXR1cm4gJ2gyNCc7XG4gICAgZHQuaG91cnMgPSAyMztcbiAgICBjb25zdCBlbmQgPSBkdC5wYXJ0cyh1bmRlZmluZWQsIHRlbXBsYXRlKS5ob3VyO1xuICAgIC8vaWYgbWlkbmlnaHQgaXMgMDAgYW5kIGhvdXIgMjMgaXMgMTEgdGhlblxuICAgIGlmIChzdGFydCA9PT0gJzAwJyAmJiBlbmQgPT09ICcxMScpXG4gICAgICAgIHJldHVybiAnaDExJztcbiAgICBpZiAoc3RhcnQgPT09ICcwMCcgJiYgZW5kID09PSAnMjMnKVxuICAgICAgICByZXR1cm4gJ2gyMyc7XG4gICAgY29uc29sZS53YXJuKGBjb3VsZG4ndCBkZXRlcm1pbmUgaG91ciBjeWNsZSBmb3IgJHtsb2NhbGV9LiBzdGFydDogJHtzdGFydH0uIGVuZDogJHtlbmR9YCk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4vKipcbiAqIEZvciB0aGUgbW9zdCBwYXJ0IHRoaXMgb2JqZWN0IGJlaGF2ZXMgZXhhY3RseSB0aGUgc2FtZSB3YXlcbiAqIGFzIHRoZSBuYXRpdmUgRGF0ZSBvYmplY3Qgd2l0aCBhIGxpdHRsZSBleHRyYSBzcGljZS5cbiAqL1xuY2xhc3MgRGF0ZVRpbWUgZXh0ZW5kcyBEYXRlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5sb2NhbGl6YXRpb24gPSBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDE7XG4gICAgICAgIHRoaXMubm9uTGVhcExhZGRlciA9IFtcbiAgICAgICAgICAgIDAsIDMxLCA1OSwgOTAsIDEyMCwgMTUxLCAxODEsIDIxMiwgMjQzLCAyNzMsIDMwNCwgMzM0LFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmxlYXBMYWRkZXIgPSBbMCwgMzEsIDYwLCA5MSwgMTIxLCAxNTIsIDE4MiwgMjEzLCAyNDQsIDI3NCwgMzA1LCAzMzVdO1xuICAgICAgICAvLyNyZWdpb24gQ0RGIHN0dWZmXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVSZWdleCA9IFxuICAgICAgICAvL2lzIHJlZ2V4IGNhbm5vdCBiZSBzaW1wbGlmaWVkIGJleW9uZCB3aGF0IGl0IGFscmVhZHkgaXNcbiAgICAgICAgLyhcXFtbXltcXF1dKl0pfHl7MSw0fXxNezEsNH18ZHsxLDR9fEh7MSwyfXxoezEsMn18dHxUfG17MSwyfXxzezEsMn18ZnszfS9nOyAvL05PU09OQVJcbiAgICAgICAgdGhpcy5mb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXltcXF1dKl0pfChbLV86Ly4sKClcXHNdKyl8KFR8dHx5eXl5fHl5P3xNTT9NP00/fERvfGRkP3xoaD98SEg/fG1tP3xzcz8pL2c7IC8vTk9TT05BUiBpcyByZWdleCBjYW5ub3QgYmUgc2ltcGxpZmllZCBiZXlvbmQgd2hhdCBpdCBhbHJlYWR5IGlzXG4gICAgICAgIHRoaXMubWF0Y2gyID0gL1xcZFxcZC87IC8vIDAwIC0gOTlcbiAgICAgICAgdGhpcy5tYXRjaDMgPSAvXFxkezN9LzsgLy8gMDAwIC0gOTk5XG4gICAgICAgIHRoaXMubWF0Y2g0ID0gL1xcZHs0fS87IC8vIDAwMDAgLSA5OTk5XG4gICAgICAgIHRoaXMubWF0Y2gxdG8yID0gL1xcZFxcZD8vOyAvLyAwIC0gOTlcbiAgICAgICAgdGhpcy5tYXRjaFNpZ25lZCA9IC9bKy1dP1xcZCsvOyAvLyAtaW5mIC0gaW5mXG4gICAgICAgIHRoaXMubWF0Y2hPZmZzZXQgPSAvWystXVxcZFxcZDo/KFxcZFxcZCk/fFovOyAvLyArMDA6MDAgLTAwOjAwICswMDAwIG9yIC0wMDAwICswMCBvciBaXG4gICAgICAgIHRoaXMubWF0Y2hXb3JkID0gL1teXFxkXzovLFxcLSgpXFxzXSsvOyAvLyBXb3JkXG4gICAgICAgIHRoaXMuem9uZUV4cHJlc3Npb25zID0gW1xuICAgICAgICAgICAgdGhpcy5tYXRjaE9mZnNldCxcbiAgICAgICAgICAgIChvYmosIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgb2JqLm9mZnNldCA9IHRoaXMub2Zmc2V0RnJvbVN0cmluZyhpbnB1dCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmV4cHJlc3Npb25zID0ge1xuICAgICAgICAgICAgdDogW1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hXb3JkLFxuICAgICAgICAgICAgICAgIChvamIsIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9qYi5hZnRlcm5vb24gPSB0aGlzLm1lcmlkaWVtTWF0Y2goaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgVDogW1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hXb3JkLFxuICAgICAgICAgICAgICAgIChvamIsIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9qYi5hZnRlcm5vb24gPSB0aGlzLm1lcmlkaWVtTWF0Y2goaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZmZmOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaDMsXG4gICAgICAgICAgICAgICAgKG9qYiwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2piLm1pbGxpc2Vjb25kcyA9ICtpbnB1dDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHM6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnc2Vjb25kcycpXSxcbiAgICAgICAgICAgIHNzOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ3NlY29uZHMnKV0sXG4gICAgICAgICAgICBtOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ21pbnV0ZXMnKV0sXG4gICAgICAgICAgICBtbTogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdtaW51dGVzJyldLFxuICAgICAgICAgICAgSDogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdob3VycycpXSxcbiAgICAgICAgICAgIGg6IFt0aGlzLm1hdGNoMXRvMiwgdGhpcy5hZGRJbnB1dCgnaG91cnMnKV0sXG4gICAgICAgICAgICBISDogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdob3VycycpXSxcbiAgICAgICAgICAgIGhoOiBbdGhpcy5tYXRjaDF0bzIsIHRoaXMuYWRkSW5wdXQoJ2hvdXJzJyldLFxuICAgICAgICAgICAgZDogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdkYXknKV0sXG4gICAgICAgICAgICBkZDogW3RoaXMubWF0Y2gyLCB0aGlzLmFkZElucHV0KCdkYXknKV0sXG4gICAgICAgICAgICBEbzogW1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hXb3JkLFxuICAgICAgICAgICAgICAgIChvamIsIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFtvamIuZGF5XSA9IGlucHV0Lm1hdGNoKC9cXGQrLyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5sb2NhbGl6YXRpb24ub3JkaW5hbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzE7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxpemF0aW9uLm9yZGluYWwoaSkucmVwbGFjZSgvW1tcXF1dL2csICcnKSA9PT0gaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvamIuZGF5ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgTTogW3RoaXMubWF0Y2gxdG8yLCB0aGlzLmFkZElucHV0KCdtb250aCcpXSxcbiAgICAgICAgICAgIE1NOiBbdGhpcy5tYXRjaDIsIHRoaXMuYWRkSW5wdXQoJ21vbnRoJyldLFxuICAgICAgICAgICAgTU1NOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaFdvcmQsXG4gICAgICAgICAgICAgICAgKG9iaiwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9udGhzID0gdGhpcy5nZXRBbGxNb250aHMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9udGhzU2hvcnQgPSB0aGlzLmdldEFsbE1vbnRocygnc2hvcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hJbmRleCA9IChtb250aHNTaG9ydCB8fCBtb250aHMubWFwKChfKSA9PiBfLnNsaWNlKDAsIDMpKSkuaW5kZXhPZihpbnB1dCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hJbmRleCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9iai5tb250aCA9IG1hdGNoSW5kZXggJSAxMiB8fCBtYXRjaEluZGV4O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgTU1NTTogW1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hXb3JkLFxuICAgICAgICAgICAgICAgIChvYmosIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRocyA9IHRoaXMuZ2V0QWxsTW9udGhzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoSW5kZXggPSBtb250aHMuaW5kZXhPZihpbnB1dCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hJbmRleCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9iai5tb250aCA9IG1hdGNoSW5kZXggJSAxMiB8fCBtYXRjaEluZGV4O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgeTogW3RoaXMubWF0Y2hTaWduZWQsIHRoaXMuYWRkSW5wdXQoJ3llYXInKV0sXG4gICAgICAgICAgICB5eTogW1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2gyLFxuICAgICAgICAgICAgICAgIChvYmosIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9iai55ZWFyID0gdGhpcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB5eXl5OiBbdGhpcy5tYXRjaDQsIHRoaXMuYWRkSW5wdXQoJ3llYXInKV0sXG4gICAgICAgICAgICAvLyB6OiB0aGlzLnpvbmVFeHByZXNzaW9ucyxcbiAgICAgICAgICAgIC8vIHp6OiB0aGlzLnpvbmVFeHByZXNzaW9ucyxcbiAgICAgICAgICAgIC8vIHp6ejogdGhpcy56b25lRXhwcmVzc2lvbnNcbiAgICAgICAgfTtcbiAgICAgICAgLy8jZW5kcmVnaW9uIENERiBzdHVmZlxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFpbmFibGUgd2F5IHRvIHNldCB0aGUge0BsaW5rIGxvY2FsZX1cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2Ugc2V0TG9jYWxpemF0aW9uIHdpdGggYSBGb3JtYXRMb2NhbGl6YXRpb24gb2JqZWN0IGluc3RlYWRcbiAgICAgKi9cbiAgICBzZXRMb2NhbGUodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvY2FsaXphdGlvbikge1xuICAgICAgICAgICAgdGhpcy5sb2NhbGl6YXRpb24gPSBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDE7XG4gICAgICAgICAgICB0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhaW5hYmxlIHdheSB0byBzZXQgdGhlIHtAbGluayBsb2NhbGl6YXRpb259XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgc2V0TG9jYWxpemF0aW9uKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubG9jYWxpemF0aW9uID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHBsYWluIEpTIGRhdGUgb2JqZWN0IHRvIGEgRGF0ZVRpbWUgb2JqZWN0LlxuICAgICAqIERvaW5nIHRoaXMgYWxsb3dzIGFjY2VzcyB0byBmb3JtYXQsIGV0Yy5cbiAgICAgKiBAcGFyYW0gIGRhdGVcbiAgICAgKiBAcGFyYW0gbG9jYWxlIHRoaXMgcGFyYW1ldGVyIGlzIGRlcHJlY2F0ZWQuIFVzZSBmb3JtYXRMb2NhbGl6YXRpb24gaW5zdGVhZC5cbiAgICAgKiBAcGFyYW0gZm9ybWF0TG9jYWxpemF0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGNvbnZlcnQoZGF0ZSwgbG9jYWxlID0gJ2RlZmF1bHQnLCBmb3JtYXRMb2NhbGl6YXRpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFkYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBIGRhdGUgaXMgcmVxdWlyZWRgKTtcbiAgICAgICAgaWYgKCFmb3JtYXRMb2NhbGl6YXRpb24pIHtcbiAgICAgICAgICAgIGZvcm1hdExvY2FsaXphdGlvbiA9IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMTtcbiAgICAgICAgICAgIGZvcm1hdExvY2FsaXphdGlvbi5sb2NhbGUgPSBsb2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpLCBkYXRlLmdldE1pbGxpc2Vjb25kcygpKS5zZXRMb2NhbGl6YXRpb24oZm9ybWF0TG9jYWxpemF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTmF0aXZlIGRhdGUgbWFuaXB1bGF0aW9ucyBhcmUgbm90IHB1cmUgZnVuY3Rpb25zLiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSBkdXBsaWNhdGUgb2YgdGhlIERhdGVUaW1lIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXQgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLmRhdGUsIHRoaXMuaG91cnMsIHRoaXMubWludXRlcywgdGhpcy5zZWNvbmRzLCB0aGlzLmdldE1pbGxpc2Vjb25kcygpKS5zZXRMb2NhbGl6YXRpb24odGhpcy5sb2NhbGl6YXRpb24pO1xuICAgIH1cbiAgICBzdGF0aWMgaXNWYWxpZChkKSB7XG4gICAgICAgIGlmIChkID09PSB1bmRlZmluZWQgfHwgSlNPTi5zdHJpbmdpZnkoZCkgPT09ICdudWxsJylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGQuY29uc3RydWN0b3IubmFtZSA9PT0gRGF0ZVRpbWUubmFtZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgZGF0ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHtAbGluayB1bml0fSBwcm92aWRlZFxuICAgICAqIEV4YW1wbGU6IENvbnNpZGVyIGEgZGF0ZSBvZiBcIkFwcmlsIDMwLCAyMDIxLCAxMTo0NTozMi45ODQgQU1cIiA9PiBuZXcgRGF0ZVRpbWUoMjAyMSwgMywgMzAsIDExLCA0NSwgMzIsIDk4NCkuc3RhcnRPZignbW9udGgnKVxuICAgICAqIHdvdWxkIHJldHVybiBBcHJpbCAxLCAyMDIxLCAxMjowMDowMC4wMDAgQU0gKG1pZG5pZ2h0KVxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICogQHBhcmFtIHN0YXJ0T2ZUaGVXZWVrIEFsbG93cyBmb3IgdGhlIGNoYW5naW5nIHRoZSBzdGFydCBvZiB0aGUgd2Vlay5cbiAgICAgKi9cbiAgICBzdGFydE9mKHVuaXQsIHN0YXJ0T2ZUaGVXZWVrID0gMCkge1xuICAgICAgICBpZiAodGhpc1t1bml0XSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbml0ICcke3VuaXR9JyBpcyBub3QgdmFsaWRgKTtcbiAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1pbGxpc2Vjb25kcygwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Vjb25kcygwLCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1pbnV0ZXMoMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vla0RheSc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0T2YoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53ZWVrRGF5ID09PSBzdGFydE9mVGhlV2VlaylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY29uc3QgZ29CYWNrID0gKHRoaXMud2Vla0RheSAtIHN0YXJ0T2ZUaGVXZWVrICsgNykgJSA3O1xuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZShnb0JhY2sgKiAtMSwgVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0T2YoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0T2YoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1vbnRoKDAsIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IGRhdGUgdG8gdGhlIGVuZCBvZiB0aGUge0BsaW5rIHVuaXR9IHByb3ZpZGVkXG4gICAgICogRXhhbXBsZTogQ29uc2lkZXIgYSBkYXRlIG9mIFwiQXByaWwgMzAsIDIwMjEsIDExOjQ1OjMyLjk4NCBBTVwiID0+IG5ldyBEYXRlVGltZSgyMDIxLCAzLCAzMCwgMTEsIDQ1LCAzMiwgOTg0KS5lbmRPZignbW9udGgnKVxuICAgICAqIHdvdWxkIHJldHVybiBBcHJpbCAzMCwgMjAyMSwgMTE6NTk6NTkuOTk5IFBNXG4gICAgICogQHBhcmFtIHVuaXRcbiAgICAgKiBAcGFyYW0gc3RhcnRPZlRoZVdlZWtcbiAgICAgKi9cbiAgICBlbmRPZih1bml0LCBzdGFydE9mVGhlV2VlayA9IDApIHtcbiAgICAgICAgaWYgKHRoaXNbdW5pdF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5pdCAnJHt1bml0fScgaXMgbm90IHZhbGlkYCk7XG4gICAgICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaWxsaXNlY29uZHMoOTk5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Vjb25kcyg1OSwgOTk5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1pbnV0ZXMoNTksIDU5LCA5OTkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vla0RheSc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kT2ZXZWVrID0gNiArIHN0YXJ0T2ZUaGVXZWVrO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLndlZWtEYXkgPT09IGVuZE9mV2VlaylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlKGVuZE9mV2VlayAtIHRoaXMud2Vla0RheSwgVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZE9mKFVuaXQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlKDEsIFVuaXQubW9udGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZSgwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgIHRoaXMuZW5kT2YoVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1vbnRoKDExLCAzMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZSBhIHtAbGluayB1bml0fSB2YWx1ZS4gVmFsdWUgY2FuIGJlIHBvc2l0aXZlIG9yIG5lZ2F0aXZlXG4gICAgICogRXhhbXBsZTogQ29uc2lkZXIgYSBkYXRlIG9mIFwiQXByaWwgMzAsIDIwMjEsIDExOjQ1OjMyLjk4NCBBTVwiID0+IG5ldyBEYXRlVGltZSgyMDIxLCAzLCAzMCwgMTEsIDQ1LCAzMiwgOTg0KS5tYW5pcHVsYXRlKDEsICdtb250aCcpXG4gICAgICogd291bGQgcmV0dXJuIE1heSAzMCwgMjAyMSwgMTE6NDU6MzIuOTg0IEFNXG4gICAgICogQHBhcmFtIHZhbHVlIEEgcG9zaXRpdmUgb3IgbmVnYXRpdmUgbnVtYmVyXG4gICAgICogQHBhcmFtIHVuaXRcbiAgICAgKi9cbiAgICBtYW5pcHVsYXRlKHZhbHVlLCB1bml0KSB7XG4gICAgICAgIGlmICh0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJyR7dW5pdH0nIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICB0aGlzW3VuaXRdICs9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRydWUgaWYge0BsaW5rIGNvbXBhcmV9IGlzIGJlZm9yZSB0aGlzIGRhdGVcbiAgICAgKiBAcGFyYW0gY29tcGFyZSBUaGUgRGF0ZS9EYXRlVGltZSB0byBjb21wYXJlXG4gICAgICogQHBhcmFtIHVuaXQgSWYgcHJvdmlkZWQsIHVzZXMge0BsaW5rIHN0YXJ0T2Z9IGZvclxuICAgICAqIGNvbXBhcmlzb24uXG4gICAgICovXG4gICAgaXNCZWZvcmUoY29tcGFyZSwgdW5pdCkge1xuICAgICAgICAvLyBJZiB0aGUgY29tcGFyaXNvbnMgaXMgdW5kZWZpbmVkLCByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKCFEYXRlVGltZS5pc1ZhbGlkKGNvbXBhcmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXVuaXQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPCBjb21wYXJlLnZhbHVlT2YoKTtcbiAgICAgICAgaWYgKHRoaXNbdW5pdF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5pdCAnJHt1bml0fScgaXMgbm90IHZhbGlkYCk7XG4gICAgICAgIHJldHVybiAodGhpcy5jbG9uZS5zdGFydE9mKHVuaXQpLnZhbHVlT2YoKSA8IGNvbXBhcmUuY2xvbmUuc3RhcnRPZih1bml0KS52YWx1ZU9mKCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB7QGxpbmsgY29tcGFyZX0gaXMgYWZ0ZXIgdGhpcyBkYXRlXG4gICAgICogQHBhcmFtIGNvbXBhcmUgVGhlIERhdGUvRGF0ZVRpbWUgdG8gY29tcGFyZVxuICAgICAqIEBwYXJhbSB1bml0IElmIHByb3ZpZGVkLCB1c2VzIHtAbGluayBzdGFydE9mfSBmb3JcbiAgICAgKiBjb21wYXJpc29uLlxuICAgICAqL1xuICAgIGlzQWZ0ZXIoY29tcGFyZSwgdW5pdCkge1xuICAgICAgICAvLyBJZiB0aGUgY29tcGFyaXNvbnMgaXMgdW5kZWZpbmVkLCByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKCFEYXRlVGltZS5pc1ZhbGlkKGNvbXBhcmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXVuaXQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPiBjb21wYXJlLnZhbHVlT2YoKTtcbiAgICAgICAgaWYgKHRoaXNbdW5pdF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5pdCAnJHt1bml0fScgaXMgbm90IHZhbGlkYCk7XG4gICAgICAgIHJldHVybiAodGhpcy5jbG9uZS5zdGFydE9mKHVuaXQpLnZhbHVlT2YoKSA+IGNvbXBhcmUuY2xvbmUuc3RhcnRPZih1bml0KS52YWx1ZU9mKCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB7QGxpbmsgY29tcGFyZX0gaXMgc2FtZSB0aGlzIGRhdGVcbiAgICAgKiBAcGFyYW0gY29tcGFyZSBUaGUgRGF0ZS9EYXRlVGltZSB0byBjb21wYXJlXG4gICAgICogQHBhcmFtIHVuaXQgSWYgcHJvdmlkZWQsIHVzZXMge0BsaW5rIHN0YXJ0T2Z9IGZvclxuICAgICAqIGNvbXBhcmlzb24uXG4gICAgICovXG4gICAgaXNTYW1lKGNvbXBhcmUsIHVuaXQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNvbXBhcmlzb25zIGlzIHVuZGVmaW5lZCwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZChjb21wYXJlKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF1bml0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID09PSBjb21wYXJlLnZhbHVlT2YoKTtcbiAgICAgICAgaWYgKHRoaXNbdW5pdF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5pdCAnJHt1bml0fScgaXMgbm90IHZhbGlkYCk7XG4gICAgICAgIGNvbXBhcmUgPSBEYXRlVGltZS5jb252ZXJ0KGNvbXBhcmUpO1xuICAgICAgICByZXR1cm4gKHRoaXMuY2xvbmUuc3RhcnRPZih1bml0KS52YWx1ZU9mKCkgPT09IGNvbXBhcmUuc3RhcnRPZih1bml0KS52YWx1ZU9mKCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGlzIGlzIGJldHdlZW4gdHdvIG90aGVyIERhdGVUaW1lcywgb3B0aW9uYWxseSBsb29raW5nIGF0IHVuaXQgc2NhbGUuIFRoZSBtYXRjaCBpcyBleGNsdXNpdmUuXG4gICAgICogQHBhcmFtIGxlZnRcbiAgICAgKiBAcGFyYW0gcmlnaHRcbiAgICAgKiBAcGFyYW0gdW5pdC5cbiAgICAgKiBAcGFyYW0gaW5jbHVzaXZpdHkuIEEgWyBpbmRpY2F0ZXMgaW5jbHVzaW9uIG9mIGEgdmFsdWUuIEEgKCBpbmRpY2F0ZXMgZXhjbHVzaW9uLlxuICAgICAqIElmIHRoZSBpbmNsdXNpdml0eSBwYXJhbWV0ZXIgaXMgdXNlZCwgYm90aCBpbmRpY2F0b3JzIG11c3QgYmUgcGFzc2VkLlxuICAgICAqL1xuICAgIGlzQmV0d2VlbihsZWZ0LCByaWdodCwgdW5pdCwgaW5jbHVzaXZpdHkgPSAnKCknKSB7XG4gICAgICAgIC8vIElmIG9uZSBvZiB0aGUgY29tcGFyaXNvbnMgaXMgdW5kZWZpbmVkLCByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKCFEYXRlVGltZS5pc1ZhbGlkKGxlZnQpIHx8ICFEYXRlVGltZS5pc1ZhbGlkKHJpZ2h0KSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gSWYgYSB1bml0IGlzIHByb3ZpZGVkIGFuZCBpcyBub3QgYSB2YWxpZCBwcm9wZXJ0eSBvZiB0aGUgRGF0ZVRpbWUgb2JqZWN0LCB0aHJvdyBhbiBlcnJvclxuICAgICAgICBpZiAodW5pdCAmJiB0aGlzW3VuaXRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5pdCAnJHt1bml0fScgaXMgbm90IHZhbGlkYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGVmdEluY2x1c2l2aXR5ID0gaW5jbHVzaXZpdHlbMF0gPT09ICcoJztcbiAgICAgICAgY29uc3QgcmlnaHRJbmNsdXNpdml0eSA9IGluY2x1c2l2aXR5WzFdID09PSAnKSc7XG4gICAgICAgIGNvbnN0IGlzTGVmdEluUmFuZ2UgPSBsZWZ0SW5jbHVzaXZpdHlcbiAgICAgICAgICAgID8gdGhpcy5pc0FmdGVyKGxlZnQsIHVuaXQpXG4gICAgICAgICAgICA6ICF0aGlzLmlzQmVmb3JlKGxlZnQsIHVuaXQpO1xuICAgICAgICBjb25zdCBpc1JpZ2h0SW5SYW5nZSA9IHJpZ2h0SW5jbHVzaXZpdHlcbiAgICAgICAgICAgID8gdGhpcy5pc0JlZm9yZShyaWdodCwgdW5pdClcbiAgICAgICAgICAgIDogIXRoaXMuaXNBZnRlcihyaWdodCwgdW5pdCk7XG4gICAgICAgIHJldHVybiBpc0xlZnRJblJhbmdlICYmIGlzUmlnaHRJblJhbmdlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGZsYXR0ZW5lZCBvYmplY3Qgb2YgdGhlIGRhdGUuIERvZXMgbm90IGluY2x1ZGUgbGl0ZXJhbHNcbiAgICAgKiBAcGFyYW0gbG9jYWxlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlXG4gICAgICovXG4gICAgcGFydHMobG9jYWxlID0gdGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlLCB0ZW1wbGF0ZSA9IHsgZGF0ZVN0eWxlOiAnZnVsbCcsIHRpbWVTdHlsZTogJ2xvbmcnIH0pIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSB7fTtcbiAgICAgICAgbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB0ZW1wbGF0ZSlcbiAgICAgICAgICAgIC5mb3JtYXRUb1BhcnRzKHRoaXMpXG4gICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4LnR5cGUgIT09ICdsaXRlcmFsJylcbiAgICAgICAgICAgIC5mb3JFYWNoKCh4KSA9PiAocGFydHNbeC50eXBlXSA9IHgudmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIHBhcnRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLmdldFNlY29uZHMoKVxuICAgICAqL1xuICAgIGdldCBzZWNvbmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTZWNvbmRzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuc2V0U2Vjb25kcygpXG4gICAgICovXG4gICAgc2V0IHNlY29uZHModmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTZWNvbmRzKHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0d28gZGlnaXQgaG91cnNcbiAgICAgKi9cbiAgICBnZXQgc2Vjb25kc0Zvcm1hdHRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHModW5kZWZpbmVkLCB0d29EaWdpdFRlbXBsYXRlKS5zZWNvbmQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuZ2V0TWludXRlcygpXG4gICAgICovXG4gICAgZ2V0IG1pbnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1pbnV0ZXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5zZXRNaW51dGVzKClcbiAgICAgKi9cbiAgICBzZXQgbWludXRlcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldE1pbnV0ZXModmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHR3byBkaWdpdCBtaW51dGVzXG4gICAgICovXG4gICAgZ2V0IG1pbnV0ZXNGb3JtYXR0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzKHVuZGVmaW5lZCwgdHdvRGlnaXRUZW1wbGF0ZSkubWludXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLmdldEhvdXJzKClcbiAgICAgKi9cbiAgICBnZXQgaG91cnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEhvdXJzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuc2V0SG91cnMoKVxuICAgICAqL1xuICAgIHNldCBob3Vycyh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldEhvdXJzKHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0d28gZGlnaXQgaG91ciwgZS5nLiAwMS4uLjEwXG4gICAgICogQHBhcmFtIGhvdXJDeWNsZSBQcm92aWRpbmcgYW4gaG91ciBjeWNsZSB3aWxsIGNoYW5nZSAwMCB0byAyNCBkZXBlbmRpbmcgb24gdGhlIGdpdmVuIHZhbHVlLlxuICAgICAqL1xuICAgIGdldEhvdXJzRm9ybWF0dGVkKGhvdXJDeWNsZSA9ICdoMTInKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzKHVuZGVmaW5lZCwgeyAuLi50d29EaWdpdFRlbXBsYXRlLCBob3VyQ3ljbGU6IGhvdXJDeWNsZSB9KVxuICAgICAgICAgICAgLmhvdXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWVyaWRpZW0gb2YgdGhlIGRhdGUuIEUuZy4gQU0gb3IgUE0uXG4gICAgICogSWYgdGhlIHtAbGluayBsb2NhbGV9IHByb3ZpZGVzIGEgXCJkYXlQZXJpb2RcIiB0aGVuIHRoaXMgd2lsbCBiZSByZXR1cm5lZCxcbiAgICAgKiBvdGhlcndpc2UgaXQgd2lsbCByZXR1cm4gQU0gb3IgUE0uXG4gICAgICogQHBhcmFtIGxvY2FsZVxuICAgICAqL1xuICAgIG1lcmlkaWVtKGxvY2FsZSA9IHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7XG4gICAgICAgICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICBob3VyMTI6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZm9ybWF0VG9QYXJ0cyh0aGlzKVxuICAgICAgICAgICAgLmZpbmQoKHApID0+IHAudHlwZSA9PT0gJ2RheVBlcmlvZCcpPy52YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5nZXREYXRlKClcbiAgICAgKi9cbiAgICBnZXQgZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLnNldERhdGUoKVxuICAgICAqL1xuICAgIHNldCBkYXRlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0ZSh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0d28gZGlnaXQgZGF0ZVxuICAgICAqL1xuICAgIGdldCBkYXRlRm9ybWF0dGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cyh1bmRlZmluZWQsIHR3b0RpZ2l0VGVtcGxhdGUpLmRheTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5nZXREYXkoKVxuICAgICAqL1xuICAgIGdldCB3ZWVrRGF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXkoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5nZXRNb250aCgpXG4gICAgICovXG4gICAgZ2V0IG1vbnRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNb250aCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBEYXRlLnNldE1vbnRoKClcbiAgICAgKi9cbiAgICBzZXQgbW9udGgodmFsdWUpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0TW9udGggPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHZhbHVlICsgMSk7XG4gICAgICAgIHRhcmdldE1vbnRoLnNldERhdGUoMCk7XG4gICAgICAgIGNvbnN0IGVuZE9mTW9udGggPSB0YXJnZXRNb250aC5nZXREYXRlKCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGUgPiBlbmRPZk1vbnRoKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBlbmRPZk1vbnRoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0TW9udGgodmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdHdvIGRpZ2l0LCBodW1hbiBleHBlY3RlZCBtb250aC4gRS5nLiBKYW51YXJ5ID0gMSwgRGVjZW1iZXIgPSAxMlxuICAgICAqL1xuICAgIGdldCBtb250aEZvcm1hdHRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHModW5kZWZpbmVkLCB0d29EaWdpdFRlbXBsYXRlKS5tb250aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gRGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICovXG4gICAgZ2V0IHllYXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZ1bGxZZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIERhdGUuc2V0RnVsbFllYXIoKVxuICAgICAqL1xuICAgIHNldCB5ZWFyKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0RnVsbFllYXIodmFsdWUpO1xuICAgIH1cbiAgICAvLyBib3Jyb3dlZCBhIGJ1bmNoIG9mIHN0dWZmIGZyb20gTHV4b25cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB3ZWVrIG9mIHRoZSB5ZWFyXG4gICAgICovXG4gICAgZ2V0IHdlZWsoKSB7XG4gICAgICAgIGNvbnN0IG9yZGluYWwgPSB0aGlzLmNvbXB1dGVPcmRpbmFsKCksIHdlZWtkYXkgPSB0aGlzLmdldFVUQ0RheSgpO1xuICAgICAgICBsZXQgd2Vla051bWJlciA9IE1hdGguZmxvb3IoKG9yZGluYWwgLSB3ZWVrZGF5ICsgMTApIC8gNyk7XG4gICAgICAgIGlmICh3ZWVrTnVtYmVyIDwgMSkge1xuICAgICAgICAgICAgd2Vla051bWJlciA9IHRoaXMud2Vla3NJbldlZWtZZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAod2Vla051bWJlciA+IHRoaXMud2Vla3NJbldlZWtZZWFyKCkpIHtcbiAgICAgICAgICAgIHdlZWtOdW1iZXIgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3ZWVrTnVtYmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2Ygd2Vla3MgaW4gdGhlIHllYXJcbiAgICAgKi9cbiAgICB3ZWVrc0luV2Vla1llYXIoKSB7XG4gICAgICAgIGNvbnN0IHAxID0gKHRoaXMueWVhciArXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMueWVhciAvIDQpIC1cbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy55ZWFyIC8gMTAwKSArXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMueWVhciAvIDQwMCkpICVcbiAgICAgICAgICAgIDcsIGxhc3QgPSB0aGlzLnllYXIgLSAxLCBwMiA9IChsYXN0ICtcbiAgICAgICAgICAgIE1hdGguZmxvb3IobGFzdCAvIDQpIC1cbiAgICAgICAgICAgIE1hdGguZmxvb3IobGFzdCAvIDEwMCkgK1xuICAgICAgICAgICAgTWF0aC5mbG9vcihsYXN0IC8gNDAwKSkgJVxuICAgICAgICAgICAgNztcbiAgICAgICAgcmV0dXJuIHAxID09PSA0IHx8IHAyID09PSAzID8gNTMgOiA1MjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiBpZiB0aGUgeWVhciBpcyBhIGxlYXAgeWVhciBvciBub3QuXG4gICAgICovXG4gICAgZ2V0IGlzTGVhcFllYXIoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy55ZWFyICUgNCA9PT0gMCAmJiAodGhpcy55ZWFyICUgMTAwICE9PSAwIHx8IHRoaXMueWVhciAlIDQwMCA9PT0gMCkpO1xuICAgIH1cbiAgICBjb21wdXRlT3JkaW5hbCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGUgK1xuICAgICAgICAgICAgKHRoaXMuaXNMZWFwWWVhciA/IHRoaXMubGVhcExhZGRlciA6IHRoaXMubm9uTGVhcExhZGRlcilbdGhpcy5tb250aF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBtb250aCB2YWx1ZXMgYmFzZWQgb24gdGhlIGN1cnJlbnQgbG9jYWxlXG4gICAgICovXG4gICAgZ2V0QWxsTW9udGhzKGZvcm1hdCA9ICdsb25nJykge1xuICAgICAgICBjb25zdCBhcHBseUZvcm1hdCA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSwge1xuICAgICAgICAgICAgbW9udGg6IGZvcm1hdCxcbiAgICAgICAgfSkuZm9ybWF0O1xuICAgICAgICByZXR1cm4gWy4uLkFycmF5KDEyKS5rZXlzKCldLm1hcCgobSkgPT4gYXBwbHlGb3JtYXQobmV3IERhdGUoMjAyMSwgbSkpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgYW4gZXhwYW5kZWQgdG9rZW4gc2V0IChlLmcuIExUL0xUUylcbiAgICAgKi9cbiAgICByZXBsYWNlVG9rZW5zKGZvcm1hdFN0ciwgZm9ybWF0cykge1xuICAgICAgICAvKioqXG4gICAgICAgICAqIF8gPT4gbWF0Y2hcbiAgICAgICAgICogYSA9PiBmaXJzdCBjYXB0dXJlIGdyb3VwLiBBbnl0aGluZyBiZXR3ZWVuIFsgYW5kIF1cbiAgICAgICAgICogYiA9PiBzZWNvbmQgY2FwdHVyZSBncm91cFxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZvcm1hdFN0ci5yZXBsYWNlKC8oXFxbW15bXFxdXSpdKXwoTFRTP3xsezEsNH18THsxLDR9KS9nLCAoXywgYSwgYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgQiA9IGIgJiYgYi50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGEgfHwgZm9ybWF0c1tCXSB8fCBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEuZGF0ZUZvcm1hdHNbQl07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCkge1xuICAgICAgICBpbnB1dCA9ICtpbnB1dDtcbiAgICAgICAgcmV0dXJuIGlucHV0ICsgKGlucHV0ID4gNjggPyAxOTAwIDogMjAwMCk7XG4gICAgfVxuICAgIG9mZnNldEZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIGlmICghc3RyaW5nKVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIGlmIChzdHJpbmcgPT09ICdaJylcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICBjb25zdCBbZmlyc3QsIHNlY29uZCwgdGhpcmRdID0gc3RyaW5nLm1hdGNoKC8oWystXXxcXGRcXGQpL2cpO1xuICAgICAgICBjb25zdCBtaW51dGVzID0gKyhzZWNvbmQgKiA2MCkgKyAoK3RoaXJkIHx8IDApO1xuICAgICAgICBjb25zdCBzaWduZWQgPSBmaXJzdCA9PT0gJysnID8gLW1pbnV0ZXMgOiBtaW51dGVzO1xuICAgICAgICByZXR1cm4gbWludXRlcyA9PT0gMCA/IDAgOiBzaWduZWQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICB9XG4gICAgLyoqXG4gICAgICogeiA9IC00LCB6eiA9IC0wNCwgenp6ID0gLTA0MDBcbiAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAqIEBwYXJhbSBzdHlsZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgem9uZUluZm9ybWF0aW9uKGRhdGUsIHN0eWxlKSB7XG4gICAgICAgIGxldCBuYW1lID0gZGF0ZVxuICAgICAgICAgICAgLnBhcnRzKHRoaXMubG9jYWxpemF0aW9uLmxvY2FsZSwgeyB0aW1lWm9uZU5hbWU6ICdsb25nT2Zmc2V0JyB9KVxuICAgICAgICAgICAgLnRpbWVab25lTmFtZS5yZXBsYWNlKCdHTVQnLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKCc6JywgJycpO1xuICAgICAgICBjb25zdCBuZWdhdGl2ZSA9IG5hbWUuaW5jbHVkZXMoJy0nKTtcbiAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgnLScsICcnKTtcbiAgICAgICAgaWYgKHN0eWxlID09PSAneicpXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMSwgMik7XG4gICAgICAgIGVsc2UgaWYgKHN0eWxlID09PSAnenonKVxuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDAsIDIpO1xuICAgICAgICByZXR1cm4gYCR7bmVnYXRpdmUgPyAnLScgOiAnJ30ke25hbWV9YDtcbiAgICB9XG4gICAgYWRkSW5wdXQocHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuICh0aW1lLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgdGltZVtwcm9wZXJ0eV0gPSAraW5wdXQ7XG4gICAgICAgIH07XG4gICAgfVxuICAgIG1lcmlkaWVtTWF0Y2goaW5wdXQpIHtcbiAgICAgICAgY29uc3QgbWVyaWRpZW0gPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUsIHtcbiAgICAgICAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIGhvdXIxMjogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5mb3JtYXRUb1BhcnRzKG5ldyBEYXRlKDIwMjIsIDMsIDQsIDEzKSlcbiAgICAgICAgICAgIC5maW5kKChwKSA9PiBwLnR5cGUgPT09ICdkYXlQZXJpb2QnKT8udmFsdWU7XG4gICAgICAgIHJldHVybiBpbnB1dC50b0xvd2VyQ2FzZSgpID09PSBtZXJpZGllbS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBjb3JyZWN0SG91cnModGltZSkge1xuICAgICAgICBjb25zdCB7IGFmdGVybm9vbiB9ID0gdGltZTtcbiAgICAgICAgaWYgKGFmdGVybm9vbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IGhvdXJzIH0gPSB0aW1lO1xuICAgICAgICAgICAgaWYgKGFmdGVybm9vbikge1xuICAgICAgICAgICAgICAgIGlmIChob3VycyA8IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUuaG91cnMgKz0gMTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaG91cnMgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgdGltZS5ob3VycyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgdGltZS5hZnRlcm5vb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWFrZVBhcnNlcihmb3JtYXQpIHtcbiAgICAgICAgZm9ybWF0ID0gdGhpcy5yZXBsYWNlVG9rZW5zKGZvcm1hdCwgdGhpcy5sb2NhbGl6YXRpb24uZGF0ZUZvcm1hdHMpO1xuICAgICAgICBjb25zdCBhcnJheSA9IGZvcm1hdC5tYXRjaCh0aGlzLmZvcm1hdHRpbmdUb2tlbnMpO1xuICAgICAgICBjb25zdCB7IGxlbmd0aCB9ID0gYXJyYXk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gYXJyYXlbaV07XG4gICAgICAgICAgICBjb25zdCBwYXJzZVRvID0gdGhpcy5leHByZXNzaW9uc1t0b2tlbl07XG4gICAgICAgICAgICBjb25zdCByZWdleCA9IHBhcnNlVG8gJiYgcGFyc2VUb1swXTtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlciA9IHBhcnNlVG8gJiYgcGFyc2VUb1sxXTtcbiAgICAgICAgICAgIGlmIChwYXJzZXIpIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IHsgcmVnZXgsIHBhcnNlciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSB0b2tlbi5yZXBsYWNlKC9eXFxbW15bXFxdXSpdJC9nLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IHtcbiAgICAgICAgICAgICAgICBob3VyczogMCxcbiAgICAgICAgICAgICAgICBtaW51dGVzOiAwLFxuICAgICAgICAgICAgICAgIHNlY29uZHM6IDAsXG4gICAgICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBzdGFydCA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gYXJyYXlbaV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgKz0gdG9rZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyByZWdleCwgcGFyc2VyIH0gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydCA9IGlucHV0LnNsaWNlKHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKHBhcnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuY2FsbCh0aGlzLCB0aW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSh2YWx1ZSwgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29ycmVjdEhvdXJzKHRpbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIGNyZWF0ZSBhIERhdGVUaW1lIGZyb20gYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIGlucHV0IGRhdGUgYXMgc3RyaW5nXG4gICAgICogQHBhcmFtIGxvY2FsaXphdGlvbiBwcm92aWRlcyB0aGUgZGF0ZSB0ZW1wbGF0ZSB0aGUgc3RyaW5nIGlzIGluIHZpYSB0aGUgZm9ybWF0IHByb3BlcnR5XG4gICAgICovXG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgc3RhdGljIGZyb21TdHJpbmcoaW5wdXQsIGxvY2FsaXphdGlvbikge1xuICAgICAgICBpZiAoIWxvY2FsaXphdGlvbj8uZm9ybWF0KSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5jdXN0b21EYXRlRm9ybWF0RXJyb3IoJ05vIGZvcm1hdCB3YXMgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZVRpbWUoKTtcbiAgICAgICAgICAgIGR0LnNldExvY2FsaXphdGlvbihsb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgaWYgKFsneCcsICdYJ10uaW5kZXhPZihsb2NhbGl6YXRpb24uZm9ybWF0KSA+IC0xKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoKGxvY2FsaXphdGlvbi5mb3JtYXQgPT09ICdYJyA/IDEwMDAgOiAxKSAqICtpbnB1dCk7XG4gICAgICAgICAgICBjb25zdCBwYXJzZXIgPSBkdC5tYWtlUGFyc2VyKGxvY2FsaXphdGlvbi5mb3JtYXQpO1xuICAgICAgICAgICAgY29uc3QgeyB5ZWFyLCBtb250aCwgZGF5LCBob3VycywgbWludXRlcywgc2Vjb25kcywgbWlsbGlzZWNvbmRzLCB6b25lIH0gPSBwYXJzZXIoaW5wdXQpO1xuICAgICAgICAgICAgY29uc3QgZCA9IGRheSB8fCAoIXllYXIgJiYgIW1vbnRoID8gZHQuZ2V0RGF0ZSgpIDogMSk7XG4gICAgICAgICAgICBjb25zdCB5ID0geWVhciB8fCBkdC5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgbGV0IE0gPSAwO1xuICAgICAgICAgICAgaWYgKCEoeWVhciAmJiAhbW9udGgpKSB7XG4gICAgICAgICAgICAgICAgTSA9IG1vbnRoID4gMCA/IG1vbnRoIC0gMSA6IGR0LmdldE1vbnRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoem9uZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoRGF0ZS5VVEMoeSwgTSwgZCwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcyArIHpvbmUub2Zmc2V0ICogNjAgKiAxMDAwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKHksIE0sIGQsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5jdXN0b21EYXRlRm9ybWF0RXJyb3IoYFVuYWJsZSB0byBwYXJzZSBwcm92aWRlZCBpbnB1dDogJHtpbnB1dH0sIGZvcm1hdDogJHtsb2NhbGl6YXRpb24uZm9ybWF0fWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgZm9ybWF0LlxuICAgICAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsL0RhdGVUaW1lRm9ybWF0XG4gICAgICogZm9yIHZhbGlkIHRlbXBsYXRlcyBhbmQgbG9jYWxlIG9iamVjdHNcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgQW4gb3B0aW9uYWwgb2JqZWN0LiBJZiBwcm92aWRlZCwgbWV0aG9kIHdpbGwgdXNlIEludGwuLCBvdGhlcndpc2UgdGhlIGxvY2FsaXphdGlvbnMgZm9ybWF0IHByb3BlcnRpZXNcbiAgICAgKiBAcGFyYW0gbG9jYWxlIENhbiBiZSBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzLiBVc2VzIGJyb3dzZXIgZGVmYXVsdHMgb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGZvcm1hdCh0ZW1wbGF0ZSwgbG9jYWxlID0gdGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlKSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZSAmJiB0eXBlb2YgdGVtcGxhdGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgdGVtcGxhdGUpLmZvcm1hdCh0aGlzKTtcbiAgICAgICAgY29uc3QgZm9ybWF0U3RyaW5nID0gdGhpcy5yZXBsYWNlVG9rZW5zKFxuICAgICAgICAvL3RyeSB0ZW1wbGF0ZSBmaXJzdFxuICAgICAgICB0ZW1wbGF0ZSB8fFxuICAgICAgICAgICAgLy9vdGhlcndpc2UgdHJ5IGxvY2FsaXphdGlvbiBmb3JtYXRcbiAgICAgICAgICAgIHRoaXMubG9jYWxpemF0aW9uLmZvcm1hdCB8fFxuICAgICAgICAgICAgLy9vdGhlcndpc2UgdHJ5IGRhdGUgKyB0aW1lXG4gICAgICAgICAgICBgJHtEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEuZGF0ZUZvcm1hdHMuTH0sICR7RGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmRhdGVGb3JtYXRzLkxUfWAsIHRoaXMubG9jYWxpemF0aW9uLmRhdGVGb3JtYXRzKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gKHRlbXBsYXRlKSA9PiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsaXphdGlvbi5sb2NhbGUsIHRlbXBsYXRlKS5mb3JtYXQodGhpcyk7XG4gICAgICAgIGlmICghdGhpcy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlKVxuICAgICAgICAgICAgdGhpcy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlID0gZ3Vlc3NIb3VyQ3ljbGUodGhpcy5sb2NhbGl6YXRpb24ubG9jYWxlKTtcbiAgICAgICAgLy9pZiB0aGUgZm9ybWF0IGFza3MgZm9yIGEgdHdlbnR5LWZvdXItaG91ciBzdHJpbmcgYnV0IHRoZSBob3VyIGN5Y2xlIGlzIG5vdCwgdGhlbiBtYWtlIGEgYmFzZSBndWVzc1xuICAgICAgICBjb25zdCBISEN5Y2xlID0gdGhpcy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlLnN0YXJ0c1dpdGgoJ2gxJylcbiAgICAgICAgICAgID8gJ2gyNCdcbiAgICAgICAgICAgIDogdGhpcy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlO1xuICAgICAgICBjb25zdCBoaEN5Y2xlID0gdGhpcy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlLnN0YXJ0c1dpdGgoJ2gyJylcbiAgICAgICAgICAgID8gJ2gxMidcbiAgICAgICAgICAgIDogdGhpcy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0ge1xuICAgICAgICAgICAgeXk6IGZvcm1hdHRlcih7IHllYXI6ICcyLWRpZ2l0JyB9KSxcbiAgICAgICAgICAgIHl5eXk6IHRoaXMueWVhcixcbiAgICAgICAgICAgIE06IGZvcm1hdHRlcih7IG1vbnRoOiAnbnVtZXJpYycgfSksXG4gICAgICAgICAgICBNTTogdGhpcy5tb250aEZvcm1hdHRlZCxcbiAgICAgICAgICAgIE1NTTogdGhpcy5nZXRBbGxNb250aHMoJ3Nob3J0JylbdGhpcy5nZXRNb250aCgpXSxcbiAgICAgICAgICAgIE1NTU06IHRoaXMuZ2V0QWxsTW9udGhzKClbdGhpcy5nZXRNb250aCgpXSxcbiAgICAgICAgICAgIGQ6IHRoaXMuZGF0ZSxcbiAgICAgICAgICAgIGRkOiB0aGlzLmRhdGVGb3JtYXR0ZWQsXG4gICAgICAgICAgICBkZGQ6IGZvcm1hdHRlcih7IHdlZWtkYXk6ICdzaG9ydCcgfSksXG4gICAgICAgICAgICBkZGRkOiBmb3JtYXR0ZXIoeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gICAgICAgICAgICBIOiB0aGlzLmdldEhvdXJzKCksXG4gICAgICAgICAgICBISDogdGhpcy5nZXRIb3Vyc0Zvcm1hdHRlZChISEN5Y2xlKSxcbiAgICAgICAgICAgIGg6IHRoaXMuaG91cnMgPiAxMiA/IHRoaXMuaG91cnMgLSAxMiA6IHRoaXMuaG91cnMsXG4gICAgICAgICAgICBoaDogdGhpcy5nZXRIb3Vyc0Zvcm1hdHRlZChoaEN5Y2xlKSxcbiAgICAgICAgICAgIHQ6IHRoaXMubWVyaWRpZW0oKSxcbiAgICAgICAgICAgIFQ6IHRoaXMubWVyaWRpZW0oKS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgbTogdGhpcy5taW51dGVzLFxuICAgICAgICAgICAgbW06IHRoaXMubWludXRlc0Zvcm1hdHRlZCxcbiAgICAgICAgICAgIHM6IHRoaXMuc2Vjb25kcyxcbiAgICAgICAgICAgIHNzOiB0aGlzLnNlY29uZHNGb3JtYXR0ZWQsXG4gICAgICAgICAgICBmZmY6IHRoaXMuZ2V0TWlsbGlzZWNvbmRzKCksXG4gICAgICAgICAgICAvLyB6OiB0aGlzLnpvbmVJbmZvcm1hdGlvbihkYXRlVGltZSwgJ3onKSwgLy8tNFxuICAgICAgICAgICAgLy8geno6IHRoaXMuem9uZUluZm9ybWF0aW9uKGRhdGVUaW1lLCAnenonKSwgLy8tMDRcbiAgICAgICAgICAgIC8vIHp6ejogdGhpcy56b25lSW5mb3JtYXRpb24oZGF0ZVRpbWUsICd6enonKSAvLy0wNDAwXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmb3JtYXRTdHJpbmdcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuZGF0ZVRpbWVSZWdleCwgKG1hdGNoLCAkMSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICQxIHx8IG1hdGNoZXNbbWF0Y2hdO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcWy9nLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9dL2csICcnKTtcbiAgICB9XG59XG5cbmNsYXNzIFNlcnZpY2VMb2NhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgbG9jYXRlKGlkZW50aWZpZXIpIHtcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IHRoaXMuY2FjaGUuZ2V0KGlkZW50aWZpZXIpO1xuICAgICAgICBpZiAoc2VydmljZSlcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG5ldyBpZGVudGlmaWVyKCk7XG4gICAgICAgIHRoaXMuY2FjaGUuc2V0KGlkZW50aWZpZXIsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cbmNvbnN0IHNldHVwU2VydmljZUxvY2F0b3IgPSAoKSA9PiB7XG4gICAgc2VydmljZUxvY2F0b3IgPSBuZXcgU2VydmljZUxvY2F0b3IoKTtcbn07XG5sZXQgc2VydmljZUxvY2F0b3I7XG5cbmNvbnN0IENhbGVuZGFyTW9kZXMgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnY2FsZW5kYXInLFxuICAgICAgICBjbGFzc05hbWU6IE5hbWVzcGFjZS5jc3MuZGF5c0NvbnRhaW5lcixcbiAgICAgICAgdW5pdDogVW5pdC5tb250aCxcbiAgICAgICAgc3RlcDogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ21vbnRocycsXG4gICAgICAgIGNsYXNzTmFtZTogTmFtZXNwYWNlLmNzcy5tb250aHNDb250YWluZXIsXG4gICAgICAgIHVuaXQ6IFVuaXQueWVhcixcbiAgICAgICAgc3RlcDogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3llYXJzJyxcbiAgICAgICAgY2xhc3NOYW1lOiBOYW1lc3BhY2UuY3NzLnllYXJzQ29udGFpbmVyLFxuICAgICAgICB1bml0OiBVbml0LnllYXIsXG4gICAgICAgIHN0ZXA6IDEwLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZGVjYWRlcycsXG4gICAgICAgIGNsYXNzTmFtZTogTmFtZXNwYWNlLmNzcy5kZWNhZGVzQ29udGFpbmVyLFxuICAgICAgICB1bml0OiBVbml0LnllYXIsXG4gICAgICAgIHN0ZXA6IDEwMCxcbiAgICB9LFxuXTtcblxuY2xhc3MgT3B0aW9uc1N0b3JlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudENhbGVuZGFyVmlld01vZGUgPSAwO1xuICAgICAgICB0aGlzLl92aWV3RGF0ZSA9IG5ldyBEYXRlVGltZSgpO1xuICAgICAgICB0aGlzLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9ICdjYWxlbmRhcic7XG4gICAgfVxuICAgIGdldCBjdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDYWxlbmRhclZpZXdNb2RlO1xuICAgIH1cbiAgICBzZXQgY3VycmVudENhbGVuZGFyVmlld01vZGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudENhbGVuZGFyVmlld01vZGUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IENhbGVuZGFyTW9kZXNbdmFsdWVdLm5hbWU7XG4gICAgfVxuICAgIGdldCB2aWV3RGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZXdEYXRlO1xuICAgIH1cbiAgICBzZXQgdmlld0RhdGUodikge1xuICAgICAgICB0aGlzLl92aWV3RGF0ZSA9IHY7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMudmlld0RhdGUgPSB2O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIHN3aXRjaGluZyBiYWNrIHRvIHRoZSBjYWxlbmRhciBmcm9tIHRoZSBjbG9jayxcbiAgICAgKiB0aGlzIHNldHMgY3VycmVudFZpZXcgdG8gdGhlIGNvcnJlY3QgY2FsZW5kYXIgdmlldy5cbiAgICAgKi9cbiAgICByZWZyZXNoQ3VycmVudFZpZXcoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSBDYWxlbmRhck1vZGVzW3RoaXMuY3VycmVudENhbGVuZGFyVmlld01vZGVdLm5hbWU7XG4gICAgfVxuICAgIGdldCBpc1R3ZWx2ZUhvdXIoKSB7XG4gICAgICAgIHJldHVybiBbJ2gxMicsICdoMTEnXS5pbmNsdWRlcyh0aGlzLm9wdGlvbnMubG9jYWxpemF0aW9uLmhvdXJDeWNsZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIE1haW4gY2xhc3MgZm9yIGRhdGUgdmFsaWRhdGlvbiBydWxlcyBiYXNlZCBvbiB0aGUgb3B0aW9ucyBwcm92aWRlZC5cbiAqL1xuY2xhc3MgVmFsaWRhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIHRhcmdldCBkYXRlIGlzIHZhbGlkIGJhc2VkIG9uIHRoZSBydWxlcyBwcm92aWRlZCBpbiB0aGUgb3B0aW9ucy5cbiAgICAgKiBHcmFudWxhcml0eSBjYW4gYmUgcHJvdmlkZWQgdG8gY2hlY2sgcG9ydGlvbnMgb2YgdGhlIGRhdGUgaW5zdGVhZCBvZiB0aGUgd2hvbGUuXG4gICAgICogQHBhcmFtIHRhcmdldERhdGVcbiAgICAgKiBAcGFyYW0gZ3JhbnVsYXJpdHlcbiAgICAgKi9cbiAgICBpc1ZhbGlkKHRhcmdldERhdGUsIGdyYW51bGFyaXR5KSB7XG4gICAgICAgIGlmICghdGhpcy5fZW5hYmxlZERpc2FibGVkRGF0ZXNJc1ZhbGlkKGdyYW51bGFyaXR5LCB0YXJnZXREYXRlKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGdyYW51bGFyaXR5ICE9PSBVbml0Lm1vbnRoICYmXG4gICAgICAgICAgICBncmFudWxhcml0eSAhPT0gVW5pdC55ZWFyICYmXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kYXlzT2ZXZWVrRGlzYWJsZWQ/Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRheXNPZldlZWtEaXNhYmxlZC5pbmRleE9mKHRhcmdldERhdGUud2Vla0RheSkgIT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuX21pbk1heElzVmFsaWQoZ3JhbnVsYXJpdHksIHRhcmdldERhdGUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZ3JhbnVsYXJpdHkgPT09IFVuaXQuaG91cnMgfHxcbiAgICAgICAgICAgIGdyYW51bGFyaXR5ID09PSBVbml0Lm1pbnV0ZXMgfHxcbiAgICAgICAgICAgIGdyYW51bGFyaXR5ID09PSBVbml0LnNlY29uZHMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZW5hYmxlZERpc2FibGVkSG91cnNJc1ZhbGlkKHRhcmdldERhdGUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZFRpbWVJbnRlcnZhbHM/LmZpbHRlcigoaW50ZXJuYWwpID0+IHRhcmdldERhdGUuaXNCZXR3ZWVuKGludGVybmFsLmZyb20sIGludGVybmFsLnRvKSkubGVuZ3RoICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgX2VuYWJsZWREaXNhYmxlZERhdGVzSXNWYWxpZChncmFudWxhcml0eSwgdGFyZ2V0RGF0ZSkge1xuICAgICAgICBpZiAoZ3JhbnVsYXJpdHkgIT09IFVuaXQuZGF0ZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWREYXRlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICB0aGlzLl9pc0luRGlzYWJsZWREYXRlcyh0YXJnZXREYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBSZWR1bmRhbnRJZlN0YXRlbWVudEpTXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkRGF0ZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgIXRoaXMuX2lzSW5FbmFibGVkRGF0ZXModGFyZ2V0RGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgZGlzYWJsZWREYXRlcyBvcHRpb24gaXMgaW4gdXNlIGFuZCByZXR1cm5zIHRydWUgKG1lYW5pbmcgaW52YWxpZClcbiAgICAgKiBpZiB0aGUgYHRlc3REYXRlYCBpcyB3aXRoIGluIHRoZSBhcnJheS4gR3JhbnVsYXJpdHkgaXMgYnkgZGF0ZS5cbiAgICAgKiBAcGFyYW0gdGVzdERhdGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0luRGlzYWJsZWREYXRlcyh0ZXN0RGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkRGF0ZXMgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmRpc2FibGVkRGF0ZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gISF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZERhdGVzLmZpbmQoKHgpID0+IHguaXNTYW1lKHRlc3REYXRlLCBVbml0LmRhdGUpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgZW5hYmxlZERhdGVzIG9wdGlvbiBpcyBpbiB1c2UgYW5kIHJldHVybnMgdHJ1ZSAobWVhbmluZyB2YWxpZClcbiAgICAgKiBpZiB0aGUgYHRlc3REYXRlYCBpcyB3aXRoIGluIHRoZSBhcnJheS4gR3JhbnVsYXJpdHkgaXMgYnkgZGF0ZS5cbiAgICAgKiBAcGFyYW0gdGVzdERhdGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc0luRW5hYmxlZERhdGVzKHRlc3REYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZERhdGVzIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkRGF0ZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiAhIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWREYXRlcy5maW5kKCh4KSA9PiB4LmlzU2FtZSh0ZXN0RGF0ZSwgVW5pdC5kYXRlKSk7XG4gICAgfVxuICAgIF9taW5NYXhJc1ZhbGlkKGdyYW51bGFyaXR5LCB0YXJnZXREYXRlKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5taW5EYXRlICYmXG4gICAgICAgICAgICB0YXJnZXREYXRlLmlzQmVmb3JlKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLm1pbkRhdGUsIGdyYW51bGFyaXR5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBSZWR1bmRhbnRJZlN0YXRlbWVudEpTXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5tYXhEYXRlICYmXG4gICAgICAgICAgICB0YXJnZXREYXRlLmlzQWZ0ZXIodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMubWF4RGF0ZSwgZ3JhbnVsYXJpdHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9lbmFibGVkRGlzYWJsZWRIb3Vyc0lzVmFsaWQodGFyZ2V0RGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWRIb3Vycy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICB0aGlzLl9pc0luRGlzYWJsZWRIb3Vycyh0YXJnZXREYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBSZWR1bmRhbnRJZlN0YXRlbWVudEpTXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkSG91cnMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgIXRoaXMuX2lzSW5FbmFibGVkSG91cnModGFyZ2V0RGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgZGlzYWJsZWRIb3VycyBvcHRpb24gaXMgaW4gdXNlIGFuZCByZXR1cm5zIHRydWUgKG1lYW5pbmcgaW52YWxpZClcbiAgICAgKiBpZiB0aGUgYHRlc3REYXRlYCBpcyB3aXRoIGluIHRoZSBhcnJheS4gR3JhbnVsYXJpdHkgaXMgYnkgaG91cnMuXG4gICAgICogQHBhcmFtIHRlc3REYXRlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNJbkRpc2FibGVkSG91cnModGVzdERhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZEhvdXJzIHx8XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5kaXNhYmxlZEhvdXJzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IHRlc3REYXRlLmhvdXJzO1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZGlzYWJsZWRIb3Vycy5pbmNsdWRlcyhmb3JtYXR0ZWREYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgZW5hYmxlZEhvdXJzIG9wdGlvbiBpcyBpbiB1c2UgYW5kIHJldHVybnMgdHJ1ZSAobWVhbmluZyB2YWxpZClcbiAgICAgKiBpZiB0aGUgYHRlc3REYXRlYCBpcyB3aXRoIGluIHRoZSBhcnJheS4gR3JhbnVsYXJpdHkgaXMgYnkgaG91cnMuXG4gICAgICogQHBhcmFtIHRlc3REYXRlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNJbkVuYWJsZWRIb3Vycyh0ZXN0RGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLmVuYWJsZWRIb3VycyB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5yZXN0cmljdGlvbnMuZW5hYmxlZEhvdXJzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gdGVzdERhdGUuaG91cnM7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnJlc3RyaWN0aW9ucy5lbmFibGVkSG91cnMuaW5jbHVkZXMoZm9ybWF0dGVkRGF0ZSk7XG4gICAgfVxuICAgIGRhdGVSYW5nZUlzVmFsaWQoZGF0ZXMsIGluZGV4LCB0YXJnZXQpIHtcbiAgICAgICAgLy8gaWYgd2UncmUgbm90IHVzaW5nIHRoZSBvcHRpb24sIHRoZW4gcmV0dXJuIHZhbGlkXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kYXRlUmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gaWYgd2UndmUgb25seSBzZWxlY3RlZCAwLi4xIGRhdGVzLCBhbmQgd2UncmUgbm90IHNldHRpbmcgdGhlIGVuZCBkYXRlXG4gICAgICAgIC8vIHRoZW4gcmV0dXJuIHZhbGlkLiBXZSBvbmx5IHdhbnQgdG8gdmFsaWRhdGUgdGhlIHJhbmdlIGlmIGJvdGggYXJlIHNlbGVjdGVkLFxuICAgICAgICAvLyBiZWNhdXNlIHRoZSBvdGhlciB2YWxpZGF0aW9uIG9uIHRoZSB0YXJnZXQgaGFzIGFscmVhZHkgb2NjdXJyZWQuXG4gICAgICAgIGlmIChkYXRlcy5sZW5ndGggIT09IDIgJiYgaW5kZXggIT09IDEpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBzdGFydCBkYXRlXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gZGF0ZXNbMF0uY2xvbmU7XG4gICAgICAgIC8vIGNoZWNrIGlmIHN0YXJ0IGRhdGUgaXMgbm90IHRoZSBzYW1lIGFzIHRhcmdldCBkYXRlXG4gICAgICAgIGlmIChzdGFydC5pc1NhbWUodGFyZ2V0LCBVbml0LmRhdGUpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vIGFkZCBvbmUgZGF5IHRvIHN0YXJ0OyBzdGFydCBoYXMgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZFxuICAgICAgICBzdGFydC5tYW5pcHVsYXRlKDEsIFVuaXQuZGF0ZSk7XG4gICAgICAgIC8vIGNoZWNrIGVhY2ggZGF0ZSBpbiB0aGUgcmFuZ2UgdG8gbWFrZSBzdXJlIGl0J3MgdmFsaWRcbiAgICAgICAgd2hpbGUgKCFzdGFydC5pc1NhbWUodGFyZ2V0LCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMuaXNWYWxpZChzdGFydCwgVW5pdC5kYXRlKTtcbiAgICAgICAgICAgIGlmICghdmFsaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgc3RhcnQubWFuaXB1bGF0ZSgxLCBVbml0LmRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycyA9IFtdO1xuICAgIH1cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5zdWJzY3JpYmUuYmluZCh0aGlzLCB0aGlzLnN1YnNjcmliZXJzLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZShpbmRleCkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGVtaXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycyA9IG51bGw7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSBbXTtcbiAgICB9XG59XG5jbGFzcyBFdmVudEVtaXR0ZXJzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMudmlld1VwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3RGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnZpZXdVcGRhdGUuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmFjdGlvbi5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmlld0RhdGUuZGVzdHJveSgpO1xuICAgIH1cbn1cblxuY29uc3QgZGVmYXVsdEVuTG9jYWxpemF0aW9uID0ge1xuICAgIGNsZWFyOiAnQ2xlYXIgc2VsZWN0aW9uJyxcbiAgICBjbG9zZTogJ0Nsb3NlIHRoZSBwaWNrZXInLFxuICAgIGRhdGVGb3JtYXRzOiBEZWZhdWx0Rm9ybWF0TG9jYWxpemF0aW9uJDEuZGF0ZUZvcm1hdHMsXG4gICAgZGF5Vmlld0hlYWRlckZvcm1hdDogeyBtb250aDogJ2xvbmcnLCB5ZWFyOiAnMi1kaWdpdCcgfSxcbiAgICBkZWNyZW1lbnRIb3VyOiAnRGVjcmVtZW50IEhvdXInLFxuICAgIGRlY3JlbWVudE1pbnV0ZTogJ0RlY3JlbWVudCBNaW51dGUnLFxuICAgIGRlY3JlbWVudFNlY29uZDogJ0RlY3JlbWVudCBTZWNvbmQnLFxuICAgIGZvcm1hdDogRGVmYXVsdEZvcm1hdExvY2FsaXphdGlvbiQxLmZvcm1hdCxcbiAgICBob3VyQ3ljbGU6IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5ob3VyQ3ljbGUsXG4gICAgaW5jcmVtZW50SG91cjogJ0luY3JlbWVudCBIb3VyJyxcbiAgICBpbmNyZW1lbnRNaW51dGU6ICdJbmNyZW1lbnQgTWludXRlJyxcbiAgICBpbmNyZW1lbnRTZWNvbmQ6ICdJbmNyZW1lbnQgU2Vjb25kJyxcbiAgICBsb2NhbGU6IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5sb2NhbGUsXG4gICAgbmV4dENlbnR1cnk6ICdOZXh0IENlbnR1cnknLFxuICAgIG5leHREZWNhZGU6ICdOZXh0IERlY2FkZScsXG4gICAgbmV4dE1vbnRoOiAnTmV4dCBNb250aCcsXG4gICAgbmV4dFllYXI6ICdOZXh0IFllYXInLFxuICAgIG9yZGluYWw6IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMS5vcmRpbmFsLFxuICAgIHBpY2tIb3VyOiAnUGljayBIb3VyJyxcbiAgICBwaWNrTWludXRlOiAnUGljayBNaW51dGUnLFxuICAgIHBpY2tTZWNvbmQ6ICdQaWNrIFNlY29uZCcsXG4gICAgcHJldmlvdXNDZW50dXJ5OiAnUHJldmlvdXMgQ2VudHVyeScsXG4gICAgcHJldmlvdXNEZWNhZGU6ICdQcmV2aW91cyBEZWNhZGUnLFxuICAgIHByZXZpb3VzTW9udGg6ICdQcmV2aW91cyBNb250aCcsXG4gICAgcHJldmlvdXNZZWFyOiAnUHJldmlvdXMgWWVhcicsXG4gICAgc2VsZWN0RGF0ZTogJ1NlbGVjdCBEYXRlJyxcbiAgICBzZWxlY3REZWNhZGU6ICdTZWxlY3QgRGVjYWRlJyxcbiAgICBzZWxlY3RNb250aDogJ1NlbGVjdCBNb250aCcsXG4gICAgc2VsZWN0VGltZTogJ1NlbGVjdCBUaW1lJyxcbiAgICBzZWxlY3RZZWFyOiAnU2VsZWN0IFllYXInLFxuICAgIHN0YXJ0T2ZUaGVXZWVrOiAwLFxuICAgIHRvZGF5OiAnR28gdG8gdG9kYXknLFxuICAgIHRvZ2dsZU1lcmlkaWVtOiAnVG9nZ2xlIE1lcmlkaWVtJyxcbn07XG5jb25zdCBEZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBhbGxvd0lucHV0VG9nZ2xlOiBmYWxzZSxcbiAgICBjb250YWluZXI6IHVuZGVmaW5lZCxcbiAgICBkYXRlUmFuZ2U6IGZhbHNlLFxuICAgIGRlYnVnOiBmYWxzZSxcbiAgICBkZWZhdWx0RGF0ZTogdW5kZWZpbmVkLFxuICAgIGRpc3BsYXk6IHtcbiAgICAgICAgaWNvbnM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdpY29ucycsXG4gICAgICAgICAgICB0aW1lOiAnZmEtc29saWQgZmEtY2xvY2snLFxuICAgICAgICAgICAgZGF0ZTogJ2ZhLXNvbGlkIGZhLWNhbGVuZGFyJyxcbiAgICAgICAgICAgIHVwOiAnZmEtc29saWQgZmEtYXJyb3ctdXAnLFxuICAgICAgICAgICAgZG93bjogJ2ZhLXNvbGlkIGZhLWFycm93LWRvd24nLFxuICAgICAgICAgICAgcHJldmlvdXM6ICdmYS1zb2xpZCBmYS1jaGV2cm9uLWxlZnQnLFxuICAgICAgICAgICAgbmV4dDogJ2ZhLXNvbGlkIGZhLWNoZXZyb24tcmlnaHQnLFxuICAgICAgICAgICAgdG9kYXk6ICdmYS1zb2xpZCBmYS1jYWxlbmRhci1jaGVjaycsXG4gICAgICAgICAgICBjbGVhcjogJ2ZhLXNvbGlkIGZhLXRyYXNoJyxcbiAgICAgICAgICAgIGNsb3NlOiAnZmEtc29saWQgZmEteG1hcmsnLFxuICAgICAgICB9LFxuICAgICAgICBzaWRlQnlTaWRlOiBmYWxzZSxcbiAgICAgICAgY2FsZW5kYXJXZWVrczogZmFsc2UsXG4gICAgICAgIHZpZXdNb2RlOiAnY2FsZW5kYXInLFxuICAgICAgICB0b29sYmFyUGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgICAga2VlcE9wZW46IGZhbHNlLFxuICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICB0b2RheTogZmFsc2UsXG4gICAgICAgICAgICBjbGVhcjogZmFsc2UsXG4gICAgICAgICAgICBjbG9zZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIGNhbGVuZGFyOiB0cnVlLFxuICAgICAgICAgICAgZGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIG1vbnRoOiB0cnVlLFxuICAgICAgICAgICAgeWVhcjogdHJ1ZSxcbiAgICAgICAgICAgIGRlY2FkZXM6IHRydWUsXG4gICAgICAgICAgICBjbG9jazogdHJ1ZSxcbiAgICAgICAgICAgIGhvdXJzOiB0cnVlLFxuICAgICAgICAgICAgbWludXRlczogdHJ1ZSxcbiAgICAgICAgICAgIHNlY29uZHM6IGZhbHNlLFxuICAgICAgICAgICAgdXNlVHdlbnR5Zm91ckhvdXI6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgICAgaW5saW5lOiBmYWxzZSxcbiAgICAgICAgdGhlbWU6ICdhdXRvJyxcbiAgICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICB9LFxuICAgIGtlZXBJbnZhbGlkOiBmYWxzZSxcbiAgICBsb2NhbGl6YXRpb246IGRlZmF1bHRFbkxvY2FsaXphdGlvbixcbiAgICBtZXRhOiB7fSxcbiAgICBtdWx0aXBsZURhdGVzOiBmYWxzZSxcbiAgICBtdWx0aXBsZURhdGVzU2VwYXJhdG9yOiAnOyAnLFxuICAgIHByb21wdFRpbWVPbkRhdGVDaGFuZ2U6IGZhbHNlLFxuICAgIHByb21wdFRpbWVPbkRhdGVDaGFuZ2VUcmFuc2l0aW9uRGVsYXk6IDIwMCxcbiAgICByZXN0cmljdGlvbnM6IHtcbiAgICAgICAgbWluRGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICBtYXhEYXRlOiB1bmRlZmluZWQsXG4gICAgICAgIGRpc2FibGVkRGF0ZXM6IFtdLFxuICAgICAgICBlbmFibGVkRGF0ZXM6IFtdLFxuICAgICAgICBkYXlzT2ZXZWVrRGlzYWJsZWQ6IFtdLFxuICAgICAgICBkaXNhYmxlZFRpbWVJbnRlcnZhbHM6IFtdLFxuICAgICAgICBkaXNhYmxlZEhvdXJzOiBbXSxcbiAgICAgICAgZW5hYmxlZEhvdXJzOiBbXSxcbiAgICB9LFxuICAgIHN0ZXBwaW5nOiAxLFxuICAgIHVzZUN1cnJlbnQ6IHRydWUsXG4gICAgdmlld0RhdGU6IG5ldyBEYXRlVGltZSgpLFxufTtcbmNvbnN0IERlZmF1bHRFbkxvY2FsaXphdGlvbiA9IHsgLi4uZGVmYXVsdEVuTG9jYWxpemF0aW9uIH07XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gcHJvdmUgYGRgIGlzIGEgRGF0ZVRpbWUgb3IgRGF0ZSBvciBjYW4gYmUgY29udmVydGVkIGludG8gb25lLlxuICogQHBhcmFtIGQgSWYgYSBzdHJpbmcgd2lsbCBhdHRlbXB0IGNyZWF0aW5nIGEgZGF0ZSBmcm9tIGl0LlxuICogQHBhcmFtIGxvY2FsaXphdGlvbiBvYmplY3QgY29udGFpbmluZyBsb2NhbGUgYW5kIGZvcm1hdCBzZXR0aW5ncy4gT25seSB1c2VkIHdpdGggdGhlIGN1c3RvbSBmb3JtYXRzXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0cnlDb252ZXJ0VG9EYXRlVGltZShkLCBsb2NhbGl6YXRpb24pIHtcbiAgICBpZiAoIWQpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGlmIChkLmNvbnN0cnVjdG9yLm5hbWUgPT09IERhdGVUaW1lLm5hbWUpXG4gICAgICAgIHJldHVybiBkO1xuICAgIGlmIChkLmNvbnN0cnVjdG9yLm5hbWUgPT09IERhdGUubmFtZSkge1xuICAgICAgICByZXR1cm4gRGF0ZVRpbWUuY29udmVydChkKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkID09PSB0eXBlb2YgJycpIHtcbiAgICAgICAgY29uc3QgZGF0ZVRpbWUgPSBEYXRlVGltZS5mcm9tU3RyaW5nKGQsIGxvY2FsaXphdGlvbik7XG4gICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShkYXRlVGltZSkgPT09ICdudWxsJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGVUaW1lO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogQXR0ZW1wdHMgdG8gY29udmVydCBgZGAgdG8gYSBEYXRlVGltZSBvYmplY3RcbiAqIEBwYXJhbSBkIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEBwYXJhbSBvcHRpb25OYW1lIFByb3ZpZGVzIHRleHQgdG8gZXJyb3IgbWVzc2FnZXMgZS5nLiBkaXNhYmxlZERhdGVzXG4gKiBAcGFyYW0gbG9jYWxpemF0aW9uIG9iamVjdCBjb250YWluaW5nIGxvY2FsZSBhbmQgZm9ybWF0IHNldHRpbmdzLiBPbmx5IHVzZWQgd2l0aCB0aGUgY3VzdG9tIGZvcm1hdHNcbiAqL1xuZnVuY3Rpb24gY29udmVydFRvRGF0ZVRpbWUoZCwgb3B0aW9uTmFtZSwgbG9jYWxpemF0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBkID09PSB0eXBlb2YgJycgJiYgb3B0aW9uTmFtZSAhPT0gJ2lucHV0Jykge1xuICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5kYXRlU3RyaW5nKCk7XG4gICAgfVxuICAgIGNvbnN0IGNvbnZlcnRlZCA9IHRyeUNvbnZlcnRUb0RhdGVUaW1lKGQsIGxvY2FsaXphdGlvbik7XG4gICAgaWYgKCFjb252ZXJ0ZWQpIHtcbiAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuZmFpbGVkVG9QYXJzZURhdGUob3B0aW9uTmFtZSwgZCwgb3B0aW9uTmFtZSA9PT0gJ2lucHV0Jyk7XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJ0ZWQ7XG59XG4vKipcbiAqIFR5cGUgY2hlY2tzIHRoYXQgYHZhbHVlYCBpcyBhbiBhcnJheSBvZiBEYXRlIG9yIERhdGVUaW1lXG4gKiBAcGFyYW0gb3B0aW9uTmFtZSBQcm92aWRlcyB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzIGUuZy4gZGlzYWJsZWREYXRlc1xuICogQHBhcmFtIHZhbHVlIE9wdGlvbiB2YWx1ZVxuICogQHBhcmFtIHByb3ZpZGVkVHlwZSBVc2VkIHRvIHByb3ZpZGUgdGV4dCB0byBlcnJvciBtZXNzYWdlc1xuICogQHBhcmFtIGxvY2FsaXphdGlvblxuICovXG5mdW5jdGlvbiB0eXBlQ2hlY2tEYXRlQXJyYXkob3B0aW9uTmFtZSwgdmFsdWUsIC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5wcm92aWRlZFR5cGUsIGxvY2FsaXphdGlvbiA9IERlZmF1bHRGb3JtYXRMb2NhbGl6YXRpb24kMSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMudHlwZU1pc21hdGNoKG9wdGlvbk5hbWUsIHByb3ZpZGVkVHlwZSwgJ2FycmF5IG9mIERhdGVUaW1lIG9yIERhdGUnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkID0gdmFsdWVbaV07XG4gICAgICAgIGNvbnN0IGRhdGVUaW1lID0gY29udmVydFRvRGF0ZVRpbWUoZCwgb3B0aW9uTmFtZSwgbG9jYWxpemF0aW9uKTtcbiAgICAgICAgZGF0ZVRpbWUuc2V0TG9jYWxpemF0aW9uKGxvY2FsaXphdGlvbik7XG4gICAgICAgIHZhbHVlW2ldID0gZGF0ZVRpbWU7XG4gICAgfVxufVxuLyoqXG4gKiBUeXBlIGNoZWNrcyB0aGF0IGB2YWx1ZWAgaXMgYW4gYXJyYXkgb2YgbnVtYmVyc1xuICogQHBhcmFtIG9wdGlvbk5hbWUgUHJvdmlkZXMgdGV4dCB0byBlcnJvciBtZXNzYWdlcyBlLmcuIGRpc2FibGVkRGF0ZXNcbiAqIEBwYXJhbSB2YWx1ZSBPcHRpb24gdmFsdWVcbiAqIEBwYXJhbSBwcm92aWRlZFR5cGUgVXNlZCB0byBwcm92aWRlIHRleHQgdG8gZXJyb3IgbWVzc2FnZXNcbiAqL1xuZnVuY3Rpb24gdHlwZUNoZWNrTnVtYmVyQXJyYXkob3B0aW9uTmFtZSwgdmFsdWUsIC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5wcm92aWRlZFR5cGUpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLnNvbWUoKHgpID0+IHR5cGVvZiB4ICE9PSB0eXBlb2YgMCkpIHtcbiAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMudHlwZU1pc21hdGNoKG9wdGlvbk5hbWUsIHByb3ZpZGVkVHlwZSwgJ2FycmF5IG9mIG51bWJlcnMnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1hbmRhdG9yeURhdGUoa2V5KSB7XG4gICAgcmV0dXJuICh7IHZhbHVlLCBwcm92aWRlZFR5cGUsIGxvY2FsaXphdGlvbiB9KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGVUaW1lID0gY29udmVydFRvRGF0ZVRpbWUodmFsdWUsIGtleSwgbG9jYWxpemF0aW9uKTtcbiAgICAgICAgaWYgKGRhdGVUaW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRhdGVUaW1lLnNldExvY2FsaXphdGlvbihsb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVUaW1lO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG9wdGlvbmFsRGF0ZShrZXkpIHtcbiAgICBjb25zdCBtYW5kYXRvcnkgPSBtYW5kYXRvcnlEYXRlKGtleSk7XG4gICAgcmV0dXJuIChhcmdzKSA9PiB7XG4gICAgICAgIGlmIChhcmdzLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYW5kYXRvcnkoYXJncyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG51bWJlcnNJblJhbmdlKGtleSwgbG93ZXIsIHVwcGVyKSB7XG4gICAgcmV0dXJuICh7IHZhbHVlLCBwcm92aWRlZFR5cGUgfSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHR5cGVDaGVja051bWJlckFycmF5KGtleSwgdmFsdWUsIHByb3ZpZGVkVHlwZSk7XG4gICAgICAgIGlmICh2YWx1ZS5zb21lKCh4KSA9PiB4IDwgbG93ZXIgfHwgeCA+IHVwcGVyKSlcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLm51bWJlcnNPdXRPZlJhbmdlKGtleSwgbG93ZXIsIHVwcGVyKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59XG5mdW5jdGlvbiB2YWxpZEhvdXJSYW5nZShrZXkpIHtcbiAgICByZXR1cm4gbnVtYmVyc0luUmFuZ2Uoa2V5LCAwLCAyMyk7XG59XG5mdW5jdGlvbiB2YWxpZERhdGVBcnJheShrZXkpIHtcbiAgICByZXR1cm4gKHsgdmFsdWUsIHByb3ZpZGVkVHlwZSwgbG9jYWxpemF0aW9uIH0pID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICB0eXBlQ2hlY2tEYXRlQXJyYXkoa2V5LCB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBsb2NhbGl6YXRpb24pO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHZhbGlkS2V5T3B0aW9uKGtleU9wdGlvbnMpIHtcbiAgICByZXR1cm4gKHsgdmFsdWUsIHBhdGggfSkgPT4ge1xuICAgICAgICBpZiAoIWtleU9wdGlvbnMuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMudW5leHBlY3RlZE9wdGlvblZhbHVlKHBhdGguc3Vic3RyaW5nKDEpLCB2YWx1ZSwga2V5T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufVxuY29uc3Qgb3B0aW9uUHJvY2Vzc29ycyA9IE9iamVjdC5mcmVlemUoe1xuICAgIGRlZmF1bHREYXRlOiBtYW5kYXRvcnlEYXRlKCdkZWZhdWx0RGF0ZScpLFxuICAgIHZpZXdEYXRlOiBtYW5kYXRvcnlEYXRlKCd2aWV3RGF0ZScpLFxuICAgIG1pbkRhdGU6IG9wdGlvbmFsRGF0ZSgncmVzdHJpY3Rpb25zLm1pbkRhdGUnKSxcbiAgICBtYXhEYXRlOiBvcHRpb25hbERhdGUoJ3Jlc3RyaWN0aW9ucy5tYXhEYXRlJyksXG4gICAgZGlzYWJsZWRIb3VyczogdmFsaWRIb3VyUmFuZ2UoJ3Jlc3RyaWN0aW9ucy5kaXNhYmxlZEhvdXJzJyksXG4gICAgZW5hYmxlZEhvdXJzOiB2YWxpZEhvdXJSYW5nZSgncmVzdHJpY3Rpb25zLmVuYWJsZWRIb3VycycpLFxuICAgIGRpc2FibGVkRGF0ZXM6IHZhbGlkRGF0ZUFycmF5KCdyZXN0cmljdGlvbnMuZGlzYWJsZWREYXRlcycpLFxuICAgIGVuYWJsZWREYXRlczogdmFsaWREYXRlQXJyYXkoJ3Jlc3RyaWN0aW9ucy5lbmFibGVkRGF0ZXMnKSxcbiAgICBkYXlzT2ZXZWVrRGlzYWJsZWQ6IG51bWJlcnNJblJhbmdlKCdyZXN0cmljdGlvbnMuZGF5c09mV2Vla0Rpc2FibGVkJywgMCwgNiksXG4gICAgZGlzYWJsZWRUaW1lSW50ZXJ2YWxzOiAoeyBrZXksIHZhbHVlLCBwcm92aWRlZFR5cGUsIGxvY2FsaXphdGlvbiB9KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMudHlwZU1pc21hdGNoKGtleSwgcHJvdmlkZWRUeXBlLCAnYXJyYXkgb2YgeyBmcm9tOiBEYXRlVGltZXxEYXRlLCB0bzogRGF0ZVRpbWV8RGF0ZSB9Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWVPYmplY3QgPSB2YWx1ZTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZU9iamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModmFsdWVPYmplY3RbaV0pLmZvckVhY2goKHZrKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViT3B0aW9uTmFtZSA9IGAke2tleX1bJHtpfV0uJHt2a31gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSB2YWx1ZU9iamVjdFtpXVt2a107XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVRpbWUgPSBjb252ZXJ0VG9EYXRlVGltZShkLCBzdWJPcHRpb25OYW1lLCBsb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgICAgIGRhdGVUaW1lLnNldExvY2FsaXphdGlvbihsb2NhbGl6YXRpb24pO1xuICAgICAgICAgICAgICAgIHZhbHVlT2JqZWN0W2ldW3ZrXSA9IGRhdGVUaW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlT2JqZWN0O1xuICAgIH0sXG4gICAgdG9vbGJhclBsYWNlbWVudDogdmFsaWRLZXlPcHRpb24oWyd0b3AnLCAnYm90dG9tJywgJ2RlZmF1bHQnXSksXG4gICAgdHlwZTogdmFsaWRLZXlPcHRpb24oWydpY29ucycsICdzcHJpdGVzJ10pLFxuICAgIHZpZXdNb2RlOiB2YWxpZEtleU9wdGlvbihbXG4gICAgICAgICdjbG9jaycsXG4gICAgICAgICdjYWxlbmRhcicsXG4gICAgICAgICdtb250aHMnLFxuICAgICAgICAneWVhcnMnLFxuICAgICAgICAnZGVjYWRlcycsXG4gICAgXSksXG4gICAgdGhlbWU6IHZhbGlkS2V5T3B0aW9uKFsnbGlnaHQnLCAnZGFyaycsICdhdXRvJ10pLFxuICAgIHBsYWNlbWVudDogdmFsaWRLZXlPcHRpb24oWyd0b3AnLCAnYm90dG9tJ10pLFxuICAgIG1ldGE6ICh7IHZhbHVlIH0pID0+IHZhbHVlLFxuICAgIGRheVZpZXdIZWFkZXJGb3JtYXQ6ICh7IHZhbHVlIH0pID0+IHZhbHVlLFxuICAgIGNvbnRhaW5lcjogKHsgdmFsdWUsIHBhdGggfSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgICEodmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fFxuICAgICAgICAgICAgICAgIHZhbHVlIGluc3RhbmNlb2YgRWxlbWVudCB8fFxuICAgICAgICAgICAgICAgIHZhbHVlPy5hcHBlbmRDaGlsZCkpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChwYXRoLnN1YnN0cmluZygxKSwgdHlwZW9mIHZhbHVlLCAnSFRNTEVsZW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICB1c2VUd2VudHlmb3VySG91cjogKHsgdmFsdWUsIHBhdGgsIHByb3ZpZGVkVHlwZSwgZGVmYXVsdFR5cGUgfSkgPT4ge1xuICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5kZXByZWNhdGVkV2FybmluZygndXNlVHdlbnR5Zm91ckhvdXInLCAnUGxlYXNlIHVzZSBcIm9wdGlvbnMubG9jYWxpemF0aW9uLmhvdXJDeWNsZVwiIGluc3RlYWQnKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgcHJvdmlkZWRUeXBlID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnR5cGVNaXNtYXRjaChwYXRoLCBwcm92aWRlZFR5cGUsIGRlZmF1bHRUeXBlKTtcbiAgICB9LFxuICAgIGhvdXJDeWNsZTogdmFsaWRLZXlPcHRpb24oWydoMTEnLCAnaDEyJywgJ2gyMycsICdoMjQnXSksXG59KTtcbmNvbnN0IGRlZmF1bHRQcm9jZXNzb3IgPSAoeyB2YWx1ZSwgZGVmYXVsdFR5cGUsIHByb3ZpZGVkVHlwZSwgcGF0aCwgfSkgPT4ge1xuICAgIHN3aXRjaCAoZGVmYXVsdFR5cGUpIHtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJyB8fCB2YWx1ZSA9PT0gdHJ1ZTtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIHJldHVybiArdmFsdWU7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMudHlwZU1pc21hdGNoKHBhdGgsIHByb3ZpZGVkVHlwZSwgZGVmYXVsdFR5cGUpO1xuICAgIH1cbn07XG5mdW5jdGlvbiBwcm9jZXNzS2V5KGFyZ3MpIHtcbiAgICByZXR1cm4gKG9wdGlvblByb2Nlc3NvcnNbYXJncy5rZXldIHx8IGRlZmF1bHRQcm9jZXNzb3IpKGFyZ3MpO1xufVxuXG5jbGFzcyBPcHRpb25Db252ZXJ0ZXIge1xuICAgIHN0YXRpYyBkZWVwQ29weShpbnB1dCkge1xuICAgICAgICBjb25zdCBvID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKGlucHV0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGlucHV0W2tleV07XG4gICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50IGluc3RhbmNlb2YgRGF0ZVRpbWUpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBpbnB1dEVsZW1lbnQuY2xvbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXRFbGVtZW50IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIG9ba2V5XSA9IG5ldyBEYXRlKGlucHV0RWxlbWVudC52YWx1ZU9mKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ba2V5XSA9IGlucHV0RWxlbWVudDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXRFbGVtZW50ICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8XG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXRFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIG9ba2V5XSA9IE9wdGlvbkNvbnZlcnRlci5kZWVwQ29weShpbnB1dEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmRzIHZhbHVlIG91dCBvZiBhbiBvYmplY3QgYmFzZWQgb24gYSBzdHJpbmcsIHBlcmlvZCBkZWxpbWl0ZWQsIHBhdGhcbiAgICAgKiBAcGFyYW0gcGF0aHNcbiAgICAgKiBAcGFyYW0gb2JqXG4gICAgICovXG4gICAgc3RhdGljIG9iamVjdFBhdGgocGF0aHMsIG9iaikge1xuICAgICAgICBpZiAocGF0aHMuY2hhckF0KDApID09PSAnLicpXG4gICAgICAgICAgICBwYXRocyA9IHBhdGhzLnNsaWNlKDEpO1xuICAgICAgICBpZiAoIXBhdGhzKVxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgcmV0dXJuIHBhdGhzXG4gICAgICAgICAgICAuc3BsaXQoJy4nKVxuICAgICAgICAgICAgLnJlZHVjZSgodmFsdWUsIGtleSkgPT4gT3B0aW9uQ29udmVydGVyLmlzVmFsdWUodmFsdWUpIHx8IE9wdGlvbkNvbnZlcnRlci5pc1ZhbHVlKHZhbHVlW2tleV0pXG4gICAgICAgICAgICA/IHZhbHVlW2tleV1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkLCBvYmopO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgc3ByZWFkIG9wZXJhdG9yIGNhdXNlZCBzdWIga2V5cyB0byBiZSBtaXNzaW5nIGFmdGVyIG1lcmdpbmcuXG4gICAgICogVGhpcyBpcyB0byBmaXggdGhhdCBpc3N1ZSBieSB1c2luZyBzcHJlYWQgb24gdGhlIGNoaWxkIG9iamVjdHMgZmlyc3QuXG4gICAgICogQWxzbyBoYW5kbGVzIGNvbXBsZXggb3B0aW9ucyBsaWtlIGRpc2FibGVkRGF0ZXNcbiAgICAgKiBAcGFyYW0gcHJvdmlkZWQgQW4gb3B0aW9uIGZyb20gbmV3IHByb3ZpZGVkT3B0aW9uc1xuICAgICAqIEBwYXJhbSBjb3B5VG8gRGVzdGluYXRpb24gb2JqZWN0LiBUaGlzIHdhcyBhZGRlZCB0byBwcmV2ZW50IHJlZmVyZW5jZSBjb3BpZXNcbiAgICAgKiBAcGFyYW0gbG9jYWxpemF0aW9uXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKi9cbiAgICBzdGF0aWMgc3ByZWFkKHByb3ZpZGVkLCBjb3B5VG8sIGxvY2FsaXphdGlvbiwgcGF0aCA9ICcnKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gT3B0aW9uQ29udmVydGVyLm9iamVjdFBhdGgocGF0aCwgRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZE9wdGlvbnMgPSBPYmplY3Qua2V5cyhwcm92aWRlZCkuZmlsdGVyKCh4KSA9PiAhT2JqZWN0LmtleXMoZGVmYXVsdE9wdGlvbnMpLmluY2x1ZGVzKHgpKTtcbiAgICAgICAgaWYgKHVuc3VwcG9ydGVkT3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBmbGF0dGVuZWRPcHRpb25zID0gT3B0aW9uQ29udmVydGVyLmdldEZsYXR0ZW5EZWZhdWx0T3B0aW9ucygpO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gdW5zdXBwb3J0ZWRPcHRpb25zLm1hcCgoeCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlcnJvciA9IGBcIiR7cGF0aH0uJHt4fVwiIGluIG5vdCBhIGtub3duIG9wdGlvbi5gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpZFlvdU1lYW4gPSBmbGF0dGVuZWRPcHRpb25zLmZpbmQoKHkpID0+IHkuaW5jbHVkZXMoeCkpO1xuICAgICAgICAgICAgICAgIGlmIChkaWRZb3VNZWFuKVxuICAgICAgICAgICAgICAgICAgICBlcnJvciArPSBgIERpZCB5b3UgbWVhbiBcIiR7ZGlkWW91TWVhbn1cIj9gO1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMudW5leHBlY3RlZE9wdGlvbnMoZXJyb3JzKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhwcm92aWRlZClcbiAgICAgICAgICAgIC5maWx0ZXIoKGtleSkgPT4ga2V5ICE9PSAnX19wcm90b19fJyAmJiBrZXkgIT09ICdjb25zdHJ1Y3RvcicpXG4gICAgICAgICAgICAuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBwYXRoICs9IGAuJHtrZXl9YDtcbiAgICAgICAgICAgIGlmIChwYXRoLmNoYXJBdCgwKSA9PT0gJy4nKVxuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLnNsaWNlKDEpO1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdE9wdGlvblZhbHVlID0gZGVmYXVsdE9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVkVHlwZSA9IHR5cGVvZiBwcm92aWRlZFtrZXldO1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFR5cGUgPSB0eXBlb2YgZGVmYXVsdE9wdGlvblZhbHVlO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwcm92aWRlZFtrZXldO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb3B5VG9ba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLCBwYXRoLmxhc3RJbmRleE9mKGAuJHtrZXl9YCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmYXVsdE9wdGlvblZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KHByb3ZpZGVkW2tleV0pICYmXG4gICAgICAgICAgICAgICAgIShkZWZhdWx0T3B0aW9uVmFsdWUgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgICAgICAgICAgICAgICAgIE9wdGlvbkNvbnZlcnRlci5pZ25vcmVQcm9wZXJ0aWVzLmluY2x1ZGVzKGtleSkpKSB7XG4gICAgICAgICAgICAgICAgT3B0aW9uQ29udmVydGVyLnNwcmVhZChwcm92aWRlZFtrZXldLCBjb3B5VG9ba2V5XSwgbG9jYWxpemF0aW9uLCBwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcHlUb1trZXldID0gT3B0aW9uQ29udmVydGVyLnByb2Nlc3NLZXkoa2V5LCB2YWx1ZSwgcHJvdmlkZWRUeXBlLCBkZWZhdWx0VHlwZSwgcGF0aCwgbG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLCBwYXRoLmxhc3RJbmRleE9mKGAuJHtrZXl9YCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHByb2Nlc3NLZXkoa2V5LCB2YWx1ZSwgLy9lc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBwcm92aWRlZFR5cGUsIGRlZmF1bHRUeXBlLCBwYXRoLCBsb2NhbGl6YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NLZXkoe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBwcm92aWRlZFR5cGUsXG4gICAgICAgICAgICBkZWZhdWx0VHlwZSxcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBsb2NhbGl6YXRpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgX21lcmdlT3B0aW9ucyhwcm92aWRlZE9wdGlvbnMsIG1lcmdlVG8pIHtcbiAgICAgICAgY29uc3QgbmV3Q29uZmlnID0gT3B0aW9uQ29udmVydGVyLmRlZXBDb3B5KG1lcmdlVG8pO1xuICAgICAgICAvL3NlZSBpZiB0aGUgb3B0aW9ucyBzcGVjaWZ5IGEgbG9jYWxlXG4gICAgICAgIGNvbnN0IGxvY2FsaXphdGlvbiA9IG1lcmdlVG8ubG9jYWxpemF0aW9uPy5sb2NhbGUgIT09ICdkZWZhdWx0J1xuICAgICAgICAgICAgPyBtZXJnZVRvLmxvY2FsaXphdGlvblxuICAgICAgICAgICAgOiBwcm92aWRlZE9wdGlvbnM/LmxvY2FsaXphdGlvbiB8fCBEZWZhdWx0T3B0aW9ucy5sb2NhbGl6YXRpb247XG4gICAgICAgIE9wdGlvbkNvbnZlcnRlci5zcHJlYWQocHJvdmlkZWRPcHRpb25zLCBuZXdDb25maWcsIGxvY2FsaXphdGlvbiwgJycpO1xuICAgICAgICByZXR1cm4gbmV3Q29uZmlnO1xuICAgIH1cbiAgICBzdGF0aWMgX2RhdGFUb09wdGlvbnMoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBlRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZWxlbWVudC5kYXRhc2V0KSk7XG4gICAgICAgIGlmIChlRGF0YT8udGRUYXJnZXRJbnB1dClcbiAgICAgICAgICAgIGRlbGV0ZSBlRGF0YS50ZFRhcmdldElucHV0O1xuICAgICAgICBpZiAoZURhdGE/LnRkVGFyZ2V0VG9nZ2xlKVxuICAgICAgICAgICAgZGVsZXRlIGVEYXRhLnRkVGFyZ2V0VG9nZ2xlO1xuICAgICAgICBpZiAoIWVEYXRhIHx8XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhlRGF0YSkubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICBlRGF0YS5jb25zdHJ1Y3RvciAhPT0gRE9NU3RyaW5nTWFwKVxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgIGNvbnN0IGRhdGFPcHRpb25zID0ge307XG4gICAgICAgIC8vIGJlY2F1c2UgZGF0YXNldCByZXR1cm5zIGNhbWVsQ2FzZSBpbmNsdWRpbmcgdGhlICd0ZCcga2V5IHRoZSBvcHRpb25cbiAgICAgICAgLy8ga2V5IHdvbid0IGFsaWduXG4gICAgICAgIGNvbnN0IG9iamVjdFRvTm9ybWFsaXplZCA9IChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxvd2VyZWQgPSB7fTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICAgICAgICAgIGxvd2VyZWRbeC50b0xvd2VyQ2FzZSgpXSA9IHg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBsb3dlcmVkO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBub3JtYWxpemVPYmplY3QgPSB0aGlzLm5vcm1hbGl6ZU9iamVjdChvYmplY3RUb05vcm1hbGl6ZWQpO1xuICAgICAgICBjb25zdCBvcHRpb25zTG93ZXIgPSBvYmplY3RUb05vcm1hbGl6ZWQob3B0aW9ucyk7XG4gICAgICAgIE9iamVjdC5rZXlzKGVEYXRhKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4geC5zdGFydHNXaXRoKE5hbWVzcGFjZS5kYXRhS2V5KSlcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHguc3Vic3RyaW5nKDIpKVxuICAgICAgICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgbGV0IGtleU9wdGlvbiA9IG9wdGlvbnNMb3dlcltrZXkudG9Mb3dlckNhc2UoKV07XG4gICAgICAgICAgICAvLyBkYXRhc2V0IG1lcmdlcyBkYXNoZXMgdG8gY2FtZWxDYXNlLi4uIHlheVxuICAgICAgICAgICAgLy8gaS5lLiBrZXkgPSBkaXNwbGF5X2NvbXBvbmVudHNfc2Vjb25kc1xuICAgICAgICAgICAgaWYgKGtleS5pbmNsdWRlcygnXycpKSB7XG4gICAgICAgICAgICAgICAgLy8gW2Rpc3BsYXksIGNvbXBvbmVudHMsIHNlY29uZHNdXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BsaXQgPSBrZXkuc3BsaXQoJ18nKTtcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5XG4gICAgICAgICAgICAgICAga2V5T3B0aW9uID0gb3B0aW9uc0xvd2VyW3NwbGl0WzBdLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgICAgICAgIGlmIChrZXlPcHRpb24gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleU9wdGlvbl0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhT3B0aW9uc1trZXlPcHRpb25dID0gbm9ybWFsaXplT2JqZWN0KHNwbGl0LCAxLCBvcHRpb25zW2tleU9wdGlvbl0sIGVEYXRhW2B0ZCR7a2V5fWBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvciBrZXkgPSBtdWx0aXBsZURhdGVcbiAgICAgICAgICAgIGVsc2UgaWYgKGtleU9wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZGF0YU9wdGlvbnNba2V5T3B0aW9uXSA9IGVEYXRhW2B0ZCR7a2V5fWBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlT3B0aW9ucyhkYXRhT3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8vdG9kbyBjbGVhbiB0aGlzIHVwXG4gICAgc3RhdGljIG5vcm1hbGl6ZU9iamVjdChvYmplY3RUb05vcm1hbGl6ZWQpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplT2JqZWN0ID0gKHNwbGl0LCBpbmRleCwgb3B0aW9uU3ViZ3JvdXAsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAvLyBmaXJzdCByb3VuZCA9IGRpc3BsYXkgeyAuLi4gfVxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZE9wdGlvbnMgPSBvYmplY3RUb05vcm1hbGl6ZWQob3B0aW9uU3ViZ3JvdXApO1xuICAgICAgICAgICAgY29uc3Qga2V5T3B0aW9uID0gbm9ybWFsaXplZE9wdGlvbnNbc3BsaXRbaW5kZXhdLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgICAgY29uc3QgaW50ZXJuYWxPYmplY3QgPSB7fTtcbiAgICAgICAgICAgIGlmIChrZXlPcHRpb24gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxPYmplY3Q7XG4gICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGFub3RoZXIgb2JqZWN0LCBjb250aW51ZSBkb3duIHRoZSByYWJiaXQgaG9sZVxuICAgICAgICAgICAgaWYgKG9wdGlvblN1Ymdyb3VwW2tleU9wdGlvbl0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgaW50ZXJuYWxPYmplY3Rba2V5T3B0aW9uXSA9IG5vcm1hbGl6ZU9iamVjdChzcGxpdCwgaW5kZXgsIG9wdGlvblN1Ymdyb3VwW2tleU9wdGlvbl0sIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGludGVybmFsT2JqZWN0W2tleU9wdGlvbl0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbE9iamVjdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZU9iamVjdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gcHJvdmUgYGRgIGlzIGEgRGF0ZVRpbWUgb3IgRGF0ZSBvciBjYW4gYmUgY29udmVydGVkIGludG8gb25lLlxuICAgICAqIEBwYXJhbSBkIElmIGEgc3RyaW5nIHdpbGwgYXR0ZW1wdCBjcmVhdGluZyBhIGRhdGUgZnJvbSBpdC5cbiAgICAgKiBAcGFyYW0gbG9jYWxpemF0aW9uIG9iamVjdCBjb250YWluaW5nIGxvY2FsZSBhbmQgZm9ybWF0IHNldHRpbmdzLiBPbmx5IHVzZWQgd2l0aCB0aGUgY3VzdG9tIGZvcm1hdHNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBfZGF0ZVR5cGVDaGVjayhkLCAvL2VzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGxvY2FsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ5Q29udmVydFRvRGF0ZVRpbWUoZCwgbG9jYWxpemF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHlwZSBjaGVja3MgdGhhdCBgdmFsdWVgIGlzIGFuIGFycmF5IG9mIERhdGUgb3IgRGF0ZVRpbWVcbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZSBQcm92aWRlcyB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzIGUuZy4gZGlzYWJsZWREYXRlc1xuICAgICAqIEBwYXJhbSB2YWx1ZSBPcHRpb24gdmFsdWVcbiAgICAgKiBAcGFyYW0gcHJvdmlkZWRUeXBlIFVzZWQgdG8gcHJvdmlkZSB0ZXh0IHRvIGVycm9yIG1lc3NhZ2VzXG4gICAgICogQHBhcmFtIGxvY2FsaXphdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBfdHlwZUNoZWNrRGF0ZUFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCBwcm92aWRlZFR5cGUsIGxvY2FsaXphdGlvbikge1xuICAgICAgICByZXR1cm4gdHlwZUNoZWNrRGF0ZUFycmF5KG9wdGlvbk5hbWUsIHZhbHVlLCBwcm92aWRlZFR5cGUsIGxvY2FsaXphdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFR5cGUgY2hlY2tzIHRoYXQgYHZhbHVlYCBpcyBhbiBhcnJheSBvZiBudW1iZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbk5hbWUgUHJvdmlkZXMgdGV4dCB0byBlcnJvciBtZXNzYWdlcyBlLmcuIGRpc2FibGVkRGF0ZXNcbiAgICAgKiBAcGFyYW0gdmFsdWUgT3B0aW9uIHZhbHVlXG4gICAgICogQHBhcmFtIHByb3ZpZGVkVHlwZSBVc2VkIHRvIHByb3ZpZGUgdGV4dCB0byBlcnJvciBtZXNzYWdlc1xuICAgICAqL1xuICAgIHN0YXRpYyBfdHlwZUNoZWNrTnVtYmVyQXJyYXkob3B0aW9uTmFtZSwgdmFsdWUsIHByb3ZpZGVkVHlwZSkge1xuICAgICAgICByZXR1cm4gdHlwZUNoZWNrTnVtYmVyQXJyYXkob3B0aW9uTmFtZSwgdmFsdWUsIHByb3ZpZGVkVHlwZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIGNvbnZlcnQgYGRgIHRvIGEgRGF0ZVRpbWUgb2JqZWN0XG4gICAgICogQHBhcmFtIGQgdmFsdWUgdG8gY29udmVydFxuICAgICAqIEBwYXJhbSBvcHRpb25OYW1lIFByb3ZpZGVzIHRleHQgdG8gZXJyb3IgbWVzc2FnZXMgZS5nLiBkaXNhYmxlZERhdGVzXG4gICAgICogQHBhcmFtIGxvY2FsaXphdGlvbiBvYmplY3QgY29udGFpbmluZyBsb2NhbGUgYW5kIGZvcm1hdCBzZXR0aW5ncy4gT25seSB1c2VkIHdpdGggdGhlIGN1c3RvbSBmb3JtYXRzXG4gICAgICovXG4gICAgc3RhdGljIGRhdGVDb252ZXJzaW9uKGQsIC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgb3B0aW9uTmFtZSwgbG9jYWxpemF0aW9uKSB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0VG9EYXRlVGltZShkLCBvcHRpb25OYW1lLCBsb2NhbGl6YXRpb24pO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0RmxhdHRlbkRlZmF1bHRPcHRpb25zKCkge1xuICAgICAgICBpZiAodGhpcy5fZmxhdHRlbkRlZmF1bHRzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZsYXR0ZW5EZWZhdWx0cztcbiAgICAgICAgY29uc3QgZGVlcEtleXMgPSAodCwgcHJlID0gW10pID0+IHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIGlmIChPYmplY3QodCkgPT09IHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModCkuZmxhdE1hcCgoW2ssIHZdKSA9PiBkZWVwS2V5cyh2LCBbLi4ucHJlLCBrXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZS5qb2luKCcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2ZsYXR0ZW5EZWZhdWx0cyA9IGRlZXBLZXlzKERlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZsYXR0ZW5EZWZhdWx0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU29tZSBvcHRpb25zIGNvbmZsaWN0IGxpa2UgbWluL21heCBkYXRlLiBWZXJpZnkgdGhhdCB0aGVzZSBraW5kcyBvZiBvcHRpb25zXG4gICAgICogYXJlIHNldCBjb3JyZWN0bHkuXG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqL1xuICAgIHN0YXRpYyBfdmFsaWRhdGVDb25mbGljdHMoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuZGlzcGxheS5zaWRlQnlTaWRlICYmXG4gICAgICAgICAgICAoIWNvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMuY2xvY2sgfHxcbiAgICAgICAgICAgICAgICAhKGNvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMuaG91cnMgfHxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy5taW51dGVzIHx8XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMuc2Vjb25kcykpKSB7XG4gICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5jb25mbGljdGluZ0NvbmZpZ3VyYXRpb24oJ0Nhbm5vdCB1c2Ugc2lkZSBieSBzaWRlIG1vZGUgd2l0aG91dCB0aGUgY2xvY2sgY29tcG9uZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcucmVzdHJpY3Rpb25zLm1pbkRhdGUgJiYgY29uZmlnLnJlc3RyaWN0aW9ucy5tYXhEYXRlKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnLnJlc3RyaWN0aW9ucy5taW5EYXRlLmlzQWZ0ZXIoY29uZmlnLnJlc3RyaWN0aW9ucy5tYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLmNvbmZsaWN0aW5nQ29uZmlndXJhdGlvbignbWluRGF0ZSBpcyBhZnRlciBtYXhEYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uZmlnLnJlc3RyaWN0aW9ucy5tYXhEYXRlLmlzQmVmb3JlKGNvbmZpZy5yZXN0cmljdGlvbnMubWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBOYW1lc3BhY2UuZXJyb3JNZXNzYWdlcy5jb25mbGljdGluZ0NvbmZpZ3VyYXRpb24oJ21heERhdGUgaXMgYmVmb3JlIG1pbkRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLm11bHRpcGxlRGF0ZXMgJiYgY29uZmlnLmRhdGVSYW5nZSkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuY29uZmxpY3RpbmdDb25maWd1cmF0aW9uKCdDYW5ub3QgdXNzIG9wdGlvbiBcIm11bHRpcGxlRGF0ZXNcIiB3aXRoIFwiZGF0ZVJhbmdlXCInKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbk9wdGlvbkNvbnZlcnRlci5pZ25vcmVQcm9wZXJ0aWVzID0gW1xuICAgICdtZXRhJyxcbiAgICAnZGF5Vmlld0hlYWRlckZvcm1hdCcsXG4gICAgJ2NvbnRhaW5lcicsXG4gICAgJ2RhdGVGb3JtcycsXG4gICAgJ29yZGluYWwnLFxuXTtcbk9wdGlvbkNvbnZlcnRlci5pc1ZhbHVlID0gKGEpID0+IGEgIT0gbnVsbDsgLy8gZXZlcnl0aGluZyBleGNlcHQgdW5kZWZpbmVkICsgbnVsbFxuXG5jbGFzcyBEYXRlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2RhdGVzID0gW107XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShFdmVudEVtaXR0ZXJzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYXJyYXkgb2Ygc2VsZWN0ZWQgZGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgcGlja2VkKCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuX2RhdGVzXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGFzdCBwaWNrZWQgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0IGxhc3RQaWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlc1t0aGlzLmxhc3RQaWNrZWRJbmRleF0/LmNsb25lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgcGlja2VkIGRhdGVzIC0xIG9yIDAgaWYgbm9uZSBhcmUgc2VsZWN0ZWQuXG4gICAgICovXG4gICAgZ2V0IGxhc3RQaWNrZWRJbmRleCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZXMubGVuZ3RoIC0gMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9ybWF0cyBhIERhdGVUaW1lIG9iamVjdCB0byBhIHN0cmluZy4gVXNlZCB3aGVuIHNldHRpbmcgdGhlIGlucHV0IHZhbHVlLlxuICAgICAqIEBwYXJhbSBkYXRlXG4gICAgICovXG4gICAgZm9ybWF0SW5wdXQoZGF0ZSkge1xuICAgICAgICBpZiAoIWRhdGUpXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIGRhdGUubG9jYWxpemF0aW9uID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb247XG4gICAgICAgIHJldHVybiBkYXRlLmZvcm1hdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBwYXJzZSB0aGUgdmFsdWUgaW50byBhIERhdGVUaW1lIG9iamVjdC5cbiAgICAgKiB0aGlzIGNhbiBiZSBvdmVyd3JpdHRlbiB0byBzdXBwbHkgeW91ciBvd24gcGFyc2luZy5cbiAgICAgKi9cbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcGFyc2VJbnB1dCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gT3B0aW9uQ29udmVydGVyLmRhdGVDb252ZXJzaW9uKHZhbHVlLCAnaW5wdXQnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyaWVzIHRvIGNvbnZlcnQgdGhlIHByb3ZpZGVkIHZhbHVlIHRvIGEgRGF0ZVRpbWUgb2JqZWN0LlxuICAgICAqIElmIHZhbHVlIGlzIG51bGx8dW5kZWZpbmVkIHRoZW4gY2xlYXIgdGhlIHZhbHVlIG9mIHRoZSBwcm92aWRlZCBpbmRleCAob3IgMCkuXG4gICAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGNvbnZlcnQgb3IgbnVsbHx1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0gaW5kZXggV2hlbiB1c2luZyBtdWx0aWRhdGVzIHRoaXMgaXMgdGhlIGluZGV4IGluIHRoZSBhcnJheVxuICAgICAqL1xuICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBzZXRGcm9tSW5wdXQodmFsdWUsIGluZGV4KSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodW5kZWZpbmVkLCBpbmRleCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udmVydGVkID0gdGhpcy5wYXJzZUlucHV0KHZhbHVlKTtcbiAgICAgICAgaWYgKGNvbnZlcnRlZCkge1xuICAgICAgICAgICAgY29udmVydGVkLnNldExvY2FsaXphdGlvbih0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKGNvbnZlcnRlZCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgRGF0ZVRpbWUgdG8gc2VsZWN0ZWQgZGF0ZXMgYXJyYXlcbiAgICAgKiBAcGFyYW0gZGF0ZVxuICAgICAqL1xuICAgIGFkZChkYXRlKSB7XG4gICAgICAgIHRoaXMuX2RhdGVzLnB1c2goZGF0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYHRhcmdldERhdGVgIGlzIHBhcnQgb2YgdGhlIHNlbGVjdGVkIGRhdGVzIGFycmF5LlxuICAgICAqIElmIGB1bml0YCBpcyBwcm92aWRlZCB0aGVuIGEgZ3JhbnVsYXJpdHkgdG8gdGhhdCB1bml0IHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0RGF0ZVxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICovXG4gICAgaXNQaWNrZWQodGFyZ2V0RGF0ZSwgdW5pdCkge1xuICAgICAgICBpZiAoIURhdGVUaW1lLmlzVmFsaWQodGFyZ2V0RGF0ZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghdW5pdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlcy5maW5kKCh4KSA9PiB4LmlzU2FtZSh0YXJnZXREYXRlKSkgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gZ2V0Rm9ybWF0QnlVbml0KHVuaXQpO1xuICAgICAgICBjb25zdCBpbm5lckRhdGVGb3JtYXR0ZWQgPSB0YXJnZXREYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICByZXR1cm4gKHRoaXMuX2RhdGVzXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB4LmZvcm1hdChmb3JtYXQpKVxuICAgICAgICAgICAgLmZpbmQoKHgpID0+IHggPT09IGlubmVyRGF0ZUZvcm1hdHRlZCkgIT09IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IGF0IHdoaWNoIGB0YXJnZXREYXRlYCBpcyBpbiB0aGUgYXJyYXkuXG4gICAgICogVGhpcyBpcyB1c2VkIGZvciB1cGRhdGluZyBvciByZW1vdmluZyBhIGRhdGUgd2hlbiBtdWx0aS1kYXRlIGlzIHVzZWRcbiAgICAgKiBJZiBgdW5pdGAgaXMgcHJvdmlkZWQgdGhlbiBhIGdyYW51bGFyaXR5IHRvIHRoYXQgdW5pdCB3aWxsIGJlIHVzZWQuXG4gICAgICogQHBhcmFtIHRhcmdldERhdGVcbiAgICAgKiBAcGFyYW0gdW5pdFxuICAgICAqL1xuICAgIHBpY2tlZEluZGV4KHRhcmdldERhdGUsIHVuaXQpIHtcbiAgICAgICAgaWYgKCFEYXRlVGltZS5pc1ZhbGlkKHRhcmdldERhdGUpKVxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoIXVuaXQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZXMubWFwKCh4KSA9PiB4LnZhbHVlT2YoKSkuaW5kZXhPZih0YXJnZXREYXRlLnZhbHVlT2YoKSk7XG4gICAgICAgIGNvbnN0IGZvcm1hdCA9IGdldEZvcm1hdEJ5VW5pdCh1bml0KTtcbiAgICAgICAgY29uc3QgaW5uZXJEYXRlRm9ybWF0dGVkID0gdGFyZ2V0RGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVzLm1hcCgoeCkgPT4geC5mb3JtYXQoZm9ybWF0KSkuaW5kZXhPZihpbm5lckRhdGVGb3JtYXR0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYWxsIHNlbGVjdGVkIGRhdGVzLlxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS51bnNldCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudHJpZ2dlckV2ZW50LmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogTmFtZXNwYWNlLmV2ZW50cy5jaGFuZ2UsXG4gICAgICAgICAgICBkYXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvbGREYXRlOiB0aGlzLmxhc3RQaWNrZWQsXG4gICAgICAgICAgICBpc0NsZWFyOiB0cnVlLFxuICAgICAgICAgICAgaXNWYWxpZDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2RhdGVzID0gW107XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dClcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlRGlzcGxheS5lbWl0KCdhbGwnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZCB0aGUgXCJib29rIGVuZFwiIHllYXJzIGdpdmVuIGEgYHllYXJgIGFuZCBhIGBmYWN0b3JgXG4gICAgICogQHBhcmFtIGZhY3RvciBlLmcuIDEwMCBmb3IgZGVjYWRlc1xuICAgICAqIEBwYXJhbSB5ZWFyIGUuZy4gMjAyMVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRTdGFydEVuZFllYXIoZmFjdG9yLCB5ZWFyKSB7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSBmYWN0b3IgLyAxMCwgc3RhcnRZZWFyID0gTWF0aC5mbG9vcih5ZWFyIC8gZmFjdG9yKSAqIGZhY3RvciwgZW5kWWVhciA9IHN0YXJ0WWVhciArIHN0ZXAgKiA5LCBmb2N1c1ZhbHVlID0gTWF0aC5mbG9vcih5ZWFyIC8gc3RlcCkgKiBzdGVwO1xuICAgICAgICByZXR1cm4gW3N0YXJ0WWVhciwgZW5kWWVhciwgZm9jdXNWYWx1ZV07XG4gICAgfVxuICAgIHVwZGF0ZUlucHV0KHRhcmdldCkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLmlucHV0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgbmV3VmFsdWUgPSB0aGlzLmZvcm1hdElucHV0KHRhcmdldCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXMgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGF0ZVJhbmdlKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuX2RhdGVzXG4gICAgICAgICAgICAgICAgLm1hcCgoZCkgPT4gdGhpcy5mb3JtYXRJbnB1dChkKSlcbiAgICAgICAgICAgICAgICAuam9pbih0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSAhPSBuZXdWYWx1ZSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIGVpdGhlciBjbGVhciBvciBzZXQgdGhlIGB0YXJnZXRgIGRhdGUgYXQgYGluZGV4YC5cbiAgICAgKiBJZiB0aGUgYHRhcmdldGAgaXMgbnVsbCB0aGVuIHRoZSBkYXRlIHdpbGwgYmUgY2xlYXJlZC5cbiAgICAgKiBJZiBtdWx0aS1kYXRlIGlzIGJlaW5nIHVzZWQgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgYXJyYXkuXG4gICAgICogSWYgYHRhcmdldGAgaXMgdmFsaWQgYW5kIG11bHRpLWRhdGUgaXMgdXNlZCB0aGVuIGlmIGBpbmRleGAgaXNcbiAgICAgKiBwcm92aWRlZCB0aGUgZGF0ZSBhdCB0aGF0IGluZGV4IHdpbGwgYmUgcmVwbGFjZWQsIG90aGVyd2lzZSBpdCBpcyBhcHBlbmRlZC5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICovXG4gICAgc2V0VmFsdWUodGFyZ2V0LCBpbmRleCkge1xuICAgICAgICBjb25zdCBub0luZGV4ID0gdHlwZW9mIGluZGV4ID09PSAndW5kZWZpbmVkJywgaXNDbGVhciA9ICF0YXJnZXQgJiYgbm9JbmRleDtcbiAgICAgICAgbGV0IG9sZERhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS51bnNldCA/IG51bGwgOiB0aGlzLl9kYXRlc1tpbmRleF0/LmNsb25lO1xuICAgICAgICBpZiAoIW9sZERhdGUgJiYgIXRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ICYmIG5vSW5kZXggJiYgaXNDbGVhcikge1xuICAgICAgICAgICAgb2xkRGF0ZSA9IHRoaXMubGFzdFBpY2tlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0ICYmIG9sZERhdGU/LmlzU2FtZSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0KHRhcmdldCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FzZSBvZiBjYWxsaW5nIHNldFZhbHVlKG51bGwpXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRWYWx1ZU51bGwoaXNDbGVhciwgaW5kZXgsIG9sZERhdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4ID0gaW5kZXggfHwgMDtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LmNsb25lO1xuICAgICAgICAvLyBtaW51dGUgc3RlcHBpbmcgaXMgYmVpbmcgdXNlZCwgZm9yY2UgdGhlIG1pbnV0ZSB0byB0aGUgY2xvc2VzdCB2YWx1ZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZyAhPT0gMSkge1xuICAgICAgICAgICAgdGFyZ2V0Lm1pbnV0ZXMgPVxuICAgICAgICAgICAgICAgIE1hdGgucm91bmQodGFyZ2V0Lm1pbnV0ZXMgLyB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nKSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmc7XG4gICAgICAgICAgICB0YXJnZXQuc3RhcnRPZihVbml0Lm1pbnV0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9uVXBkYXRlID0gKGlzVmFsaWQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGVzW2luZGV4XSA9IHRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlVmlld0RhdGUuZW1pdCh0YXJnZXQuY2xvbmUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dCh0YXJnZXQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlRGlzcGxheS5lbWl0KCdhbGwnKTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudHJpZ2dlckV2ZW50LmVtaXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IE5hbWVzcGFjZS5ldmVudHMuY2hhbmdlLFxuICAgICAgICAgICAgICAgIGRhdGU6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBvbGREYXRlLFxuICAgICAgICAgICAgICAgIGlzQ2xlYXIsXG4gICAgICAgICAgICAgICAgaXNWYWxpZDogaXNWYWxpZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGFyZ2V0KSAmJlxuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uLmRhdGVSYW5nZUlzVmFsaWQodGhpcy5waWNrZWQsIGluZGV4LCB0YXJnZXQpKSB7XG4gICAgICAgICAgICBvblVwZGF0ZSh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5rZWVwSW52YWxpZCkge1xuICAgICAgICAgICAgb25VcGRhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudHJpZ2dlckV2ZW50LmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogTmFtZXNwYWNlLmV2ZW50cy5lcnJvcixcbiAgICAgICAgICAgIHJlYXNvbjogTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMuZmFpbGVkVG9TZXRJbnZhbGlkRGF0ZSxcbiAgICAgICAgICAgIGRhdGU6IHRhcmdldCxcbiAgICAgICAgICAgIG9sZERhdGUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2V0VmFsdWVOdWxsKGlzQ2xlYXIsIGluZGV4LCBvbGREYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzIHx8XG4gICAgICAgICAgICB0aGlzLl9kYXRlcy5sZW5ndGggPT09IDEgfHxcbiAgICAgICAgICAgIGlzQ2xlYXIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2RhdGVzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXQoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy50cmlnZ2VyRXZlbnQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBOYW1lc3BhY2UuZXZlbnRzLmNoYW5nZSxcbiAgICAgICAgICAgIGRhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG9sZERhdGUsXG4gICAgICAgICAgICBpc0NsZWFyLFxuICAgICAgICAgICAgaXNWYWxpZDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudXBkYXRlRGlzcGxheS5lbWl0KCdhbGwnKTtcbiAgICB9XG59XG5cbnZhciBBY3Rpb25UeXBlcztcbihmdW5jdGlvbiAoQWN0aW9uVHlwZXMpIHtcbiAgICBBY3Rpb25UeXBlc1tcIm5leHRcIl0gPSBcIm5leHRcIjtcbiAgICBBY3Rpb25UeXBlc1tcInByZXZpb3VzXCJdID0gXCJwcmV2aW91c1wiO1xuICAgIEFjdGlvblR5cGVzW1wiY2hhbmdlQ2FsZW5kYXJWaWV3XCJdID0gXCJjaGFuZ2VDYWxlbmRhclZpZXdcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdE1vbnRoXCJdID0gXCJzZWxlY3RNb250aFwiO1xuICAgIEFjdGlvblR5cGVzW1wic2VsZWN0WWVhclwiXSA9IFwic2VsZWN0WWVhclwiO1xuICAgIEFjdGlvblR5cGVzW1wic2VsZWN0RGVjYWRlXCJdID0gXCJzZWxlY3REZWNhZGVcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNlbGVjdERheVwiXSA9IFwic2VsZWN0RGF5XCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzZWxlY3RIb3VyXCJdID0gXCJzZWxlY3RIb3VyXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzZWxlY3RNaW51dGVcIl0gPSBcInNlbGVjdE1pbnV0ZVwiO1xuICAgIEFjdGlvblR5cGVzW1wic2VsZWN0U2Vjb25kXCJdID0gXCJzZWxlY3RTZWNvbmRcIjtcbiAgICBBY3Rpb25UeXBlc1tcImluY3JlbWVudEhvdXJzXCJdID0gXCJpbmNyZW1lbnRIb3Vyc1wiO1xuICAgIEFjdGlvblR5cGVzW1wiaW5jcmVtZW50TWludXRlc1wiXSA9IFwiaW5jcmVtZW50TWludXRlc1wiO1xuICAgIEFjdGlvblR5cGVzW1wiaW5jcmVtZW50U2Vjb25kc1wiXSA9IFwiaW5jcmVtZW50U2Vjb25kc1wiO1xuICAgIEFjdGlvblR5cGVzW1wiZGVjcmVtZW50SG91cnNcIl0gPSBcImRlY3JlbWVudEhvdXJzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJkZWNyZW1lbnRNaW51dGVzXCJdID0gXCJkZWNyZW1lbnRNaW51dGVzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJkZWNyZW1lbnRTZWNvbmRzXCJdID0gXCJkZWNyZW1lbnRTZWNvbmRzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJ0b2dnbGVNZXJpZGllbVwiXSA9IFwidG9nZ2xlTWVyaWRpZW1cIjtcbiAgICBBY3Rpb25UeXBlc1tcInRvZ2dsZVBpY2tlclwiXSA9IFwidG9nZ2xlUGlja2VyXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJzaG93Q2xvY2tcIl0gPSBcInNob3dDbG9ja1wiO1xuICAgIEFjdGlvblR5cGVzW1wic2hvd0hvdXJzXCJdID0gXCJzaG93SG91cnNcIjtcbiAgICBBY3Rpb25UeXBlc1tcInNob3dNaW51dGVzXCJdID0gXCJzaG93TWludXRlc1wiO1xuICAgIEFjdGlvblR5cGVzW1wic2hvd1NlY29uZHNcIl0gPSBcInNob3dTZWNvbmRzXCI7XG4gICAgQWN0aW9uVHlwZXNbXCJjbGVhclwiXSA9IFwiY2xlYXJcIjtcbiAgICBBY3Rpb25UeXBlc1tcImNsb3NlXCJdID0gXCJjbG9zZVwiO1xuICAgIEFjdGlvblR5cGVzW1widG9kYXlcIl0gPSBcInRvZGF5XCI7XG59KShBY3Rpb25UeXBlcyB8fCAoQWN0aW9uVHlwZXMgPSB7fSkpO1xudmFyIEFjdGlvblR5cGVzJDEgPSBBY3Rpb25UeXBlcztcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCB1cGRhdGVzIHRoZSBncmlkIGZvciBgZGF0ZWBcbiAqL1xuY2xhc3MgRGF0ZURpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRheXNDb250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKC4uLnRoaXMuX2RheXNPZlRoZVdlZWsoKSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNhbGVuZGFyV2Vla3MsIE5hbWVzcGFjZS5jc3Mubm9IaWdobGlnaHQpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyByYW5nZUhvdmVyRXZlbnQsIHJhbmdlSG92ZXJPdXRFdmVudCB9ID0gdGhpcy5oYW5kbGVNb3VzZUV2ZW50cyhjb250YWluZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQyOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpICE9PSAwICYmIGkgJSA3ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNhbGVuZGFyV2Vla3MsIE5hbWVzcGFjZS5jc3Mubm9IaWdobGlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zZWxlY3REYXkpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgICAgICAvLyBpZiBob3ZlciBpcyBzdXBwb3J0ZWQgdGhlbiBhZGQgdGhlIGV2ZW50c1xuICAgICAgICAgICAgaWYgKG1hdGNoTWVkaWEoJyhob3ZlcjogaG92ZXIpJykubWF0Y2hlcyAmJlxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGF0ZVJhbmdlKSB7XG4gICAgICAgICAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHJhbmdlSG92ZXJFdmVudCk7XG4gICAgICAgICAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgcmFuZ2VIb3Zlck91dEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIGdyaWQgYW5kIHVwZGF0ZXMgZW5hYmxlZCBzdGF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUod2lkZ2V0LCBwYWludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmRheXNDb250YWluZXIpWzBdO1xuICAgICAgICB0aGlzLl91cGRhdGVDYWxlbmRhclZpZXcoY29udGFpbmVyKTtcbiAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmVcbiAgICAgICAgICAgIC5zdGFydE9mKFVuaXQubW9udGgpXG4gICAgICAgICAgICAuc3RhcnRPZignd2Vla0RheScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnN0YXJ0T2ZUaGVXZWVrKVxuICAgICAgICAgICAgLm1hbmlwdWxhdGUoMTIsIFVuaXQuaG91cnMpO1xuICAgICAgICB0aGlzLl9oYW5kbGVDYWxlbmRhcldlZWtzKGNvbnRhaW5lciwgaW5uZXJEYXRlLmNsb25lKTtcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtYWN0aW9uPVwiJHtBY3Rpb25UeXBlcyQxLnNlbGVjdERheX1cIl1gKVxuICAgICAgICAgICAgLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmRheSk7XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzQmVmb3JlKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLCBVbml0Lm1vbnRoKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLm9sZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5uZXJEYXRlLmlzQWZ0ZXIodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUsIFVuaXQubW9udGgpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MubmV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgJiZcbiAgICAgICAgICAgICAgICAhdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kYXRlUmFuZ2UgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLmlzUGlja2VkKGlubmVyRGF0ZSwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmFjdGl2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKGlubmVyRGF0ZSwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUuaXNTYW1lKG5ldyBEYXRlVGltZSgpLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MudG9kYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS53ZWVrRGF5ID09PSAwIHx8IGlubmVyRGF0ZS53ZWVrRGF5ID09PSA2KSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3Mud2Vla2VuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEYXRlUmFuZ2UoaW5uZXJEYXRlLCBjbGFzc2VzKTtcbiAgICAgICAgICAgIHBhaW50KFVuaXQuZGF0ZSwgaW5uZXJEYXRlLCBjbGFzc2VzLCBlbGVtZW50KTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSguLi5lbGVtZW50LmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIHRoaXMuX2RhdGVUb0RhdGFWYWx1ZShpbm5lckRhdGUpKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWRheScsIGAke2lubmVyRGF0ZS5kYXRlfWApO1xuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBpbm5lckRhdGUucGFydHModW5kZWZpbmVkLCB7XG4gICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICB9KS5kYXk7XG4gICAgICAgICAgICBpbm5lckRhdGUubWFuaXB1bGF0ZSgxLCBVbml0LmRhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2RhdGVUb0RhdGFWYWx1ZShkYXRlKSB7XG4gICAgICAgIGlmICghRGF0ZVRpbWUuaXNWYWxpZChkYXRlKSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgcmV0dXJuIGAke2RhdGUueWVhcn0tJHtkYXRlLm1vbnRoRm9ybWF0dGVkfS0ke2RhdGUuZGF0ZUZvcm1hdHRlZH1gO1xuICAgIH1cbiAgICBfaGFuZGxlRGF0ZVJhbmdlKGlubmVyRGF0ZSwgY2xhc3Nlcykge1xuICAgICAgICBjb25zdCByYW5nZVN0YXJ0ID0gdGhpcy5kYXRlcy5waWNrZWRbMF07XG4gICAgICAgIGNvbnN0IHJhbmdlRW5kID0gdGhpcy5kYXRlcy5waWNrZWRbMV07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSkge1xuICAgICAgICAgICAgaWYgKGlubmVyRGF0ZS5pc0JldHdlZW4ocmFuZ2VTdGFydCwgcmFuZ2VFbmQsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5yYW5nZUluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUuaXNTYW1lKHJhbmdlU3RhcnQsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5yYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUuaXNTYW1lKHJhbmdlRW5kLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MucmFuZ2VFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZU1vdXNlRXZlbnRzKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCByYW5nZUhvdmVyRXZlbnQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRhcmdldCA9IGU/LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIDAgb3IgMiBzZWxlY3RlZCBvciBpZiB0aGUgdGFyZ2V0IGlzIGRpc2FibGVkIHRoZW4gaWdub3JlXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlcy5waWNrZWQubGVuZ3RoICE9PSAxIHx8XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gc2VsZWN0IGFsbCB0aGUgZGF0ZSBkaXZzXG4gICAgICAgICAgICBjb25zdCBhbGxEYXlzID0gWy4uLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuZGF5JyldO1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBkYXRlIHZhbHVlIGZyb20gdGhlIGVsZW1lbnQgYmVpbmcgaG92ZXJlZCBvdmVyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJyk7XG4gICAgICAgICAgICAvLyBmb3JtYXQgdGhlIHN0cmluZyB0byBhIGRhdGVcbiAgICAgICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IERhdGVUaW1lLmZyb21TdHJpbmcoYXR0cmlidXRlVmFsdWUsIHtcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICd5eXl5LU1NLWRkJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gZmluZCB0aGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBpbiB0aGUgZGF0ZSBjb250YWluZXJcbiAgICAgICAgICAgIGNvbnN0IGRheUluZGV4ID0gYWxsRGF5cy5maW5kSW5kZXgoKGUpID0+IGUuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykgPT09IGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IGFuZCBzZWNvbmQgc2VsZWN0ZWQgZGF0ZXNcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlU3RhcnQgPSB0aGlzLmRhdGVzLnBpY2tlZFswXTtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlRW5kID0gdGhpcy5kYXRlcy5waWNrZWRbMV07XG4gICAgICAgICAgICAvL2Zvcm1hdCB0aGUgc3RhcnQgZGF0ZSBzbyB0aGF0IGl0IGNhbiBiZSBmb3VuZCBieSB0aGUgYXR0cmlidXRlXG4gICAgICAgICAgICBjb25zdCByYW5nZVN0YXJ0Rm9ybWF0dGVkID0gdGhpcy5fZGF0ZVRvRGF0YVZhbHVlKHJhbmdlU3RhcnQpO1xuICAgICAgICAgICAgY29uc3QgcmFuZ2VTdGFydEluZGV4ID0gYWxsRGF5cy5maW5kSW5kZXgoKGUpID0+IGUuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykgPT09IHJhbmdlU3RhcnRGb3JtYXR0ZWQpO1xuICAgICAgICAgICAgY29uc3QgcmFuZ2VTdGFydEVsZW1lbnQgPSBhbGxEYXlzW3JhbmdlU3RhcnRJbmRleF07XG4gICAgICAgICAgICAvL21ha2Ugc3VyZSB3ZSBkb24ndCBsZWF2ZSBzdGFydC9lbmQgY2xhc3NlcyBpZiB3ZSBkb24ndCBuZWVkIHRoZW1cbiAgICAgICAgICAgIGlmICghaW5uZXJEYXRlLmlzU2FtZShyYW5nZVN0YXJ0LCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MucmFuZ2VTdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlubmVyRGF0ZS5pc1NhbWUocmFuZ2VFbmQsIFVuaXQuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5yYW5nZUVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGUgZm9sbG93aW5nIGZpZ3VyZXMgb3V0IHdoaWNoIGRpcmVjdCBmcm9tIHN0YXJ0IGRhdGUgaXMgc2VsZWN0ZWRcbiAgICAgICAgICAgIC8vIHRoZSBzZWxlY3Rpb24gXCJjYXBcIiBjbGFzc2VzIGFyZSBhcHBsaWVkIGlmIG5lZWRlZFxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGFsbCB0aGUgZGF0ZXMgYmV0d2VlbiB3aWxsIGdldCB0aGUgYHJhbmdlSW5gIGNsYXNzLlxuICAgICAgICAgICAgLy8gV2UgbWFrZSB0aGlzIHNlbGVjdGlvbiBiYXNlZCBvbiB0aGUgZWxlbWVudCdzIGluZGV4IGFuZCB0aGUgcmFuZ2VTdGFydCBpbmRleFxuICAgICAgICAgICAgbGV0IGxhbWJkYTtcbiAgICAgICAgICAgIGlmIChpbm5lckRhdGUuaXNCZWZvcmUocmFuZ2VTdGFydCkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5yYW5nZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0RWxlbWVudD8uY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnJhbmdlU3RhcnQpO1xuICAgICAgICAgICAgICAgIHJhbmdlU3RhcnRFbGVtZW50Py5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MucmFuZ2VFbmQpO1xuICAgICAgICAgICAgICAgIGxhbWJkYSA9IChfLCBpbmRleCkgPT4gaW5kZXggPiBkYXlJbmRleCAmJiBpbmRleCA8IHJhbmdlU3RhcnRJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnJhbmdlRW5kKTtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0RWxlbWVudD8uY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnJhbmdlRW5kKTtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0RWxlbWVudD8uY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnJhbmdlU3RhcnQpO1xuICAgICAgICAgICAgICAgIGxhbWJkYSA9IChfLCBpbmRleCkgPT4gaW5kZXggPCBkYXlJbmRleCAmJiBpbmRleCA+IHJhbmdlU3RhcnRJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFsbERheXMuZmlsdGVyKGxhbWJkYSkuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnJhbmdlSW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJhbmdlSG92ZXJPdXRFdmVudCA9IChlKSA9PiB7XG4gICAgICAgICAgICAvLyBmaW5kIGFsbCB0aGUgZGF0ZXMgaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICAgICAgY29uc3QgYWxsRGF5cyA9IFsuLi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmRheScpXTtcbiAgICAgICAgICAgIC8vIGlmIG9ubHkgdGhlIHN0YXJ0IGlzIHNlbGVjdGVkLCByZW1vdmUgYWxsIHRoZSByYW5nZUluIGNsYXNzZXNcbiAgICAgICAgICAgIC8vIHdlIGRvIHRoaXMgYmVjYXVzZSBvbmNlIHRoZSB1c2VyIGhvdmVycyBvdmVyIGEgbmV3IGRhdGUgdGhlIHJhbmdlIHdpbGwgYmUgcmVjYWxjdWxhdGVkLlxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXMucGlja2VkLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICAgICAgICBhbGxEYXlzLmZvckVhY2goKGUpID0+IGUuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnJhbmdlSW4pKTtcbiAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgMCBvciAyIGRhdGVzIHNlbGVjdGVkIHRoZW4gaWdub3JlXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlcy5waWNrZWQubGVuZ3RoICE9PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBlPy5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBlbGVtZW50cyBkYXRlIGZyb20gdGhlIGF0dHJpYnV0ZSB2YWx1ZVxuICAgICAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gbmV3IERhdGVUaW1lKGN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykpO1xuICAgICAgICAgICAgLy8gdmVyaWZ5IHNlbGVjdGlvbnMgYW5kIHJlbW92ZSBpbnZhbGlkIGNsYXNzZXNcbiAgICAgICAgICAgIGlmICghaW5uZXJEYXRlLmlzU2FtZSh0aGlzLmRhdGVzLnBpY2tlZFswXSwgVW5pdC5kYXRlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnJhbmdlU3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpbm5lckRhdGUuaXNTYW1lKHRoaXMuZGF0ZXMucGlja2VkWzFdLCBVbml0LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MucmFuZ2VFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4geyByYW5nZUhvdmVyRXZlbnQsIHJhbmdlSG92ZXJPdXRFdmVudCB9O1xuICAgIH1cbiAgICBfdXBkYXRlQ2FsZW5kYXJWaWV3KGNvbnRhaW5lcikge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuY3VycmVudFZpZXcgIT09ICdjYWxlbmRhcicpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IFtwcmV2aW91cywgc3dpdGNoZXIsIG5leHRdID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXIpWzBdXG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpO1xuICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoTmFtZXNwYWNlLmNzcy5kYXlzQ29udGFpbmVyLCB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5mb3JtYXQodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uZGF5Vmlld0hlYWRlckZvcm1hdCkpO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5tb250aFxuICAgICAgICAgICAgPyBzd2l0Y2hlci5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICA6IHN3aXRjaGVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoLTEsIFVuaXQubW9udGgpLCBVbml0Lm1vbnRoKVxuICAgICAgICAgICAgPyBwcmV2aW91cy5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICA6IHByZXZpb3VzLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoMSwgVW5pdC5tb250aCksIFVuaXQubW9udGgpXG4gICAgICAgICAgICA/IG5leHQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgOiBuZXh0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgfVxuICAgIC8qKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBodG1sIHJvdyB0aGF0IGNvbnRhaW5zIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2RheXNPZlRoZVdlZWsoKSB7XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lXG4gICAgICAgICAgICAuc3RhcnRPZignd2Vla0RheScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnN0YXJ0T2ZUaGVXZWVrKVxuICAgICAgICAgICAgLnN0YXJ0T2YoVW5pdC5kYXRlKTtcbiAgICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGh0bWxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBodG1sRGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJXZWVrcywgTmFtZXNwYWNlLmNzcy5ub0hpZ2hsaWdodCk7XG4gICAgICAgICAgICBodG1sRGl2RWxlbWVudC5pbm5lclRleHQgPSAnIyc7XG4gICAgICAgICAgICByb3cucHVzaChodG1sRGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGh0bWxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBodG1sRGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGF5T2ZUaGVXZWVrLCBOYW1lc3BhY2UuY3NzLm5vSGlnaGxpZ2h0KTtcbiAgICAgICAgICAgIGh0bWxEaXZFbGVtZW50LmlubmVyVGV4dCA9IGlubmVyRGF0ZS5mb3JtYXQoeyB3ZWVrZGF5OiAnc2hvcnQnIH0pO1xuICAgICAgICAgICAgaW5uZXJEYXRlLm1hbmlwdWxhdGUoMSwgVW5pdC5kYXRlKTtcbiAgICAgICAgICAgIHJvdy5wdXNoKGh0bWxEaXZFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm93O1xuICAgIH1cbiAgICBfaGFuZGxlQ2FsZW5kYXJXZWVrcyhjb250YWluZXIsIGlubmVyRGF0ZSkge1xuICAgICAgICBbLi4uY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke05hbWVzcGFjZS5jc3MuY2FsZW5kYXJXZWVrc31gKV1cbiAgICAgICAgICAgIC5maWx0ZXIoKGUpID0+IGUuaW5uZXJUZXh0ICE9PSAnIycpXG4gICAgICAgICAgICAuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBgJHtpbm5lckRhdGUud2Vla31gO1xuICAgICAgICAgICAgaW5uZXJEYXRlLm1hbmlwdWxhdGUoNywgVW5pdC5kYXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgZm9yIGBtb250aGBcbiAqL1xuY2xhc3MgTW9udGhEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kYXRlcyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlcyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShWYWxpZGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGNvbnRhaW5lciBodG1sIGZvciB0aGUgZGlzcGxheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0UGlja2VyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5tb250aHNDb250YWluZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNlbGVjdE1vbnRoKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgZ3JpZCBhbmQgdXBkYXRlcyBlbmFibGVkIHN0YXRlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh3aWRnZXQsIHBhaW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MubW9udGhzQ29udGFpbmVyKVswXTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3ID09PSAnbW9udGhzJykge1xuICAgICAgICAgICAgY29uc3QgW3ByZXZpb3VzLCBzd2l0Y2hlciwgbmV4dF0gPSBjb250YWluZXIucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2FsZW5kYXJIZWFkZXIpWzBdXG4gICAgICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKTtcbiAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZShOYW1lc3BhY2UuY3NzLm1vbnRoc0NvbnRhaW5lciwgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuZm9ybWF0KHsgeWVhcjogJ251bWVyaWMnIH0pKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLnllYXJcbiAgICAgICAgICAgICAgICA/IHN3aXRjaGVyLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IHN3aXRjaGVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0LnllYXIpLCBVbml0LnllYXIpXG4gICAgICAgICAgICAgICAgPyBwcmV2aW91cy5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBwcmV2aW91cy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgxLCBVbml0LnllYXIpLCBVbml0LnllYXIpXG4gICAgICAgICAgICAgICAgPyBuZXh0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IG5leHQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5zdGFydE9mKFVuaXQueWVhcik7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3RNb250aH1cIl1gKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbnRhaW5lckNsb25lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MubW9udGgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS51bnNldCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuaXNQaWNrZWQoaW5uZXJEYXRlLCBVbml0Lm1vbnRoKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmFjdGl2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKGlubmVyRGF0ZSwgVW5pdC5tb250aCkpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWludChVbml0Lm1vbnRoLCBpbm5lckRhdGUsIGNsYXNzZXMsIGNvbnRhaW5lckNsb25lKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5yZW1vdmUoLi4uY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCBgJHtpbmRleH1gKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IGAke2lubmVyRGF0ZS5mb3JtYXQoeyBtb250aDogJ3Nob3J0JyB9KX1gO1xuICAgICAgICAgICAgaW5uZXJEYXRlLm1hbmlwdWxhdGUoMSwgVW5pdC5tb250aCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCB1cGRhdGVzIHRoZSBncmlkIGZvciBgeWVhcmBcbiAqL1xuY2xhc3MgWWVhckRpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnllYXJzQ29udGFpbmVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zZWxlY3RZZWFyKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgZ3JpZCBhbmQgdXBkYXRlcyBlbmFibGVkIHN0YXRlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh3aWRnZXQsIHBhaW50KSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0WWVhciA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoLTEsIFVuaXQueWVhcik7XG4gICAgICAgIHRoaXMuX2VuZFllYXIgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKDEwLCBVbml0LnllYXIpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLnllYXJzQ29udGFpbmVyKVswXTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3ID09PSAneWVhcnMnKSB7XG4gICAgICAgICAgICBjb25zdCBbcHJldmlvdXMsIHN3aXRjaGVyLCBuZXh0XSA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5jYWxlbmRhckhlYWRlcilbMF1cbiAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpO1xuICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKE5hbWVzcGFjZS5jc3MueWVhcnNDb250YWluZXIsIGAke3RoaXMuX3N0YXJ0WWVhci5mb3JtYXQoeyB5ZWFyOiAnbnVtZXJpYycgfSl9LSR7dGhpcy5fZW5kWWVhci5mb3JtYXQoe1xuICAgICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIH0pfWApO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuZGVjYWRlc1xuICAgICAgICAgICAgICAgID8gc3dpdGNoZXIuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogc3dpdGNoZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMuX3N0YXJ0WWVhciwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgID8gcHJldmlvdXMuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogcHJldmlvdXMuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMuX2VuZFllYXIsIFVuaXQueWVhcilcbiAgICAgICAgICAgICAgICA/IG5leHQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmRpc2FibGVkKVxuICAgICAgICAgICAgICAgIDogbmV4dC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lXG4gICAgICAgICAgICAuc3RhcnRPZihVbml0LnllYXIpXG4gICAgICAgICAgICAubWFuaXB1bGF0ZSgtMSwgVW5pdC55ZWFyKTtcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtYWN0aW9uPVwiJHtBY3Rpb25UeXBlcyQxLnNlbGVjdFllYXJ9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb250YWluZXJDbG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MueWVhcik7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ICYmXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5pc1BpY2tlZChpbm5lckRhdGUsIFVuaXQueWVhcikpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5hY3RpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZChpbm5lckRhdGUsIFVuaXQueWVhcikpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWludChVbml0LnllYXIsIGlubmVyRGF0ZSwgY2xhc3NlcywgY29udGFpbmVyQ2xvbmUpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LnJlbW92ZSguLi5jb250YWluZXJDbG9uZS5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIGAke2lubmVyRGF0ZS55ZWFyfWApO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuaW5uZXJUZXh0ID0gaW5uZXJEYXRlLmZvcm1hdCh7IHllYXI6ICdudW1lcmljJyB9KTtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDEsIFVuaXQueWVhcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCB1cGRhdGVzIHRoZSBncmlkIGZvciBgc2Vjb25kc2BcbiAqL1xuY2xhc3MgRGVjYWRlRGlzcGxheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZXMpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjb250YWluZXIgaHRtbCBmb3IgdGhlIGRpc3BsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFBpY2tlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGVjYWRlc0NvbnRhaW5lcik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0RGVjYWRlKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgZ3JpZCBhbmQgdXBkYXRlcyBlbmFibGVkIHN0YXRlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh3aWRnZXQsIHBhaW50KSB7XG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IERhdGVzLmdldFN0YXJ0RW5kWWVhcigxMDAsIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLnllYXIpO1xuICAgICAgICB0aGlzLl9zdGFydERlY2FkZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLnN0YXJ0T2YoVW5pdC55ZWFyKTtcbiAgICAgICAgdGhpcy5fc3RhcnREZWNhZGUueWVhciA9IHN0YXJ0O1xuICAgICAgICB0aGlzLl9lbmREZWNhZGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5zdGFydE9mKFVuaXQueWVhcik7XG4gICAgICAgIHRoaXMuX2VuZERlY2FkZS55ZWFyID0gZW5kO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB3aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmRlY2FkZXNDb250YWluZXIpWzBdO1xuICAgICAgICBjb25zdCBbcHJldmlvdXMsIHN3aXRjaGVyLCBuZXh0XSA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShOYW1lc3BhY2UuY3NzLmNhbGVuZGFySGVhZGVyKVswXVxuICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3ID09PSAnZGVjYWRlcycpIHtcbiAgICAgICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZShOYW1lc3BhY2UuY3NzLmRlY2FkZXNDb250YWluZXIsIGAke3RoaXMuX3N0YXJ0RGVjYWRlLmZvcm1hdCh7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgfSl9LSR7dGhpcy5fZW5kRGVjYWRlLmZvcm1hdCh7IHllYXI6ICdudW1lcmljJyB9KX1gKTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMuX3N0YXJ0RGVjYWRlLCBVbml0LnllYXIpXG4gICAgICAgICAgICAgICAgPyBwcmV2aW91cy5jbGFzc0xpc3QucmVtb3ZlKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpXG4gICAgICAgICAgICAgICAgOiBwcmV2aW91cy5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5fZW5kRGVjYWRlLCBVbml0LnllYXIpXG4gICAgICAgICAgICAgICAgPyBuZXh0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICA6IG5leHQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwaWNrZWRZZWFycyA9IHRoaXMuZGF0ZXMucGlja2VkLm1hcCgoeCkgPT4geC55ZWFyKTtcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtYWN0aW9uPVwiJHtBY3Rpb25UeXBlcyQxLnNlbGVjdERlY2FkZX1cIl1gKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbnRhaW5lckNsb25lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLm9sZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXJ0RGVjYWRlLnllYXIgLSAxMCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUudGV4dENvbnRlbnQgPSAnICc7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuaW5uZXJUZXh0ID0gdGhpcy5fc3RhcnREZWNhZGUuY2xvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYW5pcHVsYXRlKC0xMCwgVW5pdC55ZWFyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZvcm1hdCh7IHllYXI6ICdudW1lcmljJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7dGhpcy5fc3RhcnREZWNhZGUueWVhcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmRlY2FkZSk7XG4gICAgICAgICAgICBjb25zdCBzdGFydERlY2FkZVllYXIgPSB0aGlzLl9zdGFydERlY2FkZS55ZWFyO1xuICAgICAgICAgICAgY29uc3QgZW5kRGVjYWRlWWVhciA9IHRoaXMuX3N0YXJ0RGVjYWRlLnllYXIgKyA5O1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS51bnNldCAmJlxuICAgICAgICAgICAgICAgIHBpY2tlZFllYXJzLmZpbHRlcigoeCkgPT4geCA+PSBzdGFydERlY2FkZVllYXIgJiYgeCA8PSBlbmREZWNhZGVZZWFyKVxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmFjdGl2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWludCgnZGVjYWRlJywgdGhpcy5fc3RhcnREZWNhZGUsIGNsYXNzZXMsIGNvbnRhaW5lckNsb25lKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5yZW1vdmUoLi4uY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCBgJHt0aGlzLl9zdGFydERlY2FkZS55ZWFyfWApO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuaW5uZXJUZXh0ID0gYCR7dGhpcy5fc3RhcnREZWNhZGUuZm9ybWF0KHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICB9KX1gO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnREZWNhZGUubWFuaXB1bGF0ZSgxMCwgVW5pdC55ZWFyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGNsb2NrIGRpc3BsYXlcbiAqL1xuY2xhc3MgVGltZURpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyA9ICcnO1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBjbG9jayBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoaWNvblRhZykge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jbG9ja0NvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoLi4udGhpcy5fZ3JpZChpY29uVGFnKSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgdmFyaW91cyBlbGVtZW50cyB3aXRoIGluIHRoZSBjbG9jayBkaXNwbGF5XG4gICAgICogbGlrZSB0aGUgY3VycmVudCBob3VyIGFuZCBpZiB0aGUgbWFuaXB1bGF0aW9uIGljb25zIGFyZSBlbmFibGVkLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh3aWRnZXQpIHtcbiAgICAgICAgY29uc3QgdGltZXNEaXYgPSAod2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5jbG9ja0NvbnRhaW5lcilbMF0pO1xuICAgICAgICBsZXQgbGFzdFBpY2tlZCA9IHRoaXMuZGF0ZXMubGFzdFBpY2tlZD8uY2xvbmU7XG4gICAgICAgIGlmICghbGFzdFBpY2tlZCAmJiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnVzZUN1cnJlbnQpXG4gICAgICAgICAgICBsYXN0UGlja2VkID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmU7XG4gICAgICAgIHRpbWVzRGl2XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnLmRpc2FibGVkJylcbiAgICAgICAgICAgIC5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCkpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuaG91cnMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgxLCBVbml0LmhvdXJzKSwgVW5pdC5ob3VycykpIHtcbiAgICAgICAgICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRIb3Vyc31dYClcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoLTEsIFVuaXQuaG91cnMpLCBVbml0LmhvdXJzKSkge1xuICAgICAgICAgICAgICAgIHRpbWVzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3Rpb249JHtBY3Rpb25UeXBlcyQxLmRlY3JlbWVudEhvdXJzfV1gKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVzRGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRpbWUtY29tcG9uZW50PSR7VW5pdC5ob3Vyc31dYCkuaW5uZXJUZXh0ID0gbGFzdFBpY2tlZFxuICAgICAgICAgICAgICAgID8gbGFzdFBpY2tlZC5nZXRIb3Vyc0Zvcm1hdHRlZCh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5ob3VyQ3ljbGUpXG4gICAgICAgICAgICAgICAgOiAnLS0nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5taW51dGVzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoMSwgVW5pdC5taW51dGVzKSwgVW5pdC5taW51dGVzKSkge1xuICAgICAgICAgICAgICAgIHRpbWVzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3Rpb249JHtBY3Rpb25UeXBlcyQxLmluY3JlbWVudE1pbnV0ZXN9XWApXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpb24uaXNWYWxpZCh0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5tYW5pcHVsYXRlKC0xLCBVbml0Lm1pbnV0ZXMpLCBVbml0Lm1pbnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgdGltZXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFjdGlvbj0ke0FjdGlvblR5cGVzJDEuZGVjcmVtZW50TWludXRlc31dYClcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lc0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS10aW1lLWNvbXBvbmVudD0ke1VuaXQubWludXRlc31dYCkuaW5uZXJUZXh0ID0gbGFzdFBpY2tlZCA/IGxhc3RQaWNrZWQubWludXRlc0Zvcm1hdHRlZCA6ICctLSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLnNlY29uZHMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUubWFuaXB1bGF0ZSgxLCBVbml0LnNlY29uZHMpLCBVbml0LnNlY29uZHMpKSB7XG4gICAgICAgICAgICAgICAgdGltZXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFjdGlvbj0ke0FjdGlvblR5cGVzJDEuaW5jcmVtZW50U2Vjb25kc31dYClcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLm1hbmlwdWxhdGUoLTEsIFVuaXQuc2Vjb25kcyksIFVuaXQuc2Vjb25kcykpIHtcbiAgICAgICAgICAgICAgICB0aW1lc0RpdlxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aW9uPSR7QWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRTZWNvbmRzfV1gKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVzRGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRpbWUtY29tcG9uZW50PSR7VW5pdC5zZWNvbmRzfV1gKS5pbm5lclRleHQgPSBsYXN0UGlja2VkID8gbGFzdFBpY2tlZC5zZWNvbmRzRm9ybWF0dGVkIDogJy0tJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuaXNUd2VsdmVIb3VyKSB7XG4gICAgICAgICAgICBjb25zdCB0b2dnbGUgPSB0aW1lc0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3Rpb249JHtBY3Rpb25UeXBlcyQxLnRvZ2dsZU1lcmlkaWVtfV1gKTtcbiAgICAgICAgICAgIGNvbnN0IG1lcmlkaWVtRGF0ZSA9IChsYXN0UGlja2VkIHx8IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlKS5jbG9uZTtcbiAgICAgICAgICAgIHRvZ2dsZS5pbm5lclRleHQgPSBtZXJpZGllbURhdGUubWVyaWRpZW0oKTtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQobWVyaWRpZW1EYXRlLm1hbmlwdWxhdGUobWVyaWRpZW1EYXRlLmhvdXJzID49IDEyID8gLTEyIDogMTIsIFVuaXQuaG91cnMpKSkge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGltZXNEaXYuc3R5bGUuZ3JpZFRlbXBsYXRlQXJlYXMgPSBgXCIke3RoaXMuX2dyaWRDb2x1bW5zfVwiYDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgdGFibGUgZm9yIHRoZSBjbG9jayBkaXNwbGF5IGRlcGVuZGluZyBvbiB3aGF0IG9wdGlvbnMgYXJlIHNlbGVjdGVkLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dyaWQoaWNvblRhZykge1xuICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyA9ICcnO1xuICAgICAgICBjb25zdCB0b3AgPSBbXSwgbWlkZGxlID0gW10sIGJvdHRvbSA9IFtdLCBzZXBhcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgdXBJY29uID0gaWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMudXApLCBkb3duSWNvbiA9IGljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLmRvd24pO1xuICAgICAgICBzZXBhcmF0b3IuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnNlcGFyYXRvciwgTmFtZXNwYWNlLmNzcy5ub0hpZ2hsaWdodCk7XG4gICAgICAgIGNvbnN0IHNlcGFyYXRvckNvbG9uID0gc2VwYXJhdG9yLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgc2VwYXJhdG9yQ29sb24uaW5uZXJIVE1MID0gJzonO1xuICAgICAgICBjb25zdCBnZXRTZXBhcmF0b3IgPSAoY29sb24gPSBmYWxzZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9uXG4gICAgICAgICAgICAgICAgPyBzZXBhcmF0b3JDb2xvbi5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgICAgICAgICAgICA6IHNlcGFyYXRvci5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5ob3Vycykge1xuICAgICAgICAgICAgbGV0IGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmluY3JlbWVudEhvdXIpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRIb3Vycyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LmFwcGVuZENoaWxkKHVwSWNvbi5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgdG9wLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5waWNrSG91cik7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNob3dIb3Vycyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aW1lLWNvbXBvbmVudCcsIFVuaXQuaG91cnMpO1xuICAgICAgICAgICAgbWlkZGxlLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5kZWNyZW1lbnRIb3VyKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuZGVjcmVtZW50SG91cnMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZChkb3duSWNvbi5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgYm90dG9tLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyArPSAnYSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLm1pbnV0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zICs9ICcgYSc7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuaG91cnMpIHtcbiAgICAgICAgICAgICAgICB0b3AucHVzaChnZXRTZXBhcmF0b3IoKSk7XG4gICAgICAgICAgICAgICAgbWlkZGxlLnB1c2goZ2V0U2VwYXJhdG9yKHRydWUpKTtcbiAgICAgICAgICAgICAgICBib3R0b20ucHVzaChnZXRTZXBhcmF0b3IoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ3JpZENvbHVtbnMgKz0gJyBhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5pbmNyZW1lbnRNaW51dGUpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5pbmNyZW1lbnRNaW51dGVzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQodXBJY29uLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICB0b3AucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnBpY2tNaW51dGUpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zaG93TWludXRlcyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aW1lLWNvbXBvbmVudCcsIFVuaXQubWludXRlcyk7XG4gICAgICAgICAgICBtaWRkbGUucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmRlY3JlbWVudE1pbnV0ZSk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmRlY3JlbWVudE1pbnV0ZXMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZChkb3duSWNvbi5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgYm90dG9tLnB1c2goZGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLnNlY29uZHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zICs9ICcgYSc7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMubWludXRlcykge1xuICAgICAgICAgICAgICAgIHRvcC5wdXNoKGdldFNlcGFyYXRvcigpKTtcbiAgICAgICAgICAgICAgICBtaWRkbGUucHVzaChnZXRTZXBhcmF0b3IodHJ1ZSkpO1xuICAgICAgICAgICAgICAgIGJvdHRvbS5wdXNoKGdldFNlcGFyYXRvcigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyArPSAnIGEnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLmluY3JlbWVudFNlY29uZCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmluY3JlbWVudFNlY29uZHMpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZCh1cEljb24uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHRvcC5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24ucGlja1NlY29uZCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnNob3dTZWNvbmRzKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRpbWUtY29tcG9uZW50JywgVW5pdC5zZWNvbmRzKTtcbiAgICAgICAgICAgIG1pZGRsZS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgZGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uZGVjcmVtZW50U2Vjb25kKTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuZGVjcmVtZW50U2Vjb25kcyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LmFwcGVuZENoaWxkKGRvd25JY29uLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBib3R0b20ucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuaXNUd2VsdmVIb3VyKSB7XG4gICAgICAgICAgICB0aGlzLl9ncmlkQ29sdW1ucyArPSAnIGEnO1xuICAgICAgICAgICAgbGV0IGRpdkVsZW1lbnQgPSBnZXRTZXBhcmF0b3IoKTtcbiAgICAgICAgICAgIHRvcC5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi50b2dnbGVNZXJpZGllbSk7XG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEudG9nZ2xlTWVyaWRpZW0pO1xuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgICAgIGlmIChOYW1lc3BhY2UuY3NzLnRvZ2dsZU1lcmlkaWVtLmluY2x1ZGVzKCcsJykpIHtcbiAgICAgICAgICAgICAgICAvL3RvZG8gbW92ZSB0aGlzIHRvIHBhaW50IGZ1bmN0aW9uP1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKC4uLk5hbWVzcGFjZS5jc3MudG9nZ2xlTWVyaWRpZW0uc3BsaXQoJywnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy50b2dnbGVNZXJpZGllbSk7XG4gICAgICAgICAgICBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5ub0hpZ2hsaWdodCk7XG4gICAgICAgICAgICBkaXZFbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgICAgICBtaWRkbGUucHVzaChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIGRpdkVsZW1lbnQgPSBnZXRTZXBhcmF0b3IoKTtcbiAgICAgICAgICAgIGJvdHRvbS5wdXNoKGRpdkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2dyaWRDb2x1bW5zID0gdGhpcy5fZ3JpZENvbHVtbnMudHJpbSgpO1xuICAgICAgICByZXR1cm4gWy4uLnRvcCwgLi4ubWlkZGxlLCAuLi5ib3R0b21dO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCB1cGRhdGVzIHRoZSBncmlkIGZvciBgaG91cnNgXG4gKi9cbmNsYXNzIEhvdXJEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmhvdXJDb250YWluZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICh0aGlzLm9wdGlvbnNTdG9yZS5pc1R3ZWx2ZUhvdXIgPyAxMiA6IDI0KTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zZWxlY3RIb3VyKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgZ3JpZCBhbmQgdXBkYXRlcyBlbmFibGVkIHN0YXRlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh3aWRnZXQsIHBhaW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuaG91ckNvbnRhaW5lcilbMF07XG4gICAgICAgIGNvbnN0IGlubmVyRGF0ZSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lLnN0YXJ0T2YoVW5pdC5kYXRlKTtcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtYWN0aW9uPVwiJHtBY3Rpb25UeXBlcyQxLnNlbGVjdEhvdXJ9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb250YWluZXJDbG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuaG91cik7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKGlubmVyRGF0ZSwgVW5pdC5ob3VycykpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goTmFtZXNwYWNlLmNzcy5kaXNhYmxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWludChVbml0LmhvdXJzLCBpbm5lckRhdGUsIGNsYXNzZXMsIGNvbnRhaW5lckNsb25lKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5yZW1vdmUoLi4uY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCBgJHtpbm5lckRhdGUuaG91cnN9YCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5pbm5lclRleHQgPSBpbm5lckRhdGUuZ2V0SG91cnNGb3JtYXR0ZWQodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlKTtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDEsIFVuaXQuaG91cnMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgdXBkYXRlcyB0aGUgZ3JpZCBmb3IgYG1pbnV0ZXNgXG4gKi9cbmNsYXNzIE1pbnV0ZURpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShPcHRpb25zU3RvcmUpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjb250YWluZXIgaHRtbCBmb3IgdGhlIGRpc3BsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldFBpY2tlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MubWludXRlQ29udGFpbmVyKTtcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmcgPT09IDFcbiAgICAgICAgICAgID8gNVxuICAgICAgICAgICAgOiB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnN0ZXBwaW5nO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYwIC8gc3RlcDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgQWN0aW9uVHlwZXMkMS5zZWxlY3RNaW51dGUpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGVzIHRoZSBncmlkIGFuZCB1cGRhdGVzIGVuYWJsZWQgc3RhdGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlKHdpZGdldCwgcGFpbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gd2lkZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5taW51dGVDb250YWluZXIpWzBdO1xuICAgICAgICBjb25zdCBpbm5lckRhdGUgPSB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5jbG9uZS5zdGFydE9mKFVuaXQuaG91cnMpO1xuICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZyA9PT0gMVxuICAgICAgICAgICAgPyA1XG4gICAgICAgICAgICA6IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuc3RlcHBpbmc7XG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFjdGlvbj1cIiR7QWN0aW9uVHlwZXMkMS5zZWxlY3RNaW51dGV9XCJdYClcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb250YWluZXJDbG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MubWludXRlKTtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uLmlzVmFsaWQoaW5uZXJEYXRlLCBVbml0Lm1pbnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKE5hbWVzcGFjZS5jc3MuZGlzYWJsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpbnQoVW5pdC5taW51dGVzLCBpbm5lckRhdGUsIGNsYXNzZXMsIGNvbnRhaW5lckNsb25lKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5yZW1vdmUoLi4uY29udGFpbmVyQ2xvbmUuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCBgJHtpbm5lckRhdGUubWludXRlc31gKTtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsb25lLmlubmVyVGV4dCA9IGlubmVyRGF0ZS5taW51dGVzRm9ybWF0dGVkO1xuICAgICAgICAgICAgaW5uZXJEYXRlLm1hbmlwdWxhdGUoc3RlcCwgVW5pdC5taW51dGVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgZm9yIGBzZWNvbmRzYFxuICovXG5jbGFzcyBzZWNvbmREaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZCB0aGUgY29udGFpbmVyIGh0bWwgZm9yIHRoZSBkaXNwbGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRQaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnNlY29uZENvbnRhaW5lcik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuc2VsZWN0U2Vjb25kKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgZ3JpZCBhbmQgdXBkYXRlcyBlbmFibGVkIHN0YXRlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSh3aWRnZXQsIHBhaW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3Muc2Vjb25kQ29udGFpbmVyKVswXTtcbiAgICAgICAgY29uc3QgaW5uZXJEYXRlID0gdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUuc3RhcnRPZihVbml0Lm1pbnV0ZXMpO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hY3Rpb249XCIke0FjdGlvblR5cGVzJDEuc2VsZWN0U2Vjb25kfVwiXWApXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29udGFpbmVyQ2xvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLnNlY29uZCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKGlubmVyRGF0ZSwgVW5pdC5zZWNvbmRzKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChOYW1lc3BhY2UuY3NzLmRpc2FibGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhaW50KFVuaXQuc2Vjb25kcywgaW5uZXJEYXRlLCBjbGFzc2VzLCBjb250YWluZXJDbG9uZSk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNvbnRhaW5lckNsb25lLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgICAgICAgICAgY29udGFpbmVyQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgYCR7aW5uZXJEYXRlLnNlY29uZHN9YCk7XG4gICAgICAgICAgICBjb250YWluZXJDbG9uZS5pbm5lclRleHQgPSBpbm5lckRhdGUuc2Vjb25kc0Zvcm1hdHRlZDtcbiAgICAgICAgICAgIGlubmVyRGF0ZS5tYW5pcHVsYXRlKDUsIFVuaXQuc2Vjb25kcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhIGNvbGxhcHNlIGZ1bmN0aW9uYWxpdHkgdG8gdGhlIHZpZXcgY2hhbmdlc1xuICovXG5jbGFzcyBDb2xsYXBzZSB7XG4gICAgLyoqXG4gICAgICogRmxpcHMgdGhlIHNob3cvaGlkZSBzdGF0ZSBvZiBgdGFyZ2V0YFxuICAgICAqIEBwYXJhbSB0YXJnZXQgaHRtbCBlbGVtZW50IHRvIGFmZmVjdC5cbiAgICAgKi9cbiAgICBzdGF0aWMgdG9nZ2xlKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLnNob3cpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdyh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNraXBzIGFueSBhbmltYXRpb24gb3IgdGltZW91dHMgYW5kIGltbWVkaWF0ZWx5IHNldCB0aGUgZWxlbWVudCB0byBzaG93LlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hvd0ltbWVkaWF0ZWx5KHRhcmdldCkge1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmNvbGxhcHNpbmcpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmNvbGxhcHNlLCBOYW1lc3BhY2UuY3NzLnNob3cpO1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIGB0YXJnZXRgIGlzIG5vdCBhbHJlYWR5IHNob3dpbmcsIHRoZW4gc2hvdyBhZnRlciB0aGUgYW5pbWF0aW9uLlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hvdyh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5jb2xsYXBzaW5nKSB8fFxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOYW1lc3BhY2UuY3NzLnNob3cpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIENvbGxhcHNlLnNob3dJbW1lZGlhdGVseSh0YXJnZXQpO1xuICAgICAgICB9O1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJzAnO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmNvbGxhcHNlKTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jb2xsYXBzaW5nKTtcbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIHNldFRpbWVvdXQoY29tcGxldGUsIHRoaXMuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGFyZ2V0KSk7XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXQuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2tpcHMgYW55IGFuaW1hdGlvbiBvciB0aW1lb3V0cyBhbmQgaW1tZWRpYXRlbHkgc2V0IHRoZSBlbGVtZW50IHRvIGhpZGUuXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqL1xuICAgIHN0YXRpYyBoaWRlSW1tZWRpYXRlbHkodGFyZ2V0KSB7XG4gICAgICAgIGlmICghdGFyZ2V0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLmNvbGxhcHNpbmcsIE5hbWVzcGFjZS5jc3Muc2hvdyk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MuY29sbGFwc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBgdGFyZ2V0YCBpcyBub3QgYWxyZWFkeSBoaWRkZW4sIHRoZW4gaGlkZSBhZnRlciB0aGUgYW5pbWF0aW9uLlxuICAgICAqIEBwYXJhbSB0YXJnZXQgSFRNTCBFbGVtZW50XG4gICAgICovXG4gICAgc3RhdGljIGhpZGUodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3MuY29sbGFwc2luZykgfHxcbiAgICAgICAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3Muc2hvdykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgQ29sbGFwc2UuaGlkZUltbWVkaWF0ZWx5KHRhcmdldCk7XG4gICAgICAgIH07XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbJ2hlaWdodCddfXB4YDtcbiAgICAgICAgY29uc3QgcmVmbG93ID0gKGVsZW1lbnQpID0+IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICByZWZsb3codGFyZ2V0KTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoTmFtZXNwYWNlLmNzcy5jb2xsYXBzZSwgTmFtZXNwYWNlLmNzcy5zaG93KTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jb2xsYXBzaW5nKTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgc2V0VGltZW91dChjb21wbGV0ZSwgdGhpcy5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0YXJnZXQpKTtcbiAgICB9XG59XG4vKipcbiAqIEdldHMgdGhlIHRyYW5zaXRpb24gZHVyYXRpb24gZnJvbSB0aGUgYGVsZW1lbnRgIGJ5IGdldHRpbmcgY3NzIHByb3BlcnRpZXNcbiAqIGB0cmFuc2l0aW9uLWR1cmF0aW9uYCBhbmQgYHRyYW5zaXRpb24tZGVsYXlgXG4gKiBAcGFyYW0gZWxlbWVudCBIVE1MIEVsZW1lbnRcbiAqL1xuQ29sbGFwc2UuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQgPSAoZWxlbWVudCkgPT4ge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgLy8gR2V0IHRyYW5zaXRpb24tZHVyYXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICBsZXQgeyB0cmFuc2l0aW9uRHVyYXRpb24sIHRyYW5zaXRpb25EZWxheSB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgY29uc3QgZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gPSBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkRlbGF5ID0gTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkRlbGF5KTtcbiAgICAvLyBSZXR1cm4gMCBpZiBlbGVtZW50IG9yIHRyYW5zaXRpb24gZHVyYXRpb24gaXMgbm90IGZvdW5kXG4gICAgaWYgKCFmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiAmJiAhZmxvYXRUcmFuc2l0aW9uRGVsYXkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIC8vIElmIG11bHRpcGxlIGR1cmF0aW9ucyBhcmUgZGVmaW5lZCwgdGFrZSB0aGUgZmlyc3RcbiAgICB0cmFuc2l0aW9uRHVyYXRpb24gPSB0cmFuc2l0aW9uRHVyYXRpb24uc3BsaXQoJywnKVswXTtcbiAgICB0cmFuc2l0aW9uRGVsYXkgPSB0cmFuc2l0aW9uRGVsYXkuc3BsaXQoJywnKVswXTtcbiAgICByZXR1cm4gKChOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pICtcbiAgICAgICAgTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkRlbGF5KSkgKlxuICAgICAgICAxMDAwKTtcbn07XG5cbi8qKlxuICogTWFpbiBjbGFzcyBmb3IgYWxsIHRoaW5ncyBkaXNwbGF5IHJlbGF0ZWQuXG4gKi9cbmNsYXNzIERpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9pc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZG9jdW1lbnQgY2xpY2sgZXZlbnQgdG8gaGlkZSB0aGUgd2lkZ2V0IGlmIGNsaWNrIGlzIG91dHNpZGVcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHBhcmFtIGUgTW91c2VFdmVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDbGlja0V2ZW50ID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRlYnVnIHx8IHdpbmRvdy5kZWJ1ZylcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBpZiAodGhpcy5faXNWaXNpYmxlICYmXG4gICAgICAgICAgICAgICAgIWUuY29tcG9zZWRQYXRoKCkuaW5jbHVkZXModGhpcy53aWRnZXQpICYmIC8vIGNsaWNrIGluc2lkZSB0aGUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgIWUuY29tcG9zZWRQYXRoKCk/LmluY2x1ZGVzKHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQpIC8vIGNsaWNrIG9uIHRoZSBlbGVtZW50XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsaWNrIGV2ZW50IGZvciBhbnkgYWN0aW9uIGxpa2Ugc2VsZWN0aW5nIGEgZGF0ZVxuICAgICAgICAgKiBAcGFyYW0gZSBNb3VzZUV2ZW50XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hY3Rpb25zQ2xpY2tFdmVudCA9IChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLmFjdGlvbi5lbWl0KHsgZTogZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gc2VydmljZUxvY2F0b3IubG9jYXRlKFZhbGlkYXRpb24pO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy5kYXRlRGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEYXRlRGlzcGxheSk7XG4gICAgICAgIHRoaXMubW9udGhEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE1vbnRoRGlzcGxheSk7XG4gICAgICAgIHRoaXMueWVhckRpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoWWVhckRpc3BsYXkpO1xuICAgICAgICB0aGlzLmRlY2FkZURpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGVjYWRlRGlzcGxheSk7XG4gICAgICAgIHRoaXMudGltZURpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVGltZURpc3BsYXkpO1xuICAgICAgICB0aGlzLmhvdXJEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKEhvdXJEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5taW51dGVEaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE1pbnV0ZURpc3BsYXkpO1xuICAgICAgICB0aGlzLnNlY29uZERpc3BsYXkgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoc2Vjb25kRGlzcGxheSk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRXZlbnRFbWl0dGVycyk7XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy51cGRhdGVEaXNwbGF5LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGUocmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHdpZGdldCBib2R5IG9yIHVuZGVmaW5lZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0IHdpZGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZGdldDtcbiAgICB9XG4gICAgZ2V0IGRhdGVDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldD8ucXVlcnlTZWxlY3RvcihgZGl2LiR7TmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyfWApO1xuICAgIH1cbiAgICBnZXQgdGltZUNvbnRhaW5lcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0Py5xdWVyeVNlbGVjdG9yKGBkaXYuJHtOYW1lc3BhY2UuY3NzLnRpbWVDb250YWluZXJ9YCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhpcyB2aXNpYmxlIHN0YXRlIG9mIHRoZSBwaWNrZXIgKHNob3duKVxuICAgICAqL1xuICAgIGdldCBpc1Zpc2libGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1Zpc2libGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHRhYmxlIGZvciBhIHBhcnRpY3VsYXIgdW5pdC4gVXNlZCB3aGVuIGFuIG9wdGlvbiBhcyBjaGFuZ2VkIG9yXG4gICAgICogd2hlbmV2ZXIgdGhlIGNsYXNzIGxpc3QgbWlnaHQgbmVlZCB0byBiZSByZWZyZXNoZWQuXG4gICAgICogQHBhcmFtIHVuaXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGUodW5pdCkge1xuICAgICAgICBpZiAoIXRoaXMud2lkZ2V0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgICAgICAgIGNhc2UgVW5pdC5zZWNvbmRzOlxuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVW5pdC5taW51dGVzOlxuICAgICAgICAgICAgICAgIHRoaXMubWludXRlRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVW5pdC5ob3VyczpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXJEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVbml0LmRhdGU6XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVW5pdC5tb250aDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnRoRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVW5pdC55ZWFyOlxuICAgICAgICAgICAgICAgIHRoaXMueWVhckRpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVjYWRlRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Nsb2NrJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2hhc1RpbWUpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQuaG91cnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0Lm1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0LnNlY29uZHMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2FsZW5kYXInOlxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0LnllYXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0Lm1vbnRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY2FkZURpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FsZW5kYXJIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2FsbCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2hhc1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKCdjbG9jaycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faGFzRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoJ2NhbGVuZGFyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIEFsbG93cyBkZXZlbG9wZXJzIHRvIGFkZC9yZW1vdmUgY2xhc3NlcyBmcm9tIGFuIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIF91bml0XG4gICAgICogQHBhcmFtIF9kYXRlXG4gICAgICogQHBhcmFtIF9jbGFzc2VzXG4gICAgICogQHBhcmFtIF9lbGVtZW50XG4gICAgICovXG4gICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gICAgcGFpbnQoX3VuaXQsIF9kYXRlLCBfY2xhc3NlcywgX2VsZW1lbnQpIHtcbiAgICAgICAgLy8gaW1wbGVtZW50ZWQgaW4gcGx1Z2luXG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBwaWNrZXIgYW5kIGNyZWF0ZXMgYSBQb3BwZXIgaW5zdGFuY2UgaWYgbmVlZGVkLlxuICAgICAqIEFkZCBkb2N1bWVudCBjbGljayBldmVudCB0byBoaWRlIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSB0aGUgcGlja2VyLlxuICAgICAqIGZpcmVzIEV2ZW50cyNzaG93XG4gICAgICovXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMud2lkZ2V0ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd1NldERlZmF1bHRJZk5lZWRlZCgpO1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRXaWRnZXQoKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRoZW1lKCk7XG4gICAgICAgICAgICB0aGlzLl9zaG93U2V0dXBWaWV3TW9kZSgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgbmVlZGVkIHRvIGNoYW5nZSB0aGUgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnM/LmNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnM/LmRpc3BsYXk/LnBsYWNlbWVudCB8fCAnYm90dG9tJztcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy53aWRnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9wdXAodGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudCwgdGhpcy53aWRnZXQsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiB0cnVlIH1dLFxuICAgICAgICAgICAgICAgICAgICAvLyMyNDAwXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRpciA9PT0gJ3J0bCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7cGxhY2VtZW50fS1lbmRgXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGAke3BsYWNlbWVudH0tc3RhcnRgLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy53aWRnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS52aWV3TW9kZSA9PSAnY2xvY2snKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy5hY3Rpb24uZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogQWN0aW9uVHlwZXMkMS5zaG93Q2xvY2ssXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLndpZGdldFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY3Rpb25dJylcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2FjdGlvbnNDbGlja0V2ZW50KSk7XG4gICAgICAgICAgICAvLyBzaG93IHRoZSBjbG9jayB3aGVuIHVzaW5nIHNpZGVCeVNpZGVcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNUaW1lICYmIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLndpZGdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKE5hbWVzcGFjZS5jc3MuY2xvY2tDb250YWluZXIpWzBdLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnNob3cpO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9wdXAoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fZG9jdW1lbnRDbGlja0V2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5lbWl0KHsgdHlwZTogTmFtZXNwYWNlLmV2ZW50cy5zaG93IH0pO1xuICAgICAgICB0aGlzLl9pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cbiAgICBfc2hvd1NldHVwVmlld01vZGUoKSB7XG4gICAgICAgIC8vIElmIG1vZGVWaWV3IGlzIG9ubHkgY2xvY2tcbiAgICAgICAgY29uc3Qgb25seUNsb2NrID0gdGhpcy5faGFzVGltZSAmJiAhdGhpcy5faGFzRGF0ZTtcbiAgICAgICAgLy8gcmVzZXQgdGhlIHZpZXcgdG8gdGhlIGNsb2NrIGlmIHRoZXJlJ3Mgbm8gZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIGlmIChvbmx5Q2xvY2spIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3ID0gJ2Nsb2NrJztcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMuYWN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgICAgIGU6IG51bGwsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBBY3Rpb25UeXBlcyQxLnNob3dDbG9jayxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIG90aGVyd2lzZSByZXR1cm4gdG8gdGhlIGNhbGVuZGFyIHZpZXdcbiAgICAgICAgZWxzZSBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUubWluaW11bUNhbGVuZGFyVmlld01vZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvbmx5Q2xvY2sgJiYgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnZpZXdNb2RlICE9PSAnY2xvY2snKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVGltZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnNpZGVCeVNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgQ29sbGFwc2UuaGlkZUltbWVkaWF0ZWx5KHRoaXMudGltZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBDb2xsYXBzZS5zaG93KHRoaXMudGltZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ29sbGFwc2Uuc2hvdyh0aGlzLmRhdGVDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9oYXNEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG93TW9kZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zaG93U2V0RGVmYXVsdElmTmVlZGVkKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRlcy5waWNrZWQubGVuZ3RoICE9IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnVzZUN1cnJlbnQgJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGVUaW1lKCkuc2V0TG9jYWxpemF0aW9uKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5rZWVwSW52YWxpZCkge1xuICAgICAgICAgICAgICAgIGxldCB0cmllcyA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMucmVzdHJpY3Rpb25zLm1heERhdGU/LmlzQmVmb3JlKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoIXRoaXMudmFsaWRhdGlvbi5pc1ZhbGlkKGRhdGUpICYmIHRyaWVzID4gMzEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5tYW5pcHVsYXRlKGRpcmVjdGlvbiwgVW5pdC5kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGVmYXVsdERhdGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZVBvcHVwKGVsZW1lbnQsIHdpZGdldCwgXG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IGNyZWF0ZVBvcHBlckZ1bmN0aW9uO1xuICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGlmICh3aW5kb3c/LlBvcHBlcikge1xuICAgICAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgY3JlYXRlUG9wcGVyRnVuY3Rpb24gPSB3aW5kb3c/LlBvcHBlcj8uY3JlYXRlUG9wcGVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBjcmVhdGVQb3BwZXIgfSA9IGF3YWl0IGltcG9ydCgnQHBvcHBlcmpzL2NvcmUnKTtcbiAgICAgICAgICAgIGNyZWF0ZVBvcHBlckZ1bmN0aW9uID0gY3JlYXRlUG9wcGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjcmVhdGVQb3BwZXJGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UgPSBjcmVhdGVQb3BwZXJGdW5jdGlvbihlbGVtZW50LCB3aWRnZXQsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZVBvcHVwKCkge1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZT8udXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIGNhbGVuZGFyIHZpZXcgbW9kZS4gRS5nLiBtb250aCA8LT4geWVhclxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb24gLS8rIG51bWJlciB0byBtb3ZlIGN1cnJlbnRWaWV3TW9kZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Nob3dNb2RlKGRpcmVjdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMud2lkZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgodGhpcy5vcHRpb25zU3RvcmUubWluaW11bUNhbGVuZGFyVmlld01vZGUsIE1hdGgubWluKDMsIHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlICsgZGlyZWN0aW9uKSk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGUgPT0gbWF4KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlID0gbWF4O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2lkZ2V0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChgLiR7TmFtZXNwYWNlLmNzcy5kYXRlQ29udGFpbmVyfSA+IGRpdjpub3QoLiR7TmFtZXNwYWNlLmNzcy5jYWxlbmRhckhlYWRlcn0pLCAuJHtOYW1lc3BhY2UuY3NzLnRpbWVDb250YWluZXJ9ID4gZGl2Om5vdCguJHtOYW1lc3BhY2UuY3NzLmNsb2NrQ29udGFpbmVyfSlgKVxuICAgICAgICAgICAgLmZvckVhY2goKGUpID0+IChlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpKTtcbiAgICAgICAgY29uc3QgZGF0ZVBpY2tlck1vZGUgPSBDYWxlbmRhck1vZGVzW3RoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlXTtcbiAgICAgICAgY29uc3QgcGlja2VyID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcihgLiR7ZGF0ZVBpY2tlck1vZGUuY2xhc3NOYW1lfWApO1xuICAgICAgICBzd2l0Y2ggKGRhdGVQaWNrZXJNb2RlLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLmRlY2FkZXNDb250YWluZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNhZGVEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLnllYXJzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHRoaXMueWVhckRpc3BsYXkuX3VwZGF0ZSh0aGlzLndpZGdldCwgdGhpcy5wYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MubW9udGhzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHRoaXMubW9udGhEaXNwbGF5Ll91cGRhdGUodGhpcy53aWRnZXQsIHRoaXMucGFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLmRheXNDb250YWluZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlRGlzcGxheS5fdXBkYXRlKHRoaXMud2lkZ2V0LCB0aGlzLnBhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBwaWNrZXIuc3R5bGUuZGlzcGxheSA9ICdncmlkJztcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5zaWRlQnlTaWRlKVxuICAgICAgICAgICAgKHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke05hbWVzcGFjZS5jc3MuY2xvY2tDb250YWluZXJ9YClbMF0pLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNhbGVuZGFySGVhZGVyKCk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudmlld1VwZGF0ZS5lbWl0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIHRoZW1lLiBFLmcuIGxpZ2h0LCBkYXJrIG9yIGF1dG9cbiAgICAgKiBAcGFyYW0gdGhlbWUgdGhlIHRoZW1lIG5hbWVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGVUaGVtZSh0aGVtZSkge1xuICAgICAgICBpZiAoIXRoaXMud2lkZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoZW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRoZW1lID09PSB0aGVtZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudGhlbWUgPSB0aGVtZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QucmVtb3ZlKCdsaWdodCcsICdkYXJrJyk7XG4gICAgICAgIHRoaXMud2lkZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5fZ2V0VGhlbWVDbGFzcygpKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50aGVtZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICB3aW5kb3dcbiAgICAgICAgICAgICAgICAubWF0Y2hNZWRpYShOYW1lc3BhY2UuY3NzLmlzRGFya1ByZWZlcnJlZFF1ZXJ5KVxuICAgICAgICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLl91cGRhdGVUaGVtZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvd1xuICAgICAgICAgICAgICAgIC5tYXRjaE1lZGlhKE5hbWVzcGFjZS5jc3MuaXNEYXJrUHJlZmVycmVkUXVlcnkpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuX3VwZGF0ZVRoZW1lKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRUaGVtZUNsYXNzKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50VGhlbWUgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudGhlbWUgfHwgJ2F1dG8nO1xuICAgICAgICBjb25zdCBpc0RhcmtNb2RlID0gd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICAgICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKE5hbWVzcGFjZS5jc3MuaXNEYXJrUHJlZmVycmVkUXVlcnkpLm1hdGNoZXM7XG4gICAgICAgIHN3aXRjaCAoY3VycmVudFRoZW1lKSB7XG4gICAgICAgICAgICBjYXNlICdsaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hbWVzcGFjZS5jc3MubGlnaHRUaGVtZTtcbiAgICAgICAgICAgIGNhc2UgJ2RhcmsnOlxuICAgICAgICAgICAgICAgIHJldHVybiBOYW1lc3BhY2UuY3NzLmRhcmtUaGVtZTtcbiAgICAgICAgICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgICAgICAgICAgIHJldHVybiBpc0RhcmtNb2RlID8gTmFtZXNwYWNlLmNzcy5kYXJrVGhlbWUgOiBOYW1lc3BhY2UuY3NzLmxpZ2h0VGhlbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3VwZGF0ZUNhbGVuZGFySGVhZGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2hhc0RhdGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHNob3dpbmcgPSBbXG4gICAgICAgICAgICAuLi50aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKGAuJHtOYW1lc3BhY2UuY3NzLmRhdGVDb250YWluZXJ9IGRpdltzdHlsZSo9XCJkaXNwbGF5OiBncmlkXCJdYCkuY2xhc3NMaXN0LFxuICAgICAgICBdLmZpbmQoKHgpID0+IHguc3RhcnRzV2l0aChOYW1lc3BhY2UuY3NzLmRhdGVDb250YWluZXIpKTtcbiAgICAgICAgY29uc3QgW3ByZXZpb3VzLCBzd2l0Y2hlciwgbmV4dF0gPSB0aGlzLndpZGdldFxuICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5jYWxlbmRhckhlYWRlcilbMF1cbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2Jyk7XG4gICAgICAgIHN3aXRjaCAoc2hvd2luZykge1xuICAgICAgICAgICAgY2FzZSBOYW1lc3BhY2UuY3NzLmRlY2FkZXNDb250YWluZXI6XG4gICAgICAgICAgICAgICAgcHJldmlvdXMuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnByZXZpb3VzQ2VudHVyeSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsICcnKTtcbiAgICAgICAgICAgICAgICBuZXh0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5uZXh0Q2VudHVyeSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5hbWVzcGFjZS5jc3MueWVhcnNDb250YWluZXI6XG4gICAgICAgICAgICAgICAgcHJldmlvdXMuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnByZXZpb3VzRGVjYWRlKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0RGVjYWRlKTtcbiAgICAgICAgICAgICAgICBuZXh0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5uZXh0RGVjYWRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy5tb250aHNDb250YWluZXI6XG4gICAgICAgICAgICAgICAgcHJldmlvdXMuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnByZXZpb3VzWWVhcik7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdFllYXIpO1xuICAgICAgICAgICAgICAgIG5leHQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLm5leHRZZWFyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTmFtZXNwYWNlLmNzcy5kYXlzQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHByZXZpb3VzLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5wcmV2aW91c01vbnRoKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5sb2NhbGl6YXRpb24uc2VsZWN0TW9udGgpO1xuICAgICAgICAgICAgICAgIG5leHQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLm5leHRNb250aCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc2V0QXR0cmlidXRlKHNob3dpbmcsIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmZvcm1hdCh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5kYXlWaWV3SGVhZGVyRm9ybWF0KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoZXIuaW5uZXJUZXh0ID0gc3dpdGNoZXIuZ2V0QXR0cmlidXRlKHNob3dpbmcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgcGlja2VyIGlmIG5lZWRlZC5cbiAgICAgKiBSZW1vdmUgZG9jdW1lbnQgY2xpY2sgZXZlbnQgdG8gaGlkZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgdGhlIHBpY2tlci5cbiAgICAgKiBmaXJlcyBFdmVudHMjaGlkZVxuICAgICAqL1xuICAgIGhpZGUoKSB7XG4gICAgICAgIGlmICghdGhpcy53aWRnZXQgfHwgIXRoaXMuX2lzVmlzaWJsZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy53aWRnZXQuY2xhc3NMaXN0LnJlbW92ZShOYW1lc3BhY2UuY3NzLnNob3cpO1xuICAgICAgICBpZiAodGhpcy5faXNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5lbWl0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBOYW1lc3BhY2UuZXZlbnRzLmhpZGUsXG4gICAgICAgICAgICAgICAgZGF0ZTogdGhpcy5vcHRpb25zU3RvcmUudW5zZXQgPyBudWxsIDogdGhpcy5kYXRlcy5sYXN0UGlja2VkPy5jbG9uZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9kb2N1bWVudENsaWNrRXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBwaWNrZXIncyBvcGVuIHN0YXRlLiBGaXJlcyBhIHNob3cvaGlkZSBldmVudCBkZXBlbmRpbmcuXG4gICAgICovXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBkb2N1bWVudCBhbmQgZGF0YS1hY3Rpb24gY2xpY2sgbGlzdGVuZXIgYW5kIHJlc2V0IHRoZSB3aWRnZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kaXNwb3NlKCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2RvY3VtZW50Q2xpY2tFdmVudCk7XG4gICAgICAgIGlmICghdGhpcy53aWRnZXQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMud2lkZ2V0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWN0aW9uXScpXG4gICAgICAgICAgICAuZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2FjdGlvbnNDbGlja0V2ZW50KSk7XG4gICAgICAgIHRoaXMud2lkZ2V0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy53aWRnZXQpO1xuICAgICAgICB0aGlzLl93aWRnZXQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyB0aGUgd2lkZ2V0cyBodG1sIHRlbXBsYXRlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2J1aWxkV2lkZ2V0KCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0ZW1wbGF0ZS5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3Mud2lkZ2V0KTtcbiAgICAgICAgY29uc3QgZGF0ZVZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGF0ZVZpZXcuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLmRhdGVDb250YWluZXIpO1xuICAgICAgICBkYXRlVmlldy5hcHBlbmQodGhpcy5nZXRIZWFkVGVtcGxhdGUoKSwgdGhpcy5kZWNhZGVEaXNwbGF5LmdldFBpY2tlcigpLCB0aGlzLnllYXJEaXNwbGF5LmdldFBpY2tlcigpLCB0aGlzLm1vbnRoRGlzcGxheS5nZXRQaWNrZXIoKSwgdGhpcy5kYXRlRGlzcGxheS5nZXRQaWNrZXIoKSk7XG4gICAgICAgIGNvbnN0IHRpbWVWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRpbWVWaWV3LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyKTtcbiAgICAgICAgdGltZVZpZXcuYXBwZW5kQ2hpbGQodGhpcy50aW1lRGlzcGxheS5nZXRQaWNrZXIodGhpcy5faWNvblRhZy5iaW5kKHRoaXMpKSk7XG4gICAgICAgIHRpbWVWaWV3LmFwcGVuZENoaWxkKHRoaXMuaG91ckRpc3BsYXkuZ2V0UGlja2VyKCkpO1xuICAgICAgICB0aW1lVmlldy5hcHBlbmRDaGlsZCh0aGlzLm1pbnV0ZURpc3BsYXkuZ2V0UGlja2VyKCkpO1xuICAgICAgICB0aW1lVmlldy5hcHBlbmRDaGlsZCh0aGlzLnNlY29uZERpc3BsYXkuZ2V0UGlja2VyKCkpO1xuICAgICAgICBjb25zdCB0b29sYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvb2xiYXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnRvb2xiYXIpO1xuICAgICAgICB0b29sYmFyLmFwcGVuZCguLi50aGlzLmdldFRvb2xiYXJFbGVtZW50cygpKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5pbmxpbmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZCgnY2FsZW5kYXJXZWVrcycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuc2lkZUJ5U2lkZSAmJiB0aGlzLl9oYXNEYXRlQW5kVGltZSkge1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRXaWRnZXRTaWRlQnlTaWRlKHRlbXBsYXRlLCBkYXRlVmlldywgdGltZVZpZXcsIHRvb2xiYXIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudG9vbGJhclBsYWNlbWVudCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKHRvb2xiYXIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldHVwQ29tcG9uZW50VmlldyA9IChoYXNGaXJzdCwgaGFzU2Vjb25kLCBlbGVtZW50LCBzaG91bGRTaG93KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWhhc0ZpcnN0KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChoYXNTZWNvbmQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jb2xsYXBzZSk7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZFNob3cpXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnNob3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH07XG4gICAgICAgIHNldHVwQ29tcG9uZW50Vmlldyh0aGlzLl9oYXNEYXRlLCB0aGlzLl9oYXNUaW1lLCBkYXRlVmlldywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnZpZXdNb2RlICE9PSAnY2xvY2snKTtcbiAgICAgICAgc2V0dXBDb21wb25lbnRWaWV3KHRoaXMuX2hhc1RpbWUsIHRoaXMuX2hhc0RhdGUsIHRpbWVWaWV3LCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudmlld01vZGUgPT09ICdjbG9jaycpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRvb2xiYXJQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZCh0b29sYmFyKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKCdhcnJvdycpO1xuICAgICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wcGVyLWFycm93JywgJycpO1xuICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZChhcnJvdyk7XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHRlbXBsYXRlO1xuICAgIH1cbiAgICBfYnVpbGRXaWRnZXRTaWRlQnlTaWRlKHRlbXBsYXRlLCBkYXRlVmlldywgdGltZVZpZXcsIHRvb2xiYXIpIHtcbiAgICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnNpZGVCeVNpZGUpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnRvb2xiYXJQbGFjZW1lbnQgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZCh0b29sYmFyKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3RkLXJvdycpO1xuICAgICAgICBkYXRlVmlldy5jbGFzc0xpc3QuYWRkKCd0ZC1oYWxmJyk7XG4gICAgICAgIHRpbWVWaWV3LmNsYXNzTGlzdC5hZGQoJ3RkLWhhbGYnKTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGRhdGVWaWV3KTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKHRpbWVWaWV3KTtcbiAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS50b29sYmFyUGxhY2VtZW50ID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQodG9vbGJhcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd2lkZ2V0ID0gdGVtcGxhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaG91cnMsIG1pbnV0ZXMsIG9yIHNlY29uZHMgY29tcG9uZW50IGlzIHR1cm5lZCBvblxuICAgICAqL1xuICAgIGdldCBfaGFzVGltZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuY29tcG9uZW50cy5jbG9jayAmJlxuICAgICAgICAgICAgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmhvdXJzIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMubWludXRlcyB8fFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLnNlY29uZHMpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB5ZWFyLCBtb250aCwgb3IgZGF0ZSBjb21wb25lbnQgaXMgdHVybmVkIG9uXG4gICAgICovXG4gICAgZ2V0IF9oYXNEYXRlKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLmNhbGVuZGFyICYmXG4gICAgICAgICAgICAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMueWVhciB8fFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLm1vbnRoIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmNvbXBvbmVudHMuZGF0ZSkpO1xuICAgIH1cbiAgICBnZXQgX2hhc0RhdGVBbmRUaW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFzRGF0ZSAmJiB0aGlzLl9oYXNUaW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRvb2xiYXIgaHRtbCBiYXNlZCBvbiBvcHRpb25zIGxpa2UgYnV0dG9ucyA9PiB0b2RheVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0VG9vbGJhckVsZW1lbnRzKCkge1xuICAgICAgICBjb25zdCB0b29sYmFyID0gW107XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuYnV0dG9ucy50b2RheSkge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEudG9kYXkpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi50b2RheSk7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5faWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMudG9kYXkpKTtcbiAgICAgICAgICAgIHRvb2xiYXIucHVzaChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnNpZGVCeVNpZGUgJiZcbiAgICAgICAgICAgIHRoaXMuX2hhc0RhdGUgJiZcbiAgICAgICAgICAgIHRoaXMuX2hhc1RpbWUpIHtcbiAgICAgICAgICAgIGxldCB0aXRsZSwgaWNvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkudmlld01vZGUgPT09ICdjbG9jaycpIHtcbiAgICAgICAgICAgICAgICB0aXRsZSA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdERhdGU7XG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy5kYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGl0bGUgPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3RUaW1lO1xuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMudGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnRvZ2dsZVBpY2tlcik7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRpdGxlKTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aGlzLl9pY29uVGFnKGljb24pKTtcbiAgICAgICAgICAgIHRvb2xiYXIucHVzaChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuYnV0dG9ucy5jbGVhcikge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuY2xlYXIpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5jbGVhcik7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5faWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMuY2xlYXIpKTtcbiAgICAgICAgICAgIHRvb2xiYXIucHVzaChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuYnV0dG9ucy5jbG9zZSkge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEuY2xvc2UpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5jbG9zZSk7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5faWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMuY2xvc2UpKTtcbiAgICAgICAgICAgIHRvb2xiYXIucHVzaChkaXYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b29sYmFyO1xuICAgIH1cbiAgICAvKioqXG4gICAgICogQnVpbGRzIHRoZSBiYXNlIGhlYWRlciB0ZW1wbGF0ZSB3aXRoIG5leHQgYW5kIHByZXZpb3VzIGljb25zXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRIZWFkVGVtcGxhdGUoKSB7XG4gICAgICAgIGNvbnN0IGNhbGVuZGFySGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNhbGVuZGFySGVhZGVyLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5jYWxlbmRhckhlYWRlcik7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByZXZpb3VzLmNsYXNzTGlzdC5hZGQoTmFtZXNwYWNlLmNzcy5wcmV2aW91cyk7XG4gICAgICAgIHByZXZpb3VzLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLnByZXZpb3VzKTtcbiAgICAgICAgcHJldmlvdXMuYXBwZW5kQ2hpbGQodGhpcy5faWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMucHJldmlvdXMpKTtcbiAgICAgICAgY29uc3Qgc3dpdGNoZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3dpdGNoZXIuY2xhc3NMaXN0LmFkZChOYW1lc3BhY2UuY3NzLnN3aXRjaCk7XG4gICAgICAgIHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nLCBBY3Rpb25UeXBlcyQxLmNoYW5nZUNhbGVuZGFyVmlldyk7XG4gICAgICAgIGNvbnN0IG5leHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV4dC5jbGFzc0xpc3QuYWRkKE5hbWVzcGFjZS5jc3MubmV4dCk7XG4gICAgICAgIG5leHQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicsIEFjdGlvblR5cGVzJDEubmV4dCk7XG4gICAgICAgIG5leHQuYXBwZW5kQ2hpbGQodGhpcy5faWNvblRhZyh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMubmV4dCkpO1xuICAgICAgICBjYWxlbmRhckhlYWRlci5hcHBlbmQocHJldmlvdXMsIHN3aXRjaGVyLCBuZXh0KTtcbiAgICAgICAgcmV0dXJuIGNhbGVuZGFySGVhZGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgYW4gaWNvbiB0YWcgYXMgZWl0aGVyIGFuIGA8aT5gXG4gICAgICogb3Igd2l0aCBpY29ucyA9PiB0eXBlIGlzIGBzcHJpdGVzYCB0aGVuIGEgc3ZnIHRhZyBpbnN0ZWFkXG4gICAgICogQHBhcmFtIGljb25DbGFzc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2ljb25UYWcoaWNvbkNsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaWNvbnMudHlwZSA9PT0gJ3Nwcml0ZXMnKSB7XG4gICAgICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xuICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAndXNlJyk7XG4gICAgICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgneGxpbms6aHJlZicsIGljb25DbGFzcyk7IC8vIERlcHJlY2F0ZWQuIEluY2x1ZGVkIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgnaHJlZicsIGljb25DbGFzcyk7XG4gICAgICAgICAgICBzdmcuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgICAgICByZXR1cm4gc3ZnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCguLi5pY29uQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICAgIHJldHVybiBpY29uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYXVzZXMgdGhlIHdpZGdldCB0byBnZXQgcmVidWlsdCBvbiBuZXh0IHNob3cuIElmIHRoZSBwaWNrZXIgaXMgYWxyZWFkeSBvcGVuXG4gICAgICogdGhlbiBoaWRlIGFuZCByZXNob3cgaXQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVidWlsZCgpIHtcbiAgICAgICAgY29uc3Qgd2FzVmlzaWJsZSA9IHRoaXMuX2lzVmlzaWJsZTtcbiAgICAgICAgdGhpcy5fZGlzcG9zZSgpO1xuICAgICAgICBpZiAod2FzVmlzaWJsZSlcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgICByZWZyZXNoQ3VycmVudFZpZXcoKSB7XG4gICAgICAgIC8vaWYgdGhlIHdpZGdldCBpcyBub3Qgc2hvd2luZywganVzdCBkZXN0cm95IGl0XG4gICAgICAgIGlmICghdGhpcy5faXNWaXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5fZGlzcG9zZSgpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3KSB7XG4gICAgICAgICAgICBjYXNlICdjbG9jayc6XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKCdjbG9jaycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2FsZW5kYXInOlxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZShVbml0LmRhdGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoVW5pdC5tb250aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlKFVuaXQueWVhcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkZWNhZGVzJzpcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUoJ2RlY2FkZScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIExvZ2ljIGZvciB2YXJpb3VzIGNsaWNrIGFjdGlvbnNcbiAqL1xuY2xhc3MgQWN0aW9ucyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlID0gc2VydmljZUxvY2F0b3IubG9jYXRlKE9wdGlvbnNTdG9yZSk7XG4gICAgICAgIHRoaXMuZGF0ZXMgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoRGF0ZXMpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoVmFsaWRhdGlvbik7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShEaXNwbGF5KTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShFdmVudEVtaXR0ZXJzKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy5hY3Rpb24uc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG8ocmVzdWx0LmUsIHJlc3VsdC5hY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIHNlbGVjdGVkIGBhY3Rpb25gLiBTZWUgQWN0aW9uVHlwZXNcbiAgICAgKiBAcGFyYW0gZSBUaGlzIGlzIG5vcm1hbGx5IGEgY2xpY2sgZXZlbnRcbiAgICAgKiBAcGFyYW0gYWN0aW9uIElmIG5vdCBwcm92aWRlZCwgdGhlbiBsb29rIGZvciBhIFtkYXRhLWFjdGlvbl1cbiAgICAgKi9cbiAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZG8oZSwgYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBlPy5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBpZiAoY3VycmVudFRhcmdldD8uY2xhc3NMaXN0Py5jb250YWlucyhOYW1lc3BhY2UuY3NzLmRpc2FibGVkKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYWN0aW9uID0gYWN0aW9uIHx8IGN1cnJlbnRUYXJnZXQ/LmRhdGFzZXQ/LmFjdGlvbjtcbiAgICAgICAgY29uc3QgbGFzdFBpY2tlZCA9ICh0aGlzLmRhdGVzLmxhc3RQaWNrZWQgfHwgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUpXG4gICAgICAgICAgICAuY2xvbmU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEubmV4dDpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5wcmV2aW91czpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU5leHRQcmV2aW91cyhhY3Rpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmNoYW5nZUNhbGVuZGFyVmlldzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3Nob3dNb2RlKDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlQ2FsZW5kYXJIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3RNb250aDpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3RZZWFyOlxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdERlY2FkZTpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdENhbGVuZGFyTW9kZShhY3Rpb24sIGN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdERheTpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdERheShjdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3RIb3VyOiB7XG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgPSArY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0UGlja2VkLmhvdXJzID49IDEyICYmIHRoaXMub3B0aW9uc1N0b3JlLmlzVHdlbHZlSG91cilcbiAgICAgICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgICAgICBsYXN0UGlja2VkLmhvdXJzID0gaG91cjtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGxhc3RQaWNrZWQsIHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVPckNsb2NrKGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdE1pbnV0ZToge1xuICAgICAgICAgICAgICAgIGxhc3RQaWNrZWQubWludXRlcyA9ICtjdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShsYXN0UGlja2VkLCB0aGlzLmRhdGVzLmxhc3RQaWNrZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlT3JDbG9jayhlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3RTZWNvbmQ6IHtcbiAgICAgICAgICAgICAgICBsYXN0UGlja2VkLnNlY29uZHMgPSArY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUobGFzdFBpY2tlZCwgdGhpcy5kYXRlcy5sYXN0UGlja2VkSW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU9yQ2xvY2soZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuaW5jcmVtZW50SG91cnM6XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQuaG91cnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmluY3JlbWVudE1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQubWludXRlcywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuaW5jcmVtZW50U2Vjb25kczpcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGVBbmRTZXQobGFzdFBpY2tlZCwgVW5pdC5zZWNvbmRzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRIb3VyczpcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGVBbmRTZXQobGFzdFBpY2tlZCwgVW5pdC5ob3VycywgLTEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmRlY3JlbWVudE1pbnV0ZXM6XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pcHVsYXRlQW5kU2V0KGxhc3RQaWNrZWQsIFVuaXQubWludXRlcywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5zdGVwcGluZyAqIC0xKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5kZWNyZW1lbnRTZWNvbmRzOlxuICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGF0ZUFuZFNldChsYXN0UGlja2VkLCBVbml0LnNlY29uZHMsIC0xKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS50b2dnbGVNZXJpZGllbTpcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlwdWxhdGVBbmRTZXQobGFzdFBpY2tlZCwgVW5pdC5ob3VycywgdGhpcy5kYXRlcy5sYXN0UGlja2VkLmhvdXJzID49IDEyID8gLTEyIDogMTIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnRvZ2dsZVBpY2tlcjpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVRvZ2dsZShjdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93Q2xvY2s6XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd0hvdXJzOlxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dNaW51dGVzOlxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNob3dTZWNvbmRzOlxuICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIHRoZSBjbG9jayBpcyBhY3R1YWxseSBkaXNwbGF5aW5nXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuc2lkZUJ5U2lkZSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyAhPT0gJ2Nsb2NrJykge1xuICAgICAgICAgICAgICAgICAgICAvL2hpZGUgY2FsZW5kYXJcbiAgICAgICAgICAgICAgICAgICAgQ29sbGFwc2UuaGlkZUltbWVkaWF0ZWx5KHRoaXMuZGlzcGxheS5kYXRlQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgLy9zaG93IGNsb2NrXG4gICAgICAgICAgICAgICAgICAgIENvbGxhcHNlLnNob3dJbW1lZGlhdGVseSh0aGlzLmRpc3BsYXkudGltZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2hvd0Nsb2NrQ29udGFpbmVycyhhY3Rpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmNsZWFyOlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGVDYWxlbmRhckhlYWRlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLmNsb3NlOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEudG9kYXk6IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlVGltZSgpLnNldExvY2FsaXphdGlvbih0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy51cGRhdGVWaWV3RGF0ZS5lbWl0KHRvZGF5KTtcbiAgICAgICAgICAgICAgICAvL3RvZG8gdGhpcyB0aGlzIHJlYWxseSBhIGdvb2QgaWRlYT9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0aW9uLmlzVmFsaWQodG9kYXksIFVuaXQuZGF0ZSkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUodG9kYXksIHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVTaG93Q2xvY2tDb250YWluZXJzKGFjdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMuZGlzcGxheS5faGFzVGltZSkge1xuICAgICAgICAgICAgTmFtZXNwYWNlLmVycm9yTWVzc2FnZXMudGhyb3dFcnJvcignQ2Fubm90IHNob3cgY2xvY2sgY29udGFpbmVycyB3aGVuIHRpbWUgaXMgZGlzYWJsZWQuJyk7XG4gICAgICAgICAgICAvKiBpZ25vcmUgY292ZXJhZ2U6IHNob3VsZCBuZXZlciBoYXBwZW4gKi9cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldyA9ICdjbG9jayc7XG4gICAgICAgIHRoaXMuZGlzcGxheS53aWRnZXRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtOYW1lc3BhY2UuY3NzLnRpbWVDb250YWluZXJ9ID4gZGl2YClcbiAgICAgICAgICAgIC5mb3JFYWNoKChodG1sRWxlbWVudCkgPT4gKGh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpKTtcbiAgICAgICAgbGV0IGNsYXNzVG9Vc2UgPSAnJztcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zaG93Q2xvY2s6XG4gICAgICAgICAgICAgICAgY2xhc3NUb1VzZSA9IE5hbWVzcGFjZS5jc3MuY2xvY2tDb250YWluZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGUoJ2Nsb2NrJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd0hvdXJzOlxuICAgICAgICAgICAgICAgIGNsYXNzVG9Vc2UgPSBOYW1lc3BhY2UuY3NzLmhvdXJDb250YWluZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5Ll91cGRhdGUoVW5pdC5ob3Vycyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd01pbnV0ZXM6XG4gICAgICAgICAgICAgICAgY2xhc3NUb1VzZSA9IE5hbWVzcGFjZS5jc3MubWludXRlQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlKFVuaXQubWludXRlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2hvd1NlY29uZHM6XG4gICAgICAgICAgICAgICAgY2xhc3NUb1VzZSA9IE5hbWVzcGFjZS5jc3Muc2Vjb25kQ29udGFpbmVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlKFVuaXQuc2Vjb25kcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgKHRoaXMuZGlzcGxheS53aWRnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc1RvVXNlKVswXSkuc3R5bGUuZGlzcGxheSA9ICdncmlkJztcbiAgICB9XG4gICAgaGFuZGxlTmV4dFByZXZpb3VzKGFjdGlvbikge1xuICAgICAgICBjb25zdCB7IHVuaXQsIHN0ZXAgfSA9IENhbGVuZGFyTW9kZXNbdGhpcy5vcHRpb25zU3RvcmUuY3VycmVudENhbGVuZGFyVmlld01vZGVdO1xuICAgICAgICBpZiAoYWN0aW9uID09PSBBY3Rpb25UeXBlcyQxLm5leHQpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5tYW5pcHVsYXRlKHN0ZXAsIHVuaXQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZS5tYW5pcHVsYXRlKHN0ZXAgKiAtMSwgdW5pdCk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudmlld1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgIHRoaXMuZGlzcGxheS5fc2hvd01vZGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWZ0ZXIgc2V0dGluZyB0aGUgdmFsdWUgaXQgd2lsbCBlaXRoZXIgc2hvdyB0aGUgY2xvY2sgb3IgaGlkZSB0aGUgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSBlXG4gICAgICovXG4gICAgaGlkZU9yQ2xvY2soZSkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1N0b3JlLmlzVHdlbHZlSG91ciAmJlxuICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5jb21wb25lbnRzLm1pbnV0ZXMgJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkua2VlcE9wZW4gJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRpc3BsYXkuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kbyhlLCBBY3Rpb25UeXBlcyQxLnNob3dDbG9jayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tbW9uIGZ1bmN0aW9uIHRvIG1hbmlwdWxhdGUge0BsaW5rIGxhc3RQaWNrZWR9IGJ5IGB1bml0YC5cbiAgICAgKiBAcGFyYW0gbGFzdFBpY2tlZFxuICAgICAqIEBwYXJhbSB1bml0XG4gICAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGNoYW5nZSBieVxuICAgICAqL1xuICAgIG1hbmlwdWxhdGVBbmRTZXQobGFzdFBpY2tlZCwgdW5pdCwgdmFsdWUgPSAxKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGUgPSBsYXN0UGlja2VkLm1hbmlwdWxhdGUodmFsdWUsIHVuaXQpO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0aW9uLmlzVmFsaWQobmV3RGF0ZSwgdW5pdCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUobmV3RGF0ZSwgdGhpcy5kYXRlcy5sYXN0UGlja2VkSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVNlbGVjdENhbGVuZGFyTW9kZShhY3Rpb24sIGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSArY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlcyQxLnNlbGVjdE1vbnRoOlxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLm1vbnRoID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGVzJDEuc2VsZWN0WWVhcjpcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZXMkMS5zZWxlY3REZWNhZGU6XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUueWVhciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUodGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUsIHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4KTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlID09PVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUubWluaW11bUNhbGVuZGFyVmlld01vZGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3Nob3dNb2RlKC0xKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVUb2dnbGUoY3VycmVudFRhcmdldCkge1xuICAgICAgICBpZiAoY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgPT09XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3REYXRlKSB7XG4gICAgICAgICAgICBjdXJyZW50VGFyZ2V0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbi5zZWxlY3RUaW1lKTtcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuaW5uZXJIVE1MID0gdGhpcy5kaXNwbGF5Ll9pY29uVGFnKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pY29ucy50aW1lKS5vdXRlckhUTUw7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZUNhbGVuZGFySGVhZGVyKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5yZWZyZXNoQ3VycmVudFZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubG9jYWxpemF0aW9uLnNlbGVjdERhdGUpO1xuICAgICAgICAgICAgY3VycmVudFRhcmdldC5pbm5lckhUTUwgPSB0aGlzLmRpc3BsYXkuX2ljb25UYWcodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5Lmljb25zLmRhdGUpLm91dGVySFRNTDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXkuX2hhc1RpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNob3dDbG9ja0NvbnRhaW5lcnMoQWN0aW9uVHlwZXMkMS5zaG93Q2xvY2spO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlKCdjbG9jaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlzcGxheS53aWRnZXRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtOYW1lc3BhY2UuY3NzLmRhdGVDb250YWluZXJ9LCAuJHtOYW1lc3BhY2UuY3NzLnRpbWVDb250YWluZXJ9YClcbiAgICAgICAgICAgIC5mb3JFYWNoKChodG1sRWxlbWVudCkgPT4gQ29sbGFwc2UudG9nZ2xlKGh0bWxFbGVtZW50KSk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudmlld1VwZGF0ZS5lbWl0KCk7XG4gICAgfVxuICAgIGhhbmRsZVNlbGVjdERheShjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGRheSA9IHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLmNsb25lO1xuICAgICAgICBpZiAoY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy5vbGQpKSB7XG4gICAgICAgICAgICBkYXkubWFuaXB1bGF0ZSgtMSwgVW5pdC5tb250aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5hbWVzcGFjZS5jc3MubmV3KSkge1xuICAgICAgICAgICAgZGF5Lm1hbmlwdWxhdGUoMSwgVW5pdC5tb250aCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF5LmRhdGUgPSArY3VycmVudFRhcmdldC5kYXRhc2V0LmRheTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGF0ZVJhbmdlKVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVEYXRlUmFuZ2UoZGF5KTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU11bHRpRGF0ZShkYXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXksIHRoaXMuZGF0ZXMubGFzdFBpY2tlZEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZGlzcGxheS5faGFzVGltZSAmJlxuICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5rZWVwT3BlbiAmJlxuICAgICAgICAgICAgIXRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUgJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLm11bHRpcGxlRGF0ZXMgJiZcbiAgICAgICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRhdGVSYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVNdWx0aURhdGUoZGF5KSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZGF0ZXMucGlja2VkSW5kZXgoZGF5LCBVbml0LmRhdGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbmRleCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUobnVsbCwgaW5kZXgpOyAvL2Rlc2VsZWN0IG11bHRpLWRhdGVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5kYXRlcy5sYXN0UGlja2VkSW5kZXggKyAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZXMucGlja2VkLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGRheSwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZURhdGVSYW5nZShkYXkpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRhdGVzLnBpY2tlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMjoge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgMToge1xuICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyID0gdGhpcy5kYXRlcy5waWNrZWRbMF07XG4gICAgICAgICAgICAgICAgaWYgKGRheS5nZXRUaW1lKCkgPT09IG90aGVyLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF5LmlzQmVmb3JlKG90aGVyKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGRheSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXMuc2V0VmFsdWUob3RoZXIsIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldFZhbHVlKGRheSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRlcy5zZXRWYWx1ZShkYXksIDApO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIHJvYnVzdCBhbmQgcG93ZXJmdWwgZGF0ZS90aW1lIHBpY2tlciBjb21wb25lbnQuXG4gKi9cbmNsYXNzIFRlbXB1c0RvbWludXMge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHRoaXMuX3N1YnNjcmliZXJzID0ge307XG4gICAgICAgIHRoaXMuX2lzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV2ZW50IGZvciB3aGVuIHRoZSBpbnB1dCBmaWVsZCBjaGFuZ2VzLiBUaGlzIGlzIGEgY2xhc3MgbGV2ZWwgbWV0aG9kIHNvIHRoZXJlJ3NcbiAgICAgICAgICogc29tZXRoaW5nIGZvciB0aGUgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB0aGlzLl9pbnB1dENoYW5nZUV2ZW50ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnRlcm5hbGx5VHJpZ2dlcmVkID0gZXZlbnQ/LmRldGFpbDtcbiAgICAgICAgICAgIGlmIChpbnRlcm5hbGx5VHJpZ2dlcmVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdEYXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGVzLmxhc3RQaWNrZWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlID0gdGhpcy5kYXRlcy5sYXN0UGlja2VkLmNsb25lO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5tdWx0aXBsZURhdGVzKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGxpdCA9IHZhbHVlLnNwbGl0KHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlc1NlcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVTcGxpdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlcy5zZXRGcm9tSW5wdXQodmFsdWVTcGxpdFtpXSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2V0Vmlld0RhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1REOiBTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gc2V0IHRoZSBtdWx0aXBsZURhdGVzIHZhbHVlcyBmcm9tIHRoZSBpbnB1dCBmaWVsZC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzLnNldEZyb21JbnB1dCh2YWx1ZSwgMCk7XG4gICAgICAgICAgICAgICAgc2V0Vmlld0RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV2ZW50IGZvciB3aGVuIHRoZSB0b2dnbGUgaXMgY2xpY2tlZC4gVGhpcyBpcyBhIGNsYXNzIGxldmVsIG1ldGhvZCBzbyB0aGVyZSdzXG4gICAgICAgICAqIHNvbWV0aGluZyBmb3IgdGhlIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3RvZ2dsZUNsaWNrRXZlbnQgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudD8uZGlzYWJsZWQgfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8uZGlzYWJsZWQgfHxcbiAgICAgICAgICAgICAgICAvL2lmIHdlIGp1c3QgaGF2ZSB0aGUgaW5wdXQgYW5kIGFsbG93IGlucHV0IHRvZ2dsZSBpcyBlbmFibGVkLCB0aGVuIGRvbid0IGNhdXNlIGEgdG9nZ2xlXG4gICAgICAgICAgICAgICAgKHRoaXMuX3RvZ2dsZS5ub2RlTmFtZSA9PT0gJ0lOUFVUJyAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b2dnbGU/LnR5cGUgPT09ICd0ZXh0JyAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmFsbG93SW5wdXRUb2dnbGUpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFdmVudCBmb3Igd2hlbiB0aGUgdG9nZ2xlIGlzIGNsaWNrZWQuIFRoaXMgaXMgYSBjbGFzcyBsZXZlbCBtZXRob2Qgc28gdGhlcmUnc1xuICAgICAgICAgKiBzb21ldGhpbmcgZm9yIHRoZSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vcGVuQ2xpY2tFdmVudCA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50Py5kaXNhYmxlZCB8fFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5kaXNhYmxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGlzcGxheS5pc1Zpc2libGUpXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNldHVwU2VydmljZUxvY2F0b3IoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycyA9IHNlcnZpY2VMb2NhdG9yLmxvY2F0ZShFdmVudEVtaXR0ZXJzKTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUgPSBzZXJ2aWNlTG9jYXRvci5sb2NhdGUoT3B0aW9uc1N0b3JlKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERpc3BsYXkpO1xuICAgICAgICB0aGlzLmRhdGVzID0gc2VydmljZUxvY2F0b3IubG9jYXRlKERhdGVzKTtcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gc2VydmljZUxvY2F0b3IubG9jYXRlKEFjdGlvbnMpO1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLm11c3RQcm92aWRlRWxlbWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplT3B0aW9ucyhvcHRpb25zLCBEZWZhdWx0T3B0aW9ucywgdHJ1ZSk7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLnNldExvY2FsaXphdGlvbih0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbik7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnVuc2V0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZUlucHV0KCk7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVUb2dnbGUoKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUpXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLnRyaWdnZXJFdmVudC5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFdmVudChlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMudmlld1VwZGF0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdmlld1VwZGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVycy51cGRhdGVWaWV3RGF0ZS5zdWJzY3JpYmUoKGRhdGVUaW1lKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlID0gZGF0ZVRpbWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgdmlld0RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNTdG9yZS52aWV3RGF0ZTtcbiAgICB9XG4gICAgc2V0IHZpZXdEYXRlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLnNldExvY2FsaXphdGlvbih0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5fdXBkYXRlKHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRWaWV3ID09PSAnY2xvY2snID8gJ2Nsb2NrJyA6ICdjYWxlbmRhcicpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwaWNrZXIgb3B0aW9ucy4gSWYgYHJlc2V0YCBpcyBwcm92aWRlIGBvcHRpb25zYCB3aWxsIGJlIG1lcmdlZCB3aXRoIERlZmF1bHRPcHRpb25zIGluc3RlYWQuXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gcmVzZXRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdXBkYXRlT3B0aW9ucyhvcHRpb25zLCByZXNldCA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChyZXNldClcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVPcHRpb25zKG9wdGlvbnMsIERlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZU9wdGlvbnMob3B0aW9ucywgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucyk7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlLnNldExvY2FsaXphdGlvbih0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmxvY2FsaXphdGlvbik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5yZWZyZXNoQ3VycmVudFZpZXcoKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIHBpY2tlciBvcGVuIG9yIGNsb3NlZC4gSWYgdGhlIHBpY2tlciBpcyBkaXNhYmxlZCwgbm90aGluZyB3aWxsIGhhcHBlbi5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy5faXNEaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnRvZ2dsZSgpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIHBpY2tlciB1bmxlc3MgdGhlIHBpY2tlciBpcyBkaXNhYmxlZC5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuZGlzcGxheS5zaG93KCk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgcGlja2VyIHVubGVzcyB0aGUgcGlja2VyIGlzIGRpc2FibGVkLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmRpc3BsYXkuaGlkZSgpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgdGhlIHBpY2tlciBhbmQgdGhlIHRhcmdldCBpbnB1dCBmaWVsZC5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5faXNEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIC8vIHRvZG8gdGhpcyBtaWdodCBiZSB1bmRlc2lyZWQuIElmIGEgZGV2IGRpc2FibGVzIHRoZSBpbnB1dCBmaWVsZCB0b1xuICAgICAgICAvLyBvbmx5IGFsbG93IHVzaW5nIHRoZSBwaWNrZXIsIHRoaXMgd2lsbCBicmVhayB0aGF0LlxuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuaGlkZSgpO1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyB0aGUgcGlja2VyIGFuZCB0aGUgdGFyZ2V0IGlucHV0IGZpZWxkLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuX2lzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuICAgIC8qKlxuICAgICAqIENsZWFycyBhbGwgdGhlIHNlbGVjdGVkIGRhdGVzXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLmRhdGVzLmNsZWFyKCk7XG4gICAgfVxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBBbGxvd3MgZm9yIGEgZGlyZWN0IHN1YnNjcmlwdGlvbiB0byBwaWNrZXIgZXZlbnRzLCB3aXRob3V0IGhhdmluZyB0byB1c2UgYWRkRXZlbnRMaXN0ZW5lciBvbiB0aGUgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlcyBTZWUgTmFtZXNwYWNlLkV2ZW50c1xuICAgICAqIEBwYXJhbSBjYWxsYmFja3MgRnVuY3Rpb24gdG8gY2FsbCB3aGVuIGV2ZW50IGlzIHRyaWdnZXJlZFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzdWJzY3JpYmUoZXZlbnRUeXBlcywgY2FsbGJhY2tzIC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnRUeXBlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGV2ZW50VHlwZXMgPSBbZXZlbnRUeXBlc107XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNhbGxCYWNrQXJyYXk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjYWxsYmFja3MpKSB7XG4gICAgICAgICAgICBjYWxsQmFja0FycmF5ID0gW2NhbGxiYWNrc107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsQmFja0FycmF5ID0gY2FsbGJhY2tzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudFR5cGVzLmxlbmd0aCAhPT0gY2FsbEJhY2tBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIE5hbWVzcGFjZS5lcnJvck1lc3NhZ2VzLnN1YnNjcmliZU1pc21hdGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmV0dXJuQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudFR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBldmVudFR5cGUgPSBldmVudFR5cGVzW2ldO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuX3N1YnNjcmliZXJzW2V2ZW50VHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlcnNbZXZlbnRUeXBlXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlcnNbZXZlbnRUeXBlXS5wdXNoKGNhbGxCYWNrQXJyYXlbaV0pO1xuICAgICAgICAgICAgcmV0dXJuQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmU6IHRoaXMuX3Vuc3Vic2NyaWJlLmJpbmQodGhpcywgZXZlbnRUeXBlLCB0aGlzLl9zdWJzY3JpYmVyc1tldmVudFR5cGVdLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuQXJyYXlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybkFycmF5O1xuICAgIH1cbiAgICAvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBpY2tlciBhbmQgcmVtb3ZlcyBldmVudCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmRpc3BsYXkuaGlkZSgpO1xuICAgICAgICAvLyB0aGlzIHdpbGwgY2xlYXIgdGhlIGRvY3VtZW50IGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMuZGlzcGxheS5fZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9ldmVudEVtaXR0ZXJzLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX2lucHV0Q2hhbmdlRXZlbnQpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5hbGxvd0lucHV0VG9nZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vcGVuQ2xpY2tFdmVudCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9vcGVuQ2xpY2tFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdG9nZ2xlPy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX3RvZ2dsZUNsaWNrRXZlbnQpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpYmVycyA9IHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBvcHRpb25zIHRvIHVzZSB0aGUgcHJvdmlkZWQgbGFuZ3VhZ2UuXG4gICAgICogVEhlIGxhbmd1YWdlIGZpbGUgbXVzdCBiZSBsb2FkZWQgZmlyc3QuXG4gICAgICogQHBhcmFtIGxhbmd1YWdlXG4gICAgICovXG4gICAgbG9jYWxlKGxhbmd1YWdlKSB7XG4gICAgICAgIGNvbnN0IGFza2VkID0gbG9hZGVkTG9jYWxlc1tsYW5ndWFnZV07XG4gICAgICAgIGlmICghYXNrZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7XG4gICAgICAgICAgICBsb2NhbGl6YXRpb246IGFza2VkLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYW4gZXZlbnQgbGlrZSBDaGFuZ2VFdmVudCB3aGVuIHRoZSBwaWNrZXIgaGFzIHVwZGF0ZWQgdGhlIHZhbHVlXG4gICAgICogb2YgYSBzZWxlY3RlZCBkYXRlLlxuICAgICAqIEBwYXJhbSBldmVudCBBY2NlcHRzIGEgQmFzZUV2ZW50IG9iamVjdC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF90cmlnZ2VyRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQudmlld01vZGUgPSB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50VmlldztcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VFdmVudCA9IGV2ZW50LnR5cGUgPT09IE5hbWVzcGFjZS5ldmVudHMuY2hhbmdlO1xuICAgICAgICBpZiAoaXNDaGFuZ2VFdmVudCkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRlLCBvbGREYXRlLCBpc0NsZWFyIH0gPSBldmVudDtcbiAgICAgICAgICAgIGlmICgoZGF0ZSAmJiBvbGREYXRlICYmIGRhdGUuaXNTYW1lKG9sZERhdGUpKSB8fFxuICAgICAgICAgICAgICAgICghaXNDbGVhciAmJiAhZGF0ZSAmJiAhb2xkRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVBZnRlckNoYW5nZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0Py5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdjaGFuZ2UnLCB7IGRldGFpbDogZXZlbnQgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoZXZlbnQudHlwZSwgeyBkZXRhaWw6IGV2ZW50IH0pKTtcbiAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBpZiAod2luZG93LmpRdWVyeSkge1xuICAgICAgICAgICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgY29uc3QgJCA9IHdpbmRvdy5qUXVlcnk7XG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2VFdmVudCAmJiB0aGlzLm9wdGlvbnNTdG9yZS5pbnB1dCkge1xuICAgICAgICAgICAgICAgICQodGhpcy5vcHRpb25zU3RvcmUuaW5wdXQpLnRyaWdnZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50KS50cmlnZ2VyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wdWJsaXNoKGV2ZW50KTtcbiAgICB9XG4gICAgX3B1Ymxpc2goZXZlbnQpIHtcbiAgICAgICAgLy8gcmV0dXJuIGlmIGV2ZW50IGlzIG5vdCBzdWJzY3JpYmVkXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLl9zdWJzY3JpYmVyc1tldmVudC50eXBlXSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUcmlnZ2VyIGNhbGxiYWNrIGZvciBlYWNoIHN1YnNjcmliZXJcbiAgICAgICAgdGhpcy5fc3Vic2NyaWJlcnNbZXZlbnQudHlwZV0uZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpcmVzIGEgVmlld1VwZGF0ZSBldmVudCB3aGVuLCBmb3IgZXhhbXBsZSwgdGhlIG1vbnRoIHZpZXcgaXMgY2hhbmdlZC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF92aWV3VXBkYXRlKCkge1xuICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoe1xuICAgICAgICAgICAgdHlwZTogTmFtZXNwYWNlLmV2ZW50cy51cGRhdGUsXG4gICAgICAgICAgICB2aWV3RGF0ZTogdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuY2xvbmUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfdW5zdWJzY3JpYmUoZXZlbnROYW1lLCBpbmRleCkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpYmVyc1tldmVudE5hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lcmdlcyB0d28gT3B0aW9uIG9iamVjdHMgdG9nZXRoZXIgYW5kIHZhbGlkYXRlcyBvcHRpb25zIHR5cGVcbiAgICAgKiBAcGFyYW0gY29uZmlnIG5ldyBPcHRpb25zXG4gICAgICogQHBhcmFtIG1lcmdlVG8gT3B0aW9ucyB0byBtZXJnZSBpbnRvXG4gICAgICogQHBhcmFtIGluY2x1ZGVEYXRhc2V0IFdoZW4gdHJ1ZSwgdGhlIGVsZW1lbnRzIGRhdGEtdGQgYXR0cmlidXRlcyB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXRpYWxpemVPcHRpb25zKGNvbmZpZywgbWVyZ2VUbywgaW5jbHVkZURhdGFzZXQgPSBmYWxzZSkge1xuICAgICAgICBsZXQgbmV3Q29uZmlnID0gT3B0aW9uQ29udmVydGVyLmRlZXBDb3B5KGNvbmZpZyk7XG4gICAgICAgIG5ld0NvbmZpZyA9IE9wdGlvbkNvbnZlcnRlci5fbWVyZ2VPcHRpb25zKG5ld0NvbmZpZywgbWVyZ2VUbyk7XG4gICAgICAgIGlmIChpbmNsdWRlRGF0YXNldClcbiAgICAgICAgICAgIG5ld0NvbmZpZyA9IE9wdGlvbkNvbnZlcnRlci5fZGF0YVRvT3B0aW9ucyh0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LCBuZXdDb25maWcpO1xuICAgICAgICBPcHRpb25Db252ZXJ0ZXIuX3ZhbGlkYXRlQ29uZmxpY3RzKG5ld0NvbmZpZyk7XG4gICAgICAgIG5ld0NvbmZpZy52aWV3RGF0ZSA9IG5ld0NvbmZpZy52aWV3RGF0ZS5zZXRMb2NhbGl6YXRpb24obmV3Q29uZmlnLmxvY2FsaXphdGlvbik7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUudmlld0RhdGUuaXNTYW1lKG5ld0NvbmZpZy52aWV3RGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLnZpZXdEYXRlID0gbmV3Q29uZmlnLnZpZXdEYXRlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBtaW5pbXVtIHZpZXcgYWxsb3dlZCBieSB0aGUgcGlja2VyLiBGb3IgZXhhbXBsZSB0aGUgY2FzZSBvZiBvbmx5XG4gICAgICAgICAqIGFsbG93aW5nIHllYXIgYW5kIG1vbnRoIHRvIGJlIHNlbGVjdGVkIGJ1dCBub3QgZGF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChuZXdDb25maWcuZGlzcGxheS5jb21wb25lbnRzLnllYXIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3Q29uZmlnLmRpc3BsYXkuY29tcG9uZW50cy5tb250aCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUubWluaW11bUNhbGVuZGFyVmlld01vZGUgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdDb25maWcuZGlzcGxheS5jb21wb25lbnRzLmRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSA9IE1hdGgubWF4KHRoaXMub3B0aW9uc1N0b3JlLm1pbmltdW1DYWxlbmRhclZpZXdNb2RlLCB0aGlzLm9wdGlvbnNTdG9yZS5jdXJyZW50Q2FsZW5kYXJWaWV3TW9kZSk7XG4gICAgICAgIC8vIFVwZGF0ZSB2aWV3IG1vZGUgaWYgbmVlZGVkXG4gICAgICAgIGlmIChDYWxlbmRhck1vZGVzW3RoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlXS5uYW1lICE9PVxuICAgICAgICAgICAgbmV3Q29uZmlnLmRpc3BsYXkudmlld01vZGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmN1cnJlbnRDYWxlbmRhclZpZXdNb2RlID0gTWF0aC5tYXgoQ2FsZW5kYXJNb2Rlcy5maW5kSW5kZXgoKHgpID0+IHgubmFtZSA9PT0gbmV3Q29uZmlnLmRpc3BsYXkudmlld01vZGUpLCB0aGlzLm9wdGlvbnNTdG9yZS5taW5pbXVtQ2FsZW5kYXJWaWV3TW9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheT8uaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkuX3VwZGF0ZSgnYWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0NvbmZpZy5kaXNwbGF5LmNvbXBvbmVudHMudXNlVHdlbnR5Zm91ckhvdXIgJiZcbiAgICAgICAgICAgIG5ld0NvbmZpZy5sb2NhbGl6YXRpb24uaG91ckN5Y2xlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBuZXdDb25maWcubG9jYWxpemF0aW9uLmhvdXJDeWNsZSA9ICdoMjQnO1xuICAgICAgICBlbHNlIGlmIChuZXdDb25maWcubG9jYWxpemF0aW9uLmhvdXJDeWNsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZXdDb25maWcubG9jYWxpemF0aW9uLmhvdXJDeWNsZSA9IGd1ZXNzSG91ckN5Y2xlKG5ld0NvbmZpZy5sb2NhbGl6YXRpb24ubG9jYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3Q29uZmlnLnJlc3RyaWN0aW9ucy5tYXhEYXRlICYmXG4gICAgICAgICAgICB0aGlzLnZpZXdEYXRlLmlzQWZ0ZXIobmV3Q29uZmlnLnJlc3RyaWN0aW9ucy5tYXhEYXRlKSlcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUgPSBuZXdDb25maWcucmVzdHJpY3Rpb25zLm1heERhdGU7XG4gICAgICAgIGlmIChuZXdDb25maWcucmVzdHJpY3Rpb25zLm1pbkRhdGUgJiZcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUuaXNCZWZvcmUobmV3Q29uZmlnLnJlc3RyaWN0aW9ucy5taW5EYXRlKSlcbiAgICAgICAgICAgIHRoaXMudmlld0RhdGUgPSBuZXdDb25maWcucmVzdHJpY3Rpb25zLm1pbkRhdGU7XG4gICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMgPSBuZXdDb25maWc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhbiBpbnB1dCBmaWVsZCBpcyBiZWluZyB1c2VkLCBhdHRlbXB0cyB0byBsb2NhdGUgb25lIGFuZCBzZXRzIGFuXG4gICAgICogZXZlbnQgbGlzdGVuZXIgaWYgZm91bmQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaW5pdGlhbGl6ZUlucHV0KCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudC50YWdOYW1lID09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0ID0gdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudC5kYXRhc2V0LnRkVGFyZ2V0SW5wdXQ7XG4gICAgICAgICAgICBpZiAocXVlcnkgPT0gdW5kZWZpbmVkIHx8IHF1ZXJ5ID09ICduZWFyZXN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0ID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNTdG9yZS5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQudmFsdWUgJiYgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kZWZhdWx0RGF0ZSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlID0gdGhpcy5kYXRlcy5mb3JtYXRJbnB1dCh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmRlZmF1bHREYXRlKTtcbiAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5faW5wdXRDaGFuZ2VFdmVudCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLmFsbG93SW5wdXRUb2dnbGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb3BlbkNsaWNrRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9vcGVuQ2xpY2tFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLmlucHV0LnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dENoYW5nZUV2ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gbG9jYXRlIGEgdG9nZ2xlIGZvciB0aGUgcGlja2VyIGFuZCBzZXRzIGFuIGV2ZW50IGxpc3RlbmVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaW5pdGlhbGl6ZVRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMuZGlzcGxheS5pbmxpbmUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQuZGF0YXNldC50ZFRhcmdldFRvZ2dsZTtcbiAgICAgICAgaWYgKHF1ZXJ5ID09ICduZWFyZXN0Jykge1xuICAgICAgICAgICAgcXVlcnkgPSAnW2RhdGEtdGQtdG9nZ2xlPVwiZGF0ZXRpbWVwaWNrZXJcIl0nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RvZ2dsZSA9XG4gICAgICAgICAgICBxdWVyeSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnRcbiAgICAgICAgICAgICAgICA6IHRoaXMub3B0aW9uc1N0b3JlLmVsZW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX3RvZ2dsZUNsaWNrRXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgb3B0aW9uIGlzIGVuYWJsZWQgdGhpcyB3aWxsIHJlbmRlciB0aGUgY2xvY2sgdmlldyBhZnRlciBhIGRhdGUgcGljay5cbiAgICAgKiBAcGFyYW0gZSBjaGFuZ2UgZXZlbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9oYW5kbGVBZnRlckNoYW5nZUV2ZW50KGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAvLyBvcHRpb25zIGlzIGRpc2FibGVkXG4gICAgICAgICF0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnByb21wdFRpbWVPbkRhdGVDaGFuZ2UgfHxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMubXVsdGlwbGVEYXRlcyB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LmlubGluZSB8fFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zU3RvcmUub3B0aW9ucy5kaXNwbGF5LnNpZGVCeVNpZGUgfHxcbiAgICAgICAgICAgIC8vIHRpbWUgaXMgZGlzYWJsZWRcbiAgICAgICAgICAgICF0aGlzLmRpc3BsYXkuX2hhc1RpbWUgfHxcbiAgICAgICAgICAgIC8vIGNsb2NrIGNvbXBvbmVudCBpcyBhbHJlYWR5IHNob3dpbmdcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS53aWRnZXRcbiAgICAgICAgICAgICAgICA/LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoTmFtZXNwYWNlLmNzcy5zaG93KVswXVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuY29udGFpbnMoTmFtZXNwYWNlLmNzcy50aW1lQ29udGFpbmVyKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gRmlyc3QgdGltZSBldmVyLiBJZiB1c2VDdXJyZW50IG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZSAoZGVmYXVsdCksIGRvIG5vdGhpbmdcbiAgICAgICAgLy8gYmVjYXVzZSB0aGUgZmlyc3QgZGF0ZSBpcyBzZWxlY3RlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICAvLyBvciBkYXRlIGRpZG4ndCBjaGFuZ2UgKHRpbWUgZGlkKSBvciBkYXRlIGNoYW5nZWQgYmVjYXVzZSB0aW1lIGRpZC5cbiAgICAgICAgaWYgKCghZS5vbGREYXRlICYmIHRoaXMub3B0aW9uc1N0b3JlLm9wdGlvbnMudXNlQ3VycmVudCkgfHxcbiAgICAgICAgICAgIChlLm9sZERhdGUgJiYgZS5kYXRlPy5pc1NhbWUoZS5vbGREYXRlKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fY3VycmVudFByb21wdFRpbWVUaW1lb3V0KTtcbiAgICAgICAgdGhpcy5fY3VycmVudFByb21wdFRpbWVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5LndpZGdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlcnMuYWN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLmRpc3BsYXkud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjdGlvbj1cInRvZ2dsZVBpY2tlclwiXScpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEFjdGlvblR5cGVzJDEudG9nZ2xlUGlja2VyLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLm9wdGlvbnNTdG9yZS5vcHRpb25zLnByb21wdFRpbWVPbkRhdGVDaGFuZ2VUcmFuc2l0aW9uRGVsYXkpO1xuICAgIH1cbn1cbi8qKlxuICogV2hlbmV2ZXIgYSBsb2NhbGUgaXMgbG9hZGVkIHZpYSBhIHBsdWdpbiB0aGVuIHN0b3JlIGl0IGhlcmUgYmFzZWQgb24gdGhlXG4gKiBsb2NhbGUgbmFtZS4gRS5nLiBsb2FkZWRMb2NhbGVzWydydSddXG4gKi9cbmNvbnN0IGxvYWRlZExvY2FsZXMgPSB7fTtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbi8qKlxuICogQ2FsbGVkIGZyb20gYSBsb2NhbGUgcGx1Z2luLlxuICogQHBhcmFtIGwgbG9jYWxlIG9iamVjdCBmb3IgbG9jYWxpemF0aW9uIG9wdGlvbnNcbiAqL1xuY29uc3QgbG9hZExvY2FsZSA9IChsKSA9PiB7XG4gICAgaWYgKGxvYWRlZExvY2FsZXNbbC5uYW1lXSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGxvYWRlZExvY2FsZXNbbC5uYW1lXSA9IGwubG9jYWxpemF0aW9uO1xufTtcbi8qKlxuICogQSBzZXRzIHRoZSBnbG9iYWwgbG9jYWxpemF0aW9uIG9wdGlvbnMgdG8gdGhlIHByb3ZpZGVkIGxvY2FsZSBuYW1lLlxuICogYGxvYWRMb2NhbGVgIE1VU1QgYmUgY2FsbGVkIGZpcnN0LlxuICogQHBhcmFtIGxcbiAqL1xuY29uc3QgbG9jYWxlID0gKGwpID0+IHtcbiAgICBjb25zdCBhc2tlZCA9IGxvYWRlZExvY2FsZXNbbF07XG4gICAgaWYgKCFhc2tlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIERlZmF1bHRPcHRpb25zLmxvY2FsaXphdGlvbiA9IGFza2VkO1xufTtcbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbi8qKlxuICogQ2FsbGVkIGZyb20gYSBwbHVnaW4gdG8gZXh0ZW5kIG9yIG92ZXJyaWRlIHBpY2tlciBkZWZhdWx0cy5cbiAqIEBwYXJhbSBwbHVnaW5cbiAqIEBwYXJhbSBvcHRpb25cbiAqL1xuY29uc3QgZXh0ZW5kID0gZnVuY3Rpb24gKHBsdWdpbiwgb3B0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKCFwbHVnaW4pXG4gICAgICAgIHJldHVybiB0ZW1wdXNEb21pbnVzO1xuICAgIGlmICghcGx1Z2luLmluc3RhbGxlZCkge1xuICAgICAgICAvLyBpbnN0YWxsIHBsdWdpbiBvbmx5IG9uY2VcbiAgICAgICAgcGx1Z2luKG9wdGlvbiwgeyBUZW1wdXNEb21pbnVzLCBEYXRlcywgRGlzcGxheSwgRGF0ZVRpbWUsIE5hbWVzcGFjZSB9LCB0ZW1wdXNEb21pbnVzKTtcbiAgICAgICAgcGx1Z2luLmluc3RhbGxlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0ZW1wdXNEb21pbnVzO1xufTtcbmNvbnN0IHZlcnNpb24gPSAnNi43LjEzJztcbmNvbnN0IHRlbXB1c0RvbWludXMgPSB7XG4gICAgVGVtcHVzRG9taW51cyxcbiAgICBleHRlbmQsXG4gICAgbG9hZExvY2FsZSxcbiAgICBsb2NhbGUsXG4gICAgTmFtZXNwYWNlLFxuICAgIERlZmF1bHRPcHRpb25zLFxuICAgIERhdGVUaW1lLFxuICAgIFVuaXQsXG4gICAgdmVyc2lvbixcbiAgICBEZWZhdWx0RW5Mb2NhbGl6YXRpb24sXG59O1xuXG5leHBvcnQgeyBEYXRlVGltZSwgRGVmYXVsdEVuTG9jYWxpemF0aW9uLCBEZWZhdWx0T3B0aW9ucywgTmFtZXNwYWNlLCBUZW1wdXNEb21pbnVzLCBVbml0LCBleHRlbmQsIGxvYWRMb2NhbGUsIGxvY2FsZSwgdmVyc2lvbiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGVtcHVzLWRvbWludXMuZXNtLmpzLm1hcFxuIiwiXG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHVuc2FmZVxuICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkSGlnaGxpZ2h0Q2xhc3MoY29udGVudDogc3RyaW5nLCB0YXJnZXRXb3JkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gY29udGVudC5yZXBsYWNlKG5ldyBSZWdFeHAoYFxcXFxiJHt0YXJnZXRXb3JkfVxcXFxiYCwgJ2dpJyksIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJoaWdobGlnaHRcIj4ke21hdGNofTwvc3Bhbj5gO1xuICB9KTtcbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEpzb25Ub0h0bWxDb252ZXJ0ZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydChqc29uOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZiAoanNvbiA9PSBudWxsKSByZXR1cm4gdGhpcy5lc2NhcGVIdG1sKFwiPGVtPm51bGw8L2VtPlwiKTtcbiAgICAgICAgaWYgKHR5cGVvZiBqc29uICE9PSBcIm9iamVjdFwiKSByZXR1cm4gdGhpcy5lc2NhcGVIdG1sKGpzb24udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5VG9IdG1sKGpzb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0VG9IdG1sKGpzb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXJyYXlUb0h0bWwoYXJyOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGl0ZW1zSHRtbCA9IGFyci5tYXAoaXRlbSA9PiBgPGxpPiR7dGhpcy5jb252ZXJ0KGl0ZW0pfTwvbGk+YCkuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIGA8dWw+JHtpdGVtc0h0bWx9PC91bD5gO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIG9iamVjdFRvSHRtbChvYmo6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXNIdG1sID0gT2JqZWN0LmtleXMob2JqKVxuICAgICAgICAgICAgLm1hcChrZXkgPT4gYDxsaT4ke3RoaXMuZXNjYXBlSHRtbChrZXkpfTogJHt0aGlzLmNvbnZlcnQob2JqW2tleV0pfTwvbGk+YClcbiAgICAgICAgICAgIC5qb2luKFwiXCIpO1xuICAgICAgICByZXR1cm4gYDx1bD4ke3Byb3BlcnRpZXNIdG1sfTwvdWw+YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHVuc2FmZS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xuICAgIH1cbn1cblxuLy8gVXNhZ2UgZXhhbXBsZTpcbmNvbnN0IGpzb24gPSB7XG4gICAgY29kZTogXCJFUlJPUl9DT0RFXCIsXG4gICAgbWVzc2FnZTogXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiLFxuICAgIGRldGFpbHM6IHtcbiAgICAgICAgaW5mbzogXCJEZXRhaWxlZCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZXJyb3JcIixcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIGl0ZW1zOiBbMSwgMiwgM11cbiAgICB9XG59O1xuXG4iLCJpbXBvcnQgY2hhbGssIHsgQ2hhbGtJbnN0YW5jZSB9IGZyb20gJ2NoYWxrJztcbmltcG9ydCB7IGV4dHJhY3RDYWxsZXJGcm9tU3RhY2ssIGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrIH0gZnJvbSAnLi9TdGFja0hlbHBlcic7XG5cbmNoYWxrLmxldmVsID0gMztcbmxldCBkZWZhdWx0TW9kZTogQ2hhbGtJbnN0YW5jZSA9IGNoYWxrLnJlc2V0O1xuXG5cbmxldCBsYXN0U2VjOiBTZWN0aW9uIHwgdW5kZWZpbmVkO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlYygpIHtcblxuICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKXtcbiAgICAvLyBjb25zb2xlLmdyb3VwRW5kKClcbiAgICAvLyB9XG5cbiAgICBpZiAobGFzdFNlYz8uZ3JvdXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0U2VjPy5ncm91cDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGFzdFNlYyA9IG5ldyBTZWN0aW9uKFwiUm9vdFwiLCBkZWZhdWx0TW9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWNCYWNrT25lKCkge1xuICAgIGxhc3RTZWMgPSBsYXN0U2VjPy5wYXJlbnQ7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xufVxuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiB7XG4gICAgc2VjdGlvbk5hbWU6IHN0cmluZztcbiAgICBwYXJlbnQ6IFNlY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgYzogQ2hhbGtJbnN0YW5jZVxuICAgIGluZGVudCA9IDA7XG4gICAgaW5kZW50UGFkID0gXCJcIjtcbiAgICBncm91cDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uTmFtZTogc3RyaW5nLCBjOiBDaGFsa0luc3RhbmNlLCBzZWN0aW9uPzogU2VjdGlvbikge1xuICAgICAgICB0aGlzLmMgPSBjO1xuICAgICAgICB0aGlzLnNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XG4gICAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudCA9IHNlY3Rpb24uaW5kZW50ICsgMTtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50UGFkID0gXCItXCIucmVwZWF0KHRoaXMuaW5kZW50ICogMikgKyBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgICBsYXN0U2VjID0gdGhpcztcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBzZWN0aW9uO1xuICAgIH1cbiAgICBsb2coLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5sb2coZGVmYXVsdE1vZGUoYXJncykpO1xuICAgIH1cbiAgICBsaDEoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDEodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDIoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDIodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDMoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDModGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGwoLi4uYXJnczogYW55W10pIHtcblxuICAgIGxldCBzZWM6IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjO1xuICAgIGxldCBmaXJzdEFyZzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGxldCBmaXJzdEFyZ01vZGlmZWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICBpZiAoYXJnIGluc3RhbmNlb2YgU2VjdGlvbikge1xuICAgICAgICAgICAgc2VjID0gYXJnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZmlyc3RBcmcgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiU3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGZpcnN0QXJnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuICAgIGFyZ3MgPSBhcmdzLmZpbHRlcigoYXJnKSA9PiB7XG4gICAgICAgIHJldHVybiAhKGFyZyBpbnN0YW5jZW9mIFNlY3Rpb24pO1xuICAgIH0pXG5cblxuICAgIC8vIGxldCBjID0gc2VjPy5jIHx8IG1vZGU7XG4gICAgbGV0IGMgPSBkZWZhdWx0TW9kZTtcbiAgICBsZXQgaW5kZW50UGFkID0gc2VjPy5pbmRlbnRQYWQgfHwgXCJcIjtcblxuICAgIGlmICghZmlyc3RBcmcpIHtcbiAgICAgICAgZmlyc3RBcmcgPSBcIlwiO1xuICAgIH1cbiAgICBmaXJzdEFyZ01vZGlmZWQgPSBmaXJzdEFyZztcblxuICAgIGZpcnN0QXJnTW9kaWZlZCA9IGluZGVudFBhZCArIGZpcnN0QXJnO1xuICAgIC8vcmVtb3ZlIGNvbG9yIGZvcm1hdHRpbmcgZnJvbSBmaXJzdCBhcmdcbiAgICBsZXQgdG90TGVuID0gZmlyc3RBcmdNb2RpZmVkLmxlbmd0aCAtIGZpcnN0QXJnTW9kaWZlZC5yZXBsYWNlKC9cXHUwMDFiXFxbLio/bS9nLCAnJykubGVuZ3RoIC0gMjtcblxuXG4gICAgY29uc29sZS5sb2coZmlyc3RBcmdNb2RpZmVkKTtcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYXJnKTtcbiAgICB9KVxuXG5cbn1cblxuXG5cbmZ1bmN0aW9uIGxvZ0hlYWRpbmdTZWN0aW9uKGM6IENoYWxrSW5zdGFuY2UsIGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbj86IFNlY3Rpb24pIHtcblxuICAgIGxldCBzZWMgPSBuZXcgU2VjdGlvbihoZWFkaW5nLCBjLCBzZWN0aW9uKTtcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKERhdGUubm93KCkpLnRvTG9jYWxlU3RyaW5nKCk7XG5cbiAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWU7XG4gICAgICAgIHdoaWxlIChzZWN0aW9uLnBhcmVudCkge1xuICAgICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb24ucGFyZW50O1xuICAgICAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWUgKyBcIiAtPiBcIiArIHBhdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2FkZCBhZGQgaGVhZGluZyB0byBlbmQgb2YgcGF0aCBhbmQgb25seSBhZGQgLT4gaWYgcGF0aCBpcyBub3QgZW1wdHlcbiAgICBpZiAocGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhdGggKz0gXCIgLT4gXCI7XG4gICAgfVxuICAgIHBhdGggKz0gaGVhZGluZztcblxuXG5cbiAgICAvL3Bvc2l0aW9uIHRoZSBoZWFkaW5nIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlblxuICAgIC8vIGNvbnNvbGUubG9nKGMoaGVhZGluZy5wYWRTdGFydCgoY3dpZHRoIC8gMikgKyAoaGVhZGluZy5sZW5ndGggLyAyKSwgXCIgXCIpLnBhZEVuZChjd2lkdGgsIFwiIFwiKSkpO1xuICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoYyhwYXRoKSk7XG4gICAgc2VjLmdyb3VwKys7XG5cbiAgICByZXR1cm4gc2VjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgxKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnQmxhY2suZ3JlZW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDIoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5LmN5YW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDMoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5Lm1hZ2VudGFCcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cblxuZXhwb3J0IGNvbnN0IGxoID0gbGgxO1xuXG5cbmV4cG9ydCBjb25zdCBpbXAgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5yZWQuYm9sZC5iZ0JsYWNrO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaW5mID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuYmx1ZS5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgd3JuID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsueWVsbG93LmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59IFxuXG5leHBvcnQgY29uc3QgZXJyID0gKHRleHQ6IHN0cmluZykgPT4ge1xuXG4gICAgbGV0IGVyID0gKG5ldyBFcnJvcigpKTtcbiAgICBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soZXIuc3RhY2spO1xuICAgIGxldCBjYWxsZXIgPSBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKGVyLnN0YWNrKTtcblxuICAgIGxldCBwcmVUZXh0ID0gYFske2NhbGxlcn06JHtsaW5lTm99XWA7XG5cbiAgICB0ZXh0ID0gcHJlVGV4dCArIFwiIFwiICsgdGV4dDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhlcik7XG5cbiAgICBsZXQgYyA9IGNoYWxrLnJlZC5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgc3VjID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuZ3JlZW4uYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGhsID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWUodGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBobDEgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnTWFnZW50YSh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IG52ID0gKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWVCcmlnaHQobmFtZS5wYWRFbmQoMzAsIFwiIFwiKSkgKyBcIiA6IFwiICsgY2hhbGsuY3lhbkJyaWdodCh2YWx1ZSk7XG59XG5cbiBcbmxldCBleGFtcGxlSlNvbiA9XG57XG4gICAgXCJuYW1lXCI6IFwidGVzdFwiLFxuICAgIFwiYWdlXCI6IDEwLFxuICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgIFwic3RyZWV0XCI6IFwiMTIzIEZha2UgU3RyZWV0XCIsXG4gICAgICAgIFwiY2l0eVwiOiBcIkxvbmRvblwiLFxuICAgICAgICBcInBvc3Rjb2RlXCI6IFwiU1cxQSAxQUFcIlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blRlc3QoKSB7XG5cblxuICAgIGNvbnNvbGUubG9nKFwiLS0gdGVzdCAtLVwiKVxuXG4gICAgbGV0IHNlYyA9IGxoMShcIlRlc3QgSGVhZGluZyAxXCIpXG4gICAgbChpbXAoXCJBdXRvIFNlYyAtIFRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSlcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDFcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDJcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIElORk86IFwiICsgaW1wKFwiVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgV0lUSCBBRERJVElOQUwgSU5GTzogXCIgKyBpbXAoXCJUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikgKyBcIiBhbmQgdGhpcyBpcyBzb21lIGFkZGl0aW9uYWwgaW5mb1wiKVxuICAgIGwoXCJBdXRvIFNlYyAtIFRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiYWZ0ZXIgYXV0byBzZWMgVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIHNlYyA9IHNlYy5saDIoXCJIZWFkaW5nIDJcIilcbiAgICBzZWMubChcIlRlc3RcIilcbiAgICBzZWMubChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG4gICAgc2VjID0gc2VjLmxoMyhcIkhlYWQgM1wiKVxuICAgIGwoXCJUZXN0XCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIGNsZWFyU2VjKCk7XG4gICAgbChcIlRlc3QgQ2xlYXIgU2VjXCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG5cbiAgICBsKFwiVGVzdCBKU09OOlwiLCBleGFtcGxlSlNvbik7XG5cbn1cblxuLy8gcnVuVGVzdCgpXG5jbGVhclNlYygpO1xuXG4vLyBleHBvcnQge2NvbG9yc307XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayhzdGFjazogc3RyaW5nIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKCFzdGFjaykgcmV0dXJuIG51bGw7XG4gICAgLy8gRXh0cmFjdCBsaW5lcyBmcm9tIHN0YWNrXG4gICAgY29uc3Qgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAvLyBGaW5kIHRoZSBsaW5lIHdpdGggdGhlIGVycm9yICh1c3VhbGx5IHRoZSBzZWNvbmQgbGluZSlcbiAgICBjb25zdCBlcnJvckxpbmUgPSBzdGFja0xpbmVzWzFdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgbGluZSBudW1iZXIgZnJvbSB0aGUgZXJyb3IgbGluZSB1c2luZyByZWdleFxuICAgIGNvbnN0IG1hdGNoID0gZXJyb3JMaW5lLm1hdGNoKC86KFxcZCspOihcXGQrKSQvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBwYXJzZUludChtYXRjaFsxXSkgOiBudWxsO1xuICB9XG4gIFxuIGV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKHN0YWNrOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIXN0YWNrKSByZXR1cm4gbnVsbDtcbiAgICAvLyBFeHRyYWN0IGxpbmVzIGZyb20gc3RhY2tcbiAgICBjb25zdCBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIC8vIEZpbmQgdGhlIGxpbmUgd2l0aCB0aGUgY2FsbGVyIGZ1bmN0aW9uICh1c3VhbGx5IHRoZSB0aGlyZCBsaW5lKVxuICAgIGNvbnN0IGNhbGxlckxpbmUgPSBzdGFja0xpbmVzWzJdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgY2FsbGVyIGZ1bmN0aW9uIG5hbWUgdXNpbmcgcmVnZXhcbiAgICBjb25zdCBtYXRjaCA9IGNhbGxlckxpbmUubWF0Y2goL2F0IChbXFx3Ljw+XSspLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xuICB9IiwiXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVEb0V2ZW50IHtcbiAgICBldmVudFBhdGg6IHN0cmluZztcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBzb3VyY2U6IGFueTtcbiAgICBkYXRhOiBhbnk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChldmVudDpTaGFyZURvRXZlbnQpIHtcblxuICAgICR1aS5ldmVudHMuYnJvYWRjYXN0KGV2ZW50LmV2ZW50UGF0aCwgZXZlbnQpO1xufSIsImltcG9ydCB7IGwsIGluZiwgZXJyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Mb2dcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvQ2xhc3MoY2xhc3NOYW1lOnN0cmluZywgYmFzZTphbnkpIHtcbiAgICBjb25zdCBjbGFzc1BhcnRzID0gY2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgbGV0IGNsYXNzUmVmZXJlbmNlID0gYmFzZTtcblxuICAgIGZvciAoY29uc3QgcGFydCBvZiBjbGFzc1BhcnRzKSB7XG4gICAgICAgIGlmKCFjbGFzc1JlZmVyZW5jZVtwYXJ0XSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2xhc3NSZWZlcmVuY2UgPSBjbGFzc1JlZmVyZW5jZVtwYXJ0XTtcbiAgICB9OyBcbiAgICByZXR1cm4gY2xhc3NSZWZlcmVuY2U7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbEZpZWxkc1RvTnVsbChtb2RlbDphbnkpIHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1vZGVsKTtcbiAgICBrZXlzLmZvckVhY2goKGtleTogYW55KSA9PiB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBudWxsO1xuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KG9iOiBhbnkpIHtcbiAgICB2YXIgdG9SZXR1cm46IGFueSA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSBpbiBvYikge1xuICAgICAgICBpZiAoIW9iLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBvYltpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBmbGF0T2JqZWN0ID0gZmxhdHRlbk9iamVjdChvYltpXSk7XG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGZsYXRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZsYXRPYmplY3QuaGFzT3duUHJvcGVydHkoeCkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdG9SZXR1cm5baSArICcuJyArIHhdID0gZmxhdE9iamVjdFt4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvUmV0dXJuW2ldID0gb2JbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRbcHJvcF0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRbcHJvcF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICB9XG4gICAgY3VycmVudFtwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgIGwoaW5mKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pYCksb2JqKTtcbiAgICBcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcHJvcGVydHkgaGFzIGFuIGFycmF5IGluZGV4LCBlLmcuLCBcImRhdGFbMF1cIlxuICAgICAgICBjb25zdCBtYXRjaGVzID0gcHJvcC5tYXRjaCgvXihbYS16QS1aMC05X10rKVxcWyhbMC05XSspXFxdJC8pO1xuXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheVByb3AgPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChtYXRjaGVzWzJdLCAxMCk7XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJyZW50W2FycmF5UHJvcF0pIHx8IGN1cnJlbnRbYXJyYXlQcm9wXVtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBhcnJheVByb3Agb3IgaW5kZXggaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRbcHJvcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbChlcnIoYGdldE5lc3RlZFByb3BlcnR5KCR7cHJvcGVydHlQYXRofSk6IHByb3AgaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB0ZW1wb3JhcnkgYW5kIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRoZSB0eXBlc2NyaXB0IHR5cGluZyBhcmUgZml4ZWRcbiAgICAgKiBXaGF0IGlzIGRvZXMgaXMgY2hlY2sgaWYgdGhlIHBhc3NlZCBpbiBvYmplY3QgaXMgYSBrbm9ja291dCBvYnNlcnZhYmxlIGFuZCBpZiBpdCBpcyBpdCByZXR1cm5zIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBrb09iamVjdCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVGcm9tS09PYmplY3Q8VD4oa29PYmplY3Q6IGFueSkge1xuICAgICAgICBpZih0eXBlb2Yga29PYmplY3QgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGtvT2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtvT2JqZWN0XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGd2a28oa29PYmplY3Q6IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiBnZXRWYWx1ZUZyb21LT09iamVjdChrb09iamVjdCk7XG4gICAgfSIsIlxuLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgdGhlIGFwaSBjYWxscyB0byB0aGUgYmFja2VuZC5cbiAqIHV0aWxpc2luZyB0aGUgYXhpb3MgbGlicmFyeSB0byBtYWtlIHRoZSBjYWxscy5cbiAqIGluY2x1c2luZyBvZiB3ZWJwYWNrSWdub3JlIGlzIHRvIGFsbG93IHRoZSB3ZWJwYWNrIHRvIGlnbm9yZSB0aGUgY2FsbHMgYW5kIG5vdCB0cnkgdG8gYnVuZGxlIHRoZW0uXG4gKi9cblxuaW1wb3J0IHsgZXJyLCBpbmYsIGwsIGxoMSwgc2VjQmFja09uZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vTG9nXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUG9zdDxUPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSk6IFByb21pc2U8VD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnBvc3QoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpLCBwb3N0Qm9keSk7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIlBPU1RcIiwgcG9zdEJvZHkpKS5kYXRhO1xufVxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuLy8gICAgIHJldHVybiBhd2FpdCAkYWpheC5nZXQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpKTtcbi8vIH0gXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0PFQ+KGFwaTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIkdFVFwiLCB1bmRlZmluZWQpKS5kYXRhO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0djI8VD4oYXBpOiBzdHJpbmcpe1xuICAgIHJldHVybiAgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJHRVRcIiwgdW5kZWZpbmVkKTtcbn1cblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUHV0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KTogUHJvbWlzZTxUPiB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucHV0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJQVVRcIiwgcG9zdEJvZHkpKS5kYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZURlbGV0ZTxUPihhcGk6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LmRlbGV0ZSgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJERUxFVEVcIiwgdW5kZWZpbmVkKSkuZGF0YTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcGkoYXBpOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBsb2NhdGlvbiA9IHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW47XG5cbiAgICAvL2lmIGFwaSBkb2VzIG5vdCBpbmNsdWRlIHRoZSBsb2NhdGlvbiB0aGVuIGFkZCBpdC5cbiAgICBpZiAoYXBpLmluZGV4T2YobG9jYXRpb24pID09PSAtMSkge1xuICAgICAgICAvL2NoZWNrIGlmIGFwaSBzdGFydCB3aXRoIGEgLyBpZiBub3QgYWRkIGl0LlxuICAgICAgICBpZiAoYXBpLmluZGV4T2YoXCIvXCIpICE9PSAwKSB7XG4gICAgICAgICAgICBhcGkgPSBcIi9cIiArIGFwaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwaSA9IGxvY2F0aW9uICsgYXBpO1xuICAgIH1cbiAgICByZXR1cm4gYXBpO1xuXG59XG5cbmV4cG9ydCB0eXBlIFRFeGVjdXRlRmV0Y2hSZXNwb25zZSA9XG4gICAge1xuICAgICAgICBkYXRhOiBhbnkgfCB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiBSZXNwb25zZSB8IHVuZGVmaW5lZCxcbiAgICAgICAgaW5mbzpcbiAgICAgICAge1xuICAgICAgICAgICAgc3VjY2VzczogYm9vbGVhbixcbiAgICAgICAgICAgIGVycm9yOiBBcnJheTxUVXNlckVycm9ycz5cbiAgICAgICAgfVxuICAgIH1cblxuZXhwb3J0IHR5cGUgVFVzZXJFcnJvcnMgPVxuICAgIHtcbiAgICAgICAgY29kZTogc3RyaW5nLFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHVzZXJNZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHN1Z2dlc3Rpb25zPzogQXJyYXk8c3RyaW5nPlxuICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zPzogQXJyYXk8c3RyaW5nPlxuICAgICAgICBhY3Rpb25zPzogQXJyYXk8c3RyaW5nPlxuICAgICAgICBlcnJvclN0YWNrPzogc3RyaW5nLFxuICAgICAgICBhZGRpdGlvbmFsSW5mbz86IGFueVxuICAgIH1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVGZXRjaDxUPihhcGk6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGRhdGE6IGFueSwgcmV0cnlDb3VudGVyPzpudW1iZXIpOiBQcm9taXNlPFRFeGVjdXRlRmV0Y2hSZXNwb25zZT4ge1xuICAgIGxldCByZXRWYWx1ZTogVEV4ZWN1dGVGZXRjaFJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiB1bmRlZmluZWQsXG4gICAgICAgIGluZm86IHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFtdXG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIC8vdG8gZ2V0IG5ldyB0b2tlbiBUT0RPOiBjaGVjayBpZiBmYWlsIHRoZW4gY2FsbFxuICAgIC8vIGF3YWl0ICRhamF4LmdldChcImh0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvc2VjdXJpdHkvcmVmcmVzaFRva2Vucz9fPVwiICsgRGF0ZS5ub3cpO1xuXG4gICAgXG5cbiAgICBsZXQgdXJsID0gdmFsaWRhdGVBcGkoYXBpKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gYnVpbGRIZWFkZXJzKCk7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBmZXRjaEhlYWRlcnMsXG4gICAgICAgIGJvZHk6IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgICApLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldFZhbHVlLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIGlmIChyZXNwb25zZS5vayA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKXtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ZXIgPSByZXRyeUNvdW50ZXIgfHwgMTtcbiAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50ZXIgPiAzKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJIGFmdGVyIDMgYXR0ZW1wdHMuIHN0YXR1c1RleHQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB1bmRlZmluZWQsIHJlc3BvbnNlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGF3YWl0ICRhamF4LmdldChcImh0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvc2VjdXJpdHkvcmVmcmVzaFRva2Vucz9fPVwiICsgRGF0ZS5ub3cpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBtZXRob2QsIGRhdGEscmV0cnlDb3VudGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBjYWxsIHRoZSBBUEkuIHN0YXR1c1RleHQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLFxuICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSS5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzcG9uc2VEYXRhO1xuICAgICAgICAvL2NoZWNrIGlmIHJlc3BvbnNlIGlzIEpTT05cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKT8uaW5jbHVkZXMoXCJhcHBsaWNhdGlvbi9qc29uXCIpKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSB0aGUgQVBJLiBNZXNzYWdlOiAke2U/Lm1lc3NhZ2UgfHwgXCJVbmtub3duXCJ9YCxcbiAgICAgICAgICAgICAgICB1c2VyTWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSB0aGUgQVBJLmBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHJlc3BvbnNlRGF0YSwgcmVzcG9uc2UgfTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbChlcnIoYEVycm9yIGZyb20gQVBJIENhbGwgJHt1cmx9YCksIGVycm9yKTtcblxuICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICB1c2VyTWVzc2FnZTogZXJyb3IubWVzc2FnZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBkYXRhOiB1bmRlZmluZWQsIHJlc3BvbnNlOiB1bmRlZmluZWQgfTtcbiAgICB9KVxuXG4gICAgbGgxKGBSZXNwb25zZSBmcm9tICR7dXJsfWApO1xuICAgIGwocmVzcG9uc2UpO1xuXG4gICAgcmV0VmFsdWUuZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICBpZihyZXRWYWx1ZS5pbmZvLmVycm9yLmxlbmd0aCA+IDApe1xuICAgICAgICByZXRWYWx1ZS5pbmZvLnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgbChlcnIoYEVycm9yIGZyb20gQVBJIENhbGwgJHt1cmx9YCksIGUpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNlY0JhY2tPbmUoKTtcblxuICAgIHJldHVybiByZXRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gYnVpbGRIZWFkZXJzKCkge1xuICAgIGxldCBiZWFyZXIgPSBnZXRCZWFyZXJUb2tlbigpO1xuICAgIGxldCBmZXRjaEhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIGlmIChiZWFyZXIpIHtcbiAgICAgICAgZmV0Y2hIZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgYmVhcmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoSGVhZGVycztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29va2llcygpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgICBsZXQgcmV0VmFsdWU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgICBsZXQgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIikucmVkdWNlKGZ1bmN0aW9uIChjb29raWVzLCBjb29raWUpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhcnRzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzWzFdO1xuXG4gICAgICAgICAgICByZXRWYWx1ZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJlYXJlclRva2VuKCkge1xuICAgIHZhciBjb29raWVzID0gZ2V0Q29va2llcygpO1xuICAgIHZhciB0b2tlbiA9IGNvb2tpZXNbXCJfYXBpXCJdO1xuXG4gICAgaWYgKHRva2VuKSByZXR1cm4gXCJCZWFyZXIgXCIgKyB0b2tlbjtcbiAgICByZXR1cm4gbnVsbDtcbn07IiwiaW1wb3J0IHsgZXhlY3V0ZVBvc3QgfSBmcm9tIFwiLi4vYXBpXCI7XG5pbXBvcnQgeyBJRmluZEJ5UXVlcnlPcHRpb25zIH0gZnJvbSBcIi4vSUZpbmRCeVF1ZXJ5SW5wdXRcIjtcbmltcG9ydCB7IElGaW5kQnlRdWVyeVJlc3VsdCB9IGZyb20gXCIuL0lGaW5kQnlRdWVyeVJlc3VsdFwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlRmluZEJ5UXVlcnk8VD4oaW5wdXRPcHRpb246IElGaW5kQnlRdWVyeU9wdGlvbnMpOiBQcm9taXNlPElGaW5kQnlRdWVyeVJlc3VsdDxUPj5cbntcbiAgICByZXR1cm4gZXhlY3V0ZVBvc3Q8SUZpbmRCeVF1ZXJ5UmVzdWx0PFQ+PihcIi9hcGkvdjEvcHVibGljL3dvcmtJdGVtL2ZpbmRCeVF1ZXJ5XCIsIGlucHV0T3B0aW9uKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBleGVjdXRlRmluZEJ5UXVlcnkgfSBmcm9tIFwiLi9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnlcIjtcblxuZXhwb3J0IGludGVyZmFjZSBzZWFyY2hSZXN1bHQgXG57XG4gICAgZm91bmQ6Ym9vbGVhbiwgXG4gICAgdmFsdWU6c3RyaW5nIHwgdW5kZWZpbmVkLCBcbiAgICBwYXJlbnRJZDpzdHJpbmcgfCB1bmRlZmluZWRcbiAgICBkZXB0aDpudW1iZXIsXG4gICAgZm91bmRJbldvcmtJdGVtSWQ6c3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHdhc0ZvdW5kSW5BbmNlc3Rvcjpib29sZWFuLFxuICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6c3RyaW5nIHwgdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUod29ya0l0ZW1JZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIHBhcmVudHM6IGJvb2xlYW4sIG1heERlcHRoPzogbnVtYmVyIHwgdW5kZWZpbmVkKVxuIHtcbiAgICBsZXQgdXNlTWF4RGVwdGggOiBib29sZWFuID0gbWF4RGVwdGggPyB0cnVlIDogZmFsc2U7XG4gICAgaWYobWF4RGVwdGggJiYgbWF4RGVwdGggPiAwKXtcbiAgICAgICAgdXNlTWF4RGVwdGggPSB0cnVlO1xuICAgIH1cblxuXG4gICAgbGV0IHJldFZhbHVlOnNlYXJjaFJlc3VsdCA9IHtmb3VuZDpmYWxzZSwgdmFsdWU6dW5kZWZpbmVkLCBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOjAsIGZvdW5kSW5Xb3JrSXRlbUlkOnVuZGVmaW5lZCwgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLCBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZH07XG5cbiAgICByZXRWYWx1ZSA9IGF3YWl0IHNlYXJjaEZvckF0dHJpYnV0ZSh3b3JrSXRlbUlkLCBhdHRyaWJ1dGVOYW1lKTtcblxuICAgIGlmKHJldFZhbHVlLmZvdW5kKXtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cblxuICAgIGlmKCFwYXJlbnRzICl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50cyBvciBjaGlsZHJlbiB0byBzZWFyY2ggc28gb25seSBzZWFyY2hpbmcgY3VycmVudCB3b3JrIGl0ZW1cIik7XG4gICAgICAgIHJldHVybiByZXRWYWx1ZVxuICAgIH1cblxuICAgIGlmKHBhcmVudHMpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyBwYXJlbnRzXCIpO1xuICAgICAgICBsZXQgZGVwdGggPSAwO1xuICAgICAgICBsZXQgc2VhcmNoUGFyZW50ID0gYXN5bmMgKHBhcmVudElkOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgICAgICBsZXQgcjogc2VhcmNoUmVzdWx0ID0ge2ZvdW5kOmZhbHNlLFxuICAgICAgICAgICAgICAgICB2YWx1ZTp1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgICBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOmRlcHRoLCAvL2RlcHRoIGhlcmUgd2lsbCBiZSBvdmVycmlkZW4gaWYgdGhlcmUgaXMgYSBwYXJlbnRcbiAgICAgICAgICAgICAgICAgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLCBcbiAgICAgICAgICAgICAgICAgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZighcGFyZW50SWQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgciA9IGF3YWl0IHNlYXJjaEZvckF0dHJpYnV0ZShwYXJlbnRJZCwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICAgci5kZXB0aCA9IGRlcHRoOyAvL3VwZGF0ZSBkZXB0aCBhcyBpdCB3aWxsIGJlIDBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHIuZm91bmQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgYXR0cmlidXRlIGluIHBhcmVudFwiKTtcbiAgICAgICAgICAgICAgICByLndhc0ZvdW5kSW5BbmNlc3RvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgaWYodXNlTWF4RGVwdGggJiYgZGVwdGggPj0gbWF4RGVwdGghKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXggZGVwdGggcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYoIXIucGFyZW50SWQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHBhcmVudCBmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGZvdW5kIGluIHBhcmVudFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoUGFyZW50KHIucGFyZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0VmFsdWUgPSBhd2FpdCBzZWFyY2hQYXJlbnQocmV0VmFsdWUucGFyZW50SWQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXRWYWx1ZTtcblxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JBdHRyaWJ1dGUod29ya0l0ZW1JZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcbiAgICAvL2dldCB0aGUgbWF0dGVyXG4gICAgbGV0IHJldFZhbHVlIDpzZWFyY2hSZXN1bHQgPSB7XG4gICAgICAgIGZvdW5kOmZhbHNlLCB2YWx1ZTp1bmRlZmluZWQsXG4gICAgICAgICBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOjAsXG4gICAgICAgICAgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLFxuICAgICAgICAgICB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsXG4gICAgICAgICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkfTtcbiAgICBsZXQgcmVxID0ge1xuICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIndvcmtJdGVtSWRzXCI6IFtcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW5yaWNoXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJ0aXRsZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInBhcmVudC5pZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInR5cGUuc3lzdGVtTmFtZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInJlZmVyZW5jZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgdXNpbmcgU2hhcmVEbyBJZDogXCIgKyB3b3JrSXRlbUlkKTtcbiAgICBsZXQgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5ID0gYXdhaXQgZXhlY3V0ZUZpbmRCeVF1ZXJ5PGFueT4ocmVxKTtcbiAgICBjb25zb2xlLmxvZyhgV29yayBpdGVtICR7d29ya0l0ZW1JZH0gZm91bmRgKTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0cykpO1xuXG5cbiAgICBsZXQgdHlwZVN5c3RlbU5hbWUgPSBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW1widHlwZS5zeXN0ZW1OYW1lXCJdO1xuICAgIGxldCBwYXJlbnRJZCA9ICAgICAgIGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbXCJwYXJlbnQuaWRcIl07XG4gICAgbGV0IGF0dHJpYnV0ZSA9ICAgICAgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVthdHRyaWJ1dGVOYW1lXSBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coYFR5cGUgc3lzdGVtIG5hbWUgaXMgJHt0eXBlU3lzdGVtTmFtZX1gKTtcbiAgICBjb25zb2xlLmxvZyhgUGFyZW50IElkIGlzICR7cGFyZW50SWR9YCk7XG4gICAgY29uc29sZS5sb2coYEF0dHJpYnV0ZSBbJHthdHRyaWJ1dGVOYW1lfV0gaXMgJHthdHRyaWJ1dGV9YCk7XG5cbiAgICByZXRWYWx1ZS52YWx1ZSA9IGF0dHJpYnV0ZTtcbiAgICBpZihhdHRyaWJ1dGUpe1xuICAgICAgICByZXRWYWx1ZS5mb3VuZCA9IHRydWU7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kSW5Xb3JrSXRlbUlkID0gd29ya0l0ZW1JZDtcbiAgICAgICAgcmV0VmFsdWUuZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZSA9IHR5cGVTeXN0ZW1OYW1lO1xuICAgIH1cbiAgICByZXRWYWx1ZS5wYXJlbnRJZCA9IHBhcmVudElkO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIFxufSIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHsgSVNoYXJlZG9CbGFkZU1vZGVsLCBUU2hhcmVEb0JsYWRlLCBJQ29uZmlndXJhdGlvbkhvc3QgfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9TaGFyZWRvQXNwZWN0TW9kZWxzXCI7XG5pbXBvcnQgeyBJRGVidWcsIE9ic2VydmFibGVJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IFRTaGFyZWRvIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvVFNoYXJlZG9cIjtcbmltcG9ydCB7IEV2ZW50VG9SZWFjdFRvLCBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnLCBJV2lkZ2V0SnNvbiwgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9JV2lkZ2V0SnNvblwiO1xuaW1wb3J0IHsgU2hhcmVEb0V2ZW50LCBmaXJlRXZlbnQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0V2ZW50c0hlbHBlclwiO1xuaW1wb3J0IHsgY2xlYXJTZWMsIGVyciwgaW5mLCBsLCBsaDEsIG52LCB3cm4gfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0xvZ1wiXG5pbXBvcnQgeyBJRm9ybUJ1aWxkZXJEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvQXNwZWN0L0lGb3JtQnVpbGRlclwiO1xuaW1wb3J0IHsgVFVzZXJFcnJvcnMgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9hcGlcIjtcbmltcG9ydCB7IE5lc3RlZE9ic2VydmFibGVPYmplY3QsIHRvT2JzZXJ2YWJsZU9iamVjdCB9IGZyb20gXCIuL0tPQ29udmVydGVyXCI7XG5pbXBvcnQgeyBnZXROZXN0ZWRQcm9wZXJ0eSwgZ3Zrbywgc2V0TmVzdGVkUHJvcGVydHksIHN0clRvQ2xhc3MgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL09iamVjdEhlbHBlclwiO1xuaW1wb3J0IHsgZXNjYXBlSHRtbCB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgSnNvblRvSHRtbENvbnZlcnRlciB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vSnNvblRvSFRNTENvbnZlcnRlclwiO1xuaW1wb3J0IHsgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHNcIjtcbmltcG9ydCB7IERFQlVHX0RFRkFVTFQgfSBmcm9tIFwiLi9EZWJ1Z0RlZmF1bHRzXCI7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IGNvbG9yIGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCJqcXVlcnlcIjtcblxuXG5jb25zb2xlLmxvZyhcInY6IC0gMy4yOVwiKVxuXG5leHBvcnQgY29uc3QgRk9NUl9CVUlMREVSX1BBVEhfU1RSSU5HID0gXCJhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhXCI7XG5leHBvcnQgY29uc3QgRVJST1JfRElWX1NFTEVDVE9SID0gXCIjcmVuZGVyLWVycm9ycy1oZXJlXCI7XG5cblxuaW50ZXJmYWNlIElERUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIG1vZGVsOiBJU2hhcmVkb0JsYWRlTW9kZWw7XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGU7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZWlmeTxUPiA9IHtcbiAgICBbUCBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW1BdPjtcbn07XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczI8VENvbmZpZz4gPVxuICAgIHsgW0sgaW4ga2V5b2YgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XToga28uT2JzZXJ2YWJsZTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5bS10+OyB9XG5cblxuZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZVNoYXJlZG9Db25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4+XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPj5cblxuXG5cbi8vIGV4cG9ydCB0eXBlIElPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSAge2RlYnVnOiBrby5PYnNlcnZhYmxlPE9ic2VydmFibGVJRGVidWc+fSAmXG4vLyB7XG4vLyAgICAgW0sgaW4ga2V5b2YgVENvbmZpZ106IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VENvbmZpZz5bS107XG5cbi8vIH1cblxuZXhwb3J0IHR5cGUgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+ID0gSUNvbmZpZ3VyYXRpb25Ib3N0ICYgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG4vLyBhYnN0cmFjdCBjbGFzcyBDcmVhdG9yPFRDb25maWc+IHtcbi8vICAgICBwdWJsaWMgYWJzdHJhY3QgRmFjdG9yeU1ldGhvZChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+LCBiYXNlTW9kZWw6IGFueSk6IGFueTtcbi8vIH1cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1CdWlsZGVyRmllbGRQYXRoKGZvcm1CdWlsZGVyRmllbGQ6IHN0cmluZykge1xuICAgIHJldHVybiBgJHtGT01SX0JVSUxERVJfUEFUSF9TVFJJTkd9LiR7Zm9ybUJ1aWxkZXJGaWVsZH1gO1xufVxuXG50eXBlIE9ic2VydmFibGVQZXJzb248VENvbmZpZz4gPSBPYnNlcnZhYmxlaWZ5PElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPj47XG5cbmludGVyZmFjZSBJTW9kZWwge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VJREVBc3BlY3Q8VENvbmZpZywgVFBlcnNpdGFuY2U+ICB7XG4gICAgX2RhdGE6IGFueTsgLy9ub24gbW9kZWwgZGF0YSBzdG9yYWdlXG4gICAgb3JpZ2luYWxDb25maWd1cmF0aW9uITogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgY29uZmlndXJhdGlvbjogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPiB8IHVuZGVmaW5lZDtcbiAgICBzaGFyZWRvQ29uZmlndXJhdGlvbiE6IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICBkZWZhdWx0czogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPiB8IHVuZGVmaW5lZDtcbiAgICBlbGVtZW50ITogSFRNTEVsZW1lbnQ7XG4gICAgbW9kZWw6IElNb2RlbCB8IHVuZGVmaW5lZDtcbiAgICAvLyBlbmFibGVkITogYm9vbGVhbjtcbiAgICBibGFkZTogVFNoYXJlRG9CbGFkZSB8IHVuZGVmaW5lZDtcbiAgICBsb2FkZWQhOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNoYXJlZG9JZCE6IGtvLk9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBwYXJlbnRTaGFyZWRvSWQhOiBrby5PYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIToga28uT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIHBoYXNlTmFtZSE6IGtvLk9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBwaGFzZUlzT3BlbiE6IGtvLk9ic2VydmFibGU8Ym9vbGVhbiB8IHVuZGVmaW5lZD47XG4gICAgdmFsaWRhdGlvbjogYW55O1xuICAgIHZhbGlkYXRpb25FcnJvckNvdW50IToga28uT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGJhc2VNb2RlbCE6IFRTaGFyZWRvPGFueT47XG4gICAgdGhpc0NvbXBvbmVudE5hbWUhOiBzdHJpbmc7XG4gICAgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhOiBzdHJpbmcgfCB1bmRlZmluZWQ7IC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbVxuICAgIHNoYXJlRG9PcHRpb25zITogT2JzZXJ2YWJsZVNoYXJlZG9Db25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPlxuICAgIF9zaGFyZURvT3B0aW9ucyE6IE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8dW5rbm93bj4gLy91c2UgZm9yIHR5cGluZ3Mgb2YgdGhpcyBiYXNlIGlkZSBhcyBUQ29uZmlnIGNhdXNlZCBpc3N1ZVxuICAgIG9wdGlvbnM6IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+PiB8IHVuZGVmaW5lZFxuICAgIF9vcHRpb25zOiBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8SURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzx1bmtub3duPj4gfCB1bmRlZmluZWRcbiAgICB1bmlxdWVJZCE6IHN0cmluZztcbiAgICB3aWRnZXRTZXR0aW5ncyE6IElXaWRnZXRKc29uPFRDb25maWc+O1xuICAgIGFzcGVjdExvZ091dHB1dDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgbGl2ZUNvbmZpZ0RpdjogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgbGl2ZUNvbmZpZ0RhdGE6IGFueTtcbiAgICBlcnJvckRpdlNlbGVjdG9yOiBzdHJpbmc7XG4gICAgZXJyb3JzOiBrby5PYnNlcnZhYmxlQXJyYXk8VFVzZXJFcnJvcnM+IHwgdW5kZWZpbmVkO1xuICAgIHJlZnJlc2hMb2c6IEFycmF5PGFueT47XG4gICAgbGFzdFJlZnJlc2g6IERhdGUgfCB1bmRlZmluZWQ7XG4gICAgZGlzcG9zYWJsZXM6IEFycmF5PGFueT47XG5cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEJhc2UgQ29uc3RydWN0b3IgZm9yIGFsbCBJREVBc3BlY3RzLCBmb3JjZXMgdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsb2FkIGFuZCBzYXZlIG1ldGhvZHNcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50TmFtZSAvL1RoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBBc3BlY3QuUXVpY2tWaWV3XG4gICAgICogQHBhcmFtIGxvYWRTYXZlTG9jYXRpb24gLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tIGUuZy4gbW9kZWwuYXNwZWN0LkZvcm1CdWlsZGVyLmZvcm1EYXRhXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLy9UaGUgZWxlbWVudCB0aGF0IHRoZSBhc3BlY3QgaXMgYm91bmQgdG9cbiAgICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbiAvL1RoZSBjb25maWd1cmF0aW9uIHBhc3NlZCBpbiBmcm9tIHRoZSBibGFkZSBhbmQgdGhlIGRlc2lnbiB0aW1lIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gYmFzZU1vZGVsIC8vVGhlIGJhc2UgbW9kZWwgcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlXG4gICAgICogQHBhcmFtIGRlZmF1bHRzIC8vVGhlIGRlZmF1bHRzIHBhc3NlZCBpbiBmcm9tIHRoZSB3aWRnZXQgdG8gc2V0IGluY2FzZSBvZiBiYWQgY29uZmlndXJhdGlvbiBvciBtaXNzaW5nIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpO1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBUQ29uZmlnLCBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT4pXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKC4uLmFycjogYW55W10pIHtcblxuICAgICAgICB0aGlzLndpZGdldFNldHRpbmdzID0gdGhpcy5zZXRXaWRnZXRKc29uU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy50aGlzQ29tcG9uZW50TmFtZSA9IHRoaXMuc2V0VGhpc0NvbXBvbmVudE5hbWUoKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHRoaXMuc2V0RGVmYXVsdHMoKTsgLy9zZXR1cCB0aGUgZGVmYXVsdCBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5yZWZyZXNoTG9nID0gbmV3IEFycmF5PGFueT4oKVxuXG4gICAgICAgIHRoaXMuZXJyb3JEaXZTZWxlY3RvciA9IEVSUk9SX0RJVl9TRUxFQ1RPUjtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBrby5vYnNlcnZhYmxlQXJyYXk8VFVzZXJFcnJvcnM+KCk7XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgYmFzZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY29uc3RydWN0b3IgdGhhdCBpcyBjYWxsZWQgYnkgdGhlIElERVxuICAgICAgICAgICAgdGhpcy51bmlxdWVJZCA9IHV1aWQoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGlzZShhcnJbMF0sIGFyclsxXSwgYXJyWzJdKTtcbiAgICAgICAgICAgIC8vIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25TZXR1cFwiLCB0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KFwiYWZ0ZXJTZXR1cFwiLCB0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBMaXZlQ29uZmlnKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwRXZlbnRXYXRjaGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwRXJyb3JNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLmFkZEFzcGVjdExvZ091dHB1dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBfaW5pdGlhbGlzZShlbGVtZW50OiBIVE1MRWxlbWVudCwgcG9sdXRlZENvbmZpZ3VyYXRpb246IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+LCBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT4pIHtcblxuICAgICAgICAvL2xldCBjb25maWd1cmF0aW9uID0gcG9sdXRlZENvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbjsgLy9Qb2x1dGVkIGFzIFNoYXJlZG8gYWRkZWQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiB0byB0aHNpIG9iamVjdCBkZXBlbmRpbmcgb24gd2hlcmUgaXRzIGluc3RhbnNpYXRlZFxuICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uID0gcG9sdXRlZENvbmZpZ3VyYXRpb247XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIC8vU2hhcmVEbyBwYXNzZXMgdGhlIGNvbmZpZyBhcyB3ZWxsIGFzIG90aGVyIHN0dWZmLCBzbyB3ZSBuZWVkIHRvIGV4dHJhY3QgdGhlIGNvbmZpZ1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbiA9IHBvbHV0ZWRDb25maWd1cmF0aW9uXG4gICAgICAgIHRoaXMuYmFzZU1vZGVsID0gYmFzZU1vZGVsO1xuXG4gICAgICAgIC8vIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uXG5cbiAgICAgICAgLy8gbGV0IGJhc2VEZWZhdWx0czogSURlZmF1bHRDb25maWdTZXR0aW5nczxhbnk+ID0ge1xuICAgICAgICAvLyAgICAgZGVidWc6IHtcbiAgICAgICAgLy8gICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICBsb2dUb0NvbnNvbGU6IGZhbHNlLFxuICAgICAgICAvLyAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2UsXG4gICAgICAgIC8vICAgICAgICAgbGl2ZUNvbmZpZzogZmFsc2VcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vY2hlY2sgdGhhdCB3ZSBoYXZlIGEgc3ViIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBjb25maWd1cmF0aW9uIGZvdW5kIGluIHRoZSBzaGFyZWRvQ29uZmlndXJhdGlvbiAtIGNoZWNrIHRoZSBhc3BlY3Qgb3Igd2lkZ2V0IGNvbmZpZyB0aGF0IHRoZXIgZWlzIGEgYmFzZSBjb25maWd1cmF0aW9uIG9mIGNvbmZpZ3VyYXRpb246e31cIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbmZpZ3VyYXRpb24gZm91bmQgaW4gdGhlIHNoYXJlZG9Db25maWd1cmF0aW9uXCIpO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24uZGVidWcgPSAkLmV4dGVuZChERUJVR19ERUZBVUxUKCksIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnOyAvL21ha2Ugc3VyZSBkZWJ1ZyBpcyBzZXQgb3IgdXNlIGRlZmF1bHRzXG4gICAgICAgIC8vIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoYmFzZURlZmF1bHRzLmRlYnVnLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnO1xuICAgICAgICAvLyBjb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoYmFzZURlZmF1bHRzLCBjb25maWd1cmF0aW9uLmRlYnVnKSBhcyBJRGVidWc7XG5cblxuICAgICAgICAvLyB0aGlzLmRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIE1lcmdlIHRoZSBjb25maWd1cmF0aW9uIHdpdGggdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbiA9ICQuZXh0ZW5kKHRoaXMuZGVmYXVsdHMsIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24pXG5cblxuXG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IG1vZGVsXG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbDtcbiAgICAgICAgLy8gdGhpcy5lbmFibGVkID0gdGhpcy5tb2RlbD8uY2FuRWRpdDtcbiAgICAgICAgdGhpcy5ibGFkZSA9IHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/LmJsYWRlO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IHRoaXMubG9hZGVkIHx8IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICAvLyBNYXAgdGhlIGJhc2UgbW9kZWwgcHJvcGVydGllc1xuICAgICAgICB0aGlzLnNoYXJlZG9JZCA9IHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsLmlkIHx8ICR1aS5wYWdlQ29udGV4dD8uc2hhcmVkb0lkIHx8IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9JZCB8fCB0aGlzLnNoYXJlZG9JZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9JZCBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lID0gdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw/LnNoYXJlZG9UeXBlU3lzdGVtTmFtZSB8fCAkdWkucGFnZUNvbnRleHQ/LnNoYXJlZG9UeXBlTmFtZSB8fCBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgfHwgIXRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIGZvdW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXJlbnRTaGFyZWRvSWQgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8ucGFyZW50U2hhcmVkb0lkIHx8IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5waGFzZU5hbWUgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8ucGhhc2VOYW1lIHx8ICR1aS5wYWdlQ29udGV4dD8ucGhhc2VOYW1lIHx8IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5waGFzZUlzT3BlbiA9IHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsPy5waGFzZUlzT3BlbiB8fCAkdWkucGFnZUNvbnRleHQ/LnBoYXNlSXNPcGVuIHx8IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgLy8gdGhpcy5zaGFyZURvT3B0aW9ucyA9IHRvT2JzZXJ2YWJsZU9iamVjdCh0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLCB0aGlzLnNoYXJlRG9PcHRpb25zKTtcbiAgICAgICAgLy8gdGhpcy5fc2hhcmVEb09wdGlvbnMgPSB0aGlzLnNoYXJlRG9PcHRpb25zIGFzIE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8dW5rbm93bj5cblxuICAgICAgICAvLyBWYWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvckNvdW50ID0gdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCB8fCBrby5vYnNlcnZhYmxlKDApO1xuXG4gICAgICAgIHRoaXMuYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbik7XG4gICAgICAgIC8vc2V0dXAgdGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbSBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIC8vISAtLT4gTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhIDwtLSAtIHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBhdCB0aGUgZW5kIG9mIHRoaXMgZnVuY3Rpb24gdG8gZW5zdXJlIHRoYXQgdGhlIG9wdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb24gZGF0YSBpcyBhdmFpbGFiZWwgdG8gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTsgXG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25Jbml0aWFsaXNlXCIsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz4pIHtcblxuICAgICAgICBsZXQgY29uZmlndXJhdGlvbkFzT2JzZXJ2YWJsZXMgPSB0b09ic2VydmFibGVPYmplY3QoY29uZmlndXJhdGlvbiwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbjtcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBjb25maWd1cmF0aW9uQXNPYnNlcnZhYmxlcztcbiAgICAgICAgLy8gISBOb3RlIGxpbmUgYmVsb3cgaXMgZm9yIHR5cGluZyB3aXRoaW4gdGhlIElERUJhc2UsIHRoZSBsaW5lIGFib3ZlIGlzIGZvciB0eXBpbmcgd2l0aGluIHRoZSBjaGlsZCBjbGFzc1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gY29uZmlndXJhdGlvbkFzT2JzZXJ2YWJsZXMgYXMgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8dW5rbm93bj4+O1xuICAgICBcbiAgICB9XG5cbiAgICBjbGVhckVycm9ycygpIHtcbiAgICAgICAgdGhpcy5lcnJvcnM/LnJlbW92ZUFsbCgpO1xuICAgIH1cblxuICAgIHNldHVwRXJyb3JNYW5hZ2VyKCkge1xuXG4gICAgICAgIHRoaXMubChcIlNldHRpbmcgdXAgZXJyb3IgbWFuYWdlclwiKTtcbiAgICAgICAgdGhpcy5lcnJvcnM/LnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5mKFwiRXJyb3JzIGNoYW5nZWRcIiwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5idWlsZEVycm9yRGl2KCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc2V0dXBMaXZlQ29uZmlnKCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zPy5kZWJ1Zy5zdWJzY3JpYmUoKG5ld1ZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZS5saXZlQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUxpdmVDb25maWcobmV3VmFsdWUubGl2ZUNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICB0aGlzLmFjdGl2YXRlTGl2ZUNvbmZpZyh0aGlzLl9vcHRpb25zPy5kZWJ1ZygpLmxpdmVDb25maWcoKSk7IC8vVE9ETyBmaXggdHlwaW5nc1xuICAgIH1cblxuICAgIGFjdGl2YXRlTGl2ZUNvbmZpZyhhY3RpdmU6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZUNvbmZpZ0Rpdj8ucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXZlQ29uZmlnRGl2KSB7IC8vbGVhdmUgYWxvbmUgaWYgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubChcIlNldHRpbmcgdXAgbGl2ZSBjb25maWdcIik7XG5cbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZERhdGEgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJfaG9zdFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSwgNCk7XG5cbiAgICAgICAgLy9jbG9uZSB0aGUgY29uZmlnXG4gICAgICAgIGxldCBjb25maWcgPSBrby5vYnNlcnZhYmxlKHNlcmlhbGl6ZWREYXRhKTtcblxuICAgICAgICB0aGlzLmxpdmVDb25maWdEYXRhID0ge1xuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHRpbWVvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG5cbiAgICAgICAgdGhpcy5saXZlQ29uZmlnRGl2ID0gdGhpcy5jcmVhdGVMaXZlQ29uZmlnRGl2KCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnByZXBlbmQodGhpcy5saXZlQ29uZmlnRGl2KTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbmZpZy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUaGUgbmV3IHZhbHVlIGlzIFwiICsgbmV3VmFsdWUpXG5cbiAgICAgICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdDb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZygpKVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKG5ld0NvbmZpZy5jb25maWd1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlZnJlc2gobmV3Q29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZXNldChuZXdDb25maWcpO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHRydWU7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAzMDAwKTtcblxuXG4gICAgICAgIC8vIGtvLmFwcGx5QmluZGluZ3ModGhpcy5saXZlQ29uZmlnRGF0YSwgdGhpcy5saXZlQ29uZmlnRGl2KTt4XG5cbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG5cbiAgICBlbnN1cmVTdHlsZXNMb2FkZWQoaHJlZjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlua1tocmVmPVwiJHtocmVmfVwiXWApKSB7XG4gICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAgICAgbGluay5ocmVmID0gaHJlZjtcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVMaXZlQ29uZmlnRGl2KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBvdXRlciA8ZGl2PiB3aXRoIGNsYXNzIFwiY29sLXNtLTEyIGZvcm1idWlsZGVyLWVkaXRvci1qc29uXCJcbiAgICAgICAgY29uc3Qgb3V0ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgb3V0ZXJEaXYuY2xhc3NOYW1lID0gJ2NvbC1zbS0xMiBmb3JtYnVpbGRlci1lZGl0b3ItanNvbic7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBpbm5lciA8ZGl2PiB3aXRoIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlc1xuICAgICAgICBjb25zdCBpbm5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpbm5lckRpdi5pZCA9ICdsaXZlQ29uZmlnJztcbiAgICAgICAgaW5uZXJEaXYuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCB0ZXh0YXJlYSc7XG4gICAgICAgIGlubmVyRGl2LnN0eWxlLmhlaWdodCA9ICczMDBweCc7XG4gICAgICAgIC8vIGlubmVyRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgJ3N5bnRheEVkaXRvcjogbGl2ZUNvbmZpZ0RhdGEuY29uZmlnLCBlbmFibGU6IHRydWUsIGV2ZW50OiB7IGZvY3Vzb3V0OiBsaXZlQ29uZmlnRGF0YS5vbkZvY3VzT3V0IH0nKTtcbiAgICAgICAgaW5uZXJEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCAnc3ludGF4RWRpdG9yOiBsaXZlQ29uZmlnRGF0YS5jb25maWcnKTtcbiAgICAgICAgLy8gaW5uZXJEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCAnc3ludGF4RWRpdG9yOiBtb2RlbC5jb25maWcnKTtcbiAgICAgICAgLy8gQXBwZW5kIHRoZSBpbm5lckRpdiB0byB0aGUgb3V0ZXJEaXZcbiAgICAgICAgb3V0ZXJEaXYuYXBwZW5kQ2hpbGQoaW5uZXJEaXYpO1xuXG4gICAgICAgIHJldHVybiBvdXRlckRpdjtcbiAgICB9XG5cbiAgICBzZXR1cEV2ZW50V2F0Y2hlcigpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucz8uZXZlbnRzVG9SZWFjdFRvKCk/LmZvckVhY2goKGV2ZW50VG9XYXRjaCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWJzY3JpYmluZyB0byBldmVudFwiLCBldmVudFRvV2F0Y2gpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICR1aS5ldmVudHMuc3Vic2NyaWJlKGV2ZW50VG9XYXRjaC5ldmVudFBhdGgoKSwgKGU6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudChldmVudFRvV2F0Y2guZXZlbnRQYXRoKCksIGV2ZW50VG9XYXRjaC5tZXRob2RUb0NhbGwoKSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcykpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGxldCByZWZyZXNoT24gPSBrby50b0pTKHRoaXMuX29wdGlvbnM/LnJlZnJlc2hPbigpKTtcbiAgICAgICAgaWYgKHJlZnJlc2hPbikge1xuXG4gICAgICAgICAgICBpZiAocmVmcmVzaE9uLnNoYXJlZG9JZENoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkb0lkLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudChcInNoYXJlZG9JZENoYW5nZWRcIiwgXCJyZWZyZXNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZWZyZXNoT24uc2hhcmVkb1BhcmVudElkQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTaGFyZWRvSWQuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50KFwic2hhcmVkb1BhcmVudElkQ2hhbmdlZFwiLCBcInJlZnJlc2hcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlZnJlc2hPbi5zaGFyZWRvUGhhc2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBoYXNlTmFtZS5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb21wb25lbnQoXCJzaGFyZWRvUGhhc2VDaGFuZ2VkXCIsIFwicmVmcmVzaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJlZnJlc2hDb21wb25lbnQoZXZlbnRQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQsIG1ldGhvZFRvQ2FsbDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaExvZyA9IHRoaXMucmVmcmVzaExvZyB8fCBbXTtcbiAgICAgICAgaWYgKHRoaXMubGFzdFJlZnJlc2gpIC8vVE9ETzogY2hhbmdlIHRoaXMgc28gd2UgY29sbGVjdCBhbGwgcmVmcmVzaGVzIGFuZCBkbyB0aGVtIGluIG9uZSBnb1xuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2ggPSAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmxhc3RSZWZyZXNoLmdldFRpbWUoKSkgLyAxMDA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlY29uZHMgc2luY2UgbGFzdCByZWZyZXNoXCIsIHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoKTtcbiAgICAgICAgICAgIGlmIChzZWNvbmRzU2luY2VMYXN0UmVmcmVzaCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyByZWZyZXNoLCB0b28gc29vblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RSZWZyZXNoID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIGNvbXBvbmVudFwiKTtcbiAgICAgICAgbGV0IGxvZ0l0ZW0gPSB7IGV2ZW50UGF0aDogZXZlbnRQYXRoLCBtZXRob2RUb0NhbGw6IG1ldGhvZFRvQ2FsbCwgdGltZTogbmV3IERhdGUoKSwgc3VjY2VzczogZmFsc2UgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChtZXRob2RUb0NhbGwpIHtcbiAgICAgICAgICAgICAgICAvLyBsZXQgcGFyYW1zID0gd2lkZ2V0cy5wYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXhlY3V0aW5nIG1ldGhvZFwiLCBtZXRob2RUb0NhbGwpO1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRUb1JlZnJlc2ggPSAodGhpcyBhcyBhbnkpO1xuICAgICAgICAgICAgICAgIGlmICghY29tcG9uZW50VG9SZWZyZXNoW21ldGhvZFRvQ2FsbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE1ldGhvZCBub3QgZm91bmQgb24gY29tcG9uZW50ICR7dGhpcy50aGlzQ29tcG9uZW50TmFtZX1gLCBtZXRob2RUb0NhbGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFRvUmVmcmVzaFttZXRob2RUb0NhbGxdKCk7IC8vdG9kbzogcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG5cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGxvZ0l0ZW0uc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hMb2cucHVzaChsb2dJdGVtKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYnVpbGRFcnJvckRpdigpIHtcbiAgICAgICAgdGhpcy5pbmYoXCJCdWlsZGluZyBlcnJvciBkaXZcIilcbiAgICAgICAgbGV0IGVycm9yRGl2ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lcnJvckRpdlNlbGVjdG9yKTtcbiAgICAgICAgaWYgKCFlcnJvckRpdikge1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsKFwiZXJyb3JEaXYuaW5uZXJIVE1MXCIpXG4gICAgICAgIGVycm9yRGl2LmlubmVySFRNTCA9IFwiXCI7IC8vY2xlYW4gb3V0IHRoZSBkaXZcblxuICAgICAgICBpZiAoIXRoaXMuZXJyb3JzKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IGtvLm9ic2VydmFibGVBcnJheTxUVXNlckVycm9ycz4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lcnJvcnMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlcnJvckNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVycm9yRGl2LmFwcGVuZENoaWxkKGVycm9yQ29udGFpbmVyRGl2KTtcblxuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItY29udGFpbmVyXCI7XG4gICAgICAgIGxldCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRpdGxlRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci10aXRsZVwiO1xuICAgICAgICB0aXRsZURpdi5pbm5lclRleHQgPSBcIlRoZXJlIGhhcyBiZWVuIGFuIGVycm9yOlwiO1xuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG4gICAgICAgIGxldCBmb3JlYWNoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZXJyb3JDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZm9yZWFjaERpdik7XG5cbiAgICAgICAgdGhpcy5lcnJvcnMoKS5mb3JFYWNoKChlcnJvcikgPT4ge1xuXG4gICAgICAgICAgICBsZXQgdXNlck1lc3NhZ2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdXNlck1lc3NhZ2VEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXVzZXItbWVzc2FnZVwiO1xuICAgICAgICAgICAgdXNlck1lc3NhZ2VEaXYuaW5uZXJIVE1MID0gZXJyb3IudXNlck1lc3NhZ2U7XG5cblxuXG4gICAgICAgICAgICB1c2VyTWVzc2FnZURpdi5vbmNsaWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgYSBkaXYgdGhhdCBjYW4gc2NvbGxcbiAgICAgICAgICAgICAgICBsZXQgZGV0YWlsZWRNZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBkZXRhaWxlZE1lc3NhZ2VEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWRldGFpbGVkLW1lc3NhZ2VcIjtcblxuXG4gICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGVzY2FwZUh0bWwoZXJyb3IuY29kZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXNjYXBlSHRtbChlcnJvci5tZXNzYWdlIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJNZXNzYWdlID0gZXNjYXBlSHRtbChlcnJvci51c2VyTWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvclN0YWNrID0gZXNjYXBlSHRtbChlcnJvci5lcnJvclN0YWNrIHx8IFwiXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbEluZm8gPSBKc29uVG9IdG1sQ29udmVydGVyLmNvbnZlcnQoZXJyb3IuYWRkaXRpb25hbEluZm8gfHwge30pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaHRtbCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5FcnJvcjogJHtjb2RlfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5NZXNzYWdlOjwvc3Ryb25nPiAke21lc3NhZ2V9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+VXNlciBNZXNzYWdlOjwvc3Ryb25nPiAke3VzZXJNZXNzYWdlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlN0YWNrOjwvc3Ryb25nPiAke2Vycm9yU3RhY2t9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+QWRkaXRpb25hbCBJbmZvOjwvc3Ryb25nPiAke2FkZGl0aW9uYWxJbmZvfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG5cbiAgICAgICAgICAgICAgICBkZXRhaWxlZE1lc3NhZ2VEaXYuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAgICAgICAgICR1aS5lcnJvckRpYWxvZyhkZXRhaWxlZE1lc3NhZ2VEaXYpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZCh1c2VyTWVzc2FnZURpdik7XG5cbiAgICAgICAgICAgIGlmIChlcnJvci5zdWdnZXN0aW9ucyAmJiBlcnJvci5zdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1Z2dlc3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3Itc3VnZ2VzdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uc0Rpdi5pbm5lckhUTUwgPSBgPGI+U3VnZ2VzdGlvbnM6PC9iPjxici8+JHtlcnJvci5zdWdnZXN0aW9ucy5qb2luKFwiPGJyLz5cIil9YDtcbiAgICAgICAgICAgICAgICBmb3JlYWNoRGl2LmFwcGVuZENoaWxkKHN1Z2dlc3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVycm9yLmFjdGlvbnMgJiYgZXJyb3IuYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGFjdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWFjdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBhY3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5BY3Rpb25zOjwvYj48YnIvPiR7ZXJyb3IuYWN0aW9ucy5qb2luKFwiPGJyLz5cIil9YDtcbiAgICAgICAgICAgICAgICBmb3JlYWNoRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNEaXYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3IuaW50ZXJuYWxTdWdnZXN0aW9ucyAmJiBlcnJvci5pbnRlcm5hbFN1Z2dlc3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJuYWxTdWdnZXN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItaW50ZXJuYWwtc3VnZ2VzdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5JbnRlcm5hbCBTdWdnZXN0aW9uczo8L2I+PGJyLz4ke2Vycm9yLmludGVybmFsU3VnZ2VzdGlvbnMuam9pbihcIjxici8+XCIpfWA7XG4gICAgICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZChpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucz8uZGVidWcoKS5zdXBwb3J0UmVxdWVzdEVuYWJsZWQpIHtcbiAgICAgICAgICAgIGxldCBhY3Rpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgYWN0aW9uRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1zdXBwb3J0LWFjdGlvblwiO1xuICAgICAgICAgICAgZXJyb3JDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uRGl2KTtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1wcmltYXJ5XCI7XG4gICAgICAgICAgICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1iaW5kXCIsXCJjbGljazpjcmVhdGVTdXBwb3J0VGFzayx2aXNpYmxlOm9wdGlvbnMuZGVidWcuLnN1cHBvcnRSZXF1ZXN0RW5hYmxlZFwiKTtcbiAgICAgICAgICAgIGJ1dHRvbi5pbm5lclRleHQgPSBcIkNyZWF0ZSBTdXBwb3J0IFRhc2tcIjtcbiAgICAgICAgICAgIGFjdGlvbkRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG5cblxuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgICAqIEFic3RyYWN0IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gcmVmcmVzaCB0aGUgYXNwZWN0XG4gICAgICAgKiBAcGFyYW0gbmV3Q29uZmlnIFxuICAgICAgICovXG4gICAgYWJzdHJhY3QgcmVmcmVzaChuZXdDb25maWc6IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAqIEFic3RyYWN0IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gcmVzZXQgdGhlIGFzcGVjdCBiYXNlZCBcbiAgICAqIEBwYXJhbSBuZXdDb25maWcgXG4gICAgKi9cbiAgICBhYnN0cmFjdCByZXNldChuZXdDb25maWc6IGFueSk6IHZvaWQ7XG5cbiAgICBhYnN0cmFjdCBsaXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpOnZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0c1xuICAgICAqICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBjb25zdHJ1Y3RvciB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogQHJldHVybnMgRGVmYXVsdHM8VENvbmZpZz5cbiAgICAgKiBAbWVtYmVyb2YgQmFzZUlERUFzcGVjdFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIFxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldERlZmF1bHRzKCk6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz47XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0cyBmb3IgdGhlIHdpZGdldC5qc29uXG4gICAgLy8gICovXG4gICAgLy8gYWJzdHJhY3Qgc2V0RXhhbXBsZUZvck1vZGVsbGVyKCk6IERlZmF1bHRzPFRDb25maWc+O1xuXG4gICAgLyoqXG4gICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gbG9hZCBhbmQgc2F2ZSB0b1xuICAgICogRXhhbXBsZXMgb2YgdGhpcyBhcmU6XG4gICAgKiAtIGFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEue2Zvcm1CdWlsZGVyRmllbGR9XG4gICAgKiAtIGFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXG4gICAgKiAtIHVuZGVmaW5lZCAoaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3MpXG4gICAgKiBAcmV0dXJucyBUaGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gbG9hZCBhbmQgc2F2ZSB0byBPUiB1bmRlZmluZWQgaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3NcbiAgICAqL1xuICAgIGFic3RyYWN0IHNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IGUuZy4gUXVpY2tWaWV3IFxuICAgICAqIFRoaXMgd2lsbCBhbHNvIGJlIHVzZWQgZHVyaW5nIHRoZSBidWlsZCBhbmQgd2lsbCBiZSBhcHBlbmRlZCB3aXRoIHRoZSBCdWlsdCBUYXJnZXQgZS5nLiBJREVBc3BlY3RzLlF1aWNrVmlld1xuICAgICAqL1xuICAgIGFic3RyYWN0IHNldFRoaXNDb21wb25lbnROYW1lKCk6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIGZpcnN0IG1ldGhvZCBvbmNlIHRoZSBjbGFzcyBoYXMgYmVlbiBjb25zdHJ1Y3RlZCwgZGVmYXVsdCBjb250cnVjdG9yIGxvZ2ljIHNob3VsZCBiZSBwbGFjZWQgaGVyZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldHVwKCk6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBzZXR0aW5ncyBmb3IgdGhlIHdpZGdldC5qc29uIHRoYXQgd2lsbCBiZSBnZW5lcmF0ZWRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248VENvbmZpZz47XG5cblxuXG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U2NyaXB0RmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U3R5bGVGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudE1lbnVUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudENvbXBvbmVudEZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldFdpZGdldERlc2lnbmVyU2V0dGluZ3MoKTogSVdpZGdldEpzb25EZXNpZ25lcjtcbiAgICAvLyBhYnN0cmFjdCBzZXRQcmlvcml0eSgpIDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiB0aGUgbW9kZWwgaXMgc2F2ZWQuIE1hbmlwdWxhdGUgdGhlXG4gICAgICogbW9kZWwgYXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgb25TYXZlKG1vZGVsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvblNhdmVcIiwgbW9kZWwpO1xuXG4gICAgICAgIGxldCBkYXRhVG9TYXZlID0gdGhpcy5fZGF0YVxuICAgICAgICB0aGlzLmxvZyhcIlNhdmluZywgbW9kZWwgcGFzc2VkIGluIHdlIG5lZWQgdG8gcGVyc2lzdCB0b1wiLCBcImdyZWVuXCIsIGRhdGFUb1NhdmUpO1xuXG4gICAgICAgIGlmICh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGxvY2F0aW9uIHRvIHNhdmUgZGF0YSB0byBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgZGF0YVRvUGVyc2lzdCA9IHRoaXMuX2RhdGE7XG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIGlmIChjdXJyZW50RGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYEN1cnJlbnQgZGF0YSBhdCBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfSA6YCwgXCJtYWdlbnRhXCIsIGN1cnJlbnREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWN1cnJlbnREYXRhKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmxvZyhcIkRhdGEgZG9lcyBub3QgZXhpc3QsIHdlIHdpbGwgY3JlYXRlXCIsIFwib3JhbmdlXCIpO1xuICAgICAgICAgICAgLy8gIHNldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwge30pO1xuICAgICAgICAgICAgLy8gY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKGBOZXcgZGF0YSB0byBwZXJzaXN0IHRvIGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLCBcImJsdWVcIiwgZGF0YVRvUGVyc2lzdCk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgZGF0YVRvUGVyc2lzdCk7XG5cbiAgICAgICAgdGhpcy5sKFwiRGF0YSBzYXZlZFwiLCBtb2RlbCk7XG5cbiAgICB9O1xuXG4gICAgYXN5bmMgZ2V0RGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9UaGlzIHNlY3Rpb24gaXMgZD11c2UgZHVlIHRvIHR5cGluZyBpc3N1ZSB0aGF0IG5lZWRzIHRvIGJlIHJlc29sdmVkLlxuICAgICAgICAvLyBsZXQgdXNlUGFyZW50cyA9IGd2a28odGhpcy5fb3B0aW9ucy5kYXRhU2V0dGluZ3MoKS5nZXRWYWx1ZVVzaW5nUGFyZW50cykgYXMgYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICAvLyBsZXQgc2hhcmVEb0lkPSBndmtvKHRoaXMuc2hhcmVkb0lkKVxuICAgICAgICAvLyBsZXQgbWF4RGVwdGggPSBndmtvKHRoaXMuX29wdGlvbnMuZGF0YVNldHRpbmdzKCkubWF4RGVwdGgpIGFzIG51bWJlciB8IHVuZGVmaW5lZFxuICAgICAgICAvLyBsZXQgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gZ3Zrbyh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSkgYXMgc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgICAgIC8vZW5kIGFyZWEgb2YgdHlwaW5nIGlzc3VlXG5cbiAgICAgICAgbGV0IHVzZVBhcmVudHMgPSB0aGlzLl9vcHRpb25zPy5kYXRhU2V0dGluZ3MoKS5nZXRWYWx1ZVVzaW5nUGFyZW50cygpXG4gICAgICAgIGxldCBzaGFyZURvSWQgPSB0aGlzLnNoYXJlZG9JZCgpXG4gICAgICAgIGxldCBtYXhEZXB0aCA9IHRoaXMuX29wdGlvbnM/LmRhdGFTZXR0aW5ncygpLm1heERlcHRoKClcbiAgICAgICAgbGV0IExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IGd2a28odGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuXG4gICAgICAgIGlmIChMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBsb2FkIGRhdGEgZnJvbSBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkodGhpcy5tb2RlbCwgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcblxuICAgICAgICBpZiAodGhpcy5fZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmwoXCJEYXRhIGZvdW5kIGF0IGxvY2F0aW9uXCIsIHRoaXMuX2RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGtvLnRvSlModGhpcy5fZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgZGF0YSBvdCBmb3VuZCBpbiB0aGUgY3VycmVudCBtb2RlbCwgbG9vayB2aWEgdGhlIHNlYXJjaFxuICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gdW5kZWZpbmVkICYmIHVzZVBhcmVudHMgPT09IGZhbHNlICYmIHNoYXJlRG9JZCkgLy8hIFRPRE8gRml4IFR5cGluZ3NcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShzaGFyZURvSWQsIExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgZmFsc2UpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5mb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHVuZGVmaW5lZCAmJiB1c2VQYXJlbnRzID09PSB0cnVlKSAvLyEgVE9ETyBGaXggVHlwaW5nc1xuICAgICAgICB7XG5cbiAgICAgICAgICAgIGxldCBpZFRvVXNlciA9IHRoaXMuc2hhcmVkb0lkKCkgfHwgdGhpcy5wYXJlbnRTaGFyZWRvSWQoKTtcblxuICAgICAgICAgICAgaWYgKCFpZFRvVXNlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gaWQgdG8gdXNlIGZvciBzZWFyY2ggYm90aCBzaGFyZWRvSWQgYW5kIHBhcmVudFNoYXJlZG9JZCBhcmUgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShpZFRvVXNlciwgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB1c2VQYXJlbnRzLCBtYXhEZXB0aCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgICBzZXREYXRhKHZhbHVlOiBUUGVyc2l0YW5jZSB8IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIGxldCB2YWx1ZVRvUGVyc2lzdCA9IGtvLnRvSlModmFsdWUpO1xuICAgICAgICBsZXQgcHJldmlvdXNWYWx1ZSA9IGtvLnRvSlModGhpcy5fZGF0YSk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZVRvUGVyc2lzdDtcbiAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VkRXZlbnQoXCJvbkRhdGFCZWZvcmVDaGFuZ2VkXCIsIHsgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZSwgbmV3VmFsdWU6IHZhbHVlVG9QZXJzaXN0IH0pO1xuXG4gICAgICAgIGlmICh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWVUb1NldDogYW55ID0gdmFsdWU7XG4gICAgICAgIC8vIGlmKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLmluY2x1ZGVzKFwiZm9ybUJ1aWxkZXJcIikpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIC8vZm9ybWJ1aWxkZXIgRGF0YSBhbHdheXMgbmVlZCB0byBiZSBzdHJpbmdcbiAgICAgICAgLy8gICAgIHRoaXMubG9nKFwiU2V0dGluZyBmb3JtYnVpbGRlciBkYXRhIC0gY29udmVydGluZyB0byBzdHJpbmdcIiwgXCJncmVlblwiLCB2YWx1ZSlcbiAgICAgICAgLy8gICAgIHZhbHVlVG9TZXQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIC8vICAgICB0aGlzLmxvZyhcImFmdGVyIFNldHRpbmcgZm9ybWJ1aWxkZXIgZGF0YSAtIGNvbnZlcnRlZCB0byBzdHJpbmdcIiwgXCJncmVlblwiLCB2YWx1ZVRvU2V0KVxuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMubG9nKFwiU2V0dGluZyBkYXRhIGF0IGxvY2F0aW9uXCIsIFwiZ3JlZW5cIiwgdmFsdWVUb1NldCk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB0aGlzLl9kYXRhKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkRhdGFDaGFuZ2VkXCIsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuXG4gICAgb25EZXN0cm95KG1vZGVsPzogYW55KSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25EZXN0cm95XCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uRGVzdHJveVwiLCBtb2RlbCk7XG4gICAgICAgICR1aS51dGlsLmRpc3Bvc2UodGhpcy5kaXNwb3NhYmxlcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgVUkgZnJhbWV3b3JrIGFmdGVyIGluaXRpYWwgY3JlYXRpb24gYW5kIGJpbmRpbmcgdG8gbG9hZCBkYXRhXG4gICAgICogaW50byBpdCdzIG1vZGVsXG4gICAgICovXG4gICAgbG9hZEFuZEJpbmQoKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogbG9hZEFuZEJpbmRcIik7XG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIChtb2RlbDphbnkpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSBiYXNlZCBvbiBsb2NhdGlvbiB0byBzYXZlXCIsIFwiZ3JlZW5cIiwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uTG9hZFwiLCB0aGlzLm1vZGVsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgYmVmb3JlIHRoZSBtb2RlbCBpcyBzYXZlZFxuICAgICAqL1xuICAgIG9uQmVmb3JlU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQmVmb3JlU2F2ZVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkJlZm9yZVNhdmVcIiwgbW9kZWwpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgYWZ0ZXIgdGhlIG1vZGVsIGhhcyBiZWVuIHNhdmVkLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJTYXZlKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25BZnRlclNhdmVcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25BZnRlclNhdmVcIiwgbW9kZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIHdoZW4gaXQgcmVsb2FkcyBhc3BlY3QgZGF0YVxuICAgICAqL1xuICAgIG9uUmVsb2FkKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25SZWxvYWRcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25SZWxvYWRcIiwgbW9kZWwpO1xuICAgIH1cblxuXG4gICAgZGVidWdTZXR0aW5ncygpIHtcbiAgICAgICAgbGV0IGRlYnVnU2V0dGluZzogSURlYnVnID0gREVCVUdfREVGQVVMVCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zPy5kZWJ1ZygpKSB7XG4gICAgICAgICAgICBkZWJ1Z1NldHRpbmcgPSBrby50b0pTKHRoaXMuX29wdGlvbnM/LmRlYnVnKCkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVidWdTZXR0aW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGxvZ2dpbmcgZm9yIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRlYnVnIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBcbiAgICAgKiBAcGFyYW0gY29sb3IgXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICovXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZywgY29sb3I/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcblxuXG5cbiAgICAgICAgaWYgKHRoaXMuZGVidWdTZXR0aW5ncygpLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnU2V0dGluZ3MoKS5sb2dUb0NvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSBjb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAvLyBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soKG5ldyBFcnJvcigpKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjICR7dGhpcy50aGlzQ29tcG9uZW50TmFtZX0gLSAke21lc3NhZ2V9YCwgYGNvbG9yOiR7Y29sb3J9YCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Mb2coKTogYm9vbGVhbiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVidWdTZXR0aW5ncygpLmVuYWJsZWQ7XG4gICAgfVxuICAgIGxvZ1RvQ29uc29sZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuTG9nKCkgJiYgdGhpcy5kZWJ1Z1NldHRpbmdzKCkubG9nVG9Db25zb2xlO1xuICAgIH1cbiAgICBsb2dUb0FzcGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuTG9nKCkgJiYgdGhpcy5kZWJ1Z1NldHRpbmdzKCkuc2hvd0luQXNwZWN0XG4gICAgfVxuXG5cbiAgICBpbmYobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChpbmYobWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JuKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwod3JuKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVycihtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG5cbiAgICAgICAgLy9nZXQgdGhlIHByZXZpb3VzIGNhbGxlclxuXG5cblxuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChlcnIobWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbnYobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKG52KG5hbWUsIHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaDEobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChsaDEobWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJTZWMoKSB7XG4gICAgICAgIGNsZWFyU2VjKCk7XG4gICAgfVxuXG4gICAgbChtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQXNwZWN0KCkpIHtcbiAgICAgICAgICAgIGxldCBhc3BlY3RMb2dPdXRwdXQgPSB0aGlzLmFzcGVjdExvZ091dHB1dDtcbiAgICAgICAgICAgIGlmIChhc3BlY3RMb2dPdXRwdXQpIHtcbiAgICAgICAgICAgICAgICBhc3BlY3RMb2dPdXRwdXQuaW5uZXJUZXh0ICs9IGAke21lc3NhZ2V9XFxuYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEFzcGVjdExvZ091dHB1dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ1RvQXNwZWN0KCkpIHsgcmV0dXJuIH07XG5cbiAgICAgICAgdGhpcy5hc3BlY3RMb2dPdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBsZXQgYXNwZWN0TG9nT3V0cHV0ID0gdGhpcy5hc3BlY3RMb2dPdXRwdXQ7XG5cbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LmlkID0gYGFzcGVjdExvZ091dHB1dC0ke3RoaXMudW5pcXVlSWR9YDtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5wYWRkaW5nID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpbiA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5mb250U2l6ZSA9IFwiMTBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuZm9udEZhbWlseSA9IFwibW9ub3NwYWNlXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtd3JhcFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUud29yZFdyYXAgPSBcImJyZWFrLXdvcmRcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuekluZGV4ID0gXCIxMDAwXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3R0b20gPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5yaWdodCA9IFwiMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5MZWZ0ID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5SaWdodCA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luQm90dG9tID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5Ub3AgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSwwLjgpXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucGFkZGluZyA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3hTaGFkb3cgPSBcIjBweCAwcHggNXB4IDBweCByZ2JhKDAsMCwwLDAuNzUpXCI7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnByZXBlbmQoYXNwZWN0TG9nT3V0cHV0KTtcblxuICAgIH1cblxuICAgIGZpcmVFdmVudChldmVudE5hbWU6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgICAgIGxldCBldmVudDogU2hhcmVEb0V2ZW50ID0ge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiB0aGlzLnRoaXNDb21wb25lbnROYW1lICsgXCIuXCIgKyBldmVudE5hbWUsXG4gICAgICAgICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfVxuICAgICAgICBmaXJlRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIGZpcmVWYWx1ZUNoYW5nZWRFdmVudChldmVudE5hbWU6IHN0cmluZywgY2hhbmdlZERhdGE6IHsgcHJldmlvdXNWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55IH0pIHtcbiAgICAgICAgbGV0IGV2ZW50OiBTaGFyZURvRXZlbnQgPSB7XG4gICAgICAgICAgICBldmVudFBhdGg6IHRoaXMudGhpc0NvbXBvbmVudE5hbWUgKyBcIi5cIiArIGV2ZW50TmFtZSxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogZXZlbnROYW1lLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgZGF0YTogY2hhbmdlZERhdGFcbiAgICAgICAgfVxuICAgICAgICBmaXJlRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIEZvcm1idWlsZCBpZiBpdCBleGlzdHMgb3IgY3JlYXRlcyBpdCBpZiBpdCBkb2VzIG5vdFxuICAgICAqIFxuICAgICAqL1xuICAgIGZvcm1idWlsZGVyKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5ibGFkZT8ubW9kZWw/LmFzcGVjdERhdGE/LmZvcm1CdWlsZGVyPy5mb3JtRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIG5vdCBmb3VuZCAtIHdpbGwgY3JlYXRlIHRoZSBwYXRoXCIsIFwiYmx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBmb3VuZFwiLCBcImdyZWVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9FbnN1cmUgdGhlIHBhdGggZXhpc3RzXG4gICAgICAgIGlmICghdGhpcy5ibGFkZSkge1xuICAgICAgICAgICAgLy9UT0RPOiBpZiBubyBibGFkZSB3aGVyZSBpcyBmb3JtIGJ1aWxkZXIgZGF0YVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLmJsYWRlIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVGb3JtYnVpbGRlcih0aGlzLmJsYWRlLm1vZGVsKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5ibGFkZSEubW9kZWwhLmFzcGVjdERhdGEhLmZvcm1CdWlsZGVyIS5mb3JtRGF0YTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuc3VyZXMgdGhlcmUgaXMgYSBmb3JtIGJ1aWxkZXIgaW4gdGhlIHBhc3NlZCBpbiBtb2RlbCBhbmQgcmV0dXJucyBpdFxuICAgICAqIEBwYXJhbSBtb2RlbCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBlbnN1cmVGb3JtYnVpbGRlcihtb2RlbDogYW55KTogSUZvcm1CdWlsZGVyRGF0YSB7XG5cbiAgICAgICAgaWYgKCFtb2RlbD8uYXNwZWN0RGF0YT8uZm9ybUJ1aWxkZXI/LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgbm90IGZvdW5kIC0gd2lsbCBjcmVhdGUgdGhlIHBhdGhcIiwgXCJibHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIGZvdW5kXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Vuc3VyZSB0aGUgcGF0aCBleGlzdHNcblxuICAgICAgICBtb2RlbCA9IG1vZGVsIHx8IHt9O1xuICAgICAgICBtb2RlbC5hc3BlY3REYXRhID0gbW9kZWwuYXNwZWN0RGF0YSB8fCB7fTtcbiAgICAgICAgbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciA9IG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIgfHwgeyBmb3JtRGF0YToge30gfTtcblxuXG4gICAgICAgIHJldHVybiBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhO1xuICAgIH1cblxuXG4gICAgZm9ybWJ1aWxkZXJGaWVsZChmb3JtYnVpbGRlckZpZWxkOiBzdHJpbmcsIHNldFZhbHVlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYnVpbGRlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCEgXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3JtQnVpbGRlciA9IHRoaXMuZm9ybWJ1aWxkZXIoKSE7XG4gICAgICAgIGlmICghZm9ybUJ1aWxkZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gZm9ybUJ1aWxkZXJbZm9ybWJ1aWxkZXJGaWVsZF1cbiAgICAgICAgaWYgKCFmb3VuZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgRm9ybSBidWlsZGVyIGRvZXMgbm90IGNvbnRhaW4gZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGBDcmVhdGluZyBmaWVsZCAke2Zvcm1idWlsZGVyRmllbGR9IGAsIFwiYmx1ZVwiKTtcbiAgICAgICAgICAgIGZvcm1CdWlsZGVyW2Zvcm1idWlsZGVyRmllbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BcmUgd2UgZG9pbmcgYSBzZXRcbiAgICAgICAgaWYgKHNldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgU2V0dGluZyAke2Zvcm1idWlsZGVyRmllbGR9IHRvICR7c2V0VmFsdWV9YCwgXCJncmVlblwiKTtcbiAgICAgICAgICAgIGZvcm1CdWlsZGVyW2Zvcm1idWlsZGVyRmllbGRdID0gc2V0VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gc2V0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRWYWx1ZTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIGNsYXNzIE15Q2xhc3Mge1xuXG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKCk7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBudW1iZXIpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogc3RyaW5nLCBwMjogc3RyaW5nKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IHN0cmluZywgcDI6IHN0cmluZywgcDM6IHN0cmluZyk7XG5cbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IoLi4uYXJyOiBhbnlbXSkge1xuLy8gICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3R3byBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDMpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aHJlZSBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDEpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbmUgYXJndW1lbnQgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyB9XG5cbi8vIGxldCB4ID0gbmV3IE15Q2xhc3MoKSIsImltcG9ydCB7IElEZWJ1ZyB9IGZyb20gXCIuL0lEZWJ1Z1wiO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVJlZnJlc2hPbiB9IGZyb20gXCIuL0lXaWRnZXRKc29uXCI7XG5cbmV4cG9ydCBjb25zdCBERUJVR19ERUZBVUxUID0gKCkgPT4gIHtcblxuICAgIGxldCByZXRWYWx1ZTpJRGVidWcgPSB7XG4gICAgICBzdXBwb3J0UmVxdWVzdEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGxvZ1RvQ29uc29sZTogdHJ1ZSxcbiAgICAgIHNob3dJbkFzcGVjdDogZmFsc2UsXG4gICAgICBsaXZlQ29uZmlnOiBmYWxzZSxcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbHVlO1xuICBcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBSRUZSRVNIX09OX0RFRkFVTFRTIDpJUmVmcmVzaE9uPVxuICB7XG4gICAgc2hhcmVkb0lkQ2hhbmdlZDogZmFsc2UsXG4gICAgc2hhcmVkb1BhcmVudElkQ2hhbmdlZDogZmFsc2UsXG4gICAgc2hhcmVkb1BoYXNlQ2hhbmdlZDogZmFsc2UsXG4gIH1cblxuXG4gIGV4cG9ydCBjb25zdCBEZWZhdWx0RGF0YVNldHRpbmdzOklEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8dW5rbm93bj4gPVxuICB7XG4gICAgZGVidWc6IERFQlVHX0RFRkFVTFQoKSxcbiAgICByZWZyZXNoT246IFJFRlJFU0hfT05fREVGQVVMVFMsXG4gICAgZXZlbnRzVG9SZWFjdFRvOiBbXG4gICAgICB7XG4gICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLnVwZGF0ZWRcIixcbiAgICAgICAgbWV0aG9kVG9DYWxsOiBcInJlZnJlc2hcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLnNoYXJlZG8tdXBkYXRlZFwiLFxuICAgICAgICBtZXRob2RUb0NhbGw6IFwicmVmcmVzaFwiXG4gICAgICB9XG4gICAgXSxcbiAgICBkYXRhU2V0dGluZ3M6IHtcbiAgICAgIGdldFZhbHVlVXNpbmdQYXJlbnRzOiBmYWxzZSxcbiAgICAgIG1heERlcHRoOiAwXG4gICAgfVxuICB9XG4gICIsImltcG9ydCAqIGFzIGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCB7IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uIH0gZnJvbSAnLi9JV2lkZ2V0SnNvbic7XG5cbmV4cG9ydCB0eXBlIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4gPSB7XG4gICAgW0sgaW4ga2V5b2YgVF0gICAgICA6IFRbS10gZXh0ZW5kcyBBcnJheTxpbmZlciBVPiA/IGtvLk9ic2VydmFibGVBcnJheTxOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFU+PiA6XG4gICAgVFtLXSBleHRlbmRzIG9iamVjdCA/IGtvLk9ic2VydmFibGU8TmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUW0tdPj4gOiBrby5PYnNlcnZhYmxlPFRbS10+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZU9iamVjdDxUPihvYmo6IFQsIGV4aXN0aW5nPzogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPik6IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4ge1xuICAgIFxuICAgIGlmKCFleGlzdGluZykgZXhpc3RpbmcgPSB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xuICAgXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGtleSAhPT0gXCJfX2tvX21hcHBpbmdfX1wiICYmIGtleSAhPT0gXCJfaG9zdFwiKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXkgYXMga2V5b2YgVF07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldID0ga28ub2JzZXJ2YWJsZUFycmF5KHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XT1lbnN1cmVJc09ic2VydmFibGVBcnJheShleGlzdGluZywga2V5KVxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IGtvLm9ic2VydmFibGUodG9PYnNlcnZhYmxlT2JqZWN0KHZhbHVlLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiB2YWx1ZT4pKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XSAgPSBlbnN1cmVJc09ic2VydmFibGUoZXhpc3RpbmcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0odG9PYnNlcnZhYmxlT2JqZWN0KCh2YWx1ZSBhcyBhbnkpLCAoZXhpc3Rpbmdba2V5XSgpIGFzIGFueSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAoZXhpc3Rpbmdba2V5XSBhcyBhbnkpID0ga28ub2JzZXJ2YWJsZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XSA9IGVuc3VyZUlzT2JzZXJ2YWJsZShleGlzdGluZywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSgodmFsdWUgYXMgYW55KSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBleGlzdGluZyBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xufVxuZXhwb3J0IGludGVyZmFjZSBJRGVidWcge1xuICAgIHN1cHBvcnRSZXF1ZXN0RW5hYmxlZD86IGJvb2xlYW47XG4gICAgICBlbmFibGVkOiBib29sZWFuO1xuICAgICAgbG9nVG9Db25zb2xlOiBib29sZWFuO1xuICAgICAgc2hvd0luQXNwZWN0OiBib29sZWFuO1xuICAgICAgbGl2ZUNvbmZpZz86IGJvb2xlYW47XG4gICAgfVxuICBcblxuXG5mdW5jdGlvbiBlbnN1cmVJc09ic2VydmFibGUoZXhpc3Rpbmc6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKGV4aXN0aW5nW2tleV0pKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1trZXldIDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBrby5vYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuXG5cblxuZnVuY3Rpb24gZW5zdXJlSXNPYnNlcnZhYmxlQXJyYXkoZXhpc3Rpbmc6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlQXJyYXkoZXhpc3Rpbmdba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nW2tleV0gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IHR5cGUgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBUQ29uZmlnICYge1xuLy8gICAgIGRlYnVnOiBJRGVidWc7XG4vLyAgIH1cblxuLy8gZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0gXG4vLyB7IFtLIGluIGtleW9mIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPl06IGtvLk9ic2VydmFibGU8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdPjsgfVxuXG4vLyBleHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uSG9zdCB7XG4vLyAgICAgX2hvc3Q6IHtcbi8vICAgICAgICAgYmxhZGU6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uQWRkRWRpdFNoYXJlZG87XG4vLyAgICAgICAgIGVuYWJsZWQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47IC8vIFVzaW5nICdhbnknIGZvciByZXR1cm4gdHlwZSBhcyBpdCdzIG5vdCBjbGVhciB3aGF0IHRoZXNlIGZ1bmN0aW9ucyByZXR1cm5cbi8vICAgICAgICAgbW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG87XG4vLyAgICAgfVxuLy8gfVxuXG4vLyBleHBvcnQgdHlwZSBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBJQ29uZmlndXJhdGlvbkhvc3QgJiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcblxuLy8gaW50ZXJmYWNlIFJvb3RPYmplY3Qge1xuLy8gICBsMTogc3RyaW5nO1xuLy8gICBvMTogTzE7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMSB7XG4vLyAgIGwyOiBzdHJpbmc7XG4vLyAgIG8yOiBPMjtcbi8vICAgYTE6IEExW107XG4vLyB9XG5cbi8vIGludGVyZmFjZSBBMSB7XG4vLyAgIGw0OiBzdHJpbmc7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMiB7XG4vLyAgIGwzOiBzdHJpbmc7XG4vLyB9XG4vLyAvLyBOb3cgbGV0J3MgdXNlIHRoZSBmdW5jdGlvbjpcbi8vIGNvbnN0IHg6IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+ID0ge1xuLy8gICAgIGwxOiBcImwxXCIsXG4vLyAgICAgbzE6IHtcbi8vICAgICAgICAgbDI6XCJsMlwiLFxuLy8gICAgICAgICBvMjoge1xuLy8gICAgICAgICAgICAgbDM6IFwibDNcIixcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYTE6IFtcbi8vICAgICAgICAgICAgIHsgbDQ6IFwibDRcIiB9XG4vLyAgICAgICAgIF1cbi8vICAgICB9LFxuLy8gICAgIGRlYnVnOlxuLy8gICAgIHtcbi8vICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4vLyAgICAgICAgIGxvZ1RvQ29uc29sZTogZmFsc2UsXG4vLyAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2Vcbi8vICAgICB9XG4vLyB9XG5cbi8vIGxldCBtIDogIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4+XG5cbi8vIGxldCB5ID0gdG9PYnNlcnZhYmxlT2JqZWN0KHgse30gYXMgYW55KSBhcyAgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0Pj5cblxuLy8gbGV0IHAgPSB5LmRlYnVnKCkubGl2ZUNvbmZpZyEoKVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0KG9iajogYW55LCBleGlzdGluZ09ic2VydmFibGVzPzprby5PYnNlcnZhYmxlPGFueT4pOiBrby5PYnNlcnZhYmxlIHtcbi8vICAgICBjb25zdCByZXN1bHQgPSBleGlzdGluZ09ic2VydmFibGVzIHx8IHt9IGFzIGtvLk9ic2VydmFibGU7XG5cbi8vICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbi8vICAgICAgICAgaWYoa2V5ID09PSBcIl9fa29fbWFwcGluZ19fXCIpIGNvbnRpbnVlO1xuLy8gICAgICAgICBpZihrZXkgPT09IFwiX2hvc3RcIikgY29udGludWU7XG5cbi8vICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbi8vICAgICAgICAgICAgIGxldCBuZXd2ID0gb2JqW2tleV07XG4vLyAgICAgICAgICAgICBsZXQgY3VyciA9IChyZXN1bHQgYXMgYW55KVtrZXldIDtcblxuLy8gICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG5ld3YpICYmIHR5cGVvZiBuZXd2ID09PSBcIm9iamVjdFwiICYmIG5ld3YgIT09IG51bGwgJiYgIWtvLmlzT2JzZXJ2YWJsZShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0gdG9PYnNlcnZhYmxlT2JqZWN0KG5ld3YgYXMgb2JqZWN0KSBcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRvT2JzZXJ2YWJsZU9iamVjdFwiLCAocmVzdWx0IGFzIGFueSlba2V5XSk7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKChyZXN1bHQgYXMgYW55KVtrZXldKTtcbi8vICAgICAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICBpZiAoY3VyciAmJiBrby5pc09ic2VydmFibGVBcnJheShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XShuZXd2KTtcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGVBcnJheShuZXd2KSBhcyBhbnk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgbmV3diA9IG5ld3YoKTsgLy8gcHVsbCBvdXQgdGhlIHZhbHVlXG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChjdXJyICYmIGtvLmlzT2JzZXJ2YWJsZShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldKG5ld3YpOyAvLyB1cGRhdGUgdGhlIGV4aXN0aW5nIG9ic2VydmFibGVcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKG5ld3YpO1xuICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgcmV0dXJuIHJlc3VsdDtcbi8vIH1cbiIsImltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdAZW9uYXNkYW4vdGVtcHVzLWRvbWludXMnO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVdpZGdldEpzb24gfSBmcm9tICcuLi9CYXNlQ2xhc3Nlcy9JV2lkZ2V0SnNvbic7XG5pbXBvcnQgeyBERUJVR19ERUZBVUxUIH0gZnJvbSAnLi4vQmFzZUNsYXNzZXMvRGVidWdEZWZhdWx0cyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnMge1xuICAgIHRpdGxlOiBzdHJpbmcgIHwgdW5kZWZpbmVkOyAvL3RoZSB0aXRsZSB0byBkaXNwbGF5IGFib3ZlIHRoZSBkYXRlIHBpY2tlclxuICAgIGZvcm1CdWlsZGVyRmllbGQ6IHN0cmluZyAgfCB1bmRlZmluZWQ7IC8vdGhlIGZvcm0gYnVpbGRlciBmaWVsZCB0byBnZXQgdGhlIHZhbHVlIGZyb20gYW5kIHNldCB0aGUgdmFsdWUgdG9cbiAgICBwaWNrZXJFbmFibGVkOiBib29sZWFuICB8IHVuZGVmaW5lZDsgLy9pZiB0cnVlLCB0aGUgZGF0ZSBwaWNrZXIgd2lsbCBiZSBlbmFibGVkXG4gICAgZXZlbnRUb0ZpcmVPblVwZGF0ZTogQXJyYXk8c3RyaW5nPiB8IHVuZGVmaW5lZDsgLy90aGUgZXZlbnQgdG8gZmlyZSB3aGVuIHRoZSBkYXRlIGlzIHVwZGF0ZWRcbiAgICBkYXRlUGlja2VyT3B0aW9uczogT3B0aW9ucyAgfCB1bmRlZmluZWQ7IC8vdGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgZGF0ZSBwaWNrZXIgXG4gICAgaGlkZUlucHV0Qm94OiBib29sZWFuICB8IHVuZGVmaW5lZDsgLy9pZiB0cnVlLCB0aGUgaW5wdXQgYm94IHdpbGwgYmUgaGlkZGVuXG4gICAgZGVmYXVsdFZhbHVlOlxuICAgIHtcbiAgICAgICAgZGVmYXVsdERhdGVGcm9tTm93SG91cnM6IG51bWJlciAgfCB1bmRlZmluZWQ7IC8vd2hlbiBubyB2YWx1ZSBpcyBzZXQsIHNldCB0aGUgZGF0ZSB0byBub3cgKyB0aGlzIG51bWJlciBvZiBob3Vyc1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGNvbnN0IERBVEVfUElDS0VSX0RFRkFVTFRTIDogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnM+PVxue1xuICAgICAgICAgIFxuICAgIFwiZm9ybUJ1aWxkZXJGaWVsZFwiOiBcImVEaXNjb3ZlcnlVcGRhdGVQbGFubmVkRGF0ZVwiLFxuICAgIFwiaGlkZUlucHV0Qm94XCI6IHRydWUsXG4gICAgXCJkZWZhdWx0VmFsdWVcIjp7XG4gICAgICAgIFwiZGVmYXVsdERhdGVGcm9tTm93SG91cnNcIjogMjQsXG4gICAgfSxcblxuICAgIFwidGl0bGVcIjogXCJVcGRhdGVkIHBsYW5uZWQgZHVlIGRhdGU6XCIsXG4gICAgXCJwaWNrZXJFbmFibGVkXCI6IHRydWUsXG4gICAgXCJldmVudFRvRmlyZU9uVXBkYXRlXCI6IFtcIklERUFzcGVjdHMuRGF0ZVBpY2tlckFzcGVjdC5VcGRhdGVcIl0sXG4gICAgXG4gICAgXCJkYXRlUGlja2VyT3B0aW9uc1wiOiB7XG4gICAgICAgIFwiZGlzcGxheVwiOiB7XG4gICAgICAgICAgICBcImlubGluZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzaWRlQnlTaWRlXCI6IHRydWUsXG4gICAgICAgICAgICBcInRoZW1lXCI6IFwibGlnaHRcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBcImRlYnVnXCI6IERFQlVHX0RFRkFVTFQoKSxcbiAgICBcInJlZnJlc2hPblwiOiB7XG4gICAgICAgIFwic2hhcmVkb0lkQ2hhbmdlZFwiOiBmYWxzZSxcbiAgICAgICAgXCJzaGFyZWRvUGFyZW50SWRDaGFuZ2VkXCI6IGZhbHNlLFxuICAgICAgICBcInNoYXJlZG9QaGFzZUNoYW5nZWRcIjogZmFsc2UsXG4gICAgfSxcbiAgICBcImV2ZW50c1RvUmVhY3RUb1wiOiBbXSxcbiAgICBcImRhdGFTZXR0aW5nc1wiOiB7XG4gICAgICAgIFwiZ2V0VmFsdWVVc2luZ1BhcmVudHNcIjogZmFsc2UsXG4gICAgICAgIFwibWF4RGVwdGhcIjogMCxcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBEQVRFX1BJQ0tFUl9XSURHRVRfREVGQVVMVFMgOiBJV2lkZ2V0SnNvbjxJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnM+PSB7XG4gICAgdHlwZTogJ3dpZGdldCcsXG4gICAgXCJwcmlvcml0eVwiOiA2MDAwLFxuICAgIFwiZGVzaWduZXJcIjoge1xuICAgICAgICBcImFsbG93SW5Qb3J0YWxEZXNpZ25lclwiOiBmYWxzZSxcbiAgICAgICAgXCJhbGxvd0luU2hhcmVkb1BvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93QXNwZWN0QWRhcHRlclwiOiB0cnVlLFxuICAgICAgICBcInRpdGxlXCI6IFwiRGF0ZSBQaWNrZXIgQXNwZWN0XCIsXG4gICAgICAgIFwiaWNvblwiOiBcImZhLWNvZ1wiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiRGF0ZSBQaWNrZXIgQXNwZWN0XCIsXG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbXSxcbiAgICAgICAgXCJpc0NvbmZpZ3VyYWJsZVwiOiB0cnVlLFxuICAgICAgICBcImNvbmZpZ3VyYXRpb25XaWRnZXRcIjogbnVsbCxcblxuICAgICAgICBcImRlZmF1bHRDb25maWd1cmF0aW9uSnNvblwiOiAgeyBjb25maWd1cmF0aW9uOiBEQVRFX1BJQ0tFUl9ERUZBVUxUU31cbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiBbXSxcbiAgICBcInN0eWxlc1wiOiBbXG4gICAgICAgIFwiRGF0ZVBpY2tlckFzcGVjdC5jc3NcIlxuICAgIF0sXG4gICAgXCJ0ZW1wbGF0ZXNcIjogW1xuICAgICAgICBcIkRhdGVQaWNrZXJBc3BlY3QuaHRtbFwiXG4gICAgXSxcbiAgICBcIm1lbnVUZW1wbGF0ZXNcIjogW10sXG4gICAgXCJjb21wb25lbnRzXCI6IFtdXG59IiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCJpbXBvcnQgYW5zaVN0eWxlcyBmcm9tICcjYW5zaS1zdHlsZXMnO1xuaW1wb3J0IHN1cHBvcnRzQ29sb3IgZnJvbSAnI3N1cHBvcnRzLWNvbG9yJztcbmltcG9ydCB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L29yZGVyXG5cdHN0cmluZ1JlcGxhY2VBbGwsXG5cdHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleCxcbn0gZnJvbSAnLi91dGlsaXRpZXMuanMnO1xuXG5jb25zdCB7c3Rkb3V0OiBzdGRvdXRDb2xvciwgc3RkZXJyOiBzdGRlcnJDb2xvcn0gPSBzdXBwb3J0c0NvbG9yO1xuXG5jb25zdCBHRU5FUkFUT1IgPSBTeW1ib2woJ0dFTkVSQVRPUicpO1xuY29uc3QgU1RZTEVSID0gU3ltYm9sKCdTVFlMRVInKTtcbmNvbnN0IElTX0VNUFRZID0gU3ltYm9sKCdJU19FTVBUWScpO1xuXG4vLyBgc3VwcG9ydHNDb2xvci5sZXZlbGAg4oaSIGBhbnNpU3R5bGVzLmNvbG9yW25hbWVdYCBtYXBwaW5nXG5jb25zdCBsZXZlbE1hcHBpbmcgPSBbXG5cdCdhbnNpJyxcblx0J2Fuc2knLFxuXHQnYW5zaTI1NicsXG5cdCdhbnNpMTZtJyxcbl07XG5cbmNvbnN0IHN0eWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmNvbnN0IGFwcGx5T3B0aW9ucyA9IChvYmplY3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRpZiAob3B0aW9ucy5sZXZlbCAmJiAhKE51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sZXZlbCkgJiYgb3B0aW9ucy5sZXZlbCA+PSAwICYmIG9wdGlvbnMubGV2ZWwgPD0gMykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgbGV2ZWxgIG9wdGlvbiBzaG91bGQgYmUgYW4gaW50ZWdlciBmcm9tIDAgdG8gMycpO1xuXHR9XG5cblx0Ly8gRGV0ZWN0IGxldmVsIGlmIG5vdCBzZXQgbWFudWFsbHlcblx0Y29uc3QgY29sb3JMZXZlbCA9IHN0ZG91dENvbG9yID8gc3Rkb3V0Q29sb3IubGV2ZWwgOiAwO1xuXHRvYmplY3QubGV2ZWwgPSBvcHRpb25zLmxldmVsID09PSB1bmRlZmluZWQgPyBjb2xvckxldmVsIDogb3B0aW9ucy5sZXZlbDtcbn07XG5cbmV4cG9ydCBjbGFzcyBDaGFsayB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG5cdFx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcblx0fVxufVxuXG5jb25zdCBjaGFsa0ZhY3RvcnkgPSBvcHRpb25zID0+IHtcblx0Y29uc3QgY2hhbGsgPSAoLi4uc3RyaW5ncykgPT4gc3RyaW5ncy5qb2luKCcgJyk7XG5cdGFwcGx5T3B0aW9ucyhjaGFsaywgb3B0aW9ucyk7XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGNoYWxrLCBjcmVhdGVDaGFsay5wcm90b3R5cGUpO1xuXG5cdHJldHVybiBjaGFsaztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWxrKG9wdGlvbnMpIHtcblx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcbn1cblxuT2JqZWN0LnNldFByb3RvdHlwZU9mKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgRnVuY3Rpb24ucHJvdG90eXBlKTtcblxuZm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoYW5zaVN0eWxlcykpIHtcblx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgY3JlYXRlU3R5bGVyKHN0eWxlLm9wZW4sIHN0eWxlLmNsb3NlLCB0aGlzW1NUWUxFUl0pLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgc3R5bGVOYW1lLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRcdHJldHVybiBidWlsZGVyO1xuXHRcdH0sXG5cdH07XG59XG5cbnN0eWxlcy52aXNpYmxlID0ge1xuXHRnZXQoKSB7XG5cdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgdGhpc1tTVFlMRVJdLCB0cnVlKTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Zpc2libGUnLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRyZXR1cm4gYnVpbGRlcjtcblx0fSxcbn07XG5cbmNvbnN0IGdldE1vZGVsQW5zaSA9IChtb2RlbCwgbGV2ZWwsIHR5cGUsIC4uLmFyZ3VtZW50c18pID0+IHtcblx0aWYgKG1vZGVsID09PSAncmdiJykge1xuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kxNm0nKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMTZtKC4uLmFyZ3VtZW50c18pO1xuXHRcdH1cblxuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kyNTYnKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMjU2KGFuc2lTdHlsZXMucmdiVG9BbnNpMjU2KC4uLmFyZ3VtZW50c18pKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpKGFuc2lTdHlsZXMucmdiVG9BbnNpKC4uLmFyZ3VtZW50c18pKTtcblx0fVxuXG5cdGlmIChtb2RlbCA9PT0gJ2hleCcpIHtcblx0XHRyZXR1cm4gZ2V0TW9kZWxBbnNpKCdyZ2InLCBsZXZlbCwgdHlwZSwgLi4uYW5zaVN0eWxlcy5oZXhUb1JnYiguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXVttb2RlbF0oLi4uYXJndW1lbnRzXyk7XG59O1xuXG5jb25zdCB1c2VkTW9kZWxzID0gWydyZ2InLCAnaGV4JywgJ2Fuc2kyNTYnXTtcblxuZm9yIChjb25zdCBtb2RlbCBvZiB1c2VkTW9kZWxzKSB7XG5cdHN0eWxlc1ttb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuY29sb3IuY2xvc2UsIHRoaXNbU1RZTEVSXSk7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVCdWlsZGVyKHRoaXMsIHN0eWxlciwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXHR9O1xuXG5cdGNvbnN0IGJnTW9kZWwgPSAnYmcnICsgbW9kZWxbMF0udG9VcHBlckNhc2UoKSArIG1vZGVsLnNsaWNlKDEpO1xuXHRzdHlsZXNbYmdNb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2JnQ29sb3InLCAuLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5iZ0NvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgcHJvdG8gPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcygoKSA9PiB7fSwge1xuXHQuLi5zdHlsZXMsXG5cdGxldmVsOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tHRU5FUkFUT1JdLmxldmVsO1xuXHRcdH0sXG5cdFx0c2V0KGxldmVsKSB7XG5cdFx0XHR0aGlzW0dFTkVSQVRPUl0ubGV2ZWwgPSBsZXZlbDtcblx0XHR9LFxuXHR9LFxufSk7XG5cbmNvbnN0IGNyZWF0ZVN0eWxlciA9IChvcGVuLCBjbG9zZSwgcGFyZW50KSA9PiB7XG5cdGxldCBvcGVuQWxsO1xuXHRsZXQgY2xvc2VBbGw7XG5cdGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wZW5BbGwgPSBvcGVuO1xuXHRcdGNsb3NlQWxsID0gY2xvc2U7XG5cdH0gZWxzZSB7XG5cdFx0b3BlbkFsbCA9IHBhcmVudC5vcGVuQWxsICsgb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlICsgcGFyZW50LmNsb3NlQWxsO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRvcGVuLFxuXHRcdGNsb3NlLFxuXHRcdG9wZW5BbGwsXG5cdFx0Y2xvc2VBbGwsXG5cdFx0cGFyZW50LFxuXHR9O1xufTtcblxuY29uc3QgY3JlYXRlQnVpbGRlciA9IChzZWxmLCBfc3R5bGVyLCBfaXNFbXB0eSkgPT4ge1xuXHQvLyBTaW5nbGUgYXJndW1lbnQgaXMgaG90IHBhdGgsIGltcGxpY2l0IGNvZXJjaW9uIGlzIGZhc3RlciB0aGFuIGFueXRoaW5nXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvblxuXHRjb25zdCBidWlsZGVyID0gKC4uLmFyZ3VtZW50c18pID0+IGFwcGx5U3R5bGUoYnVpbGRlciwgKGFyZ3VtZW50c18ubGVuZ3RoID09PSAxKSA/ICgnJyArIGFyZ3VtZW50c19bMF0pIDogYXJndW1lbnRzXy5qb2luKCcgJykpO1xuXG5cdC8vIFdlIGFsdGVyIHRoZSBwcm90b3R5cGUgYmVjYXVzZSB3ZSBtdXN0IHJldHVybiBhIGZ1bmN0aW9uLCBidXQgdGhlcmUgaXNcblx0Ly8gbm8gd2F5IHRvIGNyZWF0ZSBhIGZ1bmN0aW9uIHdpdGggYSBkaWZmZXJlbnQgcHJvdG90eXBlXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihidWlsZGVyLCBwcm90byk7XG5cblx0YnVpbGRlcltHRU5FUkFUT1JdID0gc2VsZjtcblx0YnVpbGRlcltTVFlMRVJdID0gX3N0eWxlcjtcblx0YnVpbGRlcltJU19FTVBUWV0gPSBfaXNFbXB0eTtcblxuXHRyZXR1cm4gYnVpbGRlcjtcbn07XG5cbmNvbnN0IGFwcGx5U3R5bGUgPSAoc2VsZiwgc3RyaW5nKSA9PiB7XG5cdGlmIChzZWxmLmxldmVsIDw9IDAgfHwgIXN0cmluZykge1xuXHRcdHJldHVybiBzZWxmW0lTX0VNUFRZXSA/ICcnIDogc3RyaW5nO1xuXHR9XG5cblx0bGV0IHN0eWxlciA9IHNlbGZbU1RZTEVSXTtcblxuXHRpZiAoc3R5bGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qge29wZW5BbGwsIGNsb3NlQWxsfSA9IHN0eWxlcjtcblx0aWYgKHN0cmluZy5pbmNsdWRlcygnXFx1MDAxQicpKSB7XG5cdFx0d2hpbGUgKHN0eWxlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBSZXBsYWNlIGFueSBpbnN0YW5jZXMgYWxyZWFkeSBwcmVzZW50IHdpdGggYSByZS1vcGVuaW5nIGNvZGVcblx0XHRcdC8vIG90aGVyd2lzZSBvbmx5IHRoZSBwYXJ0IG9mIHRoZSBzdHJpbmcgdW50aWwgc2FpZCBjbG9zaW5nIGNvZGVcblx0XHRcdC8vIHdpbGwgYmUgY29sb3JlZCwgYW5kIHRoZSByZXN0IHdpbGwgc2ltcGx5IGJlICdwbGFpbicuXG5cdFx0XHRzdHJpbmcgPSBzdHJpbmdSZXBsYWNlQWxsKHN0cmluZywgc3R5bGVyLmNsb3NlLCBzdHlsZXIub3Blbik7XG5cblx0XHRcdHN0eWxlciA9IHN0eWxlci5wYXJlbnQ7XG5cdFx0fVxuXHR9XG5cblx0Ly8gV2UgY2FuIG1vdmUgYm90aCBuZXh0IGFjdGlvbnMgb3V0IG9mIGxvb3AsIGJlY2F1c2UgcmVtYWluaW5nIGFjdGlvbnMgaW4gbG9vcCB3b24ndCBoYXZlXG5cdC8vIGFueS92aXNpYmxlIGVmZmVjdCBvbiBwYXJ0cyB3ZSBhZGQgaGVyZS4gQ2xvc2UgdGhlIHN0eWxpbmcgYmVmb3JlIGEgbGluZWJyZWFrIGFuZCByZW9wZW5cblx0Ly8gYWZ0ZXIgbmV4dCBsaW5lIHRvIGZpeCBhIGJsZWVkIGlzc3VlIG9uIG1hY09TOiBodHRwczovL2dpdGh1Yi5jb20vY2hhbGsvY2hhbGsvcHVsbC85MlxuXHRjb25zdCBsZkluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuXHRpZiAobGZJbmRleCAhPT0gLTEpIHtcblx0XHRzdHJpbmcgPSBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBjbG9zZUFsbCwgb3BlbkFsbCwgbGZJbmRleCk7XG5cdH1cblxuXHRyZXR1cm4gb3BlbkFsbCArIHN0cmluZyArIGNsb3NlQWxsO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY3JlYXRlQ2hhbGsucHJvdG90eXBlLCBzdHlsZXMpO1xuXG5jb25zdCBjaGFsayA9IGNyZWF0ZUNoYWxrKCk7XG5leHBvcnQgY29uc3QgY2hhbGtTdGRlcnIgPSBjcmVhdGVDaGFsayh7bGV2ZWw6IHN0ZGVyckNvbG9yID8gc3RkZXJyQ29sb3IubGV2ZWwgOiAwfSk7XG5cbmV4cG9ydCB7XG5cdG1vZGlmaWVyTmFtZXMsXG5cdGZvcmVncm91bmRDb2xvck5hbWVzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyxcblx0Y29sb3JOYW1lcyxcblxuXHQvLyBUT0RPOiBSZW1vdmUgdGhlc2UgYWxpYXNlcyBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG5cdG1vZGlmaWVyTmFtZXMgYXMgbW9kaWZpZXJzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyBhcyBmb3JlZ3JvdW5kQ29sb3JzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyBhcyBiYWNrZ3JvdW5kQ29sb3JzLFxuXHRjb2xvck5hbWVzIGFzIGNvbG9ycyxcbn0gZnJvbSAnLi92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMnO1xuXG5leHBvcnQge1xuXHRzdGRvdXRDb2xvciBhcyBzdXBwb3J0c0NvbG9yLFxuXHRzdGRlcnJDb2xvciBhcyBzdXBwb3J0c0NvbG9yU3RkZXJyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hhbGs7XG4iLCIvLyBUT0RPOiBXaGVuIHRhcmdldGluZyBOb2RlLmpzIDE2LCB1c2UgYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbGAuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN1YnN0cmluZywgcmVwbGFjZXIpIHtcblx0bGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKTtcblx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBzdHJpbmc7XG5cdH1cblxuXHRjb25zdCBzdWJzdHJpbmdMZW5ndGggPSBzdWJzdHJpbmcubGVuZ3RoO1xuXHRsZXQgZW5kSW5kZXggPSAwO1xuXHRsZXQgcmV0dXJuVmFsdWUgPSAnJztcblx0ZG8ge1xuXHRcdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCwgaW5kZXgpICsgc3Vic3RyaW5nICsgcmVwbGFjZXI7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIHN1YnN0cmluZ0xlbmd0aDtcblx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleChzdHJpbmcsIHByZWZpeCwgcG9zdGZpeCwgaW5kZXgpIHtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRjb25zdCBnb3RDUiA9IHN0cmluZ1tpbmRleCAtIDFdID09PSAnXFxyJztcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIChnb3RDUiA/IGluZGV4IC0gMSA6IGluZGV4KSkgKyBwcmVmaXggKyAoZ290Q1IgPyAnXFxyXFxuJyA6ICdcXG4nKSArIHBvc3RmaXg7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIDE7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZignXFxuJywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cbiIsImNvbnN0IEFOU0lfQkFDS0dST1VORF9PRkZTRVQgPSAxMDtcblxuY29uc3Qgd3JhcEFuc2kxNiA9IChvZmZzZXQgPSAwKSA9PiBjb2RlID0+IGBcXHUwMDFCWyR7Y29kZSArIG9mZnNldH1tYDtcblxuY29uc3Qgd3JhcEFuc2kyNTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTs1OyR7Y29kZX1tYDtcblxuY29uc3Qgd3JhcEFuc2kxNm0gPSAob2Zmc2V0ID0gMCkgPT4gKHJlZCwgZ3JlZW4sIGJsdWUpID0+IGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzI7JHtyZWR9OyR7Z3JlZW59OyR7Ymx1ZX1tYDtcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRtb2RpZmllcjoge1xuXHRcdHJlc2V0OiBbMCwgMF0sXG5cdFx0Ly8gMjEgaXNuJ3Qgd2lkZWx5IHN1cHBvcnRlZCBhbmQgMjIgZG9lcyB0aGUgc2FtZSB0aGluZ1xuXHRcdGJvbGQ6IFsxLCAyMl0sXG5cdFx0ZGltOiBbMiwgMjJdLFxuXHRcdGl0YWxpYzogWzMsIDIzXSxcblx0XHR1bmRlcmxpbmU6IFs0LCAyNF0sXG5cdFx0b3ZlcmxpbmU6IFs1MywgNTVdLFxuXHRcdGludmVyc2U6IFs3LCAyN10sXG5cdFx0aGlkZGVuOiBbOCwgMjhdLFxuXHRcdHN0cmlrZXRocm91Z2g6IFs5LCAyOV0sXG5cdH0sXG5cdGNvbG9yOiB7XG5cdFx0YmxhY2s6IFszMCwgMzldLFxuXHRcdHJlZDogWzMxLCAzOV0sXG5cdFx0Z3JlZW46IFszMiwgMzldLFxuXHRcdHllbGxvdzogWzMzLCAzOV0sXG5cdFx0Ymx1ZTogWzM0LCAzOV0sXG5cdFx0bWFnZW50YTogWzM1LCAzOV0sXG5cdFx0Y3lhbjogWzM2LCAzOV0sXG5cdFx0d2hpdGU6IFszNywgMzldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmxhY2tCcmlnaHQ6IFs5MCwgMzldLFxuXHRcdGdyYXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0Z3JleTogWzkwLCAzOV0sIC8vIEFsaWFzIG9mIGBibGFja0JyaWdodGBcblx0XHRyZWRCcmlnaHQ6IFs5MSwgMzldLFxuXHRcdGdyZWVuQnJpZ2h0OiBbOTIsIDM5XSxcblx0XHR5ZWxsb3dCcmlnaHQ6IFs5MywgMzldLFxuXHRcdGJsdWVCcmlnaHQ6IFs5NCwgMzldLFxuXHRcdG1hZ2VudGFCcmlnaHQ6IFs5NSwgMzldLFxuXHRcdGN5YW5CcmlnaHQ6IFs5NiwgMzldLFxuXHRcdHdoaXRlQnJpZ2h0OiBbOTcsIDM5XSxcblx0fSxcblx0YmdDb2xvcjoge1xuXHRcdGJnQmxhY2s6IFs0MCwgNDldLFxuXHRcdGJnUmVkOiBbNDEsIDQ5XSxcblx0XHRiZ0dyZWVuOiBbNDIsIDQ5XSxcblx0XHRiZ1llbGxvdzogWzQzLCA0OV0sXG5cdFx0YmdCbHVlOiBbNDQsIDQ5XSxcblx0XHRiZ01hZ2VudGE6IFs0NSwgNDldLFxuXHRcdGJnQ3lhbjogWzQ2LCA0OV0sXG5cdFx0YmdXaGl0ZTogWzQ3LCA0OV0sXG5cblx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRiZ0JsYWNrQnJpZ2h0OiBbMTAwLCA0OV0sXG5cdFx0YmdHcmF5OiBbMTAwLCA0OV0sIC8vIEFsaWFzIG9mIGBiZ0JsYWNrQnJpZ2h0YFxuXHRcdGJnR3JleTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ1JlZEJyaWdodDogWzEwMSwgNDldLFxuXHRcdGJnR3JlZW5CcmlnaHQ6IFsxMDIsIDQ5XSxcblx0XHRiZ1llbGxvd0JyaWdodDogWzEwMywgNDldLFxuXHRcdGJnQmx1ZUJyaWdodDogWzEwNCwgNDldLFxuXHRcdGJnTWFnZW50YUJyaWdodDogWzEwNSwgNDldLFxuXHRcdGJnQ3lhbkJyaWdodDogWzEwNiwgNDldLFxuXHRcdGJnV2hpdGVCcmlnaHQ6IFsxMDcsIDQ5XSxcblx0fSxcbn07XG5cbmV4cG9ydCBjb25zdCBtb2RpZmllck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLm1vZGlmaWVyKTtcbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kQ29sb3JOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5jb2xvcik7XG5leHBvcnQgY29uc3QgYmFja2dyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuYmdDb2xvcik7XG5leHBvcnQgY29uc3QgY29sb3JOYW1lcyA9IFsuLi5mb3JlZ3JvdW5kQ29sb3JOYW1lcywgLi4uYmFja2dyb3VuZENvbG9yTmFtZXNdO1xuXG5mdW5jdGlvbiBhc3NlbWJsZVN0eWxlcygpIHtcblx0Y29uc3QgY29kZXMgPSBuZXcgTWFwKCk7XG5cblx0Zm9yIChjb25zdCBbZ3JvdXBOYW1lLCBncm91cF0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVzKSkge1xuXHRcdGZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGdyb3VwKSkge1xuXHRcdFx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0XHRcdG9wZW46IGBcXHUwMDFCWyR7c3R5bGVbMF19bWAsXG5cdFx0XHRcdGNsb3NlOiBgXFx1MDAxQlske3N0eWxlWzFdfW1gLFxuXHRcdFx0fTtcblxuXHRcdFx0Z3JvdXBbc3R5bGVOYW1lXSA9IHN0eWxlc1tzdHlsZU5hbWVdO1xuXG5cdFx0XHRjb2Rlcy5zZXQoc3R5bGVbMF0sIHN0eWxlWzFdKTtcblx0XHR9XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCBncm91cE5hbWUsIHtcblx0XHRcdHZhbHVlOiBncm91cCxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgJ2NvZGVzJywge1xuXHRcdHZhbHVlOiBjb2Rlcyxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0fSk7XG5cblx0c3R5bGVzLmNvbG9yLmNsb3NlID0gJ1xcdTAwMUJbMzltJztcblx0c3R5bGVzLmJnQ29sb3IuY2xvc2UgPSAnXFx1MDAxQls0OW0nO1xuXG5cdHN0eWxlcy5jb2xvci5hbnNpID0gd3JhcEFuc2kxNigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTI1NiA9IHdyYXBBbnNpMjU2KCk7XG5cdHN0eWxlcy5jb2xvci5hbnNpMTZtID0gd3JhcEFuc2kxNm0oKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NihBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXG5cdC8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL1FpeC0vY29sb3ItY29udmVydC9ibG9iLzNmMGUwZDRlOTJlMjM1Nzk2Y2NiMTdmNmU4NWM3MjA5NGE2NTFmNDkvY29udmVyc2lvbnMuanNcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3R5bGVzLCB7XG5cdFx0cmdiVG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZShyZWQsIGdyZWVuLCBibHVlKSB7XG5cdFx0XHRcdC8vIFdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdFx0XHRcdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRcdFx0XHRpZiAocmVkID09PSBncmVlbiAmJiBncmVlbiA9PT0gYmx1ZSkge1xuXHRcdFx0XHRcdGlmIChyZWQgPCA4KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMTY7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHJlZCA+IDI0OCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDIzMTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHJlZCAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAxNlxuXHRcdFx0XHRcdCsgKDM2ICogTWF0aC5yb3VuZChyZWQgLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrICg2ICogTWF0aC5yb3VuZChncmVlbiAvIDI1NSAqIDUpKVxuXHRcdFx0XHRcdCsgTWF0aC5yb3VuZChibHVlIC8gMjU1ICogNSk7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb1JnYjoge1xuXHRcdFx0dmFsdWUoaGV4KSB7XG5cdFx0XHRcdGNvbnN0IG1hdGNoZXMgPSAvW2EtZlxcZF17Nn18W2EtZlxcZF17M30vaS5leGVjKGhleC50b1N0cmluZygxNikpO1xuXHRcdFx0XHRpZiAoIW1hdGNoZXMpIHtcblx0XHRcdFx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IFtjb2xvclN0cmluZ10gPSBtYXRjaGVzO1xuXG5cdFx0XHRcdGlmIChjb2xvclN0cmluZy5sZW5ndGggPT09IDMpIHtcblx0XHRcdFx0XHRjb2xvclN0cmluZyA9IFsuLi5jb2xvclN0cmluZ10ubWFwKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIgKyBjaGFyYWN0ZXIpLmpvaW4oJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgaW50ZWdlciA9IE51bWJlci5wYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDE2KSAmIDB4RkYsXG5cdFx0XHRcdFx0KGludGVnZXIgPj4gOCkgJiAweEZGLFxuXHRcdFx0XHRcdGludGVnZXIgJiAweEZGLFxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRdO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZTogaGV4ID0+IHN0eWxlcy5yZ2JUb0Fuc2kyNTYoLi4uc3R5bGVzLmhleFRvUmdiKGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRhbnNpMjU2VG9BbnNpOiB7XG5cdFx0XHR2YWx1ZShjb2RlKSB7XG5cdFx0XHRcdGlmIChjb2RlIDwgOCkge1xuXHRcdFx0XHRcdHJldHVybiAzMCArIGNvZGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY29kZSA8IDE2KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDkwICsgKGNvZGUgLSA4KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCByZWQ7XG5cdFx0XHRcdGxldCBncmVlbjtcblx0XHRcdFx0bGV0IGJsdWU7XG5cblx0XHRcdFx0aWYgKGNvZGUgPj0gMjMyKSB7XG5cdFx0XHRcdFx0cmVkID0gKCgoY29kZSAtIDIzMikgKiAxMCkgKyA4KSAvIDI1NTtcblx0XHRcdFx0XHRncmVlbiA9IHJlZDtcblx0XHRcdFx0XHRibHVlID0gcmVkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvZGUgLT0gMTY7XG5cblx0XHRcdFx0XHRjb25zdCByZW1haW5kZXIgPSBjb2RlICUgMzY7XG5cblx0XHRcdFx0XHRyZWQgPSBNYXRoLmZsb29yKGNvZGUgLyAzNikgLyA1O1xuXHRcdFx0XHRcdGdyZWVuID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA2KSAvIDU7XG5cdFx0XHRcdFx0Ymx1ZSA9IChyZW1haW5kZXIgJSA2KSAvIDU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IE1hdGgubWF4KHJlZCwgZ3JlZW4sIGJsdWUpICogMjtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gMzA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gMzAgKyAoKE1hdGgucm91bmQoYmx1ZSkgPDwgMikgfCAoTWF0aC5yb3VuZChncmVlbikgPDwgMSkgfCBNYXRoLnJvdW5kKHJlZCkpO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdFx0XHRcdHJlc3VsdCArPSA2MDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRyZ2JUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiAocmVkLCBncmVlbiwgYmx1ZSkgPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLnJnYlRvQW5zaTI1NihyZWQsIGdyZWVuLCBibHVlKSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaToge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMuYW5zaTI1NlRvQW5zaShzdHlsZXMuaGV4VG9BbnNpMjU2KGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuY29uc3QgYW5zaVN0eWxlcyA9IGFzc2VtYmxlU3R5bGVzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFuc2lTdHlsZXM7XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuY29uc3QgbGV2ZWwgPSAoKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudERhdGEpIHtcblx0XHRjb25zdCBicmFuZCA9IG5hdmlnYXRvci51c2VyQWdlbnREYXRhLmJyYW5kcy5maW5kKCh7YnJhbmR9KSA9PiBicmFuZCA9PT0gJ0Nocm9taXVtJyk7XG5cdFx0aWYgKGJyYW5kICYmIGJyYW5kLnZlcnNpb24gPiA5Mykge1xuXHRcdFx0cmV0dXJuIDM7XG5cdFx0fVxuXHR9XG5cblx0aWYgKC9cXGIoQ2hyb21lfENocm9taXVtKVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0cmV0dXJuIDA7XG59KSgpO1xuXG5jb25zdCBjb2xvclN1cHBvcnQgPSBsZXZlbCAhPT0gMCAmJiB7XG5cdGxldmVsLFxuXHRoYXNCYXNpYzogdHJ1ZSxcblx0aGFzMjU2OiBsZXZlbCA+PSAyLFxuXHRoYXMxNm06IGxldmVsID49IDMsXG59O1xuXG5jb25zdCBzdXBwb3J0c0NvbG9yID0ge1xuXHRzdGRvdXQ6IGNvbG9yU3VwcG9ydCxcblx0c3RkZXJyOiBjb2xvclN1cHBvcnQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0c0NvbG9yO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwiSURFQXNwZWN0czpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL19pZGVGaWxlcy9JREVBc3BlY3RzL0RhdGVQaWNrZXJBc3BlY3QvXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiRGF0ZVBpY2tlckFzcGVjdFwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblxufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua0lERUFzcGVjdHNcIl0gPSBzZWxmW1wid2VicGFja0NodW5rSURFQXNwZWN0c1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiaW1wb3J0IHsgRGF0ZVRpbWUsIE9wdGlvbnMsIFRlbXB1c0RvbWludXMgfSBmcm9tICdAZW9uYXNkYW4vdGVtcHVzLWRvbWludXMnO1xyXG4vL2h0dHBzOi8vZ2V0ZGF0ZXBpY2tlci5jb20vNi9vcHRpb25zL2Rpc3BsYXkuaHRtbFxyXG5pbXBvcnQgeyBJRGF0ZVBpY2tlckFzcGVjdE9wdGlvbnMsIERBVEVfUElDS0VSX0RFRkFVTFRTLCBEQVRFX1BJQ0tFUl9XSURHRVRfREVGQVVMVFN9IGZyb20gXCIuL0RhdGVQaWNrZXJBc3BlY3RDb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsIElXaWRnZXRKc29ufSBmcm9tICcuLi9CYXNlQ2xhc3Nlcy9JV2lkZ2V0SnNvbic7XHJcbmltcG9ydCB7IEJhc2VJREVBc3BlY3QsIGdldEZvcm1CdWlsZGVyRmllbGRQYXRoIH0gZnJvbSAnLi4vQmFzZUNsYXNzZXMvQmFzZUlERUFzcGVjdCc7XHJcbmltcG9ydCB7IERFQlVHX0RFRkFVTFQgfSBmcm9tICcuLi9CYXNlQ2xhc3Nlcy9EZWJ1Z0RlZmF1bHRzJztcclxuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcclxuXHJcbmxldCB0aGlzV2lkZ2V0U3lzdGVtTmFtZSA9IFwiRGF0ZVBpY2tlckFzcGVjdFwiO1xyXG5cclxuLy8gXCJmaWVsZFBhdGhcIjogXCJmb3JtLWFsdC1lZGlzY292ZXJ5LWpvYi1kZXNpcmVkLWNvbXBsZXRpb24tZGF0ZS1kYXRlLW9ubHkuam9iLWRlc2lyZWQtY29tcGxldGlvbi1kYXRlXCIsXHJcbi8vIFwidGl0bGVcIjogXCJEZXNpcmVkIERhdGVcIixcclxuLy9hZGQgc3R5bGUgdG8gaGVhZDogaHR0cHM6Ly91bnBrZy5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy13ZWJAbGF0ZXN0L2Rpc3QvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIubWluLmNzc1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJBc3BlY3QgZXh0ZW5kcyBCYXNlSURFQXNwZWN0PElEYXRlUGlja2VyQXNwZWN0T3B0aW9ucywgYW55PiB7XHJcbiAgICBsaXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE86IGltcGxlbWVudFxyXG4gICAgfVxyXG4gICAgcmVmcmVzaChuZXdDb25maWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICAgIH1cclxuICAgIHJlc2V0KG5ld0NvbmZpZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgXHJcbiAgICBkYXRlUGlja2VyRGl2OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIGRhdGVUaW1lUGlja2VyOiBUZW1wdXNEb21pbnVzIHwgdW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvLyBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSURhdGVQaWNrZXJBc3BlY3RPcHRpb25zLCBiYXNlTW9kZWw6IGFueSkge1xyXG4gICAgLy8gICAgIHN1cGVyKFwiU2luZ2xlVmFsdWVBc3BlY3RcIiwgXCJhc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlclwiLCBlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy9BYnN0cmFjdCBtZXRob2RzIC0gbXVzdCBiZSBpbXBsZW1lbnRlZCBieSB0aGUgZGVyaXZlZCBjbGFzc1xyXG5cclxuICAgIHNldFRoaXNDb21wb25lbnROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiRGF0ZVBpY2tlckFzcGVjdFwiO1xyXG4gICAgfVxyXG4gICAgc2V0dXAoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgYDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29uc1wiPmApO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0V2lkZ2V0SnNvblNldHRpbmdzKCk6IElXaWRnZXRKc29uPElEYXRlUGlja2VyQXNwZWN0T3B0aW9ucz4ge1xyXG4gICAgICAgIHJldHVybiBEQVRFX1BJQ0tFUl9XSURHRVRfREVGQVVMVFM7XHJcbiAgICB9XHJcbiAgIFxyXG5zZXREZWZhdWx0cygpOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPElEYXRlUGlja2VyQXNwZWN0T3B0aW9ucz4ge1xyXG4gICAgcmV0dXJuIERBVEVfUElDS0VSX0RFRkFVTFRTO1xyXG59XHJcblxyXG4gICAvL0Fic3RyYWN0IG1ldGhvZHMgLSBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IHRoZSBkZXJpdmVkIGNsYXNzXHJcbiAgICBzZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZighdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uLmZvcm1CdWlsZGVyRmllbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVycihcIk5vIGZvcm1idWlsZGVyIGZpZWxkIHNldCBpbiBjb25maWd1cmF0aW9uIC0gY2hlY2sgYXNwZWN0IGNvbmZpZ3VyYXRpb25cIik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZvcm1idWlsZGVyIGZpZWxkIHNldCBpbiBjb25maWd1cmF0aW9uIC0gY2hlY2sgYXNwZWN0IGNvbmZpZ3VyYXRpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnZXRGb3JtQnVpbGRlckZpZWxkUGF0aCh0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24uZm9ybUJ1aWxkZXJGaWVsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRQaWNrZXJFbmFibGVkU3RhdGUobmV3VmFsdWU6IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVQaWNrZXJEaXYpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2FuYXRpc2UgdGhlIGRhdGEgYmVmb3JlIHNhdmluZywgZm9ybSBidWlsZCBkYXRhIG5lZWRzIHRvIGJlIGEgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHNldE1vZGVsRGF0YUFzRGF0ZShuZXdWYWx1ZTogRGF0ZVRpbWUgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEobmV3VmFsdWU/LnRvSVNPU3RyaW5nKCkgfHwgdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiBHZXRzIHRoZSBkYXRhIGZyb20gZm9ybSBidWlsZGVyIGFuZCBjb252ZXJ0cyB0byBEYXRlVGltZVxyXG4gICAgICovXHJcbiAgICBhc3luYyBnZXRNb2RlbERhdGFBc0RhdGUoKSB7XHJcbiAgICAgICAgbGV0IHJldFZhbHVlOiBEYXRlVGltZVxyXG5cclxuICAgICAgICBsZXQgZm91bmRWYWx1ZSA9IGF3YWl0IHRoaXMuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGlmICghZm91bmRWYWx1ZSkge1xyXG4gICAgICAgICAgICBmb3VuZFZhbHVlID0gdGhpcy5nZW5lcmF0ZURlZmF1bHREYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldFZhbHVlID0gdGhpcy5lbnN1cmVEYXRlKGZvdW5kVmFsdWUpO1xyXG5cclxuICAgICAgICB0aGlzLnNldE1vZGVsRGF0YUFzRGF0ZShyZXRWYWx1ZSk7IC8vc2V0IHRoZSB2YWx1ZSB0byBlbnN1cmUgaXQgaXMgdmFsaWRcclxuICAgICAgIFxyXG5cclxuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyBnZXQgdG9kYXkgZGF0ZSArIGRlZmF1bHREYXRlRnJvbU5vd0hvdXJzIChpZiBzZXQgaW4gY29uZmlndXJhdGlvbilcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZURlZmF1bHREYXRlKCkge1xyXG4gICAgICAgIGxldCBkZWZhdWx0RGF0ZSA9IG5ldyBEYXRlVGltZShEYXRlVGltZS5ub3coKSk7XHJcbiAgICAgICAgbGV0IGRlZmF1bHREYXRlRnJvbU5vd0hvdXJzID0gdGhpcy5vcHRpb25zPy5kZWZhdWx0VmFsdWUoKS5kZWZhdWx0RGF0ZUZyb21Ob3dIb3VycygpO1xyXG4gICAgICAgIGlmIChkZWZhdWx0RGF0ZUZyb21Ob3dIb3Vycykge1xyXG4gICAgICAgICAgICBkZWZhdWx0RGF0ZS5zZXRIb3VycyhkZWZhdWx0RGF0ZS5nZXRIb3VycygpICsgZGVmYXVsdERhdGVGcm9tTm93SG91cnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVmYXVsdERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayBhZnRlciBpbml0aWFsIGNyZWF0aW9uIGFuZCBiaW5kaW5nIHRvIGxvYWQgZGF0YVxyXG4gICAgICogaW50byBpdCdzIG1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGxvYWRBbmRCaW5kKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5JREVBc3BlY3RzLURhdGVQaWNrZXJBc3BlY3RcIik7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gZWxlbWVudCBmb3VuZFwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiBhbHJlYWR5IGV4aXN0cyByZW1vdmUgaXRcclxuICAgICAgICBpZiAodGhpcy5kYXRlUGlja2VyRGl2KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiQWxyZWFkeSBleGlzdHNcIiwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9CdWlsZCB0aGUgZGF0ZSBwaWNrZXIgZGl2IFxyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyRGl2LmNsYXNzTGlzdC5hZGQoXCJ0aGUtcGlja2VyXCIpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5jbGFzc0xpc3QuYWRkKFwibG9nLWV2ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlckRpdi5pZCA9IHRoaXMudW5pcXVlSWQ7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBpbnB1dC5pZCA9IHRoaXMudW5pcXVlSWQgKyBcIklucHV0XCI7XHJcbiAgICAgICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWNvbnRyb2xcIik7XHJcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiZGF0YS10ZC10YXJnZXRcIiwgXCIjXCIgKyB0aGlzLnVuaXF1ZUlkKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5vcHRpb25zPy5oaWRlSW5wdXRCb3goKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3B0aW9ucz8uaGlkZUlucHV0Qm94LnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHsgXHJcbiAgICAgICAgICAgIGlmKG5ld1ZhbHVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGVQaWNrZXJEaXYuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICAgICAgICAvLyBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIC8vIHNwYW4uY2xhc3NMaXN0LmFkZChcImlucHV0LWdyb3VwLXRleHRcIik7XHJcbiAgICAgICAgLy8gc3Bhbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRkLXRhcmdldFwiLCBcIiNcIiArIHRoaXMudW5pcXVlSWQpO1xyXG4gICAgICAgIC8vIHNwYW4uc2V0QXR0cmlidXRlKFwiZGF0YS10ZC10b2dnbGVcIiwgXCJkYXRldGltZXBpY2tlclwiKTtcclxuICAgICAgICAvLyBsZXQgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpOyBcclxuICAgICAgICAvLyBpLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgLy8gaS5jbGFzc0xpc3QuYWRkKFwiZmEtY2FsZW5kYXJcIik7XHJcbiAgICAgICAgLy8gc3Bhbi5hcHBlbmRDaGlsZChpKTsgXHJcbiAgICAgICAgLy8gdGhpcy5kYXRlUGlja2VyRGl2LmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZGF0ZVBpY2tlckRpdik7XHJcblxyXG4gICAgICAgIGxldCBkYXRlUGlja2VyT3B0aW9uID0ga28udG9KUyh0aGlzLm9wdGlvbnM/LmRhdGVQaWNrZXJPcHRpb25zKCkpIGFzIE9wdGlvbnMgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5kYXRlVGltZVBpY2tlciA9IG5ldyBUZW1wdXNEb21pbnVzKHRoaXMuZGF0ZVBpY2tlckRpdiwgZGF0ZVBpY2tlck9wdGlvbik7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPy5kYXRlUGlja2VyT3B0aW9ucy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEFuZEJpbmQoKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2V0UGlja2VyRW5hYmxlZFN0YXRlKHRoaXMub3B0aW9ucz8ucGlja2VyRW5hYmxlZCgpKTtcclxuICAgICAgICAvL1NldCB0aGUgdmFsdWUgb2YgdGhlIHBpY2tlciB0byB0aGUgdmFsdWUgaW4gdGhlIG1vZGVsXHJcbiAgICAgICAgbGV0IGRhdGVUb1NldCA9IGF3YWl0IHRoaXMuZ2V0TW9kZWxEYXRhQXNEYXRlKClcclxuICAgICAgICB0aGlzLmRhdGVUaW1lUGlja2VyLmRhdGVzLnNldFZhbHVlKFxyXG4gICAgICAgICAgICBkYXRlVG9TZXQsXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVQaWNrZXIuZGF0ZXMubGFzdFBpY2tlZEluZGV4XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRlVGltZVBpY2tlci5zdWJzY3JpYmUoXCJjaGFuZ2UudGRcIiwgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIkRhdGUgQ2hhbmdlZFwiLCBcInJlZFwiLCBlKTtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zPy5ldmVudFRvRmlyZU9uVXBkYXRlKCk/LmZvckVhY2goKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkdWkuZXZlbnRzLmJyb2FkY2FzdChldmVudCxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWJ1aWxkZXJGaWVsZDogdGhpcy5vcHRpb25zPy5mb3JtQnVpbGRlckZpZWxkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdldEN1cnJlbnRTZWxlY3RlZERhdGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pOyAvL2ZpcmUgZXZlbnQgYW5kIHBhc3MgaW4gdGhlIGRhdGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWxEYXRhQXNEYXRlKHRoaXMuZ2V0Q3VycmVudFNlbGVjdGVkRGF0ZSgpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5zdXJlIHRoZSBkYXRlIGlzIGEgdmFsaWQgZGF0ZVxyXG4gICAgICAgICogQHBhcmFtIGRcclxuICAgICAgICAqIEByZXR1cm5zIGEgRGF0ZVRpbWUgYmFzZWQgb24gdGhlIGlucHV0IG9yIGEgZGVmYXVsdCBkYXRlIGlmIHRoZSBpbnB1dCBpcyBub3QgdmFsaWRcclxuICAgICoqL1xyXG4gICAgZW5zdXJlRGF0ZShkOiBhbnkpIDogRGF0ZVRpbWUge1xyXG4gICAgICAgIGxldCByZXRWYWx1ZTogRGF0ZVRpbWU7XHJcbiAgICAgICAgLy9jaGVjayBpZiBkIGlzIGEgZGF0ZVxyXG4gICAgICAgIGlmIChkIGluc3RhbmNlb2YgRGF0ZVRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgcmV0VmFsdWUgPSBuZXcgRGF0ZVRpbWUoRGF0ZVRpbWUucGFyc2UoZCkpO1xyXG4gICAgICAgICAgICBpZighRGF0ZVRpbWUuaXNWYWxpZChyZXRWYWx1ZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldFZhbHVlPSB0aGlzLmdlbmVyYXRlRGVmYXVsdERhdGUoKTs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKGBVbmFibGUgdG8gcGFyc2UgZGF0ZSAke2R9IChzZXR0aW5nIGRhdGUgdG8gZGVmYXVsdCBkYXRlKSAtIGNoZWNrIGFzcGVjdCBjb25maWd1cmF0aW9uIGAsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuZ2VuZXJhdGVEZWZhdWx0RGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBsb2FkKG1vZGVsOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmxvZyhcIkxvYWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbG9hZChtb2RlbDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5sb2coXCJSZWxvYWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEN1cnJlbnRTZWxlY3RlZERhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVQaWNrZXI/LmRhdGVzLnBpY2tlZFswXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgb25TYXZlKG1vZGVsOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmxvZyhcIlNhdmVcIik7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlbERhdGFBc0RhdGUodGhpcy5nZXRDdXJyZW50U2VsZWN0ZWREYXRlKCkpO1xyXG4gICAgICAgIHN1cGVyLm9uU2F2ZShtb2RlbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=