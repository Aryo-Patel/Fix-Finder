import React, { useState, useEffect } from 'react';


import axios from 'axios';
const Upload = props => {
    const [imageNames, updateImageNames] = useState([]);

    useEffect(() => {
        async function getImages() {
            let images = await axios.get('/image-names');
            images = images.data;
            updateImageNames(images);
        }
        getImages();
    }, []);

    let displayText;

    const [loggedIn, changeStatus] = useState(false);
    props.displayStatus ? displayText = 'block' : displayText = 'none';


    async function checkSubmit() {
        let passwd = document.getElementById('password').value;

        if (passwd) {
            let success;
            try {
                success = await axios.get('/login/' + passwd);
                success = success.data;
            } catch (err) {
                console.log(err);
            }

            if (success) {
                changeStatus(true);
            }
            else {
                alert('Invalid credentials');
            }
        }
    }
    function removeImage(e) {
        let fileName = e.target.textContent;
        e.target.classList.add('strike');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = {
            imageName: fileName
        }
        console.log(body);
        axios.post('/imagesDel', body, config);
    }
    return (
        <div id="modal-div" className={displayText}>
            <div id="content">

                {loggedIn ? (
                    <div id="upload-content">
                        <div id="upload-file" className="upload-child">
                            <h1>Upload a file</h1>
                            <form method="POST" action="/images" encType="multipart/form-data">
                                <input type="file" name="file" />
                                <input type="submit" value="upload" />
                            </form>
                        </div>
                        <div id="delete-file" className="upload-child">
                            <h1>Delete an uploaded file</h1>
                            <div id="image-names">
                                {imageNames.map((image, index) => (
                                    <span key={index++} onClick={e => removeImage(e)}>{image}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) :
                    (
                        <div id="text-content">
                            <h1>Login</h1>
                            <div id="login">
                                <div id="login-formatter">
                                    <input id="password" type="password" required />
                                    <small>Password</small>
                                </div>
                                <button id="check-password" onClick={async (e) => await checkSubmit()}>Submit</button>
                            </div>
                        </div>

                    )}

            </div>
        </div>
    )
}

export default Upload;