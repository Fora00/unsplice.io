import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  institution: String,
  role: String,
  picture: String,
  socialLinks: {
    instagram: String,
    github: String,
    linkedin: String,
    website: String,
  },
  programCodes: [String],
  cratedAt: String,
});

export default model('User', userSchema);
