import React from 'react';
import { connect } from 'react-redux';

import { isSpinnerLoading } from 'store/common/spinner';

import './styles.scss';

const Spinner = ({isLoading}) => {
    return (
        <div className={'app-spinner'}>
            {
                isLoading ?
                    (
                        <div className='sk-overlay'>
                            <div className='sk-circle'>
                                <div className='sk-circle1 sk-child' />
                                <div className='sk-circle2 sk-child' />
                                <div className='sk-circle3 sk-child' />
                                <div className='sk-circle4 sk-child' />
                                <div className='sk-circle5 sk-child' />
                                <div className='sk-circle6 sk-child' />
                                <div className='sk-circle7 sk-child' />
                                <div className='sk-circle8 sk-child' />
                                <div className='sk-circle9 sk-child' />
                                <div className='sk-circle10 sk-child' />
                                <div className='sk-circle11 sk-child' />
                                <div className='sk-circle12 sk-child' />
                            </div>
                        </div>
                    )
                    : ''
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: isSpinnerLoading(state)
    };
};

const connectedSpinner = connect(mapStateToProps)(Spinner);
export default connectedSpinner;
