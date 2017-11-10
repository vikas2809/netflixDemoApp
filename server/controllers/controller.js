
//importing the user model from the models
var User =require('../models/user');
var Movie =require('../models/movies');
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


//update the movie details
exports.updateMovieDetails =(req,res)=>
{
    var id =req.params.id;
    var updatedMovieOrigin    =req.body.movieID;
    var updatedName            =req.body.name;
    var updatedImgUrl          =req.body.imgUrl;
    var updatedDescription  =req.body.description;
    var updatedDuration     =req.body.duration;
    var updatedGenre      =req.body.genre;
     Movie.update({movieID:id},{$set:{
                movieOrigin:updatedMovieOrigin,
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
    var movieName=req.params.name;
    // var id=req.body.id;
    Movie.remove({name:movieName},(error,response)=>{
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
