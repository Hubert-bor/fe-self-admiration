<template>
  <div id="canvas"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import ThreeBase from '../utils/threeBase'
import { getRandLetterNum } from '../utils/rand'
import { getCanvasText, getTextMesh } from '../utils/canvasTools'
import { onMounted } from 'vue'

class WordCloud extends ThreeBase {
  constructor() {
    super()
    this.initCameraPos = [35, 35, 35]
    this.pos = {}
    // this.isDepthBuffer = true;
    // this.isAxis = true;
  }
  getPos() {
    const a = parseInt(Math.random() * this.that.data.length)
    if (this.pos[a]) {
      return this.getPos()
    } else {
      this.pos[a] = true
      return a
    }
  }
  animateAction() {
    if (this.objGroup) {
      if (this.objGroup.rotation.y >= Math.PI * 2) {
        this.objGroup.rotation.y = 0
      } else {
        this.objGroup.rotation.y += 0.001
      }
    }
  }
  createChart(that) {
    if (this.objGroup) {
      this.cleanObj(this.objGroup)
      this.objGroup = null
      this.pos = {}
    }
    this.that = that
    const l = that.data.length
    const material = new THREE.MeshBasicMaterial({
      color: that.color
    })
    let max = Number.MIN_SAFE_INTEGER
    let min = Number.MAX_SAFE_INTEGER

    that.data.forEach((item) => {
      if (max < item.value) {
        max = item.value
      }
      if (min > item.value) {
        min = item.value
      }
    })

    const size = max - min

    this.objGroup = new THREE.Group()
    this.scene.add(this.objGroup)
    const textGroup = new THREE.Group()
    this.objGroup.add(textGroup)
    that.data.forEach((item, idx) => {
      const text = item.name
      if (text) {
        const color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        const vector = new THREE.Vector3()
        const phi = Math.acos(THREE.MathUtils.lerp(-1, 1, idx / (that.data.length - 1)))

        const theta = Math.sqrt(that.data.length * Math.PI) * phi

        vector.setFromSphericalCoords(that.radius, phi, theta)

        const s = THREE.MathUtils.lerp(
          that.minFontSize,
          that.maxFontSize,
          (item.value - min) / size
        )

        const { mesh, geometry } = getTextMesh(THREE, text, s, color)

        mesh.name = 'text' + idx
        mesh.position.set(vector.x, vector.y, vector.z)

        geometry.lookAt(vector)
        geometry.translate(vector.x, vector.y, vector.z)

        textGroup.add(mesh)
      }
    })
    if (that.data.length < 50) {
      const g = new THREE.IcosahedronGeometry(that.radius * 2, 2)
      const m = new THREE.MeshBasicMaterial({
        color: that.color,
        transparent: true,
        opacity: 0.2,

        wireframe: true
      })
      const mm = new THREE.Mesh(g, m)
      this.objGroup.add(mm)
    }
    this.scene.fog = new THREE.FogExp2(new THREE.Color('#000000'), 0.0035)
    this.setView(
      {
        x: 126.17633606807345,
        y: 126.17633606807341,
        z: 126.17633606807348
      },
      {
        x: 0,
        y: 0,
        z: 0
      }
    )
  }
}

const list = []
for (let i = 0; i < 100; i++) {
  const a = i % 10
  list.push({
    //   name: `${a}${a}${a}${a}`,
    name: getRandLetterNum(8),
    value: Math.round(Math.random() * 100)
  })
}

onMounted(() => {
  console.log(list)
  const myWordCloud = new WordCloud()
  myWordCloud.initThree(document.getElementById('canvas'))

  window.myWordCloud = myWordCloud
  myWordCloud.createChart({
    data: list,
    minFontSize: 3,
    maxFontSize: 10,
    color: '#FFFFFF',
    radius: 30
  })
})
</script>

<style lang="less" scoped>
#canvas {
  background-color: black;
  width: 100%;
  height: 100%;
}
</style>
