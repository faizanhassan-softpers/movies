import { getSession } from "@/lib";

export async function getLoggedInUserId(): Promise<string | null> {
    try {
        const session = await getSession();
        const user = session?.user;

        const userId = user?._id;

        if (!userId) {
            throw new Error('User ID not found');
        }

        return userId;
    } catch (error) {
        console.error('Error retrieving logged-in user ID:', error);
        return null;
    }
}