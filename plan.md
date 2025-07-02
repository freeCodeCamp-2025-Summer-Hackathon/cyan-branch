# Project Plan - VoiceBox
An anonymous suggestion box for workplaces, communities, or schools.

**User Stories:**
- As an admin, I can create a box and share a submission link.
- As a user, I can submit anonymous feedback.
- As an admin, I can review and respond to submissions.

## Features
### Admin dashboard
- Admin signup/login (NextAuth)
- Create suggestion box (name, description, etc)
- Generate shareable URL for submissions
- View all owned boxes

### Submitting anonymous feedback
- Anonymous form (no login)
- Link routes to unique box ID
- Submit form with suggestion
- Store in DB with timestamp

### Reviewing suggestions
- View box suggestions
- Respond to suggestions

## Architecture
```
/app
  /admin
    /dashboard
    /box/[id]         // view & respond to submissions
  /submit/[boxId]     // anonymous submission page
  /api
    /auth             // sign up/login
    /boxes            // create, get boxes
    /submissions      // create, get, respond
/lib
  mongodb.js          // db connection
  auth.js             // session management
/models               // schema definitions
```

### API Routes
```
POST   /api/boxes                 → create box
GET    /api/boxes                 → list admin's boxes
POST   /api/submissions           → user submits feedback
GET    /api/submissions/[boxId]   → admin fetches feedback
PATCH  /api/submissions/[id]      → admin response
```

## DB Model
### users
```
{
    _id,
    email,
    passwordHash,
    name
}
```

### boxes
```
{
    _id,
    adminId, // reference to user_id
    name,
    description,
    createdAt
}
```

### submissions
```
{
    _id,
    boxId,  // reference to box_id
    message,
    response,
    createdAt
}
```

## Development
### Authentication & admin features
Let admins sign up, log in, and create suggestion boxes
- MongoDB connection
- Email/password authentication (NextAuth)
- Create admin dashboard
  - Signup/login page
  - Create new box
  - View created boxes
- Create form for new boxes
  - API route `POST /api/boxes`
  - Generate shareable public URL `/submit/[boxId]`
    - Link timeout

### Submission form
Allow anyone with link to end anonymous feedback
- Submission page
  - Build public `/submit/[boxId]` page
  - Santise form input with Prisma
- Handle anonymous POST request
  - API route `POST /api/submissions`
  - Save message + box reference + timestamp

### Admin review and respond
Let admins view and respond to submissions, edit/delete boxes
- Display all submissions for each box
  - API route `GET /api/boxes`
- Respond to messages
  - Form element to get response
  - API route `PATCH /api/submissions/[submissions.id]`
  - Store reply in `submissions.response` field
- Edit/delete boxes

## TODO:
- 

### Future features
- Use slugs for shareable URLs
- QR codes for shareble URLs
- Analytics
