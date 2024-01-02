import styled from "styled-components"
import "./css/admin.css";
import Login from "./Login";
import { useState,useEffect } from "react";
import { ModalContainer, ModalOverlay, ModalCloseBtn, ModalContent } from "./Modal";
import { Link } from "react-router-dom"
import Axios from 'axios';
const Container=styled.div`
  width: calc(100vw-10px);
  background-color:khaki ;
  button{
    cursor: pointer;
  }
`
const Footer=styled.div`
display: flex;
`
const Sidebar=styled.div`
  width: 10%;
  height: 900px;
  background-color: ffb4a2;
  li{    
    position: relative;
    text-align: center;
    top: 100px;
  }
  li a{
    color: black;
  }
  li a:hover{
    cursor: pointer;
    color:rgb(55, 55, 198);
  }
  h2{
    text-align: center;
  }
`
const Table=styled.table`
    width: 100%;
    border: 1px solid #444444;
    background-color: ffcdb2;
  th{
    background-color: lightsalmon;
  }
  th, td {
    border: 1px solid #444444;
    
  }
`
const Board=styled.div`
position: relative;
left: 200px;
`
const Button=styled.div`
position: relative;
left: 700px;
`

export function Admin(){
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  const [formData, setFormData] = useState({
    hp_name: '',
    hp_location: '',
    hp_time: '',
    hp_phone: '',
    hp_review: '',

  });

  const [posts, setPosts] = useState([]);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get('http://localhost:3301/api/hpinformation');
        setPosts(response.data);
      } catch (error) {
        console.error('게시글 불러오기 오류:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin === "true") {
      
      
      const finalFormData = {
        hp_name: formData.hp_name,
        hp_location: formData.hp_location,
        hp_time:formData.hp_location,
        hp_phone: formData.hp_phone, 
        hp_review: formData.hp_review, 
      };
      try {
        await Axios.post('http://localhost:3301/api/hpinformation/hp', finalFormData);
  
        setFormData({
          hp_name: '',
          hp_location: '',
          hp_time: '', 
          hp_phone: '', 
          hp_review: '', 
        });
  
        // 게시글을 추가한 후 목록을 다시 불러와서 화면에 갱신
        const response = await Axios.get('http://localhost:3301/api/hpinformation');
        setPosts(response.data);
  
        console.log('게시글이 성공적으로 추가되었습니다.');
        alert('게시글 추가 성공');
      } catch (error) {
        console.error('게시글 추가 오류:', error);
      }
    } else {
      // 로그인 상태 아닐 경우
      alert("로그인 plz");
    }
  };

  const handleDelete = async (hpif) => {
    try {
      await Axios.delete(`http://localhost:3301/api/hpinformation/delete/${hpif}`);
  
      // 게시글을 삭제한 후 목록을 다시 불러와서 화면에 갱신
      const response = await Axios.get('http://localhost:3301/api/hpinformation');
      setPosts(response.data);
  
      console.log('게시글이 성공적으로 삭제되었습니다.');
      alert('게시글 삭제 성공');
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
    }
  };

  const [selectedPost, setSelectedPost] = useState(null);

  const handleUpdateClick = (formData) => {
    // 선택한 게시글의 정보를 폼 데이터에 설정
    setFormData({
      hp_name: formData.hp_name,
      hp_location: formData.hp_location,
      hp_time: formData.hp_time,
      hp_phone: formData.hp_phone,
      hp_review: formData.hp_review,
      
      // 다른 필드도 필요에 따라 추가
    });

    // 선택한 게시글의 ID를 저장하여 업데이트 시 사용
    setSelectedPost(formData);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const finalFormData = {
      hp_name: formData.hp_name,
      hp_location: formData.hp_location,
      hp_time: formData.hp_time,
      hp_phone: formData.hp_phone,
      hp_review: formData.hp_review,
    };
    
    console.log('Sending update request:', finalFormData);
    
    try {
      await Axios.put(`http://localhost:3301/api/hpinformation/${selectedPost.hpif}`, finalFormData);
    
      // 게시글을 업데이트한 후 목록을 다시 불러와서 화면에 갱신
      const response = await Axios.get('http://localhost:3301/api/hpinformation');
      setPosts(response.data);
    
      // 선택한 게시글 정보 초기화
      setSelectedPost(null);
      setFormData({
        hp_name: '',
        hp_location: '',
        hp_time:'', 
        hp_phone:'', 
        hp_review:'', 

      });
    
      console.log('게시글이 성공적으로 업데이트되었습니다.');
      alert('게시글 업데이트 성공');
    } catch (error) {
      console.error('게시글 업데이트 오류:', error);
    }
  };
  
  

  function handleCancle() {
    setSelectedPost(null);
    setFormData({
      hp_name: '',
      hp_location: '',
      hp_time:'',
      hp_phone:'',
      hp_review:'',
      // 다른 필드도 초기화
    });
  };
  function formatDate(dateString) {
    if (!dateString) {
      return ''; // dateString이 비어있는 경우 빈 문자열 반환
    }
    const date = new Date(dateString);   
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
  }





