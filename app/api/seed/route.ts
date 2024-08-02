import { connectToDatabase } from '@/backend/lib/dbConnect';
import User from '@/backend/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDatabase();

        const email = 'johndoe@yopmail.com';
        const password = '12345678';

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 200 }
            );
        }

        // Create a new user with hashed password
        const user = new User({ email, password });
        await user.save();

        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error('Error creating user:', error);

        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json(
            { message: 'Failed to create user', error: errorMessage },
            { status: 500 }
        );
    }
}