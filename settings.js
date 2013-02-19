exports.routes = function(app) {
    app.all('*', function(req, res, next){
        if (!req.get('Origin')) return next();
        // use "*" here to accept any origin
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
        // res.set('Access-Control-Allow-Max-Age', 3600);
        // if ('OPTIONS' == req.method) return res.send(200);
        next();
    });


    app.get('/contacts', function(req, res) {
        var contacts;

        contacts = [
            {
                id: 1,
                firstName: 'Fabricio',
                lastName: 'Tavares',
                emails: [1, 2]
            },
            {
                id: 2,
                firstName: 'Tiago',
                lastName: 'Cussiol',
                emails: [3]
            },
            {
                id: 3,
                firstName: 'André',
                lastName: '',
                emails: []
            }
        ];
        res.send({ contacts: contacts });
    });

    app.get('/emails', function(req, res) {
        var emails;

        emails = [
            {
                id: 1,
                contact_id: 1,
                email: 'fabricio1@email.com'
            },
            {
                id: 2,
                contact_id: 1,
                email: 'fabricio2@email.com'
            },
            {
                id: 3,
                contact_id: 2,
                email: 'tiago@email.com'
            }
        ];
        res.send({ emails: emails });
    });
};