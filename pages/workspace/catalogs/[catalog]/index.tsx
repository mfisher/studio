import React, { useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

import fs from 'fs'

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);
  
type CatalogPageProps = {
  catalogName: string,
  readme: string
}

const CatalogPage: NextPage<CatalogPageProps> = (props) => {
  const { catalogName, readme } = props
  const [value, setValue] = useState(readme);
  return (
    <div>
      <MDEditor value={value} onChange={ md => md && setValue(md) } />
    </div>
  );

  
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { catalog } = context.query

  console.log(`workspace/catalogs/${catalog}/README.md`)

  return {
    props: {
      catalogName: catalog,
      readme: fs.readFileSync(`workspace/catalogs/${catalog}/README.md`, 'utf8')
    }
  }
}

export default CatalogPage



