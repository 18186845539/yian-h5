module.exports = {

  title: '谊安微信客户服务中心',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {array}
   * @description 数据列表每页大小数据源
   */
  pageSizes: [10, 20, 30, 50],

  /**
   * @type {number}
   * @description 登录超时时间
   */
  loginTimeOut: 30 * 60 * 1000,
  // loginTimeOut: 1 * 60 * 1000,

  /**
   * @type {object}
   * @description 用户信息
   */
  userinfo: {
    adminId: '80',
    adminName: '谊安售后'
  },

  /**
   * @type {string}
   * @description socket地址
   */
  // socketURL: 'http://192.168.133.132:9999',   //靖添服务
  // socketURL: 'http://192.168.1.67:9999',   //靖添服务
  // socketURL: 'http://192.168.1.88:8089',   //文哲服务
  // socketURL: 'http://192.168.3.133:8089',    //张清服务
  // socketURL: 'http://182.92.78.11:9999',   //公司线上服务
  // socketURL: 'http://39.100.124.168:9999', //谊安线上服务
   socketURL: 'http://39.105.157.251:9999', //谊安线上服务bailing
     //socketURL: 'http://124.207.242.89:9999',上线地址白玲
  /**
   * @type {string}
   * @description 图片地址
   */
  // socketURL: 'http://192.168.1.67:9999',   //靖添服务
  // imgURL: 'http://192.168.1.88:8089',   //文哲服务
  // imgURL: 'http://192.168.3.133:8089',   //张清服务
  // imgURL: 'http://182.92.78.11:10800',   //公司线上服务
  // imgURL: 'http://39.100.124.168:10800', //谊安线上服务
  imgURL: 'http://124.207.242.89:9999', //谊安线上服务

    /**
   * @type {string}
   * @description 图片地址
   */
 
  //pdfURL: 'http://124.207.242.89:10800', //谊安线上服务  上线地址
  pdfURL: 'http://39.105.157.251:10800', //谊安线上服务
}