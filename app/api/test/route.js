import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Gets sample test data from MongoDB Atlas
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix');
    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();
    return NextResponse.json(movies);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err: 'Failed to fetch movies' }, { status: 500 })
  }
}