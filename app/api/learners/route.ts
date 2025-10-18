import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseLearnersTxt, getLearnersStats, type Student } from '@/lib/learners-parser';

export async function GET() {
  try {
    // Read the learners.txt file
    const txtFilePath = path.join(process.cwd(), 'data', 'learners.txt');

    if (!fs.existsSync(txtFilePath)) {
      return NextResponse.json(
        { error: 'learners.txt file not found' },
        { status: 404 }
      );
    }

    const txtContent = fs.readFileSync(txtFilePath, 'utf8');

    // Parse the learners.txt content
    const students: Student[] = parseLearnersTxt(txtContent);

    if (students.length === 0) {
      return NextResponse.json(
        { error: 'No valid student data found in learners.txt' },
        { status: 400 }
      );
    }

    // Get statistics
    const stats = getLearnersStats(students);

    return NextResponse.json({
      students,
      stats,
      totalCount: students.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error reading learners data:', error);
    return NextResponse.json(
      { error: 'Failed to process learners data' },
      { status: 500 }
    );
  }
}

// Handle POST requests for updating learners.txt (optional)
export async function POST(request: Request) {
  try {
    const body = await request.text();

    // Validate the content
    if (!body.trim()) {
      return NextResponse.json(
        { error: 'Empty content provided' },
        { status: 400 }
      );
    }

    // Test parsing the content
    const students = parseLearnersTxt(body);

    if (students.length === 0) {
      return NextResponse.json(
        { error: 'No valid student data found in the provided content' },
        { status: 400 }
      );
    }

    // In a real application, you might want to validate permissions here
    // For now, we'll just return the parsed data
    const stats = getLearnersStats(students);

    return NextResponse.json({
      students,
      stats,
      totalCount: students.length,
      message: 'Learners data parsed successfully'
    });

  } catch (error) {
    console.error('Error processing learners data:', error);
    return NextResponse.json(
      { error: 'Failed to process learners data' },
      { status: 500 }
    );
  }
}
