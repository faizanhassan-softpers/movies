export function getLoggedInUserId(): string | null {
    try {
        const userId = '66ace8f9ed570f576b4a0087'; // Replace with real logic

        if (!userId) {
            throw new Error('User ID not found');
        }

        return userId;
    } catch (error) {
        console.error('Error retrieving logged-in user ID:', error);
        return null;
    }
}