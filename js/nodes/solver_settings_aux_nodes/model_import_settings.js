class ModelImportSettings {
    constructor()
    {
        this.input_filename = this.addWidget("text", "Input filename", "Hyper_Reduced_Model_Part", function (v) { }, {});
        this.input_type = this.addWidget("combo", "Input type", "mdpa", function (v) { }, { values: ["mdpa", "rest"] });

        this.properties = {
            "input_filename" : ""
        }; // TODO: Add restart settings

        this.addOutput("solver_settings", "map");

        this.size = this.computeSize();
    }

    onExecute()
    {
        this._value = Object.assign({}, this.properties);
        this._value["input_filename"] = this.input_filename.value;
        this._value["input_type"] = this.input_type.value;

        this.setOutputData(0, this._value);
    }
}

ModelImportSettings.title = "Model import settings";
ModelImportSettings.desc = "Node to specify the model import settings of a solver.";

LiteGraph.registerNodeType("solver_settings_aux_nodes/ModelImportSettings", ModelImportSettings);

console.log("ModelImportSettings node created"); //helps to debug