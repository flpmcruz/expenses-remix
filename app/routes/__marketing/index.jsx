import { Link } from '@remix-run/react';
import { FaArrowRight, FaDollarSign, FaChartBar } from 'react-icons/fa';

export default function Index() {
  return (
    <main>
      <section className="marketing-section">
        <header>
          <FaDollarSign />
          <h2>A Central Space</h2>
        </header>
        <div className="marketing-content">
          <div className="marketing-image">
            <img src="images/expenses-management.jpg" alt="A list of expenses." />
          </div>
          <div className="marketing-explanation">
            <p>Manage your expenses in one central place.</p>
            <p>
              <Link className="cta" to="/expenses">
                <span>Get Started</span>
                <FaArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="marketing-section">
        <header>
          <FaChartBar />
          <h2>Detailed Analytics</h2>
        </header>
        <div className="marketing-content">
          <p className='marketing-explanation'>
            Benefit from best-in-class analytics to understand your spending
            patterns.
          </p>
          <div className="marketing-image">
            <img src="images/expenses-chart.jpg" alt="A demo bar chart." />
          </div>
        </div>
      </section>
    </main>
  );
}

export function meta() {}

//Acceder a los headers del padre __app, de esta forma el valor de estos headers esta en un solo lugar, pero puedo añadir otros personificados
export function headers({
  parentHeaders,
  actionHeaders,
  loaderHeaders,
}) {
  return {
    'Cache-Control': parentHeaders.get('Cache-Control'), //60min
    'customHeader': 'CustomValue'
  }
}

//con esta propiedad puedo condicionar el root para desabilitar el js en esta pagina
export const handle = { disableJS: true }