// useApi.js
import React, { useEffect, useState } from 'react';

export const useApi = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const resp = await fetch('https://themealdb.com/api/json/v1/1/categories.php');
      const api = await response.json();
      setData(api);
      console.log(api);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return [isLoading, data];
};
