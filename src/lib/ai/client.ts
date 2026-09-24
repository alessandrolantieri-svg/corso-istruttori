import Anthropic from "@anthropic-ai/sdk";

// Wrapper generico attorno al modello — usato da più agenti (Tutor, Feedback, e chi verrà dopo).
// Non sa nulla del dominio: system prompt e cronologia arrivano da chi chiama.

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export class AiNotConfiguredError extends Error {
  constructor() {
    super("ANTHROPIC_API_KEY non impostata.");
    this.name = "AiNotConfiguredError";
  }
}

let client: Anthropic | null | undefined;

function getClient(): Anthropic | null {
  if (client !== undefined) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  client = apiKey ? new Anthropic({ apiKey }) : null;
  return client;
}

// Nessun contenuto finto se la chiave manca: chi chiama deve gestire esplicitamente
// AiNotConfiguredError, non ricevere una risposta inventata al posto di una vera.
export async function askClaude(systemPrompt: string, history: ChatTurn[]): Promise<string> {
  const anthropic = getClient();
  if (!anthropic) throw new AiNotConfiguredError();

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: systemPrompt,
    messages: history.map((turn) => ({ role: turn.role, content: turn.content })),
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text ?? "";
}
