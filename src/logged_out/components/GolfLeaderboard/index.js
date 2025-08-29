import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import GolfLeaderboard from "./GolfLeaderboard";

function Home(props) {
  const { selectTheLinksAtTheSmokehouse } = props;
  useEffect(() => {
    selectTheLinksAtTheSmokehouse();
  }, [selectTheLinksAtTheSmokehouse]);
  const [holeData] = useState({
    day: {
      1: { par: 2 },
      2: { par: 3 },
      3: { par: 4 },
      4: { par: 3 },
      5: { par: 4 },
      6: { par: 2 },
      7: { par: 3 },
      8: { par: 3 },
      9: { par: 3 },
    },
    night: {
      1: { par: 3 },
      2: { par: 4 },
      3: { par: 3 },
      4: { par: 2 },
      5: { par: 3 },
      6: { par: 4 },
      7: { par: 3 },
      8: { par: 2 },
      9: { par: 2 },
    },
  });

  return <GolfLeaderboard holeData={holeData} />;
}

export default Home;
