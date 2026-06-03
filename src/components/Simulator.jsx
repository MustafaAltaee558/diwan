import React, { useState, useEffect } from 'react';
import { 
  Monitor, Smartphone, BarChart3, Sparkles, Building2, 
  ShoppingCart, Printer, Bell, Check, Trash2, ArrowLeft,
  ChevronLeft, Award, RefreshCw, Send, AlertTriangle, HelpCircle 
} from 'lucide-react';

// Product list
const PRODUCTS = [
  { id: 'burger', name: 'برجر لحم ديوان', price: 8000, category: 'meals', desc: 'لحم بقري مشوي مع جبنة شيدر وصلصة ديوان الخاصة', inventoryCost: { meat: 0.15, bun: 1, cheese: 1 } },
  { id: 'shawarma_ch', name: 'شاورما دجاج (صاج)', price: 5000, category: 'meals', desc: 'دجاج متبل على الطريقة العراقية مع ثومية وبطاطا', inventoryCost: { chicken: 0.12, bun: 1 } },
  { id: 'shawarma_m', name: 'شاورما لحم (صاج)', price: 6000, category: 'meals', desc: 'لحم عجل بلدي مع عمبة وبصل وبقدونس', inventoryCost: { meat: 0.12, bun: 1 } },
  { id: 'kebab', name: 'كباب عراقي مشوي', price: 12000, category: 'meals', desc: 'شيش كباب لحم غنم مشوي على الفحم مع الخضار', inventoryCost: { meat: 0.25 } },
  { id: 'fries', name: 'بطاطا مقلية عائلية', price: 3000, category: 'sides', desc: 'أصابع بطاطا مقرمشة ومملحة مع الكاتشب', inventoryCost: { fries: 0.3 } },
  { id: 'pepsi', name: 'بيبسي بارد', price: 1500, category: 'drinks', desc: 'علبة بيبسي غازية باردة', inventoryCost: { drinks: 1 } },
  { id: 'water', name: 'ماء معدني', price: 500, category: 'drinks', desc: 'قنينة ماء نقي مبرد', inventoryCost: { water: 1 } }
];

// Seed branches
const BRANCHES_DATA = {
  baghdad: {
    name: 'بغداد - الكرادة',
    sales: 1450000,
    ordersCount: 94,
    status: 'مفتوح',
    manager: 'أبو فهد الجبوري',
    inventory: { meat: 18.5, chicken: 12.0, bun: 95, cheese: 42, fries: 15.0, drinks: 140, water: 210 }
  },
  erbil: {
    name: 'أربيل - عينكاوة',
    sales: 890000,
    ordersCount: 46,
    status: 'مفتوح',
    manager: 'شيروان كردي',
    inventory: { meat: 12.0, chicken: 8.5, bun: 60, cheese: 25, fries: 8.0, drinks: 90, water: 120 }
  },
  basra: {
    name: 'البصرة - العشار',
    sales: 620000,
    ordersCount: 31,
    status: 'مفتوح',
    manager: 'علاوي البصراوي',
    inventory: { meat: 6.5, chicken: 4.2, bun: 30, cheese: 12, fries: 5.5, drinks: 45, water: 80 }
  }
};

// Preset AI campaigns
const AI_PRESETS = [
  {
    title: 'عقد الغداء العائلي 👨‍👩‍👧‍👦',
    prompt: 'حملة ترويجية لوجبة الغداء العائلية لزيادة المبيعات يوم الجمعة مع توصيل مجاني',
    result: {
      sms: 'يا هلا بيكم بأطيب غدا عراقي! 🍗🍖 اطلب عشاء أو غداء العائلة من ديوان يوم الجمعة واحصل على توصيل مجاني لكل مناطق بغداد. العرض يشمل 4 شيش كباب + 1 شاورما دجاج عائلية + مقبلات مشكلة وبيبسي عائلي بسعر 35 ألف دينار فقط! اطلب الحين عبر الـ QR الخاص بينا واستمتع بالدفو واللمة الطيب.',
      whatsapp: '🎉 *عرض الجمعة العائلي من مطعم ديوان* 🎉\n\nجمعتكم مباركة وطيبة! ليش تطبخون وتتعبون؟ ديوان مجهز الكم خوش لِمة وخوش أكل!\n\n🎁 *تفاصيل العرض العائلي:* \n- ٤ شيش كباب لحم عراقي على الفحم\n- ١ وجبة شاورما دجاج صاج عائلية\n- ماعون مقبلات مشكلة كبير\n- بيبسي حجم عائلي بارد\n\n💵 *السعر:* 35,000 دينار فقط!\n🛵 *التوصيل:* مجاني بالكامل للطلبات عبر المنيو الإلكتروني.\n\n👇 اطلب كبل من موبايلك بدون انتظار:\n[رابط المنيو الرقمي]',
      audience: 'العائلات والمجموعات الكبيرة في نطاق 5 كم من فروعنا.',
      performance: 'متوقع زيادة 25% في مبيعات يوم الجمعة.'
    }
  },
  {
    title: 'وجبة الطلاب الافتصادية 🎓',
    prompt: 'عرض خصم 20% لطلاب الجامعات على برجر اللحم مع إثبات الهوية الجامعية',
    result: {
      sms: 'كل الهلا بطلابنا الأعزاء! 🎓 جوعان ودراسة وامتحانات؟ مطعم ديوان يضبطك! احصل على خصم 20% على برجر لحم ديوان المشوي على الفحم بس شوفنا هويتك الجامعية أو اطلب بالمنيو الرقمي بكود (STUDENT20). خذلك استراحة سريعة وارجع بنشاط!',
      whatsapp: '🍔 *استراحة المحارب للطلاب من ديوان* 🎓\n\nامتحانات ودراسة وتعب؟ ديوان يهديلك أقوى طاقة! \n\n🔥 خصم *20%* كامل على جميع أنواع البرجر والوجبات السريعة عند إبراز هويتك الجامعية للكاشير أو الطلب أونلاين بكود: *STUDENT20*.\n\n🍔 *برجر لحم ديوان:* صانعيها بحب من لحم بلدي 100% مع الجبنة الذائبة والبطاطا.\n\n👇 فوت للرابط واطلب وريح بالك:\n[رابط الطلب السريع]',
      audience: 'الشباب وطلاب الجامعات والمعاهد (18-25 سنة).',
      performance: 'متوقع جذب أكثر من 150 طالب يومياً للفروع القريبة من الجامعات.'
    }
  },
  {
    title: 'تنشيط الفترة المسائية (بعد الـ 12) 🌙',
    prompt: 'عرض خاص لزبائن الليل المتأخرين (شاورما مجانية مع كل وجبتين)',
    result: {
      sms: 'سهران وجوعان؟ 🦉 ديوان يسهر وياك! اطلب وجبتين شاورما صاج بعد الساعة 12 بالليل واحصل على لفة شاورما دجاج مجانية من عندنا. المطبخ مفتوح لغاية الـ 3 صباحاً والتوصيل حار يوصل لباب بيتك! اطلب من المنيو الحين.',
      whatsapp: '🌙 *سهرتكم أحلى مع نواشف ديوان* 🌯\n\nجوع تالي الليل ماله غير شاورما ديوان الحارة! \n\n🎁 اطلب أي وجبتين شاورما صاج (لحم أو دجاج) واحصل على *لفة شاورما دجاج مجاناً* مع الطلب!\n\n⏰ العرض يبدأ يومياً من الساعة 12 منتصف الليل وحتى الـ 3 صباحاً.\n🛵 خدمة التوصيل متوفرة وسريعة.\n\n👇 جوعان؟ لا تفكر واطلب فوراً:\n[رابط المنيو الرقمي]',
      audience: 'الساهرين، موظفي النوبات الليلية، ومحبي الأكل المتأخر.',
      performance: 'سيعمل على رفع مبيعات الفترة الميتة بعد منتصف الليل بنسبة 35%.'
    }
  }
];

