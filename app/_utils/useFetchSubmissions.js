import { useEffect, useState } from "react";

function useFetchSubmissions(status, id) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        setLoading(true);
        setError(null);

        const boxRes = await fetch(`/api/submissions/${id}`);
        if (!boxRes.ok) {
          throw new Error(`Failed to fetch box: ${boxRes.status}`);
        }

        const boxData = await boxRes.json();
        setSubmissions(boxData);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    if (status !== "loading") {
      fetchSubmissions();
    }
  }, [id, status]);

  return { submissions, loading, error };
}

export default useFetchSubmissions;
