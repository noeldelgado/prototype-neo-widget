import NeoWidget from './../lib/neo-widget';

export default class Avatar extends NeoWidget {
  getInitialState() {
    return {
      activated: false,
    };
  }

  shouldComponentUpdate(previousState) {
    return previousState.activated !== this.state.activated;
  }

  getDefaultProps() {
    return {
      src: '/public/assets/images/Blank.gif',
      size: 40,
    };
  }

  template() {
    const { src, size, className = '' } = this.props;
    const _className = 'inline-block circle ' + className;
    let styles = {};

    if (this.state.activated) {
      styles.backgroundColor = 'yellowgreen';
    }

    return (
      <div className={_className} style={styles} ev-click={this._handleClick.bind(this)}>
        <img className='p1 circle align-top' src={src} width={size} height={size}/>
      </div>
    );
  }

  _handleClick() {
    this.setState({
      activated: !this.state.activated,
    });
  }
}
