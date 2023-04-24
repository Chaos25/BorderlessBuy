import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function AirplaneAnimation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main page after 5 seconds
    const timeoutId = setTimeout(() => {
      navigate("/MainPage");
    }, 5000);

    return () => {
      // Clear timeout on unmount
      clearTimeout(timeoutId);
    };
  }, [navigate]);


  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet"></link>

        <div className="animation1">
          <svg className="svgmain" width="512px" height="512px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path className="monkey" fill="#fff" stroke="red" d="M9.16109 12.9424L2.91109 12.4324C2.42109 12.3124 2.35109 11.6724 2.80109 11.4624L20.7111 3.55243C21.1811 3.34243 21.6711 3.81243 21.4411 4.25243L13.0111 21.2124C12.7811 21.6424 12.1211 21.5724 12.0011 21.1124L11.1711 13.2124L18.4411 6.41243" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
        <div className="animation2">
          <svg viewBox="0 0 1320 300">
            <text x="50%" y="50%" dy=".35em" text-anchor="middle">
              BorderlessBuy
            </text>
          </svg>
        </div>


    </>
  );
}

