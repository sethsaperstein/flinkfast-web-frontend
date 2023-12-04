import React from "react";

export const HeroBanner: React.FC = () => {
  const logo = "https://cdn.auth0.com/blog/developer-hub/react-logo.svg";

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={logo} alt="React logo" />
      </div>
      <h1 className="hero-banner__headline">FlinkFast</h1>
      <p className="hero-banner__description">
        Placeholder text
      </p>
      <a
        id="code-sample-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://developer.auth0.com/resources/code-samples/spa/react/basic-authentication/typescript-react-router-6"
        className="button button--secondary"
      >
        Documentation →
      </a>
    </div>
  );
};
