import React from 'react'

const Emotions = ({ emotions }) => {
    return (
    <div>
        <center><h1>Emotions from FaceMesh</h1></center>
        {emotions.map((emotion) => (
            <div class="card" key={emotion['emotion']}>
                <div class="card-body">
                    <h5 class="card-title">{emotion['emotion']}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{emotion['value']}</h6>
                </div>
            </div>
        ))}
    </div>
    )
};

export default Emotions


