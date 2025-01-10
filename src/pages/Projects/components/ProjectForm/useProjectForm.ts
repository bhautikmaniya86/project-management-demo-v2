import { Project } from '@/types/projects';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type ProjectFormValues = {
  projectName: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  projectDescription: string;
  isFavorite: boolean;
};

type UseProjectFormType = {
  project?: Project;
  submitHandler: (data: Partial<Project>) => void;
};

const useProjectForm = ({ project, submitHandler }: UseProjectFormType) => {
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      projectName: '',
      startDate: '',
      endDate: '',
      projectManager: '',
      projectDescription: '',
      isFavorite: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = form;

  useEffect(() => {
    // Reset form with project data
    if (project) {
      reset({
        ...project,
      });
    }
  }, [project]);

  const onSubmit = (data: ProjectFormValues) => {
    submitHandler({ ...data, projectName: data.projectName?.trim() }); // Remove white spaces before and after
  };

  return {
    handleSubmit,
    register,
    control,
    errors,
    onSubmit,
    form,
    watch,
  };
};

export default useProjectForm;
