<template>
  <div id="app">
    <div style="margin-bottom: 50px">
      <h3>Case 1</h3>
      <p>File sequence: blank.pdf -> blank-excel.pdf</p>
      <Webviewer ref="webviewer" :files="[BlankPdf, BlankExcel]" />
    </div>

    <hr />

    <div>
      <h3>Case 2</h3>
      <p>File sequence: blank-excel.pdf -> blank.pdf</p>
      <Webviewer ref="webviewer" :files="[BlankExcel, BlankPdf]" />
    </div>
  </div>
</template>

<script>
import Webviewer from "./components/webviewer.vue";
import BlankExcel from "@/assets/documents/blank-excel.pdf";
import BlankPdf from "@/assets/documents/blank.pdf";

export default {
  name: "App",
  components: {
    Webviewer,
  },
  data() {
    return {
      BlankExcel,
      BlankPdf,
    };
  },
};
</script>