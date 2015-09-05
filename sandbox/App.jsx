
var React = require('react');
var PhotoSelect = require('../src/');

var _Styles = require('../src/react-select-photo.css');
var _AppStyles = require('./style.css');

var App = React.createClass({
  getInitialState: function () {
    return {
      photos: [], 
      close: false, 
      selected: null, 
    }
  }, 
  componentDidMount: function () {
    var xhr = new XMLHttpRequest();
    var self = this;

    xhr.onreadystatechange = function () {
      if (xhr.status === 200 && xhr.readyState == 4) {
        self.setState({
          photos: JSON.parse(xhr.responseText)
        });
      }
    }
    
    xhr.open("GET", "assets/images/data.json", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(null);
  }, 

  _toggle: function (e) {
    e.preventDefault();
    this.setState({
      close: !this.state.close,
    });
  }, 

  _onselect: function (item) {
    this.setState({
      selected: item
    });
  }, 

  _onclose: function (item) {
    this.setState({
      close: !this.state.close, 
    });
  }, 

  _oncancel: function () {
    this.setState({
      selected: null, 
    });
  }, 

  render: function () {
    var selectedOne;
    if (this.state.selected) {
      var style = {
        width: 100,
        height: 'auto', 
        marginBottom: 30, 
      }
      selectedOne = <img style={style} src={this.state.selected.url} title="" alt="" />
    }

    return (
      <div className="app">
        <div className="select-module">
          <h3>Photo select</h3>
          <p><a href="#" onClick={this._toggle}>toggle</a></p>
          <PhotoSelect onCancel={this._oncancel} onClose={this._onclose} onSelect={this._onselect} photos={this.state.photos} initialClose={this.state.close} />
        </div>
        <div className="result-module">
          <h3>Selected:</h3>
          <div className="selected-one">
            { selectedOne }
          </div>
        </div>
      </div>
    );
  }
});

React.render(<App />, document.body);
