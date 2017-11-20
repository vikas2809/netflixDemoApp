
//importing the user model from the models
var User =require('../models/user');
var Movie =require('../models/movies');
var Show = require('../models/shows');
var Season = require('../models/season');
var Episode = require('../models/episodes');
var jwt = require('jsonwebtoken');
var express= require('express');
var bcrypt=require('bcrypt');
var FileSystem = require('fs');
var nodemailer = require('nodemailer');
var app=express();
app.set('superSecret','serverToken');
var Image=require('../functions/imageUpload');
var Success=require('../functions/success');
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
    // console.log(request.body.image);
    // user.image=request.body.image;
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

// console.log("image"+user.image);


    // encrypt the password
    console.log(user.password);
    var salt =bcrypt.genSaltSync(10);
    console.log(salt);
    var hash=bcrypt.hashSync(user.password,salt);
    console.log(hash);
    user.password=hash;
    console.log(user.password);
    console.log("Visible");
    console.log(user.visible);
    console.log("vusivle");


   // //saving the image in the collections
   //  let image=user.image;
   //  let imageGroup=user.email;
   //  let matches=image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
   // // let macthes=image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
   //
   //  let imageResponse={};
   //  //
   //  if(matches.length !==3)
   //    return new Error('Invalid image ')
   //  //
   //    imageResponse.type=matches[1];
   //    console.log(matches[1] + 'match 1');
   //  //
   //    response.data = new Buffer(matches[2], 'base64')
   //  //
   //    var data = imageNameData(image);
   //  //
   //    function imageNameData(data) {
   //      console.log("inside function")
   //      var imageName = imageGroup + '_' + Math.random();
   //      if (data.indexOf('image/jpeg') > -1) {
   //          return imageName + '.jpeg';
   //      }
   //      if (data.indexOf('image/png') > -1) {
   //          return imageName + '.png';
   //      }
   //      if (data.indexOf('image/gif') > -1) {
   //          return imageName + '.gif';
   //      }
   //  }
   //  //
   //  var imageName = '/Node JS/New folder (2)/changing approach/netflixDemoApp-master/src/assets/adminImages' + '/' + data;
   //   // E:\Node JS\New folder (2)\changing approach\netflixDemoApp-master\src\assets\adminImages
   //  console.log(imageName);
   //  FileSystem.writeFile(imageName, response.data, function (error) {
   //      // console.log(response.data);
   //      if (error) throw error
   //  })
   //  user.image = data;



   user.image=Image.saveUploadImage(user.image,user.email);





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
    User.find({},(error,response)=>{
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
            // res.json({
            //     "status":true,
            //     "data":response
            // })
            res.json(Success.successResponse(response));
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


exports.setAdminImage=(req,res)=>{
  console.log("inside setting image");
  console.log(req.params.email);
  console.log(req.body.image);
  User.update({email:req.params.email},
  { $set: { image: req.body.image } },(error,response)=>{
    if(error)
        res.json(error);
    if(response)
    {
        res.json({
            "message":"Image Uploaded Successfully",
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
