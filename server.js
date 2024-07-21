/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Ishika Munjal Student ID: 172502213 Date: 20/07/2024
*
*  Published URL: https://assignment-4-omega-steel.vercel.app/
*
********************************************************************************/
const express = require('express');
const path = require('path');   
const legoData = require('./modules/legoSets');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ensure legoData is initialized before starting the server
legoData.initialize().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.error('Failed to initialize legoData', err);
});

app.get('/', (req, res) => {
  res.render('home', { name: 'Your Name', studentId: 'Your Student ID' });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/lego/sets', (req, res) => {
  legoData.getAllSets().then((sets) => {
    res.render('sets', { sets });
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.get('/lego/sets/num-demo', (req, res) => {
  legoData.getSetByNum('1234').then((set) => {
    res.render('set', { set });
  }).catch((err) => {
    res.status(404).render('404', { message: err });
  });
});

app.get('/lego/sets/theme-demo', (req, res) => {
  legoData.getSetsByTheme('technic').then((sets) => {
    res.render('sets', { sets });
  }).catch((err) => {
    res.status(404).render('404', { message: err });
  });
});

app.use((req, res) => {
  res.status(404).render('404', { message: 'Page not found' });
});