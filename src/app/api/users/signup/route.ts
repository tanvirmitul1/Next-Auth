import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" ,message:"user exist" , status:400 });
    }
    
    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser =await newUser.save();

    return NextResponse.json({ message: "User signed up successfully" ,succuee: true, savedUser });
  } catch (error:any) {
    console.error("Error signing up user:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
