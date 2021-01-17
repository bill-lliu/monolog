import React from 'react'

import { Card } from '@material-ui/core';
import Icon from "@material-ui/core/Icon";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";


const Emotions = ({ emotions }) => {
    return (
        <div style={{ display: "grid", placeItems: "center" }}>
            <GridContainer>
                {emotions.map((emotion) => (
                    <GridItem xs={12} sm={6} md={3} style={{ backgroundColor: "white"}}>
                        <Card class="card" key={emotion['emotion']}>
                            <CardIcon color="danger">
                                <Icon><span role="img" aria-label="happy">😃</span></Icon>
                            </CardIcon>
                            <div class="card-body" style={{ display: "grid", placeItems: "center" }}>
                                <h5 class="card-title">{emotion['emotion']}</h5>
                                <h4 class="card-subtitle mb-2 text-muted">{parseFloat(emotion['value']).toFixed(6)}</h4>
                            </div>
                        </Card>
                    </GridItem>
                ))}
            </GridContainer>
        </div>

    )
};

export default Emotions;