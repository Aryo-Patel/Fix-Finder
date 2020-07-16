const express = require('express');
const upload = require('express-fileupload');
const fs = require('fs');
const app = express();

app.use(upload());
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;
/*
var dir = './'; // your directory

var files = fs.readdirSync(dir);
files.sort(function(a, b) {
               return fs.statSync(dir + a).mtime.getTime() - 
                      fs.statSync(dir + b).mtime.getTime();
           });
*/
app.get('/image-names', (req, res) => {
    let sorted = sortDir();
    // let images = fs.readdirSync('./client/src/content');
    // //console.log(sorted);
    return res.status(200).json(sorted);
});
app.get('/login/:id', (req, res) => {
    let password = req.params.id;
    if (password === 'adminAccess') {
        return res.status(200).json(true);
    }
    else {
        return res.status(200).json(false);
    }
})
app.post('/imagesDel', (req, res) => {
    let imageName = req.body.imageName;
    fs.unlinkSync('./client/src/content/' + imageName);
    return res.status(200);
})
app.post('/images', (req, res) => {
    if (req.files) {
        let file = req.files.file;
        let fileName = req.files.file.name;

        file.mv('./client/src/content/' + fileName, err => {
            if (err && err !== undefined) {
                console.log(err);
            }

        });


    }
    res.status(200).redirect('/');
});
function sortDir() {
    var dir = __dirname + '/client/src/content/'; // your directory

    var files = fs.readdirSync(dir);
    files.sort(function (a, b) {
        return fs.statSync(dir + a).mtime.getTime() -
            fs.statSync(dir + b).mtime.getTime();
    });
    return files.reverse();
}

app.listen(PORT, () => {
    console.log('connected to port ' + PORT);
});