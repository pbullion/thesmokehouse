import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BottleLevel from "./BottleLevel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
function StockWithPics(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const { stock, items } = props;
  const [types, setTypes] = React.useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setTypes([...new Set(props.stock?.flatMap((item) => item.type))]);
  }, [stock]);

  const [expanded, setExpanded] = React.useState({
    panel1: false,
    panel2: false,
    panel3: false,
    panel4: false,
    panel5: false,
    panel6: false,
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) => ({
      ...prev,
      [panel]: isExpanded,
    }));
  };
  const handleSave = async () => {
    selectedItem.exp_date = null;
    const res = await fetch(
      `https://sheline-art-website-api.herokuapp.com/smokehouse-stock/update-item/${selectedItem.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedItem),
      }
    );
    if (res.ok) {
      console.log("Item saved successfully");
      setSelectedItem(null);
    } else {
      console.error("Failed to save item");
    }
  };
  const customOrder = ["spice", "fuel", "condiment", "supplies", "alcohol", "meat"];
  return (
    <div style={{}}>
      {types
        ?.sort((a, b) => {
          return customOrder.indexOf(a.type) - customOrder.indexOf(b.type);
        })
        .map((type, idx) => {
          return (
            <Accordion expanded={expanded[`panel${idx + 1}`]} onChange={handleChange(`panel${idx + 1}`)} key={type}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${type}-content`} id={`${type}-header`}>
                <Typography component="span">{type.toUpperCase()}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {stock
                    .filter((item) => item.type === type)
                    .sort((a, b) => {
                      const sumA = a.stock.reduce((acc, val) => acc + val, 0);
                      const sumB = b.stock.reduce((acc, val) => acc + val, 0);
                      return sumA - sumB;
                    })
                    .map((item, idx) => (
                      <Grid
                        key={item.img_name}
                        item
                        xs={6}
                        sm={6}
                        md={3}
                        lg={2}
                        onClick={() => {
                          setOpen(true);
                          setSelectedItem(item);
                        }}>
                        <p style={{ textAlign: "center", margin: 0, fontWeight: "bold", lineHeight: 1 }}>{item.name}</p>
                        <p style={{ textAlign: "center", fontSize: "0.8rem", margin: 0 }}>{item.brand}</p>
                        <div
                          key={idx}
                          style={{ margin: "0.5rem", display: "flex", flexDirection: "row", alignItems: "center" }}>
                          <img
                            src={`${process.env.PUBLIC_URL}/images/smokehouseStock/logos/${item.img_name}.png`}
                            alt={item.img_name}
                            style={{ width: 125, borderRadius: 8 }}
                          />
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                              {item.stock
                                .sort((a, b) => a - b)
                                .map((bottle) => (
                                  <BottleLevel fillPercent={bottle} />
                                ))}
                            </div>
                          </div>
                        </div>
                      </Grid>
                    ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedItem(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src={`${process.env.PUBLIC_URL}/images/smokehouseStock/logos/${selectedItem?.img_name}.png`}
              alt={selectedItem?.name}
              style={{ width: 125, borderRadius: 8 }}
            />
            <Typography id="modal-modal-title" variant="h3" component="h2">
              {selectedItem?.name}
            </Typography>
            {selectedItem?.stock.map((bottle, idx) => (
              <Slider
                aria-label="Volume"
                value={bottle}
                onChange={(event) => {
                  setSelectedItem((prev) => {
                    const newStock = [...prev.stock];
                    newStock[idx] = event.target.value;
                    return { ...prev, stock: newStock };
                  });
                }}
              />
            ))}
            <Button
              onClick={() => {
                setSelectedItem((prev) => ({ ...prev, stock: [...prev.stock, 100] }));
              }}>
              Add a Bottle
            </Button>
            <Button
              onClick={() => {
                handleSave();
              }}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default StockWithPics;
