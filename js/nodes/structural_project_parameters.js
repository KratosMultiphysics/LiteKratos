function StructuralProjectParameters() {
    this.addInput("problem_data", "map");
    this.addInput("solver_settings", "map");
    this.addInput("constraints_process_list", "process_array");
    this.addInput("loads_process_list", "process_array");
    this.addInput("list_other_processes", "process_array");
    this.addInput("gid_output", "process_array");
    this.addInput("vtk_output", "process_array");


    this.addOutput("project_parameters","map");
    this.size = this.computeSize();
}

StructuralProjectParameters.title = "Structural Project Parameters";
StructuralProjectParameters.desc = "Create a Project Paramaters";

StructuralProjectParameters.prototype.onExecute = function() {
    tmp = {};
    tmp["processes"] = {};
    tmp["output_processes"] = {};

    tmp["problem_data"] = this.getInputData(0); //0
    tmp["solver_settings"] = this.getInputData(1); //1
    tmp["processes"]["constraints_process_list"] = this.getInputData(2); //2
    tmp["processes"]["loads_process_list"] = this.getInputData(3); //3
    tmp["processes"]["list_other_processes"] = this.getInputData(4); //4
    tmp["output_processes"] ["gid_output"]= this.getInputData(5); //5
    tmp["output_processes"] ["vtk_output"]= this.getInputData(6); //5

    this.setOutputData(0, tmp);
};

LiteGraph.registerNodeType("parameters/StructuralProjectParameters", StructuralProjectParameters);

console.log("ProjectParameters node created"); //helps to debug
