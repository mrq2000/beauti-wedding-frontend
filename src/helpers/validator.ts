/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Vui lòng không bỏ trống trường này',
  },
  string: {
    max: 'Vui lòng nhập không quá ${max} ký tự',
    min: 'Vui lòng nhập ít nhất ${min} ký tự',
  },
});

export default yup;
