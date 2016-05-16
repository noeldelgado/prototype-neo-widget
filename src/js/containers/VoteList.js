import Users from '../data/Users';

import NeoWidget from '../lib/neo-widget';
import VoteItem from '../components/VoteItem';

export default class UpvoteWidgets extends NeoWidget {
  constructor(config) {
    super(config);
  }

  getInitialState() {
    const items = JSON.parse(JSON.stringify(Users.slice(0, 3))).map(item => {
      item.votes = 0;
      return item;
    });

    return {
      items,
      showStateCode: false,
    };
  }

  template() {
    return (
      <div>
        {this.state.items.sort((a, b) => (a.votes < b.votes)).map(item => {
          return (
            <VoteItem key={`v-${item.uuid}`}
              item={item}
              upVote={this._onUpVote.bind(this, item)}
              downVote={this._onDownVote.bind(this, item)}
            />
          );
        }, this)}
        <button ev-click={this._toggleState.bind(this)} className='mt2'>toggle state code</button>
        {this._showStateCode()}
      </div>
    );
  }

  _onUpVote(item) {
    item.votes++;
    this.setState({
      items: this.state.items,
    });
  }

  _onDownVote(item) {
    item.votes--;
    this.setState({
      items: this.state.items,
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
