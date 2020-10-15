<template>
  <div id="container">
    <div v-if="this.loadingProgress < 100" id="loadingText">
      {{ this.loadingProgress }}
    </div>
  </div>
</template>

<script>
import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "ModelView",
  props: ["target"],
  data() {
    return {
      loadingProgress: null,
      container: null,
      camera: null,
      scene: null,
      renderer: null,
      mixer: null,
      mesh: null,
      animationclip: null,
      clock: null,
      audio: null,
    };
  },

  methods: {
    init() {
      // set container
      this.container = document.getElementById("container");

      // add camera
      const fov = 60; // Field of view
      const aspect = this.container.clientWidth / this.container.clientHeight;
      const near = 0.1; // the near clipping plane
      const far = 100; // the far clipping plane
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 2, 5);
      this.camera = camera;
      // create scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("white");
      // add lights
      const ambientLight = new THREE.HemisphereLight(
        0xffffff, // bright sky color
        0x222222, // dim ground color
        1 // intensity
      );
      const mainLight = new THREE.DirectionalLight(0xffffff, 7.0);
      mainLight.castShadow = true;
      mainLight.position.set(10, 10, 10);
      mainLight.shadow.mapSize.width = 2048;
      mainLight.shadow.mapSize.height = 2048;
      this.scene.add(ambientLight, mainLight);
      this.scene.fog = new THREE.Fog( new THREE.Color("white"), 10, 50);

      // add controls
      this.controls = new OrbitControls(this.camera, this.container);
      // create renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.gammaFactor = 2.2;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.physicallyCorrectLights = true;
      this.container.appendChild(this.renderer.domElement);
      // set aspect ratio to match the new browser window aspect ratio
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );

      /*var axesHelper = new THREE.AxesHelper(5);
      this.scene.add(axesHelper);*/

      //Create a plane that receives shadows (but does not cast them)
      var geometry = new THREE.PlaneGeometry(100, 100, 100, 100);
      geometry.rotateX( - Math.PI / 2 );

      var material = new THREE.MeshStandardMaterial({
        color: 0xCECECE,
        roughness :1
      });

      var plane = new THREE.Mesh(geometry, material);
      plane.receiveShadow = true;
      plane.castShadow = true;
    

      this.scene.add(plane);

      const loader = new GLTFLoader();
      console.log(
        "assets/" +
          this.$props.target.folder +
          "/model/" +
          this.$props.target.GLTF_data
      );
      var dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/examples/js/libs/draco/");
      loader.setDRACOLoader(dracoLoader);
      loader.load(
        "assets/" +
          this.$props.target.folder +
          "/model/" +
          this.$props.target.GLTF_data,
        (gltf) => {
          this.scene.add(gltf.scene);
          this.mesh = gltf.scene;
          gltf.scene.traverse( function ( child ) {

            if ( child.isMesh ) {

                child.castShadow = true;
                child.receiveShadow = true;

            }

        } );
          this.mesh.scale.set(0.01, 0.01, 0.01);
          this.mesh.position.set(0, 0, 0);
          console.log("LOADED");
          this.animationclip = gltf.animations[0];
          this.mixer = new THREE.AnimationMixer(this.mesh);
          this.mixer.clipAction(gltf.animations[0]).play();
          this.startAnimation();
        },
        // called while loading is progressing
        function (xhr) {
          this.loadingProgress = (xhr.loaded / xhr.total) * 100;
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        undefined
      );
      this.renderer.setAnimationLoop(() => {
        this.render();
      });
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      requestAnimationFrame(this.animate);
      var delta = this.clock.getDelta();
      if (this.mixer) this.mixer.update(delta);
      this.renderer.render(this.scene, this.camera);
    },
    startAnimation() {
      this.clock = new THREE.Clock();
      if (this.animationclip != null) {
        if (this.$props.target.audio_animation != null) {
          this.audio = new Audio(
            "assets/" +
              this.$props.target.folder +
              "/model/" +
              this.$props.target.audio_animation
          );
          this.audio.loop = true;
          this.audio.play();
        }

        this.animate();
      }
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (this.audio != null) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  },
};
</script>

<style scoped>
#container {
  position: absolute;
  top: 50px;
  height: 100%;
  width: 100%;
  z-index: 9;
}
</style>