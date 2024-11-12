import { v4 as uuidv4 } from 'uuid';
import formModal from '../modals/formModal.js';

export async function generateUniqueFormId() {
    return uuidv4();
}

export async function saveFormLocation(formId, latitude, longitude) {
    return await formModal.create({formId:formId, latitude:latitude, longitude:longitude});
}

export async function getFormLocation(formId) {
    return await formModal.findOne({formId:formId});
}

export async function checkDistance(lat1, lon1, center, radius) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (center.latitude * Math.PI) / 180;
    const Δφ = ((center.latitude - lat1) * Math.PI) / 180;
    const Δλ = ((center.longitude - lon1) * Math.PI) / 180;
  
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    return distance <= radius;
  }