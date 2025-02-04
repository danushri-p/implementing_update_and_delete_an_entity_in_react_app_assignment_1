import UpdateItem from "./components/UpdateItem";
import { useState } from "react";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  
  const [itemId, setItemId] = useState('1');
  return (
    <div>
      <UpdateItem itemId={itemId} />
    </div>
  )

}

export default App;