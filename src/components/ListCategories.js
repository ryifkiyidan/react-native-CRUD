import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  else if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  else if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
  else return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, selectedCategory } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <b>Daftar Kategori</b>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={
                  selectedCategory === category.nama && "active-category"
                }
                style={{ cursor: "pointer" }}
              >
                <div className="text-left">
                  <Icon nama={category.nama} />
                  {category.nama}
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
