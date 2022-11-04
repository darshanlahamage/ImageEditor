const fileInput = document.querySelector(".file-input"), 
filterOptions = document.querySelectorAll(".filter button");
previewImge = document.querySelector(".preview-img img");
filterName = document.querySelector(".filter-info .name");
filterValue = document.querySelector(".filter-info .value");
roatateOptions = document.querySelectorAll(".rotate button");
filterSlider = document.querySelector(".slider input");
chooseImgBtn = document.querySelector(".choose-img");
resetfilterBtn = document.querySelector(".reset-filter");
saveImgbtn = document.querySelector(".save-img");

cropper="";

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate=0, fliphorizontal=1, flipvertical= 1;

const applyFilters =()=>{
  previewImge.style.transform = `rotate(${rotate}deg) scale(${flipvertical}, ${fliphorizontal})`;
   previewImge.style.filter= `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadimage = () => {
  let file = fileInput.files[0];
  if (!file)
    return;
  previewImge.src = URL.createObjectURL(file);
  previewImge.addEventListener("load", () => {
    resetfilterBtn.click();
    document.querySelector(".container").classList.remove("disable");
  });
}
filterOptions.forEach(option => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max= "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max= "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max= "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max= "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});
const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id ==="saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else  {
    grayscale = filterSlider.value;
  }
  applyFilters();
}
roatateOptions.forEach(option=> {
  option.addEventListener("click", ()=> {
 if(option.id=== "left"){
  rotate -=90;
 }else if(option.id=== "right"){
  rotate +=90;
 }else if(option.id=== "vertical"){
 flipvertical =flipvertical=== 1 ?-1 : 1 ;
 }else {
  fliphorizontal= fliphorizontal===1 ?-1 :1;
 }
 applyFilters();
  });
});

const resetFilter = ()=> {
   brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
  rotate=0; fliphorizontal=1; flipvertical= 1;
  filterOptions[0].click();
  applyFilters();
}

document.getElementsByClassName("crop").addEventListener("click",() => {
 let img= document.createElement("img");
 img.src=previewImge.src;
  cropper= new Cropper(previewImge);
})

const SaveImage =()=>{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImge.naturalWidth;
  canvas.height = previewImge.naturalHeight;
  
  ctx.filter =`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

  if(rotate !==0){
    ctx.rotate(rotate * Math.PI/180);
  }

  ctx.scale(fliphorizontal, flipvertical);
  ctx.translate( canvas.width /2 ,canvas.height/2);
  ctx.drawImage(previewImge,  -canvas.width /2 ,-canvas.height/2, canvas.width,canvas.height );
 
  const link = document.createElement("a"); //crateing <a> tag
  link.download= "image.jpg";    //passing <a> tag download value to "image.jpg"
  link.href= canvas.toDataURL(); //passing <a> tag href value to canvas data url
  link.click(); //clicking <a> tag download image

}

filterSlider.addEventListener("input", updateFilter);
fileInput.addEventListener("change", loadimage);
resetfilterBtn.addEventListener("click", resetFilter);
saveImgbtn.addEventListener("click", SaveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click())