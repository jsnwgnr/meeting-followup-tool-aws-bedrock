# Meeting Followup Tool
React + FastAPI + AWS Bedrock + Clerk SSO/Subscription

Simple subscription-enabled tool that enriches meeting notes and creates followup activities.

Simple AWS-opinionated deployment using AppRunner and Bedrock as backend services.

## Build and Test Locally

This assumes you already have Docker Desktop installed and running.

### Step 1: Sign up for Clerk

www.clerk.com
Setup an API key
Note the JWKS url

Create .env file in root folder with entries for:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWKS_URL=

### Step 2: Load Environment Variables

**Mac/Linux** (Terminal):
```bash
export $(cat .env | grep -v '^#' | xargs)
```

**Windows** (PowerShell):
```powershell
Get-Content .env | ForEach-Object {
    if ($_ -match '^(.+?)=(.+)$') {
        [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2])
    }
}
```

### Step 3: Build the Docker Image

**Mac/Linux**:
```bash
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" \
  -t meeting-summary-app .
```

**Windows PowerShell**:
```powershell
docker build `
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$env:NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" `
  -t meeting-summary-app .
```

### Step 4: Run the Image Locally

**Mac/Linux**:
```bash
docker run -p 8000:8000 \
  -e CLERK_SECRET_KEY="$CLERK_SECRET_KEY" \
  -e CLERK_JWKS_URL="$CLERK_JWKS_URL" \
  -e OPENAI_API_KEY="$OPENAI_API_KEY" \
  meeting-summary-app
```

**Windows PowerShell**:
```powershell
docker run -p 8000:8000 `
  -e CLERK_SECRET_KEY="$env:CLERK_SECRET_KEY" `
  -e CLERK_JWKS_URL="$env:CLERK_JWKS_URL" `
  -e OPENAI_API_KEY="$env:OPENAI_API_KEY" `
  meeting-summary-app
```

### Step 5: Test It Out

1. Open browser to `http://localhost:8000`
2. Sign in using Clerk SSO
3. Select the Premium Plan (Note this mocks credit card charges, it does not charge anything unless you sign up for Stripe)
3. Test the meeting form 

**To stop**: Press `Ctrl+C` in the terminal