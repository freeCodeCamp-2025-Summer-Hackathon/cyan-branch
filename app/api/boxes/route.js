import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth_options';
import { getBoxes, getBoxById } from '@/prisma/queries';

// GET /api/v1/boxes - Get all boxes for the authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const boxes = await getBoxes(session.user.id);
    return NextResponse.json(boxes);
  } catch (error) {
    console.error('Error fetching boxes:', error);
    return NextResponse.json({ error: 'Failed to fetch boxes' }, { status: 500 });
  }
}

// GET /api/v1/boxes/:id - Get a specific box by ID
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = request.query;
    const box = await getBoxById(id);
    if (!box) {
        return NextResponse.json({ error: 'Box not found' }, { status: 404
        });
    }
    return NextResponse.json(box);
    } catch (error) {
    console.error('Error fetching box:', error);
    return NextResponse.json({ error: 'Failed to fetch box' }, { status: 500 });
  }
}
