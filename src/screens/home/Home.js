import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "./Home.css";
import Header from "../../common/header/Header";
import { withStyles } from '@material-ui/core/styles'
//import moviesData from '../../common/movieData';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import { CardContent, FormControl, Typography, MenuItem, Checkbox, TextField } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
//import genres from '../../common/genres';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
//import artists from '../../common/artists';
import Button from '@material-ui/core/Button';
import Details from '../details/Details';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});


class Home extends Component {
    constructor() {
        super();
        this.state = {
            movieName: "",
            upcomingMovies: [],
            releasedMovies :[],
            genres: [],
            artists: [],
            genresList:[],
            artistsList :[],
            releaseDateStart: "",
            releaseDateEnd: ""
        }
    }

   movieClickHandler = (movieId)=>{
    
    ReactDOM.render(
    <Details movieId={movieId}></Details>,
    document.getElementById('root')
  );
  
   }
    movieNameChangeHandler = event => {
        this.setState({ movieName: event.target.value })
    }

    genreSelectHandler = event => {
        this.setState({ genres: event.target.value })
    }
    artistSelectHandler = event => {
        this.setState({ artists: event.target.value })
    }
    releaseDateStartHandler = event => {
        this.setState({ releaseDateStart: event.target.value });
    }

    releaseDateEndHandler = event => {
        this.setState({ releaseDateEnd: event.target.value });
    }
    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    upcomingMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhr.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);


        let dataReleased = null;
        let xhrReleased = new XMLHttpRequest();
        xhrReleased.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhrReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        xhrReleased.send(dataReleased);

        let dataGenres = null;
        let xhrGenres = new XMLHttpRequest();
        xhrGenres.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    genresList: JSON.parse(this.responseText).genres
                });
            }
        });

        xhrGenres.open("GET", this.props.baseUrl + "genres");
        xhrGenres.setRequestHeader("Cache-Control", "no-cache");
        xhrGenres.send(dataGenres);

        let dataArtists = null;
        let xhrArtists = new XMLHttpRequest();
        xhrArtists.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    artistsList: JSON.parse(this.responseText).artists
                });
            }
        });

        xhrArtists.open("GET", this.props.baseUrl + "artists");
        xhrArtists.setRequestHeader("Cache-Control", "no-cache");
        xhrArtists.send(dataArtists);
    }
    filterApplyHandler = () => {
        let queryString = "?status=RELEASED";
        if (this.state.movieName !== "") {
            queryString += "&title=" + this.state.movieName;
        }
        if (this.state.genres.length > 0) {
            queryString += "&genres=" + this.state.genres.toString();
        }
        if (this.state.artists.length > 0) {
            queryString += "&artists=" + this.state.artists.toString();
        }
        if (this.state.releaseDateStart !== "") {
            queryString += "&start_date=" + this.state.releaseDateStart;
        }
        if (this.state.releaseDateEnd !== "") {
            queryString += "&end_date=" + this.state.releaseDateEnd;
        }

        let that = this;
        let dataFilter = null;
        let xhrFilter = new XMLHttpRequest();
        xhrFilter.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhrFilter.open("GET", this.props.baseUrl + "movies" + encodeURI(queryString));
        xhrFilter.setRequestHeader("Cache-Control", "no-cache");
        xhrFilter.send(dataFilter);
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.releasedMovie);
        return (
            <div>
                <Header baseUrl={this.props.baseUrl}/>
                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
                </div>
                <GridList cols={5} className={classes.gridListUpcomingMovies}>
                    {this.state.upcomingMovies.map(movie => (

                        <GridListTile key={"upcoming" + movie.id}>
                            <img className="movie-poster" src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar title={movie.title}></GridListTileBar>
                        </GridListTile>

                    ))}
                </GridList>
                <div className="flex-container">
                    <div className="left">
                        <GridList cellHeight={350} cols={4} className={classes.gridListMain} >
                            {this.state.releasedMovies.map(movie => (
                                <GridListTile className="gridListReleasedMovies" key={"grid" + movie.id} onClick={()=>this.movieClickHandler(movie.id)}>
                                    <img className="movie-poster" src={movie.poster_url} alt={movie.title} />
                                    <GridListTileBar title={movie.title}
                                        subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}>

                                    </GridListTileBar>

                                </GridListTile>
                            ))}
                        </GridList>
                    </div>

                    <div className="right">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                       </Typography>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                    <Input id="movieName" onChange={this.movieNameChangeHandler} />
        
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select multiple
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.genreSelectHandler}>
                                        <MenuItem value='0'>None </MenuItem>
                                        {this.state.genresList.map(genre => (
                                            <MenuItem key={genre.id} value={genre.genre}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.genre) > -1} />
                                                <ListItemText primary={genre.genre} />
                                            </MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                      <InputLabel htmlFor="select-artist">Artists</InputLabel>
                                      <Select multiple
                                      input ={<Input id="slect artist"/>}
                                      renderValue ={selected =>selected.join(',')}
                                      value ={this.state.artists}
                                      onChange={this.artistSelectHandler}>
                                          <MenuItem value='0'>None</MenuItem>
                                          {
                                              this.state.artistsList.map(artist =>(
                                                  <MenuItem key={artist.id} value={artist.first_name+" "+artist.last_name}>
                                                      <Checkbox checked={this.state.artists.indexOf(artist.name)>-1}></Checkbox>
                                                    <ListItemText primary={artist.first_name+" "+artist.last_name}></ListItemText>
                                                  </MenuItem>
                                              ))
                                          }
                                      </Select>
                                </FormControl>
                                  <FormControl className={classes.formControl}>
                                    <TextField id="releaseDateStart" label="Release Date Start" type="date" defaultValue="" InputLabelProps={{shrink:true}}  onChange={this.releaseDateStartHandler}></TextField>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                    <TextField id="releaseDateEnd" label="Release Date End" type="date" defaultValue="" InputLabelProps={{shrink:true}} onChange={this.releaseDateEndHandler}></TextField>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                    <Button onClick={() => this.filterApplyHandler()} variant="contained" color="primary">
                                    APPLY</Button>
                                    </FormControl>
                            </CardContent>
                        </Card>
                    </div>
                </div >
            </div>
        );
    }
}

export default withStyles(styles)(Home);