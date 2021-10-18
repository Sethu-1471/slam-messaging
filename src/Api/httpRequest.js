import axios from "axios";
import { toast } from 'react-toastify';
import { useState, useCallback, useMemo, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const axiosCancel = axios.CancelToken.source();

export const httpRequest = async ({
  baseURL = "http://localhost:3010",
  endpoint,
  method,
  body = {},
  query = "",
  contentType = "",
}) => {
  try {
    const response = await axios.request({
      method: method,
      baseURL: baseURL,
      url: `${endpoint}${query ? "?" + query : ""}`,
      data: body,
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        "Content-Type": contentType ? contentType : "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error.response);

    if (!error.response) {
      throw {
        success: false,
        message: error.message || "Internal Server Error, Please try again",
        status: error.status || 500,
      };
    }

    if (error.response.status === 401) {
      console.log("REMOVING TOKEN");
      setTimeout(() => {
        localStorage.removeItem("auth-token");
        window.location.reload();
      }, 2000);
      toast(error.response.data.message, "error");
    }
    throw {
      message: error.response.data.message,
      status: error.response.status,
      success: false,
    };
  }
};

export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(true);
  const router = useHistory();
  const inc = useCallback(
    () => setCounter((counter) => counter + 1),
    [setCounter]
  );
  const dec = useCallback(() => {
    return setCounter((counter) => counter - 1);
  }, [setCounter]);
  const decwitherror = useCallback(
    (err) => {
      dec();
    },
    [setCounter]
  );
  const interceptors = useMemo(
    () => ({
      request: (config) => {
        return inc(), config;
      },
      response: (response) => (dec(), response),
      error: (error) => (decwitherror(error), Promise.reject(error)),
    }),
    [inc, dec]
  );
  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );
    let resInterceptor;
    if (show) {
      resInterceptor = axios.interceptors.response.use(
        interceptors.response,
        interceptors.error
      );
    }
    return () => {
      if (show) {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
    };
  }, [interceptors]);

  return [counter > 0];
};
