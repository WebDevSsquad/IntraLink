import connection from "/assets/connection.svg";
import money from "/assets/money_2.svg";
import organizing from "/assets/organizing.svg";
import "./services.css";
export default function Services() {
  const curve = (
    <div className="custom-shape-divider-top-1703199501">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          className="shape-fill"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          className="shape-fill"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          className="shape-fill"
        ></path>
      </svg>
    </div>
  );
  const blob1 = (
    <svg
      id="sw-js-blob-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="blob1"
    >
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop
            id="stop1"
            stopColor="rgba(46.744, 180.733, 187.906, 1)"
            offset="0%"
          ></stop>
          <stop
            id="stop2"
            stopColor="rgba(210.281, 249.698, 255, 1)"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M25.2,-29C33.2,-23.2,40.7,-15.9,42.8,-7.1C44.8,1.6,41.3,11.7,35.9,20.4C30.5,29.2,23.2,36.5,14.2,40.2C5.2,44,-5.4,44.2,-15.1,40.9C-24.7,37.6,-33.2,30.8,-37,22.3C-40.7,13.8,-39.8,3.5,-37.7,-6.4C-35.7,-16.3,-32.6,-25.7,-26.1,-31.8C-19.7,-37.8,-9.8,-40.5,-0.6,-39.7C8.6,-38.9,17.1,-34.8,25.2,-29Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        strokeWidth="0"
        style={{ transition: "all 0.3s ease 0s" }}
        stroke="url(#sw-gradient)"
      ></path>
    </svg>
  );
  const blob3 = (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="blob3">
      <path
        fill="#BAE6FF"
        d="M41.4,-63.1C50.8,-58.3,53.7,-42.1,58,-27.9C62.2,-13.7,67.9,-1.6,70.9,13.5C73.9,28.7,74.4,46.7,65.4,56.2C56.5,65.6,38.1,66.5,21.5,69.7C4.9,73,-10,78.8,-23.4,76.4C-36.9,73.9,-48.9,63.4,-53.4,50.6C-57.9,37.7,-54.9,22.6,-53.3,9.9C-51.6,-2.8,-51.3,-13.1,-48.6,-23.4C-45.8,-33.8,-40.5,-44.3,-32,-49.5C-23.5,-54.7,-11.7,-54.5,2.1,-57.8C16,-61.1,31.9,-67.8,41.4,-63.1Z"
        transform="translate(100 100)"
      />
    </svg>
  );
  const endcurve = (
    <div className="custom-shape-divider-bottom-1703203263">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
          className="shape-fill"
        ></path>
      </svg>
    </div>
  );
  return (
    <>
      <div className="services " id="services">
        {curve}
        {blob1}
        {blob3}
        <div className="card card1">
          <img src={organizing} />
          <h1>Organizing</h1>
          <div className="card_description">
            IntraLink empowers your business with seamless organization and
            efficient employee tracking, fostering a productive and harmonious
            workspace.
          </div>
        </div>
        <div className="card card2">
          <img src={connection} />
          <h1>Connection</h1>
          <div className="card_description">
            IntraLink fosters a dynamic environment, enabling seamless
            connections with your employees and clients, enhancing collaboration
            and communication for optimal business growth.
          </div>
        </div>
        <div className="card card3">
          <img src={money} />
          <h1>Profits</h1>
          <div className="card_description">
            IntraLink propels your business towards exponential growth and
            profit enhancement, serving as a catalyst for your enterprise&apos;s
            success and expansion.
          </div>
        </div>
        {endcurve}
      </div>
    </>
  );
}
