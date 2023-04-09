import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleShortify = () => {
    const urlRegex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    if (!urlRegex.test(url)) {
      alert("Please enter a valid URL.");
    } else {
      setShortenedUrl(url.slice(0, 20));
    }
    setUrl("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // setIsCopied(!isCopied);
      })
      .catch((error) => {
        console.error("Could not copy text to clipboard: ", error);
      });
  };

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isCopied]);

  return (
    <div className="App">
      <section className="section1">
        <div>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="input your url here"
          />
          <button onClick={handleShortify}>shortify</button>
        </div>
        <div>
          <span onClick={copyToClipboard(shortenedUrl)}>{shortenedUrl}</span>
          <button>{isCopied ? "copied" : "copy"}</button>
        </div>
      </section>
      <section className="section2">
        <img src="/images/thumb-2.png" alt="" />
      </section>
    </div>
  );
}

export default App;
