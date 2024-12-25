import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTY3MzkwYTRhZDQxNDE2NjVkODhmMTI3NzllZTdjNCIsIm5iZiI6MTczNTEyODY3Ni42MDA5OTk4LCJzdWIiOiI2NzZiZjY2NDI0OGM5MmUzZWZhOWVhNzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UmNmHxKgEaIB90_lLufn8zJwBkTpZJ86-S-zTX24eDk",
  },
});


export default instance;