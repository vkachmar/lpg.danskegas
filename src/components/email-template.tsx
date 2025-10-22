import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  fullName?: string;
  phone?: string;
  email?: string;
  department?: string;
  contents?: string;
  hasAttachment?: boolean;
}

export const EmailTemplate = ({
  fullName = "Not provided",
  phone = "Not provided",
  email = "Not provided",
  department = "Not specified",
  contents = "No additional details provided",
  hasAttachment = false,
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>New Contact Form Submission</Preview>
      <Container style={container}>
        <Text style={title}>
          <strong>📩 New Contact Form Submission</strong>
        </Text>

        <Section style={section}>
          <Text style={subtitle}>👤 Contact Details:</Text>
          <Text style={text}>
            <strong>Full Name:</strong> {fullName}
            <br />
            <strong>Phone:</strong> {phone}
            <br />
            <strong>Email:</strong> {email}
            <br />
            <strong>Department:</strong> {department}
          </Text>
        </Section>

        <Section style={section}>
          <Text style={subtitle}>💬 Message:</Text>
          <Text style={contentText}>{contents}</Text>
        </Section>

        {hasAttachment && (
          <Section style={section}>
            <Text style={text}>
              📎 An attachment was included with this submission.
            </Text>
          </Section>
        )}

        <Button style={button} href="https://resend.com/emails">
          View All Submissions
        </Button>

        <Text style={footer}>
          DanskeGas ・ Wawelska 45/58 ・ 02-034 Warszawa, Poland ・{" "}
          <a href="mailto:danskegas.adm@gmail.com" style={link}>
            danskegas.adm@gmail.com
          </a>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: "#f9f9f9",
  color: "#333",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  color: "#d80a00",
  marginBottom: "20px",
};

const subtitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#d80a00",
  marginBottom: "10px",
};

const section = {
  padding: "15px 20px",
  backgroundColor: "#f7f7f7",
  borderRadius: "6px",
  marginBottom: "15px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
};

const contentText = {
  ...text,
  backgroundColor: "#fff",
  padding: "15px",
  borderLeft: "4px solid #d80a00",
  whiteSpace: "pre-wrap",
  borderRadius: "4px",
};

const button = {
  display: "block",
  width: "200px",
  margin: "25px auto",
  padding: "12px",
  backgroundColor: "#f99639",
  color: "#ffffff",
  textDecoration: "none",
  textAlign: "center" as const,
  borderRadius: "5px",
  fontSize: "16px",
  fontWeight: "bold",
};

const footer = {
  fontSize: "12px",
  color: "#666",
  textAlign: "center" as const,
  marginTop: "30px",
};

const link = {
  color: "#d80a00",
  textDecoration: "underline",
};
