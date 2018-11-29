let mongoose = require('mongoose');

// Modèle de données
let FilmSchema = new mongoose.Schema(
    {
        "Title": String,
        "Year": String,
        "Rated": String,
        "Released": String, // "25 Jun 1982" make it a date ?
        "Runtime": String,
        "Genre": String,
        "Director": String,
        "Writer": String,
        "Actors": String, // make it an array of String ??
        "Plot": String,
        "Language": String, // make it an array of String ??
        "Country": String,
        "Awards": String,
        "Poster": String,
        "Ratings": [
            {
                "Source": String,
                "Value": String
            }
        ],
        "Metascore": Number,
        "imdbRating": String,
        "imdbVotes": String,
        "imdbID": String,
        "Type": String,
        "DVD": String,  // "27 Aug 1997" make it a date ?
        "BoxOffice": String,
        "Production": String,
        "Website": String
    }
);

let FilmModel = mongoose.model('films', FilmSchema);
module.exports = FilmModel;