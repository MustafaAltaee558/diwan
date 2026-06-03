import React from 'react';
import { Monitor, Smartphone, Globe, Shield, BarChart3, Sparkles } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: <Monitor size={24} className="feat-icon-color-cyan" />,
      title: "نظام نقاط البيع الذكي (POS)",
      description: "برنامج كاشير فائق السرعة، يدعم العمل بدون إنترنت، ومرتبط مباشرة مع شاشات المطبخ لإرسال الطلبات فورا وتجنب التأخير.",
      badge: "أساسي"
    },
    {
      icon: <Smartphone size={24} className="feat-icon-color-amber" />,
      title: "القوائم الرقمية (QR Menu)",
      description: "قائمة طعام تفاعلية بباركود خاص بكل طاولة، تتيح للزبائن تصفح الوجبات، إضافة الملاحظات، والطلب مباشرة دون انتظار النادل.",
      badge: "الأكثر طلباً"
    },
    {
      icon: <Globe size={24} className="feat-icon-color-blue" />,
      title: "الطلبات الخارجية والتوصيل",
      description: "امتلك منصة طلبات خاصة بمطعمك تدعم التوصيل والسفري، واستقبل الطلبات مباشرة دون دفع عمولات باهظة لتطبيقات التوصيل.",
      badge: "توفير عمولات"
    },
    {
      icon: <Shield size={24} className="feat-icon-color-purple" />,
      title: "إدارة الفروع والمخزون المركزي",
      description: "تابع مخزون المواد الخام بجميع فروعك بشكل لحظي، مع إمكانية التحويل بين المخازن وتلقي تنبيهات عند اقتراب نفاد المواد.",
      badge: "متعدد الفروع"
    },
    {
      icon: <BarChart3 size={24} className="feat-icon-color-green" />,
      title: "تتبع المبيعات والتحليلات المتقدمة",
      description: "تقارير بيانية تفصيلية لصافي المبيعات، الضرائب، الأرباح، الوجبات الأكثر شعبية، وتقييم أداء الموظفين لمساعدتك في اتخاذ قراراتك.",
      badge: "ذكاء أعمال"
    },
    {
      icon: <Sparkles size={24} className="feat-icon-color-gold" />,
      title: "أدوات التسويق بالذكاء الاصطناعي",
      description: "صمم حملات ترويجية ذكية، واصنع نصوصاً إعلانية وعروضاً لعملائك بناءً على سلوكيات طلباتهم السابقة لزيادة نسبة ولائهم وعودتهم.",
      badge: "جديد بالكامل"
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">خدمات وحلول ديوان</span>
          <h2 className="section-title">منظومة رقمية متكاملة لنجاح مطعمك</h2>
          <p className="section-description">
            نجمع لك كل ما تحتاجه لإدارة مطعمك بكفاءة في مكان واحد، لتوفير التكاليف وزيادة سرعة تقديم الخدمات.
          </p>
        </div>

        <div className="features-grid">
          {featureList.map((feature, idx) => (
            <div key={idx} className="feature-card glass-panel animate-fade-in" style={{ animationDelay: `${idx * 0.08}s` }}>
              <div className="feature-badge-row">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <span className="feature-badge">{feature.badge}</span>
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-section {
          padding: 100px 0;
          position: relative;
        }

        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 60px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .section-subtitle {
          color: var(--primary);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
          background: rgba(245, 158, 11, 0.08);
          padding: 6px 16px;
          border-radius: 9999px;
          border: 1px solid rgba(245, 158, 11, 0.15);
        }

        .section-title {
          font-size: 2.6rem;
          color: var(--text-white);
          margin-bottom: 20px;
        }

        .section-description {
          font-size: 1.05rem;
          color: var(--text-gray);
          line-height: 1.7;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 30px;
        }

        .feature-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: right;
          border: 1px solid var(--border-light);
          cursor: pointer;
        }

        .feature-card:hover {
          border-color: var(--primary-glow);
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }

        .feature-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 24px;
        }

        .feature-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
        }

        /* Feature Icon Colors */
        .feat-icon-color-cyan { color: var(--secondary); filter: drop-shadow(0 0 4px var(--secondary-glow)); }
        .feat-icon-color-amber { color: var(--primary); filter: drop-shadow(0 0 4px var(--primary-glow)); }
        .feat-icon-color-blue { color: var(--accent-blue); filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.2)); }
        .feat-icon-color-purple { color: var(--accent-purple); filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.2)); }
        .feat-icon-color-green { color: var(--success); filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.2)); }
        .feat-icon-color-gold { color: #fbbf24; filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.2)); }

        .feature-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-gray);
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .feature-card:hover .feature-badge {
          border-color: var(--primary-glow);
          color: var(--primary);
        }

        .feature-card-title {
          font-size: 1.3rem;
          color: var(--text-white);
          margin-bottom: 12px;
          font-weight: 700;
        }

        .feature-card-desc {
          font-size: 0.95rem;
          color: var(--text-gray);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.1rem;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
