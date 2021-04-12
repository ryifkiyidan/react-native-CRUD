import { Button, Image } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Sukses extends Component {
  componentDidMount() {
    this.deleteKeranjangs();
  }
  deleteKeranjangs() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map((item) => {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image
          src="assets/images/success_purchase.svg"
          width="500"
          className="mt-5"
        />
        <h2 className="mt-5">Sukses Pesan</h2>
        <p>Terima Kasih sudah memesan</p>
        <Button variant="primary" as={Link} to="/">
          Back
        </Button>
      </div>
    );
  }
}
