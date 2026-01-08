# Simple AI Agent

A command-line AI assistant powered by Google's Gemini model with web search capabilities. Built using the Google Agent Development Kit (ADK).

## Features

- 💬 Interactive CLI chat interface
- 🔍 Google Search integration for real-time information
- 🧠 Powered by Gemini 2.5 Flash model
- 💾 Session management for conversation context
- ⚡ Fast and responsive terminal interface

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google AI API Key

## Installation

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd simple-ai-agent
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the project root:
```bash
   touch .env
```
   
   Add your Google AI API key:
```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
```
   
   > **Getting your API Key:**
   > 1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   > 2. Click "Get API Key" or "Create API Key"
   > 3. Copy the key and paste it in your `.env` file

## Usage

### Run the Agent

**Development mode (with TypeScript):**
```bash
npm run dev
```

**Production mode (compiled):**
```bash
npm run build
npm start
```

### Interact with the Agent

Once started, you'll see:
```
AI agent started (Type 'exit' to quit)

You:
```

Simply type your questions or requests:
```
You: What's the weather like today?
Agent is thinking...
Agent: I'll search for current weather information...

You: Tell me about the latest AI developments
Agent is thinking...
Agent: Let me find the latest information on AI developments...

You: exit
Helpful agent signing off. Bye.
```

## Project Structure
```
simple-ai-agent/
├── src/
│   └── agent.ts          # Main agent implementation
├── dist/                 # Compiled JavaScript (generated)
├── node_modules/         # Dependencies
├── .env                  # Environment variables (create this)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Configuration

### Agent Settings

You can customize the agent by modifying these parameters in `src/agent.ts`:
```typescript
const simpleAiAgent = new LlmAgent({
  name: APP_NAME,
  model: "gemini-2.5-flash",        // Change model if needed
  description: "...",                // Agent description
  instruction: "...",                // System instructions
  tools: [GOOGLE_SEARCH],            // Available tools
});
```

### Available Models

- `gemini-2.5-flash` - Fast and efficient (default)
- `gemini-2.0-flash-exp` - Experimental version
- Check [Google AI documentation](https://ai.google.dev/models) for more models

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run in development mode with ts-node |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled version |

## Dependencies

- `@google/adk` - Google Agent Development Kit
- `@google/adk-devtools` - Development tools for ADK
- `dotenv` - Environment variable management
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution environment

## Troubleshooting

### "API key must be provided" error

Make sure you have:
1. Created a `.env` file in the project root
2. Added your API key: `GOOGLE_GENAI_API_KEY=your_key_here`
3. Restarted the application

### TypeScript compilation errors

Run:
```bash
npm install
npm run build
```

## Security Notes

⚠️ **Important:** 
- Never commit your `.env` file to version control
- Keep your API key secret
- Add `.env` to `.gitignore` (already included)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Acknowledgments

- Built with [Google Agent Development Kit (ADK)](https://github.com/google/adk-js)
- Powered by [Google Gemini](https://ai.google.dev/)

## Support

For issues and questions:
- Check the [Google ADK documentation](https://github.com/google/adk)
- Open an issue in this repository
- Review the troubleshooting section above

---

Made with ❤️ using Google ADK
