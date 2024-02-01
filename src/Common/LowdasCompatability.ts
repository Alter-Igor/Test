


/**
 * Important: This function is to ensure backwards compatibility with lowdash < 3.10.1
 * Lowdash 3.10.1 and above has changed contains to includes and findWhere to find
 */
export function checkLowdashCompatability(): void {
    //lowdash 4 and above has changed contains to includes
    //here we are just aliasing it back to contains for backwards compatibility
    if (!(_ as any).contains) {
        console.log("!_.contains")
    }

    if (!(_ as any).findWhere) {
        console.log("!_.findWhere")
    }


    if (!(_ as any).contains && _.includes) {
        (_ as any).contains = _.includes;
    }

    if (!(_ as any).findWhere && _.find) {

        (_ as any).findWhere = _.find;
    }

}

if (!(_ as any).contains && _.includes) {
    (_ as any).contains = _.includes;
}

if (!(_ as any).findWhere && _.find) {

    (_ as any).findWhere = _.find;
}