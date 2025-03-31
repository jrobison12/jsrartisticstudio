import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    console.log('Received form data:', formData);
    
    // Check if Gmail is properly configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || 
        process.env.GMAIL_APP_PASSWORD === 'your_16_character_app_password_here') {
      console.log('Email not configured - storing submission locally');
      
      // For now, just log the submission and return success
      // This is a temporary solution until email is configured
      console.log('Commission Request Details:');
      console.log('---------------------------');
      console.log(`Name: ${formData.firstName} ${formData.lastName}`);
      console.log(`Email: ${formData.email}`);
      console.log(`Phone: ${formData.phone}`);
      console.log(`Medium: ${formData.medium}`);
      console.log(`Size: ${formData.size}`);
      console.log(`Subjects: ${formData.subjects}`);
      console.log(`Style: ${formData.style}`);
      console.log(`Background: ${formData.background}`);
      console.log(`Description: ${formData.description || 'No additional details provided.'}`);
      
      return NextResponse.json({ 
        message: 'Commission request received! We will contact you soon. (Note: Email delivery is temporarily disabled)',
        success: true 
      });
    }

    // If Gmail is configured, proceed with email sending
    console.log('Creating email transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Format the email content
    const emailContent = `
      New Commission Request
      
      Contact Information:
      -------------------
      Name: ${formData.firstName} ${formData.lastName}
      Email: ${formData.email}
      Phone: ${formData.phone}
      
      Portrait Details:
      ---------------
      Medium: ${formData.medium}
      Size: ${formData.size}
      Number of Subjects: ${formData.subjects}
      Portrait Style: ${formData.style}
      Background Style: ${formData.background}
      
      Additional Details:
      -----------------
      ${formData.description || 'No additional details provided.'}
    `;

    try {
      // Send email
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: 'New Portrait Commission Request',
        text: emailContent,
        priority: 'high',
        headers: {
          'Importance': 'high',
          'Priority': 'urgent',
          'X-Priority': '1'
        }
      });
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      throw new Error('Unable to send email. Your request has been logged, and we will contact you soon.');
    }

    return NextResponse.json({ 
      message: 'Commission request submitted successfully! We will contact you soon.',
      success: true 
    });
    
  } catch (error) {
    console.error('Detailed error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error
    });

    return NextResponse.json(
      { 
        message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.',
        success: false 
      },
      { status: 500 }
    );
  }
} 