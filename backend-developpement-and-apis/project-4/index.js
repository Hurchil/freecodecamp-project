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


app.post('/api/users', (req, res) => {
    const username = req.body.username;

    if(!username){
        res.json({error: "username is required"})
    }
    
    const user = new fc.User({username: username.trim()});
    
    user.save();
    
    res.json(user);

})

app.post('/api/users/:_id/exercises', (req, res) => {
    const id = req.params._id;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date;
    
    if(!description || !description.trim()){
        res.json({error: "Description is required!"});
        return;
        
    }

    if(!duration || !Number(duration)){
        res.json({error: "Duration is Incorrect !"});
        return;
    }

    getUser(id, (err, data) => {
        if(err){
            res.json({error: "Incorrect ID !"});
            return;
        }
        else if(data){
            const exercice = new fc.Exercice({
                userid: data._id,
                duration: Number(duration),
                description: description,
                date: is_valid_date(date) ? new Date(date) : new Date()
            })
            exercice.save();

            res.json({
                _id: data._id,
                username: data.username,
                duration: exercice.duration,
                description: exercice.description,
                date: exercice.date.toDateString()
            })
        }
        else{
            res.json({error: "User not found !"});
            return;
        }
    })
    

});


app.get('/api/users/:_id/logs', (req, res) => {
    const { from, to, limit } = req.query;
    const id = req.params._id;
    let user = null;

    getUser(id, (err, data) => {
        if(err){
            res.json({error: "Incorrect ID"})
            console.error(err);
            return;
        }
        user = data;
    })

    getExercice(id, (err, data) => {
        if(err){
            res.json({error: "Internal error !"});
            console.error(err);
            return;
        }
        else if(data.length === 0){
            res.json({error: "No exercises found !"});
            return;
        }
        else{
            
            let filterData = data;


            if(from && is_valid_date(from)){
                const from_Date = new Date(from);
                filterData = filterData.filter(elt => elt.date >= from_Date);
            }

            if(to && is_valid_date(to)){
                const to_Date = new Date(to);
                filterData = filterData.filter(elt => elt.date <= to_Date);
            }

            if(limit && !isNaN(Number(limit))){
                filterData = filterData.slice(0 , Number(limit));
            }
            

            filterData = filterData.map(elt => {
                return {
                    description: elt.description,
                    duration: elt.duration,
                    date: elt.date.toDateString()
                };
            });
            console.log(id);
            res.json({
                _id: user._id,
                username: user.username,
                count: filterData.length,
                log: filterData
            })

        }
    })
    

})

app.get('/api/users', (req, res) => {

    fc.User.find({}).then(users => {
        res.send(users);
        return;
    })
})


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
    if(!/^\d{4}-\d{2}-\d{2}$/.test(str)){
        return false;
    }
    else if(new Date(str).toString() === 'Invalid Date'){
        return false;
    }
    return true;
}













//----------------------------------------------


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
