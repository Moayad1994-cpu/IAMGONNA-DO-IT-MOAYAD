import os
import json
import requests
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder='.', template_folder='.')
CORS(app)  # Enable CORS for all routes

# Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

# Company information
COMPANY_INFO = {
    "name_en": "I Am Gonna Do It",
    "name_ar": "انا استطيع فعل اي شي",
    "location": "Abu Dhabi, Yas Island",
    "email": "moayaddughmosh@gmail.com",
    "phone": "+971545489973",
    "instagram": "https://www.instagram.com/moayad_dughmosh/",
    "tiktok": "https://www.tiktok.com/@moayad99940?lang=en",
    "coffee_payment": "https://coff.ee/moayad_dughmosh"
}

# خدمات الموقع
SERVICES = [
    {
        "id": "website-design",
        "name_en": "Website Design",
        "name_ar": "تصميم المواقع",
        "description_en": "Professional responsive websites with modern design and optimal user experience",
        "description_ar": "مواقع إلكترونية احترافية متجاوبة مع تصميم حديث وتجربة مستخدم مثلى",
        "price": 299,
        "image": "https://placehold.co/400x300/1dbacf/ffffff?text=Website+Design"
    },
    {
        "id": "app-development",
        "name_en": "Professional Application Development",
        "name_ar": "تطوير التطبيقات الاحترافية",
        "description_en": "Custom mobile and web applications built with cutting-edge technology",
        "description_ar": "تطبيقات جوال ويب مخصصة مبنية بأحدث التقنيات",
        "price": 499,
        "image": "https://placehold.co/400x300/11bcff/ffffff?text=App+Development"
    },
    {
        "id": "cv-creation",
        "name_en": "Professional CV Creation (ATS System)",
        "name_ar": "إنشاء السيرة الذاتية الاحترافية (نظام ATS)",
        "description_en": "ATS-optimized resumes that pass automated screening systems",
        "description_ar": "سير ذاتية محسنة لأنظمة ATS تجتاز أنظمة الفحص الآلي",
        "price": 99,
        "image": "https://placehold.co/400x300/ec4899/ffffff?text=CV+Creation"
    },
    {
        "id": "graphic-design",
        "name_en": "Graphic Design, Logo Creation, Advertising and Poster Design",
        "name_ar": "التصميم الجرافيكي وإنشاء الشعارات والإعلانات والملصقات",
        "description_en": "Creative visual designs for branding, marketing, and promotional materials",
        "description_ar": "تصاميم بصرية إبداعية للعلامة التجارية والتسويق والمواد الترويجية",
        "price": 199,
        "image": "https://placehold.co/400x300/10b981/ffffff?text=Graphic+Design"
    },
    {
        "id": "ui-ux-design",
        "name_en": "Website Interface Design",
        "name_ar": "تصميم واجهات المواقع",
        "description_en": "User-centered interface design for optimal user experience",
        "description_ar": "تصميم واجهات محورها المستخدم لتجربة مستخدم مثلى",
        "price": 349,
        "image": "https://placehold.co/400x300/f59e0b/ffffff?text=UI/UX+Design"
    },
    {
        "id": "engineering-drawing",
        "name_en": "Engineering Drawing",
        "name_ar": "الرسم الهندسي",
        "description_en": "Technical drawings and blueprints for engineering projects",
        "description_ar": "رسوم تقنية ومخططات للمشاريع الهندسية",
        "price": 149,
        "image": "https://placehold.co/400x300/ef4444/ffffff?text=Engineering+Drawing"
    },
    {
        "id": "ai-models",
        "name_en": "AI Models and Systems",
        "name_ar": "نماذج وأنظمة الذكاء الاصطناعي",
        "description_en": "Custom AI solutions and machine learning models for your business",
        "description_ar": "حلول ذكاء اصطناعي مخصصة ونماذج تعلم آلي لأعمالك",
        "price": 799,
        "image": "https://placehold.co/400x300/1f2937/ffffff?text=AI+Models"
    },
    {
        "id": "video-production",
        "name_en": "Advertising Videos and Project Filming",
        "name_ar": "فيديوهات إعلانية وتصوير المشاريع",
        "description_en": "Professional video production for marketing and promotional content",
        "description_ar": "إنتاج فيديو احترافي للتسويق والمحتوى الترويجي",
        "price": 599,
        "image": "https://placehold.co/400x300/6b7280/ffffff?text=Video+Production"
    },
    {
        "id": "presentation-creation",
        "name_en": "Professional Presentation Creation",
        "name_ar": "إنشاء العروض التقديمية الاحترافية",
        "description_en": "Engaging presentations that captivate your audience",
        "description_ar": "عروض تقديمية جذابة تأسر جمهورك",
        "price": 149,
        "image": "https://placehold.co/400x300/7d8388/ffffff?text=Presentations"
    },
    {
        "id": "ai-automation",
        "name_en": "AI Agent Automation",
        "name_ar": "أتمتة وكلاء الذكاء الاصطناعي",
        "description_en": "Intelligent automation solutions to streamline your business processes",
        "description_ar": "حلول أتمتة ذكية لتبسيط عمليات أعمالك",
        "price": 699,
        "image": "https://placehold.co/400x300/d1d5db/ffffff?text=AI+Automation"
    },
    {
        "id": "brochure-design",
        "name_en": "Brochure Design",
        "name_ar": "تصميم البروشورات",
        "description_en": "Professional brochures that effectively communicate your message",
        "description_ar": "بروشورات احترافية تنقل رسالتك بفعالية",
        "price": 179,
        "image": "https://placehold.co/400x300/111827/ffffff?text=Brochure+Design"
    },
    {
        "id": "marketing-social-media",
        "name_en": "Marketing and Social Media",
        "name_ar": "التسويق ووسائل التواصل الاجتماعي",
        "description_en": "Comprehensive digital marketing strategies and social media management",
        "description_ar": "استراتيجيات تسويق رقمي شاملة وإدارة وسائل التواصل الاجتماعي",
        "price": 399,
        "image": "https://placehold.co/400x300/1f2937/ffffff?text=Marketing"
    },
    {
        "id": "podcast-recording",
        "name_en": "Podcast Recording",
        "name_ar": "تسجيل البودكاست",
        "description_en": "Professional podcast recording and production services",
        "description_ar": "خدمات تسجيل وإنتاج البودكاست الاحترافية",
        "price": 249,
        "image": "https://placehold.co/400x300/374151/ffffff?text=Podcast+Recording"
    },
    {
        "id": "studio-photography",
        "name_en": "Studio Photography",
        "name_ar": "التصوير الاستوديو",
        "description_en": "High-quality studio photography for portraits and products",
        "description_ar": "تصوير استوديو عالي الجودة للصور الشخصية والمنتجات",
        "price": 199,
        "image": "https://placehold.co/400x300/1dbacf/ffffff?text=Studio+Photography"
    },
    {
        "id": "product-photography",
        "name_en": "Product Photography",
        "name_ar": "تصوير المنتجات",
        "description_en": "Professional product photography for e-commerce and marketing",
        "description_ar": "تصوير منتجات احترافي للتجارة الإلكترونية والتسويق",
        "price": 179,
        "image": "https://placehold.co/400x300/11bcff/ffffff?text=Product+Photography"
    },
    {
        "id": "video-filming",
        "name_en": "Video Filming for Projects, Seminars, and Graduations",
        "name_ar": "تصوير فيديو للمشاريع والندوات والتخرج",
        "description_en": "Professional event videography for special occasions",
        "description_ar": "تصوير فيديو احترافي للفعاليات والمناسبات الخاصة",
        "price": 399,
        "image": "https://placehold.co/400x300/ec4899/ffffff?text=Video+Filming"
    },
    {
        "id": "ai-task-completion",
        "name_en": "AI Task Completion",
        "name_ar": "إنجاز المهام بالذكاء الاصطناعي",
        "description_en": "Automated task completion using advanced AI technologies",
        "description_ar": "إنجاز المهام الآلي باستخدام تقنيات الذكاء الاصطناعي المتقدمة",
        "price": 599,
        "image": "https://placehold.co/400x300/10b981/ffffff?text=AI+Task+Completion"
    }
]

