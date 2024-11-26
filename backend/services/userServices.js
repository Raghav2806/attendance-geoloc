import { generateUniqueFormId, saveFormLocation, getForm, checkDistance, addStudent } from "../repositries/userRepo.js";
import * as dotenv from "dotenv";
dotenv.config();

export async function genQr(body) {
    const { latitude, longitude } = body;
    const formId = await generateUniqueFormId();
    
    await saveFormLocation(formId, latitude, longitude);

    const formURL = `${process.env.FRONT_URL}/form/${formId}`

    return formURL;
}

export async function accessChecker (body, params) {
    const { latitude, longitude } = body;
  const formId = params.formId;
  const formLocation = await getForm(formId);
  const isWithinRadius = await checkDistance(latitude, longitude, formLocation, 10);
  return isWithinRadius;
}

export async function attendanceMarker(body) {
  const {email, formId} = body.requestBody;
  await addStudent(email, formId);
  return true;
}