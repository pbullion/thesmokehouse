import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import StartNewRound from "./StartNewRound";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Home(props) {
  const { selectTheLinksAtTheSmokehouse } = props;
  useEffect(() => {
    selectTheLinksAtTheSmokehouse();
  }, [selectTheLinksAtTheSmokehouse]);
  const [holeData] = useState({
    day: {
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

  return <StartNewRound holeData={holeData} />;
}

export default Home;
