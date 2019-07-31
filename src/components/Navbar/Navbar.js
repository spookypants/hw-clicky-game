import React from 'react';
import './Navbar.css';

const Navbar = props => (
    <div className="navbar">
        <div>MIND/MULDER</div>
        <div className={props.navMsg}>{props.navMessage}</div>
        <div>
            Score: {props.score} <span className="pipe">|</span> High Score: {props.highScore}
        </div>
    </div>
);

export default Navbar;