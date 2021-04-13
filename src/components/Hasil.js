import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjang,
      jumlah: keranjang.jumlah,
      keterangan: keranjang.keterangan,
      totalHarga: keranjang.total_harga,
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
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };
  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
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

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Success",
          text: data.product.nama + " successfully updated detail cart",
          icon: "success",
          button: false,
          timer: 1250,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.handleClose();
  };

  hapusPesanan = (id) => {
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Success",
          text:
            this.state.keranjangDetail.product.nama + " successfully deleted",
          icon: "error",
          button: false,
          timer: 1250,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.handleClose();
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
          <Card className="overflow-auto hasil">
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
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
