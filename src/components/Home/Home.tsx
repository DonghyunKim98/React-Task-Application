import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/MineSweeper">MineSweeper</Link>
          </li>
        </ul>
      </nav>
    );
}

export default Home;