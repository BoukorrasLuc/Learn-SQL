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
    // simple SELECT with COUNT and WHERE clause
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

// SQL = SELECT customer_id, rental_id, rental_date FROM rental WHERE rental_date BETWEEN "2005-05-25" AND "2005-05-28"
app.get('/rentalsBetween', (req, res) => {
    // simple SELECT with WHERE clause and BETWEEN clause
    connection.query('SELECT customer_id, rental_id, rental_date FROM rental WHERE rental_date BETWEEN "2005-05-25" AND "2005-05-28"', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});


// SQL = SELECT customer_id, rental_id, rental_date FROM rental WHERE customer_id IN (1, 2, 3)
app.get('/rentalsIn', (req, res) => {
    // simple SELECT with WHERE clause and IN clause
    connection.query('SELECT customer_id, rental_id, rental_date FROM rental WHERE customer_id IN (1, 2, 3)', (err, results) => {
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
    // simple SELECT with WHERE clause and LIKE clause
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
    // simple SELECT with LIMIT clause and ORDER BY clause
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


// INNER JOIN  permets de lier plusieurs tables entre elles, retourne les enregistrements lorsqu'il y a au moins une ligne de chaque colonne qui correspond aux conditions de jointure.

// SELECT column_name(s) FROM table1 INNER JOIN table2 ON table1.column_name = table2.column_name;

// SQL = SELECT customer.customer_id, first_name, last_name, email, payment_date FROM customer INNER JOIN payment ON customer.customer_id = payment.customer_id

app.get('/innerJoin', (req, res) => {
    // simple SELECT with INNER JOIN
    connection.query('SELECT customer.customer_id, first_name, last_name, email, payment_date FROM customer INNER JOIN payment ON customer.customer_id = payment.customer_id', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

// Right JOIN  retourne tous les enregistrements de la table de droite (table2), meme si il n'y a pas de correspondance dans la table de gauche (table1).

// SELECT column_name(s) FROM table1 RIGHT JOIN table2 ON table1.column_name = table2.column_name;

// SQL = SELECT c.customer_id, c.first_name, c.last_name, p.payment_id, p.amount FROM customer c RIGHT JOIN payment p ON c.customer_id = p.customer_id

app.get('/rightJoin', (req, res) => {
    // simple SELECT with RIGHT JOIN
    connection.query('SELECT c.customer_id, c.first_name, c.last_name, p.payment_id, p.amount FROM customer c RIGHT JOIN payment p ON c.customer_id = p.customer_id', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});