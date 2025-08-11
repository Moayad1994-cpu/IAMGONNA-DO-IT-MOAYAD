# I Am Gonna Do It - Static Website with Flask Backend

A modern, bilingual (English/Arabic) website for digital services company with AI chatbot integration and comprehensive service offerings.

## 🌟 Features

### Frontend Features
- **Bilingual Support**: Seamless switching between English and Arabic
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **3D Animations**: Interactive Three.js background with floating particles, cubes, and spheres
- **Dark/Light Mode**: Toggle between day and night themes
- **Service Portfolio**: 17 comprehensive digital services
- **AI Chatbot**: Google Gemini-powered intelligent assistant
- **Payment Integration**: Multiple payment methods (Coffee, Apple Pay, Credit Cards)
- **Service Request System**: Complete form with custom pricing options
- **User Authentication**: Sign up and sign in functionality
- **Real-time Stats**: Visitor counter and online users display

### Backend Features
- **Flask API**: RESTful API endpoints for all functionality
- **CORS Enabled**: Cross-origin requests supported
- **AI Integration**: Google Gemini API for chatbot responses
- **Service Management**: Complete CRUD operations for services
- **Payment Processing**: Coffee payment link generation
- **Request Handling**: Service request submission and tracking
- **Health Monitoring**: Health check and statistics endpoints

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone or download the files**
   ```bash
   # If you have the files, navigate to the directory
   cd static-website
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask server**
   ```bash
   python app.py
   ```

4. **Open your browser**
   - Navigate to: `http://localhost:5000`
   - The website will be fully functional with all features

## 📁 Project Structure

```
static-website/
├── index.html              # Main HTML file
├── styles.css              # Complete CSS styles
├── script.js               # JavaScript functionality
├── app.py                  # Flask backend server
├── requirements.txt        # Python dependencies
├── README.md              # This file
└── assets/                # Image assets
    ├── logo_english.png
    ├── logo_arabic.png
    ├── background_image_arabic.png
    ├── qr_code_payment.png
    └── service_*.png       # Service images
```

## 🔧 Configuration

### API Key Setup
1. **Google Gemini API Key**: 
   - The default API key is already configured in `app.py`
   - To change it, modify the `GEMINI_API_KEY` variable in `app.py`
   - Or configure it through the website's API key modal

2. **Company Information**:
   - Update the `COMPANY_INFO` dictionary in `app.py`
   - Modify contact details, social media links, and payment URLs

### Customization

#### Adding New Services
1. Edit the `SERVICES` array in `app.py`
2. Add corresponding service images to the `assets/` folder
3. Update the frontend `services` array in `script.js`

#### Changing Colors/Themes
1. Modify CSS variables in `styles.css` under `:root`
2. Update the color scheme for both light and dark modes

#### Language Support
1. Add new translations to the `translations` object in `script.js`
2. Update HTML elements with appropriate `data-en` and `data-ar` attributes

## 🌐 API Endpoints

### Public Endpoints
- `GET /` - Serve main website
- `GET /api/services` - Get all services
- `GET /api/company-info` - Get company information
- `GET /api/health` - Health check
- `GET /api/stats` - Website statistics

### Interactive Endpoints
- `POST /api/service-request` - Submit service request
- `POST /api/chat` - AI chatbot interaction
- `POST /api/payment/coffee` - Generate Coffee payment link

### Example API Usage

#### Submit Service Request
```bash
curl -X POST http://localhost:5000/api/service-request \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "serviceId": "website-design",
    "projectDescription": "Need a modern website",
    "customAmount": 350
  }'
```

#### Chat with AI
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What services do you offer?",
    "language": "en",
    "api_key": "your-gemini-api-key"
  }'
```

## 💳 Payment Integration

### Coffee Payment
- Integrated with https://coff.ee/moayad_dughmosh
- Automatic amount calculation
- Secure payment processing

### Apple Pay
- Ready for integration (requires domain verification)
- Mobile-optimized payment flow

### Credit Cards
- Stripe integration ready
- Secure payment processing

## 📱 Mobile Optimization

- **Touch-friendly interface**
- **Responsive grid layouts**
- **Mobile-optimized modals**
- **Swipe gestures support**
- **Fast loading on mobile networks**

## 🔒 Security Features

- **CORS protection**
- **Input validation**
- **Error handling**
- **API key management**
- **Secure payment processing**

## 🚀 Deployment Options

### 1. Local Development
```bash
python app.py
# Access at http://localhost:5000
```

### 2. Production Deployment

#### Using Gunicorn (Recommended)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

#### Using Docker
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

#### Cloud Platforms
- **Heroku**: Ready for deployment with Procfile
- **AWS**: Compatible with Elastic Beanstalk
- **Google Cloud**: App Engine ready
- **DigitalOcean**: App Platform compatible

### 3. Static Hosting (Frontend Only)
For static hosting without backend functionality:
- Upload `index.html`, `styles.css`, `script.js`, and `assets/` folder
- Configure API key in the browser
- Limited functionality (no server-side features)

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change port in app.py or use environment variable
   export PORT=8000
   python app.py
   ```

2. **API key not working**
   - Verify Google Cloud project has Generative AI API enabled
   - Check API key permissions and quotas
   - Ensure billing is enabled in Google Cloud

3. **CORS errors**
   - Flask-CORS is already configured
   - Check if requests are coming from correct origin

4. **Images not loading**
   - Verify all images are in the `assets/` folder
   - Check file paths and permissions

### Performance Optimization

1. **Enable caching**
   ```python
   # Add to app.py
   from flask import make_response
   
   @app.after_request
   def after_request(response):
       response.headers['Cache-Control'] = 'public, max-age=300'
       return response
   ```

2. **Compress images**
   - Optimize PNG/JPG files for web
   - Use WebP format for better compression

3. **Minify assets**
   - Minify CSS and JavaScript for production
   - Use CDN for external libraries

## 📞 Support

### Contact Information
- **Email**: moayaddughmosh@gmail.com
- **Phone**: +971545489973
- **Location**: Abu Dhabi, Yas Island
- **Instagram**: [@moayad_dughmosh](https://www.instagram.com/moayad_dughmosh/)
- **TikTok**: [@moayad99940](https://www.tiktok.com/@moayad99940?lang=en)

### Technical Support
For technical issues or customization requests, please contact us through the website's contact form or directly via email.

## 📄 License

© 2025 I Am Gonna Do It. All rights reserved.
Powered by AI.

---

**Ready to launch your digital presence? Start the server and explore all the features!** 🚀

