import NeoWidget from '../lib/neo-widget';
import Overlay from '../components/Overlay';

export default class OverlayTest extends NeoWidget {
  getInitialState() {
    return {
      showOverlay: false,
    };
  }

  template() {
    return (
      <div>
        <button ev-click={this._openOverlay.bind(this)}>Open overlay</button>
        {this.state.showOverlay ? (
          <Overlay onClose={this._closeOverlay.bind(this)} />
        ) : null}
      </div>
    );
  }

  _openOverlay() {
    this.setState({
      showOverlay: true,
    });
  }

  _closeOverlay() {
    this.setState({
      showOverlay: false,
    });
  }
}
