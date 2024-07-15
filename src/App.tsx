import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  price_change_percentage_90d: number;
}

const EXCLUDED_COINS = ['tether', 'dai', 'usd-coin', 'wrapped-bitcoin', 'staked-ether'];

const App: React.FC = () => {
  const [isAltcoinSeason, setIsAltcoinSeason] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          '/api/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: false,
              price_change_percentage: '90d'
            }
          }
        );

        const filteredCoins = response.data.filter(
          (coin: Coin) => !EXCLUDED_COINS.includes(coin.id)
        ).slice(0, 50);

        const bitcoinPerformance = filteredCoins.find(
          (coin: Coin) => coin.id === 'bitcoin'
        )?.price_change_percentage_90d || 0;

        const outperformingAltcoins = filteredCoins.filter(
          (coin: Coin) =>
            coin.id !== 'bitcoin' &&
            coin.price_change_percentage_90d > bitcoinPerformance
        );

        setIsAltcoinSeason(outperformingAltcoins.length >= 37); // 75% of 50 is 37.5
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Crypto Season Checker</h1>
      {isAltcoinSeason !== null && (
        <h2>
          It's currently {isAltcoinSeason ? 'Altcoin' : 'Bitcoin'} Season!
        </h2>
      )}
      <p>
        Based on the performance of the top 50 coins (excluding stablecoins and
        asset-backed tokens) over the last 90 days.
      </p>
    </div>
  );
};

export default App;