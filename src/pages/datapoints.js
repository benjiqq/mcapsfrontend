// Data points configuration for the dashboard widget
// Each entry represents a single data source for a cryptocurrency
export const datapoints = [
  // CoinGecko sources
  {
    id: 'btc-coingecko',
    name: 'Bitcoin',
    symbol: 'BTC',
    source: 'CoinGecko',
    sourceKey: 'coingecko',
    coinId: 'bitcoin'
  },
  {
    id: 'eth-coingecko',
    name: 'Ethereum',
    symbol: 'ETH',
    source: 'CoinGecko',
    sourceKey: 'coingecko',
    coinId: 'ethereum'
  },
  //   {
  //     id: 'xrp-coingecko',
  //     name: 'XRP',
  //     symbol: 'XRP',
  //     source: 'CoinGecko',
  //     sourceKey: 'coingecko',
  //     coinId: 'xrp'
  //   },
  {
    id: 'sol-coingecko',
    name: 'Solana',
    symbol: 'SOL',
    source: 'CoinGecko',
    sourceKey: 'coingecko',
    coinId: 'solana'
  },
  // CoinStats sources
  {
    id: 'btc-coinstats',
    name: 'Bitcoin',
    symbol: 'BTC',
    source: 'CoinStats',
    sourceKey: 'coinstats',
    coinId: 'bitcoin'
  },
  {
    id: 'eth-coinstats',
    name: 'Ethereum',
    symbol: 'ETH',
    source: 'CoinStats',
    sourceKey: 'coinstats',
    coinId: 'ethereum'
  },
  //   {
  //     id: 'xrp-coinstats',
  //     name: 'XRP',
  //     symbol: 'XRP',
  //     source: 'CoinStats',
  //     sourceKey: 'coinstats',
  //     coinId: 'xrp'
  //   },
  {
    id: 'sol-coinstats',
    name: 'Solana',
    symbol: 'SOL',
    source: 'CoinStats',
    sourceKey: 'coinstats',
    coinId: 'solana'
  }
]


