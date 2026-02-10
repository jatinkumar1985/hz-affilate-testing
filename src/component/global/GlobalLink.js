"use client";

import { useState, useEffect } from "react";

const GlobalLink = ({
  children,
  href,
  rel,
  className,
  title,
  target,
  data,
  eventName,
  onClick,
  ariaLabel,
  ...props
}) => {
  const [lastPageType, setLastPageType] = useState("na");
  const [lastStoryId, setLastStoryId] = useState("na");
  const [lastAuthor, setLastAuthor] = useState("na");

  useEffect(() => {
    setLastPageType(localStorage.getItem("page_type") || "na");
    setLastStoryId(localStorage.getItem("product_id") || "na");
    setLastAuthor(localStorage.getItem("author") || "na");
  }, []);

  const handleClick = (e) => {
    if (data && eventName) {
      window.dataLayer = window.dataLayer || [];
      const eventData = {
        event: eventName,
        referrer_page_type: lastPageType,
        referrer_story_id: lastStoryId,
        referrer_author: lastAuthor,
        ...data,
      };
      dataLayer.push(eventData);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      className={className}
      title={title}
      href={href}
      rel={rel}
      target={target}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </a>
  );
};

export default GlobalLink;