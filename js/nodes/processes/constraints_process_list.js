function AssignVectorVariableProcess () {
    this.addInput("model_part_name","string");
    this.addInput("interval","process_array");
    this.addInput("constrained","process_array");
    this.addInput("value","process_array")

    this.properties = {
        
            "python_module" : "assign_vector_variable_process",
            "kratos_module" : "KratosMultiphysics",
            "process_name"  : "AssignVectorVariableProcess",
            "Parameters"    : {
                "model_part_name" : "Structure.DISPLACEMENT_Displacement_Auto1",
                "variable_name"   : "DISPLACEMENT",
                "interval"        : [0.0,"End"],
                "constrained"     : [true,true,true],
                "value"           : [0.0,0.0,0.0]
            }
        };
        var that = this;
        this.variable_name = this.addWidget("text","VariableName", "DISPLACEMENT", function(v){}, {} );


        this.addOutput("Process","process");

        this.size = this.computeSize();
        this.serialize_widgets = true;
        
}


AssignVectorVariableProcess.title = "Constraints process list";
AssignVectorVariableProcess.desc = "Node to specify a boundary process.";

AssignVectorVariableProcess.prototype.onExecute = function() {
myoutput = this.properties
        // model_part_name
        if (this.getInputData(0) != undefined) {
            myoutput["Parameters"]["model_part_name"] = this.getInputData(0)
        } else {
            myoutput["Parameters"]["model_part_name"] = this.properties["Parameters"]["model_part_name"]
        }
                // interval
        if (this.getInputData(1) != undefined) {
            myoutput["Parameters"]["interval"] = this.getInputData(1)
        } else {
            myoutput["Parameters"]["interval"] = this.properties["Parameters"]["interval"]
        }

        // constrained
        if (this.getInputData(2) != undefined) {
            myoutput["Parameters"]["constrained"] = this.getInputData(2)
        } else {
            myoutput["Parameters"]["constrained"] = this.properties["Parameters"]["constrained"]
        }

        // value
        if (this.getInputData(3) != undefined) {
            myoutput["Parameters"]["value"] = this.getInputData(3)
        } else {
            myoutput["Parameters"]["value"] = this.properties["Parameters"]["value"]
        }

        
myoutput["Parameters"]["variable_name"] = this.variable_name.value

this.setOutputData(0,  myoutput);
};

LiteGraph.registerNodeType("processes/ConstraintsProcessList", AssignVectorVariableProcess );

console.log("ConstraintsProcessList node created"); //helps to debug