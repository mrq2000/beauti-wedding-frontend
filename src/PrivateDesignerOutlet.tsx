import React, { FC } from 'react';
import { Outlet, Navigate, useLocation, createSearchParams } from 'react-router-dom';
import { getToken } from '@/helpers/storage';
import CustomLoading from '@/components/common/CustomLoading';
import useDesigner from '@/data/designer/useDesigner';

const GetDesignerOutlet = () => {
  const { isLoading, error } = useDesigner();
  const location = useLocation();
  if (error) {
    return (
      <Navigate
        to={`/designer/sign-in?${createSearchParams({ redirect: `${location.pathname}${location.search}` })}`}
      />
    );
  }
  if (isLoading) return <CustomLoading />;
  return <Outlet />;
};

const PrivateDesignerOutlet: FC = () => {
  const location = useLocation();
  const accessToken = getToken();
  if (!accessToken) {
    return (
      <Navigate
        to={`/designer/sign-in?${createSearchParams({ redirect: `${location.pathname}${location.search}` })}`}
      />
    );
  }
  return <GetDesignerOutlet />;
};

export default PrivateDesignerOutlet;
