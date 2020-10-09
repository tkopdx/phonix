import React from 'react';
import { SyncLoader } from 'react-spinners';

import './Spinner.css';
 
const Spinner = (props) => {
 
    return (
    <div className="loader">
        <SyncLoader
            size={20}
            loading={props.loading}
        />
    </div>
  )
};

export default Spinner;