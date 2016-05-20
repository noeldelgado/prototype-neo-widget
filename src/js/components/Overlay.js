import NeoWidget from './../lib/neo-widget';

export default class Overlay extends NeoWidget {
  componentDidMount() {
    document.body.style.overflow = 'hidden';

    this._keyDownHandlerRef = this._keyDownHandler.bind(this);
    NeoWidget.delegator.addEventListener(document, 'keydown', this._keyDownHandlerRef);
  }

  componentDidUnMount() {
    document.body.style.overflow = '';

    NeoWidget.delegator.removeEventListener(document, 'keydown', this._keyDownHandlerRef);
    this._keyDownHandlerRef = null;
  }

  template() {
    const styles = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#333',
      color: '#fff',
    };

    return (
      <div style={styles} className='p4'>
        <button ev-click={this.props.onClose} className='red'>close</button>
        <h1>Overlay</h1>
      </div>
    );
  }

  _keyDownHandler(ev) {
    if (ev.keyCode === 27) {
      this.props.onClose();
    }
  }
}
