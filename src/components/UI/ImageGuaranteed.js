import React from "react";

export default function ImageGuaranteed(props) {
  let classes = props.className ? `${props.className} ` : " ";
  const src = props.preferredImg ? props.preferredImg : props.placeholderImg;
  const alt = props.preferredImg ? props.preferredImgAlt : props.alt;
  return (
    <img
      className={classes}
      src={src}
      alt={alt}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = props.placeholderImg;
        e.target.alt = props.alt;
      }}
    />
  );
}