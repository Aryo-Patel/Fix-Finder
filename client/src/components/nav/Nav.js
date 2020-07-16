import React, { Fragment, useState } from 'react';

import Upload from './Upload';
const Nav = props => {
    const [showModal, updateModal] = useState(false);
    return (
        <Fragment>
            <Upload displayStatus={showModal} />
            <nav id="navbar">
                <div id="logo-wrapper">
                    <div id="img-container"></div>
                    <div id="logo-text">
                        <span id="fix" className="logo-span"
                        ><b>FIX<span id="finder" className="logo-span">FINDER</span></b></span
                        >
                        <small id="beta" className="logo-span">Beta</small>
                    </div>
                </div>
                <div id="links-wrapper">
                    <a className="link-item" target="_blank" rel="noopener noreferrer" href="https://fixfinder.com/" id="fixfinder">FixFinder</a>
                    <a className="link-item" target="_blank" rel="noopener noreferrer" href="https://roadmap.fixfinder.com/" id="roadmap">Road Map</a>
                    <a className="link-item" target="_blank" rel="noopener noreferrer" href="https://portal.fixfinder.com/login?redirect=%2Fhome">Portal</a>
                    <span className="link-item" id="admin" onClick={e => updateModal(!showModal)}>Admin Actions</span>
                </div>
            </nav>
        </Fragment>

    );
}


export default Nav;