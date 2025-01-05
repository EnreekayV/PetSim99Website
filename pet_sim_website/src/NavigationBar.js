import React, { useState } from 'react';
import { Navbar, Form, FormControl, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavigationBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery);
    
        if (searchQuery.length > 0) {
            try {
                // Get from backend
                const response = await axios.get(`http://localhost:5000/api/search?query=${searchQuery}`);

                console.log(response.data);
                
                setSuggestions(response.data); 
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            // No suggestions
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (itemId) => {
        setQuery('');
        setSuggestions([]);
        navigate(`/item/${itemId}`);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Item Explorer</Navbar.Brand>
            <Form inline className="ml-auto">
                <FormControl
                    type="text"
                    placeholder="Search Item ID..."
                    className="mr-sm-2"
                    value={query}
                    onChange={handleSearch}
                />
                {suggestions.length > 0 && (
                    <ListGroup style={{ position: 'absolute', top: '40px', zIndex: 1000 }}>
                        {suggestions.map((item, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => handleSuggestionClick(item.id)}
                            >
                                {item.id} {}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Form>
        </Navbar>
    );
};

export default NavigationBar;
