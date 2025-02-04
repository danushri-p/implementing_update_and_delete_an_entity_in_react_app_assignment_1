import { useState, useEffect } from "react";
import axios from "axios";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [updatedData, setUpdatedData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the existing item
    axios
      .get(`${API_URI}/${itemId}`)
      .then((res) => {
        setItem(res.data);
        setUpdatedData(res.data.name); // Set the name as the initial value
      })
      .catch((err) => {
        setError("Error fetching item data");
        console.error(err);
      });
  }, [itemId]);

  const handleChange = (e) => {
    setUpdatedData(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Ensure data isn't empty
    if (!updatedData.trim()) {
      setError("Name cannot be empty");
      return;
    }

    // Make the PUT request to update the item
    try {
      const response = await axios.put(`${API_URI}/${itemId}`, { name: updatedData });
      setItem(response.data);
      setError(""); // Reset any previous errors
      console.log("Item updated successfully");
    } catch (err) {
      setError("Error updating item");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Update Item</h1>

      {error && <p className="error-message text-red-500">{error}</p>}

      {item ? (
        <div>
          <p>Current name: {item.name}</p>
          <input
            type="text"
            value={updatedData}
            onChange={handleChange}
            className="input-field"
          />
          <button onClick={handleUpdate} className="update-button">Update</button>
        </div>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );
};

export default UpdateItem;
