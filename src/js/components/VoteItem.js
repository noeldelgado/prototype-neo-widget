import NeoWidget from './../lib/neo-widget';
import Avatar from './Avatar';

export default class VoteItem extends NeoWidget {
  constructor(config = {}) {
    super(config);
  }

  template() {
    const { item, upVote, downVote } = this.props;
    let className = 'inline-block align-middle bold center';

    if (item.votes > 0) {
      className += ' green';
    } else if (item.votes < 0) {
      className += ' red';
    }

    return (
      <div>
        <div style={{ width: '20px' }} className={className}>{item.votes}</div>
        <Avatar key={`a-${item.uuid}`}
          src={item.avatar} size={20} className='align-middle' />
        <p className='m0 inline-block align-middle'>{item.name}</p>
        <button ev-click={upVote} className='js-upvote green'>Upvote</button>
        <button ev-click={downVote} className='js-downvote red'>Downvote</button>
      </div>
    );
  }
}
