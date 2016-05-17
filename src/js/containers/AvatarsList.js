import Users from '../data/Users';

import NeoWidget from '../lib/neo-widget';
import Avatar from '../components/Avatar';
import { shuffle, swap } from '../lib/utils';

export default class WidgetViewTest extends NeoWidget {
  getInitialState() {
    return {
      users: JSON.parse(JSON.stringify(Users.slice())),
      showStateCode: false,
    };
  }

  template() {
    return (
      <div>
        {this.state.users.map((user) => {
          return <Avatar src={user.avatar} size={20}/>;
        }, this)}
        <div>
          <button ev-click={this._shuffleHandler.bind(this)} className='js-shuffle'>shuffle</button>
          <button ev-click={this._swapHandler.bind(this)} className='js-swap'>swap</button>
        </div>
        <button ev-click={this._toggleState.bind(this)} className='mt2'>toggle state code</button>
        {this._showStateCode()}
      </div>
    );
  }

  _shuffleHandler() {
    const users = shuffle(this.state.users.slice());
    this.setState({
      users: users,
    });
  }

  _swapHandler() {
    const users = swap(this.state.users.slice());
    this.setState({
      users: users,
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
