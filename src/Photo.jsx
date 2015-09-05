
var React = require('react');

var Photo = React.createClass({
  displayName: 'Photo',

  propTypes: {
    url: React.PropTypes.string,
    title: React.PropTypes.string,
    alt: React.PropTypes.string,
    style: React.PropTypes.object, 
    onclick: React.PropTypes.func, 
  }, 

  getInitialState: function () {
    return {
      clicked: false, 
    }
  }, 

  getDefaultProps: function () {
    return {
      url: '',
      title: '',
      alt: '',
      style: {}, 
      onclick: function (){}, 
    }
  }, 

  _onClick: function () {
    var payload = {
      url: this.props.url,
      cancel: this._cancel, 
    }

    if (this.state.clicked) {
      payload = null;
    }

    this.props.onclick(payload);
    this.setState({
      clicked: !this.state.clicked, 
    });
  }, 

  _cancel: function () {
    this.setState({
      clicked: false
    });
  }, 

  render: function () {
    var style = this.props.style;
    var cls = this.state.clicked ? ' selected': '';

    return (
      <div className={"photo-item" + cls }>
        <div onClick={this._onClick} className="photo-item_container">
          <img className="photo-item_image" src={this.props.url} 
            title={this.props.title} style={style} />
        </div>
      </div>
    );
  }
});

module.exports = Photo;
