import React from 'react';

function ImageGrid({ images }) {
  if (!images.length) return null;

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (url) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this image',
        url,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  return (
    <section className="image-grid">
      {images.map(img => (
        <div key={img.id} className="image-card" >
          <img src={img.urls.small} alt={img.alt_description || 'Unsplash'} />

          {/* Overlay buttons */}
          <div className="overlay">
            <button
              onClick={() => handleDownload(img.urls.full)}
              aria-label="Download image"
            >
              ⬇️
            </button>
            <button
              onClick={() => handleShare(img.links.html)}
              aria-label="Share image"
            >
              🔗
            </button>
          </div>

          <div className="credit">
            <a href={img.user.links.html} target="_blank" rel="noopener noreferrer">
              {img.user.name}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ImageGrid;
