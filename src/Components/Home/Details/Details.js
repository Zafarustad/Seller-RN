import React from 'react';
import {connect} from 'react-redux';
import GoogleMap from './GoogleMap';
import ShopDetails from './ShopDetails';

const Details = ({auth}) => {
  const {
    userData: {detailsCompleted},
  } = auth;

  return detailsCompleted === 0 ? (
    <ShopDetails />
  ) : detailsCompleted === 1 ? (
    <GoogleMap />
  ) : null;
};

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps, null)(Details);
