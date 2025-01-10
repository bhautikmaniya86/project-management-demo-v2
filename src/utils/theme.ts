import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF435A',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInputLabel:{
      styleOverrides:{
        disabled:{
        color:'#ff6600'
      }
    }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-disabled': {
            color: '#7f7f7f',
          },
          '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: 'white', 
          },
          input: { color: 'white' },
          textarea: { color: 'white' },
          '& .MuiInputLabel-root': { color: '#ae79c2' },
          '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
          '& .MuiFormHelperText-root': { color: 'white' },
          '& .MuiFormHelperText-root.Mui-error': { color: '#FF435A' }, 
          '& .MuiInputBase-input::placeholder': { color: 'red' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d59eea',
              borderRadius: '8px',
              borderWidth: '1.5px',
            },
            '&:hover fieldset': {
              borderColor: '#d59eea',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#d59eea',
            },
            '&.Mui-error fieldset': {
              borderColor: '#FF435A',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7f7f7f !important', // Disabled state color for the outline
          },
          '& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
            color: '#7f7f7f !important', // Disabled state text color
            '-webkit-text-fill-color': '#7f7f7f !important', // Fix for some browsers
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-checked': {
            color: 'white',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          '& .MuiTablePagination-actions .MuiButtonBase-root': {
            '&:disabled': {
              opacity: 0.5,
            },
          },
          '& .MuiTablePagination-actions .MuiIconButton-root': {
            '&:first-of-type': {
              color: 'white',
            },
            '&:last-of-type': {
              color: 'white',
            },
          },
          '& .MuiSelect-icon': {
            color: 'white',
          },
        },
      },
    },
  },
});

export default theme;
