
// import { MDCRipple } from '@material/ripple';
// import { render } from "preact";
// import LocalScss from "./button.scss"
// import RemoteScss from "./buttonRemote.scss"

// import { MDCTooltip } from '@material/tooltip';
// import { v4 as uuidv4 } from "uuid"
// import { ShareDoBaseWebComponent } from '../BaseWebComponent/ASBaseComponent';

// // export const  enum XPosition {
// //   DETECTED = 0,
// //   START = 1,
// //   CENTER = 2,
// //   END = 3
// // }
// // export const enum YPosition {
// //   DETECTED = 0,
// //   ABOVE = 1,
// //   BELOW = 2
// // }

// export interface Options  {
//   elevation: number | undefined;
// }

// export class ASMaterialButton extends ShareDoBaseWebComponent<Options> {
//   buttonId: string;
//   tooltip: MDCTooltip | undefined;
//   buttonRipple: MDCRipple | undefined;
  
//   constructor() {
//     console.log("--- as-material-button constructor ---")
//     let initOption: ASButtonOptions = {
//       label: "",
//       icon: undefined,
//       disabled: false,
//       elevation: undefined,
//     }
//     super(initOption)
//     this.applyScss(LocalScss, "LocalScss")
//     this.applyScss(RemoteScss, "RemoteScss")

//     //Generate unique Id
//     this.buttonId = uuidv4();
//   }




//   async render(): Promise<void> {
//     //super.render();
//     if (this.hasConnected == false) { return; }

//     this.addToolTipAttributes();
//     this.renderHTML();
//     this.insertTooltipIntoSlot();
//     this.initialiseMDCRippleEffect();
//     this.initialiseMaterialDesignTooltip();

//   }

//   private initialiseMaterialDesignTooltip() {
//     if (this.options?.tooltip) {
//       console.log("after render now init.. tooltip");
//       if (this.shadowRoot!.querySelector('.mdc-tooltip')) {
//         this.tooltip = new MDCTooltip(this.shadowRoot!.querySelector('.mdc-tooltip')!);
//         if(this.tooltip){
//           // this.tooltip?.setHideDelay(30000);///for debug
//           // this.tooltip.setAnchorBoundaryType(0);
//           // console.log("tooltip init", this.tooltip);
//         //  this.tooltip.setTooltipPosition({xPos: 2, yPos: 1});
//           this.tooltip.setTooltipPosition({withCaretPos: 7});
//            this.tooltip.setAnchorBoundaryType(1);
//            this.tooltip.attachScrollHandler((event: any, handler: any) => {
//             // console.log("scroll", event, handler);
//             // console.log("scroll tt:", this.tooltip);

//             let htmlRoot = this.tooltip?.root as HTMLElement;
//             // console.log(" htmlRoot.style?.left:", htmlRoot.style?.left);
//             // console.log("htmlRoot.style?.position:", htmlRoot.style?.position);
//             // console.log("htmlRoot.clientLeft:", htmlRoot.clientLeft);
//             // console.log("htmlRoot.clientTop:", htmlRoot.clientTop);
//             // console.log("htmlRoot.clientWidth:", htmlRoot.clientWidth);
//             // console.log("htmlRoot.clientHeight:", htmlRoot.clientHeight);
//             // console.log("htmlRoot.offsetLeft:", htmlRoot.offsetLeft);
//             // console.log("htmlRoot.offsetTop:", htmlRoot.offsetTop);
//             // console.log("htmlRoot.offsetWidth:", htmlRoot.offsetWidth);
//             // console.log("htmlRoot.offsetHeight:", htmlRoot.offsetHeight);
//             // console.log("htmlRoot.scrollLeft:", htmlRoot.scrollLeft);
//             // console.log("htmlRoot.scrollTop:", htmlRoot.scrollTop);
//             // console.log("htmlRoot.scrollWidth:", htmlRoot.scrollWidth);
//             // console.log("htmlRoot.scrollHeight:", htmlRoot.scrollHeight);
//             // console.log("htmlRoot.getBoundingClientRect():", htmlRoot.getBoundingClientRect());
            
//              htmlRoot.style.left = htmlRoot.clientWidth - 150 + "px";
//               htmlRoot.style.top = htmlRoot.clientHeight - 250 + "px";

//             // //get the x,y position of the button
//             // let btn = this.shadowRoot!.querySelector('.mdc-button') as HTMLElement;
//             // let btnRect = btn.getBoundingClientRect();
//             // console.log("btnRect:", btnRect);
//             // let btnX = btnRect.left;
//             // let btnY = btnRect.top;
//             // let btnWidth = btnRect.width;
//             // let btnHeight = btnRect.height;
//             // console.log("btnX:", btnX);
//             // console.log("btnY:", btnY);
//             // console.log("btnWidth:", btnWidth);
//             // console.log("btnHeight:", btnHeight);

//             // //get the x,y position of the tooltip
//             // let ttRect = htmlRoot.getBoundingClientRect();
//             // console.log("ttRect:", ttRect);
//             // let ttX = ttRect.left;
//             // let ttY = ttRect.top;
//             // let ttWidth = ttRect.width;
//             // let ttHeight = ttRect.height;
//             // console.log("ttX:", ttX);
//             // console.log("ttY:", ttY);
//             // console.log("ttWidth:", ttWidth);
//             // console.log("ttHeight:", ttHeight);

            
//             // //draw a line between the button and the tooltip
//             // //<div class='line'></div>
//             // let existingLine = this.shadowRoot!.querySelector('.line') as HTMLElement;
//             // console.log("existingLine:", existingLine);
//             // if(existingLine){
//             //   existingLine.remove();
//             // }

