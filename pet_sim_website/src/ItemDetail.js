import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetail = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                const itemData = response.data.find(item => item.id === itemId);
                setItem(itemData);
            } catch (error) {
                console.error('Error fetching item details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [itemId]);

    if (loading) {
        return <p>Loading item details...</p>;
    }

    if (!item) {
        return <p>Item not found!</p>;
    }

    return (
        <div className="container mt-4">
            <h1>Item Details</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Category:</strong> {item.pet}</p>
            <p><strong>Rarity:</strong> {item.rarity}</p>
            <p><strong>Value:</strong> {item.value.toLocaleString()}</p>
            <p><strong>Shiny:</strong> {item.isShiny ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default ItemDetail;
