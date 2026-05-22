import nodemailer from 'nodemailer';

/**
 * Zero-dependency-friendly email utility with support for standard SMTP via Nodemailer
 * and Resend API fetch integration.
 * Falls back to terminal logging in demo/development mode.
 */
export async function sendOtpEmail(email: string, otp: string): Promise<{ success: boolean; mock: boolean }> {
  const normalizedEmail = email.toLowerCase().trim();
  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  // 1. Prioritize Nodemailer SMTP if SMTP details are configured in .env.local
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      console.log(`Attempting to send OTP email to ${normalizedEmail} via Nodemailer SMTP...`);
      
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: `GRN Document Portal <${fromEmail}>`,
        to: normalizedEmail,
        subject: `${otp} is your GRN Portal verification code`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="margin-bottom: 24px; text-align: center;">
              <div style="display: inline-block; width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #4f46e5, #7c3aed); text-align: center; line-height: 44px; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);">
                G
              </div>
              <h2 style="color: #0f172a; margin-top: 16px; font-size: 22px; font-weight: 800; letter-spacing: -0.025em;">GRN Document Portal</h2>
            </div>
            
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
              Hello,
              <br /><br />
              We received a request to access your Goods Receipt Note (GRN) automation dashboard. Use the verification code below to log in. This code is valid for <strong>5 minutes</strong>.
            </p>
            
            <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 18px; text-align: center; margin-bottom: 24px;">
              <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 32px; font-weight: 800; letter-spacing: 0.15em; color: #4f46e5;">${otp}</span>
            </div>
            
            <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-bottom: 0; text-align: center;">
              If you did not request this code, you can safely ignore this email.
              <br />
              © 2026 GRN Automation Portal
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`OTP successfully sent to ${normalizedEmail} via Nodemailer SMTP!`);
      return { success: true, mock: false };

    } catch (err) {
      console.error(`Failed to send email to ${normalizedEmail} via Nodemailer SMTP:`, err);
      console.log('Falling back to other configured email options...');
    }
  }

  // 2. Fallback to Resend API fetch if resend key is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
    try {
      console.log(`Attempting to send OTP email to ${normalizedEmail} via Resend...`);
      
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `GRN Document Portal <${fromEmail}>`,
          to: normalizedEmail,
          subject: `${otp} is your GRN Portal verification code`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="margin-bottom: 24px; text-align: center;">
                <div style="display: inline-block; width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #4f46e5, #7c3aed); text-align: center; line-height: 44px; color: white; font-weight: bold; font-size: 20px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);">
                  G
                </div>
                <h2 style="color: #0f172a; margin-top: 16px; font-size: 22px; font-weight: 800; letter-spacing: -0.025em;">GRN Document Portal</h2>
              </div>
              
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
                Hello,
                <br /><br />
                We received a request to access your Goods Receipt Note (GRN) automation dashboard. Use the verification code below to log in. This code is valid for <strong>5 minutes</strong>.
              </p>
              
              <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 18px; text-align: center; margin-bottom: 24px;">
                <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 32px; font-weight: 800; letter-spacing: 0.15em; color: #4f46e5;">${otp}</span>
              </div>
              
              <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-bottom: 0; text-align: center;">
                If you did not request this code, you can safely ignore this email.
                <br />
                © 2026 GRN Automation Portal
              </p>
            </div>
          `
        })
      });

      if (res.ok) {
        console.log(`OTP successfully sent to ${normalizedEmail} via Resend!`);
        return { success: true, mock: false };
      } else {
        const errText = await res.text();
        console.error(`Resend API failed to send email: ${res.status} - ${errText}`);
      }
    } catch (err) {
      console.error(`Failed to send email to ${normalizedEmail} via Resend API:`, err);
    }
  }

  // 3. Demo Fallback Mode
  console.log('\n=============================================');
  console.log(`[DEMO AUTH MODE] OTP generated for user: ${normalizedEmail}`);
  console.log(`[DEMO AUTH OTP CODE]: ${otp}`);
  console.log('=============================================\n');
  return { success: true, mock: true };
}
