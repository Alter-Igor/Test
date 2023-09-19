import LocalScss from "./card.scss";
import RemoteScss from "./cardRemote.scss";
import { MDCRipple } from "@material/ripple";
import { ASMaterialDesignButton } from "../Button/ASMaterialDesignButton";
import { DeepProxy } from "../Utility/DeepProxy"
import { Fragment, render } from "preact";

interface dic {
  [id: string]: any;
}

export interface ASMaterialDesignCardOptions {
  title: string;
  sub_title?: string;
  header_background?: string;
  buttons?: ASMaterialDesignButton[];
}

export class ASMaterialDesignCard extends HTMLElement {
  static mccss: HTMLElement | undefined | null;
  static localScss: HTMLElement | undefined | null;
  static remoteScss: HTMLElement | undefined | null;

  private _options: ASMaterialDesignCardOptions = {
    title: "No title set",
    buttons: new Array<ASMaterialDesignButton>(),
  };
  proxy!: DeepProxy;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.attachObjectListener();
  }

  //Attaches a proxy so we can detect any changed in the settings/options object and rterender
  private attachObjectListener() {
    var thisObject = this;
    let myHandler: ProxyHandler<any> = {
      set: function (obj, key, value) {
        obj = value;
        thisObject.render();
        return true;
      },
      get: function (target: any, property) {
        return target[property];
      },
    };

    this.proxy = new DeepProxy(
      this.options,
      myHandler
    );
    this.options = this.proxy as any;
  }

  static get observedAttributes() {
    return ["logo", "title", "details"]; //Not these values need to be lower-case
  }

  get options(): ASMaterialDesignCardOptions {
    return this._options;
  }

  set options(value: ASMaterialDesignCardOptions) {
    this._options = value;
    this.render();
  }

  public get content(): HTMLElement {
    return this.shadowRoot?.getElementById("content")!
  }

  connectedCallback() {
    for (const prop of (this.constructor as any).observedAttributes) {
      if (this.hasAttribute(prop)) {
        (this as any)[prop] = this.getAttribute(prop);
      }
    }
    this.render();
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    console.log(`name: ${name}, oldValue: ${oldValue}, newValue: ${newValue},`);
    if (oldValue !== newValue) {
      this.render();
    }
  }

  disconnectedCallback() {
    console.log(
      `disconnectedCallback - cleanup anything wehn the custom element is removed`
    );
  }

  render() {



    let cardHTML =
      <div class="mdc-card demo-card demo-basic-with-text-over-media">
        <div
          class="mdc-card__primary-action demo-card__primary-action"
          tabIndex={0}
        >
          <div
            id="header"
            class="mdc-card__media mdc-card__media--custom demo-card__media"
          >
            <div class="mdc-card__media-content demo-card__media-content">
              <div class="demo-card__primary">
                <h2 class="demo-card__title mdc-typography mdc-typography--headline4">
                  {this.options.title}
                </h2>
                <h3 class="demo-card__subtitle mdc-typography mdc-typography--headline5">
                  {this.options.sub_title}
                </h3>
              </div>
            </div>
          </div>

          <div class="demo-card__secondary mdc-typography">
            <div id="content"></div>
            <slot></slot>
          </div>
         
        </div>

        <div class="mdc-card__actions">
          <div class="mdc-card__action-buttons">
            {this.options.buttons?.map((btn) => (
              <Fragment>
                <button
                  class={this.generateButtonClass(btn)}
                  onClick={(e: any) => {
                    btn.clicked?.call(e, this);
                  }}
                >
                  {btn.icon ? (
                    <i
                      class="material-icons mdc-button__icon"
                      aria-hidden="true"
                    >
                      {btn.icon}
                    </i>
                  ) : (
                    <></>
                  )}
                  <span class="mdc-button__ripple"></span>
                  <span class="mdc-button__label">{btn.label}</span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </div>


    render(cardHTML, this.shadowRoot!);
    this.addCss();

    let mdcButtons = this.shadowRoot?.querySelector(".mdc-button");
    if (mdcButtons) {
      const buttonRipple = new MDCRipple(mdcButtons!);
    }
  }



  private generateButtonClass(btn: ASMaterialDesignButton): string | undefined {
    let btnClass = "mdc-button mdc-card__action mdc-card__action--button";

    if (btn.style) btnClass += " " + btn.style;

    if (btn.icon) btnClass += " " + "mdc-button--icon-leading";

    return btnClass;
  }

  private addCss() {
    if (!ASMaterialDesignCard.localScss) {
      let y = LocalScss.use({
        target: this.shadowRoot,
        id: "as-css-local",
      });
      let x = RemoteScss.use({
        target: this.shadowRoot,
        id: "as-css-remote",
      });
      ASMaterialDesignCard.localScss =
        this.shadowRoot?.getElementById("as-css-local");
      ASMaterialDesignCard.remoteScss =
        this.shadowRoot?.getElementById("as-css-remote");
    } else {
      if (!this.shadowRoot?.getElementById("as-css-local")) {
        this.shadowRoot?.append(
          ASMaterialDesignCard.localScss!.cloneNode(true)
        );
        this.shadowRoot?.append(
          ASMaterialDesignCard.remoteScss!.cloneNode(true)
        );
      }
    }
  }
}

console.log("as-material-design-card - custom element defined");
customElements.define("as-material-design-card", ASMaterialDesignCard);
