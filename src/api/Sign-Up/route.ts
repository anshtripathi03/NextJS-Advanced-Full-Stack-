import user from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import connectDb from "@/src/lib/connectDb";
import sendVerificationEmail from "@/src/helpers/sendVerificationEmail";

export default async function POST(request: Request) {

  await connectDb();

  try {
    const req = await request.json();
    const { username, email, password } = req;

    const userExistByThisUsername = await user.findOne({
      username,
      isVerified: true,
    });

    if (userExistByThisUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 400 },
      );
    }

    const userExistByThisEmail = await user.findOne({
      email,
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryCode = new Date();
    expiryCode.setHours(expiryCode.getHours() + 1);

    if (userExistByThisEmail) {

      if (userExistByThisEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User Exists By This Email",
          },
          {
            status: 401,
          },
        );

      } else {
        userExistByThisEmail.password = hashedPassword;
        userExistByThisEmail.verifyToken = verifyCode;
        userExistByThisEmail.verifyTokenExpiry = expiryCode;

        await userExistByThisEmail.save();

      }
    } else {
      const newUser = new user({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyToken: verifyCode,
        verifyTokenExpiry: expiryCode,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();

    }

    const emailResponce = await sendVerificationEmail(
        username,
        email,
        verifyCode
    )

    if(!emailResponce?.success){
        return Response.json({
            message: "Failed sending verification email",
            success: false
        },{
            status: 500
        })
    }

    return Response.json(
      {
        success: true,
        message: "User Registered successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("Signup Failed", error);
    return Response.json(
      {
        success: false,
        message: "Signup Failed",
      },
      {
        status: 500,
      },
    );
  }
}
