import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const PetTable = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="container mt-4">
            <h1>Pet Data</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>ID</th>
                        <th>Value</th>
                        <th>Shiny?</th>
                        <th>Rarity</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.pet}</td>
                            <td>{item.id}</td>
                            <td>{item.value.toLocaleString()}</td>
                            <td>{item.isShiny ? 'Yes' : 'No'}</td>
                            <td>{item.rarity.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PetTable;
