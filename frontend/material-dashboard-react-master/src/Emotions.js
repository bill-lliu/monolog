import React from 'react'

import { Card } from '@material-ui/core';
import Icon from "@material-ui/core/Icon";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import CardIcon from "components/Card/CardIcon.js";

const Emotions = ({ emotions }) => {
    return (
        <GridContainer>
            {emotions.map((emotion) => (
                <GridItem xs={12} sm={6} md={3} style={{ marginTop: "15px", marginBottom: "15px"}}>
                    <Card className="card" key={emotion['emotion']}>
                        <div className="card-body" style={{ display: "grid", placeItems: "center" }}>
                            <h5 className="card-title">{emotion['emotion']}</h5>
                            <h4 className="card-subtitle mb-2 text-muted">{parseFloat(emotion['value']).toFixed(6)}</h4>
                        </div>
                    </Card>
                </GridItem>
            ))}
            <GridItem xs={12} sm={6} md={3} style={{ marginTop: "15px", marginBottom: "15px"}}>
                    <Card className="card" key={WPM['WPM']}>
                        <div className="card-body" style={{ display: "grid", placeItems: "center" }}>
                            <h5 className="card-title">{WPM['WPM']}</h5>
                            <h4 className="card-subtitle mb-2 text-muted">{parseFloat(WPM['WPM']).toFixed(3)}</h4>
                        </div>
                    </Card>
                </GridItem>
        </GridContainer>
    )
};

export default Emotions;