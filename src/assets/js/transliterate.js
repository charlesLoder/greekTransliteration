const grc = require("greek-transliteration");
const schema = require("greek-transliteration/dist/schema");
const Schema = schema.Schema;
const transliterate = grc.transliterate;
const sbl = new schema.SBL({});
const props = Object.keys(sbl);

/**
 * checks if schema props are stored on local storage
 * @param {string[]} props
 * @returns {boolean}
 */
function checkLocalStorage(props) {
  return props.map((p) => localStorage.getItem(p)).filter((e) => e).length ? true : false;
}

/**
 * generates a schema from local storage
 * @param {string[]} props
 * @returns {Schema}
 */
function schemaFromLocalStorage(props) {
  return props.reduce((schema, prop) => {
    schema[prop] = localStorage.getItem(prop);
    return schema;
  }, {});
}

/**
 * sets a schema to local storage
 * @param {Schema} schema
 */
function setSchemaLocalStorage(schema) {
  const props = Object.keys(schema);
  props.forEach((p) => localStorage.setItem(p, schema[p]));
}

/**
 * gets a Partial schema from modal values
 *
 * @param {string[]} schemaProps schema properties
 * @returns {Partial<Schema>}
 */
function getSchemaModalVals(schemaProps) {
  return schemaProps.reduce((schema, prop) => {
    const el = document.querySelector(`#${prop}`);
    if (el) schema[prop] = el.value;
    return schema;
  }, {});
}

/**
 * populates the modal with values from the Schema property by finding the HTMLElement with corresponding id
 *
 * @param {Schema} schema
 * @param {string} prop a property from the Schema type
 */
function populateSchemaModal(schema, prop) {
  try {
    const el = document.querySelector(`#${prop}`);
    if (el) el.value = schema[prop];
  } catch (error) {
    console.error(error);
  }
}

/**
 * populates the schema modal using either local storage or standard SBL
 *
 * @param {string[]} props schema properties
 * @param {Schema} schema
 * @returns {void}
 */
function loadSchema(props, schema) {
  if (checkLocalStorage(props)) {
    document.querySelector("#last-visit").hidden = false;
    props.forEach((p) => populateSchemaModal(schemaFromLocalStorage(props), p));
    return;
  }
  props.forEach((p) => populateSchemaModal(schema, p));
}

class Wizard {
  /**
   *
   * @param {HTMLCollection} HTMLCollection
   * @param {string} onClass - css class to control if panel is visible
   * @param {string} offClass - css class to control if panel is not visible
   */
  constructor(HTMLCollection, onClass, offClass) {
    this.steps = HTMLCollection;
    this.index = 0;
    this.onClass = onClass;
    this.offClass = offClass;
  }
  previous() {
    return this.steps[this.index - 1] ?? null;
  }
  current() {
    return this.steps[this.index];
  }
  next() {
    return this.steps[this.index + 1] ?? null;
  }
  turnOn(step) {
    step.classList.toggle(this.offClass);
    step.classList.toggle(this.onClass);
  }
  turnOff(step) {
    step.classList.toggle(this.onClass);
    step.classList.toggle(this.offClass);
  }
  increaseStep() {
    if (this.next()) {
      this.turnOff(this.current());
      this.turnOn(this.next());
      this.index = this.index + 1;
      return true;
    }
    return false;
  }
  decreaseStep() {
    if (this.previous()) {
      this.turnOff(this.current());
      this.turnOn(this.previous());
      this.index = this.index - 1;
      return true;
    }
    return false;
  }
  reset() {
    this.turnOff(this.current());
    this.index = 0;
    this.turnOn(this.steps[this.index]);
  }
}

/**
 *
 * @param {Wizard} wizard
 * @returns {void}
 */
function nextModalWindow(wizard) {
  if (!wizard.next()) return;

  if (!wizard.previous()) {
    wizard.turnOn(prevBtn);
  }

  wizard.increaseStep();

  if (wizard.index) {
    nextBtn.innerText = "Next";
  }

  if (!wizard.next()) {
    wizard.turnOff(nextBtn);
    wizard.turnOn(finalBtn);
  }
}

/**
 *
 * @param {Wizard} wizard
 * @returns {void}
 */
function prevModalWindow(wizard) {
  if (!wizard.previous()) return;

  if (!wizard.next()) {
    wizard.turnOff(finalBtn);
    wizard.turnOn(nextBtn);
  }

  wizard.decreaseStep();

  if (!wizard.index) {
    nextBtn.innerText = "Customize";
  }

  if (!wizard.previous()) {
    wizard.turnOn(prevBtn);
  }
}

/**
 *
 * @param {Wizard} wizard
 * @return {void}
 */
function resetModalWindow(wizard) {
  wizard.reset();
  wizard.turnOn(nextBtn);
  wizard.turnOff(finalBtn);
  wizard.turnOff(prevBtn);
}

/**
 * step through form wizard with arrows
 */
function checkKey(e) {
  // if the modal is not open, do nothing
  if (document.querySelector("#schema-modal").offsetTop !== 0) return;

  // if an element is active, do nothing
  if (document.activeElement.tagName === ("INPUT" || "SELECT")) return;

  e = e || window.event;

  // left arrow
  if (e.keyCode == "37") prevModalWindow(wizard);

  // right arrow
  if (e.keyCode == "39") nextModalWindow(wizard);
}

document.onkeydown = checkKey;

// HTML ELEMENTS
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const transliterateBtn = document.querySelector("#transliterateBtn");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const finalBtn = document.querySelector("#final-btn");
const steps = document.querySelector("#modal-cards").children;

// init wizard
const wizard = new Wizard(steps, "d-block", "d-none");
nextBtn.addEventListener("click", () => nextModalWindow(wizard));
prevBtn.addEventListener("click", () => prevModalWindow(wizard));
finalBtn.addEventListener("click", () => resetModalWindow(wizard));

// init transliteration
loadSchema(props, sbl);
output.placeholder = transliterate(input.placeholder, getSchemaModalVals(props));
transliterateBtn.addEventListener("click", () => {
  try {
    const schema = getSchemaModalVals(props);
    const transText = transliterate(input.value || input.placeholder, schema);
    setSchemaLocalStorage(schema);
    output.value = transText;
  } catch (error) {
    output.value = `Hmmm...it appears something went wrong${error.message ? ":\n" + error.message : "!"}`;
    console.error(error);
  }
});
