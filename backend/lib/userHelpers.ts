import User from "@/backend/models/User";

export async function getUserByEmail(email: string) {
  try {
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (error) {
    throw new Error("Error retrieving user");
  }
}

export async function getUserById(id: string) {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    throw new Error("Error retrieving user");
  }
}
