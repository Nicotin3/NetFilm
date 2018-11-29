let FilmModel = require('./modele');

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

    app.use(function(req, res){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
    });

};

module.exports = appRouter;
