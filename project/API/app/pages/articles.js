
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function ArticlesPage({ articles }) {
  return (
    <Layout>
      <div>
        <h1>Articles</h1>

        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <p className="wt-title">
                <Link href={`/articles/${article.id}`}>Title: {article.title}</Link>
              </p>
              <p>Author: {article.author}</p>
              <p>Date: {article.date}</p>
              <p>Content: {article.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  
  const articles = require('../lib/articlesList'); 

  return {
    props: {
      articles,
    },
  }}