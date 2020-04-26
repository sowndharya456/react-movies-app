import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import { withStyles } from '@material-ui/core/styles'
import moviesData from '../../common/movieData';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import { CardContent, FormControl, Typography, MenuItem, Checkbox } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import genres from '../../common/genres';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import artists from '../../common/artists';


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
            genres: [],
            artists: []
        }
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
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
                </div>
                <GridList cols={5} className={classes.gridListUpcomingMovies}>
                    {moviesData.map(movie => (

                        <GridListTile key={movie.id}>
                            <img className="movie-poster" src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar title={movie.title}></GridListTileBar>
                        </GridListTile>

                    ))}
                </GridList>
                <div className="flex-container">
                    <div className="left">
                        <GridList cellHeight={350} cols={4} className={classes.gridListMain} >
                            {moviesData.map(movie => (
                                <GridListTile className="gridListReleasedMovies" key={"grid" + movie.id} >
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
                                    <Input id="movieName" type="text" onChangeHandler={this.movieNameChangeHandler}></Input>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select multiple
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.genreSelectHandler}>
                                        <MenuItem value='0'>None </MenuItem>
                                        {genres.map(genre => (
                                            <MenuItem key={genre.id} value={genre.name}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.name) > -1}></Checkbox>
                                                <ListItemText primary={genre.name}></ListItemText>
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
                                              artists.map(artist =>(
                                                  <MenuItem key={artist.id} value={artist.first_name+" "+artist.last_name}>
                                                      <Checkbox checked={this.state.artists.indexOf(artist.name)>-1}></Checkbox>
                                                    <ListItemText primary={artist.first_name+" "+artist.last_name}></ListItemText>
                                                  </MenuItem>
                                              ))
                                          }
                                      </Select>
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