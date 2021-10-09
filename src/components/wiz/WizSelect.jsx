import React, { useState } from "react";
import WizSelectBtns from "./WizSelectBtns";
import WizOptionList from "./WizOptionList";

import { Row } from "react-bootstrap";
import styles from "./WizSelect.module.css";
import SearchBar from "../SearchBar";

export default function WizSelect(props) {
  const [filterText, setFilterText] = useState("");

  const { items } = props;
  const { ItemCard } = props;

  const handleSelect = (item) => {
    props.onSelectItem(item);
  };

  const handleSearch = (searchInput) => {
    setFilterText(searchInput);
  };

  return (
    <div className={styles.selectBox}>
      <Row className="justify-content-center">
        <SearchBar onSearch={handleSearch} />
        <WizOptionList
          items={items}
          filterText={filterText}
          ItemCard={ItemCard}
          onSelect={handleSelect}
          selected={props.selected}
        />
      </Row>

      <WizSelectBtns
        currentStep={props.currentStep}
        onBackBtnClick={props.onBackBtnClick}
        onNextBtnClick={props.onNextBtnClick}
        selected={props.selected}
      />
    </div>
  );
}
