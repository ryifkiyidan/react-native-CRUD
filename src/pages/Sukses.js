import { Button, Image } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sukses extends Component {
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
