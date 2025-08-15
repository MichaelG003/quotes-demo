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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 font-sans p-6 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full animate-gradient bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 opacity-60"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>
      {/* Card principal */}
      <div className="relative z-10 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg text-center border border-white/40 transition-all duration-300 hover:scale-[1.02]">
        <h1 className="text-white text-4xl font-extrabold mb-8 drop-shadow-lg flex items-center justify-center gap-2">
          <span role="img" aria-label="star">
            🌟
          </span>
          <span className="tracking-tight">Random Quotes</span>
        </h1>

        <button
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-full shadow-lg transition-all duration-200 text-lg mb-2 flex items-center gap-2 mx-auto"
          onClick={fetchQuote}
        >
          <span role="img" aria-label="refresh">
            🔄
          </span>
          Obtener frase
        </button>

        {msg && (
          <p className="mt-4 text-white font-semibold text-lg drop-shadow-sm animate-fade-in">
            {msg}
          </p>
        )}

        <div className="mt-8 transition-all duration-500 animate-fade-in">
          <QuoteCard quote={quote} />
        </div>

        {quote && (
          <div className="mt-6 animate-fade-in">
            <Feedback
              quoteId={quote.id}
              onSend={handleFeedback}
              baseUrl={BASE_URL}
            />
          </div>
        )}
      </div>
      {/* Animaciones personalizadas */}
      <style>
        {`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 8s ease-in-out infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </div>
  );
}
