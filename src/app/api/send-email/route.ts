"use server";

import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend('re_RuhbuYRd_EwLourLkNnyHSzwP46kuaeJs');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const department = formData.get("department") as string;
    const text = formData.get("contents") as string;
    const recaptchaToken = formData.get("recaptchaToken") as string;
    const attachmentFile = formData.get("attachment") as File | null;

    // 🧩 Validate required fields
    if (!fullName || !phone || !email || !department || !text) {
      return new Response(
        JSON.stringify({
          message: "All required fields must be provided",
          success: false,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!recaptchaToken) {
      return new Response(
        JSON.stringify({
          message: "reCAPTCHA token is required",
          success: false,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate attachment if present
    let attachmentData: any = null;
    if (attachmentFile && attachmentFile.size > 0) {
      const maxSize = 2 * 1024 * 1024;
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (attachmentFile.size > maxSize) {
        return new Response(
          JSON.stringify({
            message: "Attachment size must be less than 2 MB",
            success: false,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if (!allowedTypes.includes(attachmentFile.type)) {
        return new Response(
          JSON.stringify({
            message:
              "Unsupported file type. Please use PDF, images, or documents.",
            success: false,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const arrayBuffer = await attachmentFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Content = buffer.toString("base64");

      attachmentData = {
        content: base64Content,
        filename: attachmentFile.name,
        type: attachmentFile.type || "application/octet-stream",
      };
    }

    // TODO: Replace with your actual Enterprise secret key
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6LeJ0fIrAAAAACMMm0pqsYp3zUpUf3UQ5UKd7qge";
    if (!secretKey) {
      return new Response(
        JSON.stringify({
          message: "reCAPTCHA Secret Key not configured",
          success: false,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 🧩 Validate reCAPTCHA with better error handling
    try {
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/enterprise/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
        { method: "POST" }
      );
      
      if (!recaptchaResponse.ok) {
        return new Response(
          JSON.stringify({
            message: "reCAPTCHA verification service unavailable",
            success: false,
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const recaptchaResult = await recaptchaResponse.json();

      if (!recaptchaResult.success) {
        return new Response(
          JSON.stringify({
            message: "reCAPTCHA validation failed. Please try again.",
            success: false,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } catch (recaptchaError) {
      console.error("reCAPTCHA verification error:", recaptchaError);
      return new Response(
        JSON.stringify({
          message: "reCAPTCHA verification failed. Please try again.",
          success: false,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const emailData: any = {
      from: "noreply@danskegas.com",
      to: "contact@danskegas.com",
      subject: "New Contact Form Submission",
      react: EmailTemplate({
        fullName,
        phone,
        email,
        department,
        contents: text || "No additional details provided",
        hasAttachment: !!attachmentData,
      }),
    };

    if (attachmentData) {
      emailData.attachments = [attachmentData];
    }
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Resend email error:", error);
      return new Response(
        JSON.stringify({ 
          message: "Failed to send email. Please try again later.",
          success: false,
          error: error 
        }), 
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: "Email sent successfully",
        success: true,
        data 
      }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to send email",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
