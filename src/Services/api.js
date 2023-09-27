import axios from "axios";

const URL_CADASTRO = "http://5devs.online:3007/biomob-api";
const URL_TELEMETRIA = "http://177.70.102.109:3000";

const api = axios.create({
  baseURL: URL_CADASTRO,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

// const telemetria = axios.create({
//   baseURL: URL_CADASTRO,
//   headers: {
//     Accept: "application/json",
//     "Content-type": "application/json",
//   },
// });

// let defaultHeader = {};
// let jwt = "";

// api.interceptors.request.use(async (config) => {

//   config.headers.Authorization = `Bearer ${jwt}`;
//   config.headers = { ...config.headers, ...defaultHeader };
//   return config;
// });

api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (
      response.data.retorno === "erro" ||
      response.data.retorno === "error" ||
      response.data.retorno === "ERRO" ||
      response.data.retorno === "ERROR"
    ) {
      return Promise.reject({
        ...response.data,
        message:
          response?.data?.mensagem ||
          "Algo inesperado aconteceu. Por favor, verifique sua conexão ou tente novamente mais tarde.",
      });
    }
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const data = {
      message:
        error.response.data.mensagem ||
        "Algo inesperado aconteceu. Por favor, verifique sua conexão ou tente novamente mais tarde.",
    };
    return Promise.reject({ ...error.response?.data, ...data });
  }
);

export const apiget = (url, payload) => {
  return api.get(url, { payload });
};

export const apipost = async (url, payload) => await api.post(url, payload);
export const apidelete = async (url, payload) => await api.delete(url, payload);
export const apiput = async (url, payload) => await api.put(url, payload);



// const api = axios.create({
//     baseURL: "http://169.57.150.59:8002"

// })

// api.interceptors.request.use(
//     (config) => {
//         const userJWT = localStorage.getItem('usuario');

//         if(userJWT) {
//             config.headers.Authorization = `Bearer ${userJWT}`;
//         }
//         return config;
//     },
//     (e) => {
//       return Promise.reject(e);
//     }
// );

export default api;