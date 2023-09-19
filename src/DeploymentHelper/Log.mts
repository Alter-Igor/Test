import colors from 'colors';
import clc from 'cli-color';
import chalk, { ChalkInstance } from 'chalk';

chalk.level = 3;
let mode: ChalkInstance = chalk.reset;

colors.enable();
let cwidth = clc.windowSize.width;

let lastSec: Section | undefined;

export function lcol(heading: Array<string>, data: Array<Array<string>>) {
    process.stdout.write(
        clc.columns([
            heading,
            data
        ])
    );
}

export function clearSec() {
    lastSec = new Section("Root", mode);
}

export class Section {
    sectionName: string;
    parent: Section | undefined;
    c: ChalkInstance
    indent = 0;
    indentPad = "";
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
        console.log(mode(args));
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


    let c = sec?.c || mode;
    let indentPad = sec?.indentPad || "";

    if (!firstArg) {
        firstArg = "";
    }


    firstArg = indentPad + firstArg;
    //remove color formatting from first arg
    let totLen = firstArg.length - firstArg.replace(/\u001b\[.*?m/g, '').length - 2;


    console.log(c("|" + firstArg.padEnd(cwidth + totLen, " ") + "|"));

    //removed Section from args

    args.forEach((arg) => {

        // let argAsString = JSON.stringify(arg, null, 2);

        console.log(c("=".repeat(cwidth)));
        //console.log(arg);

        //is arg a string or an object
        if (arg.constructor.name === "String") {
            l(c(arg),sec);
        }
        else if (arg.constructor.name === "Array") {
            arg.forEach((item:any) => {
                l(c(item),sec);
            })
        }
        else if (arg.constructor.name === "Object") {


            Object.keys(arg).forEach((key) => {
                l(c(key.padEnd(30, " ")) + " : " + c(arg[key]), sec);
            });
        };

        console.log(c("=".repeat(cwidth)));
    })


}



function logHeadingSection(c: ChalkInstance, heading: string, section?: Section) {
    console.log(c("".padStart(cwidth, "-")));
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
    console.log(c.red(path.padStart((cwidth / 2) + (path.length / 2), " ").padEnd(cwidth, " ")));
    console.log(c.red(`at ${time}`.padStart((cwidth / 2) + (`at ${time}`.length / 2), " ").padEnd(cwidth, " ")));

    console.log(c("".padStart(cwidth, "-")));
    return sec;
}

export function lh1(heading: string, section: Section | undefined = lastSec) {
    let c = chalk.bgHex("#000000");
    return logHeadingSection(c, heading, section);
}

export function lh2(heading: string, section: Section | undefined = lastSec) {
    let c = chalk.bgHex("#31332b");
    return logHeadingSection(c, heading, section);
}

export function lh3(heading: string, section: Section | undefined = lastSec) {
    let c = chalk.bgHex("#5e5151");
    return logHeadingSection(c, heading, section);
}


export const lh = lh1;


export const imp = (text: string) => {
    return text.red.bold;
}

export const inf = (text: string) => {
    return text.blue.bold;
}

export const wrn = (text: string) => {
    return text.yellow.bold;
}

export const err = (text: string) => {
    return text.red.bold;
}

export const suc = (text: string) => {
    return text.green.bold;
}

export const hl = (text: string) => {
    return text.bgBlue.bold;
}

export const hl1 = (text: string) => {
    return text.bgMagenta.bold;
}

export const nv = (name: string, value: string) => {
    return chalk.bgBlueBright(name.padEnd(30, " ")) + " : " + chalk.cyanBright(value);
}

export function runTest() {

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


}




// export {colors};
