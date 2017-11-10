//creating the schema of the movies

var mongoose = require('mongoose');


//defining the schema of the user table

var movie_schema=mongoose.Schema;
    var movieSchema=new movie_schema({
        movieID: {type:String, unique:true},
        movieOrigin: {type:String},
        name: {type: String},
        imgUrl: {type: String},
        description: {type: String},
        duration: {type: String},
        genre: {type: String},
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date}
    });

    //creating the collection with the defined schema
    var Movie = mongoose.model('movie',movieSchema);

    module.exports=Movie;