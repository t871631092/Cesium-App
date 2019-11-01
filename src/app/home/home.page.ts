import { Component, OnInit , ViewChild } from '@angular/core';
import {IonSlides } from '@ionic/angular';

declare let Cesium: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('slider', {static: false}) slide: IonSlides ;

  public viewer: any;
  public slideOpts: any = {
    initialSlide: 1,
    speed: 400
  };
  public data: any[] = [{
    name: '广州白云机场',
    x: 113.299,
    y: 23.392
  }, {
    name: '桂林机场',
    x: 103.299,
    y: 33.392
  }];
  constructor() { }
  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    window['CESIUM_BASE_URL'] = '/assets/cesium/';
    this.viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: false,
      animation: false, // 动画控制不显示
      baseLayerPicker: false, // 图层控制显示
      geocoder: false, // 地名查找不显示
      timeline: false, // 时间线不显示
      sceneModePicker: false, // 投影方式显示
      homeButton: false,  // 小房子按钮
      navigationHelpButton: false,
      vrButton: false,
      scene3DOnly: false,
      fullscreenButton: false,
      navigationInstructionsInitiallyVisible: false,
      selectionIndicator: false // 是否显示指示器组件
    });
    this.viewer.scene.globe.enableLighting = false; // 光影
    this.viewer._cesiumWidget._creditContainer.style.display = 'none';  // 去掉logo
    this.viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      url: 'assets/map/{z}/{x}/{y}.jpg',
      fileExtension: 'jpg',
      minimumLevel: 0,
      maximumLevel: 6
    }));
    this.setView(113.299, 23.392);

  }
  public onclick() {
    this.slide.getActiveIndex().then( i => {
      const data = this.data[i];
      this.setView(data.x, data.y);
    });
  }
  // 默认位置
  private setView(x, y, z?) {
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    this.viewer.camera.flyTo({
      duration: 1,
      destination: Cesium.Cartesian3.fromDegrees(x, y, z ? z : 10000000),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-90),
        roll: Cesium.Math.toRadians(0)         // heading、pitch和roll就是镜头相对于xyz轴的角度，比如pitch为-90°而另外两个为0时，就是90°向下俯视地球。
      }
  });
  }
}
