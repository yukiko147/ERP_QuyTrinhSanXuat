import Swal from "sweetalert2";
import axiosClient from "./AxiosClient"
import Cookies from 'js-cookie';
const get = async (url, parm, setIsLoading) => {
    setIsLoading(true)
    try {
        const config = parm ? { params: parm } : undefined;
        const res = await axiosClient.get(url, config)
        return res.data
    } catch (e) {
        console.error(e)
    } finally {
        setIsLoading(false)
    }


}

const login = async (tendangnhap, matkhau, setIsLoading) => {
    setIsLoading(true)
    try {
        const body = {
            tenDangNhap: tendangnhap,
            matKhau: matkhau
        }

        const res = await axiosClient.post("/QuanLyNhanSu/NhanSu/login", body)
        // Cookies.set("AccesToken", res.data.accesToken)
        const { accesToken, id, phongBan, chucVu, tenNhanSu } = res.data;

        if (accesToken) {
            Cookies.set('AccesToken', accesToken, {
                expires: 7,      // 7 ngày
                path: '/',
                secure: true,    // chỉ HTTPS (production)
                sameSite: 'lax'
            });
        } else {
            return;
        }

        return {
            id, phongBan, chucVu, tenNhanSu
        }
    } catch (e) {
        console.error(e)
        return;
    } finally {
        setIsLoading(false)
    }

}

const post = async (url, body, setIsLoading) => {
    setIsLoading(true)
    try {
        const res = await axiosClient.post(url, body)
        return res.data
    } catch (e) {
        console.error("Lỗi", e)
    } finally {
        setIsLoading(false)
    }
}

const dele = async (url, setIsLoading) => {
    setIsLoading(true)
    try {
        const res = await axiosClient.delete(url)
        return res.data
    } catch (e) {
        console.error("Lỗi", e)
    } finally {
        setIsLoading(false)
    }
}

const put = async (url, body, setIsLoading) => {
    setIsLoading(true)
    try {
        const res = await axiosClient.put(url, body)
        return res.data;
    } catch (e) {
        console.error(e)
    } finally {
        setIsLoading(false)
    }
}
export { login, get, post, dele, put }