import Cookies from "js-cookie";
import apiconfig from "./apiConfig";
import { MoviePayload } from "@/validations/movie";

export interface MovieResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  results: Movie[];
  totalCount: number;
}

export interface Movie {
  _id: string;
  title: string;
  posterUrl: string;
  publishYear: number;
  userId?: string;
  __v?: number;
}

export interface UploadResponse {
  status: boolean;
  message: string;
  data: UploadData;
}

export interface UploadData {
  fileUrl: string;
  filePath: string;
}

export interface AMovieReponse {
  status: boolean;
  message: string;
  data: Movie;
}

export const getAllMovie = async (token: string, parmas?: string) => {
  const newParams = new URLSearchParams(parmas);
  const url = `${apiconfig.defaultUrl}${
    apiconfig.movie.list
  }?${newParams?.toString()}`;

  const response = await fetch(url, {
    headers: apiconfig.authenticatedHeader(token),
    method: "GET",
  });
  const result = await response.json();
  return result as MovieResponse;
};

export const createMovie = async (payload: MoviePayload) => {
  const token = Cookies.get(apiconfig.accessToken);
  const response = await fetch(
    `${apiconfig.defaultUrl}${apiconfig.movie.list}`,
    {
      headers: apiconfig.authenticatedHeader(token),
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  const result = await response.json();
  return result;
};

export const uploadImage = async (payload: FormData) => {
  const token = Cookies.get(apiconfig.accessToken);
  const response = await fetch(`${apiconfig.defaultUrl}${apiconfig.file}`, {
    headers: apiconfig.authenticatedFormDataHeader(token),
    method: "POST",
    body: payload,
  });
  const result = await response.json();
  return result as UploadResponse;
};

export const updateMovie = async (payload: MoviePayload, id: string) => {
  const token = Cookies.get(apiconfig.accessToken);
  const response = await fetch(
    `${apiconfig.defaultUrl}${apiconfig.movie.list}?id=${id}`,
    {
      headers: apiconfig.authenticatedHeader(token),
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
  const result = await response.json();
  return result;
};

export const getMovie = async (token: string, id: string) => {
  const response = await fetch(
    `${apiconfig.defaultUrl}${apiconfig.movie.list}?id=${id}`,
    {
      headers: apiconfig.authenticatedHeader(token),
      method: "GET",
    }
  );
  const result = await response.json();
  return result as AMovieReponse;
};
