import React, { Fragment } from "react";

export default function WizOptionList(props) {
  const { ItemCard } = props;
  return (
    <Fragment>
      {props.items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onSelect={() => props.onSelect(item)}
          selected={props.selected ? item.id === props.selected.id : false}
        />
      ))}
    </Fragment>
  );
}
