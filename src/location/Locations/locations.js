import React, { useEffect } from 'react';
import { Service } from '../service/DexieService';
import NoLocation from './LocationPage/noLocation';
import LocationList from './LocationPage/locationList'


export default function location() {
  const [state, setState] = React.useState({ locations: [] });
 
  useEffect(() => {
    getList();
  }, [])

  /**
   * Function that does the get request on the table
   */
  const getList =()=> {
    Service.getAll().then(locations => {
      let list = locations.map(loc => {
        return {
          id: loc.id,
          location: loc.location,
          address: loc.address? concatAdd(loc.address): '',
          phone: loc.phone
        }
      })
      setState({ locations: list })
    });
  }

  /**
   * Function to concatinate the fields entered in the "03. Add Location"
   * @param {*} address 
   */
  const concatAdd = (address) => {
    return Object.values(address).filter(Boolean).join(', ')
  }

  /**
   * Function called to delete a location
   * @param {*} id 
   */
  const deleteLoc = (id) => {
    Service.delete(id).then(() => {
      const newList = state.locations.filter((location) => location.id !== id);
      setState({ locations: newList });
    })
  }

  return (
    <React.Fragment>
    {state.locations.length !== 0
    ? <LocationList setState={setState} state={state} deleteLoc={deleteLoc}/> 
    : <NoLocation/> }
    </React.Fragment>
  );
}
