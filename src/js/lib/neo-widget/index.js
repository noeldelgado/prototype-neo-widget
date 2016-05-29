/*
  Widgets are used to take control of the patching process, allowing the user
  to create stateful components, control sub-tree rendering, and hook into
  element removal.

  A Widget is a custom data structure for representing an
  object in a virtual tree.

  A Widget allows you to fully specify the semantics of
  intitialization of the object, updating of the object
  and destruction of the object.

  A Widget should generally be used for custom, performance
  critical code.

  type Widget : {
    type: "Widget",
    init: () => DOMElement,
    update: (previous: Widget, domNode: DOMElement) => void,
    destroy: (node: DOMElement) => void
  }
 */

import { h, create, diff, patch } from 'virtual-dom';
import DOMDelegator from 'dom-delegator';

export default class NeoWidget {
  constructor(config = {}) {
    this.type = 'Widget';
    Object.assign(this, config);
    this.state = this.getInitialState();
    this.props = Object.assign(this.getDefaultProps(), this.attributes);
    this._latestUpdateChange = null;

    if (typeof this.props.key !== 'undefined') {
      this.key = this.props.key;
    }

    this.virtualNode = this.template();
    this.element = create(this.virtualNode, { document });
  }

  /* Required by virtual-dom.
   * The function called when the widget is being created.
   * Should return a DOM Element.
   * @private
   * @return DOMElement
   */
  init() {
    this.componentDidMount();
    return this.element;
  }

  /* Required by virtual-dom.
   * The function called when the widget is being updated.
   * @private
   * @param previous {Object} The previous Widget
   * @param domNode {DOMElement} The previous DOM Element associated with this widget
   */
  update(previous, domNode) {
    if (previous._latestUpdateChange) return;
    if (!this.shouldComponentUpdate(previous.state, previous.props)) return;

    let newTree = this.virtualNode;
    let patches = diff(previous.virtualNode, newTree);
    this.element = patch(domNode, patches);
    this.virtualNode = newTree;

    newTree = patches = null;
  }

  /* Required by virtual-dom.
   * The function called when the widget is being removed from the dom.
   * @protected
   * @param domNode {DOMElement} The HTMLElement associated with the widget that will be removed
   */
  destroy(domNode) {
    this.componentDidUnMount();
    this.virtualNode = null;
    this.element = null;
  }

  /* Extends the instance’s @state property with the passed nextState.
   * Creates a new diff/patch of the new tree representation.
   * This will make virtual-dom to run the private update method.
   * @protected
   * @param nextState {Object}
   * @usage setState({mykey: 'my new value'})
   */
  setState(nextState) {
    if (typeof nextState === 'undefined') return;
    if (!this.shouldComponentUpdate(nextState, this.props)) return;

    Object.assign(this.state, nextState);
    this._latestUpdateChange = true;

    let newTree = this.template();
    let patches = diff(this.virtualNode, newTree);
    this.element = patch(this.element, patches);
    this.virtualNode = newTree;

    newTree = patches = null;
  }

  /* @abstract
   */
  getInitialState() { return {}; }

  /* @abstract
   */
  getDefaultProps() { return {}; }

  /* @abstract
   * @return virtualTree
   */
  template() { return h('div'); }

  /* @abstract
   */
  componentDidMount() {}

  /* @abstract
   */
  componentDidUnMount() {}

  /* @abstract
   * @param {Object} previousState
   * @param {Object} previousProps
   * @return {Boolean} [true]
   */
  shouldComponentUpdate(previousState, previousProps) { return true; }
}

/** @private */
NeoWidget._components = {};

/** @protected */
NeoWidget.jsx = function (jsxObject) {
  const Component = NeoWidget._components[jsxObject.elementName];

  if (typeof Component === 'function') {
    return new Component(jsxObject);
  }

  return h(jsxObject.elementName, jsxObject.attributes, jsxObject.children);
};

/** @public */
NeoWidget.delegator = DOMDelegator({ document });

/** @public */
NeoWidget.setComponents = function (components) {
  NeoWidget._components = components;
};

/** @public */
NeoWidget.render = function (component, element) {
  element.appendChild(component.element);
  component.componentDidMount();
  return component;
};