service_requests = []
chat_history = []

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/api/services')
def get_services():
    return jsonify({
        "success": True,
        "services": SERVICES
    })

@app.route('/api/company-info')
def get_company_info():
    return jsonify({
        "success": True,
        "company": COMPANY_INFO
    })

@app.route('/api/service-request', methods=['POST'])
def submit_service_request():
    try:
        data = request.get_json()
        required_fields = ['fullName', 'email', 'phone', 'serviceId', 'projectDescription']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    "success": False,
                    "error": f"Missing required field: {field}"
                }), 400
        
        service = next((s for s in SERVICES if s['id'] == data['serviceId']), None)
        if not service:
            return jsonify({
                "success": False,
                "error": "Invalid service ID"
            }), 400
        
        custom_amount = data.get('customAmount')
        final_price = float(custom_amount) if custom_amount else service['price']
        service_request = {
            "id": len(service_requests) + 1,
            "timestamp": datetime.now().isoformat(),
            "client": {
                "name": data['fullName'],
                "email": data['email'],
                "phone": data['phone'],
                "company": data.get('company', '')
            },
            "service": {
                "id": service['id'],
                "name_en": service['name_en'],
                "name_ar": service['name_ar'],
                "base_price": service['price'],
                "final_price": final_price
            },
            "project": {
                "description": data['projectDescription'],
                "timeline": data.get('timeline', ''),
                "custom_amount": custom_amount
            },
            "status": "pending"
        }
        service_requests.append(service_request)
        return jsonify({
            "success": True,
            "message": "Service request submitted successfully",
            "request_id": service_request['id'],
            "final_price": final_price
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/chat', methods=['POST'])
def chat_with_ai():
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        language = data.get('language', 'en')
        api_key = data.get('api_key', GEMINI_API_KEY)
        
        if not message:
            return jsonify({
                "success": False,
                "error": "Message is required"
            }), 400
        
        if not api_key:
            return jsonify({
                "success": False,
                "error": "API key is required"
            }), 400
        
        if language == 'ar':
            system_prompt = f"""أنت مساعد ذكي لشركة "{COMPANY_INFO['name_ar']}" الموجودة في {COMPANY_INFO['location']}. نحن نقدم خدمات رقمية متنوعة بما في ذلك تصميم المواقع، تطوير التطبيقات، السيرة الذاتية، التصميم الجرافيكي، وغيرها من الخدمات. يمكن للعملاء الدفع عبر Coffee، Apple Pay، أو بطاقات الائتمان. للتواصل: {COMPANY_INFO['email']} أو {COMPANY_INFO['phone']}. أجب بالعربية بطريقة مفيدة ومهنية."""
        else:
            system_prompt = f"""You are an AI assistant for "{COMPANY_INFO['name_en']}" company located in {COMPANY_INFO['location']}. We offer various digital services including Website Design, App Development, CV Creation, Graphic Design, and more. Customers can pay via Coffee, Apple Pay, or credit cards. Contact: {COMPANY_INFO['email']} or {COMPANY_INFO['phone']}. Respond helpfully and professionally in English."""
        
        headers = {
            'Content-Type': 'application/json',
        }
        payload = {
            "contents": [{
                "parts": [{
                    "text": f"{system_prompt}\n\nUser: {message}"
                }]
            }]
        }
        response = requests.post(
            f"{GEMINI_API_URL}?key={api_key}",
            headers=headers,
            json=payload,
            timeout=30
        )
        
        if response.status_code != 200:
            return jsonify({
                "success": False,
                "error": "Failed to get response from AI service"
            }), 500
        
        response_data = response.json()
        if 'candidates' not in response_data or not response_data['candidates']:
            return jsonify({
                "success": False,
                "error": "No response from AI service"
            }), 500
        
        ai_response = response_data['candidates'][0]['content']['parts'][0]['text']
        chat_entry = {
            "timestamp": datetime.now().isoformat(),
            "user_message": message,
            "ai_response": ai_response,
            "language": language
        }
        chat_history.append(chat_entry)
        return jsonify({
            "success": True,
            "response": ai_response
        })
    except requests.exceptions.Timeout:
        return jsonify({
            "success": False,
            "error": "Request timeout. Please try again."
        }), 500
    except requests.exceptions.RequestException as e:
        return jsonify({
            "success": False,
            "error": "Network error. Please check your connection."
        }), 500
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/payment/coffee', methods=['POST'])
def process_coffee_payment():
    try:
        data = request.get_json()
        amount = data.get('amount', 0)
        if amount <= 0:
            return jsonify({
                "success": False,
                "error": "Invalid amount"
            }), 400
        payment_url = f"{COMPANY_INFO['coffee_payment']}?amount={amount}"
        return jsonify({
            "success": True,
            "payment_url": payment_url,
            "message": "Redirecting to Coffee payment..."
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/send-email', methods=['POST'])
def send_to_email():
    try:
        data = request.get_json()
        
        # Extract form data
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        service = data.get('service', '')
        description = data.get('description', '')
        timeline = data.get('timeline', '')
        amount = data.get('amount', '')
        company = data.get('company', '')
        
        # Email configuration
        sender_email = os.getenv("EMAIL_USER")
        sender_password = os.getenv("EMAIL_PASSWORD")
        receiver_email = "moayaddughmosh@gmail.com"
        
        # Create email content
        subject = "طلب خدمة جديد من الموقع - I Am Gonna Do It"
        
        html_content = f"""
        <html>
        <body>
            <h2>طلب خدمة جديد</h2>
            <table border="0" cellpadding="10" cellspacing="0" style="font-family: Arial; font-size: 14px;">
                <tr>
                    <td><strong>اسم العميل:</strong></td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td><strong>البريد الإلكتروني:</strong></td>
                    <td>{email}</td>
                </tr>
                <tr>
                    <td><strong>رقم الهاتف:</strong></td>
                    <td>{phone}</td>
                </tr>
                <tr>
                    <td><strong>الشركة:</strong></td>
                    <td>{company}</td>
                </tr>
                <tr>
                    <td><strong>الخدمة المطلوبة:</strong></td>
                    <td>{service}</td>
                </tr>
                <tr>
                    <td><strong>القيمة:</strong></td>
                    <td>${amount}</td>
                </tr>
                <tr>
                    <td><strong>الجدول الزمني:</strong></td>
                    <td>{timeline}</td>
                </tr>
                <tr>
                    <td><strong>وصف المشروع:</strong></td>
                    <td>{description}</td>
                </tr>
            </table>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
                تم إرسال هذا الطلب عبر موقع "I Am Gonna Do It" في {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
            </p>
        </body>
        </html>
        """
        
        # Create message
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = subject
        message.attach(MIMEText(html_content, "html"))
        
        # Send email
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        server.quit()
        
        return jsonify({"success": True, "message": "Email sent successfully"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/stats')
def get_stats():
    return jsonify({
        "success": True,
        "stats": {
            "total_requests": len(service_requests),
            "total_chats": len(chat_history),
            "services_count": len(SERVICES),
            "last_updated": datetime.now().isoformat()
        }
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        "success": True,
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Flask server on port {port}...")
    print(f"Website will be available at: http://localhost:{port}")
    print(f"API endpoints available at: http://localhost:{port}/api/")
    app.run(
        host='0.0.0.0',
        port=port,
        debug=True,
        threaded=True
    )