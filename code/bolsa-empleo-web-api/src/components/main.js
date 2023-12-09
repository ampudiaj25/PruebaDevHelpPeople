import React from 'react';
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Ciudadanos from './ciudadanos/index';
import Vacantes from './vacantes/index';

const Main = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/ciudadanos" className={({isActive}) => isActive ? "selected": "" }>Ciudadanos</NavLink>
              </li>
              <li>
                <NavLink to="/vacantes"  className={({isActive}) => isActive ? "selected": "" }>Vacantes</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/ciudadanos" element={<Ciudadanos />} />
            <Route path="/vacantes" element={<Vacantes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default Main;
