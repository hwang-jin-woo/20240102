import {useNavigate} from "react-router-dom"
import "./css/mb.css";
import React, { useState } from 'react';
import Axios from 'axios';
import styled from "styled-components";
import AddressInput from "./AddressInput";
const Button=styled.button`
    width: 100%;
    padding: 21px 0 17px;
    border: 0;
    cursor: pointer;
    color: #fff;
    background-color:  rgb(55, 55, 198);
    pointer-events: ${props => props.disabled? 'none' : 'auto'};
    opacity : ${props => props.disabled? 0.5 : 1};
    font-size: 20px;
    font-weight: 400;
    font-family: Dotum,'돋움',Helvetica,sans-serif;
`
const DuplicateButton=styled.button`
    position: relative;
    left: 450px;
    bottom: 35px;
    font-size: 20px;
`
export function Mb(){
        const navigate = useNavigate();

        // 사용자 정보를 담을 상태 변수들
        const [userId, setUserId] = useState('');
        const [password, setPassword] = useState('');
        const [userName, setUserName] = useState('');
        const [userBirth, setUserBirth] = useState('');
        const [userGender, setUserGender] = useState('');
        const [userLocation, setUserLocation] = useState('');
        const [userPhone, setUserPhone] = useState('');  
        const [postCode, setPostCode] = useState('');
        const [address, setAddress] = useState('');
        const [detailAddress, setDetailAddress] = useState('');
        // 회원가입 버튼 클릭 시 실행되는 함수
        const handleRegister = () => {

            // 중복된 아이디인 경우 처리
        if (isDuplicate) {
            alert('이미 사용 중인 아이디입니다.');
            return;
            }    
            // 서버에 회원가입 요청을 보냄
            Axios.post('http://localhost:3301/api/register', {
            user_id: userId,
            user_pw: password,
            user_name: userName,
            user_birth: userBirth,
            user_gender: userGender,
            user_location: userLocation,
            user_phone_num: userPhone,
            is_admin: 0,
            postCode: postCode,  // 추가된 부분
            address: address,   // 추가된 부분
            detailAddress: detailAddress,  // 추가된 부
            })
            .then((response) => {
            // 회원가입 성공 시 처리
            alert("회원가입 성공");
            navigate('/home');
            // 회원가입 성공 후 리다이렉션 등 필요한 처리 추가
            })
            .catch((error) => {
            // 회원가입 실패 시 처리
            console.error('회원가입 오류:', error);
            });
        };

          // 중복 아이디 여부를 표시할 상태 변수
    const [isDuplicate, setIsDuplicate] = useState(true);

    // 아이디 중복 체크 함수
    const checkDuplicate = () => {
        Axios.post('http://localhost:3301/api/checkDuplicate', {
        user_id: userId,
        })
        .then((response) => {
        const { duplicate } = response.data;
        
        if(duplicate){
            alert('아이디 증복입니다. 다른 아이디를 사용해주세요');
        }else{
            setIsDuplicate(duplicate);
            alert('아이디 사용가능합니다.');
        }
        })
        .catch((error) => {
        console.error('아이디 중복 체크 오류:', error);
        });
    };      

return<>
        <div id="header">
            <span className="brand-icon">HP</span>
            <h2>병원 예약시스템</h2>
        </div>
        <div id="wrapper">
            <div id="content">
                <div>
                    <h3 className="join_title">
                        <label htmlFor="id">아이디</label>
                    </h3>
                    <span className="box int_id">
                        <input placeholder="아이디"type="text" id="id" onChange={(e) => setUserId(e.target.value)} className="int"  />                         
                        <span className="step_url"></span>
                        {/* 중복 체크 버튼 */}
                    <DuplicateButton type="button" onClick={checkDuplicate}>
                        중복 체크
                    </DuplicateButton>
                    </span>
                        {/* 중복된 아이디인 경우 경고 표시 */}
                        {isDuplicate && <span className="error_next_box">이미 사용 중인 아이디입니다.</span>}
                </div>
                <div>
                    <h3 className="join_title"><label htmlFor="pswd1">비밀번호</label></h3>
                    <span className="box int_pass">
                        <input placeholder="비밀번호"type="text" id="pswd1"onChange={(e) => setPassword(e.target.value)} className="int"  />
                        <span id="alertTxt">사용불가</span>
                    </span>

                </div>
                <div>
                    <h3 className="join_title"><label htmlFor="pswd2">비밀번호 재확인</label></h3>
                    <span className="box int_pass_check">
                        <input type="text" id="pswd2" className="int"  />
                    </span>

                </div>
                <div>
                    <h3 className="join_title"><label htmlFor="name">이름</label></h3>
                    <span className="box int_name">
                        <input type="text" id="name" onChange={(e) => setUserName(e.target.value)}className="int"  />
                    </span>

                </div>
                <div>
                    <h3 className="join_title"><label htmlFor="yy">생년월일</label></h3>
                    <div id="bir_wrap">
                        <div id="bir_yy">
                            <span className="box">
                                <input type="text" id="yy" onChange={(e) => setUserBirth(e.target.value)}className="int"  placeholder="년(4자)" />
                            </span>
                        </div>
                        <div id="bir_mm">
                            <span className="box">
                                <select id="mm" className="sel">
                                    <option>월</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>                                    
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </span>
                        </div>
                        <div id="bir_dd">
                            <span className="box">
                                <input type="text" id="dd" className="int"  placeholder="일" />
                            </span>
                        </div>
                    </div>
                    <span className="error_next_box"></span>    
                </div>
                <div>
                    <h3 className="join_title"><label htmlFor="gender">성별</label></h3>
                    <span className="box gender_code">
                        <select id="gender" className="sel" onChange={(e) => setUserGender(e.target.value)}>
                            <option>성별</option>
                            <option value="0">남자</option>
                            <option value="1">여자</option>
                        </select>                            
                    </span>
                    <span className="error_next_box">필수 정보입니다.</span>
                </div>
                <div>
                    <h3 className="join_title"><label htmlFor="name">주소</label></h3>
                    
                        <AddressInput 
                        postCode={postCode}
                        address={address} 
                        detailAddress={detailAddress}
                        setPostCode={setPostCode}
                        setAddress={setAddress}
                        setDetailAddress={setDetailAddress}
                        />
                        <input type="address" id="address" onChange={(e) => setUserLocation(e.target.value)}className="int"  />
                    
                    <span className="error_next_box"></span>
                </div>
                <div>
                    <h3 className="join_title"><label htmlFor="email">본인확인 이메일<span className="optional"></span></label></h3>
                    <span className="box int_email">
                        <input type="text" id="email" className="int"  placeholder="이메일을 입력해주세요" />
                    </span>
                    <span className="error_next_box">이메일 주소를 다시 확인해주세요.</span>   
                </div>
                <div>
                    <h3 className="join_title"><label htmlFor="phoneNo">휴대전화</label></h3>
                    <span className="box int_mobile">
                        <input type="tel" id="mobile" onChange={(e) => setUserPhone(e.target.value)}className="int"  placeholder="전화번호 입력" />
                    </span>
                </div>
                <div className="btn_area">
                    <Button type="submit"  onClick={handleRegister} disabled={isDuplicate}>
                        <span>가입하기</span>
                    </Button>
                </div>       
            </div> 
        </div> 
    </>
}