import axios from 'axios';

const result = await axios.get('https://info.korea.ac.kr/info/board/notice_under.do');

console.log(result);