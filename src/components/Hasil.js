import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <b>Hasil</b>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((keranjang) => (
              <ListGroup.Item key={keranjang.id}>
                <Row>
                  <Col xs={2}>
                    <div>
                      <Badge pill variant="success">
                        {keranjang.jumlah}
                      </Badge>
                    </div>
                  </Col>
                  <Col xs={6} className="text-left">
                    <div>{keranjang.produk.nama}</div>
                    <p>Rp{numberWithCommas(keranjang.produk.harga)}</p>
                  </Col>
                  <Col xs={4}>
                    <b className="text-right">
                      Rp{numberWithCommas(keranjang.total_harga)}
                    </b>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
