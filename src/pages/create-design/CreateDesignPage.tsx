import React, { FC, useMemo, useState } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { DEMO_INFO } from '@/editor/InfoContext';
import { CreateDesignContext, DesignSetting } from './CreateDesignContext';
import ChooseTemplate from './components/ChooseTenplateStep';
import InfoStep from './components/InfoStep';

const STEPS = [
  {
    label: 'Chọn Template',
    description: 'Bạn có thể thay đổi Template bât cứ lúc nào trong khi chỉnh sửa',
    icon: <BrushOutlinedIcon />,
    element: ChooseTemplate,
  },
  {
    label: 'Thông tin chính',
    description: 'Một vài thông tin sẽ không thể thay đổi sau khi public website.',
    icon: <PeopleAltOutlinedIcon />,
    element: InfoStep,
  },
  {
    label: 'Cài đặt',
    description: 'Mộ số cài đặt cơ bản khi public website',
    icon: <SettingsOutlinedIcon />,
    element: ChooseTemplate,
  },
];

const CreateDesignPage: FC = () => {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState(DEMO_INFO);
  const [templateId, setTemplateId] = useState<number | undefined>();
  const [setting, setSetting] = useState<DesignSetting>({ domain: '' });

  const handleNextStep = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const currentStep = useMemo(() => STEPS[step], [step]);

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
              <Typography variant="h3" mb={1}>
                {currentStep?.label}
              </Typography>
              <Typography variant="caption" mb={4} fontSize={16}>
                {currentStep.description}
              </Typography>
              {React.createElement(currentStep.element, { handleNextStep })}
            </Box>
          </Fade>
        </Box>
      </Box>
    </CreateDesignContext.Provider>
  );
};

export default CreateDesignPage;
