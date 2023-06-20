import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box, Fade } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import { CreateDesignContext, DesignSetting } from './CreateDesignContext';
import ChooseTemplate from './components/ChooseTemplateStep';
import InfoStep from './components/InfoStep';
import SettingStep from './components/SettingStep';
import useCreateDesign from '@/data/design/useCreateDesign';
import CustomLoading from '@/components/common/CustomLoading';
import { useNavigate } from 'react-router-dom';
import { handleErrorMessage } from '@/helpers/error';
import SomeThingError from '@/components/error-page/SomeThingError';
import { Info } from '@/editor/interface/info';

const STEPS = [
  {
    element: ChooseTemplate,
  },
  {
    element: InfoStep,
  },
  {
    element: SettingStep,
  },
];

const DEMO_INFO: Info = {
  groomName: 'Tên Chú Rể',
  groomFatherName: '',
  groomMotherName: '',
  brideName: 'Tên Cô Dâu',
  brideFatherName: '',
  brideMotherName: '',
  location: 'Địa chỉ nơi tổ chức tiệc cưới',
  time: '2023-05-04T17:00:00.000Z',
};

const CreateDesignPage: FC = () => {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState(DEMO_INFO);
  const [templateId, setTemplateId] = useState<number | undefined>();
  const [setting, setSetting] = useState<DesignSetting>({ domain: '' });
  const { mutate: createDesign, isLoading, isError } = useCreateDesign();

  const navigate = useNavigate();
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const currentStep = useMemo(() => STEPS[step], [step]);

  useEffect(() => {
    if (step === STEPS.length) {
      createDesign(
        {
          templateId,
          ...setting,
          ...info,
        },
        {
          onError: (e) => {
            handleErrorMessage(e);
          },
          onSuccess: (data) => {
            navigate(`/designs/${data.id}`);
          },
        },
      );
    }
  }, [step]);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" height="100%">
        <CustomLoading />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" alignItems="center" height="100%">
        <SomeThingError />
      </Box>
    );
  }

  return (
    <CreateDesignContext.Provider value={{ info, setInfo, templateId, setTemplateId, setting, setSetting }}>
      <Box display="flex" flex={1} flexDirection="column" alignItems="center" height="100%">
        <Box
          component={TransitionGroup}
          display="flex"
          flex={1}
          width="100%"
          justifyContent="center"
          py={4}
          px={{ xs: 2, sm: 4 }}
        >
          <Fade
            key={`${step}`}
            timeout={{
              appear: 0,
              enter: 700,
              exit: 0,
            }}
          >
            <Box display="flex" flex={1} flexDirection="column" maxWidth={1400}>
              {currentStep && React.createElement(currentStep.element, { handleNextStep })}
            </Box>
          </Fade>
        </Box>
      </Box>
    </CreateDesignContext.Provider>
  );
};

export default CreateDesignPage;
