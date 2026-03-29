# Education Evolution & Long-Term Reform Dynamics Simulator
### Developed by Mateen Yousuf | School Education Department, Kashmir
### Aligned with NEP 2020

---

## 📁 PROJECT FOLDER STRUCTURE

```
jkbose-edu-sim/
├── index.html          ← Main app (all HTML + CSS + JS in one file)
├── manifest.json       ← PWA manifest
├── service-worker.js   ← Offline caching service worker
├── author.jpg          ← Author photo (place your photo here)
├── icons/
│   ├── icon-192.png    ← PWA icon (192×192)
│   └── icon-512.png    ← PWA icon (512×512)
└── README.md           ← This file
```

---

## 🚀 HOW TO SAVE & RUN THE APP

### Step 1 — Create Project Folder
1. On your computer, create a new folder: `jkbose-edu-sim`
2. Place all downloaded files inside this folder
3. Add your author photo as `author.jpg`

### Step 2 — Run Locally in Browser
**Option A — Direct (simplest):**
- Double-click `index.html`
- Opens in your default browser
- ⚠️ Service worker won't activate (needs a server)

**Option B — VS Code Live Server (recommended):**
1. Install VS Code from https://code.visualstudio.com
2. Install "Live Server" extension by Ritwick Dey
3. Right-click `index.html` → "Open with Live Server"
4. App opens at `http://127.0.0.1:5500`
5. ✅ Service worker activates, full PWA features enabled

**Option C — Python Local Server:**
```bash
cd jkbose-edu-sim
python -m http.server 8080
# Open http://localhost:8080 in browser
```

---

## 🌐 HOW TO HOST FREE (Public Web Access)

### Option A — GitHub Pages (Recommended, Free)
1. Create account at https://github.com
2. Create new repository: `edu-evolution-simulator`
3. Upload all project files
4. Go to Settings → Pages → Source: `main` branch → `/root`
5. Your app: `https://yourusername.github.io/edu-evolution-simulator`

### Option B — Netlify (Drag & Drop, Free)
1. Go to https://netlify.com → Sign up free
2. Drag your entire project folder to Netlify dashboard
3. Instant deployment with custom URL
4. Auto-HTTPS, PWA fully functional

### Option C — Cloudflare Pages (Free, Fast)
1. Go to https://pages.cloudflare.com
2. Connect GitHub repository OR upload directly
3. Build command: (none — static site)
4. Publish directory: `/` (root)

---

## 📱 INSTALLING AS MOBILE APP (PWA)

### Android (Chrome):
1. Open app URL in Chrome
2. Tap three-dot menu → "Add to Home screen"
3. App installs like a native app
4. Works fully offline after first load

### iOS (Safari):
1. Open app URL in Safari
2. Tap Share button → "Add to Home Screen"
3. App saved to home screen

---

## 📦 APK CONVERSION GUIDE (Android App)

### Method 1 — Android Studio WebView Wrapper

**Prerequisites:**
- Android Studio (free): https://developer.android.com/studio
- Java Development Kit (JDK 17+)

**Step 1 — Build Static Files**
Your app is already a single `index.html` — no build needed.
Copy entire folder to Android project's `assets/` directory.

**Step 2 — Create Android Project**
```
New Project → Empty Activity → Java/Kotlin
Min SDK: API 21 (Android 5.0+)
```

**Step 3 — MainActivity.java**
```java
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        webView = new WebView(this);
        setContentView(webView);
        
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);    // For localStorage
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAppCacheEnabled(true);
        
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/index.html");
    }
    
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
```

**Step 4 — AndroidManifest.xml permissions**
```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<application android:usesCleartextTraffic="true" ...>
```

**Step 5 — Splash Screen & Icons**
- Place your icon in `res/mipmap-*/` folders (48, 72, 96, 144, 192 px)
- Add splash theme in `res/values/styles.xml`

**Step 6 — Build APK**
```
Build → Generate Signed Bundle/APK → APK
Create new keystore (save credentials!)
Build Type: Release
```

**Step 7 — Sign & Install**
```bash
# Sign with jarsigner or use Android Studio GUI
# Install on device:
adb install app-release.apk
```

### Method 2 — PWABuilder (Easiest)
1. Host app on GitHub Pages or Netlify
2. Go to https://pwabuilder.com
3. Enter your hosted URL
4. Click "Build My PWA" → Android → Download APK
5. Sideload or distribute

---

## 🔧 ICONS SETUP
Create PNG icons using any image editor:
- **icon-192.png** — 192×192 pixels
- **icon-512.png** — 512×512 pixels

Suggested design: Deep blue background (#0a1628) with gold book/globe symbol

---

## 💾 DATA STORAGE (LocalStorage)
The app stores all simulation data locally:
- `edu_sim_lastLifecycle` — Last lifecycle simulation
- `edu_sim_lastProjection` — Last projection run
- `edu_sim_lastSocietal` — Last societal analysis
- No data leaves the device — fully private

---

## 🛠️ TECHNICAL SPECIFICATIONS
- **Technology**: Pure HTML5 + CSS3 + JavaScript (no frameworks)
- **PWA**: Service Worker + Web App Manifest
- **Storage**: LocalStorage (client-side, offline)
- **Graphics**: CSS + SVG + Canvas (no external images)
- **Fonts**: Google Fonts (Playfair Display, Rajdhani, Source Sans 3)
- **Size**: ~95KB (single file, ultra-lightweight)
- **Offline**: Full offline functionality after first load
- **Compatibility**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

---

## 📊 ANALYTICS FORMULAS REFERENCE

| Formula | Equation |
|---------|----------|
| Adoption Rate | `(Alignment×0.4 + Budget×0.35 + Cultural×0.25) × (1-ResistPenalty)` |
| Resistance Index | `((100-Cultural)×0.5 + (100-Alignment)×0.3 + Intensity×0.2) / 100` |
| Collapse Probability | `MAX(0, Resistance×1.2 - Adoption×0.8)` |
| Institutionalization | `Adoption × (1-Collapse) × (Budget/100)` |
| Fatigue Score | `(PolicyChanges×5 + Turnover×0.8) / (Trust×0.05 + 1)` |
| Resilience Capacity | `Trust×0.6 + (100-Turnover)×0.3 + 10` |
| SDCI | `(Innovation + CritThink + EconAdapt + SocCohes + DemoEngage) / 5` |

---

*Developed with dedication to the teachers and students of Kashmir*
*Aligned with India's National Education Policy 2020*
