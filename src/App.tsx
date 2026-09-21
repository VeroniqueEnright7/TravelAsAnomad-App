// @ts-nocheck
import React, { useState, useMemo } from 'react';

const EnhancedTravelApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [tripPlan, setTripPlan] = useState([]);
  const [showTripPlan, setShowTripPlan] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Alex Traveler');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const posts = [
    {
      id: 1,
      title: 'Cherry Blossoms in Tokyo',
      destination: 'Japan',
      date: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1522383507921-aa33f1a5d3f5?w=500&h=300&fit=crop',
      content: 'Experiencing the magical beauty of cherry blossoms in Tokyo during spring season.',
      tags: ['nature', 'photography', 'spring'],
      author: 'Sarah Chen',
      rating: 4.8,
      likes: 342
    },
    {
      id: 2,
      title: 'Hidden Beaches of Bali',
      destination: 'Indonesia',
      date: '2024-04-20',
      image: 'https://images.unsplash.com/photo-1537225228614-b4fad34c4b0d?w=500&h=300&fit=crop',
      content: 'Discover the secret beaches of Bali away from the tourist crowds.',
      tags: ['beach', 'adventure', 'relaxation'],
      author: 'Mike Johnson',
      rating: 4.6,
      likes: 289
    },
    {
      id: 3,
      title: 'Hiking Machu Picchu',
      destination: 'Peru',
      date: '2024-05-10',
      image: 'https://images.unsplash.com/photo-1587595431973-160b0d94add1?w=500&h=300&fit=crop',
      content: 'The ultimate adventure guide to hiking Machu Picchu and exploring the Inca Trail.',
      tags: ['hiking', 'adventure', 'history'],
      author: 'Emma Davis',
      rating: 4.9,
      likes: 512
    },
    {
      id: 4,
      title: 'Northern Lights in Iceland',
      destination: 'Iceland',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1504681869696-d977e3a826b9?w=500&h=300&fit=crop',
      content: 'Chase the magical northern lights across Iceland\'s winter skies.',
      tags: ['nature', 'photography', 'adventure'],
      author: 'James Wilson',
      rating: 4.7,
      likes: 428
    },
    {
      id: 5,
      title: 'Street Food Tour in Bangkok',
      destination: 'Thailand',
      date: '2024-06-12',
      image: 'https://images.unsplash.com/photo-1504674900967-1d01d8ae2a72?w=500&h=300&fit=crop',
      content: 'Explore the vibrant street food scene and local markets of Bangkok.',
      tags: ['food', 'culture', 'adventure'],
      author: 'Lisa Wong',
      rating: 4.5,
      likes: 267
    },
    {
      id: 6,
      title: 'Swiss Alps Cable Car Adventure',
      destination: 'Switzerland',
      date: '2024-07-03',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&h=300&fit=crop',
      content: 'Experience breathtaking views from Switzerland\'s highest cable cars.',
      tags: ['mountains', 'adventure', 'photography'],
      author: 'Thomas Mueller',
      rating: 4.8,
      likes: 385
    }
  ];

  const destinations = ['All', ...new Set(posts.map(post => post.destination))];
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesDestination = selectedDestination === 'All' || post.destination === selectedDestination;
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));
      return matchesDestination && matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedDestination, selectedTags]);

  const toggleFavorite = (postId) => {
    setFavorites(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const addComment = () => {
    if (newComment.trim() && selectedPost) {
      setComments(prev => ({
        ...prev,
        [selectedPost.id]: [...(prev[selectedPost.id] || []), { text: newComment, author: userName }]
      }));
      setNewComment('');
    }
  };

  const addToTripPlan = (post) => {
    if (!tripPlan.find(p => p.id === post.id)) {
      setTripPlan([...tripPlan, post]);
    }
  };

  const removeFromTripPlan = (postId) => {
    setTripPlan(tripPlan.filter(p => p.id !== postId));
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div style={{ backgroundColor: darkMode ? '#0f172a' : '#ffffff', color: darkMode ? '#e2e8f0' : '#1e293b', minHeight: '100vh', transition: 'all 0.3s ease' }}>
      {/* Header */}
      <header style={{ backgroundColor: darkMode ? '#1e293b' : '#f1f5f9', borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`, padding: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0 0 5px 0', fontSize: '28px', fontWeight: 'bold' }}>✈️ Travel AsaNomad</h1>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Explore the world through travel stories</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setShowTripPlan(!showTripPlan)}
              style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}
            >
              📅 Trip Plan ({tripPlan.length})
            </button>
            <button
              onClick={() => setUserLoggedIn(!userLoggedIn)}
              style={{ padding: '8px 16px', backgroundColor: userLoggedIn ? '#10b981' : '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}
            >
              {userLoggedIn ? '👤' : '🔐'}
              {userLoggedIn ? userName : 'Login'}
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Search and Filters */}
        <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: darkMode ? '#1e293b' : '#f8fafc', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: darkMode ? '#334155' : '#ffffff', borderRadius: '6px', padding: '8px 12px', border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}` }}>
              <span style={{ marginRight: '8px', fontSize: '18px' }}>🔍</span>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, border: 'none', background: 'none', color: darkMode ? '#e2e8f0' : '#1e293b', fontSize: '14px' }}
              />
            </div>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`, backgroundColor: darkMode ? '#334155' : '#ffffff', color: darkMode ? '#e2e8f0' : '#1e293b', cursor: 'pointer' }}
            >
              {destinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
            <button
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              style={{ padding: '8px 16px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              ⚙️ Filter
            </button>
          </div>

          {showAdvancedFilter && (
            <div style={{ padding: '15px', backgroundColor: darkMode ? '#334155' : '#ffffff', borderRadius: '6px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{ padding: '6px 12px', backgroundColor: selectedTags.includes(tag) ? '#3b82f6' : (darkMode ? '#475569' : '#e2e8f0'), color: selectedTags.includes(tag) ? 'white' : (darkMode ? '#e2e8f0' : '#1e293b'), border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {filteredPosts.map(post => (
            <div
              key={post.id}
              style={{ backgroundColor: darkMode ? '#1e293b' : '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'transform 0.2s', cursor: 'pointer' }}
              onClick={() => setSelectedPost(post)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' }}>{post.title}</h3>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '13px', opacity: 0.7 }}>
                      <span>📍 {post.destination}</span>
                      <span>📅 {post.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(post.id); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
                  >
                    {favorites.includes(post.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <p style={{ margin: '10px 0', fontSize: '13px', lineHeight: '1.5', opacity: 0.8 }}>{post.content}</p>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{ padding: '3px 8px', backgroundColor: darkMode ? '#334155' : '#f1f5f9', borderRadius: '12px', fontSize: '12px' }}>#{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, borderTop: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`, paddingTop: '10px' }}>
                  <span>⭐ {post.rating}</span>
                  <span>❤️ {post.likes}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToTripPlan(post); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    ➕ Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post Detail Modal */}
        {selectedPost && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: darkMode ? '#0f172a' : '#ffffff', borderRadius: '12px', padding: '30px', maxWidth: '600px', width: '90%', maxHeight: '80vh', overflow: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '24px', marginBottom: '10px' }}>{selectedPost.title}</h2>
                  <p style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>by {selectedPost.author}</p>
                </div>
                <button onClick={() => setSelectedPost(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}>✕</button>
              </div>
              <img src={selectedPost.image} alt={selectedPost.title} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
              <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>{selectedPost.content}</p>
              
              <div style={{ backgroundColor: darkMode ? '#1e293b' : '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                  <div><div style={{ fontSize: '20px', fontWeight: 'bold' }}>⭐ {selectedPost.rating}</div><div style={{ fontSize: '12px', opacity: 0.7 }}>Rating</div></div>
                  <div><div style={{ fontSize: '20px', fontWeight: 'bold' }}>❤️ {selectedPost.likes}</div><div style={{ fontSize: '12px', opacity: 0.7 }}>Likes</div></div>
                  <div><div style={{ fontSize: '20px', fontWeight: 'bold' }}>{comments[selectedPost.id]?.length || 0}</div><div style={{ fontSize: '12px', opacity: 0.7 }}>Comments</div></div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '10px' }}>Comments</h3>
                {comments[selectedPost.id]?.map((comment, idx) => (
                  <div key={idx} style={{ padding: '10px', backgroundColor: darkMode ? '#1e293b' : '#f8fafc', borderRadius: '6px', marginBottom: '8px', fontSize: '13px' }}>
                    <strong>{comment.author}</strong>: {comment.text}
                  </div>
                ))}
                {userLoggedIn && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addComment()}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`, backgroundColor: darkMode ? '#1e293b' : '#ffffff', color: darkMode ? '#e2e8f0' : '#1e293b' }}
                    />
                    <button onClick={addComment} style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Post</button>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => { toggleFavorite(selectedPost.id); }}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  ❤️ {favorites.includes(selectedPost.id) ? 'Unfavorite' : 'Favorite'}
                </button>
                <button
                  onClick={() => { addToTripPlan(selectedPost); setSelectedPost(null); }}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  ➕ Add to Trip
                </button>
                <button
                  style={{ flex: 1, padding: '10px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trip Plan Panel */}
        {showTripPlan && (
          <div style={{ position: 'fixed', top: 0, right: 0, width: '350px', height: '100vh', backgroundColor: darkMode ? '#0f172a' : '#ffffff', boxShadow: '-2px 0 8px rgba(0,0,0,0.15)', padding: '20px', overflow: 'auto', zIndex: 999 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>My Trip ({tripPlan.length})</h2>
              <button onClick={() => setShowTripPlan(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>✕</button>
            </div>
            {tripPlan.length === 0 ? (
              <p style={{ opacity: 0.6, textAlign: 'center', marginTop: '40px' }}>No destinations added yet. Add posts to plan your trip!</p>
            ) : (
              tripPlan.map(post => (
                <div key={post.id} style={{ marginBottom: '15px', padding: '12px', backgroundColor: darkMode ? '#1e293b' : '#f8fafc', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ margin: 0, marginBottom: '4px', fontSize: '14px' }}>{post.title}</h4>
                      <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>{post.destination}</p>
                    </div>
                    <button
                      onClick={() => removeFromTripPlan(post.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedTravelApp;
