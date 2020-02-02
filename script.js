const header = document.querySelector("#header");
let scrollUp = false;
const iam = document.querySelector("#iam");
let iamHeight;
const chips = document.querySelector('.chip-text');
let chipsHeight;


document.body.style.paddingTop = document.body.style.paddingTop + header.offsetHeight + "px";

function scaleHeader() {

const headerHeight = header.offsetHeight;
  const headerContentHeight = iamHeight + chipsHeight;
  const smallHeader = document.querySelector('#header-nav');
  const windowHeight = window.innerHeight;

  if (window.scrollY <= windowHeight) { //big header is still visible
    smallHeader.style.display = "none"; //hide small header as long as big header is visible
    header.style.display = "flex";
    header.style.height = windowHeight - window.scrollY + "px";
    document.body.style.paddingTop = document.body.style.paddingTop + header.offsetHeight + "px";

    if ((headerContentHeight*2 >= headerHeight) && !chips.classList.contains("fadeOut") && !scrollUp){
    // && !scrollUp && !chips.classList.contains("fadeOut")) {
      console.log(headerContentHeight);
      chips.classList.add("fadeOut");
      
      function hideChips(){
        document.querySelector(".fadeOut").style.animation = "none";
        document.querySelector(".fadeOut").removeEventListener('animationend', hideChips);
      }

      document.querySelector(".fadeOut").addEventListener('animationend', hideChips);
    } 

    if (iamHeight + 200 >= headerHeight && headerHeight >= 0){
      iam.querySelectorAll("div").forEach(div => div.style.opacity = ((1/(iamHeight + 200)) * headerHeight));
      iam.style.transform = `scale(${((1/(iamHeight + 200)) * headerHeight)})`;
    }else{
      iam.querySelectorAll("div").forEach(div => div.style.opacity = 1);
      iam.style.transform = "scale(1)";
    }


    if (headerHeight >= headerContentHeight*2 && scrollUp) {
      console.log("hch >", headerContentHeight*2);
      chips.classList.remove("fadeOut");
    }
  } else {
    header.style.display = "none";
    smallHeader.style.display = "flex";
    iam.style.opacity = 1;
  }
}

window.addEventListener('scroll', scaleHeader);

window.addEventListener('scroll', () => {
  // print "false" if direction is down and "true" if up
  scrollUp = this.oldScroll > this.scrollY;
  this.oldScroll = this.scrollY;
});

document.addEventListener("DOMContentLoaded", () => {
  iamHeight = iam.offsetHeight;
  chipsHeight = chips.offsetHeight;
});
