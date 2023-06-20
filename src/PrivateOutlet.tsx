import React, { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToken } from '@/helpers/storage';
import useMe from '@/data/useMe';
import CustomLoading from '@/components/common/CustomLoading';

const GetMeOutlet = () => {
  const { isLoading, error } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/sign-in');
    }
  }, [error]);

  if (error) {
    return null;
  }
  if (isLoading) return <CustomLoading />;
  return <Outlet />;
};

const PrivateOutlet: FC = () => {
  const accessToken = getToken();
  const navigate = useNavigate();
  if (!accessToken) {
    navigate('/sign-in');
    return null;
  }
  return <GetMeOutlet />;
};

export default PrivateOutlet;
