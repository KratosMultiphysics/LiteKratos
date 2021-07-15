
class MaterialsList extends InputList{
    constructor() {
        super();
        this.input_type = "material";
        this.output_type = "material_array";
    }
    onExecute() {
        if (!this._value) {
            this._value = new Array();
        }
        this._value.length = this.inputs.length - 1;
        for (let i = 0; i < this.inputs.length - 1; ++i) {
            this._value[i] = this.getInputData(i);
        }
        
        this.setOutputData(0, {"properties":this._value});
    }
};

MaterialsList.title = "Materials list";
MaterialsList.desc = "Merges several materials into an array";

LiteGraph.registerNodeType("materials/materials_list", MaterialsList);

console.log("Materials list node created"); //helps to debug

    