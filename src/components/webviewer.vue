<template>
  <div style="display: flex">
    <div style="margin-right: 20px; flex: 1">
      <div v-show="documentLoaded" style="margin-bottom: 25px">
        <button type="button" @click="exportAnnotations()">
          Export annotations
        </button>
      </div>

      <div ref="webviewer" style="height: 800px"></div>
    </div>

    <div style="width: 1px"></div>

    <div style="margin-left: 20px; flex: 1">
      <div
        v-for="(item, index) in xfdfData"
        :key="`xfdfData-${index}`"
        style="word-break: break-all"
      >
        <h4>Document {{ index + 1 }}</h4>
        <div>{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import WebViewer from "@pdftron/webviewer";

export default {
  name: "Webviewer",
  props: {
    files: {
      type: Array,
      default: () => {
        return [];
      },
    },
    manipulatePageOffset: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      documentLoaded: false,
      webviewerInstance: {},
      xfdfData: [],
    };
  },
  async mounted() {
    this.webviewerInstance = await WebViewer(
      {
        path: `${process.env.BASE_URL}webviewer`,
        initialDoc: this.files[0],
        disabledElements: [
          "header",
          "leftPanel",
          "annotationStylePopup",
          "panToolButton",
          "stylePopup",
          "toolStylePopup",
          "textPopup",
          "annotationPopup",
          "contextMenuPopup",
          "richTextPopup",
        ],
        disableLogs: true,
      },
      this.$refs.webviewer
    );

    const { docViewer } = this.webviewerInstance;

    this.webviewerInstance.disableFeatures([
      this.webviewerInstance.Feature.Annotations,
      this.webviewerInstance.Feature.TextSelection,
      this.webviewerInstance.Feature.Measurement,
      this.webviewerInstance.Feature.MouseWheelZoom,
    ]);

    this.webviewerInstance.setZoomLevel(1);

    docViewer.on("beforeDocumentLoaded", () => {
      this.mergeFiles();
    });

    docViewer.on("documentLoaded", () => {
      this.documentLoaded = true;
    });
  },
  methods: {
    createAnnotations() {
      const { Annotations, annotManager } = this.webviewerInstance;

      //create annotation on the first & second page
      for (let page = 1; page <= 2; page++) {
        const freeText = new Annotations.FreeTextAnnotation();
        freeText.PageNumber = page;
        freeText.X = 150;
        freeText.Y = 200;
        freeText.Width = 150;
        freeText.Height = 50;
        freeText.ReadOnly = true;
        freeText.setPadding(new Annotations.Rect(0, 0, 0, 0));
        freeText.setContents(`Page ${page}`);
        freeText.FillColor = new Annotations.Color(0, 255, 255);
        freeText.FontSize = "16pt";

        annotManager.addAnnotation(freeText, { autoFocus: false });
        annotManager.redrawAnnotation(freeText);
      }
    },
    async exportAnnotations() {
      const { annotManager, CoreControls, docViewer } = this.webviewerInstance;

      const getXFDF = async (page, pageOffset = 0) => {
        const manager = new CoreControls.AnnotationManager(docViewer);
        const annotationsInPage = annotManager
          .getAnnotationsList()
          .filter((annotation) => annotation.PageNumber == page);

        // the page offset will be used to recalculate the page for its document
        // (e.g. if a documents first page is page 3 in the webviewer, after export the page will be changed from 3 -> 1)
        for (let i = 0; i < annotationsInPage.length; i++) {
          const annotation = annotationsInPage[i];

          if (this.manipulatePageOffset)
            annotation.PageNumber = annotation.PageNumber - pageOffset;

          manager.addAnnotation(annotation);
        }

        return await manager.exportAnnotations();
      };

      //export first document & second document annotations respectively
      this.xfdfData = await Promise.all([getXFDF(1, 0), getXFDF(2, 1)]);
    },
    async mergeFiles() {
      const { docViewer } = this.webviewerInstance;
      const filesToBeMerged = this.files.slice(1);

      for (let i = 0; i < filesToBeMerged.length; i++) {
        await docViewer.getDocument().mergeDocument(filesToBeMerged[i]);
      }

      this.createAnnotations();
    },
  },
};
</script>

<style>
</style>