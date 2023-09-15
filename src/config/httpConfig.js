
const httpConfig = {
  appTitle: "WeSocietyApp",
  api: {
    baseURL: process.env.REACT_APP_BASE_URL,
    retry: 5,
    timeout: 5000
  }
};

export default httpConfig;
