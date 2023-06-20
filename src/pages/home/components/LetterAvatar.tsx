import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`.toUpperCase(),
  };
}

interface LetterAvatar {
  name: string;
}

const LetterAvatar: React.FC<LetterAvatar> = ({ name }) => {
  return <Avatar {...stringAvatar(name)} />;
};

export default LetterAvatar;
