import axios from 'axios';

let instance  = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
})

let refresh = false;

instance.interceptors.response.use(resp => resp, async error => {
  if(error.response.status === 401 && !refresh){

    refresh = true;
    const {status , data} = await instance.post('auth/refresh-token', {} , {
      withCredentials: true
    });

    if(status === 200) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      console.log('Authorization' , instance.defaults.headers.common['Authorization']);
      return axios(error.config)
    }
  }
  refresh = false;
  return error;
})

export default instance;