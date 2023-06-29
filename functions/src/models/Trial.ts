import { ObjectId } from "mongodb";

export default interface Trial {
  _id?: ObjectId;
  guardianID: string;
  patient_id: string;
  trial_name: string;
  trial_type: string;
  food_type: string;
  trial_food: string;
  food_photo_url?: string;
  start_date: Date; //current date and time
  trial_pass: string;
  reaction?: string[]; //reaction object id
  nutrition_info?: string; //pulled from api
}
