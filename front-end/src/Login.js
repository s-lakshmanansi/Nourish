import React, { Component } from 'react'
import { REGISTER_ROUTE } from './routes';
import { HOME_ROUTE } from './routes';
import { Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

export class Login extends Component {
    state = {
        username: "",
        password: "",
        home: false,
        reg: false
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:8000/login";
        var self = this;
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl, payload)
            .then((response) => {
                console.log(response);
                if (response.status === 200 && (response.data)["result"] === "correct") {
                    console.log("Login successful");
                    this.setState({ home: true });
                } else if (response.status === 200 && (response.data)["result"] === "incorrect") {
                    console.log("Login failed");
                }
                else if (response.status === 400) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    goToRegister = () => {
        this.setState({ reg: true });
    }

    render() {
        if (this.state.home === true) {
            const { username } = this.state;
            return (<Redirect to={{ pathname: HOME_ROUTE, state: { username: username } }} />);
        }
        if (this.state.reg === true) {
            return (<Redirect to={REGISTER_ROUTE} />);
        }
        return (
            <ThemeProvider>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h4">
                                Nourish
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <br />
                <FormControl style={{ margin: 20, display: "flex" }}>
                    <Paper style={{ alignSelf: "center", width: "30%", minWidth: 200 }} elevation={6}>
                        <br />
                        <Typography variant="h4">
                            Login
                        </Typography>
                        <br />
                        <div style={{ height: '70%' }}>
                            <TextField
                                variant="outlined"
                                label="Username"
                                onChange={this.handleChange('username')}
                            />
                            <br />
                            <br />
                            <TextField
                                type="password"
                                variant="outlined"
                                label="Password"
                                onChange={this.handleChange('password')}
                            />
                            <br />
                        </div>
                        <br />
                        <br />
                    </Paper>
                </FormControl>
                <br />
                {
                    this.state.username === "" && this.state.password === "" ?
                        <Fab label="Submit" color="secondary" variant="extended">
                            Login
                    </Fab>
                        :
                        <Fab label="Submit" color="secondary" variant="extended" onClick={(event) => this.handleClick(event)} >
                            Login
                    </Fab>
                }
                <br />
                <br />
                <Fab label="Submit" color="secondary" variant="extended" onClick={this.goToRegister} >
                    Create Account
                </Fab>
            </ThemeProvider>
        )
    }
}

export default Login