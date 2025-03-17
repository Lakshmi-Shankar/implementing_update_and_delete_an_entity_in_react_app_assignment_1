import UpdateItem from "./components/UpdateItem";
import { useEffect, useState } from "react";
import './app.css';

// API Endpoint
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  // State to store all items
  const [items, setItems] = useState([]);
  
  // State to store the selected item for update
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data from API
  const getData = async () => {
    try {
      const response = await fetch(API_URI, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setItems(data);
    } catch {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(items);

  return (
    <>
      <div className="main">
        {items.map((data, index) => (
          <div key={index} className="dataBox" onClick={() => setSelectedItem(data)}>
            <h5>Name: {data.name}</h5>
            <p>Status: {data.status}</p>
            <button onClick={() => setSelectedItem(data)}>Edit</button>
          </div>
        ))}
      </div>
      
      {selectedItem && <UpdateItem item={selectedItem} refreshData={getData} />}
    </>
  );
}

export default App;
