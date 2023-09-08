


  // Assuming you'll use this as an ES6 module or alongside another module system:
export function safeEval(code: string, context?: any, opts?: any): any {
    const sandbox: Record<string, any> = {};
    const resultKey = 'SAFE_EVAL_' + Math.floor(Math.random() * 1000000);
    sandbox[resultKey] = {};

    const clearContext = `
        (function(){
            Function = undefined;
            const keys = Object.getOwnPropertyNames(this).concat(['constructor']);
            keys.forEach((key) => {
                const item = this[key];
                if(!item || typeof item.constructor !== 'function') return;
                this[key].constructor = undefined;
            });
        })();
    `;

    const iframe = document.createElement('iframe');
    if (!document.body) throw new Error('The document body has not been defined.');
    document.body.appendChild(iframe);

    if (context) {
        Object.keys(context).forEach(function (key) {
            (iframe.contentWindow as any)[key] = context[key];
        });
    }

    (iframe.contentWindow! as any).eval(clearContext);
    (iframe.contentWindow! as any).eval(`${resultKey} = ${code}`);
    const result = (iframe.contentWindow as any)[resultKey];

    document.body.removeChild(iframe);
    return result;
}
