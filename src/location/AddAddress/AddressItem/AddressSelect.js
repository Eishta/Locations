import React from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function AddressSelect(props) {
    const { xs, label, id, options, value , handleChange} = props;
    return (
        <Grid item xs={xs}>
            <TextField
                id={id}
                label={label}
                style={{ margin: 8 }}
                fullWidth
                select
                value={value}
                onChange={handleChange}
                margin="normal"
                SelectProps={{
                    native: true,
                }}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
              
            </TextField>
        </Grid>
    )
}

export default AddressSelect
