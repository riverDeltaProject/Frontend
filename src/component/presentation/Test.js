import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    const serviceKey = "GNiCxJ1fY0ZfoZUxoHREWXQNKaQYT9g8t4nGfr%2FvfkA6A5msj3bQfRLVZFgQlhftS1wt9Hh6yJJ%2FH%2FeP%2BxMHpw%3D%3D"; // 서비스키 입력 
    const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey=${serviceKey}&MobileOS=ETC&MobileApp=AppTest`;

    const api = () =>{
      axios.get(url).then((res)=>{
        setData(res.data);
        console.log("SUCCESS");
        console.log(res.data);
      })
    }

    return(
      <div onClick={api}>aaa</div>
    )
};

export default Home;