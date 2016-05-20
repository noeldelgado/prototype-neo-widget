import NeoWidget from './../lib/neo-widget';
import Avatar from './Avatar';

export default class ListItemState extends NeoWidget {
  getInitialState() {
    return {
      activated: false,
      disabled: false,
    };
  }

  template() {
    const { item, onDelete } = this.props;
    let avatarPath = '/public/assets/images/defaults/users/' + item.avatar;
    let styles = {};

    if (this.state.activated) {
      styles.backgroundColor = 'dodgerblue';
      styles.color = 'white';
    }

    if (this.state.disabled) {
      styles.opacity = '.5';
    }

    return (
      <div style={styles} className='p1 border-bottom'>
        <Avatar src={avatarPath} size={20} className='align-middle' />
        <div className='inline-block'>{item.text}</div>
        <button ev-click={this._toggleActivate.bind(this)}>Activate/Deactivate</button>
        <button ev-click={this._toggleEnable.bind(this)}>Enable/Disable</button>
        <button ev-click={onDelete} className='red'>Delete</button>
      </div>
    );
  }

  _toggleActivate() {
    this.setState({
      activated: !this.state.activated,
    });
  }

  _toggleEnable() {
    this.setState({
      disabled: !this.state.disabled,
    });
  }
}
