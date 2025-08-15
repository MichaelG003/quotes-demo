import React, { useState } from "react";
import QuoteCard from "./Components/QuoteCard";
import Feedback from "./Components/Feedback";

const BASE_URL =
  import.meta.env.VITE_QUOTES_API_URL ||
  "https://quotes-demo-c8frf4ctgrddc2cx.eastus-01.azurewebsites.net/api/quotes";

export default function App() {
  const [quote, setQuote] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchQuote = async () => {
    setMsg("⏳ Cargando...");
    setQuote(null);
    try {
      const res = await fetch(`${BASE_URL}`, { method: "GET" });
      const data = await res.json();
      if (!res.ok) {
        setMsg(`❌ Error API: ${data.error || data.message || res.statusText}`);
        return;
      }
      setQuote(data);
      setMsg("");
    } catch (e) {
      console.error("fetchQuote error:", e);
      setMsg("⚠️ Error de red al obtener la frase.");
    }
  };

  const handleFeedback = (resp) => {
    if (resp?.ok) setMsg("✅ ¡Gracias por tu feedback!");
    else setMsg("⚠️ Error enviando feedback");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 font-sans p-6">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-lg text-center border border-white/30">
        <h1 className="text-white text-3xl font-bold mb-6 drop-shadow-lg">
          🌟 Random Quotes
        </h1>

        <button
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-md transition-all duration-200"
          onClick={fetchQuote}
        >
          Obtener frase
        </button>

        {msg && <p className="mt-4 text-white font-medium">{msg}</p>}

        <div className="mt-6">
          <QuoteCard quote={quote} />
        </div>

        {quote && (
          <div className="mt-4">
            <Feedback
              quoteId={quote.id}
              onSend={handleFeedback}
              baseUrl={BASE_URL}
            />
          </div>
        )}
      </div>
    </div>
  );
}
