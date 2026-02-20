import React from 'react';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  accessibility: number;
  safety: number;
  inclusivity: number;
  reviewCount: number;
}

const CollegeCard = ({ college }: { college: College }) => {
  const slug = college.name.replace(/\s+/g, '-').toLowerCase();

  return (
    <li>
      <article 
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
        aria-labelledby={`name-${college.id}`}
      >
        {/* Top section using the theme's primary color */}
        <div 
          className="h-16 w-full bg-primary" 
          role="presentation"
          aria-hidden="true"
        />

        <div className="flex flex-1 flex-col p-5">
          <header>
            <h3 
              id={`name-${college.id}`}
              className="text-xl font-bold tracking-tight text-gray-900"
            >
              {college.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              <span className="sr-only">Location: </span>
              {college.city}, {college.state}
            </p>
          </header>

          <hr className="my-5 border-gray-100" aria-hidden="true" />

          {/* Semantic Description List for Ratings */}
          <dl className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col">
              <dt className="order-2 text-xs font-medium uppercase tracking-wide text-gray-500">Access</dt>
              <dd className="order-1 text-2xl font-bold text-primary">{college.accessibility}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="order-2 text-xs font-medium uppercase tracking-wide text-gray-500">Safety</dt>
              <dd className="order-1 text-2xl font-bold text-primary">{college.safety}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="order-2 text-xs font-medium uppercase tracking-wide text-gray-500">Incl.</dt>
              <dd className="order-1 text-2xl font-bold text-primary">{college.inclusivity}</dd>
            </div>
          </dl>

          <footer className="mt-auto pt-6">
            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
              <p className="text-sm font-medium text-gray-700">
                <span className="sr-only">Total reviews: </span>
                {college.reviewCount} {college.reviewCount === 1 ? 'review' : 'reviews'}
              </p>
              <a 
                href={`/colleges/${slug}`}
                className="inline-flex items-center text-sm font-bold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                View Details
                <span className="sr-only"> for {college.name}</span>
                <span className="ml-1" aria-hidden="true">→</span>
              </a>
            </div>
          </footer>
        </div>
      </article>
    </li>
  );
};

// The Grid Wrapper
export const CollegeGrid = ({ colleges }: { colleges: College[] }) => {
  return (
    <section aria-label="College search results">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </ul>
    </section>
  );
};

export default CollegeCard;