import Avatar from '@mui/material/Avatar';
import React from 'react';
import './profile.component.css';
import { CurrentUser } from '../../types/types';
import { connect } from 'react-redux';
import LogoutComponent from '../../components/logout/logout.component';

type PropType = {
  user: CurrentUser;
};

const profile = ({ user }: PropType) => {
  return (
    <div className='profile-container'>
      <div className='wrapper'>
        <Avatar
          alt={user.display_name}
          src={user?.images[0]?.url}
          sx={{
            alignSelf: 'center',
            width: 60,
            height: 60,
            boxShadow: '2px 2px 20px 0px rgba(0,0,0,0.4)',
          }}
        />
        <div className='text-wrapper'>
          <h2>Hello, {user.display_name}</h2>
          <LogoutComponent />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(profile);
