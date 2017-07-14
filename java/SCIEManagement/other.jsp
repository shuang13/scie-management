<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>CMS PLUS 后台管理系统</title>

    <!-- Bootstrap -->
    <link href="http://202.202.43.6/assets/bootstrap/css/bootstrap.css" rel="stylesheet">
    <!-- theme -->
    <link href="http://202.202.43.6/css/theme.css" rel="stylesheet">
    <link href="http://202.202.43.6/assets/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="http://202.202.43.6/lib/jquery.min.js"></script>
    <script>var path='http://202.202.43.6/';</script>
    <script src="http://202.202.43.6/js/json.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="http://202.202.43.6/assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="http://202.202.43.6/lib/layer/layer.js"></script>
    <script src="http://202.202.43.6/lib/jquery.validate.min.js"></script>
    <script src="http://202.202.43.6/lib/jquery.form.js"></script>
    <script src="http://202.202.43.6/js/appUtils.js"></script>
    <script src="http://202.202.43.6/js/app.js"></script>
</head>
<body>
<header class="main-header">
    <nav class="navbar navbar-static-top">
        <div class="logo">CMS PLUS</div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="/" target="_blank">网站首页</a> </li>
                <li><a href="javascript:void(0);" onclick="app.clearAllCache()">全站更新</a> </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">您好，admin <span class="caret"></span>&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="/admin/home/password">修改密码</a></li>
                        <li><a href="/admin/home">修改个人信息</a></li>
                        <li class="divider"></li>
                        <li><a href="/admin/logout">退出系统</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </nav>
</header>

<div class="main-sidebar">
    <!-- Sidebar Menu -->

    <ul class="sidebar-menu">
        <li><a href="/admin/cate">栏目管理</a></li>
        <li><a href="/admin/sys?g=1">配置管理</a></li>
        <li><a href="/admin/sys/group">配置设置</a></li>
        <li><a href="http://202.202.43.6/admin/copyfrom">来源管理</a></li>
        <li><a href="http://202.202.43.6/admin/user">管理员管理</a></li>
        <li><a href="http://202.202.43.6/admin/doc">内容管理</a></li>
        <li><a href="http://202.202.43.6/admin/link">友情链接</a></li>
    </ul>
    <!-- /.sidebar-menu -->

    <!-- /.sidebar -->
