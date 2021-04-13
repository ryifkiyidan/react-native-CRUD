import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from "../utils/constants";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };

  render() {
    const keranjangs = this.props.keranjangs;
    const totalBayar = keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>
                Total Harga:{" "}
                <b className="float-right pr-2">
                  Rp{numberWithCommas(totalBayar)}
                </b>
              </h5>
              <Button
                variant="primary"
                block
                className="my-4 mr-2"
                size="lg"
                onClick={() => this.submitTotalBayar(totalBayar)}
                disabled={keranjangs.length < 1}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                <b>Bayar</b>
              </Button>
            </Col>
          </Row>
        </div>

        {/* Mobile */}
        <div className="d-md-none d-sm-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>
                Total Harga:{" "}
                <b className="float-right pr-2">
                  Rp{numberWithCommas(totalBayar)}
                </b>
              </h5>
              <Button
                variant="primary"
                block
                className="my-4 mr-2"
                size="lg"
                onClick={() => this.submitTotalBayar(totalBayar)}
                disabled={keranjangs.length < 1}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                <b>Bayar</b>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
