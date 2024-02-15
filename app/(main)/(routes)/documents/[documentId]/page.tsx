"use client"

import Cover from "@/components/cover"
import Toolbar from "@/components/toolbar"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  })

  /* En convex si los documentos estan undefined es porque esta cargando, en caso de que lance un error su valor seria null*/
  if (document === undefined) {
    return <p>Loading</p>
  }

  if (document === null) {
    return <div>Not found</div>
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        {/*<Editor
          onChange={onChange}
          initialContent={document.content}
  />*/}
      </div>
    </div>
  )
}

export default DocumentIdPage