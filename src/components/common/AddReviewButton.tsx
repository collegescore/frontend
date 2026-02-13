"use client";

import React from "react";
import BasicButton, { BasicButtonProps } from "./BasicButton";

// inherits all props from BasicButton except 'href' which is fixed
// can optionally accept a schoolSlug prop for future use (e.g. to pre-fill the review form),
// but it's not required for the button to function
type AddReviewButtonProps = Partial<Omit<BasicButtonProps, "href">> & {
  schoolSlug?: string;
};

/**
 * Specialized component that extends BasicButton but ALWAYS points to /add-review.
 * Text and color can be customized, but the href is fixed.
 */
const AddReviewButton = ({
  text = "Add Review", //default text if none provided
  schoolSlug,
  ...props
}: AddReviewButtonProps) => {
  // If a school is selected, go to /review/slug, otherwise just /review
  const dynamicHref = schoolSlug
    ? `/review/${encodeURIComponent(schoolSlug)}`
    : "/review";

  return <BasicButton {...props} text={text} href={dynamicHref} />;
};

export default AddReviewButton;
