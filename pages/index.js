import Head from 'next/head'
import Image from 'next/image'
import axios from "axios";

import styles from '../styles/Home.module.css'
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { FormControl } from '@mui/material';

export default function Home() {
  const submitData = async (event) => {
    event.preventDefault();
    const Name = event.target.Name.value;
    const Email = event.target.Email.value;
    const body = { Name, Email };
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
          // toast("Data added to google sheet");
          event.target.Name.value = "";
          event.target.Email.value = "";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Container maxWidth="sm" >
        <Box >
          <FormControl onSubmit={submitData}>
            <TextField
              label="Size"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
              name="Email"
            />
            <TextField
              label="Size"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
              name="Email"
            />
            <input
              className="mt-2 form-control"
              name="Email"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="mt-2 form-control"
              name="Name"
              type="text"
              placeholder="Name"
              required
            />
            <Button className="mt-2 btn btn-outline-secondary" type="submit">
              Send
            </Button>
          </FormControl>
        </Box>
      </Container>
    </>
  );
}
