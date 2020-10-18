import React, { Component } from 'react'
import { PROFILE_ROUTE } from './routes';
import { IMAGE_ROUTE } from './routes';
import { Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';

export class Dashboard extends Component {
    state = {
        username: "",
        email: "",
        age: "",
        height: "",
        weight: "",
        gender: "",
        profile: false,
        image: false
    }

    regcomp(val, name, req) {
        if (req || val !== "") {
            if (val === "") {
                val = (
                    <Typography color="error">
                        <i>Missing!</i>
                    </Typography>
                );
            }
            return (
                <React.Fragment>
                    <ListItem>
                        <ListItemText primary={name} secondary={val} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            )
        }

    }

    async componentDidMount(props) {
        await this.setState({ username: this.props.location.state.username });
        var apiBaseUrl = "http://localhost:8000/personal";
        var self = this;
        var payload = {
            "username": this.state.username,
        }
        axios.post(apiBaseUrl, payload)
            .then(async (response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log("Create successfull");
                    await this.setState({ email: response.data.email });
                    await this.setState({ age: response.data.age });
                    await this.setState({ height: response.data.height });
                    await this.setState({ weight: response.data.weight });
                    await this.setState({ gender: response.data.gender });
                    console.log(this.state);
                } else if (response.status === 205) {
                    console.log("Created failed");
                    alert("username or email already exists")
                }
                else if (response.status === 400) {
                    console.log("Username password not exist");
                    alert("Username password not exist")
                }
                else {
                    console.log("Server Error");
                    alert("Server error");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    goToProfile = () => {
        this.setState({ profile: true });
    }

    goToImage = () => {
        this.setState({ image: true });
    }

    render() {
        if (this.state.profile === true) {
            return (<Redirect to={{ pathname: PROFILE_ROUTE, state: { username: this.state.username } }} />);
        }
        if (this.state.image === true) {
            return (<Redirect to={{ pathname: IMAGE_ROUTE, state: { username: this.state.username } }} />);
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
                <br />
                <FormControl style={{ margin: 20, display: "flex" }}>
                    <Paper style={{ alignSelf: "center", width: "60%", minWidth: 300 }} elevation={6}>
                        <br />
                        <Typography variant="h4">
                            How do I stay healthy?
                        </Typography>
                        <FormControl style={{ margin: 20, display: "flex" }}>
                            <div style={{ alignSelf: "center", width: "80%", minWidth: 200}}>
                                <p> A healthy lifestyle can help you thrive throughout your life. Making healthy choices isn't always easy, however. It can be hard to find the time and energy to exercise regularly or prepare healthy meals. However, your efforts will pay off in many ways, and for the rest of your life. </p>
                                <p> -- UCSF Health </p>
                            </div>
                        </FormControl>
                    </Paper>
                </FormControl>
                <FormControl style={{ margin: 20, display: "flex" }}>
                    <Paper style={{ alignSelf: "center", width: "60%", minWidth: 300 }} elevation={6}>
                        <br />
                        <Typography variant="h4">
                            {this.state.username}'s Information
                        </Typography>
                        <br />
                        <FormControl style={{ margin: 20, display: "flex" }}>
                            <Paper style={{ alignSelf: "center", width: '50%', minWidth: 300 }} variant="outlined">
                                <List>
                                    {this.regcomp("Age", this.state.age, true)}
                                    {this.regcomp("Height", this.state.height, true)}
                                    {this.regcomp("Weight", this.state.weight, true)}
                                    {this.regcomp("Gender", this.state.gender, true)}
                                </List>
                            </Paper>
                        </FormControl>
                    </Paper>
                </FormControl>
                <div style={{ height: '70%' }}>
                    <Fab color="primary" variant="extended" aria-label="add" onClick={this.goToImage}>
                        Nutrition Label
                        <AddIcon />
                    </Fab>
                </div>
            </ThemeProvider>
        )  
    }
}

export default Dashboard