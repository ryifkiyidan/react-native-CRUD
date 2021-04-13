import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
    };
  }

  handleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjang,
      jumlah: keranjang.jumlah,
      keterangan: keranjang.keterangan,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
    });
  };
  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.keterangan);
  };

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
              <ListGroup.Item
                key={keranjang.id}
                onClick={() => this.handleShow(keranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <div>
                      <Badge pill variant="success">
                        {keranjang.jumlah}
                      </Badge>
                    </div>
                  </Col>
                  <Col xs={6} className="text-left">
                    <div>{keranjang.product.nama}</div>
                    <p>Rp{numberWithCommas(keranjang.product.harga)}</p>
                  </Col>
                  <Col xs={4}>
                    <b className="text-right">
                      Rp{numberWithCommas(keranjang.total_harga)}
                    </b>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              submitHandler={this.submitHandler}
            />
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
