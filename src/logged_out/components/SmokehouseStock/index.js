import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import StockWithPics from "./StockWithPics";
import Modal from "@mui/material/Modal";
import AddNew from "./AddNew";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
function Home(props) {
  const { selectSmokehouseStock } = props;
  const [open, setOpen] = React.useState(false);
  const [addNewOpen, setAddNewOpen] = React.useState(false);
  const [allItems, setAllItems] = React.useState([]);
  const [allStock, setAllStock] = React.useState([]);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const pages = ["+", "Cook"];
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
  const getStock = async () => {
    const res = await fetch("https://sheline-art-website-api.herokuapp.com/smokehouse-stock/stock");
    const data = await res.json();
    setAllStock(
      data.map((item) => {
        return {
          ...item,
          tags: JSON.parse(item.tags),
          stock: JSON.parse(item.stock),
        };
      })
    );
  };
  useEffect(() => {
    getItems();
    getStock();
  }, []);
  useEffect(() => {
    selectSmokehouseStock();
  }, [selectSmokehouseStock]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 100,
      }}>
      <AppBar position="static">
        <Container maxWidth="xl" style={{ padding: 0 }}>
          <Toolbar disableGutters>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
              <Typography
                variant="h5"
                noWrap
                ml={2}
                component="a"
                sx={{
                  display: { xs: "flex", md: "flex" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}>
                The Smokehouse
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }} style={{ justifyContent: "flex-end" }}>
                {pages.map((page) => (
                  <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                    {page}
                  </Button>
                ))}
              </Box>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <StockWithPics stock={allStock} items={allItems} />
      <Modal
        open={addNewOpen}
        onClose={() => {
          setAddNewOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <AddNew />
      </Modal>
    </div>
  );
}

export default Home;
