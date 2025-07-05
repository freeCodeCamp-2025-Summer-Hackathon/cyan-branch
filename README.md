# Cyan Branch: Voice Box

An anonymous suggestion box for workplaces, communities, or schools.

### User Stories:

- As an admin, I can create a box and share a submission link.
- As a user, I can submit anonymous feedback.
- As an admin, I can review and respond to submissions.

## Prerequisites

### NodeJS and NPM

Check you have Node and NPM installed:

`node -v`

If not, you can install them by going to [NodeJS installation guide](https://nodejs.org/en/download).

### PNPM

You can install pnpm with:

`npm install -g pnpm@latest-10`

## Installing dependencies

`pnpm install`

## Prisma Setup

In order to generate the prisma client, follow these steps:

- Create a .env file contaning the .env.local file content. This is necessary to generate the Prisma client since
  .env.local is only recognized by the NextJs server

- Generate the client with `pnpm dlx prisma generate`

## Project Structure

```
/
├── app/                 # Next.js app router pages        
│   └── api/             # API routes
├── lib/                 # Shared libraries and utilities
├── prisma/              # Prisma schema
├── public/              # Static assets
└── README.md            # Documentation for local setup
```
