import check from "../../../../assets/check.svg";
import greencheck from "../../../../assets/check_green.svg";
import redxmark from "../../../../assets/xmark_red.svg";
import "./pricing.css";
export default function Pricing() {
  return (
    <>
      <div className="pricing" id="pricing">
        <div className="pricing_card basic">
          <div className="title">Basic</div>
          <h1>Free</h1>
          <div className="pricing_description">
            <img src={greencheck} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={redxmark} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={redxmark} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={redxmark} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
        </div>
        <div className="pricing_card enterprise">
          <div className="title ">Enterprise</div>
          <h1>$199</h1>
          <div>per year</div>
          <div className="pricing_description">
            <img src={check} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={check} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={check} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={check} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={check} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
        </div>
        <div className="pricing_card  premium">
          <div className="title ">Premium</div>
          <h1>$50</h1>
          <div>per month</div>
          <div className="pricing_description">
            <img src={greencheck} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={greencheck} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={greencheck} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={greencheck} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricing_description">
            <img src={redxmark} />
            <div className="property">Lorem ipsum dolor sit.</div>
          </div>
        </div>
      </div>
    </>
  );
}
