
//********************************************************************/
//********************************************************************/
//********************************************************************/
//********************************************************************/
function GiDStructural() {

    this.addOutput("Process", "process");
    this.properties = {
        "python_module" : "gid_output_process",
        "kratos_module" : "KratosMultiphysics",
        "process_name"  : "GiDOutputProcess",
        "help"          : "This process writes postprocessing files for GiD",
        "Parameters"    : {
            "model_part_name"        : "Structure",
            "output_name"            : "SWQ",
            "postprocess_parameters" : {
                "result_file_configuration" : {
                    "gidpost_flags"               : {
                        "GiDPostMode"           : "GiD_PostBinary",
                        "WriteDeformedMeshFlag" : "WriteDeformed",
                        "WriteConditionsFlag"   : "WriteConditions",
                        "MultiFileFlag"         : "SingleFile"
                    },
                    "file_label"                  : "step",
                    "output_control_type"         : "step",
                    "output_interval"             : 1,
                    "body_output"                 : true,
                    "node_output"                 : false,
                    "skin_output"                 : false,
                    "plane_output"                : [],
                    "nodal_results"               : ["DISPLACEMENT","REACTION"],
                    "gauss_point_results"         : ["VON_MISES_STRESS"],
                    "nodal_nonhistorical_results" : []
                },
                "point_data_configuration"  : []
            }
        }
    }
    this.model_part_name = this.addWidget("text","ModelPartName", "Structure", function(v){}, {} );
    this.output_name = this.addWidget("text","OutputName", "SWQ", function(v){}, {} );

    this.size = this.computeSize();
}

GiDStructural.title = "GiD structural";
GiDStructural.desc = "Creates GiD structural";

GiDStructural.prototype.onExecute = function () {
    output = this.properties

    output["Parameters"]["model_part_name"] = this.model_part_name.value;
    output["Parameters"]["output_name"] = this.output_name.value;

    
    this.setOutputData(0, output);
};

LiteGraph.registerNodeType("output_processes/GiDStructural", GiDStructural);

console.log("GiD node created"); //helps to debug