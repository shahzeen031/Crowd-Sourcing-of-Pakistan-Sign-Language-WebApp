import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import { DashboardAction } from './DashboardAction';
import Uploads from './Uploads';
import Review from './Review';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, hasProfile, loading },
}) => {
  const [displayuserpost, toggleDUP] = useState(true);
  const [displayuserreview, toggleDUR] = useState(false);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);



  return loading && profile == null ? (
    <h3 >loading...</h3>
  ) : (
    <Fragment>
      {(!profile && !hasProfile) && <Redirect to='/Createprofile' />}
      {user && profile && <div className='dashboard'>
        <div className='profile-header'>
          <div className='profile-img'>
            <img src={user.avatar} alt='image 1/' width='200' />
          </div>
          <div className='profile-nav-info'>
            <h3 className='user-name'> {user.name}</h3>
            <div className='address'>
              <p className='state'>
                {' '}
                {profile.status},
                <span className='country'> {profile.location}</span>
              </p>
            </div>
          </div>
          <div className='profile-option'>
            <div className='notification'>
              <i className='fa fa-bell'></i>
              <span className='alert-message'>1</span>
            </div>
          </div>
        </div>
        <div className='main-bd'>
          <div className='left-side'>
            <div className='profile-side'>
              <p className='mobile-no'>
                <i className='fa fa-phone'> +9328937209320</i>
              </p>
              <p className='user-email'>
                <i className='fa fa-envelope'> {user.email}</i>
              </p>
              <div className='user-bio'>
                <h3>Bio</h3>
                <p className='bio'>{profile.bio}</p>
              </div>

              <div>
                <Link to='/edit-profile'>
                  <button className='createbtn'>
                    <i className='fas fa-user-circle'></i> Edit Profile
                  </button>
                </Link>
              </div>
              <div>
                <Link to='/upload'>
                  <button className='chatbtn'>
                    <i className='fas fa-upload'></i> Upload Gesture
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className='right-side'>
            <div className='navi'>
              <ul>
                <li
                  onClick={() => {
                    if (user.type === 'reviewer') {
                      toggleDUP(!displayuserpost);
                      toggleDUR(!displayuserreview);
                    }
                  }}
                  className={'user-post ' + (displayuserpost ? 'active' : '')}
                >
                  Posts
                </li>
                {user.type === 'reviewer' && <li
                  onClick={() => {
                    toggleDUP(!displayuserpost);
                    toggleDUR(!displayuserreview);
                  }}
                  className={'user-setting ' + (displayuserreview ? 'active' : '')}
                >
                  Review
                </li>}
              </ul>
            </div>
            <div className='profile-body'>
              {displayuserpost && (
                <Fragment>
                  <h1> </h1>
                  <div className='tabcontainer'>
                    <Uploads id={user._id} />
                  </div>
                </Fragment>
              )}
              {displayuserreview ? (
                <Fragment>
                  <div className='tabcontainer'>
                    <Review />
                  </div>
                </Fragment>
              ) : (
                <Fragment></Fragment>
              )}
            </div>
          </div>
        </div>
      </div>}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
