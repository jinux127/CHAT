var socket = io()

/* 접속 되었을 때 실행 */
socket.on('connect', function() {

  var name = prompt('반갑습니다!','')
  
  if(!name){
      name = '익명'
  }

  socket.emit('newUser' ,name)
})

socket.on('update', function(data){

  var chat = document.getElementById('chat')

  var message = document.createElement('div')
  var node = document.createTextNode(`${data.name}: ${data.message}`)
  var className = ''

  console.log(data.type)
  
  // 타입에 따라 적용할 클래스를 다르게 지정
  switch(data.type) {
    case 'message':
      className = 'other'
      break

    case 'connect':
      className = 'connect'
      break

    case 'disconnect':
      className = 'disconnect'
      break
  }

  message.classList.add(className)
  message.appendChild(node)
  chat.appendChild(message)
})

/* 전송 함수 */


function send() {
  // 입력되어있는 데이터 가져오기
  var message = document.getElementById('msg').value
  
  // 가져왔으니 데이터 빈칸으로 변경
  document.getElementById('msg').value = ''

  var chat = document.getElementById('chat')
  var msg = document.createElement('div')
  var node = document.createTextNode(message)
  msg.classList.add('me')
  msg.appendChild(node)
  chat.appendChild(msg)

  // 서버로 send 이벤트 전달 + 데이터와 함께
  socket.emit('message', {type: 'message', message: message})
}

function enterkey() {
  if (window.event.keyCode == 13) {

       // 엔터키가 눌렸을 때 실행할 내용
       send();
  }
}