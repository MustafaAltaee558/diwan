import React from 'react';
import { ChefHat, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-section">
      
      {/* Interactive Pricing Section */}
      <div id="pricing" className="pricing-wrapper container">
        <div className="section-header text-center">
          <span className="section-subtitle">الاشتراكات والأسعار</span>
          <h2 className="section-title">اشتراكات مرنة تناسب حجم أعمالك</h2>
          <p className="section-description">
            اختر الباقة المناسبة لمطعمك وابدأ التحول الرقمي اليوم. بدون رسوم خفية أو عقود طويلة الأجل.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Plan 1 */}
          <div className="pricing-card glass-panel">
            <span className="plan-name">الباقة الأساسية</span>
            <div className="plan-price-wrap">
              <span className="plan-price en-font">50,000</span>
              <span className="plan-currency">د.ع / شهر</span>
            </div>
            <p className="plan-desc">مثالية للمطاعم الصغيرة والعربات المتنقلة لإدارة الكاشير والطلبات السريعة.</p>
            <div className="card-divider"></div>
            <ul className="plan-features-list">
              <li>نظام كاشير POS واحد نشط</li>
              <li>قائمة طعام رقمية (QR Menu)</li>
              <li>تتبع مبيعات وتقارير يومية مبسطة</li>
              <li>دعم فني عبر الهاتف والواتساب</li>
            </ul>
            <button className="btn btn-secondary w-full mt-auto">اشترك الآن</button>
          </div>

          {/* Plan 2 - Popular */}
          <div className="pricing-card glass-panel-glow popular-card">
            <span className="popular-badge">الأكثر اختياراً 🔥</span>
            <span className="plan-name">الباقة الذهبية (المتكاملة)</span>
            <div className="plan-price-wrap">
              <span className="plan-price en-font">99,000</span>
              <span className="plan-currency">د.ع / شهر</span>
            </div>
            <p className="plan-desc">الحل الشامل للمطاعم المتوسطة وفروع الوجبات السريعة للنمو وإدارة الفروع.</p>
            <div className="card-divider"></div>
            <ul className="plan-features-list">
              <li>كاشير POS غير محدود في الفرع</li>
              <li>منيو QR تفاعلي متقدم مع طلب ذاتي</li>
              <li>نظام إدارة الفروع والمخزون المركزي</li>
              <li>أدوات التسويق بالذكاء الاصطناعي (AI)</li>
              <li>تكامل كامل مع شاشات المطبخ والدليفري</li>
              <li>دعم فني مخصص على مدار الساعة</li>
            </ul>
            <button className="btn btn-primary w-full mt-auto">ابدأ الفترة التجريبية (14 يوم)</button>
          </div>

          {/* Plan 3 */}
          <div className="pricing-card glass-panel">
            <span className="plan-name">باقة الشركات (المخصصة)</span>
            <div className="plan-price-wrap">
              <span className="plan-price-custom">تواصل معنا</span>
            </div>
            <p className="plan-desc">مصممة خصيصاً لسلاسل المطاعم الكبرى والامتيازات التجارية (Franchise) في العراق.</p>
            <div className="card-divider"></div>
            <ul className="plan-features-list">
              <li>ربط كامل مع أنظمة المحاسبة والـ ERP</li>
              <li>خوادم سحابية خاصة ومخصصة (Private Cloud)</li>
              <li>لوحة تحكم إحصائية للشركاء والمستثمرين</li>
              <li>مدير حساب تقني مخصص لعلامتك التجارية</li>
              <li>تعديلات برمجية وتصاميم مخصصة بالكامل</li>
            </ul>
            <button className="btn btn-secondary w-full mt-auto">اطلب استشارة تقنية</button>
          </div>
        </div>
      </div>

      <div className="card-divider container" style={{ margin: '80px auto 50px auto' }}></div>

      {/* Main Footer Links & Info */}
      <div id="about" className="container footer-grid">
        
        {/* Col 1: About company */}
        <div className="footer-col about-col">
          <div className="footer-logo">
            <ChefHat className="logo-icon" />
            <div className="logo-text">
              <span className="brand-name">ديوان</span>
              <span className="brand-sub">DIWAN TECH</span>
            </div>
          </div>
          <p className="footer-about-text">
            ديوان هي شركة تقنية عراقية متخصصة في تقديم حلول السحاب (SaaS) الحديثة للمطاعم والمقاهي. نهدف إلى تمكين أصحاب الأعمال من إدارة فروعهم وزيادة أرباحهم بأقل التكاليف عبر التحول الرقمي الذكي.
          </p>
          <div className="social-links-row">
            <a href="#" className="social-icon-link" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="social-icon-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">روابط سريعة</h4>
          <ul className="footer-links-list">
            <li><a href="#features">المميزات والحلول</a></li>
            <li><a href="#demo">محاكي الأنظمة</a></li>
            <li><a href="#pricing">الباقات والأسعار</a></li>
            <li><a href="#about">قصتنا ورؤيتنا</a></li>
          </ul>
        </div>

        {/* Col 3: Contact Info */}
        <div className="footer-col contact-col">
          <h4 className="footer-col-title">تواصل معنا</h4>
          <ul className="footer-contact-list">
            <li>
              <Phone size={16} className="contact-icon" />
              <span className="en-font">+964 770 123 4567</span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span className="en-font">hello@diwantech.com</span>
            </li>
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>العراق، بغداد، الكرادة، شارع العرصات</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-content">
          <span className="copyright-text">
            © {new Date().getFullYear()} ديوان لتكنولوجيا المطاعم. جميع الحقوق محفوظة.
          </span>
          <span className="made-with-love">
            صنع بحب في العراق <Heart size={12} fill="var(--error)" color="var(--error)" />
          </span>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: #060910;
          padding-top: 100px;
          border-top: 1px solid var(--border-light);
          position: relative;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .pricing-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: right;
          border-radius: 20px;
          border: 1px solid var(--border-light);
          position: relative;
          min-height: 480px;
        }

        .popular-card {
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.08);
          transform: translateY(-8px);
        }

        .popular-badge {
          position: absolute;
          top: -14px;
          right: 24px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: #000;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 20px;
        }

        .plan-name {
          font-size: 1.15rem;
          font-weight: 750;
          color: var(--text-white);
          margin-bottom: 12px;
        }

        .plan-price-wrap {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          margin-bottom: 16px;
        }

        .plan-price {
          font-size: 2.3rem;
          font-weight: 850;
          color: var(--primary);
          line-height: 1;
        }

        .plan-price-custom {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--secondary);
          line-height: 1;
        }

        .plan-currency {
          font-size: 0.85rem;
          color: var(--text-gray);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .plan-desc {
          font-size: 0.85rem;
          color: var(--text-gray);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .plan-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
          width: 100%;
        }

        .plan-features-list li {
          font-size: 0.85rem;
          color: var(--text-white);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .plan-features-list li::before {
          content: '✓';
          color: var(--success);
          font-weight: 800;
          font-size: 0.95rem;
        }

        /* Footer Grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr 1fr;
          gap: 60px;
          padding-bottom: 60px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .footer-about-text {
          font-size: 0.9rem;
          color: var(--text-gray);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .social-links-row {
          display: flex;
          gap: 12px;
        }

        .social-icon-link {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-gray);
          transition: all var(--transition-fast);
        }

        .social-icon-link:hover {
          background: var(--primary);
          color: #000;
          border-color: var(--primary);
        }

        .footer-col-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 24px;
          position: relative;
        }

        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 0;
          width: 30px;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
        }

        .footer-links-list, .footer-contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links-list a {
          color: var(--text-gray);
          text-decoration: none;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }

        .footer-links-list a:hover {
          color: var(--primary);
          padding-right: 4px;
        }

        .footer-contact-list li {
          font-size: 0.9rem;
          color: var(--text-gray);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .contact-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        /* Footer Bottom Bar */
        .footer-bottom-bar {
          background: rgba(0, 0, 0, 0.4);
          border-top: 1px solid var(--border-light);
          padding: 24px 0;
        }

        .bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .made-with-love {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .popular-card {
            transform: none;
          }
        }

        @media (max-width: 576px) {
          .bottom-content {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
