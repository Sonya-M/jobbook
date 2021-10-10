import React, { useEffect, useState } from "react";
import WizSelectBtns from "./WizSelectBtns";
import WizOptionList from "./WizOptionList";
import SearchBar from "../SearchBar";
import { includesIgnoreCase } from "../../utilities/helpers";

import { Row } from "react-bootstrap";
import styles from "./WizSelect.module.css";

// this component is reusable - accepts either candidates or companies,
// so use props rather than ctx
export default function WizSelect(props) {
  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState(props.items);

  useEffect(() => {
    setFilteredItems(
      props.items.filter((item) => includesIgnoreCase(item.name, filterText))
    );
  }, [filterText, props.items]);

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
          items={filteredItems}
          filterText={filterText}
          ItemCard={ItemCard}
          onSelect={handleSelect}
          selected={props.selected}
        />
      </Row>

      <WizSelectBtns selected={props.selected} />
    </div>
  );
}
