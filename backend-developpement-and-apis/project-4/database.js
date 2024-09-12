const mongoose = require('mongoose');
require("dotenv").config();

async function DBConnect(){
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log("Connexion DB Réussie !");
    }

    catch(err){
        console.error("Une erreur s'est produite !\n", err.message);
        process.exit(1);
    }
}

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
        
    }
});

const ExerciceSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
    }
}
)

module.exports = {
    DBConnect,
    User: new mongoose.model("user", UserSchema),
    Exercice: new mongoose.model("exercice", ExerciceSchema)
}