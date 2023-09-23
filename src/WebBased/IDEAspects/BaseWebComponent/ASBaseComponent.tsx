import { RefObject, render } from "preact";
import { DeepProxy } from "./DeepProxy";
// import { ASMaterialShared } from "./ASBaseStyles";

class SCSSToLoad {
  id: string = "";
  name: string = "";
  scss: any;
  component: string = "";
  cachedCss?: string;
  cssLoaded: boolean = false;
}

export abstract class ShareDoBaseWebComponent<TOptions> extends HTMLElement {
  static ScssToLoad = new Array<SCSSToLoad>();
  static ScssCount: number = 0;
  static insertedShared = false;
  static _observedAttributes = new Array<string>();
  hasConnected: boolean = false;
  static get observedAttributes() {
    return ShareDoBaseWebComponent._observedAttributes; //Not these values need to be lower-case
  }

  private _options: TOptions | undefined;
  proxy!: DeepProxy;
  usingShadow: boolean;
  attachedShadowRoot: ShadowRoot | undefined;
  autoRenderOnOptionsChanged: boolean=true;
  //Constructor
  //Initialize the options
  constructor(initOptions: TOptions, useShadow: boolean = true) {
    super();
    // let x = new ASMaterialShared(); //TODO later
    this.initializeOptionsAttributes(initOptions);   
    this.usingShadow = useShadow;
    if (useShadow === true) {
      this.attachedShadowRoot = this.attachShadow({ mode: "open" });
     
    }
    this.attachObjectListener();
  }

  private initializeOptionsAttributes(initOptions:TOptions | undefined) {
    if(!this.options)
    {
      console.log("initializeOptionsAttributes - this.options={}");
      this.options={} as TOptions
    }
    Object.assign((this.options as any),initOptions);

    for (const a of this.attributes) {
      console.log(a.name, a.value);
      if (a.name.startsWith("options")) {
        let opt = a.name.replace("options.", "");
        let obj = (this.options as any)[opt]
        let to = typeof obj
       
        switch (to) {
          case "string":
            (this.options as any)[opt]=a.value
            break;
            case "undefined":
            case null:
              (this.options as any)[opt] =a.value
            break;
        
          default:
            (this.options as any)[opt] = JSON.parse(a.value)
            break;
        }

       
      }
    }
  }

  // private attachShared() {
  //    if (ShareDoBaseWebComponent.insertedShared == false) {
  //     let sharedRef = createRef<ASMaterialShared>();
  //     let sharedHtml = (
  //       <as-material-shared ref={sharedRef}></as-material-shared>
  //     );
  //     render(sharedHtml, window.document.body);
  //     ShareDoBaseWebComponent.insertedShared = true;
  //   }
  // }

  applyScss(
    scss: any,
    name: string,
    element?: HTMLElement | ShadowRoot | RefObject<any>
  ) {
    // this.attachShared();
    let scssToApply = ShareDoBaseWebComponent.ScssToLoad.find(
      (scss) => scss.component === this.tagName && scss.name === name
    );

    if (!scssToApply) {
      scssToApply = {
        id: "css_" + ShareDoBaseWebComponent.ScssCount++,
        name: name,
        scss: scss,
        component: this.tagName,
        cssLoaded: false,
      };
      ShareDoBaseWebComponent.ScssToLoad.push(scssToApply);
    }

    if (scssToApply.cssLoaded == false) {
      if (!element) {
        if (this.usingShadow == false) {
          element = this;
        } else {
          element = this.shadowRoot!;
        }
      }

      let y = scssToApply.scss.use({
        target: element,
        id: scssToApply.id,
      });

      if (this.usingShadow == true) {
        scssToApply.cachedCss = this.shadowRoot?.getElementById(
          scssToApply.id
        )?.innerHTML;
      } else {
        scssToApply.cachedCss = document.getElementById(
          scssToApply.id
        )?.innerHTML;
      }
      scssToApply.cssLoaded = true;
    } else {
      if (this.usingShadow == true) {
        let nStyle = document.createElement("style") as HTMLStyleElement;
        nStyle.innerHTML = scssToApply.cachedCss!;
        this.shadowRoot?.appendChild(nStyle);
      } else {
        //do nothing as it should already be on the dom
      }
    }
  }

  //Attaches a proxy so we can detect any changed in the settings/options object and rterender
  private attachObjectListener() {
    console.log("-- attachObjectListener");
    var thisObject = this;
    let myHandler: ProxyHandler<any> = {
      set: function (obj, key, value) {
        obj = value;
        if(!thisObject.hasConnected) { return true;}
        if(thisObject.autoRenderOnOptionsChanged==true)
        {
          console.log("-- attachObjectListener - thisObject.render();");
          
          thisObject.render();
        }

        return true;
      },
      get: function (target: any, property) {
        return target[property];
      },
    };

    this.proxy = new DeepProxy(this.options, myHandler);
    this._options = this.proxy as any;
  }

  get options(): TOptions  {
    return this._options || {} as TOptions;
  }

  set options(value: TOptions) {
    this._options = value;
    //this.render();
  }

  connectedCallback() {
    this.hasConnected = true;
    console.log(`connectedCallback - called when the custom element is inserted into the DOM`);
    for (const prop of (this.constructor as any).observedAttributes) {
      if (this.hasAttribute(prop)) {
        (this as any)[prop] = this.getAttribute(prop);
        
      }
    }
    console.log("-- connectedCallback - this.render();;");
    this.render();
    console.log(`-- connectedCallback - After Render`);

  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    console.log(`name: ${name}, oldValue: ${oldValue}, newValue: ${newValue},`);
    if (oldValue !== newValue) {
      console.log("-- attributeChangedCallback - this.render();;");
      this.render();
    }
  }

  disconnectedCallback() {
    console.log(
      `disconnectedCallback - cleanup anything when the custom element is removed`
    );
  }

  abstract render(): void;

  // addCss() {
  //   //TODO
  //   if (ASBaseComponent.cssLoaded == false) {
  //     debugger
  //     ASBaseComponent.ScssToLoad.forEach((cssToLoad, index) => {
  //       let newCssId = "css_" + index
  //       let y = cssToLoad.use({
  //         target: this.shadowRoot,
  //         id: newCssId,
  //       });
  //       ASBaseComponent.LoadedCss.push(
  //         this.shadowRoot?.getElementById(newCssId)
  //       );

  //     });

  //     ASBaseComponent.cssLoaded = true;
  //   } else {
  //     ASBaseComponent.LoadedCss.forEach((cssNode) => {
  //       this.shadowRoot?.append(cssNode.cloneNode(true));
  //     });
  //   }
  // }
}
