import React, { useState, useEffect } from "react";

const FlagComponent = () => {
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayedFlag, setDisplayedFlag] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Fetch the flag
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/74726f"
    )
      .then((response) => response.text())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging line
        setFlag(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the flag:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && flag) {
      const interval = setInterval(() => {
        setDisplayedFlag((prev) => {
          if (index < flag.length) {
            const newFlag = prev + flag[index];
            console.log(
              `Updating displayedFlag: ${newFlag} (index: ${index}, char: ${flag[index]})`
            ); // Debugging line
            setIndex(index + 1);
            return newFlag;
          } else {
            clearInterval(interval);
            console.log("Typewriter effect completed"); // Debugging line
            return prev;
          }
        });
      }, 500);

      // Cleanup interval on component unmount or when dependencies change
      return () => clearInterval(interval);
    }
  }, [loading, flag, index]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {displayedFlag.split("").map((char, index) => (
        <li key={index}>{char}</li>
      ))}
    </ul>
  );
};

export default FlagComponent;
