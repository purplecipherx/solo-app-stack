import {createClient} from "next-sanity";
import {apiVersion, dataset, projectId, useCdn} from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token: process.env.SANITY_API_READ_TOKEN
});

export const sanityEnabled = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
