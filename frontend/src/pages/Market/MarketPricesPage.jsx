import { useState } from 'react';
import MarketPriceList from '../../components/market/MarketPriceList';
import MarketChart from '../../components/market/MarketChart';
import marketPriceApi from '../../api/marketPriceApi';
import { useFetch } from '../../hooks/useFetch';

const MarketPricesPage = () => {
  const [showChart, setShowChart] = useState(false);
  const { data: latestPrices } = useFetch(() => marketPriceApi.getLatestMarketPrices(10));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Market Data</h1>
        <button
          onClick={() => setShowChart(!showChart)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          {showChart ? 'Show Table' : 'Show Chart'}
        </button>
      </div>

      {showChart ? (
        <MarketChart data={latestPrices || []} />
      ) : (
        <MarketPriceList />
      )}
    </div>
  );
};

export default MarketPricesPage;