import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
const Menus = ({ menu, inputCarts }) => {
  return (
    <Col md={4} xs={6} className="mt-4">
      <Card
        className="shadow"
        onClick={() => inputCarts(menu)}
        style={{ cursor: "pointer" }}
      >
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>
            {menu.nama} <b>({menu.kode})</b>
          </Card.Title>
          <Card.Text>Rp{numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
