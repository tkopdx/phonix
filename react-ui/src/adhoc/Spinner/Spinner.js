import React from 'react';
import { SyncLoader } from 'react-spinners';

import './Spinner.css';
 
const Spinner = (props) => {
 
    return (
    <div className="loader">
        <SyncLoader
            size={15}
            loading={props.loading}
        />
    </div>
  )
};

export default Spinner;