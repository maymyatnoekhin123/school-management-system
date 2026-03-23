import axios from "axios";

const api = import.meta.env.VITE_API;

const apiClient = axios.create({
     baseURL: api,
     timeout: 10000, // Refresh ဖြစ်တဲ့အခါ ခဏစောင့်ပေးဖို့ 10s ထားကြည့်ပါ
     withCredentials : true,
     headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
     }
});

apiClient.interceptors.request.use(
     config => {
          const token = localStorage.getItem('token');

          // Token ရှိမှသာ header ထဲ ထည့်မယ်
          if (token) {
               // config.headers object ရှိမရှိ သေချာအောင် အောက်ပါအတိုင်း ရေးပါ
               config.headers = config.headers || {};
               config.headers.Authorization = `Bearer ${token}`;
          }

          return config;
     },
     error => Promise.reject(error)
);

apiClient.interceptors.response.use(
     (response) => response,
     (error) => {
          // 401 ဖြစ်တိုင်း token ဖျက်တာကို ခဏရပ်ထားကြည့်ပါ (Debugging အတွက်)
          if (error.response && error.response.status === 401) {
               console.error("Unauthenticated request detected.");

               // Token တကယ်မရှိတော့မှသာ ဖျက်ခိုင်းပါ
               if (!localStorage.getItem('token')) {
                    localStorage.removeItem("token");
               }
          }

          return Promise.reject(error);
     }
)

export default apiClient;