import React, { Component } from "react";
import "./Header.css";
import Button from '@material-ui/core/Button';
import logo from "../../assets/logo.svg";

class Header extends Component {
    render() {

        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo"/>
                    <div className="login-button">
                        <Button variant="contained">Login</Button>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;