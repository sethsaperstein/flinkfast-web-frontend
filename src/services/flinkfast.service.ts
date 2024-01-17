import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/api-response";
import { callExternalApi } from "./external-api.service";
import { Message } from "src/models/message";
import { BillingSummary } from "src/models/billing-summary";
import { Invite, Invites, Member, Members } from "src/models/account-management";
import { DeleteJobData, Job, Jobs } from "src/models/jobs";
import { Session, SqlData } from "src/models/sql";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getPublicResource = async (): Promise<ApiResponse<Message>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<Message>;

  return {
    data,
    error,
  };
};

export const getProtectedResource = async (
  accessToken: string
): Promise<ApiResponse<Message>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/protected`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<Message>;

  return {
    data,
    error,
  };
};

export const getAdminResource = async (
  accessToken: string
): Promise<ApiResponse<Message> >=> {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<Message>;

  return {
    data,
    error,
  };
};

export const getBillingSummary = async (
  accessToken: string
): Promise<ApiResponse<BillingSummary>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/billing/summary`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<BillingSummary>;

  return {
    data,
    error,
  };
};

export const getInvites = async (
  accessToken: string
): Promise<ApiResponse<Invites>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/account/invites`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<Invites>;

  return {
    data,
    error,
  };
};

export const deleteInvite = async (
  accessToken: string,
  invite: Invite,
): Promise<ApiResponse<void>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/account/invites`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: invite
  };

  const { error } = (await callExternalApi({ config })) as ApiResponse<void>;

  return {
    data: undefined,
    error,
  };
};

export const sendInvite = async (
  accessToken: string,
  invite: Invite,
): Promise<ApiResponse<void>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/account/invites`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: invite
  };

  const { error } = (await callExternalApi({ config })) as ApiResponse<void>;

  return {
    data: undefined,
    error,
  };
};

export const getMembers = async (
  accessToken: string
): Promise<ApiResponse<Members>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/account/members`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<Members>;

  return {
    data,
    error,
  };
};

export const deleteMember = async (
  accessToken: string,
  member: Member,
): Promise<ApiResponse<void>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/account/members`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: member
  };

  const { error } = (await callExternalApi({ config })) as ApiResponse<void>;

  return {
    data: undefined,
    error,
  };
};

export const getJobs = async (
  accessToken: string
): Promise<ApiResponse<Jobs>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/jobs`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<Jobs>;

  return {
    data,
    error,
  };
};

export const deleteJob = async (
  accessToken: string,
  job: DeleteJobData,
): Promise<ApiResponse<void>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/jobs`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: job
  };

  const { error } = (await callExternalApi({ config })) as ApiResponse<void>;

  return {
    data: undefined,
    error,
  };
};

export const getSession = async (
  accessToken: string
): Promise<ApiResponse<Session>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/sql/session`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<Session>;

  return {
    data,
    error,
  };
};

export const createSession = async (
  accessToken: string
): Promise<ApiResponse<Session>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/sql/session`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<Session>;

  return {
    data,
    error,
  };
};

export const createJob = async (
  accessToken: string,
  sql: SqlData,
): Promise<ApiResponse<Job>> => {
  console.log(`create job sql: ${sql.sql}`);
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/jobs`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: sql,
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<Job>;

  return {
    data,
    error,
  };
};
