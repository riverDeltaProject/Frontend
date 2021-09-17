import React,{useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import backicon from "../assets/backicon.png";

const Restaurant = () => {
  const [data, setData] = useState([]);
  const serviceKey = "GNiCxJ1fY0ZfoZUxoHREWXQNKaQYT9g8t4nGfr%2FvfkA6A5msj3bQfRLVZFgQlhftS1wt9Hh6yJJ%2FH%2FeP%2BxMHpw%3D%3D"; // 서비스키 입력 

  const api = (code) =>{
    const areaCode = code;
    const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey=${serviceKey}&areaCode=${areaCode}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest`;
   
    setData([]);

    axios.get(url).then((res)=>{
      console.log("SUCCESS");
      setData(res.data.response.body.items.item);

      console.log(data)

      // subArea();
    })
  }

  // const subArea = ()=>{
  //   for (let index = 0; index < data.length; index++) {
  //     console.log(data);
  //   }
  // }
  
  return (
    <div>
      <Link to="./"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <h1 className="header2">위치설정</h1>
      <p className="normalfont">찾고 싶은 위치 및 장소를 입력하세요</p>
      <div className="btn_class">
        <form action="search.php" method="post">
          <input className="btn_text" type="text" />
          <input className="btn_submit" type="submit" value="SEARCH" />
       </form>
      </div>
      <p className="findingplace">광역시</p>
      <div className="containerList">
        <button className="itemList" onClick={()=>{api(1)}}>서울시</button>
        <button className="itemList" onClick={()=>{api(2)}}>인천시</button>
        <button className="itemList" onClick={()=>{api(3)}}>대전시</button>
      </div>
      <p className="findingplace">시/군/구</p>
      <div className="containerList2">
        <button className="itemList2">강남구</button>
        <button className="itemList2">강동구</button>
        <button className="itemList2">강서구</button>
      </div>
    </div>
  );
};

export default Restaurant;