import axios from "axios";
import { serverUrl } from "../App";
import { setLoadingFalse, setUserData } from "../redux/userSlice";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(`${serverUrl}/user/currentuser`, {
      withCredentials: true,
    });
    dispatch(setUserData(result.data));
  } catch (error) {
    console.error(error);
    dispatch(setLoadingFalse());
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      `${serverUrl}/notes/generate-notes`,
      payload,
      { withCredentials: true },
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log("Generate notes Error :", error);
  }
};

export const generatePdf = async (result) => {
  try {
    const response = await axios.post(
      `${serverUrl}/pdf/generate-pdf`,
      { result },
      {
        responseType: "blob",
        withCredentials: true,
      },
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error("PDF download failed");
  }
};

export const generateInterview = async (payload) => {
  try {
    const result = await axios.post(
      `${serverUrl}/interview/generate-interview`,
      payload,
      { withCredentials: true },
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    throw new Error("Generate Interview Notes:" ,error);
  }
};
