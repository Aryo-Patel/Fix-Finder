const express = require('express');
const upload = require('express-fileupload');
const fs = require('fs');
const app = express();
const path = require('path');
app.use(upload());
app.use(express.json({ extended: false }));

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
    fs.unlinkSync('./client/public/content/' + imageName);
    return res.status(200);
})
app.post('/images', (req, res) => {
    if (req.files) {
        let file = req.files.file;
        let fileName = req.files.file.name;

        file.mv('./client/public/content/' + fileName, err => {
            if (err && err !== undefined) {
                console.log(err);
            }

        });


    }
    res.status(200).redirect('/');
});
function sortDir() {
    var dir = __dirname + '/client/public/content/'; // your directory

    var files = fs.readdirSync(dir);
    files.sort(function (a, b) {
        return fs.statSync(dir + a).mtime.getTime() -
            fs.statSync(dir + b).mtime.getTime();
    });
    return files.reverse();
}

app.use(express.static('client/build'));
app.use(express.static('client/public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
    //SET STATIC FOLDER
    app.use(express.static('client/build'));
    app.use(express.static('client/public'));

    app.get('*', (req, res, next) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('connected to port ' + PORT);
});