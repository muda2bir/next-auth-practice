import User from "../../../models/userSchema";
import connectToDatabase from "../../../database/conn";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  try {
    connectToDatabase();

    // Only post request is accepted
    if (req.method !== "POST") {
      return res.status(500).json({ message: "HTTP method not valid!" });
    }

    const { email, name, password } = req.body;

    // Check the duplicate user
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(422).json({ message: "User Already Exists" });

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // saving the user in the database
    const user = new User({ email, name, password: hashedPassword });
    await user.save();
    return res.status(201).json({ status: "ok", user: user });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
