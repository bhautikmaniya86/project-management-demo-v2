import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FormDatePickerField, { formatDate } from './FormDatePickerField';

// Mock dayjs to control date values
jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual('dayjs');
  return Object.assign(
    (date:any) => {
      if (date === '2023-05-15') return originalDayjs('2023-05-15');
      return originalDayjs(date);
    },
    originalDayjs
  );
});

// const formatDate = (date: dayjs.Dayjs | null) => {
//   return date && dayjs(date).isValid()
//     ? dayjs(date).format('YYYY-MM-DD')
//     : null;
// };


const TestWrapper = ({ children }:any) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </FormProvider>
  );
};

describe('FormDatePickerField', () => {
  it('renders correctly with label', () => {
    render(
      <TestWrapper>
        <FormDatePickerField name="testDate" label="Test Date" />
      </TestWrapper>
    );
    expect(screen.getByLabelText('Test Date')).toBeInTheDocument();
  });

  it('handles date selection', () => {
    const { getByRole } = render(
      <TestWrapper>
        <FormDatePickerField name="testDate" label="Test Date" />
      </TestWrapper>
    );
    
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '05/15/2023' } });
    expect(input).toHaveValue('05/15/2023');
  });

  it('displays error message when validation fails', async () => {
    const TestForm = () => {
      const methods = useForm();
      const onSubmit = jest.fn();

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormDatePickerField
              name="testDate"
              label="Test Date"
              rules={{ required: 'Date is required' }}
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    const { getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TestForm />
      </LocalizationProvider>
    );

    fireEvent.click(getByText('Submit'));
    expect(await screen.findByText('Date is required')).toBeInTheDocument();
  });

//   it('applies custom props to DatePicker', () => {
//     render(
//       <TestWrapper>
//         <FormDatePickerField
//           name="testDate"
//           label="Test Date"
//           disableFuture
//         />
//       </TestWrapper>
//     );
    
//     const input = screen.getByRole('textbox');
//     expect(input).toHaveAttribute('readonly');
//   });

describe('FormDatePickerField', () => {
    // ... (previous test cases remain unchanged)
  
    it('applies custom props to DatePicker', async () => {
      const { getByRole } = render(
        <TestWrapper>
          <FormDatePickerField
            name="testDate"
            label="Test Date"
            disableFuture
          />
        </TestWrapper>
      );
      
      const input = getByRole('textbox');
      
      // Open the date picker
      fireEvent.click(input);
  
      // Try to select a future date (e.g., tomorrow)
      const tomorrow = dayjs().add(1, 'day').format('MM/DD/YYYY');
      fireEvent.change(input, { target: { value: tomorrow } });
  
      // The input should not have the future date value
      await waitFor(() => {
        expect(input).not.toHaveValue(tomorrow);
      });
  
      // Select today's date
      const today = dayjs().format('MM/DD/YYYY');
      fireEvent.change(input, { target: { value: today } });
  
      // The input should have today's date value
    });
  
    // ... (remaining test cases unchanged)
  });
  

  it('formats date correctly for display', () => {
    const { getByRole } = render(
      <TestWrapper>
        <FormDatePickerField name="testDate" label="Test Date" />
      </TestWrapper>
    );
    
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '05/15/2023' } });
    
    // Check if the displayed date format is correct (MM/DD/YYYY)
    expect(input).toHaveValue('05/15/2023');
  });

  it('uses correct date format for form value', async () => {
    let formValues:any;
    const TestForm = () => {
      const methods = useForm();
      const onSubmit = (data:any) => {
        formValues = data;
      };

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormDatePickerField name="testDate" label="Test Date" />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    const { getByRole, getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TestForm />
      </LocalizationProvider>
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '05/15/2023' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(formValues).toBeDefined();
    });

    // Check if the submitted value is in the correct format (YYYY-MM-DD)
    expect(formValues.testDate).toBe('2023-05-15');
  });

  it('handles null date input correctly', () => {
    const { getByRole } = render(
      <TestWrapper>
        <FormDatePickerField name="testDate" label="Test Date" />
      </TestWrapper>
    );
    
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue('');
  });

  it('returns true for a valid date', () => {
    const validDate = dayjs('2023-05-15');
    expect(formatDate(validDate)).toBeTruthy();
  });

  it('returns false for an invalid date', () => {
    const invalidDate = dayjs('invalid-date');
    expect(formatDate(invalidDate)).toBeFalsy();
  });

  it('returns false for null', () => {
    expect(formatDate(null)).toBeFalsy();
  });

  it('returns false for undefined', () => {
    expect(formatDate(undefined as any)).toBeFalsy();
  });

  it('passes additional props to DatePicker', () => {
    render(
      <TestWrapper>
        <FormDatePickerField
          name="testDate"
          label="Test Date"
          disableFuture
        />
      </TestWrapper>
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    
    const futureDate = dayjs().add(1, 'day').format('MM/DD/YYYY');
    fireEvent.change(input, { target: { value: futureDate } });
    
    expect(input).not.toHaveValue(futureDate);
  });

  it('renders with correct label', () => {
    render(
      <TestWrapper>
        <FormDatePickerField name="testDate" label="Custom Label" />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Custom Label')).toBeInTheDocument();
  });

  it('displays error message when validation fails', async () => {
    const TestForm = () => {
      const methods = useForm();
      const onSubmit = jest.fn();

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormDatePickerField
              name="testDate"
              label="Test Date"
              rules={{ required: 'Date is required' }}
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TestForm />
      </LocalizationProvider>
    );

    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText('Date is required')).toBeInTheDocument();
  });
});

