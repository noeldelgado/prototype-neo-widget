import NeoWidget from '../lib/neo-widget';
import ListItemState from '../components/ListItemState';
import { getRandomInt } from '../lib/utils';

export default class SelfContainedWidgets extends NeoWidget {
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
      </div>
    );
  }

  _handleSubmit(ev) {
    ev.preventDefault();

    const newItem = {
      text: this.inputElement.value,
      uuid: Date.now(),
      avatar: `0${getRandomInt(1, 9)}.jpg`,
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
}
