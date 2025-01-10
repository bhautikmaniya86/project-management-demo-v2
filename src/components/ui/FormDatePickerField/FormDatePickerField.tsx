import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

interface FormDatePickerFieldProps<T extends FieldValues>
  extends Omit<DatePickerProps<Dayjs>, 'value' | 'onChange'> {
  name: string; // The name of the field in the form
  label: string; // Label for the text field
  rules?: Record<string, unknown>; // Validation rules for React Hook Form
}

export const formatDate = (date: dayjs.Dayjs | null) => {
  return date && dayjs(date).isValid()
    ? dayjs(date).format('YYYY-MM-DD')
    : null;
};

const FormDatePickerField = <T extends FieldValues>({
  name,
  label,
  rules = {},
  ...datePickerProps
}: FormDatePickerFieldProps<T>) => {
  const { slotProps, ...rest } = datePickerProps ?? {};
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <DatePicker
          value={value ? dayjs(value as string) : null}
          onChange={(date) => onChange(formatDate(date))}
          slotProps={{
            textField: {
              label,
              error: !!error,
              helperText: error?.message,
              ...slotProps?.textField,
            },
          }}
          {...rest} // Pass additional props to DatePicker
        />
      )}
    />
  );
};

export default FormDatePickerField;
