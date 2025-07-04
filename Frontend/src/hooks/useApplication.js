import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import jobApplicationService from "../services/applicationService";

export const useApplyToJob = () => {
  return useMutation({
    mutationFn: ({ jobId, data }) =>
      jobApplicationService.applyToJob(jobId, data),
  });
};

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["myApplications"],
    queryFn: jobApplicationService.getMyApplications,
  });
};

export const useJobApplications = (jobId) => {
  return useQuery({
    queryKey: ["applications", jobId],
    queryFn: () => jobApplicationService.getApplicationsForJob(jobId),
    enabled: !!jobId,
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, status }) =>
      jobApplicationService.updateApplicationStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["myApplications"]);
      queryClient.invalidateQueries(["applications"]);
    },
  });
};

export const useConfirmApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (applicationId) =>
      jobApplicationService.confirmApplication(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries(["myApplications"]);
      queryClient.invalidateQueries(["applications"]);
    },
  });
};

// Accept application and create booking
export const useAcceptApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, applicationId }) =>
      jobApplicationService.acceptApplication(jobId, applicationId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["applications"]);
      queryClient.invalidateQueries(["customerBookings"]);
      queryClient.invalidateQueries(["workerBookings"]);
      return data;
    },
  });
};