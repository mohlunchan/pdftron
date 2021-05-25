<template>
  <div id="app">
    <p>
      The purpose of this demo is to demonstrate that if we manipulate the page
      before calling the <b>exportAnnotations</b> function, it will cause the
      pdf coordinates generated in the XFDF data to be mutated
    </p>

    <div style="margin-bottom: 50px">
      <h3>Case 1</h3>
      <p>Do not manipulate page offset during annotation export</p>
      <Webviewer ref="webviewer" :files="[BlankPdf, BlankExcel]" />
    </div>

    <hr />

    <div>
      <h3>Case 2</h3>
      <p>Manipulate page offset during annotation export</p>
      <Webviewer
        ref="webviewer"
        :files="[BlankPdf, BlankExcel]"
        :manipulatePageOffset="true"
      />
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