// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Página de login
app.get('/', (req, res) => {
    res.render('login.html');
});

// Manejo de formulario de login
app.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        const response = await axios.post('https://api-books-tibd.onrender.com/auth/login', {
            email: email,
            contraseña: contraseña
        });

        if (response.data.success) {
            res.render('success.html', { message: response.data.message });
        } else {
            res.render('login.html', { error: 'Invalid credentials, try again.' });
        }
    } catch (error) {
        res.render('login.html', { error: 'Invalid credentials, try again.' });
    }
});

app.listen(5000, () => {
    console.log('Client is running on http://localhost:5000');
});

