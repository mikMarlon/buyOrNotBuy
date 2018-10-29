<template>
  <div class="index-container">
    <!-- 顶部搜索栏 -->
    <div class="search-box">
      <input type="text" placeholder="搜索">
      <icon type="search" size="14" color="#bbb"></icon>
    </div>

    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular class="swiper">
            <swiper-item v-for="(item, index) in swiperList" :key="index">
                <img mode="aspectFill" :src="item.image_src" />
            </swiper-item>
    </swiper>

    <!-- 分类 -->
    <div class="category-box">
      <a v-for="(item, index) in categoryList" :key="index" :href="item.navigator_url">
        <img :src="item.image_src" alt="">
        <p>{{item.name}}</p>
      </a>
    </div>

    <!-- 楼层列表 -->
    <div class="floor-box" v-for="(item, index) in floorList" :key="index">
      <div class="title">
        <img :src="item.floor_title.image_src" alt="">
        <span>{{item.floor_title.name}}</span>
      </div>
      <div class="bottom">
        <a href="" v-for="(it, i) in item.product_list" :key="i">
          <img :src="it.image_src" alt="">
        </a>
      </div>
    </div>

    <!-- 底线君 -->
    <div class="foot-line" v-show="isBottom">
      <span class="iconfont icon-xiao"></span>
      我也是有底线的!
    </div>

    <!-- 回到顶部按钮 -->
    <div @click="goTop" class="back-top" v-show="showTop">
      <span class="iconfont icon-jiantoushang"></span>
      <p>顶部</p>
    </div>
  </div>
</template>

<script>
// 引入promise语法发送request请求的工具包
import tools from "../../utils/tools.js"

export default {
  data () {
    return {
      swiperList:[],
      categoryList:[],
      floorList:[],
      isBottom:false,
      showTop:false
    }
  },

  methods: {
    goTop(){
      wx.pageScrollTo({
        scrollTop:0
      })
    }
  },

  created () {
    // 创建promise对象
    const p1 = tools.myPro({
      url:tools.baseUrl+"api/public/v1/home/swiperdata"
    })
    const p2 = tools.myPro({
      url:tools.baseUrl+"api/public/v1/home/catitems"
    })
    const p3 = tools.myPro({
      url:tools.baseUrl+"api/public/v1/home/floordata"
    })

    // 使用promise.all
    Promise.all([p1,p2,p3]).then(resultList=>{
      console.log(resultList[2]);
      this.swiperList = resultList[0].data.message;
      this.categoryList = resultList[1].data.message;
      this.floorList = resultList[2].data.message;
    })

    // 发送请求
    // tools.myPro({
    //   url:tools.baseUrl+"api/public/v1/home/swiperdata"
    // }).then(result=>{
    //   console.log(result);
    //   this.swiperList = result.data.message;
    // })
  },
  // 触底事件
  onReachBottom(){
    this.isBottom = true;
    console.log("触碰到我底线啦");
  },
  // 滚动事件
  onPageScroll(e){
    console.log(e);
    if(e.scrollTop>500){
      this.showTop = true;
    }else{
      this.showTop = false;
    }
  }
}
</script>

<style scoped lang="scss">
$ygColor:#ff2d4a;
.index-container{
  padding-top: 100rpx;
}

// 顶部搜索栏
.search-box{
  height: 100rpx;
  width: 100%;
  padding: 20rpx 16rpx;
  background-color: $ygColor;
  position: fixed;
  box-sizing: border-box;
  top:0;
  left: 0;
  z-index:998;
  input{
    height: 60rpx;
    background-color: white;
    font-size: 26rpx;
    text-align: center;
    border-radius: 10rpx;
    color: #bbb;
  }
  icon{
    position: absolute;
    top: 50%;
    left: 300rpx;
    transform: translateY(-50%);
  }
}

// 分类栏
.category-box{
  display: flex;
  padding: 24rpx 0 29rpx;
  ._a{
    flex: 1;
    text-align: center;
    ._img{
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      box-shadow: 10rpx 10rpx 10rpx #ccc;
    }
    ._p{
      // padding-top: 8rpx;
      font-size: 30rpx;
    }
  }
}

// 楼层列表
.floor-box{
  padding-top: 29rpx;
  .title{
    width: 100%;
    height: 85rpx;
    position: relative;
    display: block;
    ._img{
      width: 100%;
      height: 100%;
    }
    ._span{
      position: absolute;
      left: 16rpx;
      top:50%;
      transform: translateY(-50%);
      color: #ff7b94;
      font-weight: 700;
    }
  }
  .bottom{
    padding: 15rpx 11rpx 0;
    overflow:hidden;
    height: 500rpx;
    ._a{
      float: left;
      width: 33.33%;
      height: 50%;
      padding: 5rpx;
      box-sizing: border-box;
      border-radius: 10rpx;
      &:first-of-type{
        height: 100%;
      }
      ._img{
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
      }
      
    }
    
  }
}

// 底线样式
.foot-line{
  font-size: 24rpx;
  text-align: center;
  height: 70rpx;
  color:#999;
  line-height: 70rpx;
  background-color: #f4f4f4;
  ._span{
    
  }
}

// 回到顶部样式
.back-top{
  position: fixed;
  bottom: 10rpx;
  right: 15rpx;
  font-size: 24rpx;
  color: #666666;
  width: 80rpx;
  height: 80rpx;
  background-color: #ffcd42;
  border-radius: 50%;
  text-align: center;
  ._span{

  }
  ._p{

  }
}

</style>
