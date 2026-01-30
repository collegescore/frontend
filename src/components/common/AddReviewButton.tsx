"use client";

import React from "react";
import BasicButton, { BasicButtonProps } from "./BasicButton";

//inherits all props from BasicButton except 'href' which is fixed
type AddReviewButtonProps = Partial<Omit<BasicButtonProps, "href">>;

/**
 * Specialized component that extends BasicButton but ALWAYS points to /add-review.
 * Text and color can be customized, but the href is fixed.
 */
const AddReviewButton = ({
  text = "Add Review", //default text if none provided
  ...props
}: AddReviewButtonProps) => {
  return <BasicButton {...props} text={text} href="/review" />;
};

export default AddReviewButton;
