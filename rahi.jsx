import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN TOKENS & GLOBAL STYLES
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --blue-50: #EBF2FF;
      --blue-100: #BFCFFF;
      --blue-200: #8FACFF;
      --blue-400: #4070F4;
      --blue-500: #2354E6;
      --blue-600: #1A3EC2;
      --blue-700: #122B96;
      --blue-800: #0C1E6E;
      --blue-900: #071246;
      --teal-400: #0FA8A0;
      --teal-500: #0B8880;
      --green-400: #22C55E;
      --green-500: #16A34A;
      --amber-400: #F59E0B;
      --red-400: #EF4444;
      --red-500: #DC2626;
      --gray-50: #F8FAFC;
      --gray-100: #F1F5F9;
      --gray-200: #E2E8F0;
      --gray-300: #CBD5E1;
      --gray-400: #94A3B8;
      --gray-500: #64748B;
      --gray-600: #475569;
      --gray-700: #334155;
      --gray-800: #1E293B;
      --gray-900: #0F172A;
      --font-display: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 24px;
      --radius-full: 9999px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
      --shadow-lg: 0 10px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06);
      --shadow-blue: 0 4px 20px rgba(64,112,244,0.28);
    }

    body { font-family: var(--font-body); background: var(--gray-50); color: var(--gray-900); font-size: 15px; line-height: 1.6; -webkit-font-smoothing: antialiased; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--gray-300); border-radius: 3px; }

    /* Transitions */
    .transition-all { transition: all 0.2s ease; }

    /* Nav */
    .nav-link { font-family: var(--font-body); font-size: 14px; font-weight: 500; color: var(--gray-600); text-decoration: none; padding: 6px 12px; border-radius: var(--radius-sm); transition: all 0.15s ease; cursor: pointer; background: none; border: none; }
    .nav-link:hover { color: var(--blue-500); background: var(--blue-50); }
    .nav-link.active { color: var(--blue-500); background: var(--blue-50); }

    /* Buttons */
    .btn { font-family: var(--font-body); font-weight: 500; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.18s ease; text-decoration: none; border-radius: var(--radius-md); }
    .btn-primary { background: var(--blue-500); color: white; padding: 11px 24px; font-size: 14px; box-shadow: var(--shadow-blue); }
    .btn-primary:hover { background: var(--blue-600); transform: translateY(-1px); box-shadow: 0 6px 28px rgba(64,112,244,0.36); }
    .btn-primary:active { transform: translateY(0); }
    .btn-secondary { background: white; color: var(--gray-700); border: 1.5px solid var(--gray-200); padding: 10px 22px; font-size: 14px; }
    .btn-secondary:hover { border-color: var(--blue-400); color: var(--blue-500); background: var(--blue-50); }
    .btn-outline { background: transparent; color: var(--blue-500); border: 1.5px solid var(--blue-400); padding: 10px 22px; font-size: 14px; }
    .btn-outline:hover { background: var(--blue-50); }
    .btn-ghost { background: transparent; color: var(--gray-600); padding: 8px 12px; font-size: 14px; }
    .btn-ghost:hover { color: var(--gray-900); background: var(--gray-100); border-radius: var(--radius-sm); }
    .btn-sm { padding: 7px 14px; font-size: 13px; border-radius: var(--radius-sm); }
    .btn-danger { background: #FEF2F2; color: var(--red-500); border: 1.5px solid #FECACA; padding: 8px 16px; font-size: 13px; border-radius: var(--radius-sm); }
    .btn-success { background: #F0FDF4; color: var(--green-500); border: 1.5px solid #BBF7D0; padding: 8px 16px; font-size: 13px; border-radius: var(--radius-sm); }

    /* Cards */
    .card { background: white; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm); overflow: hidden; }
    .card-hover { transition: all 0.2s ease; cursor: pointer; }
    .card-hover:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--blue-200); }

    /* Form */
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-label { font-size: 13px; font-weight: 500; color: var(--gray-700); }
    .form-input { font-family: var(--font-body); font-size: 14px; color: var(--gray-800); background: white; border: 1.5px solid var(--gray-200); border-radius: var(--radius-md); padding: 10px 14px; outline: none; transition: all 0.15s ease; width: 100%; }
    .form-input:focus { border-color: var(--blue-400); box-shadow: 0 0 0 3px rgba(64,112,244,0.12); }
    .form-input::placeholder { color: var(--gray-400); }

    /* Badge */
    .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: var(--radius-full); text-transform: uppercase; letter-spacing: 0.03em; }
    .badge-blue { background: var(--blue-50); color: var(--blue-600); }
    .badge-green { background: #F0FDF4; color: var(--green-500); }
    .badge-amber { background: #FFFBEB; color: #D97706; }
    .badge-red { background: #FEF2F2; color: var(--red-500); }
    .badge-gray { background: var(--gray-100); color: var(--gray-600); }
    .badge-teal { background: #F0FDFA; color: var(--teal-500); }

    /* Tags */
    .tag { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 500; color: var(--gray-600); background: var(--gray-100); padding: 4px 10px; border-radius: var(--radius-full); }

    /* Avatar */
    .avatar { border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: var(--font-display); flex-shrink: 0; }
    .avatar-sm { width: 32px; height: 32px; font-size: 12px; }
    .avatar-md { width: 40px; height: 40px; font-size: 14px; }
    .avatar-lg { width: 52px; height: 52px; font-size: 18px; }
    .avatar-xl { width: 72px; height: 72px; font-size: 24px; }
    .avatar-blue { background: var(--blue-100); color: var(--blue-700); }
    .avatar-teal { background: #CCFBF1; color: #0F766E; }
    .avatar-amber { background: #FEF3C7; color: #B45309; }
    .avatar-green { background: #DCFCE7; color: #166534; }

    /* Stars */
    .stars { display: flex; gap: 2px; }
    .star { color: var(--amber-400); font-size: 14px; }

    /* Divider */
    .divider { height: 1px; background: var(--gray-200); margin: 0; }

    /* Progress */
    .progress-bar { height: 6px; background: var(--gray-200); border-radius: var(--radius-full); overflow: hidden; }
    .progress-fill { height: 100%; border-radius: var(--radius-full); background: linear-gradient(90deg, var(--blue-400), var(--blue-600)); }

    /* Status dot */
    .status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .status-dot-green { background: var(--green-400); }
    .status-dot-amber { background: var(--amber-400); }
    .status-dot-red { background: var(--red-400); }
    .status-dot-gray { background: var(--gray-400); }
    .status-dot-blue { background: var(--blue-400); }

    /* Section */
    .section { padding: 80px 0; }
    .section-sm { padding: 48px 0; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .container-sm { max-width: 960px; margin: 0 auto; padding: 0 24px; }

    /* Grid */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    @media (max-width: 768px) {
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    }

    /* Sidebar layout */
    .sidebar-layout { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
    @media (max-width: 900px) { .sidebar-layout { grid-template-columns: 1fr; } }

    /* Sidebar */
    .sidebar { background: var(--gray-900); padding: 0; display: flex; flex-direction: column; }
    .sidebar-header { padding: 24px 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .sidebar-nav { padding: 16px 12px; flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .sidebar-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.6); cursor: pointer; text-decoration: none; transition: all 0.15s ease; }
    .sidebar-link:hover { color: white; background: rgba(255,255,255,0.08); }
    .sidebar-link.active { color: white; background: var(--blue-600); }
    .sidebar-link svg { width: 18px; height: 18px; flex-shrink: 0; }
    .sidebar-section { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.3); padding: 16px 12px 6px; }

    /* Dashboard content */
    .dashboard-content { background: var(--gray-50); padding: 32px; overflow-y: auto; }
    .dashboard-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
    .page-title { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--gray-900); }
    .page-subtitle { font-size: 14px; color: var(--gray-500); margin-top: 2px; }

    /* Stats row */
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
    @media (max-width: 1100px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }
    .stat-card { background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 20px; }
    .stat-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gray-400); margin-bottom: 8px; }
    .stat-value { font-family: var(--font-display); font-size: 28px; font-weight: 800; color: var(--gray-900); line-height: 1; }
    .stat-change { font-size: 12px; margin-top: 6px; display: flex; align-items: center; gap: 4px; }
    .stat-up { color: var(--green-500); }
    .stat-down { color: var(--red-500); }

    /* Ride card */
    .ride-card { background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 20px; transition: all 0.2s ease; }
    .ride-card:hover { border-color: var(--blue-200); box-shadow: var(--shadow-md); }
    .ride-route { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .route-point { display: flex; flex-direction: column; }
    .route-city { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--gray-900); }
    .route-label { font-size: 12px; color: var(--gray-500); }
    .route-arrow { flex: 1; display: flex; align-items: center; justify-content: center; color: var(--gray-400); }
    .route-line { flex: 1; height: 1px; background: var(--gray-200); position: relative; }
    .route-line::after { content: '→'; position: absolute; right: -8px; top: -10px; font-size: 16px; color: var(--gray-400); }

    /* Map placeholder */
    .map-placeholder { background: linear-gradient(135deg, #EBF2FF, #E0F2FE); border-radius: var(--radius-md); overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center; }
    .map-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(64,112,244,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(64,112,244,0.06) 1px, transparent 1px); background-size: 32px 32px; }

    /* Chat */
    .chat-bubble { max-width: 75%; padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.5; }
    .chat-bubble-sent { background: var(--blue-500); color: white; border-bottom-right-radius: 4px; margin-left: auto; }
    .chat-bubble-recv { background: var(--gray-100); color: var(--gray-800); border-bottom-left-radius: 4px; }

    /* Timeline */
    .timeline { position: relative; padding-left: 28px; }
    .timeline::before { content: ''; position: absolute; left: 8px; top: 8px; bottom: 8px; width: 2px; background: var(--gray-200); }
    .timeline-item { position: relative; padding-bottom: 20px; }
    .timeline-dot { position: absolute; left: -24px; top: 4px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px var(--blue-400); background: var(--blue-400); }
    .timeline-dot-gray { box-shadow: 0 0 0 2px var(--gray-300); background: var(--gray-300); }

    /* Toggle */
    .toggle { position: relative; width: 44px; height: 24px; background: var(--gray-200); border-radius: var(--radius-full); cursor: pointer; transition: background 0.2s; border: none; }
    .toggle.on { background: var(--blue-500); }
    .toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: white; border-radius: 50%; transition: transform 0.2s; box-shadow: var(--shadow-sm); }
    .toggle.on::after { transform: translateX(20px); }

    /* Alert */
    .alert { padding: 12px 16px; border-radius: var(--radius-md); font-size: 14px; display: flex; align-items: flex-start; gap: 10px; }
    .alert-info { background: var(--blue-50); color: var(--blue-700); border: 1px solid var(--blue-100); }
    .alert-success { background: #F0FDF4; color: var(--green-500); border: 1px solid #BBF7D0; }
    .alert-warning { background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; }
    .alert-danger { background: #FEF2F2; color: var(--red-500); border: 1px solid #FECACA; }

    /* Table */
    .data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .data-table th { text-align: left; padding: 10px 16px; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--gray-500); background: var(--gray-50); border-bottom: 1px solid var(--gray-200); }
    .data-table td { padding: 14px 16px; border-bottom: 1px solid var(--gray-100); vertical-align: middle; }
    .data-table tbody tr:hover { background: var(--gray-50); }
    .data-table tbody tr:last-child td { border-bottom: none; }

    /* Tabs */
    .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--gray-200); margin-bottom: 24px; }
    .tab { font-size: 14px; font-weight: 500; color: var(--gray-500); padding: 10px 16px; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s ease; background: none; border-top: none; border-left: none; border-right: none; font-family: var(--font-body); }
    .tab:hover { color: var(--gray-700); }
    .tab.active { color: var(--blue-500); border-bottom-color: var(--blue-500); }

    /* SOS */
    .sos-btn { width: 70px; height: 70px; border-radius: 50%; background: var(--red-500); color: white; font-family: var(--font-display); font-size: 15px; font-weight: 800; border: 4px solid #FCA5A5; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 0 rgba(239,68,68,0.4); animation: pulse-sos 2s infinite; transition: all 0.2s ease; }
    .sos-btn:hover { transform: scale(1.05); box-shadow: 0 0 24px rgba(239,68,68,0.5); }
    @keyframes pulse-sos { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); } 70% { box-shadow: 0 0 0 14px rgba(239,68,68,0); } 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); } }

    /* Verified badge */
    .verified-badge { display: inline-flex; align-items: center; gap: 4px; background: linear-gradient(135deg, #0EA5E9, #2354E6); color: white; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: var(--radius-full); }

    /* Mountain decoration */
    .mountain-deco { position: absolute; bottom: 0; left: 0; right: 0; opacity: 0.06; pointer-events: none; }

    /* Chip input */
    .chip { display: inline-flex; align-items: center; gap: 6px; background: var(--blue-50); color: var(--blue-700); font-size: 13px; font-weight: 500; padding: 5px 10px; border-radius: var(--radius-full); border: 1px solid var(--blue-100); }

    /* Notification dot */
    .notif-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--red-400); position: absolute; top: -2px; right: -2px; border: 2px solid white; }

    /* Search input with icon */
    .search-wrapper { position: relative; }
    .search-wrapper .form-input { padding-left: 40px; }
    .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--gray-400); pointer-events: none; }

    /* Page header */
    .page-header { background: linear-gradient(135deg, var(--blue-900) 0%, var(--blue-700) 50%, var(--teal-500) 100%); color: white; padding: 64px 0 80px; position: relative; overflow: hidden; }
    .page-header::before { content: ''; position: absolute; top: -40px; right: -80px; width: 400px; height: 400px; border-radius: 50%; background: rgba(255,255,255,0.04); }
    .page-header::after { content: ''; position: absolute; bottom: -100px; left: -60px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.03); }

    /* Floating label for search */
    .search-bar-hero { background: white; border-radius: var(--radius-xl); padding: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.18); display: grid; grid-template-columns: 1fr 1fr auto auto; gap: 16px; align-items: end; }
    @media (max-width: 768px) { .search-bar-hero { grid-template-columns: 1fr; } }

    /* Ride step indicator */
    .step-indicator { display: flex; align-items: center; gap: 8px; }
    .step-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .step-line { flex: 1; height: 2px; background: var(--gray-200); min-width: 24px; }

    /* Overlay */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 24px; }
    .modal { background: white; border-radius: var(--radius-xl); padding: 32px; max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg); }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .modal-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--gray-900); }

    /* Logo */
    .logo { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--blue-500); letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px; }
    .logo-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal-400); display: inline-block; }

    /* Section title */
    .section-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue-500); margin-bottom: 12px; }
    .section-title { font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--gray-900); line-height: 1.15; }
    .section-subtitle { font-size: 17px; color: var(--gray-500); margin-top: 12px; max-width: 540px; line-height: 1.7; }

    /* Feature icon */
    .feature-icon { width: 52px; height: 52px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }

    /* Gradient text */
    .gradient-text { background: linear-gradient(135deg, var(--blue-500), var(--teal-400)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    /* Driver card */
    .driver-profile { display: flex; align-items: center; gap: 12px; padding: 16px; background: var(--gray-50); border-radius: var(--radius-md); border: 1px solid var(--gray-200); }

    /* Pricing chip */
    .price-chip { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--gray-900); }
    .price-chip span { font-size: 13px; font-weight: 500; color: var(--gray-500); }

    /* Seat indicator */
    .seat { width: 28px; height: 28px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }
    .seat-available { background: var(--blue-50); color: var(--blue-600); border: 1.5px solid var(--blue-100); }
    .seat-taken { background: var(--gray-100); color: var(--gray-400); border: 1.5px solid var(--gray-200); }
    .seat-selected { background: var(--blue-500); color: white; border: 1.5px solid var(--blue-600); }

    /* Earnings chart bars */
    .bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 140px; }
    .bar-group { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
    .bar { border-radius: 4px 4px 0 0; background: var(--blue-400); width: 100%; transition: all 0.3s ease; }
    .bar:hover { background: var(--blue-600); }
    .bar-label { font-size: 10px; color: var(--gray-500); font-weight: 500; }

    /* Verification step */
    .verify-step { display: flex; align-items: flex-start; gap: 14px; padding: 16px; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-md); }
    .verify-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .verify-icon-pending { background: #FFFBEB; color: #D97706; }
    .verify-icon-approved { background: #F0FDF4; color: var(--green-500); }
    .verify-icon-rejected { background: #FEF2F2; color: var(--red-500); }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .dashboard-content { padding: 20px 16px; }
      .stats-row { grid-template-columns: 1fr 1fr; }
      .section-title { font-size: 28px; }
      .modal { padding: 24px; }
    }
  `}</style>
);

// ============================================================
// ICONS (inline SVG)
// ============================================================
const Icon = ({ name, size = 20, style = {} }) => {
  const icons = {
    map: <><circle cx="12" cy="11" r="3"/><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></>,
    search: <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    car: <><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    chat: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    wallet: <><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    arrow_right: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    alert: <><triangle><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></triangle><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    upload: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/></>,
    list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    mountain: <><path d="M3 17l4-8 4 5 3-3 7 6H3z"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    chevron_down: <><polyline points="6 9 12 15 18 9"/></>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
    navigation: <><polygon points="3 11 22 2 13 21 11 13 3 11"/></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      {icons[name] || null}
    </svg>
  );
};

// ============================================================
// STORE (Simplified Zustand-like state)
// ============================================================
const useStore = (() => {
  let state = {
    currentPage: 'landing',
    currentRole: null, // 'passenger' | 'driver' | 'admin'
    user: null,
    modalOpen: null,
    notifications: 3,
    sidebarTab: 'dashboard',
    searchFrom: '',
    searchTo: '',
    searchDate: '',
    searchPassengers: '1',
    selectedRide: null,
    activeTab: 0,
    chatMessages: [
      { id: 1, from: 'driver', text: 'Hello! I\'m on my way. Will reach pickup in about 10 minutes.', time: '9:42 AM' },
      { id: 2, from: 'me', text: 'Great, I\'ll be at the main gate.', time: '9:43 AM' },
      { id: 3, from: 'driver', text: 'Perfect! See you soon. My vehicle is a white Maruti Ertiga.', time: '9:43 AM' },
    ],
  };
  const listeners = new Set();
  return (selector) => {
    const [, forceRender] = useState(0);
    useEffect(() => {
      const listener = () => forceRender(n => n + 1);
      listeners.add(listener);
      return () => listeners.delete(listener);
    }, []);
    const setState = (updates) => {
      state = { ...state, ...(typeof updates === 'function' ? updates(state) : updates) };
      listeners.forEach(l => l());
    };
    return [selector(state), setState];
  };
})();

// ============================================================
// SAMPLE DATA
// ============================================================
const RIDES = [
  { id: 1, from: 'Pithoragarh', to: 'Haldwani', fromFull: 'Pithoragarh Bus Stand', toFull: 'Haldwani Transport Nagar', date: '27 May', time: '6:30 AM', price: 350, seats: 3, driver: { name: 'Rajesh Kumar', avatar: 'RK', color: 'blue', rating: 4.8, trips: 142, verified: true }, car: 'Maruti Ertiga (White)', plate: 'UK 03 AB 1234', duration: '4h 30m', tags: ['AC', 'Music OK', 'No Smoking'], intermediate: ['Almora', 'Bhowali'] },
  { id: 2, from: 'Almora', to: 'Haldwani', fromFull: 'Almora Mall Road', toFull: 'Haldwani Transport Nagar', date: '27 May', time: '7:00 AM', price: 220, seats: 2, driver: { name: 'Sunita Devi', avatar: 'SD', color: 'amber', rating: 4.9, trips: 89, verified: true }, car: 'Tata Nexon (Grey)', plate: 'UK 01 XY 5678', duration: '2h 15m', tags: ['AC', 'Lady Driver', 'Music OK'], intermediate: ['Bhimtal', 'Bhowali'] },
  { id: 3, from: 'Pithoragarh', to: 'Kathgodam', fromFull: 'Pithoragarh Bus Stand', toFull: 'Kathgodam Railway Station', date: '28 May', time: '5:00 AM', price: 400, seats: 4, driver: { name: 'Mohan Singh', avatar: 'MS', color: 'teal', rating: 4.6, trips: 203, verified: true }, car: 'Mahindra Bolero (Blue)', plate: 'UK 03 MN 9012', duration: '5h 0m', tags: ['No AC', 'Luggage OK', 'Train Sync'], intermediate: ['Almora', 'Ranikhet', 'Bhowali'] },
];

const DRIVER_RIDES = [
  { id: 1, from: 'Pithoragarh', to: 'Haldwani', date: '27 May', time: '6:30 AM', price: 350, seats: 3, booked: 1, status: 'upcoming' },
  { id: 2, from: 'Almora', to: 'Pithoragarh', date: '24 May', time: '8:00 AM', price: 300, seats: 4, booked: 4, status: 'completed' },
  { id: 3, from: 'Pithoragarh', to: 'Kathgodam', date: '21 May', time: '5:00 AM', price: 400, seats: 4, booked: 3, status: 'completed' },
];

const ADMIN_USERS = [
  { id: 1, name: 'Rajesh Kumar', role: 'driver', status: 'active', joined: 'Jan 2024', trips: 142, verified: true },
  { id: 2, name: 'Sunita Devi', role: 'driver', status: 'pending', joined: 'Mar 2024', trips: 0, verified: false },
  { id: 3, name: 'Priya Sharma', role: 'passenger', status: 'active', joined: 'Feb 2024', trips: 18, verified: true },
  { id: 4, name: 'Amit Rawat', role: 'driver', status: 'suspended', joined: 'Apr 2024', trips: 34, verified: true },
  { id: 5, name: 'Deepa Joshi', role: 'passenger', status: 'active', joined: 'May 2024', trips: 7, verified: false },
];

const POPULAR_ROUTES = [
  { from: 'Pithoragarh', to: 'Haldwani', rides: 24, avgPrice: 350 },
  { from: 'Almora', to: 'Haldwani', rides: 18, avgPrice: 220 },
  { from: 'Bageshwar', to: 'Kathgodam', rides: 12, avgPrice: 280 },
  { from: 'Munsiyari', to: 'Pithoragarh', rides: 9, avgPrice: 200 },
];

// ============================================================
// NAVBAR
// ============================================================
const Navbar = () => {
  const [state, setState] = useStore(s => s);
  const [mobileOpen, setMobileOpen] = useState(false);

  const goTo = (page) => { setState({ currentPage: page }); setMobileOpen(false); };

  return (
    <nav style={{ background: 'white', borderBottom: '1px solid var(--gray-200)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <button onClick={() => goTo('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <div className="logo">
            <Icon name="mountain" size={24} style={{ color: 'var(--blue-500)' }} />
            Raahi<span className="logo-dot" />
          </div>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {!state.currentRole && <>
            <button className="nav-link" onClick={() => goTo('landing')}>Home</button>
            <button className="nav-link" onClick={() => goTo('safety')}>Safety</button>
            <button className="nav-link" onClick={() => goTo('about')}>About</button>
          </>}
          {state.currentRole === 'passenger' && <>
            <button className={`nav-link ${state.currentPage === 'passenger_dashboard' ? 'active' : ''}`} onClick={() => { setState({ currentPage: 'passenger_dashboard', sidebarTab: 'dashboard' }); }}>Dashboard</button>
            <button className={`nav-link ${state.currentPage === 'search' ? 'active' : ''}`} onClick={() => goTo('search')}>Find Rides</button>
          </>}
          {state.currentRole === 'driver' && <>
            <button className={`nav-link ${state.currentPage === 'driver_dashboard' ? 'active' : ''}`} onClick={() => { setState({ currentPage: 'driver_dashboard', sidebarTab: 'dashboard' }); }}>Dashboard</button>
          </>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {state.currentRole ? (
            <>
              {state.currentRole !== 'admin' && (
                <button onClick={() => setState({ modalOpen: 'notifications' })} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 8, color: 'var(--gray-600)' }}>
                  <Icon name="bell" size={20} />
                  {state.notifications > 0 && <span className="notif-dot" />}
                </button>
              )}
              <button className="btn btn-ghost btn-sm" onClick={() => setState({ currentRole: null, currentPage: 'landing', user: null })}>
                <Icon name="logout" size={16} />Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary btn-sm" onClick={() => setState({ modalOpen: 'login' })}>Sign In</button>
              <button className="btn btn-primary btn-sm" onClick={() => setState({ modalOpen: 'login' })}>Get Started</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// ============================================================
// LANDING PAGE
// ============================================================
const LandingPage = () => {
  const [, setState] = useStore(s => s);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    setState({ currentPage: 'search', searchFrom: from, searchTo: to, searchDate: date, currentRole: 'passenger', user: { name: 'Priya Sharma', role: 'passenger' } });
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(145deg, #07124688 0%, #1A3EC222 30%, #071246 100%)', backgroundImage: 'linear-gradient(145deg, #071246 0%, #122B96 40%, #0F6E56 100%)', minHeight: 640, display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* BG dots */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {/* Mountain silhouette */}
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.12 }}>
          <path d="M0,200 L0,120 L120,80 L240,140 L360,60 L480,120 L600,40 L720,100 L840,50 L960,110 L1080,70 L1200,130 L1320,60 L1440,100 L1440,200 Z" fill="white" />
        </svg>

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)', padding: '6px 14px', marginBottom: 24 }}>
              <Icon name="mountain" size={14} style={{ color: '#86EFAC' }} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Hill Region's Trusted Ride-Share Platform</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 54, fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              Travel the Mountains<br /><span style={{ color: '#86EFAC' }}>Together, Safely.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 40, maxWidth: 500 }}>
              Connect with verified drivers on Pithoragarh, Almora, Haldwani routes. Affordable, safe, and community-powered travel for Uttarakhand's hills.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ fontSize: 16, padding: '13px 28px' }} onClick={() => setState({ modalOpen: 'login' })}>
                Find a Ride <Icon name="arrow_right" size={18} />
              </button>
              <button className="btn" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)', fontSize: 16, padding: '13px 28px', borderRadius: 'var(--radius-md)' }} onClick={() => setState({ modalOpen: 'login' })}>
                Offer a Ride
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 32, marginTop: 60, width: 'fit-content' }}>
            {[['12,000+', 'Rides Completed'], ['2,400+', 'Verified Drivers'], ['48,000+', 'Happy Passengers']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'white' }}>{v}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container" style={{ marginTop: -40, position: 'relative', zIndex: 10, paddingBottom: 0 }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.14)', border: '1px solid var(--gray-100)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 180px auto', gap: 16, alignItems: 'end' }}>
            <div className="form-group">
              <label className="form-label">From</label>
              <div className="search-wrapper">
                <div className="search-icon"><Icon name="map" size={16} /></div>
                <input className="form-input" placeholder="Pithoragarh, Almora..." value={from} onChange={e => setFrom(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">To</label>
              <div className="search-wrapper">
                <div className="search-icon"><Icon name="navigation" size={16} /></div>
                <input className="form-input" placeholder="Haldwani, Kathgodam..." value={to} onChange={e => setTo(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" className="form-input" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <button className="btn btn-primary" style={{ padding: '11px 28px', height: 44 }} onClick={handleSearch}>
              <Icon name="search" size={18} />Search
            </button>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">Routes</div>
            <h2 className="section-title">Popular Mountain Routes</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0' }}>Daily rides across Uttarakhand's most-travelled hill routes</p>
          </div>
          <div className="grid-4">
            {POPULAR_ROUTES.map(r => (
              <button key={r.from + r.to} className="card card-hover" style={{ padding: 24, border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', background: 'white' }} onClick={handleSearch}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, background: 'var(--blue-50)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-500)' }}>
                    <Icon name="car" size={22} />
                  </div>
                  <span className="badge badge-blue">{r.rides} rides</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>{r.from}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 4 }}>↓</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>{r.to}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>From <strong style={{ color: 'var(--gray-900)' }}>₹{r.avgPrice}</strong>/seat</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: 'var(--gray-900)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal-400)', marginBottom: 12 }}>Why Raahi</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'white', lineHeight: 1.15 }}>Built for the Mountains</h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>Purpose-built for hill region travel, not adapted from city apps.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: 'shield', color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', title: 'Verified Drivers', desc: 'Every driver is verified with Aadhaar, license, RC, and vehicle plate. Only approved drivers can carry passengers.' },
              { icon: 'zap', color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', title: 'Smart Route Matching', desc: 'Find rides even on partial routes. Pithoragarh → Haldwani driver can pick you up from Almora in between.' },
              { icon: 'phone', color: '#F472B6', bg: 'rgba(244,114,182,0.12)', title: 'Emergency SOS', desc: 'One-press SOS sends your live location to emergency contacts and Raahi safety team immediately.' },
            ].map(f => (
              <div key={f.title} style={{ padding: 32, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ width: 52, height: 52, background: f.bg, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, marginBottom: 20 }}>
                  <Icon name={f.icon} size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">Stories</div>
            <h2 className="section-title">Trusted by Mountain Travellers</h2>
          </div>
          <div className="grid-3">
            {[
              { name: 'Kavita Bisht', loc: 'Pithoragarh', text: 'Finally a platform that understands hill travel. I regularly travel to Haldwani and Raahi has made it so much safer and affordable.', rating: 5, avatar: 'KB', color: 'blue' },
              { name: 'Suresh Pant', loc: 'Almora', text: 'As a driver, Raahi helped me earn extra income on my daily commute. The verification process gave passengers more trust in me.', rating: 5, avatar: 'SP', color: 'teal' },
              { name: 'Meena Arya', loc: 'Bageshwar', text: 'The SOS feature gave my family peace of mind. They can track my location during mountain journeys. Truly thoughtful design.', rating: 5, avatar: 'MA', color: 'amber' },
            ].map(t => (
              <div key={t.name} className="card" style={{ padding: 28 }}>
                <div className="stars" style={{ marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, i) => <span key={i} className="star">★</span>)}
                </div>
                <p style={{ fontSize: 15, color: 'var(--gray-700)', lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className={`avatar avatar-md avatar-${t.color}`}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{t.loc}, Uttarakhand</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, var(--blue-600), var(--blue-800))', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 400, height: 400, border: '1px solid rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div className="container" style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: 'white', marginBottom: 16 }}>Ready to Travel Smarter?</h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 36 }}>Join 48,000+ travellers on Uttarakhand's most trusted ride-share.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn" style={{ background: 'white', color: 'var(--blue-600)', padding: '13px 32px', fontSize: 16, borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)' }} onClick={() => setState({ modalOpen: 'login' })}>
              Start as Passenger
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', padding: '13px 32px', fontSize: 16, borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)' }} onClick={() => setState({ modalOpen: 'login' })}>
              Become a Driver
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--gray-900)', padding: '60px 0 32px', color: 'rgba(255,255,255,0.5)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <div className="logo" style={{ marginBottom: 16, color: 'white' }}>
                <Icon name="mountain" size={22} style={{ color: 'var(--teal-400)' }} />
                Raahi<span style={{ background: 'var(--teal-400)', width: 8, height: 8, borderRadius: '50%', display: 'inline-block', marginLeft: 2 }} />
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.4)', maxWidth: 280 }}>
                Raahi connects hill travellers with verified drivers. Safe, affordable, community-powered ride-sharing for Uttarakhand.
              </p>
            </div>
            {[
              { title: 'Platform', links: ['Find Rides', 'Offer a Ride', 'Driver Signup', 'Pricing'] },
              { title: 'Safety', links: ['Verification', 'SOS Feature', 'Safety Tips', 'Report Issue'] },
              { title: 'Company', links: ['About Us', 'Contact', 'Blog', 'Careers'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.title}</div>
                {col.links.map(l => <div key={l} style={{ fontSize: 14, marginBottom: 10, cursor: 'pointer', transition: 'color 0.15s' }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 13 }}>© 2024 Raahi Technologies Pvt. Ltd. · Pithoragarh, Uttarakhand</div>
            <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
              <span style={{ cursor: 'pointer' }}>Grievance Officer</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================================
// SEARCH PAGE
// ============================================================
const SearchPage = () => {
  const [state, setState] = useStore(s => s);
  const [filters, setFilters] = useState({ ac: false, ladies: false, luggage: false, maxPrice: 500 });
  const [from, setFrom] = useState(state.searchFrom);
  const [to, setTo] = useState(state.searchTo);

  const rides = RIDES.filter(r => {
    if (from && !r.from.toLowerCase().includes(from.toLowerCase()) && !r.intermediate?.some(i => i.toLowerCase().includes(from.toLowerCase()))) return false;
    if (to && !r.to.toLowerCase().includes(to.toLowerCase())) return false;
    if (r.price > filters.maxPrice) return false;
    if (filters.ac && !r.tags.includes('AC')) return false;
    if (filters.ladies && !r.tags.includes('Lady Driver')) return false;
    return true;
  });

  return (
    <div style={{ background: 'var(--gray-50)', minHeight: 'calc(100vh - 64px)', padding: '32px 0' }}>
      <div className="container">
        {/* Search header */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', padding: 20, marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr 180px auto', gap: 12, alignItems: 'end' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">From</label>
            <input className="form-input" value={from} onChange={e => setFrom(e.target.value)} placeholder="Origin city..." />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">To</label>
            <input className="form-input" value={to} onChange={e => setTo(e.target.value)} placeholder="Destination city..." />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Date</label>
            <input type="date" className="form-input" defaultValue="2026-05-27" />
          </div>
          <button className="btn btn-primary" style={{ height: 44 }}>
            <Icon name="search" size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
          {/* Filters sidebar */}
          <div style={{ height: 'fit-content' }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Filters</div>
                <button className="btn btn-ghost" style={{ fontSize: 12, padding: '4px 8px' }} onClick={() => setFilters({ ac: false, ladies: false, luggage: false, maxPrice: 500 })}>Clear all</button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div className="form-label" style={{ marginBottom: 12 }}>Max Price (₹)</div>
                <input type="range" min={100} max={600} value={filters.maxPrice} step={50} style={{ width: '100%', accentColor: 'var(--blue-500)' }} onChange={e => setFilters({ ...filters, maxPrice: +e.target.value })} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>
                  <span>₹100</span><span style={{ fontWeight: 600, color: 'var(--blue-600)' }}>₹{filters.maxPrice}</span><span>₹600</span>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div className="form-label" style={{ marginBottom: 12 }}>Amenities</div>
                {[['ac', 'AC Vehicle'], ['ladies', 'Lady Driver'], ['luggage', 'Luggage Space']].map(([key, label]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer', fontSize: 14, color: 'var(--gray-700)' }}>
                    <input type="checkbox" checked={filters[key]} onChange={e => setFilters({ ...filters, [key]: e.target.checked })} style={{ accentColor: 'var(--blue-500)', width: 16, height: 16 }} />
                    {label}
                  </label>
                ))}
              </div>

              <div>
                <div className="form-label" style={{ marginBottom: 12 }}>Departure Time</div>
                {[['Early Morning (5–8 AM)', true], ['Morning (8–12 PM)', false], ['Afternoon (12–5 PM)', false]].map(([label, checked]) => (
                  <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer', fontSize: 14, color: 'var(--gray-700)' }}>
                    <input type="checkbox" defaultChecked={checked} style={{ accentColor: 'var(--blue-500)', width: 16, height: 16 }} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontWeight: 600, color: 'var(--gray-700)', fontSize: 15 }}>{rides.length} rides found</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>Sort by:</span>
                <select className="form-input" style={{ width: 'auto', padding: '6px 10px', fontSize: 13 }}>
                  <option>Departure Time</option>
                  <option>Price (Low)</option>
                  <option>Price (High)</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {rides.length === 0 ? (
              <div className="card" style={{ padding: 48, textAlign: 'center' }}>
                <Icon name="map" size={48} style={{ color: 'var(--gray-300)', margin: '0 auto 16px' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8 }}>No rides found</div>
                <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>Try adjusting your filters or search for a different route.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {rides.map(ride => (
                  <button key={ride.id} className="ride-card" style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', padding: 24, background: 'white', width: '100%', textAlign: 'left', cursor: 'pointer' }} onClick={() => setState({ selectedRide: ride, currentPage: 'ride_detail' })}>
                    {/* Route */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--gray-900)' }}>{ride.from}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{ride.time} · {ride.fromFull}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ height: 2, flex: 1, background: 'var(--gray-200)', position: 'relative' }}>
                          {ride.intermediate?.map((stop, i) => (
                            <div key={stop} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, background: 'var(--blue-300)', borderRadius: '50%', left: `${((i + 1) / (ride.intermediate.length + 1)) * 100}%` }} title={stop} />
                          ))}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>{ride.duration}</div>
                        <div style={{ height: 2, flex: 0.1, background: 'var(--gray-200)' }} />
                        <Icon name="arrow_right" size={16} style={{ color: 'var(--gray-400)' }} />
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--gray-900)' }}>{ride.to}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{ride.toFull}</div>
                      </div>
                    </div>

                    {/* Intermediate stops */}
                    {ride.intermediate && (
                      <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 16 }}>
                        Stops: {ride.intermediate.join(' → ')}
                      </div>
                    )}

                    <div className="divider" style={{ marginBottom: 16 }} />

                    {/* Driver & Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className={`avatar avatar-md avatar-${ride.driver.color}`}>{ride.driver.avatar}</div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>{ride.driver.name}</span>
                            {ride.driver.verified && <span className="verified-badge"><Icon name="check" size={10} />Verified</span>}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>⭐ {ride.driver.rating} · {ride.driver.trips} trips · {ride.car}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {ride.tags.map(t => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--gray-900)' }}>₹{ride.price}</div>
                          <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{ride.seats} seats left</div>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); setState({ selectedRide: ride, currentPage: 'ride_detail' }); }}>Book</button>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



// ============================================================
// RIDE DETAIL PAGE
// ============================================================
const RideDetailPage = () => {
  const [state, setState] = useStore(s => s);
  const ride = state.selectedRide || RIDES[0];
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [booked, setBooked] = useState(false);

  if (booked) return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)', padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: 48, textAlign: 'center', maxWidth: 440, width: '100%', border: '1px solid var(--gray-200)' }}>
        <div style={{ width: 80, height: 80, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--green-500)' }}>
          <Icon name="check" size={36} />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Booking Confirmed!</div>
        <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Your ride from <strong>{ride.from}</strong> to <strong>{ride.to}</strong> is confirmed. The driver will contact you shortly.</p>
        <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 24, fontSize: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['Booking ID', '#RH-28472'], ['Date', ride.date], ['Time', ride.time], ['Seats', selectedSeats], ['Amount', `₹${ride.price * selectedSeats}`], ['Status', 'Confirmed']].map(([k, v]) => (
              <div key={k}><div style={{ color: 'var(--gray-500)', fontSize: 12 }}>{k}</div><div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{v}</div></div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setState({ currentPage: 'passenger_dashboard', currentRole: 'passenger', sidebarTab: 'trips' })}>My Trips</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setState({ currentPage: 'passenger_dashboard', currentRole: 'passenger', sidebarTab: 'chat' })}>
            <Icon name="chat" size={16} />Chat Driver
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: 'var(--gray-50)', minHeight: 'calc(100vh - 64px)', padding: '32px 0' }}>
      <div className="container-sm">
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }} onClick={() => setState({ currentPage: 'search' })}>
          ← Back to results
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Route card */}
            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 4 }}>{ride.date}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800 }}>{ride.from}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{ride.time} · {ride.fromFull}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, maxWidth: 120 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue-600)', background: 'var(--blue-50)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>{ride.duration}</div>
                      <div style={{ width: '100%', height: 2, background: 'var(--gray-200)', position: 'relative' }}>
                        <Icon name="arrow_right" size={16} style={{ color: 'var(--gray-400)', position: 'absolute', right: -8, top: -8 }} />
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800 }}>{ride.to}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{ride.toFull}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stops */}
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: 'var(--blue-600)', boxShadow: '0 0 0 2px var(--blue-600)' }} />
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{ride.from}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Departure · {ride.time}</div>
                </div>
                {ride.intermediate?.map((stop, i) => (
                  <div key={stop} className="timeline-item">
                    <div className="timeline-dot timeline-dot-gray" />
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{stop}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Intermediate stop</div>
                  </div>
                ))}
                <div className="timeline-item" style={{ paddingBottom: 0 }}>
                  <div className="timeline-dot" style={{ background: 'var(--green-400)', boxShadow: '0 0 0 2px var(--green-400)' }} />
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{ride.to}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Arrival · Est. +{ride.duration}</div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="map" size={16} style={{ color: 'var(--blue-500)' }} />
                <span style={{ fontWeight: 600, fontSize: 14 }}>Route Map</span>
                <span className="badge badge-blue" style={{ marginLeft: 'auto' }}>Google Maps</span>
              </div>
              <div className="map-placeholder" style={{ height: 220 }}>
                <div className="map-grid" />
                {/* Fake route line */}
                <svg viewBox="0 0 600 180" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                  <path d="M80,90 C150,40 250,140 320,70 C390,20 450,110 520,80" stroke="var(--blue-500)" strokeWidth="3" fill="none" strokeDasharray="8,4" />
                  <circle cx="80" cy="90" r="10" fill="var(--blue-600)" />
                  <text x="80" y="112" textAnchor="middle" fontSize="11" fill="#334155" fontFamily="DM Sans, sans-serif" fontWeight="600">{ride.from}</text>
                  {ride.intermediate?.map((stop, i) => {
                    const x = 200 + i * 120;
                    return <g key={stop}><circle cx={x} cy={i === 0 ? 120 : 60} r="7" fill="var(--blue-300)" /><text x={x} y={i === 0 ? 140 : 50} textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="DM Sans, sans-serif">{stop}</text></g>;
                  })}
                  <circle cx="520" cy="80" r="10" fill="var(--green-500)" />
                  <text x="520" y="102" textAnchor="middle" fontSize="11" fill="#334155" fontFamily="DM Sans, sans-serif" fontWeight="600">{ride.to}</text>
                </svg>
              </div>
            </div>

            {/* Driver */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, fontFamily: 'var(--font-display)' }}>About Your Driver</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div className={`avatar avatar-xl avatar-${ride.driver.color}`}>{ride.driver.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{ride.driver.name}</div>
                    {ride.driver.verified && <span className="verified-badge"><Icon name="check" size={10} />Verified</span>}
                  </div>
                  <div className="stars" style={{ marginBottom: 8 }}>
                    {[...Array(5)].map((_, i) => <span key={i} className="star" style={{ opacity: i < Math.floor(ride.driver.rating) ? 1 : 0.3 }}>★</span>)}
                    <span style={{ fontSize: 13, color: 'var(--gray-600)', marginLeft: 6 }}>{ride.driver.rating} · {ride.driver.trips} trips</span>
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--gray-600)' }}>{ride.car} · <span style={{ fontWeight: 600 }}>{ride.plate}</span></div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {ride.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div>
            <div className="card" style={{ padding: 24, position: 'sticky', top: 96 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Book Your Seat</div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
                <span style={{ fontSize: 14, color: 'var(--gray-600)' }}>Price per seat</span>
                <div className="price-chip">₹{ride.price} <span>/ seat</span></div>
              </div>

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label className="form-label">Passengers</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[...Array(Math.min(ride.seats, 4))].map((_, i) => (
                    <button key={i} className="seat" style={{ cursor: 'pointer', border: 'none' }} onClick={() => setSelectedSeats(i + 1)}>
                      <div className={`seat ${selectedSeats > i ? 'seat-selected' : 'seat-available'}`}>{i + 1}</div>
                    </button>
                  ))}
                  {[...Array(4 - ride.seats)].map((_, i) => (
                    <div key={`taken-${i}`} className="seat seat-taken">{ride.seats + i + 1}</div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 6 }}>{ride.seats} seats available · {selectedSeats} selected</div>
              </div>

              <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                  <span style={{ color: 'var(--gray-600)' }}>₹{ride.price} × {selectedSeats} seat{selectedSeats > 1 ? 's' : ''}</span>
                  <span>₹{ride.price * selectedSeats}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                  <span style={{ color: 'var(--gray-600)' }}>Platform fee</span>
                  <span>₹{Math.round(ride.price * selectedSeats * 0.05)}</span>
                </div>
                <div className="divider" style={{ margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>
                  <span>Total</span>
                  <span>₹{Math.round(ride.price * selectedSeats * 1.05)}</span>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: 15, marginBottom: 12 }} onClick={() => setState({ modalOpen: 'payment' })}>
                Proceed to Payment <Icon name="arrow_right" size={18} />
              </button>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: 14 }} onClick={() => setState({ currentPage: 'passenger_dashboard', currentRole: 'passenger', sidebarTab: 'chat' })}>
                <Icon name="chat" size={16} />Message Driver
              </button>

              <div className="alert alert-info" style={{ marginTop: 16 }}>
                <Icon name="shield" size={16} />
                <span style={{ fontSize: 13 }}>Payment via Razorpay. Safe & secured.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {state.modalOpen === 'payment' && (
        <div className="modal-overlay" onClick={() => setState({ modalOpen: null })}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Complete Payment</div>
              <button className="btn btn-ghost" style={{ padding: 8 }} onClick={() => setState({ modalOpen: null })}><Icon name="x" size={20} /></button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 24, padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 4 }}>{ride.from} → {ride.to} · {selectedSeats} seat{selectedSeats > 1 ? 's' : ''}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800 }}>₹{Math.round(ride.price * selectedSeats * 1.05)}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {['UPI (Recommended)', 'Debit / Credit Card', 'Net Banking', 'Wallet (Paytm, PhonePe)'].map((method, i) => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: `1.5px solid ${i === 0 ? 'var(--blue-400)' : 'var(--gray-200)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', background: i === 0 ? 'var(--blue-50)' : 'white' }}>
                  <input type="radio" name="payment" defaultChecked={i === 0} style={{ accentColor: 'var(--blue-500)' }} />
                  <div style={{ fontSize: 14, fontWeight: 500, color: i === 0 ? 'var(--blue-700)' : 'var(--gray-700)' }}>{method}</div>
                  {i === 0 && <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Fast</span>}
                </label>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: 15 }} onClick={() => { setState({ modalOpen: null }); setBooked(true); }}>
              Pay ₹{Math.round(ride.price * selectedSeats * 1.05)} via Razorpay
            </button>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', textAlign: 'center', marginTop: 12 }}>
              🔒 Secured by Razorpay. 256-bit SSL encryption.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// PASSENGER DASHBOARD
