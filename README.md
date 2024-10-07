# NameNexus - AI-powered startup naming with instant domain checks
![image](https://github.com/user-attachments/assets/231ad96c-6b43-4894-8569-795ddc6f66cd)

## Description

An AI-powered startup name generator that creates unique business names and instantly checks domain availability. This tool helps entrepreneurs find catchy, available names for their ventures across multiple TLDs.

## Key Features

- AI-driven name generation based on user prompts
- Real-time domain availability checking
- Multiple TLD options (.com, .io, .ai, .tech, .co)
- Customizable number of name suggestions
- Maximum price filter for domains
- Option to show/hide unavailable domains
- Save favorite names locally
- Direct link to view/purchase domains on Namecheap

This repository contains the full-stack application, including the AI name generation logic, domain availability API integration, and the user interface for a seamless naming experience.

## How It Works

1. **User Input**: Users enter a description of their startup idea or the type of names they're looking for in the main text area.

2. **Name Generation**: When the user clicks the "Generate Names" button, the app sends a request to the OpenAI API to generate startup names based on the user's input.

3. **Domain Availability**: The app checks the availability of domains for each generated name using the Namecheap API.

4. **Results Display**: The generated names and their domain availability are displayed to the user. Users can sort the results, filter by availability, and see pricing information.

5. **Customization**: Users can customize the generation process by:
   - Selecting the number of names to generate
   - Choosing which Top-Level Domains (TLDs) to check
   - Setting a maximum price for domains

6. **Save and Load**: Users can save their favorite generated names locally and load them later.

7. **Purchase Options**: Users can click on available domains to view and potentially purchase them on Namecheap.

## Key Components

- `StartupNameGenerator`: The main component that orchestrates the name generation process.
- `Settings`: Manages user preferences for name generation and domain checking.
- `ResultsList`: Displays the generated names, domain availability, and pricing.
- `SavedNames`: Allows users to save and load their favorite generated names.

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

## Technologies Used

- Next.js: React framework for building the web application
- OpenAI API: For generating startup names
- Namecheap API: For checking domain availability and pricing
- Tailwind CSS: For styling and responsive design

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Namecheap API Documentation](https://www.namecheap.com/support/api/intro/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

This app can be easily deployed on platforms like Vercel or Netlify. Make sure to set up the required environment variables in your deployment environment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
