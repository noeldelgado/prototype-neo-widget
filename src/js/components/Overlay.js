import NeoWidget from './../lib/neo-widget';

export default class Overlay extends NeoWidget {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentDidUnMount() {
    document.body.style.overflow = '';
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
}
