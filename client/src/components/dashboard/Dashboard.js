import React from 'react';
import Content from './Content';

import axios from 'axios';

const Dashboard = props => {
    axios.get('/');
    return (
        <main id="body">
            <div id="content-wrapper">
                <div id="welcome">
                    <h1>Welcome to FixFinder Beta</h1>
                    <p>Updates about the project and important release info below</p>
                </div>
                <div id="imgs">
                    <h1>Check out these helpful resources!</h1>
                    <Content />
                </div>
            </div>
        </main>
    )
}

export default Dashboard;