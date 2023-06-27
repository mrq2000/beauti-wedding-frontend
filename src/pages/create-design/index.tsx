import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box, Fade } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import { CreateDesignContext, DesignSetting } from './CreateDesignContext';
import ChooseTemplate from './components/ChooseTemplateStep';
import InfoStep from './components/InfoStep';
import SettingStep from './components/SettingStep';
import useCreateDesign from '@/data/design/useCreateDesign';
import CustomLoading from '@/components/common/CustomLoading';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleErrorMessage } from '@/helpers/error';
import SomeThingError from '@/components/error-page/SomeThingError';
import { getDemoInfo } from '@/utils/editor';

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

const CreateDesignPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(searchParams.get('templateId') ? 1 : 0);
  const [templateId, setTemplateId] = useState<number | undefined>(
    searchParams.get('templateId') ? +(searchParams.get('templateId') as string) : undefined,
  );
  const [info, setInfo] = useState(getDemoInfo({ hasParentInfo: false }));
  const [setting, setSetting] = useState<DesignSetting>({ domain: '' });
  const { mutate: createDesign, isLoading, error } = useCreateDesign();

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

  if (error) {
    return (
      <Box display="flex" alignItems="center" height="100%">
        <SomeThingError error={error} />
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
