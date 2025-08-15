export default function QuoteCard({ quote }) {
  if (!quote) return null;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
      <p className="text-xl italic">“{quote.text}”</p>
      <p className="mt-4 text-right text-sm text-gray-600">— {quote.author}</p>
    </div>
  );
}
