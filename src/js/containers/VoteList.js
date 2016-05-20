import Users from '../data/Users';

import NeoWidget from '../lib/neo-widget';
import VoteItem from '../components/VoteItem';

export default class VoteList extends NeoWidget {
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
            <VoteItem key={`vl-${item.uuid}`}
              item={item}
              upVote={this._onUpVote.bind(this, item)}
              downVote={this._onDownVote.bind(this, item)}
            />
          );
        }, this)}
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
}
