// Document templates for Doc Studio
export const TEMPLATE_CATEGORIES = [
    { id: 'software', label: 'Software Docs', icon: '💻' },
    { id: 'resume', label: 'Resumes', icon: '📋' },
    { id: 'email', label: 'Email Templates', icon: '✉️' },
    { id: 'general', label: 'General', icon: '📄' },
];

export const TEMPLATES = [
    // ─── Software Documentation ───────────────────────────
    {
        id: 'readme',
        category: 'software',
        title: 'README.md',
        description: 'Standard open-source project README',
        icon: '📦',
        content: `# Project Name

> One-line description of what this project does.

## 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📖 Overview

Brief description of the project's purpose and features.

## ✨ Features

- Feature one
- Feature two
- Feature three

## 📦 Installation

\`\`\`bash
git clone https://github.com/username/project
cd project
npm install
\`\`\`

## 🔧 Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| \`PORT\` | \`3000\` | Server port |
| \`DB_URL\` | — | Database connection URL |

## 📚 Usage

\`\`\`js
import { Widget } from './widget';

const w = new Widget({ theme: 'dark' });
w.render();
\`\`\`

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📄 License

[MIT](LICENSE)
`,
    },
    {
        id: 'api-docs',
        category: 'software',
        title: 'API Documentation',
        description: 'REST API reference with endpoints and examples',
        icon: '🔌',
        content: `# API Reference

Base URL: \`https://api.example.com/v1\`

## Authentication

All requests require an \`Authorization\` header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

---

## Endpoints

### GET /users

Returns a list of users.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| \`page\` | integer | No | Page number (default: 1) |
| \`limit\` | integer | No | Items per page (default: 20) |

**Response**

\`\`\`json
{
  "data": [
    { "id": "1", "name": "Alice", "email": "alice@example.com" }
  ],
  "meta": { "page": 1, "total": 100 }
}
\`\`\`

---

### POST /users

Create a new user.

**Request Body**

\`\`\`json
{
  "name": "Bob",
  "email": "bob@example.com",
  "password": "securepassword"
}
\`\`\`

**Response** \`201 Created\`

\`\`\`json
{ "id": "2", "name": "Bob", "email": "bob@example.com" }
\`\`\`

---

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |
`,
    },
    {
        id: 'tech-guide',
        category: 'software',
        title: 'Technical Guide',
        description: 'Step-by-step technical implementation guide',
        icon: '🗺️',
        content: `# Technical Guide: [Feature Name]

## Overview

What this guide covers and who it is for.

## Prerequisites

- Node.js >= 18
- Docker installed
- Access to the dev environment

## Architecture

Describe the high-level architecture here.

## Step 1: Setup

\`\`\`bash
npm install @package/name
\`\`\`

Explain what this step does.

## Step 2: Configuration

Create a \`config.json\` file:

\`\`\`json
{
  "apiUrl": "https://api.example.com",
  "timeout": 5000
}
\`\`\`

## Step 3: Implementation

Describe the implementation steps here.

\`\`\`js
async function init(config) {
  const client = new Client(config);
  await client.connect();
  return client;
}
\`\`\`

## Testing

How to verify the implementation works.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Connection refused | Server not running | Start the server |

## Further Reading

- [Link to docs]()
`,
    },

    // ─── Resumes ─────────────────────────────────────────
    {
        id: 'resume-modern',
        category: 'resume',
        title: 'Modern Resume',
        description: 'Clean, ATS-friendly professional resume',
        icon: '🧑‍💼',
        content: `# Your Name

**Email:** you@email.com | **Phone:** +1 (555) 000-0000
**LinkedIn:** linkedin.com/in/yourname | **GitHub:** github.com/yourname
**Location:** City, State

---

## Summary

Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about developer experience, clean code, and shipping products users love.

---

## Experience

### Senior Software Engineer — Acme Corp
*Jan 2022 – Present | San Francisco, CA*

- Led development of a microservices migration, reducing latency by 40%
- Mentored 4 junior engineers, improving team velocity by 25%
- Built a real-time dashboard serving 100K+ daily active users

### Software Engineer — Startup Inc
*Jun 2019 – Dec 2021 | Remote*

- Developed REST APIs handling 5M+ requests per day
- Improved CI/CD pipeline reducing deployment time from 45 min to 8 min
- Collaborated with design to ship 12 product features per quarter

---

## Skills

**Languages:** JavaScript, TypeScript, Python, SQL
**Frameworks:** React, Node.js, Express, FastAPI
**Tools:** Docker, Kubernetes, AWS, PostgreSQL, Redis

---

## Education

### B.S. Computer Science — State University
*2015 – 2019 | GPA: 3.8*

---

## Projects

### Open Source Library
*github.com/yourname/project*
A utility library downloaded 50K+ times/month. Built with TypeScript.
`,
    },
    {
        id: 'resume-ats',
        category: 'resume',
        title: 'ATS-Optimized Resume',
        description: 'Keyword-rich format designed to pass ATS scanners',
        icon: '🤖',
        content: `# FULL NAME
City, State | email@email.com | (555) 000-0000 | linkedin.com/in/name

---

## PROFESSIONAL SUMMARY

Software Engineer with experience in full-stack development, cloud infrastructure, and agile methodologies. Proven track record of delivering high-quality software on schedule.

---

## TECHNICAL SKILLS

- **Programming Languages:** JavaScript, TypeScript, Python, Java
- **Frontend:** React.js, Vue.js, HTML5, CSS3, Responsive Design
- **Backend:** Node.js, Express.js, REST APIs, GraphQL
- **Databases:** PostgreSQL, MongoDB, MySQL, Redis
- **DevOps:** AWS, Docker, CI/CD, Linux, Nginx
- **Methodologies:** Agile, Scrum, TDD, Code Review

---

## PROFESSIONAL EXPERIENCE

**Software Engineer | Company Name | 2021 – Present**
- Developed and maintained RESTful APIs using Node.js and Express.js
- Implemented responsive UI components using React.js
- Reduced page load time by 35% through performance optimization
- Participated in code reviews and maintained code quality standards

**Junior Developer | Previous Company | 2019 – 2021**
- Built internal tools using Python and Flask
- Collaborated with cross-functional teams in an Agile environment
- Wrote unit tests achieving 85% code coverage

---

## EDUCATION

**Bachelor of Science, Computer Science**
University Name | Graduation Year

---

## CERTIFICATIONS

- AWS Certified Developer – Associate
- Google Cloud Professional Data Engineer
`,
    },

    // ─── Email Templates ──────────────────────────────────
    {
        id: 'email-formal',
        category: 'email',
        title: 'Formal Business Email',
        description: 'Professional correspondence for business contexts',
        icon: '📨',
        content: `Subject: [Clear Subject Line]

Dear [Recipient Name],

I hope this message finds you well. I am writing to [state the purpose of your email clearly and concisely].

[Body Paragraph 1]
Provide context and relevant background information. Be specific and professional in your tone.

[Body Paragraph 2]
State your request, proposal, or the action you need the recipient to take. Be polite and direct.

[Optional: Attachments or References]
Please find attached [document name] for your reference.

I would appreciate your feedback by [date/timeframe]. Please don't hesitate to reach out if you have any questions or require additional information.

Thank you for your time and consideration.

Kind regards,

[Your Full Name]
[Job Title]
[Company Name]
[Phone Number]
[Email Address]
`,
    },
    {
        id: 'email-outreach',
        category: 'email',
        title: 'Cold Outreach Email',
        description: 'Effective cold email for networking or sales',
        icon: '🎯',
        content: `Subject: Quick question about [their company/project]

Hi [First Name],

I came across [their work/company/article] and was genuinely impressed by [specific detail that shows you've done your research].

I'm [Your Name], a [your role] at [your company]. We help companies like [similar company] with [specific value prop].

I noticed [specific pain point or opportunity relevant to them] and thought our [product/service/idea] could be a good fit.

Would you be open to a 15-minute call this week or next to explore if there's a mutual fit?

[CTA: Link to calendar or specific times]

Either way, keep up the great work on [specific thing]. 

Best,
[Your Name]
[Title] | [Company]
[LinkedIn URL]
`,
    },
    {
        id: 'email-casual',
        category: 'email',
        title: 'Casual Team Update',
        description: 'Friendly internal update for teams',
        icon: '👋',
        content: `Subject: Quick Update — [Project/Topic]

Hey team 👋

Just wanted to drop a quick update on [project/initiative]:

**What's done ✅**
- Item one
- Item two

**What's in progress 🔄**
- Item one (ETA: [date])
- Item two

**Blockers ⚠️**
- [Any blockers or decisions needed from the team]

**Next steps**
I'll be working on [next tasks] and will share another update on [day].

Feel free to ping me if you have questions or want to sync up!

Cheers,
[Your Name]
`,
    },

    // ─── General ──────────────────────────────────────────
    {
        id: 'meeting-notes',
        category: 'general',
        title: 'Meeting Notes',
        description: 'Structured template for capturing meeting outcomes',
        icon: '📝',
        content: `# Meeting Notes

**Date:** [Date]
**Time:** [Time]
**Location:** [Zoom / Office / Room]
**Facilitator:** [Name]

## Attendees

- [Name] — [Role]
- [Name] — [Role]

---

## Agenda

1. [Topic 1]
2. [Topic 2]
3. [Topic 3]

---

## Discussion

### [Topic 1]
Summary of what was discussed...

**Decision:** [Any decision made]
**Owner:** [Name]

### [Topic 2]
Summary...

---

## Action Items

| Task | Owner | Due Date | Status |
|------|-------|----------|--------|
| [Task description] | [Name] | [Date] | Open |

---

## Next Meeting

**Date:** [Next meeting date]
**Topics:** [Preview of next agenda]
`,
    },
    {
        id: 'blank',
        category: 'general',
        title: 'Blank Document',
        description: 'Start with a completely clean slate',
        icon: '🗒️',
        content: '# Untitled Document\n\nStart writing here...\n',
    },
];

export function getTemplatesByCategory(categoryId) {
    return TEMPLATES.filter(t => t.category === categoryId);
}

export function getTemplateById(id) {
    return TEMPLATES.find(t => t.id === id);
}
