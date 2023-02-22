import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    try {
      const values = await axios.get("/api/values/current");
      setValues(values.data);
    } catch (error) {
      console.log(
        "%c fetchValues error.message ",
        "background: #444; color: #bada55; padding: 2px; border-radius:3px",
        error.message
      );
    }
  };

  const fetchIndexes = async () => {
    try {
      const seenIndexes = await axios.get("/api/values/all");
      setSeenIndexes(seenIndexes.data);
    } catch (error) {
      console.log(
        "%c fetchIndexes error.message ",
        "background: #444; color: #bada55; padding: 2px; border-radius:3px",
        error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/values", {
        index,
      });

      setIndex("");
    } catch (error) {
      console.log(
        "%c handleSubmit error.message ",
        "background: #444; color: #bada55; padding: 2px; border-radius:3px",
        error.message
      );
    }
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="index">Enter your index:</label>
        <input
          type="text"
          value={index}
          name="index"
          id="index"
          onChange={(e) => setIndex(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated value</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
