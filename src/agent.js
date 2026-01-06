"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const adk_1 = require("@google/adk");
const readline = __importStar(require("node:readline/promises")); // Built-in for terminal input
const node_process_1 = require("node:process");
// 👇 Suppress ADK debug logs
process.env.ADK_LOG_LEVEL = "error";
const APP_NAME = "simple_ai_agent";
async function runAgent() {
    dotenv.config();
    // 1. Initialize the terminal interface
    const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
    // 2. Define the agent
    const simpleAiAgent = new adk_1.LlmAgent({
        name: APP_NAME,
        model: "gemini-2.5-flash",
        description: "A simple assistant with search capabilities.",
        instruction: "You are a helpful assistant. Use Google Search for current info.",
        tools: [adk_1.GOOGLE_SEARCH],
    });
    const runner = new adk_1.InMemoryRunner({
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
        if (userInput.toLowerCase() === "exit" ||
            userInput.toLowerCase() === "quit") {
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
        }
        catch (error) {
            console.error("Error:", error);
        }
    }
}
runAgent();
