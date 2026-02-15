export type Language = 'en' | 'tr' | 'zh' | 'ru' | 'es' | 'fr' | 'de'

/**
 * Temel çeviri tipi.
 * 'en' anahtarını baz alarak diğer dillerin eksiksiz doldurulmasını sağlar.
 */
export type TranslationKeys = typeof translations.en

export const translations = {
  en: {
    // Navigation - Categories
    nav_main_deck: 'MAIN DECK',
    nav_engineering: 'ENGINEERING & FORGE',
    nav_finance: 'FINANCE & TREASURY',
    nav_bazaar: 'GALACTIC BAZAAR',
    nav_system: 'SYSTEM DEFENSE',
    nav_identity: 'ARCHIVES & ID',
    nav_library: 'LIBRARY',

    // Navigation - Nodes
    nav_dashboard: 'Command Center',
    nav_governance: 'Governance Council',
    nav_missions: 'Mission Simulator',
    nav_virgo: 'Virgo Fabricator',
    nav_oracle: 'Pegasus Oracle',
    nav_fleet_eng: 'Fleet Engineering',
    nav_contracts: 'Code Repository',
    nav_swap: 'Aquila Exchange',
    nav_bridge: 'Centaurus Bridge',
    nav_treasury: 'Treasury & Assets',
    nav_market: 'Galactic Bazaar',
    nav_security: 'Quasar Sentry',
    nav_sentinel: 'Sombrero Sentinel',
    nav_telemetry: 'Network Telemetry',
    nav_docs: 'System Manual',
    nav_profile: 'Profile & Merit',

    // Actions & UI Components
    connect_wallet: 'CONNECT WALLET',
    connecting: 'ESTABLISHING LINK...',
    secure_connection: 'SECURE-LINK-V2',
    tvl_label: 'Total Value Locked (TVL)',
    circulating_label: 'Active Circulation',
    governance_label: 'Active Proposals',
    fleet_modules_title: 'FLEET MODULES (DAO NODES)',
    details_btn: 'Access Node',
    integrity: 'System Integrity',
    verified: 'VERIFIED',
    last_update: 'Last Sync',

    // Overlays & Alerts
    cookie_title: 'SYSTEM SIMULATION PROTOCOL',
    cookie_msg:
      'You are accessing the AOXCDAO Interface on a TEST NETWORK environment. No real funds are involved. Local storage is used for neural-link persistence.',
    cookie_accept: 'INITIALIZE PROTOCOL',
    telemetry_title: 'SYSTEM TELEMETRY',

    // Statuses
    status_mainnet: 'Mainnet',
    status_audit: 'In Audit',
    status_testnet: 'Testnet',
    status_dev: 'Development',
    status_design: 'Design Phase',

    // Fleet Descriptions
    desc_andromeda: 'Flagship & Governance Core. The ultimate authority for DAO decisions.',
    desc_aquila: 'High-frequency liquidity engine and market maker.',
    desc_centaurus: 'Interdimensional gateway between X Layer and external chains.',
    desc_pegasus: 'Real-time price oracle and data observer.',
    desc_quasar: 'Threat detection shield and cyber defense line.',
    desc_virgo: 'Manufacturing plant for NFTs, Synthetic assets, and ship parts.',
    desc_sombrero: 'Legal compliance, KYC, and transfer policy auditor.',

    // Intro Sequence
    intro_episode: 'The Awakening',
    intro_title: 'AOXCDAO PROTOCOL',
    intro_p1: 'Welcome to the AOXCDAO ecosystem, residing on the eternal OKX X LAYER Chain.',
    intro_p2:
      'The old financial systems have collapsed. In their place, we have built a decentralized interstellar fleet managed by code and consensus.',
    intro_p3: 'Prepare your wallet, Commander. We are initiating the warp drive.',
    intro_connection: 'BREACHING X LAYER...',
    init_select_lang: 'SELECT NEURAL DIALECT',
    init_accept_protocols: 'ACCEPT PROTOCOLS & INITIALIZE',
    init_protocols_desc: 'By initializing, you accept the simulation cookies and testnet protocols.'
  },

  tr: {
    nav_main_deck: 'ANA GÜVERTE',
    nav_engineering: 'MÜHENDİSLİK & DÖKÜMHANE',
    nav_finance: 'FİNANS & HAZİNE',
    nav_bazaar: 'GALAKTİK PAZAR',
    nav_system: 'SİSTEM SAVUNMA',
    nav_identity: 'ARŞİV & KİMLİK',
    nav_library: 'KÜTÜPHANE',
    nav_dashboard: 'Komuta Merkezi',
    nav_governance: 'Yönetim Şurası',
    nav_missions: 'Görev Simülatörü',
    nav_virgo: 'Virgo Atölyesi',
    nav_oracle: 'Pegasus Kahini',
    nav_fleet_eng: 'Filo Mühendisliği',
    nav_contracts: 'Kod Deposu',
    nav_swap: 'Aquila Takas',
    nav_bridge: 'Centaurus Köprüsü',
    nav_treasury: 'Hazine & Varlıklar',
    nav_market: 'Galaktik Pazar',
    nav_security: 'Quasar Sentry',
    nav_sentinel: 'Sombrero Gözcüsü',
    nav_telemetry: 'Ağ Telemetrisi',
    nav_docs: 'Sistem Kılavuzu',
    nav_profile: 'Profil & Liyakat',
    connect_wallet: 'CÜZDAN BAĞLA',
    connecting: 'BAĞLANTI KURULUYOR...',
    secure_connection: 'GÜVENLİ-HATT-V2',
    tvl_label: 'Toplam Kilitli Varlık (TVL)',
    circulating_label: 'Aktif Dolaşım',
    governance_label: 'Aktif Teklifler',
    fleet_modules_title: 'FİLO MODÜLLERİ (DAO NODLARI)',
    details_btn: 'Noda Eriş',
    integrity: 'Sistem Bütünlüğü',
    verified: 'DOĞRULANDI',
    last_update: 'Son Senkronizasyon',
    cookie_title: 'SİSTEM SİMÜLASYON PROTOKOLÜ',
    cookie_msg:
      'AOXCDAO Arayüzüne TEST AĞI ortamında erişiyorsunuz. Gerçek varlıklar kullanılmaz. Yerel depolama nöral-link sürekliliği için kullanılır.',
    cookie_accept: 'PROTOKOLÜ BAŞLAT',
    telemetry_title: 'SİSTEM TELEMETRİSİ',
    status_mainnet: 'Ana Ağ',
    status_audit: 'Denetimde',
    status_testnet: 'Test Ağı',
    status_dev: 'Geliştirme',
    status_design: 'Tasarım Aşaması',
    desc_andromeda: 'Amiral Gemisi ve Yönetim Çekirdeği. DAO kararları için nihai otorite.',
    desc_aquila: 'Yüksek frekanslı likidite motoru ve piyasa yapıcısı.',
    desc_centaurus: 'X Layer ve dış zincirler arası boyut kapısı.',
    desc_pegasus: 'Gerçek zamanlı fiyat kahini ve veri gözlemcisi.',
    desc_quasar: 'Tehdit algılama kalkanı ve siber savunma hattı.',
    desc_virgo: 'NFT, Sentetik varlık ve gemi parçası üretim tesisi.',
    desc_sombrero: 'Yasal uyumluluk, KYC ve transfer politikası denetçisi.',
    intro_episode: 'Uyanış',
    intro_title: 'AOXCDAO PROTOKOLÜ',
    intro_p1: 'Ebedi OKX X LAYER zincirinde konuşlanan AOXCDAO ekosistemine hoş geldiniz.',
    intro_p2:
      'Eski finansal sistemler çöktü. Yerine, kod ve mutabakat ile yönetilen merkeziyetsiz bir yıldız filosu inşa ettik.',
    intro_p3: 'Cüzdanını hazırla Komutan. Işık hızına geçiş yapıyoruz.',
    intro_connection: 'X LAYER KATMANINA SIZILIYOR...',
    init_select_lang: 'NÖRAL LEHÇE SEÇİMİ',
    init_accept_protocols: 'PROTOKOLLERİ ONAYLA & BAŞLAT',
    init_protocols_desc:
      'Başlatarak, simülasyon çerezlerini ve test ağı protokollerini kabul etmiş olursunuz.'
  }

  // Diğer dillerde eksik anahtarlar TypeScript tarafından doldurulmalı
  // Örnek: zh, ru, es, fr, de dilleri de 'tr' gibi tam liste olmalıdır.
}
