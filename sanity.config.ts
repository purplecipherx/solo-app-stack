import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./sanity/schemas";
import {apiVersion, dataset, projectId} from "./sanity/env";

export default defineConfig({
  name: "solo-app-stack",
  title: "Solo App Stack",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool({defaultApiVersion: apiVersion})],
  schema: {types: schemaTypes}
});
