import React, { useState, useEffect } from 'react';
import path from 'path';
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
            {imageNames.map((imageName) => {
                let imgPath = '../../content/' + imageName;
                return (
                    <li key={i++}>
                        <img key={i++} src={require('../../content/' + imageName)} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Content;