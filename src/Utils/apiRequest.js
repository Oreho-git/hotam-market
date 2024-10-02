/**
 * apiRequest.js
 *
 * Fetch API를 사용하여 비동기 HTTP 요청(POST)을 간단하게 처리할 수 있는 함수
 * 
 * 제공되는 함수:
 * - postRequest: JSON 데이터를 포함하여 지정된 엔드포인트로 POST 요청을 보낸다.
 * 
 * 이 함수들은 공통 헤더(예: 'Content-Type: application/json')를 처리하며, 추가적인 헤더나 기본 URL 설정이 
 * 필요할 경우 확장하여 사용한다.
 * 
 * 파라미터에 대하여:
 * endpoint: 호출할 경로
 * data:     param으로 받는 데이터, json의 형태
 * headers:  추가로 설정할 헤더 (선택 사항)
 * 
 * 사용법:
 * 필요한 함수를 임포트한 후, 필요한 매개변수와 함께 호출
 * 예시:
 *   import { postRequest } from './apiRequest';
 *   postRequest('/api/register', { username: 'JohnDoe', password: 'password123' });
 */




async function handleResponse(params) {
    if(params.ok){
        return await params.json();
    } else {
        const errorData = await params.json();
        throw new Error(errorData.message || 'Request failed');
    }
}


function handleError(error){
    console.error('API 요청이 실패하였습니다:', error);
    throw error;
}

export async function postRequest(endpoint, data = {}, headers ={}) {
    try{
        const response = await fetch(`${endpoint}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data)
        });
        return await handleResponse(response);
    }catch(error){
        handleError(error);
    }
}