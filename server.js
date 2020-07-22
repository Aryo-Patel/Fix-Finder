const express = require('express');
const upload = require('express-fileupload');
const fs = require('fs');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(upload());
app.use(cors());
app.use(express.json({ extended: false }));

const AWS = require('aws-sdk');
const ID = 'AKIAIMFG6WL5XWKEBL5Q';
const SECRET = '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';
const BUCKET_NAME = 'fix-finder-file-container';
let baseRoute = 'https://fix-finder-file-container.s3.amazonaws.com/';

async function getBucketItems(SECRET, ID, BUCKET_NAME) {
    try {
        AWS.config.setPromisesDependency();
        AWS.config.update({
            accessKeyId: ID,
            secretAccessKey: SECRET,
            region: 'us-east-1'
        });
        const s3 = new AWS.S3;

        const response = await s3.listObjectsV2({
            Bucket: BUCKET_NAME
        }).promise().then();

        //console.log(response.Contents);
        let infoArray = response.Contents;
        infoArray.sort((a, b) => {
            let firstDate = a.LastModified;
            let firstUnixTime = new Date(firstDate).getTime();

            let secondDate = b.LastModified;
            let secondUnixTime = new Date(secondDate).getTime();

            return secondUnixTime - firstUnixTime;
        });

        return infoArray;
    } catch (err) {
        console.error(err);
    }
}
app.get('/image-names', async (req, res) => {
    let itemArray = await getBucketItems(SECRET, ID, BUCKET_NAME);
    itemArray = itemArray.map(item => item.Key);
    return res.status(200).json(itemArray);
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
app.post('/imagesDel', async (req, res) => {
    let imageName = req.body.imageName;
    try {
        AWS.config.setPromisesDependency();
        AWS.config.update({
            accessKeyId: ID,
            secretAccessKey: SECRET,
            region: 'us-east-1'
        });

        let s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
        const params = {
            Bucket: BUCKET_NAME,
            Key: imageName
        };

        const response = await s3.deleteObject(params).promise().then();
        console.log(`${imageName} has been successfully deleted`);
    } catch (err) {
        console.error(err);
    }

    return res.status(200);
})
app.post('/images', (req, res) => {
    if (req.files) {
        let file = req.files.file;
        let fileName = req.files.file.name;

        let s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });

        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: file.data
        }
        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(`File successfuly uploaded to ${data.Location}`);
        })
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