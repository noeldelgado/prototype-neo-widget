import NeoWidget from '../lib/neo-widget';
import ListItemState from '../components/ListItemState';

export default class SelfContainedWidgets extends NeoWidget {
  constructor(config) {
    super(config);
  }

  getInitialState() {
    return {
      items: [],
      showStateCode: false,
    };
  }

  componentDidMount() {
    this.inputElement = this.element.querySelector('input');
  }

  template() {
    return (
      <div>
        {this.state.items.map(item => {
          return (<ListItemState key={`sus-${item.uuid}`} item={item}
            onDelete={this._onDelete.bind(this, item)} />);
        }, this)}
        <form key='sus-form' ev-submit={this._handleSubmit.bind(this)} className='mt2'>
          <input />
          <button>Add #{this.state.items.length + 1}</button>
        </form>
        <button ev-click={this._toggleState.bind(this)} className='mt2'>toggle state code</button>
        {this._showStateCode()}
      </div>
    );
  }

  _handleSubmit(ev) {
    ev.preventDefault();

    const newItem = {
      text: this.inputElement.value,
      uuid: Date.now(),
    };
    const nextItems = this.state.items.concat([newItem]);

    this.inputElement.value = '';

    this.setState({
      items: nextItems,
    });
  }

  _onDelete(item) {
    const arr = this.state.items.slice();
    const index = arr.indexOf(item);

    if (index > -1) {
      arr.splice(index, 1);
    }

    this.setState({
      items: arr,
    });
  }

  _toggleState() {
    this.setState({
      showStateCode: !this.state.showStateCode,
    });
  }

  _showStateCode() {
    if (this.state.showStateCode) {
      return (<pre className='sample-code'>
        <code>{JSON.stringify(this.state, null, 2)}</code></pre>);
    }
  }
}
