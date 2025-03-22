# animerecord-react-version
animerecord 的 react 版本。区别于以前用 vue 开发的版本，该版本主要以展示为主，并不包含所有的数据修改功能。因此，该版本只有一个主页面，并直接部署到 github page 上。
该版本我的设想是直接展示有图片的 animerecord ，而不是像表格那样需要 hover 才能查看图片。网址：https://kurodasense.github.io/animerecord-react-version/。

## 样式和布局
样式使用的是 Aceternity UI 的 BenoGrid ；布局使用 grid ，利用`grid-template-columns`的自适应划分每一列来实现在不同屏幕下的自适应。

每个 item 内部使用 flex 布局垂直排列， title 超出宽度就会省略显示，且 hover 时会显示完整的名字。

## 主要功能实现
### 图片组件的封装
1. 由于该页面主要以展示图片为主，所以得实现图片懒加载。该功能直接使用了 react-lazy-load-image-component 库，在图片进入视口时才请求图片。
2. 图片的点击放大功能使用 react-viewer 库实现。
3. 设置了默认图片作为未上传图片时的占位图。


