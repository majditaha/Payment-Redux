import React, { Component } from 'react';

class App extends Component {  
  render() {
    return (
      <div>
      <div className="jumbotron" >
      <div className="row">
      <div className="col-md-5">
      <img src = '../public/images/GetImage.jpg' />
      </div>
      <div className = "col-md-7">
        <h3>British Gurkha Welfare Scheme</h3>
        </div>
        </div>
      </div>

      <div className="container">
       {this.props.children}
      </div>

      <footer className="footer">
      <div className="container">
        <p className="text-muted">@copyright 2016</p>
      </div>
    </footer>
      </div>
    );
  }
}

export default App;  