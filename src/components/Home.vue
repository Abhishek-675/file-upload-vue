<template>
  <nav class="navbar bg-body-tertiary sticky-top bg-primary mb-3">
    <div class="container-fluid">
      <a class="navbar-brand fs-3 fw-semibold text-white"
        >File upload with Vue.js</a
      >
    </div>
  </nav>

  <div class="d-flex flex-column mb-3">
    <!--drag area-->
    <div
      class="w-50 m-auto mt-3 text-center d-flex flex-column justify-content-center drop-area-div"
    >
      <!-- @click="$refs.file.click" -->
      <label for="drop-area" class="" id="drop-area-label">
        <p>Drag your file here to begin</p>
        <p>or click to browse</p>
      </label>

      <input
        @change="selectImage"
        class=""
        type="file"
        id="drop-area"
        accept="image/png, image/jpg, image/jpeg"
        ref="file"
      />
      <!--preview image-->
      <div
        v-if="previewImage"
        class="d-flex justify-content-center preview-img-div"
      >
        <img
          :src="previewImage"
          class="preview my-3 mw-100"
          alt=""
          id="preview-img"
        />
      </div>
    </div>

    <!--progress bar-->
    <div id="prog-bar-container">
      <div v-if="currentImage" class="progress" id="progress-bar-div">
        <div
          class="progress-bar progress-bar-info fs-5"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{ width: progress + '%' }"
        >
          {{ progress }}%
        </div>
      </div>
    </div>

    <!--upload button-->
    <div class="px-3 m-auto mt-3">
      <button @click="upload" type="button" class="btn btn-success btn-lg">
        Upload
      </button>
    </div>
  </div>

  <!--error message-->
  <div v-if="message" class="alert alert-secondary text-danger text-center " role="alert"><strong>
    {{ message }}
  </strong></div>

  <!--image display gallery-->
  <div class="img-container">
    <div v-for="image in imageInfos" :key="image" class="img-div">
      <img
        class="img"
        :src="`https://www.alegralabs.com:5007/files/${image}`"
        :alt="image"
      />
    </div>
  </div>
</template>

<script>
import UploadService from "../services/UploadFileService";

export default {
  name: "Home-1",
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,

      progress: 0,
      message: "",

      imageInfos: [],
    };
  },
  methods: {
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
      this.message = "";
    },
    upload() {
      this.progress = 0;

      UploadService.upload(this.currentImage, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
        this.previewImage = undefined;
      })
        .then((response) => {
          this.message = response.data.message;
          if (this.progress === 100) {
            alert("Image Uploaded Successfully");
            this.progress = 0;
          }
          return UploadService.getFiles();
        })
        .then((images) => {
          this.imageInfos = images.data;
        })
        .catch((err) => {
          // console.log(err)
          this.progress = 0;
          this.message = "Could not upload the image!" + " " + err.response.data.error.message;
          this.currentImage = undefined;
        });
    },
  },
  mounted() {
    UploadService.getFiles().then((response) => {
      this.imageInfos = response.data;
    });
  },
};
</script>

<style scoped>
.img-container {
  width: 100%;
  columns: 5;
  column-gap: 0px;
}

.img-div {
  padding: 10px;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#preview-img {
  max-height: 500px;
  object-fit: scale-down;
  z-index: 1;
}

.drop-area-div {
  outline: 2px dashed grey;
  cursor: pointer;
  min-height: 200px;
  position: relative;
}

.drop-area-div:hover {
  background: #b3d4fc;
}

#drop-area-label {
  position: absolute;
  width: 100%;
}

#drop-area {
  height: 200px;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
}

#prog-bar-container {
  display: inline-block;
  width: 50%;
  margin: auto;
  padding-top: 10px;
}

#progress-bar-div {
  height: 20px;
}

/*for extra large screen */
@media only screen and (max-width: 1400px) {
  .img-container {
    columns: 4;
  }
}

/*for large screen*/
@media only screen and (max-width: 992px) {
  .img-container {
    columns: 3;
  }
}

/*for medium screen*/
@media only screen and (max-width: 768px) {
  .img-container {
    columns: 2;
  }
}
</style>
