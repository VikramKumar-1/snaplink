import { Globe2, Lock, Megaphone, Target, Code2 } from "lucide-react";
import { ServiceDetail } from "../types";

export const ADVANCED_SERVICES: ServiceDetail[] = [
  {
    slug: "custom-domains",
    name: "Custom Domains & White-Labeling",
    category: "Enterprise Branding",
    badge: "White-Label",
    icon: Globe2,
    accentColor: "#7c3aed",
    shortDesc: "Use your own branded domain (e.g. links.yourbrand.com) with automated DNS CNAME verification and SSL.",
    longDesc: "Establish enterprise credibility and brand recall. Replace default short links with your own custom domain name, complete with automated CNAME DNS validation and custom root domain fallbacks.",
    whatIsIt: "A custom branding feature that lets you use your company's own domain name (such as links.yourbrand.com) for every link you share, boosting customer trust and clicks.",
    realWorldExample: {
      scenario: "Sharing links in SMS campaigns, customer emails, and social media",
      before: "Sharing generic random short links that trigger spam warnings and make customers hesitate to tap.",
      after: "Clean branded links (go.yourbrand.com/sale) with free automatic SSL certificates, boosting CTR by 39%.",
    },
    highlights: [
      "Automated DNS CNAME record verification",
      "Full white-label link branding (go.brand.com/summer-sale)",
      "Configurable root domain default redirect",
      "Automatic HTTPS / TLS certificate provisioning",
    ],
    whyItMatters: "Branded links achieve up to 39% higher click-through rates compared to generic link shorteners.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Add DNS CNAME",
        description: "In your domain manager (GoDaddy, Cloudflare, etc.), add a CNAME record pointing to SnapLink.",
      },
      {
        stepNumber: 2,
        title: "Verify in Dashboard",
        description: "Enter your domain in the dashboard; SnapLink verifies DNS and provisions free SSL automatically.",
      },
      {
        stepNumber: 3,
        title: "Create Branded Links",
        description: "Select your custom domain whenever generating or editing links across your workspace.",
      },
    ],
    actionUrl: "/dashboard",
    actionLabel: "Connect Custom Domain",
    mockupType: "domain-cname",
    seoTitle: "Custom Domain Link Shortener | Branded Short URLs with Free SSL & CNAME",
    seoDescription: "Shorten links using your own custom branded domain (e.g., links.yourbrand.com). Boost CTR by 39%, build brand authority, and get automatic free SSL certificates.",
    keywords: [
      "custom domain link shortener",
      "branded url shortener white label",
      "short link with own domain name",
      "free cname shortener",
      "custom short url maker"
    ],
    faqs: [
      {
        question: "Can I connect any subdomain or root domain?",
        answer: "Yes, you can connect any subdomain (such as links.company.com or go.company.com) by pointing a standard CNAME DNS record to SnapLink."
      },
      {
        question: "Do you automatically provide SSL certificates for custom domains?",
        answer: "Yes, automatic TLS/SSL certificates are issued and renewed to ensure all your branded links operate securely over HTTPS."
      }
    ]
  },
  {
    slug: "link-security",
    name: "VIP Password & Expiring Links",
    category: "Access & Security",
    badge: "Zero-Leak",
    icon: Lock,
    accentColor: "#dc2626",
    shortDesc: "Lock private links behind VIP access passcodes or set self-destruct limits by max clicks or expiration dates.",
    longDesc: "Safeguard exclusive launches, paid digital products, and confidential documents. Require a passcode before revealing the destination, or set auto-expiration triggers that redirect to a custom fallback URL once expired.",
    whatIsIt: "A link protection shield that lets you lock confidential links with a private 4-digit PIN code, or set links to self-destruct automatically after a certain number of clicks or a set date.",
    realWorldExample: {
      scenario: "Sharing a private course download or an exclusive early-bird product launch",
      before: "Links get leaked and forwarded to unauthorized users with no way to revoke access.",
      after: "Link requires a secret PIN code to open and automatically locks after the first 50 customers download.",
    },
    highlights: [
      "Bcrypt-hashed password verification with interactive PIN modal",
      "Click-count caps (e.g. first 100 people only)",
      "Time deadlines (expires at specific date & hour)",
      "Zero-leak security: original URL is never exposed in client HTML",
    ],
    whyItMatters: "Ideal for flash sales, influencer early access, gated membership downloads, and confidential client shares.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Select Any Link",
        description: "Open your dashboard and click 'Edit' on the link you want to safeguard.",
      },
      {
        stepNumber: 2,
        title: "Set Password or Limits",
        description: "Go to 'Routing & Limits' and turn on PIN passcode, max clicks limit, or expiration date.",
      },
      {
        stepNumber: 3,
        title: "Share with Confidence",
        description: "Only visitors who enter your secret PIN can access the link before it safely expires.",
      },
    ],
    actionUrl: "/dashboard",
    actionLabel: "Protect Your Links",
    mockupType: "security-lock",
    seoTitle: "Password Protected Short Links & Expiring URLs | Gated Access Link Tool",
    seoDescription: "Secure private links with PIN passcodes, click-count expiration caps, and time deadlines. Zero-leak server protection prevents link extraction before authorization.",
    keywords: [
      "password protect link",
      "expiring short links",
      "self destruct url after clicks",
      "gated link passcode protection",
      "secure private link generator"
    ],
    faqs: [
      {
        question: "Can users inspect the webpage source to reveal the password-protected URL?",
        answer: "No. SnapLink enforces zero-leak server verification: destination URLs are never transmitted to the browser until the correct bcrypt-hashed password has been validated on the backend."
      },
      {
        question: "What happens when an expiring link reaches its click limit?",
        answer: "Once the click limit or deadline expires, visitors are safely routed to your chosen fallback URL or a clean expiration notice page."
      }
    ]
  },
  {
    slug: "cta-overlays",
    name: "Marketing CTA Banners",
    category: "Lead Generation",
    badge: "Lead Magnets",
    icon: Megaphone,
    accentColor: "#ea580c",
    shortDesc: "Attach custom floating call-to-action banners, discounts, and lead magnets on top of shared destination links.",
    longDesc: "Capture leads and drive sales even when sharing external content. Our CTA overlay engine attaches a sleek, branded floating banner with your custom headline, description, and conversion button.",
    whatIsIt: "A lead-generation tool that displays your custom branded banner, discount code, or newsletter signup on top of any article or website you share with your followers.",
    realWorldExample: {
      scenario: "Sharing a viral tech or industry news article on social media",
      before: "Sending thousands of free visitors to an outside website with zero leads or sales back to your business.",
      after: "Your floating banner appears at the bottom with: 'Enjoyed this? Get my 5-step checklist' driving free leads.",
    },
    highlights: [
      "Floating non-intrusive bottom banner design",
      "Custom button text, target URL, and promo badges",
      "Color themes (Royal Blue, Emerald, Dark, Amber)",
      "Drive traffic back to your own shop or newsletter",
    ],
    whyItMatters: "Monetize third-party articles, press releases, and industry news by embedding your own call-to-action.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Create CTA Banner",
        description: "Open 'CTA Overlay' in the link generator and enter your headline, message, and button text.",
      },
      {
        stepNumber: 2,
        title: "Attach Destination",
        description: "Paste any third-party article, YouTube link, or blog post you want to share.",
      },
      {
        stepNumber: 3,
        title: "Collect Leads",
        description: "When followers read the article, your branded banner floats at the bottom to drive conversions.",
      },
    ],
    actionUrl: "/",
    actionLabel: "Create CTA Link",
    mockupType: "cta-banner",
    seoTitle: "Floating Call to Action Link Overlay Generator | Lead Generation Banners",
    seoDescription: "Overlay custom floating call-to-action banners, coupons, and lead magnets onto any external link you share. Drive traffic back to your business and boost conversions.",
    keywords: [
      "cta overlay link generator",
      "call to action banner on external url",
      "lead capture link tool",
      "floating banner on shared link",
      "sniply alternative free"
    ],
    faqs: [
      {
        question: "Can I place a CTA banner on any website?",
        answer: "Yes, you can attach floating call-to-action prompts to news articles, medium posts, or partner content to route readers back to your own site."
      },
      {
        question: "Can I customize the colors and action button of the CTA banner?",
        answer: "Yes, you have full control over the headline, description, button label, target link, and brand color theme."
      }
    ]
  },
  {
    slug: "utm-retargeting",
    name: "Campaign UTM & Pixel Retargeting",
    category: "Digital Marketing",
    badge: "Ad Tracking",
    icon: Target,
    accentColor: "#0891b2",
    shortDesc: "Built-in UTM parameter builder with automated Meta (Facebook) Pixel and Google Analytics GA4 tag injection.",
    longDesc: "Build custom UTM campaigns for Google Analytics and build high-intent retargeting custom audiences on Facebook and Instagram without modifying destination websites.",
    whatIsIt: "A marketing tag generator that automatically adds Google Analytics UTM tracking tags and fires Meta/Facebook and TikTok ad pixels on every click to build retargeting ad audiences.",
    realWorldExample: {
      scenario: "Running paid social media ads or influencer promotions",
      before: "Losing track of which influencer generated real sales and unable to retarget warm visitors who tapped your link.",
      after: "Every tap fires your Meta pixel to build custom high-converting ad audiences and tracks precise ROI in GA4.",
    },
    highlights: [
      "Standard UTM builder (source, medium, campaign, term, content)",
      "Automated Meta Facebook Pixel event injection (PageView)",
      "Google Analytics GA4 tag firing",
      "Affiliate tag parameter auto-append",
    ],
    whyItMatters: "Builds highly profitable custom audiences for Facebook/Instagram ads from everyone who clicks your links.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Fill Campaign Tags",
        description: "Enter your Campaign Source (e.g. instagram), Medium (e.g. bio), and Campaign Name.",
      },
      {
        stepNumber: 2,
        title: "Add Ad Pixel ID",
        description: "Paste your Meta Pixel ID or Google Tag ID in the tracking options.",
      },
      {
        stepNumber: 3,
        title: "Launch & Retarget",
        description: "Share the link in ads or bios; every tap fires your pixel for hyper-targeted audience building.",
      },
    ],
    actionUrl: "/",
    actionLabel: "Build UTM Campaign",
    mockupType: "utm-pixel",
    seoTitle: "Campaign UTM Builder & Meta Pixel Retargeting Links | GA4 Tracking",
    seoDescription: "Easily build Google Analytics UTM parameters and fire Meta Pixel retargeting tags on every link click. Build hyper-targeted Facebook & Instagram ad audiences.",
    keywords: [
      "campaign utm builder",
      "meta pixel retargeting link",
      "facebook pixel on short link",
      "ga4 campaign url creator",
      "ad retargeting link shortener"
    ],
    faqs: [
      {
        question: "How does Meta Pixel retargeting work on short links?",
        answer: "When a user taps your link, our bridge fires a standard Meta PageView event before redirecting them, adding that user to your Facebook/Instagram custom ad audience."
      },
      {
        question: "Are UTM campaign parameters preserved when the destination app opens?",
        answer: "Yes. SnapLink guarantees that utm_source, utm_medium, and utm_campaign query strings are forwarded to the destination landing page or native app intent."
      }
    ]
  },
  {
    slug: "developer-api",
    name: "Developer REST API & Webhooks",
    category: "Developers & Integration",
    badge: "v1 REST API",
    icon: Code2,
    accentColor: "#4f46e5",
    shortDesc: "Programmatic short link generation, click analytics query endpoints, and real-time HMAC-SHA256 signed webhooks.",
    longDesc: "Automate your marketing workflows with our developer-first infrastructure. Issue scoped API keys, generate short links via standard HTTP POST, and receive real-time webhook events whenever links are clicked or created.",
    whatIsIt: "A fast, programmatic API that allows software developers, CRMs, and bots to create short links, read click analytics, and receive real-time webhook alerts automatically.",
    realWorldExample: {
      scenario: "Sending transactional SMS or WhatsApp confirmation links to 5,000 customers daily",
      before: "Having to create links manually or dealing with slow third-party services that throttle requests.",
      after: "Make a simple HTTP POST request to /api/links and receive an optimized deep link in under 15 milliseconds.",
    },
    highlights: [
      "Public REST API v1 (POST /api/v1/links)",
      "HMAC-SHA256 signature verification (x-snaplink-signature)",
      "Automated retry mechanisms with delivery latency logging",
      "Interactive Developer Studio with instant test pinging",
    ],
    whyItMatters: "Enables seamless integration with Zapier, Make, custom CRMs, internal bots, and e-commerce checkout hooks.",
    howToUseSteps: [
      {
        stepNumber: 1,
        title: "Generate API Key",
        description: "Open the Developers tab in your dashboard and click 'Create Secret API Token'.",
      },
      {
        stepNumber: 2,
        title: "Send HTTP Request",
        description: "Make a POST request to /api/links with your Bearer token and destination URL in JSON.",
      },
      {
        stepNumber: 3,
        title: "Automate Workflows",
        description: "Receive instant shortened deep links in 15ms, and register webhooks for live click events.",
      },
    ],
    actionUrl: "/dashboard",
    actionLabel: "Open Developer Studio",
    mockupType: "api-code",
    seoTitle: "URL Shortener REST API & Signed Webhooks | Developer Documentation",
    seoDescription: "Programmatically generate short links, query click analytics, and listen to real-time HMAC-SHA256 signed webhooks. Integrate with Zapier, Make, and custom applications.",
    keywords: [
      "url shortener rest api",
      "short link api for developers",
      "link click webhooks hmac",
      "developer api for deep links",
      "bitly api alternative free"
    ],
    faqs: [
      {
        question: "How do I authenticate requests to the SnapLink REST API?",
        answer: "Authenticate by passing your secret API token in the standard HTTP header: Authorization: Bearer YOUR_API_KEY."
      },
      {
        question: "Are webhook events signed for security?",
        answer: "Yes. Every webhook payload is signed with your secret key using HMAC-SHA256 and sent in the 'x-snaplink-signature' header for tamper-proof verification."
      }
    ]
  }
];
