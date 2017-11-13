
//importing the user model from the models
var User =require('../models/user');
var Movie =require('../models/movies');
var Show = require('../models/shows');
var Season = require('../models/season');
var Episode = require('../models/episodes');
var jwt = require('jsonwebtoken');
var express= require('express');
var app=express();
app.set('superSecret','serverToken');

//saving data in the user collections
exports.createUserDetails=(request,response)=>{
    var user=new User({
        firstName:  request.body.firstName,
        lastName:   request.body.lastName,
        password:   request.body.password,
        email:      request.body.email,
        role:       request.body.role,
        created_at:new Date(),
        updated_at:request.body.updated_at
    });
    //creating the user document in the collections
    user.save((error,res)=>{
        if(error)
        {
            response.json(error);
        }
        else
        {
            response.json({
                success:true,
                body:res
            })
        }
    })
}

//requesting for all the user details
exports.getAllUser=(req,res)=>{
    User.find( {},(error,response)=>{
        if(error)
            res.json({
                "status": "empty",
                "error": "404 Page Not Found"
            });
        // res.json(response);
        res.json({
            "status": true,
            "respData": {
                 response
            }
        }
        )
    });
}


//requesting for authenticat the user requesting for the login access in the website
exports.userAuthentication=(req,res)=>{
    console.log("user authentication");
    User.findOne({
        email: req.body.email
      }, function(err, user) {

        if (err) throw err;

        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          role: user.role
        };
            var token = jwt.sign(payload, app.get('superSecret'), {
              expiresIn: 3600 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              data:user,
              token: token
            });
          }

        }

      });
}


//saving data in the movies collections
exports.createMovie=(request,response)=>{
    var movie=new Movie({
        movieID    :        request.body.movieID,
        movieOrigin:        request.body.movieOrigin,
        language   :        request.body.language,
        name       :        request.body.name,
        imgUrl     :        request.body.imgUrl,
        description:        request.body.description,
        duration   :        request.body.duration,
        genre      :        request.body.genre,
        created_at :        new Date(),
        updated_at :        request.body.updated_at
    });
    //creating the user document in the collections
    movie.save((error,res)=>{
        if(error)
        {
            response.json(error);
        }
        else
        {
            response.json({
                success:true,
                body:res
            })
        }
    })
}

//requesting for all the user details
exports.getAllMovie=(req,res)=>{
    Movie.find( {},(error,response)=>{
        if(error)
            res.json({
                "status": "empty",
                "error": "404 Page Not Found"
            });
        // res.json(response);
        res.json({
            "status": true,
            "respData": response
        }
        )
    });
}

//get the complete movie details
exports.getMovieDetail=(req,res)=>{
    console.log('inside findOne');
    var id=req.params.id;
    console.log(id);
    Movie.findOne({movieID:id},(error,response)=>{
        if(error)
            res.json(error);
        else{
            res.json({
                status: true,
                "data":response
            })
        }
    })
}

//get the movie acc to their name
exports.getMovieByName=(req,res)=>{
    console.log('inside findOne');
    var searchName=req.params.name;
    console.log(searchName);
    Movie.findOne({name:searchName},(error,response)=>{
        if(error)
            res.json(error);
        else{
            res.json({
                status: true,
                "data":response
            })
        }
    })
}


//get the movie acc to their language
exports.getMovieByLanguage=(req,res)=>{
    console.log('inside findOne');
    var searchLanguage=req.params.language;
    console.log(searchLanguage);
    Movie.find({language:searchLanguage},(error,response)=>{
        if(error)
            res.json(error);
        else{
            res.json({
                status: true,
                "data":response
            })
        }
    })
}


//get the movie acc to their genre
exports.getMovieByGenre=(req,res)=>{
    console.log('inside findOne');
    var searchGenre=req.params.genre;
    console.log(searchGenre);
    Movie.find({genre:searchGenre},(error,response)=>{
        if(error)
            res.json(error);
        else{
            res.json({
                status: true,
                "data":response
            })
        }
    })
}

