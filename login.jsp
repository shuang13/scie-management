<%--
  Created by IntelliJ IDEA.
  User: _lixuan
  Date: 2017/4/15
  Time: 17:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <form action="/SCIEManagement/admin/login" method="post">
        <input type="text" name="username"/><br>
        <input type="password" name="password" /><br>
        <img id="img" src="kaptcha.jpg" name="kaptcha"/>
        <input type="text" name="verification"/><br>
        <input type="submit"/>
    </form>
</body>
</html>
