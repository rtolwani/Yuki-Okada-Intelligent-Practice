# Dr. Yuki Okada Veterinary Nutrition Practice

A modern, AI-powered website for Dr. Yuki Okada's veterinary nutrition consultation practice. This platform streamlines the consultation process between referring veterinarians and Dr. Okada through automated case analysis and AI-powered guidance.

## Features

### 🚀 Core Functionality
- **PDF Case Record Upload**: AI-powered analysis and summarization of patient records
- **AI Veterinary Consultant**: Intelligent chatbot for nutritional guidance (ElevenLabs integration ready)
- **Consultation Scheduling**: Calendar system for booking phone/video consultations
- **Professional Bio**: Comprehensive information about Dr. Okada's credentials and expertise

### 🤖 AI Integration
- **ElevenLabs Agent**: Ready for integration with agent ID: `agent_01jz667k14eq29kxw3b0mxmjn9`
- **PDF Analysis**: Automated case record processing and summarization
- **Smart Responses**: Context-aware nutritional guidance based on user queries

### 📱 Modern Design
- **Responsive Layout**: Mobile-first design that works on all devices
- **Professional UI**: Clean, medical-grade interface suitable for veterinary professionals
- **Accessibility**: WCAG compliant design with proper contrast and navigation

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **File Handling**: React Dropzone for PDF uploads
- **Calendar**: Custom scheduling component
- **AI Integration**: ElevenLabs API ready

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dr-yuki-okada-nutrition
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Add Dr. Okada's photo**
   - Place the professional headshot image in `public/dr-yuki-okada.jpg`
   - Ensure the image is high-quality and professional

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage component
├── components/             # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section with photo
│   ├── Services.tsx       # Services overview
│   ├── PDFUploader.tsx    # PDF upload component
│   ├── AIConsultant.tsx   # AI chatbot component
│   ├── CalendarScheduler.tsx # Consultation booking
│   ├── About.tsx          # Dr. Okada's bio
│   ├── Contact.tsx        # Contact form and info
│   └── Footer.tsx         # Site footer
├── public/                 # Static assets
│   └── dr-yuki-okada.jpg  # Professional photo
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Configuration

### ElevenLabs Integration
To enable the AI consultant functionality:

1. **Set up API endpoint** in `components/AIConsultant.tsx`:
   ```typescript
   const response = await fetch('/api/elevenlabs-chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ 
       message: inputText,
       agentId: 'agent_01jz667k14eq29kxw3b0mxmjn9'
     })
   })
   ```

2. **Create API route** in `app/api/elevenlabs-chat/route.ts`:
   ```typescript
   export async function POST(request: Request) {
     // Implement ElevenLabs API integration
     // Handle authentication and agent communication
   }
   ```

### PDF Processing
For production PDF analysis:

1. **Implement backend processing** for PDF text extraction
2. **Add AI summarization** using OpenAI or similar services
3. **Set up secure file storage** for uploaded documents

## Customization

### Colors and Branding
Modify `tailwind.config.js` to update the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize primary colors
      },
      accent: {
        // Customize accent colors
      }
    }
  }
}
```

### Content Updates
- **Bio information**: Update `components/About.tsx`
- **Contact details**: Modify `components/Contact.tsx`
- **Services**: Edit `components/Services.tsx`

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deployment Options
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative deployment platform
- **AWS/GCP**: For enterprise deployments

## Security Considerations

- **HIPAA Compliance**: Ensure all patient data handling meets HIPAA requirements
- **File Upload Security**: Implement proper file validation and virus scanning
- **Data Encryption**: Use HTTPS and encrypt sensitive information
- **Access Control**: Implement proper authentication for veterinary professionals

## Future Enhancements

- **Real-time Chat**: WebSocket integration for live consultations
- **Video Integration**: Built-in video calling capabilities
- **Patient Portal**: Secure access for case history and reports
- **Mobile App**: Native mobile application for veterinarians
- **Analytics Dashboard**: Case tracking and outcome analytics

## Support

For technical support or questions about the platform:
- **Email**: technical-support@veterinarynutrition.com
- **Documentation**: [Link to detailed documentation]
- **Issues**: [GitHub issues page]

## License

This project is proprietary software developed for Dr. Yuki Okada's veterinary nutrition practice.

---

**Built with ❤️ for advancing veterinary nutrition care through technology**