//update the movie details
exports.updateMovieDetails =(req,res)=>
{
    var id =req.params.id;
    var updatedMovieOrigin    =req.body.movieOrigin;
    var updatedLanguage       =req.body.language;
    var updatedName            =req.body.name;
    var updatedImgUrl          =req.body.imgUrl;
    var updatedDescription  =req.body.description;
    var updatedDuration     =req.body.duration;
    var updatedGenre      =req.body.genre;
     Movie.update({movieID:id},{$set:{
                movieOrigin:updatedMovieOrigin,
                language:updatedLanguage,
                name :updatedName,
                imgUrl : updatedImgUrl,
                description: updatedDescription,
                duration: updatedDuration,
                genre: updatedGenre,
            }},{w:1},(err,response)=>{
            if(err){
                res.json(err);
                console.log(err);
            }
            else
            {
                res.json({
                    status:true,
                    respData:response
                })
            }
            console.log(response);
        });
}


//delete the movie details
exports.deleteMovies=(req,res)=>{
    console.log("inside delete");
    var movieId=req.params.id;
    // var id=req.body.id;
    Movie.remove({movieID:movieId},(error,response)=>{
        if(error)
            res.json(error)
        else
        {
            res.json({
                message:"Movie Deleted Successfully"
            })
        }
    })

}




//saving data in the tvshows collections
exports.createTvShows=(request,response)=>{
    var show=new Show({
        showID     :        request.body.showID,
        showOrigin :        request.body.showOrigin,
        language   :        request.body.language,
        name       :        request.body.name,
        imgUrl     :        request.body.imgUrl,
        description:        request.body.description,
        duration   :        request.body.duration,
        genre      :        request.body.genre,
        created_at :        new Date(),
        updated_at :        request.body.updated_at
    });
    //creating the tv shows document in the collections
    show.save((error,res)=>{
        if(error)
        {
            response.json(error);
        }
        else
        {
            response.json({
                success:true,
                body:res
            })
        }
    })
}

//requesting for all the tv shows details
exports.getAllTvShows=(req,res)=>{
    Show.find( {},(error,response)=>{
        if(error)
            res.json({
                "status": "empty",
                "error": "404 Page Not Found"
            });
        // res.json(response);
        res.json({
            "status": true,
            "respData": response
        }
        )
    });
}

//get the complete tv shows details
exports.getTvShowDetail=(req,res)=>{
    console.log('inside findOne');
    var id=req.params.id;
    console.log(typeof id);
    Show.findOne({showID:id},(error,response)=>{
        if(error)
            res.json(error);
        else{
            res.json({
                status: true,
                "data":response
            })
        }
    })
}

//get the tv Show to their Name
exports.getTvShowByName=(req,res)=>{
    console.log('inside findOne');
    var searchName=req.params.name;
    console.log(searchName);
    Show.findOne({name:searchName},(error,response)=>{
        if(error)
            res.json(error);
        else{
            res.json({
                status: true,
                "data":response
            })
        }
    })
}

//get the tv Showc to their language
exports.getTvShowByLanguage=(req,res)=>{
    console.log('inside findOne');
    var searchLanguage=req.params.language;
    console.log(searchLanguage);
    Show.find({language:searchLanguage},(error,response)=>{
        if(error)
            res.json(error);
        else{
            res.json({
                status: true,
                "data":response
            })
        }
    })
}


//get the tvShow acc to their genre
exports.getTvShowByGenre=(req,res)=>{
    console.log('inside findOne');
    var searchGenre=req.params.genre;
    console.log(searchGenre);
    Show.find({genre:searchGenre},(error,response)=>{
        if(error)
            res.json(error);
        else{
            res.json({
                status: true,
                "data":response
            })
        }
    })
}

