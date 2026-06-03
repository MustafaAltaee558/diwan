import React from 'react';
import { Play, Sparkles, TrendingUp, CheckCircle, Smartphone } from 'lucide-react';

export default function Hero({ onStartDemo, onExploreFeatures }) {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Right side - Text Details */}
        <div className="hero-text-content">
          <div className="badge-wrapper animate-fade-in">
            <span className="badge badge-primary">
              <Sparkles size={14} />
              شريكك التقني الرقمي الأول في العراق والشرق الأوسط
            </span>
          </div>

          <h1 className="hero-title animate-slide-in">
            ديوان – التكنولوجيا <br />
            <span className="gradient-text-primary">الذكية للمطاعم الحديثة</span>
          </h1>

          <p className="hero-description animate-slide-in" style={{ animationDelay: '0.1s' }}>
            نظام SaaS سحابي متكامل يساعدك على إدارة مطعمك، زيادة أرباحك، وتقليل التكاليف التشغيلية. نوفر لك القوائم الرقمية الذكية (QR Menu)، أنظمة نقاط البيع الفائقة (POS)، وتتبع الفروع، مع أدوات تسويق ذكية مدعومة بالذكاء الاصطناعي.
          </p>

          <div className="hero-actions animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <button onClick={onStartDemo} className="btn btn-primary btn-lg">
              <Play size={18} fill="currentColor" />
              جرب المحاكي الحي للنظام
            </button>
            <button onClick={onExploreFeatures} className="btn btn-secondary btn-lg">
              استكشف الخدمات
            </button>
          </div>

          <div className="hero-stats animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="stat-item">
              <span className="stat-num en-font">+500</span>
              <span className="stat-label">مطعم مسجل</span>
            </div>
            <div className="stat-border"></div>
            <div className="stat-item">
              <span className="stat-num en-font">99.9%</span>
              <span className="stat-label">نسبة جهوزية النظام</span>
            </div>
            <div className="stat-border"></div>
            <div className="stat-item">
              <span className="stat-num en-font">+1.5M</span>
              <span className="stat-label">طلب ناجح</span>
            </div>
          </div>
        </div>

        {/* Left side - 3D Floating Mockups */}
        <div className="hero-visuals animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {/* Main Visual Frame - Interactive Card Glow */}
          <div className="main-visual-glow"></div>

          {/* Floating Card 1: Active POS Invoice */}
          <div className="floating-card pos-card animate-float">
            <div className="card-header">
              <div className="dot green-dot"></div>
              <span className="card-title">نظام كاشير ديوان (POS)</span>
            </div>
            <div className="card-body">
              <div className="invoice-row">
                <span className="invoice-item-name">وجبة كباب عراقي ×2</span>
                <span className="invoice-price en-font">24,000 د.ع</span>
              </div>
              <div className="invoice-row">
                <span className="invoice-item-name">سلاطة + بيبسي ×2</span>
                <span className="invoice-price en-font">6,000 د.ع</span>
              </div>
              <div className="card-divider"></div>
              <div className="invoice-row total-row">
                <span>الإجمالي</span>
                <span className="invoice-total en-font">30,000 د.ع</span>
              </div>
              <div className="invoice-status">
                <CheckCircle size={14} className="success-icon" />
                <span>تم الدفع وطباعة الفاتورة</span>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Sales tracking / Analytics */}
          <div className="floating-card sales-card animate-float" style={{ animationDelay: '2s' }}>
            <div className="card-header">
              <TrendingUp size={16} className="trend-icon" />
              <span className="card-title">تتبع المبيعات اليومية</span>
            </div>
            <div className="card-body">
              <div className="sales-growth">
                <span className="growth-percent en-font">+42.8%</span>
                <span className="growth-label">أعلى من الأسبوع الماضي</span>
              </div>
              <div className="mini-chart">
                <div className="chart-bar" style={{ height: '30%' }}></div>
                <div className="chart-bar" style={{ height: '55%' }}></div>
                <div className="chart-bar" style={{ height: '45%' }}></div>
                <div className="chart-bar" style={{ height: '75%' }}></div>
                <div className="chart-bar active-bar" style={{ height: '90%' }}></div>
              </div>
            </div>
          </div>

          {/* Floating Card 3: QR Ordering */}
          <div className="floating-card qr-card animate-float" style={{ animationDelay: '4s' }}>
            <div className="card-header">
              <Smartphone size={16} className="phone-icon" />
              <span className="card-title">طاولة رقم 7 (QR Menu)</span>
            </div>
            <div className="card-body">
              <div className="order-ticket">
                <span className="ticket-item">شاورما لحم ديوان (خبز صاج)</span>
                <span className="ticket-note">بدون مخلل - ثوم إضافي</span>
              </div>
              <div className="ticket-status-badge">
                <span className="pulse-dot"></span>
                <span>يرسل إلى شاشة المطبخ...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 160px;
          padding-bottom: 100px;
          position: relative;
          overflow: hidden;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        .hero-text-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: right;
        }

        .badge-wrapper {
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .hero-description {
          font-size: 1.15rem;
          color: var(--text-gray);
          line-height: 1.8;
          max-width: 600px;
          margin-bottom: 40px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }

        .btn-lg {
          padding: 14px 32px;
          font-size: 1.05rem;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          padding: 16px 28px;
          border-radius: 16px;
          backdrop-filter: blur(8px);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-num {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary);
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-gray);
          font-weight: 500;
          margin-top: 4px;
        }

        .stat-border {
          width: 1px;
          height: 40px;
          background: var(--border-light);
        }

        /* Hero Visuals Section */
        .hero-visuals {
          position: relative;
          height: 480px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-visual-glow {
          position: absolute;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
          filter: blur(20px);
          z-index: 0;
          pointer-events: none;
        }

        .floating-card {
          position: absolute;
          width: 280px;
          background: rgba(13, 20, 35, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: all var(--transition-normal);
          z-index: 1;
        }
        
        .floating-card:hover {
          transform: scale(1.03) translateY(-5px) !important;
          border-color: var(--primary-glow);
          box-shadow: 0 25px 50px rgba(245, 158, 11, 0.1), 0 20px 40px rgba(0, 0, 0, 0.6);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .card-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .green-dot {
          background-color: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .card-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* Card Positioning */
        .pos-card {
          top: 10px;
          right: 10px;
          border-color: rgba(16, 185, 129, 0.2);
        }

        .sales-card {
          bottom: 20px;
          right: 80px;
          border-color: rgba(245, 158, 11, 0.2);
        }

        .qr-card {
          top: 140px;
          left: 10px;
          border-color: rgba(6, 182, 212, 0.2);
        }

        /* Invoice Styles */
        .invoice-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-gray);
        }

        .invoice-item-name {
          font-weight: 500;
        }

        .invoice-price {
          color: var(--text-white);
          font-weight: 600;
        }

        .card-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 4px 0;
        }

        .total-row {
          color: var(--primary-light);
          font-weight: 750;
          font-size: 0.95rem;
        }

        .invoice-total {
          font-size: 1.05rem;
        }

        .invoice-status {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--success);
          font-size: 0.8rem;
          font-weight: 600;
          margin-top: 4px;
          background: rgba(16, 185, 129, 0.08);
          padding: 6px 10px;
          border-radius: 8px;
        }

        .success-icon {
          flex-shrink: 0;
        }

        /* Sales Card Styles */
        .trend-icon {
          color: var(--primary);
        }

        .sales-growth {
          display: flex;
          flex-direction: column;
        }

        .growth-percent {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
        }

        .growth-label {
          font-size: 0.75rem;
          color: var(--text-gray);
        }

        .mini-chart {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 60px;
          margin-top: 8px;
        }

        .chart-bar {
          flex: 1;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          transition: all var(--transition-normal);
        }

        .active-bar {
          background: linear-gradient(to top, var(--primary-dark), var(--primary));
          box-shadow: 0 0 10px var(--primary-glow);
        }

        /* QR Card Styles */
        .phone-icon {
          color: var(--secondary);
        }

        .order-ticket {
          background: rgba(255, 255, 255, 0.03);
          border-left: 2px solid var(--secondary);
          padding: 8px 12px;
          border-radius: 0 8px 8px 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ticket-item {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-white);
        }

        .ticket-note {
          font-size: 0.7rem;
          color: var(--primary-light);
        }

        .ticket-status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-gray);
          margin-top: 4px;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          background-color: var(--secondary);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--secondary);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* Responsive Settings */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          
          .hero-text-content {
            align-items: center;
            text-align: center;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
            width: 100%;
          }

          .hero-visuals {
            height: 420px;
          }
          
          .pos-card {
            right: 5%;
          }
          
          .sales-card {
            right: 25%;
          }
          
          .qr-card {
            left: 5%;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 2.6rem;
          }
          
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .btn-lg {
            width: 100%;
          }

          .hero-stats {
            flex-direction: column;
            gap: 16px;
          }

          .stat-border {
            width: 80%;
            height: 1px;
          }

          .hero-visuals {
            display: none; /* Hide cards on extra small screens to maintain layout */
          }
        }
      `}</style>
    </section>
  );
}
