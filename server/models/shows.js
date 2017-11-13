//creating the schema of the tv shows

var mongoose = require('mongoose');


//defining the schema of the tv shows table

var tvShows_schema=mongoose.Schema;
    var tvShowsSchema=new tvShows_schema({
        showID: {type:String, unique:true},
        showOrigin: {type:String},
        language: {type:String},
        name: {type: String},
        imgUrl: {type: String},
        description: {type: String},
        duration: {type: String},
        genre: {type: String},
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date}
    });

    //creating the collection with the defined schema
    var Show = mongoose.model('tvShow',tvShowsSchema);

    module.exports=Show;