var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});


// ----------------------------------------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

const uploads_path = path.join(__dirname, 'uploads')

fs.access(__dirname + '/uploads', fs.constants.F_OK, (err) => {
	if(err){
		fs.mkdir(uploads_path,{recursive: true}, (err) => {
			if(err){
				console.error("Le repertoire d'uploads n'a pas pu être créer");
			}
		})
	}
})

const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb){
		cb(null, __dirname + "/uploads");
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname)
	}
});

const upload = multer({ storage: storage});


app.post('/api/fileanalyse', upload.single('upfile') ,(req, res) => {

	if(!req.file){
		return res.json({error: "File not found"});
	}

	console.log(req.file);
	res.send({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size
	});
});



// ----------------------------------------------------------------------------------------------------------


const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Your app is listening on port ' + port)
});
