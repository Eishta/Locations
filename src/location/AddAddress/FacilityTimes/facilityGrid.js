import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Toggle from './toggle'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './toggle.css'

export default class FacilityGrid extends React.Component {
    
    days=['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];

    render() {
        const { handleChange, handleClose,handleChangeTimeFrom, handleChangeTimeTo, handleChangeAll,state, classes , saveFacilityTimes} = this.props;
        let gridRow = this.days.map(row => {
            return (
                <React.Fragment key={row}>
                    <Grid item xs={3} sm={2} >
                        <FormControlLabel
                            control={<Checkbox checked={state[row].check} onChange={(e)=> handleChange(e,row)} style={{ fontSize: '12px', padding: '2px', margin: '1px' }} name="check" />}
                            label={<span style={{ fontSize: '12px', padding: '2px', margin: '1px' }}>{row}</span>}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} >
                        <Toggle value={state[row].from} name="from" onChange={(e)=> handleChangeTimeFrom(e, row)}/>
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <Toggle value={state[row].to} name="to" onChange={(e)=> handleChangeTimeTo(e, row)} />
                    </Grid>
                    <Grid item xs={3} sm={3} style={{ textAlignLast: 'end' }}>
                        <Button variant="outlined" style={{ fontSize: '8px', fontWeight: 'bold', padding: '2px', margin: '1px' }} color="primary" onClick={() => handleChangeAll(row)}>Apply to All Checked</Button>
                    </Grid>
                </React.Fragment>

            )
        })

        return (
            <Paper className={classes.paper}  >

                <Grid container spacing={2}>
                    <Grid item xs={12}> Facility times</Grid>
                    {gridRow}
                    <Grid item xs={12} style={{ textAlignLast: 'end' }}>
                        <Button variant="contained" color="secondary" style={{ margin: '5px' }} onClick={handleClose}>
                            Cancel
                    </Button>
                        <Button variant="contained" color="primary" onClick={saveFacilityTimes}>
                            Save
                    </Button>
                    </Grid>

                </Grid>
            </Paper>

        );
    }
}
