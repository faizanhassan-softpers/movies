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

export async function GET(request: Request) {
    try {
        await connectToDatabase();

        // Extract and validate query parameters
        const url = new URL(request.url);
        const ownerId = url.searchParams.get('ownerId');
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);

        if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
            return NextResponse.json({ message: 'Invalid or missing owner ID' }, { status: 400 });
        }

        // Ensure pagination parameters are valid
        if (page <= 0 || limit <= 0) {
            return NextResponse.json({ message: 'Invalid pagination parameters' }, { status: 400 });
        }

        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        // Query the database for movies by owner with pagination
        const movies = await Movie.find({ owner: ownerId })
            .skip(skip)
            .limit(limit)
            .exec();

        // Get the total count of movies for pagination info
        const totalMovies = await Movie.countDocuments({ owner: ownerId }).exec();

        return NextResponse.json({
            message: 'Movies fetched successfully',
            movies,
            pagination: {
                page,
                limit,
                totalMovies,
                totalPages: Math.ceil(totalMovies / limit),
            },
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json({ message: 'Failed to fetch movies', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}