import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import { Typography, CardContent, Card } from '@material-ui/core';
import Home from '../../screens/home/Home';
import './Confirmation.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';



class Confirmation extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            couponCode: "",
            totalPrice: 0,
            bookingId: "",
            originalTotalPrice: 0.
        }
    }
 

    componentDidMount() {
        let currentState = this.state;
        currentState.totalPrice = currentState.originalTotalPrice = parseInt(this.props.location.bookingSummary.unitPrice, 10) * parseInt(this.props.location.bookingSummary.tickets.length, 10);
        this.setState({ state: currentState });
    }

    backToDetailsHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }
    couponCodeChangeHandler = (e) =>{
        this.setState({couponCode:e.target.value});
    }
    confirmBookingHandler =()=>{
        let data = JSON.stringify({
            "customerUuid": sessionStorage.getItem('uuid'),
            "bookingRequest": {
              "coupon_code": this.state.couponCode,
              "show_id": this.props.location.bookingSummary.showId,
              "tickets": [
                this.props.location.bookingSummary.tickets.toString()
              ]
            }
          });
      
          let that = this;
          let xhr = new XMLHttpRequest();
      
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              that.setState({ bookingId: JSON.parse(this.responseText).reference_number });
            }
          });
      
          xhr.open("POST", this.props.baseUrl + "bookings");
          xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('access-token'));
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(data);
        this.setState({open:true})
    }
    couponApplyHandler = () => {
        console.log(this.state.couponCode);
        let that = this;
        let data = null;
        let xhr = new XMLHttpRequest();
    
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            let currentState = that.state;
    
            let discountValue = JSON.parse(this.responseText).value;
            if (discountValue !== undefined && discountValue > 0) {
              currentState.totalPrice = that.state.originalTotalPrice - ((that.state.originalTotalPrice * discountValue) / 100);
              that.setState({ currentState });
            } else {
              currentState.totalPrice = that.state.originalTotalPrice;
              that.setState({ currentState });
            }
          }
        });
    
        xhr.open("GET", this.props.baseUrl + "coupons/" + this.state.couponCode);
        xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('access-token'));
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
    handleClick = () => {
        this.setState({ open: true });
      };
    
    handleClose = () => {
        this.setState({ open: false });
      };
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Header baseUrl={this.props.baseUrl}></Header>
                <div className="bookConfirm marginTop16">
                    <Typography className="back" onClick={this.backToDetailsHandler}><span>&#60;Back to Movie Details</span></Typography>

                    <Card className="cardStyle">
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                <span >Summary</span>
                            </Typography><br /><br />
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                <Typography>Theatre:</Typography>
                                </div>
                                <div><Typography>
                                    {this.props.bookingSummary.location}
                                </Typography>
                                </div>
                            </div>
                            <br></br>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                    <Typography>Language:</Typography>
                                </div>
                                <div><Typography>
                                    {this.props.bookingSummary.language}
                                </Typography>
                                </div>
                            </div>
                            <br></br>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                <Typography>Language:</Typography>>
                                </div>
                                <div><Typography>{this.props.location.bookingSummary.language}</Typography>
                                </div>
                            </div>
                            <br></br>
                            <div className="coupon-container">
                                <div className="confirmLeft">
                                <Typography>Show Date:</Typography>
                                </div>
                                <div> <Typography>{this.props.location.bookingSummary.showDate}</Typography>
                                </div>
                            </div>
                            <br></br>
                            <div className="coupon-container">
                  <div className="confirmLeft">
                    <Typography>Tickets:</Typography>
                  </div>
                  <div>
                 
                    <Typography>{this.props.location.bookingSummary.tickets.toString()}</Typography>
                  </div>
                </div>
                <br />
                            <div className="coupon-container">
                                <FormControl required className="formControl">
                                    <InputLabel htmlFor="couponCode">Coupon Code</InputLabel>
                                    <Input id="couponCode" value={this.state.couponCode} onChange={this.couponCodeChangeHandler} />

                                </FormControl>
                                <div className="marginApply">
                                <Button variant="contained" color="primary" onClick={this.couponApplyHandler.bind(this)}>APPLY</Button>
                                </div>
                            </div><br />
                            <div className="coupon-container">
                                <div>
                                    <Typography>Total Price</Typography>
                                </div>
                                <div>
                                <Typography>{this.props.location.bookingSummary.theatre}</Typography>  </div>
                                <Snackbar
                                 anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                  }}
       autoHideDuration={6000}
        open={this.state.open}
        onClose={this.handleClose}
                                message="Booking Confirmed!" classes="success">
             
        </Snackbar>
        
      
                            </div>
                            <br />
                            <Button variant="contained" color="primary" onClick={this.confirmBookingHandler}>CONFIRM BOOKING</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}
export default Confirmation;