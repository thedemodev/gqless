import { V } from '../V'
import { NodePath } from '@babel/core'

export class UndefinedV extends V<undefined> {
  constructor(path: NodePath | null) {
    super(path, undefined)
  }
}
