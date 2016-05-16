import Users from '../data/Users';

import NeoWidget from '../lib/neo-widget';
import ListItemState from '../components/ListItemState';

export default class SelfContainedWidgets extends NeoWidget {
  constructor(config) {
    super(config);
  }

  getInitialState() {
    return {
      items: Users.slice(0, 3),
      showStateCode: false,
    };
  }

  template() {
    return (
      <div>
        {this.state.items.map(item => {
          return <ListItemState key={item.uuid} item={item}/>;
        }, this)}
        <button ev-click={this._toggleState.bind(this)} className='mt2'>toggle state code</button>
        {this._showStateCode()}
      </div>
    );
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
