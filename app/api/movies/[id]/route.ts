import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Movie from '@/backend/models/Movie';
import { connectToDatabase } from '@/backend/lib/dbConnect';

// Define the interface for the request body
interface UpdateMovieRequest {
    title?: string;
    publishingYear?: number;
    imageUrl?: string;
}

// GET handler for getting a movie by ID
export async function GET(request: Request) {
    try {
        await connectToDatabase();

        // Extract movie ID from URL
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid movie ID' }, { status: 400 });
        }

        // Find the movie by ID
        const movie = await Movie.findById(id);
        if (!movie) {
            return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Movie retrieved successfully', movie }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving movie:', error);
        return NextResponse.json({ message: 'Failed to retrieve movie', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        await connectToDatabase();

        // Extract movie ID from URL
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid movie ID' }, { status: 400 });
        }

        // Parse the request body
        const { title, publishingYear, imageUrl }: UpdateMovieRequest = await request.json();

        // Ensure at least one field is provided
        if (!title && !publishingYear && !imageUrl) {
            return NextResponse.json({ message: 'At least one field must be provided' }, { status: 400 });
        }

        // Find and update the movie
        const updateFields: Partial<UpdateMovieRequest> = { title, publishingYear, imageUrl };
        const updatedMovie = await Movie.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!updatedMovie) {
            return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Movie updated successfully', movie: updatedMovie }, { status: 200 });
    } catch (error) {
        console.error('Error updating movie:', error);
        return NextResponse.json({ message: 'Failed to update movie', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
