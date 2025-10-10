import ingredients from '../assets/images/ingredients.png'
import chef from '../assets/images/chef.png'
import meter from '../assets/images/meter.png'
function Home() {
  
    
  return (
        <div className="container mt-4">

      {/* Our Story */}
      <h2 className="text-center mb-4">Our story</h2>
      <p className="text-start ">
        We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page.
        Fans were given situations where they had to come up with wacky and fun excuses. The person
        with the best excuse won the Best Excuse Badge and won Pizzeria’s vouchers. Their enthusiastic
        response proved that Pizzeria’s Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
      </p>
      <p className="text-start ">
        Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist the
        softest, cheesiest, crunchiest, butteriest Domino’s Fresh Pan Pizza. They have been leaving the
        stage in the middle of a performance and even finding excuses to be disqualified in a football match.
      </p>
      <p className="text-start ">
        We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations
        where they had to come up with wacky and fun excuses. The person with the best excuse won the Best
        Excuse Badge and won Domino’s vouchers. Their enthusiastic response proved that Pizzeria’s Fresh Pan
        Pizza is the Tastiest Pan Pizza. Ever!
      </p>

      
      <div className="row my-5 align-items-center">
        <div className="col-md-6">
          <img
            src={ingredients}
            alt="Ingredients"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h3 className="text-start ">Ingredients</h3>
          <p className="text-start ">
            We’re ruthless about goodness. We have no qualms about tearing up a day-old lettuce leaf
            (straight from the farm), or steaming a baby (carrot). Cut. Cut. Chop. Chop. Steam. Steam.
            Stir. Stir. While they’re still young and fresh - that’s our motto. It makes the kitchen
            a better place.
          </p>
        </div>
      </div>

      {/* Our Chefs Section */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6 order-md-2">
          <img
            src={chef}
            alt="Chef"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h3 className="text-start ">Our Chefs</h3>
          <p className="text-start ">
            They make sauces sing and salads dance. They create magic with skill, knowledge, passion,
            and stirring spoons (among other things). They make goodness so good, it doesn’t know what
            to do with itself. We do though. We send it to you.
          </p>
        </div>
      </div>

     
      <div className="row my-5 align-items-center">
        <div className="col-md-6">
          <img
            src={meter}
            alt="Delivery Timer"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h3 className="text-start ">45 min delivery</h3>
        </div>
      </div>

      
      <footer className="text-center py-3 mt-5 border-top">
        <small className="text-muted">
          Copyrights © 2017 Pizzeria. All rights reserved
        </small>
      </footer>
    </div>
  )
}

export default Home