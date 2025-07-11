import React, { useEffect, useState } from 'react';
import api from '../api/axios';

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  source: string;
  category: string;
  published_at: string;
}

const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(false);

  const [sources, setSources] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch sources and categories for dropdown filters
  useEffect(() => {
    api.get('/filters')
      .then(res => {
        setSources(res.data.sources);
        setCategories(res.data.categories);
      })
      .catch(() => alert('Failed to load filters'));
  }, []);

  // Fetch filtered articles from backend
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await api.get('/news', {
        params: {
          search,
          source,
          category,
          date_from: dateFrom,
          date_to: dateTo,
        },
      });
      setArticles(res.data);
    } catch (err) {
      alert('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [search, source, category, dateFrom, dateTo]);

  const clearFilters = () => {
    setSearch('');
    setSource('');
    setCategory('');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">📰 News Feed</h2>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded"
        />

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Sources</option>
          {sources.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        Reset Filters
      </button>

      {/* News List */}
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        articles.map(article => (
          <div key={article.id} className="border rounded p-4 mb-4 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-800">{article.title}</h3>
            <p className="text-gray-700 mt-1">{article.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Source: {article.source} | Category: {article.category}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Published on: {new Date(article.published_at).toLocaleDateString()}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline inline-block mt-2"
            >
              Read more →
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsFeed;
