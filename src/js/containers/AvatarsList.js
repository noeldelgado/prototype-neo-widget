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
          return <Avatar key={`al-${user.uuid}`} src={user.avatar} size={20}/>;
        }, this)}
        <div>
          <button ev-click={this._shuffleHandler.bind(this)} className='js-shuffle'>shuffle</button>
          <button ev-click={this._swapHandler.bind(this)} className='js-swap'>swap</button>
        </div>
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
}
