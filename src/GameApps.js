import React from 'react';
import './GameApps.css';

export default function GameApps(props) {
    return (
        <div className="game">
            <h2>{ props.App }</h2>
            <div className="rating">Rating: { props.Rating }</div>
            <div className="genre">Genre: { props.Genres }</div>
        </div>
    );
}