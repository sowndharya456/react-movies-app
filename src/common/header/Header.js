import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText  from "@material-ui/core/FormHelperText";


const customStyles={
   content :{top: '50%',
    left: '50%',
    right: 'auto',
   bottom: 'auto',
  marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
}
}

const TabContainer = (props) =>{
      return (
<Typography component="div" style={{padding:0 , textAlign:"center"}}>
    {props.children}
</Typography>
      )
}
TabContainer.propTypes = {
    children : PropTypes.node.isRequired
}

class Header extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value:0,
            username:"",
            usernameRequired:"dispNone"
        };
    }
    
    inputUsernameChangeHandler=(e)=>{
        this.setState({username : e.target.value})
    }
    loginClickHandler =() =>{
        this.state.username ===""? this.setState({ usernameRequired :"dispBlock"}) : this.setState ({usernameRequired:"dispNone"})
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            modalIsOpen: false
        });
    }
    tabChangeHandler = (event , value) => {
          this.setState({value});
    }

    render() {

        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo" />
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>Login</Button>
                    </div>
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" style={customStyles} onRequestClose={this.closeModalHandler}>
                <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler} >
                    <Tab label="Login"></Tab>
                    <Tab label="Register"></Tab>
                </Tabs>
                {this.state.value===0 &&
                <TabContainer>
                    <FormControl required>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                        <FormHelperText className={this.state.usernameRequired}>
                            <span className="red">required</span>
                        </FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password"/>
                        </FormControl>
                        <br/><br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler} >Login</Button>
                    </TabContainer>
}
                </Modal>
                
            </div>
        )
    }
}

export default Header;