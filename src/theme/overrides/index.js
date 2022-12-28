//

import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import IconButton from './IconButton';
import Table from './Table';
import Dialog from './Dialog';
import Pagination from './Pagination';
import Button from './Button';
import Backdrop from './Backdrop';
import Typography from './Typography';
import CssBaseline from './CssBaseline';
import Autocomplete from './Autocomplete';
import Link from './Link';
import Svg from './Svg';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme, isLightMode) {
  return Object.assign(
    Card(theme),
    Link(theme),
    Input(theme),
    IconButton(theme),
    Paper(theme),
    Dialog(theme),
    Pagination(theme, isLightMode),
    Table(theme, isLightMode),
    Button(theme),
    Backdrop(theme),
    Typography(theme),
    CssBaseline(theme),
    Autocomplete(theme),
    Svg(theme, isLightMode),
  );
}
