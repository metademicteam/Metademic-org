"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Msg = { role: "user" | "assistant"; content: string };

const API_BASE = process.env.NEXT_PUBLIC_RACOON_API_BASE ?? "https://metademic.tail6cb521.ts.net/v1";
const API_KEY = process.env.NEXT_PUBLIC_RACOON_API_KEY ?? "";
const MODEL = process.env.NEXT_PUBLIC_RACOON_MODEL ?? "qwen3.5:4b-q4_K_M";

export default function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    if (!prompt.trim() || loading) return;
    const q = prompt.trim();
    setPrompt("");
    setMsgs((m) => [...m, { role: "user", content: q }]);
    setLoading(true);
    setStreaming(true);

    try {
      const response = await fetch(`${API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            ...msgs.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: q },
          ],
          stream: true,
        }),
      });

      if (!response.ok) {
        setMsgs((m) => [...m, { role: "assistant", content: `⚠️ Request failed: ${response.status}` }]);
        setLoading(false);
        setStreaming(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setMsgs((m) => [...m, { role: "assistant", content: "⚠️ No response body" }]);
        setLoading(false);
        setStreaming(false);
        return;
      }

      const decoder = new TextDecoder();
      let accumulated = "";
      setMsgs((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                accumulated += delta;
                setMsgs((m) => [
                  ...m.slice(0, -1),
                  { role: "assistant", content: accumulated },
                ]);
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: `⚠️ Error: ${String((err as Error)?.message || err)}` },
      ]);
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-76px)] bg-[#FFFDEC]">
      {/* Sidebar */}
      <aside className="hidden w-[260px] shrink-0 flex-col border-r border-[var(--hairline)] bg-[var(--panel-2)]/60 md:flex">
        <div className="flex items-center justify-between p-4">
          <span className="text-xs font-bold tracking-widest text-[var(--muted)] uppercase">RACoN</span>
          <button
            onClick={() => setMsgs([])}
            className="bg-[var(--accent)] px-3 py-1.5 text-xs font-bold text-[#FFFDEC] hover:bg-[var(--accent-2)]"
          >
            New chat
          </button>
        </div>
        <div className="flex-1 overflow-auto px-4 pb-4">
          <div className="border border-[var(--hairline)] bg-[var(--panel)] p-4">
            <div className="text-xs font-semibold text-[var(--foreground)]">About RACoN</div>
            <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
              RACoN (Reciprocal Agentic Compute Network) is a hybrid P2P LLM inference system. Your prompts
              are routed to the best available GPU peer in the mesh.
            </p>
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--hairline)] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-[var(--foreground)]">RACoN Chat</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto py-6">
          {msgs.length === 0 && (
            <div className="mx-auto max-w-2xl border border-dashed border-[var(--hairline)] bg-[var(--panel-2)] p-8 text-center">
              <div className="text-sm font-semibold text-[var(--foreground)]">
                Welcome to RACoN Chat
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                A distributed LLM inference system powered by peer-to-peer GPU sharing.
              </p>
            </div>
          )}
          <div className="mx-auto grid max-w-3xl gap-6 px-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "ml-auto max-w-[80%]" : "max-w-[85%]"}>
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      m.role === "user" ? "text-[var(--muted)]" : "text-[var(--accent)]"
                    }`}
                  >
                    {m.role === "user" ? "You" : "RACoN"}
                  </span>
                  {m.role === "assistant" && streaming && i === msgs.length - 1 && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                  )}
                </div>
                <div
                  className={
                    m.role === "user"
                      ? "bg-[var(--accent)] px-4 py-3 text-sm leading-6 text-[#FFFDEC]"
                      : "border border-[var(--hairline)] bg-[var(--panel)] px-4 py-3 text-sm leading-6 text-[var(--foreground)]"
                  }
                >
                  {m.role === "user" ? (
                    <div>{m.content}</div>
                  ) : m.content ? (
                    <div className="md-content">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <span className="text-[var(--muted)]">Generating…</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={send}
          className="mx-auto flex w-full max-w-3xl gap-2 border-t border-[var(--hairline)] p-4"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask RACoN…"
            rows={1}
            className="flex-1 resize-none border border-[var(--hairline)] bg-[var(--panel)] px-5 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
          />
          <button
            disabled={loading || !prompt.trim()}
            className="h-11 bg-[var(--accent)] px-6 text-sm font-bold text-[#FFFDEC] hover:bg-[var(--accent-2)] disabled:opacity-50"
          >
            {loading ? "…" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
