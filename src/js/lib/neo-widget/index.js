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
  static neo = true;

  static _components = {};

  static delegator = DOMDelegator({ document: document });

  static setComponents(components) {
    NeoWidget._components = components;
  }

  static jsx(jsxObject) {
    const Component = NeoWidget._components[jsxObject.elementName];

    if ((typeof Component === 'function') && (Component.neo === true)) {
      jsxObject.props = jsxObject.attributes;

      if (jsxObject.attributes.key) {
        jsxObject.key = jsxObject.props.key;
      }

      return new Component(jsxObject);
    }

    return h(jsxObject.elementName, jsxObject.attributes, jsxObject.children);
  };

  static _defaults() {
    return {
      elementName: 'DIV',
      type: 'Widget',
      attributes: null,
      children: null,
      props: null,
    };
  };

  constructor(config = {}) {
    Object.assign(this, NeoWidget._defaults(), config);
    Object.assign(this, { state: this.getInitialState() });
    this.props = Object.assign(this.getDefaultProps(), this.props);

    this.virtualNode = this.template();
    this.element = create(this.virtualNode, { document: document });

    if (this.isRoot) {
      this.componentDidMount();
    }
  }

  /* Required by virtual-dom.
   * The function called when the widget is being created.
   * Should return a DOM Element.
   * @private, @protected
   * @return DOMElement
   */
  init() {
    this.componentDidMount();
    return this.element;
  }

  /* Required by virtual-dom.
   * The function called when the widget is being updated.
   * @private, @protected
   * @param previous {Object} The previous Widget
   * @param domNode {DOMElement} The previous DOM Element associated with this widget
   */
  update(previous, domNode) {
    let newTree;
    let patches;

    if (Object.keys(previous.state).length) {
      newTree = previous.virtualNode;
      patches = diff(this.virtualNode, newTree);
    } else {
      newTree = this.virtualNode;
      patches = diff(previous.virtualNode, newTree);
    }

    this.element = patch(domNode, patches);
    this.virtualNode = newTree;
  }

  /* Required by virtual-dom.
   * The function called when the widget is being removed from the dom.
   * @protected, @override
   * @param domNode {DOMElement} The HTMLElement associated with the widget that will be removed
   */
  destroy(domNode) {
    this.componentDidUnMount();
    this.virtualNode = null;
    this.element = null;
  }

  render(element) {
    element.appendChild(this.element);
    return this;
  }

  /* Calls the _update method of its parent passing the nextState.
   * If it has no parent then it will run the _update method on itself
   * otherwise it will update the state of its parent before calling _update.
   * @public
   * @param nextState {Object}
   * @usage setState({mykey: 'my new value'})
   */
  setState(nextState) {
    if (typeof nextState === 'undefined') return;

    Object.assign(this.state, nextState);
    const newTree = this.template();
    const patches = diff(this.virtualNode, newTree);
    this.element = patch(this.element, patches);
    this.virtualNode = newTree;
  }

  /* @override
   */
  getInitialState() { return {}; }

  /* @override
   */
  getDefaultProps() { return {}; }

  /* @override
   */
  template() { return h('div'); }

  /* @override
   */
  componentDidMount() {}

  /* @override
   */
  componentDidUnMount() {}
}
