export default function Feedback({ quoteId, onSend, baseUrl }) {
  const send = async (type) => {
    try {
      const endpoint = baseUrl ? `${baseUrl}/feedback` : "/api/quotes/feedback";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: quoteId, feedback: type }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.error("Feedback error", data);
        onSend && onSend({ ok: false, error: data.error || data });
      } else {
        onSend && onSend({ ok: true, data });
      }
    } catch (e) {
      console.error("Network error sending feedback:", e);
      onSend && onSend({ ok: false, error: "Network error" });
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      <button
        className="px-5 py-2 bg-green-400 hover:bg-green-500 text-white font-bold rounded-full shadow-md transition-all duration-200"
        onClick={() => send("like")}
      >
        👍 Me gusta
      </button>
      <button
        className="px-5 py-2 bg-red-400 hover:bg-red-500 text-white font-bold rounded-full shadow-md transition-all duration-200"
        onClick={() => send("meh")}
      >
        😐 Meh
      </button>
    </div>
  );
}
