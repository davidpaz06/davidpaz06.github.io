import { Minus } from "./Minus.js";
export const MinusSwitch = class extends Minus {
  constructor(props) {
    super(props);
    this.name = "MinusSwitch";
    this.props = props;
    this.built = () => {};
    this.attachShadow({ mode: "open" });
    this.template = document.createElement("template");
    console.log("Minus Switch loaded");
  }

  // HTML template
  #getTemplate() {
    return `
              <div class = "container switchOff">
                  <div class= "ball Off"></div>
              </div>
              `;
  }

  // CSS template
  #getCss() {
    return `
      .container {
          width: 45px;
          min-height: 20px;
          border-radius: 20px;
          cursor: pointer;
          margin: 5px;
          display: flex;
          align-items: center;
      }
  
      .ball{
  
          width: 20px;
          height: 20px;
          background: linear-gradient(white, rgb(220, 218, 218));
          border-radius: 50%; 
          box-shadow: 20px 1px 10px rgba(0, 0, 0, 0.5);
          position: relative;
      }
  
      .switchOff{
          transition: ease  .4s;
          background-color: rgb(90, 90, 90);
          border: 2px solid rgb(90, 90, 90);
      }
  
      .switchOn{
          transition: ease .4s;
          background-color: rgb(39, 132, 224);
          border: 2px solid rgb(39, 132, 224);
      }
  
      @keyframes slideOn {
  
          from{
              left: 0px;
              box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.5);
          }
  
          to{
              left: 57.5%;
              box-shadow: -2px 1px 10px rgba(0, 0, 0, 0.5);
          }
      }
  
      @keyframes slideOff {
  
          from{
              left: 57.5%;
              box-shadow: -2px 1px 10px rgba(0, 0, 0, 0.5);
  
          }
  
          to{
              left: 0px;
              box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.5);
          }
      }
  
      .On{
          animation: slideOn .35s forwards;
      }
      .Off{
          animation: slideOff .35s forwards;
      }`;
  }

  #render() {
    let sheet = new CSSStyleSheet();
    sheet.replaceSync(this.#getCss());
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.template.innerHTML = this.#getTemplate();
    let tpc = this.template.content.cloneNode(true);
    this.mainElement = tpc.firstChild.nextSibling;
    this.ball = this.mainElement.firstChild.nextSibling;
    this.shadowRoot.appendChild(this.mainElement);
  }

  #getShadowDOMElements() {
    this.ball = this.shadowRoot.querySelector(".ball");

    this.mainElement.addEventListener("click", () => {
      this.mainElement.classList.toggle("switchOn");
      this.mainElement.classList.toggle("switchOff");
      this.ball.classList.toggle("On");
      this.ball.classList.toggle("Off");

      if (this.mainElement.classList.contains("switchOn")) {
        this.mainElement.style.backgroundColor = this.getAttribute("color");
        this.mainElement.style.borderColor = this.getAttribute("color");
      } else {
        this.mainElement.style.backgroundColor = this.getAttribute("colorOff");
        this.mainElement.style.borderColor = this.getAttribute("colorOff");
      }
    });
  }

  #getAttr() {
    for (let attr of this.getAttributeNames()) {
      if (attr.substring(0, 2) != "on") {
        this.mainElement.setAttribute(attr, this.getAttribute(attr));
        this[attr] = this.getAttribute(attr);
      }

      switch (attr) {
        case "id":
          minus.createInstance("MinusSwitch", { id: this[attr] });
          break;
      }
    }
  }

  customStyle(obj, objStyle) {
    var elements = this.shadowRoot.querySelectorAll(obj);

    if (elements.length > 0) {
      elements.forEach((e) => {
        for (let attr in objStyle) {
          e.style[attr] = objStyle[attr];
        }
      });
    }
  }

  #getProps() {
    if (this.props) {
      for (let attr in this.props) {
        switch (attr) {
          case "style":
            for (let selector in this.props.style) {
              this.customStyle(selector, this.props.style[selector]);
            }
            break;

          case "events":
            for (let attrevent in this.props.events) {
              this.mainElement.addEventListener(
                attrevent,
                this.props.events[attrevent]
              );
            }
            break;

          default:
            this.setAttribute(attr, this.props[attr]);
            this[attr] = this.props[attr];

            if (attr === "id")
              minus.createInstance("MinusSwitch", { id: this[attr] });
        }
      }
    }
  }

  async connectedCallback() {
    this.#render();
    this.#getShadowDOMElements();
    this.#getAttr();
    this.#getProps();
    this.built();
  }

  addToBody() {
    document.body.appendChild(this);
  }

  get size() {
    return this.mainElement.style.width;
  }
  set size(val) {
    this.setAttribute("size", val);
    this.ball.style.width = val;
    this.ball.style.height = val;
    this.mainElement.style.width = parseInt(val) * 2 + parseInt(val) / 3 + "px";
    this.mainElement.style.height = val;
    this.mainElement.style.border =
      parseInt(val) / 10 + 1 + "px solid rgb(90, 90, 90)";
    this.mainElement.style.borderRadius = val;
  }

  get color() {
    return this.mainElement.style.backgroundColor;
  }
  set color(val) {
    this.setAttribute("color", val);

    if (this.mainElement.classList.contains("switchOn")) {
      this.mainElement.style.backgroundColor = val;
    }
  }

  get colorOff() {
    return this.mainElement.style.backgroundColor;
  }
  set colorOff(val) {
    this.setAttribute("colorOff", val);

    if (this.mainElement.classList.contains("switchOff")) {
      this.mainElement.style.backgroundColor = val;
      this.mainElement.style.borderColor = val;
    }
  }
};

customElements.define("minus-switch", MinusSwitch);
