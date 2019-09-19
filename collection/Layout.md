## 布局篇

### 元素水平垂直居中

``` html
<div class="wrap-container">
  <div class="content"></div>
</div>
```

``` scss
/* 基本样式 */
.wrap-container {
  width: 500px;
  height: 500px;
  background: #ddd;

  .content {
    width: 200px;
    height: 200px;
    background: #ff9800;
  }
}
```
+ 传统布局


``` scss
/* 方法一 */
.wrap-container {
  position: relative;
  
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto
  }
}

/* 方法二 */
.wrap-container {
  position: relative;
  
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
  }
}

/* 方法三 (CSS3) */
.wrap-container {
  position: relative;
  
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

+ flex布局 (新旧方式)

``` scss
/* 新 */
.wrap-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 旧 */
.wrap-container {
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
}
```



### 栅格

```html
<div class="row row-wrap">
  <div class="col-12">1</div>
      
  <div class="col-6">
  	<div class="row-wrap">
      <div class="col-4">3w</div>
      <div class="col-4">3w</div>
      <div class="col-4">3w</div>
    </div>
  </div>
  <div class="col-6">2</div>

  <div class="col-4">3</div>
  <div class="col-4">3</div>
  <div class="col-4">3</div>

  <div class="col-3">4</div>
  <div class="col-3">4</div>
  <div class="col-3">4</div>
  <div class="col-3">4</div>

  <div class="col">null</div>
</div>
```

``` scss
/* 常规布局 12格为例 */
.row {
  display: flex;
  
  &.row-wrap {
    display: flex;
    flex-wrap: wrap;
    
    /* 分隔线 */
    > div {
      height: 100px;
      background-color: #ddd;
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
      box-sizing: border-box;
    }
  }
  
  .col-12 {
    flex: 0 0 100%;
  }
  .col-6 {
    flex:0 0 50%;
  }
  .col-4 {
    flex: 0 0 33.33333%;
  }
  .col-3 {
    flex: 0 0 25%;
  }
  .col {
    flex: 1;
  }
}
```



### 水平分布拉伸布局

```html
<!-- 左右间隔平均分布 -->
<div class="g-container">
  <div class="g-line g-line-1">
    <div class="g-cell"></div>
  </div>
  <div class="g-line g-line-2">
    <div class="g-cell"></div>
    <div class="g-cell"></div>
  </div>
</div>
```

```scss
.g-container {
  height: 200px;
  display: flex;
  flex-flow: column nowrap ;
  
  .g-line {
    display: flex;
    height: 100px;
    border: 1px solid #fff;
    flex-flow: row nowarp;
    justify-content: space-between;  /* 与交叉轴两端对齐，轴线之间的间隔平均分布 */
  }
  
  .g-cell {
    height: 100%;
    background: #ddd;
  }
  
  
  .g-line-1 .g-cell {
    flex: 1;
  }
  .g-line-2 .g-cell {
    flex: 0 1 49.5%;
  }
  .g-line3 .g-cell{
    flex:0 1 32.666667%;
  }
  .g-line4 .g-cell{
    flex:0 1 24.25%;
  }
}
```

[flex布局相关知识点]: https://www.cnblogs.com/dreamperson/p/9367008.html	"小白"

