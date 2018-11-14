define({ "api": [
  {
    "type": "get",
    "url": "/award/awardsAdd",
    "title": "添加奖项",
    "name": "____",
    "group": "admin",
    "version": "1.0.0",
    "description": "<p>添加奖项</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  status: 200,\n  message: '查询成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200\n{\n status: 0,\n message: '查询失败',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/award.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/user/lotteryOpen",
    "title": "打开抽奖奖项开关",
    "name": "________",
    "group": "admin",
    "version": "1.0.0",
    "description": "<p>打开抽奖奖项开关</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  status: 200,\n  message: '更新成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200\n{\n status: 0,\n message: '更新失败',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/user.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "登录",
    "name": "__",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>用户登录</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  status: 200,\n  message: 'success',\n  data: {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200\n{\n status: 0,\n message: '查询失败',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/user.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/user/info",
    "title": "用户信息",
    "name": "____",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>获取用户信息</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  status: 200,\n  message: 'success',\n  data: {\"avatar\":\"/public/img/avatar.jpg\",\"hadPrize\":false,\"username\":\"94club\",\"role\":0,\"createTime\":\"2018/11/10 14:24:25\",\"id\":1}}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200\n{\n status: 0,\n message: '查询失败',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/user.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/user/logout",
    "title": "用户登出",
    "name": "____",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>用户登出</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  status: 200,\n  message: 'success'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200\n{\n status: 0,\n message: '登出失败',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/user.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/award/remainTime",
    "title": "获取奖项列表",
    "name": "______",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>获取奖项列表</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  status: 200,\n  message: '查询成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200\n{\n status: 0,\n message: '查询失败',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/award.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/user/remainTime",
    "title": "离晚会开始剩余时间",
    "name": "_________",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>离晚会开始剩余时间</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  status: 200,\n  message: '查询成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200\n{\n status: 0,\n message: '查询失败',\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/user.js",
    "groupTitle": "user"
  }
] });
