import React, { Component } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { PROFILE_ROUTE } from './routes';
import { HOME_ROUTE } from './routes';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Webcam from "react-webcam";
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios'
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

export class ImageUpload extends Component {
    state = {
        imageSrc: null,
        profile: false,
        home: false,
    }

    goToProfile = () => {
        this.setState({ profile: true });
    }

    goToHome = () => {
        this.setState({ home: true });
    }

    sendToServer = async () => {
        let image = new Image();
        image.src = document.getElementById("source").innerHTML;
        var apiBaseUrl = "http://localhost:8000/upload";
        var self = this;
        var payload = {
            imageUrl: image
        }
        axios.post(apiBaseUrl, payload)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log("Successful Upload");
                    this.setState({ home: true });
                } else if (response.status === 205) {
                    console.log("Created failed");
                    alert("Upload Failed");
                }
                else if (response.status === 400) {
                    console.log("Upload Failed");
                    alert("Upload Failed");
                }
                else {
                    console.log("Upload Failed");
                    alert("Upload Failed");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    WebcamCapture = () => {
        const webcamRef = React.useRef(null);

        const videoConstraints = {
            facingMode: "environment"
        };

        const capture = async () => {
            await this.setState({
                imageSrc: webcamRef.current.getScreenshot()
            }, () => { console.log(this.state.imageSrc); });
            console.log("1");
        }

        return (
        <>
            <div>
                <Webcam
                    style={{ width: "30%", minWidth: 300 }}
                    audio={false}
                    height={"100%"}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={"100%"}
                    videoConstraints={videoConstraints}
                />
                </div>
                <br/>
                <div>
                {this.state.imageSrc === null ?
                    <Button variant="contained" color="primary" onClick={capture}>
                        Capture
                    </Button>
                    :
                    <Button variant="contained" color="primary" onClick={capture}>
                        ReCapture?
                    </Button>
                }
                </div>
                <br />
                </>
        );
    };

    render() {
        if (this.state.profile === true) {
            return (<Redirect to={{ pathname: PROFILE_ROUTE, state: { username: this.props.location.state.username } }} />);
        }
        if (this.state.home === true) {
            return (<Redirect to={{ pathname: HOME_ROUTE, state: { username: this.props.location.state.username } }} />);
        }
        return (
            <ThemeProvider>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h4">
                                Nourish
                            </Typography>
                            <div style={{ flexGrow: 1 }}>
                            </div>
                            <Button color="inherit" onClick={this.goToProfile}>Profile</Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <FormControl style={{ margin: 20, display: "flex" }}>
                    <Paper style={{ alignSelf: "center", width: "60%", minWidth: 300 }} elevation={6}>
                        <br/>
                        <Typography variant="h5">
                            Take a photo of the nutrition label.
                        </Typography>
                        <br />
                    </Paper>
                </FormControl >
                <div style={{ display: "inline", justifyContent: "center" }}>
                    <div>
                        <this.WebcamCapture />
                    </div>
                    {this.state.imageSrc &&
                        <img
                            style={{
                                border: "10px solid #303f9f",
                                margin: 10
                            }}
                            src={this.state.imageSrc}
                            alt=""
                        />
                    }
                </div>
                <div>
                    <Fab color="secondary" variant="extended" style={{ margin: 10 }} onClick={this.goToHome}>
                        <ArrowBackIcon />
                        Dashboard
                    </Fab>
                    {this.state.imageSrc !== null &&
                        <Fab color="secondary" variant="extended" onClick={this.sendToServer }>
                            Next Step
                            <ArrowForwardIcon />
                        </Fab>
                    }
                </div>
            </ThemeProvider>
        )
    }
}

export default ImageUpload