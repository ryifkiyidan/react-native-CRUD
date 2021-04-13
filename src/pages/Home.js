import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import "../App.css";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      selectedCategory: "Makanan",
      keranjangs: [],
    };
  }

  getProducts(selectedCategory) {
    axios
      .get(API_URL + "products?category.nama=" + selectedCategory)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getKeranjangs() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getProducts(this.state.selectedCategory);
    this.getKeranjangs();
  }

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      this.getKeranjangs();
    }
  }

  changeCategory = (value) => {
    this.setState({ selectedCategory: value, menus: [] });
    this.getProducts(value);
  };

  inputCarts = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Success",
                text: keranjang.product.nama + " successfully added to carts",
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Success",
                text: keranjang.product.nama + " successfully added to carts",
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { menus, selectedCategory, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              selectedCategory={selectedCategory}
            />
            <Col>
              <h4>
                <b>Daftar Produk</b>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      inputCarts={this.inputCarts}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} />
          </Row>
        </Container>
      </div>
    );
  }
}
