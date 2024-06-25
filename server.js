/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Ishika Munjal Student ID: 172502213 Date: 25/06/2023
*
*  Published URL: https://assignment-3-omega-steel.vercel.app/
*
********************************************************************************/
const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets');

const app = express();
const PORT = process.env.PORT || 3000;

legoData.initialize()
    .then(() => {
        console.log('Lego data initialized successfully.');
        

        app.get('/', (req, res) => {
            res.send('Assignment 3: Ishika Munjal - 172502213');
        });

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '/views/home.html'));
        });

        app.get('/about', (req, res) => {
            res.sendFile(path.join(__dirname, '/views/about.html'));
        });

        app.get('/lego/sets', (req, res) => {
            if (req.query.theme) {
                legoData.getSetsByTheme(req.query.theme)
                    .then((sets) => {
                        res.json(sets);
                    })
                    .catch((err) => {
                        res.status(404).send(err);
                    });
            } else {
                legoData.getAllSets()
                    .then((sets) => {
                        res.json(sets);
                    })
                    .catch((err) => {
                        res.status(404).send(err);
                    });
            }
        });

        app.get('/lego/sets', (req, res) => {
            legoData.getAllSets()
                .then(data => res.json(data))
                .catch(err => res.status(500).send(err));
        });

        app.get('/lego/sets/num-demo', (req, res) => {
            legoData.getSetByNum('001-1')
                .then(data => res.json(data))
                .catch(err => res.status(404).send(err));
        });

        app.get('/lego/sets/theme-demo', (req, res) => {
            legoData.getSetsByTheme('tech')
                .then(data => res.json(data))
                .catch(err => res.status(404).send(err));
        });
        app.use(express.static('public'));

        app.use((req, res, next) => {
            res.status(404).send("404 - We're unable to find what you're looking for.");
          });
          app.get('/lego/sets/:set_num', (req, res) => {
            legoData.getSetByNum(req.params.set_num)
                .then((set) => {
                    res.json(set);
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        });

        app.use((req, res) => {
            res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
        });

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(`Unable to start server: ${err}`);
    });
