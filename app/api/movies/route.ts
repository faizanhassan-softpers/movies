import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Movie from '@/backend/models/Movie';
import { connectToDatabase } from '@/backend/lib/dbConnect';

interface CreateMovieRequest {
    owner: mongoose.Types.ObjectId;
    title: string;
    publishingYear: number;
    imageUrl: string;
}

const validateCreateMovieRequest = (data: any): string[] => {
    const errors: string[] = [];

    if (!data.owner) errors.push('Owner is required');
    if (!data.title) errors.push('Title is required');
    if (!data.publishingYear || typeof data.publishingYear !== 'number') errors.push('Publishing year must be a number');
    if (!data.imageUrl) errors.push('Image URL is required');

    return errors;
};

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        // Parse and validate the request body
        const data: CreateMovieRequest = await request.json();
        const validationErrors = validateCreateMovieRequest(data);

        if (validationErrors.length > 0) {
            return NextResponse.json({ message: 'Validation failed', errors: validationErrors }, { status: 400 });
        }

        const movie = new Movie({
            owner: data.owner,
            title: data.title,
            publishingYear: data.publishingYear,
            imageUrl: data.imageUrl,
        });

        await movie.save();

        return NextResponse.json({ message: 'Movie created successfully', movie }, { status: 201 });
    } catch (error) {
        // Handle and log known error types
        if (error instanceof Error) {
            console.error('Error creating movie:', error.message);
            return NextResponse.json({ message: 'Failed to create movie', error: error.message }, { status: 500 });
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ message: 'Failed to create movie', error: 'An unexpected error occurred' }, { status: 500 });
        }
    }
}