// ============================================================
const PassengerDashboard = () => {
  const [state, setState] = useStore(s => s);
  const [chatMsg, setChatMsg] = useState('');
  const tab = state.sidebarTab || 'dashboard';

  const sidebarItems = [
    { id: 'dashboard', label: 'Overview', icon: 'home' },
    { id: 'search', label: 'Find Rides', icon: 'search' },
    { id: 'trips', label: 'My Trips', icon: 'list' },
    { id: 'chat', label: 'Messages', icon: 'chat' },
    { id: 'notifications', label: 'Notifications', icon: 'bell', badge: state.notifications },
    { id: 'safety', label: 'Safety & SOS', icon: 'shield' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const TRIPS = [
    { id: 1, from: 'Pithoragarh', to: 'Haldwani', date: '24 May', status: 'completed', price: 350, driver: 'Rajesh Kumar', rating: 5 },
    { id: 2, from: 'Almora', to: 'Pithoragarh', date: '18 May', status: 'completed', price: 180, driver: 'Mohan Singh', rating: 4 },
    { id: 3, from: 'Pithoragarh', to: 'Haldwani', date: '27 May', status: 'upcoming', price: 350, driver: 'Rajesh Kumar', rating: null },
  ];

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setState(s => ({ chatMessages: [...s.chatMessages, { id: Date.now(), from: 'me', text: chatMsg, time: 'Just now' }] }));
    setChatMsg('');
  };

  return (
    <div className="sidebar-layout" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar avatar-md" style={{ background: '#BFCFFF', color: 'var(--blue-800)' }}>PS</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Priya Sharma</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Passenger</div>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section">Navigation</div>
          {sidebarItems.map(item => (
            <button key={item.id} className={`sidebar-link ${tab === item.id ? 'active' : ''}`} onClick={() => setState({ sidebarTab: item.id })}>
              <Icon name={item.icon} size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge > 0 && <span style={{ background: 'var(--red-400)', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>{item.badge}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {tab === 'dashboard' && (
          <>
            <div className="dashboard-header">
              <div>
                <div className="page-title">Good morning, Priya! 👋</div>
                <div className="page-subtitle">Here's what's happening with your travels</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setState({ currentPage: 'search' })}>
                <Icon name="search" size={16} />Find a Ride
              </button>
            </div>

            <div className="stats-row">
              {[['18', 'Total Trips', 'stat-up', '+3 this month'], ['₹4,200', 'Saved vs Bus', 'stat-up', 'est. savings'], ['4.8', 'Avg Rating', '', ''], ['2', 'Upcoming', 'stat-up', '']].map(([v, l, cls, sub]) => (
                <div key={l} className="stat-card">
                  <div className="stat-label">{l}</div>
                  <div className="stat-value">{v}</div>
                  {sub && <div className={`stat-change ${cls}`}>{cls === 'stat-up' ? '↑ ' : ''}{sub}</div>}
                </div>
              ))}
            </div>

            {/* Upcoming trip */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>Upcoming Ride</div>
                <span className="badge badge-blue">Tomorrow · 6:30 AM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>Pithoragarh</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>6:30 AM · Bus Stand</div>
                </div>
                <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, var(--blue-300), var(--blue-100))', borderRadius: 4 }} />
                <Icon name="arrow_right" size={20} style={{ color: 'var(--blue-400)' }} />
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>Haldwani</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>~11:00 AM · Transport Nagar</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div className="driver-profile" style={{ flex: 1, minWidth: 200 }}>
                  <div className="avatar avatar-md avatar-blue">RK</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Rajesh Kumar</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>⭐ 4.8 · Maruti Ertiga</div>
                  </div>
                  <span className="verified-badge" style={{ marginLeft: 'auto' }}><Icon name="check" size={10} />Verified</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setState({ sidebarTab: 'chat' })}><Icon name="chat" size={16} />Chat</button>
                  <button className="sos-btn" style={{ width: 44, height: 44, fontSize: 11 }} onClick={() => setState({ modalOpen: 'sos' })}>SOS</button>
                </div>
              </div>
            </div>

            {/* Suggested rides */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Suggested Rides</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {RIDES.slice(0, 2).map(r => (
                  <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
                    <div className={`avatar avatar-sm avatar-${r.driver.color}`}>{r.driver.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{r.from} → {r.to}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{r.date} · {r.time} · {r.seats} seats</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>₹{r.price}</div>
                    <button className="btn btn-primary btn-sm" onClick={() => setState({ selectedRide: r, currentPage: 'ride_detail' })}>Book</button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'search' && <SearchPage />}

        {tab === 'trips' && (
          <>
            <div className="dashboard-header">
              <div>
                <div className="page-title">My Trips</div>
                <div className="page-subtitle">Your complete ride history</div>
              </div>
            </div>
            <div className="tabs">
              {['All', 'Upcoming', 'Completed', 'Cancelled'].map((t, i) => (
                <button key={t} className={`tab ${state.activeTab === i ? 'active' : ''}`} onClick={() => setState({ activeTab: i })}>{t}</button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TRIPS.filter(t => {
                if (state.activeTab === 0) return true;
                if (state.activeTab === 1) return t.status === 'upcoming';
                if (state.activeTab === 2) return t.status === 'completed';
                return false;
              }).map(trip => (
                <div key={trip.id} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>{trip.from} → {trip.to}</span>
                      <span className={`badge ${trip.status === 'upcoming' ? 'badge-blue' : trip.status === 'completed' ? 'badge-green' : 'badge-red'}`}>
                        {trip.status}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>₹{trip.price}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--gray-500)', marginBottom: 12 }}>
                    <span><Icon name="calendar" size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />{trip.date}</span>
                    <span><Icon name="user" size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />{trip.driver}</span>
                  </div>
                  {trip.status === 'completed' && trip.rating && (
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(5)].map((_, i) => <span key={i} className="star" style={{ opacity: i < trip.rating ? 1 : 0.25 }}>★</span>)}
                      <span style={{ fontSize: 12, color: 'var(--gray-500)', marginLeft: 4 }}>Your rating</span>
                    </div>
                  )}
                  {trip.status === 'upcoming' && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setState({ sidebarTab: 'chat' })}>Chat Driver</button>
                      <button className="btn btn-danger btn-sm">Cancel Ride</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'chat' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">Messages</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0, background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', overflow: 'hidden', height: 520 }}>
              {/* Contact list */}
              <div style={{ borderRight: '1px solid var(--gray-200)', overflowY: 'auto' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--gray-100)' }}>
                  <div className="search-wrapper">
                    <div className="search-icon"><Icon name="search" size={14} /></div>
                    <input className="form-input" placeholder="Search messages..." style={{ paddingLeft: 36, fontSize: 13 }} />
                  </div>
                </div>
                {[{ name: 'Rajesh Kumar', msg: 'See you soon!', time: '9:43 AM', unread: 2, avatar: 'RK', color: 'blue' }, { name: 'Mohan Singh', msg: 'Your booking is confirmed.', time: 'Yesterday', unread: 0, avatar: 'MS', color: 'teal' }].map(c => (
                  <div key={c.name} style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-50)', cursor: 'pointer', background: c.name === 'Rajesh Kumar' ? 'var(--blue-50)' : 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className={`avatar avatar-md avatar-${c.color}`}>{c.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                          <span style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</span>
                          <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{c.time}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.msg}</div>
                      </div>
                      {c.unread > 0 && <div style={{ background: 'var(--blue-500)', color: 'white', fontSize: 11, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat window */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="avatar avatar-md avatar-blue">RK</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Rajesh Kumar</div>
                    <div style={{ fontSize: 12, color: 'var(--green-500)', display: 'flex', alignItems: 'center', gap: 4 }}><div className="status-dot status-dot-green" />Online</div>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {state.chatMessages.map(msg => (
                    <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                      <div className={`chat-bubble chat-bubble-${msg.from === 'me' ? 'sent' : 'recv'}`}>{msg.text}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4, padding: '0 2px' }}>{msg.time}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--gray-100)', display: 'flex', gap: 8 }}>
                  <input className="form-input" placeholder="Type a message..." value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} style={{ flex: 1 }} />
                  <button className="btn btn-primary btn-sm" onClick={sendChat}><Icon name="send" size={16} /></button>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'notifications' && (
          <>
            <div className="dashboard-header">
              <div>
                <div className="page-title">Notifications</div>
                <div className="page-subtitle">{state.notifications} unread</div>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setState({ notifications: 0 })}>Mark all read</button>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {[
                { icon: 'check', color: 'green', title: 'Booking Confirmed', msg: 'Your ride from Pithoragarh to Haldwani on 27 May is confirmed.', time: '10 min ago', unread: true },
                { icon: 'chat', color: 'blue', title: 'New Message', msg: 'Rajesh Kumar: "Hello! I\'m on my way."', time: '25 min ago', unread: true },
                { icon: 'car', color: 'teal', title: 'Driver Assigned', msg: 'Rajesh Kumar has been assigned for your upcoming trip.', time: '1 hr ago', unread: true },
                { icon: 'star', color: 'amber', title: 'Rate Your Trip', msg: 'How was your ride from Almora to Pithoragarh with Mohan Singh?', time: '2 days ago', unread: false },
              ].map((n, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 20px', borderBottom: '1px solid var(--gray-100)', background: n.unread ? 'var(--blue-50)' : 'white', transition: 'all 0.15s' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `var(--${n.color}-50, var(--blue-50))`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: `var(--${n.color}-500, var(--blue-500))`, flexShrink: 0 }}>
                    <Icon name={n.icon} size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{n.title}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{n.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>{n.msg}</div>
                  </div>
                  {n.unread && <div className="status-dot status-dot-blue" style={{ marginTop: 6 }} />}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'safety' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">Safety & SOS</div>
              <div className="page-subtitle">Your safety tools are always accessible</div>
            </div>
            <div className="alert alert-success" style={{ marginBottom: 24 }}>
              <Icon name="check" size={16} />
              <span>Your safety profile is complete. Emergency contacts have been added.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
              <div className="card" style={{ padding: 28, textAlign: 'center' }}>
                <div style={{ marginBottom: 16 }}>
                  <button className="sos-btn" style={{ margin: '0 auto' }}>SOS</button>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Emergency SOS</div>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 16 }}>Press SOS to immediately alert your emergency contacts with your live location and ride details.</p>
                <div className="alert alert-danger" style={{ fontSize: 12 }}>
                  <Icon name="alert" size={14} />
                  <span>Only use in genuine emergencies</span>
                </div>
              </div>
              <div className="card" style={{ padding: 28 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Emergency Contacts</div>
                {[{ name: 'Anita Sharma (Mother)', phone: '+91 98765 43210' }, { name: 'Vikram Sharma (Father)', phone: '+91 87654 32109' }].map(c => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, padding: '10px 12px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                    <div className="avatar avatar-sm avatar-blue">{c.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{c.phone}</div>
                    </div>
                    <button className="btn btn-ghost" style={{ padding: 6 }}><Icon name="phone" size={15} /></button>
                  </div>
                ))}
                <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                  <Icon name="plus" size={14} />Add Contact
                </button>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>SOS Flow</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                {[
                  { step: 'You press SOS', color: 'var(--red-400)', bg: '#FEF2F2' },
                  { step: 'Contacts notified', color: 'var(--amber-400)', bg: '#FFFBEB' },
                  { step: 'Location shared', color: 'var(--blue-400)', bg: 'var(--blue-50)' },
                  { step: 'Ride logged', color: 'var(--green-500)', bg: '#F0FDF4' },
                ].map((s, i) => (
                  <div key={s.step} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ flex: 1, height: 2, background: i === 0 ? 'transparent' : 'var(--gray-200)' }} />
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: 13, fontWeight: 700, border: `2px solid ${s.color}`, flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ flex: 1, height: 2, background: i === 3 ? 'transparent' : 'var(--gray-200)' }} />
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 8, fontWeight: 500 }}>{s.step}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'settings' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">Settings</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Profile</div>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label">Full Name</label>
                  <input className="form-input" defaultValue="Priya Sharma" />
                </div>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" defaultValue="+91 98765 43210" disabled style={{ background: 'var(--gray-50)', color: 'var(--gray-500)' }} />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label className="form-label">Email</label>
                  <input className="form-input" defaultValue="priya@example.com" />
                </div>
                <button className="btn btn-primary btn-sm">Save Changes</button>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Preferences</div>
                {[['Ride Notifications', true], ['Marketing Emails', false], ['SMS Alerts', true], ['Location Sharing', true]].map(([label, on]) => {
                  const [isOn, setIsOn] = useState(on);
                  return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span style={{ fontSize: 14, color: 'var(--gray-700)' }}>{label}</span>
                      <button className={`toggle ${isOn ? 'on' : ''}`} onClick={() => setIsOn(!isOn)} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================
// DRIVER DASHBOARD
// ============================================================
const DriverDashboard = () => {
  const [state, setState] = useStore(s => s);
  const tab = state.sidebarTab || 'dashboard';

  const sidebarItems = [
    { id: 'dashboard', label: 'Overview', icon: 'home' },
    { id: 'publish', label: 'Publish Ride', icon: 'plus' },
    { id: 'rides', label: 'My Rides', icon: 'car' },
    { id: 'requests', label: 'Booking Requests', icon: 'users', badge: 2 },
    { id: 'earnings', label: 'Earnings', icon: 'wallet' },
    { id: 'vehicle', label: 'My Vehicle', icon: 'settings' },
    { id: 'verification', label: 'Verification', icon: 'shield' },
  ];

  const earnings = [
    { day: 'Mon', amount: 350 }, { day: 'Tue', amount: 700 }, { day: 'Wed', amount: 280 },
    { day: 'Thu', amount: 1050 }, { day: 'Fri', amount: 420 }, { day: 'Sat', amount: 980 }, { day: 'Sun', amount: 630 },
  ];
  const maxEarning = Math.max(...earnings.map(e => e.amount));

  return (
    <div className="sidebar-layout" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="sidebar">
        <div className="sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar avatar-md avatar-teal">RK</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Rajesh Kumar</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="verified-badge" style={{ fontSize: 10, padding: '1px 5px' }}><Icon name="check" size={8} />Driver</span>
              </div>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section">Driver Panel</div>
          {sidebarItems.map(item => (
            <button key={item.id} className={`sidebar-link ${tab === item.id ? 'active' : ''}`} onClick={() => setState({ sidebarTab: item.id })}>
              <Icon name={item.icon} size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge > 0 && <span style={{ background: 'var(--amber-400)', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>{item.badge}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="dashboard-content">
        {tab === 'dashboard' && (
          <>
            <div className="dashboard-header">
              <div>
                <div className="page-title">Driver Dashboard</div>
                <div className="page-subtitle">Welcome back, Rajesh. Ready to roll?</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setState({ sidebarTab: 'publish' })}>
                <Icon name="plus" size={16} />Publish a Ride
              </button>
            </div>
            <div className="stats-row">
              {[['142', 'Total Trips', '↑ 8 this month'], ['₹24,800', 'Total Earnings', '↑ ₹2,100 this month'], ['4.8★', 'Driver Rating', ''], ['98%', 'Acceptance Rate', '']].map(([v, l, sub]) => (
                <div key={l} className="stat-card">
                  <div className="stat-label">{l}</div>
                  <div className="stat-value" style={{ fontSize: 22 }}>{v}</div>
                  {sub && <div className="stat-change stat-up">{sub}</div>}
                </div>
              ))}
            </div>

            {/* Earnings chart */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>This Week's Earnings</div>
              <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 20 }}>Total: <strong style={{ color: 'var(--gray-900)' }}>₹{earnings.reduce((s, e) => s + e.amount, 0).toLocaleString()}</strong></div>
              <div className="bar-chart">
                {earnings.map(e => (
                  <div key={e.day} className="bar-group">
                    <div style={{ fontSize: 11, color: 'var(--blue-600)', fontWeight: 600, marginBottom: 4 }}>₹{e.amount >= 1000 ? (e.amount / 1000).toFixed(1) + 'k' : e.amount}</div>
                    <div className="bar" style={{ height: `${(e.amount / maxEarning) * 110}px` }} title={`₹${e.amount}`} />
                    <div className="bar-label">{e.day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming rides */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Active & Upcoming Rides</div>
              {DRIVER_RIDES.filter(r => r.status === 'upcoming').map(r => (
                <div key={r.id} style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-100)', borderRadius: 'var(--radius-md)', padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{r.from} → {r.to}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>{r.date} · {r.time} · {r.booked}/{r.seats} booked</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span className="badge badge-blue">{r.booked} passengers</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>₹{r.price * r.booked}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'publish' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">Publish a Ride</div>
              <div className="page-subtitle">Share your route and earn while you travel</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div className="card" style={{ padding: 24, marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Route Details</div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label className="form-label">From</label>
                    <input className="form-input" placeholder="e.g. Pithoragarh Bus Stand" defaultValue="Pithoragarh" />
                  </div>
                  <div style={{ margin: '4px 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
                    <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>Add stop</button>
                    <div style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label className="form-label">To</label>
                    <input className="form-input" placeholder="e.g. Haldwani Transport Nagar" defaultValue="Haldwani" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="form-group">
                      <label className="form-label">Date</label>
                      <input type="date" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Departure</label>
                      <input type="time" className="form-input" defaultValue="06:30" />
                    </div>
                  </div>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Ride Settings</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Available Seats</label>
                      <select className="form-input"><option>1</option><option>2</option><option selected>3</option><option>4</option></select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Price per Seat (₹)</label>
                      <input type="number" className="form-input" defaultValue="350" />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label className="form-label">Amenities</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                      {['AC', 'Music OK', 'No Smoking', 'Pets Allowed', 'Luggage OK', 'No Food'].map(tag => (
                        <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '6px 12px', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-full)', fontSize: 13 }}>
                          <input type="checkbox" defaultChecked={['AC', 'Music OK'].includes(tag)} style={{ accentColor: 'var(--blue-500)' }} />
                          {tag}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13 }}>
                    <Icon name="zap" size={16} />Publish Ride
                  </button>
                </div>
              </div>
              <div>
                <div className="card" style={{ padding: 24, marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Booking Preferences</div>
                  {[['Auto-accept bookings', false], ['Instant booking', true], ['Allow 2-way trips', false]].map(([label, def]) => {
                    const [isOn, setIsOn] = useState(def);
                    return (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                        <span style={{ fontSize: 14, color: 'var(--gray-700)' }}>{label}</span>
                        <button className={`toggle ${isOn ? 'on' : ''}`} onClick={() => setIsOn(!isOn)} />
                      </div>
                    );
                  })}
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Pricing Guide</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.8 }}>
                    {POPULAR_ROUTES.map(r => (
                      <div key={r.from} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--gray-100)' }}>
                        <span>{r.from} → {r.to}</span>
                        <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>₹{r.avgPrice}</span>
                      </div>
                    ))}
                  </div>
                  <div className="alert alert-info" style={{ marginTop: 16, fontSize: 13 }}>
                    <Icon name="info" size={14} />
                    <span>Suggested prices are based on real market demand in your region.</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'rides' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">My Rides</div>
            </div>
            <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Route</th><th>Date & Time</th><th>Seats</th><th>Earnings</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {DRIVER_RIDES.map(r => (
                    <tr key={r.id}>
                      <td><div style={{ fontWeight: 600 }}>{r.from} → {r.to}</div></td>
                      <td style={{ color: 'var(--gray-600)', fontSize: 13 }}>{r.date} · {r.time}</td>
                      <td><span className="badge badge-blue">{r.booked}/{r.seats}</span></td>
                      <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>₹{r.price * r.booked}</td>
                      <td><span className={`badge ${r.status === 'upcoming' ? 'badge-blue' : 'badge-green'}`}>{r.status}</span></td>
                      <td>
                        {r.status === 'upcoming' && (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-secondary btn-sm">Edit</button>
                            <button className="btn btn-danger btn-sm">Cancel</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'requests' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">Booking Requests</div>
              <div className="page-subtitle">2 pending requests</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'Deepa Joshi', from: 'Almora', to: 'Haldwani', seats: 1, avatar: 'DJ', color: 'amber' },
                { name: 'Vikram Negi', from: 'Almora', to: 'Haldwani', seats: 2, avatar: 'VN', color: 'teal' },
              ].map((req, i) => (
                <div key={i} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div className={`avatar avatar-md avatar-${req.color}`}>{req.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{req.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>
                        {req.from} → {req.to} · {req.seats} seat{req.seats > 1 ? 's' : ''}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-success"><Icon name="check" size={16} />Accept</button>
                      <button className="btn btn-danger"><Icon name="x" size={16} />Decline</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'earnings' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">Earnings</div>
            </div>
            <div className="stats-row">
              {[['₹24,800', 'Total Earned'], ['₹4,200', 'This Month'], ['₹980', 'This Week'], ['₹350', 'Today']].map(([v, l]) => (
                <div key={l} className="stat-card">
                  <div className="stat-label">{l}</div>
                  <div className="stat-value" style={{ fontSize: 22 }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Weekly Earnings</div>
              <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 20 }}>Total this week: <strong style={{ color: 'var(--gray-900)' }}>₹{earnings.reduce((s, e) => s + e.amount, 0).toLocaleString()}</strong></div>
              <div className="bar-chart" style={{ height: 160 }}>
                {earnings.map(e => (
                  <div key={e.day} className="bar-group">
                    <div style={{ fontSize: 11, color: 'var(--blue-600)', fontWeight: 600, marginBottom: 4 }}>₹{e.amount}</div>
                    <div className="bar" style={{ height: `${(e.amount / maxEarning) * 120}px`, background: 'linear-gradient(180deg, var(--blue-400), var(--blue-600))' }} />
                    <div className="bar-label">{e.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'verification' && (
          <>
            <div className="dashboard-header">
              <div>
                <div className="page-title">Driver Verification</div>
                <div className="page-subtitle">Your account is verified and active</div>
              </div>
              <span className="badge badge-green" style={{ fontSize: 13, padding: '6px 14px' }}>✓ Verified Driver</span>
            </div>
            <div className="alert alert-success" style={{ marginBottom: 24 }}>
              <Icon name="check" size={16} />
              <span>All documents have been verified. You can publish rides and accept passengers.</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Aadhaar Card', number: 'XXXX-XXXX-4721', status: 'approved', icon: 'file' },
                { label: 'Driving License', number: 'UK0320200XXXXX', status: 'approved', icon: 'file' },
                { label: 'Vehicle RC', number: 'UK03AB1234-RC', status: 'approved', icon: 'car' },
                { label: 'Vehicle Photo', number: 'Uploaded', status: 'approved', icon: 'eye' },
                { label: 'Selfie Verification', number: 'Completed', status: 'approved', icon: 'user' },
              ].map(doc => (
                <div key={doc.label} className="verify-step">
                  <div className={`verify-icon verify-icon-${doc.status}`}>
                    <Icon name={doc.icon} size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{doc.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{doc.number}</div>
                  </div>
                  <span className={`badge ${doc.status === 'approved' ? 'badge-green' : doc.status === 'pending' ? 'badge-amber' : 'badge-red'}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'vehicle' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">My Vehicle</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 20 }}>Vehicle Details</div>
                {[['Make & Model', 'Maruti Suzuki Ertiga'], ['Year', '2021'], ['Colour', 'Pearl White'], ['Registration No.', 'UK 03 AB 1234'], ['Fuel Type', 'Petrol'], ['Seats', '7 (4 available for ride)']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 14 }}>
                    <span style={{ color: 'var(--gray-500)' }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 20 }}>Documents Status</div>
                {[['RC', 'Valid till Dec 2030', 'green'], ['Insurance', 'Valid till Aug 2025', 'amber'], ['Fitness Certificate', 'Valid till Mar 2026', 'green'], ['Pollution Certificate', 'Valid till Oct 2025', 'green']].map(([doc, status, color]) => (
                  <div key={doc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                    <span style={{ fontSize: 14, color: 'var(--gray-700)' }}>{doc}</span>
                    <span className={`badge badge-${color}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================
// ADMIN DASHBOARD
// ============================================================
const AdminDashboard = () => {
  const [state, setState] = useStore(s => s);
  const tab = state.sidebarTab || 'dashboard';

  const sidebarItems = [
    { id: 'dashboard', label: 'Analytics', icon: 'trending' },
    { id: 'drivers', label: 'Driver Verification', icon: 'shield', badge: 2 },
    { id: 'users', label: 'User Management', icon: 'users' },
    { id: 'rides', label: 'All Rides', icon: 'car' },
    { id: 'complaints', label: 'Complaints', icon: 'alert' },
    { id: 'safety', label: 'Safety Monitor', icon: 'activity' },
    { id: 'settings', label: 'Platform Settings', icon: 'settings' },
  ];

  return (
    <div className="sidebar-layout" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="sidebar">
        <div className="sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar avatar-md" style={{ background: '#7F77DD', color: 'white' }}>AD</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Admin Panel</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>admin@raahi.in</div>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section">Admin Controls</div>
          {sidebarItems.map(item => (
            <button key={item.id} className={`sidebar-link ${tab === item.id ? 'active' : ''}`} onClick={() => setState({ sidebarTab: item.id })}>
              <Icon name={item.icon} size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge > 0 && <span style={{ background: 'var(--red-400)', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="alert alert-danger" style={{ fontSize: 12, background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)', color: '#FCA5A5' }}>
            <Icon name="shield" size={14} />
            Admin access only. Secure session active.
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {tab === 'dashboard' && (
          <>
            <div className="dashboard-header">
              <div>
                <div className="page-title">Platform Analytics</div>
                <div className="page-subtitle">Real-time overview of Raahi platform</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Today', 'Week', 'Month'].map((t, i) => (
                  <button key={t} className={`btn btn-sm ${i === 2 ? 'btn-primary' : 'btn-secondary'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[['48,204', 'Total Users', '+124 today', 'up'], ['12,841', 'Rides Completed', '+89 today', 'up'], ['2,401', 'Active Drivers', '+12 new', 'up'], ['₹8.4L', 'Platform Revenue', '+₹24K today', 'up']].map(([v, l, sub, dir]) => (
                <div key={l} className="stat-card">
                  <div className="stat-label">{l}</div>
                  <div className="stat-value" style={{ fontSize: 22 }}>{v}</div>
                  <div className="stat-change stat-up">{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
              {/* Route heatmap */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Top Routes by Volume</div>
                {[['Pithoragarh → Haldwani', 3241, 98], ['Almora → Haldwani', 2108, 64], ['Bageshwar → Kathgodam', 1842, 56], ['Munsiyari → Pithoragarh', 967, 29], ['Champawat → Tanakpur', 712, 22]].map(([route, count, pct]) => (
                  <div key={route} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                      <span style={{ fontWeight: 500 }}>{route}</span>
                      <span style={{ color: 'var(--gray-600)' }}>{count.toLocaleString()} rides</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Verification queue */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Pending Queue</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[['Driver Verifications', 14, 'amber'], ['Complaint Reports', 3, 'red'], ['Refund Requests', 7, 'blue'], ['Document Reviews', 9, 'teal']].map(([label, count, color]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className={`status-dot status-dot-${color}`} />
                        <span style={{ fontSize: 13, color: 'var(--gray-700)' }}>{label}</span>
                      </div>
                      <span className={`badge badge-${color}`}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'drivers' && (
          <>
            <div className="dashboard-header">
              <div>
                <div className="page-title">Driver Verification</div>
                <div className="page-subtitle">Review and approve driver documents</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-amber" style={{ fontSize: 13, padding: '6px 12px' }}>14 Pending</span>
              </div>
            </div>
            <div className="tabs">
              {['Pending Review', 'Approved', 'Rejected'].map((t, i) => (
                <button key={t} className={`tab ${state.activeTab === i ? 'active' : ''}`} onClick={() => setState({ activeTab: i })}>{t}</button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { name: 'Sunita Devi', phone: '+91 98765 00001', submitted: '2 hr ago', docs: ['Aadhaar', 'License', 'RC', 'Vehicle Photo', 'Selfie'], avatar: 'SD', color: 'amber' },
                { name: 'Hari Bhatt', phone: '+91 87654 00002', submitted: '5 hr ago', docs: ['Aadhaar', 'License', 'RC', 'Vehicle Photo'], avatar: 'HB', color: 'teal' },
              ].map((driver, i) => (
                <div key={i} className="card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    <div className={`avatar avatar-lg avatar-${driver.color}`}>{driver.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>{driver.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>{driver.phone} · Submitted {driver.submitted}</div>
                    </div>
                    <span className="badge badge-amber">Pending Review</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20 }}>
                    {driver.docs.map(doc => (
                      <div key={doc} style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '10px 8px', textAlign: 'center', cursor: 'pointer' }}>
                        <Icon name="file" size={20} style={{ color: 'var(--blue-400)', margin: '0 auto 6px' }} />
                        <div style={{ fontSize: 11, color: 'var(--gray-600)', fontWeight: 500 }}>{doc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-success"><Icon name="check" size={16} />Approve Driver</button>
                    <button className="btn btn-danger"><Icon name="x" size={16} />Reject</button>
                    <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Request More Docs</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'users' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">User Management</div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <div className="search-wrapper" style={{ flex: 1 }}>
                <div className="search-icon"><Icon name="search" size={16} /></div>
                <input className="form-input" placeholder="Search users by name or phone..." />
              </div>
              <select className="form-input" style={{ width: 140 }}>
                <option>All Roles</option><option>Passenger</option><option>Driver</option>
              </select>
              <select className="form-input" style={{ width: 140 }}>
                <option>All Status</option><option>Active</option><option>Pending</option><option>Suspended</option>
              </select>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="data-table">
                <thead>
                  <tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Trips</th><th>Verified</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {ADMIN_USERS.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div className="avatar avatar-sm avatar-blue">{u.name.split(' ').map(n => n[0]).join('')}</div>
                          <span style={{ fontWeight: 500 }}>{u.name}</span>
                        </div>
                      </td>
                      <td><span className={`badge ${u.role === 'driver' ? 'badge-blue' : 'badge-gray'}`}>{u.role}</span></td>
                      <td><span className={`badge ${u.status === 'active' ? 'badge-green' : u.status === 'pending' ? 'badge-amber' : 'badge-red'}`}>{u.status}</span></td>
                      <td style={{ color: 'var(--gray-500)', fontSize: 13 }}>{u.joined}</td>
                      <td style={{ fontWeight: 600 }}>{u.trips}</td>
                      <td>{u.verified ? <span style={{ color: 'var(--green-500)' }}>✓</span> : <span style={{ color: 'var(--gray-400)' }}>—</span>}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost" style={{ fontSize: 12, padding: '4px 8px' }}>View</button>
                          {u.status === 'active' ? <button className="btn btn-danger btn-sm">Suspend</button> : <button className="btn btn-success btn-sm">Activate</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'complaints' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">Complaints & Reports</div>
              <div className="page-subtitle">3 open complaints need attention</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { id: 'C-1024', reporter: 'Priya Sharma', against: 'Driver: Amit Rawat', type: 'Rude Behaviour', severity: 'high', time: '2 hr ago' },
                { id: 'C-1023', reporter: 'Kavita Bisht', against: 'Driver: Unknown', type: 'Route Deviation', severity: 'medium', time: '6 hr ago' },
                { id: 'C-1022', reporter: 'Suresh Pant', against: 'Passenger: Deepa Joshi', type: 'No-show', severity: 'low', time: '1 day ago' },
              ].map(c => (
                <div key={c.id} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, background: c.severity === 'high' ? '#FEF2F2' : c.severity === 'medium' ? '#FFFBEB' : 'var(--gray-100)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: c.severity === 'high' ? 'var(--red-500)' : c.severity === 'medium' ? '#D97706' : 'var(--gray-500)' }}>
                      <Icon name="alert" size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>{c.type}</span>
                            <span className="badge badge-gray">{c.id}</span>
                            <span className={`badge ${c.severity === 'high' ? 'badge-red' : c.severity === 'medium' ? 'badge-amber' : 'badge-gray'}`}>{c.severity}</span>
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>By {c.reporter} · Against {c.against}</div>
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{c.time}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm">Review</button>
                      <button className="btn btn-primary btn-sm">Resolve</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'safety' && (
          <>
            <div className="dashboard-header">
              <div className="page-title">Safety Monitor</div>
              <div className="page-subtitle">Real-time safety overview</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              {[['0', 'Active SOS Alerts', 'green'], ['3', 'Flagged Drivers', 'amber'], ['2', 'Route Deviations', 'red']].map(([v, l, color]) => (
                <div key={l} className="stat-card" style={{ borderLeft: `3px solid var(--${color}-400)` }}>
                  <div className="stat-label">{l}</div>
                  <div className="stat-value" style={{ color: `var(--${color === 'green' ? 'green' : color}-500)` }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 16 }}>Active Ride Monitoring</div>
              <table className="data-table">
                <thead><tr><th>Ride ID</th><th>Route</th><th>Driver</th><th>Passengers</th><th>Status</th><th>Last Ping</th></tr></thead>
                <tbody>
                  {[
                    { id: 'R-8412', route: 'Pithoragarh → Haldwani', driver: 'Rajesh Kumar', pax: 3, status: 'in_progress', ping: '1 min ago' },
                    { id: 'R-8411', route: 'Almora → Haldwani', driver: 'Sunita Devi', pax: 2, status: 'in_progress', ping: '2 min ago' },
                    { id: 'R-8410', route: 'Almora → Pithoragarh', driver: 'Mohan Singh', pax: 4, status: 'completed', ping: '30 min ago' },
                  ].map(r => (
                    <tr key={r.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.id}</td>
                      <td>{r.route}</td>
                      <td>{r.driver}</td>
                      <td><span className="badge badge-blue">{r.pax}</span></td>
                      <td><span className={`badge ${r.status === 'in_progress' ? 'badge-teal' : 'badge-green'}`}>{r.status === 'in_progress' ? 'In Progress' : 'Completed'}</span></td>
                      <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{r.ping}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================
// AUTH MODAL
// ============================================================
const AuthModal = () => {
  const [state, setState] = useStore(s => s);
  const [step, setStep] = useState('role'); // role | phone | otp | done
  const [selectedRole, setRole] = useState('passenger');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  if (state.modalOpen !== 'login') return null;

  const handleRoleSelect = (role) => {
    if (role === 'admin') {
      setState({ currentRole: 'admin', currentPage: 'admin_dashboard', sidebarTab: 'dashboard', modalOpen: null, user: { name: 'Admin', role: 'admin' } });
      return;
    }
    setRole(role);
    setStep('phone');
  };

  const handleOTPInput = (i, val) => {
    const newOtp = [...otp];
    newOtp[i] = val.slice(-1);
    setOtp(newOtp);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const handleLogin = () => {
    setState({
      currentRole: selectedRole,
      currentPage: selectedRole === 'passenger' ? 'passenger_dashboard' : 'driver_dashboard',
      sidebarTab: 'dashboard',
      modalOpen: null,
      user: { name: selectedRole === 'passenger' ? 'Priya Sharma' : 'Rajesh Kumar', role: selectedRole },
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setState({ modalOpen: null })}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: step === 'role' ? 520 : 400 }}>
        <div className="modal-header">
          <div className="logo">
            <Icon name="mountain" size={22} style={{ color: 'var(--blue-500)' }} />
            Raahi
            {step !== 'role' && <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14, color: 'var(--gray-500)', marginLeft: 8 }}>→ {step === 'phone' ? 'Enter Phone' : 'Verify OTP'}</span>}
          </div>
          <button className="btn btn-ghost" style={{ padding: 8 }} onClick={() => setState({ modalOpen: null })}><Icon name="x" size={20} /></button>
        </div>

        {step === 'role' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>How do you want to join?</div>
              <p style={{ fontSize: 15, color: 'var(--gray-500)' }}>Select your role to get started</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { role: 'passenger', icon: 'user', title: 'Ride as Passenger', desc: 'Find and book rides on mountain routes' },
                { role: 'driver', icon: 'car', title: 'Drive & Earn', desc: 'Offer rides and earn on your commute' },
              ].map(opt => (
                <button key={opt.role} onClick={() => handleRoleSelect(opt.role)} style={{ padding: 24, border: '2px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', background: 'white', textAlign: 'center', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-400)'; e.currentTarget.style.background = 'var(--blue-50)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'white'; }}>
                  <div style={{ width: 52, height: 52, background: 'var(--blue-50)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-500)', margin: '0 auto 14px' }}>
                    <Icon name={opt.icon} size={24} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{opt.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{opt.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={() => handleRoleSelect('admin')} style={{ width: '100%', marginTop: 12, padding: '10px', border: '1px dashed var(--gray-300)', borderRadius: 'var(--radius-md)', background: 'transparent', cursor: 'pointer', fontSize: 13, color: 'var(--gray-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-body)' }}>
              <Icon name="shield" size={14} />Admin Access (Demo)
            </button>
          </>
        )}

        {step === 'phone' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ width: 64, height: 64, background: 'var(--blue-50)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--blue-500)' }}>
                <Icon name="phone" size={28} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Enter your phone number</div>
              <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>We'll send you a verification code</p>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <div style={{ background: 'var(--gray-50)', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: 14, fontWeight: 600, color: 'var(--gray-700)' }}>🇮🇳 +91</div>
              <input className="form-input" placeholder="98765 43210" value={phone} onChange={e => setPhone(e.target.value)} style={{ flex: 1 }} type="tel" />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: 15, marginBottom: 12 }} onClick={() => setStep('otp')}>
              Send OTP
            </button>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setStep('role')}>← Back</button>
          </>
        )}

        {step === 'otp' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Enter OTP</div>
              <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>Sent to +91 {phone || '98765 43210'}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
              {otp.map((digit, i) => (
                <input key={i} id={`otp-${i}`} maxLength={1} value={digit} onChange={e => handleOTPInput(i, e.target.value)} style={{ width: 48, height: 52, textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, border: `2px solid ${digit ? 'var(--blue-400)' : 'var(--gray-200)'}`, borderRadius: 'var(--radius-md)', outline: 'none', background: digit ? 'var(--blue-50)' : 'white' }} />
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: 15, marginBottom: 12 }} onClick={handleLogin}>
              Verify & Continue
            </button>
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-500)' }}>Didn't receive? <button style={{ background: 'none', border: 'none', color: 'var(--blue-500)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Resend in 0:30</button></p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================
// SAFETY PAGE
// ============================================================
const SafetyPage = () => (
  <div>
    <div className="page-header">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <span className="badge badge-teal" style={{ marginBottom: 16, fontSize: 12 }}>Safety First</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 800, color: 'white', marginBottom: 16 }}>Your Safety is Our Priority</h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>Every feature on Raahi is built with safety at its core — from verification to emergency response.</p>
      </div>
    </div>
    <div className="section">
      <div className="container">
        <div className="grid-3">
          {[
            { icon: 'shield', title: 'Verified Drivers Only', desc: 'Every driver undergoes a 5-step verification: Aadhaar, DL, RC, vehicle inspection, and selfie verification. Only approved drivers can accept passengers.', color: 'blue' },
            { icon: 'phone', title: 'Emergency SOS', desc: 'One-tap SOS instantly notifies your emergency contacts with your live GPS location, driver details, and ride metadata.', color: 'red' },
            { icon: 'eye', title: 'Live Ride Tracking', desc: 'Share your live ride link with family. They can track your journey in real-time from anywhere.', color: 'teal' },
            { icon: 'star', title: 'Community Ratings', desc: 'Every ride is rated. Drivers with low ratings are reviewed and suspended from the platform.', color: 'amber' },
            { icon: 'alert', title: 'Report & Review', desc: 'Report any concerning behaviour. Our safety team responds within 2 hours to all high-severity reports.', color: 'red' },
            { icon: 'map', title: 'GPS Route Logging', desc: 'All rides are GPS-logged. Route deviations trigger automatic alerts to our safety team.', color: 'green' },
          ].map(f => (
            <div key={f.title} className="card" style={{ padding: 28 }}>
              <div className={`feature-icon`} style={{ background: `var(--blue-50)`, color: 'var(--blue-500)' }}>
                <Icon name={f.icon} size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// ABOUT PAGE
// ============================================================
const AboutPage = () => (
  <div>
    <div className="page-header">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 800, color: 'white', marginBottom: 16 }}>About Raahi</h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>Born in Pithoragarh. Built for the mountains of Uttarakhand.</p>
      </div>
    </div>
    <div className="section">
      <div className="container-sm">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="section-eyebrow">Our Story</div>
          <h2 className="section-title" style={{ marginBottom: 20 }}>Why We Built Raahi</h2>
          <p style={{ fontSize: 17, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 20 }}>
            Mountain roads in Uttarakhand have always been a challenge for daily commuters. Buses are limited, taxis are expensive, and platforms like Uber don't operate here. Locals traveling between Pithoragarh, Almora, Haldwani, and Kathgodam had no reliable, safe option.
          </p>
          <p style={{ fontSize: 17, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 48 }}>
            Raahi was born to change that. We're building a community-powered ride-sharing platform specifically optimised for hill regions — with verified drivers, safety-first features, and routes that actually matter to mountain residents.
          </p>
          <div className="grid-3" style={{ marginBottom: 60 }}>
            {[['2024', 'Founded in Pithoragarh'], ['48K+', 'Happy Travellers'], ['6', 'Districts Covered']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: 28, background: 'var(--blue-50)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--blue-600)', marginBottom: 8 }}>{v}</div>
                <div style={{ fontSize: 14, color: 'var(--gray-600)', fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// ACCESS DENIED
// ============================================================
const AccessDenied = () => (
  <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)' }}>
    <div style={{ textAlign: 'center', padding: 48 }}>
      <div style={{ width: 80, height: 80, background: '#FEF2F2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--red-500)' }}>
        <Icon name="shield" size={36} />
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 12 }}>403 — Access Denied</h1>
      <p style={{ fontSize: 16, color: 'var(--gray-500)', marginBottom: 32 }}>You don't have permission to access this area.<br />This route is restricted to authorized admins only.</p>
      <div className="alert alert-danger" style={{ display: 'inline-flex', marginBottom: 24 }}>
        <Icon name="alert" size={16} />
        All unauthorized access attempts are logged.
      </div>
    </div>
  </div>
);

// ============================================================
// APP ROUTER
// ============================================================
export default function App() {
  const [state] = useStore(s => s);

  const renderPage = () => {
    const { currentPage, currentRole } = state;

    // Admin guard
    if (currentPage === 'admin_dashboard' && currentRole !== 'admin') return <AccessDenied />;

    switch (currentPage) {
      case 'landing': return <LandingPage />;
      case 'search': return <SearchPage />;
      case 'ride_detail': return <RideDetailPage />;
      case 'passenger_dashboard': return <PassengerDashboard />;
      case 'driver_dashboard': return <DriverDashboard />;
      case 'admin_dashboard': return <AdminDashboard />;
      case 'safety': return <SafetyPage />;
      case 'about': return <AboutPage />;
      default: return <LandingPage />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <Navbar />
      {renderPage()}
      <AuthModal />
    </>
  );
}