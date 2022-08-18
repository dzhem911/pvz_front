import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/system';
import {useField} from "formik";
import registrationStyle from '../registration/registration.module.css'

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  width: 320px;
  border: 1px solid #AAA;
  box-shadow: 0px 1px 1px rgb(0 0 0 / 5%), 0px 1px 3px rgb(0 0 0 / 16%);
  font-size: inherit;
  border-radius: 5px;
  margin: 0 auto;

  &.${inputUnstyledClasses.focused} {
    width: 320px; 
    border: 1px solid #AAA;
    box-shadow: 0px 1px 1px rgb(0 0 0 / 5%), 0px 1px 3px rgb(0 0 0 / 16%);
    font-size: inherit;
    border-radius: 5px;
  }
`,
);

const StyledInputElement = styled('input')(
  ({ theme }) => `
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
  width: 320px;
  height: inherit;
  
`,
);

const IconButton = styled(ButtonUnstyled)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
`;

const InputAdornment = styled('div')`
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { components, ...other } = props;
  return (
    <InputUnstyled
      components={{
        Root: StyledInputRoot,
        Input: StyledInputElement,
        ...components,
      }}
      {...other}
      ref={ref}
    />
  );
});

CustomInput.propTypes = {
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Textarea: PropTypes.elementType,
  }),
};

export default function InputAdornments(props) {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const [field, meta] = useField(props);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    props.setValuePassword(event.target.value)
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <article className={registrationStyle.wrapper_center}>
    {/*<Box sx={{ display: 'flex', '& > * + *': { ml: 1 } }} >*/}
      <p className={registrationStyle.input_label}>{props.label}</p>
      <CustomInput

        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        {...field}
        endAdornment={
          <InputAdornment>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
        <div className={registrationStyle.hint}>{ meta.touched && meta.error ? meta.error : null}</div>
    {/*</Box>*/}
  </article>
  );
}
