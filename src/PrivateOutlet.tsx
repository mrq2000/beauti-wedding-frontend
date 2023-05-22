import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToken } from '@/helpers/storage';

const PrivateOutlet: FC = () => {
  const accessToken = getToken();
  const navigate = useNavigate();
  if (!accessToken) {
    navigate('/sign-in');
    return null;
  }
  return <Outlet />;
};

export default PrivateOutlet;
