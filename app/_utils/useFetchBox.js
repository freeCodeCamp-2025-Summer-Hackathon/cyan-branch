import { useEffect, useState } from "react";

function useFetchBox(status, id) {
  const [box, setBox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBox() {
      try {
        setLoading(true);
        setError(null);

        const boxRes = await fetch(`/api/boxes/${id}`);
        if (!boxRes.ok) {
          throw new Error(`Failed to fetch box: ${boxRes.status}`);
        }

        const boxData = await boxRes.json();
        setBox(boxData);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    if (status !== "loading") {
      fetchBox();
    }
  }, [id, status]);

  return { box, loading, error };
}

export default useFetchBox;
