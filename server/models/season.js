//creating the schema of the tv shows seasons

var mongoose = require('mongoose');


//defining the schema of the tv shows seasons table

var tvShowsSeason_schema=mongoose.Schema;
    var tvShowsSeasonSchema=new tvShowsSeason_schema({
        showID: {type:String},
        seasonID: {type:String, unique:true},
        language: {type:String},
        name: {type: String},
        imgUrl: {type: String},
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date}
    });

    //creating the collection with the defined schema
    var Season = mongoose.model('season',tvShowsSeasonSchema);

    module.exports=Season;