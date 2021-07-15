class StructuralMechanicsSolver {
    constructor() {
        this.addInput("model_import_settings", "map");      // 0
        this.addInput("material_import_settings", "map");   // 1
        this.addOutput("solver_settings", "map");
        this.properties = {
            "solver_type"                        : "static",
            "model_part_name"                    : "Structure",
            "domain_size"                        : 2,
            "echo_level"                         : 0,
            "analysis_type"                      : "non_linear",
            "model_import_settings"              : {
                "input_type"     : "mdpa",
                "input_filename" : "Ring"
            },
            "material_import_settings"           : {
                "materials_filename" : "StructuralMaterials.json"
            },
            "time_stepping"                      : {
                "time_step" : 1
            },
            "line_search"                        : false,
            "convergence_criterion"              : "residual_criterion",
            "displacement_relative_tolerance"    : 0.0001,
            "displacement_absolute_tolerance"    : 1e-9,
            "residual_relative_tolerance"        : 0.0001,
            "residual_absolute_tolerance"        : 1e-9,
            "max_iteration"                      : 10,
            "rotation_dofs"                      : false,
            "volumetric_strain_dofs"             : false
        },
        this.domain_size = this.addWidget("combo","Domain Size", 2, function(v){}, { values:[2,3]} );

        this.size = this.computeSize();
    }

    onExecute() {
        this._value = Object.assign({}, this.properties);
        this._value["domain_size"] = this.domain_size.value;
        this._value["model_import_settings"] = this.getInputData(0);
        this._value["material_import_settings"] = this.getInputData(1);

        // Get the 

        this.setOutputData(0, this._value);
    }
}

StructuralMechanicsSolver.title = "Structural mechanics solver";
StructuralMechanicsSolver.desc = "Properties for the structural mechanics solver";

LiteGraph.registerNodeType("solver_settings/StructuralMechanicsSolver", StructuralMechanicsSolver);

console.log("StructuralMechanicsSolver node created"); //helps to debug