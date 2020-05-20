import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

function AddressField(props) {

    const { xs, label, id, defaultValue, inputProps, handleChange, required, value } = props;

    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    /**
     * Action to verify the "Zip Code" contains only numbers and letters
     * @param {*} value 
     */
    const checkAlphanumeric = (value) => {
        var letters = /^[0-9a-zA-Z]+$/;
        return value.match(letters);
    }

    /**
     * Action to convert the Phone number entered to US format
     * @param {*} entry 
     */
    function formatUSNumber(entry = '') {
        const match = entry
            .replace(/\D+/g, '').replace(/^1/, '')
            .match(/([^\d]*\d[^\d]*){1,10}$/)[0]
        const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match
        const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : ''
        const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : ''
        return `${part1}${part2}${part3}`
    }

    /**
     * Action called on event "onChange"
     */
    const onValidate = (e) => {
        switch (e.target.name) {
            case 'zip': {
                if (!checkAlphanumeric(e.target.value)) {
                    setError(true);
                    setHelperText('Only letters and numbers allowed');
                }
                else {
                    handleChange(e);
                }
                break;
            }
            case 'phone': {
                if (isNaN(e.target.value)) {
                    setError(true);
                    setHelperText('Only numbers allowed');
                    break;
                }
                else {
                    return handleChange(e, formatUSNumber(e.target.value.toString()));
                }
            }

            default: {
                setError(false);
                setHelperText('');
                handleChange(e);
            }
        }
    }
    return (
        <Grid item xs={xs}>
            <TextField
                id={id}
                label={label}
                style={{ margin: 8 }}
                fullWidth
                name={id}
                value={value}
                inputProps={inputProps}
                defaultValue={defaultValue}
                margin="normal"
                error={error}
                required={required}
                helperText={helperText}
                onChange={onValidate}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Grid>
    )
}

AddressField.propTypes = {
    xs: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
  };
  
  
export default AddressField
