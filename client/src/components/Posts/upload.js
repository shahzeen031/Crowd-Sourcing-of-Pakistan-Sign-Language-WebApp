import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);

    this.onNameChange = this.onNameChange.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      video: '',
      gestureName: '',
      selectFile: null,
      Region:'',
      loaded: 0,
    };
  }

  onFileChange(e) {
    this.setState({ video: e.target.files[0] });

    //this.setState({ gestureName: e.target.gestureName });
    //console.log(e.target.gestureName);
  }
  onNameChange(e) {
    this.setState({ gestureName: e.target.value });
    console.log(e.target.value);
    //console.log('The link was clicked.');
  }
  onRegionChange(e) {
    this.setState({ Region: e.target.value });
    console.log(e.target.value);
    //console.log('The link was clicked.');
  }

  onSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    console.log('type: ', typeof this.state.video);
    formData.append('video', this.state.video, this.state.video.name);
    formData.append('gestureName', this.state.gestureName);
    formData.append('Region', this.state.Region);
    console.log('state: ', this.state);
    axios
      .post('/api/upload', formData, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(
          'Uploaded successfully! Your Gesture Video is submitted for reviewing. Once our Expertes Approved it, it will be pulbliched on your Distionaray,So Stay Tuned! '
        );
      });
  }

  render() {
    return (
      <div className='container mt-4'>
        <h4 className='display-4 text-centre mb-4'>
          <i className='fas fa-upload'></i>
          Upload a Gesture
        </h4>
        <form onSubmit={this.onSubmit}>
          <div class='form-group'>
            <ToastContainer />
          </div>
          <div className='form-group'>
            <input
              type='value'
              className='form-control'
              placeholder='Gesture Name'
              //value={this.state.gestureName}
              onChange={this.onNameChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='value'
              className='form-control'
              placeholder='Region'
               value={this.state.Region}
               onChange={this.onRegionChange}
            />
          </div>
          <div className='custom-file'>
            <input
              type='file'
              className='custom-file-input'
              id='customFile'
              onChange={this.onFileChange}
            />
            <label className='custom-file-label' for='customFile'>
              Choose file
            </label>
          </div>

          <div class='form-group'>
            {' '}
            <p> </p>
            <Progress max='100' color='success' value={this.state.loaded}>
              {Math.round(this.state.loaded, 2)}%
            </Progress>
          </div>
          <div className='form-group'>
            <button className='btn btn-primary' type='submit'>
              Upload
            </button>
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
