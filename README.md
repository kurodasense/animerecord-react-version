# animerecord-react-version
animerecord 的 react 版本。区别于以前用 vue 开发的版本，该版本主要以展示为主，并不包含所有的数据修改功能。因此，该版本只有一个主页面，并直接部署到 github page 上。
该版本我的设想是直接展示有图片的 animerecord ，而不是像表格那样需要 hover 才能查看图片。网址：https://kurodasense.github.io/animerecord-react-version/

## 样式和布局
样式使用的是 Aceternity UI 的 BenoGrid ；布局使用 grid ，利用`grid-template-columns`的自适应划分每一列来实现在不同屏幕下的自适应。

每个 item 内部使用 flex 布局垂直排列， title 超出宽度就会省略显示，且 hover 时会显示完整的名字。

## 主要功能实现（难点）
1. 该页面主要以图片展示为主，所以在优化上需要进行图片懒加载。
2. 由于追番记录会越来越多，这会使得以后要渲染的 dom 会越来越多。这方面有2个解决方案：一个是做分页处理，另一个是使用虚拟滚动。前者的实现需要改动后端现有接口，同时也需要使用现有 ui 库的分页组件，该方案所需改动可能较大。后者的话直接使用现有的虚拟滚动库即可，所以我就选择虚拟滚动来实现。

### 图片组件的封装
1. 由于该页面主要以展示图片为主，所以得实现图片懒加载。该功能直接使用了 react-lazy-load-image-component 库，在图片进入视口时才请求图片。
2. 图片的点击放大功能使用 react-viewer 库实现。
3. 设置了默认图片作为未上传图片时的占位图。

### 页面的虚拟滚动
基于 react-window 库实现虚拟滚动，但是存在一些 bug ：

react-window 可以实现变长高度的 List 显示，但是更适合于指定页面列数时的变长高度。而本页面的布局是 grid + grid-template-columns 根据页面宽度来自适应划分列数。所以结合 react-window 时需要观察页面宽度变化来动态重新渲染列表。

此外，由于现有项目结构及后端接口处理的方式， List 中的每个 Row 的高度不是一开始就能确定的，而是每个 Row 内部请求完数据后才能确定高度。同时，由于自适应划分列数的问题，在页面宽度改变后，每个 Row 的高度也会改变，这就导致了 react-window 无法正确地计算每个 Row 的高度，从而会导致滚动条的高度不正确与 Row 渲染位置不正确的问题。

针对上述问题：
1. 通过 rowRefs 来保存每个 Row 的 dom 引用，并通过 rowHeights 来缓存每个 Row 的高度 。使用 requestAnimationFrame 确保每个 Row 在渲染后对其高度进行测量，如果高度与缓存不同，更新缓存并重置列表。
2. 添加了一个 useWindowSize 来监听页面窗口大小，如果大小发生变化就重新渲染列表。

优化前后，在 lighthouse 上的性能评分，可见在性能上提升了很多：

| ![image-20250405113641083](https://raw.githubusercontent.com/kurodasense/cloudimg/master/img/image-20250405113641083.png) | ![image-20250405121907172](https://raw.githubusercontent.com/kurodasense/cloudimg/master/img/image-20250405121907172.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

