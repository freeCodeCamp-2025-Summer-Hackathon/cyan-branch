import { useEffect, useState } from "react";

export function useFetchSubmissions(params) {
  const [box, setBox] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        setLoading(true);
        setError(null);

        const { boxId } = await params;

        const boxRes = await fetch(`/api/boxes/${boxId}`);
        if (!boxRes.ok) {
          throw new Error(`Failed to fetch box: ${boxRes.status}`);
        }
        const boxData = await boxRes.json();
        setBox(boxData);

        const submissionRes = await fetch(`/api/submissions/${boxId}`);
        if (!submissionRes.ok) {
          throw new Error(`Failed to fetch submissions: ${submissionRes.status}`);
        }
        const submissionData = await submissionRes.json();
        setSubmissions(submissionData);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, [params]);

  return { box, submissions, loading, error };
}
