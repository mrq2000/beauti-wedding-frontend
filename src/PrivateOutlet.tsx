import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '@/helpers/storage';
import useMe from '@/data/useMe';
import CustomLoading from '@/components/common/CustomLoading';

const GetMeOutlet = () => {
  const { isLoading, error } = useMe();

  if (error) {
    return <Navigate to="/sign-in" />;
  }
  if (isLoading) return <CustomLoading />;
  return <Outlet />;
};

const PrivateOutlet: FC = () => {
  const accessToken = getToken();
  if (!accessToken) {
    return <Navigate to="/sign-in" />;
  }
  return <GetMeOutlet />;
};

export default PrivateOutlet;
