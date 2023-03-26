import { Link } from "react-router-dom";

import React from "react";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Todo app!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in the clouds, this todo app provides everything you need for
          a basic Todo app
        </p>
        <address className="public__addr">
          Todo app <br />
          123 On the sky <br />
          Sky City, SC 12345 <br />
          <a href="tel:+84906260124">+84 90 626 0124</a>
        </address>
        <br />
        <p>Creator: Tien Nguyen Dinh</p>
      </main>
      <footer>
        <Link to="/login">User Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
