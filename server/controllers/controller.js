
//importing the user model from the models
var User =require('../models/user');
var Movie =require('../models/movies');
var Show = require('../models/shows');
var Season = require('../models/season');
var Episode = require('../models/episodes');
var jwt = require('jsonwebtoken');
var express= require('express');
var bcrypt=require('bcrypt');
var nodemailer = require('nodemailer');
var app=express();
app.set('superSecret','serverToken');

// var Success=require('../functions/success');


// module.exports=(res,data)=>{
//     res.status(data.status_code).json(data);
//     return;
// }


// var transport = nodemailer.createTransport({
//     service: 'hotmail',
//     auth:{ 
//         user: 'vikas.kant1992@hotmail.com',
//         pass: 'vikas@1994'
//     }
// });


//saving data in the user collections
exports.createUserDetails=(request,response)=>{
    var user=new User({
        firstName:  request.body.firstName,
        lastName:   request.body.lastName,
        password:   request.body.password,
        email:      request.body.email,
        role:       request.body.role,
        visible:    request.body.visible,
        image:      request.body.image,
        created_at:new Date(),
        updated_at:request.body.updated_at
    });

    console.log(user.password);

    // console.log(decipher);
    // var random,link;

    // random=Math.floor((Math.random()*100)+54);
    // link="http://localhost:7777/api"+"/v1/verifyemail/"+rand;
    // console.log(link);
    // mailOptions={
    //     to:user.email,
    //     subject: "please confirm your Email Account",
    //     html: "Hello, <br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    // }
    // console.log(mailOptions);

    // transport.sendMail(mailOptions,function(error,info){
    //     if(error){
    //         console.log(error);
    //     }else
    //     {
    //         console.log('Email sent'+info.response);
    //     }
    // });


    //trying to encrypt the password
    console.log(user.password);
    var salt =bcrypt.genSaltSync(10);
    console.log(salt);
    var hash=bcrypt.hashSync(user.password,salt);
    console.log(hash);
    user.password=hash;
    console.log(user.password);
    user.image="data:image/jpeg;base64,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KeIY6p0yEKITJwNuqwKKqqlEyebIlSMYCaJRkmsv1VPdUkiyacEq7bJgBQqhNAuqws6mMHqmZ0HdCaH6nQVkJp7K8JOyg84BGqCrh//aAAwDAQACAAMAAAAQ/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/APv/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wC3tv0v/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/APy2222223//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD+222222227/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AOe22222222//wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/APZbbbbbbbbbb9//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/APW2222222222/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDbbbbbbbbbbbbf/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A7bbbbbbbbbbbbbf/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDLbbbbbbbbbbbbbv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD9tttttttttttttt//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/W22222222222223/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/APbbbbbbbbbbbbbbbP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wB9tttttttttttttt//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A2222222222222222/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD9tttttttvttttttt//wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AG2222222+222222/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/APbbbbbbb7b7bbbbbbf/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AO222222+/8A9tttttvv/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD7bbbbb7//AG222223/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/ALbbbbbf/bffbbbbbP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDltttt9/vvt9tttt//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A+22233+32/322223/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP7bbff77777fbbbP/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD9tttvv9t9/wD7bb//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD5bf8A++++3+++23f/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD22++3+/8Av9v/ALZ//wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD++/23/wDv9/v9/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AG/32/23233/AH//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP7db7ffff8A+2e//wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AL/bff8A+2232/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD7/f8AW+2+3e3++/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AO+23+++7S/+333+/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP7/AO3T/wD/AP7/AH26f3//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A7bdb/wC622+/732z33//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/APs/9/v9t9tt/v8Af7/f/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/fb/AG//ANv999v/AP7f7rf/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDf7fb/AG/32+33+32/3/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8Atttv9/t/v999vt/tt/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AN/99t/t99vtv/8Af7777/b/AP8A/wD/AP8A/wD/AP8A/wD/AP8Av9tvtt99999//t/9tvt9/wD/AP8A/wD/AP8A/wD/AP8A/wD7f/8A/wDv999vtvt999vtvt8v/wD/AP8A/wD/AP8A/wD/AP8Au9vt/tt/vv8Af/77bbf/AH+++/8A/wD/AP8A/wD/AP8A/wD77b/f7/8A33233/3323+/3+3f/wD/AP8A/wD/AP8A/wD/AL977f7bf/7fb7//AG//ANt9tvvtv/8A/wD/AP8A/wD/AP8Abbf7b/f/AH/23+22/wB/v/8A7fbPf/8A/wD/AP8A/wD/AP8A+/32/wDv9vt9/v8Af/bf7/bff7ff/wD/AP8A/wD/AP8Afdf/AH/2+33/AN99tvvtt/tv/wD/AH33/wD/AP8A/wD/APfbrb77b/8A33+3+/3/AN//ALf777bPff8A/wD/AP8A/wB/t/8Abf8A/wDtvvt/9/tvvtv/AL7bf9b/AP8A/wD/AP8A/wDb/f8A2322/wDvv/8A/f8A+322+++3+2+//wD/AP8A/wDvv/vvt9/vv/8Afbf/AG+332//APvvv9/tv/8A/wD+/wDt9/v99vvvvt/t/v8A/wD/AP8A7bb/AP32/wDv/wD/AO++332++/8A9tttv99t/vvttv8A777b/b7/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";
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


exports.getValidUser=(req,res)=>{
    User.find({email:req.params.email},(error,response)=>{
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


//getting the user on the basis of user's role
exports.getUserRole=(req,res)=>{
    User.find({
    $and : [
        { $and : [ { role: req.params.role }, { visible: true} ] },
    ]
},(error,response)=>{
        if(error)
        {
            res.json({
                "status":"empty",
                "error":"No User found"
            })
        }
        if(response)
        {
            res.json({
                "status":true,
                "data":response
            })
        }
    })
}


//requesting for authenticate the user requesting for the login access in the website
exports.userAuthentication=(req,res)=>{
    console.log("user authentication");
    console.log(req.body.password);
    // console.log(User.password);
    User.findOne({
        email: req.body.email
      }, function(err, user) {

        if (err) throw err;

        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          // check if password matches
          if (!bcrypt.compareSync(req.body.password,user.password)) {
              console.log(req.body.password);
              console.log(user.password);
              var result=bcrypt.compareSync(user.password,req.body.password);
              console.log(result);
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          role: user.role,
          email:user.email,
          password:user.password
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


//deleting the user from the user collections
// exports.deleteUser=(req,res)=>{
//     console.log("inside delete");
//     User.find({email:req.params.email},(error,response)=>{
//         if(error)
//             res.json(error);
//         if(response)
//         {
//             console.log(response.visible);
//             response.visible=false;
//             console.log(response.visible);
//             res.json({
//                 "message":"Deleted Successfully",
//                 data:response
//             })
//         }
//     })
// }


//delete the users from the user collections and update the value
exports.deleteUser=(req,res)=>{
    console.log("inside delete");
    User.update({ email: req.params.email },
    { $set: { visible: false } },(error,response)=>{
        if(error)
            res.json(error);
        if(response)
        {
            // console.log(response.visible);
            // response.visible=false;
            // console.log(response.visible);
            res.json({
                "message":"Deleted Successfully",
                data:response
            })
        }
    })
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
    console.log('inside save');
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
        console.log('inside save');
        if(error)
        {
            console.log('inside error');
            response.json(error);
        }
        else
        {
            console.log('inside response');
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

//searching in the both collection movies and tv shows on the basis of any one field
exports.moviesTvShowsSearchResults = (req,res) => {
    console.log("like search");
    var searchName=req.params.name;
    console.log(searchName);
    Movie.find({name: new RegExp(searchName, 'i') }).exec().then(function(movie){
        var result=[];
        console.log(searchName);
        return Show.find({name: new RegExp(searchName, 'i')}).exec().then(function(show){
            console.log(searchName);
            if(movie.length===0){

                console.log('inside movie length'+movie.length);
                if(show.length!==0)
                    return show;
            }
            if(show.length===0)
             {  
                console.log('inside show length'+movie.length); 
                if(movie.length!==0)
                return movie;}
            if(movie.length===0&&show.length===0)
              {  
                  console.log('inside both movie and show'+movie.length+"  "+show.length);
                  return "no result found";}
            if(movie.length!==0&&show.length!==0)
            {
                console.log('inside else'+movie.length+"  "+show.length);
            return [movie,show];
            }
        })
    }).then(function(result){
        res.json({
            success:true,
            data:result
        })
    })

}



//searching the complete movie collections
exports.searchMoviesCompleteCollection = (req,res)=>{
    console.log("search movies and tv shows collections");
    var searchName=req.params.name;
    console.log(searchName);
    var tempName = new RegExp(searchName, 'i');
    console.log(tempName);
    var searchResult=[];
    Movie.find({},(error,result)=>{
        console.log("inside find");
        if(result)
        {
        for (var key=0;key<result.length;key++) {
            console.log("inside for");
            console.log(key);
            if (tempName.test(result[key]) )
            {
                console.log(tempName.test(result[key]));
                searchResult.push(result[key]);
            }
            }
            if(searchResult.length===0)
            {
                res.json({
                    "error":"No results Found"
                    }) 
            }
            if(searchResult.length!==0){
                res.json({
                    status:true,
                    data:searchResult
                    })
            }   
        }
            if(error)
            {
                res.json({
                            error:"no results found"
                        })
            }
        });
}


//searching  on all the field of tv shows collections
exports.searchTvShowsCollectionOnAllField = (req,res)=>{
    console.log("search tv shows collections");
    var searchName=req.params.name;
    console.log(searchName);
    var tempName = new RegExp(searchName, 'i');
    console.log(tempName);
    var searchResult=[];
    Show.find({},(error,result)=>{
        console.log("inside find");
        if(result)
        {
        for (var key=0;key<result.length;key++) {
            console.log("inside for");
            console.log(key);
            if (tempName.test(result[key]) )
            {
                console.log(tempName.test(result[key]));
                searchResult.push(result[key]);
            }
            }
            if(searchResult.length===0)
            {
                res.json({
                    "error":"No results Found"
                    }) 
            }
            if(searchResult.length!==0){
                res.json({
                    status:true,
                    data:searchResult
                    })
            }   
        }
            if(error)
            {
                res.json({
                            error:"no results found"
                        })
            }
        });
}


//searching in the both movies and tvshows collections on any field
exports.searchMoviesAndTvShowsCollection = (req,res)=>{
    console.log("like search");
    var searchName=req.params.name;
    console.log(searchName);
    Movie.find({name: new RegExp(searchName, 'i') }).exec().then(function(movie){
        var result=[];
        console.log(searchName);
        return Show.find({name: new RegExp(searchName, 'i')}).exec().then(function(show){
            console.log(searchName);
            if(movie.length===0){

                console.log('inside movie length'+movie.length);
                if(show.length!==0)
                    return show;
            }
            if(show.length===0)
             {  
                console.log('inside show length'+movie.length); 
                if(movie.length!==0)
                return movie;}
            if(movie.length===0&&show.length===0)
              {  
                  console.log('inside both movie and show'+movie.length+"  "+show.length);
                  return "no result found";}
            if(movie.length!==0&&show.length!==0)
            {
                console.log('inside else'+movie.length+"  "+show.length);
            return [movie,show];
            }
        })
    }).then(function(result){
        res.json({
            success:true,
            data:result
        })
    })
}


//searching in the both movies and tvshows collections on any field
// exports.searchMoviesAndTvShowsCollection = (req,res)=>{
//     console.log("search movies and tv shows collections");
//     var searchName=req.params.name;
//     console.log(searchName);
//     Movie.find().forEach(function(doc){
//         for (var key in doc) {
//             if ( /searchName/i.test(doc[key]) )
//             {
//                 res.json({
//                     status: true,
//                     data:doc
//                 })
//             }
//             else
//             {
//                 res.json({
//                     error:"no results found"
//                 })
//             }
//             }
//         });
// }

// Show.find({name:searchName},(error,response)=>{
//     if(error)
//         res.json(error);
//     if(response)
//     {
//         res.json({
//             status:true,
//             data:response
//         })
//     }
// })