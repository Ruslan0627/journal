import { useState, useEffect } from "react";

export function useLocalStorage(key) {
	const [data, setData] = useState([]);
	useEffect(() => {
		const items = JSON.parse(localStorage.getItem(key));
		if (items) {
			setData(
				items.map(i => ({
					...i,
					date: new Date(i.date),
				})));
		}
	}, [key]);

	const saveData = newData => {
    if (newData.id) {
      setData( prev => [...prev, newData] )
      localStorage.setItem(key, JSON.stringify([...data,newData]))
    }
  };
	return [key, saveData];
}
