import React, { Component } from "react";
import { Col } from "react-bootstrap";

export default class ListCategories extends Component {
  render() {
    return (
      <Col md={2} mt="2">
        <h4>
          <b>Daftar Kategori</b>
        </h4>
        <hr />
      </Col>
    );
  }
}
