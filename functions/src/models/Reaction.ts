import { ObjectId } from "mongodb";

export default interface Reaction {
  _id?: ObjectId;
  trial_id: string;
  body_location_num: string;
  body_location_desc: string;
  specific_body_location_num: string;
  specific_body_location_desc: string;
  symptom_num: string;
  symptom_desc: string;
  date_time_observed: Date;
  symptom_photo_url?: string;
}
