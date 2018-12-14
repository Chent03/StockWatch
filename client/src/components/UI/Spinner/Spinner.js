import React from 'react';

import './Spinner.scss';

const Spinner = () => {
    return (
        <div class="spinner">
            <div class="spinner-circle spinner-circle-outer"></div>
            <div class="spinner-circle-off spinner-circle-inner"></div>
            <div class="spinner-circle spinner-circle-single-1"></div>
            <div class="spinner-circle spinner-circle-single-2"></div>
            <div class="text">...Loading...</div>
        </div>
    )
}

export default Spinner;