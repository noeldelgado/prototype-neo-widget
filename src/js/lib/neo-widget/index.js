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

  static delegator = DOMDelegator({ document: document });

  static jsx(jsxObject) {
    const Component = window[jsxObject.elementName];
    if ((typeof Component === 'function') && (Component.neo === true)) {
      jsxObject.parent = this;
      jsxObject.props = jsxObject.attributes;
      return new Component(jsxObject);
    }

    return h(jsxObject.elementName, jsxObject.attributes, jsxObject.children);
  };

  static _defaults() {
    return {
      elementName: 'DIV',
      type: 'Widget',
      attributes: {},
      children: [],
      props: {},
    };
  };

  constructor(config = {}) {
    Object.assign(this, NeoWidget._defaults(), config);
    Object.assign(this, { state: this.getInitialState() });
    this.props = Object.assign(this.getDefaultProps(), this.props);

    const container = this._getContainer();
    const keyPath = this._getKeyPath();
    const newState = container.state[keyPath];
    if (newState) {
      Object.assign(this.state, newState);
    }

    this.virtualNode = this.template();
    this.element = create(this.virtualNode, { document: document });

    if (!this.parent) {
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
    const newTree = this.virtualNode;
    const patches = diff(previous.virtualNode, newTree);
    this.element = patch(domNode, patches);
    this.virtualNode = newTree;
  }

  /* Required by virtual-dom.
   * The function called when the widget is being removed from the dom.
   * @protected, @override
   * @param domNode {DOMElement} The HTMLElement associated with the widget that will be removed
   */
  destroy(domNode) {
    this.virtualNode = null;
    this.element = null;
  }

  _getContainer() {
    var _this = this;
    while (_this.parent) _this = _this.parent;
    return _this;
  }

  _getKeyPath() {
    var _this = this;
    var key = _this.elementName + '.' + (_this.props.key || _this.key);;
    while (_this.parent) {
      _this = _this.parent;
      key += '.' + _this.elementName + '.' + (_this.props.key || _this.key);;
    }

    return key;
  }

  /* Performs a merge of nextState into current state, then creates a diff/patch.
   * @private
   * @param nextState {Object}
   */
  _update(nextState) {
    if (typeof nextState === 'undefined') return;

    Object.assign(this.state, nextState);
    const newTree = this.template();
    const patches = diff(this.virtualNode, newTree);
    this.element = patch(this.element, patches);
    this.virtualNode = newTree;
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
    if (!this.parent) {
      return this._update(nextState);
    }

    const container = this._getContainer();
    const keyPath = this._getKeyPath();

    if (container.state[keyPath]) {
      Object.assign(container.state[keyPath], nextState);
    } else {
      container.state[keyPath] = nextState;
    }

    container._update(container.state);
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
}
