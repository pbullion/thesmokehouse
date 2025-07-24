import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import S3FileUpload from "react-s3";
import ProgressBar from "@ramonak/react-progress-bar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
window.Buffer = window.Buffer || require("buffer").Buffer;

export default function ReceptionPicsUploadPage(props) {
  const { selectMaddieAndJohnWedding } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [completed, setCompleted] = useState(0);
  const [onePhoto, setOnePhoto] = useState(false);

  const config = {
    bucketName: "mancave-wedding-pics",
    dirName: "madi-and-john",
    region: "us-east-1",
    accessKeyId: "AKIAQGEVZMWAIOP4TE3R",
    secretAccessKey: "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",
  };
  React.useEffect(() => {
    selectMaddieAndJohnWedding();
  }, [selectMaddieAndJohnWedding]);

  const upload = async (e) => {
    try {
      setSuccessMessage("");
      e.preventDefault();
      let fileArr = e.target.files;
      let done = 0;
      let total = fileArr.length;
      if (total > 1) {
        setCompleted(1);
        for (let i = 0; i < fileArr.length; i++) {
          await S3FileUpload.uploadFile(fileArr[i], config)
            .then((data) => {
              done++;
              setCompleted(Math.round((done / total) * 100));
            })
            .catch((err) => {
              setErrorMessage(err);
            });
        }
      } else {
        setOnePhoto(true);
        await S3FileUpload.uploadFile(fileArr[0], config)
          .then((data) => {})
          .catch((err) => {
            console.error("🚀 ~ upload ~ err:", err);
            setErrorMessage(err);
          });
      }
      setSuccessMessage("You have uploaded your photos successfully!");
      setCompleted(0);
      setOnePhoto(false);
    } catch (error) {
      console.error("🚀 ~ error:", error);
    }
  };

  return (
    <Fragment>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0px",
          margin: 0,
        }}
        fluid={true}>
        <div
          style={{
            padding: "10px",
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            alignContent: "center",
          }}>
          <label htmlFor="upload-button">
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x" />
              <i className="fas fa-store fa-stack-1x fa-inverse" />
            </span>
            <h1 className="text-center" style={{ marginBottom: 20 }}>
              Madi & John
            </h1>
            <h5 className="text-center">Upload your photos & videos</h5>
            <h6 className="text-center">
              Choose as many pictures/videos as you would like to upload
            </h6>
            <h6 className="text-center">(These won't be visible to anyone but us)</h6>
          </label>
          <input type="file" id="upload-button" accept="image/jpg" onChange={upload} multiple />
        </div>
        <div
          style={{
            padding: "10px",
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            alignContent: "center",
            width: "75%",
          }}>
          {completed > 0 && <ProgressBar completed={completed} />}
          {onePhoto && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
          {completed > 0 || (onePhoto && "Do Not Refresh")}
        </div>
        <h3 style={{ marginTop: 10, color: "green" }}>{successMessage}</h3>
        <h3 style={{ marginTop: 10, color: "red" }}>{errorMessage}</h3>
      </Container>
    </Fragment>
  );
}
