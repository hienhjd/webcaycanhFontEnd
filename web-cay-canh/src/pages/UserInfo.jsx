// src/components/UserInfo.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import AddressInput from './AddressInput';

const UserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
//   const userInfo = {
//     name: 'Nguyễn Văn A',
//     email: 'nguyenvana@example.com',
//     image: 'https://via.placeholder.com/150', // Hình ảnh giả sử
//     phone: '0123456789',
//     address: 'Hà Nội, Việt Nam',
//   };
console.log(userInfo);
  return (
    <Box sx={{ textAlign: 'center', padding: 2 }}>
      <img
        src={userInfo.photoURL}
        alt="User Avatar"
        style={{ borderRadius: '50%', width: '100px', height: '100px', marginBottom: '1rem' }}
      />
      <Typography variant="h6">{userInfo.name}</Typography>
      <Typography variant="body2" color="textSecondary">{userInfo.email}</Typography>
      {/* <Typography variant="body2">{userInfo.phone}</Typography> */}
      {userInfo.address&&<Typography variant="body2">{userInfo.address}</Typography>}
      <AddressInput/>
    </Box>
  );
};

export default UserInfo;
