import {serviceKey} from './Key';
import axios from 'axios';


export const attList = async (areaCode, cityCode) => {
    const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${serviceKey}&contentTypeId=12&areaCode=${areaCode}&numOfRows=40&sigunguCode=${cityCode}&MobileOS=ETC&MobileApp=AppTest`;
    try {
        const {data: res} = await axios.get(url)
        const list = res.response.body.items.item;

        console.log("rendering!")
        return list
    } catch (err) {
        console.log(err);
    }
}
