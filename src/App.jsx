import { useState, useEffect, useSyncExternalStore } from "react";

import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [shortifyError, setShortifyError] = useState("");
  const [copyError, setCopyError] = useState("");

  const handleShortify = () => {
    const urlRegex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    if (!urlRegex.test(url)) {
      setShortifyError("please enter a valid URL...");
      setTimeout(() => {
        setShortifyError(null);
      }, 2000);
    } else {
      setShortenedUrl(url.slice(0, 20));
    }
    setUrl("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (!shortenedUrl.trim()) {
          setCopyError("please shortify your url");
          setTimeout(() => {
            setCopyError(null);
          }, 2000);
        }
        setIsCopied(true);
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
        <h1 className="headn">
          Shortify my <span className="url">Url()</span>
        </h1>
        <div className="input-div">
          <div className="input">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="input your url here..."
            />
          </div>
          <button onClick={handleShortify}>shortify</button>
        </div>
        {shortifyError && <div className="error">{shortifyError}</div>}
        <div className="url-display">
          <p className="sh-url">{shortenedUrl}</p>
          <button
            onClick={() => {
              copyToClipboard(shortenedUrl);
            }}
            className={`${isCopied ? "copied" : ""}`}
          >
            {isCopied ? "copied" : "copy"}
          </button>
        </div>
        {copyError && <div className="error">{copyError}</div>}
      </section>
      <section className="section2">
        <img src="/images/thumb-2.png" alt="" />
      </section>
    </div>
  );
}

export default App;
