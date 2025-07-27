import { useState, useEffect } from 'react';
import MarketPriceList from '../../components/market/MarketPriceList';
import MarketChart from '../../components/market/MarketChart';
import marketPriceApi from '../../api/marketPriceApi';

const MarketPricesPage = () => {
  const [showChart, setShowChart] = useState(false);
  const [latestPrices, setLatestPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestPrices = async () => {
      if (!showChart) return; // Only fetch when chart is needed
      
      try {
        setLoading(true);
        setError(null);
        const data = await marketPriceApi.getLatestMarketPrices(10);
        setLatestPrices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching latest prices:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPrices();
  }, [showChart]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Market Data</h1>
        <button
          onClick={() => setShowChart(!showChart)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {showChart ? 'Show Table' : 'Show Chart'}
        </button>
      </div>

      {showChart ? (
        <div>
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-2">Loading chart data...</span>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              Error loading chart: {error}
            </div>
          )}
          {!loading && !error && <MarketChart data={latestPrices} />}
        </div>
      ) : (
        <MarketPriceList />
      )}
    </div>
  );
};

export default MarketPricesPage;