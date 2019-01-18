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
    // TODO : retourner les infos nécessaire au bon affichage de la page d'acceuil
    app.get("/", function (req, res) {
        let perPage = 10;
        let page = Math.max(0, req.query.page);

        FilmModel.find({ Title: { $exists: true } }, {limit:perPage, skip:perPage * page}, function (err, data) {
            if (err) throw err; // TODO Afficher un message d'erreur parlant à l'utilisateur

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
        if (req.query.id) {
            FilmModel.findById(req.query.id, function (err, data) {
                if (err) throw err; // TODO Afficher un message d'erreur parlant à l'utilisateur
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(data);
            });
        }
        else {
            res.setHeader("Content-Type", "text/plain");
            res.status(404).send("Veuillez fournir l'id du film.");
        }
    });

    // Requete la base de donnee sur le parametre passé "title".
    // Example : /search?title=blade%20runner
    // Retourne un tableau minimal d'éléments dont l'id.
    // TODO ajouter d'autres éléments de recherche ?
    app.get("/search", function (req, res) {
        if (req.query.title) {
            // TODO analyser le retour d'une recherche incomplète. Est-ce un tableau ?
            // TODO faire une recherche lowercase dans mongo ?
            // Si pas de doute, retourner un un tableau d'un elem avec id et l'appli
            // requêtera les données complètes sur /film?id=...
            FilmModel.find({"_id": req.query.title}, function (err, data) {
                if (err) throw err; // TODO Afficher un message d'erreur parlant à l'utilisateur
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(data);
            });
        }
        // TODO ajouter d'autres filtres de recherche ? necessitera surement une adaptation du modèle
        else {
            res.setHeader("Content-Type", "text/plain");
            res.status(404).send("Veuillez fournir un titre de film.");
        }
    });

    app.get("/init", function (req, res) {
        // Test d'ajout dans la BDD
        let filmsAdded = [];
        let start = 83663;
        while (start <= 94673) {
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

    app.use(function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
    });

};

module.exports = appRouter;
