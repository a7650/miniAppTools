import prototypeTools from './instanceTools/prototype'

function NvueTools() {
  this.__isNvue__ = true
}

const nvue = new NvueTools()

prototypeTools(nvue)

export default nvue
