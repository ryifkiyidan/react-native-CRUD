import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

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
              <ListGroup.Item>
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant="success">
                        {keranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col xs={6}>
                    <h5>{keranjang.produk.nama}</h5>
                    <p>Rp{numberWithCommas(keranjang.produk.harga)}</p>
                  </Col>
                  <Col xs={4}>
                    <b className="float-right">
                      Rp{numberWithCommas(keranjang.total_harga)}
                    </b>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
