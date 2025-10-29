import ingredients from '../assets/images/ingredients.png'
import chef from '../assets/images/chef.png'
import meter from '../assets/images/meter.png'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-3 fw-bold mb-3" style={{ color: '#e74c3c' }}>Welcome to Pizzeria</h1>
          <p className="lead mb-4" style={{ color: '#7f8c8d' }}>Experience the taste of perfection with our handcrafted pizzas</p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/orderpizza')}
            style={{ 
              borderRadius: '30px', 
              fontWeight: 'bold', 
              padding: '10px 40px',
              fontSize: '1.2rem'
            }}
          >
            Order Pizza Now
          </button>
        </div>
      </div>

      {/* Our Story */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4 fw-bold" style={{ color: '#2c3e50' }}>Our Story</h2>
              <p className="card-text mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page.
                Fans were given situations where they had to come up with wacky and fun excuses. The person
                with the best excuse won the Best Excuse Badge and won Pizzeria's vouchers. Their enthusiastic
                response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
              </p>
              <p className="card-text mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist the
                softest, cheesiest, crunchiest, butteriest Domino's Fresh Pan Pizza. They have been leaving the
                stage in the middle of a performance and even finding excuses to be disqualified in a football match.
              </p>
              <p className="card-text" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations
                where they had to come up with wacky and fun excuses. The person with the best excuse won the Best
                Excuse Badge and won Domino's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan
                Pizza is the Tastiest Pan Pizza. Ever!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h3 className="card-title fw-bold mb-3" style={{ color: '#2c3e50' }}>Premium Ingredients</h3>
              <p className="card-text" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#7f8c8d' }}>
                We're ruthless about goodness. We have no qualms about tearing up a day-old lettuce leaf
                (straight from the farm), or steaming a baby (carrot). Cut. Cut. Chop. Chop. Steam. Steam.
                Stir. Stir. While they're still young and fresh - that's our motto. It makes the kitchen
                a better place.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={ingredients}
            alt="Ingredients"
            className="img-fluid rounded"
            style={{ borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
          />
        </div>
      </div>

      {/* Our Chefs Section */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6 order-md-2 mb-4 mb-md-0">
          <img
            src={chef}
            alt="Chef"
            className="img-fluid rounded"
            style={{ borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
          />
        </div>
        <div className="col-md-6 order-md-1">
          <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h3 className="card-title fw-bold mb-3" style={{ color: '#2c3e50' }}>Our Master Chefs</h3>
              <p className="card-text" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#7f8c8d' }}>
                They make sauces sing and salads dance. They create magic with skill, knowledge, passion,
                and stirring spoons (among other things). They make goodness so good, it doesn't know what
                to do with itself. We do though. We send it to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Section */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={meter}
            alt="Delivery Timer"
            className="img-fluid rounded"
            style={{ borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
          />
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h3 className="card-title fw-bold mb-3" style={{ color: '#2c3e50' }}>45 Minute Delivery Guarantee</h3>
              <p className="card-text" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#7f8c8d' }}>
                We understand that good food should be enjoyed hot and fresh. That's why we guarantee
                all our pizzas will be delivered within 45 minutes of your order, or you get a refund.
                Our efficient delivery system ensures you get your pizza exactly when you want it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-5 border-top">
        <small className="text-muted">
          Copyrights © 2017 Pizzeria. All rights reserved
        </small>
      </footer>
    </div>
  )
}

export default Home
