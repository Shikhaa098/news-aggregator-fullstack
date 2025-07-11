import React, { useEffect, useState } from 'react';
import API from '../api';

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    API.get('/news')
      .then((res) => setArticles(res.data.news))
      .catch(() => alert('Failed to fetch news'));
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      {articles.map((article) => (
        <div key={article.id} style={{ border: '1px solid #ccc', margin: '8px', padding: '8px' }}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default Articles;
