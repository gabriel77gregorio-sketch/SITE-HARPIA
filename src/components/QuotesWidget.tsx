import React, { useState, useEffect } from 'react';

// Interfaces for our data
interface QuoteData {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  shortName: string;
}

export default function QuotesWidget() {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        // Tickers: Boi Gordo (BGI1!), Milho (CCM1!), Café Arábica (ICF1!)
        // In reality you would use your own endpoint /api/quotes to hide the Brapi token
        // For this demo, assuming a proxy or a free tier that works without token or with token in backend
        const response = await fetch('/api/quotes');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar cotações');
        }

        const data = await response.json();
        setQuotes(data.results || []);
      } catch (err: any) {
        setError(err.message || 'Falha na comunicação.');
        // Mock data fallback so the user sees the design
        setQuotes([
           { symbol: 'BGI1!', regularMarketPrice: 245.50, regularMarketChangePercent: 1.2, shortName: 'Boi Gordo' },
           { symbol: 'CCM1!', regularMarketPrice: 58.20, regularMarketChangePercent: -0.5, shortName: 'Milho' },
           { symbol: 'ICF1!', regularMarketPrice: 220.10, regularMarketChangePercent: 0.8, shortName: 'Café Arábica' },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {quotes.map((quote) => {
        const isPositive = quote.regularMarketChangePercent >= 0;
        return (
          <div key={quote.symbol} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               {/* Decorative Element */}
               <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-harpia-green"><path d="M16 2L21 7V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H16ZM15 4H5V20H19V8H15V4ZM11 11.4142L14.2929 8.12132L15.7071 9.53553L11 14.2426L8.29289 11.5355L6.87868 12.9497L11 17.0711L11 11.4142Z"></path></svg>
            </div>
            
            <p className="text-sm text-gray-500 font-inter font-medium mb-1">{quote.shortName || quote.symbol}</p>
            <h3 className="text-3xl font-outfit font-bold text-harpia-dark mb-2">
              R$ {quote.regularMarketPrice?.toFixed(2).replace('.', ',')}
            </h3>
            
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isPositive ? (
                <svg className="-ml-0.5 mr-1.5 h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="-ml-0.5 mr-1.5 h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              {Math.abs(quote.regularMarketChangePercent || 0).toFixed(2)}%
            </div>
            
            <p className="mt-4 text-xs text-gray-400 font-inter">Ticker: {quote.symbol} (B3)</p>
          </div>
        );
      })}
    </div>
  );
}
