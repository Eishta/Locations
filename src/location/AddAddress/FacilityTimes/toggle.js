import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TimePicker from 'react-bootstrap-time-picker';
import './toggle.css'

export default function Toggle({value, onChange}) {
  const [meridiem, setMeridiem] = React.useState('AM');
  const handleMeridiem = (event, newMeridiem) => {
    event.persist()
    setMeridiem(newMeridiem);
  };

  return (
    <div>
      <TimePicker start="00:00" end="23:59" style={{ marginRight: '2px' }} step={30} format={24} onChange={onChange} value={value} />
      <ToggleButtonGroup
        size="small"
        value={meridiem}
        exclusive
        onChange={handleMeridiem}
        aria-label="text alignment"
      >
        <ToggleButton style={{ margin: '2px', padding: '1px', fontSize: '8px', fontWeight: 'bold', }} value="AM" >
          AM
          </ToggleButton>
        <ToggleButton style={{ margin: '2px', padding: '1px', fontSize: '8px', fontWeight: 'bold', }} value="PM" >
          PM
          </ToggleButton>

      </ToggleButtonGroup>

    </div>
  );
}
