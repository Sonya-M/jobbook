import React, { useState } from "react";

import { Row, Col, Form, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, BsX } from "react-icons/bs";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (inputText) => {
    props.onSearch(inputText);
    setSearchText(inputText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setSearchText("");
    handleChange("");
  };

  return (
    <Form className={styles.searchBar} onSubmit={handleSubmit}>
      <InputGroup>
        <InputGroup.Text>
          <BsSearch size="1rem" />
        </InputGroup.Text>
        <FormControl
          type="text"
          name="searchForm"
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
          style={{ borderRight: "none" }}
        />
        <InputGroup.Text
          onClick={handleClear}
          className="bg-white"
          style={{ borderLeft: "none", cursor: "pointer" }}
        >
          <BsX size="1.5rem" style={{ zIndex: "1" }} />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