//update the tv shows details
exports.updateTvShowDetails =(req,res)=>
{
    console.log("inside update");
    var id =req.params.id;
    var updatedShowOrigin    =req.body.showOrigin;
    var updatedLanguage     = req.body.language;
    var updatedName            =req.body.name;
    var updatedImgUrl          =req.body.imgUrl;
    var updatedDescription  =req.body.description;
    var updatedDuration     =req.body.duration;
    var updatedGenre      =req.body.genre;
    Show.update({showID:id},{$set:{
                showOrigin:updatedShowOrigin,
                language:updatedLanguage,
                name :updatedName,
                imgUrl : updatedImgUrl,
                description: updatedDescription,
                duration: updatedDuration,
                genre: updatedGenre,
            }},{w:1},(err,response)=>{
            if(err){
                res.json(err);
                console.log(err);
            }
            else
            {
                res.json({
                    status:true,
                    respData:response
                })
            }
            console.log(response);
        });
}




//delete the movie details
exports.deleteTvShows=(req,res)=>{
    console.log("inside delete");
    var showId=req.params.id;
    // var id=req.body.id;
    Show.remove({showID:showId},(error,response)=>{
        if(error)
            res.json(error)
        else
        {
            res.json({
                message:"Show Deleted Successfully"
            })
        }
    })

}

//saving data in the tvShowsSeasonCollection
exports.createTvShowsSeason=(request,response)=>{
    var season=new Season({
        showID     :        request.body.showID,
        seasonID   :        request.body.seasonID,
        language   :        request.body.language,
        name       :        request.body.name,
        imgUrl     :        request.body.imgUrl,
        created_at :        new Date(),
        updated_at :        request.body.updated_at
    });
    //creating the tv shows season in the collections
    season.save((error,res)=>{
        if(error)
        {
            response.json(error);
        }
        else
        {
            response.json({
                success:true,
                body:res
            })
        }
    })
}

//saving data in the episode Collection
exports.createTvShowsSeasonEpisodes=(request,response)=>{
    var episode=new Episode({
        seasonID    :        request.body.seasonID,
        episodeTitle:        request.body.episodeTitle,
        name        :        request.body.name,
        description :        request.body.imgUrl,
        duration    :        request.body.duration,
        created_at  :        new Date(),
        updated_at  :        request.body.updated_at
    });
    //creating the tv shows season episode in the collections
    episode.save((error,res)=>{
        if(error)
        {
            response.json(error);
        }
        else
        {
            response.json({
                success:true,
                body:res
            })
        }
    })
}

//getting the all seasons info
exports.getTvShowSeasonInfo=(req,res) =>{
    console.log("inside season");
    var id=req.params.id;
    console.log(id);
    Season.find({showID:id},(error,response)=>{
        if(error)
            res.json(error);
        if(response)
        {
            res.json({
                status: true,
                data:response
            })
        }
    })

}

//getting the season's episode
exports.getTvShowSeasonEpisodeInfo=(req,res) =>{
    console.log("inside episode info");
    var id=req.params.id;
    console.log(id);
    Episode.find({seasonID:id},(error,response)=>{
        if(error)
            res.json(error);
        if(response)
        {
            res.json({
                status: true,
                data:response
            })
        }
    })
}

//getting the search result from the both tvshows and movies
exports.getMovieSearchResults=(req,res)=>{
    var searchName=req.params.name;
    Movie.find({name:searchName},(error,response)=>{
        if(error)
            res.json(error);
        if(response)
        {
            res.json({
                status:true,
                data:response
            })
        }
    })
}

//getting the search result from tvshows
exports.getTvShowSearchResults=(req,res)=>{
    var searchName=req.params.name;
    Show.find({name:searchName},(error,response)=>{
        if(error)
            res.json(error);
        if(response)
        {
            res.json({
                status:true,
                data:response
            })
        }
    })
}

//searching in the both collection movies and tv shows
exports.moviesTvShowsSearchResults = (req,res) => {
    console.log("like search");
    var searchName=req.params.name;
    console.log(searchName);
    Movie.find({name: new RegExp(searchName, 'i') }).exec().then(function(movie){
        var result=[];
        console.log(searchName);
        return Show.find({name: new RegExp(searchName, 'i')}).exec().then(function(show){
            console.log(searchName);
            return [movie,show];
        })
    }).then(function(result){
        res.json({
            success:true,
            data:result
        })
    })

}
