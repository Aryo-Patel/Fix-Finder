import React, { useState, useEffect } from 'react';

import axios from 'axios';
const Content = (props) => {
    const [imageNames, updateImageNames] = useState([]);

    useEffect(() => {
        async function getImages() {
            let images = await axios.get('/image-names');
            images = images.data;
            updateImageNames(images);
        }
        getImages();
    }, [])
    let i = 0;
    return (
        <ul>
            {imageNames.map((imageName) => (
                <li key={i++}>
                    <img key={i++} src={require('../../content/' + imageName)} />
                </li>
            ))}
        </ul>
    )
}

export default Content;