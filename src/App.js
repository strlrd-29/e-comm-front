import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getItems } from "./redux/actions/itemsActions";
import { getTypes } from "./redux/actions/typesActions";
import { deleteStore, getStores } from "./redux/actions/storesActions";

import { useSelector } from "react-redux";

//fuse js
import Fuse from "fuse.js";

function App() {
  const [query, updateQuery] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStores());
    dispatch(getTypes());
    dispatch(getItems());
  }, [dispatch]);
  const { items } = useSelector((state) => state);
  const fuse = new Fuse(items, {
    keys: ["title", "type"],
    includeScore: true,
    shouldSort: true,
    findAllMatches: false,
  });

  const result = fuse.search(query);

  const handleClick = () => {
    dispatch(deleteStore("gmFzhnIUc9fDg6CQ4W2q"));
  };
  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
      />
      {result.map((item) => (
        <h1 key={item.item.itemId}>{item.item.type}</h1>
      ))}
      <button onClick={handleClick}> get user data </button>
    </div>
  );
}

export default App;
