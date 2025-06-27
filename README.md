# CLO Landing Page 🎤

A beautiful, animated landing page for CLO - your voice-first AI confidant for deeper relationships and self-awareness.

## ✨ Features

- **Stunning Animations**: Smooth scroll animations and hover effects using Framer Motion
- **Email Collection**: Collect beta tester emails with automatic welcome emails
- **Responsive Design**: Beautiful on all devices
- **Modern UI**: Glass morphism effects and gradient backgrounds
- **Email Storage**: All collected emails saved to `server/emails.txt`

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and install dependencies:**

```bash
npm run install-all
```

2. **Set up email configuration:**

   - Copy `env.example` to `.env`
   - Add your Gmail credentials:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     ```
   - Note: Use Gmail App Password, not your regular password

3. **Start the development server:**

```bash
npm run dev
```

This will start both the React frontend (port 3000) and Node.js backend (port 5000).

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── public/            # Static files
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Express server
│   └── emails.txt        # Collected emails (auto-generated)
├── package.json          # Root package.json
└── README.md
```

## 🎨 Components

- **Hero**: Main headline and CTA
- **How It Works**: 3-step process explanation
- **Why CLO**: Features and testimonials
- **Use Cases**: Different scenarios for using CLO
- **Email Collection**: Beta signup form
- **CTA**: Final call-to-action

## 📧 Email Collection

The landing page collects emails through a beautiful form that:

- Validates email format
- Prevents duplicate submissions
- Sends welcome emails automatically
- Stores emails in `server/emails.txt`

### View Collected Emails

Visit `http://localhost:5000/api/emails` to see all collected emails.

## 🎯 Key Features

### Animations

- Smooth scroll-triggered animations
- Floating orbs in hero section
- Hover effects on cards and buttons
- Loading spinners and transitions

### Design

- Glass morphism effects
- Gradient backgrounds
- Modern typography (Inter font)
- Responsive grid layouts

### Functionality

- Email validation and storage
- Automatic welcome emails
- Duplicate email prevention
- Error handling and user feedback

## 🔧 Customization

### Adding Assets

Place your logo and voiceorb files in:

- `client/public/assets/logo.png`
- `client/public/assets/voiceorb.json`

### Styling

- Main styles: `client/src/index.css`
- Component styles: `client/src/components.css`
- Global animations and utilities included

### Content

All content is in the component files. Update the text in:

- `client/src/components/Hero.js`
- `client/src/components/HowItWorks.js`
- `client/src/components/WhyCLO.js`
- `client/src/components/UseCases.js`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Backend

The backend can be deployed to:

- Heroku
- Vercel
- Railway
- Any Node.js hosting platform

### Environment Variables

Make sure to set these in production:

- `EMAIL_USER`
- `EMAIL_PASS`
- `PORT` (optional, defaults to 5000)

## 📱 Mobile Responsive

The landing page is fully responsive with:

- Mobile-first design
- Touch-friendly buttons
- Optimized typography
- Flexible grid layouts

## 🎨 Color Scheme

- Primary: `#667eea` to `#764ba2` (gradient)
- Background: Purple gradient
- Text: White with opacity variations
- Accents: Blue and purple tones

## 🔗 Links

- **Main CTA**: Links to `heyclo.com`
- **Email Collection**: Stores emails locally
- **Welcome Email**: Sent automatically to new subscribers

## 📊 Analytics

To add analytics, you can:

1. Add Google Analytics to `client/public/index.html`
2. Track form submissions
3. Monitor email collection rates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this for your own projects!

---

**Built with ❤️ for CLO - Talk It Out. Grow Closer.**
