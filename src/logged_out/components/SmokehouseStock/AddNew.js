import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
function AddNew(props) {
  const [selectedItemID, setSelectedItemID] = React.useState(undefined);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [allItems, setAllItems] = React.useState([]);

  const getItems = async () => {
    const res = await fetch("https://sheline-art-website-api.herokuapp.com/smokehouse-stock/items");
    const data = await res.json();
    setAllItems(
      data.map((item) => {
        return {
          ...item,
          tags: JSON.parse(item.tags),
        };
      })
    );
  };

  const handleSave = async () => {
    selectedItem.exp_date = null;
    const res = await fetch("https://sheline-art-website-api.herokuapp.com/smokehouse-stock/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedItem),
    });
    if (res.ok) {
      console.log("Item saved successfully");
      setSelectedItemID(undefined);
      setSelectedItem(null);
    } else {
      console.error("Failed to save item");
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "background.paper",
    border: "2px solid #000",
    p: 4,
  };
  const handleChange = (event) => {
    const item = allItems.find((x) => x.id === parseInt(event.target.value));
    item.stock = [];
    setSelectedItem(item);
    setSelectedItemID(event.target.value);
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div style={style}>
      <Box style={{ backgroundColor: "white" }}>
        {!selectedItemID && (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select native defaultValue="" id="grouped-native-select" value={selectedItemID} onChange={handleChange}>
                {["spice", "condiment", "alcohol", "supplies", "sauce", "fuel", "meat"].map((type) => (
                  <optgroup key={type} label={type.charAt(0).toUpperCase() + type.slice(1)}>
                    {allItems
                      .filter((item) => item.type === type)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        {selectedItemID && (
          <Box>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/smokehouseStock/logos/${selectedItem?.img_name}.png`}
                alt={selectedItem?.img_name}
                style={{ width: 125, borderRadius: 8 }}
              />
              <Typography id="modal-modal-title" variant="h3" component="h2">
                {selectedItem?.name}
              </Typography>
              <div style={{ width: "90%" }}>
                {selectedItem?.stock.map((bottle, idx) => (
                  <Slider
                    aria-label="Volume"
                    value={bottle}
                    onChange={(event) => {
                      setSelectedItem((prev) => {
                        prev.stock[idx] = event.target.value;
                        return { ...prev };
                      });
                    }}
                  />
                ))}
              </div>
              <Button
                onClick={() => {
                  setSelectedItem((prev) => {
                    return { ...prev, stock: [...prev.stock, 100] };
                  });
                }}>
                Add a Bottle
              </Button>
              <Button
                onClick={() => {
                  console.log(selectedItem);
                  handleSave();
                }}>
                Save
              </Button>
            </div>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default AddNew;
