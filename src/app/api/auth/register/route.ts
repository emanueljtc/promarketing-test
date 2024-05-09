import { NextResponse } from 'next/server';
import db from '@/libs/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (userFound) {
      return NextResponse.json(
        { message: 'email already exists' },
        {
          status: 400,
        }
      );
    }

    if (usernameFound) {
      return NextResponse.json(
        { message: 'username already exists' },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

