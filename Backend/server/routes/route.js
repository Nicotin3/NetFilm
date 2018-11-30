let FilmModel = require('./modele');
// Cet import a pour but de requeter l'API IMDB (pas nécessaire pour la suite)
let Client = require('node-rest-client').Client;
let options ={
    mimetypes:{
        json:["application/json","application/json; charset=utf-8"]
    }
};

let apiKey = '8209cd0d';

let client = new Client(options);

let appRouter = function (app) {

    app.get("/", function(req, res) {
        res.status(200).send("Welcome to our restful API");
    });

    app.get("/films", function (req, res) {
        // Test d'ajout dans la BDD d'un film
        let film = new FilmModel({"Title":"Blade Runner","Year":"1982","Rated":"R","Released":"25 Jun 1982","Runtime":"117 min","Genre":"Sci-Fi, Thriller","Director":"Ridley Scott","Writer":"Hampton Fancher (screenplay), David Webb Peoples (screenplay), Philip K. Dick (novel)","Actors":"Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos","Plot":"A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.","Language":"English, German, Cantonese, Japanese, Hungarian, Arabic","Country":"USA, Hong Kong","Awards":"Nominated for 2 Oscars. Another 11 wins & 16 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.2/10"},{"Source":"Rotten Tomatoes","Value":"90%"},{"Source":"Metacritic","Value":"89/100"}],"Metascore":"89","imdbRating":"8.2","imdbVotes":"605,776","imdbID":"tt0083658","Type":"movie","DVD":"27 Aug 1997","BoxOffice":"N/A","Production":"Warner Bros. Pictures","Website":"N/A"});
        film.save(function (err) {
            if (err) throw err;
            console.log('Film ajouté');
        });
        /*FilmModel.findOne({},function (err,data) {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(data);
        });*/
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(film);
    });

    app.get("/init", function (req, res) {
        // Test d'ajout dans la BDD
        let start = 3663;
        while(start <= 3663) {
            client.get("http://www.omdbapi.com/?i=tt008" + start.toString() + "&apikey=" + apiKey, function (data, response) {
                console.log(data);
                console.log(data.response);
                // if (data.response == "True"){
                //     for (const result of search.results) {
                //         console.log(result.title);
                //         let film = new FilmModel(
                //             {
                //                 "Title": result.title,
                //                 "Year": result.year,
                //                 "Rated": result.rated,
                //                 "Released": result.released,
                //                 "Runtime": result.runtime,
                //                 "Genre": result.genre,
                //                 "Director": result.director,
                //                 "Writer": result.writer,
                //                 "Actors": result.Actors,
                //                 "Plot": result.plot,
                //                 "Language": result.language,
                //                 "Country": result.country,
                //                 "Awards": result.awards,
                //                 "Poster": result.poster,
                //                 "Ratings": result.ratings,
                //                 "Metascore": result.metascore,
                //                 "imdbRating": result.imdbRating,
                //                 "imdbVotes": result.imdbVotes,
                //                 "imdbID": result.imdbID,
                //                 "Type": result.type,
                //                 "DVD": result.dvd,
                //                 "BoxOffice": result.boxOffice,
                //                 "Production": result.production,
                //                 "Website": result.website
                //             }
                //         );
                //         film.save(function (err) {
                //             if (err) throw err;
                //             console.log('Film : ' + result.title + ' ajouté');
                //         });
                //     }
                // }
            });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(201).send("Insertion réalisée");
    });

    app.use(function(req, res){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
    });

};

module.exports = appRouter;
