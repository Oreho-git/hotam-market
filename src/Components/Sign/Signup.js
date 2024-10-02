import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../Utils/apiRequest';
import logo from '../../Styles/Pngs/hotam_logo.png';
import '../../Styles/CSS/Signup.css'; 

const Signup = () => {
    const GotoSignin = useNavigate();
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(''); 
    const [formData, setFormData] = useState({
        userName: '',
        nickName: '',
        email: '',
        loginId: '',
        loginPw: ''
    });

    const validate = () => {
        const errors = {};
        const validationRules = {
            userName: {
                rule: (value) => value.trim() !== '',
                message: '사용자 이름을 입력하세요.'
            },
            nickName: {
                rule: (value) => value.trim() !== '',
                message: '닉네임을 입력하세요.'
            },
            email: {
                rule: (value) => /\S+@\S+\.\S+/.test(value),
                message: '유효한 이메일 주소를 입력하세요.'
            },
            loginId: {
                rule: (value) => value.trim() !== '',
                message: '로그인 ID를 입력하세요.'
            },
            loginPw: {
                rule: (value) => value.length >= 6 && /[!@#$%^&*(),.?":{}|<>]/.test(value),
                message: '비밀번호는 최소 6자리 이상이며, 특수문자를 포함해야 합니다.'
            }
        };
        Object.keys(validationRules).forEach((field) => {
            const { rule, message } = validationRules[field];
            if (!rule(formData[field])) { //rule 함수가 false 일 경우 오류 message가 errors 객체에 바인딩  
                errors[field] = message; 
            }
        });

        return errors;
    };

    const changeHandler = (event) => {
        setFormData({
        ...formData,                                //기존 fromData 객체의 모든 필드를 복사 
        [event.target.name]: event.target.value     //event.target.value는 일반적으로 HTML 요소에서 발생한 이벤트에 대한 정보를 포함하는 Event Object에서 해당 이벤트를 발생시킨 HTML 요소의 값
        });                                         //ex [userName:"Admin"]
    }

    const SubmitHandler = async (event) => {
        event.preventDefaul();
        const valiidationErrors = validate();

        if(Object.keys(valiidationErrors).length>0){
            setErrors(valiidationErrors);
        }else {
            try{
                const response = await postRequest('',formData);
                setMessage('회원가입이 성공적으로 완료되었습니다!');
            }catch(error){
                console.error('회원가입중 장애가 발생하였습니다:', error);
                setMessage('회원가입중 장애가 발생하였습니다:'+ error.message);
            }
        }

    }

    return (
        <form onSubmit={SubmitHandler}>
            <div className="signup-container">
                <div className="logo-title-container">
                    <img src={logo} alt="로고" className='signup-logo'/>
                    <h4 className="signup-title">호탐마켓</h4>
                </div>
                <h3 className="signup-heading">회원가입</h3>
                <hr className="divider" />
                <div className="input-fields-container">
                <h2 className="signup-heading">성명</h2>
                <input
                    type="text"
                    value={formData.userName}
                    onChange={changeHandler}
                    name="userName"
                    placeholder="성명"
                    className='input-field'
                    /><br/>
                <h2 className="signup-heading">이메일</h2>
                <input
                    type="text"
                    value={formData.userE}
                    onChange={changeHandler}
                    name="email"
                    placeholder="이메일"
                    className='input-field'
                /><br/>
                <h2 className="signup-heading">닉네임</h2>
                <div className="nickname-container">
                    <input 
                    type="text"
                     value={formData.nickName}
                     onChange={changeHandler}
                     name=""
                     placeholder="닉네임"
                     className='input-field'
                    />
                  <button type="submit" className="submit-button-1">
                       중복확인
                  </button>
                </div>
                <h2 className="signup-heading">아이디</h2>
                <div className="nickname-container">
                <input
                    type="text"
                    value={formData.loginId}
                    onChange={changeHandler}
                    name="loginId"
                    placeholder="아이디"
                    className='input-field'
                    />
                    <button type="submit" className="submit-button-1">
                        중복확인
                    </button>
                </div>
                <h2 className="signup-heading">비밀번호</h2> 
                <h5 style={{ color: '#7a7a7a', fontWeight: 'normal', fontSize: '14px', marginTop: '0px', marginBottom: '5px' }}>
                    비밀번호는 최소 6자리 이상이며, 특수문자를 포함해야 합니다.
                </h5>
                <input
                    type="text"
                    value={formData.loginPw}
                    onChange={changeHandler}
                    name="loginPw"
                    placeholder="비밀번호"
                    className='input-field'
                    /><br/>
                <h1></h1>
               <button type="submit" className="submit-button-2">
                   회원가입
               </button>            
                </div>        
            </div>
        </form>
    );
    
};

export default Signup;
