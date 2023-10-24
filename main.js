document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
      document.querySelector("body").style.visibility = "hidden";
      document.querySelector(".loader").style.visibility = "visible";
      
  } else {
      document.querySelector(".loader").style.display = "none";
      document.querySelector("body").style.visibility = "visible";
  }
};

document.addEventListener("mousemove" , parallax);
function parallax(e){
  this.querySelectorAll('.layer').forEach(layer => { 
const speed = layer.getAttribute('data-speed')


const x = (window.innerWidth - e.pageX*speed)/100
const y = (window.innerHeight - e.pageY*speed)/100

    layer.style.transform=`translateX(${x}px) translateY(${y}px)`
})
} 

        var menuList=document.getElementById("menulist");

        menuList.style.maxHeight = "0px";

        function togglemenu(){
            if (menuList.style.maxHeight == "0px")
            {
                menuList.style.maxHeight = "130px";
            }
            else{
                menuList.style.maxHeight = "0px";
            }
        }
        
        // ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

    class TextScramble {
    constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
    setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
    update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
    randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

    // ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

    const phrases = [
  'Abdul Saleem,',
  'Ui Designer,',
  'Freelancer at uTest..!',
  'Student at M.A.M.CET',
  'Learner / Coder',
  'Co-Founder of A2EditLook..#,'
]

    const el = document.querySelector('.text')
    const fx = new TextScramble(el)

    let counter = 0
    const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

    next()
