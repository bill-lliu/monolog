import React from 'react'

const Emotions = ({ emotions }) => {
    return (
    <div>
        <center><h1>Emotions from FaceMesh</h1></center>
        {emotions.map((emotion) => (
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">{emotion.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{emotion.email}</h6>
            <p class="card-text">{emotion.company.catchPhrase}</p>
            </div>
        </div>
        ))}
    </div>
    )
};

export default Emotions


