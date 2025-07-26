import { useEffect, useState } from "react";

export function useFetchBox(params, session, status) {
  const [box, setBox] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBox() {
      try {
        setLoading(true);
        setError(null);

        const { boxId } = await params;

        // Fetch box data
        const boxRes = await fetch(`/api/boxes/${boxId}`);
        if (!boxRes.ok) {
          throw new Error(`Failed to fetch box: ${boxRes.status}`);
        }

        const boxData = await boxRes.json();
        setBox(boxData);

        // Only fetch user-specific data if authenticated
        if (session?.user?.id) {
          // Fetch submissions
          const submissionsRes = await fetch(`/api/submissions/${boxId}`);
          if (submissionsRes.ok) {
            const submissionsData = await submissionsRes.json();
            setSubmissions(submissionsData);
          }

          // Fetch links for this box
          const linksRes = await fetch(`/api/links/${boxId}`);
          if (linksRes.ok) {
            const linksData = await linksRes.json();
            setLinks(linksData);
          }
        }
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
  }, [params, session?.user?.id, status]);

  return { box, submissions, links, loading, error };
}
