import React from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import dak_dancing_vertical from "./gifs/dak_dancing.gif";
import cowboy_crawl_vertical from "./gifs/cowboy_crawl.gif";
import dak_card_vertical from "./gifs/dak_card.gif";
import dak_celebrate_vertical from "./gifs/dak_celebrate.gif";
import dak_surprised_vertical from "./gifs/dak_surprised.gif";
import baylor_letsgo_vertical from "./gifs/baylor_letsgo.gif";
import baylor_trophy_vertical from "./gifs/baylor_trophy.gif";
import jerry_jones_wink_vertical from "./gifs/jerry_jones_wink.gif";
import ceedee1_vertical from "./gifs/ceedee1.gif";
import ceedee2_vertical from "./gifs/ceedee2.gif";
import ceedee3_vertical from "./gifs/ceedee3.gif";
import cowboys1_vertical from "./gifs/cowboys1.gif";
import cowboys2_vertical from "./gifs/cowboys2.gif";
import cowboys4_vertical from "./gifs/cowboys4.gif";
import cowboys5_vertical from "./gifs/cowboys5.gif";
import cowboys6_vertical from "./gifs/cowboys6.gif";
import cowboys7_vertical from "./gifs/cowboys7.gif";
import penny1 from "./gifs/penny1.gif";
import penny2 from "./gifs/penny2.gif";
import cowboys8_vertical from "./gifs/cowboys8.gif";
import cowboys9_vertical from "./gifs/cowboys9.gif";
import cowboys10_vertical from "./gifs/cowboys10.gif";
import altuve_fist_pump_vertical from "./gifs/altuve_fist_pump.gif";
import verlander from "./gifs/verlander.gif";
import bregman_stare_vertical from "./gifs/bregman_stare.gif";
import orbit_streaking_vertical from "./gifs/orbit_streaking.gif";
import baylor_mascot_vertical from "./gifs/baylor_mascot.gif";

