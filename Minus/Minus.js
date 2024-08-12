export class Minus extends HTMLElement {
  constructor(props) {
    super();
    this.modules = new Map(); //mapa donde se almacenaran los modulos de Minus (clases/componentes)
    this.instances = new Map(); //mapa que almacena cada instancia de alguna clase
    this.callbackIds = new Set(); //set que guarda las instancias en construccion
    this.onBuildComplete = () => {}; //cuando se construyan todas las instancias, el desarrollador puede usar esta funcion para definir cualquier accion que desee ejecutar
    this.props = props || {}; //si se pasan propiedades, se establecen
  }

  //este metodo permite ejecutar una funcion (callback) que se ejecuta una vez se construyan todas las instancias. se asigna la funcion a   this.onBuildComplete y se ejecuta en el constructor
  setBuildCompleteCallback(callback) {
    this.onBuildComplete = callback;
    return this;
  }

  //obtiene una instancia mediante su id del mapa de instancias
  getInstance(id) {
    return this.instances.get(id) || null;
  }

  //permite hacer imports dinamicos, es decir, cargar clases (modulos) solo cuando son necesarios. si la clase no existe en modules, la registra y la guarda para luego retornarla mediante el metodo. si ya existe se retorna inmediatamente
  async getModuleClass(className) {
    if (!this.modules.has(className)) {
      const module = await import(`./${className}.js`);
      this.modules.set(className, module[className]);
    }
    return this.modules.get(className);
  }

  // este metodo notifica que una instancia ya fue construida y la elimina del set. si el tamaño del set es 0 se llama a onBuildcomplete confirmando que todas las instancias fueron construidas
  notifyInstanceBuilt(id) {
    if (this.callbackIds.has(id)) {
      this.callbackIds.delete(id);
      if (this.callbackIds.size === 0) {
        this.onBuildComplete();
      }
    }
    return this;
  }

  // este metodo permite registrar componentes (componentes HTML)de otras librerias dentro de Minus
  addHTMLInstance(instance) {
    this.instances.set(instance.id, instance);
    return this;
  }

  // metodos que permiten mostrar y esconder un elemento
  hide() {
    this.style.display = "none";
    return this;
  }
  show(display = "flex") {
    this.style.display = display;
    return this;
  }

  //   metodo que intenta crear una instancia de una clase si no existe la instancia en el mapa. se apagan las notifiaciones, se obtiene el modulo y se instancia y esta nueva variable (la instancia misma) se guarda en el mapa registrando el nombre de la instancia como value y el id como key
  async createInstance(className, props) {
    try {
      if (!this.instances.has(props.id)) {
        props.notify = false;
        const ModuleClass = await this.getModuleClass(className);
        const instance = new ModuleClass(props);
        this.instances.set(props.id, instance);
        return instance;
      }
      return this.instances.get(props.id);
    } catch (error) {
      console.error("Error creando la instancia:", error);
      return null;
    }
  }

  // getters y setters

  get buildCompleteCallback() {
    return this.onBuildComplete;
}

set buildCompleteCallback(callback) {
    this.onBuildComplete = callback;
}

get callbackIDs() {
    return [...this.callbackIds];
}

set callbackIDs(ids) {
    ids.forEach(id => this.callbackIds.add(id));
}

}

customElements.define("x-minus", Minus);

window.minus = new Minus();
minus.react = () => {
    for (const instance of minus.instances.values()) {
        if (instance.value || instance.equation) {
            if (instance._equation) {
                instance._value = eval(instance.equation.toString());
            }
        }
    }
};

// clases auxiliares
class Any {
    static observedAttributes = ["equation", "value"];
    
    constructor(value) {
        this._value = value || null;
        this._equation = null;
    }

    get value() { return this._value; }
    set value(value) { this._value = value; this.react(); }
    
    get equation() { return this._equation; }
    set equation(equation) { this._equation = equation; this.react(); }
    
    react() {
        minus.react();
    }
}

class Integer extends Any {
    constructor(value) { super(value); }
    parse(value) { this._value = value; return parseInt(this._value, 10); }
}

class Float extends Any {
    constructor(value) { super(value); }
    parse(value) { this._value = value; return parseFloat(this._value); }
}

addEventListener("DOMContentLoaded", () => {
    if (typeof minusInit === 'function') {
        minusInit();
    }
});
