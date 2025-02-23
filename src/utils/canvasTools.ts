/**
 *canvas文本
 * @param {String} text 文本字符串
 * @param {Number} fontSize 字体大小
 * @param {String} color 颜色
 * @returns
 */
export function getCanvasText(text, fontSize, color, bg) {
  const canvas = document.createElement('canvas')
  const ctx: any = canvas.getContext('2d')
  ctx.font = fontSize + 'px Arial'
  ctx.fillStyle = color
  const padding = 5
  //测量文本大小，并设置canvas宽高预留padding
  canvas.width = ctx.measureText(text + '').width + padding * 2
  canvas.height = fontSize * 1.2 + padding * 2
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = bg

  ctx.rect(0, 0, canvas.width, canvas.height)
  ctx.fill()

  ctx.font = fontSize + 'px Arial'
  ctx.fillStyle = color
  ctx.fillText(text, padding, fontSize + padding * 0.5)
  return canvas
}

/***
 * 文本网格
 * @param {String} text 文本字符串
 * @param {Number} fontSize 字体大小
 * @param {String} color 颜色
 */
export function getTextMesh(THREE, text, fontSize, color) {
  const canvas = getCanvasText(text, fontSize * 10, color, 'rgba(0,0,0,0)')
  const map = new THREE.CanvasTexture(canvas)
  map.wrapS = THREE.RepeatWrapping
  map.wrapT = THREE.RepeatWrapping

  //透明贴图
  const canvasAlpha = getCanvasText(text, fontSize * 10, '#FFFFFF', 'rgba(0,0,0,0)')
  const mapAlpha = new THREE.CanvasTexture(canvasAlpha)
  map.wrapS = THREE.RepeatWrapping
  map.wrapT = THREE.RepeatWrapping

  const material = new THREE.MeshBasicMaterial({
    map: map,
    transparent: true,
    side: THREE.DoubleSide,
    //设置透明贴图避免字体重叠
    alphaTest: 0.5,
    alphaMap: mapAlpha
  })

  const geometry = new THREE.PlaneGeometry(canvas.width * 0.1, canvas.height * 0.1)
  const mesh = new THREE.Mesh(geometry, material)
  return { material, geometry, canvas, mesh }
}
