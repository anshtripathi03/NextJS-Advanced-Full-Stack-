import { resend } from "../lib/resend";
import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponce } from "../types/Apiresponce";
import { success } from "zod";

export default async function sendVerificationEmail(
  username: string,
  email: string,
  verificationCode: string,
): Promise<ApiResponce> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification Email",
      react: VerificationEmail({username, otp: verificationCode}),
    });
    return { success: true, message: "Verification email sent", status: 200 };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return {
      success: false,
      message: "Verification email failed",
      status: 500,
    };
  }
}
