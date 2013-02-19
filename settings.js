var app, express, FIXTURES, querystring, BufferJoiner;

// ..........................................................
// NODE MODULES
//
express = require('express');
querystring = require('querystring'),
BufferJoiner = require('bufferjoiner');

// ..........................................................
// FIXTURES
//
FIXTURES = {
    people: [
        {
            "id": 1,
            "first_name": 'Fabricio',
            "last_name": 'Tavares',
            "twitter": 'fabriciotav',
            "frameworks": [
                {
                    id: 1,
                    name: 'Ember'
                },
                {
                    id: 3,
                    name:'Backbone'
                }
            ]
        },
        {
            "id": 2,
            "first_name": 'Tiago',
            "last_name": 'Cussiol',
            "twitter": '',
            "frameworks": []
        },
        {
            "id": 3,
            "first_name": 'André',
            "last_name": '',
            "twitter": '',
            "frameworks": []
        }
    ],

    frameworks: [
        {
            id: 1,
            name: 'Ember.js'
        },
        {
            id: 2,
            name: 'AngularJS'
        },
        {
            id: 3,
            name: 'Backbone.js'
        },
        {
            id: 4,
            name: 'Dojo'
        },
        {
            id: 5,
            name: 'KnockoutJS'
        },
        {
            id: 6,
            name: 'YUI'
        }
    ]
};

// app = express(); // localhost

// ..........................................................
// EXPORTS
//
exports.routes = function(app) {
    app.all('*', function(req, res, next) {
        if (!req.get('Origin')) return next();
        // use "*" here to accept any origin
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
        // res.set('Access-Control-Allow-Max-Age', 3600);
        if ('OPTIONS' == req.method) return res.send(200);
        next();
    });

    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // FIND
    app.get('/people', function(req, res) {
        var people;
        people = FIXTURES.people;

        res.send({ "people": people });
    });

    // FIND ONE
    app.get('/people/:id', function(req, res) {
        var contact, reqId;

        reqId = req.params.id;

        FIXTURES.people.forEach(function(d, i) {
            if (d.id == reqId) {
                return res.send({ person: d });
            }
        });
    });

    // CREATE
    app.post('/people', function(req, res) {
        var person, reqPaylod, rawBody;

        rawBody = new BufferJoiner();

        req.on('data', function (chunk) {
          rawBody.add(chunk);
        });

        req.once('end', function () {
            rawBody = rawBody.join();

            reqPaylod = JSON.parse(rawBody.toString('utf8'));
            console.log( "reqPaylod", reqPaylod );
            
            person = {
                  id: FIXTURES.people.length + 1,
                  first_name: reqPaylod.person.first_name,
                  last_name: reqPaylod.person.last_name,
                  twitter: reqPaylod.person.twitter,
                  frameworks: reqPaylod.person.frameworks
              };
      
              FIXTURES.people.push(person);
      
              return res.send({ person: person });
        });        
    });

    // UPDATE
    app.put('/people/:id', function(req, res) {
        var person;

        return res.send({ person: person });
    });

    // DELETE
    app.delete('/people/:id', function(req, res) {
        var contact, reqId;

        reqId = req.params.id;

        FIXTURES.people.forEach(function(d, i) {
            if (d.id == reqId) {
                FIXTURES.people.splice(i, 1);
                return res.send(200);
            }
        });
    });

    // Frameworks
    // FIND
    app.get('/frameworks', function(req, res) {
        var frameworks;
        frameworks = FIXTURES.frameworks;
        res.send({ "frameworks": frameworks })
    });

    // FIND ONE
    app.get('/frameworks/:id', function(req, res) {
        var contact, reqId;

        reqId = req.params.id;

        FIXTURES.frameworks.forEach(function(d, i) {
            if (d.id == reqId) {
                return res.send({ framework: d });
            }
        });
    });

    // app.listen(4000); // localhost
};
