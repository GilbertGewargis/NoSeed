const { useState } = React;

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/check', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>NoSeed App</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={loading}>Check Product</button>
      </form>
      {loading && <p>Checking...</p>}
      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>{result.product}</h2>
          {result.containsSeedOil ? (
            <div>
              <p style={{ color: 'red' }}>Contains seed oil!</p>
              {result.alternatives.length > 0 && (
                <div>
                  <p>Alternatives:</p>
                  <ul>
                    {result.alternatives.map((alt) => (
                      <li key={alt}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: 'green' }}>Seed oil free!</p>
          )}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
