import { v2 as cloudinary} from "cloudinary";
import exp from "constants";
import fs from "fs"

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        //upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log(`File is uploaded successfully on cloudinary`, response.url);
        return response;
    } catch (error) {
        //remove local file from server in synchornour manner as the file didn't upload
        fs.unlinkSync(localFilePath)
    }
}


export {uploadOnCloudinary}