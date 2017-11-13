//creating the schema of the seasons episodes

var mongoose = require('mongoose');


//defining the schema of the seasons episode table

var seasonEpisodes_schema=mongoose.Schema;
    var seasonEpisodeSchema=new seasonEpisodes_schema({
        seasonID: {type:String},
        episodeTitle: {type:String},
        name: {type: String},
        description: {type: String},
        duration: {type: String},
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date}
    });

    //creating the collection with the defined schema
    var Episode = mongoose.model('episode',seasonEpisodeSchema);

    module.exports=Episode;