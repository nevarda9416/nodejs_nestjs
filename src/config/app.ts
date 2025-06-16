export default {
  jwt: {
    secretOrKey: 'SECRET_KEY',
    expiresIn: 86400, // 24 hours
  },
  // You can also use any other email sending services
  mail: {
    service: {
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      user: 'apikey',
      pass: '__SENDGRID_API_KEY__', // Replace with your SendGrid API key,
    },
    senderCredentials: {
      name: '__SENDER_NAME__', // Replace with your sender name,
      email: '__SENDER_EMAIL__', // Replace with your sender email,
    },
  },
  // these are used in the mail templates
  project: {
    name: '__PROJECT_NAME__', // Replace with your project name,
    address: '__PROJECT_ADDRESS__', // Replace with your project address,
    logoUrl: 'https://__PROJECT_LOGO_URL__', // Replace with your project logo URL,
    slogan: 'Made in Japan', // Replace with your project slogan,
    color: '#123456', // Replace with your project color,
    socials: [
      ['Github', '__GITHUB_URL__'], // Replace with your Github URL
      ['Twitter', '__TWITTER_URL__'], // Replace with your Twitter URL
      ['Facebook', '__FACEBOOK_URL__'], // Replace with your Facebook URL
      ['LinkedIn', '__LINKEDIN_URL__'], // Replace with your LinkedIn URL
    ],
    url: 'http://localhost:4200/',
    mailVerificationUrl: 'http://localhost:3000/auth/verify',
    mailChangeUrl: 'http://localhost:3000/auth/change-email',
    resetPasswordUrl: 'http://localhost:4200/auth/reset-password',
    termsOfServiceUrl: 'http://localhost:4200/legal/terms',
  },
};
