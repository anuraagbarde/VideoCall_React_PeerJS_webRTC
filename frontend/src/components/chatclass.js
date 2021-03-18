import React, { Component } from 'react';
import Peer from 'peerjs';

import './chartclass.css'

const PEERJSPORT = 9000;
const PEERJSSERVERURL = 'bardepeerjs.herokuapp.com';
const PEERJSSERVERPATH = '/peerserver';

class ChatClass extends Component {
    constructor(props) {
        super(props);

        console.log('constructor chat class')

        // create refs for video streams display
        this.localVideoref = React.createRef();
        this.partnerVideoref = React.createRef();

        this.state = {
            localPeerId: null,
            newPeerId: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.peer = new Peer(undefined, {
            host: PEERJSSERVERURL,
            port: PEERJSPORT,
            path: PEERJSSERVERPATH,
            debug: 3
        });

        this.peer.on('open', (id) => {
            this.setState({
                localPeerId: id
            });
            console.log('My peer ID is: ' + this.state.localPeerId);
        });


        let constraints = {
            video: true,
            audio: true
        };
        this.getMediaLocal(constraints, this.localVideoref);

        this.peer.on('call', (call) => {
            // Answer the call, providing our mediaStream
            console.log('reciving call request from initiator...');
            call.answer(this.localStream);
            call.on('stream', partnerVideoStream => {
                console.log('reciving call videostream from initiator...');
                this.partnerVideoref.current.srcObject = partnerVideoStream;
            })
        });
    }


    async getMediaLocal(constraints, videoRef) {
        let stream = null;
        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints) // ||  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            // console.log(stream.getAudioTracks()[0].getCapabilities()) ;
            this.localStream = stream;
            try {
                videoRef.current.srcObject = stream;
            } catch (e) {
                console.log(e);
            }

            videoRef.current.muted = true;
        } catch (err) {
            /* handle the error */
            console.log(err);
        }
    }

    handleChange(event) {
        this.setState({ newPeerId: event.target.value });
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.newPeerId);
        console.log('A peerID was submitted: ' + this.state.newPeerId);

        console.log('Starting call..')
        let call = this.peer.call(this.state.newPeerId, this.localStream);
        console.log('Waiting for parter to answer call..')


        call.on('stream', partnerVideoStream => {
            console.log('receving partner stream')
            this.partnerVideoref.current.srcObject = partnerVideoStream;
        })


        call.on('close', () => {
            console.log('closing partner stream')
            this.partnerVideoref.current.srcObject = null;
        })


        event.preventDefault();
    }
    render() {
        return (<div>
            <div style={{margin: 20, textAlign: 'center'}} >
                <p>Your id is {this.state.localPeerId}</p>
            </div>

            <div style={{margin: 20, textAlign: 'center'}}>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label>
                        New peer Id:
                        <input type="text" value={this.state.newPeerId} onChange={(e) => this.handleChange(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>

            <div className="wrapper">
                <div className="one">
                    <div>
                        <video className="video" ref={this.localVideoref} autoPlay ></video>
                    </div>
                </div>
                <div className="two">
                    <div>
                        <video className="video" ref={this.partnerVideoref} autoPlay></video>
                    </div>
                </div>
            </div>

        </div>);
    }
}

export default ChatClass;