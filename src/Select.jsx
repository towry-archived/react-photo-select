
var React = require('react');
var emptyFunc = function (){};

// Views
var Photo = require('./photo.jsx');

var selected = null;

var Select = React.createClass({
  displayName: 'PhotoSelect', 

  propTypes: {
    onClose: React.PropTypes.func, 
    onSelect: React.PropTypes.func, 
    onCancel: React.PropTypes.func, 
    photos: React.PropTypes.arrayOf(React.PropTypes.object), 
    initialClose: React.PropTypes.bool, 
  }, 

  getDefaultProps: function () {
    return {
      initialClose: false, 
      onClose: emptyFunc, 
      onSelect: emptyFunc, 
      onCancel: emptyFunc, 
      photos: [], 
    }
  },

  getInitialState: function () {
    return {
      close: this.props.initialClose
    }
  }, 

  _onselect: function (payload) {
    if (selected && selected.cancel && typeof selected.cancel == 'function') {
      selected.cancel();
    }

    selected = payload;
    this.props.onSelect(payload);
  }, 

  _onclose: function () {
    this.props.onClose(selected);
    selected && selected.cancel && typeof selected.cancel == 'function' && selected.cancel();
    selected = null;
  }, 

  _oncancel: function () {
    selected && selected.cancel && typeof selected.cancel == 'function' && selected.cancel();
    selected = null;
    this.props.onCancel();
  }, 

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.initialClose != this.props.initialClose) {
      this.setState({
        close: nextProps.initialClose
      });
    }
  }, 

  render: function () {
    if (this.state.close) {
      return <div></div>;
    }

    var confirmText = this.props.confirmText || "Ok";
    var cancelText = this.props.cancelText || "Cancel";

    return (
      <div id="photoSelectView">
        <div className="select-container">
          <div className="select-photos">
          {
            this.props.photos.map(function (photo, i) {
              return <Photo onclick={this._onselect} key={'photo-'+i} url={photo.url} title={photo.title} alt={photo.alt} />
            }.bind(this))
          }
          </div>
          <div className="select-action">
            <div className="button-group">
              <button onClick={this._onclose} className="select-action_confirm">
              {confirmText}
              </button>
              <button onClick={this._oncancel} className="select-action_cancel">
              {cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Select;