//멤버 불러오기
  const [member, setmember] = useState('');

  function memberLoading() {
    // 서버의 API를 호출하여 데이터 가져오기
    fetch('http://localhost:3301/api/member') // 백엔드 서버 주소를 사용
    .then((response) => response.json())
    .then((data) => {
      setmember(data);
      
    })
    .catch((error) => {
    });
  }

  useEffect(() => {
    memberLoading();
  }, [member]);

  return<>
      <Container>
      <h1>관리자 페이지</h1>
      <Board>
          <form onSubmit={handleSubmit}>
<label>
  병원이름:
  <input type="text" name="hp_name" value={formData.hp_name} onChange={handleInputChange} />
</label>
<label>
  병원위치:
  <textarea name="hp_location" value={formData.hp_location} onChange={handleInputChange} />
</label>
<label>
  병원시간:
  <textarea name="hp_time" value={formData.hp_time} onChange={handleInputChange} />
</label>
<label>
  병원전화번호:
  <textarea name="hp_phone" value={formData.hp_phone} onChange={handleInputChange} />
</label>
<label>
  병원리뷰:
  <textarea name="hp_review" value={formData.hp_review} onChange={handleInputChange} />
</label>
<button type="submit">게시글 추가</button>
            </form>
            <form onSubmit={selectedPost && handleUpdate}>
                {selectedPost && (
                  <>
                  <Button>
                    <button type="button" onClick={handleCancle}>
                      취소
                    </button>
                    <button type="button" onClick={handleUpdate}>
                      게시글 업데이트
                    </button>
                    </Button>                
                  </>
                )}
              </form>
              </Board>  
      {
    modalOpen1 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen1(false)}/>    
        <ModalContent>
        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>비밀번호</th>
              <th>회원이름</th>
              <th>성별</th>
              <th>회원전화번호</th>
              <th>회원생년월일</th>
              <th>회원주소</th>
              <th>관리자</th>
              <th>주소번호</th>
              <th>주소</th>
              <th>상세주소</th>
            </tr>
          </thead>
          <tbody>
            {member && member.length > 0 && member.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.user_id}</td>
                <td>{item.user_pw}</td>
                <td>{item.user_name}</td>
                <td>{item.user_gender.data==0?'남자':'여자'}</td>
                <td>{item.user_phone}</td>
                <td>{formatDate(item.user_birth)}</td>
                <td>{item.user_location}</td>
                <td>{item.is_admin==1?'관리자':'일반'}</td>
                <td>{item.postCode}</td>
                <td>{item.address}</td>
                <td>{item.detailAddress}</td>
              </tr>
            ))}
          </tbody>
        </Table>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen1(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen2 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen2(false)}/>    
        <ModalContent>
        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>병원이름</th>
              <th>병원위치</th>
              <th>병원시간</th>
              <th>병원전화번호</th>
              <th>병원리뷰</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
          {posts.map((post,index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{post.hp_name}</td>
                <td>{post.hp_location}</td>
                <td>{post.hp_time}</td>
                <td>{post.hp_phone}</td>
                <td>{post.hp_review}</td>
                <td>
                  <button onClick={() => handleDelete(post.hpif)}>삭제</button>
                  <button onClick={() => handleUpdateClick(post)}>수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen2(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    
        <main>
        <Login isLogin={isLogin} setIsLogin={setIsLogin} userId={userId} setUserId={setUserId} password={password} setPassword={setPassword} />
              <section >
                <Sidebar>
                  <h2>관리자</h2>
                  <ul>
                    <li><Link to="/admin"onClick={() => setModalOpen1(true)}>회원정보</Link></li>
                    <li><Link to="/admin"onClick={() => setModalOpen2(true)}>병원정보</Link></li>
                    <li><Link to="/faq">게시판수정</Link></li>
                  </ul>
                </Sidebar>
              </section>
          </main>
          <Footer>
    <ul>
        <li><Link to='https://cocoder.tistory.com' target='_blank'>Blog</Link> </li>
        <li><Link to='https://github.com/hwang-jin-woo/' target='_blank'>Github</Link></li>
    </ul>
    <p>
        <span>저자 : 황진우</span><br/>
        <span>이메일 : hjinu91@naver.com</span><br/>
        <span>Copyright 2023. copy. All Rights Reserved.</span>
    </p>
</Footer>
    </Container>  
  </>
}