import React, { Component } from 'react';
import { GoogleApiWrapper, Marker } from 'google-maps-react';
import CurrentLocation from './Map';
import AppBar from '@material-ui/core/AppBar';
import firebase from 'firebase'
import superagent from 'superagent'
import { Redirect, Link} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    markers: [],
    show: false,
    currentTitle: '',
    currentDate: '',
    currentOrganizer: '',
    currentSize: 0,
    currentDescription: ''
  };
  
  onMarkerClick = (props, marker, e) => {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        show: true
      })
      const data = {
        meetingTitle: this.state.activeMarker.title
      }
      superagent
      .post(`${process.env.REACT_APP_BACK_END_URL}/meetings/getOne`)
      .send(data) // sends a JSON post body
      .set('X-API-Key', 'foobar')
      .set('accept', 'json')
      .end((err, res) => {
        if (res.statusCode === 200) {
          this.setState({
            currentTitle: res.body.title,
            currentDate: new Date(res.body.date._seconds * 1000),
            currentOrganizer: res.body.organizer,
            currentSize: res.body.attendees.length,
            currentDescription: res.body.description,
          })
        }
      });
  }
  handleCreate = () => {
    return (
      <Redirect to="/createMeeting"></Redirect>
    )
  }
  handleJoin = () => {
    var user = firebase.auth().currentUser;
    console.log(user)
    const data = {
      userId: user.uid,
      meetingTitle: this.state.currentTitle
    }
    superagent
    .post(`${process.env.REACT_APP_BACK_END_URL}/meetings/join`)
    .send(data) // sends a JSON post body
    .set('X-API-Key', 'foobar')
    .set('accept', 'json')
    .end((err, res) => {
      console.log(user.uid)
      if (res.statusCode === 200) {
        alert('You have joined this meeting!')
        this.setState({
          show: false
        })
      }
    });
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  

  componentWillMount() {
    superagent
      .get(`${process.env.REACT_APP_BACK_END_URL}/meetings/getAll`)
      .set('X-API-Key', 'foobar')
      .set('accept', 'json')
      .end((err, res) => {
        if (res) {
          this.setState({
            markers: res.body
          })
        }
      });
  }
  render() {
    var user = firebase.auth().currentUser;
    if (!user) {
      return (
        <Redirect to='/login'/>
      )
    }
    console.log(this.state.markers)
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <AppBar style={{backgroundColor:'#49B7DA'}}>
          <Toolbar>
            <Typography variant="h1" >
              SafeWave
            </Typography>
            <Link to='/createMeeting' style={{fontSize:'60px', color:'white', marginLeft:'auto'}}>
              Create +
            </Link>
          </Toolbar>
        </AppBar>
        {this.state.markers.map(item => {
          console.log(item)
          return (
            <Marker
              name={item.title}
              title={item.title}
              position={{ lat: item.address._latitude, lng: item.address._longitude }}
              onClick={this.onMarkerClick}
            />
          )})}
        <Modal show={this.state.show} onHide={this.handleClose} style={{marginTop: '10%'}}>
          <Modal.Header>
            <Modal.Title> {this.state.currentTitle}</Modal.Title>
            <Button variant="primary" onClick={this.handleJoin}>
              +
            </Button>
          </Modal.Header>
          <Modal.Body>
            {this.state.currentDescription}
          </Modal.Body>
          <Modal.Footer>
          <Modal.Title style={{marginRight: '140px'}}> {this.state.currentSize} people are attending! </Modal.Title>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);