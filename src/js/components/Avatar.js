import NeoWidget from './../lib/neo-widget';

export default class Avatar extends NeoWidget {
  getDefaultProps() {
    return {
      src: '/public/assets/images/Blank.gif',
      size: 40,
    };
  }

  template() {
    const { src, size, className = '' } = this.props;
    const _className = 'inline-block ' + className;

    return (
      <div className={_className}>
        <img className='py1 mr1 circle' src={src} width={size} height={size}/>
      </div>
    );
  }
}
