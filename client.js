try {
window.onload = () => {
  const createCanvas = () => {
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    return [canvas, canvas.getContext('2d')]
  }
  let width, height, minWH
  let mx , my;
  let isDown = false
  const [canvas, ctx] = createCanvas()
  const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    minWH = Math.min(width, height)
    canvas.width = width
    canvas.height = height
    mx = minWH/2
    my = minWH/2
  }
  resize()
  window.addEventListener('resize', resize, false)
  const o = {
   x: 0,
   y: 0
  }
  const pi = Math.PI
  const twopi = pi*2
  const createPoint = () => {
    const angle = Math.random()*pi+pi
    return {
 //    x:Math.cos(angle)*minWH/2+width/2-o.x,
   //   y:Math.sin(angle)*minWH/2+height/2-o.y,
      x: (Math.random() >= 0.5 ? -1 : width+1)-o.x,
      y: (Math.random() >= 0.5 ? -1 : height+1)-o.y,
      vx: 0,
      vy: 0,
      r: 0.5,
      colour: 'white',
      type: 'expander'
    }
  }
  const createPlayer = () =>{
    return {
      x: width/2,
      y: height/2,
      vx: 0,
      vy: 0,
      r: 2,
      colour: 'red',
      type: 'player'
    }
  }

  const PLAYER_INDEX = 0
  const points = [createPlayer()]
  const player = points[PLAYER_INDEX]
  setInterval(()=>{
    points.push(createPoint())
  }, 500)
  const draw = ()=>{
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,width,height)
    for(let i=0;i<points.length;i++){
      const p = points[i]
      ctx.strokeStyle = p.colour
      ctx.beginPath()
      let x = p.x+o.x
      let y = p.y+o.y
      if(p.type == player.type){
        x = p.x
        y = p.y
      }
      ctx.moveTo(x+p.r, y)
      ctx.arc(x, y,p.r,0,twopi)
      ctx.stroke()
      ctx.closePath()
    }
  }
  let allowLoop = true
  const loop = ms => {
   if(allowLoop) requestAnimationFrame(loop)
   for(let i=0;i<points.length;i++){
      let p = points[i]
      let velMod = 1
      for(let j=0;j<points.length;j++){
        if(i !=j){
          const b = points[j]
          const bd =Math.sqrt((b.x-p.x)**2+(b.y-p.y)**2)
          const hitD = (bd-p.r+b.r)
        }
      }
      //p.vy += 0.98
      if(p.type === 'expander'){
        p.x += p.vx*0.01
        p.y += p.vy*0.01
        if(isDown){
          const d = Math.sqrt((mx-p.x)**2+(my-p.y)**2)
          p.vx += (mx-p.x)/d
          p.vy += (my-p.y)/d
          p.vx *=1
          p.vy*=1
        }
        p.r +=.01
        p.vx *=.99
        p.vy*=0.99
      }
      if(p.type === player.type){
        o.x -= p.vx*0.05
        o.y -= p.vy*0.05
        if(isDown){
          const d = Math.max(1,Math.sqrt((mx-p.x)**2+(my-p.y)**2))
          p.vx -= (mx-p.x)/d
          p.vy -= (my-p.y)/d
        }
        p.vx *=.99
        p.vy*=0.99
      }
 /*   if(p.x < p.r){
        p.vx = -p.vx + 0.1
        p.x = p.r
      }
      if(p.y < -p.r){
        p.vy = -p.vy + 0.1
        p.y = -p.r
      }
      if(p.x > width-p.r){
        p.vx = -p.vx - 0.1
        p.x = width-p.r
      }
      if(p.y > height+p.r){
        // p.vy = -p.vy - 0.1
        p.y = -p.r
      }*/
    }
   draw()
  }
  loop()
  const move = e =>{
    mx = e.touches[0].pageX
    my = e.touches[0].pageY
    isDown = true
  }
  const down = () => isDown = true
  const up = () => isDown = false
  window.addEventListener('touchstart', down, false)
  window.addEventListener('touchmove', move, false)
  window.addEventListener('touchend', up, false)
}
} catch(err){
document.write(err.toString())
}

window.onerror = err =>{
document.write(err.toString())
}
