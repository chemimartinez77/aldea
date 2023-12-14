// pages/api/search.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseString } from 'xml2js';

async function fetchGameDetails(gameId) {
    const detailsUrl = `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}`;
    const response = await fetch(detailsUrl);
    const xml = await response.text();
  
    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const gameDetails = result.items.item[0];
          const imageUrl = gameDetails && gameDetails.image ? gameDetails.image[0] : '';
          resolve(imageUrl);
        }
      });
    });
  }



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;
    const bggUrl = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame`;

    try {
        const bggResponse = await fetch(bggUrl);
        const bggData = await bggResponse.text();
        const parseXml = (xml) => new Promise((resolve, reject) => {
            parseString(xml, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    
        const result = await parseXml(bggData);
        const games = result.items.item;
        const detailedGames = await Promise.all(games.map(async (game) => {
          const imageUrl = await fetchGameDetails(game.$.id);
          return {
            id: game.$.id,
            name: game.name[0].$.value,
            yearPublished: game.yearpublished ? game.yearpublished[0].$.value : 'N/A',
            imageUrl: imageUrl
          };
        }));
    
        res.status(200).json({ items: detailedGames });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
}

