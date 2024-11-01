import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export interface UTHO_UPLOAD_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    fileUrl: string;
    fileId: string;
  };
}

const AUTH_HEADERS = {
  headers: {
    Authorization: `Bearer ${process.env.UTHO_AUTHORIZATION}`,
    "Content-Type": "multipart/form-data",
  },
};

export const uploadFileToBucket = async (
  formData: FormData
): Promise<UTHO_UPLOAD_RESPONSE> => {
  "use server";

  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file recieved in form data");
  }

  const uniqueId = uuidv4();
  const fileId = `${file.name}-${uniqueId}`;

  const uploadData = new FormData();
  uploadData.append("file", file, fileId);

  try {
    const url = `${process.env.UTHO_API_BASE_URL}/${process.env.UTHO_DC_SLUG}/bucket/${process.env.UTHO_BUCKET_NAME}/upload`;

    const res = await axios.post(url, uploadData, AUTH_HEADERS);
    const uploadResponse = res.data as UTHO_UPLOAD_RESPONSE;

    if (uploadResponse.success) {
      return {
        success: true,
        message: uploadResponse.message || "File uploaded successfully",
        data: {
          fileId,
          fileUrl: `${process.env.UTHO_FILE_ACCESS_URL}/${fileId}`,
        },
      };
    } else {
      return {
        success: false,
        message: uploadResponse.message || "File upload Failed",
      };
    }
  } catch (error: any) {
    console.error("Upload error in :", error.message);
    throw new Error(
      `Failed to upload file: ${error.response?.data?.message || error.message}`
    );
  }
};
