import React from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';


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


AddressSelect.propTypes = {
    xs: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
  };
  
export default AddressSelect
