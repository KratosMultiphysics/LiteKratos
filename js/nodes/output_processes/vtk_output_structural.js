 
//********************************************************************/
//********************************************************************/
//********************************************************************/
//********************************************************************/
function VTKStructural() {

    this.properties = {
        "python_module" : "vtk_output_process",
        "kratos_module" : "KratosMultiphysics",
        "process_name"  : "VtkOutputProcess",
        "help"          : "This process writes postprocessing files for Paraview",
        "Parameters"    : {
            "model_part_name"                             : "Structure",
            "output_control_type"                         : "step",
            "output_interval"                             : 1,
            "file_format"                                 : "ascii",
            "output_precision"                            : 7,
            "output_sub_model_parts"                      : false,
            "folder_name"                                 : "vtk_output",
            "save_output_files_in_folder"                 : true,
            "nodal_solution_step_data_variables"          : ["DISPLACEMENT","REACTION"],
            "nodal_data_value_variables"                  : [],
            "element_data_value_variables"                : [],
            "condition_data_value_variables"              : [],
            "gauss_point_variables_extrapolated_to_nodes" : ["VON_MISES_STRESS"]
        }
    }
    this.addOutput("Process", "process");
    this.model_part_name = this.addWidget("text","ModelPartName", "Structure.VISUALIZE_HROM", function(v){}, {} );
    this.size = this.computeSize();
}

VTKStructural.title = "VTK structural";
VTKStructural.desc = "Creates VTK";

VTKStructural.prototype.onExecute = function () {
    output = this.properties
    
    output["Parameters"]["model_part_name"] = this.model_part_name.value;

    this.setOutputData(0, output);
};

LiteGraph.registerNodeType("output_processes/VTK_structural", VTKStructural);

console.log("VTK node created"); //helps to debug