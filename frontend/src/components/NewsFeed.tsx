import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import {
  FaNewspaper,
  FaFolderOpen,
  FaCalendarAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa';

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

  useEffect(() => {
    api.get('/filters')
      .then(res => {
        setSources(res.data.sources);
        setCategories(res.data.categories);
      })
      .catch(() => alert('Failed to load filters'));
  }, []);

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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          📰 News Feed
        </h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search keyword..."
          className="border p-2 rounded w-full"
        />

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">All Sources</option>
          {sources.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
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

      <div className="mb-4 text-right">
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset Filters
        </button>
      </div>

      {/* News Cards */}
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map(article => (
            <div
              key={article.id}
              className="border rounded-lg shadow hover:shadow-lg transition bg-white p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-md font-semibold text-blue-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="mt-3 text-xs text-gray-500 space-y-1">
                <p className="flex items-center gap-2">
                  <FaNewspaper className="text-blue-600" /> {article.source}
                </p>
                <p className="flex items-center gap-2">
                  <FaFolderOpen className="text-yellow-600" /> {article.category}
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-600" />{' '}
                  {new Date(article.published_at).toLocaleDateString()}
                </p>
              </div>

              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline text-sm mt-4"
              >
                Read full article <FaExternalLinkAlt size={12} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
