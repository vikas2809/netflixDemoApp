
var express= require('express');

var router=express.Router();

var controller=require('../controllers/controller');

//post user in the user collection
router.route('/v1/user/create').post(controller.createUserDetails);

//return all user
router.route('/v1/user/getAllUser').get(controller.getAllUser);

//authenticate user and generate web token
router.route('/v1/user/authenticateUser').post(controller.userAuthentication);




//post movie in the movie collection
router.route('/v1/movies/createMovie').post(controller.createMovie);

//get the movies list
router.route('/v1/movies/getAllMovies').get(controller.getAllMovie);

//get the detail of the particular movie
router.route('/v1/movies/getMovieDetail/:id').get(controller.getMovieDetail);

//get the movie by their name
router.route('/v1/movies/getMovieByName/:name').get(controller.getMovieByName);

//get the movie by their Language
router.route('/v1/movies/getMovieByLanguage/:language').get(controller.getMovieByLanguage);

//get the movie by their genre
router.route('/v1/movies/getMovieByGenre/:genre').get(controller.getMovieByGenre);

//update the movie details
router.route('/v1/updateMovieDetails/:id').put(controller.updateMovieDetails);

//delete the particular movie
router.route('/v1/deleteMovie/:id').delete(controller.deleteMovies);






//post details of tv shows in the tvshows collections
router.route('/v1/tvshows/createShow').post(controller.createTvShows);


//get the tv shows list from the tvshow collection
router.route('/v1/tvshows/getAllTvShows').get(controller.getAllTvShows);

//get the tv show list detail by theirName
router.route('/v1/tvshows/getTvShowDetailByName/:name').get(controller.getTvShowByName);

//get the tvShow by their Language
router.route('/v1/tvshows/getTvShowByLanguage/:language').get(controller.getTvShowByLanguage);

//get the tvShow by their genre
router.route('/v1/tvshows/getTvShowByGenre/:genre').get(controller.getTvShowByGenre);

//get the detail of the particular tv shows
router.route('/v1/tvshows/getTvShowDetail/:id').get(controller.getTvShowDetail);


//update the tv show collection
router.route('/v1/tvshows/updateTvShowDetail/:id').put(controller.updateTvShowDetails);


//delete the particular tv show
router.route('/v1/deleteTvShow/:id').delete(controller.deleteTvShows);


//posting data in the season table
router.route('/v1/tvshows/season/createSeason').post(controller.createTvShowsSeason);




//posting data in the episode table
router.route('/v1/tvshows/season/episode/createEpisode').post(controller.createTvShowsSeasonEpisodes);


//getting the seasons list
router.route('/v1/tvshows/seasonList/:id').get(controller.getTvShowSeasonInfo);


//getting the season's episode
router.route('/v1/tvshows/episodeList/:id').get(controller.getTvShowSeasonEpisodeInfo);


//getting the searched result
router.route('/v1/movies/searchResult/:name').get(controller.getMovieSearchResults);

//getting the searched result
router.route('/v1/tvshows/searchResult/:name').get(controller.getTvShowSearchResults);

//getting the searched movie & tv Show
router.route('/v1/moviesTvshow/searchResult/:name').get(controller.moviesTvShowsSearchResults);

module.exports=router;
