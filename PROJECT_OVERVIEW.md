# Aspen Drain — Comprehensive Project Brief & Technical Documentation

**Project Name:** Aspen Drain Web Platform & Owner Dispatch Portal  
**Live Production URL:** [https://aspov.vercel.app](https://aspov.vercel.app)  
**Owner Portal URL:** [https://aspov.vercel.app/#/admin](https://aspov.vercel.app/#/admin)  
**GitHub Repository:** [https://github.com/Goodyness-dev/aspov](https://github.com/Goodyness-dev/aspov)  
**Target Market:** Markham, ON & surrounding York Region  
**Primary Objective:** Transition from Yelp as the primary quote channel into an owned, high-conversion direct web platform with an 8-step self-service quote wizard, instant Telegram alerts for the owner, automated EmailJS customer communication, and a protected Admin Dashboard.

---

## 1. Business & Brand Identity

- **Business Name:** Aspen Drain
- **Tagline:** Markham's Trusted Drain & Plumbing Specialist — Serving the Community Since 2005
- **Phone:** (647) 522-1884 (`tel:6475221884`)
- **Experience:** 22+ years in the service trade (established 2005)
- **Service Area:** Markham, Unionville, Thornhill, Richmond Hill, and surrounding York Region
- **Trust Metrics:**
  - 100% response rate
  - Free consultations & estimates
  - Locally owned & operated
  - Upfront pricing with no surprise dispatch fees
- **Accepted Payments:** Cash, Debit Cards, PayPal
- **Operating Hours:**
  - Monday – Friday: 7:00 AM – 7:00 PM
  - Saturday: Closed
  - Sunday: 9:00 AM – 5:00 PM
  - Special holiday hours supported dynamically (e.g., Dec 31: 9:00 AM – 5:00 PM)

---

## 2. Technology Stack & Infrastructure

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | React 18.3 (`react`, `react-dom`) | Modern component-driven UI architecture |
| **Build Tool & Bundler** | Vite 5.4 (`@vitejs/plugin-react`) | Sub-second HMR and optimized production bundles |
| **Styling & Design System** | Tailwind CSS 3.4 (`autoprefixer`, `postcss`) | Custom "Mist" and "Navy" palette with glassmorphism |
| **Icons** | Lucide React (`lucide-react`) | Lightweight, modern SVG iconography |
| **Client-Side Email** | EmailJS Browser SDK (`@emailjs/browser`) | Transactional email dispatch without a custom backend |
| **Messaging Integration** | Telegram Bot API (`fetch`) | Real-time push notifications to the owner's smartphone |
| **Routing** | HashRouter / URL Sync | Direct deep-linking (`#/admin`) with Vercel SPA rewrite fallback |
| **Hosting & CI/CD** | Vercel Platform | Automated global edge hosting, SSL, and instant Git deployments |
| **Version Control** | Git & GitHub | Remote repository at `Goodyness-dev/aspov` |

---

## 3. End-to-End User & Business Architecture

```
                       CUSTOMER JOURNEY
                              │
                    [ Visit aspov.vercel.app ]
                              │
               [ Browse Services / Gallery / About ]
                              │
                   [ Click "Get a Free Quote" ]
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
   [ Normal Fixture Flow ]          [ 🚨 Emergency Fast-Path ]
     - Repair / Install / Inspect     - User marks "Yes"
     - Fixture selection              - Surface (647) 522-1884
     - Toilet Diagnostics:              with 1-tap "Call Now"
         * Count (1 to 5+)
         * Type (Dual/Standard/Low)
         * Issues (Leaking/Running)
     - Timeline selection
     - Name, Email, Phone
             │
             ▼
    [ Submit Quote Request ]
             │
             ├──────────────────────────────────────────────────────┐
             │                                                      │
             ▼                                                      ▼
 ✉️ [ EmailJS Template 2 ]                             🚨 [ Telegram Bot API ]
  Automated Receipt sent                                  Instant alert sent
  to Customer's Email                                     to Owner's Phone
  "Ref #ASP-XXXXXX Received"                              with full breakdown
             │
             └──────────────────────┬───────────────────────────────┘
                                    │
                                    ▼
                         OWNER DISPATCH JOURNEY
                                    │
                       [ Visit aspov.vercel.app/#/admin ]
                                    │
                         [ Enter Passcode: aspen2005 ]
                                    │
                     ┌──────────────┴──────────────┐
                     ▼                             ▼
        [ Dashboard Overview ]             [ Order Inspection ]
        - Live metrics counter             - View customer contacts
        - Emergency filter                 - Toilet diagnostic data
        - Real-time search                 - Customer job notes
                     │                             │
                     └──────────────┬──────────────┘
                                    │
                                    ▼
                      [ Reply & Send Quote Card ]
                      - Input: Price estimate (e.g. $220 CAD)
                      - Input: Suggested arrival schedule
                      - Input: Scope breakdown & notes
                                    │
                                    ▼
                        ✉️ [ EmailJS Template 1 ]
                        Dispatched directly to customer's inbox
                        with Aspen Drain contact card & phone link
                                    │
                                    ▼
                       [ Order Status -> "QUOTED" ]
                       Appends to permanent quote history thread
```

---

## 4. Detailed Component Breakdown

### A. Customer-Facing Website (`src/components/`)

1. **`Navbar.jsx`**
   - Sticky frosted glass header (`glass-strong`) with the Aspen Drain brand mark and "Since 2005" badge.
   - Smooth navigation links (`Services`, `About`, `Gallery`, `Location`).
   - Quick contact actions: 1-tap phone dialer and "Free Quote" CTA button.
   - Discreet shield icon linking to the Owner Portal (`#/admin`).
   - Full mobile slide-down menu with responsive controls.

2. **`Hero.jsx`**
   - Value proposition: *"Expert Drain & Plumbing Service — 22 years of trusted residential plumbing in Markham & York Region"*.
   - Floating stats badges with CSS micro-animations (`22+ Years in Trade`, `100% Response Rate`).
   - Dual action buttons: "Get a Free Quote" (opens wizard) and "Call (647) 522-1884".

3. **`TrustBadges.jsx`**
   - Highlight grid featuring 5 core guarantees: 22+ Years in Trade, 100% Response Rate, Free Consultations, Free Estimates, and Locally Owned.

4. **`Services.jsx`**
   - Three main service category cards:
     - **Plumbing Repair** (*Drain, Toilet, Sink, Faucet, Sewer, Sump pump, Water heater*)
     - **Plumbing Installation or Replacement** (*Disposals, pumps, fixtures, bathtubs*)
     - **Plumbing Inspection** (*Camera drain inspection, sewer diagnostics*)
   - Clicking any category pre-selects that option in the Quote Wizard.

5. **`About.jsx`**
   - Highlights the owner's philosophy and personal pledge: *"If you want someone you can trust and has been in the service industry for 22 years, I'm here for all your Drain Cleaning & Plumbing Service needs."*
   - Real trade photography overlay with local Markham service badges.

6. **`Gallery.jsx`**
   - 6-grid showcase of real trade jobs: Main Drain Snaking, Sump Pump Replacement, Copper Pipe Repair, Kitchen Sink Install, Toilet Installation, and Sewer Camera Diagnostics.
   - Each project has a *"Get Similar Quote"* trigger.

7. **`HoursAndLocation.jsx`**
   - Interactive operating schedule that calculates the current day of the week and dynamically highlights **"TODAY"**.
   - Embedded Google Map centered on Markham, ON.
   - Quick phone and quote triggers.

8. **`Amenities.jsx`**
   - Verified checklist: Free consultations, Free estimates, Locally owned, Cash accepted, Debit accepted, PayPal accepted, ASL status.

9. **`Footer.jsx`**
   - Top CTA banner ("Ready to get started?").
   - 4-column footer with business info, quick navigation, operating hours, and contact numbers.
   - Bottom bar with copyright and discreet "Owner Portal" link.

---

### B. Interactive Quote Wizard (`src/components/wizard/QuoteWizardModal.jsx`)

An 8-step self-service quotation flow optimized for mobile and desktop:

- **Step 1 — Category:** Repair, Installation or Replacement, Inspection, or Other.
- **Step 2 — Fixture:** Dynamic list based on category (Drain, Sink, Sewer, Sump pump, Water heater, Pipe, etc.).
  - **Specialized Toilet Flow:** If "Toilet" is selected under Repair, the wizard expands into 3 sub-steps:
    1. *Quantity:* 1, 2, 3, 4, 5+ toilets.
    2. *Toilet Type:* Dual flush, High-efficiency / low-flow, Standard flow.
    3. *Fault Description:* Broken/cracked, Clogged, Keeps running, Leaking, Low water pressure, Other.
- **Step 3 — Emergency Triage:** Asks if the issue is an active emergency. If **Yes**, it displays an immediate phone prompt to call `(647) 522-1884` right away rather than waiting for email.
- **Step 4 — Job Notes:** Free-text details area for homeowner descriptions.
- **Step 5 — Timeline:** ASAP, Flexible, or Specific Date (with interactive calendar picker).
- **Step 6 — Email:** Email input with privacy disclaimer.
- **Step 7 — Name:** Customer first name.
- **Step 8 — Phone:** Contact phone number for text/call project coordination.
- **Confirmation Screen:** Shows generated reference code (`#ASP-XXXXXX`) with summary and direct dialer.

---

### C. Protected Admin Portal (`src/components/admin/`)

1. **`AdminProtectedPortal.jsx`**
   - State-aware router that checks active session token in `sessionStorage`/`localStorage`.
   - Renders `AdminLogin` if unauthenticated, or `AdminDashboard` if logged in.

2. **`AdminLogin.jsx`**
   - Modern passcode-protected login screen.
   - Default passcode: `aspen2005` (configurable).
   - "Remember me on this browser" option.
   - Direct button to return to the public website.

3. **`AdminNavbar.jsx`**
   - Brand indicator and live "New Inquiries" notification counter.
   - "Settings" trigger (gear icon) to manage Telegram and EmailJS keys.
   - "View Site" link and 1-click "Logout" button.

4. **`AdminDashboard.jsx`**
   - **Metric Cards:** Real-time totals for New Inquiries, Emergency Alerts, Quoted Orders, and Total Orders.
   - **Search Engine:** Filter by customer name, phone, email, reference ID, fixture, or service.
   - **Filter Tabs:** Filter by status (`All`, `New`, `Quoted`, `In Progress`, `Completed`, `Declined`).
   - **Emergency Filter:** 1-click toggle to isolate urgent emergency inquiries.
   - **Interactive Order Cards:** Displays relative time (e.g. "Just now", "25m ago"), emergency tags, toilet diagnostics, and actions.
   - **Integration Status Banner:** Notifies the owner if Telegram or EmailJS keys are not yet configured, with a 1-click shortcut to Settings.

5. **`OrderDetailModal.jsx`**
   - Full diagnostic dossier: customer name, clickable phone (`tel:`), clickable email (`mailto:`), service type, fixture, timeline, and customer notes.
   - Displays dedicated Toilet breakdown (count, flush type, and specific symptoms).
   - Status switcher dropdown.
   - **Quote & Reply Form:**
     - Quote estimate amount input (e.g. `$220 – $280 CAD`).
     - Availability schedule input (e.g. `Tomorrow at 9:30 AM`).
     - Scope breakdown and message.
     - "Dispatch Quote via Email" action (triggers EmailJS Template 1).
   - **Quote History Thread:** Complete audit log showing every quote previously sent for this order with timestamps and delivery status.

6. **`AdminSettingsModal.jsx`**
   - **Telegram Tab:** Input fields for Bot Token and Chat ID + live **"Send Test Alert to Telegram"** button.
   - **EmailJS Tab:** Input fields for Service ID, Public Key, Template 1 ID (Quote Reply), and Template 2 ID (Receipt) + live **"Send Test Email"** tool.
   - **Security Tab:** Allows the owner to change the master passcode.

---

## 5. Service & Data Layer (`src/services/` & `src/data/`)

### A. `orderService.js`
- **Data Persistence:** Uses browser `localStorage` under key `aspen_drain_quotes`.
- **Pre-seeded Sample Data:** 3 realistic orders (Emergency Toilet repair, Sump Pump replacement, Drain inspection) pre-populated if empty so testing is immediate.
- **Methods:**
  - `submitQuoteRequest(orderData)`: Generates `#ASP-XXXXXX` reference, sets status to `new`, saves to storage, triggers background Telegram alert, and sends customer receipt email.
  - `getOrders()`: Retrieves and sorts orders newest first.
  - `getOrderById(refId)`: Fetches full order dossier.
  - `updateOrderStatus(refId, newStatus)`: Updates order lifecycle.
  - `addOrderReply(refId, replyData)`: Appends quote reply, records delivery status, updates latest quote amount, and promotes status to `quoted`.
  - `deleteOrder(refId)`: Removes order from store.

### B. `telegramService.js`
- Formats rich Telegram messages using Markdown with emojis:
  - 🚨 Emergency alert banner
  - Reference number `#ASP-XXXXXX`
  - Customer name, phone, email
  - Service type and fixture
  - Toilet specifications (if applicable)
  - Requested timeline and customer notes
  - Direct link to `https://aspov.vercel.app/#/admin`
- Dispatches via `https://api.telegram.org/bot<token>/sendMessage`.
- Includes `testTelegramConnection(botToken, chatId)` for live testing.
- Operates in simulation mode when credentials are not yet entered.

### C. `emailService.js`
- Integrated with `@emailjs/browser`.
- `sendCustomerQuoteEmail(order, quoteData)`: Uses **Template 1** to email the formal quote card, price, schedule, and company contact to the customer.
- `sendOrderConfirmationEmail(order)`: Uses **Template 2** to email an instant receipt to the customer upon wizard submission.
- `testEmailConnection(...)`: Sends a test payload from the Admin Settings modal.
- Includes automatic fallback / simulation mode with detailed console output if credentials are not configured.

### D. `configService.js`
- Manages credentials in `localStorage` under key `aspen_app_config` with fallback to `import.meta.env` variables.
- Manages authentication state in `sessionStorage` and `localStorage` under key `aspen_admin_auth`.

### E. `plumbingData.js`
- Centralized source of truth for business metadata, hours, special hours, service categories, fixture catalogs, toilet diagnostic options, trust metrics, and amenity checklists.

---

## 6. Automated Testing Suite (`scripts/test-suite.js`)

An automated test suite running in Node.js ESM that verifies:
- Config service defaults and authentication rejection/acceptance.
- Session persistence and custom passcode updates.
- Order creation, reference ID generation, and emergency flag preservation.
- Toilet diagnostic serialization (count, flush types, issues).
- Quote reply appending, status promotion to `quoted`, and quote amount tracking.
- Order deletion.
- Telegram notification formatting and simulation resilience.
- EmailJS receipt and quote dispatch formatting.

Run the test suite anytime using:
```bash
npm test
```
*Current result: 21 Passed, 0 Failed.*

---

## 7. EmailJS Templates Setup Guide

To activate live customer emails, create these two templates in your [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates):

### Template 1: Customer Quote Reply
- **Template ID:** Paste into **Template 1: Quote Reply ID** in Admin Settings.
- **To Email:** `{{to_email}}`
- **Subject:** `Your Aspen Drain Quote Estimate [#{{reference_id}}]`
- **Variables available:** `{{to_name}}`, `{{quote_amount}}`, `{{estimated_schedule}}`, `{{quote_message}}`, `{{service_type}}`, `{{fixture}}`, `{{reference_id}}`, `{{company_phone}}`

### Template 2: Customer Order Receipt
- **Template ID:** Paste into **Template 2: Customer Receipt ID** in Admin Settings.
- **To Email:** `{{customer_email}}`
- **Subject:** `We Received Your Quote Request [#{{reference_id}}] — Aspen Drain`
- **Variables available:** `{{to_name}}`, `{{reference_id}}`, `{{service_type}}`, `{{fixture}}`, `{{estimated_schedule}}`, `{{company_phone}}`

---

## 8. Environment Variables Reference (Vercel)

These variables can be set in your [Vercel Project Settings](https://vercel.com/goodyness-devs-projects/aspov/settings/environment-variables):

| Variable | Description |
|---|---|
| `VITE_ADMIN_PASSWORD` | Master passcode for the Owner Admin Portal (Default: `aspen2005`) |
| `VITE_TELEGRAM_BOT_TOKEN` | Telegram Bot Token obtained from `@BotFather` |
| `VITE_TELEGRAM_CHAT_ID` | Numerical Telegram Chat ID of the owner |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS Service ID (e.g. `service_xxxxxxx`) |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS Account Public Key (e.g. `xxxxxxxxxxxxxxxx`) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS Template 1 ID for customer quote replies |
| `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID` | EmailJS Template 2 ID for customer submission receipts |

*Note: All credentials can also be configured directly inside the live Admin Dashboard Settings modal without needing a code redeploy.*

---

## 9. File Structure Summary

```
project 2/
├── .gitignore                    # Excludes node_modules, dist, .env
├── aspen-drain-brief.md          # Original product brief and requirements
├── index.html                    # HTML entry point with Plus Jakarta Sans & SEO meta
├── package.json                  # React 18, Vite 5, Tailwind 3, EmailJS, Lucide
├── postcss.config.js             # PostCSS Tailwind plugins
├── tailwind.config.js            # "Mist" & "Navy" color palette and animations
├── vercel.json                   # Vercel SPA routing rewrite rules
├── vite.config.js                # Vite build config
├── scripts/
│   └── test-suite.js             # Automated 21-test verification runner (npm test)
├── public/                       # Real trade project photography & logo assets
└── src/
    ├── App.jsx                   # Public / Admin router and keyboard shortcut
    ├── index.css                 # Custom glassmorphism classes & Tailwind directives
    ├── main.jsx                  # React application root
    ├── data/
    │   └── plumbingData.js       # Business info, hours, fixtures, trust badges
    ├── services/
    │   ├── configService.js      # Credentials, auth session & settings store
    │   ├── emailService.js       # Dual EmailJS workflows (Quotes & Receipts)
    │   ├── orderService.js       # Inbound order store, status lifecycle, samples
    │   └── telegramService.js    # Telegram Bot API notification engine
    └── components/
        ├── About.jsx             # Owner background, experience & pledge
        ├── Amenities.jsx         # Payment methods & service amenities checklist
        ├── Footer.jsx            # Hours summary, contact anchors & Owner Portal link
        ├── Gallery.jsx           # 6-grid showcase of real plumbing projects
        ├── Hero.jsx              # Value proposition, trust badges & main CTAs
        ├── HoursAndLocation.jsx  # Live "Today" hours table & Google Maps embed
        ├── Navbar.jsx            # Sticky glass header, dialer & Owner Portal icon
        ├── Services.jsx          # Repair, Install, and Inspect category cards
        ├── TrustBadges.jsx       # 5 core business guarantees
        ├── wizard/
        │   └── QuoteWizardModal.jsx # 8-step quote wizard with toilet diagnostics
        └── admin/
            ├── AdminDashboard.jsx       # Pipeline metrics, search, filters & cards
            ├── AdminLogin.jsx           # Passcode-protected owner gate
            ├── AdminNavbar.jsx          # Notification ticker, settings, logout
            ├── AdminProtectedPortal.jsx # Route authentication wrapper
            ├── AdminSettingsModal.jsx   # Live Telegram & EmailJS credentials manager
            └── OrderDetailModal.jsx     # Dossier view, diagnostics & EmailJS quote tool
```
