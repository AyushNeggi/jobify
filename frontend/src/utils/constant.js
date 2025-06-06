// export const USER_API_END_POINT="http://localhost:8000/api/v1/user"
// export const JOB_API_END_POINT="http://localhost:8000/api/v1/job"
// export const APPLICATION_API_END_POINT="http://localhost:8000/api/v1/application"
// export const COMPANY_API_END_POINT="http://localhost:8000/api/v1/company"

const BASE_URL =
  import.meta.env.MODE === "development"            //import.meta.env.MODE is Vite's way of knowing if you're in:"development" → local dev "production" → deployed
    ? "http://localhost:8000"
    : ""; // In production, fetch from same domain

export const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
