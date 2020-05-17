import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import Home from '../../screens/home/Home';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';


class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: {
                genres: [],
                trailer_url: "",
                artists: []
            },
            starIcons: [
                {
                   id: 1,
                   stateId: "star1",
                   color: "black"
                },
                {
                   id: 2,
                   stateId: "star2",
                   color: "black"
                },
                {
                   id: 3,
                   stateId: "star3",
                   color: "black"
                },
                {
                   id: 4,
                   stateId: "star4",
                   color: "black"
                },
                {
                   id: 5,
                   stateId: "star5",
                   color: "black"
                }
             ]
        }
    }
    componentDidMount() {
        let that = this;
        let dataMovie = null;
        let xhrMovie = new XMLHttpRequest();
        xhrMovie.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    movie: JSON.parse(this.responseText)
                });
            }
        });

       
        xhrMovie.open("GET", this.props.baseUrl + "movies/" + this.props.match.params.id);
        xhrMovie.setRequestHeader("Cache-Control", "no-cache");
        xhrMovie.send(dataMovie);
   
    }
    backToHomeHandler = () =>{

        ReactDOM.render(<Home />, document.getElementById('root'));
    }
    
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    artistClickHandler =(wiki_url) =>{
        window.location = wiki_url;
    }
    starClickHandler = (id) => {
        let starIconList =[];
        for(let star of this.state.starIcons){
            let starNode=star;
            if(star.id <=id)
            {
                starNode.color="yellow";
            }
            else{
                starNode.color="black";
            }
            starIconList.push(starNode);
        }
        this.setState({ starIcons: starIconList });
    }
    render() {
        let movie = this.state.movie;
        console.log(movie);
        const opts={
        height: '300',
            width: '700',
            playerVars: {
                autoplay: 1
            }
        }
        return (<div className='details'>
            <Header showBookShowButton="true" baseUrl={this.props.baseUrl}/>
            <div className="back" onClick={this.backToHomeHandler}>
                <Typography>&#60;Back to Home</Typography>

            </div>
            <div className="flex-containerDetails">
                <div className="leftDetails">
                    <img src={movie.poster_url} alt={movie.title} />;
              </div>
                <div className="middleDetails">
                    <div>
                        <Typography variant="headline" component="h2">{movie.title} </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography ><span className="bold" >Genres :</span> {movie.genres} </Typography>
                    </div>
                   
                   
                    <div>
                        <Typography ><span className="bold" >Duration :</span> {movie.duration} </Typography>
                    </div>
                 
                    <div>
                        <Typography ><span className="bold" >Release Date :</span> {new Date(movie.release_date).toDateString()}</Typography>
                    </div>
                    
                    <div>
                        <Typography ><span className="bold" >Rating :</span> {movie.critics_rating} </Typography>
                    </div>
                    
                    <div className="marginTop16">
                        <Typography ><span className="bold" >Plot :</span><a href={movie.wiki_url}>(Wiki Link)</a>{movie.storyline} </Typography>
                    </div>
                    <div className="trailerContainer">
                            <Typography>
                                <span className="bold">Trailer:</span>
                            </Typography>
                           {console.log("movieURL:",this.state.movie.trailer_url)}
                           { this.state.movie.trailer_url !== undefined &&  
                            <YouTube  
                                videoId={movie.trailer_url.split("?v=")[1]}
                                opts={opts}
                                onReady={this._onReady}
                            />
                           }
                        </div>
                </div >
                <div className="rightDetails">
                    <Typography><span className="bold">Rate this movie:</span></Typography>
                    {
                        this.state.starIcons.map(star =>(
                            <StarBorderIcon className={star.color} key={"star"+star.id} onClick={() => this.starClickHandler(star.id)}></StarBorderIcon>
                        ))
                    }
                <div className="bold marginBottom16 marginTop16">
                    <Typography>
                        <span className="bold">Artists:</span>
                    </Typography>
                    </div>
                    <div className="paddingRight">
                        <GridList cellHeight={160} cols={2}>
                            {movie.artists!=null && 
                            movie.artists.map(artist =>
                            <GridListTile key={artist.id} className="gridTile"
                            onClick={() => this.artistClickHandler(artist.wiki_url)}>
                                <img src={artist.profile_url} alt={artist.first_name+" "+artist.last_name} />
                                <GridListTileBar title={artist.first_name+" "+artist.last_name}>


                                </GridListTileBar>
                            </GridListTile>
                             )}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>);
    }
}


export default Details;
