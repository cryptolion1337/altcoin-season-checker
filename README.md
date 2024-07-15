# Altcoin Season Checker

This web application checks whether it's currently Altcoin Season or Bitcoin Season based on the performance of the top 50 cryptocurrencies over the last 90 days.

## How it works

- Fetches data from the CoinGecko API
- Compares the performance of the top 50 cryptocurrencies (excluding stablecoins and asset-backed tokens) to Bitcoin
- If 75% or more of the top 50 coins performed better than Bitcoin, it's considered Altcoin Season

## Technologies used

- React
- TypeScript
- Cloudflare Pages
- CoinGecko API

## Deployment

This application is deployed on Cloudflare Pages and automatically updates when changes are pushed to the main branch of the GitHub repository.