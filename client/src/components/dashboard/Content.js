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
    let imageExtensions = ['JPEG', 'JPG', 'PNG', 'GIF', 'TIFF', 'PSD', 'PDF', 'AI', 'EPS'];
    let baseRoute = 'https://fix-finder-file-container.s3.amazonaws.com/';
    return (
        <ul>
            {imageNames.map((imageName) => {
                console.log(baseRoute + imageName);
                if (imageExtensions.indexOf(imageName.substring(imageName.length - 3)) !== -1) {
                    return (
                        <li key={i++}>
                            <img key={i++} src={baseRoute + imageName} />
                        </li>
                    )
                }
                else {
                    return (
                        <li key={i++}>
                            <video key={i++} width="320px" height="240px" controls>
                                <source src={baseRoute + imageName} type="video/mp4" />
                                <source src={baseRoute + imageName} type="video/ogg" />
                                <source src={baseRoute + imageName} type="video/webm" />
                            </video>
                        </li>
                    )
                }

            })}
        </ul>
    )
}

export default Content;