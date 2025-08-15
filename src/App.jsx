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
    setMsg("Cargando...");
    setQuote(null);
    try {
      const res = await fetch(`${BASE_URL}`, { method: "GET" });
      const data = await res.json();
      if (!res.ok) {
        // manejar error devuelto por la Function
        setMsg(`Error API: ${data.error || data.message || res.statusText}`);
        return;
      }
      setQuote(data);
      setMsg("");
    } catch (e) {
      console.error("fetchQuote error:", e);
      setMsg("Error de red al obtener la frase.");
    }
  };

  const handleFeedback = (resp) => {
    if (resp?.ok) setMsg("Gracias por tu feedback");
    else setMsg("Error enviando feedback");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-400 to-indigo-500">
      <div className="text-center">
        <h1 className="text-white text-2xl mb-6 font-bold">Random Quotes</h1>
        <div className="mb-4">
          <button className="btn" onClick={fetchQuote}>
            Obtener frase
          </button>
        </div>
        {msg && <p className="text-white mb-4">{msg}</p>}
        <QuoteCard quote={quote} />
        {quote && (
          <Feedback
            quoteId={quote.id}
            onSend={handleFeedback}
            baseUrl={BASE_URL}
          />
        )}
      </div>
    </div>
  );
}
