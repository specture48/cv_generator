<template>
  <div>
    <app-paper/>
  </div>
</template>

<script>
  import Paper from "~/components/Cv/Paper";

  export default {
    components: {AppPaper:Paper},
    data() {
      return {
        imgSrc: '',
      }
    },
    methods: {
      send() {

        // // get a reference to the file input
        // const fileInput = document.querySelector("input");
        //
        // // get a reference to the output canvas
        // const canvas = document.querySelector("canvas");
        //
        // // listen for the change event so we can capture the file
        // // fileInput.addEventListener("change", (e) => {
        // // get a reference to the file
        // const file = fileInput.files[0];
        //
        // // let's load the image data
        // const image = new Image();
        //
        // // image.onload = () => {
        // // use min size so we get a square
        // const size = Math.min(image.naturalWidth, image.naturalHeight);
        //
        // // let's update the canvas size
        // canvas.width = size;
        // canvas.height = size;
        //
        // // draw image to canvas
        // const ctx = canvas.getContext("2d");
        // ctx.drawImage(image, 0, 0);
        //
        // // only draw image where mask is
        // ctx.globalCompositeOperation = "destination-in";
        //
        // // draw our circle mask
        // ctx.fillStyle = "#000";
        // ctx.beginPath();
        // ctx.arc(
        //   size * 0.5, // x
        //   size * 0.5, // y
        //   size * 0.5, // radius
        //   0, // start angle
        //   2 * Math.PI // end angle
        // );
        // ctx.fill();
        //
        // // restore to default composite operation (is draw over current image)
        // ctx.globalCompositeOperation = "source-over";
        //
        // // show canvas
        // canvas.hidden = false;
        // // };
        // image.src = URL.createObjectURL(file);
        // // comp.imgSrc=image
        // // });
        // console.log(image)
        this.$axios
          .post("api/pdf", {name: 'dsa'})
          .then(data => {
          })
      }
    },
  }
</script>

<style>

</style>
