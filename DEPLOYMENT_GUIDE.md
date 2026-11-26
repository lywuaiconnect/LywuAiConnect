# LiwuAI Connect - Deployment & Integration Guide

## 🎯 Ready to Deploy

Your LiwuAI Connect project is built and ready! The following files are prepared for deployment:

### ✅ What's Ready
- **Frontend**: Built at `apps/web/dist/`
- **Backend**: Worker code at `apps/api/src/`
- **Database**: D1 table schema prepared
- **Configuration**: `wrangler.jsonc` configured
- **Secrets**: `.dev.vars` contains your API keys

## 🚀 Deployment Steps

### Step 1: Login to Cloudflare
```powershell
cd "E:\Websites\Kilo LywuAi Connect"
wrangler login
```

### Step 2: Set Secrets (if not already in .dev.vars)
```powershell
# Check if you need to set secrets (API token should already be set in environment)
wrangler secret put OPENROUTER_API_KEY
# Enter your OpenRouter API key

wrangler secret put JWT_SECRET  
# Enter: liwuai-connect-secure-jwt-secret-key-32chars
```

> Note: You can also manage secrets via environment variables in `.dev.vars` which is already configured in your project

### Step 3: Deploy to Cloudflare Workers
```powershell
wrangler deploy
```

### Expected Output
```
🌀 Building list of assets...
✨ Read 4 files from the assets directory apps/web/dist
🌀 Starting asset upload...
✘ No updated asset files to upload. Proceeding with deployment...
✨ Deploying worker...
✨ https://lywuaiconnect.workers.dev
```

## 🔗 Integration with lywuai.com

### Option A: CNAME Record (Recommended)

Add a CNAME record in your Cloudflare dashboard for lywuai.com:

**Cloudflare DNS → Add Record:**
- **Type**: CNAME
- **Name**: `connect.lywuai.com` (or your preferred subdomain)
- **Target**: `lywuaiconnect.workers.dev`
- **TTL**: Auto
- **Proxy status**: Proxied (orange cloud)

### Option B: Worker Route (Subpath Integration)

**Cloudflare Workers Routes → Add Route:**
- **Route**: `lywuai.com/connect*`
- **Worker**: `lywuaiconnect`

Then update your main website's Worker to proxy:

```javascript
// Add to your main website's Worker
app.get('/connect/*', async (c) => {
  const url = new URL(c.req.url);
  url.hostname = 'lywuaiconnect.workers.dev';
  url.pathname = url.pathname.replace('/connect', '');
  const response = await fetch(url.toString());
  return new Response(response.body, response);
});
```

## 📱 Navigation Link

Add this to your main website's navigation component:

```html
<a href="https://connect.lywuai.com" target="_blank" rel="noopener noreferrer">
  Social Connect ↗
</a>
```

## 🏗️ Project Structure

```
E:\Websites\Kilo LywuAi Connect\
├── apps/
│   ├── api/           # Cloudflare Workers backend (Hono)
│   │   ├── src/       # API routes
│   │   └── wrangler.toml
│   └── web/           # Cloudflare Pages frontend (React)
│       ├── src/       # React components
│       ├── dist/      # Built files (ready for deployment)
│       └── index.html
├── packages/
│   └── db/            # Database schema
├── wrangler.jsonc     # Main deployment config
├── .dev.vars         # Secret keys
└── README.md
```

## 🛠️ Troubleshooting

### If deployment fails:
1. Check your Cloudflare API token has correct permissions
2. Verify wrangler.jsonc has correct account_id
3. Ensure all secrets are set

### If assets don't load:
1. Check the Worker deployed successfully
2. Verify `apps/web/dist` contains `index.html` and `assets/index-*.js`
3. Clear browser cache and try `https://lywuaiconnect.workers.dev/`

## 🔍 Verification

After deployment, verify:
- Visit `https://lywuaiconnect.workers.dev/` - should show your app
- API health check: `https://lywuaiconnect.workers.dev/health`
- Frontend should load with Tailwind styling

---

**Ready to proceed with deployment!**