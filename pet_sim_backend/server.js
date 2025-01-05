const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const processItem = (item) => {
    let id = item.configData.id;

    if (item.configData.sh) {
        id = `Shiny ${id}`;
    }

    if (item.configData.pt === 1) {
        id = `Golden ${id}`;
    } else if (item.configData.pt === 2) {
        id = `Rainbow ${id}`;
    }

    return {
        pet: item.category,
        id: id,
        rarity: item.configData.pt || 0,
        isShiny: item.configData.sh || false,
        value: item.value,
    };
};

app.get('/api/items', async (req, res) => {
    try {
        const response = await axios.get('https://ps99.biggamesapi.io/api/rap');
        const data = response.data.data;

        const items = data.map(processItem);

        res.json(items);
    } catch (error) {
        console.error('Error fetching API data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/api/search', async (req, res) => {
    const query = req.query.query?.toLowerCase() || '';

    try {
        const response = await axios.get('https://ps99.biggamesapi.io/api/rap');
        const data = response.data.data;

        const processedItems = data.map(processItem);

        // Filter items
        const filteredItems = processedItems.filter(item =>
            item.id.toLowerCase().includes(query)
        );

        // Limit to the first 5 results
        const limitedItems = filteredItems.slice(0, 5);

        res.json(limitedItems);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
