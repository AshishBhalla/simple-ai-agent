import * as dotenv from "dotenv";
import { LlmAgent, GOOGLE_SEARCH, InMemoryRunner } from "@google/adk";
import * as readline from "node:readline/promises"; // Built-in for terminal input
import { stdin as input, stdout as output } from "node:process";


// 👇 Suppress ADK debug logs
process.env.ADK_LOG_LEVEL = "error";
const APP_NAME = "simple_ai_agent";

async function runAgent() {
  dotenv.config();
  // 1. Initialize the terminal interface
  const rl = readline.createInterface({ input, output });

  // 2. Define the agent
  const simpleAiAgent = new LlmAgent({
    name: APP_NAME,
    model: "gemini-2.5-flash",
    description: "A simple assistant with search capabilities.",
    instruction:
      "You are a helpful assistant. Use Google Search for current info.",
    tools: [GOOGLE_SEARCH],
  });

  const runner = new InMemoryRunner({
    agent: simpleAiAgent,
    appName: APP_NAME,
  });

  const session = await runner.sessionService.createSession({
    appName: APP_NAME,
    userId: "userId",
  });

  console.log("AI agen started (Type 'exit' to quit");

  while (true) {
    const userInput = await rl.question("\nYou:");
    if (
      userInput.toLowerCase() === "exit" ||
      userInput.toLowerCase() === "quit"
    ) {
      console.log("Helpful agent signing off. Bye.");
      break;
    }

    try {
      process.stdout.write("Agent is thinking\n");
      // runAsync returns an async generator for streaming
      const events = runner.runAsync({
        userId: session.userId,
        sessionId: session.id,
        newMessage: {
          role: "user",
          parts: [{ text: userInput }],
        },
      });
      for await (const event of events) {
        if (event.author === "simple_ai_agent" && event.content?.parts) {
          for (const part of event.content.parts) {
            if (part.text) {
              process.stdout.write(`Agent: ${part.text}`);
            }
          }
        }
      }
      console.log("\n");
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

runAgent()
