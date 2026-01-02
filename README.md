# norhum-strapi

Strapi CMS for norhum-site project.

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development without Docker)

### Local Development with Docker

1. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Generate secrets:**
   ```bash
   # Generate APP_KEYS (4 keys required)
   openssl rand -base64 32 | tr '\n' ',' && openssl rand -base64 32 | tr '\n' ',' && openssl rand -base64 32 | tr '\n' ',' && openssl rand -base64 32
   
   # Generate other secrets
   openssl rand -base64 32  # For API_TOKEN_SALT, ADMIN_JWT_SECRET, etc.
   ```

3. **Start Docker containers:**
   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

4. **Access Strapi Admin:**
   - Open http://localhost:1337/admin
   - Create your first admin user

### Local Development without Docker

```bash
npm install
npm run develop
```

## 📦 Project Structure

```
norhum-strapi/
├── config/              # Strapi configuration files
│   ├── database.ts      # Database configuration
│   ├── server.ts         # Server configuration
│   └── env/
│       └── production/   # Production-specific configs
├── src/
│   ├── api/             # Content types
│   └── admin/           # Admin panel customization
├── docker/               # Docker files
│   ├── Dockerfile        # Production Dockerfile
│   └── Dockerfile.dev    # Development Dockerfile
└── docker-compose.dev.yml # Docker Compose for local development
```

## 🚢 Deployment

This project is configured to automatically deploy to Strapi Cloud when changes are pushed to the `main` branch.

### GitHub Repository Setup

1. **Create a new GitHub repository:**
   ```bash
   # On GitHub, create a new repository named "norhum-strapi"
   # Then connect your local repository:
   git remote add origin https://github.com/YOUR_USERNAME/norhum-strapi.git
   git branch -M main
   git push -u origin main
   ```

### Strapi Cloud Setup

1. Go to https://cloud.strapi.io
2. Create a new project
3. Connect this GitHub repository (`norhum-strapi`)
4. Select **Free** plan
5. **Base directory**: `.` (root)
6. **Branch**: `main`

Strapi Cloud will automatically:
- Build and deploy on every push to `main`
- Provide PostgreSQL database
- Generate production secrets

## 🔗 Integration with norhum-site

### Environment Variables (norhum-site)

**Local development:**
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

**Production (AWS Amplify):**
```bash
NEXT_PUBLIC_STRAPI_URL=https://your-project.strapicloud.com
STRAPI_API_TOKEN=<Generate in Strapi Admin > Settings > API Tokens>
```

## 📚 Learn more

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Cloud Documentation](https://docs.strapi.io/cloud)
- [Strapi Community](https://discord.strapi.io)