export default function Simulator() {
  const [activeTab, setActiveTab] = useState('sync'); // 'sync' (POS & QR), 'analytics', 'ai', 'branches'
  const [branches, setBranches] = useState(BRANCHES_DATA);
  const [currentBranchKey, setCurrentBranchKey] = useState('baghdad');
  
  // Shared simulation states
  const [orderHistory, setOrderHistory] = useState([
    { id: '101', table: 'طاولة 3', items: [{ name: 'برجر لحم ديوان', qty: 2, price: 8000 }], total: 16000, timestamp: '10:14 م', status: 'delivered', branch: 'baghdad' },
    { id: '102', table: 'سفري/توصيل', items: [{ name: 'كباب عراقي مشوي', qty: 1, price: 12000 }, { name: 'بيبسي بارد', qty: 2, price: 1500 }], total: 15000, timestamp: '10:30 م', status: 'delivered', branch: 'baghdad' },
    { id: '103', table: 'طاولة 5', items: [{ name: 'شاورما دجاج (صاج)', qty: 3, price: 5000 }, { name: 'بطاطا مقلية عائلية', qty: 1, price: 3000 }], total: 18000, timestamp: '10:48 م', status: 'ready', branch: 'baghdad' }
  ]);
  
  const [posCart, setPosCart] = useState([]);
  const [qrCart, setQrCart] = useState([]);
  const [pendingQrOrders, setPendingQrOrders] = useState([
    {
      id: 'qr_201',
      tableNum: 'طاولة 4',
      items: [
        { id: 'burger', name: 'برجر لحم ديوان', price: 8000, qty: 1 },
        { id: 'fries', name: 'بطاطا مقلية عائلية', price: 3000, qty: 1 },
        { id: 'pepsi', name: 'بيبسي بارد', price: 1500, qty: 1 }
      ],
      total: 12500,
      timestamp: '11:05 م'
    }
  ]);
  
  // Custom alerts/notifications
  const [notifications, setNotifications] = useState([]);
  
  // AI campaign states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState(null);
  
  // Active inventory
  const activeBranch = branches[currentBranchKey];

  // Helper: Trigger custom notification banner
  const addNotification = (text, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [{ id, text, type }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Helper: check raw inventory consumption
  const deductInventory = (items) => {
    setBranches(prev => {
      const updated = { ...prev };
      const inv = { ...updated[currentBranchKey].inventory };
      
      items.forEach(item => {
        const prod = PRODUCTS.find(p => p.id === item.id || p.name === item.name);
        if (prod && prod.inventoryCost) {
          Object.keys(prod.inventoryCost).forEach(ingredient => {
            const cost = prod.inventoryCost[ingredient] * (item.qty || item.quantity || 1);
            if (typeof inv[ingredient] === 'number') {
              inv[ingredient] = Math.max(0, parseFloat((inv[ingredient] - cost).toFixed(2)));
            }
          });
        }
      });

      // Alert if anything is low
      Object.keys(inv).forEach(ing => {
        const val = inv[ing];
        const isLow = (ing === 'bun' || ing === 'drinks' || ing === 'water') ? val < 15 : val < 4.0;
        if (isLow && inv[ing] < prev[currentBranchKey].inventory[ing]) {
          addNotification(`⚠️ تحذير: انخفاض مخزون المكون (${translateIngredient(ing)}) في فرع ${updated[currentBranchKey].name}!`, 'warning');
        }
      });

      updated[currentBranchKey] = {
        ...updated[currentBranchKey],
        inventory: inv
      };
      return updated;
    });
  };

  const translateIngredient = (ing) => {
    const dict = { meat: 'لحوم بلدية', chicken: 'دواجن', bun: 'خبز صاج وصمون', cheese: 'جبن شيدر', fries: 'بطاطا مقلية', drinks: 'مشروبات غازية', water: 'مياه معدنية' };
    return dict[ing] || ing;
  };

  // QR Menu Order Submission -> Triggers POS notification
  const handleQrSubmitOrder = (tableNum) => {
    if (qrCart.length === 0) return;
    
    const newOrderTotal = qrCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const newPending = {
      id: `qr_${Date.now()}`,
      tableNum: tableNum || 'طاولة 6',
      items: [...qrCart],
      total: newOrderTotal,
      timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' })
    };

    setPendingQrOrders(prev => [...prev, newPending]);
    setQrCart([]); // Empty QR cart
    addNotification(`🔔 طلب جديد مرسل من ${newPending.tableNum} بقيمة ${newPending.total.toLocaleString()} د.ع!`, 'success');
  };

  // POS accepts a pending QR order
  const handleAcceptQrOrder = (qrOrder) => {
    // 1. Deduct Inventory
    deductInventory(qrOrder.items);

    // 2. Add to Order History
    const historyItem = {
      id: qrOrder.id.replace('qr_', ''),
      table: qrOrder.tableNum,
      items: qrOrder.items.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      total: qrOrder.total,
      timestamp: qrOrder.timestamp,
      status: 'cooking',
      branch: currentBranchKey
    };

    setOrderHistory(prev => [historyItem, ...prev]);

    // 3. Update branch sales numbers
    setBranches(prev => {
      const updated = { ...prev };
      updated[currentBranchKey] = {
        ...updated[currentBranchKey],
        sales: updated[currentBranchKey].sales + qrOrder.total,
        ordersCount: updated[currentBranchKey].ordersCount + 1
      };
      return updated;
    });

    // 4. Remove from pending
    setPendingQrOrders(prev => prev.filter(o => o.id !== qrOrder.id));
    addNotification(`✅ تم قبول طلب ${qrOrder.tableNum} وطباعة بون المطبخ!`, 'success');
  };

  // POS rejects a pending QR order
  const handleRejectQrOrder = (orderId, tableNum) => {
    setPendingQrOrders(prev => prev.filter(o => o.id !== orderId));
    addNotification(`❌ تم إلغاء طلب ${tableNum} من قبل الكاشير.`, 'error');
  };

  // POS directly places an order (Cashier checkout)
  const handlePosCheckout = (tableNum = 'سفري/توصيل') => {
    if (posCart.length === 0) return;
    
    const cartTotal = posCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // Deduct raw items from stock
    deductInventory(posCart);

    const historyItem = {
      id: `${Math.floor(Math.random() * 900) + 100}`,
      table: tableNum,
      items: [...posCart],
      total: cartTotal,
      timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      branch: currentBranchKey
    };

    setOrderHistory(prev => [historyItem, ...prev]);
    
    // Add sales to active branch
    setBranches(prev => {
      const updated = { ...prev };
      updated[currentBranchKey] = {
        ...updated[currentBranchKey],
        sales: updated[currentBranchKey].sales + cartTotal,
        ordersCount: updated[currentBranchKey].ordersCount + 1
      };
      return updated;
    });

    setPosCart([]);
    addNotification(`🖨️ تم الدفع وطباعة الفاتورة للطلب #${historyItem.id}!`, 'success');
  };

  // Restock inventory for current branch
  const handleRestock = () => {
    setBranches(prev => {
      const updated = { ...prev };
      const defaultInv = BRANCHES_DATA[currentBranchKey].inventory;
      updated[currentBranchKey] = {
        ...updated[currentBranchKey],
        inventory: { ...defaultInv }
      };
      return updated;
    });
    addNotification(`📦 تم إعادة تزويد كافة المخازن والمواد لفرع (${activeBranch.name}) بنجاح!`, 'success');
  };

  // Simulate AI Generation
  const handleGenerateAiCampaign = (presetPrompt) => {
    const promptToUse = presetPrompt || aiPrompt;
    if (!promptToUse.trim()) return;

    setAiGenerating(true);
    setGeneratedCampaign(null);

    setTimeout(() => {
      // Find preset if matches, otherwise generate a mock response
      const matchedPreset = AI_PRESETS.find(p => p.prompt.includes(promptToUse) || promptToUse.includes(p.title.substring(0, 5)));
      
      if (matchedPreset) {
        setGeneratedCampaign(matchedPreset.result);
      } else {
        // Generate dynamic fallback
        setGeneratedCampaign({
          sms: `عيني صاحب مطعم ديوان! 🍽️ بخصوص حملتك (${promptToUse}) صممنالك هذا العرض: خصم خاص 15% عند الدفع الإلكتروني أو الطلب مباشرة عبر باركود الطاولة. العرض ساري لغاية نهاية الأسبوع! اطلب وجبتك الآن.`,
          whatsapp: `🔥 *عرض خاص وحصري من مطعم ديوان* 🔥\n\nأهلاً وسهلاً بزبائننا الأكارم، بناءً على طلبكم صممنا لكم أقوى عرض لموضوع: *${promptToUse}*\n\n🎁 احصل على خصم *15%* على جميع الطلبات عبر رابط المنيو الرقمي مباشرة باستخدام كود الخصم: *DIWAN15*\n\n🛵 خدمة التوصيل متوفرة وسريعة لكافة المناطق.\n\n👇 اضغط على الرابط واطلب الحين:\n[رابط المنيو الرقمي]`,
          audience: 'جميع الزبائن الذين طلبوا خلال الـ 30 يوماً الماضية.',
          performance: 'متوقع زيادة حجم الطلبات بنسبة 18% وتحسين حركة العمل بالمطعم.'
        });
      }
      setAiGenerating(false);
      addNotification(`🧠 قام الذكاء الاصطناعي بتوليد الحملة الإعلانية بنجاح!`, 'success');
    }, 1500);
  };

  // Calculate coordinates for dynamic SVG Sales Chart
  const renderSvgSalesChart = () => {
    // We render 6 points representing monthly trends
    // Base data + additions from live simulation
    const liveSalesAddon = activeBranch.sales - BRANCHES_DATA[currentBranchKey].sales;
    const basePoints = [450, 600, 550, 780, 920, 1100]; // in thousands
    // update last month with current sales
    const currentSalesVal = Math.round(activeBranch.sales / 1000);
    basePoints[basePoints.length - 1] = currentSalesVal;

    const width = 500;
    const height = 180;
    const padding = 30;

    const maxVal = Math.max(...basePoints) * 1.1;
    const minVal = Math.min(...basePoints) * 0.9;

    const pointsCoordinates = basePoints.map((val, idx) => {
      const x = padding + (idx * (width - 2 * padding)) / (basePoints.length - 1);
      const y = height - padding - ((val - minVal) * (height - 2 * padding)) / (maxVal - minVal);
      return { x, y, val };
    });

    const pathData = pointsCoordinates.reduce((acc, coord, idx) => {
      return acc + `${idx === 0 ? 'M' : 'L'} ${coord.x} ${coord.y} `;
    }, '');

    // Area path for gradient fill
    const areaPathData = pathData + 
      `L ${pointsCoordinates[pointsCoordinates.length - 1].x} ${height - padding} ` +
      `L ${pointsCoordinates[0].x} ${height - padding} Z`;

    return (
      <svg className="analytics-svg" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.05)" />
        <line x1={padding} y1={height/2} x2={width - padding} y2={height/2} stroke="rgba(255,255,255,0.05)" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />

        {/* Shaded Area */}
        <path d={areaPathData} fill="url(#chartGlow)" />

        {/* Smooth Chart Line */}
        <path d={pathData} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {pointsCoordinates.map((coord, idx) => (
          <g key={idx}>
            <circle 
              cx={coord.x} 
              cy={coord.y} 
              r={idx === pointsCoordinates.length - 1 ? "6" : "4"} 
              fill={idx === pointsCoordinates.length - 1 ? "var(--primary-light)" : "var(--bg-dark)"}
              stroke="var(--primary)" 
              strokeWidth="2" 
            />
            {idx === pointsCoordinates.length - 1 && (
              <circle cx={coord.x} cy={coord.y} r="12" fill="none" stroke="var(--primary)" strokeWidth="1.5" className="ping-effect" />
            )}
          </g>
        ))}
      </svg>
    );
  };

  return (
    <section id="demo" className="simulator-section">
      <div className="container">
        
        {/* Interactive System Alerts */}
        <div className="notification-toast-container">
          {notifications.map(n => (
            <div key={n.id} className={`notification-toast toast-${n.type} glass-panel`}>
              <div className="toast-icon-wrap">
                {n.type === 'success' && <Check size={16} />}
                {n.type === 'error' && <Trash2 size={16} />}
                {n.type === 'warning' && <AlertTriangle size={16} />}
                {n.type === 'info' && <Bell size={16} />}
              </div>
              <span className="toast-text">{n.text}</span>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="simulator-header">
          <span className="badge badge-cyan">
            <Monitor size={14} />
            لوحة العرض الحي والتحكم التفاعلي
          </span>
          <h2 className="sim-title">جرّب بيئة ديوان المتكاملة حياً</h2>
          <p className="sim-desc">
            اختر النظام الذي ترغب بتجربته، وراقب كيف يتدفق الطلب فورياً من قائمة الـ QR للزبون إلى شاشة مبيعات الكاشير وتحديثات المخازن والرسومات البيانية.
          </p>
        </div>

        {/* Main Dashboard App Frame */}
        <div className="app-dashboard-frame glass-panel animate-fade-in">
          
          {/* Dashboard Header Bar */}
          <div className="dashboard-top-bar">
            <div className="db-logo">
              <span className="db-logo-bullet"></span>
              <span className="db-logo-title">نظام ديوان السحابي</span>
              <span className="db-logo-badge en-font">SaaS v2.5</span>
            </div>

            {/* Branch Selector dropdown */}
            <div className="branch-selector-widget">
              <span className="widget-label">الفرع النشط:</span>
              <select 
                value={currentBranchKey} 
                onChange={(e) => {
                  setCurrentBranchKey(e.target.value);
                  addNotification(`📍 تم التحويل إلى فرع (${branches[e.target.value].name})`, 'info');
                }}
                className="branch-dropdown"
              >
                <option value="baghdad">بغداد - الكرادة</option>
                <option value="erbil">أربيل - عينكاوة</option>
                <option value="basra">البصرة - العشار</option>
              </select>
            </div>
          </div>

          <div className="dashboard-main-body">
            
            {/* Dashboard Sidebar Navigation (Right Aligned in RTL) */}
            <div className="dashboard-sidebar">
              <button 
                onClick={() => setActiveTab('sync')} 
                className={`sidebar-link ${activeTab === 'sync' ? 'sidebar-link-active' : ''}`}
              >
                <Monitor size={18} />
                <span>محاكي POS و QR</span>
                {pendingQrOrders.length > 0 && (
                  <span className="sidebar-badge-count">{pendingQrOrders.length}</span>
                )}
              </button>

              <button 
                onClick={() => setActiveTab('analytics')} 
                className={`sidebar-link ${activeTab === 'analytics' ? 'sidebar-link-active' : ''}`}
              >
                <BarChart3 size={18} />
                <span>لوحة التحليلات والمبيعات</span>
              </button>

              <button 
                onClick={() => setActiveTab('ai')} 
                className={`sidebar-link ${activeTab === 'ai' ? 'sidebar-link-active' : ''}`}
              >
                <Sparkles size={18} />
                <span>التسويق بالذكاء الاصطناعي</span>
              </button>

              <button 
                onClick={() => setActiveTab('branches')} 
                className={`sidebar-link ${activeTab === 'branches' ? 'sidebar-link-active' : ''}`}
              >
                <Building2 size={18} />
                <span>إدارة الفروع والمخزون</span>
                {Object.values(activeBranch.inventory).some(v => v < 15) && (
                  <span className="sidebar-badge-warning">!</span>
                )}
              </button>
            </div>

            {/* Dashboard Content Container */}
            <div className="dashboard-content">

              {/* TAB 1: POS & QR SYNCED SIMULATION */}
              {activeTab === 'sync' && (
                <div className="sync-layout-grid">
                  
                  {/* Left Side - Interactive Mobile Phone Mockup (QR Menu) */}
                  <div className="mobile-phone-container">
                    <div className="phone-bezel">
                      <div className="phone-camera"></div>
                      <div className="phone-screen">
                        
                        {/* Mobile Header */}
                        <div className="phone-header">
                          <span className="phone-brand-title">ديوان كافيه ومطعم</span>
                          <span className="phone-table-badge">طاولة رقم 4</span>
                        </div>

                        {/* Mobile Category slider */}
                        <div className="phone-cats">
                          <span className="phone-cat-pill active">الوجبات الرئيسية</span>
                          <span className="phone-cat-pill">المشروبات</span>
                        </div>

                        {/* Mobile Product scroll area */}
                        <div className="phone-products-scroll">
                          {PRODUCTS.map(p => {
                            const inCart = qrCart.find(item => item.id === p.id);
                            return (
                              <div key={p.id} className="phone-prod-card">
                                <div className="phone-prod-info">
                                  <h4 className="phone-prod-name">{p.name}</h4>
                                  <span className="phone-prod-price en-font">{(p.price).toLocaleString()} د.ع</span>
                                </div>
                                <div className="phone-prod-actions">
                                  {inCart ? (
                                    <div className="phone-qty-control">
                                      <button 
                                        onClick={() => {
                                          setQrCart(prev => prev.map(item => item.id === p.id ? { ...item, qty: Math.max(1, item.qty - 1) } : item));
                                        }}
                                        className="qty-btn"
                                      >-</button>
                                      <span className="qty-num en-font">{inCart.qty}</span>
                                      <button 
                                        onClick={() => {
                                          setQrCart(prev => prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item));
                                        }}
                                        className="qty-btn"
                                      >+</button>
                                      <button 
                                        onClick={() => setQrCart(prev => prev.filter(item => item.id !== p.id))}
                                        className="phone-trash-btn"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  ) : (
                                    <button 
                                      onClick={() => setQrCart(prev => [...prev, { ...p, qty: 1 }])}
                                      className="phone-add-btn"
                                    >
                                      إضافة
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Mobile Cart / Footer Drawer */}
                        <div className="phone-cart-drawer">
                          {qrCart.length > 0 ? (
                            <div className="phone-cart-active">
                              <div className="phone-cart-summary">
                                <span>{qrCart.length} وجبات</span>
                                <span className="en-font">
                                  {qrCart.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString()} د.ع
                                </span>
                              </div>
                              <button 
                                onClick={() => handleQrSubmitOrder('طاولة 4')} 
                                className="phone-checkout-btn animate-pulse-glow"
                              >
                                <Send size={14} />
                                أرسل الطلب للمطبخ
                              </button>
                            </div>
                          ) : (
                            <div className="phone-cart-empty">
                              <span>أضف وجبات للطلب من الطاولة</span>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                    <span className="phone-label-hint">📱 محاكي هاتف الزبون (QR Menu)</span>
                  </div>

                  {/* Right Side - POS Cashier Panel */}
                  <div className="pos-cashier-panel">
                    
                    <div className="pos-section-header">
                      <div className="pos-title-wrap">
                        <Monitor size={16} className="pos-icon" />
                        <h3 className="pos-section-title">شاشة الكاشير ونقاط البيع</h3>
                      </div>
                      <span className="pos-active-branch">{activeBranch.name}</span>
                    </div>

                    <div className="pos-split-container">
                      
                      {/* POS Left Column - Cart & Pending orders */}
                      <div className="pos-cart-col">
                        
                        {/* Pending QR orders notifier */}
                        {pendingQrOrders.length > 0 && (
                          <div className="pending-orders-box">
                            <h4 className="pending-box-title">
                              <Bell size={14} className="alert-bell-anim" />
                              طلبات الـ QR المعلقة ({pendingQrOrders.length})
                            </h4>
                            <div className="pending-orders-list">
                              {pendingQrOrders.map(order => (
                                <div key={order.id} className="pending-order-item animate-ticket">
                                  <div className="pending-order-meta">
                                    <span className="pending-table">{order.tableNum}</span>
                                    <span className="pending-time en-font">{order.timestamp}</span>
                                  </div>
                                  <div className="pending-items-summary">
                                    {order.items.map(item => `${item.name} (x${item.qty})`).join('، ')}
                                  </div>
                                  <div className="pending-actions-row">
                                    <span className="pending-price en-font">{order.total.toLocaleString()} د.ع</span>
                                    <div className="pending-btn-group">
                                      <button 
                                        onClick={() => handleAcceptQrOrder(order)} 
                                        className="btn-pos-action accept-btn"
                                      >
                                        قبول وطباعة
                                      </button>
                                      <button 
                                        onClick={() => handleRejectQrOrder(order.id, order.tableNum)} 
                                        className="btn-pos-action cancel-btn"
                                      >
                                        إلغاء
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Current POS Direct Cart */}
                        <div className="pos-direct-cart">
                          <h4 className="cart-title-direct">
                            <ShoppingCart size={14} />
                            فاتورة البيع الحالية
                          </h4>

                          {posCart.length > 0 ? (
                            <>
                              <div className="pos-cart-items-list">
                                {posCart.map(item => (
                                  <div key={item.id} className="pos-cart-item-row">
                                    <div className="pos-cart-item-info">
                                      <span className="pos-cart-item-name">{item.name}</span>
                                      <span className="pos-cart-item-price en-font">{(item.price * item.qty).toLocaleString()} د.ع</span>
                                    </div>
                                    <div className="pos-cart-qty-ctrl">
                                      <button 
                                        onClick={() => setPosCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}
                                        className="qty-btn"
                                      >-</button>
                                      <span className="qty-val en-font">{item.qty}</span>
                                      <button 
                                        onClick={() => setPosCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))}
                                        className="qty-btn"
                                      >+</button>
                                      <button 
                                        onClick={() => setPosCart(prev => prev.filter(i => i.id !== item.id))}
                                        className="trash-btn-pos"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="pos-cart-totals">
                                <div className="pos-total-row-item">
                                  <span>المجموع الفرعي</span>
                                  <span className="en-font">
                                    {posCart.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString()} د.ع
                                  </span>
                                </div>
                                <div className="pos-total-row-item">
                                  <span>الضريبة والخدمة (10%)</span>
                                  <span className="en-font">
                                    {(posCart.reduce((sum, item) => sum + (item.price * item.qty), 0) * 0.1).toLocaleString()} د.ع
                                  </span>
                                </div>
                                <div className="pos-total-row-item total-final-row">
                                  <span>الإجمالي</span>
                                  <span className="en-font">
                                    {(posCart.reduce((sum, item) => sum + (item.price * item.qty), 0) * 1.1).toLocaleString()} د.ع
                                  </span>
                                </div>
                              </div>

                              <button onClick={() => handlePosCheckout('سفري/كاونتر')} className="btn btn-primary w-full mt-2">
                                <Printer size={16} />
                                إتمام الفاتورة وطباعة المطبخ
                              </button>
                            </>
                          ) : (
                            <div className="pos-cart-empty-message">
                              <ShoppingCart size={32} className="empty-cart-icon" />
                              <span>انقر على الأطعمة لإضافتها إلى فاتورة الكاشير مباشرة</span>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* POS Right Column - Product menu for cashier */}
                      <div className="pos-menu-col">
                        <div className="pos-menu-grid">
                          {PRODUCTS.map(p => {
                            const isSelected = posCart.some(item => item.id === p.id);
                            return (
                              <button 
                                key={p.id} 
                                onClick={() => {
                                  if (isSelected) {
                                    setPosCart(prev => prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item));
                                  } else {
                                    setPosCart(prev => [...prev, { ...p, qty: 1 }]);
                                  }
                                }}
                                className={`pos-menu-card ${isSelected ? 'pos-menu-card-selected' : ''}`}
                              >
                                <span className="pos-card-prod-name">{p.name}</span>
                                <span className="pos-card-prod-desc">{p.desc.substring(0, 35)}...</span>
                                <span className="pos-card-prod-price en-font">{(p.price).toLocaleString()} د.ع</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* TAB 2: ANALYTICS DASHBOARD */}
              {activeTab === 'analytics' && (
                <div className="analytics-tab-content">
                  <div className="analytics-summary-cards">
                    <div className="analytics-card glass-panel">
                      <span className="ac-title">إجمالي مبيعات الفرع اليوم</span>
                      <span className="ac-value en-font">{(activeBranch.sales).toLocaleString()} د.ع</span>
                      <span className="ac-growth positive">+12.4% عن أمس</span>
                    </div>
                    <div className="analytics-card glass-panel">
                      <span className="ac-title">عدد الطلبات المكتملة</span>
                      <span className="ac-value en-font">{activeBranch.ordersCount} طلب</span>
                      <span className="ac-growth positive">+8 طلبات نشطة حالياً</span>
                    </div>
                    <div className="analytics-card glass-panel">
                      <span className="ac-title">متوسط قيمة الطلب</span>
                      <span className="ac-value en-font">{Math.round(activeBranch.sales / (activeBranch.ordersCount || 1)).toLocaleString()} د.ع</span>
                      <span className="ac-growth positive">مستقر</span>
                    </div>
                  </div>

                  {/* Chart and Activity Feed layout */}
                  <div className="analytics-dashboard-grid">
                    
                    {/* SVG Chart */}
                    <div className="chart-container-box glass-panel">
                      <h4 className="chart-box-title">مخطط نمو الأرباح والمبيعات الأسبوعية (آلاف الدنانير)</h4>
                      <div className="chart-render-wrap">
                        {renderSvgSalesChart()}
                      </div>
                      <div className="chart-labels-months">
                        <span>كانون</span>
                        <span>شباط</span>
                        <span>آذار</span>
                        <span>نيسان</span>
                        <span>مايس</span>
                        <span>حزيران (النشط)</span>
                      </div>
                    </div>

                    {/* Order Activity logs */}
                    <div className="activity-container-box glass-panel">
                      <h4 className="activity-box-title">سجل الطلبات الأخير للفرع</h4>
                      <div className="activity-list-scroll">
                        {orderHistory.filter(o => o.branch === currentBranchKey).map((order, idx) => (
                          <div key={order.id || idx} className="activity-row-item">
                            <div className="act-meta">
                              <span className="act-id">طلب #{order.id}</span>
                              <span className="act-table">{order.table}</span>
                            </div>
                            <div className="act-details">
                              {order.items.map(i => `${i.name} (x${i.qty})`).join('، ')}
                            </div>
                            <div className="act-footer">
                              <span className="act-price en-font">{(order.total).toLocaleString()} د.ع</span>
                              <span className={`act-status-badge status-${order.status}`}>
                                {order.status === 'delivered' ? 'تم التسليم' : order.status === 'ready' ? 'جاهز' : 'في المطبخ'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 3: AI MARKETING ASSISTANT */}
              {activeTab === 'ai' && (
                <div className="ai-marketing-tab">
                  <div className="ai-grid-layout">
                    
                    {/* Left Column: Preset triggers & input */}
                    <div className="ai-input-col glass-panel">
                      <h3 className="ai-section-title">مساعد التسويق الذكي من ديوان AI</h3>
                      <p className="ai-section-desc">
                        اختر أحد النماذج الإعلانية الجاهزة أو اكتب فكرتك الخاصة، وسيقوم الذكاء الاصطناعي بتوليد رسائل تسويقية جذابة باللهجة العراقية لزيادة مبيعاتك.
                      </p>

                      <div className="presets-list-wrapper">
                        <label className="input-label-header">أفكار جاهزة سريعة لمطعمك:</label>
                        <div className="presets-buttons-grid">
                          {AI_PRESETS.map((preset, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => {
                                setAiPrompt(preset.prompt);
                                handleGenerateAiCampaign(preset.prompt);
                              }}
                              className="preset-trigger-btn"
                            >
                              {preset.title}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="custom-prompt-input-wrapper">
                        <label className="input-label-header">أو اكتب فكرة إعلانك المخصصة:</label>
                        <textarea 
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="مثال: خصم 15% على المشويات بمناسبة عطلة نهاية الأسبوع لزبائن الدفع الإلكتروني..."
                          className="ai-textarea"
                        />
                        <button 
                          onClick={() => handleGenerateAiCampaign()} 
                          disabled={aiGenerating || !aiPrompt.trim()}
                          className="btn btn-primary w-full mt-2"
                        >
                          {aiGenerating ? (
                            <>
                              <RefreshCw className="spin-icon-loading" size={16} />
                              جاري التحليل والتوليد الذكي...
                            </>
                          ) : (
                            <>
                              <Sparkles size={16} />
                              إنشاء الحملة الذكية
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Right Column: AI Output Mockups */}
                    <div className="ai-output-col">
                      {generatedCampaign ? (
                        <div className="campaign-output-wrapper animate-fade-in">
                          
                          {/* SMS Mockup */}
                          <div className="output-mockup-card glass-panel">
                            <div className="mockup-header-tag">رسالة SMS الترويجية المقترحة:</div>
                            <p className="mockup-content-text">{generatedCampaign.sms}</p>
                          </div>

                          {/* WhatsApp Mockup */}
                          <div className="output-mockup-card glass-panel">
                            <div className="mockup-header-tag">رسالة WhatsApp التسويقية (الخط الغامق والرموز):</div>
                            <p className="mockup-content-text pre-wrap-format">{generatedCampaign.whatsapp}</p>
                          </div>

                          {/* Audience & Expected Performance */}
                          <div className="output-analytics-grid">
                            <div className="out-stat glass-panel">
                              <span className="out-stat-label">الفئة المستهدفة الموصى بها</span>
                              <span className="out-stat-val">{generatedCampaign.audience}</span>
                            </div>
                            <div className="out-stat glass-panel">
                              <span className="out-stat-label">العائد المتوقع للأداء</span>
                              <span className="out-stat-val highlight-green">{generatedCampaign.performance}</span>
                            </div>
                          </div>

                        </div>
                      ) : (
                        <div className="ai-empty-output-box glass-panel">
                          <Sparkles size={48} className="ai-glowing-icon" />
                          <h4>بانتظار توليد حملتك التسويقية</h4>
                          <p>اختر أحد القوالب الجاهزة على اليمين لتشاهد قدرات التوليد الذكي لرسائل الـ SMS والـ WhatsApp لزبائن مطعمك.</p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 4: BRANCH & INVENTORY MANAGEMENT */}
              {activeTab === 'branches' && (
                <div className="branches-tab-content">
                  
                  {/* Branch info overview header */}
                  <div className="branch-overview-card glass-panel">
                    <div className="bo-info-grid">
                      <div className="bo-info-item">
                        <span className="bo-label">الفرع المختار:</span>
                        <span className="bo-value">{activeBranch.name}</span>
                      </div>
                      <div className="bo-info-item">
                        <span className="bo-label">حالة الفرع الحالية:</span>
                        <span className="bo-value badge-open-status">{activeBranch.status}</span>
                      </div>
                      <div className="bo-info-item">
                        <span className="bo-label">مدير الفرع:</span>
                        <span className="bo-value">{activeBranch.manager}</span>
                      </div>
                      <div className="bo-info-item">
                        <span className="bo-label">مجموع مبيعات اليوم:</span>
                        <span className="bo-value en-font">{(activeBranch.sales).toLocaleString()} د.ع</span>
                      </div>
                    </div>
                  </div>

                  {/* Inventory Stocks */}
                  <div className="inventory-section-wrapper glass-panel">
                    <div className="inv-header-row">
                      <h3 className="inv-title">مستودع المكونات والمواد الخام للفرع</h3>
                      <button onClick={handleRestock} className="btn btn-secondary btn-sm-padding">
                        <RefreshCw size={14} />
                        إعادة تزويد المستودع (شحن)
                      </button>
                    </div>

                    <div className="inventory-bars-grid">
                      {Object.keys(activeBranch.inventory).map(ingKey => {
                        const amount = activeBranch.inventory[ingKey];
                        // Max constants for progress rendering
                        const maxVal = ingKey === 'bun' ? 100 : ingKey === 'drinks' ? 150 : ingKey === 'water' ? 250 : 20.0;
                        const percentage = Math.min(100, Math.round((amount / maxVal) * 100));
                        const isLow = percentage < 20;

                        return (
                          <div key={ingKey} className="inv-bar-card">
                            <div className="inv-bar-labels">
                              <span className="inv-ing-name">{translateIngredient(ingKey)}</span>
                              <span className="inv-ing-qty en-font">
                                {amount} {ingKey === 'bun' || ingKey === 'drinks' || ingKey === 'water' ? 'قطعة' : 'كغم'}
                              </span>
                            </div>
                            <div className="inv-progress-track">
                              <div 
                                className={`inv-progress-fill ${isLow ? 'bg-danger-glow' : 'bg-primary-glow'}`} 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            {isLow && (
                              <span className="low-stock-alert-text">⚠️ المخزون حرج، يرجى إعادة التزويد!</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      <style>{`
        .simulator-section {
          padding: 100px 0;
          background: rgba(8, 11, 17, 0.5);
          position: relative;
        }

        .simulator-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 50px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sim-title {
          font-size: 2.5rem;
          color: var(--text-white);
          margin-top: 16px;
          margin-bottom: 16px;
        }

        .sim-desc {
          font-size: 1.05rem;
          color: var(--text-gray);
          line-height: 1.7;
        }

        /* App Dashboard Frame Styling */
        .app-dashboard-frame {
          border-radius: 20px;
          border: 1px solid var(--border-light);
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          background: #0d121f;
        }

        .dashboard-top-bar {
          background: rgba(17, 24, 39, 0.8);
          border-bottom: 1px solid var(--border-light);
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .db-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .db-logo-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary);
        }

        .db-logo-title {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-white);
        }

        .db-logo-badge {
          font-size: 0.7rem;
          background: rgba(245, 158, 11, 0.1);
          color: var(--primary);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(245, 158, 11, 0.2);
          font-weight: 700;
        }

        .branch-selector-widget {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .widget-label {
          font-size: 0.85rem;
          color: var(--text-gray);
        }

        .branch-dropdown {
          background: var(--bg-dark);
          color: var(--text-white);
          border: 1px solid var(--border-light);
          padding: 8px 12px;
          border-radius: 8px;
          font-family: var(--font-ar);
          font-size: 0.85rem;
          outline: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .branch-dropdown:focus {
          border-color: var(--primary);
        }

        .dashboard-main-body {
          display: grid;
          grid-template-columns: 220px 1fr;
          min-height: 580px;
        }

        /* Sidebar Styling */
        .dashboard-sidebar {
          background: rgba(13, 18, 31, 0.95);
          border-left: 1px solid var(--border-light);
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-link {
          background: none;
          border: none;
          color: var(--text-gray);
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-family: var(--font-ar);
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          text-align: right;
          transition: all var(--transition-fast);
          position: relative;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-white);
        }

        .sidebar-link-active {
          background: rgba(245, 158, 11, 0.08);
          color: var(--primary);
          border-right: 3px solid var(--primary);
          border-radius: 0 10px 10px 0;
        }

        .sidebar-badge-count {
          position: absolute;
          left: 12px;
          background: var(--error);
          color: white;
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 9999px;
          font-weight: 700;
          font-family: var(--font-en);
        }

        .sidebar-badge-warning {
          position: absolute;
          left: 12px;
          background: var(--primary-dark);
          color: black;
          font-size: 0.75rem;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        /* Content Area Styling */
        .dashboard-content {
          padding: 24px;
          background: rgba(8, 11, 17, 0.3);
          overflow-y: auto;
          max-height: 700px;
        }

        /* TAB 1: POS & QR Sync Layout */
        .sync-layout-grid {
          display: grid;
          grid-template-columns: 290px 1fr;
          gap: 24px;
          align-items: start;
        }

        /* Smartphone Simulator Mockup */
        .mobile-phone-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .phone-bezel {
          width: 280px;
          height: 520px;
          background: #27272a;
          border-radius: 36px;
          padding: 10px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 0 4px rgba(255, 255, 255, 0.2);
          position: relative;
          border: 4px solid #3f3f46;
        }

        .phone-camera {
          width: 50px;
          height: 16px;
          background: #18181b;
          border-radius: 8px;
          margin: 0 auto 6px auto;
        }

        .phone-screen {
          width: 100%;
          height: calc(100% - 22px);
          background: #0f172a;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .phone-header {
          background: rgba(30, 41, 59, 0.8);
          padding: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .phone-brand-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .phone-table-badge {
          font-size: 0.65rem;
          background: rgba(6, 182, 212, 0.15);
          color: var(--secondary);
          padding: 2px 8px;
          border-radius: 9999px;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .phone-cats {
          display: flex;
          padding: 8px;
          gap: 6px;
          background: rgba(15, 23, 42, 0.5);
        }

        .phone-cat-pill {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 9999px;
          color: var(--text-gray);
          background: rgba(255, 255, 255, 0.02);
          cursor: pointer;
        }

        .phone-cat-pill.active {
          color: #000;
          background: var(--primary);
        }

        .phone-products-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 70px; /* Spacer for bottom drawer */
        }

        .phone-prod-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .phone-prod-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .phone-prod-price {
          font-size: 0.7rem;
          color: var(--primary-light);
          font-weight: 600;
          display: block;
          margin-top: 2px;
        }

        .phone-add-btn {
          font-size: 0.7rem;
          font-family: var(--font-ar);
          background: rgba(245, 158, 11, 0.1);
          color: var(--primary);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .phone-add-btn:hover {
          background: var(--primary);
          color: #000;
        }

        .phone-qty-control {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .qty-btn {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-white);
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .qty-num {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-white);
          min-width: 14px;
          text-align: center;
        }

        .phone-trash-btn {
          background: none;
          border: none;
          color: var(--error);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
        }

        .phone-cart-drawer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(8px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px 12px;
          z-index: 10;
        }

        .phone-cart-empty {
          text-align: center;
          font-size: 0.7rem;
          color: var(--text-muted);
          padding: 8px 0;
        }

        .phone-cart-active {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .phone-cart-summary {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .phone-checkout-btn {
          background: var(--primary);
          color: #000;
          border: none;
          padding: 8px;
          border-radius: 8px;
          font-family: var(--font-ar);
          font-size: 0.75rem;
          font-weight: 750;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2);
        }

        .phone-label-hint {
          font-size: 0.75rem;
          color: var(--text-gray);
          font-weight: 600;
        }

        /* POS Cashier Panel Layout */
        .pos-cashier-panel {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pos-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 12px;
        }

        .pos-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pos-icon {
          color: var(--primary);
        }

        .pos-section-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .pos-active-branch {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-gray);
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .pos-split-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-items: start;
        }

        /* POS Cart Column */
        .pos-cart-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pending-orders-box {
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
          padding: 12px;
        }

        .pending-box-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--error);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .alert-bell-anim {
          animation: bellRing 1s infinite alternate;
        }

        @keyframes bellRing {
          0% { transform: rotate(-10deg); }
          100% { transform: rotate(10deg); }
        }

        .pending-orders-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 200px;
          overflow-y: auto;
        }

        .pending-order-item {
          background: rgba(13, 20, 35, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 8px 10px;
        }

        .pending-order-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .pending-table {
          color: var(--secondary);
        }

        .pending-time {
          color: var(--text-muted);
        }

        .pending-items-summary {
          font-size: 0.75rem;
          color: var(--text-gray);
          margin-bottom: 6px;
        }

        .pending-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pending-price {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary-light);
        }

        .pending-btn-group {
          display: flex;
          gap: 6px;
        }

        .btn-pos-action {
          border: none;
          font-family: var(--font-ar);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        .accept-btn {
          background: var(--success);
          color: #000;
        }

        .cancel-btn {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-gray);
        }

        /* Direct Bill POS Cart */
        .pos-direct-cart {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .cart-title-direct {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pos-cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 180px;
          overflow-y: auto;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-light);
        }

        .pos-cart-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          background: rgba(255, 255, 255, 0.01);
          padding: 6px;
          border-radius: 6px;
        }

        .pos-cart-item-info {
          display: flex;
          flex-direction: column;
        }

        .pos-cart-item-name {
          font-weight: 600;
          color: var(--text-white);
        }

        .pos-cart-item-price {
          font-size: 0.7rem;
          color: var(--text-gray);
        }

        .pos-cart-qty-ctrl {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .qty-val {
          font-size: 0.8rem;
          font-weight: 700;
          font-family: var(--font-en);
        }

        .trash-btn-pos {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .trash-btn-pos:hover {
          color: var(--error);
        }

        .pos-cart-totals {
          padding: 10px 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 10px;
        }

        .pos-total-row-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-gray);
        }

        .total-final-row {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--primary-light);
        }

        .pos-cart-empty-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 10px;
          text-align: center;
          color: var(--text-muted);
          gap: 8px;
        }

        .empty-cart-icon {
          color: var(--text-muted);
          opacity: 0.3;
        }

        .pos-cart-empty-message span {
          font-size: 0.75rem;
        }

        /* Cashier Menu Grid */
        .pos-menu-col {
          max-height: 480px;
          overflow-y: auto;
        }

        .pos-menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 10px;
        }

        .pos-menu-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          border-radius: 10px;
          padding: 10px;
          text-align: right;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100px;
          font-family: var(--font-ar);
        }

        .pos-menu-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .pos-menu-card-selected {
          border-color: var(--primary-glow);
          background: rgba(245, 158, 11, 0.05);
          box-shadow: inset 0 0 10px rgba(245, 158, 11, 0.1);
        }

        .pos-card-prod-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .pos-card-prod-desc {
          font-size: 0.6rem;
          color: var(--text-muted);
          margin: 2px 0;
          line-height: 1.2;
        }

        .pos-card-prod-price {
          font-size: 0.75rem;
          font-weight: 750;
          color: var(--primary);
          margin-top: 4px;
        }

        /* TAB 2: ANALYTICS DASHBOARD */
        .analytics-summary-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .analytics-card {
          padding: 20px;
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
        }

        .ac-title {
          font-size: 0.8rem;
          color: var(--text-gray);
          font-weight: 600;
        }

        .ac-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-white);
          margin: 6px 0;
        }

        .ac-growth {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .positive {
          color: var(--success);
        }

        .analytics-dashboard-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 20px;
        }

        .chart-container-box, .activity-container-box {
          border: 1px solid var(--border-light);
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .chart-box-title, .activity-box-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 16px;
        }

        .chart-render-wrap {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.02);
          border-radius: 10px;
          padding: 10px;
          position: relative;
        }

        .analytics-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .ping-effect {
          animation: circlePing 2s infinite;
          transform-origin: center;
        }

        @keyframes circlePing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .chart-labels-months {
          display: flex;
          justify-content: space-between;
          padding: 10px 20px 0 20px;
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* Activity feeds */
        .activity-list-scroll {
          max-height: 250px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .activity-row-item {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .act-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .act-id {
          color: var(--text-white);
        }

        .act-table {
          color: var(--secondary);
        }

        .act-details {
          font-size: 0.75rem;
          color: var(--text-gray);
        }

        .act-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2px;
        }

        .act-price {
          font-size: 0.8rem;
          color: var(--primary-light);
          font-weight: 700;
        }

        .act-status-badge {
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }

        .status-delivered { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .status-ready { background: rgba(245, 158, 11, 0.1); color: var(--primary); }
        .status-cooking { background: rgba(59, 130, 246, 0.1); color: var(--accent-blue); }

        /* TAB 3: AI MARKETING */
        .ai-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 20px;
        }

        .ai-input-col {
          padding: 20px;
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
        }

        .ai-section-title {
          font-size: 1.1rem;
          color: var(--text-white);
          margin-bottom: 6px;
        }

        .ai-section-desc {
          font-size: 0.85rem;
          color: var(--text-gray);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .presets-list-wrapper {
          margin-bottom: 16px;
        }

        .input-label-header {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary-light);
          margin-bottom: 8px;
        }

        .presets-buttons-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .preset-trigger-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          color: var(--text-gray);
          padding: 6px 12px;
          border-radius: 8px;
          font-family: var(--font-ar);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .preset-trigger-btn:hover {
          background: rgba(245, 158, 11, 0.08);
          border-color: var(--primary);
          color: var(--primary-light);
        }

        .custom-prompt-input-wrapper {
          display: flex;
          flex-direction: column;
        }

        .ai-textarea {
          width: 100%;
          min-height: 80px;
          background: var(--bg-input);
          border: 1px solid var(--border-light);
          border-radius: 10px;
          padding: 10px 12px;
          color: var(--text-white);
          font-family: var(--font-ar);
          font-size: 0.85rem;
          outline: none;
          resize: vertical;
          transition: border-color var(--transition-fast);
        }

        .ai-textarea:focus {
          border-color: var(--primary);
        }

        .spin-icon-loading {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .ai-empty-output-box {
          height: 100%;
          border: 1px dashed var(--border-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
          gap: 12px;
        }

        .ai-glowing-icon {
          color: var(--primary);
          opacity: 0.4;
          filter: drop-shadow(0 0 10px var(--primary-glow));
          animation: pulseGlowIcon 2s infinite alternate;
        }

        @keyframes pulseGlowIcon {
          0% { opacity: 0.3; transform: scale(0.95); }
          100% { opacity: 0.6; transform: scale(1.05); }
        }

        .ai-empty-output-box h4 {
          color: var(--text-white);
          font-size: 0.95rem;
          font-weight: 700;
        }

        .ai-empty-output-box p {
          font-size: 0.8rem;
          line-height: 1.6;
        }

        /* Campaign generated cards layout */
        .campaign-output-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .output-mockup-card {
          padding: 16px;
          border: 1px solid var(--border-light);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.01);
        }

        .mockup-header-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 8px;
        }

        .mockup-content-text {
          font-size: 0.85rem;
          color: var(--text-white);
          line-height: 1.6;
        }

        .pre-wrap-format {
          white-space: pre-wrap;
          font-family: inherit;
        }

        .output-analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .out-stat {
          padding: 12px;
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .out-stat-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .out-stat-val {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .highlight-green {
          color: var(--success);
        }

        /* TAB 4: BRANCH & INVENTORY */
        .bo-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding: 16px;
        }

        .bo-info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bo-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .bo-value {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .badge-open-status {
          color: var(--success);
        }

        .inventory-section-wrapper {
          margin-top: 20px;
          padding: 20px;
          border: 1px solid var(--border-light);
        }

        .inv-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .inv-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .inventory-bars-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .inv-bar-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.02);
          padding: 12px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
        }

        .inv-bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .inv-ing-name {
          color: var(--text-white);
        }

        .inv-ing-qty {
          color: var(--text-gray);
        }

        .inv-progress-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 4px;
        }

        .inv-progress-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.4s ease-out;
        }

        .bg-primary-glow {
          background: var(--primary);
          box-shadow: 0 0 6px var(--primary-glow);
        }

        .bg-danger-glow {
          background: var(--error);
          box-shadow: 0 0 6px rgba(239, 68, 68, 0.4);
        }

        .low-stock-alert-text {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--error);
        }

        /* Toast Notifications */
        .notification-toast-container {
          position: fixed;
          top: 80px;
          left: 20px;
          z-index: 1100;
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 320px;
          pointer-events: none;
        }

        .notification-toast {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          animation: toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          pointer-events: auto;
        }

        @keyframes toastSlideIn {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .toast-icon-wrap {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toast-success { border-color: rgba(16, 185, 129, 0.3); }
        .toast-success .toast-icon-wrap { background: rgba(16, 185, 129, 0.15); color: var(--success); }

        .toast-error { border-color: rgba(239, 68, 68, 0.3); }
        .toast-error .toast-icon-wrap { background: rgba(239, 68, 68, 0.15); color: var(--error); }

        .toast-warning { border-color: rgba(245, 158, 11, 0.3); }
        .toast-warning .toast-icon-wrap { background: rgba(245, 158, 11, 0.15); color: var(--primary); }

        .toast-info { border-color: rgba(6, 182, 212, 0.3); }
        .toast-info .toast-icon-wrap { background: rgba(6, 182, 212, 0.15); color: var(--secondary); }

        .toast-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-white);
        }

        /* Responsive Dashboard Adjustments */
        @media (max-width: 992px) {
          .dashboard-main-body {
            grid-template-columns: 1fr;
          }
          .dashboard-sidebar {
            flex-direction: row;
            overflow-x: auto;
            border-left: none;
            border-bottom: 1px solid var(--border-light);
            padding: 10px 16px;
          }
          .sidebar-link {
            width: auto;
            white-space: nowrap;
            border-right: none;
            border-radius: 8px;
          }
          .sidebar-link-active {
            border-bottom: 3px solid var(--primary);
            border-radius: 8px 8px 0 0;
          }
          .sync-layout-grid {
            grid-template-columns: 1fr;
          }
          .mobile-phone-container {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .pos-split-container {
            grid-template-columns: 1fr;
          }
          .analytics-summary-cards {
            grid-template-columns: 1fr;
          }
          .analytics-dashboard-grid {
            grid-template-columns: 1fr;
          }
          .ai-grid-layout {
            grid-template-columns: 1fr;
          }
          .inventory-bars-grid {
            grid-template-columns: 1fr;
          }
          .bo-info-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
