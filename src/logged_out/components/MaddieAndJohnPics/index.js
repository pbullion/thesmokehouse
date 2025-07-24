import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ResponsiveGallery from "react-responsive-gallery";
import AWS from "aws-sdk";

export default function ReceptionPicsPage(props) {
  const { selectMaddieAndJohnWedding } = props;
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    selectMaddieAndJohnWedding();
  }, [selectMaddieAndJohnWedding]);

  AWS.config.update({
    accessKeyId: "AKIAQGEVZMWAIOP4TE3R",
    secretAccessKey: "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",
    region: "us-east-1",
  });
  const s3 = new AWS.S3();
  const params = {
    Bucket: "mancave-wedding-pics",
    Delimiter: "",
    Prefix: "madi-and-john/",
  };
  const getAllPics = async () => {
    console.log("🚀 ~ s3.listObjectsV2 ~ params:", params);
    try {
      setIsLoading(true);
      s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.error(err, err.stack);
        } else {
          console.log("🚀 ~ data.Contents.map ~ data.Contents:", data.Contents);
          const photosArr = data.Contents.map((x, idx) => {
            console.log("🚀 ~ photosArr ~ x, idx:", x, idx);
            return {
              src: `https://mancave-wedding-pics.s3.us-east-1.amazonaws.com/IMG_2506.HEIC`,
            };
          });
          console.log("🚀 ~ photosArr:", photosArr);
          setPhotos(photosArr);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error("🚀 ~ getAllPics ~ error:", error);
    }
  };

  React.useEffect(() => {
    getAllPics();
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
      fluid>
      {!isLoading && photos.length > 0 && <ResponsiveGallery media={photos} />}
    </Container>
  );
}
