import { useState, useEffect } from "react";

const UpdateItem = ({ item }) => {
    // Initialize state with item's current values
    const [name, setName] = useState(item?.name || "");
    const [status, setStatus] = useState(item?.status || "");

    // Update state when item changes
    useEffect(() => {
        setName(item?.name || "");
        setStatus(item?.status || "");
    }, [item]);

    const handleSubmit = async () => {
        if (!item?.id) {
            console.error("No item selected for update");
            return;
        }

        try {
            const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, status }),
            });

            if (!response.ok) {
                throw new Error(`Update failed: ${response.status}`);
            }

            console.log("Update successful!");
            alert("Item updated successfully!"); // Optional feedback to user
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <div>
            <h3>Update Item</h3>
            <input 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                placeholder="Status" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
            />
            <button onClick={handleSubmit}>Update</button>
        </div>
    );
};

export default UpdateItem;
