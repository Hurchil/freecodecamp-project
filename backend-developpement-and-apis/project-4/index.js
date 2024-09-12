const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});


//----------------------------------------------

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fc = require('./database')

const LIB = {
    "users": [],
    "exercices": []
}

fc.DBConnect()

app.use((req, res, next) => {
    console.log(`REQUETE\nURL: ${req.url}\nBODY: ${JSON.stringify(req.body)}\nQUERY: ${JSON.stringify(req.query)}\n\n`);
    next();
})

app.post('/api/users', (req, res) => {
    const username = req.body.username;

    if(!username){
        res.json({error: "username is required"})
    }
    
    const user = new fc.User({username: username.trim()});
    
    user.save();
    
    res.json(user);

})

app.post('/api/users/:_id/exercises', async (req, res) => {
    const id = req.params._id;
    const { description, duration, date } = req.body; // Utilisation de la destructuration

    if (!description || !description.trim()) {
        return res.status(400).json({ error: "Description is required!" });
    }

    if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
        return res.status(400).json({ error: "Duration must be a positive number!" });
    }

    try {
        const user = await fc.User.findById(id);
        if (!user) {
            return res.sendFile(__dirname + "/views/error.html");
        }

        const exercice = new fc.Exercice({
            userid: user._id,
            description: description.trim(),
            duration: Number(duration),
            date: is_valid_date(date) ? new Date(date) : new Date()
        });

        await exercice.save();

        res.json({
            _id: user._id,
            username: user.username,
            description: exercice.description,
            duration: exercice.duration,
            date: exercice.date.toDateString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});

app.get('/api/users/:_id/logs', async (req, res) => {
    const { from, to, limit } = req.query;
    const id = req.params._id;

    try {
        const user = await fc.User.findById(id);
        if (!user) {
            return res.sendFile(__dirname + "/views/error.html");
            return res.json({ error: "User not found!" });
        }

        let exercises = await fc.Exercice.find({ userid: id });

        if (exercises.length === 0) {
            return res.sendFile(__dirname + "/views/error.html");
            return res.json({ error: "No exercises found!" });
        }

        // Filtrage par date
        if (from && is_valid_date(from)) {
            const fromDate = new Date(from);
            exercises = exercises.filter(ex => ex.date >= fromDate);
        }

        if (to && is_valid_date(to)) {
            const toDate = new Date(to);
            exercises = exercises.filter(ex => ex.date <= toDate);
        }

        // Limitation du nombre d'exercices
        if (limit && !isNaN(Number(limit))) {
            exercises = exercises.slice(0, Number(limit));
        }

        const logs = exercises.map(ex => ({
            description: ex.description,
            duration: ex.duration,
            date: ex.date.toDateString(),
        }));

        res.json({
            _id: user._id,
            username: user.username,
            count: logs.length,
            log: logs
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await fc.User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});

const getUser = (id, done) => {
    fc.User.findById(id)
    .then(result => done(null, result))
    .catch(err => done(err));
}

const getExercice = (id, done) => {
    fc.Exercice.find({userid: id})
    .then(results => done(null, results))
    .catch(err => done(err))
}

const is_valid_date = (str) => {
    const date = new Date(str);
    return !isNaN(date.getTime());  // Retourne true si la date est valide
};













//----------------------------------------------


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
