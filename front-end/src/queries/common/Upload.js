import stronge from "../../config/firebaseconfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { supabase } from "../../config/supabaseClient";



const UpImgFireBase = async (file) => {
    try {
        if (fire.type.startsWith("image/") && file.size < 5 * 1024 * 1024) {
            const filePath = `images/${Date.now()}_${file.name}`
            const strongRef = ref(stronge, filePath)

            await uploadBytes(strongRef, file)
            const url = getDownloadURL(strongRef)
            return url
        }
    } catch (e) {
        console.log(e)
        return;
    }
}


const UpImgSupabase = async (file) => {
    try {
        // 1. Không có file thì thôi
        if (!file) {
            console.warn("Không có file để upload");
            return null;
        }

        // 2. Kiểm tra đúng là ảnh & <= 5MB
        const maxSizeMB = 5;
        if (!file.type.startsWith("image/")) {
            console.warn("File không phải hình ảnh");
            return null;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            console.warn(`File lớn hơn ${maxSizeMB}MB`);
            return null;
        }

        // 3. Tạo tên file & path trong bucket
        const ext = file.name.split(".").pop(); // jpg, png, ...
        const fileName = `${Date.now()}.${ext}`;
        const filePath = `uploads/${fileName}`; // thư mục trong bucket

        // 4. Upload lên bucket "images"
        const { error: uploadError } = await supabase.storage
            .from("FileUpLoadImg")      // đúng y tên bucket trong hình
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            console.error("Upload error:", uploadError);
            return null;
        }

        // 5. Lấy public URL (bucket phải là PUBLIC)
        const { data: publicData, error: urlError } = supabase.storage
            .from("FileUpLoadImg")
            .getPublicUrl(filePath);

        if (urlError) {
            console.error("Get public URL error:", urlError);
            return null;
        }

        const publicUrl = publicData.publicUrl;
        return publicUrl;
    } catch (e) {
        console.error("Unexpected error in UpImgSupabase:", e);
        return null;
    }
}


const uploadImgCloudinary = async (file) => {
    try {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "UpLoadHinh");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dbnxp8sfc/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        return data.secure_url
    } catch (e) {
        console.log(e)
    }
};

export { UpImgFireBase, UpImgSupabase, uploadImgCloudinary }