
var React = require('react');
var Dropzone = require('react-dropzone');
var request = require('superagent');
import axios from 'axios';  
 
const API_URL = 'http://localhost:3000/api';
var DropzoneDemo = React.createClass({
    getInitialState: function () {
        return {
          files: []
        };
    },

    onDrop: function (acceptedFiles, rejectedFiles,) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      this.setState({
        files: acceptedFiles
      });
      var photo = new FormData();
        photo.append('photo',acceptedFiles[0]);

        request.post(`${API_URL}/auth/upload/${this.props.params.id}`).send(photo)
        .end(function(err,res){
          if (err){console.log(err);}
          return res;
        });
    },
  
    render: function () {
     // const { handleSubmit } = this.props;
      return (
          <div>
          <div className="span">  
<div className="alert alert-success alert-dismissable">  
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>Congratulations!</strong> New User successfully registered  
</div>  
</div> 
            <Dropzone onDrop={this.onDrop.bind(this)}
            className='dropzone'
                activeClassName='active-dropzone'
                multiple={false} >
              <div className="btn btn-primary">dropp imagehere, or click to select file to upload.</div>
            </Dropzone>
            {this.state.files.length > 0 ? <div>
                <h2> File succesfully uploaded</h2>
                <div>{this.state.files.map((file) => <img src={file.preview}  height="200" width="200"/> )}</div>
                </div> : null}
            
          </div>
      );
    }
});




 
export default DropzoneDemo;



