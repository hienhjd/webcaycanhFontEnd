// src/components/UserInfo.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import AddressInput from './AddressInput';

const UserInfo = () => {
    // Lấy thông tin người dùng từ localStorage
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // Kiểm tra nếu userInfo không tồn tại hoặc không có avatar
    if (!userInfo) {
        return <Typography variant="body1" color="error">Không có dữ liệu người dùng.</Typography>;
    }

    return (
        <Box sx={{ textAlign: 'center', padding: 2 }}>
            {/* Kiểm tra nếu avatar tồn tại trước khi render */}
            {userInfo.avatar && (
                <img
                    src={userInfo.avatar||"https://cbam.edu.vn/avatar-mac-dinh/"}
                    alt="User Avatar"
                   /* style={{ borderRadius: '50%', width: '100px', height: '100px', marginBottom: '1rem' }}*/
                />
            )}
            <Typography variant="h6">{userInfo.name}</Typography>
            <Typography variant="body2" color="textSecondary">{userInfo.email}</Typography>
            {/* Kiểm tra nếu phone tồn tại */}
            {userInfo.phone && <Typography variant="body2">{userInfo.phone}</Typography>}
            {/* Kiểm tra nếu address tồn tại */}
            {userInfo.address && <Typography variant="body2">{userInfo.address}</Typography>}
            <AddressInput />
        </Box>
    );
};

export default UserInfo;
