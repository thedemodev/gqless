import { Schema } from '../Schema'
import * as graphql from './files'
import { File } from './File'

interface CodegenOptions {
  typescript?: boolean
}

export class Codegen {
  public options: CodegenOptions
  public files: File[]

  constructor(public schema: Schema, options?: CodegenOptions) {
    this.options = {
      typescript: true,
      ...options,
    }

    this.files = [
      new graphql.TypeOptionsFile(),
      new graphql.IndexFile(),

      new graphql.generated.SchemaFile(this),
      new graphql.generated.GraphQLFile(this),
      new graphql.generated.IndexFile(),
    ]
  }

  public generate() {
    return this.files.map(file => ({
      path: `${file.path}.${this.options.typescript ? 'ts' : 'js'}`,
      overwrite: file.overwrite,
      contents: file.generate(),
    }))
  }
}