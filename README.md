# AI Startup Name Generator

This is a [Next.js](https://nextjs.org) project that uses AI to generate startup names and check domain availability.

## How It Works

1. **User Input**: Users enter a description of their startup idea or the type of names they're looking for in the main text area.

2. **Name Generation**: When the user clicks the "Generate Names" button, the app sends a request to the OpenAI API to generate startup names based on the user's input. This process is handled by the `generateNames` function:

```typescript:src/app/actions/generateNames.ts
startLine: 10
endLine: 44
```

3. **Domain Availability**: The app then checks the availability of domains for each generated name using the Namecheap API. This is done in the `checkDomains` function (not shown in the provided code snippets).

4. **Results Display**: The generated names and their domain availability are displayed to the user. Users can sort the results, filter by availability, and see pricing information.

5. **Customization**: Users can customize the generation process by:
   - Selecting the number of names to generate
   - Choosing which Top-Level Domains (TLDs) to check
   - Setting a maximum price for domains

These settings are managed in the `Settings` component:

```typescript:src/components/Settings.tsx
startLine: 1
endLine: 74
```

6. **User Interface**: The main interface is handled by the `StartupNameGenerator` component, which orchestrates the entire process:

```typescript:src/components/StartupNameGenerator.tsx
startLine: 19
endLine: 76
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you need to set up the following environment variables in a `.env.local` file:

- `OPENAI_API_KEY`: Your OpenAI API key
- `NAMECHEAP_API_USER`: Your Namecheap API username
- `NAMECHEAP_API_KEY`: Your Namecheap API key
- `NAMECHEAP_USERNAME`: Your Namecheap username
- `NAMECHEAP_CLIENT_IP`: Your client IP address

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
