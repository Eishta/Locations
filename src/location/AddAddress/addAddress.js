import React, { useState, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FacilityTimes from './FacilityTimes/facilityTimes';
import { Link } from 'react-router-dom';
import AddressField from './AddressItem/AddressField'
import AddressSelect from './AddressItem/AddressSelect'
import Chip from '@material-ui/core/Chip';
import { Service } from '../service/DexieService';
import { timeZone, states } from './data/state'
import Modal from '@material-ui/core/Modal';
import Errors from './Errors/errors'

/**
 * Styles Setting
 */
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    modal: {
        padding: theme.spacing(2, 4, 3),
        margin: 'auto',
        width: '50%',
        boxShadow: theme.shadows[5],
        top: '50%',
        left: '50%',
        transform: 'translate(0%, 20%)'
    }
}));

/**
 * 03. Add Location
 */
export default function AddAddress({ history, match }) {
    const classes = useStyles();
    const [tags, setTags] = useState([])
    const [loc, setLoc] = useState('')
    const [phone, setPhone] = useState('');
    const [facility, setFacility] = useState({
        sun: { check: false, from: '', to: '' },
        mon: { check: false, from: '', to: '' },
        tues: { check: false, from: '', to: '' },
        wed: { check: false, from: '', to: '' },
        thurs: { check: false, from: '', to: '' },
        fri: { check: false, from: '', to: '' },
        sat: { check: false, from: '', to: '' },
    });
    const [aptPool, setAptPool] = useState('');
    const [address, setAddress] = useState({
        add1: '',
        suite: '',
        add2: '',
        city: '',
        state: '',
        zip: '',
        tZone: ''
    });
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    useLayoutEffect(() => {
        if (match.params.id) {
            Service.get(+match.params.id).then((location) => {
                setLoc(location.location);
                setPhone(location.phone ? location.phone : '')
                setAddress(location.address ? location.address : {});
                setFacility(location.facility ? location.facility : {});
                setAptPool(location.aptPool ? location.aptPool : '');
                setTags(location.aptPool.split(','))
            })
        }
    }, []);
    /**
     * Handle the changes in the Address
     * @param {*} event 
     */
    const handleChange = (event) => {
        setAddress({ ...address, [event.target.id]: event.target.value });
    };
    /**
     * Handle the changes in the Appointment Pool
     * @param {*} event 
     */
    const handleChangeApt = (event) => {
        setTags(event.target.value.split(','));
        setAptPool(event.target.value)
    };
    /**
     * Handle the changes in the Location
     * @param {*} event 
     */
    const handleChangeLoc = (event) => {
        setLoc(event.target.value)
    };
    /**
     * Handle the changes in the Phone number
     * @param {*} event 
     */
    const handleChangePhone = (event, value) => {
        setPhone(value)
    };
    /**
     * Validates the form before submitting
     */
    const validate = () => {
        let errorsClone = [...errors]
        if (loc.length === 0) {
            errorsClone.push("Name can't be empty");
            setErrors(errorsClone)
        }
        return !(errorsClone.length === 0);
    }
    /**
     * handle the action of closing the modal
     */
    const handleClose = () => {
        setOpen(false);
        setErrors([]);
    }
    /**
     * Action called on submitting the form
     */
    const submit = () => {
        if (validate()) {
            setOpen(true);
        }
        else {
            if (match.params.id) {
                editLocation();
            }
            else {
                Service.put({ location: loc, address, phone, facility, aptPool }).then((id) => {
                    history.push('/')
                })
            }
        }

    }
    /**
     * Action called on Submitting the Form when Editing
     */
    const editLocation = () => {
        Service.update(+match.params.id, { location: loc, address, phone: phone, facility: facility, aptPool: aptPool }).then((id) => {
            history.push('/')
        })
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div style={{ display: 'flex' }}>  Add Locations
                    {tags.map(el => {
                        return <Chip key={el} label={el} />
                    })}
                </div>
                <Grid container spacing={3} className={classes.paper}>
                    <AddressField xs={12} id="location" label="Location Name" value={loc} required={true} handleChange={handleChangeLoc} />
                    <AddressField xs={6} id="add1" label="Address Line 1" value={address.add1} handleChange={handleChange} />
                    <AddressField xs={6} id="suite" label="Suite no." value={address.suite} handleChange={handleChange} />
                    <AddressField xs={6} id="add2" label="Address Line 2" value={address.add2} handleChange={handleChange} />
                    <AddressField xs={3} id="city" label="City" value={address.city} handleChange={handleChange} />
                    <AddressSelect xs={3} label="State" id="state" options={states} value={address.state} handleChange={handleChange} />
                    <AddressField xs={3} id="zip" label="Zip Code" value={address.zip} inputProps={{ minLength: 5, maxLength: 10 }} handleChange={handleChange} />
                    <AddressField xs={3} id="phone" label="Phone no." value={phone} inputProps={{ maxLength: 14 }} handleChange={handleChangePhone} />
                    <AddressSelect xs={6} label="Time Zone" id="tZone" value={address.tZone} options={timeZone} handleChange={handleChange} />
                    <Grid item xs={6}>
                        <FacilityTimes setFacility={setFacility} facility={facility} />
                    </Grid>
                    <AddressField xs={6} id="aptPool" label="Appointment Pool" value={aptPool} handleChange={handleChangeApt} />
                    <Grid item xs={12} style={{ textAlignLast: 'end' }}>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary" style={{ margin: '5px' }}>
                                Cancel
                            </Button>
                        </Link>
                        <Button variant="contained" color="primary" onClick={submit}>
                            {match.params.id ? 'Update' : 'Save'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Modal
                open={open}
                disableBackdropClick={true}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <React.Fragment>
                    <Errors errors={errors} handleClose={handleClose} classes={classes} />
                </React.Fragment>
            </Modal>
        </div>
    );
}

