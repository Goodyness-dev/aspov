# Aspen Drain — Website Brief

## Business Overview

**Name:** Aspen Drain  
**Tagline:** Markham's Trusted Drain & Plumbing Specialist — Serving the Community Since 2005  
**Phone:** (647) 522-1884  
**Service Area:** Markham, ON and surrounding York Region  
**Website Goal:** Replace Yelp as the primary discovery + quote channel. Give the business its own branded web presence where customers can self-serve a quote request in under 2 minutes — no Yelp middleman.

---

## Hours

| Day | Hours |
|-----|-------|
| Monday | 7:00 AM – 7:00 PM |
| Tuesday | 7:00 AM – 7:00 PM |
| Wednesday | 7:00 AM – 7:00 PM |
| Thursday | 7:00 AM – 7:00 PM |
| Friday | 7:00 AM – 7:00 PM |
| Saturday | Closed |
| Sunday | 9:00 AM – 5:00 PM |

> **Special Hours:** Thu, Dec 31, 2026 → 9:00 AM – 5:00 PM

---

## About the Business

**Specialties:**  
Drain cleaning and plumbing services for residential customers in the Markham area. Known for trustworthy, reliable work across a wide range of plumbing needs — from emergency repairs to full installations.

**Owner's Statement:**  
*"If you want someone you can trust and has been in the service industry for 22 years, I'm here for all your Drain Cleaning & Plumbing Service needs."*

**Key Trust Signals:**
- In business since 2005 — 22 years of experience
- Locally owned and operated
- 100% response rate
- Free consultations
- Free estimates

---

## Services

Three top-level service categories, each with the same fixture sub-types:

**Plumbing Repair**  
**Plumbing Installation or Replacement**  
**Plumbing Inspection**

Fixtures covered across all three categories:
- Drain
- Garbage disposal
- Sink
- Toilet
- Faucet
- Sewer
- Sump pump

> **Note:** Each service card links to the quote request wizard (see below).

---

## Quote Request Wizard (Multi-Step Modal Flow)

Every service CTA triggers a step-by-step popup wizard. Here's the complete step sequence:

---

### Step 1 — What kind of plumbing service are you looking for?
*(Radio buttons)*
- Repair
- Installation or Replacement
- Inspection
- Other

---

### Step 2a — If "Repair": What do you need to repair?
*(Radio buttons)*
- Backflow preventer
- Bathtub
- Drain
- Faucet
- Garbage disposal
- Gas line
- Hot water recirculation pump
- Sewer
- Shower
- Sink
- Sump pump
- Toilet
- Water heater
- Water pipe
- Other

> If user selects "Toilet" under Repair → show sub-steps:

**How many toilets need repair?**
- 1
- 2
- 3
- 4
- 5 or more
- Other

**What type of toilet are you looking to repair? (Select all that apply)**
- Dual flush toilet
- High-efficiency, low-flow toilet
- Standard flow toilet (most common)

**What's wrong with your toilet? (Select all that apply)**
- Broken or cracked
- Clogged
- Keeps running
- Leaking
- Low water pressure
- Other

---

### Step 2b — If "Installation or Replacement": What do you need installed or replaced?
*(Radio buttons — same fixture list as Repair)*
- Backflow preventer
- Bathtub
- Drain
- Faucet
- Garbage disposal
- Gas line
- Hot water recirculation pump
- Sewer
- Shower
- Sink
- Sump pump
- Toilet
- Water heater
- Water pipe
- Other

---

### Step 2c — If "Inspection": What do you need inspected?
*(Radio buttons)*
- Drain
- Faucet
- Garbage disposal
- Sewer
- Sink
- Sump pump
- Toilet
- Other

---

### Step 3 — Is this an emergency repair?
*(Radio buttons)*
- Yes
- No

---

### Step 4 — Any details you'd like to add?
*(Text area — free input, optional)*

---

### Step 5 — When do you require this service?
*(Radio buttons)*
- As soon as possible
- I'm flexible
- Specific date(s) → show date picker if selected

---

### Step 6 — Where should we send quotes?
*(Email input)*  
Sub-text: *"We won't share this email with businesses."*

---

### Step 7 — What is your name?
*(Text input)*  
- First name field

---

### Step 8 — Phone number (optional)
*(Phone input)*  
Sub-text: *"Get texts and calls from pros about your project."*

---

## Amenities & Features

**Available:**
- ✅ Free consultations
- ✅ Free estimates
- ✅ Locally owned and operated
- ✅ Accepts cash
- ✅ Accepts debit cards
- ✅ Accepts PayPal

**Not available:**
- ❌ ASL proficient

---

## Map Feature

Embed an interactive Google Map on the contact/location section.

**Requirements:**
- Center map on Markham, ON service area (no fixed street address available — use Markham, ON as the center point)
- "Call Us" CTA button linking to tel:(647)522-1884
- "View Service Area" CTA that expands or links to a service area note
- Show the map inline on the page (not a separate page)

**Suggested embed approach:**
```
https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Markham,ON,Canada
```

---

## Visual Direction

**Feel:** Trustworthy, local, no-nonsense. Plumber you'd call for your own house — not a corporate chain.  
**Color cues:** Deep navy blue + white + a clean accent (pull from the Aspen Drain logo — navy/dark blue with white lettering). Avoid the Yelp red — this should feel distinctly theirs.  
**Typography:** Clean and legible — professional tradesperson, not a startup. Readable at a glance on mobile.  
**Photos:** Use the Yelp gallery photos as placeholders — real job shots (valve replacements, pipe work, underground repairs). These are gold — real work beats stock photography every time. Easy to swap for hi-res client photos later.  
**Logo:** Use the existing Aspen Drain logo (wrench + pipe illustration, "Since 2005" badge). It's solid — don't redesign it.

---

## Pages / Sections Needed

1. **Hero** — Business name, tagline, years in business badge, primary CTA ("Get a Free Quote")
2. **Services** — Three service cards (Repair / Installation or Replacement / Inspection), each with a "Get a Quote" button triggering the wizard. Sub-services listed under each card.
3. **About** — Owner's statement, 22 years of experience, locally owned, Markham-based
4. **Trust Badges** — Free consultations, Free estimates, 100% response rate, Since 2005
5. **Gallery** — Grid of real job photos pulled from Yelp listing
6. **Location + Hours** — Embedded Google Map (Markham area) + hours table + service area note
7. **Contact / Footer** — Phone number prominent, hours summary, PayPal/cash/debit accepted, quick links

---

## Notes for Antigravity

- The quote wizard is the most important interactive element — must work smoothly on mobile
- "Is this an emergency?" (Step 3) should be asked early — if Yes, surface the phone number immediately with a "Call Now" prompt rather than making them complete the full wizard
- Toilet selected in Step 2a triggers the deepest sub-flow (quantity → type → problem) — all other fixtures go straight to Step 3
- The same fixture sub-flow applies to Installation/Replacement and Inspection — only the lead question changes
- Show a progress bar or step counter so users know how far they are
- No pricing listed anywhere — wizard collects job details so the owner can respond with a custom quote
- Photos: real Yelp job photos as placeholders, make it easy to swap in hi-res versions later
- No fixed street address — use phone number and service area map as the primary contact anchors
