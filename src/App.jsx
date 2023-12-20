import { useEffect, useState } from "react";
import "./App.css";
import Icon from "./Components/Icon.jsx";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineMyLocation } from "react-icons/md";
import {
  IoCalendarOutline,
  IoSunnyOutline,
  IoRainyOutline,
} from "react-icons/io5";
import { FaWind } from "react-icons/fa6";

import axios from "axios";

import Modal from "./Components/Modal.jsx";

function App() {
  const [reqCity, setReqCity] = useState();

  const [city, setCity] = useState();
  const [condition, setCondition] = useState();
  const [conditionIcon, setConditionIcon] = useState();
  const [date, setDate] = useState();
  const [temp, setTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [windK, setWindK] = useState();
  const [windDeg, setWindDeg] = useState();
  const [uvIndex, setUVIndex] = useState();

  const [cityError, setCityError] = useState(false);

  async function getData(request) {
    const res = await axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=ee11d507ce7743c5a7564546231312&q=${request}`,
      )
      .then((response) => response.data)
      .catch(() => {
        setCityError(true);
      });

    if (cityError) {
      return;
    } else {
      setCity(res.location.name + ", " + res.location.region);
      setCondition(res.current.condition.text);
      setConditionIcon(res.current.condition.icon);

      const tempDate = res.location.localtime;
      setDate(tempDate.split(" "));

      setTemp(res.current.temp_c);
      setHumidity(res.current.humidity);
      setWindK(res.current.wind_kph);
      setWindDeg(res.current.wind_degree);
      setUVIndex(res.current.uv);
    }
  }

  useEffect(() => {
    getData("marivan");
  }, []);

  const closeModal = () => {
    setCityError(false);
  };

  return (
    <>
      {cityError && (
        <Modal
          key={Math.floor(Math.random() * 1000)}
          close={closeModal}
          title={"Enter City Name"}
          desc={"Please enter the city name correctly!"}
        />
      )}
      <div className="container">
        <div className="inputs box-style">
          <input
            type="text"
            value={reqCity}
            onChange={(e) => setReqCity(e.target.value)}
            onKeyDown={(e) => (e.key == "Enter" ? getData(reqCity) : null)}
          />
          <button onClick={() => getData(reqCity)}>check</button>
        </div>
        <div className="city-info box-style">
          <div className="city-info-header">
            <span>
              <MdOutlineMyLocation />
              {city && city}
            </span>
            <p>{date && date[1]}</p>
          </div>
          <div className="city-info-data">
            <img src={conditionIcon} height="150%" />
            <div>
              <p className="temp">{temp && temp}</p>
              <p>{condition && condition}</p>
            </div>
          </div>
          <div className="city-info-date">
            <IoCalendarOutline /> <p>{date && date[0]}</p>
          </div>
        </div>
        <div className="other-city-info box-style">
          <Icon title="Humidity" number={humidity}>
            <WiHumidity color="#7a34e2" />
          </Icon>
          <Icon title="Wind Speed" number={windK}>
            <FaWind color="#7a34e2" />
          </Icon>
          <Icon title="Wind Degree" number={windDeg}>
            <IoRainyOutline color="#7a34e2" />
          </Icon>
          <Icon title="UV Index" number={uvIndex}>
            <IoSunnyOutline color="#7a34e2" />
          </Icon>
        </div>
      </div>
    </>
  );
}

export default App;
