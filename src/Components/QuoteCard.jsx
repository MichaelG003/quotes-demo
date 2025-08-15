export default function QuoteCard({ quote }) {
  if (!quote) return null;
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto transform transition duration-300 hover:scale-105">
      <p className="text-lg italic text-gray-700">“{quote.text}”</p>
      <p className="mt-4 text-right text-sm font-semibold text-indigo-500">
        — {quote.author}
      </p>
    </div>
  );
}