</div><!-- /.main-sidebar --><div class="content-wrapper">
    <link rel="stylesheet" href="http://202.202.43.6/kindeditor/themes/default/default.css" />
    <script charset="utf-8" src="http://202.202.43.6/kindeditor/kindeditor-min.js"></script>
    <script charset="utf-8" src="http://202.202.43.6/kindeditor/lang/zh_CN.js"></script>    <section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header">
                    <a href="/admin/cate" class="btn btn-default btn-xs">管理栏目</a>
                    <a href="/admin/cate/create/doc"
                       class="btn btn-xs btn-primary ">添加栏目</a>
                    <a href="/admin/cate/create/page"
                       class="btn btn-xs  btn-default ">添加单网页</a>
                    <a href="/admin/cate/create/link"
                       class="btn btn-xs  btn-default ">添加外部链接</a>
                    <a href="/admin/cate/cache" class="btn btn-default btn-xs">更新栏目缓存</a>
                    <a href="/admin/cate/count" class="btn btn-default btn-xs">重新统计栏目数据</a>
                </div>
                <div class="box-body">

                    <form method="post" id="create_cate" action="http://202.202.43.6/admin/cate/store">
                        <input type="hidden" name="type" value="doc">
                        <table class="table table-condensed table-2line">
                            <tr>
                                <td>栏目文档模型:</td>
                                <td>
                                    <select class="form-control input-sm" name="model_id">
                                        <option value="1">文档模型</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>上级栏目:</td>
                                <td>
                                    <select class="form-control input-sm" name="pid">
                                        <option value="0">= 作为一级栏目 =</option>
                                        <option value="1">学院概况</option>
                                        <option value="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--学院简介</option>
                                        <option value="3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--学院领导</option>
                                        <option value="4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--组织机构</option>
                                        <option value="5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--学科专业</option>
                                        <option value="6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--历史沿革</option>
                                        <option value="7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--新闻快讯</option>
                                        <option value="57">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--通知公告</option>
                                        <option value="8">师资队伍</option>
                                        <option value="9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--教授</option>
                                        <option value="10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--副教授</option>
                                        <option value="11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--讲师</option>
                                        <option value="12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--实验师</option>
                                        <option value="13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--工程师</option>
                                        <option value="14">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--高级工程师</option>
                                        <option value="15">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--研究生导师</option>
                                        <option value="16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--博士生导师</option>
                                        <option value="17">科学研究</option>
                                        <option value="18">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--科研平台</option>
                                        <option value="19">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--科研团队</option>
                                        <option value="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--科研成果</option>
                                        <option value="21">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--成果转化</option>
                                        <option value="22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--学术活动</option>
                                        <option value="23">本科生教育</option>
                                        <option value="24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--本科教育概况</option>
                                        <option value="25">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--专业与建设</option>
                                        <option value="26">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--学生选课指南</option>
                                        <option value="27">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--学生学籍指南</option>
                                        <option value="28">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--实践教学</option>
                                        <option value="29">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--学生科技活动</option>
                                        <option value="30">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--教育教学研究</option>
                                        <option value="31">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--教育运行管理</option>
                                        <option value="32">研究生教育</option>
                                        <option value="33">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--研究生教育概况</option>
                                        <option value="34">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--全日制硕士生培养方案</option>
                                        <option value="35">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--在职工程硕士培养方案</option>
                                        <option value="36">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--导师团队</option>
                                        <option value="37">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--研究生招生信息</option>
                                        <option value="38">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--研究生管理平台</option>
                                        <option value="59">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--研究生课程网站</option>
                                        <option value="39">留学生教育</option>
                                        <option value="40">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--留学本科生</option>
                                        <option value="41">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--留学研究生</option>
                                        <option value="42">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--文化生活</option>
                                        <option value="43">校园生活</option>
                                        <option value="44">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--本科生活动</option>
                                        <option value="45">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--研究生活动</option>
                                        <option value="46">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--教工活动</option>
                                        <option value="61">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--师生服务平台</option>
                                        <option value="47">对外合作</option>
                                        <option value="48">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--产学研合作</option>
                                        <option value="49">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--国际交流与合作</option>
                                        <option value="50">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--培训服务</option>
                                        <option value="51">校友之窗</option>
                                        <option value="52">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--学院简报</option>
                                        <option value="53">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--校友风采</option>
                                        <option value="54">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--历届领导</option>
                                        <option value="55">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--退休教师</option>
                                        <option value="56">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--校友联谊</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>栏目名称:</td>
                                <td><input type="text" class="form-control" name="title"></td>
                            </tr>
                            <tr>
                                <td>英文名称:</td>
                                <td><input type="text" class="form-control" name="name"></td>
                            </tr>
                            <tr>
                                <td class="text-right">封面:</td>
                                <td>
                                    <div class="upload">
                                        <input class="form-control pull-left" type="text" name="cover" id="cover" value="" readonly="readonly" />
                                        <input type="button" id="uploadButton" value="选择封面图" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>是否显示栏目:</td>
                                <td><label class="checkbox-inline">
                                    <input type="radio" name="display" value="1" checked> 是
                                </label>
                                    <label class="checkbox-inline">
                                        <input type="radio" name="display" value="0"> 否
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>是否导航显示:</td>
                                <td><label class="checkbox-inline">
                                    <input type="radio" name="nav" value="1" checked> 是
                                </label>
                                    <label class="checkbox-inline">
                                        <input type="radio" name="nav" value="0"> 否
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>是否允许投稿:</td>
                                <td><label class="checkbox-inline">
                                    <input type="radio" name="publish" value="1"> 是
                                </label>
                                    <label class="checkbox-inline">
                                        <input type="radio" name="publish" value="0" checked> 否
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>是否允许评论:</td>
                                <td><label class="checkbox-inline">
                                    <input type="radio" name="comment" value="1"> 是
                                </label>
                                    <label class="checkbox-inline">
                                        <input type="radio" name="comment" value="0" checked> 否
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>审稿:</td>
                                <td><select name="check_level" class="form-control">
                                    <option value="0">不需审核</option>
                                    <option value="1">一级审核</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>栏目首页模版:</td>
                                <td>
                                    <select class="form-control input-sm" name="template_index">
                                        <option value="home.doc_index">home.doc_index(默认栏目首页模版)</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>栏目列表页模版:</td>
                                <td>
                                    <select class="form-control input-sm" name="template_list">
                                        <option value="home.doc_list">home.doc_list(默认栏目列表页模版)</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>内容页模版:</td>
                                <td>
                                    <select class="form-control input-sm" name="template_detail">
                                        <option value="home.doc_detail">home.doc_detail(默认栏目详情页模版)</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>SEO标题:</td>
                                <td>
                                    <textarea name="meta_title" class="form-control tb-400-wh"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>SEO关键词:</td>
                                <td>
                                    <textarea name="meta_keywords" class="form-control tb-400-wh"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>SEO描述:</td>
                                <td>
                                    <textarea name="meta_description" class="form-control tb-400-wh"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>内容:</td>
                                <td><textarea name="content" id="content"
                                              style="width: 700px; height: 350px;"></textarea></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button class="btn btn-success" type="submit">确认添加</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                    <script>
                        $($('#create_cate').validate({
                            rules: {
                                title: {
                                    required: true,
                                    maxlength: 30
                                },
                                name: {
                                    required: true,
                                    chrnum: true,
                                    maxlength: 30,
                                    remote: {
                                        url: '/admin/cate/check',
                                        type: 'post'
                                    }
                                }
                            },
                            messages: {
                                title: {
                                    required: '请填写栏目名称',
                                },
                                name: {
                                    required: '请填写栏目英文名称'
                                }
                            }
                        }));
                    </script>

                </div>
            </div>
        </div>
    </div>
</section>
    <script>
        app.uploadFile('#uploadButton','#cover','image');
        app.kindeditor('#content');

    </script>
</div>

</body>
</html>