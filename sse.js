const SSE = require("sse");

module.exports = (server) => {
  // 서버 객체 생성:
  const sse = new SSE(server);
  // 생성한 서버 객체에 connection이라는 이벤트 리스너를 연결한다. 클라이언트에 메시지를 보낼 때 이 객체를 사용한다:
  sse.on("connection", (client) => {
    // 서버센트이벤트 연결
    setInterval(() => {
      // 1초마다 클라이언트에 서버시간 timestamp를 보낸다:
      client.send(Date.now().toString());
    }, 1000);
  });
};
