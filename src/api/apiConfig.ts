const baseUrl = " http://3.109.184.247:3000";
const accessToken = "ACCESS_TOKEN";

const apiVersion = "/api/v1";
const defaultUrl = `${baseUrl}${apiVersion}`;
const commonHeader = {
  "Content-Type": "application/json",
};

const authenticatedHeader = (token?: string) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  if (token) {
    headers.append("Authorization", token);
  }
  return headers;
};
const authenticatedFormDataHeader = (token?: string) => {
  const headers = new Headers();
  if (token) {
    headers.append("Authorization", token);
  }
  return headers;
};
const apiconfig = {
  accessToken,
  baseUrl,
  defaultUrl,
  commonHeader,
  authenticatedHeader,
  authenticatedFormDataHeader,
  limit: 12,
  login: "/auth/login",
  movie: {
    list: "/movie",
  },
  file: "/file",
};
export default apiconfig;
