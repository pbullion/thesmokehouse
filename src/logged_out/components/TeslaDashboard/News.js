import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";

const NewsWidget = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get("https://gnews.io/api/v4/top-headlines", {
          params: {
            token: "34746b19f0e0b42b131d147e6a2cbff4",
            topic: "world",
            lang: "en",
            country: "us",
            max: 10,
          },
        });
        setHeadlines(response.data.articles);
      } catch (error) {
        console.error("Error fetching the news headlines", error);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div
      className="news-widget"
      style={{
        display: "flex",
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        justifyContent: "space-between",
        height: 160,
      }}>
      {headlines.map((article, index) => (
        <a
          key={index}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}>
          <div
            key={index}
            className="news-item"
            style={{ width: 190, margin: 10, display: "flex", flexDirection: "column" }}>
            <img src={article.image} alt={article.title} className="news-image" />
            <h5 className="news-title" style={{ lineHeight: 1.1, width: 190 }}>
              {article.title}
            </h5>
          </div>
        </a>
      ))}
    </div>
  );
};

export default NewsWidget;
