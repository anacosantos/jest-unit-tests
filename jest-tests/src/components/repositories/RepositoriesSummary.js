import { StarIcon } from '@primer/octicons-react';

function RepositoriesSummary({ repository }) {
  const { language, stargazers_count, open_issues, forks } = repository;
  
  return (
    <div className="flex flex-row gap-4 text-gray-700">
      <div>{language}</div>
      <div>
        <StarIcon aria-label="stars" size={16} /> {stargazers_count}
      </div>
      <div>{open_issues} issues need help</div>
      <div>{forks} Forks</div>
    </div>
  );
}

export default RepositoriesSummary;
