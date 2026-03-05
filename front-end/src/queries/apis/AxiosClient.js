import axios from "axios";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const axiosClient = axios.create({
    baseURL: "https://localhost:7157/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("AccesToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {

            if (response.data.code === 400) {
                Swal.fire({
                    title: "Thông báo !",
                    text: response.data.message,
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonText: "Đồng ý"
                })
            }


            if (response.data.code === 401) {

                Swal.fire({
                    title: "Thông báo !",
                    text: response.data.message,
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonText: "Đồng ý"
                })
                Cookies.remove('AccesToken', { path: '/' });
            }


            if (response.data.code === 403) {
                Swal.fire({
                    title: "Thông báo !",
                    text: response.data.message,
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonText: "Đồng ý"
                })
            }

            if (response.data.code === 500) {
                Swal.fire({
                    title: "Thông báo !",
                    text: response.data.message,
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonText: "Đồng ý"
                })
            }


            return response.data;
        }
        return response

    },
    (error) => {
        // Xử lý lỗi chung
        const { response } = error;

        if (response) {

            if (response.status === 401) {

                Cookies.remove('AccesToken', { path: '/' });

            }

            if (response.status === 403) {

                Swal.fire({
                    title: "Thông báo !",
                    text: response.message,
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonText: "Đồng ý"
                })
            }

            if (response.status >= 500) {
                Swal.fire({
                    title: "Thông báo !",
                    text: "Lỗi máy chủ, vui lòng thử lại sau!",
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonText: "Đồng ý"
                })
            }


            throw response.data || error;
        } else if (error.request) {
            console.log('No response from server');
            Swal.fire({
                title: "Thông báo !",
                text: "Không kết nối được đến server!",
                icon: "error",
                showConfirmButton: true,
                confirmButtonText: "Đồng ý"
            })
        }

        return Promise.reject(error);
    }
);

export default axiosClient