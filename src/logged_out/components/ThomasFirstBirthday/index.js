import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function Home(props) {
  const { selectThomasFirstBirthday } = props;

  const images = Array.from({ length: 27 }, (_, i) => ({
    original: `${process.env.PUBLIC_URL}/images/thomas/${i + 1} Medium.png`,
  }));

  const shuffledImages = [...images].sort(() => 0.5 - Math.random());

  useEffect(() => {
    selectThomasFirstBirthday();
  }, [selectThomasFirstBirthday]);

  return (
    <div
      style={{
        width: "100%",
        fontFamily: "'azalea', cursive",
        color: "#2B6649",
        textAlign: "center",
        backgroundColor: "white",
        marginBottom: 50,
      }}>
      <div>
        <ImageGallery
          items={shuffledImages}
          showThumbnails={false}
          showNav={false}
          autoPlay={true}
          showFullscreenButton={false}
          showBullets={false}
          showPlayButton={false}
        />
      </div>
      <div style={{ marginTop: 10, height: "100%" }}>
        <p style={{ fontSize: 30 }}>Thomas' First Birthday</p>
        <p style={{ fontSize: 25 }}>April 12th at 12 PM</p>
        <p
          style={{
            margin: "0px 0px 0px 0px",
            textAlign: "center",
            fontSize: 10,
            lineHeight: "150%",
            color: "#000",
            fontFamily: "Arial, sans-serif",
          }}>
          Add event to calendar
        </p>
        <p style={{ margin: "0px 0px 10px 0px", textAlign: "center", fontSize: "0px" }}>
          <a
            href="https://www.addevent.com/event/LB25124658+apple"
            title="Apple"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline" }}>
            <img
              src="https://cdn.addevent.com/libs/imgs/icon-emd-share-apple-t1.png"
              alt="Apple"
              width="45"
              border="0"
              style={{ width: "45px", display: "inline" }}
            />
          </a>
          <a
            href="https://www.addevent.com/event/LB25124658+google"
            title="Google"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline" }}>
            <img
              src="https://cdn.addevent.com/libs/imgs/icon-emd-share-google-t1.png"
              alt="Google"
              width="45"
              border="0"
              style={{ width: "45px", display: "inline" }}
            />
          </a>
          <a
            href="https://www.addevent.com/event/LB25124658+office365"
            title="Office 365"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline" }}>
            <img
              src="https://cdn.addevent.com/libs/imgs/icon-emd-share-office365-t1.png"
              alt="Office 365"
              width="45"
              border="0"
              style={{ width: "45px", display: "inline" }}
            />
          </a>
          <a
            href="https://www.addevent.com/event/LB25124658+outlook"
            title="Outlook"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline" }}>
            <img
              src="https://cdn.addevent.com/libs/imgs/icon-emd-share-outlook-t1.png"
              alt="Outlook"
              width="45"
              border="0"
              style={{ width: "45px", display: "inline" }}
            />
          </a>
          <a
            href="https://www.addevent.com/event/LB25124658+outlookcom"
            title="Outlook.com"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline" }}>
            <img
              src="https://cdn.addevent.com/libs/imgs/icon-emd-share-outlookcom-t1.png"
              alt="Outlook.com"
              width="45"
              border="0"
              style={{ width: "45px", display: "inline" }}
            />
          </a>
          <a
            href="https://www.addevent.com/event/LB25124658+yahoo"
            title="Yahoo"
            target="_blank"
            rel="noreferrer">
            <img
              src="https://cdn.addevent.com/libs/imgs/icon-emd-share-yahoo-t1.png"
              alt="Yahoo"
              width="45"
              border="0"
              style={{ width: "45px", display: "inline" }}
            />
          </a>
        </p>
        <p style={{ fontSize: 25, margin: 0 }}>725 Sue Barnett Drive</p>
        <p style={{ fontSize: 20, margin: 0 }}>Houston, Texas</p>

        <a
          href="http://maps.apple.com/?q=725+Sue+Barnett+Drive,+Houston,+TX+77018"
          title="Google"
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline" }}>
          <img
            src="https://www.apple.com/v/maps/d/images/overview/intro_icon__dfyvjc1ohbcm_large.png"
            alt="Google"
            width="45"
            border="0"
            style={{ width: "30px", display: "inline" }}
          />
        </a>
      </div>
      <div style={{ marginTop: 5 }}>
        <a style={{ textDecoration: "none", color: "inherit" }} href="tel:4095490927">
          <p style={{ fontSize: 18 }}>Ashley: 409.549.0927</p>
        </a>
        <a style={{ textDecoration: "none", color: "inherit" }} href="tel:4093443814">
          <p style={{ fontSize: 18 }}>Patrick: 409.344.3814</p>
        </a>
      </div>
      <div style={{ marginTop: 15 }}>
        <p
          style={{
            fontSize: 40,
          }}>
          Menu
        </p>
        <p
          style={{
            fontSize: 25,
            borderBottom: "1.5px solid #2B6649",
            borderTop: "1.5px solid #2B6649",
            marginTop: 10,
            marginBottom: 10,
          }}>
          Sandwiches
        </p>
        <p style={{ fontSize: 20 }}>Pimento Cheese</p>
        <p style={{ fontSize: 20 }}>Egg Salad</p>
        <p style={{ fontSize: 20 }}>Pulled Pork</p>
        <p
          style={{
            fontSize: 25,
            borderTop: "1.5px solid #2B6649",
            borderBottom: "1.5px solid #2B6649",
            marginTop: 10,
            marginBottom: 10,
          }}>
          Snacks
        </p>
        <p style={{ fontSize: 20 }}>Chips</p>
        <p style={{ fontSize: 20 }}>Peanuts</p>
        <p style={{ fontSize: 20 }}>Cookies</p>
        <p style={{ fontSize: 20 }}>Georgia Pecan Caramel Popcorn</p>
        <p style={{ fontSize: 20 }}>Mini Moon Pies</p>
        <p
          style={{
            fontSize: 25,
            borderTop: "1.5px solid #2B6649",
            borderBottom: "1.5px solid #2B6649",
            marginTop: 10,
            marginBottom: 10,
          }}>
          Beverages
        </p>
        <p style={{ fontSize: 20 }}>Azalea</p>
        <p style={{ fontSize: 12 }}>Signature Masters Drink</p>
        <p style={{ fontSize: 20 }}>Arnold Palmer</p>
        <p style={{ fontSize: 12 }}>Sweet Tea & Lemonade</p>
        <p style={{ fontSize: 20 }}>John Daly</p>
        <p style={{ fontSize: 12 }}>Sweet Tea, Lemonade & Vodka</p>
        <p style={{ fontSize: 20 }}>Transfusion</p>
        <p style={{ fontSize: 12 }}>Vodka, Ginger Ale & Grape Juice</p>
        <p style={{ fontSize: 20 }}>Miller Lite</p>
        <p style={{ fontSize: 12 }}>Great Taste, Less Filling</p>
        <p style={{ fontSize: 20 }}>Wine</p>
        <p style={{ fontSize: 12 }}>Red, White & Chardonnay</p>
      </div>
    </div>
  );
}

export default Home;
