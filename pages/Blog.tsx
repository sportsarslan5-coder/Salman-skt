import React from 'react';
import { BLOG_POSTS } from '../constants';
import { useAppContext } from '../context/AppContext';

const Blog: React.FC = () => {
  const { t } = useAppContext();
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-center">{t('blog')}</h1>
      <p className="text-gray-500 text-center mb-12">Fashion tips, trends, and stories from Sialkot.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map(post => (
          <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer">
            <div className="h-64 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
                <div className="text-accent text-sm font-bold mb-2">{post.date}</div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{post.title}</h2>
                <p className="text-gray-600 leading-relaxed">{post.summary}</p>
                <button className="mt-4 text-black font-bold underline hover:text-accent">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;