//             // let line = document.createElement("div");
//             // line.classList.add("line");
            
//             // //first dot
//             //   let posax = btnRect.left 
//             //   let posay = btnRect.top
              
//             //   //last dot
//             //   let posbx = ttRect.left;
//             //   let posby = ttRect.top;

//             //   let centerx;
//             //   let centery;
//             //   let distance;
              
//             //   //get line current width
//             //   let lineRec = line.getBoundingClientRect();
              
//             //   //find center points;
//             //   centerx = (posax+posbx)/2;
//             //   centery = (posay+posby)/2;
              
//             //   //angle 
//             //   let angle = Math.atan2(posay-posby,posax-posbx)* 180 / Math.PI;
              
//             //   //distance
//             //   distance = Math.sqrt(    Math.pow((posbx-posax),2) + Math.pow((posby-posay),2)    );
              
//             //   //bring all the work together
//             //   line.style.width= distance +"px";
//             //   line.style.transform= "rotate("+angle+"deg)";
//             //   line.style.top= (centery  - (lineRec.height/2)+(btnRect.height/4)).toString() + "px";
//             //   line.style.left= (centerx - (lineRec.width/2)+(btnRect.width/4)).toString() + "px"; 
  

//             // this.shadowRoot!.appendChild(line);
            


//            });
      
//         }

      
//       }
//     }
//   }

//   private initialiseMDCRippleEffect() {
//     if (this.shadowRoot!.querySelector('.mdc-button')) {
//       this.buttonRipple = new MDCRipple(this.shadowRoot!.querySelector('.mdc-button')!);
//       let btn = this.shadowRoot!.querySelector('.mdc-button') as HTMLElement;
//       if (this.options?.disabled && this.options?.disabled == true) {
//         btn.setAttribute("disabled", "");
//       }
//       else {
//         btn.removeAttribute("disabled");
//       }
//     }
//   }

//   private insertTooltipIntoSlot() {
//     if (this.options?.tooltip && typeof this.options?.tooltip == "object") {
//       let tooltip = this.shadowRoot!.querySelector('#tooltip_slot') as HTMLSlotElement;
//       if (tooltip) {
//         tooltip.innerHTML = "";
//         tooltip.appendChild(this.options?.tooltip);
//       }
//     }
//   }

//   private renderHTML() {
//     let buttonHtml = 
//     <div part="wrapper" class="mdc-touch-target-wrapper fill-area">
//       <button
//         part="button"
//         class={this.generateButtonClass(this.options)}
//         onClick={(e) => {
//           if (this.options?.clicked && this.options?.disabled != true) {
//             this.options?.clicked?.call(e, this);
//           }
//         } }
//       >
//         {this.options?.icon ? (
//           <i
//             class="material-icons mdc-button__icon"
//             aria-hidden="true"
//           >
//             {this.options.icon}
//           </i>
//         ) : (
//           <></>
//         )}

//         <span class="mdc-button__ripple"></span>
//         <span class="mdc-button__touch"></span>
//         <span part="label" class="mdc-button__label">{this.options!.label}</span>
//         <slot></slot>

//       </button>
//       {this.renderToolTip()}
//     </div>;

//     render(buttonHtml, this.shadowRoot!);
//   }

//   toolTipId() {
//     return "tt" + this.buttonId;
//   }

//   addToolTipAttributes() {
//     //do this, event if tooltip is not set, because we need the id for the aria-describedby attribute
//     //if tooltip is not set, the id is not used and the tooltip is not shown 
//     this.setAttribute("aria-describedby", this.toolTipId());
//     this.setAttribute("data-tooltip-id", this.toolTipId());
//   }
//   renderToolTip(): import("preact").ComponentChild {
//     let toolTip = (<></>)
//     if(typeof this.options?.tooltip == "string"){
//       toolTip = <div id={this.toolTipId()} class="mdc-tooltip mdc-tooltip--rich" aria-hidden="true" role="dialog">
//           <div class="mdc-tooltip__surface mdc-tooltip__surface-animation">
//             <h2 class="mdc-tooltip__title">{this.options.label} - Information</h2>
//             <p class="mdc-tooltip__content">
//               {this.options?.tooltip}
//               <a class="mdc-tooltip__content-link" href="google.com">link</a>
//             </p>
//           </div>
//         </div>
//     }

//     if(typeof this.options?.tooltip == "object"){
//       toolTip = <div id={this.toolTipId()} class="point mdc-tooltip mdc-tooltip--rich" aria-hidden="true" role="dialog">
//           <div class="mdc-tooltip__surface mdc-tooltip__surface-animation">
//             <slot part="tooltip_slot" id="tooltip_slot"></slot>
//           </div>
//         </div>
//     }

//     return toolTip;
//   }

//   private generateButtonClass(btn: ASButtonOptions | undefined): string | undefined {
//     let btnClass = "fill-area mdc-button mdc-button--touch mdc-card__action mdc-card__action--button";
//     if (!btn) return btnClass;
//     if (btn.style) btnClass += " " + btn.style;
//     btnClass += " " + "point";
//     if (btn.icon) btnClass += " " + "mdc-button--icon-leading";
//     if (btn.disabled){
//        btnClass += " " + "disabled";
//        this.classList.add("disabled")
//     }
//     if (btn.elevation && btn.elevation > 0) btnClass += " " + "mdc-elevation--z" + btn.elevation;

//     return btnClass;
//   }
// }
// console.log("as-material-button - custom element defined");
// customElements.define("as-material-button", ASMaterialButton);