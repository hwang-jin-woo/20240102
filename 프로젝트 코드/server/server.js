const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());

// 데이터베이스 연결
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'marinere!!23',
  database: '',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ' + err.message);
  } else {
    console.log('MySQL 데이터베이스에 연결되었습니다.');
  }
});

// JSON 파싱을 위한 미들웨어 등록
app.use(bodyParser.json());

// 라우트 모듈들을 분리하여 가져옵니다.
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const userInfoUpdateRouter = require('./routes/userInfoUpdate');
const checkDuplicateRouter = require('./routes/checkDuplicate');
const boardRouter = require('./routes/board');
const reservationRouter = require('./routes/reservation');
const reservationUpdateRouter = require('./routes/reservationUpdate');
const reservationMemberRouter = require('./routes/reservationMember');
const hpinformationRouter = require('./routes/hpinformation');
const memberRouter = require('./routes/member');
const favoritehpRouter = require('./routes/favoritehp');
const popularhpRouter = require('./routes/popularhp');
const distancehpRouter = require('./routes/distancehp');






// 라우트 모듈들을 사용합니다.
app.use('/api/register', registerRouter); 
app.use('/api/login', loginRouter);
app.use('/api/userupdate', userInfoUpdateRouter);
app.use('/api/checkDuplicate', checkDuplicateRouter);
app.use('/api/board', boardRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/reservationUpdate', reservationUpdateRouter);
app.use('/api/reservationMember', reservationMemberRouter);
app.use('/api/hpinformation', hpinformationRouter);
app.use('/api/member', memberRouter);
app.use('/api/favoritehp', favoritehpRouter);
app.use('/api/popularhp', popularhpRouter);
app.use('/api/distancehp', distancehpRouter);



// 검색 엔드포인트
app.get('/api/hpinformation', (req, res) => {
  const keyword = req.query.keyword;

  // 검색어가 없을 경우 빈 배열 반환
  if (!keyword) {
    res.json([]);
    return;
  }

  // 검색어가 있을 경우 해당 키워드와 일치하는 데이터만 반환
  const query = `
    SELECT *
    FROM hpinformation
    WHERE LOWER(hp_name) LIKE LOWER('%${keyword}%')
      OR LOWER(hp_location) LIKE LOWER('%${keyword}%');
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('검색 쿼리 실행 중 오류:', error);
      res.status(500).json({ error: '내부 서버 오류' });
    } else {
      res.json(results);
    }
  });
});





// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '내부 서버 오류' });
});

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
