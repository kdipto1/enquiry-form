import axios from "axios";
import styles from "../styles/Home.module.css";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import Prt from "../Src/Components/Prt";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Head from "next/head";

export default function Home() {
  const submitData = async (event) => {
    event.preventDefault();
    console.log(event);
    const Name = event?.target.Name.value;
    const Company = event?.target.Company.value;
    const Phone = event?.target.Phone.value;
    const Message = event?.target.Message.value;
    const body = { Name, Company, Phone, Message };
    console.log(body);
    await axios({
      method: "post",
      url: `https://script.google.com/macros/s/AKfycbxKxr2QETHEqq8d2FmdhoTfOZg1ZqjxNkhqYrYz68PSp2xOaD0xemFSl_X8S4h_4Vml0w/exec`,
      data: body,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data) {
          event.target.Name.value = "";
          event.target.Company.value = "";
          event.target.Phone.value = "";
          event.target.Message.value = "";
          toast.success("Data added to google sheet", {
            duration: 1000,
            position: "top-right",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error);
      });
  };
  return (
    <>
      <Head>
        <title>Query Form</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Prt />
      <Grid
        // bgcolor="success.main"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Box style={{ zIndex: 50 }}>
          <Typography sx={{ fontWeight: "bold" }} align="center" variant="h4">
            Query form
          </Typography>
          <form onSubmit={submitData}>
            <TextField
              sx={{ mt: 2 }}
              label="Your name"
              id="outlined-size-small"
              // defaultValue="Small"
              size="small"
              name="Name"
              required
            />
            <br />
            <TextField
              sx={{ mt: 2 }}
              label="Company name"
              id="outlined-size-small"
              // defaultValue="Small"
              size="small"
              name="Company"
              required
            />
            <br />
            <TextField
              sx={{ mt: 2 }}
              label="Phone number"
              id="outlined-size-small"
              // defaultValue="Small"
              size="small"
              name="Phone"
              type="number"
              required
            />
            <br />
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              id="outlined-multiline-static"
              label="Message"
              multiline
              rows={4}
              // defaultValue="Default Value"
              name="Message"
              required
            />
            <br />
            <Button
              style={{ margin: "16px auto", display: "flex" }}
              size="large"
              // sx={{ mt: 2 }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Send
            </Button>
          </form>
        </Box>
      </Grid>
      <Toaster />
    </>
  );
}
