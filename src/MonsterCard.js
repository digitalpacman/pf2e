import React from 'react';
import {
    Link as BrowserLink
} from "react-router-dom";

import Card  from '@material-ui/core/Card';
import CardHeader  from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


export const MonsterCard = ({monster: monster}) => {

    const useStyles = makeStyles((theme) => ({
        card: {
            margin: '2rem',
            minWidth: '400px'
        },
        actionArea: {
            maxWidth: '400px'
        },
        traitsSection: {
            marginTop: '40px'
        },
        traitChip: {
            margin: '3px'
        }
      }));
    
      const classes = useStyles();
      debugger

    return (
        <Card className={classes.card}>
        <CardActionArea className={classes.actionArea}>
        <CardContent>
            <div className='flex-spread'>
            <Typography gutterBottom variant="h6" component="h2">
                {monster.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
                {monster.level}
            </Typography>
            </div>
            <div className={classes.traitsSection}>
                {monster.traits.map(trait => <Chip key={monster.name + trait} className={classes.traitChip} label={trait}></Chip>)}
            </div>
        </CardContent>
        </CardActionArea>        
    </Card>
    );
}