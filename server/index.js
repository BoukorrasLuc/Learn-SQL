const express = require('express');
const app = express();
const port = 3000;

require("dotenv").config();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'sakila'
});


app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    console.log(`Server is listening on ${port}`);
});


app.get('/', (req, res) => {
    res.send(`Welcome to the API of the Sakila database`);
});



//SQL = SELECT * FROM actor
app.get('/actors', (req, res) => {
    // simple SELECT 
    connection.query('SELECT * FROM actor', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

//SQL = SELECT * FROM actor WHERE first_name = "Penelope"
app.get('/actorsPenelope', (req, res) => {
    // simple SELECT with WHERE clause
    connection.query('SELECT * FROM actor' + ' WHERE first_name = "Penelope"', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

//SQL = SELECT * FROM actor WHERE first_name = "Penelope" AND last_name = "Guiness"
app.get('/actorsPenelopeGuiness', (req, res) => {
    // simple SELECT with WHERE clause
    connection.query('SELECT * FROM actor' + ' WHERE first_name = "Penelope" AND last_name = "Guiness"', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});


app.get('/actors/:id', (req, res) => {
    // select with params and WHERE clause
    connection.query('SELECT * FROM actor WHERE actor_id = ?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});



// SQL = SELECT COUNT(*) FROM actor
app.get('/actorsCount', (req, res) => {
    // simple SELECT with COUNT
    connection.query('SELECT COUNT(*) FROM actor', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

// SQL = SELECT COUNT(*) FROM actor WHERE first_name = "Penelope"
app.get('/actorsCountPenelope', (req, res) => {
    // simple SELECT with COUNT
    connection.query('SELECT COUNT(*) FROM actor WHERE first_name = "Penelope"', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

// La clause DISTINCT permet de ne pas compter les doublons

// SQL = SELECT COUNT(DISINCT first_name) FROM actor
app.get('/actorsCountDistinct', (req, res) => {
    // simple SELECT with COUNT and DISTINCT
    connection.query('SELECT COUNT(DISTINCT first_name) FROM actor', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

// SQL = SELECT COUNT(DISINCT first_name) FROM actor WHERE first_name = "Penelope"  
app.get('/actorsCountDistinctPenelope', (req, res) => {
    //  simple SELECT with COUNT and DISTINCT and WHERE clause
    connection.query('SELECT COUNT(DISTINCT first_name) FROM actor WHERE first_name = "Penelope"', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});


// LIKE clause % = any number of characters _ = any single character

// SQL = SELECT last_name, first_name FROM actor WHERE last_name LIKE "W%"
app.get('/actorsLike', (req, res) => {
    // simple SELECT with LIKE clause 
    connection.query('SELECT last_name, first_name FROM actor WHERE last_name LIKE "W%"', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});


// ORDER BY clause  ASC = ascending order DESC = descending order 

// SQL = SELECT * FROM actor ORDER BY first_name ASC
app.get('/actorsOrder', (req, res) => {
    // simple SELECT with ORDER BY clause
    connection.query('SELECT * FROM actor ORDER BY first_name ASC', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});



// SQL = SELECT  actor_id, first_name, last_name FROM actor ORDER BY first_name ASC LIMIT 10
app.get('/actorsLimit', (req, res) => {
    // simple SELECT with LIMIT clause
    connection.query('SELECT  actor_id, first_name, last_name FROM actor ORDER BY first_name ASC LIMIT 10', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

// SQL = SELECT  actor_id, first_name, last_name FROM actor ORDER BY first_name ASC LIMIT 10 OFFSET 10
app.get('/actorsLimitOffset', (req, res) => {
    // simple SELECT with LIMIT and OFFSET clause
    connection.query('SELECT  actor_id, first_name, last_name FROM actor ORDER BY first_name ASC LIMIT 10 OFFSET 10', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});


// HAVING clause appliquent des conditions sur les groupes de resultats d'une requete crées par un GROUP BY alors que WHERE clause applique des conditions sur les lignes de resultats d'une requete sans GROUP BY.


// SQL = SELECT customer_id, SUM(amount) FROM payment GROUP BY customer_id HAVING SUM(amount) > 100
app.get('/paymentSum', (req, res) => {
    // simple SELECT with GROUP BY and HAVING clause
    connection.query('SELECT customer_id, SUM(amount) FROM payment GROUP BY customer_id HAVING SUM(amount) > 100', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

