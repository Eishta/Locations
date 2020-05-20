import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FacilityGrid from './facilityGrid'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2, 4, 3),
    margin: 'auto',
    width: '50%',
    boxShadow: theme.shadows[5],
    top: '50%',
    left: '50%',
    transform: 'translate(0%, 20%)'
  },
}));

export default function facilityTimes({setFacility, facility}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(facility);

  /**
   * Converts the seconds into time with format HH:mm
   * @param {*} sec 
   */
  const convertToFormat = (sec) => {
    let dateObj = new Date(sec * 1000);
    // moment(new Date(82800000)).utc().format("hh:mm a")
    return dateObj.getUTCHours().toString().padStart(2, '0')
      + ':' + dateObj.getUTCMinutes().toString().padStart(2, '0');
  }
  /**
   * Action called t open the Modal
   */
  const handleOpen = () => {
    setState(facility);
    setOpen(true);
  };
  /**
   * Action called to close the modal
   */
  const handleClose = () => {
    setOpen(false);
  };

/**
 * Action called on clicking "Apply to all checked" button
 * @param {*} row 
 */
  const handleChangeAll = (row) => {
    let { from, to } = state[row];
    let stateClone = JSON.parse(JSON.stringify(state));
    for (let day in stateClone) {
      if (stateClone[day].check) {
        stateClone[day].from = from;
        stateClone[day].to = to;
      }
    }
    setState(stateClone);
  }
  /**
   * Action called to handle the Checkbox changes
   * @param {*} event 
   * @param {*} row 
   */
  const handleChange = (event, row) => {
    setState({ ...state, [row]: { ...state[row], check: event.target.checked } });
  };
  /**
   * Action called to handle the changes in "from" field of each day
   * @param {*} event 
   * @param {*} row 
   */
  const handleChangeTimeFrom = (event, row) => {
    setState({ ...state, [row]: { ...state[row], from: convertToFormat(event) } })
  }
  /**
   * Action called to handle the changes in "to" field of each day
   * @param {*} event 
   * @param {*} row 
   */
  const handleChangeTimeTo = (event, row) => {
    setState({ ...state, [row]: { ...state[row], to: convertToFormat(event) } })
  }
  /**
   * Action called on clicking the "Save" button on "04. Location Timings" Page
   */
  const saveFacilityTimes =()=> {
    setFacility(state);
    handleClose();
  }
  return (

    <div className={classes.root}>
      <TextField
        id="standard-full-width"
        label="Facility Times"
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        disableBackdropClick={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <React.Fragment>
          <FacilityGrid handleChange={handleChange} handleClose={handleClose} state={state} classes={classes} saveFacilityTimes={saveFacilityTimes}
            handleChangeTimeTo={handleChangeTimeTo} handleChangeTimeFrom={handleChangeTimeFrom} handleChangeAll={handleChangeAll}/>
        </React.Fragment>
      </Modal>

    </div>

  );
}
