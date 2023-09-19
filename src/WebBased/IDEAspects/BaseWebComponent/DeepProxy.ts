export class DeepProxy{
    _preproxy:any
    _handler:any


    constructor(target:any, handler:ProxyHandler<any>) {
        if(target)
        {
            this._preproxy = new WeakMap();
            this._handler = handler;

        return this.proxify(target, []);
        }
        return;
    }

    makeHandler(path:any) {
        let dp = this;
        return {
            set(target:any, key:string | symbol, value:any, receiver:any) {
                if (typeof value === 'object') {
                    //check if value is an instrance of HTMLElement
                    if (value instanceof HTMLElement) {
                        // console.log('HTMLElement', key, value);
                        return Reflect.set(target, key, value, receiver);
                    }
                    value = dp.proxify(value, [...path, key]);
                }
                target[key] = value;

                if (dp._handler.set) {
                    dp._handler.set(target, [...path, key], value, receiver);
                }
                return true;
            },

            deleteProperty(target:any, key: string | symbol) {
                if (Reflect.has(target, key)) {
                    dp.unproxy(target, key);
                    let deleted = Reflect.deleteProperty(target, key);
                    if (deleted && dp._handler.deleteProperty) {
                        dp._handler.deleteProperty(target, [...path, key]);
                    }
                    return deleted;
                }
                return false;
            }
        }
    }

    unproxy(obj:any, key:string | symbol) {
        if (this._preproxy.has(obj[key])) {
            // console.log('unproxy',key);
            obj[key] = this._preproxy.get(obj[key]);
            this._preproxy.delete(obj[key]);
        }

        for (let k of Object.keys(obj[key])) {
            if (typeof obj[key][k] === 'object') {
                this.unproxy(obj[key], k);
            }
        }

    }

    proxify(obj:any, path:any) {
        if(obj === null || obj === undefined)
        {
            return obj;
        }
        for (let key of Object.keys(obj)) {
            if(obj[key] === null || obj[key] === undefined)
            {
                continue;
            }
            if (typeof obj[key] === 'object') {
                obj[key] = this.proxify(obj[key], [...path, key]);
            }
        }
        let p = new Proxy(obj, this.makeHandler(path));
        this._preproxy.set(p, obj);
        return p;
    }
}

// TEST DeepProxy

