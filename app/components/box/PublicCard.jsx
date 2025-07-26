export default function PublicCard({ submission }) {
  return (
    <li>
      <h3>{submission.message}</h3>
      <p>{submission.response}</p>
    </li>
  );
}
