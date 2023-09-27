import chalk, { ChalkInstance } from 'chalk';
import { extractCallerFromStack, extractLineNumberFromStack } from './StackHelper';

chalk.level = 3;
let defaultMode: ChalkInstance = chalk.reset;


let lastSec: Section | undefined;


export function clearSec() {

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

export function secBackOne() {
    lastSec = lastSec?.parent;
    console.groupEnd();
}

export class Section {
    sectionName: string;
    parent: Section | undefined;
    c: ChalkInstance
    indent = 0;
    indentPad = "";
    group: number = 0;
    constructor(sectionName: string, c: ChalkInstance, section?: Section) {
        this.c = c;
        this.sectionName = sectionName;
        if (section) {
            this.indent = section.indent + 1;
            this.indentPad = "-".repeat(this.indent * 2) + " ";
        }
        lastSec = this;
        this.parent = section;
    }
    log(...args: any[]) {
        console.log(defaultMode(args));
    }
    lh1(heading: string) {
        return lh1(this.indentPad + heading, this)
    }
    lh2(heading: string) {
        return lh2(this.indentPad + heading, this)
    }
    lh3(heading: string) {
        return lh3(this.indentPad + heading, this)
    }
    l(...args: any[]) {
        return l(this, ...args);
    }
}

export function l(...args: any[]) {

    let sec: Section | undefined = lastSec;
    let firstArg: string | undefined;
    let firstArgModifed: string | undefined;
    args.forEach((arg) => {
        if (arg instanceof Section) {
            sec = arg;
        }
        if (!firstArg && arg.constructor.name === "String") {
            firstArg = args.shift();
        }
    })

    //removed Section from args
    args = args.filter((arg) => {
        return !(arg instanceof Section);
    })


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
    })


}



function logHeadingSection(c: ChalkInstance, heading: string, section?: Section) {

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

export function lh1(heading: string, section: Section | undefined = lastSec) {
    let c = chalk.bgBlack.greenBright.bold;
    return logHeadingSection(c, heading, section);
}

export function lh2(heading: string, section: Section | undefined = lastSec) {
    let c = chalk.bgGray.cyanBright.bold;
    return logHeadingSection(c, heading, section);
}

export function lh3(heading: string, section: Section | undefined = lastSec) {
    let c = chalk.bgGray.magentaBright.bold;
    return logHeadingSection(c, heading, section);
}


export const lh = lh1;


export const imp = (text: string) => {
    let c = chalk.red.bold.bgBlack;
    return c(text);
}

export const inf = (text: string) => {
    let c = chalk.blue.bold;
    return c(text);
}

export const wrn = (text: string) => {
    let c = chalk.yellow.bold;
    return c(text);
} 

export const err = (text: string) => {

    let er = (new Error());
    let lineNo = extractLineNumberFromStack(er.stack);
    let caller = extractCallerFromStack(er.stack);

    let preText = `[${caller}:${lineNo}]`;

    text = preText + " " + text;
    
    console.log(er);

    let c = chalk.red.bold;
    return c(text);
}

export const suc = (text: string) => {
    let c = chalk.green.bold;
    return c(text);
}

export const hl = (text: string) => {
    return chalk.bgBlue(text);
}

export const hl1 = (text: string) => {
    return chalk.bgMagenta(text);
}

export const nv = (name: string, value: string) => {
    return chalk.bgBlueBright(name.padEnd(30, " ")) + " : " + chalk.cyanBright(value);
}

 
let exampleJSon =
{
    "name": "test",
    "age": 10,
    "address": {
        "street": "123 Fake Street",
        "city": "London",
        "postcode": "SW1A 1AA"
    }
}

export function runTest() {


    console.log("-- test --")

    let sec = lh1("Test Heading 1")
    l(imp("Auto Sec - This is something important"))
    l("Auto Sec - Line 1")
    l("Auto Sec - Line 2")
    l("Auto Sec - Line INFO: " + imp("This is something important"))
    l("Auto Sec - Line WITH ADDITINAL INFO: " + imp("This is something important") + " and this is some additional info")
    l("Auto Sec - Test 2:" + imp("An important value"))
    l("after auto sec Test 3:" + inf("An info value"))
    l("Test 4:" + wrn("An warn value"))
    l("Test 5:" + err("An error value"))
    l("Test 6:" + suc("An success value"))
    l("Test 7:" + hl("An highlight value"))
    l("Test 8:" + hl1("An highlight value"))
    l(nv("Name", "Value"))
    l(nv("Example Name", "http://www.example.com"))
    l(nv("Example Name", "http://www.example.com"))

    sec = sec.lh2("Heading 2")
    sec.l("Test")
    sec.l("Test 2:" + imp("An important value"))
    l("Test 3:" + inf("An info value"))
    l("Test 4:" + wrn("An warn value"))
    l("Test 5:" + err("An error value"))
    l("Test 6:" + suc("An success value"))
    l("Test 7:" + hl("An highlight value"))
    l("Test 8:" + hl1("An highlight value"))
    l(nv("Name", "Value"))
    l(nv("Example Name", "http://www.example.com"))
    l(nv("Example Name", "http://www.example.com"))


    sec = sec.lh3("Head 3")
    l("Test")
    l("Test 2:" + imp("An important value"))
    l("Test 3:" + inf("An info value"))
    l("Test 4:" + wrn("An warn value"))
    l("Test 5:" + err("An error value"))
    l("Test 6:" + suc("An success value"))
    l("Test 7:" + hl("An highlight value"))
    l("Test 8:" + hl1("An highlight value"))
    l(nv("Name", "Value"))
    l(nv("Example Name", "http://www.example.com"))
    l(nv("Example Name", "http://www.example.com"))

    clearSec();
    l("Test Clear Sec")
    l("Test 2:" + imp("An important value"))
    l("Test 3:" + inf("An info value"))
    l("Test 4:" + wrn("An warn value"))
    l("Test 5:" + err("An error value"))
    l("Test 6:" + suc("An success value"))
    l("Test 7:" + hl("An highlight value"))
    l("Test 8:" + hl1("An highlight value"))
    l(nv("Name", "Value"))
    l(nv("Example Name", "http://www.example.com"))
    l(nv("Example Name", "http://www.example.com"))



    l("Test JSON:", exampleJSon);

}

// runTest()
clearSec();

// export {colors};