const allGifs = [
  // {
  //   name: "crawfish1",
  //   source:
  //     "https://media.tenor.com/1XbLd-IZBxoAAAAi/arborwear-arborwearinaction.gif",
  // },
  // {
  //   name: "crawfish2",
  //   source: "https://media.tenor.com/p68uX4FaxOoAAAAC/crawfish-suck.gif",
  // },
  // {
  //   name: "crawfish3",
  //   source:
  //     "https://media.tenor.com/e87x2iAWef4AAAAd/lovelypeaches-raeswae.gif",
  // },
  // {
  //   name: "crawfish4",
  //   source: "https://media.tenor.com/M_rhsSjMN4kAAAAC/lobster.gif",
  // },
  // {
  //   name: "crawfish5",
  //   source: "https://media.tenor.com/Tm0dQvRJnjMAAAAd/pubg-lobster-dance.gif",
  // },
  // {
  //   name: "crawfish6",
  //   source: "https://media.tenor.com/7e1Wq3iaMuEAAAAC/dancing-lobster.gif",
  // },
  // {
  //   name: "crawfish7",
  //   source: "https://media.tenor.com/tIPHtFu83CgAAAAC/cray-claw.gif",
  // },
  {
    name: "astros_1",
    type: "gif",
    source:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzF3NnRkejUxcnM5c2x0djh4M3FrNWtxaHVkc3RxNzVtYXg1bWJxMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xdOHskFTeeezSiZKV0/giphy.gif",
  },
  {
    name: "astros_2",
    type: "gif",
    source:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHR4bmZjYWxveGcwNWMyenZqdXR2bHNrMjdkdnpicmxiaXVyYzkwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13xqqCvw1EfTA4/giphy.gif",
  },
  {
    name: "astros_3",
    type: "gif",
    source:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExejcxOG95dGhoY2Rhc241NnJvbmUybTB4cjdkeHdiOWh2azY2Y3N4cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/e3d4pLXBlLA9CQnYBZ/giphy.gif",
  },
  {
    name: "astros_4",
    type: "gif",
    source:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTNwOXUxZ3hlcmdhcThnbDIzZW51M3g3ZWNjNGh3anptZGFiOGtzaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fXy19DXz4MSrsDzzvO/giphy.gif",
  },
  {
    name: "astros_5",
    type: "gif",
    source:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzRub2FhdTdvdzM5Nm1jNDJhd3czbmpraWM0Mm9idHdybG0zdWJlcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6u9t67tyN1mV6VMrf7/giphy.gif",
  },
  {
    name: "astros_6",
    type: "gif",
    source:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDRrc2N2dG81eTZvbDkzZnd5a3BhY2ZwejJ4M3lvYmZoYzU1eHoyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J9BSsgrLzeRET6w/giphy.gif",
  },
  {
    name: "astros_7",
    type: "gif",
    source:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ24wb2FnYmRjdmo3M3o4NHBuZG1rbjc2NzI3bmo5YjVyN3d3c2xtbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dnaVdVWzERCJp5p6c0/giphy.gif",
  },
  {
    name: "astros_8",
    type: "gif",
    source:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnZ2bjVwNzc2ZDlvcmJtaGR0bHFsMXVueG93ZjZhY3phdTFvZjd6YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J64oHwGIuUlXvB2m6d/giphy.gif",
  },
  {
    name: "astros_9",
    type: "gif",
    source:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWt6MWpoYmV6MnRvZWE0Ymo2Ym5kcDV1M2h4dTh1endwcmRsank0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WLFcyJrctgU3n9pDsz/giphy.gif",
  },
  {
    name: "astros_10",
    type: "gif",
    source:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG1zeDRoYTF6NzgzcWRwaDJ6MHRxZDJpcHo0dDQ0aTJ2eXl0cm5sMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YvkIb1jE3PgyhreB39/giphy.gif",
  },
  {
    name: "astros_11",
    type: "gif",
    source:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDhqcnl5Zm1zZTBkZzkyaGprYmFqMjdodjZsNnJnNTdoamI0dGNteCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OIjuuBYcWsCsspXmSH/giphy.gif",
  },
  {
    name: "astros_12",
    type: "gif",
    source: "https://media.tenor.com/1Yv5d2XswC0AAAAM/astros-altuve.gif",
  },
  {
    name: "astros_13",
    type: "gif",
    source:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzBnMDZhZTlicHl3bHRma2d5ZzFtbWpxbWp2d25vM3ZsbXhwM3YxbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XDvdC9mPIL4uffwug1/giphy.gif",
  },
  {
    name: "astros_14",
    type: "gif",
    source: "https://media.tenor.com/E6Z93UJjSj8AAAAC/houston-astros-jeremy-pena.gif",
  },
  {
    name: "astros_15",
    type: "gif",
    source: "https://i.pinimg.com/originals/6e/14/ae/6e14aecf26165234ae25d76c27f488aa.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://media.tenor.com/DB130XgMlu0AAAAM/texas-sucks-flat-down.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://media.tenor.com/foWTSrq9nNoAAAAd/texas-sucks-football.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://media.tenor.com/gGVoviTyIXMAAAAC/horns-down-ncaa.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://media.tenor.com/jcwPx1QFjWUAAAAM/crying-sad.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://media.tenor.com/o0AIiwVkFAAAAAAC/texas-longhorns.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://media.tenor.com/Mr2Qi114erEAAAAC/texas-longhorns.gif",
  },
  {
    name: "sooners",
    type: "gif",
    source: "https://cdn2.sbnation.com/imported_assets/810437/STOOPSFACE.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source:
      "https://cdn.vox-cdn.com/thumbor/1xTKGQnGaN9KJlJor3WkA3pwVQo=/0x0:640x360/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/26107587/texas-ffffff.0.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source:
      "https://cdn.vox-cdn.com/thumbor/JH5g373SuEIEkiAS01HV89d2-8g=/34x0:408x249/1400x933/filters:focal(34x0:408x249):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/3852309/texas-fan-f-bomb.0.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://i.gifer.com/3HcW.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://cdn2.sbnation.com/imported_assets/835730/TEXASHOTTIES.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://media2.giphy.com/media/cOCxyX1af3Psk/giphy.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://assets.sbnation.com/assets/1549829/macktheknife.gif",
  },
  {
    name: "hooters",
    type: "video",
    source:
      "https://packaged-media.redd.it/gncmzsaby9491/pb/m2-res_720p.mp4?m=DASHPlaylist.mpd&v=1&e=1695679200&s=88b858378bf625d3aac0ddba3e65210a38c2e1ec#t=0",
  },
  {
    name: "hooters",
    type: "video",
    source:
      "https://packaged-media.redd.it/f4xm8oix3l741/pb/m2-res_720p.mp4?m=DASHPlaylist.mpd&v=1&e=1695715200&s=39da950ae30bfd7e6f6aedb2dc6171393f14351e#t=0",
  },
  {
    name: "hooters",
    type: "video",
    source:
      "https://packaged-media.redd.it/gb907h1te2o61/pb/m2-res_1080p.mp4?m=DASHPlaylist.mpd&v=1&e=1695726000&s=bdf588f2a314fdb954673ada7e3870fd22f7e0cd#t=0",
  },
  {
    name: "hooters",
    type: "video",
    source:
      "https://packaged-media.redd.it/x272pwlh19v71/pb/m2-res_720p.mp4?m=DASHPlaylist.mpd&v=1&e=1695715200&s=8be6e3199be9f518c38de84f43156b03348b980f#t=0",
  },
  {
    name: "hooters",
    type: "video",
    source:
      "https://packaged-media.redd.it/s27qy05qawi71/pb/m2-res_720p.mp4?m=DASHPlaylist.mpd&v=1&e=1695715200&s=9de0fe05ac9a58ff8a363eec723c989808e9aaef#t=0",
  },
  {
    name: "hooters",
    type: "video",
    source: "https://i.imgur.com/SKTYJe9.mp4",
  },
  {
    name: "hooters",
    type: "video",
    source:
      "https://packaged-media.redd.it/772i8wnc2n791/pb/m2-res_1080p.mp4?m=DASHPlaylist.mpd&v=1&e=1695682800&s=ae2fb9aa8eb20d5d262ff7d0d7f82f62709fc322#t=0",
  },
  {
    name: "hooters",
    type: "video",
    source: "https://preview.redd.it/j1twsx5ektz71.gif?width=576&format=mp4&s=65251a3ca4946a81fa73d06a29082cd188376332",
  },
  {
    name: "hooters",
    type: "video",
    source: "https://preview.redd.it/kcgecl549sz71.gif?format=mp4&s=cd374bb196feab0e557c3f39170aee556ab26ad4",
  },
  {
    name: "hooters",
    type: "video",
    source:
      "https://packaged-media.redd.it/4hr3ejqhcxmb1/pb/m2-res_1278p.mp4?m=DASHPlaylist.mpd&v=1&e=1695517200&s=5e4faec085a7d717f33571ec0b1c0ca46fcbd55b#t=0",
  },
  {
    name: "hooters",
    type: "video",
    source: "https://i.imgur.com/GVadhui.mp4",
  },
  {
    name: "hooters",
    type: "gif",
    source: "https://wp.usatodaysports.com/wp-content/uploads/sites/90/2014/08/untitled-3.gif",
  },
  {
    name: "rockets",
    type: "gif",
    source: "https://img.washingtonpost.com/blogs/early-lead/files/2015/12/harden.gif",
  },
  {
    name: "hooters",
    type: "gif",
    source:
      "https://media4.giphy.com/media/ftquUhWzKDoqQiq1gp/giphy.gif?cid=6c09b952m2e1qbqiv578xm9pi5tbmh6qu93ywklcwansaxfm&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g",
  },
  {
    name: "hooters",
    type: "gif",
    source: "https://media.tenor.com/GNS0oghlZu0AAAAM/hooters-hooters-girl.gif",
  },
  {
    name: "millerlite",
    type: "gif",
    source:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzJpdnJldzNuYmhsM2cxenB3MWt1aHY5ZDJiM2lwdHNtY3A3bG51bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RMSo1sn0oTNtT1TfZK/giphy.gif",
  },
  {
    name: "millerlite",
    type: "gif",
    source:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGs5bGZ0MmhnbDZ6YWNzbjMwcWc5dTBxNzhheWo5a3o5c2Nvd2UyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XJWuOOrXxBmnPX6q0e/giphy.gif",
  },
  {
    name: "millerlite",
    type: "gif",
    source:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2swMGs0anBobmw2YnQ5aWIwd3VzN2x5YmNpbGF6M2NneHNxcmFyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/k6rab32agadkrkrBYr/giphy.gif",
  },
  {
    name: "hooters",
    type: "gif",
    source:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmJpcHcxdmI1eHJ3ajd2dWdldTI3MTNzMmFsNzVjcHIwNDdoOWN0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ftquUhWzKDoqQiq1gp/giphy.gif",
  },
  {
    name: "hooters",
    type: "gif",
    source:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzY1bXlqYWl2OGdqN3lueDc2MDUzM2NwNjFqc2VlOWo0eHplNDZqbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UUMHoZU0TFKrm/giphy.gif",
  },
  {
    name: "hooters",
    type: "gif",
    source:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXY4N2dpMGp1M3lpczB2eGR2YXQ4bXdlbm51d3F6aWNodXVlMGFxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fxIiyB4gCf4QsJ8Dmh/giphy.gif",
  },
  {
    name: "peaks",
    type: "gif",
    source: "https://media1.giphy.com/media/SWTufsSWEU5OsJlimZ/200.gif",
  },
  {
    name: "longhorns",
    type: "gif",
    source: "https://media.tenor.com/Mr2Qi114erEAAAAM/texas-longhorns.gif",
  },
  {
    name: "texastech",
    type: "gif",
    source: "https://media.tenor.com/zMKUF1g-zjkAAAAM/texas-tech.gif",
  },
  {
    name: "sooners",
    type: "gif",
    source: "https://media.tenor.com/-lDYW3F_pUYAAAAM/ousucks-oustillsucks.gif",
  },
  {
    name: "rangers",
    type: "gif",
    source: "https://media.tenor.com/ZpXG1cehLqMAAAAM/texas-rangers-rangers.gif",
  },
  {
    name: "astros_16",
    type: "gif",
    source:
      "https://media1.giphy.com/media/3ov9jJCRZS6nxwQ2sM/giphy.gif?cid=82a1493blx3b1jt6xxw04fcdtk1ma8dz259ghpc9pxo1d33w&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  },
  { name: "astros_orbit_streaking_vertical", type: "gif", source: orbit_streaking_vertical },
  { name: "astros_bregman_stare_vertical", type: "gif", source: bregman_stare_vertical },
  { name: "astros_verlander", type: "gif", source: verlander },
  { name: "baylor_mascot_vertical", type: "gif", source: baylor_mascot_vertical },
  { name: "baylor_letsgo_vertical", type: "gif", source: baylor_letsgo_vertical },
  // {
  //   name: "astros_altuve_fist_pump_vertical",
  //   type: "gif",
  //   source: altuve_fist_pump_vertical,
  // },
  { name: "baylor_trophy_vertical", type: "gif", source: baylor_trophy_vertical },
  { name: "cowboys_dak_dancing_vertical", type: "gif", source: dak_dancing_vertical },
  { name: "cowboys_dak_card_vertical", type: "gif", source: dak_card_vertical },
  { name: "cowboys_cowboys9_vertical", type: "gif", source: cowboys9_vertical },
  { name: "cowboys_cowboy_crawl_vertical", type: "gif", source: cowboy_crawl_vertical },
  { name: "cowboys_ceedee2_vertical", type: "gif", source: ceedee2_vertical },
  { name: "cowboys_cowboys4_vertical", type: "gif", source: cowboys4_vertical },
  {
    name: "cowboys_jerry_jones_wink_vertical",
    type: "gif",
    source: jerry_jones_wink_vertical,
  },
  { name: "cowboys_cowboys8_vertical", type: "gif", source: cowboys8_vertical },
  { name: "cowboys_cowboys2_vertical", type: "gif", source: cowboys2_vertical },
  { name: "cowboys_cowboys7_vertical", type: "gif", source: cowboys7_vertical },
  { name: "cowboys_ceedee3_vertical", type: "gif", source: ceedee3_vertical },
  { name: "cowboys_dak_surprised_vertical", type: "gif", source: dak_surprised_vertical },
  { name: "cowboys_cowboys1_vertical", type: "gif", source: cowboys1_vertical },
  { name: "cowboys_ceedee1_vertical", type: "gif", source: ceedee1_vertical },
  { name: "cowboys_dak_celebrate_vertical", type: "gif", source: dak_celebrate_vertical },
  { name: "penny1", type: "gif", source: penny1 },
  { name: "penny2", type: "gif", source: penny2 },
  { name: "cowboys_cowboys5_vertical", type: "gif", source: cowboys5_vertical },
  { name: "cowboys_cowboys6_vertical", type: "gif", source: cowboys6_vertical },
  { name: "cowboys_cowboys10_vertical", type: "gif", source: cowboys10_vertical },
];
function GifDisplay(props) {
  const { vertical, selectGifDisplay } = props;
  const [dayOfTheWeek, setDayOfTheWeek] = React.useState("Saturday");
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVertical, setIsVertical] = React.useState(vertical);
  const [gifs, setGifs] = React.useState([]);
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  React.useEffect(() => {
    const theGifs = allGifs
      .filter((x) => !x.name.includes("astro"))
      .filter((gif) => {
        if (dayOfTheWeek === "Saturday") {
          console.log("🚀 ~ file: GifDisplay.js:426 ~ .filter ~ dayOfTheWeek:", dayOfTheWeek);
          if (!gif.name.includes("cowboys")) return gif;
        } else if (dayOfTheWeek === "Sunday") {
          if (!gif.name.includes("longhorns") && !gif.name.includes("sooners") && !gif.name.includes("baylor")) return gif;
        } else if (dayOfTheWeek !== "Sunday" || dayOfTheWeek !== "Saturday") {
          if (!gif.name.includes("longhorns") && !gif.name.includes("sooners") && !gif.name.includes("cowboys")) return gif;
        } else return gif;
        return gif;
      });
    setGifs(shuffle(theGifs));
  }, []);
  React.useEffect(() => {
    selectGifDisplay();
  }, [selectGifDisplay]);
  React.useEffect(() => {
    let interval = 4000;
    const intervalId = setInterval(() => {
      if (currentIndex === gifs.length - 1) {
        setCurrentIndex(0);
      } else {
        const next = currentIndex + 1;
        setCurrentIndex(next);
      }
    }, interval);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div
      style={{
        overflow: "hidden",
        height: "100vh",
        backgroundColor: "black",
      }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(48,25,52,0.75)", zIndex: -1 }}></div>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -2 }}>
        <video
          autoPlay
          loop
          fill
          muted
          src={"https://i.imgur.com/P9FuPil.mp4"}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", background: "rgba(48,25,52,0.75)" }}
        />
      </div>
      {gifs.length === 0 && (
        <div
          style={{
            transform: isVertical && "rotate(90deg) translateY(-100%)",
            transformOrigin: isVertical && "top left",
            height: isVertical ? "100vw" : "100vh",
            width: isVertical ? "100vh" : "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "black",
            overflow: "hidden",
            alignContent: "center",
            alignItems: "center",
            color: "white",
          }}>
          <ReactLoading type={"spin"} color={"green"} height={667} width={375} />
        </div>
      )}
      {gifs.length > 0 && (
        <div
          style={{
            overflow: "hidden",
            transform: isVertical && "rotate(90deg) translateY(-100%)",
            transformOrigin: isVertical && "top left",
          }}>
          {gifs[currentIndex].type === "gif" ? (
            <img
              alt={"gif"}
              src={gifs[currentIndex].source}
              style={{
                objectFit: isVertical ? "cover" : "contain",
                height: isVertical ? "100vw" : "100vh",
                width: isVertical ? "100vh" : "100vw",
                overflow: "hidden",
              }}
            />
          ) : (
            <video
              autoPlay
              loop
              fill
              muted
              src={gifs[currentIndex].source}
              style={{
                objectFit: isVertical ? "cover" : "contain",
                height: isVertical ? "100vw" : "100vh",
                width: isVertical ? "100vh" : "100vw",
                overflow: "hidden",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
export default GifDisplay;
