// TODO: Create a material base class
class StructuralMaterial {
    constructor()
    {
        this.addInput("model_part_name","string");
        this.properties = {
            "model_part_name" : "Structure.Parts_Solid_Solid_Auto1",
            "properties_id"   : 1,
            "Material"        : {
                "constitutive_law" : {
                    "name" : "LinearElasticPlaneStress2DLaw"
                },
                "Variables"        : {
                    "DENSITY"       : 7850.0,
                    "YOUNG_MODULUS" : 206900000000.0,
                    "POISSON_RATIO" : 0.29,
                    "THICKNESS"     : 0.1
                },
                "Tables"           : {}
            }
        };

        this.properties_id = this.addWidget("combo","Properties_ID", 1, function(v){}, { values:[1, 2, 3, 4, 5]} );
        this.name = this.addWidget("text","Name", "LinearElasticPlaneStress2DLaw", function(v){}, function(v){}, {} );
        this.DENSITY= this.addWidget("number","Density", 7850.0, function(v){}, {});
        this.YOUNG_MODULUS = this.addWidget("number","Young_Modulus", 206900000000.0, function(v){}, {});
        this.POISSON_RATIO = this.addWidget("number","Poisson_Ratio", 0.29, function(v){}, {});
        this.THICKNESS = this.addWidget("number","Thinckness", 0.1, function(v){}, {});
        this.addInput("tables","process_array");
        this.addOutput("Material","material");

        this.size = this.computeSize();
    }

    onExecute()
    {
        this._value = Object.assign({}, this.properties);

        // Current material model part
        this._value["model_part_name"] = this.getInputData(0)

        // Table
        if (this.getInputData(7) != undefined) {
            this._value["Material"]["Table"] = this.getInputData(7)
        } else {
            this._value["Material"]["Table"]= this.properties["Table"]
        }
        this._value["properties_id"] = this.properties_id.value
        this._value["Material"]["constitutive_law"]["name"] = this.name.value
        this._value["Material"]["Variables"]["DENSITY"] = this.DENSITY.value
        this._value["Material"]["Variables"]["YOUNG_MODULUS"] = this.YOUNG_MODULUS.value
        this._value["Material"]["Variables"]["POISSON_RATIO"] = this.POISSON_RATIO.value
        this._value["Material"]["Variables"]["THICKNESS"] = this.THICKNESS.value

        this.setOutputData(0, this._value);
    }
}

StructuralMaterial.title = "Structural material";
StructuralMaterial.desc = "Node to specify a Structurall material.";

LiteGraph.registerNodeType("materials/StructuralMaterial", StructuralMaterial);

console.log("StructuralMaterialNew node created"); //helps to debug