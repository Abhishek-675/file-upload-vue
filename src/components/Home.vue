<template>
  <nav class="navbar bg-body-tertiary sticky-top bg-primary mb-3">
    <div class="container-fluid">
      <a class="navbar-brand fs-3 fw-semibold text-white"
        >File upload with Vue.js</a
      >
    </div>
  </nav>

  <div class="d-flex flex-column mb-3">
    <div class="w-50 p-3 m-auto">
      <label for="formFileLg" class="form-label d-none"
        >Default file input example</label
      >
      <input
        @change="selectImage"
        class="form-control form-control-lg"
        type="file"
        id="formFileLg"
        accept="image/png, image/jpg, image/jpeg"
        ref="file"
      />
    </div>
    <div class="px-3 m-auto">
      <button
        @click="upload"
        type="button"
        class="btn btn-success btn-lg"
      >
        Upload
      </button>
    </div>
  </div>

  <div v-if="currentImage" class="progress mx-3" style="height:20px;">
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

  <div v-if="previewImage" class="d-flex justify-content-center">
    <div>
      <img
        :src="previewImage"
        class="preview my-3 mw-100"
        alt=""
        id="preview-img"
      />
    </div>
  </div>

  <div v-if="message" class="alert alert-secondary" role="alert">
    {{ message }}
  </div>

  <div class="">
    <div class="img-container">
      <div v-for="image in imageInfos" :key="image" class="img-div">
        <img
          class="img"
          :src="`https://www.alegralabs.com:5007/files/${image}`"
          :alt="image"
        />
      </div>
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
        //   alert('Image Uploaded Successfully')
          return UploadService.getFiles();
        })
        .then((images) => {
          this.imageInfos = images.data;
        })
        .catch((err) => {
          this.progress = 0;
          this.message = "Could not upload the image!" + err;
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
  height: 500px;
  object-fit: scale-down;
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