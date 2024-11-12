import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [batchSize, setBatchSize] = useState(4);
  const [summarizedBatches, setSummarizedBatches] = useState([]);

  const handleSummarize = async () => {
    try {
      const response = await axios.post('http://localhost:4000/summarize', {
        text,
        batchSize: parseInt(batchSize, 10),
      });
      setSummarizedBatches(response.data);
    } catch (error) {
      console.error('Error fetching summaries:', error);
    }
  };

  return (
    <div className="App">
      <h1>Sentence Summarizer</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize..."
        rows="6"
      />
      <input
        type="number"
        value={batchSize}
        onChange={(e) => setBatchSize(e.target.value)}
        min="1"
        placeholder="Batch size"
      />
      <button onClick={handleSummarize}>Summarize</button>

      <div className="summaries-container">
        {summarizedBatches.map((batch, index) => (
          <div className="batch" key={index}>
            <div className="original">
              <h3>Original Sentences (Batch {index + 1})</h3>
              {batch.original.map((sentence, i) => (
                <p key={i}>{sentence}</p>
              ))}
            </div>
            <div className="summary">
              <h3>Summaries</h3>
              {batch.summaries.map((summary, i) => (
                <p key={i}>{summary}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;