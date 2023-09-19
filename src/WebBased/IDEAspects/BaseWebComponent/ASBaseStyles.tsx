/*

  Responsible for loading the shared SCSS files.
  Web-Components inside a shadow-dom seem to need the google fonts to be loaded first at a page level outside the shadow dom

*/

import { createRef, RefObject, render } from "preact";
import SharedRemoteScss from "./sharedRemote.scss";

export interface ASSharedOptions {
  icons: boolean;
}

export class ASMaterialShared extends HTMLElement {
  constructor() {
    super();
  }

  static ref = createRef();
  static inserted = false;

  connectedCallback() {
    this.render();
  }

  async render(): Promise<void> {
    let html = <div ref={ASMaterialShared.ref} id="shared-styles"></div>;
    this.innerHTML = "";
    render(html, this);

    console.log(ASMaterialShared.ref);
    let y = SharedRemoteScss.use({
      target: this,
      id: "asShared",
    });
  }
}
console.log("as-material-shared - custom element defined");
customElements.define("as-material-shared", ASMaterialShared);
