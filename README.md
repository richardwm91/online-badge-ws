
# NLW 2021
**Day one - Origin (basic)**

Project description:
**Online badge - Web service**

## What's new in this NLW?

- [SQLite](https://www.sqlite.org/index.html) with code first
 - Using [Prism](https://www.prisma.io/) as ORM
 - Authentication with github to get authenticated user data

## What's in this project?

**API:**
  - User authentication
  - Get authenticated user data
  - Creating messages
  - Get the last three messages created by the authenticated user

**Web socket (socket.io):**
- Send new messages

**Environment variables:**
 - GITHUB_CLIENT_SECRET = {you need [generate your keys](https://github.com/settings/applications/new)}
 - GITHUB_CLIENT_ID = {get after generate application}
 - GITHUB_API_BASE_URL = https://api.github.com
 - GITHUB_BASE_URL = https://github.com
 - JWT_TOKEN = {generate your private key [md5](http://www.md5.cz/)}
