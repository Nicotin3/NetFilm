let FilmModel = require('./modele');
// Cet import a pour but de requeter l'API IMDB (pas nécessaire pour la suite)
let Client = require('node-rest-client').Client;
let options = {
    mimetypes: {
        json: ["application/json", "application/json; charset=utf-8"]
    }
};

let apiKey = '8209cd0d';

let client = new Client(options);

let appRouter = function (app) {

    // Home page. Envoie un tableau de 10 films stockés dans la BDD.
    // Paramètre de la requête : ?page=2 pour afficher la page 2.
    app.get("/", function (req, res) {
        let perPage = 10;
        let page = Math.max(0, req.query.page);

        console.log("[GET] /?page=" + page);

        FilmModel.find({ Title: { $exists: true } }, null, {limit:perPage, skip:perPage * page}, function (err, data) {
            if (err) res.status(404).send(err);

            FilmModel.count({ Title: { $exists: true } }, function (err, count) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({count: count, data: data});
            });
        });
    });

    // Récupère toutes les informations d'un film à partir de son id
    // dans le paramètre id de l'URI. Ne devrait être appelé que par
    // clic sur un résultat de recherche.
    app.get("/film", function (req, res) {
        console.log("[GET] /film?id=" + req.query.id);
        if (req.query.id) {
            FilmModel.findById(req.query.id, function (err, data) {
                if (err) res.status(404).send(err);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(data);
            });
        }
        else {
            res.setHeader("Content-Type", "text/plain");
            res.status(404).send("Veuillez fournir l'id du film.");
        }
    });

    // Requete la base de donnee sur les parametre passés.
    // Example : /search?title=blade%20runner
    // Retourne un tableau des films correspondants à la recherche.
    app.get("/search", function (req, res) {
        // La recherche sera sur : title, genre, autor, actor, page
        let title = {$exists: true};
        let genre = {$exists: true};
        let autor = {$exists: true};
        let actor = {$exists: true};

        let regex = /\s/gi;

        if (req.query.title) title = new RegExp('.*'+req.query.title.replace(regex, '.')+'.*', "i");

        if (req.query.genre) genre = new RegExp('.*'+req.query.genre.replace(regex, '.')+'.*', "i");

        if (req.query.autor) autor = new RegExp('.*'+req.query.autor.replace(regex, '.')+'.*', "i");

        if (req.query.actor) actor = new RegExp('.*'+req.query.actor.replace(regex, '.')+'.*', "i");

        let perPage = 10;
        let page = Math.max(0, req.query.page);

        console.log("[GET} /search?title=" + title + "&genre=" + genre + "&autor=" + autor + "&actor=" + actor + "&page=" + page);

        FilmModel.find({ "Title": title, "Genre": genre, "Director": autor, "Actors": actor},
            null, {limit:perPage, skip:perPage * page}, function (err, data) {
            if (err) res.status(404).send(err);

            FilmModel.count({ "Title": title, "Genre": genre, "Director": autor, "Actors": actor}, function (err, count) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({count: count, data: data});
            });
        });
    });

    app.get("/init", function (req, res) {
        // Test d'ajout dans la BDD
        let filmsAdded = [];
        let start = 94674; // Déjà ajouté : 83663 à 94673
        while (start <= 99674) {
            client.get("http://www.omdbapi.com/?i=tt00" + start.toString() + "&apikey=" + apiKey, function (data, response) {
                try {
                    const result = JSON.parse(data);

                    if (result.Response) {
                        filmsAdded.push(result.Title);
                        let film = new FilmModel(
                            {
                                "Title": result.Title,
                                "Year": result.Year,
                                "Rated": result.Rated,
                                "Released": result.Released,
                                "Runtime": result.Runtime,
                                "Genre": result.Genre,
                                "Director": result.Director,
                                "Writer": result.Writer,
                                "Actors": result.Actors,
                                "Plot": result.Plot,
                                "Language": result.Language,
                                "Country": result.Country,
                                "Awards": result.Awards,
                                "Poster": result.Poster,
                                "Ratings": result.Ratings,
                                "Metascore": result.Metascore,
                                "imdbRating": result.imdbRating,
                                "imdbVotes": result.imdbVotes,
                                "imdbID": result.imdbID,
                                "Type": result.Type,
                                "DVD": result.DVD,
                                "BoxOffice": result.BoxOffice,
                                "Production": result.Production,
                                "Website": result.Website
                            }
                        );
                        film.save(function (err) {
                            if (err) throw err;
                            console.log('Film : ' + result.Title + ' ajouté');
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
            start++;
        }
        res.setHeader("Content-Type", "application/json");
        res.status(201).send("Insertion réalisée des films suivant : " + filmsAdded.toString());
    });

    app.post("/addfilm", function (req, res) {
        let film = new FilmModel(req.body);
        console.log("tentative d'ajout du film :\n" + req.body);
        // film.save(function (err) {
        //     if (err) res.status(422).send("Erreur lors de l'ajout");
        //     res.status(201).send("Ajout OK");
        // });
    });

    app.use(function (req, res) {
        console.log("[" + req.protocol + "]" + ' ://' + req.url);
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
    });

};

module.exports = appRouter;
