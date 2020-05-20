import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export class Errors extends Component {
    render() {
        const { errors, handleClose, classes } = this.props;
        return (
            <Paper className={classes.modal}  >
                {errors.map((error, index) => <p key ={index}>{error}</p>)}
                <Button variant="contained" color="secondary" style={{ margin: '5px' }} onClick={handleClose}>
                    Cancel
                            </Button>
            </Paper>
        )
    }
}

export default Errors
