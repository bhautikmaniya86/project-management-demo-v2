import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import React from 'react';
import { FormProvider } from 'react-hook-form';

import { FormDatePickerField } from '@/components';
import { Project } from '@/types/projects';
import useProjectForm from './useProjectForm';

type ProjectFormProps = {
  project?: Project;
  submitHandler: (data: Partial<Project>) => void;
  isSavingProject: boolean;
};

const ProjectForm = ({
  project,
  submitHandler,
  isSavingProject,
}: ProjectFormProps) => {
  const { errors, handleSubmit, onSubmit, register, form, watch } =
    useProjectForm({
      project,
      submitHandler,
    });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...form}>
        <div className="bg-purple-400 md:p-8 p-4 rounded-xl relative md:mt-32 mt-36 max-w-md">
          <Box
            role="form"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Project id */}
            {!!project && (
              <TextField
                label="Project Id"
                value={project.id}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                disabled
              />
            )}

            {/* Project Name */}
            <TextField
              label="Project Name"
              {...register('projectName', {
                required: 'Project name is required',
                pattern: {
                  value: /^\S+$/,
                  message: 'Spaces are not allowed',
                },
                maxLength: {
                  value: 20,
                  message: "Project name cann't exceed 20 characters.",
                },
              })}
              error={!!errors.projectName}
              helperText={errors.projectName?.message}
              fullWidth
            />

            {/* Project Description */}
            <TextField
              label="Project Description"
              {...register('projectDescription')}
              error={!!errors.projectDescription}
              helperText={errors.projectDescription?.message}
              fullWidth
              rows={4}
              multiline
              className="text-white"
            />

            {/* Start Date */}
            <FormDatePickerField
              label="Start Date"
              name="startDate"
              rules={{
                required: 'Start date is required',
              }}
              slotProps={{
                textField: {
                  variant: 'outlined',
                },
              }}
            />

            {/* End Date */}
            <FormDatePickerField
              label="End Date"
              name="endDate"
              rules={{
                required: 'End date is required',
                validate: (endDate: any) =>
                  endDate > watch('startDate') ||
                  'End date must be greater than start date',
              }}
              slotProps={{
                textField: {
                  variant: 'outlined',
                },
              }}
            />

            {/* Project Manager */}
            <TextField
              label="Project Manager"
              {...register('projectManager', {
                required: 'Project manager is required',
                pattern: {
                  value: /^\S+$/,
                  message: 'Spaces are not allowed',
                },
              })}
              error={!!errors.projectManager}
              helperText={errors.projectManager?.message}
              fullWidth
            />

            {/* Submit Button */}
            <Button
              role="button"
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isSavingProject}
              className="!bg-pink-100 !shadow-none !h-10 !rounded-lg !py-4"
            >
              {isSavingProject ? (
                <CircularProgress size="30px" color="inherit" />
              ) : project ? (
                'Update'
              ) : (
                'Create'
              )}
            </Button>
          </Box>
        </div>
      </FormProvider>
    </LocalizationProvider>
  );
};

export default ProjectForm;
