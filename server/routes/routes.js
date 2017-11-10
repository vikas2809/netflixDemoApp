
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

//update the movie details
router.route('/v1/updateMovieDetails/:id').put(controller.updateMovieDetails);

//delete the particular movie
router.route('/v1/deleteMovie/:name').delete(controller.deleteMovies);

module.exports=router;