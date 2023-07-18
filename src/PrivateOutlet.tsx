import React, { FC } from 'react';
import { Outlet, Navigate, useLocation, createSearchParams } from 'react-router-dom';
import { getToken } from '@/helpers/storage';
import useMe from '@/data/useMe';
import CustomLoading from '@/components/common/CustomLoading';

const GetMeOutlet = () => {
  const { isLoading, error } = useMe();
  const location = useLocation();
  if (error) {
    return <Navigate to={`/sign-in?${createSearchParams({ redirect: `${location.pathname}${location.search}` })}`} />;
  }
  if (isLoading) return <CustomLoading />;
  return <Outlet />;
};

const PrivateOutlet: FC = () => {
  const location = useLocation();
  const accessToken = getToken();
  if (!accessToken) {
    return <Navigate to={`/sign-in?${createSearchParams({ redirect: `${location.pathname}${location.search}` })}`} />;
  }
  return <GetMeOutlet />;
};

export default PrivateOutlet;
