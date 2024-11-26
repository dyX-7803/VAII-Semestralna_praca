import React, {useState, useEffect} from "react";
import axios from 'axios';

const Item = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/polozka');
                setItems(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch items');
            }
        };
        fetchItems(); 
    }, []);

    if (error) return <p>{error}</p>
    if (!items.length) return <p>Loading...</p>

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>
                    <h2>
                        {item.nazov}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default Item;