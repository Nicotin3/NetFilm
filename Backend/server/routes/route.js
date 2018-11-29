let Client = require('node-rest-client').Client;
let options ={  
    mimetypes:{
        json:["application/json","application/json; charset=utf-8"]
    }
};

let client = new Client(options);


let appRouter = function (app) {

    app.get("/", function(req, res) {
        res.status(200).send("Welcome to our restful API");
    });

    app.get("/films", function (req, res) {
        let json = mongoose.findOne();
        res.status(200).send(json);
    });

    app.use(function(req, res){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
    });

};

module.exports = appRouter;
